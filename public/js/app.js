/**
 * Frontend
 */

const loginSection = document.getElementById('loginSection');
const appSection = document.getElementById('appSection');
const loginForm = document.getElementById('loginForm');
const sitePasswordInput = document.getElementById('sitePassword');
const loginError = document.getElementById('loginError');

const form = document.getElementById('publishForm');
const fileInput = document.getElementById('markdownFile');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const submitBtn = document.getElementById('submitBtn');
const categorySelect = document.getElementById('category');

const successNotice = document.getElementById('successNotice');
const errorNotice = document.getElementById('errorNotice');
const successLink = document.getElementById('successLink');
const errorText = document.getElementById('errorText');

// Variable to store the authorized password in memory
let AUTH_TOKEN = '';

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = sitePasswordInput.value;
    
    try {
        // Attempt to verify password with server
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'x-site-password': password }
        });

        if (response.ok) {
            AUTH_TOKEN = password;
            loginSection.classList.add('hidden');
            appSection.classList.remove('hidden');
            
            loadCategories();
        } else {
            loginError.classList.remove('hidden');
        }
    } catch (error) {
        console.error(error);
        loginError.textContent = "Server connection failed";
        loginError.classList.remove('hidden');
    }
});

/**
 * Fetch categories using the authorized token
 */
async function loadCategories() {
    try {
        const response = await fetch('/api/categories', {
            headers: { 'x-site-password': AUTH_TOKEN }
        });
        
        if (!response.ok) throw new Error('Unauthorized');
        
        const categories = await response.json();
        
        categorySelect.innerHTML = '<option value="" disabled selected>Select a category</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
        
    } catch (error) {
        console.error(error);
        categorySelect.innerHTML = '<option value="" disabled>Error loading data</option>';
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    successNotice.classList.add('hidden');
    errorNotice.classList.add('hidden');
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loader"></div> <span class="ml-2">Processing...</span>';

    const formData = new FormData(form);

    try {
        const response = await fetch('/api/publish', {
            method: 'POST',
            headers: {
                'x-site-password': AUTH_TOKEN
            },
            body: formData 
        });

        const result = await response.json();

        if (response.ok) {
            successLink.href = result.link;
            successNotice.classList.remove('hidden');
            form.reset();
            fileNameDisplay.textContent = '';
            categorySelect.value = ""; 
        } else {
            throw new Error(result.error || 'Unknown error occurred');
        }

    } catch (error) {
        errorText.textContent = error.message;
        errorNotice.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

window.closeNotice = (id) => document.getElementById(id).classList.add('hidden');

fileInput.addEventListener('change', (e) => {
    fileNameDisplay.textContent = e.target.files[0] ? e.target.files[0].name : '';
});
