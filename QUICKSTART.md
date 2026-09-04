# 🚀 Quick Start Guide

Panduan cepat memulai Website Angkatan 18!

---

## 5 Menit Setup

### Step 1: Buka Website (Tidak perlu setup!)
```
Buka di browser:
index.html
```

✅ Website langsung jalan!

---

## Fitur Utama

### 📋 Direktori Siswa
- Lihat semua 79 siswa (37 putra + 42 putri)
- Filter by gender (Semua/Putra/Putri)
- Search nama siswa
- Sorting A-Z otomatis

### 🔐 Admin Panel
Akses: `admin.html`
```
ID: admin
Password: Angkatan18!
```

**Fitur:**
- View statistics
- Manage students
- Change password
- Settings

---

## Testing Lokal

### Dengan Server Lokal (Recommended)

**Python:**
```bash
cd C:\Users\Hafidz\OneDrive\Documents\GitHub\Website-Angkatan-18
python -m http.server 8000
# Buka: http://localhost:8000
```

**Node.js:**
```bash
cd C:\Users\Hafidz\OneDrive\Documents\GitHub\Website-Angkatan-18
npx http-server
# Buka: http://localhost:8080
```

### Tanpa Server
- Cukup double-click `index.html`
- Website jalan di browser lokal

---

## Customization

### Ubah Nama Sekolah
Edit di `index.html`:
```html
<span class="font-label-sm text-label-sm text-primary tracking-wider uppercase">
  Ganti ini dengan nama sekolah
</span>
```

### Ubah Warna
Edit di `<style>` atau Tailwind config:
```
Primary color: #4edea3
Ubah ke warna pilihan Anda
```

### Tambah/Hapus Siswa
Edit di `index.html`, cari `STUDENTS_DATA`:
```javascript
male: ["Nama1", "Nama2", ...],
female: ["Nama1", "Nama2", ...]
```

---

## Deploy Website

### Fastest Way: GitHub Pages
1. Push to GitHub
2. Settings → Pages
3. Deploy from `main` branch
4. Website live in 1-2 minutes!

### Alternative: Vercel
1. Kunjungi vercel.com
2. Import repository
3. Deploy otomatis
4. Live in seconds!

Lihat `DEPLOYMENT.md` untuk detail lengkap.

---

## Mobile Testing

### Desktop
✅ Fully responsive

### Tablet (iPad)
✅ Optimized layout

### Phone (iPhone/Android)
✅ Touch-friendly
✅ 1-column layout
✅ Easy navigation

Buka di browser mobile dan test semua fitur!

---

## Admin Panel Usage

### Login
1. Buka `admin.html`
2. Masukkan ID & password
3. Klik "Masuk ke Admin"

### Di Dashboard
- **Stats**: Lihat jumlah siswa
- **Manage Students**: CRUD operations (soon)
- **Change Password**: Ubah password admin
- **Settings**: Konfigurasi lainnya

### Change Password
1. Klik "Ubah Password"
2. Masukkan password lama
3. Buat password baru (min 8 chars)
4. Konfirmasi
5. Simpan

⚠️ **Penting**: Ubah password default setelah setup!

---

## Troubleshooting

### Website tidak muncul
**Solution:**
- Refresh browser (Ctrl+F5)
- Clear cache
- Coba browser lain

### Admin tidak bisa login
**Solution:**
- Pastikan username: `admin`
- Pastikan password: `Angkatan18!`
- Check console untuk error

### Search tidak bekerja
**Solution:**
- Buka F12 → Console
- Check apakah ada JS error
- Refresh page

### Mobile tidak responsive
**Solution:**
- Buka browser DevTools (F12)
- Toggle "Toggle device toolbar"
- Pilih mobile device
- Refresh

---

## File Structure

```
Website-Angkatan-18/
├── index.html           # Main website
├── admin.html           # Admin panel
├── data.json            # Student database
├── README.md            # Project info
├── DEPLOYMENT.md        # How to deploy
├── CONTRIBUTING.md      # How to contribute
├── CHANGELOG.md         # Version history
└── .gitignore           # Git ignore
```

---

## Important Notes

✅ **No setup needed** - Just open HTML files!  
✅ **No database required** - Data in HTML  
✅ **Mobile responsive** - Works on all devices  
✅ **Dark theme** - Eye-friendly design  
✅ **Fast loading** - No dependencies  

---

## Next Steps

1. ✅ Open `index.html` → Explore website
2. ✅ Open `admin.html` → Test admin panel
3. ✅ Test search & filters
4. ✅ Test on mobile
5. ✅ Ready to deploy!

---

## Support

- Check `README.md` for info
- Check `DEPLOYMENT.md` for hosting
- Check `CONTRIBUTING.md` for help
- Check `CHANGELOG.md` for updates

---

## Pro Tips

💡 **Tip 1**: Bookmark website untuk akses cepat  
💡 **Tip 2**: Share link dengan semua siswa/siswi  
💡 **Tip 3**: Update password admin secara berkala  
💡 **Tip 4**: Backup data.json setiap minggu  
💡 **Tip 5**: Monitor uptime setelah deploy  

---

## You're Ready! 🎉

Website Anda siap untuk:
- ✅ Testing lokal
- ✅ Deployment
- ✅ Sharing dengan siswa
- ✅ Future customization

**Selamat menikmati Website Angkatan 18!**

---

**Version**: 1.0.0  
**Last Updated**: September 4, 2026

