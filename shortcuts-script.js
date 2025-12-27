// ===================================
// PRACTICAL EXAMPLES DATABASE
// ===================================
const shortcutExamples = {
    'Ctrl + P': 'Type "index.html" to instantly open that file instead of clicking through folders',
    'Ctrl + Shift + P': 'Type "format" to format your code, or "theme" to change color theme',
    'Ctrl + D': 'Select a variable name, press Ctrl+D 3 times to edit all 3 occurrences at once',
    'Ctrl + /': 'Select multiple lines and press Ctrl+/ to comment them all out instantly',
    'Alt + ↑/↓': 'Move a function up or down in your file without cut/paste',
    'Ctrl + Space': 'Start typing a function name, press Ctrl+Space to see all available options',
    'Ctrl + .': 'See a red squiggle? Press Ctrl+. for quick fixes like adding imports',
    'F2': 'Click a variable, press F2, type new name - it renames everywhere!',
    'Ctrl + Click': 'Ctrl+Click on a function call to jump to where it\'s defined',
    'Win + D': 'Boss coming? Win+D hides everything instantly!',
    'Alt + Tab': 'Hold Alt, tap Tab to cycle through open apps',
    'git status': 'Run this before committing to see which files you\'ve changed',
    'Win + ← / →': 'Snap VS Code left, browser right for side-by-side coding',
    'Win + Shift + S': 'Select any area of screen to screenshot - perfect for bug reports',
    'Win + V': 'Access your last 25 copied items - never lose a copy again!',
    'Ctrl + Shift + L': 'Select one word, press this to select ALL matching words in file',
    'Ctrl + \\': 'Split your editor to view two files side-by-side',
    'Ctrl + Shift + F': 'Search for "TODO" across your entire project',
    'Ctrl + H': 'Replace all "var" with "let" in one go',
    'git stash': 'Save your work temporarily to switch branches without committing',
    'Ctrl + F': 'Find "function" in current file',
    'F5': 'Start debugging your code with breakpoints',
    'F9': 'Click a line number, press F9 to pause execution there',
    'Win + E': 'Opens File Explorer instantly',
    'Ctrl + K, Z': 'Enter zen mode - hides everything except your code',
    'git checkout -b feature': 'Creates a new branch called "feature" and switches to it',
    'Ctrl + Shift + K': 'Delete entire line without selecting it first',
    'Ctrl + B': 'Toggle file explorer sidebar for more screen space',
    'Ctrl + W': 'Close current tab quickly',
    'Ctrl + Shift + T': 'Oops, closed wrong tab? This reopens it!',
    'Ctrl + Tab': 'Cycle through your open tabs',
    'Ctrl + G': 'Type "42" to jump to line 42',
    'Ctrl + Shift + O': 'See all functions in file, type to filter, Enter to jump',
    'Shift + Alt + F': 'Auto-format messy code to look professional',
    'git add .': 'Stage all your changes for commit',
    'git commit -m "msg"': 'Save your changes with a message: git commit -m "Fixed login bug"',
    'git push': 'Upload your commits to GitHub/GitLab',
    'git pull': 'Download latest changes from your team',
    'Ctrl + Alt + ↑/↓': 'Edit same position on multiple lines simultaneously',
    'Win + 1/2/3': 'Win+1 opens first taskbar app, Win+2 second, etc.',
    'Win + L': 'Lock your computer when stepping away',
    'Ctrl + Shift + Esc': 'Open Task Manager to kill frozen programs',
    'Tab': 'Type "cd Doc" then Tab to auto-complete to "Documents"',
    'Ctrl + R': 'Search your command history - type "git" to find all git commands',
    'git log --oneline': 'See your last commits in a clean one-line format',
    'git diff': 'See exactly what you changed before committing',
    'git branch': 'List all your branches, * shows current one',
    'git merge branch': 'Merge "feature-branch" into current branch',
    'git reset HEAD~1': 'Undo your last commit but keep the changes',
    'F3': 'After Ctrl+F, press F3 to jump to next match',
    'Alt + Enter': 'After searching, select all matches to edit them all',
    'F10': 'When debugging, execute next line without entering functions',
    'F11': 'When debugging, step INTO a function to see what it does',
    'Win + .': 'Insert emojis anywhere: Win+. then search "rocket" 🚀',
    'Win + X': 'Quick access to system tools, Command Prompt, etc.',
    'Ctrl + = / -': 'Make text bigger/smaller in VS Code',
    'git reflog': 'Lost a commit? This shows ALL your git history',
    'git blame file': 'See who wrote each line: git blame app.js'
};

