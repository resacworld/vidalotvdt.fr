import { useState } from 'react'
import SideBar from '../../components/SideBar.tsx'
import FileUpload, { type StoredFile } from '../../components/FileUpload.tsx'
import EditableProjectCard from '../../components/EditableProjectCard.tsx'
import ProjectEditModal, { type ProjectForm } from '../../components/ProjectEditModal.tsx'
import type { Project } from '../../components/ProjectCard.tsx'

// ponytail: hardcoded until projects live in the DB.
const projects: Project[] = [
  {
    image: '/images/projet1.webp',
    title: 'Palettiseur de bardage',
    description: "Projet qui a pour but d'équiper et de programmer un robot qui va automatiquement paletiser les tôles produites en bout de ligne de production",
    status: 'Terminé',
    tags: ['C#', 'KRL', 'Kuka.sim', 'Beckhoff', 'Cablâge', 'Pneumatique'],
  },
  {
    image: '/images/projet2.png',
    title: 'Mon Portoflio',
    description: 'Site décrivant mes compétences, mes projets, mon parcours. (ce site)',
    status: 'Terminé',
    tags: ['Node.js', 'SQL', 'React.js', 'Linux', 'Docker', 'Coolify'],
  },
  { title: 'Hello 1', description: 'Lorem ipsum dolor', status: 'En cours', tags: ['C#', 'KRL'] },
  { title: 'Hello 2', description: 'Lorem ipsum dolor', status: 'En cours', tags: ['C#', 'KRL'] },
  { title: 'Hello 3', description: 'Lorem ipsum dolor', status: 'En cours', tags: ['C#', 'KRL'] },
]

export function DashboardPage() {
  // ponytail: local preview only, replaced by the real upload once storage is in place.
  const [cv, setCv] = useState<StoredFile | null>(null)

  // titleEn/descriptionEn empty until projects are bilingual in the DB.
  const [editing, setEditing] = useState<ProjectForm | null>(null)
  const edit = (p: Project) => () => setEditing({ titleFr: p.title, titleEn: '', descriptionFr: p.description, descriptionEn: '', status: p.status, tags: p.tags, image: p.image })

  return (
    // md:flex = sidebar and content side by side (stacked on mobile).
    <div className="min-h-screen bg-extralight md:flex">
        <SideBar />

        {editing && (
          <ProjectEditModal
            project={editing}
            onClose={() => setEditing(null)}
            onSave={(p, imageFile) => { console.log('save', p, imageFile); setEditing(null) }}
          />
        )}

        {/* min-w-0: lets the table scroll instead of widening the page */}
        <main className="min-w-0 flex-1 space-y-6 p-6 md:p-10">
          <div className="flex gap-3">
            <FileUpload
              title="CV"
              subtitle={"Français"}
              file={cv}
              label="Déposez un PDF ici pour remplacer le CV version francaise"
              onFile={(f) => setCv({ name: f.name, uploadedAt: new Date(), url: URL.createObjectURL(f) })}
            />

            <FileUpload
              title="CV"
              subtitle={"Anglais"}
              file={cv}
              label="Déposez un PDF ici pour remplacer le CV version anglaise"
              onFile={(f) => setCv({ name: f.name, uploadedAt: new Date(), url: URL.createObjectURL(f) })}
            />
          </div>

          <div className='flex flex-wrap'>
            {projects.map((p) => <EditableProjectCard key={p.title} {...p} onEdit={edit(p)} />)}
          </div>
          
        </main>
    </div>
  )
}
