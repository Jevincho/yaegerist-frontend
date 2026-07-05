// ============================================
// LOGIN PAGE JAVASCRIPT WITH JQUERY
// ============================================

$(document).ready(function() {
    
    // ============================================
    // FORM VALIDATION & SUBMISSION
    // ============================================
    
    $('form').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('input[type="email"]').val();
        const password = $('input[type="password"]').val();
        
        // Validasi
        if (!validateEmail(email)) {
            showNotification('Email tidak valid!', 'error');
            $('input[type="email"]').addClass('error-shake');
            setTimeout(() => $('input[type="email"]').removeClass('error-shake'), 500);
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password minimal 6 karakter!', 'error');
            $('input[type="password"]').addClass('error-shake');
            setTimeout(() => $('input[type="password"]').removeClass('error-shake'), 500);
            return;
        }
        
        // Simulasi login
        loginUser(email, password);
    });
    
    // ============================================
    // INPUT ANIMATIONS
    // ============================================
    
    $('.input-box input').on('focus', function() {
        $(this).parent().addClass('focused');
        $(this).parent().find('i').css({
            'color': '#667eea',
            'transform': 'scale(1.2)',
            'transition': 'all 0.3s ease'
        });
    });
    
    $('.input-box input').on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
        $(this).parent().find('i').css({
            'color': '#999',
            'transform': 'scale(1)'
        });
    });
    
    // ============================================
    // PASSWORD VISIBILITY TOGGLE
    // ============================================
    
    function addPasswordToggle() {
        const passwordInput = $('input[type="password"]');
        const toggleBtn = $('<span class="password-toggle">👁️</span>');
        
        toggleBtn.css({
            'position': 'absolute',
            'right': '50px',
            'top': '50%',
            'transform': 'translateY(-50%)',
            'cursor': 'pointer',
            'font-size': '20px',
            'z-index': '10'
        });
        
        passwordInput.parent().css('position', 'relative');
        passwordInput.parent().append(toggleBtn);
        
        toggleBtn.on('click', function() {
            const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
            passwordInput.attr('type', type);
            $(this).text(type === 'password' ? '👁️' : '🙈');
        });
    }
    
    addPasswordToggle();
    
    // ============================================
    // BUTTON EFFECTS
    // ============================================
    
    $('.btn').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.05)',
                'box-shadow': '0 5px 20px rgba(102, 126, 234, 0.4)'
            });
        },
        function() {
            $(this).css({
                'transform': 'scale(1)',
                'box-shadow': 'none'
            });
        }
    );
    
    // ============================================
    // LOGIN FUNCTION
    // ============================================
    
    function loginUser(email, password) {
        // Show loading
        $('.btn').text('Loading...').prop('disabled', true);
        
        // Simulasi API call
        setTimeout(() => {
            // Create user object
            const user = new User(email, password);
            user.login();
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user.getInfo()));
            
            showNotification('Login berhasil! Redirecting...', 'success');
            
            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = '../PageAwal/project.html';
            }, 1000);
            
        }, 1500);
    }
    
    // ============================================
    // NOTIFICATION FUNCTION
    // ============================================
    
    function showNotification(message, type) {
        const notification = $(`
            <div class="notification notification-${type}">
                <span>${message}</span>
            </div>
        `);
        
        notification.css({
            'position': 'fixed',
            'top': '20px',
            'right': '20px',
            'padding': '15px 25px',
            'background': type === 'success' ? '#4CAF50' : '#f44336',
            'color': 'white',
            'border-radius': '5px',
            'box-shadow': '0 4px 15px rgba(0,0,0,0.2)',
            'z-index': '9999',
            'animation': 'slideInRight 0.3s ease'
        });
        
        $('body').append(notification);
        
        setTimeout(() => {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    // ============================================
    // AUTO-FILL FROM LOCALSTORAGE
    // ============================================
    
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        $('input[type="email"]').val(savedEmail);
    }
    
    // Remember me checkbox
    function addRememberMe() {
        const checkbox = $(`
            <div class="remember-me" style="margin: 10px 0;">
                <input type="checkbox" id="remember" />
                <label for="remember" style="margin-left: 5px; cursor: pointer;">Ingat Saya</label>
            </div>
        `);
        
        $('.input-box').last().after(checkbox);
        
        $('#remember').on('change', function() {
            if ($(this).is(':checked')) {
                const email = $('input[type="email"]').val();
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }
        });
    }
    
    addRememberMe();
    
    // ============================================
    // FORM ANIMATIONS ON LOAD
    // ============================================
    
    $('form').css({
        'opacity': '0',
        'transform': 'translateY(30px)'
    }).animate({
        opacity: 1
    }, 600);
    
    $('form').css('transform', 'translateY(0)');
    
    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    
    $(document).on('keydown', function(e) {
        // Enter to submit
        if (e.key === 'Enter' && $('input').is(':focus')) {
            $('form').submit();
        }
    });
});

// ============================================
// VALIDATION FUNCTION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// USER CLASS (if not loaded from main.js)
// ============================================

if (typeof User === 'undefined') {
    class User {
        constructor(email, password, name = '') {
            this.email = email;
            this.password = password;
            this.name = name;
            this.loginTime = null;
            this.isLoggedIn = false;
        }
        
        login() {
            this.loginTime = new Date();
            this.isLoggedIn = true;
            return true;
        }
        
        getInfo() {
            return {
                email: this.email,
                name: this.name,
                loginTime: this.loginTime,
                isLoggedIn: this.isLoggedIn
            };
        }
    }
}
