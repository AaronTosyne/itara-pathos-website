const express = require('express');
const router = express.Router();
const {
  getPosts,
  getAllPosts,
  getPost,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Import auth middleware
const { protect, authorize } = require('../middleware/auth');

// Public routes (no authentication required)
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/slug/:slug', getPostBySlug);

// Protected admin routes (authentication required)
router.get('/admin/all', protect, authorize('admin', 'editor'), getAllPosts);
router.post('/', protect, authorize('admin', 'editor'), createPost);
router.put('/:id', protect, authorize('admin', 'editor'), updatePost);
router.delete('/:id', protect, authorize('admin'), deletePost);

module.exports = router;