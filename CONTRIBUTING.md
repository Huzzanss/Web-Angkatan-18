# Contributing Guide

Terima kasih telah tertarik berkontribusi untuk Website Angkatan 18! 🎉

---

## Cara Berkontribusi

### 1. Fork Repository
```bash
# Di GitHub, klik "Fork"
# Ini membuat copy di akun Anda
```

### 2. Clone Fork Anda
```bash
git clone https://github.com/USERNAME/Website-Angkatan-18.git
cd Website-Angkatan-18
```

### 3. Buat Branch Baru
```bash
git checkout -b feature/deskripsi-fitur
# Contoh: feature/add-gallery-upload
```

### 4. Buat Perubahan
Edit file yang diperlukan:
- `index.html` - Main website
- `admin.html` - Admin panel
- `data.json` - Student data
- README.md - Documentation

### 5. Commit Perubahan
```bash
git add .
git commit -m "Add: deskripsi perubahan"
# Contoh: "Add: gallery upload feature"
```

### 6. Push ke Fork
```bash
git push origin feature/deskripsi-fitur
```

### 7. Buat Pull Request
- Ke repo utama
- Jelaskan perubahan
- Tunggu review

---

## Panduan Commit Message

```
<type>: <subject>

<body>

<footer>
```

### Types:
- `Add:` - Feature baru
- `Fix:` - Bug fix
- `Update:` - Improvement
- `Refactor:` - Code restructure
- `Docs:` - Documentation
- `Style:` - Formatting (no logic change)
- `Remove:` - Delete files/code

### Subject:
- Gunakan imperative mood ("add", bukan "added")
- Jangan capitalisasi awal
- Tidak ada period di akhir
- Max 50 characters

### Contoh:
```
Add: gallery photo upload feature

- Implemented file upload functionality
- Added image preview
- Integrated with admin panel

Closes #123
```

---

## Kontribusi Apa Saja Yang Dibutuhkan?

### 🎨 Design & UI/UX
- Improve visual design
- Better mobile responsiveness
- Animation improvements
- Color scheme suggestions
- Accessibility improvements

### 💻 Development
- Bug fixes
- Performance optimization
- Code refactoring
- New features
- Backend integration

### 📝 Documentation
- Typo fixes
- Clearer explanations
- Better examples
- Translation (ID/EN)

### 🧪 Testing
- Test edge cases
- Mobile testing
- Browser compatibility
- Performance testing

### 📢 Promotion
- Social media posts
- Share with friends
- Feedback collection

---

## Coding Standards

### HTML
- Semantic tags only
- Proper indentation (2 spaces)
- Responsive attributes
- Accessible structure

### CSS (Tailwind)
- Utility-first approach
- Custom classes minimal
- Mobile-first design
- Dark mode support

### JavaScript
- Vanilla JS (no frameworks)
- Clear variable names
- Comments for complex logic
- No console errors
- Accessibility support

### JSON
- Valid JSON format
- Proper indentation (2 spaces)
- No trailing commas
- Comments allowed (remove before production)

---

## Testing Checklist

Sebelum submit PR:

- [ ] Code works locally
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Desktop responsive
- [ ] All features tested
- [ ] No breaking changes
- [ ] Documentation updated
- [ ] Commit message clear

---

## Style Guide

### Colors
```
Primary: #4edea3 (Emerald)
Dark: #070B0A (Dark Surface)
Light: #181c1b (Light Surface)
Text: #F9FAFB (Text Primary)
```

### Spacing
```
xs: 4px (gutter-xs)
sm: 8px (gutter-sm)
md: 16px (gutter-md)
lg: 24px (gutter-lg)
xl: 32px (gutter-xl)
```

### Typography
```
Display: Plus Jakarta Sans (700)
Headline: Plus Jakarta Sans (600-700)
Body: Plus Jakarta Sans (400)
Label: Manrope (600-700)
```

---

## Pull Request Template

```markdown
## Description
Jelaskan perubahan yang dibuat

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactor

## Testing Done
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots (if UI change)
[Paste screenshot here]

## Checklist
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Tested thoroughly
```

---

## Code Review Process

1. **Submission**: Submit PR dengan deskripsi lengkap
2. **Review**: Maintainer review code
3. **Feedback**: Perbaikan jika diperlukan
4. **Approval**: Code accepted
5. **Merge**: PR di-merge ke main branch

---

## Community Guidelines

### ✅ Diperbolehkan
- Konstruktif feedback
- Feature requests
- Bug reports
- Documentation improvements
- Collaboration

### ❌ Tidak Diperbolehkan
- Spam
- Harassment
- Disinformation
- Self-promotion links
- Off-topic discussions

---

## Questions?

- Buat issue di GitHub
- Jelaskan pertanyaan dengan detail
- Tag dengan label `question`
- Maintainer akan respons ASAP

---

## Recognition

Semua contributors akan diakui di:
- README.md (Contributors section)
- Release notes
- Project history

Terima kasih atas kontribusi Anda! 🙌

