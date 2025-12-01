/**
 * Handles the conversion of Markdown syntax into HTML.
 */

const { marked } = require('marked');

/**
 * Parses a raw Buffer containing Markdown text into an HTML string.
 */
exports.parseToHtml = (buffer) => {
    try {
        const stringContent = buffer.toString('utf-8');
        return marked.parse(stringContent);
    } catch (error) {
        console.error('Markdown Parse Error:', error);
        throw new Error('Failed to parse Markdown file content.');
    }
};
