import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:          resolve(__dirname, 'index.html'),
        students:      resolve(__dirname, 'page/students.html'),
        gallery:       resolve(__dirname, 'page/gallery.html'),
        announcements: resolve(__dirname, 'page/announcements.html'),
        admin:         resolve(__dirname, 'page/admin.html'),
        messages:      resolve(__dirname, 'page/messages.html'),
        shoutout:      resolve(__dirname, 'page/shoutout.html'),
        confession:    resolve(__dirname, 'page/confession.html'),
        forum:         resolve(__dirname, 'page/forum.html'),
        polling:       resolve(__dirname, 'page/polling.html'),
        timecapsule:   resolve(__dirname, 'page/timecapsule.html'),
        leaderboard:   resolve(__dirname, 'page/leaderboard.html'),
        wordle:        resolve(__dirname, 'page/wordle.html'),
      }
    }
  }
})
