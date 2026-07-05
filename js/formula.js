// ============================================
// FORMULA 3B PAGE - INTERACTIVE FEATURES
// ============================================

// Object untuk menyimpan data formula
const FormulaData = {
    belajar: {
        title: "BELAJAR",
        description: "GO Bantu kamu untuk memahami teori dan konsepnya setiap belajar di kelas",
        features: ["Tutorial Service Time (TST)", "Materi Lengkap", "Belajar Interaktif"],
        icon: "📚",
        color: "#4CAF50"
    },
    berlatih: {
        title: "BERLATIH",
        description: "Sel-sel otakmu perlu dilatih untuk mengerjakan soal-soal",
        features: ["Buku Sakti", "Bank Soal", "Latihan Bertingkat"],
        icon: "✍️",
        color: "#2196F3"
    },
    bertanding: {
        title: "BERTANDING",
        description: "Saatnya menguji progress belajarmu",
        features: ["Try Out Berbasis Komputer", "Racing Soal", "Battle Competition"],
        icon: "🏆",
        color: "#FF9800"
    }
};

// ============================================
// CLASS UNTUK PROGRESS MANAGEMENT
// ============================================

class FormulaProgress {
    constructor(userId) {
        this.userId = userId;
        this.progress = this.loadProgress();
    }
    
    loadProgress() {
        const saved = localStorage.getItem(`formula_progress_${this.userId}`);
        return saved ? JSON.parse(saved) : {
            belajar: 0,
            berlatih: 0,
            bertanding: 0
        };
    }
    
    saveProgress() {
        localStorage.setItem(`formula_progress_${this.userId}`, JSON.stringify(this.progress));
    }
    
    updateProgress(formula, value) {
        this.progress[formula] = Math.min(100, Math.max(0, value));
        this.saveProgress();
        return this.progress[formula];
    }
    
    getProgress(formula) {
        return this.progress[formula];
    }
    
    getTotalProgress() {
        const total = (this.progress.belajar + this.progress.berlatih + this.progress.bertanding) / 3;
        return Math.round(total);
    }
}

// ============================================
// DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize progress tracker
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.email || 'guest';
    const progressTracker = new FormulaProgress(userId);
    
    // ============================================
    // CARD ANIMATIONS
    // ============================================
    
    const cards = document.querySelectorAll('.belajar, .berlatih, .bertanding');
    
    cards.forEach((card, index) => {
        // Entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            
            // Change background color dynamically
            const className = this.className;
            if (className.includes('belajar')) {
                this.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            } else if (className.includes('berlatih')) {
                this.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
            } else if (className.includes('bertanding')) {
                this.style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            this.style.backgroundColor = 'transparent';
        });
        
        // Click tracking
        card.addEventListener('click', function(e) {
            const formulaType = this.className.split(' ')[0];
            trackCardClick(formulaType);
            
            // Add ripple effect
            createRipple(e, this);
        });
    });
    
    // ============================================
    // ADD PROGRESS BARS
    // ============================================
    
    function addProgressBars() {
        cards.forEach(card => {
            const className = card.className.split(' ')[0];
            const progress = progressTracker.getProgress(className);
            
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';
            progressContainer.style.cssText = `
                width: 100%;
                padding: 10px;
                margin-top: 10px;
            `;
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                width: 100%;
                height: 8px;
                background: #e0e0e0;
                border-radius: 4px;
                overflow: hidden;
                position: relative;
            `;
            
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.cssText = `
                width: ${progress}%;
                height: 100%;
                background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                transition: width 0.5s ease;
            `;
            
            const progressText = document.createElement('p');
            progressText.textContent = `Progress: ${progress}%`;
            progressText.style.cssText = `
                font-size: 12px;
                color: #666;
                margin-top: 5px;
                text-align: center;
            `;
            
            progressBar.appendChild(progressFill);
            progressContainer.appendChild(progressBar);
            progressContainer.appendChild(progressText);
            
            const dalamDiv = card.querySelector('[class^="dalam-"]');
            if (dalamDiv) {
                dalamDiv.appendChild(progressContainer);
            }
        });
    }
    
    addProgressBars();
    
    // ============================================
    // INTERACTIVE BUTTONS
    // ============================================
    
    function addInteractiveButtons() {
        cards.forEach(card => {
            const className = card.className.split(' ')[0];
            
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            buttonContainer.style.cssText = `
                display: flex;
                gap: 10px;
                padding: 10px;
                justify-content: center;
            `;
            
            const startBtn = document.createElement('button');
            startBtn.textContent = 'Mulai';
            startBtn.className = 'formula-btn start-btn';
            startBtn.style.cssText = `
                padding: 8px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            `;
            
            const infoBtn = document.createElement('button');
            infoBtn.textContent = 'Info';
            infoBtn.className = 'formula-btn info-btn';
            infoBtn.style.cssText = startBtn.style.cssText;
            infoBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            
            startBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                simulateProgress(className, progressTracker);
            });
            
            infoBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showFormulaInfo(className);
            });
            
            buttonContainer.appendChild(startBtn);
            buttonContainer.appendChild(infoBtn);
            
            const dalamDiv = card.querySelector('[class^="dalam-"]');
            if (dalamDiv) {
                dalamDiv.appendChild(buttonContainer);
            }
        });
    }
    
    addInteractiveButtons();
    
    // ============================================
    // ADD STATISTICS PANEL
    // ============================================
    
    function addStatisticsPanel() {
        const container = document.querySelector('.container');
        
        const statsPanel = document.createElement('div');
        statsPanel.className = 'statistics-panel';
        statsPanel.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            margin-top: 30px;
            text-align: center;
        `;
        
        const totalProgress = progressTracker.getTotalProgress();
        
        statsPanel.innerHTML = `
            <h3>Progress Total Anda</h3>
            <div class="total-progress-circle" style="
                width: 150px;
                height: 150px;
                margin: 20px auto;
                border-radius: 50%;
                background: conic-gradient(#667eea ${totalProgress * 3.6}deg, #e0e0e0 0deg);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    width: 120px;
                    height: 120px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: #667eea;
                ">
                    ${totalProgress}%
                </div>
            </div>
            <p style="color: #666;">Terus tingkatkan belajarmu!</p>
        `;
        
        container.appendChild(statsPanel);
    }
    
    addStatisticsPanel();
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function trackCardClick(formulaType) {
    const clicks = JSON.parse(localStorage.getItem('formula_clicks') || '{}');
    clicks[formulaType] = (clicks[formulaType] || 0) + 1;
    localStorage.setItem('formula_clicks', JSON.stringify(clicks));
    console.log(`${formulaType} clicked ${clicks[formulaType]} times`);
}

function simulateProgress(formula, tracker) {
    const currentProgress = tracker.getProgress(formula);
    const newProgress = Math.min(100, currentProgress + 10);
    tracker.updateProgress(formula, newProgress);
    
    // Update UI
    location.reload();
}

function showFormulaInfo(formula) {
    const data = FormulaData[formula];
    
    const modal = document.createElement('div');
    modal.className = 'info-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        text-align: center;
        position: relative;
    `;
    
    content.innerHTML = `
        <div style="font-size: 48px;">${data.icon}</div>
        <h2 style="color: ${data.color};">${data.title}</h2>
        <p style="margin: 20px 0;">${data.description}</p>
        <div style="text-align: left; margin: 20px 0;">
            <h4>Fitur:</h4>
            <ul>
                ${data.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
        <button class="close-modal-btn" style="
            padding: 10px 30px;
            background: ${data.color};
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        ">Tutup</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    const closeBtn = content.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// ============================================
// CSS ANIMATIONS (Add to style)
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
