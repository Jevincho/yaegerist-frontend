// ============================================
// REACT COMPONENTS FOR CIMOCHY PROJECT
// ============================================

// Note: Include React and ReactDOM in your HTML:
// <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
// <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
// <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

const { useState, useEffect, useCallback, useMemo } = React;

// ============================================
// LOGIN COMPONENT WITH STATE & PROPS
// ============================================

function LoginForm({ onLogin, savedEmail }) {
    const [formData, setFormData] = useState({
        email: savedEmail || '',
        password: ''
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    // Validate form
    const validate = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email tidak valid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password wajib diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }
        
        return newErrors;
    };
    
    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            onLogin(formData);
            setLoading(false);
        }, 1500);
    };
    
    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
                <h2>SELAMAT DATANG</h2>
                
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    <i className="fa-regular fa-envelope"></i>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                
                <div className="input-box">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                    />
                    <i className="fa-solid fa-key"></i>
                    <span 
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
                
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

// ============================================
// REGISTER COMPONENT
// ============================================

function RegisterForm({ onRegister }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    // Password strength state
    const passwordStrength = useMemo(() => {
        const { password } = formData;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        
        const levels = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
        const colors = ['#f44336', '#ff9800', '#ffc107', '#8bc34a', '#4caf50'];
        
        return {
            level: levels[strength - 1] || 'Sangat Lemah',
            color: colors[strength - 1] || '#f44336',
            percentage: (strength / 5) * 100
        };
    }, [formData.password]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const validate = () => {
        const newErrors = {};
        
        if (formData.name.length < 3) {
            newErrors.name = 'Nama minimal 3 karakter';
        }
        
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email tidak valid';
        }
        
        if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password tidak cocok';
        }
        
        return newErrors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setLoading(true);
        setTimeout(() => {
            onRegister(formData);
            setLoading(false);
        }, 1500);
    };
    
    return (
        <div className="register-form-container">
            <form onSubmit={handleSubmit}>
                <h2>DAFTAR AKUN BARU</h2>
                
                <InputField
                    type="text"
                    name="name"
                    placeholder="Nama Lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon="fa-user"
                />
                
                <InputField
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    icon="fa-envelope"
                />
                
                <InputField
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    icon="fa-key"
                />
                
                {formData.password && (
                    <PasswordStrength strength={passwordStrength} />
                )}
                
                <InputField
                    type="password"
                    name="confirmPassword"
                    placeholder="Konfirmasi Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    icon="fa-key"
                />
                
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Mendaftar...' : 'Daftar'}
                </button>
            </form>
        </div>
    );
}

// ============================================
// REUSABLE INPUT FIELD COMPONENT
// ============================================

function InputField({ type, name, placeholder, value, onChange, error, icon }) {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className="input-box">
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
            />
            <i className={`fa-regular fa-${icon}`}></i>
            {type === 'password' && (
                <span 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? '🙈' : '👁️'}
                </span>
            )}
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}

// ============================================
// PASSWORD STRENGTH INDICATOR COMPONENT
// ============================================

function PasswordStrength({ strength }) {
    return (
        <div className="password-strength">
            <div className="strength-bar">
                <div 
                    className="strength-fill"
                    style={{
                        width: `${strength.percentage}%`,
                        backgroundColor: strength.color,
                        transition: 'all 0.3s ease'
                    }}
                ></div>
            </div>
            <p style={{ color: strength.color, fontSize: '12px' }}>
                Kekuatan: {strength.level}
            </p>
        </div>
    );
}

// ============================================
// FORMULA CARD COMPONENT
// ============================================

