import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { API } from "../config/api";

function LoginPage() {
  const [formType, setFormType] = useState('login'); // 'login', 'register', 'reset'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔐 LOGIN
      if (formType === 'login') {
        const res = await fetch(API.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await res.json();
        console.log("LOGIN RESPONSE:", data);

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("role", data.user.role);

          alert("Login berhasil!");
          navigate("/dashboard");
          window.location.reload();
        } else {
          alert(data.message || "Login gagal");
        }
      }

      // 📝 REGISTER
      else if (formType === 'register') {
        if (formData.password !== formData.confirmPassword) {
          alert("Password dan konfirmasi password tidak sama!");
          return;
        }

        const res = await fetch(API.register, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nama: formData.name,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await res.json();

        if (res.ok) {
          alert("Register berhasil!");
          setFormType("login");
        } else {
          alert(data.message || "Register gagal");
        }
      }

      // 🔄 RESET PASSWORD
      else if (formType === 'reset') {
        const res = await fetch(API.resetPassword, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email,
            newPassword: formData.password
          })
        });

        const data = await res.json();

        alert(data.message);

        if (res.ok) {
          setFormType("login");
        }
      }

    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img 
          src="/Gambar/Gambar Login.png" 
          alt="Ganesha Operation" 
          className="login-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      
      <div className="login-right">
        <Link to="/" className="back-home">
          <i className="fa fa-arrow-left"></i> Kembali ke Beranda
        </Link>
        
        <div className="login-box">
          <div className="login-header">
            <img 
              src="/Gambar/logo.png" 
              alt="Logo" 
              className="login-logo"
              onError={(e) => e.target.style.display = 'none'}
            />
            <h2>
              {formType === 'login' && 'Masuk ke Akun'}
              {formType === 'register' && 'Daftar Akun Baru'}
              {formType === 'reset' && 'Reset Password'}
            </h2>
            <p>Ganesha Operation - Platform Belajar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {formType === 'register' && (
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                required
              />
            </div>

            {formType !== 'reset' && (
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                />
              </div>
            )}

            {formType === 'reset' && (
              <div className="form-group">
                <label>Password Baru</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password baru"
                  required
                />
              </div>
            )}

            {formType === 'register' && (
              <div className="form-group">
                <label>Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi password"
                  required
                />
              </div>
            )}

            {formType === 'login' && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Ingat Saya</span>
                </label>
                <button 
                  type="button" 
                  className="forgot-password"
                  onClick={() => setFormType('reset')}
                >
                  Lupa Password?
                </button>
              </div>
            )}

            <button type="submit" className="btn-submit">
              {formType === 'login' && 'Masuk'}
              {formType === 'register' && 'Daftar'}
              {formType === 'reset' && 'Kirim Link Reset'}
            </button>
          </form>

          <div className="login-footer">
            {formType === 'login' && (
              <p>
                Belum punya akun? 
                <button type="button" onClick={() => setFormType('register')}>
                  Daftar Sekarang
                </button>
              </p>
            )}
            {formType === 'register' && (
              <p>
                Sudah punya akun? 
                <button type="button" onClick={() => setFormType('login')}>
                  Masuk
                </button>
              </p>
            )}
          </div>

          <div className="social-login">
            <p className="divider">Atau masuk dengan</p>
            <div className="social-buttons">
              <button className="social-btn google">
                <i className="fab fa-google"></i> Google
              </button>
              <button className="social-btn facebook">
                <i className="fab fa-facebook-f"></i> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;