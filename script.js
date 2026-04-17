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
