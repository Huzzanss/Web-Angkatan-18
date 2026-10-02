const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");

const router = express.Router();

// GET all forum threads
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("forum").once("value");
    const val = snap.val() || {};
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat forum." });
  }
});

// POST new thread
router.post("/", async (req, res) => {
  const { title, content, author } = req.body || {};
  if (!title || !title.trim() || !content || !content.trim()) {
    return res.status(400).json({ success: false, message: "Judul dan isi wajib diisi." });
  }

  try {
    const ref = await db.ref("forum").push({
      title: title.trim(),
      content: content.trim(),
      author: (author || "Anonim").trim(),
      replies: 0,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal membuat thread." });
  }
});

// GET replies untuk thread tertentu
router.get("/:threadId/replies", async (req, res) => {
  try {
    const snap = await db.ref(`forum_replies/${req.params.threadId}`).once("value");
    const val = snap.val() || {};
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat balasan." });
  }
});

// POST reply ke thread
router.post("/:threadId/replies", async (req, res) => {
  const { content, author } = req.body || {};
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: "Balasan tidak boleh kosong." });
  }

  try {
    const ref = await db.ref(`forum_replies/${req.params.threadId}`).push({
      content: content.trim(),
      author: (author || "Anonim").trim(),
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    
    // Update reply count di thread
    const threadSnap = await db.ref(`forum/${req.params.threadId}`).once("value");
    const thread = threadSnap.val();
    await db.ref(`forum/${req.params.threadId}`).update({ replies: (thread.replies || 0) + 1 });

    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan balasan." });
  }
});

module.exports = router;
