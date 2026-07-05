# PANDUAN IMPLEMENTASI JAVASCRIPT - PROJECT CIMOCHY

## 📚 DAFTAR FILE JAVASCRIPT YANG DIBUAT

1. **main.js** - JavaScript utama dengan event handlers dan DOM manipulation
2. **login.js** - Login page dengan jQuery
3. **register.js** - Register page dengan validasi
4. **formula.js** - Formula 3B page dengan interaktivitas
5. **react-components.jsx** - React components (opsional)
6. **animations.js** - CSS animations dan styles

---

## 🚀 CARA IMPLEMENTASI

### 1. UNTUK HALAMAN UTAMA (PageAwal/project.html)

Tambahkan sebelum tag `</body>`:

```html
<!-- jQuery (optional) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Main JavaScript -->
<script src="../js/animations.js"></script>
<script src="../js/main.js"></script>
```

---

### 2. UNTUK HALAMAN LOGIN (Page Login/Login.html)

Tambahkan sebelum tag `</body>`:

```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- JavaScript Files -->
<script src="../js/animations.js"></script>
<script src="../js/main.js"></script>
<script src="../js/login.js"></script>
```

---

### 3. UNTUK HALAMAN REGISTER (Page Login/register.html)

Tambahkan sebelum tag `</body>`:

```html
<!-- JavaScript Files -->
<script src="../js/animations.js"></script>
<script src="../js/main.js"></script>
<script src="../js/register.js"></script>
```

---

### 4. UNTUK HALAMAN FORMULA (PageFormulaBelajar/formula.html)

Tambahkan sebelum tag `</body>`:

```html
<!-- JavaScript Files -->
<script src="../js/animations.js"></script>
<script src="../js/main.js"></script>
<script src="../js/formula.js"></script>
```

---

## 🎨 FITUR-FITUR YANG SUDAH DIBUAT

### A. EVENT HANDLERS
- ✅ Smooth scroll navigation
- ✅ Hamburger menu toggle
- ✅ Button hover effects
- ✅ Form submission handlers
- ✅ Input focus/blur events
- ✅ Click tracking

### B. DOM MANIPULATION
- ✅ Dynamic text animation (typewriter effect)
- ✅ Scroll animations
- ✅ Loading animations
- ✅ Navbar scroll effect
- ✅ Card hover effects
- ✅ Modal creation

### C. CHANGING HTML & CSS PROPERTIES
- ✅ Dynamic style changes
- ✅ Class toggling
- ✅ CSS property manipulation
- ✅ Transform animations
- ✅ Color changes
- ✅ Dark mode toggle

### D. JAVASCRIPT CLASSES & OBJECTS
- ✅ `User` class - User management
- ✅ `ProgressTracker` class - Progress tracking
- ✅ `FormulaProgress` class - Formula 3B progress
- ✅ `StudentDatabase` object - Student data storage
- ✅ `FormulaData` object - Formula information

### E. JQUERY FEATURES
- ✅ jQuery selectors
- ✅ jQuery event handlers
- ✅ jQuery animations
- ✅ jQuery AJAX simulation
- ✅ jQuery DOM manipulation

### F. REACT COMPONENTS (OPSIONAL)
- ✅ LoginForm component dengan state & props
- ✅ RegisterForm component
- ✅ FormulaCard component
- ✅ ProgressBar component
- ✅ Toast notification component
- ✅ App component dengan state management

---

## 📝 CONTOH PENGGUNAAN

### 1. Menggunakan Class User

```javascript
// Membuat user baru
const user = new User('student@gmail.com', 'password123', 'John Doe');

// Login user
user.login();

// Mendapatkan info user
console.log(user.getInfo());

// Logout user
user.logout();
```

### 2. Menggunakan Progress Tracker

```javascript
// Membuat tracker
const tracker = new ProgressTracker('John Doe');

// Update progress
tracker.updateProgress('belajar', 50);
tracker.updateProgress('berlatih', 75);
tracker.updateProgress('bertanding', 30);

// Lihat progress
console.log(tracker.displayProgress());
console.log('Total:', tracker.getTotalProgress());
```

