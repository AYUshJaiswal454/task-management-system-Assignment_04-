# TaskFlow — Modern Task Management System

> **Assignment 4: CRUD with Client-Side Rendering**  
> A full-stack MERN task management dashboard designed for open-source collaboration, feature branching, and pull request reviews.

---

## 📖 Project Description

**TaskFlow** is a modern, responsive web application for collaborative team task management. Built with a React (Vite) frontend and a Node.js/Express/MongoDB backend, it implements strict Role-Based Access Control (Admin and Standard User), JWT authentication, password hashing, and clean RESTful API standards.

This repository is intentionally published with **exactly six isolated features left incomplete** for Assignment 4. External contributors can fork the repository, pick one documented issue, implement the solution on a dedicated branch, and submit a Pull Request for review.

---

## ✨ Features & Current Limitations

### Implemented & Working Core Features
- 🔐 **Authentication & Security:** Secure registration and login using bcrypt password hashing, JWT Bearer tokens, and protected API endpoints.
- 👥 **Role-Based Authorization (RBAC):**
  - **Admin:** Full CRUD capabilities — create tasks, update any task, assign tasks, and delete tasks.
  - **Standard User:** Scoped visibility — view only tasks assigned to them, and update status of their own tasks.
- 📊 **Dashboard Overview:** Live metric widgets (Total Permitted Tasks, In Progress, Completed, High Priority) and recent tasks table.
- 📋 **Task Directory:** Responsive table displaying task titles, description excerpts, assignees, priorities, statuses, and due dates.
- 🔍 **Task Details View:** Detailed modal/page view displaying full metadata, timestamps, assignees, and quick status switcher.
- ⚡ **Dynamic Status Transitions:** Quick status switcher allowing permitted users to transition tasks between `TODO`, `IN_PROGRESS`, and `COMPLETED`.
- 🎨 **Modern SaaS Design:** Built with custom Vanilla CSS tokens, Plus Jakarta Sans typography, sleek cards, status badges, and mobile-responsive drawer navigation.
- 🧪 **Automated Testing Suite:** 16 automated integration tests using Jest and Supertest validating authentication, task CRUD, role restrictions, and validation rules.

### Current Limitations (Intentionally Left Incomplete for Contributors)
The following six features are deliberately incomplete and correspond to open issues:
1. **Task Search:** Search bar accepts input, but does not filter tasks by title or description.
2. **Task Status Filter:** Status dropdown updates value, but does not filter tasks by `TODO`, `IN_PROGRESS`, or `COMPLETED`.
3. **Priority Filter:** Priority dropdown updates value, but does not filter tasks by `LOW`, `MEDIUM`, or `HIGH`.
4. **Task Form Validation:** Client-side form allows submitting blank/whitespace titles without inline error messages.
5. **Admin Task Assignment:** Assignee selector loads users, but does not attach `assignedTo` to the submitted payload.
6. **Task Pagination:** All tasks render at once; page numbers and previous/next buttons are non-functional.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, React Router DOM v7, Axios, Lucide React, Vanilla CSS |
| **Backend** | Node.js (v20+), Express.js, MongoDB Atlas / Local MongoDB, Mongoose 8 |
| **Authentication** | JSON Web Tokens (jsonwebtoken), bcryptjs password hashing |
| **Testing** | Jest, Supertest |
| **Deployment Targets** | Vercel (Frontend), Render (Backend) |

---

## 👥 Team & Maintainers

- **Project Author & Maintainer:** Aman Kumar
- **Open Source Contributors:** Open for community pull requests via GitHub Issues.

---

## 📁 Folder Structure

