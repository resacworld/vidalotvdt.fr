import { useEffect, useState } from 'react'
import { api } from '../../api.ts'
import type { Project } from '../../../src/types/project.ts'
import SideBar from '../../components/SideBar.tsx'
import FileUpload, { type StoredFile } from '../../components/FileUpload.tsx'
import EditableProjectCard from '../../components/EditableProjectCard.tsx'
import ProjectEditModal, { type ProjectForm } from '../../components/ProjectEditModal.tsx'
import { localize } from '../../components/ProjectCard.tsx'

const emptyProject: ProjectForm = { titleFr: '', titleEn: '', descriptionFr: '', descriptionEn: '', status: 'ongoing', tags: [], image: null }

export function DashboardPage() {
  // ponytail: local preview only, replaced by the real upload once storage is in place.
  const [cv, setCv] = useState<StoredFile | null>(null)

  const [projects, setProjects] = useState<Project[]>([])
  // id = edit an existing project, no id = create one.
  const [editing, setEditing] = useState<(ProjectForm & { id?: number }) | null>(null)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    api.project.list.query().then(setProjects)
  }, [])

  // ponytail: imageFile ignored until file storage exists; the image path stays as it was.
  async function save(form: ProjectForm) {
    try {
      const id = editing?.id
      if (id) {
        const updated = await api.project.update.mutate({ ...form, id })
        setProjects((ps) => ps.map((p) => (p.id === id ? updated : p)))
      } else {
        const created = await api.project.create.mutate(form)
        setProjects((ps) => [...ps, created])
      }
      setSaveError('')
      setEditing(null)
    } catch {
      setSaveError('Enregistrement impossible, vérifie les champs (un tag ne peut pas contenir de virgule).')
    }
  }

  return (
    // md:flex = sidebar and content side by side (stacked on mobile).
    <div className="min-h-screen bg-extralight md:flex">
        <SideBar />

        {editing && (
          <ProjectEditModal
            title={editing.id ? 'Modifier le projet' : 'Nouveau projet'}
            error={saveError}
            project={editing}
            onClose={() => { setEditing(null); setSaveError('') }}
            onSave={save}
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

          <div className="flex items-center justify-between">
            <h2 className="font-grotesk text-xl font-semibold text-extrabold">Projets</h2>
            <button type="button" onClick={() => setEditing(emptyProject)} className="rounded-md bg-bold px-4 py-2 text-sm font-medium text-white hover:bg-extrabold">
              Nouveau projet
            </button>
          </div>

          <div className='flex flex-wrap'>
            {projects.map((p) => <EditableProjectCard key={p.id} {...localize(p, 'fr')} onEdit={() => setEditing(p)} />)}
          </div>
        </main>
    </div>
  )
}
