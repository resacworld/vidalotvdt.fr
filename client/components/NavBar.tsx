type Link = { label: string; href: string }

const defaultLinks: Link[] = [
  { label: 'Projets', href: '#projets' },
  { label: 'Parcours', href: '#parcours' },
  { label: 'Compétences', href: '#competences' },
]

export default function Navbar({ name = 'Victor Vidalot', links = defaultLinks }: { name?: string; links?: Link[] }) {
  return (
    <nav className="bg-bold text-white">
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
