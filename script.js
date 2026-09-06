// ============================================================================
// WEBSITE SCRIPT - Main Functionality
// ============================================================================

let currentFilter = 'all';
let displayedStudents = [...STUDENTS_DATA.male, ...STUDENTS_DATA.female].sort();

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeGrid);

function initializeGrid() {
  renderStudents(displayedStudents);
  setupEventListeners();
}

/**
 * Render students to the grid
 * @param {Array} students - Array of student names
 */
function renderStudents(students) {
  const grid = document.getElementById('students-grid');
  grid.innerHTML = '';
  
  students.forEach((name) => {
    const gender = STUDENTS_DATA.male.includes(name) ? 'male' : 'female';
    const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2);
    const genderLabel = gender === 'male' ? 'Putra' : 'Putri';
    const genderClass = gender === 'male' 
      ? 'bg-gender-male/15 text-gender-male' 
      : 'bg-gender-female/15 text-gender-female';
    const genderDot = gender === 'male' ? 'bg-gender-male' : 'bg-gender-female';
    
    const card = document.createElement('div');
    card.className = 'student-card bg-surface-card hover:bg-surface-card-hover backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-32';
    card.setAttribute('data-gender', gender);
    card.setAttribute('data-name', name.toLowerCase());
    
    card.innerHTML = `
      <div class="flex items-start gap-3 sm:gap-3.5 mb-3 sm:mb-4">
        <div class="w-10 sm:w-11 h-10 sm:h-11 rounded-full ${genderClass} flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">${initials}</div>
        <div class="min-w-0 flex-1">
          <h3 class="font-headline-sm text-headline-sm text-text-primary font-bold line-clamp-2 text-sm sm:text-base">${name}</h3>
          <span class="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full ${genderClass} font-label-sm text-label-sm font-semibold">
            <span class="w-1.5 h-1.5 rounded-full ${genderDot}"></span>${genderLabel}
          </span>
        </div>
      </div>
      <div class="font-label-sm text-label-sm text-text-muted pt-2 border-t border-surface-variant">
        <span>Angkatan 18</span>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

/**
 * Setup event listeners for filter tabs and search
 */
function setupEventListeners() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', handleFilter);
  });
  
  document.getElementById('student-search').addEventListener('input', handleSearch);
}

/**
 * Handle filter button click
 * @param {Event} e - Click event
 */
function handleFilter(e) {
  currentFilter = e.target.getAttribute('data-filter');
  
  // Update button styles
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.classList.remove('bg-primary', 'text-on-primary');
    btn.classList.add('text-text-secondary', 'hover:text-text-primary', 'hover:bg-surface-container-high');
  });
  
  e.target.classList.remove('text-text-secondary', 'hover:text-text-primary', 'hover:bg-surface-container-high');
  e.target.classList.add('bg-primary', 'text-on-primary');
  
  // Filter students
  if (currentFilter === 'all') {
    displayedStudents = [...STUDENTS_DATA.male, ...STUDENTS_DATA.female].sort();
  } else {
    displayedStudents = STUDENTS_DATA[currentFilter].sort();
  }
  
  renderStudents(displayedStudents);
}

/**
 * Handle search input
 * @param {Event} e - Input event
 */
function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const filtered = displayedStudents.filter(name => name.toLowerCase().includes(query));
  renderStudents(filtered);
}
