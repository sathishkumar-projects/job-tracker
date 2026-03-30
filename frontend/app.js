const API = 'https://job-tracker-oyd7.onrender.com/api';

// Show/Hide pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// Register
async function register() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const res = await fetch(`${API}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (data.token) {
        alert('Registration successful! Please login.');
        showPage('login-page');
    } else {
        alert(data.error || 'Registration failed!');
    }
}

// Login
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const res = await fetch(`${API}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem('token', data.token);
        showPage('dashboard-page');
        loadJobs();
    } else {
        alert(data.error || 'Login failed!');
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    showPage('login-page');
}

// Get Token
function getToken() {
    return localStorage.getItem('token');
}

// Load Jobs
async function loadJobs() {
    const res = await fetch(`${API}/jobs/`, {
        headers: { 'Authorization': `Token ${getToken()}` }
    });

    const data = await res.json();
    const jobsList = document.getElementById('jobs-list');

    if (data.length === 0) {
        jobsList.innerHTML = '<p style="color:#7f8c8d">No jobs added yet!</p>';
        return;
    }

    jobsList.innerHTML = data.map(job => `
        <div class="job-card">
            <div class="job-info">
                <h3>${job.company_name}</h3>
                <p>${job.job_role} • ${job.applied_date}</p>
                ${job.notes ? `<p>${job.notes}</p>` : ''}
            </div>
            <span class="badge ${job.status}">${job.status}</span>
        </div>
    `).join('');
}

// Add Job
async function addJob() {
    const company_name = document.getElementById('company-name').value;
    const job_role = document.getElementById('job-role').value;
    const status = document.getElementById('job-status').value;
    const notes = document.getElementById('job-notes').value;

    const res = await fetch(`${API}/jobs/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getToken()}`
        },
        body: JSON.stringify({ company_name, job_role, status, notes })
    });

    const data = await res.json();

    if (data.id) {
        alert('Job added successfully!');
        document.getElementById('company-name').value = '';
        document.getElementById('job-role').value = '';
        document.getElementById('job-notes').value = '';
        loadJobs();
    } else {
        alert('Failed to add job!');
    }
}

// AI Suggestions
async function getAISuggestions() {
    const job_description = document.getElementById('job-description').value;

    if (!job_description) {
        alert('Please paste a job description first!');
        return;
    }

    const aiResult = document.getElementById('ai-result');
    aiResult.style.display = 'block';
    aiResult.textContent = 'Getting AI suggestions...';

    const res = await fetch(`${API}/ai-suggest/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getToken()}`
        },
        body: JSON.stringify({ job_description })
    });

    const data = await res.json();
    aiResult.textContent = data.suggestions || 'No suggestions received!';
}

// Check if already logged in
if (getToken()) {
    showPage('dashboard-page');
    loadJobs();
}