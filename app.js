// ── GLOBAL APP INITIALIZATION ──
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    initTheme();
    initNavigation();
}

// ── THEME MANAGEMENT ──
function initTheme() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('a18_theme') || 'dark';
    const themeToggle = document.getElementById('themeToggle');
    
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('a18_theme', theme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ── NAVIGATION ──
function initNavigation() {
    const moreBtn = document.getElementById('moreBtn');
    const dropdown = document.getElementById('navDropdown');

    if (moreBtn && dropdown) {
        moreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!moreBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        dropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });
        });
    }
}

// ── UTILITIES ──
function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function getInitials(name) {
    if (!name) return '?';
    return name
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase();
}

function truncateText(text, length = 100) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 28px;
        right: 24px;
        background: var(--bg3);
        border: 1px solid var(--border);
        color: var(--text);
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 13px;
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, duration);
}

// ── CONSTANTS ──
const STUDENTS_COUNT = 79;
const MALE_STUDENTS = 37;
const FEMALE_STUDENTS = 42;
const CLASSES = ['8A', '8B', '8C', '8D'];

// ── BADGE UTILITIES ──
function getBadgeIcon(type) {
    const badges = {
        'best-student': '🏆',
        'helpful': '🤝',
        'funny': '😂',
        'smart': '🧠',
        'creative': '🎨',
        'leader': '👑'
    };
    return badges[type] || '⭐';
}

function getBadgeLabel(type) {
    const labels = {
        'best-student': 'Siswa Terbaik',
        'helpful': 'Membantu',
        'funny': 'Lucu',
        'smart': 'Pintar',
        'creative': 'Kreatif',
        'leader': 'Pemimpin'
    };
    return labels[type] || 'Badge';
}

// ── COLOR AVATARS ──
const AVATAR_COLORS = [
    '#60b8f5',  // blue
    '#e879a0',  // pink
    '#4EDEA3',  // accent
    '#e8a455',  // orange
    '#e85555',  // red
    '#a78bfa'   // purple
];

function getAvatarColor(name) {
    if (!name) return AVATAR_COLORS[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ── AUTO-LOGOUT TIMEOUT (optional) ──
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        // Could auto-logout here if needed
    }, 30 * 60 * 1000); // 30 minutes
}

document.addEventListener('click', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);

// ── LAZY LOAD IMAGES (performance) ──
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
