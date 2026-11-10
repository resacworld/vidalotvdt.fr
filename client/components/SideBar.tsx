type Link = { label: string; href: string }

const defaultLinks: Link[] = [
  { label: 'Projets', href: '/admin' },
  { label: 'Voir le site', href: '/' },
]

// Vertical on md+ (sticky, full height), horizontal bar on mobile. Parent must be `md:flex`.
export default function SideBar({ title = 'Administration', links = defaultLinks }: { title?: string; links?: Link[] }) {
  return (
    <nav className="sticky top-0 z-20 bg-extrabold font-grotesk text-white md:h-screen md:w-56 md:shrink-0">
      <div className="flex items-center justify-between px-6 py-4 text-sm md:flex-col md:items-start md:gap-8 md:py-8">
        <a href="/admin" className="font-semibold">{title}</a>
        <ul className="flex gap-5 md:flex-col md:gap-3">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="text-light hover:text-white">{l.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
