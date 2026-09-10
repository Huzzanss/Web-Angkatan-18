import { db, ref, push, onValue, remove } from "./firebase.js";

// ── CREDENTIALS ───────────────────────────────────────────────
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER;
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

// ── AUTH ──────────────────────────────────────────────────────
function isLoggedIn() { return sessionStorage.getItem('a18_auth') === 'true'; }
function login(u, p)  { return u === ADMIN_USER && p === ADMIN_PASS; }
function logout()     { sessionStorage.removeItem('a18_auth'); showLogin(); }

function showLogin() {
  document.getElementById('loginPage').style.display = '';
  document.getElementById('dashboardPage').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('dashboardPage').style.display = '';
  listenGallery();
  listenAnnouncements();
  listenPolls();
}

// ── FIREBASE LISTENERS ────────────────────────────────────────
function listenGallery() {
  onValue(ref(db, 'gallery'), snap => {
    const items = [];
    snap.forEach(c => items.unshift({ key: c.key, ...c.val() }));
    renderAdminGallery(items);
  });
}

function listenAnnouncements() {
  onValue(ref(db, 'announcements'), snap => {
    const items = [];
    snap.forEach(c => items.unshift({ key: c.key, ...c.val() }));
    renderAdminAnnouncements(items);
  });
}

function listenPolls() {
  onValue(ref(db, 'polls'), snap => {
    const items = [];
    snap.forEach(c => items.unshift({ key: c.key, ...c.val() }));
    renderAdminPolls(items);
  });
}

// ── RENDER GALLERY ────────────────────────────────────────────
function renderAdminGallery(items) {
  const grid = document.getElementById('adminGalleryGrid');
  if (!grid) return;
  if (!items.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">Belum ada foto.</div>`;
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
  grid.querySelectorAll('[data-type="gallery"]').forEach(btn =>
    btn.addEventListener('click', () => openDeleteModal('gallery', btn.dataset.key))
  );
}

// ── RENDER ANNOUNCEMENTS ──────────────────────────────────────
function renderAdminAnnouncements(items) {
  const list = document.getElementById('adminAnnounceList');
  if (!list) return;
  if (!items.length) {
    list.innerHTML = `<div class="empty-state">Belum ada pengumuman.</div>`;
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
  list.querySelectorAll('[data-type="announce"]').forEach(btn =>
    btn.addEventListener('click', () => openDeleteModal('announce', btn.dataset.key))
  );
}

// ── RENDER POLLS ──────────────────────────────────────────────
function renderAdminPolls(items) {
  const list = document.getElementById('adminPollList');
  if (!list) return;
  if (!items.length) {
    list.innerHTML = `<div class="empty-state">Belum ada polling.</div>`;
    return;
  }
  list.innerHTML = items.map(item => {
    const total = Object.values(item.options || {}).reduce((a, o) => a + (o.votes || 0), 0);
    const optsHTML = Object.entries(item.options || {}).map(([k, o]) => {
      const pct = total > 0 ? Math.round((o.votes || 0) / total * 100) : 0;
      return `<div style="font-size:13px;color:var(--text2);margin-top:4px">${o.text} — <strong>${o.votes || 0} suara (${pct}%)</strong></div>`;
    }).join('');
    return `
      <div class="admin-announce-card" style="border-left-color:var(--blue)">
        <div class="admin-announce-info">
          <strong>${item.question}</strong>
          ${optsHTML}
          <div style="margin-top:8px;font-size:12px;color:var(--text3)">Total: ${total} suara</div>
        </div>
        <button class="btn-icon-danger" data-key="${item.key}" data-type="poll">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    `;
  }).join('');
  list.querySelectorAll('[data-type="poll"]').forEach(btn =>
    btn.addEventListener('click', () => openDeleteModal('poll', btn.dataset.key))
  );
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
      const n = tab.dataset.tab;
      document.getElementById('tab' + n.charAt(0).toUpperCase() + n.slice(1)).classList.add('active');
    });
  });
}

