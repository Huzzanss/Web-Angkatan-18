const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");

const router = express.Router();

// GET all messages
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("messages").once("value");
    const val = snap.val() || {};
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat pesan." });
  }
});

// POST new message
router.post("/", async (req, res) => {
  const { name, content, color } = req.body || {};
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: "Pesan tidak boleh kosong." });
  }

  try {
    const ref = await db.ref("messages").push({
      name: (name || "Anonim").trim(),
      content: content.trim(),
      color: color || "#4EDEA3",
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan pesan." });
  }
});

module.exports = router;
