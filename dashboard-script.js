// ===================================
// AUTHENTICATION CHECK
// ===================================
function checkAuth() {
    const user = localStorage.getItem('antigravity_user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(user);
}

// ===================================
// INITIALIZE DASHBOARD
// ===================================
let userData = null;

window.addEventListener('DOMContentLoaded', () => {
    userData = checkAuth();
    if (!userData) return;

    loadUserData();
    loadProgress();
    loadFavorites();
    loadAchievements();
    loadActivity();

    console.log('%c🚀 Dashboard Loaded Successfully!', 'color: #667eea; font-size: 14px; font-weight: bold;');
});

// ===================================
// LOAD USER DATA
// ===================================
function loadUserData() {
    const userName = userData.name || userData.email.split('@')[0];
    const userEmail = userData.email || 'user@email.com';

    // Get initials
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    // Update nav bar
    document.getElementById('nav-user-name').textContent = userName;
    document.getElementById('user-initials').textContent = initials;

    // Update dropdown
    document.getElementById('dropdown-name').textContent = userName;
    document.getElementById('dropdown-email').textContent = userEmail;
    document.getElementById('dropdown-initials').textContent = initials;

    // Calculate total learned
    const totalLearned = (userData.progress?.tier1 || 0) +
        (userData.progress?.tier2 || 0) +
        (userData.progress?.tier3 || 0) +
        (userData.progress?.tier4 || 0);

    // Update dropdown stats
    document.getElementById('dropdown-streak').textContent = userData.streak || 0;
    document.getElementById('dropdown-learned').textContent = totalLearned;
    document.getElementById('dropdown-favorites').textContent = userData.favorites?.length || 0;

    // Update main stats
    document.getElementById('total-learned').textContent = totalLearned;
    document.getElementById('total-favorites').textContent = userData.favorites?.length || 0;
    document.getElementById('total-achievements').textContent = userData.achievements?.length || 0;

    // Calculate overall progress
    const totalShortcuts = 56; // 12 + 19 + 14 + 11
    const overallProgress = Math.round((totalLearned / totalShortcuts) * 100);
    document.getElementById('overall-progress').textContent = overallProgress + '%';
}

// ===================================
// ACCOUNT DROPDOWN TOGGLE
// ===================================
function toggleAccountMenu() {
    const dropdown = document.getElementById('account-dropdown');
    const button = document.getElementById('account-btn');

    dropdown.classList.toggle('active');
    button.classList.toggle('active');
}

function closeAccountMenu() {
    const dropdown = document.getElementById('account-dropdown');
    const button = document.getElementById('account-btn');

    dropdown.classList.remove('active');
    button.classList.remove('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('account-dropdown');
    const button = document.getElementById('account-btn');

    if (dropdown && button && !button.contains(e.target) && !dropdown.contains(e.target)) {
        closeAccountMenu();
    }
});

// ===================================
// SETTINGS & HELP
// ===================================
function openSettings() {
    closeAccountMenu();
    showNotification('Settings coming soon! 🎨', 'info');
}

function openHelp() {
    closeAccountMenu();
    showNotification('Help & Support coming soon! 💬', 'info');
}

// ===================================
// LOAD PROGRESS
// ===================================
function loadProgress() {
    const tiers = [
        { id: 'tier1', total: 12 },
        { id: 'tier2', total: 19 },
        { id: 'tier3', total: 14 },
        { id: 'tier4', total: 11 }
    ];

    tiers.forEach(tier => {
        const learned = userData.progress?.[tier.id] || 0;
        const percentage = Math.round((learned / tier.total) * 100);

        document.getElementById(`${tier.id}-learned`).textContent = learned;
        document.getElementById(`${tier.id}-total`).textContent = tier.total;
        document.getElementById(`${tier.id}-percent`).textContent = percentage + '%';
        document.getElementById(`${tier.id}-progress`).style.width = percentage + '%';
    });
}

// ===================================
// LOAD FAVORITES
// ===================================
function loadFavorites() {
    const favoritesContainer = document.getElementById('favorites-list');
    const favorites = userData.favorites || [];

    if (favorites.length === 0) {
        // Empty state is already in HTML
        return;
    }

    favoritesContainer.innerHTML = '';

    favorites.forEach((fav, index) => {
        const card = document.createElement('div');
        card.className = 'favorite-card';
        card.innerHTML = `
            <div class="favorite-header">
                <div class="favorite-key">${fav.key}</div>
                <button class="btn-remove-favorite" onclick="removeFavorite(${index})" title="Remove from favorites">
                    ✕
                </button>
            </div>
            <div class="favorite-action">${fav.action}</div>
            <div class="favorite-description">${fav.description}</div>
        `;
        favoritesContainer.appendChild(card);
    });
}

// ===================================
// REMOVE FAVORITE
// ===================================
function removeFavorite(index) {
    userData.favorites.splice(index, 1);
    localStorage.setItem('antigravity_user', JSON.stringify(userData));
    loadFavorites();
    loadUserData();
    showNotification('Removed from favorites', 'info');
}

// ===================================
// LOAD ACHIEVEMENTS
// ===================================
function loadAchievements() {
    const achievementsContainer = document.getElementById('achievements-grid');
    const achievements = userData.achievements || ['🎉 Welcome Aboard!'];

    // Predefined achievements
    const allAchievements = [
        { icon: '🎉', name: 'Welcome Aboard!', condition: () => true },
        { icon: '🔥', name: 'First Steps', condition: () => getTotalLearned() >= 5 },
        { icon: '⭐', name: 'Favorite Collector', condition: () => (userData.favorites?.length || 0) >= 3 },
        { icon: '📚', name: 'Quick Learner', condition: () => getTotalLearned() >= 10 },
        { icon: '🚀', name: 'Tier 1 Master', condition: () => (userData.progress?.tier1 || 0) >= 12 },
        { icon: '💪', name: 'Dedicated', condition: () => (userData.streak || 0) >= 3 },
        { icon: '🏆', name: 'Power User', condition: () => getTotalLearned() >= 25 },
        { icon: '👑', name: 'Shortcut King', condition: () => getTotalLearned() >= 50 }
    ];

    achievementsContainer.innerHTML = '';

    allAchievements.forEach(achievement => {
        const unlocked = achievement.condition();
        const card = document.createElement('div');
        card.className = 'achievement-card';
        card.style.opacity = unlocked ? '1' : '0.3';
        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-date">${unlocked ? 'Unlocked' : 'Locked'}</div>
        `;
        achievementsContainer.appendChild(card);
    });
}

function getTotalLearned() {
    return (userData.progress?.tier1 || 0) +
        (userData.progress?.tier2 || 0) +
        (userData.progress?.tier3 || 0) +
        (userData.progress?.tier4 || 0);
}

// ===================================
// LOAD ACTIVITY
// ===================================
function loadActivity() {
    const activityFeed = document.getElementById('activity-feed');
    const activities = [];

    // Add join activity
    if (userData.joinDate) {
        const joinDate = new Date(userData.joinDate);
        activities.push({
            icon: '🎉',
            title: 'Joined Antigravity Command Center',
            time: formatTimeAgo(joinDate)
        });
    }

    // Add learning activities
    if (getTotalLearned() > 0) {
        activities.push({
            icon: '📚',
            title: `Learned ${getTotalLearned()} shortcuts`,
            time: 'Recently'
        });
    }

    // Add favorite activities
    if (userData.favorites?.length > 0) {
        activities.push({
            icon: '⭐',
            title: `Added ${userData.favorites.length} favorites`,
            time: 'Recently'
        });
    }

    activityFeed.innerHTML = '';

    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        activityFeed.appendChild(item);
    });
}

function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
    return date.toLocaleDateString();
}

// ===================================
// CONTINUE LEARNING
// ===================================
function continueLearning(tier) {
    // Save current tier preference
    localStorage.setItem('antigravity_current_tier', tier);
    window.location.href = `shortcuts-guide.html#${tier}`;
}

// ===================================
// MANAGE FAVORITES
// ===================================
function manageFavorites() {
    window.location.href = 'shortcuts-guide.html#favorites';
}

// ===================================
// LOGOUT
// ===================================
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('antigravity_remember');
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const styles = {
        info: { bg: '#3b82f6', icon: 'ℹ️' },
        success: { bg: '#10b981', icon: '✅' },
        error: { bg: '#ef4444', icon: '❌' },
        warning: { bg: '#f59e0b', icon: '⚠️' }
    };

    const style = styles[type] || styles.info;

    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${style.bg};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;

    notification.innerHTML = `${style.icon} ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);
