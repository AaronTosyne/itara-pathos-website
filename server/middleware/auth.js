const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  console.log('=== AUTH MIDDLEWARE ===');
  console.log('Headers:', req.headers);
  console.log('Authorization header:', req.headers.authorization);  

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
    console.log('Token extracted:', token ? 'Token exists' : 'No token');
  }

  // Make sure token exists
  if (!token) {
    console.log('ERROR: No token found');
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    console.log('Verifying token...');
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    // Get user from token (exclude password)
    req.user = await User.findById(decoded.id).select('-password');
    console.log('User found:', req.user ? req.user.username : 'No user');

    if (!req.user) {
      console.log('ERROR: User not found in database');
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    console.log('Auth successful, proceeding to next middleware');
    console.log('=====================');
    next(); // Continue to the next middleware/controller
  } catch (error) {
    console.log('ERROR: Token verification failed');
    console.log('Error:', error.message);
    console.log('=====================');
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};