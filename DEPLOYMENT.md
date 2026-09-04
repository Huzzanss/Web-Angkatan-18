# Deployment Guide - Website Angkatan 18

## Cara Deploy Website Ke Internet

### Option 1: GitHub Pages (Gratis & Mudah) ⭐ Recommended

#### Langkah 1: Push ke GitHub
```bash
cd C:\Users\Hafidz\OneDrive\Documents\GitHub\Website-Angkatan-18

# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit: Angkatan 18 website"

# Ganti USERNAME dengan GitHub username Anda
git remote add origin https://github.com/USERNAME/Website-Angkatan-18.git
git branch -M main
git push -u origin main
```

#### Langkah 2: Aktifkan GitHub Pages
1. Buka repo di GitHub.com
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` → `/ (root)`
5. Save

**Website akan live di:**
```
https://USERNAME.github.io/Website-Angkatan-18
```

---

### Option 2: Vercel (Gratis & Cepat)

1. Kunjungi [vercel.com](https://vercel.com)
2. Sign up dengan GitHub
3. Klik "New Project"
4. Import repository GitHub Anda
5. Deploy (otomatis)

**Website akan live di:**
```
https://website-angkatan-18.vercel.app
```

---

### Option 3: Netlify (Gratis)

1. Kunjungi [netlify.com](https://netlify.com)
2. Sign up dengan GitHub
3. New site from Git
4. Connect repository
5. Deploy

**Website akan live di:**
```
https://website-angkatan-18.netlify.app
```

---

### Option 4: Traditional Hosting (Berbayar)

Jika menggunakan hosting tradisional (Hostinger, Niagahoster, dll):

1. Upload via FTP:
   - `index.html`
   - `admin.html`
   - `data.json`
   - `README.md`

2. Buka domain Anda, website siap!

---

## Testing Lokal

### Sebelum Deploy, Test Dulu!

#### Dengan Python
```bash
cd Website-Angkatan-18
python -m http.server 8000
# Buka: http://localhost:8000
```

#### Dengan Node.js
```bash
npx http-server
# Buka: http://localhost:8080
```

#### Di Browser (tanpa server)
- Cukup buka `index.html` langsung
- Admin panel juga bisa dibuka

---

## Checklist Pre-Deployment

- [ ] Test website di localhost
- [ ] Test search functionality
- [ ] Test filter (All/Putra/Putri)
- [ ] Test admin login
- [ ] Test password change di admin panel
- [ ] Test di mobile (gunakan DevTools)
- [ ] Verifikasi semua nama siswa
- [ ] Screenshot untuk dokumentasi

---

## Troubleshooting

### Masalah: Search tidak bekerja
**Solusi**: Buka browser console (F12), cek apakah ada JS error

### Masalah: Admin tidak bisa login
**Solusi**: Pastikan username dan password sesuai:
- Username: `admin`
- Password: `Angkatan18!`

### Masalah: Admin panel tidak muncul
**Solusi**: Akses di `domain/admin.html` (bukan root)

### Masalah: Mobile tampilan buruk
**Solusi**: Refresh browser, clear cache, atau ganti browser

---

## Post-Deployment

### 1. Bagikan Link ke Siswa/Siswi
```
Kunjungi website Angkatan 18 di:
[URL WEBSITE]

Lihat semua teman-teman dalam direktori siswa!
```

### 2. Pantau Analytics (Optional)
- Tambah Google Analytics
- Track pengunjung
- Lihat siswa mana yang paling sering dikunjungi

### 3. Backup Data
- Download `data.json` regular
- Simpan di cloud (Google Drive, OneDrive)
- Backup folder setiap bulan

---

## Update Website

Jika ingin update nama siswa atau konten:

### Method 1: Edit langsung file
1. Edit `index.html` (tambah/hapus nama di bagian `STUDENTS_DATA`)
2. Commit & push ke GitHub
3. GitHub Pages otomatis deploy

### Method 2: Gunakan Admin Panel
- Login ke admin panel
- Ubah password
- Kelola siswa (future feature)

---

## Custom Domain (Optional)

Jika sudah punya domain sendiri:

### GitHub Pages
1. Settings → Pages
2. Custom domain: `angkatan18.com` (atau domain Anda)
3. Klik Save
4. Di DNS provider, tambah:
   ```
   A record: 185.199.108.153
   A record: 185.199.109.153
   A record: 185.199.110.153
   A record: 185.199.111.153
   ```

### Vercel/Netlify
1. Dashboard → Domains
2. Add custom domain
3. Ikuti instruksi DNS

---

## Maintenance

### Rutin Dilakukan
- [ ] Update nama siswa baru
- [ ] Check mobile responsiveness
- [ ] Monitor uptime
- [ ] Backup data

### Quarterly (3 bulan)
- [ ] Update favicon
- [ ] Refresh design (jika perlu)
- [ ] Optimization
- [ ] Security check

---

## Support & Help

**Jika ada error:**
1. Check browser console (F12)
2. Lihat file mana yang error
3. Re-deploy

**Jika butuh fitur baru:**
1. Update `index.html` atau `admin.html`
2. Test lokal
3. Deploy

---

**Created**: September 2026  
**Last Updated**: 2026-09-04  
**Version**: 1.0.0

