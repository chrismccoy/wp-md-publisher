# 📝 WP Markdown Publisher

An application designed to streamline the content creation workflow. It converts Markdown files into HTML and publishes them directly to WordPress via the REST API.

## ✨ Features

*   🔒 **Site Password Protection** – A dedicated login layer ensures only authorized users can access the UI and API endpoints.
*   🎨 **Modern UI** – Responsive Tailwind CSS interface with visual file upload areas and styled controls.
*   📄 **Markdown to HTML** – Automatic parsing of `.md` files into WordPress compatible HTML.
*   📂 **Dynamic Categories** – Fetches and populates your actual WordPress categories in real time.
*   ⚡ **AJAX Interactions** – Seamless, single page experience with inline success/error notifications and loading states.
*   ⚙️ **Status Control** – Choose between **Draft**, **Publish**, or **Private** statuses before uploading.
*   ☁️ **In-Memory Processing** – Efficient file handling using RAM buffers (Stream based) to keep the filesystem clean.

## 🛡️ Security Note

*   **WordPress Credentials:** Your WP Application Password is strictly stored on the server side (`.env`). It is never exposed to the client browser.
*   **API Protection:** All API endpoints (`/api/*`) are protected by a custom `x-site-password` header check. Even if someone bypasses the frontend login screen, they cannot interact with the API without the correct password.