// ===================================
// USER FAVORITES SYSTEM
// ===================================
function getUserData() {
    const userData = localStorage.getItem('antigravity_user');
    return userData ? JSON.parse(userData) : null;
}

function saveFavorite(key, action, description) {
    const user = getUserData();
    if (!user) {
        showNotification('Please login to save favorites', 'warning');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return false;
    }

    if (!user.favorites) user.favorites = [];

    // Check if already favorited
    const exists = user.favorites.find(f => f.key === key);
    if (exists) {
        // Remove from favorites
        user.favorites = user.favorites.filter(f => f.key !== key);
        localStorage.setItem('antigravity_user', JSON.stringify(user));
        showNotification('Removed from favorites', 'info');
        return false;
    } else {
        // Add to favorites
        user.favorites.push({ key, action, description });
        localStorage.setItem('antigravity_user', JSON.stringify(user));
        showNotification('Added to favorites! ⭐', 'success');
        return true;
    }
}

function isFavorited(key) {
    const user = getUserData();
    if (!user || !user.favorites) return false;
    return user.favorites.some(f => f.key === key);
}

// ===================================
// ADD FAVORITES BUTTONS TO SHORTCUTS
// ===================================
function addFavoritesButtons() {
    document.querySelectorAll('.shortcut-row').forEach(row => {
        const keyCell = row.querySelector('.shortcut-key-cell');
        const actionCell = row.querySelector('.shortcut-action-cell');
        const whyCell = row.querySelector('.shortcut-why-cell');

        if (!keyCell || !actionCell) return;

        const key = keyCell.textContent.trim();
        const action = actionCell.textContent.trim();
        const description = whyCell ? whyCell.textContent.trim() : '';

        // Add favorite button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'btn-favorite';
        favoriteBtn.innerHTML = isFavorited(key) ? '⭐' : '☆';
        favoriteBtn.title = 'Add to favorites';
        favoriteBtn.onclick = (e) => {
            e.stopPropagation();
            const added = saveFavorite(key, action, description);
            favoriteBtn.innerHTML = added ? '⭐' : '☆';
        };

        // Add example button if example exists
        if (shortcutExamples[key]) {
            const exampleBtn = document.createElement('button');
            exampleBtn.className = 'btn-example';
            exampleBtn.innerHTML = '💡';
            exampleBtn.title = 'See example';
            exampleBtn.onclick = (e) => {
                e.stopPropagation();
                showExample(key, action, shortcutExamples[key]);
            };

            // Insert buttons before key cell
            keyCell.style.display = 'flex';
            keyCell.style.alignItems = 'center';
            keyCell.style.gap = '0.5rem';

            const keyText = keyCell.textContent;
            keyCell.textContent = '';

            const buttonsContainer = document.createElement('div');
            buttonsContainer.style.display = 'flex';
            buttonsContainer.style.gap = '0.25rem';
            buttonsContainer.appendChild(favoriteBtn);
            buttonsContainer.appendChild(exampleBtn);

            const keySpan = document.createElement('span');
            keySpan.textContent = keyText;
            keySpan.style.flex = '1';

            keyCell.appendChild(buttonsContainer);
            keyCell.appendChild(keySpan);
        } else {
            keyCell.style.display = 'flex';
            keyCell.style.alignItems = 'center';
            keyCell.style.gap = '0.5rem';

            const keyText = keyCell.textContent;
            keyCell.textContent = '';

            favoriteBtn.style.marginRight = '0.5rem';

            const keySpan = document.createElement('span');
            keySpan.textContent = keyText;
            keySpan.style.flex = '1';

            keyCell.appendChild(favoriteBtn);
            keyCell.appendChild(keySpan);
        }
    });

    // Add styles for buttons
    const buttonStyles = document.createElement('style');
    buttonStyles.textContent = `
        .btn-favorite, .btn-example {
            background: none;
            border: none;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0.25rem;
            transition: transform 0.2s ease;
            line-height: 1;
        }
        
        .btn-favorite:hover, .btn-example:hover {
            transform: scale(1.3);
        }
        
        .btn-favorite {
            color: #f59e0b;
        }
        
        .btn-example {
            filter: grayscale(0.3);
        }
        
        .btn-example:hover {
            filter: grayscale(0);
        }
    `;
    document.head.appendChild(buttonStyles);
}

