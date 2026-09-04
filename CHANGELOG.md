# CHANGELOG

Semua perubahan penting dari website Angkatan 18 dicatat di sini.

Kami mengikuti [Semantic Versioning](https://semver.org/lang/id/).

---

## [1.0.0] - 2026-09-04

### ✅ Added
- **Website Utama** (`index.html`)
  - Direktori siswa lengkap 79 siswa
  - Filter gender (All/Putra/Putri)
  - Search real-time
  - Responsive design (mobile, tablet, desktop)
  - Dark mode dengan tema emerald
  - Stats section (79 total, 37 putra, 42 putri)
  - Gallery section placeholder
  - Navigation menu

- **Admin Panel** (`admin.html`)
  - Authentication system
  - Dashboard dengan stats
  - Student management (add/edit/delete)
  - Gallery management
  - Settings & password change
  - Toast notifications
  - Dark theme matching main site

- **Documentation**
  - README.md (project overview)
  - DEPLOYMENT.md (cara deploy)
  - CHANGELOG.md (file ini)
  - CONTRIBUTING.md (contribution guide)
  - data.json (student database)

- **Configuration**
  - .gitignore (git ignore rules)
  - Tailwind CSS config
  - Material Icons integration

### 🎨 Design
- Emerald Nocturne color scheme
  - Primary: #4edea3
  - Surface Dark: #070B0A
  - Glassmorphism effect
- Responsive breakpoints (sm, md, lg, xl)
- Smooth transitions & animations
- Accessible color contrast (WCAG AA)

### 📱 Features
- Mobile-first responsive design
- Touch-friendly buttons (48px minimum)
- Smooth scroll navigation
- Keyboard navigation support
- Search with real-time filtering
- Sort A-Z automatically

### 🔒 Security
- Client-side authentication (demo)
- Password validation (min 8 chars)
- Credential confirmation
- Session management

### 📊 Data
- 79 siswa terverifikasi
  - 37 siswa putra (Ikhwan)
  - 42 siswi putri (Akhwat)
- Nama lengkap semua siswa
- Gender classification
- Batch information
- JSON data export ready

### 🛠️ Technical
- Pure HTML5 (semantic)
- Tailwind CSS (utility-first)
- Vanilla JavaScript (no dependencies)
- Google Material Symbols
- CDN-based fonts
- Zero build process

---

## [Planned] - Future Updates

### v1.1.0 (Coming Soon)
- [ ] Gallery photo upload
- [ ] Photo grid display
- [ ] Image optimization
- [ ] Lazy loading

### v1.2.0 (Coming Soon)
- [ ] Database integration (Firebase)
- [ ] Real admin panel functionality
- [ ] Student profile pages
- [ ] Contact form
- [ ] Comments section

### v1.3.0 (Planned)
- [ ] Multi-language support (ID/EN)
- [ ] Dark/Light theme toggle
- [ ] Export to PDF
- [ ] Print-friendly layout
- [ ] Social sharing buttons

### v2.0.0 (Long-term)
- [ ] Backend API
- [ ] Real database
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Content management system

---

## Bug Fixes & Improvements

### v1.0.1 (If needed)
- [ ] Fix any mobile bugs
- [ ] Optimize images
- [ ] Improve performance
- [ ] Update documentation

---

## How to Report Bugs

Jika menemukan bug:
1. Deskripsi bug yang jelas
2. Screenshot/video
3. Browser & device yang digunakan
4. Langkah untuk reproduce bug

---

## Notes

- Semua nama siswa sudah diverifikasi dari screenshot original
- Tidak ada nama kelas yang ditampilkan (sebagai permintaan rolling class)
- Admin credentials default harus diubah setelah login pertama
- Website fully responsive dan tested di berbagai device

---

**Version**: 1.0.0  
**Released**: September 4, 2026  
**Status**: ✅ Production Ready

