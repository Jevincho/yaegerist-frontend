import React, { useState, useEffect } from 'react';
import '../styles/FlashcardSystem.css';
import { API } from "../config/api";

const FlashcardSystem = ({ studentData, updateStudentData }) => {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Flashcard decks dengan Spaced Repetition
  const flashcardDecks = {
    matematika_rumus: {
      title: 'Rumus Matematika Penting',
      category: 'Matematika',
      icon: '📐',
      cards: [
        {
          front: 'Rumus Pythagoras',
          back: 'a² + b² = c²\n\nDimana:\na, b = sisi tegak\nc = sisi miring (hipotenusa)',
          example: 'Jika a = 3 dan b = 4, maka c = √(9 + 16) = √25 = 5'
        },
        {
          front: 'Rumus Kuadrat',
          back: 'x = [-b ± √(b² - 4ac)] / 2a\n\nUntuk persamaan: ax² + bx + c = 0',
          example: 'Untuk x² - 5x + 6 = 0:\nx = [5 ± √(25-24)] / 2 = [5 ± 1] / 2\nx₁ = 3, x₂ = 2'
        },
        {
          front: 'Luas Lingkaran',
          back: 'L = πr²\n\nDimana:\nπ = 3.14 atau 22/7\nr = jari-jari',
          example: 'Jika r = 7 cm:\nL = 22/7 × 7² = 22/7 × 49 = 154 cm²'
        },
        {
          front: 'Volume Kubus',
          back: 'V = s³\n\nDimana:\ns = panjang sisi',
          example: 'Jika s = 5 cm:\nV = 5³ = 125 cm³'
        },
        {
          front: 'Rumus Kecepatan',
          back: 'v = s / t\n\nDimana:\nv = kecepatan\ns = jarak\nt = waktu',
          example: 'Jika jarak 100 km, waktu 2 jam:\nv = 100/2 = 50 km/jam'
        },
        {
          front: 'Teorema Sudut Segitiga',
          back: '∠A + ∠B + ∠C = 180°\n\nJumlah sudut dalam segitiga adalah 180 derajat',
          example: 'Jika ∠A = 60° dan ∠B = 70°:\n∠C = 180° - 60° - 70° = 50°'
        }
      ]
    },
    fisika_konsep: {
      title: 'Konsep Dasar Fisika',
      category: 'Fisika',
      icon: '⚛️',
      cards: [
        {
          front: 'Hukum Newton I',
          back: 'Benda akan tetap diam atau bergerak lurus beraturan jika tidak ada gaya yang bekerja padanya',
          example: 'Bola di atas meja akan tetap diam sampai ada yang mendorongnya'
        },
        {
          front: 'Hukum Newton II',
          back: 'F = m × a\n\nGaya = massa × percepatan',
          example: 'Massa 10 kg, percepatan 2 m/s²:\nF = 10 × 2 = 20 N'
        },
        {
          front: 'Hukum Newton III',
          back: 'Setiap aksi memiliki reaksi yang sama besar dan berlawanan arah',
          example: 'Saat kita mendorong dinding, dinding mendorong kita dengan gaya yang sama'
        },
        {
          front: 'Energi Kinetik',
          back: 'Ek = ½mv²\n\nEnergi karena gerakan benda',
          example: 'Massa 2 kg, kecepatan 3 m/s:\nEk = ½ × 2 × 9 = 9 J'
        },
        {
          front: 'Energi Potensial',
          back: 'Ep = m × g × h\n\nEnergi karena posisi/ketinggian',
          example: 'Massa 5 kg, tinggi 10 m, g = 10 m/s²:\nEp = 5 × 10 × 10 = 500 J'
        }
      ]
    },
    bahasa_inggris: {
      title: 'Grammar Bahasa Inggris',
      category: 'Bahasa Inggris',
      icon: '🇬🇧',
      cards: [
        {
          front: 'Simple Present Tense',
          back: 'S + V1 + O\n\nDigunakan untuk:\n- Kebiasaan\n- Fakta umum\n- Kebenaran',
          example: 'I study English every day.\nThe sun rises in the east.'
        },
        {
          front: 'Present Continuous',
          back: 'S + am/is/are + V-ing + O\n\nDigunakan untuk aktivitas yang sedang berlangsung',
          example: 'I am studying English now.\nShe is reading a book.'
        },
        {
          front: 'Simple Past Tense',
          back: 'S + V2 + O\n\nDigunakan untuk kejadian di masa lalu',
          example: 'I studied English yesterday.\nHe went to school this morning.'
        },
        {
          front: 'Present Perfect',
          back: 'S + have/has + V3 + O\n\nDigunakan untuk:\n- Pengalaman\n- Kejadian baru saja\n- Berlanjut hingga sekarang',
          example: 'I have studied English for 3 years.\nShe has just finished her homework.'
        },
        {
          front: 'Future Tense (will)',
          back: 'S + will + V1 + O\n\nDigunakan untuk rencana masa depan',
          example: 'I will study English tomorrow.\nWe will go to Bali next week.'
        }
      ]
    },
    biologi_sel: {
      title: 'Struktur Sel',
      category: 'Biologi',
      icon: '🧬',
      cards: [
        {
          front: 'Mitokondria',
          back: 'Organel penghasil energi (ATP)\n\nDisebut "powerhouse of the cell"',
          example: 'Respirasi seluler terjadi di mitokondria:\nGlukosa + O₂ → ATP + CO₂ + H₂O'
        },
        {
          front: 'Kloroplas',
          back: 'Organel tempat fotosintesis\n\nHanya ada di sel tumbuhan',
          example: 'Fotosintesis:\n6CO₂ + 6H₂O + cahaya → C₆H₁₂O₆ + 6O₂'
        },
        {
          front: 'Nukleus',
          back: 'Inti sel yang berisi DNA\n\nMengatur semua aktivitas sel',
          example: 'DNA di nukleus menyimpan informasi genetik untuk sintesis protein'
        },
        {
          front: 'Ribosom',
          back: 'Tempat sintesis protein\n\nBisa bebas di sitoplasma atau menempel di RE',
          example: 'mRNA + tRNA + ribosom → protein'
        },
        {
          front: 'Membran Sel',
          back: 'Lapisan pelindung sel\n\nBersifat semipermeabel (selektif permeabel)',
          example: 'Mengatur keluar masuknya zat:\nO₂ masuk, CO₂ keluar'
        }
      ]
    }
  };

  const selectDeck = (deckKey) => {
    const deck = flashcardDecks[deckKey];
    setSelectedDeck({ ...deck, key: deckKey });
    setCurrentCard(0);
    setIsFlipped(false);
    setReviewedCards([]);
    setShowResults(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const rateCard = (rating) => {
    const nextReview = calculateNextReview(rating);

    const updatedReviewedCards = [
      ...reviewedCards,
      {
        cardIndex: currentCard,
        rating,
        nextReview,
        reviewedAt: new Date().toISOString()
      }
    ];

    setReviewedCards(updatedReviewedCards);
    setDifficulty(rating);

    setTimeout(() => {
      if (currentCard < selectedDeck.cards.length - 1) {
        setCurrentCard(currentCard + 1);
        setIsFlipped(false);
        setDifficulty(null);
      } else {
        finishReview(updatedReviewedCards); // kirim data terbaru
      }
    }, 1000);
  };

  const calculateNextReview = (rating) => {
    // Simple spaced repetition intervals
    const intervals = {
      hard: 1, // 1 day
      medium: 3, // 3 days
      easy: 7 // 7 days
    };
    
    const days = intervals[rating];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);
    return nextDate.toISOString();
  };

  const finishReview = async (finalReviewedCards) => {
    setShowResults(true);

    const cardsCount = finalReviewedCards.length;
    const pointsEarned = cardsCount * 5;
    const token = localStorage.getItem("token");

    try {
      await fetch(API.updateProgress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          cardReviewed: cardsCount,
          points: pointsEarned
        })
      });
    } catch (err) {
      console.error("Gagal update progress:", err);
    }
  };

  const restartDeck = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setReviewedCards([]);
    setShowResults(false);
    setDifficulty(null);
  };

  if (!selectedDeck) {
    return (
      <div className="flashcard-container">
        <div className="flashcard-header">
          <h1>🎴 Sistem Flashcard Interaktif</h1>
          <p>Belajar efektif dengan metode Spaced Repetition</p>
        </div>
        
        <div className="deck-grid">
          {Object.entries(flashcardDecks).map(([key, deck]) => (
            <div key={key} className="deck-card" onClick={() => selectDeck(key)}>
              <div className="deck-icon">{deck.icon}</div>
              <h3>{deck.title}</h3>
              <p className="deck-category">{deck.category}</p>
              <div className="deck-info">
                <span>📇 {deck.cards.length} kartu</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flashcard-info">
          <h3>❓ Apa itu Spaced Repetition?</h3>
          <p>
            Spaced Repetition adalah teknik belajar yang mengulang materi dengan interval waktu 
            yang semakin panjang. Metode ini terbukti meningkatkan daya ingat jangka panjang.
          </p>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🔴</span>
              <div>
                <strong>Sulit</strong>
                <p>Ulang dalam 1 hari</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🟡</span>
              <div>
                <strong>Sedang</strong>
                <p>Ulang dalam 3 hari</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🟢</span>
              <div>
                <strong>Mudah</strong>
                <p>Ulang dalam 7 hari</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const hardCards = reviewedCards.filter(r => r.rating === 'hard').length;
    const mediumCards = reviewedCards.filter(r => r.rating === 'medium').length;
    const easyCards = reviewedCards.filter(r => r.rating === 'easy').length;
    
    return (
      <div className="flashcard-container">
        <div className="flashcard-results">
          <h1>🎉 Review Selesai!</h1>
          
          <div className="results-summary">
            <div className="summary-card">
              <h3>{selectedDeck.title}</h3>
              <p className="total-cards">
                {reviewedCards.length} dari {selectedDeck.cards.length} kartu direview
              </p>
            </div>
            
            <div className="difficulty-breakdown">
              <h4>Tingkat Kesulitan:</h4>
              <div className="breakdown-grid">
                <div className="breakdown-item hard">
                  <span className="breakdown-icon">🔴</span>
                  <span className="breakdown-count">{hardCards}</span>
                  <span className="breakdown-label">Sulit</span>
                </div>
                <div className="breakdown-item medium">
                  <span className="breakdown-icon">🟡</span>
                  <span className="breakdown-count">{mediumCards}</span>
                  <span className="breakdown-label">Sedang</span>
                </div>
                <div className="breakdown-item easy">
                  <span className="breakdown-icon">🟢</span>
                  <span className="breakdown-count">{easyCards}</span>
                  <span className="breakdown-label">Mudah</span>
                </div>
              </div>
            </div>

            <div className="points-earned">
              <p>Poin yang didapat: <strong>+{reviewedCards.length * 5}</strong> ⭐</p>
            </div>
          </div>

          <div className="results-actions">
            <button className="btn-primary" onClick={restartDeck}>
              🔄 Review Lagi
            </button>
            <button
              className="btn-secondary"
              onClick={() => window.location.reload()}
            >
              📚 Pilih Deck Lain
            </button>
          </div>
        </div>
      </div>
    );
  }

  const card = selectedDeck.cards[currentCard];
  const progress = ((currentCard + 1) / selectedDeck.cards.length) * 100;

  return (
    <div className="flashcard-container">
      <div className="flashcard-nav">
        <button className="btn-back" onClick={() => setSelectedDeck(null)}>
          ← Kembali
        </button>
        <div className="deck-title">
          <h2>{selectedDeck.icon} {selectedDeck.title}</h2>
        </div>
        <div className="card-counter">
          {currentCard + 1} / {selectedDeck.cards.length}
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="flashcard-main">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''} ${difficulty ? `rated-${difficulty}` : ''}`}
          onClick={flipCard}
        >
          <div className="flashcard-front">
            <div className="card-hint">📌 Klik untuk melihat jawaban</div>
            <div className="card-content">
              <h3>{card.front}</h3>
            </div>
          </div>
          
          <div className="flashcard-back">
            <div className="card-hint">💡 Penjelasan</div>
            <div className="card-content">
              <div className="card-answer">
                <pre>{card.back}</pre>
              </div>
              {card.example && (
                <div className="card-example">
                  <h4>Contoh:</h4>
                  <pre>{card.example}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {isFlipped && !difficulty && (
          <div className="rating-buttons">
            <p className="rating-question">Seberapa mudah kamu memahami ini?</p>
            <div className="button-group">
              <button 
                className="rating-btn hard"
                onClick={(e) => { e.stopPropagation(); rateCard('hard'); }}
              >
                🔴 Sulit
                <span className="rating-hint">Ulang 1 hari</span>
              </button>
              <button 
                className="rating-btn medium"
                onClick={(e) => { e.stopPropagation(); rateCard('medium'); }}
              >
                🟡 Sedang
                <span className="rating-hint">Ulang 3 hari</span>
              </button>
              <button 
                className="rating-btn easy"
                onClick={(e) => { e.stopPropagation(); rateCard('easy'); }}
              >
                🟢 Mudah
                <span className="rating-hint">Ulang 7 hari</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flashcard-tips">
        <h4>💡 Tips Belajar:</h4>
        <ul>
          <li>Coba jawab sebelum membalik kartu</li>
          <li>Baca penjelasan dengan teliti</li>
          <li>Pahami contoh yang diberikan</li>
          <li>Jujur dalam menilai pemahamanmu</li>
        </ul>
      </div>
    </div>
  );
};

export default FlashcardSystem;