import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import { API } from "../config/api";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Token tidak ditemukan. Gunakan link dari email kamu.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama!");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password minimal 8 karakter");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API.resetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error("ERROR:", err);
      alert("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="login-container">
        <div className="login-right" style={{ margin: '0 auto' }}>
          <div className="login-box">
            <div className="login-header">
              <h2>Link Tidak Valid</h2>
              <p>Token reset password tidak ditemukan di URL.</p>
            </div>
            <Link to="/login" className="btn-submit" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-right" style={{ margin: '0 auto' }}>
        <div className="login-box">
          <div className="login-header">
            <img 
              src="/Gambar/logo.png" 
              alt="Logo" 
              className="login-logo"
              onError={(e) => e.target.style.display = 'none'}
            />
            <h2>Buat Password Baru</h2>
            <p>Masukkan password baru untuk akun kamu</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Password Baru</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                required
              />
            </div>

            <div className="form-group">
              <label>Konfirmasi Password Baru</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password baru"
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Memproses..." : "Simpan Password Baru"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;