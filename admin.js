// ── ADMIN.JS — Login, Gallery, Announcements ─────────────────
// Credentials (ganti sesuai keinginan)
const ADMIN_USER = 'admin18';
const ADMIN_PASS = 'bunga2026';

// ── AUTH ─────────────────────────────────────────────────────
function isLoggedIn() {
  return sessionStorage.getItem('a18_auth') === 'true';
}

function login(user, pass) {
  return user === ADMIN_USER && pass === ADMIN_PASS;
}

function logout() {
  sessionStorage.removeItem('a18_auth');
  showLogin();
}

function showLogin() {
  document.getElementById('loginPage').style.display = '';
  document.getElementById('dashboardPage').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('dashboardPage').style.display = '';
  renderAdminGallery();
  renderAdminAnnouncements();
}

// ── STORAGE ───────────────────────────────────────────────────
function getGallery() {
  return JSON.parse(localStorage.getItem('a18_gallery') || '[]');
}

function saveGallery(data) {
  localStorage.setItem('a18_gallery', JSON.stringify(data));
}

function getAnnouncements() {
  return JSON.parse(localStorage.getItem('a18_announcements') || '[]');
}

function saveAnnouncements(data) {
  localStorage.setItem('a18_announcements', JSON.stringify(data));
}

// ── RENDER ADMIN GALLERY ──────────────────────────────────────
function renderAdminGallery() {
  const grid = document.getElementById('adminGalleryGrid');
  if (!grid) return;
  const items = getGallery();

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        Belum ada foto. Klik "Tambah Foto" untuk mulai.
      </div>`;
    return;
  }

  grid.innerHTML = items.map((item, i) => `
    <div class="admin-photo-card">
      <img src="${item.src}" alt="${item.title}">
      <div class="admin-photo-info">
        <span>${item.title}</span>
        <button class="btn-icon-danger" data-type="gallery" data-index="${i}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-type="gallery"]').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal('gallery', +btn.dataset.index));
  });
}

// ── RENDER ADMIN ANNOUNCEMENTS ────────────────────────────────
function renderAdminAnnouncements() {
  const list = document.getElementById('adminAnnounceList');
  if (!list) return;
  const items = getAnnouncements();

  if (items.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        Belum ada pengumuman. Klik "Tambah Pengumuman" untuk mulai.
      </div>`;
    return;
  }

  list.innerHTML = items.map((item, i) => `
    <div class="admin-announce-card priority-${item.priority}">
      <div class="admin-announce-info">
        <strong>${item.title}</strong>
        <p>${item.body}</p>
        <span class="announcement-date">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${item.date}
        </span>
      </div>
      <button class="btn-icon-danger" data-type="announce" data-index="${i}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      </button>
    </div>
  `).join('');

  list.querySelectorAll('[data-type="announce"]').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal('announce', +btn.dataset.index));
  });
}

// ── DELETE MODAL ──────────────────────────────────────────────
let deleteTarget = null;

function openDeleteModal(type, index) {
  deleteTarget = { type, index };
  document.getElementById('modalDelete').style.display = 'flex';
}

function closeDeleteModal() {
  deleteTarget = null;
  document.getElementById('modalDelete').style.display = 'none';
}

// ── TABS ──────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.dash-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab' + cap(tab.dataset.tab)).classList.add('active');
    });
  });
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ── PHOTO MODAL ───────────────────────────────────────────────
function initPhotoModal() {
  const modal   = document.getElementById('modalPhoto');
  const fileDrop = document.getElementById('fileDrop');
  const fileInput = document.getElementById('photoFile');
  const preview = document.getElementById('photoPreview');
  const previewImg = document.getElementById('previewImg');

  document.getElementById('openAddPhoto').addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  document.getElementById('closeModalPhoto').addEventListener('click', closePhotoModal);
  document.getElementById('cancelPhoto').addEventListener('click', closePhotoModal);

  // click drop zone → open file picker
  fileDrop.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maks 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      previewImg.src = e.target.result;
      preview.style.display = '';
      fileDrop.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('photoForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('photoTitle').value.trim();
    const src   = previewImg.src;
    if (!title || !src) return;

    const gallery = getGallery();
    gallery.unshift({ title, src, date: today() });
    saveGallery(gallery);
    closePhotoModal();
    renderAdminGallery();
  });
}

function closePhotoModal() {
  document.getElementById('modalPhoto').style.display = 'none';
  document.getElementById('photoForm').reset();
  document.getElementById('photoPreview').style.display = 'none';
  document.getElementById('fileDrop').style.display = '';
  document.getElementById('previewImg').src = '';
}

// ── ANNOUNCE MODAL ────────────────────────────────────────────
function initAnnounceModal() {
  const modal = document.getElementById('modalAnnounce');

  document.getElementById('openAddAnnounce').addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  document.getElementById('closeModalAnnounce').addEventListener('click', closeAnnounceModal);
  document.getElementById('cancelAnnounce').addEventListener('click', closeAnnounceModal);

  document.getElementById('announceForm').addEventListener('submit', e => {
    e.preventDefault();
    const title    = document.getElementById('announceTitle').value.trim();
    const body     = document.getElementById('announceBody').value.trim();
    const priority = document.getElementById('announcePriority').value;
    if (!title || !body) return;

    const list = getAnnouncements();
    list.unshift({ title, body, priority, date: today() });
    saveAnnouncements(list);
    closeAnnounceModal();
    renderAdminAnnouncements();
  });
}

function closeAnnounceModal() {
  document.getElementById('modalAnnounce').style.display = 'none';
  document.getElementById('announceForm').reset();
}

// ── HELPERS ───────────────────────────────────────────────────
function today() {
  return new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('loginPage')) return;

  // Check session
  if (isLoggedIn()) {
    showDashboard();
  } else {
    showLogin();
  }

  // Login form
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('inputUsername').value.trim();
    const pass = document.getElementById('inputPassword').value;
    if (login(user, pass)) {
      sessionStorage.setItem('a18_auth', 'true');
      document.getElementById('loginError').style.display = 'none';
      showDashboard();
    } else {
      document.getElementById('loginError').style.display = '';
    }
  });

  // Toggle password visibility
  document.getElementById('togglePw').addEventListener('click', () => {
    const input = document.getElementById('inputPassword');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Delete confirm
  document.getElementById('confirmDelete').addEventListener('click', () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'gallery') {
      const g = getGallery();
      g.splice(deleteTarget.index, 1);
      saveGallery(g);
      renderAdminGallery();
    } else {
      const a = getAnnouncements();
      a.splice(deleteTarget.index, 1);
      saveAnnouncements(a);
      renderAdminAnnouncements();
    }
    closeDeleteModal();
  });

  document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);

  // Close modals on overlay click
  ['modalPhoto','modalAnnounce','modalDelete'].forEach(id => {
    document.getElementById(id).addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
    });
  });

  initTabs();
  initPhotoModal();
  initAnnounceModal();
});
