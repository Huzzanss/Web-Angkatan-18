const express = require("express");
const { db, admin } = require("../config/firebaseAdmin");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET all gallery images
router.get("/", async (req, res) => {
  try {
    const snap = await db.ref("gallery").once("value");
    const val = snap.val() || {};
    const list = Object.entries(val)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal memuat galeri." });
  }
});

// POST new photo (base64)
router.post("/", requireAuth, async (req, res) => {
  const { url, caption } = req.body || {};
  if (!url || !url.trim()) {
    return res.status(400).json({ success: false, message: "URL foto wajib diisi." });
  }

  try {
    const ref = await db.ref("gallery").push({
      url: url.trim(),
      caption: (caption || "").trim(),
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    res.json({ success: true, id: ref.key });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan foto." });
  }
});

// DELETE photo
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await db.ref(`gallery/${req.params.id}`).remove();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menghapus foto." });
  }
});

module.exports = router;
