// ── ADMIN.JS — Firebase Realtime Database ────────────────────
import { db, ref, push, onValue, remove } from "../firebase.js";

// ── CREDENTIALS ───────────────────────────────────────────────
const ADMIN_USER = 'admin18';
const ADMIN_PASS = 'bunga2026';

// ── AUTH ──────────────────────────────────────────────────────
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
  listenGallery();
  listenAnnouncements();
}

// ── FIREBASE LISTENERS ────────────────────────────────────────
function listenGallery() {
  const galleryRef = ref(db, 'gallery');
  onValue(galleryRef, snap => {
    const items = [];
    snap.forEach(child => {
      items.unshift({ key: child.key, ...child.val() });
    });
    renderAdminGallery(items);
  });
}

function listenAnnouncements() {
  const announceRef = ref(db, 'announcements');
  onValue(announceRef, snap => {
    const items = [];
    snap.forEach(child => {
      items.unshift({ key: child.key, ...child.val() });
    });
    renderAdminAnnouncements(items);
  });
}

// ── RENDER ADMIN GALLERY ──────────────────────────────────────
function renderAdminGallery(items) {
  const grid = document.getElementById('adminGalleryGrid');
  if (!grid) return;

  if (!items || items.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">Belum ada foto. Klik "Tambah Foto" untuk mulai.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="admin-photo-card">
      <img src="${item.src}" alt="${item.title}">
      <div class="admin-photo-info">
        <span>${item.title}</span>
        <button class="btn-icon-danger" data-key="${item.key}" data-type="gallery">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-type="gallery"]').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal('gallery', btn.dataset.key));
  });
}

// ── RENDER ADMIN ANNOUNCEMENTS ────────────────────────────────
function renderAdminAnnouncements(items) {
  const list = document.getElementById('adminAnnounceList');
  if (!list) return;

  if (!items || items.length === 0) {
    list.innerHTML = `<div class="empty-state">Belum ada pengumuman. Klik "Tambah Pengumuman" untuk mulai.</div>`;
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="admin-announce-card priority-${item.priority}">
      <div class="admin-announce-info">
        <strong>${item.title}</strong>
        <p>${item.body}</p>
        <span class="announcement-date">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${item.date}
        </span>
      </div>
      <button class="btn-icon-danger" data-key="${item.key}" data-type="announce">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      </button>
    </div>
  `).join('');

  list.querySelectorAll('[data-type="announce"]').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal('announce', btn.dataset.key));
  });
}

// ── DELETE MODAL ──────────────────────────────────────────────
let deleteTarget = null;

function openDeleteModal(type, key) {
  deleteTarget = { type, key };
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
      const name = tab.dataset.tab;
      document.getElementById('tab' + name.charAt(0).toUpperCase() + name.slice(1)).classList.add('active');
    });
  });
}

// ── PHOTO MODAL ───────────────────────────────────────────────
function initPhotoModal() {
  const modal     = document.getElementById('modalPhoto');
  const fileDrop  = document.getElementById('fileDrop');
  const fileInput = document.getElementById('photoFile');
  const preview   = document.getElementById('photoPreview');
  const previewImg= document.getElementById('previewImg');

  document.getElementById('openAddPhoto').addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  document.getElementById('closeModalPhoto').addEventListener('click', closePhotoModal);
  document.getElementById('cancelPhoto').addEventListener('click', closePhotoModal);

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

  document.getElementById('photoForm').addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('photoTitle').value.trim();
    const src   = previewImg.src;
    if (!title || !src) return;

    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Menyimpan...';
    btn.disabled = true;

    try {
      await push(ref(db, 'gallery'), {
        title,
        src,
        date: today()
      });
      closePhotoModal();
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
      btn.textContent = 'Simpan';
      btn.disabled = false;
    }
  });
}

function closePhotoModal() {
  document.getElementById('modalPhoto').style.display = 'none';
  document.getElementById('photoForm').reset();
  document.getElementById('photoPreview').style.display = 'none';
  document.getElementById('fileDrop').style.display = '';
  document.getElementById('previewImg').src = '';
  const btn = document.querySelector('#photoForm [type="submit"]');
  if (btn) { btn.textContent = 'Simpan'; btn.disabled = false; }
}

// ── ANNOUNCE MODAL ────────────────────────────────────────────
function initAnnounceModal() {
  const modal = document.getElementById('modalAnnounce');

  document.getElementById('openAddAnnounce').addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  document.getElementById('closeModalAnnounce').addEventListener('click', closeAnnounceModal);
  document.getElementById('cancelAnnounce').addEventListener('click', closeAnnounceModal);

  document.getElementById('announceForm').addEventListener('submit', async e => {
    e.preventDefault();
    const title    = document.getElementById('announceTitle').value.trim();
    const body     = document.getElementById('announceBody').value.trim();
    const priority = document.getElementById('announcePriority').value;
    if (!title || !body) return;

    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Menyimpan...';
    btn.disabled = true;

    try {
      await push(ref(db, 'announcements'), {
        title,
        body,
        priority,
        date: today()
      });
      closeAnnounceModal();
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
      btn.textContent = 'Simpan';
      btn.disabled = false;
    }
  });
}

function closeAnnounceModal() {
  document.getElementById('modalAnnounce').style.display = 'none';
  document.getElementById('announceForm').reset();
  const btn = document.querySelector('#announceForm [type="submit"]');
  if (btn) { btn.textContent = 'Simpan'; btn.disabled = false; }
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

  if (isLoggedIn()) {
    showDashboard();
  } else {
    showLogin();
  }

  // Login
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

  // Toggle password
  document.getElementById('togglePw').addEventListener('click', () => {
    const input = document.getElementById('inputPassword');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Delete confirm
  document.getElementById('confirmDelete').addEventListener('click', async () => {
    if (!deleteTarget) return;
    const path = deleteTarget.type === 'gallery'
      ? `gallery/${deleteTarget.key}`
      : `announcements/${deleteTarget.key}`;
    try {
      await remove(ref(db, path));
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
    closeDeleteModal();
  });

  document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);

  // Close modal on overlay click
  ['modalPhoto', 'modalAnnounce', 'modalDelete'].forEach(id => {
    document.getElementById(id).addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
    });
  });

  initTabs();
  initPhotoModal();
  initAnnounceModal();
});
