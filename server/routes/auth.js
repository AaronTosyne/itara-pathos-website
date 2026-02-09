const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe
} = require('../controllers/authController');

// Import auth middleware
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Protected routes
router.post('/register', protect, authorize('admin'), register); // Only admins can create new admins
router.get('/me', protect, getMe);

module.exports = router;