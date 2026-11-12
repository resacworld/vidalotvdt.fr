import NavBar from '../components/NavBar.tsx'
import ProjectCard, { localize } from '../components/ProjectCard.tsx'
import type { Project } from '../../src/types/project.ts'
import SkillCard from '../components/SkillCard.tsx'
import TimeLine from '../components/TimeLine.tsx'
import Title from '../components/Title.tsx'

// Data comes from the server (already in the HTML), no fetch on load.
export function SsrHomePage({ projects }: { projects: Project[] }) {
  return (
    <>
      <NavBar />

      <header className='bg-bold font-grotesk text-white'>
        <div className='mx-auto max-w-5xl px-6 py-12'>
          <p className='text-sm text-violet-200'>Élève ingénieur en alternance, CESI Toulouse</p>
          <h1 className='mt-4 max-w-2xl text-4xl font-semibold leading-tight'>
            Je conçois des machines spéciales et le logiciel qui les pilote.
          </h1>
          <p className='mt-6 max-w-md text-sm text-violet-100'>
            Robotique industrielle, automatisme et développement C# chez NovaLynx, constructeur de machines spéciales près de Toulouse.
          </p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <a href='/cv/fr' download className='rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-950 hover:bg-violet-100'>
              Télécharger mon CV (PDF)
            </a>
            <a href='#projets' className='rounded-md border border-violet-300/60 px-4 py-2 text-sm font-medium hover:bg-white/10'>
              Voir les projets
            </a>
          </div>
        </div>
      </header>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-4'>
          <Title id="parcours" title="Parcours"/>

          <TimeLine 
          steps={[
            {
              date: "2023-2025",
              school: "IMERIR",
              schoolDetail: "Occitanie - Pyrénées orientales / Perpignan",
              role: "Alternant informaticien / Roboticien",
              company: "NovaLynx",
              companyDetail: "Integrateur d'innovations",
              current: true
            },
            {
              date: "2025-2026",
              school: "CNAM",
              schoolDetail: "Occitanie - Pyrénées orientales / Perpignan",
              role: "Alternant informaticien / Roboticien",
              company: "NovaLynx",
              companyDetail: "Integrateur d'innovations",
              current: true
            },
            {
              date: "2026-2029",
              school: "CESI",
              schoolDetail: "Occitanie - Haute Garonne / Toulouse",
              role: "Alternant Gestion de projet technique",
              company: "NovaLynx",
              companyDetail: "Integrateur d'innovations",
              current: true
            }
          ]}
          />

          <Title id="projets" title="Projets"/>

          <div className='flex justify-between flex-col md:flex-row'>
            {/* ponytail: French only until the /en route exists */}
            {projects.map((p) => <ProjectCard key={p.id} {...localize(p, 'fr')} />)}
          </div>

          <Title id="competences" title="Compétences"/>

          <div className='flex justify-between flex-col md:flex-row'>
            <SkillCard 
            title='Robotique'
            skills={["Programmation kuka (KRL)", "Simulation KUKA.Sim", "Roboguide", "ROS / ROS2"]}
            />
            <SkillCard 
            title='Automatisme'
            skills={["Automate Siemens", "Automate Beckhoff", "Electricité", "Electronique"]}
            />
            <SkillCard 
            title='Developpement'
            skills={["C#", "C++", "KRL", "Python", "SQL", "Node.js"]}
            />
            <SkillCard 
            title='Infrastructure'
            skills={["Linux", "Docker", "Coolify"]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
