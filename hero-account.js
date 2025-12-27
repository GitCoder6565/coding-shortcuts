// ===================================
// HERO ACCOUNT BUTTON FUNCTIONALITY
// ===================================
function toggleAccountMenuHero() {
    const dropdown = document.getElementById('account-dropdown-hero');
    const button = document.getElementById('account-btn-hero');

    dropdown.classList.toggle('active');
    button.classList.toggle('active');
}

function closeAccountMenuHero() {
    const dropdown = document.getElementById('account-dropdown-hero');
    const button = document.getElementById('account-btn-hero');

    dropdown.classList.remove('active');
    button.classList.remove('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('account-dropdown-hero');
    const button = document.getElementById('account-btn-hero');

    if (dropdown && button && !button.contains(e.target) && !dropdown.contains(e.target)) {
        closeAccountMenuHero();
    }
});

// Load user data into hero account button
function loadHeroUserData() {
    const userData = localStorage.getItem('antigravity_user');

    if (userData) {
        const user = JSON.parse(userData);
        const userName = user.name || user.email.split('@')[0];
        const userEmail = user.email || 'user@email.com';
        const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

        // Update button
        document.getElementById('nav-user-name-hero').textContent = userName;
        document.getElementById('user-initials-hero').textContent = initials;

        // Update dropdown
        document.getElementById('dropdown-name-hero').textContent = userName;
        document.getElementById('dropdown-email-hero').textContent = userEmail;
        document.getElementById('dropdown-initials-hero').textContent = initials;

        // Show logout button, hide login button
        document.getElementById('logout-btn-hero').style.display = 'flex';
        document.getElementById('logout-divider-hero').style.display = 'block';
        document.getElementById('login-link-hero').style.display = 'none';
    }
}

function handleLogoutHero() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('antigravity_remember');
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Initialize hero account button on page load
window.addEventListener('DOMContentLoaded', () => {
    loadHeroUserData();
});