// ── PHOTO MODAL ───────────────────────────────────────────────
function initPhotoModal() {
  const modal      = document.getElementById('modalPhoto');
  const fileDrop   = document.getElementById('fileDrop');
  const fileInput  = document.getElementById('photoFile');
  const preview    = document.getElementById('photoPreview');
  const previewImg = document.getElementById('previewImg');

  document.getElementById('openAddPhoto').addEventListener('click', () => modal.style.display = 'flex');
  document.getElementById('closeModalPhoto').addEventListener('click', closePhotoModal);
  document.getElementById('cancelPhoto').addEventListener('click', closePhotoModal);
  fileDrop.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Maks 5MB.'); return; }
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
    btn.textContent = 'Menyimpan...'; btn.disabled = true;
    try {
      await push(ref(db, 'gallery'), { title, src, date: today() });
      closePhotoModal();
    } catch (err) { alert('Gagal: ' + err.message); }
    finally { btn.textContent = 'Simpan'; btn.disabled = false; }
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
  document.getElementById('openAddAnnounce').addEventListener('click', () => modal.style.display = 'flex');
  document.getElementById('closeModalAnnounce').addEventListener('click', closeAnnounceModal);
  document.getElementById('cancelAnnounce').addEventListener('click', closeAnnounceModal);

  document.getElementById('announceForm').addEventListener('submit', async e => {
    e.preventDefault();
    const title    = document.getElementById('announceTitle').value.trim();
    const body     = document.getElementById('announceBody').value.trim();
    const priority = document.getElementById('announcePriority').value;
    if (!title || !body) return;
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Menyimpan...'; btn.disabled = true;
    try {
      await push(ref(db, 'announcements'), { title, body, priority, date: today() });
      closeAnnounceModal();
    } catch (err) { alert('Gagal: ' + err.message); }
    finally { btn.textContent = 'Simpan'; btn.disabled = false; }
  });
}

function closeAnnounceModal() {
  document.getElementById('modalAnnounce').style.display = 'none';
  document.getElementById('announceForm').reset();
}

// ── POLL MODAL ────────────────────────────────────────────────
function initPollModal() {
  const modal = document.getElementById('modalPoll');
  document.getElementById('openAddPoll').addEventListener('click', () => modal.style.display = 'flex');
  document.getElementById('closeModalPoll').addEventListener('click', closePollModal);
  document.getElementById('cancelPoll').addEventListener('click', closePollModal);

  document.getElementById('pollForm').addEventListener('submit', async e => {
    e.preventDefault();
    const question = document.getElementById('pollQuestion').value.trim();
    const opt1     = document.getElementById('pollOpt1').value.trim();
    const opt2     = document.getElementById('pollOpt2').value.trim();
    const opt3     = document.getElementById('pollOpt3').value.trim();
    const opt4     = document.getElementById('pollOpt4').value.trim();
    if (!question || !opt1 || !opt2) return;

    const options = {
      a: { text: opt1, votes: 0 },
      b: { text: opt2, votes: 0 },
    };
    if (opt3) options.c = { text: opt3, votes: 0 };
    if (opt4) options.d = { text: opt4, votes: 0 };

    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Membuat...'; btn.disabled = true;
    try {
      await push(ref(db, 'polls'), { question, options, date: today() });
      closePollModal();
    } catch (err) { alert('Gagal: ' + err.message); }
    finally { btn.textContent = 'Buat Polling'; btn.disabled = false; }
  });
}

function closePollModal() {
  document.getElementById('modalPoll').style.display = 'none';
  document.getElementById('pollForm').reset();
}

// ── HELPERS ───────────────────────────────────────────────────
function today() {
  return new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('loginPage')) return;

  isLoggedIn() ? showDashboard() : showLogin();

  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const u = document.getElementById('inputUsername').value.trim();
    const p = document.getElementById('inputPassword').value;
    if (login(u, p)) {
      sessionStorage.setItem('a18_auth', 'true');
      document.getElementById('loginError').style.display = 'none';
      showDashboard();
    } else {
      document.getElementById('loginError').style.display = '';
    }
  });

  document.getElementById('togglePw').addEventListener('click', () => {
    const inp = document.getElementById('inputPassword');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  document.getElementById('logoutBtn').addEventListener('click', logout);

  document.getElementById('confirmDelete').addEventListener('click', async () => {
    if (!deleteTarget) return;
    const pathMap = { gallery: 'gallery', announce: 'announcements', poll: 'polls' };
    const path = `${pathMap[deleteTarget.type]}/${deleteTarget.key}`;
    try { await remove(ref(db, path)); }
    catch (err) { alert('Gagal hapus: ' + err.message); }
    closeDeleteModal();
  });

  document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);

  ['modalPhoto','modalAnnounce','modalPoll','modalDelete'].forEach(id => {
    document.getElementById(id).addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
    });
  });

  initTabs();
  initPhotoModal();
  initAnnounceModal();
  initPollModal();
});
