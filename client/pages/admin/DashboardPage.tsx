import { useEffect, useState } from 'react'
import { api, upload } from '../../api.ts'
import type { Project } from '../../../src/types/project.ts'
import SideBar from '../../components/SideBar.tsx'
import FileUpload, { type StoredFile } from '../../components/FileUpload.tsx'
import EditableProjectCard from '../../components/EditableProjectCard.tsx'
import ProjectEditModal, { type ProjectForm } from '../../components/ProjectEditModal.tsx'
import { localize } from '../../components/ProjectCard.tsx'

type Lang = 'fr' | 'en'
type CvInfo = { name: string; uploadedAt: number; url: string } | null // as sent by the server
const toStored = (i: CvInfo): StoredFile | null => i && { ...i, uploadedAt: new Date(i.uploadedAt) }

const emptyProject: ProjectForm = { titleFr: '', titleEn: '', descriptionFr: '', descriptionEn: '', status: 'ongoing', tags: [], image: null }

export function DashboardPage() {
  const [cv, setCv] = useState<Record<Lang, StoredFile | null>>({ fr: null, en: null })

  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<(ProjectForm & { id?: number }) | null>(null)  // id = edit an existing project, no id = create one.
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    api.project.list.query().then(setProjects)
    api.cv.info.query().then((i) => setCv({ fr: toStored(i.fr), en: toStored(i.en) }))
  }, [])

  // Errors bubble up to FileUpload, which shows them.
  async function uploadCv(lang: Lang, file: File) {
    const info = await upload<CvInfo>(`/api/cv/${lang}`, file)
    setCv((c) => ({ ...c, [lang]: toStored(info) }))
  }


  // Update the local context if something has changed
  const upsert = (saved: Project) =>
    setProjects((ps) => (ps.some((p) => p.id === saved.id) ? ps.map((p) => (p.id === saved.id ? saved : p)) : [...ps, saved]))

  // Text first (a new project needs an id), then the image, which updates the project's image path server-side.
  async function saveProject(form: ProjectForm, imageFile?: File) {
    let saved: Project
    try {
      const id = editing?.id
      saved = id ? await api.project.update.mutate({ ...form, id }) : await api.project.create.mutate(form)
    } catch {
      return setSaveError('Enregistrement impossible, vérifie les champs (un tag ne peut pas contenir de virgule).')
    }
    upsert(saved)
    setEditing(saved) // a retry after a failed image upload is an update, not a second create

    if (imageFile) {
      try {
        upsert(await upload<Project>(`/api/projects/${saved.id}/image`, imageFile))
      } catch {
        return setSaveError('Projet enregistré, mais l’image n’a pas pu être envoyée (PNG, JPG ou WebP, 10 Mo max).')
      }
    }
    setSaveError('')
    setEditing(null)
  }

  return (
    <div className="min-h-screen bg-extralight md:flex">
        <SideBar />

        {editing && (
          <ProjectEditModal
            title={editing.id ? 'Modifier le projet' : 'Nouveau projet'}
            error={saveError}
            project={editing}
            onClose={() => { setEditing(null); setSaveError('') }}
            onSave={saveProject}
          />
        )}

        <main className="min-w-0 flex-1 space-y-6 p-6 md:p-10">
          <div className="flex gap-3">
            <FileUpload
              title="CV"
              subtitle={"Français"}
              file={cv.fr}
              label="Déposez un PDF ici pour remplacer le CV version francaise"
              onFile={(f) => uploadCv('fr', f)}
            />

            <FileUpload
              title="CV"
              subtitle={"Anglais"}
              file={cv.en}
              label="Déposez un PDF ici pour remplacer le CV version anglaise"
              onFile={(f) => uploadCv('en', f)}
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
