import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  // Multi-page app — daftarkan semua HTML
  build: {
    rollupOptions: {
      input: {
        main:          resolve(__dirname, 'index.html'),
        students:      resolve(__dirname, 'page/students.html'),
        gallery:       resolve(__dirname, 'page/gallery.html'),
        announcements: resolve(__dirname, 'page/announcements.html'),
        admin:         resolve(__dirname, 'page/admin.html'),
      }
    }
  }
})
