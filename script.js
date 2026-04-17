// Enhanced Login Form with JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const loginBtn = document.querySelector('.login-btn');
    const circleContainer = document.getElementById('circleContainer');

    // Create animated circles
    function createCircles() {
        for (let i = 0; i < 5; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.style.width = (50 + i * 50) + 'px';
            circle.style.height = (50 + i * 50) + 'px';
            circle.style.left = -(25 + i * 25) + 'px';
            circle.style.top = -(25 + i * 25) + 'px';
            circleContainer.appendChild(circle);
        }
    }
    createCircles();

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Real-time email validation
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ff6b6b';
            showError('Please enter a valid email address');
        } else {
            this.style.borderColor = '#4CAF50';
            clearError();
        }
    });

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const strength = getPasswordStrength(this.value);
        updatePasswordIndicator(strength);
    });

    function getPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;
        return strength;
    }

    function updatePasswordIndicator(strength) {
        let message = '';
        let color = '';
        switch(strength) {
            case 0:
            case 1:
                message = 'Weak';
                color = '#ff6b6b';
                break;
            case 2:
            case 3:
                message = 'Medium';
                color = '#ffd93d';
                break;
            case 4:
            case 5:
                message = 'Strong';
                color = '#4CAF50';
                break;
        }
        console.log('Password Strength: ' + message);
    }

    // Add password visibility toggle
    addPasswordToggle();

    function addPasswordToggle() {
        const passwordGroup = passwordInput.parentElement;
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
        toggleBtn.classList.add('password-toggle');
        toggleBtn.style.cssText = 'position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #666;';
        
        passwordGroup.style.position = 'relative';
        passwordGroup.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
            }
        });
    }

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        // Validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            showError('Invalid email format');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        // Show loading state
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';

        // Simulate API call
        setTimeout(function() {
            clearError();
            alert('Login successful!\nEmail: ' + email);
            loginForm.reset();
            loginBtn.disabled = false;
            loginBtn.textContent = 'LOGIN';
        }, 1500);
    });

    // Social login handlers
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const provider = this.classList[1];
            console.log('Logging in with: ' + provider);
            alert('Redirecting to ' + provider + ' login...');
        });
    });

    // Forgot password
    document.querySelector('.forget-password a').addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Enter your email address:');
        if (email) {
            if (validateEmail(email)) {
                alert('Password reset link sent to ' + email);
            } else {
                alert('Please enter a valid email');
            }
        }
    });

    // Sign up link
    document.querySelector('.signup-link a').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Redirecting to Sign Up page...');
    });

    // Error handling
    function showError(message) {
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.style.cssText = 'color: #ff6b6b; font-size: 12px; margin-top: 10px; text-align: center;';
            loginForm.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function clearError() {
        const errorDiv = document.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = '';
        }
    }

    // Input focus effects
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#007bff';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '#ddd';
        });
    });
});
