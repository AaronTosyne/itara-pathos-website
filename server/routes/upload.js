const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect, authorize } = require('../middleware/auth');

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin/Editor only)
router.post('/', protect, authorize('admin', 'editor'), upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image'
      });
    }

    console.log('Image uploaded to Cloudinary:', req.file.path);

    res.status(200).json({
      success: true,
      data: {
        url: req.file.path,
        publicId: req.file.filename
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Error uploading image'
    });
  }
});

module.exports = router;