### 3. Menampilkan Toast Notification

```javascript
// Success toast
showToast('Login berhasil!', 'success');

// Error toast
showToast('Email tidak valid!', 'error');

// Info toast
showToast('Silakan isi formulir', 'info');
```

### 4. Validasi Email

```javascript
if (validateEmail('test@email.com')) {
    console.log('Email valid');
} else {
    console.log('Email tidak valid');
}
```

### 5. Check Password Strength

```javascript
const strength = checkPasswordStrength('MyPassword123!');
console.log(strength); 
// Output: { score: 5, level: 'Sangat Kuat' }
```

---

## 🎯 UNTUK MENGGUNAKAN REACT COMPONENTS

Jika ingin menggunakan React (opsional), tambahkan di HTML:

```html
<!-- React Libraries -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<!-- React Components -->
<script type="text/babel" src="../js/react-components.jsx"></script>

<!-- Mount React App -->
<script type="text/babel">
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<CimochyReact.App />);
</script>
```

Dan tambahkan div untuk mounting React:

```html
<div id="root"></div>
```

---

## 🔥 FITUR INTERAKTIF YANG AKTIF

1. **Dark Mode Toggle** - Tombol di kanan bawah untuk toggle dark mode
2. **Smooth Scrolling** - Klik link navigasi untuk smooth scroll
3. **Form Validation** - Real-time validation pada form login/register
4. **Password Strength** - Indikator kekuatan password
5. **Progress Tracking** - Tracking progress Formula 3B
6. **Toast Notifications** - Notifikasi pop-up
7. **Card Animations** - Animasi pada card hover
8. **Loading States** - Loading indicator saat submit form
9. **LocalStorage Integration** - Data tersimpan di browser
10. **Ripple Effect** - Efek ripple saat klik card

---

## 💾 DATA YANG TERSIMPAN DI LOCALSTORAGE

- `currentUser` - User yang sedang login
- `users` - Daftar semua user terdaftar
- `students` - Database siswa
- `formula_progress_[userId]` - Progress Formula 3B per user
- `formula_clicks` - Tracking klik pada formula cards
- `darkMode` - Preferensi dark mode
- `savedEmail` - Email yang disimpan untuk remember me

---

## 🎨 CUSTOM CSS YANG DITAMBAHKAN

File `animations.js` sudah menyertakan CSS untuk:
- Animations (slideIn, fadeIn, shake, pulse, ripple)
- Dark mode styles
- Toast notifications
- Progress bars
- Modal overlays
- Tooltips
- Custom scrollbar
- Responsive styles

---

## 🐛 TROUBLESHOOTING

### Jika JavaScript tidak berfungsi:

1. **Cek Console Browser** (F12) untuk error
2. **Pastikan path file benar** - sesuaikan dengan struktur folder
3. **Pastikan jQuery dimuat** jika menggunakan login.js
4. **Cek urutan script** - animations.js → main.js → page-specific.js

### Jika Dark Mode tidak muncul:

```javascript
// Panggil manual jika perlu
createDarkModeToggle();
```

### Jika Progress tidak tersimpan:

```javascript
// Cek localStorage
console.log(localStorage.getItem('formula_progress_[userId]'));
```

---

## 📱 RESPONSIVE DESIGN

Semua fitur sudah responsive untuk:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

---

## 🎓 BELAJAR LEBIH LANJUT

### Event Handlers:
```javascript
element.addEventListener('click', function(e) {
    e.preventDefault();
    // Your code here
});
```

### DOM Manipulation:
```javascript
element.style.property = 'value';
element.classList.add('className');
element.textContent = 'new text';
```

### jQuery:
```javascript
$('selector').on('event', function() {
    $(this).css('property', 'value');
});
```

---

## ✨ HAPPY CODING!

Semua fitur sudah siap digunakan. Tinggal integrasikan ke HTML files!

Jika ada pertanyaan atau butuh modifikasi, silakan tanya! 🚀
