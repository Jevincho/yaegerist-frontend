import React, { useState, useEffect } from 'react';
import '../styles/AchievementSystem.css';
import { API } from "../config/api";

const AchievementSystem = ({ studentData }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedTab, setSelectedTab] = useState('achievements');
  const [profile, setProfile] = useState(null);

  const fetchProfile = () => {
    const token = localStorage.getItem("token");

    fetch(API.profile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Define all achievements
  const allAchievements = [
    {
      id: 'first_quiz',
      name: 'Langkah Pertama',
      description: 'Selesaikan kuis pertamamu',
      icon: '🎯',
      points: 10,
      requirement: { type: 'quiz', count: 1 }
    },
    {
      id: 'quiz_master',
      name: 'Master Kuis',
      description: 'Selesaikan 10 kuis',
      icon: '🏆',
      points: 50,
      requirement: { type: 'quiz', count: 10 }
    },
    {
      id: 'perfect_score',
      name: 'Skor Sempurna',
      description: 'Dapatkan nilai 100 dalam kuis',
      icon: '⭐',
      points: 30,
      requirement: { type: 'perfect', score: 100 }
    },
    {
      id: 'study_streak_3',
      name: 'Konsisten',
      description: 'Belajar 3 hari berturut-turut',
      icon: '🔥',
      points: 20,
      requirement: { type: 'streak', days: 3 }
    },
    {
      id: 'study_streak_7',
      name: 'Dedikasi Tinggi',
      description: 'Belajar 7 hari berturut-turut',
      icon: '🔥🔥',
      points: 50,
      requirement: { type: 'streak', days: 7 }
    },
    {
      id: 'flashcard_expert',
      name: 'Flashcard Expert',
      description: 'Review 50 flashcard',
      icon: '🎴',
      points: 40,
      requirement: { type: 'flashcard', count: 50 }
    },
    {
      id: 'early_bird',
      name: 'Early Bird',
      description: 'Belajar sebelum jam 7 pagi',
      icon: '🌅',
      points: 15,
      requirement: { type: 'early_study' }
    },
    {
      id: 'night_owl',
      name: 'Night Owl',
      description: 'Belajar setelah jam 10 malam',
      icon: '🦉',
      points: 15,
      requirement: { type: 'late_study' }
    },
    {
      id: 'helpful_student',
      name: 'Siswa Membantu',
      description: 'Jawab 5 pertanyaan di forum',
      icon: '🤝',
      points: 25,
      requirement: { type: 'forum_replies', count: 5 }
    },
    {
      id: 'study_marathon',
      name: 'Marathon Belajar',
      description: 'Belajar total 10 jam',
      icon: '⏰',
      points: 60,
      requirement: { type: 'study_time', hours: 10 }
    },
    {
      id: 'math_genius',
      name: 'Jenius Matematika',
      description: 'Rata-rata skor matematika 90+',
      icon: '📐',
      points: 70,
      requirement: { type: 'subject_avg', subject: 'matematika', score: 90 }
    },
    {
      id: 'point_collector',
      name: 'Kolektor Poin',
      description: 'Kumpulkan 500 poin',
      icon: '💰',
      points: 20,
      requirement: { type: 'total_points', points: 500 }
    },
    {
      id: 'all_rounder',
      name: 'Serba Bisa',
      description: 'Selesaikan kuis dari 3 mata pelajaran berbeda',
      icon: '🌟',
      points: 35,
      requirement: { type: 'diverse_subjects', count: 3 }
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      description: 'Selesaikan kuis dalam waktu < 5 menit',
      icon: '⚡',
      points: 25,
      requirement: { type: 'quick_quiz', time: 300 }
    },
    {
      id: 'comeback_kid',
      name: 'Bangkit Kembali',
      description: 'Tingkatkan skor 20 poin dari kuis sebelumnya',
      icon: '📈',
      points: 30,
      requirement: { type: 'improvement' }
    }
  ];

  useEffect(() => {
    checkAchievements();
    loadLeaderboard();
  }, [studentData]);

  const checkAchievements = () => {
    const history = studentData.studyHistory || [];
    const unlocked = [];
    const token = localStorage.getItem("token");

    allAchievements.forEach((achievement) => {
      if (isAchievementUnlocked(achievement, history)) {
        unlocked.push({
          ...achievement,
          unlockedAt: new Date().toISOString()
        });

        // claim achievement ke backend
        fetch(API.claimAchievement, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            achievementId: achievement.id,
            points: achievement.points
          })
        })
          .then(res => res.json())
          .then(data => console.log(data.message))
          .catch(err => console.error(err));
      }
    });

    setUnlockedAchievements(unlocked);
  };

  const isAchievementUnlocked = (achievement, history) => {
    const { requirement } = achievement;

    switch (requirement.type) {
      case 'quiz':
        const quizzes = history.filter(h => h.type === 'quiz');
        return quizzes.length >= requirement.count;

      case 'perfect':
        return history.some(h => h.type === 'quiz' && h.score >= requirement.score);

      case 'streak':
        return calculateStreak(history) >= requirement.days;

      case 'flashcard':
        const totalCards = profile?.cardReviewed || 0;
        return totalCards >= requirement.count;

      case 'early_study':
        return history.some(h => {
          const hour = new Date(h.date).getHours();
          return hour < 7;
        });

      case 'late_study':
        return history.some(h => {
          const hour = new Date(h.date).getHours();
          return hour >= 22;
        });

      case 'forum_replies':
        // This would need forum data integration
        return false;

      case 'study_time':
        const totalMinutes = history
          .filter(h => h.type === 'study')
          .reduce((sum, h) => sum + (h.duration || 0), 0);
        return totalMinutes >= requirement.hours * 3600;

      case 'subject_avg':
        const subjectQuizzes = history.filter(h => 
          h.type === 'quiz' && 
          h.subject && 
          h.subject.toLowerCase().includes(requirement.subject)
        );
        if (subjectQuizzes.length === 0) return false;
        const avg = subjectQuizzes.reduce((sum, q) => sum + q.score, 0) / subjectQuizzes.length;
        return avg >= requirement.score;

      case 'total_points':
        return (profile?.points || 0) >= requirement.points;

      case 'diverse_subjects':
        const subjects = new Set(history.filter(h => h.subject).map(h => h.subject));
        return subjects.size >= requirement.count;

      case 'quick_quiz':
        return history.some(h => {
          if (h.type !== 'quiz') return false;
          // Assuming quiz time is stored (would need implementation)
          return h.completionTime && h.completionTime < requirement.time;
        });

      case 'improvement':
        const quizHistory = history.filter(h => h.type === 'quiz').sort((a, b) => 
          new Date(a.date) - new Date(b.date)
        );
        for (let i = 1; i < quizHistory.length; i++) {
          if (quizHistory[i].score - quizHistory[i - 1].score >= 20) {
            return true;
          }
        }
        return false;

      default:
        return false;
    }
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

  const loadLeaderboard = () => {
    fetch(API.leaderboard)
      .then(res => res.json())
      .then(data => {
        const ranked = data.map((user, index) => ({
          ...user,
          rank: index + 1
        }));

        setLeaderboard(ranked);
      })
      .catch(err => console.error(err));
  };

  const getProgressToNext = (achievement) => {
    const history = studentData.studyHistory || [];
    const { requirement } = achievement;

    switch (requirement.type) {
      case 'quiz':
        const quizzes = history.filter(h => h.type === 'quiz');
        return Math.min((quizzes.length / requirement.count) * 100, 100);

      case 'flashcard':
        const totalCards = profile?.cardReviewed || 0;
        return Math.min((totalCards / requirement.count) * 100, 100);

      case 'streak':
        const streak = calculateStreak(history);
        return Math.min((streak / requirement.days) * 100, 100);

      case 'total_points':
        return Math.min(((profile?.points || 0) / requirement.points) * 100, 100);

      default:
        return 0;
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="achievement-container">
      <div className="achievement-header">
        <h1>🏆 Achievement & Gamification</h1>
        <p>Kumpulkan badge dan naik peringkat!</p>
      </div>

      <div className="achievement-tabs">
        <button 
          className={`tab-btn ${selectedTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setSelectedTab('achievements')}
        >
          🏅 Achievements
        </button>
        <button 
          className={`tab-btn ${selectedTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setSelectedTab('leaderboard')}
        >
          👑 Leaderboard
        </button>
        <button 
          className={`tab-btn ${selectedTab === 'stats' ? 'active' : ''}`}
          onClick={() => setSelectedTab('stats')}
        >
          📊 Statistik
        </button>
      </div>

      {selectedTab === 'achievements' && (
        <div className="achievements-content">
          <div className="achievements-summary">
            <div className="summary-card">
              <h3>Unlocked</h3>
              <p className="big-number">{unlockedAchievements.length}</p>
              <p className="small-text">dari {allAchievements.length} achievements</p>
            </div>
            <div className="summary-card">
              <h3>Total Points</h3>
              <p className="big-number">
                {profile?.points || 0}
              </p>
              <p className="small-text">⭐ poin</p>
            </div>
            <div className="summary-card">
              <h3>Progress</h3>
              <p className="big-number">
                {Math.round((unlockedAchievements.length / allAchievements.length) * 100)}%
              </p>
              <p className="small-text">selesai</p>
            </div>
          </div>

          <div className="achievements-section">
            <h3>✅ Achievements Terbuka ({unlockedAchievements.length})</h3>
            <div className="achievements-grid">
              {unlockedAchievements.map(achievement => (
                <div key={achievement.id} className="achievement-card unlocked">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                  <div className="achievement-points">+{achievement.points} pts</div>
                  <div className="unlocked-badge">✓ Unlocked</div>
                </div>
              ))}
            </div>
          </div>

          <div className="achievements-section">
            <h3>🔒 Achievements Terkunci</h3>
            <div className="achievements-grid">
              {allAchievements
                .filter(a => !unlockedAchievements.some(u => u.id === a.id))
                .map(achievement => {
                  const progress = getProgressToNext(achievement);
                  return (
                    <div key={achievement.id} className="achievement-card locked">
                      <div className="achievement-icon grayscale">{achievement.icon}</div>
                      <h4>{achievement.name}</h4>
                      <p>{achievement.description}</p>
                      <div className="achievement-points">+{achievement.points} pts</div>
                      {progress > 0 && (
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${progress}%` }} />
                          <span className="progress-text">{Math.round(progress)}%</span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'leaderboard' && (
        <div className="leaderboard-content">
          <div className="leaderboard-podium">
            {leaderboard.slice(0, 3).map((user, idx) => (
              <div key={idx} className={`podium-place place-${idx + 1}`}>
                <div className="podium-rank">{getRankBadge(idx + 1)}</div>
                <div className="podium-avatar">{user.name.charAt(0)}</div>
                <div className="podium-name">{user.name}</div>
                <div className="podium-points">{user.points} pts</div>
              </div>
            ))}
          </div>

          <div className="leaderboard-table">
            <table>
              <thead>
                <tr>
                  <th>Peringkat</th>
                  <th>Nama</th>
                  <th>Poin</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, idx) => (
                  <tr 
                    key={idx} 
                    className={user.name === profile?.name ? 'current-user' : ''}
                  >
                    <td>
                      <span className="rank-badge">{getRankBadge(user.rank)}</span>
                    </td>
                    <td>
                      <strong>{user.name}</strong>
                      {user.name === profile?.name && <span className="you-badge"> (Kamu)</span>}
                    </td>
                    <td><strong>{user.points}</strong> pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === 'stats' && (
        <div className="stats-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <h3>Kuis Diselesaikan</h3>
              <p className="stat-number">
                {(studentData.studyHistory || []).filter(h => h.type === 'quiz').length}
              </p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎴</div>
              <h3>Flashcard Direview</h3>
              <p className="stat-number">
                {profile?.cardReviewed || 0}
              </p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏰</div>
              <h3>Total Waktu Belajar</h3>
              <p className="stat-number">
                    {Math.floor((profile?.duration || 0) / 3600)} jam
              </p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <h3>Streak</h3>
              <p className="stat-number">
                {calculateStreak(studentData.studyHistory || [])} hari
              </p>
            </div>
          </div>

          <div className="milestones-section">
            <h3>🎯 Milestone Berikutnya</h3>
            <div className="milestones-list">
              <div className="milestone-item">
                <div className="milestone-info">
                  <strong>Selesaikan 10 kuis</strong>
                  <p>Unlock achievement "Master Kuis" 🏆</p>
                </div>
                <div className="milestone-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ 
                      width: `${Math.min(((studentData.studyHistory || []).filter(h => h.type === 'quiz').length / 10) * 100, 100)}%` 
                    }} />
                  </div>
                  <span>
                    {(studentData.studyHistory || []).filter(h => h.type === 'quiz').length} / 10
                  </span>
                </div>
              </div>

              <div className="milestone-item">
                <div className="milestone-info">
                  <strong>Kumpulkan 500 poin</strong>
                  <p>Unlock achievement "Kolektor Poin" 💰</p>
                </div>
                <div className="milestone-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ 
                      width: `${Math.min(((profile?.points || 0) / 500) * 100, 100)}%` 
                    }} />
                  </div>
                  <span>{profile?.points || 0} / 500</span>
                </div>
              </div>

              <div className="milestone-item">
                <div className="milestone-info">
                  <strong>Belajar 7 hari beruntun</strong>
                  <p>Unlock achievement "Dedikasi Tinggi" 🔥🔥</p>
                </div>
                <div className="milestone-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ 
                      width: `${Math.min((calculateStreak(profile?.studyHistory || []) / 7) * 100, 100)}%` 
                    }} />
                  </div>
                  <span>
                    {calculateStreak(studentData.studyHistory || [])} / 7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementSystem;