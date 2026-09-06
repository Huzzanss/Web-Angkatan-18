/**
 * ADMIN PANEL SCRIPT
 * Website Angkatan 18 Admin Login & Dashboard
 */

// Default admin credentials
const DEFAULT_ADMIN = {
    id: 'admin',
    password: 'Angkatan18!'
};

// Current logged-in admin
let currentAdmin = null;

// Student data
const STUDENT_STATS = {
    total: 79,
    male: 37,
    female: 42
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', initAdmin);

/**
 * Initialize admin panel
 */
function initAdmin() {
    setupEventListeners();
    checkAdminSession();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Change password button
    const changePwdBtn = document.getElementById('changePwdBtn');
    if (changePwdBtn) {
        changePwdBtn.addEventListener('click', openPasswordModal);
    }

    // Password form
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }

    // Close modal on background click
    const passwordModal = document.getElementById('passwordModal');
    if (passwordModal) {
        passwordModal.addEventListener('click', (e) => {
            if (e.target === passwordModal) {
                closePasswordModal();
            }
        });
    }
}

/**
 * Check if admin is already logged in
 */
function checkAdminSession() {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
        currentAdmin = JSON.parse(adminSession);
        showDashboard();
    } else {
        showLogin();
    }
}

/**
 * Show login page
 */
function showLogin() {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('dashboardPage').classList.remove('active');
}

/**
 * Show dashboard page
 */
function showDashboard() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
}

/**
 * Handle login form submission
 */
function handleLogin(e) {
    e.preventDefault();

    const adminId = document.getElementById('adminId').value.trim();
    const password = document.getElementById('password').value;

    // Validate credentials
    if (adminId === DEFAULT_ADMIN.id && password === DEFAULT_ADMIN.password) {
        // Login successful
        currentAdmin = {
            id: adminId,
            loginTime: new Date().toISOString()
        };

        // Save session
        localStorage.setItem('adminSession', JSON.stringify(currentAdmin));

        // Clear form
        document.getElementById('adminId').value = '';
        document.getElementById('password').value = '';

        showToast('Login berhasil! Selamat datang Admin.', 'success');

        // Show dashboard after delay
        setTimeout(() => {
            showDashboard();
        }, 500);
    } else {
        showToast('Admin ID atau Password salah!', 'error');
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('adminSession');
        currentAdmin = null;
        
        showToast('Logout berhasil.', 'success');
        
        setTimeout(() => {
            showLogin();
            document.getElementById('loginForm').reset();
        }, 500);
    }
}

/**
 * Open password change modal
 */
function openPasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('oldPassword').focus();
    }
}

/**
 * Close password change modal
 */
function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('passwordForm').reset();
    }
}

/**
 * Handle password change
 */
function handlePasswordChange(e) {
    e.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (oldPassword !== DEFAULT_ADMIN.password) {
        showToast('Password lama tidak sesuai!', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showToast('Password baru minimal 8 karakter!', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast('Konfirmasi password tidak cocok!', 'error');
        return;
    }

    if (newPassword === oldPassword) {
        showToast('Password baru harus berbeda dari yang lama!', 'error');
        return;
    }

    // Password change successful
    DEFAULT_ADMIN.password = newPassword;

    showToast('Password berhasil diubah!', 'success');
    
    setTimeout(() => {
        closePasswordModal();
    }, 500);
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('notificationsContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/**
 * Get student statistics
 */
function getStudentStats() {
    return STUDENT_STATS;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
