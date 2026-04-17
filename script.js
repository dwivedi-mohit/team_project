<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const message = document.getElementById('message');
    const socialIcons = document.querySelectorAll('.social-icon');
    const circleContainer = document.getElementById('circleContainer');

    for (let i = 0; i < 5; i += 1) {
        const circle = document.createElement('div');
        circle.classList.add('bg-circle');
        circle.style.left = `${10 + i * 16}%`;
        circle.style.top = `${5 + i * 12}%`;
        circleContainer.appendChild(circle);
    }

    togglePassword.addEventListener('click', () => {
        const isPasswordVisible = passwordInput.type === 'text';
        passwordInput.type = isPasswordVisible ? 'password' : 'text';
        togglePassword.innerHTML = isPasswordVisible
            ? '<i class="fa-solid fa-eye"></i>'
            : '<i class="fa-solid fa-eye-slash"></i>';
    });

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const emailValue = document.getElementById('email').value.trim();
        const passwordValue = passwordInput.value.trim();

        if (!emailValue || !passwordValue) {
            updateMessage('Please enter both email and password.', 'error');
            return;
        }

        if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
            updateMessage('That email address looks invalid. Please try again.', 'error');
            return;
        }

        updateMessage('Login successful! Redirecting to your dashboard…', 'success');
        setTimeout(() => {
            updateMessage('Welcome back! Ready for a secure session.', 'success');
        }, 1600);
    });

    socialIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const platform = icon.dataset.provider;
            updateMessage(`Social login for ${platform} is not available yet.`, 'error');
        });
    });

    function updateMessage(text, type) {
        message.textContent = text;
        message.className = `message ${type}`;
    }
});
=======
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
>>>>>>> 417384d8eb8d85726336f5dbf6d78049e33e2fba
