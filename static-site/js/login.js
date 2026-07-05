// Login form functionality
let currentFormType = 'login'; // 'login', 'register', 'reset'

function showLoginForm() {
    currentFormType = 'login';
    document.getElementById('form-title').textContent = 'Masuk ke Akun';
    document.getElementById('nameField').style.display = 'none';
    document.getElementById('passwordField').style.display = 'block';
    document.getElementById('confirmPasswordField').style.display = 'none';
    document.getElementById('forgotPassword').style.display = 'block';
    document.getElementById('submitBtn').textContent = 'Masuk';
    document.getElementById('switchText').innerHTML = 'Belum punya akun? <a href="#" onclick="showRegisterForm(); return false;" id="switchLink">Daftar</a>';
}

function showRegisterForm() {
    currentFormType = 'register';
    document.getElementById('form-title').textContent = 'Daftar Akun Baru';
    document.getElementById('nameField').style.display = 'block';
    document.getElementById('passwordField').style.display = 'block';
    document.getElementById('confirmPasswordField').style.display = 'block';
    document.getElementById('forgotPassword').style.display = 'none';
    document.getElementById('submitBtn').textContent = 'Daftar';
    document.getElementById('switchText').innerHTML = 'Sudah punya akun? <a href="#" onclick="showLoginForm(); return false;" id="switchLink">Masuk</a>';
}

function showResetForm() {
    currentFormType = 'reset';
    document.getElementById('form-title').textContent = 'Reset Password';
    document.getElementById('nameField').style.display = 'none';
    document.getElementById('passwordField').style.display = 'none';
    document.getElementById('confirmPasswordField').style.display = 'none';
    document.getElementById('forgotPassword').style.display = 'none';
    document.getElementById('submitBtn').textContent = 'Kirim Link Reset';
    document.getElementById('switchText').innerHTML = 'Kembali ke <a href="#" onclick="showLoginForm(); return false;" id="switchLink">Login</a>';
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const name = formData.get('name');
        const confirmPassword = formData.get('confirmPassword');
        
        if (currentFormType === 'login') {
            // Simulasi login
            alert('Login berhasil! Fitur lengkap tersedia di aplikasi React.\nJalankan: npm start');
            // In real app: redirect to dashboard
            // window.location.href = 'index.html';
        } else if (currentFormType === 'register') {
            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok!');
                return;
            }
            alert('Registrasi berhasil! Fitur lengkap tersedia di aplikasi React.\nJalankan: npm start');
            showLoginForm();
        } else if (currentFormType === 'reset') {
            alert('Link reset password telah dikirim ke: ' + email);
            showLoginForm();
        }
    });
});
