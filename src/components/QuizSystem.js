import React, { useState, useEffect } from 'react';
import '../styles/QuizSystem.css';
import { API } from "../config/api";

// Helper: acak array pakai Fisher-Yates shuffle
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const QUESTIONS_PER_QUIZ = 5;

const QuizSystem = ({ studentData, updateStudentData }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const quizzes = {
    matematika_sd: {
      title: 'Matematika SD - Operasi Hitung',
      level: 'SD',
      questions: [
        {
          question: '15 + 23 × 2 = ?',
          options: ['76', '61', '46', '31'],
          correct: 1,
          explanation: 'Menggunakan urutan operasi (perkalian dahulu): 23 × 2 = 46, kemudian 15 + 46 = 61'
        },
        {
          question: 'Jika 3x + 5 = 20, berapakah nilai x?',
          options: ['3', '4', '5', '6'],
          correct: 2,
          explanation: '3x + 5 = 20 → 3x = 15 → x = 5'
        },
        {
          question: 'Luas persegi panjang dengan panjang 8 cm dan lebar 5 cm adalah?',
          options: ['26 cm²', '40 cm²', '13 cm²', '80 cm²'],
          correct: 1,
          explanation: 'Luas = panjang × lebar = 8 × 5 = 40 cm²'
        },
        {
          question: 'Hasil dari 144 ÷ 12 + 8 = ?',
          options: ['20', '18', '16', '24'],
          correct: 0,
          explanation: 'Pembagian dahulu: 144 ÷ 12 = 12, kemudian 12 + 8 = 20'
        },
        {
          question: 'Keliling lingkaran dengan diameter 14 cm (π = 22/7) adalah?',
          options: ['44 cm', '88 cm', '154 cm', '22 cm'],
          correct: 0,
          explanation: 'Keliling = π × d = 22/7 × 14 = 44 cm'
        },
        {
          question: '25 - 8 + 3 = ?',
          options: ['14', '20', '18', '16'],
          correct: 1,
          explanation: 'Dikerjakan dari kiri ke kanan: 25 - 8 = 17, kemudian 17 + 3 = 20'
        },
        {
          question: 'Keliling persegi dengan sisi 9 cm adalah?',
          options: ['81 cm', '18 cm', '36 cm', '27 cm'],
          correct: 2,
          explanation: 'Keliling persegi = 4 × sisi = 4 × 9 = 36 cm'
        },
        {
          question: '7 × 6 - 12 = ?',
          options: ['42', '30', '18', '24'],
          correct: 1,
          explanation: 'Perkalian dahulu: 7 × 6 = 42, kemudian 42 - 12 = 30'
        },
        {
          question: 'Hasil dari 1/2 + 1/4 adalah?',
          options: ['1/6', '2/6', '3/4', '2/4'],
          correct: 2,
          explanation: 'Samakan penyebut: 1/2 = 2/4, maka 2/4 + 1/4 = 3/4'
        },
        {
          question: 'Volume balok dengan panjang 4 cm, lebar 3 cm, tinggi 2 cm adalah?',
          options: ['9 cm³', '24 cm³', '18 cm³', '12 cm³'],
          correct: 1,
          explanation: 'Volume balok = p × l × t = 4 × 3 × 2 = 24 cm³'
        }
      ]
    },
    matematika_smp: {
      title: 'Matematika SMP - Aljabar',
      level: 'SMP',
      questions: [
        {
          question: 'Tentukan nilai dari (2x + 3)(x - 4) jika x = 5',
          options: ['13', '26', '39', '52'],
          correct: 0,
          explanation: 'Substitusi x = 5: (2(5) + 3)(5 - 4) = (13)(1) = 13'
        },
        {
          question: 'Jika f(x) = 2x² - 3x + 1, berapakah f(2)?',
          options: ['1', '2', '3', '4'],
          correct: 2,
          explanation: 'f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3'
        },
        {
          question: 'Hasil dari √(81 + 144) adalah?',
          options: ['9', '12', '15', '18'],
          correct: 2,
          explanation: '√(81 + 144) = √225 = 15'
        },
        {
          question: 'Persamaan garis yang melalui (0,3) dan (2,7) adalah?',
          options: ['y = 2x + 3', 'y = x + 3', 'y = 3x + 2', 'y = 4x + 3'],
          correct: 0,
          explanation: 'Gradien m = (7-3)/(2-0) = 2, dengan c = 3, maka y = 2x + 3'
        },
        {
          question: 'Luas segitiga dengan alas 12 cm dan tinggi 8 cm adalah?',
          options: ['48 cm²', '96 cm²', '24 cm²', '60 cm²'],
          correct: 0,
          explanation: 'Luas = ½ × alas × tinggi = ½ × 12 × 8 = 48 cm²'
        },
        {
          question: 'Bentuk sederhana dari 3(x + 2) - 2(x - 1) adalah?',
          options: ['x + 8', 'x + 4', '5x + 4', 'x + 6'],
          correct: 0,
          explanation: '3(x+2) - 2(x-1) = 3x + 6 - 2x + 2 = x + 8'
        },
        {
          question: 'Sebuah segitiga siku-siku punya sisi tegak 6 cm dan 8 cm. Panjang hipotenusanya adalah?',
          options: ['10 cm', '12 cm', '14 cm', '9 cm'],
          correct: 0,
          explanation: 'Pythagoras: c = √(6² + 8²) = √(36+64) = √100 = 10 cm'
        },
        {
          question: 'Penyelesaian dari sistem persamaan x + y = 7 dan x - y = 1 adalah?',
          options: ['x=4, y=3', 'x=3, y=4', 'x=5, y=2', 'x=2, y=5'],
          correct: 0,
          explanation: 'Jumlahkan kedua persamaan: 2x = 8 → x = 4, maka y = 7 - 4 = 3'
        },
        {
          question: 'Faktorkan bentuk x² - 9!',
          options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)²', '(x+3)²'],
          correct: 0,
          explanation: 'x² - 9 adalah selisih kuadrat: x² - 3² = (x-3)(x+3)'
        },
        {
          question: 'Jarak sebenarnya jika pada peta berskala 1:50000 tergambar 4 cm adalah?',
          options: ['2 km', '20 km', '200 km', '0.2 km'],
          correct: 0,
          explanation: 'Jarak asli = 4 × 50000 cm = 200000 cm = 2 km'
        }
      ]
    },
    matematika_sma: {
      title: 'Matematika SMA - Trigonometri & Kalkulus',
      level: 'SMA',
      questions: [
        {
          question: 'Nilai dari sin²(30°) + cos²(30°) adalah?',
          options: ['0', '1', '½', '√3/2'],
          correct: 1,
          explanation: 'Identitas trigonometri: sin²θ + cos²θ = 1 untuk semua θ'
        },
        {
          question: 'Turunan dari f(x) = 3x³ - 2x² + 5x - 1 adalah?',
          options: ['9x² - 4x + 5', '3x² - 2x + 5', '6x² - 2x + 5', '9x² - 2x + 5'],
          correct: 0,
          explanation: 'f\'(x) = 3(3x²) - 2(2x) + 5 = 9x² - 4x + 5'
        },
        {
          question: 'Limit dari (x² - 4)/(x - 2) saat x → 2 adalah?',
          options: ['0', '2', '4', 'Tak terdefinisi'],
          correct: 2,
          explanation: '(x² - 4)/(x - 2) = (x+2)(x-2)/(x-2) = x + 2, saat x → 2 hasilnya 4'
        },
        {
          question: 'Integral dari ∫(6x² + 4x) dx adalah?',
          options: ['2x³ + 2x² + C', '3x³ + 2x² + C', '2x³ + 4x² + C', '6x³ + 4x² + C'],
          correct: 0,
          explanation: '∫(6x² + 4x) dx = 2x³ + 2x² + C'
        },
        {
          question: 'Dalam trigonometri, tan(45°) = ?',
          options: ['0', '½', '1', '√3'],
          correct: 2,
          explanation: 'tan(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1'
        },
        {
          question: 'Determinan dari matriks [[2,3],[1,4]] adalah?',
          options: ['5', '8', '11', '3'],
          correct: 0,
          explanation: 'Determinan = (2×4) - (3×1) = 8 - 3 = 5'
        },
        {
          question: 'Peluang muncul angka genap saat melempar 1 dadu adalah?',
          options: ['1/6', '1/3', '1/2', '2/3'],
          correct: 2,
          explanation: 'Angka genap pada dadu: 2,4,6 (3 dari 6 sisi), maka peluang = 3/6 = 1/2'
        },
        {
          question: 'Suku ke-10 dari barisan aritmatika 3, 7, 11, 15, ... adalah?',
          options: ['39', '35', '43', '41'],
          correct: 0,
          explanation: 'Un = a + (n-1)b = 3 + (10-1)×4 = 3 + 36 = 39'
        },
        {
          question: 'Jika vektor a = (3,4) maka panjang vektor a adalah?',
          options: ['5', '7', '12', '25'],
          correct: 0,
          explanation: '|a| = √(3² + 4²) = √(9+16) = √25 = 5'
        },
        {
          question: 'Nilai dari log₂ 8 adalah?',
          options: ['2', '3', '4', '8'],
          correct: 1,
          explanation: 'log₂ 8 = log₂ 2³ = 3'
        }
      ]
    }
  };

  useEffect(() => {
    if (currentQuiz && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      finishQuiz();
    }
  }, [timeLeft, currentQuiz, quizCompleted]);

  const startQuiz = (quizType) => {
    const original = quizzes[quizType];
    const randomQuestions = shuffleArray(original.questions).slice(0, QUESTIONS_PER_QUIZ);

    setCurrentQuiz({ ...original, questions: randomQuestions });
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(600);
    setQuizCompleted(false);
    setAnswers([]);
    setShowExplanation(false);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuiz.questions[currentQuestion].correct;
    const newAnswers = [...answers, {
      question: currentQuestion,
      selected: selectedAnswer,
      correct: currentQuiz.questions[currentQuestion].correct,
      isCorrect
    }];
    
    setAnswers(newAnswers);
    if (isCorrect) setScore(score + 20);

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizCompleted(true);

    const token = localStorage.getItem("token");

    try {
      await fetch(API.saveQuiz, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: currentQuiz.title,
          score,
          totalQuestions: currentQuiz.questions.length
        })
      });
    } catch (err) {
      console.error("ERROR SAVE:", err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentQuiz) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>🎯 Sistem Kuis Interaktif</h1>
          <p>Uji pemahamanmu dengan kuis interaktif berkualitas</p>
        </div>
        
        <div className="quiz-selection">
          <div className="quiz-card" onClick={() => startQuiz('matematika_sd')}>
            <div className="quiz-icon">📚</div>
            <h3>Matematika SD</h3>
            <p>Operasi Hitung Dasar</p>
            <div className="quiz-info">
              <span>⏱️ 10 menit</span>
              <span>❓ {QUESTIONS_PER_QUIZ} soal (acak dari {quizzes.matematika_sd.questions.length})</span>
            </div>
          </div>
          
          <div className="quiz-card" onClick={() => startQuiz('matematika_smp')}>
            <div className="quiz-icon">📐</div>
            <h3>Matematika SMP</h3>
            <p>Aljabar & Geometri</p>
            <div className="quiz-info">
              <span>⏱️ 10 menit</span>
              <span>❓ {QUESTIONS_PER_QUIZ} soal (acak dari {quizzes.matematika_smp.questions.length})</span>
            </div>
          </div>
          
          <div className="quiz-card" onClick={() => startQuiz('matematika_sma')}>
            <div className="quiz-icon">📊</div>
            <h3>Matematika SMA</h3>
            <p>Trigonometri & Kalkulus</p>
            <div className="quiz-info">
              <span>⏱️ 10 menit</span>
              <span>❓ {QUESTIONS_PER_QUIZ} soal (acak dari {quizzes.matematika_sma.questions.length})</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / (currentQuiz.questions.length * 20)) * 100;
    const grade = percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'D';
    
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <h1>🎉 Kuis Selesai!</h1>
          <div className="result-card">
            <div className="result-score">
              <div className="score-circle" style={{
                background: `conic-gradient(#4caf50 ${percentage * 3.6}deg, #e0e0e0 0deg)`
              }}>
                <div className="score-inner">
                  <span className="grade">{grade}</span>
                  <span className="percentage">{percentage.toFixed(0)}%</span>
                </div>
              </div>
            </div>
            
            <div className="result-details">
              <h3>{currentQuiz.title}</h3>
              <div className="detail-row">
                <span>Skor:</span>
                <strong>{score} / {currentQuiz.questions.length * 20}</strong>
              </div>
              <div className="detail-row">
                <span>Benar:</span>
                <strong>{answers.filter(a => a.isCorrect).length} / {currentQuiz.questions.length}</strong>
              </div>
              <div className="detail-row">
                <span>Waktu:</span>
                <strong>{formatTime(600 - timeLeft)}</strong>
              </div>
            </div>
          </div>
          
          <div className="answer-review">
            <h3>📋 Review Jawaban</h3>
            {currentQuiz.questions.map((q, idx) => {
              const answer = answers[idx];
              return (
                <div key={idx} className={`review-item ${answer?.isCorrect ? 'correct' : 'wrong'}`}>
                  <div className="review-header">
                    <span className="review-number">Soal {idx + 1}</span>
                    <span className="review-status">
                      {answer?.isCorrect ? '✅ Benar' : '❌ Salah'}
                    </span>
                  </div>
                  <p className="review-question">{q.question}</p>
                  <p className="review-answer">
                    Jawaban Anda: <strong>{q.options[answer?.selected]}</strong>
                  </p>
                  {!answer?.isCorrect && (
                    <p className="review-correct">
                      Jawaban Benar: <strong>{q.options[q.correct]}</strong>
                    </p>
                  )}
                  <p className="review-explanation">💡 {q.explanation}</p>
                </div>
              );
            })}
          </div>
          
            <button
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Kembali ke Menu Kuis
            </button>
        </div>
      </div>
    );
  }

  const question = currentQuiz.questions[currentQuestion];
  
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
            />
          </div>
          <span>Soal {currentQuestion + 1} dari {currentQuiz.questions.length}</span>
        </div>
        
        <div className="quiz-timer">
          <span className={timeLeft < 60 ? 'timer-warning' : ''}>
            ⏱️ {formatTime(timeLeft)}
          </span>
        </div>
        
        <div className="quiz-score">
          Skor: {score}
        </div>
      </div>
      
      <div className="question-card">
        <h2>{question.question}</h2>
        
        <div className="options-grid">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`option-btn ${selectedAnswer === idx ? 'selected' : ''} 
                ${showExplanation && idx === question.correct ? 'correct' : ''}
                ${showExplanation && idx === selectedAnswer && idx !== question.correct ? 'wrong' : ''}`}
              onClick={() => !showExplanation && selectAnswer(idx)}
              disabled={showExplanation}
            >
              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
        
        {showExplanation && (
          <div className="explanation-box">
            <h4>💡 Penjelasan:</h4>
            <p>{question.explanation}</p>
          </div>
        )}
        
        <div className="quiz-actions">
          {!showExplanation ? (
            <button 
              className="btn-submit" 
              onClick={submitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit Jawaban
            </button>
          ) : (
            <button className="btn-next" onClick={nextQuestion}>
              {currentQuestion < currentQuiz.questions.length - 1 ? 'Soal Berikutnya →' : 'Selesai'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSystem;