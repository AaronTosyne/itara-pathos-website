const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  toggleRead,
  deleteContact
} = require('../controllers/contactController');

// Public route
router.post('/', createContact);

// Admin routes (we'll add auth middleware later)
router.get('/', getContacts);
router.get('/:id', getContact);
router.put('/:id/read', toggleRead);
router.delete('/:id', deleteContact);

module.exports = router;