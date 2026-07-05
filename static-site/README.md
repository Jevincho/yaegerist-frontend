# Static Site - Ganesha Operation

Versi HTML statis (non-React) dari Ganesha Operation Platform dengan tampilan yang **persis sama** seperti versi React.

## 📁 Struktur Folder

```
static-site/
├── index.html              ← HomePage (landing page)
├── formula-belajar.html    ← Formula 3B page
├── produk-kami.html        ← Produk Kami page
├── login.html              ← Login/Register page
│
├── css/
│   ├── homepage.css        ← Styling HomePage
│   ├── formula-belajar.css ← Styling Formula 3B
│   ├── produk-kami.css     ← Styling Produk Kami
│   └── login.css           ← Styling Login
│
├── js/
│   ├── navigation.js       ← Hamburger menu & smooth scroll
│   └── login.js            ← Login form handling
│
├── Gambar/                 ← Image assets
│   └── *.webp, *.png
│
└── PageProdukKami/         ← HTML program pages
    ├── sd/programsd.html
    ├── smp/programsmp.html
    ├── sma/programsma.html
    ├── gambar/
    └── font/
```

---

## 🚀 Cara Menggunakan (Go Live)

### Option 1: Live Server (VS Code)

1. Install extension "Live Server" di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"
4. Browser akan otomatis membuka `http://localhost:5500`

### Option 2: Python Simple Server

```bash
# Masuk ke folder static-site
cd static-site

# Python 3
python -m http.server 8000

# Buka browser: http://localhost:8000
```

### Option 3: Node.js HTTP Server

```bash
# Install http-server globally (sekali saja)
npm install -g http-server

# Masuk ke folder static-site
cd static-site

# Jalankan server
http-server -p 8000

# Buka browser: http://localhost:8000
```

### Option 4: Upload ke Web Hosting

Upload semua file di folder `static-site/` ke root directory web hosting Anda:
- Niagahoster
- Hostinger
- IDCloudhost
- GitHub Pages
- Netlify
- dll.

---

## ✨ Fitur yang Tersedia

### ✅ Halaman Statis (Tanpa React)

1. **HomePage (`index.html`)**
   - Navigation bar dengan smooth scroll
   - Hero section dengan gradient background
   - About section
   - Hamburger menu untuk mobile
   - Login button dengan background orange

2. **Formula Belajar (`formula-belajar.html`)**
   - 3 cards: Belajar, Berlatih, Bertanding
   - Sama persis dengan React version
   - Link ke React app untuk fitur interaktif

3. **Produk Kami (`produk-kami.html`)**
   - Cards untuk Program SD, SMP, SMA
   - Navigasi ke HTML detail pages
   - WhatsApp integration
   - Back button ke homepage

4. **Login (`login.html`)**
   - 3 form modes: Login, Register, Reset Password
   - Social login buttons (placeholder)
   - Form validation
   - Split-screen design

5. **Program Detail Pages**
   - `PageProdukKami/sd/programsd.html`
   - `PageProdukKami/smp/programsmp.html`
   - `PageProdukKami/sma/programsma.html`
   - Back button kembali ke `produk-kami.html`

---

## ❌ Fitur yang TIDAK Tersedia

**Fitur Belajar** (memerlukan React app):
- Quiz System
- Flashcard System
- Study Timer
- Discussion Forum
- Achievement System
- Study Recommendation
- Student Dashboard

**Catatan:** Saat user klik "Fitur Belajar", akan muncul alert:
```
"Fitur Belajar menggunakan aplikasi React. 
Silakan jalankan: npm start"
```

---

## 🎨 Design Features

### Navigation
- **Desktop:** Logo kiri, Nav tengah, Login kanan (orange)
- **Mobile:** Hamburger menu dengan slide-down animation
- **Smooth Scroll:** Klik "About Us" scroll smooth ke section

### Styling
- Sama persis dengan React version
- CSS copied langsung dari `src/styles/`
- Responsive design (mobile, tablet, desktop)
- Hover animations
- Transition effects

### Color Scheme
```css
Primary: #ff6600 (Ganesha Orange)
Secondary: #333333 (Dark Gray)
Gradient: linear-gradient(to bottom, #ff0000, #ffffff)
Login Button: linear-gradient(135deg, #ff6600 0%, #ff8c00 100%)
```

