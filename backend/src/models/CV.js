const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  profile: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    bio: { type: String, default: '' },
    photo: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
  },
  experiences: [
    {
      title: String,
      company: String,
      period: String,
      description: String,
      technologies: [String],
    },
  ],
  educations: [
    {
      degree: String,
      school: String,
      period: String,
      description: String,
    },
  ],
  skills: [
    {
      category: String,
      items: [{ name: String, level: String }],
    },
  ],
  languages: [{ name: String, level: String }],
  interests: [String],
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);
