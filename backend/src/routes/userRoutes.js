import express from 'express';
import { getUsers } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Only authenticated admins can fetch the list of assignable users
router.get('/', protect, authorize('ADMIN'), getUsers);

export default router;
