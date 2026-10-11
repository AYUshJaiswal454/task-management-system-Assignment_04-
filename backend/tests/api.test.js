import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Task from '../src/models/Task.js';

const TEST_DB_URI = process.env.TEST_MONGODB_URI || 'mongodb://127.0.0.1:27017/taskflow_test';

let adminToken;
let userToken;
let otherUserToken;
let adminId;
let userId;
let otherUserId;
let sampleTaskId;

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI);
  await User.deleteMany({});
  await Task.deleteMany({});

  // Seed test users
  const adminHash = await User.hashPassword('AdminPass123!');
  const admin = await User.create({
    name: 'Test Admin',
    email: 'admin_test@taskflow.dev',
    passwordHash: adminHash,
    role: 'ADMIN',
  });
  adminId = admin._id;

  const userHash = await User.hashPassword('UserPass123!');
  const user = await User.create({
    name: 'Test Regular User',
    email: 'user_test@taskflow.dev',
    passwordHash: userHash,
    role: 'USER',
  });
  userId = user._id;

  const otherUser = await User.create({
    name: 'Other Regular User',
    email: 'other_test@taskflow.dev',
    passwordHash: userHash,
    role: 'USER',
  });
  otherUserId = otherUser._id;

  // Login to get tokens
  const adminRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin_test@taskflow.dev', password: 'AdminPass123!' });
  adminToken = adminRes.body.token;

  const userRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user_test@taskflow.dev', password: 'UserPass123!' });
  userToken = userRes.body.token;

  const otherUserRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'other_test@taskflow.dev', password: 'UserPass123!' });
  otherUserToken = otherUserRes.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Task.deleteMany({});
  await mongoose.connection.close();
});

describe('1. Authentication Endpoints', () => {
  test('POST /api/auth/register should create a new user with USER role', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'New Registrant',
        email: 'new_reg@taskflow.dev',
        password: 'Password123!',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe('USER');
  });

  test('POST /api/auth/register should reject duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Duplicate Guy',
        email: 'new_reg@taskflow.dev',
        password: 'Password123!',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/login should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin_test@taskflow.dev',
        password: 'WrongPassword',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('GET /api/auth/me should return authenticated user profile', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('admin_test@taskflow.dev');
  });

  test('GET /api/auth/me should reject unauthenticated request', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toBe(401);
  });
});

describe('2. Task CRUD & Role-Based Authorization', () => {
  test('POST /api/tasks: Admin should be able to create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Initial Assigned Task',
        description: 'Details for user task',
        status: 'TODO',
        priority: 'HIGH',
        assignedTo: userId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.task.title).toBe('Initial Assigned Task');
    expect(res.body.task.assignedTo._id.toString()).toBe(userId.toString());
    sampleTaskId = res.body.task._id;
  });

  test('POST /api/tasks: Regular user must NOT be able to create a task (Forbidden)', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'Unauthorized Task Creation',
      });

    expect(res.statusCode).toBe(403);
  });

  test('POST /api/tasks: Should reject task creation without title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        description: 'No title provided',
      });

    expect(res.statusCode).toBe(400);
  });

  test('GET /api/tasks: Regular user only receives tasks assigned to them', async () => {
    // Create an unassigned/other task
    await Task.create({
      title: 'Secret Admin Task',
      description: 'Hidden from standard user',
      status: 'TODO',
      priority: 'LOW',
      assignedTo: otherUserId,
      createdBy: adminId,
    });

    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    // Every task returned must be assigned to this user
    res.body.tasks.forEach((t) => {
      expect(t.assignedTo._id.toString()).toBe(userId.toString());
    });
  });

  test('GET /api/tasks: Admin receives all tasks across the system', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.tasks.length).toBeGreaterThanOrEqual(2);
  });

  test('PATCH /api/tasks/:id/status: Assigned user can update their task status', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${sampleTaskId}/status`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ status: 'IN_PROGRESS' });

    expect(res.statusCode).toBe(200);
    expect(res.body.task.status).toBe('IN_PROGRESS');
  });

  test('PATCH /api/tasks/:id/status: User cannot update status of a task assigned to someone else', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${sampleTaskId}/status`)
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send({ status: 'COMPLETED' });

    expect(res.statusCode).toBe(403);
  });

  test('PUT /api/tasks/:id: Regular user cannot update full task details', async () => {
    const res = await request(app)
      .put(`/api/tasks/${sampleTaskId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'Hacked Title' });

    expect(res.statusCode).toBe(403);
  });

  test('PUT /api/tasks/:id: Admin can update full task details', async () => {
    const res = await request(app)
      .put(`/api/tasks/${sampleTaskId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Admin Updated Title', priority: 'LOW' });

    expect(res.statusCode).toBe(200);
    expect(res.body.task.title).toBe('Admin Updated Title');
    expect(res.body.task.priority).toBe('LOW');
  });

  test('DELETE /api/tasks/:id: Regular user cannot delete task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${sampleTaskId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  test('DELETE /api/tasks/:id: Admin can delete task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${sampleTaskId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
