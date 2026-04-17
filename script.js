// Theme Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all theme buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Get saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    
    // Apply saved theme on page load
    applyTheme(savedTheme);
    
    // Add event listeners to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
            localStorage.setItem('selectedTheme', theme);
        });
    });
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login form submitted! (This is a demo)');
            this.reset();
        });
    }
});

// Function to apply theme
function applyTheme(theme) {
    const body = document.body;
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Remove all theme classes
    body.classList.remove('theme-dark', 'theme-blue', 'theme-purple');
    
    // Remove active class from all buttons
    themeButtons.forEach(btn => btn.classList.remove('active'));
    
    // Apply new theme
    if (theme !== 'light') {
        body.classList.add(`theme-${theme}`);
    }
    
    // Add active class to current theme button
    const activeButton = document.querySelector(`[data-theme="${theme}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Keyboard shortcut: Press 'T' to cycle through themes
document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 't') {
        const themes = ['light', 'dark', 'blue', 'purple'];
        const currentTheme = localStorage.getItem('selectedTheme') || 'light';
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        
        applyTheme(nextTheme);
        localStorage.setItem('selectedTheme', nextTheme);
    }
});

// Add smooth animations to circles
function createAnimatedCircles() {
    const circleContainer = document.getElementById('circleContainer');
    if (circleContainer) {
        // Additional circle animations can be added here
    }
}

createAnimatedCircles();
