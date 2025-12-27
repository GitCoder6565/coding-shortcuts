// ===================================
// FORM SWITCHING
// ===================================
function switchForm(formType) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (formType === 'signup') {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    }
}

// ===================================
// LOGIN HANDLER
// ===================================
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Create user session
        const user = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString(),
            progress: {
                tier1: 0,
                tier2: 0,
                tier3: 0,
                tier4: 0
            },
            favorites: [],
            achievements: []
        };

        // Store in localStorage
        localStorage.setItem('antigravity_user', JSON.stringify(user));
        if (rememberMe) {
            localStorage.setItem('antigravity_remember', 'true');
        }

        // Show success message
        showNotification('Welcome back! Redirecting...', 'success');

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
}

// ===================================
// SIGNUP HANDLER
// ===================================
function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Create new user
        const user = {
            name: name,
            email: email,
            joinDate: new Date().toISOString(),
            progress: {
                tier1: 0,
                tier2: 0,
                tier3: 0,
                tier4: 0
            },
            favorites: [],
            achievements: ['🎉 Welcome Aboard!'],
            streak: 0
        };

        // Store in localStorage
        localStorage.setItem('antigravity_user', JSON.stringify(user));

        // Show success message
        showNotification('Account created! Welcome to Antigravity! 🚀', 'success');

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 1500);
}

// ===================================
// SOCIAL LOGIN HANDLER
// ===================================
function handleSocialLogin(provider) {
    showNotification(`Connecting to ${provider}...`, 'info');

    // Simulate OAuth flow
    setTimeout(() => {
        const user = {
            name: `${provider} User`,
            email: `user@${provider}.com`,
            provider: provider,
            loginTime: new Date().toISOString(),
            progress: {
                tier1: 0,
                tier2: 0,
                tier3: 0,
                tier4: 0
            },
            favorites: [],
            achievements: ['🎉 Welcome Aboard!']
        };

        localStorage.setItem('antigravity_user', JSON.stringify(user));
        showNotification(`Connected with ${provider}! Redirecting...`, 'success');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

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
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

    notification.innerHTML = `${style.icon} ${message}`;

    document.body.appendChild(notification);

    // Add animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// CHECK EXISTING SESSION
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('antigravity_user');
    const remember = localStorage.getItem('antigravity_remember');

    if (user && remember === 'true') {
        showNotification('Session found! Redirecting...', 'info');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + L to switch to login
        if (e.altKey && e.key === 'l') {
            e.preventDefault();
            switchForm('login');
        }
        // Alt + S to switch to signup
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            switchForm('signup');
        }
    });

    console.log('%c🚀 Antigravity Login System Ready', 'color: #667eea; font-size: 14px; font-weight: bold;');
    console.log('%c💡 Keyboard shortcuts: Alt+L (Login) | Alt+S (Signup)', 'color: #8b5cf6; font-size: 12px;');
});
