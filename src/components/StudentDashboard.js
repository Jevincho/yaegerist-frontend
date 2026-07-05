import React, { useState, useEffect } from 'react';
import '../styles/StudentDashboard.css';
import { useNavigate } from 'react-router-dom';
import { API } from "../config/api";

const StudentDashboard = ({ studentData, updateStudentData }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalStudyTime: 0,
    quizzesCompleted: 0,
    averageScore: 0,
    streak: 0,
    flashcardsReviewed: 0,
    postsInForum: 0
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("studentData");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(API.profile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setProfile(data);
        updateStudentData(prev => ({
          ...prev,
          totalPoints: data.points || 0,
          studyDuration: data.duration || 0,
          cardReviewed: data.cardReviewed || 0
        }));
      })
      .catch(() => navigate("/login"));

  }, [navigate]);

  useEffect(() => {
    if (!profile) return;

    const token = localStorage.getItem("token");

    fetch(API.studyHistory, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        updateStudentData(prev => ({
          ...prev,
          studyHistory: data
        }));
      })
      .catch(err => console.error(err));
  }, [profile]);

  useEffect(() => {
    calculateStats();
  }, [studentData, profile]);

  const calculateStats = () => {
    const history = studentData.studyHistory || [];
    
    const quizzes = history.filter(
      h => h.type === 'quiz' || h.subject
    );
    const studySessions = history.filter(h => h.type === 'study');
    const flashcards = history.filter(h => h.type === 'flashcard');
    
    const totalTime = profile?.duration || 0;
    const avgScore = quizzes.length > 0
      ? quizzes.reduce((sum, q) => sum + Number(q.score || 0), 0) / quizzes.length
      : 0;
    
    // Calculate streak (consecutive days)
    const streak = calculateStreak(history);
    
    setStats({
      totalStudyTime: Math.floor(totalTime / 60), // convert to minutes
      quizzesCompleted: quizzes.length,
      averageScore: Math.round(avgScore),
      streak,
      flashcardsReviewed: flashcards.length,
      postsInForum: 0 // Will be updated from forum component
    });
  };

  const calculateStreak = (history) => {
    if (history.length === 0) return 0;
    
    const dates = history.map(h => new Date(h.date).toDateString());
    const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
    
    let streak = 0;
    let currentDate = new Date();
    
    for (let dateStr of uniqueDates) {
      const date = new Date(dateStr);
      const diffDays = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getRecentActivities = () => {
    const history = studentData.studyHistory || [];
    return history
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  const getActivityIcon = (type) => {
    const icons = {
      quiz: '🎯',
      study: '📚',
      flashcard: '🎴',
      forum: '💬',
      achievement: '🏆'
    };
    return icons[type] || '📝';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString('id-ID');
  };

  const weeklyProgress = () => {
    const history = studentData.studyHistory || [];
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const thisWeek = history.filter(h => new Date(h.date) >= lastWeek);
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const data = Array(7).fill(0);
    
    thisWeek.forEach(h => {
      const day = new Date(h.date).getDay();
      data[day]++;
    });
    
    const maxActivity = Math.max(...data, 1);
    
    return days.map((day, idx) => ({
      day,
      count: data[idx],
      height: (data[idx] / maxActivity) * 100
    }));
  };

  const subjectProgress = () => {
    const history = studentData.studyHistory || [];
    const subjects = {};
    
    history.forEach(h => {
      if (h.subject) {
        if (!subjects[h.subject]) {
          subjects[h.subject] = { total: 0, correct: 0 };
        }
        subjects[h.subject].total++;
        if (h.score) subjects[h.subject].correct += h.score;
      }
    });
    
    return Object.entries(subjects).map(([name, data]) => ({
      name,
      percentage: data.total > 0 ? Math.round((data.correct / (data.total * 100)) * 100) : 0,
      sessions: data.total
    }));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>
            Selamat Datang, {profile?.name || "Loading..."} 👋
          </h1>
          <p className="dashboard-subtitle">Berikut adalah progress belajarmu</p>
        </div>
        <div className="level-badge">
          <span className="level-icon">🎓</span>
          <div>
            <div className="level-text">{studentData.level}</div>
            <div className="level-points">{profile?.points || 0} poin</div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon study">📚</div>
          <div className="stat-info">
            <h3>{stats.totalStudyTime}</h3>
            <p>Menit Belajar</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon quiz">🎯</div>
          <div className="stat-info">
            <h3>{stats.quizzesCompleted}</h3>
            <p>Kuis Diselesaikan</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon score">⭐</div>
          <div className="stat-info">
            <h3>{stats.averageScore}</h3>
            <p>Rata-rata Skor</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon streak">🔥</div>
          <div className="stat-info">
            <h3>{stats.streak}</h3>
            <p>Hari Beruntun</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Weekly Activity Chart */}
        <div className="dashboard-card activity-card">
          <h3>📊 Aktivitas Mingguan</h3>
          <div className="activity-chart">
            {weeklyProgress().map((day, idx) => (
              <div key={idx} className="chart-bar">
                <div 
                  className="bar-fill" 
                  style={{ height: `${day.height}%` }}
                  title={`${day.count} aktivitas`}
                />
                <span className="bar-label">{day.day}</span>
              </div>
            ))}
          </div>
          <p className="chart-info">
            Total aktivitas minggu ini: <strong>{weeklyProgress().reduce((sum, d) => sum + d.count, 0)}</strong>
          </p>
        </div>

        {/* Subject Progress */}
        <div className="dashboard-card subjects-card">
          <h3>📚 Progress Per Mata Pelajaran</h3>
          {subjectProgress().length > 0 ? (
            <div className="subjects-list">
              {subjectProgress().map((subject, idx) => (
                <div key={idx} className="subject-item">
                  <div className="subject-header">
                    <span className="subject-name">{subject.name}</span>
                    <span className="subject-percentage">{subject.percentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${subject.percentage}%` }}
                    />
                  </div>
                  <span className="subject-sessions">{subject.sessions} sesi</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada aktivitas belajar</p>
              <p className="empty-hint">Mulai dengan mengikuti kuis atau belajar dengan flashcard!</p>
            </div>
          )}
        </div>

        {/* Recent Activities */}
        <div className="dashboard-card activities-card">
          <h3>🕐 Aktivitas Terbaru</h3>
          {getRecentActivities().length > 0 ? (
            <div className="activities-list">
              {getRecentActivities().map((activity, idx) => (
                <div key={idx} className="activity-item">
                  <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                  <div className="activity-details">
                    <p className="activity-title">
                      {activity.subject || activity.type}
                      {activity.score && <span className="activity-score"> - Skor: {activity.score}</span>}
                    </p>
                    <p className="activity-time">{formatDate(activity.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada aktivitas</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card actions-card">
          <h3>⚡ Aksi Cepat</h3>
          <div className="quick-actions">
            <a href="/quiz" className="action-btn quiz-action">
              <span className="action-icon">🎯</span>
              <span className="action-text">Mulai Kuis</span>
            </a>
            <a href="/flashcards" className="action-btn flashcard-action">
              <span className="action-icon">🎴</span>
              <span className="action-text">Belajar Flashcard</span>
            </a>
            <a href="/timer" className="action-btn timer-action">
              <span className="action-icon">⏱️</span>
              <span className="action-text">Study Timer</span>
            </a>
            <a href="/forum" className="action-btn forum-action">
              <span className="action-icon">💬</span>
              <span className="action-text">Forum Diskusi</span>
            </a>
          </div>
        </div>

        {/* Achievements Preview */}
        <div className="dashboard-card achievements-preview">
          <h3>🏆 Achievement Terbaru</h3>
          {studentData.achievements && studentData.achievements.length > 0 ? (
            <div className="achievements-grid">
              {studentData.achievements.slice(0, 4).map((achievement, idx) => (
                <div key={idx} className="achievement-badge">
                  <span className="badge-icon">{achievement.icon}</span>
                  <p className="badge-name">{achievement.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada achievement</p>
              <p className="empty-hint">Terus belajar untuk mendapatkan badge!</p>
            </div>
          )}
          <a href="/achievements" className="view-all-link">Lihat Semua →</a>
        </div>

        {/* Weak Areas Alert */}
        {studentData.weakAreas && studentData.weakAreas.length > 0 && (
          <div className="dashboard-card alert-card">
            <h3>⚠️ Area yang Perlu Ditingkatkan</h3>
            <div className="weak-areas-list">
              {studentData.weakAreas.map((area, idx) => (
                <div key={idx} className="weak-area-item">
                  <span className="area-icon">📌</span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <a href="/recommendations" className="btn-primary">
              Lihat Rekomendasi Belajar
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;