---

## 🔗 Navigation Flow

```
index.html (HomePage)
├── About Us → Smooth scroll ke #about-info
├── Formula 3B → formula-belajar.html
│   └── Cards → Alert (React app required)
├── Produk Kami → produk-kami.html
│   ├── SD Card → PageProdukKami/sd/programsd.html
│   │   └── Back → produk-kami.html
│   ├── SMP Card → PageProdukKami/smp/programsmp.html
│   │   └── Back → produk-kami.html
│   └── SMA Card → PageProdukKami/sma/programsma.html
│       └── Back → produk-kami.html
├── Fitur Belajar → Alert (React app required)
├── Hubungi Kami → WhatsApp link
└── Login → login.html
    ├── Form Submit → Alert (React app required)
    └── Social Login → Alert (React app required)
```

---

## 📝 Perbedaan dengan React App

| Fitur | Static Site | React App |
|-------|-------------|-----------|
| HomePage | ✅ Sama persis | ✅ |
| Formula Belajar | ✅ Sama persis | ✅ |
| Produk Kami | ✅ Sama persis | ✅ |
| Login Page | ✅ UI sama, form dummy | ✅ Full functional |
| 7 Fitur Belajar | ❌ Tidak ada | ✅ |
| React Router | ❌ HTML links | ✅ SPA routing |
| LocalStorage | ❌ Tidak digunakan | ✅ Data persistence |
| State Management | ❌ No state | ✅ React hooks |

---

## 🌐 Deploy ke Hosting

### Netlify (Drag & Drop)

1. Zip folder `static-site/`
2. Buka https://app.netlify.com/drop
3. Drag & drop ZIP file
4. Done! Otomatis live dengan SSL

### GitHub Pages

```bash
# Create repo di GitHub
git init
git add .
git commit -m "Static site"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Settings → Pages → Source: main branch
# Site akan live di: https://username.github.io/repo/
```

### Manual Upload (cPanel)

1. Login ke cPanel
2. File Manager → public_html
3. Upload semua file dari `static-site/`
4. Done! Akses via domain Anda

---

## 🔧 Customization

### Ganti Warna

Edit di file CSS masing-masing:
```css
/* css/homepage.css */
.login-btn {
  background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}

/* Gradient background */
.homepage-container {
  background: linear-gradient(to bottom, #YOUR_COLOR, #ffffff);
}
```

### Ganti Text

Edit langsung di file HTML:
```html
<!-- index.html -->
<h1>Ganesha Operation</h1>
<!-- Ganti dengan nama brand Anda -->
```

### Ganti Images

Replace files di folder `Gambar/` dengan nama file yang sama, atau update path di HTML:
```html
<img src="Gambar/your-image.png" alt="...">
```

---

## 📊 Performance

### Load Speed
- HTML: Instant (< 100ms)
- CSS: ~50KB total
- Images: WebP format (optimized)
- No JavaScript frameworks
- No build process

### Size
- Total: ~2-3 MB (including images)
- HTML files: < 10KB each
- CSS files: ~50KB total
- JS files: < 5KB total

---

## ✅ Browser Support

- Chrome/Edge: ✅ Latest
- Firefox: ✅ Latest
- Safari: ✅ Latest (iOS 12+)
- Mobile browsers: ✅ All modern

---

## 🆚 Kapan Pakai Static Site vs React App?

### Gunakan Static Site Jika:
- ✅ Hanya butuh landing page
- ✅ Tidak perlu fitur interaktif (quiz, timer, dll)
- ✅ Deploy cepat tanpa build process
- ✅ SEO-friendly (static HTML)
- ✅ Hosting murah (shared hosting OK)

### Gunakan React App Jika:
- ✅ Butuh semua 7 fitur belajar
- ✅ User dashboard & progress tracking
- ✅ Data persistence (localStorage)
- ✅ SPA experience (no page reload)
- ✅ Modern development workflow

---

## 📞 Support

Static site ini dibuat otomatis dari React components dengan CSS yang sama.

**Tampilan dijamin 100% sama dengan React app!**

---

**Last Updated:** January 2026
**Maintained By:** Project Cimochy Team
