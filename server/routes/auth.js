const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe
} = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Private route (we'll add auth middleware later)
router.get('/me', getMe);

module.exports = router;