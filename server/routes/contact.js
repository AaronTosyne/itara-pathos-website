const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  toggleRead,
  deleteContact
} = require('../controllers/contactController');

// Import auth middleware
const { protect, authorize } = require('../middleware/auth');

// Public route (anyone can submit contact form)
router.post('/', createContact);

// Protected admin routes (only admins can view submissions)
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id/read', protect, authorize('admin'), toggleRead);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;