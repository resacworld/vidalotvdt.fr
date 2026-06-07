const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const CV = require('../models/CV');
const requireAuth = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '../../uploads/cv');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    cb(null, `photo-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/cv — public
router.get('/', async (_req, res) => {
  try {
    let cv = await CV.findOne();
    if (!cv) cv = new CV();
    res.json(cv);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT /api/cv — admin
router.put('/', requireAuth, upload.single('photo'), async (req, res) => {
  try {
    let body;
    try {
      body = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
    } catch {
      body = req.body;
    }

    let cv = await CV.findOne();
    if (!cv) cv = new CV();

    const { profile, experiences, educations, skills, languages, interests } = body;
    if (profile) cv.profile = { ...cv.profile, ...profile };
    if (experiences !== undefined) cv.experiences = experiences;
    if (educations !== undefined) cv.educations = educations;
    if (skills !== undefined) cv.skills = skills;
    if (languages !== undefined) cv.languages = languages;
    if (interests !== undefined) cv.interests = interests;

    if (req.file) {
      // Apply EXIF auto-rotation so the image is always upright (fixes mobile photos)
      const filePath = req.file.path;
      await sharp(filePath).rotate().toFile(filePath + '.tmp');
      fs.renameSync(filePath + '.tmp', filePath);
      cv.profile.photo = `/uploads/cv/${req.file.filename}`;
    }

    await cv.save();
    res.json(cv);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
