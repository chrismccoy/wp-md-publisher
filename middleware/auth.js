/**
 * Middleware to protect API routes.
 * Checks for the 'x-site-password' header.
 */

const { SITE_PASSWORD } = require('../config');

module.exports = (req, res, next) => {
    const requestPassword = req.headers['x-site-password'];

    if (!requestPassword || requestPassword !== SITE_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized: Incorrect Site Password' });
    }

    next();
};
