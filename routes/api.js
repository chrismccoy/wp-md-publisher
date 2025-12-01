/**
 * API Route Definitions.
 * Maps HTTP endpoints to specific Controller methods and Middleware.
 */

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const postController = require('../controllers/postController');
const requireAuth = require('../middleware/auth');

// Verification Endpoint
router.post('/verify', requireAuth, (req, res) => {
    res.json({ success: true });
});

// Apply auth middleware to all routes below
router.use(requireAuth);

// Endpoint to fetch available categories for the dropdown.
router.get('/categories', postController.getCategories);

// Endpoint to upload a markdown file and create a WP post.
router.post('/publish', upload.single('markdownFile'), postController.publishPost);

module.exports = router;
