// ── GLOBAL UTILITIES ──
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
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('a18_theme', theme);
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

        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
    }
}

// ── UTILITIES ──
export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export function getInitials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase();
}

export function truncateText(text, length = 100) {
    return text.length > length ? text.substring(0, length) + '...' : text;
}

export function debounce(func, wait) {
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

export function showToast(message, type = 'success', duration = 3000) {
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
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

// ── CONSTANTS ──
export const STUDENTS_COUNT = 79;
export const MALE_STUDENTS = 37;
export const FEMALE_STUDENTS = 42;
export const CLASSES = ['7A', '7B', '7C', '7D'];
