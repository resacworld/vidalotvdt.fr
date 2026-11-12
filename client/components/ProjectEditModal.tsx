import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

import type { ProjectInput } from '../../src/types/project.ts'
import { statusLabel } from './ProjectCard.tsx'

// Same shape as the API input: what the modal returns can be sent as-is.
export type ProjectForm = ProjectInput

type Props = {
  title: string
  error?: string
  project: ProjectForm
  onClose: () => void
  // imageFile only when the image was replaced; the parent uploads it.
  onSave: (project: ProjectForm, imageFile?: File) => void
}

const input = 'w-full rounded-md border border-light bg-white px-3 py-2 text-sm text-extrabold focus:border-regular focus:outline-none'
const label = 'text-sm font-semibold text-extrabold'

/**
 * Project edit modal. Render it only while editing ({editing && <ProjectEditModal .../>}):
 * fresh state on every open, and native <dialog> gives Esc, backdrop and focus trap for free.
 */
export default function ProjectEditModal({ title, error, project, onClose, onSave }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [tags, setTags] = useState(project.tags)
  const [tagDraft, setTagDraft] = useState('')
  const [image, setImage] = useState(project.image)
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => dialog.current?.showModal(), [])

  function addTag() {
    const tag = tagDraft.trim()
    if (tag && !tags.includes(tag)) setTags([...tags, tag])
    setTagDraft('')
  }

  function onTagKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault() // Enter would submit the form
      addTag()
    } else if (e.key === 'Backspace' && !tagDraft) {
      setTags(tags.slice(0, -1))
    }
  }

  function onImage(file: File | undefined) {
    if (!file) return
    setImageFile(file)
    setImage(URL.createObjectURL(file))
  }

  // React 19 form action: FormData directly, no preventDefault.
  function submit(f: FormData) {
    onSave({
      titleFr: String(f.get('titleFr')),
      titleEn: String(f.get('titleEn')),
      descriptionFr: String(f.get('descriptionFr')),
      descriptionEn: String(f.get('descriptionEn')),
      status: f.get('status') as ProjectForm['status'],
      tags,
      image: project.image, // `image` state may be a blob: preview; a new image travels as imageFile
    }, imageFile)
  }

  return (
    // m-auto: Tailwind's preflight resets the margin that centers a native dialog.
    <dialog ref={dialog} onClose={onClose} className="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-xl bg-extralight p-6 font-grotesk backdrop:bg-extrabold/40">
      <form action={submit} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-extrabold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded px-2 text-xl text-bold hover:bg-light">×</button>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className={`${label} mb-2`}>Image</p>
            <div className="flex items-center gap-4">
              {image ? <img src={image} alt="" className="h-20 w-36 rounded-md object-cover" /> : <div className="h-20 w-36 rounded-md bg-light" />}
              <div className="space-y-2 text-sm text-gray-700">
                <label className="inline-block cursor-pointer rounded-md border border-regular bg-white px-4 py-1.5 text-bold hover:bg-extralight has-focus-visible:outline-2 has-focus-visible:outline-regular">
                  Remplacer l’image
                  <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => onImage(e.target.files?.[0])} />
                </label>
                <p>PNG, JPG ou WebP, format paysage.</p>
              </div>
            </div>
          </div>

          <label className="flex flex-col gap-2 sm:w-40">
            <span className={label}>Statut</span>
            <select name="status" defaultValue={project.status} className={input}>
              {Object.entries(statusLabel.fr).map(([value, text]) => <option key={value} value={value}>{text}</option>)}
            </select>
          </label>
        </div>

        {/* md: label | Français | English. Mobile: everything stacked, language in the placeholder. */}
        <div className="grid gap-3 md:grid-cols-[7rem_1fr_1fr] md:gap-x-4">
          <div className="hidden md:block" />
          <p className="hidden text-sm font-semibold text-bold md:block">Français</p>
          <p className="hidden text-sm font-semibold text-bold md:block">English</p>

          <p className={`${label} md:pt-2`}>Titre</p>
          <input name="titleFr" defaultValue={project.titleFr} required aria-label="Titre (français)" placeholder="Français" className={input} />
          <input name="titleEn" defaultValue={project.titleEn} required aria-label="Title (English)" placeholder="English" className={input} />

          <p className={`${label} md:pt-2`}>Description</p>
          <textarea name="descriptionFr" defaultValue={project.descriptionFr} rows={5} aria-label="Description (français)" placeholder="Français" className={input} />
          <textarea name="descriptionEn" defaultValue={project.descriptionEn} rows={5} aria-label="Description (English)" placeholder="English" className={input} />
        </div>

        <div>
          <p className={`${label} mb-2`}>Technologies</p>
          <div className="flex flex-wrap items-center gap-2 rounded-md border border-light bg-white px-3 py-2 focus-within:border-regular">
            {tags.map((t) => (
              <button key={t} type="button" onClick={() => setTags(tags.filter((x) => x !== t))} aria-label={`Retirer ${t}`}
                className="rounded bg-light px-2 py-0.5 text-sm text-bold hover:line-through">
                {t}
              </button>
            ))}
            <input value={tagDraft} onChange={(e) => setTagDraft(e.target.value)} onKeyDown={onTagKey} onBlur={addTag}
              aria-label="Ajouter une technologie" placeholder="Ajouter une technologie"
              className="min-w-40 flex-1 text-sm text-extrabold placeholder:text-bold focus:outline-none" />
          </div>
        </div>

        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-md border border-regular bg-white px-5 py-2 text-sm text-bold hover:bg-extralight">Annuler</button>
          <button type="submit" className="rounded-md bg-bold px-5 py-2 text-sm font-medium text-white hover:bg-extrabold">Enregistrer</button>
        </div>
      </form>
    </dialog>
  )
}
