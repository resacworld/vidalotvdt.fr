import type { Project, ProjectStatus } from '../../src/types/project.ts'

export type Lang = 'fr' | 'en'

// What a card displays: one language already picked.
export type ProjectCardData = {
  title: string
  description: string
  status: ProjectStatus
  tags: string[]
  image: string | null
}

export const statusLabel: Record<Lang, Record<ProjectStatus, string>> = {
  fr: { ongoing: 'En cours', done: 'Terminé' },
  en: { ongoing: 'Ongoing', done: 'Completed' },
}

// DB row (one column per language) -> card data in the requested language.
export const localize = (p: Project, lang: Lang): ProjectCardData => ({
  title: lang === 'fr' ? p.titleFr : p.titleEn,
  description: lang === 'fr' ? p.descriptionFr : p.descriptionEn,
  status: p.status,
  tags: p.tags,
  image: p.image,
})

export default function ProjectCard({ title, description, status, tags, image, lang = 'fr' }: ProjectCardData & { lang?: Lang }) {
  return (
    <article className="overflow-hidden rounded-lg border border-violet-100 bg-white m-4 md:w-sm">
      {image ? <img src={image} alt="" className="h-40 w-full object-cover" /> : <div className="h-40 bg-violet-200" />}
      <div className="p-4 flex flex-col justify-between">
        <div className="space-y-3">
          <span className={`inline-block rounded px-2 py-0.5 text-xs ${status === 'done' ? 'bg-violet-700 text-white' : 'bg-violet-100 text-violet-700'}`}>
            {statusLabel[lang][status]}
          </span>
          <h3 className="text-lg font-semibold leading-snug text-indigo-950">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="mt-3">
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((t) => <li key={t} className="rounded border border-violet-100 px-2 py-0.5 text-xs text-violet-700">{t}</li>)}
          </ul>
        </div>
      </div>
    </article>
  )
}
