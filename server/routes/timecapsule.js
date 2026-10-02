const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");

const router = express.Router();

const UNLOCK_DATE = "2029-09-09";

// GET all timecapsule messages
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("timecapsule").once("value");
    const val = snap.val() || {};
    
    const today = new Date().toISOString().split("T")[0];
    const isUnlocked = today >= UNLOCK_DATE;

    const list = Object.entries(val)
      .map(([id, data]) => {
        if (isUnlocked) {
          return { id, ...data };
        }
        // Jika belum unlock, hide content
        return { id, author: data.author, createdAt: data.createdAt, locked: true };
      })
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    res.json({ messages: list, unlocked: isUnlocked, unlockDate: UNLOCK_DATE });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat timecapsule." });
  }
});

// POST new message in timecapsule
router.post("/", async (req, res) => {
  const { author, content } = req.body || {};
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: "Pesan tidak boleh kosong." });
  }

  try {
    const ref = await db.ref("timecapsule").push({
      author: (author || "Anonim").trim(),
      content: content.trim(),
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan pesan." });
  }
});

module.exports = router;
