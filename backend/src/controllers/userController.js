import User from '../models/User.js';

/**
 * @desc    Get all users (for assigning tasks, Admin only)
 * @route   GET /api/users
 * @access  Private / Admin
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('name email role _id').sort({ name: 1 });
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};
