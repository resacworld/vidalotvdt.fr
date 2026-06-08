require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const authRoutes    = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const cvRoutes      = require('./routes/cv');
const contactRoutes = require('./routes/contact');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS uniquement en dev (en prod, frontend et backend partagent la même origine)
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }));
}

app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/cv',       cvRoutes);
app.use('/api/contact',  contactRoutes);
app.get('/api/health',   (_req, res) => res.json({ ok: true }));

// Frontend SPA — servi uniquement si le build est présent (production)
const frontendDist = path.join(__dirname, '../frontend-dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Toutes les routes non-API renvoient index.html (client-side routing)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
