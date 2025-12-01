/**
 * Handles loading .env files, validating required credentials,
 * and generating authentication headers for WordPress.
 */

require('dotenv').config();

const WP_URL = process.env.WP_SITE_URL;
const WP_USER = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;
const SITE_PASSWORD = process.env.SITE_PASSWORD;

/**
 * Validates that all necessary environment variables are present.
 */
if (!WP_URL || !WP_USER || !WP_APP_PASSWORD || !SITE_PASSWORD) {
    console.error('CRITICAL ERROR: Missing WordPress configuration in .env file.');
    console.error('Ensure WP_SITE_URL, WP_USERNAME, and WP_APP_PASSWORD and SITE_PASSWORD are set.');
    process.exit(1);
}

/**
 * Generates the Basic Authentication header for WordPress Application Passwords.
 */
const getAuthHeader = () => {
    const token = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');
    return `Basic ${token}`;
};

/**
 * Exported configuration object.
 */
module.exports = {
    WP_URL,
    SITE_PASSWORD,    
    /** 
     * Pre-configured Axios headers object.
     */
    axiosConfig: {
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json',
        }
    }
};
