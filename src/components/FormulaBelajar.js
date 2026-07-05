import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/FormulaBelajar.css';

function FormulaBelajar() {
  const navigate = useNavigate();

  const handleProtectedRoute = (path) => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="formula-container">
      <div className="formula-content">
        <h2>Formula 3B Bantu Kamu Mencapai Target Akademikmu</h2>
        <img 
          className="mb-4 logo-formula" 
          src="/Gambar/logo-3formula.webp" 
          alt="Formula 3B"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        <div className="kotak">
          <div className="formula-card belajar">
            <div className="dalam-belajar">
              <img 
                src="/Gambar/dalam-bejar.png" 
                alt="Belajar"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="%23ff6600" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="48" font-weight="bold">📚</text></svg>';
                }}
              />
              <h3>BELAJAR</h3>
              <p>
                GO Bantu kamu untuk memahami teori dan konsepnya setiap belajar di kelas. 
                Kalau masih bingung, ada <i>Tutorial Service Time</i> (TST) untuk belajar 
                tambahan diluar KBM.
              </p>
              <button
                className="btn-action"
                onClick={() => handleProtectedRoute("/quiz")}
              >
                Mulai Belajar
              </button>
            </div>
          </div>

          <div className="formula-card berlatih">
            <div className="dalam-berlatih">
              <img 
                src="/Gambar/dalam-berlatih.png" 
                alt="Berlatih"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="%23ff6600" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="48" font-weight="bold">✍️</text></svg>';
                }}
              />
              <h3>BERLATIH</h3>
              <p>
                Sel-sel otakmu perlu dilatih untuk mengerjakan soal-soal dengan tingkat 
                kesulitan yang setara dengan ujianmu. Untuk itu, ada Buku Sakti dan 
                Empati yang siap membantu.
              </p>
              <button
                className="btn-action"
                onClick={() => handleProtectedRoute("/flashcards")}
              >
                Mulai Berlatih
              </button>
            </div>
          </div>

          <div className="formula-card bertanding">
            <div className="dalam-bertanding">
              <img 
                src="/Gambar/dalam-bertanding.png" 
                alt="Bertanding"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="%23ff6600" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="48" font-weight="bold">🏆</text></svg>';
                }}
              />
              <h3>BERTANDING</h3>
              <p>
                Setelah berlatih, saatnya menguji sudah seberapa jauh progress belajarmu 
                dengan TOBK (<i>Try Out</i> Berbasis Komputer), <i>Racing</i> Soal, 
                dan <i>Battle</i>
              </p>
              <button
                className="btn-action"
                onClick={() => handleProtectedRoute("/quiz")}
              >
                Mulai Bertanding
              </button>
            </div>
          </div>
        </div>

        <div className="back-button-container">
          <Link to="/" className="btn-back">
            <i className="fa fa-arrow-left"></i> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormulaBelajar;
