const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET all announcements
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("announcements").once("value");
    const val = snap.val() || {};
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat pengumuman." });
  }
});

// POST new announcement (admin only)
router.post("/", requireAuth, async (req, res) => {
  const { title, body } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, message: "Judul pengumuman wajib diisi." });
  }

  try {
    const ref = await db.ref("announcements").push({
      title: title.trim(),
      body: (body || "").trim(),
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan pengumuman." });
  }
});

// PUT update announcement
router.put("/:id", requireAuth, async (req, res) => {
  const { title, body } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, message: "Judul pengumuman wajib diisi." });
  }

  try {
    await db.ref(`announcements/${req.params.id}`).update({
      title: title.trim(),
      body: (body || "").trim(),
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memperbarui pengumuman." });
  }
});

// DELETE announcement
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await db.ref(`announcements/${req.params.id}`).remove();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menghapus pengumuman." });
  }
});

module.exports = router;
