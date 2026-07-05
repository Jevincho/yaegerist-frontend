// ============================================
// REACT COMPONENTS - ENHANCED FEATURES
// ============================================

const { useState, useEffect, useRef } = React;

// ============================================
// COMPONENT 1: ENHANCED HAMBURGER MENU
// ============================================
const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <header className={`nav-enhanced ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-inner">
                <a href="#" className="brand">
                    <img src="../Gambar/logo.png" alt="Logo" className="logo-img" />
                    <span>Ganesha Operation</span>
                </a>

                {/* Desktop Menu */}
                <ul className="menu desktop-menu">
                    <li><a href="#about-info" onClick={closeMenu}>About</a></li>
                    <li><a href="#diskon-section" onClick={closeMenu}>Diskon</a></li>
                    <li><a href="#faq-section" onClick={closeMenu}>FAQ</a></li>
                    <li><a href="#formula-section" onClick={closeMenu}>Formula Belajar</a></li>
                    <li><a href="#produk-section" onClick={closeMenu}>Produk Kami</a></li>
                    <li><button className="nav-btn">
                        <a href="../Page Login/Login.html">Login</a>
                    </button></li>
                </ul>

                {/* Hamburger Button */}
                <button 
                    className={`hamburger-btn ${isOpen ? 'active' : ''}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu}></div>
                
                {/* Mobile Menu */}
                <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                    <div className="mobile-menu-header">
                        <span className="brand-mobile">Menu</span>
                        <button className="close-btn" onClick={closeMenu}>✕</button>
                    </div>
                    <ul className="menu-mobile-list">
                        <li><a href="#about-info" onClick={closeMenu}><i className="fa fa-info-circle"></i> About</a></li>
                        <li><a href="#diskon-section" onClick={closeMenu}><i className="fa fa-tag"></i> Diskon</a></li>
                        <li><a href="#faq-section" onClick={closeMenu}><i className="fa fa-question-circle"></i> FAQ</a></li>
                        <li><a href="#formula-section" onClick={closeMenu}><i className="fa fa-book"></i> Formula Belajar</a></li>
                        <li><a href="#produk-section" onClick={closeMenu}><i className="fa fa-graduation-cap"></i> Produk Kami</a></li>
                        <li className="menu-cta">
                            <a href="../Page Login/Login.html" className="login-mobile-btn">
                                <i className="fa fa-sign-in"></i> Login
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

