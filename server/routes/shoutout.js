const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");

const router = express.Router();

// GET all shoutouts
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("shoutouts").once("value");
    const val = snap.val() || {};
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat shoutout." });
  }
});

// POST new shoutout
router.post("/", async (req, res) => {
  const { from, to, message } = req.body || {};
  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, message: "Pesan tidak boleh kosong." });
  }

  try {
    const ref = await db.ref("shoutouts").push({
      from: (from || "Rahasia").trim(),
      to: (to || "Untuk Semua").trim(),
      message: message.trim(),
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan shoutout." });
  }
});

module.exports = router;
