const circleContainer = document.getElementById('circleContainer');
const loginForm = document.getElementById('loginForm');
const loginButton = document.querySelector('.login-btn');
const themeButtons = document.querySelectorAll('.theme-btn');
const messageBox = document.getElementById('message');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const tipPanel = document.getElementById('tipPanel');
const greetingText = document.getElementById('greeting');
const rememberMeCheckbox = document.getElementById('rememberMe');

const securityTips = [
    'Longer passwords are stronger: aim for 12+ characters.',
    'Include numbers and symbols to improve login security.',
    'Unique passphrases are easier to remember and harder to crack.',
    'Enable browser remember only when using a private device.',
    'Themes help reduce eye strain while you work late.'
];

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('selectedTheme', theme);
    themeButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.theme === theme);
    });
}

function updateGreeting() {
    if (!greetingText) return;
    const hour = new Date().getHours();
    const suffix = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    greetingText.textContent = `Good ${suffix}! Secure access awaits.`;
}

function getRandomTip() {
    if (!tipPanel) return;
    const tip = securityTips[Math.floor(Math.random() * securityTips.length)];
    tipPanel.textContent = `Tip: ${tip}`;
}

function evaluatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
}

function updatePasswordStrength() {
    if (!strengthBar || !strengthText || !passwordInput) return;
    const password = passwordInput.value;
    const score = evaluatePasswordStrength(password);
    strengthBar.className = '';
    let label = 'Type a password to test strength.';
    if (!password) {
        strengthBar.style.width = '0';
        strengthText.textContent = label;
        return;
    }

    if (score <= 2) {
        strengthBar.classList.add('weak');
        label = 'Weak — add more characters or symbols.';
    } else if (score <= 4) {
        strengthBar.classList.add('fair');
        label = 'Fair — add uppercase and numbers.';
    } else if (score === 5) {
        strengthBar.classList.add('good');
        label = 'Good — almost there, try a symbol.';
    } else {
        strengthBar.classList.add('strong');
        label = 'Strong password! Ready to go.';
    }
    strengthText.textContent = label;
}

function restoreRememberedEmail() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail && document.getElementById('email')) {
        document.getElementById('email').value = savedEmail;
        if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
    }
}

if (themeButtons.length) {
    themeButtons.forEach(button => {
        button.addEventListener('click', () => setTheme(button.dataset.theme));
    });

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) setTheme(savedTheme);
    else setTheme('theme-dark');
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

    passwordInput.addEventListener('input', updatePasswordStrength);
    updatePasswordStrength();
}

restoreRememberedEmail();
getRandomTip();
updateGreeting();

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

        if (rememberMeCheckbox && rememberMeCheckbox.checked) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        loginButton.disabled = true;
        loginButton.textContent = 'Signing in...';
        loginButton.style.cursor = 'wait';

        setTimeout(() => {
            showMessage('Welcome back! Redirecting...', true);
            loginButton.textContent = 'Welcome back!';
            loginButton.style.background = 'linear-gradient(135deg, #38bdf8, #7c3aed)';
            getRandomTip();
        }, 650);

        setTimeout(() => {
            loginButton.textContent = 'LOGIN';
            loginButton.disabled = false;
            loginButton.style.cursor = 'pointer';
            loginButton.style.background = '';
            loginForm.reset();
            updatePasswordStrength();
        }, 1800);
    });
}

document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const provider = icon.classList.contains('facebook') ? 'Facebook' : icon.classList.contains('twitter') ? 'X' : 'Google';
        showMessage(`Redirecting to ${provider}...`, true);
    });
});