// ============================================
// COMPONENT 2: HERO BANNER WITH ANIMATIONS
// ============================================
const HeroBanner = () => {
    const [particles, setParticles] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Generate particles
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        }));
        setParticles(newParticles);

        // Animate particles
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            newParticles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x > 100) particle.x = 0;
                if (particle.x < 0) particle.x = 100;
                if (particle.y > 100) particle.y = 0;
                if (particle.y < 0) particle.y = 100;

                ctx.beginPath();
                ctx.arc(
                    (particle.x / 100) * canvas.width,
                    (particle.y / 100) * canvas.height,
                    particle.size,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="hero-banner">
            <canvas ref={canvasRef} className="particles-canvas"></canvas>
            <div className="hero-content">
                <h1 className="hero-title animate-fade-in">Ganesha Operation</h1>
                <h5 className="hero-subtitle animate-fade-in-delay">Bimbingan Belajar Terbaik</h5>
                <div className="hero-buttons animate-fade-in-delay-2">
                    <button className="btn-primary" onClick={() => {
                        const nomorWA = '6282399339886';
                        const pesan = 'Halo Ganesha Operation! Saya ingin mengetahui lebih lanjut tentang program bimbingan belajar.';
                        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
                    }}>
                        <i className="fa fa-whatsapp"></i> HUBUNGI KAMI
                    </button>
                    <button className="btn-secondary" onClick={() => {
                        document.getElementById('produk-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <i className="fa fa-shopping-bag"></i> Produk Kami
                    </button>
                </div>
                <div className="hero-stats">
                    <div className="stat-item">
                        <i className="fa fa-users"></i>
                        <span className="stat-number">53,000+</span>
                        <span className="stat-label">Siswa Lulus</span>
                    </div>
                    <div className="stat-item">
                        <i className="fa fa-map-marker"></i>
                        <span className="stat-number">200+</span>
                        <span className="stat-label">Cabang</span>
                    </div>
                    <div className="stat-item">
                        <i className="fa fa-calendar"></i>
                        <span className="stat-number">42</span>
                        <span className="stat-label">Tahun Berpengalaman</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================
// COMPONENT 3: TESTIMONIAL CAROUSEL
// ============================================
const TestimonialCarousel = () => {
    const testimonials = [
        {
            id: 1,
            name: "Andi Pratama",
            university: "UI - Fakultas Kedokteran",
            photo: "https://ui-avatars.com/api/?name=Andi+Pratama&background=667eea&color=fff&size=100",
            text: "Alhamdulillah, berkat GO saya bisa lolos SNBT dan diterima di FK UI! Metode 3B-nya benar-benar efektif dan tutor-tutornya sangat membantu.",
            rating: 5
        },
        {
            id: 2,
            name: "Siti Nurhaliza",
            university: "ITB - Teknik Informatika",
            photo: "https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=764ba2&color=fff&size=100",
            text: "GO bukan cuma ngajarin materi, tapi juga strategi mengerjakan soal. Try out-nya juga mirip banget sama yang asli!",
            rating: 5
        },
        {
            id: 3,
            name: "Budi Santoso",
            university: "UGM - Akuntansi",
            photo: "https://ui-avatars.com/api/?name=Budi+Santoso&background=f093fb&color=fff&size=100",
            text: "Dari yang awalnya ga percaya diri, sekarang Alhamdulillah bisa masuk UGM. Terima kasih GO!",
            rating: 5
        },
        {
            id: 4,
            name: "Dewi Lestari",
            university: "UNPAD - Farmasi",
            photo: "https://ui-avatars.com/api/?name=Dewi+Lestari&background=4facfe&color=fff&size=100",
            text: "Tutor di GO sabar banget ngajarinnya. Materi yang susah jadi mudah dipahami. Recommended!",
            rating: 5
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const goToSlide = (index) => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(index);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    return (
        <section className="testimonial-section" id="testimonial-section">
            <div className="container">
                <h2 className="section-title">Testimoni Alumni</h2>
                <p className="section-subtitle">Cerita sukses dari ribuan siswa yang telah lulus PTN impian</p>
                
                <div className="carousel-container">
                    <button className="carousel-btn prev" onClick={prevSlide}>
                        <i className="fa fa-chevron-left"></i>
                    </button>

                    <div className="testimonial-wrapper">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={testimonial.id}
                                className={`testimonial-card ${index === currentIndex ? 'active' : ''} ${isAnimating ? 'animating' : ''}`}
                                style={{ display: index === currentIndex ? 'flex' : 'none' }}
                            >
                                <img src={testimonial.photo} alt={testimonial.name} className="testimonial-photo" />
                                <div className="testimonial-content">
                                    <div className="stars">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <i key={i} className="fa fa-star"></i>
                                        ))}
                                    </div>
                                    <p className="testimonial-text">"{testimonial.text}"</p>
                                    <h4 className="testimonial-name">{testimonial.name}</h4>
                                    <p className="testimonial-university">{testimonial.university}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-btn next" onClick={nextSlide}>
                        <i className="fa fa-chevron-right"></i>
                    </button>
                </div>

                <div className="carousel-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// COMPONENT 4: ANIMATED STATISTICS COUNTER
// ============================================
const StatisticsCounter = () => {
    const stats = [
        { id: 1, icon: 'fa-graduation-cap', number: 53000, suffix: '+', label: 'Siswa Lulus PTN', color: '#667eea' },
        { id: 2, icon: 'fa-heartbeat', number: 2550, suffix: '+', label: 'Lulus Kedokteran', color: '#f093fb' },
        { id: 3, icon: 'fa-map-marker-alt', number: 200, suffix: '+', label: 'Cabang Tersebar', color: '#4facfe' },
        { id: 4, icon: 'fa-trophy', number: 4, suffix: '', label: 'Penghargaan MURI', color: '#ffd700' },
    ];

    const [counts, setCounts] = useState(stats.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCounters = () => {
        stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.number / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.number) {
                    current = stat.number;
                    clearInterval(timer);
                }
                setCounts(prev => {
                    const newCounts = [...prev];
                    newCounts[index] = Math.floor(current);
                    return newCounts;
                });
            }, 20);
        });
    };

    return (
        <section className="statistics-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">Prestasi Kami</h2>
                <p className="section-subtitle">Angka-angka yang membuktikan kualitas Ganesha Operation</p>
                
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={stat.id} className="stat-card" style={{ '--card-color': stat.color }}>
                            <div className="stat-icon">
                                <i className={`fa ${stat.icon}`}></i>
                            </div>
                            <div className="stat-number">
                                {counts[index].toLocaleString('id-ID')}{stat.suffix}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// COMPONENT 5: FAQ ACCORDION
// ============================================
const FAQAccordion = () => {
    const faqs = [
        {
            id: 1,
            question: "Apa itu Formula 3B yang diterapkan Ganesha Operation?",
            answer: "Formula 3B adalah metode belajar unik dari Ganesha Operation yang terdiri dari: Belajar (memahami konsep), Berlatih (mengerjakan soal), dan Bertanding (try out & kompetisi). Metode ini terbukti efektif meningkatkan pemahaman dan performa siswa."
        },
        {
            id: 2,
            question: "Berapa biaya bimbingan belajar di Ganesha Operation?",
            answer: "Biaya bervariasi tergantung program yang dipilih (SD/SMP/SMA), paket belajar, dan lokasi cabang. Kami menyediakan berbagai paket mulai dari yang ekonomis hingga premium. Silakan hubungi kami untuk informasi detail dan promo terkini."
        },
        {
            id: 3,
            question: "Apakah ada try out SNBT di Ganesha Operation?",
            answer: "Ya! Kami rutin mengadakan TOBK (Try Out Berbasis Komputer) yang sistemnya mirip dengan SNBT asli. Try out kami dilengkapi dengan analisis hasil dan pembahasan soal yang komprehensif."
        },
        {
            id: 4,
            question: "Bagaimana sistem pembelajaran di Ganesha Operation?",
            answer: "Kami menggunakan sistem hybrid yang menggabungkan pembelajaran tatap muka dengan teknologi digital. Siswa mendapat akses ke platform online untuk materi, latihan soal, dan try out. Kelas offline dilakukan dengan maksimal 15 siswa per kelas untuk memastikan perhatian optimal dari tutor."
        },
        {
            id: 5,
            question: "Apakah tutor di Ganesha Operation berkualitas?",
            answer: "Semua tutor kami adalah lulusan PTN terkemuka dan telah melewati training khusus. Mereka tidak hanya menguasai materi, tetapi juga terlatih dalam menyampaikan dengan cara yang mudah dipahami siswa."
        },
        {
            id: 6,
            question: "Bagaimana cara mendaftar di Ganesha Operation?",
            answer: "Pendaftaran bisa dilakukan secara online melalui website kami atau datang langsung ke cabang terdekat. Anda juga bisa menghubungi kami via WhatsApp untuk konsultasi gratis dan bantuan pendaftaran."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq-section">
            <div className="container">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle">Pertanyaan yang sering ditanyakan seputar Ganesha Operation</p>
                
                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
                            <button className="faq-question" onClick={() => toggleFAQ(index)}>
                                <span>{faq.question}</span>
                                <i className={`fa fa-chevron-${openIndex === index ? 'up' : 'down'}`}></i>
                            </button>
                            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// COMPONENT 6: PROGRAM CARDS
// ============================================
const ProgramCards = () => {
    const programs = [
        {
            id: 1,
            title: "Program SD",
            level: "Kelas 1-6",
            icon: "fa-child",
            color: "#4facfe",
            features: [
                "Matematika & Sains",
                "Bahasa Indonesia & Inggris",
                "Persiapan OSN",
                "Kelas interaktif & fun"
            ],
            price: "Mulai dari Rp 500.000/bulan"
        },
        {
            id: 2,
            title: "Program SMP",
            level: "Kelas 7-9",
            icon: "fa-book",
            color: "#667eea",
            features: [
                "Matematika, IPA, Bahasa",
                "Persiapan UN & OSN",
                "Kelas Unggulan",
                "Try Out Rutin"
            ],
            price: "Mulai dari Rp 750.000/bulan"
        },
        {
            id: 3,
            title: "Program SMA",
            level: "Kelas 10-12",
            icon: "fa-graduation-cap",
            color: "#f093fb",
            features: [
                "SNBT Intensif",
                "Kedinasan",
                "Kedokteran Premium",
                "TOBK Mingguan"
            ],
            price: "Mulai dari Rp 1.200.000/bulan",
            popular: true
        }
    ];

    return (
        <section className="program-section" id="produk-section">
            <div className="container">
                <h2 className="section-title">Program Kami</h2>
                <p className="section-subtitle">Pilih program yang sesuai dengan kebutuhan belajar Anda</p>
                
                <div className="program-grid">
                    {programs.map(program => (
                        <div key={program.id} className="program-card" style={{ '--card-color': program.color }}>
                            {program.popular && <div className="popular-badge">PALING POPULER</div>}
                            <div className="program-icon">
                                <i className={`fa ${program.icon}`}></i>
                            </div>
                            <h3 className="program-title">{program.title}</h3>
                            <p className="program-level">{program.level}</p>
                            <ul className="program-features">
                                {program.features.map((feature, index) => (
                                    <li key={index}>
                                        <i className="fa fa-check-circle"></i> {feature}
                                    </li>
                                ))}
                            </ul>
                            <p className="program-price">{program.price}</p>
                            <button className="program-btn" onClick={() => {
                                const nomorWA = '6282399339886';
                                const pesan = `Halo! Saya tertarik dengan ${program.title}. Bisa minta info lebih lanjut?`;
                                window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
                            }}>
                                <i className="fa fa-whatsapp"></i> Daftar Sekarang
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// COMPONENT 7: FLOATING CHAT WIDGET
// ============================================
const FloatingChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const quickMessages = [
        "Mau tanya biaya bimbel",
        "Info program SNBT",
        "Lokasi cabang terdekat",
        "Jadwal try out"
    ];

    const sendMessage = (msg) => {
        const nomorWA = '6282399339886';
        const pesan = msg || message;
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
        setMessage('');
        setIsOpen(false);
    };

    return (
        <>
            <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar">
                            <i className="fa fa-headset"></i>
                        </div>
                        <div>
                            <h4>Customer Support</h4>
                            <p className="online-status"><span className="status-dot"></span> Online</p>
                        </div>
                    </div>
                    <button className="close-chat" onClick={() => setIsOpen(false)}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
                
                <div className="chat-body">
                    <div className="chat-message bot">
                        <p>Halo! Ada yang bisa kami bantu? 😊</p>
                    </div>
                    <div className="quick-replies">
                        <p className="quick-replies-label">Pesan Cepat:</p>
                        {quickMessages.map((msg, index) => (
                            <button key={index} className="quick-reply-btn" onClick={() => sendMessage(msg)}>
                                {msg}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="chat-footer">
                    <input 
                        type="text" 
                        placeholder="Ketik pesan..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button className="send-btn" onClick={() => sendMessage()}>
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                <i className={`fa ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
                {!isOpen && <span className="chat-notification-badge">1</span>}
            </button>
        </>
    );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const App = () => {
    return (
        <>
            <HamburgerMenu />
            <HeroBanner />
            <StatisticsCounter />
            <ProgramCards />
            <TestimonialCarousel />
            <FAQAccordion />
            <FloatingChatWidget />
        </>
    );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('react-app'));
root.render(<App />);
