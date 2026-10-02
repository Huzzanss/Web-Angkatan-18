// Express app WITHOUT app.listen(). Shared by two entry points:
//   - server/server.js -> untuk dev lokal / Render (adds static + app.listen)
//   - /api/index.js -> untuk Vercel (Vercel handle static files; ini hanya API)
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const announcementRoutes = require("./routes/announcements");
const galleryRoutes = require("./routes/gallery");
const messageRoutes = require("./routes/messages");
const shoutoutRoutes = require("./routes/shoutout");
const confessionRoutes = require("./routes/confession");
const forumRoutes = require("./routes/forum");
const pollingRoutes = require("./routes/polling");
const timecapsuleRoutes = require("./routes/timecapsule");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin tidak diizinkan oleh CORS."));
    }
  },
}));

app.use(express.json({ limit: "8mb" }));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/shoutout", shoutoutRoutes);
app.use("/api/confession", confessionRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/polling", pollingRoutes);
app.use("/api/timecapsule", timecapsuleRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

module.exports = app;
