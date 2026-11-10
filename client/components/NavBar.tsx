type Link = { label: string; href: string }

const defaultLinks: Link[] = [
  { label: 'Parcours', href: '#parcours' },
  { label: 'Projets', href: '#projets' },
  { label: 'Compétences', href: '#competences' },
]

export default function NavBar({ name = 'Victor Vidalot', links = defaultLinks }: { name?: string; links?: Link[], side?: boolean }) {
  return (
    <nav className="sticky top-0 right-0 left-0 bg-bold text-white z-20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-sm">
        <a href="/" className="font-semibold">{name}</a>
        <ul className="flex gap-5">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="text-indigo-100 hover:text-white">{l.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
