const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");

const router = express.Router();

// GET all confessions
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("confessions").once("value");
    const val = snap.val() || {};
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat confession." });
  }
});

// POST new confession
router.post("/", async (req, res) => {
  const { content } = req.body || {};
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: "Confession tidak boleh kosong." });
  }

  try {
    const ref = await db.ref("confessions").push({
      content: content.trim(),
      likes: 0,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan confession." });
  }
});

// PATCH like confession
router.patch("/:id/like", async (req, res) => {
  try {
    const snap = await db.ref(`confessions/${req.params.id}`).once("value");
    const data = snap.val();
    if (!data) return res.status(404).json({ success: false, message: "Confession tidak ditemukan." });

    const newLikes = (data.likes || 0) + 1;
    await db.ref(`confessions/${req.params.id}`).update({ likes: newLikes });
    res.json({ success: true, likes: newLikes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal update like." });
  }
});

module.exports = router;