// ===================================
// SHOW EXAMPLE MODAL
// ===================================
function showExample(key, action, example) {
    // Remove existing modal
    const existing = document.querySelector('.example-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'example-modal';
    modal.innerHTML = `
        <div class="example-modal-content">
            <button class="example-modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            <div class="example-icon">💡</div>
            <h3 class="example-title">${key}</h3>
            <p class="example-action">${action}</p>
            <div class="example-box">
                <div class="example-label">Practical Example:</div>
                <p class="example-text">${example}</p>
            </div>
            <button class="example-try-btn" onclick="this.parentElement.parentElement.remove()">Got it!</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .example-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .example-modal-content {
            background: var(--bg-secondary);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideUp 0.3s ease;
        }
        
        .example-modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: var(--text-tertiary);
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .example-modal-close:hover {
            color: var(--text-primary);
        }
        
        .example-icon {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 1rem;
        }
        
        .example-title {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.5rem;
            color: var(--accent-primary);
            text-align: center;
            margin-bottom: 0.5rem;
        }
        
        .example-action {
            text-align: center;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            font-weight: 600;
        }
        
        .example-box {
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid var(--accent-primary);
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .example-label {
            font-size: 0.875rem;
            color: var(--accent-primary);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
        }
        
        .example-text {
            color: var(--text-primary);
            line-height: 1.6;
            font-size: 1.125rem;
        }
        
        .example-try-btn {
            width: 100%;
            padding: 0.875rem;
            background: var(--gradient-1);
            border: none;
            border-radius: 0.5rem;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .example-try-btn:hover {
            transform: translateY(-2px);
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(modalStyles);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.tier-section, .category-section, .tip-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// SEARCH FUNCTIONALITY
// ===================================
function createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-wrapper">
            <input type="text" id="shortcut-search" placeholder="🔍 Search shortcuts... (Ctrl + K)" class="search-input">
            <div id="search-results" class="search-results"></div>
        </div>
    `;

    const quickNav = document.querySelector('.quick-nav .container');
    quickNav.insertBefore(searchContainer, quickNav.firstChild);

    const searchInput = document.getElementById('shortcut-search');
    const searchResults = document.getElementById('search-results');

    // Keyboard shortcut to focus search
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            searchInput.blur();
            searchResults.style.display = 'none';
        }
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const allShortcuts = [];

        // Collect all shortcuts
        document.querySelectorAll('.shortcut-row').forEach(row => {
            const key = row.querySelector('.shortcut-key-cell')?.textContent || '';
            const action = row.querySelector('.shortcut-action-cell')?.textContent || '';
            const why = row.querySelector('.shortcut-why-cell')?.textContent || '';

            if (key.toLowerCase().includes(query) ||
                action.toLowerCase().includes(query) ||
                why.toLowerCase().includes(query)) {
                allShortcuts.push({ key, action, why, element: row });
            }
        });

        // Display results
        if (allShortcuts.length > 0) {
            searchResults.innerHTML = allShortcuts.slice(0, 10).map(s => `
                <div class="search-result-item">
                    <span class="search-key">${s.key}</span>
                    <span class="search-action">${s.action}</span>
                </div>
            `).join('');
            searchResults.style.display = 'block';

            // Add click handlers
            document.querySelectorAll('.search-result-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    allShortcuts[index].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    allShortcuts[index].element.style.animation = 'highlight 1s ease';
                    searchResults.style.display = 'none';
                    searchInput.value = '';
                });
            });
        } else {
            searchResults.innerHTML = '<div class="search-no-results">No shortcuts found</div>';
            searchResults.style.display = 'block';
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Add search styles dynamically
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-container {
        flex: 1;
        max-width: 400px;
        position: relative;
    }
    
    .search-wrapper {
        position: relative;
    }
    
    .search-input {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 2rem;
        color: var(--text-primary);
        font-size: 0.875rem;
        font-family: 'Inter', sans-serif;
        transition: all 0.25s ease;
    }
    
    .search-input:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.08);
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .search-input::placeholder {
        color: var(--text-tertiary);
    }
    
    .search-results {
        position: absolute;
        top: calc(100% + 0.5rem);
        left: 0;
        right: 0;
        background: var(--bg-card);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        max-height: 400px;
        overflow-y: auto;
        display: none;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    }
    
    .search-result-item {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        cursor: pointer;
        transition: background 0.15s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .search-result-item:last-child {
        border-bottom: none;
    }
    
    .search-result-item:hover {
        background: var(--bg-card-hover);
    }
    
    .search-key {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--accent-primary);
        background: rgba(99, 102, 241, 0.1);
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        white-space: nowrap;
    }
    
    .search-action {
        color: var(--text-secondary);
        font-size: 0.875rem;
        flex: 1;
    }
    
    .search-no-results {
        padding: 1.5rem;
        text-align: center;
        color: var(--text-tertiary);
    }
    
    @keyframes highlight {
        0%, 100% {
            background: var(--bg-card);
        }
        50% {
            background: rgba(99, 102, 241, 0.2);
        }
    }
    
    @media (max-width: 768px) {
        .search-container {
            max-width: 100%;
            order: -1;
            margin-bottom: 0.5rem;
        }
    }