```text
task-management-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration (db.js)
│   │   ├── controllers/     # Route controllers (authController, taskController, userController)
│   │   ├── middleware/      # Auth & centralized error handling (auth.js, errorHandler.js)
│   │   ├── models/          # Mongoose models (User.js, Task.js)
│   │   ├── routes/          # REST route handlers (authRoutes, taskRoutes, userRoutes)
│   │   ├── utils/           # Database seed script (seed.js)
│   │   ├── app.js           # Express app instance and middleware
│   │   └── server.js        # Server listener and database connector
│   ├── tests/               # Automated API tests (api.test.js)
│   ├── .env.example         # Backend environment variable template
│   ├── .gitignore           # Backend gitignore rules
│   └── package.json         # Backend scripts and dependencies
├── frontend/
│   ├── public/              # Static public assets
│   ├── src/
│   │   ├── components/      # Reusable UI (Navbar, Sidebar, TaskTable, TaskFilters, TaskForm, etc.)
│   │   ├── context/         # React Context (AuthContext.jsx)
│   │   ├── hooks/           # Custom hooks (useTasks.js)
│   │   ├── pages/           # Route views (Dashboard, Tasks, TaskDetail, CreateTask, EditTask, Auth)
│   │   ├── services/        # API client and service layers (api.js, authService.js, taskService.js)
│   │   ├── App.jsx          # Route declarations and app shell
│   │   ├── index.css        # Vanilla CSS design system
│   │   └── main.jsx         # React application entry point
│   ├── index.html           # HTML template
│   ├── .env.example         # Frontend environment variable template
│   ├── .gitignore           # Frontend gitignore rules
│   └── package.json         # Frontend scripts and dependencies
├── issues/                  # The 6 issue specifications for contributors
│   ├── issue-1-task-search.md
│   ├── issue-2-task-status-filter.md
│   ├── issue-3-priority-filter.md
│   ├── issue-4-task-form-validation.md
│   ├── issue-5-admin-task-assignment.md
│   └── issue-6-pagination.md
├── scripts/
│   └── create-github-issues.sh  # Script to publish the 6 issues to GitHub
├── .gitignore               # Root gitignore rules
├── package.json             # Root workspace runner scripts
└── README.md                # Project documentation
```

---

## 📡 API Endpoint Documentation

All endpoints are prefixed with `/api`. Protected routes require a valid `Authorization: Bearer <token>` header.

### Authentication Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new standard user account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Public | Authenticate user credentials and return JWT token |
| `GET` | `/api/auth/me` | Private | Retrieve authenticated user profile |

### Task Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/tasks` | Private | Retrieve tasks (Admin: all tasks; Standard User: assigned tasks only) |
| `GET` | `/api/tasks/:id` | Private | Retrieve specific task (Admin: any; Standard User: assigned only) |
| `POST` | `/api/tasks` | Private / Admin | Create a new task with title, description, priority, and due date |
| `PUT` | `/api/tasks/:id` | Private / Admin | Update entire task record |
| `PATCH` | `/api/tasks/:id/status` | Private / Admin & Assigned User | Update task status (`TODO`, `IN_PROGRESS`, `COMPLETED`) |
| `DELETE` | `/api/tasks/:id` | Private / Admin | Permanently delete a task |

### User Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/users` | Private / Admin | Fetch list of users for task assignment dropdown |

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env.example`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend Configuration (`frontend/.env.example`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
- Node.js >= 18.x
- MongoDB (running locally or a MongoDB Atlas connection string)
- Git

### 2. Clone the Repository
```bash
git clone https://github.com/armnkumar321-spec/task-management-system.git
cd task-management-system
```

### 3. Setup Backend
```bash
cd backend
cp .env.example .env
# Adjust MONGODB_URI or JWT_SECRET in .env if needed
npm install
npm run seed     # Seeds demo users and sample tasks into MongoDB
npm run dev      # Starts Express API server on http://localhost:5000
```

### 4. Setup Frontend
In a new terminal window:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev      # Starts Vite development server on http://localhost:5173
```

### 5. Root Convenience Commands
From the project root:
- `npm run install:all` — Installs dependencies for both backend and frontend.
- `npm run dev:backend` — Starts backend development server.
- `npm run dev:frontend` — Starts frontend development server.
- `npm run seed` — Re-seeds the database with demo data.
- `npm run test` — Runs automated Jest backend integration test suite.
- `npm run build` — Validates frontend build production bundle.

