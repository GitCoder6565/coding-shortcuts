// ===================================
// INTERACTIVE WALKTHROUGH / TOUR
// ===================================

const tourSteps = [
    {
        element: '.hero-title',
        title: '🚀 Welcome to Shortcut Mastery',
        description: 'Your command center for mastering development shortcuts. Let\'s take a quick tour of the features!',
        position: 'bottom'
    },
    {
        element: '#shortcut-search',
        title: '🔍 Global Search',
        description: 'Press <kbd>Ctrl + K</kbd> anywhere to start searching. You can search by key, description, or action.',
        position: 'bottom'
    },
    {
        element: '.platform-toggle',
        title: '🪟 Multi-Platform Support',
        description: 'Switch between Windows, Mac, and Linux. The entire guide updates instantly to show the correct keys for your OS.',
        position: 'bottom'
    },
    {
        element: '.shortcut-of-day',
        title: '💡 Shortcut of the Day',
        description: 'Learn a new powerful shortcut every day. Click "Random" to discover hidden gems.',
        position: 'top'
    },
    {
        element: '.mode-toggle-btn',
        title: '🎴 Flashcard Mode',
        description: 'Press <kbd>F</kbd> to toggle Flashcard Mode. It blurs the keys so you can test your memory!',
        position: 'top'
    },
    {
        element: '.tier-navigator',
        title: '📈 Tiered Learning',
        description: 'Start with Tier 1 (Essential) and work your way up to Tier 4 (Specialized). Use arrow keys to navigate tiers.',
        position: 'bottom'
    },
    {
        element: '.hero-account-btn',
        title: '👤 User Profile',
        description: 'Login to track your progress, save favorites, and earn achievements. Your data is saved automatically.',
        position: 'left'
    }
];

let currentStepIndex = 0;
let tourOverlay;
let tourPopover;

function startWalkthrough() {
    currentStepIndex = 0;

    // Create UI elements if they don't exist
    if (!document.getElementById('driver-overlay')) {
        createTourUI();
    }

    document.getElementById('driver-overlay').classList.add('active');
    showStep(currentStepIndex);
}

function createTourUI() {
    // Overlay
    tourOverlay = document.createElement('div');
    tourOverlay.id = 'driver-overlay';
    tourOverlay.className = 'driver-overlay';
    document.body.appendChild(tourOverlay);

    // Popover
    tourPopover = document.createElement('div');
    tourPopover.id = 'driver-popover';
    tourPopover.className = 'driver-popover';
    document.body.appendChild(tourPopover);
}

function showStep(index) {
    if (index < 0 || index >= tourSteps.length) {
        endWalkthrough();
        return;
    }

    const step = tourSteps[index];
    const element = document.querySelector(step.element);

    if (!element) {
        // Skip step if element not found (e.g. mobile view)
        showStep(index + 1);
        return;
    }

    // Scroll to element
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // waiting brief moment for scroll
    setTimeout(() => {
        // Highlight element
        document.querySelectorAll('.driver-highlighted-element').forEach(el => {
            el.classList.remove('driver-highlighted-element');
        });
        element.classList.add('driver-highlighted-element');

        // Update Popover Content
        tourPopover.innerHTML = `
            <div class="driver-popover-title">${step.title}</div>
            <div class="driver-popover-description">${step.description}</div>
            <div class="driver-popover-footer">
                <div class="driver-steps-count">${index + 1} of ${tourSteps.length}</div>
                <div class="driver-buttons">
                    ${index > 0 ? `<button class="driver-btn driver-btn-prev" onclick="prevStep()">Back</button>` : ''}
                    <button class="driver-btn driver-btn-next" onclick="nextStep()">${index === tourSteps.length - 1 ? 'Finish' : 'Next'}</button>
                </div>
            </div>
            <button class="driver-btn driver-btn-skip" onclick="endWalkthrough()" style="position: absolute; top: 10px; right: 10px;">✕</button>
        `;

        // Position Popover
        positionPopover(element, tourPopover, step.position);
        tourPopover.classList.add('active');
    }, 400);
}

function positionPopover(target, popover, position) {
    const targetRect = target.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const scrollY = window.scrollY;

    let top, left;
    const gap = 15;

    switch (position) {
        case 'top':
            top = targetRect.top + scrollY - popoverRect.height - gap;
            left = targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2);
            popover.className = 'driver-popover top';
            break;
        case 'bottom':
            top = targetRect.bottom + scrollY + gap;
            left = targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2);
            popover.className = 'driver-popover bottom';
            break;
        case 'left':
            top = targetRect.top + scrollY + (targetRect.height / 2) - (popoverRect.height / 2);
            left = targetRect.left - popoverRect.width - gap;
            popover.className = 'driver-popover left'; // Add css for left arrow if needed
            break;
        case 'right':
            top = targetRect.top + scrollY + (targetRect.height / 2) - (popoverRect.height / 2);
            left = targetRect.right + gap;
            popover.className = 'driver-popover right';
            break;
    }

    // Boundary checks (basic)
    if (left < 10) left = 10;
    if (left + popoverRect.width > window.innerWidth - 10) left = window.innerWidth - popoverRect.width - 10;

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
}

function nextStep() {
    currentStepIndex++;
    showStep(currentStepIndex);
}

function prevStep() {
    currentStepIndex--;
    showStep(currentStepIndex);
}

function endWalkthrough() {
    document.querySelectorAll('.driver-highlighted-element').forEach(el => {
        el.classList.remove('driver-highlighted-element');
    });

    if (tourPopover) tourPopover.classList.remove('active');
    if (tourOverlay) tourOverlay.classList.remove('active');

    showNotification('Tour Completed! Happy Coding! 🚀', 'success');
}

// Attach to help functions
// Overwrite the existing openHelp function from previous scripts
window.openHelp = function () {
    // If account menu is open, close it
    if (typeof closeAccountMenu !== 'undefined') closeAccountMenu();
    if (typeof closeAccountMenuHero !== 'undefined') closeAccountMenuHero();

    startWalkthrough();
};
