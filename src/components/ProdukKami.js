import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProdukKami.css';

function ProdukKami() {
  const handleCardClick = (url) => {
    // Navigasi ke HTML asli
    window.location.href = url;
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/6282399339886?text=Halo, saya tertarik dengan Ganesha Operation!', '_blank');
  };

  return (
    <div className="produk-container">
      <div className="judul">
        <h1>Program Pilihan Ganesha Operation</h1>
        <p>Berbagai Macam Pilihan Program Sesuai dengan Kebutuhanmu</p>
      </div>

      <div className="card-group">
        <div className="card" onClick={() => handleCardClick('/PageProdukKami/sd/programsd.html')}>
          <img 
            src="/PageProdukKami/gambar/newprogramsd.webp" 
            alt="Program SD"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="225" height="400" viewBox="0 0 225 400"><rect fill="%23ff6600" width="225" height="400"/><text x="50%" y="40%" text-anchor="middle" fill="white" font-size="48" font-weight="bold">📚</text><text x="50%" y="55%" text-anchor="middle" fill="white" font-size="24" font-weight="bold">SD</text></svg>';
            }}
          />
          <div className="layer"></div>
          <div className="info">
            <h1>PROGRAM SD</h1>
            <p>
              Program ini dibuat khusus untuk SobatGO yang masih duduk
              di sekolah dasar agar bisa jadi juara di sekolah dan masuk
              ke SMP favorit.
            </p>
            <button className="btn">SELENGKAPNYA</button>
          </div>
        </div>

        <div className="card" onClick={() => handleCardClick('/PageProdukKami/smp/programsmp.html')}>
          <img 
            src="/PageProdukKami/gambar/newprogramsmp.webp" 
            alt="Program SMP"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="225" height="400" viewBox="0 0 225 400"><rect fill="%23ff6600" width="225" height="400"/><text x="50%" y="40%" text-anchor="middle" fill="white" font-size="48" font-weight="bold">📖</text><text x="50%" y="55%" text-anchor="middle" fill="white" font-size="24" font-weight="bold">SMP</text></svg>';
            }}
          />
          <div className="layer"></div>
          <div className="info">
            <h1>PROGRAM SMP</h1>
            <p>
              Program ini dibuat khusus untuk SobatGO yang masih duduk 
              di bangku SMP agar bisa jadi juara di sekolah dan masuk 
              ke SMA favorit.
            </p>
            <button className="btn">SELENGKAPNYA</button>
          </div>
        </div>

        <div className="card" onClick={() => handleCardClick('/PageProdukKami/sma/programsma.html')}>
          <img 
            src="/PageProdukKami/gambar/newprogramsma.webp" 
            alt="Program SMA"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="225" height="400" viewBox="0 0 225 400"><rect fill="%23ff6600" width="225" height="400"/><text x="50%" y="40%" text-anchor="middle" fill="white" font-size="48" font-weight="bold">🎓</text><text x="50%" y="55%" text-anchor="middle" fill="white" font-size="24" font-weight="bold">SMA</text></svg>';
            }}
          />
          <div className="layer"></div>
          <div className="info">
            <h1>PROGRAM SMA</h1>
            <p>
              Untuk bisa mencapai target akademikmu BELAJAR aja enggak 
              cukup! Kamu harus imbangi dengan sering BERLATIH dan 
              BERTANDING. Ganesha Operation bisa bantu kamu untuk jadi 
              juara di sekolah dan masuk PTN impian!
            </p>
            <button className="btn">SELENGKAPNYA</button>
          </div>
        </div>
      </div>

      <img 
        src="/PageProdukKami/gambar/newfaq2.webp" 
        alt="BA Ganesha Operation" 
        className="foto-kanan"
        onClick={handleWhatsAppClick}
        title="Hubungi kami via WhatsApp"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      <div className="back-button-container">
        <Link to="/" className="btn-back">
          <i className="fa fa-arrow-left"></i> Kembali ke Beranda
        </Link>
      </div>

      <footer className="footer">
        <p>© 2025 Ganesha Operation. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default ProdukKami;
