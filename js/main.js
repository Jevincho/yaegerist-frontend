// ============================================
// MAIN JAVASCRIPT - EVENT HANDLERS & DOM MANIPULATION
// ============================================

// Class untuk User Management
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
        console.log(`${this.email} logged in at ${this.loginTime}`);
        return true;
    }

    logout() {
        this.isLoggedIn = false;
        console.log(`${this.email} logged out`);
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

// Class untuk Progress Tracker
class ProgressTracker {
    constructor(studentName) {
        this.studentName = studentName;
        this.belajarProgress = 0;
        this.berlatihProgress = 0;
        this.bertandingProgress = 0;
    }

    updateProgress(type, value) {
        switch(type) {
            case 'belajar':
                this.belajarProgress = Math.min(100, value);
                break;
            case 'berlatih':
                this.berlatihProgress = Math.min(100, value);
                break;
            case 'bertanding':
                this.bertandingProgress = Math.min(100, value);
                break;
        }
        this.displayProgress();
    }

    displayProgress() {
        return {
            name: this.studentName,
            belajar: this.belajarProgress + '%',
            berlatih: this.berlatihProgress + '%',
            bertanding: this.bertandingProgress + '%',
            total: ((this.belajarProgress + this.berlatihProgress + this.bertandingProgress) / 3).toFixed(2) + '%'
        };
    }

    getTotalProgress() {
        return (this.belajarProgress + this.berlatihProgress + this.bertandingProgress) / 3;
    }
}

// Object untuk menyimpan data siswa
const StudentDatabase = {
    students: [],
    
    addStudent(student) {
        this.students.push(student);
        this.saveToLocalStorage();
    },
    
    getStudent(email) {
        return this.students.find(s => s.email === email);
    },
    
    getAllStudents() {
        return this.students;
    },
    
    saveToLocalStorage() {
        localStorage.setItem('students', JSON.stringify(this.students));
    },
    
    loadFromLocalStorage() {
        const data = localStorage.getItem('students');
        if (data) {
            this.students = JSON.parse(data);
        }
    }
};

// ============================================
// EVENT HANDLERS - Smooth Scroll
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling untuk navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Tutup menu hamburger jika terbuka
                const menuToggle = document.getElementById('menu-toogle');
                if (menuToggle) {
                    menuToggle.checked = false;
                }
            }
        });
    });

    // ============================================
    // HAMBURGER MENU HANDLER
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const menuToggle = document.getElementById('menu-toogle');
    
    if (hamburger && menuToggle) {
        hamburger.addEventListener('click', function() {
            // Toggle animation
            this.classList.toggle('active');
            
            // Change CSS property dynamically
            const menu = document.querySelector('.menu');
            if (menu) {
                if (menuToggle.checked) {
                    menu.style.transform = 'translateX(0)';
                    menu.style.opacity = '1';
                } else {
                    menu.style.transform = 'translateX(100%)';
                    menu.style.opacity = '0';
                }
            }
        });
    }

    // ============================================
    // BUTTON HOVER EFFECTS
    // ============================================
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // ============================================
    // DYNAMIC TEXT ANIMATION
    // ============================================
    const mainHeading = document.querySelector('main h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // ============================================
    // SCROLL ANIMATION
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('footer, .about, .kotak');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        observer.observe(section);
    });

    // ============================================
    // LOADING ANIMATION
    // ============================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.backgroundColor = 'transparent';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ============================================
    // FORMULA 3B CARDS INTERACTION
    // ============================================
    const cards = document.querySelectorAll('.belajar, .berlatih, .bertanding');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // ============================================
    // DARK MODE TOGGLE
    // ============================================
    function createDarkModeToggle() {
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '🌙';
        toggleBtn.className = 'dark-mode-toggle';
        toggleBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            
            // Simpan preferensi
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Load preferensi
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            toggleBtn.innerHTML = '☀️';
        }
    }
    
    createDarkModeToggle();
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Validasi Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validasi Password Strength
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    const levels = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
    return {
        score: strength,
        level: levels[strength - 1] || 'Sangat Lemah'
    };
}

// Toast Notification
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

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { User, ProgressTracker, StudentDatabase, validateEmail, checkPasswordStrength, showToast };
}
