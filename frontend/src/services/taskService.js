import api from './api';

export const taskService = {
  async getTasks() {
    const res = await api.get('/tasks');
    return res.data.tasks;
  },

  async getTaskById(id) {
    const res = await api.get(`/tasks/${id}`);
    return res.data.task;
  },

  async createTask(taskData) {
    const res = await api.post('/tasks', taskData);
    return res.data.task;
  },

  async updateTask(id, taskData) {
    const res = await api.put(`/tasks/${id}`, taskData);
    return res.data.task;
  },

  async updateStatus(id, status) {
    const res = await api.patch(`/tasks/${id}/status`, { status });
    return res.data.task;
  },

  async deleteTask(id) {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
  },

  async getUsers() {
    const res = await api.get('/users');
    return res.data.users;
  },
};

export default taskService;
