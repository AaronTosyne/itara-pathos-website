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

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/slug/:slug', getPostBySlug);

// Admin routes (we'll add auth middleware later)
router.get('/admin/all', getAllPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;