`;
document.head.appendChild(searchStyles);

// ===================================
// COPY TO CLIPBOARD
// ===================================
document.querySelectorAll('.shortcut-key, .shortcut-key-cell').forEach(el => {
    el.style.cursor = 'pointer';
    el.title = 'Click to copy';

    el.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = el.textContent.trim();

        navigator.clipboard.writeText(text).then(() => {
            // Show tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.style.cssText = `
                position: fixed;
                top: ${e.clientY - 40}px;
                left: ${e.clientX}px;
                background: var(--accent-success);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                font-weight: 600;
                z-index: 10000;
                pointer-events: none;
                animation: fadeInUp 0.3s ease;
            `;
            document.body.appendChild(tooltip);

            setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(-10px)';
                tooltip.style.transition = 'all 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 1500);
        });
    });
});

// ===================================
// PROGRESS INDICATOR
// ===================================
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);

    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 10000;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyles);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        document.querySelector('.progress-fill').style.width = scrolled + '%';
    });
}

// ===================================
// THEME TOGGLE (Functional)
// ===================================
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        toggle.innerHTML = '☀️';
    } else {
        toggle.innerHTML = '🌙';
    }

    toggle.title = savedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
    document.body.appendChild(toggle);

    const toggleStyles = document.createElement('style');
    toggleStyles.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: var(--gradient-1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            font-size: 1.75rem;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            transition: all var(--transition-normal);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .theme-toggle:hover {
            transform: scale(1.15) rotate(15deg);
            box-shadow: var(--shadow-glow);
        }
        
        .theme-toggle:active {
            transform: scale(0.95);
        }
        
        body.light-theme .theme-toggle {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
        }
    `;
    document.head.appendChild(toggleStyles);

    toggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');

        // Animate the transition
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';

        if (isLight) {
            toggle.innerHTML = '☀️';
            toggle.title = 'Switch to dark mode';
            localStorage.setItem('theme', 'light');

            // Celebrate with a subtle animation
            toggle.style.animation = 'spin 0.5s ease';
        } else {
            toggle.innerHTML = '🌙';
            toggle.title = 'Switch to light mode';
            localStorage.setItem('theme', 'dark');

            toggle.style.animation = 'spin 0.5s ease';
        }

        setTimeout(() => {
            toggle.style.animation = '';
        }, 500);
    });

    // Add spin animation
    const spinAnimation = document.createElement('style');
    spinAnimation.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); }
            100% { transform: rotate(360deg) scale(1); }
        }
    `;
    document.head.appendChild(spinAnimation);
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
function createBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.title = 'Back to top';
    document.body.appendChild(button);

    const buttonStyles = document.createElement('style');
    buttonStyles.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-2);
            border: none;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            visibility: hidden;
            transition: all 0.25s ease;
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
        }
        
        .back-to-top:active {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(buttonStyles);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===================================
// INITIALIZE ALL FEATURES
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    createSearchBar();
    createProgressBar();
    createThemeToggle();
    createBackToTop();
    initializeTierNavigation();
    addFavoritesButtons(); // Add favorites and examples buttons

    // Add keyboard shortcut hint
    console.log('%c🚀 Antigravity Shortcut Mastery Loaded!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Press Ctrl+K to search shortcuts', 'color: #8b5cf6; font-size: 12px;');
    console.log('%c⬅️➡️ Use arrow keys to navigate tiers', 'color: #ec4899; font-size: 12px;');
    console.log('%c⭐ Click stars to save favorites | 💡 Click bulbs for examples', 'color: #f59e0b; font-size: 12px;');
});

// ===================================
// NOTIFICATION SYSTEM (for favorites)
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

// ===================================
// TIER NAVIGATION
// ===================================
function initializeTierNavigation() {
    const tiers = [
        { id: 'tier1', name: 'TIER 1: Essential' },
        { id: 'tier2', name: 'TIER 2: High-Impact' },
        { id: 'tier3', name: 'TIER 3: Power User' },
        { id: 'tier4', name: 'TIER 4: Specialized' }
    ];

    let currentTierIndex = 0;

    const prevBtn = document.getElementById('prev-tier');
    const nextBtn = document.getElementById('next-tier');
    const tierLabel = document.getElementById('current-tier-label');

    function updateTierNavigation() {
        tierLabel.textContent = tiers[currentTierIndex].name;

        // Update button states
        prevBtn.disabled = currentTierIndex === 0;
        nextBtn.disabled = currentTierIndex === tiers.length - 1;

        // Scroll to tier
        const tierElement = document.getElementById(tiers[currentTierIndex].id);
        if (tierElement) {
            tierElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Add highlight animation
            tierElement.style.animation = 'tierHighlight 1s ease';
            setTimeout(() => {
                tierElement.style.animation = '';
            }, 1000);
        }
    }

    // Button click handlers
    prevBtn.addEventListener('click', () => {
        if (currentTierIndex > 0) {
            currentTierIndex--;
            updateTierNavigation();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentTierIndex < tiers.length - 1) {
            currentTierIndex++;
            updateTierNavigation();
        }
    });

    // Keyboard navigation (Arrow keys)
    document.addEventListener('keydown', (e) => {
        // Only if not typing in search
        if (document.activeElement.tagName === 'INPUT') return;

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentTierIndex > 0) {
                currentTierIndex--;
                updateTierNavigation();
            }
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentTierIndex < tiers.length - 1) {
                currentTierIndex++;
                updateTierNavigation();
            }
        }
    });

    // Update current tier based on scroll position
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tierIndex = tiers.findIndex(t => t.id === entry.target.id);
                if (tierIndex !== -1) {
                    currentTierIndex = tierIndex;
                    tierLabel.textContent = tiers[currentTierIndex].name;
                    prevBtn.disabled = currentTierIndex === 0;
                    nextBtn.disabled = currentTierIndex === tiers.length - 1;
                }
            }
        });
    }, { threshold: 0.3 });

    // Observe all tier sections
    tiers.forEach(tier => {
        const element = document.getElementById(tier.id);
        if (element) observer.observe(element);
    });

    // Add tier highlight animation
    const tierAnimation = document.createElement('style');
    tierAnimation.textContent = `
        @keyframes tierHighlight {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.01);
                box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
            }
        }
    `;
    document.head.appendChild(tierAnimation);
}

// ===================================
// STATISTICS COUNTER ANIMATION
// ===================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(parseInt(target));

        if (isNumber) {
            const targetNum = parseInt(target);
            let current = 0;
            const increment = targetNum / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNum) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 30);
        }
    });
}

// Run counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const hero = document.querySelector('.hero');
if (hero) {
    heroObserver.observe(hero);
}

// ===================================
// FLASHCARD MODE
// ===================================
function toggleFlashcardMode() {
    document.body.classList.toggle('flashcard-mode');
    const btn = document.querySelector('.mode-toggle-btn');
    const isModeActive = document.body.classList.contains('flashcard-mode');

    btn.classList.toggle('active');

    if (isModeActive) {
        btn.querySelector('#mode-text').textContent = 'Exit Flashcards';
        showNotification('Flashcard Mode Active: Hover/Click to reveal!', 'success');

        // Add click listeners to reveal
        document.querySelectorAll('.shortcut-key-cell').forEach(cell => {
            cell.addEventListener('click', toggleReveal);
        });
    } else {
        btn.querySelector('#mode-text').textContent = 'Flashcard Mode';

        // Remove click listeners and reset
        document.querySelectorAll('.shortcut-key-cell').forEach(cell => {
            cell.removeEventListener('click', toggleReveal);
            cell.classList.remove('revealed');
        });
    }
}

function toggleReveal(e) {
    if (document.body.classList.contains('flashcard-mode')) {
        // Find the specific key cell even if clicking children
        const cell = e.target.closest('.shortcut-key-cell');
        if (cell) cell.classList.toggle('revealed');
    }
}

// Global toggle with 'F' key
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'f' && document.activeElement.tagName !== 'INPUT') {
        toggleFlashcardMode();
    }
});

// ===================================
// PLATFORM TOGGLE (Win/Mac/Linux)
// ===================================
function switchPlatform(platform) {
    // Update active button
    document.querySelectorAll('.platform-btn').forEach(btn => {
        if (btn.dataset.platform === platform) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Save preference
    localStorage.setItem('antigravity_platform', platform);

    // Update shortcuts
    updateShortcutsForPlatform(platform);

    showNotification(`Switched to ${platform.charAt(0).toUpperCase() + platform.slice(1)} shortcuts`, 'info');
}

// Initialize platform on load
const savedPlatform = localStorage.getItem('antigravity_platform') || 'windows';
// Store original shortcuts first time
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.shortcut-key-cell, .shortcut-key, #sotd-key').forEach(el => {
        if (!el.dataset.windows) {
            el.dataset.windows = el.textContent.trim();
        }
    });

    // Apply saved platform
    if (savedPlatform !== 'windows') {
        switchPlatform(savedPlatform);
    }
});

function updateShortcutsForPlatform(platform) {
    const replacements = {
        mac: {
            'Ctrl': 'Cmd ⌘',
            'Alt': 'Opt ⌥',
            'Win': 'Cmd ⌘',
            'Backspace': 'Delete ⌫',
            'Enter': 'Return ⏎'
        },
        linux: {
            'Win': 'Super ❖',
            'Cmd': 'Ctrl',
            'Option': 'Alt'
        },
        windows: {
            // Default
        }
    };

    document.querySelectorAll('.shortcut-key-cell, .shortcut-key, #sotd-key').forEach(el => {
        // Always start from Windows baseline to avoid double conversion
        let text = el.dataset.windows || el.textContent;

        if (platform === 'mac') {
            text = text.replace(/Ctrl/g, 'Cmd ⌘')
                .replace(/Alt/g, 'Opt ⌥')
                .replace(/Win/g, 'Cmd ⌘')
                .replace(/Backspace/g, 'Delete ⌫')
                .replace(/Enter/g, 'Return ⏎');
        } else if (platform === 'linux') {
            text = text.replace(/Win/g, 'Super ❖');
        }

        // Remove icons for search/cleanliness if needed, but keeping them looks cool
        // Re-inject buttons if they existed (favorites star)
        const buttons = el.querySelector('div'); // The button container we added

        if (el.classList.contains('shortcut-key-cell')) {
            // For table cells, we need to preserve the buttons
            // Simplified: just update the text node
            Array.from(el.childNodes).forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                    node.textContent = text; // This replaces the text but leaves buttons
                } else if (node.tagName === 'SPAN') {
                    node.textContent = text;
                }
            });
        } else {
            el.textContent = text;
        }
    });
}

// ===================================
// SHORTCUT OF THE DAY
// ===================================
function nextShortcutOfDay() {
    const keys = Object.keys(shortcutExamples);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const randomExample = shortcutExamples[randomKey];

    // Find matching action from table if possible, otherwise generic
    let action = "Useful Shortcut";

    // Try to find in DOM
    const rows = document.querySelectorAll('.shortcut-row');
    for (let row of rows) {
        if (row.querySelector('.shortcut-key-cell').textContent.includes(randomKey.split(' ')[0])) {
            // Heuristic match
        }
    }

    // Animate out
    const card = document.querySelector('.sotd-content');
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';

    setTimeout(() => {
        document.getElementById('sotd-key').textContent = randomKey;
        // Update key based on current platform
        const platform = localStorage.getItem('antigravity_platform') || 'windows';
        updateShortcutsForPlatform(platform);

        document.getElementById('sotd-description').textContent = randomExample;
        document.getElementById('sotd-action').textContent = "Featured Shortcut";

        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);
}

// ===================================
// PDF DOWNLOAD
// ===================================
function downloadPDF() {
    showNotification('Generating Cheat Sheet...', 'info');

    // Add temporary print class
    document.body.classList.add('printing');

    setTimeout(() => {
        window.print();
        document.body.classList.remove('printing');
    }, 500);
}
