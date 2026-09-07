// ============================================================
//  APP.JS — Angkatan 18 (Simple, no backend)
// ============================================================

// ── DATA SISWA ──────────────────────────────────────────────
const STUDENTS = [
  // 7A Bilal Bin Rabbah (18 putra)
  { id:1,  name:"Faalih Arkaan",                    gender:"male",   cls:"7A" },
  { id:2,  name:"Muhammad Alfindra Auvar Rehardja",  gender:"male",   cls:"7A" },
  { id:3,  name:"Handanu Indrafaza Styawan",         gender:"male",   cls:"7A" },
  { id:4,  name:"Almer Abrisam Dzaky Noor",          gender:"male",   cls:"7A" },
  { id:5,  name:"Muhammad Hafidz Setiadi",           gender:"male",   cls:"7A" },
  { id:6,  name:"Muhammad Zharif Syatir",            gender:"male",   cls:"7A" },
  { id:7,  name:"Cheerul Risyed Ferdiansyah",        gender:"male",   cls:"7A" },
  { id:8,  name:"Hafidz Alfatih Hermanto",           gender:"male",   cls:"7A" },
  { id:9,  name:"Muhammad Atha Alieudin Hamani",     gender:"male",   cls:"7A" },
  { id:10, name:"Muhammad Azka Alieudin Kalani",     gender:"male",   cls:"7A" },
  { id:11, name:"Muhammad Asyraf Al Farisi",         gender:"male",   cls:"7A" },
  { id:12, name:"Ahmad Faeyza Rafa",                 gender:"male",   cls:"7A" },
  { id:13, name:"Ahmad Abdullah Hafi Munaji",        gender:"male",   cls:"7A" },
  { id:14, name:"Muhammad El Junot Razqal",          gender:"male",   cls:"7A" },
  { id:15, name:"Al Ghazali Fahran",                 gender:"male",   cls:"7A" },
  { id:16, name:"Muhammad Faqih Ramadhan",           gender:"male",   cls:"7A" },
  { id:17, name:"Muhammad Abdurrahman Dzaki",        gender:"male",   cls:"7A" },
  { id:18, name:"Alkhalifi Hasyimi",                 gender:"male",   cls:"7A" },

  // 7B Musab Bin Umair (19 putra)
  { id:19, name:"Lathief Akmal El Azzam",            gender:"male",   cls:"7B" },
  { id:20, name:"Rega Rahmad Afandi",                gender:"male",   cls:"7B" },
  { id:21, name:"Azka Aisy Muhammad Firdaus",        gender:"male",   cls:"7B" },
  { id:22, name:"Muhammad Ragil Ardah Putra",        gender:"male",   cls:"7B" },
  { id:23, name:"Giovanny Syahputra",                gender:"male",   cls:"7B" },
  { id:24, name:"Hasan Ahmad",                       gender:"male",   cls:"7B" },
  { id:25, name:"Asbillah Saunna",                   gender:"male",   cls:"7B" },
  { id:26, name:"Ba'Ats Nurfu'Ad Wetiman",           gender:"male",   cls:"7B" },
  { id:27, name:"Fattah Altaf Qusyairi",             gender:"male",   cls:"7B" },
  { id:28, name:"Namara Simaloan Athariz Nasution",  gender:"male",   cls:"7B" },
  { id:29, name:"Farrel Azka Firlana",               gender:"male",   cls:"7B" },
  { id:30, name:"Albuchori Amrullah Syarif",         gender:"male",   cls:"7B" },
  { id:31, name:"Super Novel Hardian",               gender:"male",   cls:"7B" },
  { id:32, name:"Muhammad Naufal",                   gender:"male",   cls:"7B" },
  { id:33, name:"Rafay Messi",                       gender:"male",   cls:"7B" },
  { id:34, name:"Devan Rafandra Pratama",            gender:"male",   cls:"7B" },
  { id:35, name:"Abdullah Dzaky Editya",             gender:"male",   cls:"7B" },
  { id:36, name:"Jeevan Fhaeyza Daniswara",          gender:"male",   cls:"7B" },
  { id:37, name:"Rayhan Aqilla Akmal Triono",        gender:"male",   cls:"7B" },

  // 7C Khadijah Binti Khuwailid (21 putri)
  { id:38, name:"Afiqah Abidah Urfa",                gender:"female", cls:"7C" },
  { id:39, name:"Shazia Amira Zhafirah",             gender:"female", cls:"7C" },
  { id:40, name:"Nur Aisyah",                        gender:"female", cls:"7C" },
  { id:41, name:"Adinda Nur Annisa",                 gender:"female", cls:"7C" },
  { id:42, name:"Shybilya Sheren",                   gender:"female", cls:"7C" },
  { id:43, name:"Adelia Felicia",                    gender:"female", cls:"7C" },
  { id:44, name:"Angelina Natalia Tennes",           gender:"female", cls:"7C" },
  { id:45, name:"Nabila Widya Prajna",               gender:"female", cls:"7C" },
  { id:46, name:"Zara Qisya Ramadhani",              gender:"female", cls:"7C" },
  { id:47, name:"Aqilah Khayyirah",                  gender:"female", cls:"7C" },
  { id:48, name:"Nadhifa Wihda Syauqia",             gender:"female", cls:"7C" },
  { id:49, name:"Syaquila Marwa Putri Deandra",      gender:"female", cls:"7C" },
  { id:50, name:"Kanaya Lubna Janitra Hafizah",      gender:"female", cls:"7C" },
  { id:51, name:"Alisya Zella Naura Saputro",        gender:"female", cls:"7C" },
  { id:52, name:"Kimberly Wong",                     gender:"female", cls:"7C" },
  { id:53, name:"Afika Aulia Izza Tunnisa'",         gender:"female", cls:"7C" },
  { id:54, name:"Afiqah Humayra Arresky",            gender:"female", cls:"7C" },
  { id:55, name:"Deeandra Mikhailla Hariyadi",       gender:"female", cls:"7C" },
  { id:56, name:"Hanania Hasanah Mukti",             gender:"female", cls:"7C" },
  { id:57, name:"Lathifah Azizah Ali",               gender:"female", cls:"7C" },
  { id:58, name:"Nurul Farhana Aqilah Chandra",      gender:"female", cls:"7C" },

  // 7D Halimatus Saadiyah (21 putri)
  { id:59, name:"Adzkira Rindu Edelweiss",           gender:"female", cls:"7D" },
  { id:60, name:"Annisa Wafa Luthfi",                gender:"female", cls:"7D" },
  { id:61, name:"Putri Meilisha",                    gender:"female", cls:"7D" },
  { id:62, name:"Nada Fajriah Salsabilla",           gender:"female", cls:"7D" },
  { id:63, name:"Asghia Khaureen Nazhifa Arianto",   gender:"female", cls:"7D" },
  { id:64, name:"Alesha Zevanna Anneyla Alfian",     gender:"female", cls:"7D" },
  { id:65, name:"Alisha Nur Afiyah",                 gender:"female", cls:"7D" },
  { id:66, name:"Alenka Shafeea Akbari",             gender:"female", cls:"7D" },
  { id:67, name:"Khalilah Tsamara Azizah",           gender:"female", cls:"7D" },
  { id:68, name:"Dzakira Talita Nur Asy",            gender:"female", cls:"7D" },
  { id:69, name:"Felisha Rafalya Chafid",            gender:"female", cls:"7D" },
  { id:70, name:"Shidqia Nabila Azzahra",            gender:"female", cls:"7D" },
  { id:71, name:"Arini Syaurah Zayani",              gender:"female", cls:"7D" },
  { id:72, name:"Ainun Miftahul Aggenia",            gender:"female", cls:"7D" },
  { id:73, name:"Fatimah Az-Zahra",                  gender:"female", cls:"7D" },
  { id:74, name:"Aisyah Afiqah Wahyudi",             gender:"female", cls:"7D" },
  { id:75, name:"Vanisha Malditya Chafid",           gender:"female", cls:"7D" },
  { id:76, name:"Ameera Aqeela Sadli",               gender:"female", cls:"7D" },
  { id:77, name:"Amirah Ramadhani Zainal",           gender:"female", cls:"7D" },
  { id:78, name:"Sachi Siddiqia Tomo",               gender:"female", cls:"7D" },
  { id:79, name:"Zahratu Syifa",                     gender:"female", cls:"7D" },
];

