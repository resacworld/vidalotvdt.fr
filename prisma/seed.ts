/*
This file is to generate fake datas, used only for developpement purposes
*/

import { db } from '../src/repositories/db.ts'

if ((await db.project.count()) === 0) {
  await db.project.createMany({
    data: [
      {
        titleFr: 'Palettiseur de bardage',
        titleEn: 'Cladding palletizer',
        descriptionFr: "Projet qui a pour but d'équiper et de programmer un robot qui va automatiquement paletiser les tôles produites en bout de ligne de production",
        descriptionEn: 'Equipping and programming a robot that automatically palletizes the metal sheets coming off the end of the production line',
        status: 'done',
        tags: 'C#,KRL,Kuka.sim,Beckhoff,Cablâge,Pneumatique',
        image: '/images/projet1.webp',
      },
      {
        titleFr: 'Mon Portfolio',
        titleEn: 'My portfolio',
        descriptionFr: 'Site décrivant mes compétences, mes projets, mon parcours. (ce site)',
        descriptionEn: 'Website presenting my skills, projects and background. (this site)',
        status: 'done',
        tags: 'Node.js,SQL,React.js,Linux,Docker,Coolify',
        image: '/images/projet2.png',
      },
    ],
  })
}
await db.$disconnect()
