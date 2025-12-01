/**
 * Multer middleware configuration for file uploads.
 */

const multer = require('multer');

/**
 * Storage configuration.
 */
const storage = multer.memoryStorage();

/**
 * Multer upload instance.
 * configured with a 10MB file size limit.
 */
const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 10 * 1024 * 1024 // Limit: 10MB
    }
});

module.exports = upload;
