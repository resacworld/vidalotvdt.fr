const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true },
    technologies: [{ type: String, trim: true }],
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    demoUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    date: { type: Date, required: true },
    order: { type: Number, required: true, default: 0 },
    published: { type: Boolean, default: true },
    category: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
