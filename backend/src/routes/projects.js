const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { z } = require('zod');
const Project = require('../models/Project');
const requireAuth = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '../../uploads/projects');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Seules les images sont acceptées'));
  },
});

const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(200),
  description: z.string().min(1),
  technologies: z.string().optional(),
  demoUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  date: z.string(),
  order: z.coerce.number().optional(),
  published: z.string().optional(),
  category: z.string().optional(),
});

// GET /api/projects — public, only published
router.get('/', async (req, res) => {
  try {
    const filter = { published: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.tech) filter.technologies = req.query.tech;
    const projects = await Project.find(filter).sort({ order: 1, date: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/projects/all — admin, all including drafts
router.get('/all', requireAuth, async (_req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, date: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PATCH /api/projects/reorder — admin
router.patch('/reorder', requireAuth, async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items requis' });
  await Promise.all(items.map(({ id, order }) => Project.findByIdAndUpdate(id, { order })));
  res.json({ ok: true });
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projet introuvable' });
    res.json(project);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/projects — admin
router.post(
  '/',
  requireAuth,
  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images' }]),
  async (req, res) => {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const files = req.files || {};
    if (!files.coverImage) return res.status(400).json({ error: 'Image de couverture requise' });

    const data = parsed.data;
    const project = new Project({
      ...data,
      technologies: data.technologies ? JSON.parse(data.technologies) : [],
      published: data.published === 'true',
      order: data.order ?? 0,
      coverImage: `/uploads/projects/${files.coverImage[0].filename}`,
      images: (files.images || []).map((f) => `/uploads/projects/${f.filename}`),
    });

    await project.save();
    res.status(201).json(project);
  }
);

// PUT /api/projects/:id — admin
router.put(
  '/:id',
  requireAuth,
  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images' }]),
  async (req, res) => {
    const parsed = projectSchema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const files = req.files || {};
    const update = { ...parsed.data };
    if (update.technologies) update.technologies = JSON.parse(update.technologies);
    if (update.published !== undefined) update.published = update.published === 'true';
    if (files.coverImage) update.coverImage = `/uploads/projects/${files.coverImage[0].filename}`;
    // Merge kept existing images + newly uploaded ones
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : null;
    const newImages = (files.images || []).map((f) => `/uploads/projects/${f.filename}`);
    if (existingImages !== null || newImages.length > 0) {
      update.images = [...(existingImages || []), ...newImages];
    }

    const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!project) return res.status(404).json({ error: 'Projet introuvable' });
    res.json(project);
  }
);

// DELETE /api/projects/:id — admin
router.delete('/:id', requireAuth, async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ error: 'Projet introuvable' });
  res.json({ ok: true });
});

module.exports = router;
