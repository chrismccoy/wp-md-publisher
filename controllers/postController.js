/**
 * Controller handles incoming HTTP requests and responses.
 */

const wpService = require('../services/wpService');
const markdownService = require('../services/markdownService');

/**
 * Retrieves categories from the WP Service and returns them as JSON.
 */
exports.getCategories = async (req, res) => {
    try {
        const categories = await wpService.fetchCategories();
        res.json(categories);
    } catch (error) {
        console.error('Controller Error (getCategories):', error.message);
        res.status(500).json({ error: 'Unable to load categories from WordPress.' });
    }
};

/**
 * Validates input, converts Markdown to HTML, and sends payload to WP Service.
 */
exports.publishPost = async (req, res) => {
    try {
        // Validation: Ensure file and title exist
        if (!req.file) {
            return res.status(400).json({ error: 'Markdown file is required.' });
        }
        if (!req.body.title) {
            return res.status(400).json({ error: 'Post title is required.' });
        }

        // Convert Buffer -> HTML
        const htmlContent = markdownService.parseToHtml(req.file.buffer);

        // Construct Payload
        const postPayload = {
            title: req.body.title,
            content: htmlContent,
            status: req.body.status || 'draft',
        };

        // Handle Categories: Form data sends strings, WP needs Integers in an Array
        if (req.body.category) {
            postPayload.categories = [parseInt(req.body.category, 10)];
        }

        // External Service Call
        const result = await wpService.createPost(postPayload);

        // Send Success Response
        res.status(201).json({
            success: true,
            postId: result.id,
            link: result.link,
            message: 'Post published successfully!'
        });

    } catch (error) {
        const msg = error.response?.data?.message || error.message;
        console.error('Controller Error (publishPost):', msg);
        
        res.status(500).json({ 
            success: false, 
            error: msg 
        });
    }
};
