// ============================================
// CSS ANIMATIONS & STYLES FOR JAVASCRIPT
// ============================================

const styles = `
/* ============================================
   GENERAL ANIMATIONS
   ============================================ */

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

/* ============================================
   DARK MODE STYLES
   ============================================ */

body.dark-mode {
    background: #1a1a2e !important;
    color: #eee !important;
}

body.dark-mode .nav {
    background: rgba(26, 26, 46, 0.95) !important;
    color: #eee !important;
}

body.dark-mode .about {
    background: #16213e !important;
    color: #eee !important;
}

body.dark-mode .kotak a {
    background: #0f3460 !important;
    color: #eee !important;
}

body.dark-mode input {
    background: #16213e !important;
    color: #eee !important;
    border-color: #533483 !important;
}

body.dark-mode .login {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%) !important;
}

/* ============================================
   ERROR ANIMATIONS
   ============================================ */

.error-shake {
    animation: shake 0.5s ease;
    border-color: #f44336 !important;
}

input.error {
    border-color: #f44336 !important;
}

.error-text {
    color: #f44336;
    font-size: 12px;
    margin-top: 5px;
    display: block;
}

/* ============================================
   BUTTON STYLES
   ============================================ */

button, .btn {
    transition: all 0.3s ease;
    cursor: pointer;
}

button:hover, .btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

button:active, .btn:active {
    transform: scale(0.95);
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* ============================================
   TOAST NOTIFICATION STYLES
   ============================================ */

.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 5px;
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease;
}

.toast-success {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
}

.toast-error {
    background: linear-gradient(135deg, #f44336 0%, #da190b 100%);
}

.toast-info {
    background: linear-gradient(135deg, #2196F3 0%, #0b7dda 100%);
}

.toast-warning {
    background: linear-gradient(135deg, #ff9800 0%, #fb8c00 100%);
}

/* ============================================
   PASSWORD TOGGLE STYLES
   ============================================ */

.password-toggle {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 20px;
    z-index: 10;
    user-select: none;
}

/* ============================================
   PASSWORD STRENGTH STYLES
   ============================================ */

.password-strength-bar {
    width: 100%;
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    margin-top: 5px;
    overflow: hidden;
}

.password-strength-text {
    font-size: 12px;
    margin-top: 5px;
}

/* ============================================
   PROGRESS BAR STYLES
   ============================================ */

.progress-container {
    width: 100%;
    padding: 10px 0;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transition: width 0.5s ease;
}

/* ============================================
   CARD STYLES
   ============================================ */

.formula-card {
    padding: 20px;
    border-radius: 10px;
    background: white;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.formula-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

/* ============================================
   DARK MODE TOGGLE BUTTON
   ============================================ */

.dark-mode-toggle {
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
}

.dark-mode-toggle:hover {
    transform: scale(1.1) rotate(15deg);
}

/* ============================================
   LOADING SPINNER
   ============================================ */

.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ============================================
   MODAL STYLES
   ============================================ */

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    position: relative;
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* ============================================
   TOOLTIP STYLES
   ============================================ */

.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}

/* ============================================
   HAMBURGER MENU ACTIVE STATE
   ============================================ */

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* ============================================
   STATISTICS PANEL
   ============================================ */

.statistics-panel {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    margin-top: 30px;
    text-align: center;
    animation: fadeIn 0.6s ease;
}

.total-progress-circle {
    width: 150px;
    height: 150px;
    margin: 20px auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.total-progress-circle::before {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    background: white;
    border-radius: 50%;
}

/* ============================================
   RESPONSIVE STYLES
   ============================================ */

@media (max-width: 768px) {
    .toast {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: calc(100% - 20px);
    }
    
    .dark-mode-toggle {
        bottom: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        font-size: 20px;
    }
    
    .modal-content {
        padding: 20px;
        width: 95%;
    }
}

/* ============================================
   INPUT FOCUS STYLES
   ============================================ */

.input-box.focused {
    transform: scale(1.02);
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
}

.input-box input:focus {
    outline: none;
    border-color: #667eea;
}

/* ============================================
   FEATURE TAGS
   ============================================ */

.feature-tag {
    display: inline-block;
    padding: 5px 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    font-size: 12px;
    margin: 5px;
}

/* ============================================
   SCROLL BAR CUSTOM
   ============================================ */

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

body.dark-mode::-webkit-scrollbar-track {
    background: #16213e;
}
`;

// Inject styles into document
function injectStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

// Auto-inject on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectStyles);
} else {
    injectStyles();
}

// Export for manual injection
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { styles, injectStyles };
}
