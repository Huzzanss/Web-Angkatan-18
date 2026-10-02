const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");

const router = express.Router();

// GET leaderboard (top contributors)
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("leaderboard").once("value");
    const val = snap.val() || {};
    
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (b.points || 0) - (a.points || 0))
      .slice(0, 50); // Top 50

    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat leaderboard." });
  }
});

// GET user's score
router.get("/:userId", async (req, res) => {
  try {
    const snap = await db.ref(`leaderboard/${req.params.userId}`).once("value");
    const data = snap.val();
    if (!data) {
      return res.json({ name: req.params.userId, points: 0 });
    }
    res.json({ id: req.params.userId, ...data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat score." });
  }
});

// PATCH update points (dari activity tracking)
router.patch("/:userId/points", async (req, res) => {
  const { add, name } = req.body || {};
  if (add === undefined || add < 0) {
    return res.status(400).json({ success: false, message: "Nilai points tidak valid." });
  }

  try {
    const snap = await db.ref(`leaderboard/${req.params.userId}`).once("value");
    const data = snap.val() || { name: name || req.params.userId, points: 0 };
    
    const newPoints = (data.points || 0) + add;
    await db.ref(`leaderboard/${req.params.userId}`).set({
      name: name || data.name || req.params.userId,
      points: newPoints,
      updatedAt: admin.database.ServerValue.TIMESTAMP,
    });

    res.json({ success: true, points: newPoints });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal update points." });
  }
});

module.exports = router;