// ── HELPERS ─────────────────────────────────────────────────
function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function avatarColor(gender) {
  const maleColors   = ['#1D4ED8','#0369A1','#0F766E','#1E40AF','#075985'];
  const femaleColors = ['#BE185D','#9D174D','#7C3AED','#A21CAF','#BE123C'];
  const arr = gender === 'male' ? maleColors : femaleColors;
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── RENDER STUDENTS ──────────────────────────────────────────
function renderStudents(list) {
  const grid = document.getElementById('students-grid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '<div class="empty-state">Tidak ada siswa ditemukan 🔍</div>';
    return;
  }

  grid.innerHTML = list.map(s => `
    <div class="student-card">
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="student-avatar" style="background:${avatarColor(s.gender)}">${getInitials(s.name)}</div>
        <span class="student-badge ${s.gender === 'male' ? 'badge-male' : 'badge-female'}">
          ${s.gender === 'male' ? 'Putra' : 'Putri'}
        </span>
      </div>
      <div class="student-name">${s.name}</div>
      <div class="student-class">Kelas ${s.cls}</div>
      <div class="tag-angkatan">Angkatan 18</div>
    </div>
  `).join('');
}

// ── STUDENT PAGE INIT ────────────────────────────────────────
function initStudentPage() {
  if (!document.getElementById('students-grid')) return;

  let currentFilter = 'all';
  let currentSearch = '';

  function getFiltered() {
    return STUDENTS.filter(s => {
      const matchGender =
        currentFilter === 'all' ||
        (currentFilter === 'male'   && s.gender === 'male') ||
        (currentFilter === 'female' && s.gender === 'female');
      const matchSearch = s.name.toLowerCase().includes(currentSearch);
      return matchGender && matchSearch;
    });
  }

  // Search
  const searchBox = document.getElementById('search');
  if (searchBox) {
    searchBox.addEventListener('input', e => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderStudents(getFiltered());
    });
  }

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderStudents(getFiltered());
    });
  });

  // Initial render
  renderStudents(STUDENTS);
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initStudentPage();
});
