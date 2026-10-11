import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from '../controllers/taskController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All task routes require authentication
router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(authorize('ADMIN'), createTask);

router
  .route('/:id')
  .get(getTaskById)
  .put(authorize('ADMIN'), updateTask)
  .delete(authorize('ADMIN'), deleteTask);

router.patch('/:id/status', updateTaskStatus);

export default router;
