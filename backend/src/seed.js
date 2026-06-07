require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const CV = require('./models/CV');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  // Admin user
  const existing = await User.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
  if (!existing) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeme', 12);
    await User.create({ username: process.env.ADMIN_USERNAME || 'admin', passwordHash });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  // Initial CV
  const cv = await CV.findOne();
  if (!cv) {
    await CV.create({
      profile: {
        name: 'Victor VIDALOT',
        title: 'Développeur Full-Stack',
        bio: "Développeur depuis 2 ans, passionné par la programmation, la mécanique et l'hydraulique. Toujours en quête de nouveaux défis et de technologies à maîtriser.",
        email: 'vidalotvictor@gmail.com',
        location: 'France',
        github: 'https://github.com/vidalotvdt',
        linkedin: '',
      },
      experiences: [
        {
          title: 'Développeur Full-Stack (Alternant)',
          company: 'Novalynx',
          period: '2023 — Présent',
          description: "Création de superviseurs industriels pour contrôler les machines de l'entreprise. Développement d'un logiciel de calcul de trajectoire pour robot industriel.",
          technologies: ['C#', 'WPF', 'RoboDK', 'Visual Studio'],
        },
      ],
      educations: [
        {
          degree: 'Bachelor Développement Web & Applications',
          school: 'École supérieure',
          period: '2022 — 2025',
          description: '',
        },
      ],
      skills: [
        {
          category: 'Frontend',
          items: [
            { name: 'React', level: 'Avancé' },
            { name: 'Tailwind CSS', level: 'Avancé' },
            { name: 'Vite', level: 'Intermédiaire' },
          ],
        },
        {
          category: 'Backend',
          items: [
            { name: 'Node.js', level: 'Avancé' },
            { name: 'Express', level: 'Avancé' },
            { name: 'MongoDB', level: 'Intermédiaire' },
            { name: 'C#', level: 'Avancé' },
          ],
        },
        {
          category: 'DevOps',
          items: [
            { name: 'Docker', level: 'Intermédiaire' },
            { name: 'Git', level: 'Avancé' },
          ],
        },
      ],
      languages: [
        { name: 'Français', level: 'Natif' },
        { name: 'Anglais', level: 'Professionnel' },
      ],
      interests: ['Programmation', 'Mécanique', 'Hydraulique', 'Nouvelles technologies'],
    });
    console.log('CV created');
  } else {
    console.log('CV already exists');
  }

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((e) => { console.error(e); process.exit(1); });
