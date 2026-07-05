// ============================================
// REGISTER PAGE JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('form');
    const nameInput = document.querySelector('input[placeholder="Nama Lengkap"]');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const confirmPasswordInput = document.querySelectorAll('input[type="password"]')[1];
    
    // ============================================
    // FORM SUBMISSION
    // ============================================
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : password;
            
            // Validasi
            if (!validateForm(name, email, password, confirmPassword)) {
                return;
            }
            
            // Register user
            registerUser(name, email, password);
        });
    }
    
    // ============================================
    // PASSWORD STRENGTH INDICATOR
    // ============================================
    
    if (passwordInput) {
        const strengthBar = document.createElement('div');
        strengthBar.className = 'password-strength-bar';
        strengthBar.style.cssText = `
            width: 0%;
            height: 4px;
            margin-top: 5px;
            border-radius: 2px;
            transition: all 0.3s ease;
        `;
        
        const strengthText = document.createElement('p');
        strengthText.className = 'password-strength-text';
        strengthText.style.cssText = `
            font-size: 12px;
            margin-top: 5px;
            color: #666;
        `;
        
        passwordInput.parentElement.appendChild(strengthBar);
        passwordInput.parentElement.appendChild(strengthText);
        
        passwordInput.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            updateStrengthIndicator(strengthBar, strengthText, strength);
        });
    }
    
    // ============================================
    // REAL-TIME VALIDATION
    // ============================================
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showFieldError(this, 'Email tidak valid');
            } else {
                clearFieldError(this);
            }
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            if (this.value && this.value !== passwordInput.value) {
                showFieldError(this, 'Password tidak cocok');
            } else {
                clearFieldError(this);
            }
        });
    }
    
    // ============================================
    // INPUT ANIMATIONS
    // ============================================
    
    const inputs = document.querySelectorAll('.input-box input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'all 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function validateForm(name, email, password, confirmPassword) {
    if (name.length < 3) {
        showToast('Nama minimal 3 karakter', 'error');
        return false;
    }
    
    if (!validateEmail(email)) {
        showToast('Email tidak valid', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showToast('Password minimal 6 karakter', 'error');
        return false;
    }
    
    if (password !== confirmPassword) {
        showToast('Password tidak cocok', 'error');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    const levels = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
    const colors = ['#f44336', '#ff9800', '#ffc107', '#8bc34a', '#4caf50'];
    
    return {
        score: strength,
        level: levels[strength - 1] || 'Sangat Lemah',
        color: colors[strength - 1] || '#f44336',
        percentage: (strength / 5) * 100
    };
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

function updateStrengthIndicator(bar, text, strength) {
    bar.style.width = strength.percentage + '%';
    bar.style.backgroundColor = strength.color;
    text.textContent = 'Kekuatan Password: ' + strength.level;
    text.style.color = strength.color;
}

function showFieldError(input, message) {
    input.style.borderColor = '#f44336';
    
    let errorElement = input.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #f44336;
            font-size: 12px;
            margin-top: 5px;
        `;
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(input) {
    input.style.borderColor = '';
    const errorElement = input.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// REGISTER FUNCTION
// ============================================

function registerUser(name, email, password) {
    const submitBtn = document.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Mendaftar...';
    submitBtn.disabled = true;
    
    // Simulasi API call
    setTimeout(() => {
        // Create user object
        const user = {
            name: name,
            email: email,
            password: password,
            registeredAt: new Date().toISOString()
        };
        
        // Save to localStorage
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            showToast('Email sudah terdaftar!', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        showToast('Registrasi berhasil! Redirecting...', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'Login.html';
        }, 1500);
        
    }, 1500);
}

// ============================================
// AUTO-GENERATE USERNAME (optional)
// ============================================

function generateUsername(name, email) {
    const namePart = name.toLowerCase().replace(/\s+/g, '');
    const emailPart = email.split('@')[0];
    return namePart || emailPart;
}