---

## 🔑 Demo Accounts

Use these pre-seeded accounts to explore role-based permissions:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Admin** | `admin@taskflow.dev` | `Admin@123456` | Full access: create, edit, assign, delete any task |
| **Standard User** | `user@taskflow.dev` | `User@123456` | View assigned tasks, update assigned task status |
| **Team Member 1** | `sarah@taskflow.dev` | `User@123456` | View assigned tasks, update assigned task status |
| **Team Member 2** | `alex@taskflow.dev` | `User@123456` | View assigned tasks, update assigned task status |

---

## 🎯 The Six Open GitHub Issues

Contributors can choose one of the following isolated issues:

| # | Title | Issue Link | Spec File | Suggested Label |
|---|---|---|---|---|
| 1 | **[Feature] Implement task search by title and description** | [#1 on GitHub](https://github.com/armnkumar321-spec/task-management-system/issues/1) | [issue-1-task-search.md](issues/issue-1-task-search.md) | `enhancement`, `good first issue` |
| 2 | **[Feature] Fix task status filtering** | [#2 on GitHub](https://github.com/armnkumar321-spec/task-management-system/issues/2) | [issue-2-task-status-filter.md](issues/issue-2-task-status-filter.md) | `enhancement`, `good first issue` |
| 3 | **[Feature] Implement priority filtering** | [#3 on GitHub](https://github.com/armnkumar321-spec/task-management-system/issues/3) | [issue-3-priority-filter.md](issues/issue-3-priority-filter.md) | `enhancement`, `good first issue` |
| 4 | **[Bug] Add client-side task form validation** | [#4 on GitHub](https://github.com/armnkumar321-spec/task-management-system/issues/4) | [issue-4-task-form-validation.md](issues/issue-4-task-form-validation.md) | `bug`, `good first issue` |
| 5 | **[Feature] Complete Admin task assignment functionality** | [#5 on GitHub](https://github.com/armnkumar321-spec/task-management-system/issues/5) | [issue-5-admin-task-assignment.md](issues/issue-5-admin-task-assignment.md) | `enhancement` |
| 6 | **[Feature] Add pagination to the task list** | [#6 on GitHub](https://github.com/armnkumar321-spec/task-management-system/issues/6) | [issue-6-pagination.md](issues/issue-6-pagination.md) | `enhancement`, `good first issue` |

---

## 🤝 How to Contribute

We welcome contributions from everyone participating in Assignment 4! Follow these steps:

1. **Fork the Repository:** Click the **Fork** button on GitHub to create your own copy.
2. **Clone your fork:**
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
3. **Create a Feature Branch:** Branch name should reference the issue:
   ```bash
   git checkout -b feature/issue-1-task-search
   ```
4. **Implement the Solution:** Refer to the corresponding issue specification in the `issues/` directory and inline `TODO` comments.
5. **Test Your Solution:**
   - Confirm backend tests pass: `npm run test`
   - Confirm frontend builds cleanly: `npm run build`
   - Test manually in the browser.
6. **Commit and Push:**
   ```bash
   git add .
   git commit -m "feat(tasks): implement search by title and description (#1)"
   git push origin feature/issue-1-task-search
   ```
7. **Open a Pull Request:** Open a PR against the `main` branch of the upstream repository with a clear description and testing proof.

---

## 🚢 Deployment Guidelines

### Backend (Render)
1. Create a **Web Service** on [Render](https://render.com).
2. Root directory: `backend`.
3. Build command: `npm install`.
4. Start command: `node src/server.js`.
5. Set environment variables: `PORT=5000`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`.

### Frontend (Vercel)
1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Root directory: `frontend`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Set environment variable: `VITE_API_URL=https://<your-render-backend-url>/api`.

---

## 📄 License
This project is open-source under the MIT License.
