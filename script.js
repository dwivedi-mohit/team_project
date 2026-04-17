const circleContainer = document.getElementById('circleContainer');
const loginForm = document.getElementById('loginForm');
const loginButton = document.querySelector('.login-btn');
const themeButtons = document.querySelectorAll('.theme-btn');
const messageBox = document.getElementById('message');

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('selectedTheme', theme);
}

if (themeButtons.length) {
    themeButtons.forEach(button => {
        button.addEventListener('click', () => setTheme(button.dataset.theme));
    });

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) setTheme(savedTheme);
}

if (circleContainer) {
    document.addEventListener('mousemove', event => {
        const x = (event.clientX / window.innerWidth - 0.5) * 24;
        const y = (event.clientY / window.innerHeight - 0.5) * 24;
        circleContainer.style.transform = `translate(${x}px, ${y}px)`;
    });
}

function showMessage(text, success = true) {
    if (messageBox) {
        messageBox.textContent = text;
        messageBox.style.color = success ? '#38bdf8' : '#f87171';
    }
}

function clearMessage() {
    if (messageBox) {
        messageBox.textContent = '';
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const passwordInput = document.getElementById('password');
if (passwordInput) {
    const toggleButton = document.querySelector('.toggle-password');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            toggleButton.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
        });
    }
}

if (loginForm) {
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();

        clearMessage();

        if (!email || !password) {
            showMessage('Please fill in both fields.', false);
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', false);
            return;
        }

        loginButton.disabled = true;
        loginButton.textContent = 'Signing in...';
        loginButton.style.cursor = 'wait';

        setTimeout(() => {
            showMessage('Welcome back! Redirecting...', true);
            loginButton.textContent = 'Welcome back!';
            loginButton.style.background = 'linear-gradient(135deg, #38bdf8, #7c3aed)';
        }, 650);

        setTimeout(() => {
            loginButton.textContent = 'LOGIN';
            loginButton.disabled = false;
            loginButton.style.cursor = 'pointer';
            loginButton.style.background = '';
            loginForm.reset();
        }, 1800);
    });
}

document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const provider = icon.classList.contains('facebook') ? 'Facebook' : icon.classList.contains('twitter') ? 'X' : 'Google';
        showMessage(`Redirecting to ${provider}...`, true);
    });
});
