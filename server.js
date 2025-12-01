/**
 * Markdown to Post Application
 */

const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`--------------------------------------------------`);
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`--------------------------------------------------`);
});
