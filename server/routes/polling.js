const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");

const router = express.Router();

// GET all polls
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("polls").once("value");
    const val = snap.val() || {};
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat polling." });
  }
});

// POST new poll (admin only)
router.post("/", async (req, res) => {
  const { question, options } = req.body || {};
  if (!question || !question.trim() || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ success: false, message: "Pertanyaan dan minimal 2 opsi wajib." });
  }

  try {
    const optionObj = {};
    options.forEach((opt, idx) => {
      optionObj[idx] = { text: opt, votes: 0 };
    });

    const ref = await db.ref("polls").push({
      question: question.trim(),
      options: optionObj,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal membuat polling." });
  }
});

// PATCH vote in poll
router.patch("/:id/vote/:optionIndex", async (req, res) => {
  try {
    const snap = await db.ref(`polls/${req.params.id}/options/${req.params.optionIndex}`).once("value");
    const option = snap.val();
    if (!option) return res.status(404).json({ success: false, message: "Opsi tidak ditemukan." });

    const newVotes = (option.votes || 0) + 1;
    await db.ref(`polls/${req.params.id}/options/${req.params.optionIndex}`).update({ votes: newVotes });
    res.json({ success: true, votes: newVotes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan vote." });
  }
});

module.exports = router;
