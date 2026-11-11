export type Project = {
  title: string
  description: string
  status: 'En cours' | 'Terminé'
  tags: string[]
  image?: string
}

export default function ProjectCard({ title, description, status, tags, image }: Project) {
  return (
    <article className="overflow-hidden rounded-lg border border-violet-100 bg-white m-4 md:w-sm">
      {image ? <img src={image} alt="" className="h-40 w-full object-cover" /> : <div className="h-40 bg-violet-200" />}
      <div className="space-y-3 p-4">
        <span className={`inline-block rounded px-2 py-0.5 text-xs ${status === 'Terminé' ? 'bg-violet-700 text-white' : 'bg-violet-100 text-violet-700'}`}>
          {status}
        </span>
        <h3 className="text-lg font-semibold leading-snug text-indigo-950">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((t) => <li key={t} className="rounded border border-violet-100 px-2 py-0.5 text-xs text-violet-700">{t}</li>)}
        </ul>
      </div>
    </article>
  )
}
