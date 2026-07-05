import React, { useState, useEffect, useRef } from 'react';
import '../styles/StudyTimer.css';
import { API } from "../config/api";

const StudyTimer = ({ studentData, updateStudentData }) => {
  const [mode, setMode] = useState('pomodoro'); // pomodoro, short-break, long-break
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [sessions, setSessions] = useState([]);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [currentSubject, setCurrentSubject] = useState('');
  const [customTime, setCustomTime] = useState(25);
  const audioRef = useRef(null);

  const saveStudySession = async (seconds) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(API.updateProgress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          duration: seconds,
          cardReviewed: 0
        })
      });
    } catch (err) {
      console.error("Gagal simpan sesi belajar:", err);
    }
  };

  const timerSettings = {
    pomodoro: 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
    custom: customTime * 60
  };
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      playNotification();
      handleSessionComplete();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Selesai!', {
        body: mode === 'pomodoro' 
          ? 'Sesi belajar selesai! Waktunya istirahat.' 
          : 'Istirahat selesai! Siap untuk belajar lagi?',
        icon: '🎓'
      });
    }
  };

  const handleSessionComplete = async () => {
    setIsRunning(false);
    
    if (mode === 'pomodoro') {
      await saveStudySession(timerSettings.pomodoro);

      const newSession = {
        subject: currentSubject || 'Umum',
        duration: timerSettings.pomodoro,
        completedAt: new Date().toISOString(),
        type: 'study'
      };
      
      setSessions([...sessions, newSession]);
      setCompletedPomodoros(completedPomodoros + 1);
      
      // Update student data
      const newHistory = [...(studentData.studyHistory || []), {
        type: 'study',
        subject: currentSubject,
        duration: timerSettings.pomodoro,
        date: new Date().toISOString()
      }];
      
      updateStudentData({
        studyHistory: newHistory
      });
      
      // Suggest break
      if (completedPomodoros % 4 === 3) {
        setMode('long-break');
        setTimeLeft(timerSettings['long-break']);
      } else {
        setMode('short-break');
        setTimeLeft(timerSettings['short-break']);
      }
    } else {
      // Break completed, back to pomodoro
      setMode('pomodoro');
      setTimeLeft(timerSettings.pomodoro);
    }
  };

  const startTimer = () => {
    if (!isRunning && currentSubject.trim() === '' && mode === 'pomodoro') {
      alert('Silakan masukkan mata pelajaran yang akan dipelajari');
      return;
    }
    
    setIsRunning(true);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerSettings[mode]);
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(timerSettings[newMode]);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTodaySessions = () => {
    const today = new Date().toDateString();
    return sessions.filter(s => new Date(s.completedAt).toDateString() === today);
  };

  const getTotalStudyTime = () => {
    const total = sessions.reduce((sum, s) => sum + s.duration, 0);
    return Math.floor(total / 60);
  };

  const getSubjectBreakdown = () => {
    const breakdown = {};
    sessions.forEach(s => {
      if (!breakdown[s.subject]) {
        breakdown[s.subject] = 0;
      }
      breakdown[s.subject] += s.duration;
    });
    
    return Object.entries(breakdown)
      .map(([subject, time]) => ({
        subject,
        time: Math.floor(time / 60),
        percentage: (time / sessions.reduce((sum, s) => sum + s.duration, 1)) * 100
      }))
      .sort((a, b) => b.time - a.time);
  };

  const progress = ((timerSettings[mode] - timeLeft) / timerSettings[mode]) * 100;

  return (
    <div className="timer-container">
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZQQ0VYrjq66lVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZQQ0VYrjq66lVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZQQ0VYrjq66lVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZ" />
      
      <div className="timer-header">
        <h1>⏱️ Study Timer & Pomodoro</h1>
        <p>Tingkatkan produktivitas dengan teknik Pomodoro</p>
      </div>

      <div className="timer-main">
        {/* Timer Controls */}
        <div className="timer-card">
          <div className="mode-selector">
            <button 
              className={`mode-btn ${mode === 'pomodoro' ? 'active' : ''}`}
              onClick={() => changeMode('pomodoro')}
              disabled={isRunning}
            >
              🎯 Pomodoro
            </button>
            <button 
              className={`mode-btn ${mode === 'short-break' ? 'active' : ''}`}
              onClick={() => changeMode('short-break')}
              disabled={isRunning}
            >
              ☕ Break Pendek
            </button>
            <button 
              className={`mode-btn ${mode === 'long-break' ? 'active' : ''}`}
              onClick={() => changeMode('long-break')}
              disabled={isRunning}
            >
              🌴 Break Panjang
            </button>
          </div>

          {mode === 'pomodoro' && !isRunning && (
            <div className="subject-input">
              <input
                type="text"
                placeholder="Mata pelajaran yang akan dipelajari..."
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                className="subject-field"
              />
            </div>
          )}

          <div className="timer-display">
            <svg className="timer-circle" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="10"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={mode === 'pomodoro' ? '#4caf50' : '#ff9800'}
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="timer-text">
              <h2 className="time-display">{formatTime(timeLeft)}</h2>
              {currentSubject && mode === 'pomodoro' && (
                <p className="current-subject">{currentSubject}</p>
              )}
            </div>
          </div>

          <div className="timer-controls">
            {!isRunning ? (
              <button className="btn-start" onClick={startTimer}>
                ▶️ Mulai
              </button>
            ) : (
              <button className="btn-pause" onClick={pauseTimer}>
                ⏸️ Pause
              </button>
            )}
            <button className="btn-reset" onClick={resetTimer}>
              🔄 Reset
            </button>
          </div>

          <div className="pomodoro-counter">
            <p>Pomodoro Hari Ini: <strong>{completedPomodoros}</strong></p>
            <div className="pomodoro-dots">
              {[...Array(4)].map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot ${idx < (completedPomodoros % 4) ? 'completed' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="timer-stats">
          <div className="stat-card">
            <h3>📊 Statistik Hari Ini</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Sesi</span>
                <span className="stat-value">{getTodaySessions().length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Waktu</span>
                <span className="stat-value">{Math.floor(getTodaySessions().reduce((sum, s) => sum + s.duration, 0) / 60)} menit</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pomodoro</span>
                <span className="stat-value">{completedPomodoros}</span>
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          {getSubjectBreakdown().length > 0 && (
            <div className="stat-card">
              <h3>📚 Breakdown Per Mata Pelajaran</h3>
              <div className="subject-breakdown">
                {getSubjectBreakdown().map((item, idx) => (
                  <div key={idx} className="breakdown-item">
                    <div className="breakdown-header">
                      <span className="breakdown-subject">{item.subject}</span>
                      <span className="breakdown-time">{item.time} menit</span>
                    </div>
                    <div className="breakdown-bar">
                      <div 
                        className="breakdown-fill" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Session History */}
          <div className="stat-card">
            <h3>📝 Riwayat Sesi</h3>
            {sessions.length > 0 ? (
              <div className="session-history">
                {sessions.slice(-5).reverse().map((session, idx) => (
                  <div key={idx} className="history-item">
                    <div className="history-icon">✅</div>
                    <div className="history-details">
                      <p className="history-subject">{session.subject}</p>
                      <p className="history-time">
                        {new Date(session.completedAt).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} - {Math.floor(session.duration / 60)} menit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Belum ada sesi yang diselesaikan</p>
                <p className="empty-hint">Mulai timer untuk mencatat sesi belajarmu!</p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="stat-card tips-card">
            <h3>💡 Tips Pomodoro</h3>
            <ul className="tips-list">
              <li>🎯 Fokus pada satu tugas selama 25 menit</li>
              <li>☕ Istirahat 5 menit setelah setiap pomodoro</li>
              <li>🌴 Istirahat 15-30 menit setelah 4 pomodoro</li>
              <li>📱 Matikan notifikasi saat belajar</li>
              <li>✅ Tandai setiap pomodoro yang selesai</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;