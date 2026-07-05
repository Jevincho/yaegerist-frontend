import React, { useState, useEffect } from 'react';
import '../styles/StudyRecommendation.css';

const StudyRecommendation = ({ studentData }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState({});
  const [studyPlan, setStudyPlan] = useState([]);

  useEffect(() => {
    analyzePerformance();
    generateRecommendations();
    createStudyPlan();
  }, [studentData]);

  const analyzePerformance = () => {
    const history = studentData.studyHistory || [];
    
    // Analyze quiz performance by subject
    const quizzes = history.filter(h => h.type === 'quiz');
    const subjectPerformance = {};
    
    quizzes.forEach(quiz => {
      if (quiz.subject) {
        if (!subjectPerformance[quiz.subject]) {
          subjectPerformance[quiz.subject] = {
            totalScore: 0,
            count: 0,
            scores: []
          };
        }
        subjectPerformance[quiz.subject].totalScore += quiz.score;
        subjectPerformance[quiz.subject].count++;
        subjectPerformance[quiz.subject].scores.push(quiz.score);
      }
    });

    // Calculate averages and identify weak areas
    const weakAreas = [];
    const strongAreas = [];
    
    Object.entries(subjectPerformance).forEach(([subject, data]) => {
      const average = data.totalScore / data.count;
      const trend = calculateTrend(data.scores);
      
      if (average < 60) {
        weakAreas.push({ subject, average, trend, status: 'weak' });
      } else if (average >= 80) {
        strongAreas.push({ subject, average, trend, status: 'strong' });
      }
    });

    // Analyze study patterns
    const studyTimes = history.map(h => new Date(h.date).getHours());
    const mostProductiveTime = getMostFrequent(studyTimes);
    
    // Analyze study consistency
    const dates = history.map(h => new Date(h.date).toDateString());
    const uniqueDates = [...new Set(dates)];
    const avgSessionsPerDay = history.length / Math.max(uniqueDates.length, 1);

    setInsights({
      weakAreas,
      strongAreas,
      mostProductiveTime,
      avgSessionsPerDay: avgSessionsPerDay.toFixed(1),
      totalSessions: history.length,
      subjectPerformance
    });
  };

  const calculateTrend = (scores) => {
    if (scores.length < 2) return 'stable';
    
    const recent = scores.slice(-3);
    const older = scores.slice(0, -3);
    
    if (older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    if (recentAvg > olderAvg + 10) return 'improving';
    if (recentAvg < olderAvg - 10) return 'declining';
    return 'stable';
  };

  const getMostFrequent = (arr) => {
    if (arr.length === 0) return null;
    
    const frequency = {};
    arr.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    return Object.keys(frequency).find(key => frequency[key] === maxFreq);
  };

  const generateRecommendations = () => {
    const recs = [];
    const history = studentData.studyHistory || [];

    // Recommendation based on weak areas
    if (studentData.weakAreas && studentData.weakAreas.length > 0) {
      recs.push({
        type: 'urgent',
        icon: '⚠️',
        title: 'Fokus pada Area Lemah',
        description: `Kamu perlu meningkatkan pemahaman di: ${studentData.weakAreas.join(', ')}`,
        action: 'Mulai dengan flashcard dan kuis dasar',
        priority: 'high'
      });
    }

    // Recommendation based on quiz frequency
    const quizzes = history.filter(h => h.type === 'quiz');
    if (quizzes.length === 0) {
      recs.push({
        type: 'action',
        icon: '🎯',
        title: 'Mulai Mengikuti Kuis',
        description: 'Kuis adalah cara terbaik untuk menguji pemahamanmu',
        action: 'Coba kuis pertamamu sekarang',
        priority: 'high'
      });
    } else if (quizzes.length < 5) {
      recs.push({
        type: 'action',
        icon: '📈',
        title: 'Tingkatkan Latihan',
        description: 'Lakukan lebih banyak kuis untuk hasil yang lebih baik',
        action: 'Target: 3 kuis per minggu',
        priority: 'medium'
      });
    }

    // Recommendation based on study consistency
    const dates = history.map(h => new Date(h.date).toDateString());
    const uniqueDates = [...new Set(dates)];
    const daysSinceStart = Math.max((new Date() - new Date(history[history.length - 1]?.date || new Date())) / (1000 * 60 * 60 * 24), 1);
    const consistency = uniqueDates.length / daysSinceStart;

    if (consistency < 0.5) {
      recs.push({
        type: 'habit',
        icon: '📅',
        title: 'Buat Jadwal Belajar Rutin',
        description: 'Konsistensi adalah kunci kesuksesan belajar',
        action: 'Atur target belajar setiap hari',
        priority: 'high'
      });
    }

    // Recommendation based on study time
    const studySessions = history.filter(h => h.type === 'study');
    if (studySessions.length === 0) {
      recs.push({
        type: 'feature',
        icon: '⏱️',
        title: 'Gunakan Study Timer',
        description: 'Teknik Pomodoro meningkatkan fokus dan produktivitas',
        action: 'Coba study timer sekarang',
        priority: 'medium'
      });
    }

    // Recommendation based on flashcard usage
    const flashcards = history.filter(h => h.type === 'flashcard');
    if (flashcards.length === 0) {
      recs.push({
        type: 'feature',
        icon: '🎴',
        title: 'Manfaatkan Flashcard',
        description: 'Flashcard dengan spaced repetition meningkatkan daya ingat',
        action: 'Mulai review flashcard',
        priority: 'medium'
      });
    }

    // Advanced recommendations based on performance trends
    if (insights.weakAreas && insights.weakAreas.some(a => a.trend === 'declining')) {
      recs.push({
        type: 'urgent',
        icon: '📉',
        title: 'Perhatian: Penurunan Performa',
        description: 'Ada penurunan di beberapa mata pelajaran',
        action: 'Review materi dasar dan konsultasi dengan tutor',
        priority: 'high'
      });
    }

    // Study method diversification
    const activityTypes = new Set(history.map(h => h.type));
    if (activityTypes.size < 3) {
      recs.push({
        type: 'strategy',
        icon: '🎯',
        title: 'Variasikan Metode Belajar',
        description: 'Gunakan berbagai metode untuk hasil maksimal',
        action: 'Kombinasi kuis, flashcard, dan diskusi forum',
        priority: 'low'
      });
    }

    // Peak performance time recommendation
    if (insights.mostProductiveTime) {
      const hour = parseInt(insights.mostProductiveTime);
      const timeStr = hour < 12 ? 'pagi' : hour < 18 ? 'siang' : 'malam';
      recs.push({
        type: 'insight',
        icon: '🕐',
        title: 'Waktu Produktif Optimal',
        description: `Kamu paling produktif belajar di waktu ${timeStr}`,
        action: `Jadwalkan sesi penting jam ${hour}:00`,
        priority: 'low'
      });
    }

    setRecommendations(recs.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }));
  };

  const createStudyPlan = () => {
    const plan = [];
    const today = new Date();

    // Week 1: Foundation
    plan.push({
      week: 1,
      title: 'Foundation Building',
      description: 'Membangun dasar yang kuat',
      tasks: [
        { day: 1, task: 'Review konsep dasar dengan flashcard', type: 'flashcard', duration: 30 },
        { day: 2, task: 'Kuis diagnostik untuk identifikasi area lemah', type: 'quiz', duration: 45 },
        { day: 3, task: 'Fokus belajar area lemah', type: 'study', duration: 60 },
        { day: 4, task: 'Latihan soal dengan timer', type: 'quiz', duration: 45 },
        { day: 5, task: 'Review dan diskusi di forum', type: 'forum', duration: 30 },
        { day: 6, task: 'Kuis progress check', type: 'quiz', duration: 45 },
        { day: 7, task: 'Istirahat dan refleksi', type: 'rest', duration: 0 }
      ]
    });

    // Week 2: Practice & Improvement
    plan.push({
      week: 2,
      title: 'Practice & Improvement',
      description: 'Meningkatkan pemahaman melalui latihan',
      tasks: [
        { day: 1, task: 'Intensive flashcard review', type: 'flashcard', duration: 45 },
        { day: 2, task: 'Kuis tingkat menengah', type: 'quiz', duration: 60 },
        { day: 3, task: 'Study session dengan Pomodoro', type: 'study', duration: 90 },
        { day: 4, task: 'Bantu teman di forum (teaching = learning)', type: 'forum', duration: 30 },
        { day: 5, task: 'Advanced quiz', type: 'quiz', duration: 60 },
        { day: 6, task: 'Review kesalahan dan perbaikan', type: 'study', duration: 60 },
        { day: 7, task: 'Weekly evaluation', type: 'quiz', duration: 45 }
      ]
    });

    // Week 3-4: Mastery
    plan.push({
      week: 3,
      title: 'Mastery & Optimization',
      description: 'Mencapai penguasaan materi',
      tasks: [
        { day: 1, task: 'Spaced repetition review', type: 'flashcard', duration: 30 },
        { day: 2, task: 'Challenge quiz', type: 'quiz', duration: 60 },
        { day: 3, task: 'Deep dive study session', type: 'study', duration: 120 },
        { day: 4, task: 'Peer teaching di forum', type: 'forum', duration: 45 },
        { day: 5, task: 'Mixed subject quiz', type: 'quiz', duration: 90 },
        { day: 6, task: 'Comprehensive review', type: 'study', duration: 90 },
        { day: 7, task: 'Final assessment', type: 'quiz', duration: 60 }
      ]
    });

    setStudyPlan(plan);
  };

  const getTaskIcon = (type) => {
    const icons = {
      flashcard: '🎴',
      quiz: '🎯',
      study: '📚',
      forum: '💬',
      rest: '😴'
    };
    return icons[type] || '📝';
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  return (
    <div className="recommendation-container">
      <div className="recommendation-header">
        <h1>🤖 AI Study Recommendation</h1>
        <p>Rekomendasi belajar personal berdasarkan performa kamu</p>
      </div>

      {/* Performance Insights */}
      <div className="insights-section">
        <h2>📊 Insight Performa</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Total Sesi Belajar</h3>
            <p className="insight-number">{insights.totalSessions || 0}</p>
            <p className="insight-label">aktivitas tercatat</p>
          </div>
          
          <div className="insight-card">
            <h3>Rata-rata Sesi/Hari</h3>
            <p className="insight-number">{insights.avgSessionsPerDay || 0}</p>
            <p className="insight-label">sesi per hari</p>
          </div>
          
          {insights.mostProductiveTime && (
            <div className="insight-card">
              <h3>Waktu Paling Produktif</h3>
              <p className="insight-number">{insights.mostProductiveTime}:00</p>
              <p className="insight-label">
                {parseInt(insights.mostProductiveTime) < 12 ? 'Pagi' : 
                 parseInt(insights.mostProductiveTime) < 18 ? 'Siang' : 'Malam'}
              </p>
            </div>
          )}
        </div>

        {/* Strong and Weak Areas */}
        <div className="performance-breakdown">
          {insights.strongAreas && insights.strongAreas.length > 0 && (
            <div className="performance-section strong">
              <h3>💪 Area Kuat</h3>
              {insights.strongAreas.map((area, idx) => (
                <div key={idx} className="performance-item">
                  <span className="subject-name">{area.subject}</span>
                  <span className="average-score">{Math.round(area.average)}%</span>
                  <span className={`trend trend-${area.trend}`}>
                    {area.trend === 'improving' ? '📈' : area.trend === 'declining' ? '📉' : '➡️'}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {insights.weakAreas && insights.weakAreas.length > 0 && (
            <div className="performance-section weak">
              <h3>⚠️ Area yang Perlu Ditingkatkan</h3>
              {insights.weakAreas.map((area, idx) => (
                <div key={idx} className="performance-item">
                  <span className="subject-name">{area.subject}</span>
                  <span className="average-score">{Math.round(area.average)}%</span>
                  <span className={`trend trend-${area.trend}`}>
                    {area.trend === 'improving' ? '📈' : area.trend === 'declining' ? '📉' : '➡️'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h2>💡 Rekomendasi Personal</h2>
        <div className="recommendations-list">
          {recommendations.map((rec, idx) => (
            <div key={idx} className={`recommendation-card ${getPriorityClass(rec.priority)}`}>
              <div className="rec-icon">{rec.icon}</div>
              <div className="rec-content">
                <div className="rec-header">
                  <h3>{rec.title}</h3>
                  <span className={`priority-badge ${rec.priority}`}>
                    {rec.priority === 'high' ? 'Prioritas Tinggi' : 
                     rec.priority === 'medium' ? 'Prioritas Sedang' : 'Opsional'}
                  </span>
                </div>
                <p className="rec-description">{rec.description}</p>
                <p className="rec-action">🎯 {rec.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Plan */}
      <div className="study-plan-section">
        <h2>📅 Rencana Belajar 4 Minggu</h2>
        <p className="section-subtitle">Plan terstruktur untuk mencapai hasil maksimal</p>
        
        <div className="study-plan-grid">
          {studyPlan.map((week, idx) => (
            <div key={idx} className="week-card">
              <div className="week-header">
                <h3>Minggu {week.week}</h3>
                <p>{week.title}</p>
              </div>
              <p className="week-description">{week.description}</p>
              
              <div className="tasks-list">
                {week.tasks.map((task, taskIdx) => (
                  <div key={taskIdx} className="task-item">
                    <div className="task-day">Hari {task.day}</div>
                    <div className="task-details">
                      <span className="task-icon">{getTaskIcon(task.type)}</span>
                      <span className="task-name">{task.task}</span>
                      {task.duration > 0 && (
                        <span className="task-duration">{task.duration} menit</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="tips-section">
        <h2>🎓 Tips Belajar Efektif</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>🧠 Spaced Repetition</h4>
            <p>Review materi secara berkala dengan jarak waktu yang meningkat untuk retensi jangka panjang</p>
          </div>
          <div className="tip-card">
            <h4>🍅 Pomodoro Technique</h4>
            <p>Belajar fokus 25 menit, istirahat 5 menit. Metode ini meningkatkan konsentrasi dan produktivitas</p>
          </div>
          <div className="tip-card">
            <h4>👥 Active Recall</h4>
            <p>Uji diri sendiri secara aktif daripada hanya membaca. Diskusi di forum juga sangat membantu</p>
          </div>
          <div className="tip-card">
            <h4>📈 Progressive Overload</h4>
            <p>Tingkatkan tingkat kesulitan secara bertahap untuk perkembangan yang konsisten</p>
          </div>
          <div className="tip-card">
            <h4>💤 Quality Sleep</h4>
            <p>Tidur 7-8 jam untuk konsolidasi memori dan performa kognitif optimal</p>
          </div>
          <div className="tip-card">
            <h4>🎯 Goal Setting</h4>
            <p>Set target spesifik, measurable, achievable untuk motivasi dan tracking progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyRecommendation;
