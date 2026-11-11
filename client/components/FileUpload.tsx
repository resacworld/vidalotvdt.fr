import { useState, type DragEvent } from 'react'

export type StoredFile = { name: string; uploadedAt: Date; url: string }

type Props = {
  title: string
  subtitle?: string
  file?: StoredFile | null
  accept?: string // MIME type, e.g. 'application/pdf'
  label?: string
  onFile: (file: File) => void
}

/**
 * Card showing the current file + a drop zone to replace it (drag & drop or file picker).
 * UI only: the parent decides what to do with the File (upload, preview...).
 */
export default function FileUpload({ title, subtitle, file, accept = 'application/pdf', label = 'Déposez un PDF ici pour remplacer le fichier', onFile }: Props) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  // `accept` only filters the file picker, a dropped file can be anything: check it here too.
  function pick(f: File | undefined) {
    if (!f) return
    if (accept && f.type !== accept) return setError('Format de fichier non accepté')
    setError('')
    onFile(f)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault() // otherwise the browser opens the file
    setDragging(false)
    pick(e.dataTransfer.files[0])
  }

  return (
    <section className="rounded-xl border border-light bg-white p-5 font-grotesk w-full">
      <h2 className="mb-3 text-xl font-semibold text-extrabold">{title}</h2>

      {subtitle && <h4 className="pb-2 font-semibold text-bold">{subtitle}</h4>}

      {file && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-semibold text-extrabold">
              <span className="size-3 shrink-0 rounded-sm bg-light" />
              <span className="truncate">{file.name}</span>
            </p>
            <p className="pl-5 text-sm text-gray-700">Mis en ligne le {file.uploadedAt.toLocaleDateString('fr-FR')}</p>
          </div>
          <a href={file.url} download={file.name} className="shrink-0 text-sm font-medium text-bold hover:underline">Télécharger</a>
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center gap-3 rounded-lg border-2 border-dashed px-4 py-6 text-center text-sm transition-colors ${dragging ? 'border-regular bg-extralight' : 'border-light'}`}
      >
        <p className="text-extrabold">{label}</p>
        {/* <label> wrapping the input: native click-to-open, no ref needed. Input stays focusable (sr-only, not hidden). */}
        <label className="cursor-pointer rounded-md border border-regular px-4 py-1.5 text-bold hover:bg-extralight has-focus-visible:outline-2 has-focus-visible:outline-regular">
          Choisir un fichier
          <input type="file" accept={accept} className="sr-only" onChange={(e) => { pick(e.target.files?.[0]); e.target.value = '' }} />
        </label>
        {error && <p role="alert" className="text-red-700">{error}</p>}
      </div>
    </section>
  )
}
