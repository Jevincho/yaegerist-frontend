import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/FeatureLayout.css';
import { API } from "../config/api";

function FeatureLayout({ children, studentData }) {
  const [points, setPoints] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProfile = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch(API.profile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPoints(data.points || 0);
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    navigate("/login");
  };
  
  useEffect(() => {
    fetchProfile();
  }, [location.pathname]);

  return (
    <div className="feature-layout">
      <nav className="feature-nav">
        <div className="feature-nav-inner">
          <Link to="/" className="feature-brand">
            <img
              src="/Gambar/logo.png"
              alt="GO Logo"
              className="feature-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span>Ganesha Operation</span>
          </Link>

          <ul className="feature-menu">
            <li><Link to="/">Beranda</Link></li>
            <li><Link to="/formula-belajar">Formula 3B</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/quiz">Kuis</Link></li>
            <li><Link to="/flashcards">Flashcards</Link></li>
            <li><Link to="/timer">Timer</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/achievements">Pencapaian</Link></li>
          </ul>

          <div className="feature-user-info">
            <span>👤 {localStorage.getItem("name") || "Guest"}</span>
            <span className="feature-points">⭐ {points} pts</span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="feature-content">
        {children}
      </main>
    </div>
  );
}

export default FeatureLayout;