function FormulaCard({ data, onClick, progress }) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className={`formula-card ${data.type}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(data.type)}
            style={{
                transform: isHovered ? 'translateY(-10px) scale(1.03)' : 'translateY(0) scale(1)',
                transition: 'all 0.3s ease',
                boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.2)' : '0 5px 15px rgba(0,0,0,0.1)'
            }}
        >
            <div className="card-icon" style={{ fontSize: '48px' }}>
                {data.icon}
            </div>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            
            <ProgressBar progress={progress} color={data.color} />
            
            <div className="card-features">
                {data.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                        {feature}
                    </span>
                ))}
            </div>
        </div>
    );
}

// ============================================
// PROGRESS BAR COMPONENT
// ============================================

function ProgressBar({ progress, color }) {
    return (
        <div className="progress-container">
            <div className="progress-bar-bg">
                <div 
                    className="progress-bar-fill"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: color,
                        transition: 'width 0.5s ease'
                    }}
                ></div>
            </div>
            <p className="progress-text">{progress}%</p>
        </div>
    );
}

// ============================================
// MAIN APP COMPONENT WITH STATE MANAGEMENT
// ============================================

function App() {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [formulaProgress, setFormulaProgress] = useState({
        belajar: 0,
        berlatih: 0,
        bertanding: 0
    });
    
    // Load user data on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        
        const savedProgress = localStorage.getItem('formula_progress');
        if (savedProgress) {
            setFormulaProgress(JSON.parse(savedProgress));
        }
    }, []);
    
    // Handle login
    const handleLogin = useCallback((formData) => {
        const userData = {
            email: formData.email,
            loginTime: new Date().toISOString(),
            isLoggedIn: true
        };
        
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setCurrentPage('home');
    }, []);
    
    // Handle register
    const handleRegister = useCallback((formData) => {
        const newUser = {
            name: formData.name,
            email: formData.email,
            registeredAt: new Date().toISOString()
        };
        
        // Save to users list
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        setCurrentPage('login');
    }, []);
    
    // Handle logout
    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('currentUser');
        setCurrentPage('home');
    }, []);
    
    // Update formula progress
    const updateProgress = useCallback((type, value) => {
        setFormulaProgress(prev => {
            const newProgress = {
                ...prev,
                [type]: Math.min(100, Math.max(0, value))
            };
            localStorage.setItem('formula_progress', JSON.stringify(newProgress));
            return newProgress;
        });
    }, []);
    
    // Formula data
    const formulaData = useMemo(() => [
        {
            type: 'belajar',
            title: 'BELAJAR',
            description: 'Memahami teori dan konsep',
            icon: '📚',
            color: '#4CAF50',
            features: ['TST', 'Materi', 'Interaktif']
        },
        {
            type: 'berlatih',
            title: 'BERLATIH',
            description: 'Latihan soal bertingkat',
            icon: '✍️',
            color: '#2196F3',
            features: ['Buku Sakti', 'Bank Soal', 'Bertingkat']
        },
        {
            type: 'bertanding',
            title: 'BERTANDING',
            description: 'Uji kemampuanmu',
            icon: '🏆',
            color: '#FF9800',
            features: ['TOBK', 'Racing', 'Battle']
        }
    ], []);
    
    return (
        <div className="app">
            <Navbar user={user} onLogout={handleLogout} />
            
            {currentPage === 'login' && (
                <LoginForm onLogin={handleLogin} savedEmail="" />
            )}
            
            {currentPage === 'register' && (
                <RegisterForm onRegister={handleRegister} />
            )}
            
            {currentPage === 'formula' && (
                <FormulaSection 
                    data={formulaData}
                    progress={formulaProgress}
                    onUpdateProgress={updateProgress}
                />
            )}
            
            <Toast />
        </div>
    );
}

// ============================================
// NAVBAR COMPONENT
// ============================================

function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar">
            <div className="nav-brand">Ganesha Operation</div>
            <div className="nav-menu">
                {user ? (
                    <>
                        <span>Welcome, {user.email}</span>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <button>Login</button>
                )}
            </div>
        </nav>
    );
}

// ============================================
// FORMULA SECTION COMPONENT
// ============================================

function FormulaSection({ data, progress, onUpdateProgress }) {
    const handleCardClick = (type) => {
        const currentProgress = progress[type];
        onUpdateProgress(type, currentProgress + 10);
    };
    
    const totalProgress = useMemo(() => {
        return Math.round(
            (progress.belajar + progress.berlatih + progress.bertanding) / 3
        );
    }, [progress]);
    
    return (
        <div className="formula-section">
            <h2>Formula 3B</h2>
            
            <div className="cards-container">
                {data.map(formula => (
                    <FormulaCard
                        key={formula.type}
                        data={formula}
                        progress={progress[formula.type]}
                        onClick={handleCardClick}
                    />
                ))}
            </div>
            
            <TotalProgress progress={totalProgress} />
        </div>
    );
}

// ============================================
// TOTAL PROGRESS COMPONENT
// ============================================

function TotalProgress({ progress }) {
    return (
        <div className="total-progress">
            <h3>Progress Total</h3>
            <div 
                className="progress-circle"
                style={{
                    background: `conic-gradient(#667eea ${progress * 3.6}deg, #e0e0e0 0deg)`
                }}
            >
                <div className="progress-circle-inner">
                    {progress}%
                </div>
            </div>
        </div>
    );
}

// ============================================
// TOAST NOTIFICATION COMPONENT
// ============================================

function Toast() {
    const [toasts, setToasts] = useState([]);
    
    useEffect(() => {
        // Listen for custom toast events
        const handleToast = (e) => {
            const id = Date.now();
            setToasts(prev => [...prev, { id, ...e.detail }]);
            
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        };
        
        window.addEventListener('showToast', handleToast);
        return () => window.removeEventListener('showToast', handleToast);
    }, []);
    
    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <div 
                    key={toast.id}
                    className={`toast toast-${toast.type}`}
                    style={{
                        background: toast.type === 'success' ? '#4CAF50' : '#f44336'
                    }}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}

// ============================================
// EXPORT COMPONENTS
// ============================================

if (typeof window !== 'undefined') {
    window.CimochyReact = {
        App,
        LoginForm,
        RegisterForm,
        FormulaCard,
        ProgressBar,
        Toast
    };
}
