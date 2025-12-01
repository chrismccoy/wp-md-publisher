/**
 * Service for external communication with the WordPress REST API.
 */

const axios = require('axios');
const { WP_URL, axiosConfig } = require('../config');

/**
 * Fetches the list of categories from WordPress.
 */
exports.fetchCategories = async () => {
    // Request per_page=100 to ensure the most categories.
    const url = `${WP_URL}/wp-json/wp/v2/categories?per_page=100&hide_empty=false`;
    
    const response = await axios.get(url, axiosConfig);
    
    // Map the complex WP response to a lightweight internal DTO
    return response.data.map(cat => ({
        id: cat.id,
        name: cat.name
    }));
};

/**
 * Creates a new post in WordPress via the REST API.
 */
exports.createPost = async (postData) => {
    const url = `${WP_URL}/wp-json/wp/v2/posts`;
    
    const response = await axios.post(url, postData, axiosConfig);
    
    return {
        id: response.data.id,
        link: response.data.link
    };
};
