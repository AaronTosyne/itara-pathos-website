const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect, authorize } = require('../middleware/auth');

// Upload image
router.post('/', protect, authorize('admin', 'editor'), upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        url: req.file.path,
        publicId: req.file.filename
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error uploading image'
    });
  }
});

module.exports = router;