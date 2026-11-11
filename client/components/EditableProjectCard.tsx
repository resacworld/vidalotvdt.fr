import { statusLabel, type ProjectCardData } from "./ProjectCard.tsx";

export default function EditableProjectCard({ title, status, image, onEdit }: ProjectCardData & { onEdit: () => void }) {
  return (
    <article className="overflow-hidden rounded-lg border border-violet-100 bg-white min-w-sm ml-4 mb-3 md:w-sm">
      {image ? <img src={image} alt="" className="h-40 w-full object-cover" /> : <div className="h-40 bg-violet-200" />}
      <div className="p-4 flex flex-col justify-between">
        <div className="space-y-3">
          <span className={`inline-block rounded px-2 py-0.5 text-xs ${status === 'done' ? 'bg-violet-700 text-white' : 'bg-violet-100 text-violet-700'}`}>
            {statusLabel.fr[status]}
          </span>
          <h3 className="text-lg font-semibold leading-snug text-indigo-950">{title}</h3>
          <button type="button" onClick={onEdit} className="cursor-pointer rounded-md border border-regular px-4 py-1.5 text-bold hover:bg-gray-200 w-full">
            Modifier
          </button>
        </div>
      </div>
    </article>
  )
}
