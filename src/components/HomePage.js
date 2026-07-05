import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigate = useNavigate();

  const handleFeatureClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard"); // sudah login
    } else {
      navigate("/login"); // belum login
    }
  };

  return (
    <div className="homepage-container">
      {/* Navigation Bar */}
      <nav className="nav">
        <div className="nav-inner">
          {/* Logo - Bagian Kiri (Text Only) */}
          <Link to="/" className="brand">
            <span>Ganesha Operation</span>
          </Link>
          
          {/* Nav Links - Bagian Tengah */}
          <ul className="menu" id="navMenu">
            <li><a href="#about-info" onClick={(e) => smoothScroll(e, 'about-info')}>About Us</a></li>
            <li><Link to="/formula-belajar">Formula 3B</Link></li>
            <li><Link to="/produk-kami">Produk Kami</Link></li>
            <li>
              <button onClick={handleFeatureClick} className="nav-btn">
                Fitur Belajar
              </button>
            </li>
            <li>
              <a href="https://wa.me/6282399339886?text=Halo, saya tertarik dengan Ganesha Operation!" target="_blank" rel="noopener noreferrer">
                Hubungi Kami
              </a>
            </li>
          </ul>
          
          {/* Login - Bagian Kanan dengan Background Orange */}
          <Link to="/login" className="login-btn">
            Login
          </Link>
          
          <div className="hamburger" id="hamburger" onClick={() => {
            const menu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
          }}>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="hero-main">
        <h1>Ganesha Operation</h1>
        <h5>Bimbingan Belajar Terbaik & Terbesar di Indonesia</h5>
        
        <div className="btn-luar">
          <div className="dalam">
            <button 
              className="hubungi"
              onClick={() => window.open('https://wa.me/6282399339886?text=Halo, saya tertarik dengan Ganesha Operation!', '_blank')}
            >
              <i className="fa fa-whatsapp"></i> Hubungi Kami
            </button>
            <Link to="/produk-kami">
              <button className="produk">
                <i className="fa fa-book"></i> Lihat Produk
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* About Section */}
      <footer className="about" id="about-info">
        <div className="content">
          <h2>About US</h2>
          <h2>Pada Tahun 2025 Ganesha Operation Telah Meluluskan 53.000 Lebih Siswa ke PTN & PT Kedinasan Impian</h2>
          <p>
            Ganesha Operation adalah Bimbingan Belajar Tatap Muka Berbasis Teknologi Online yang telah berhasil mengantarkan 53.000 lebih kelulusan siswa ke PTN dan PT Kedinasan, 2.550 lebih di antaranya lulus ke kedokteran pada tahun 2025 dan angka tersebut terus meningkat setiap tahunnya. Kami telah meraih 4 penghargaan MURI yaitu sebagai: 
            <br/><br/>
            1. Bimbel Terbaik dengan Kelulusan Siswa Terbanyak ke PTN dan PT Kedinasan se-Indonesia. 
            <br/>
            2. Bimbel Terbesar dengan Lokasi Terbanyak se-Indonesia yang Dikelola Secara Terpusat (no franchise). 
            <br/>
            3. Bimbel Pertama yang Menyelenggarakan E-Sport Pendidikan. 
            <br/>
            4. Bimbel Terlama yang Masih Beroperasi Sampai Saat Ini. 
            <br/><br/>
            Ganesha Operation berdiri sejak 2 Mei 1984, dan memiliki visi untuk menjadi bimbingan belajar terbaik dan terbesar se-Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
