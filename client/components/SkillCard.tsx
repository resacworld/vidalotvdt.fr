export default function SkillCard({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="rounded-lg border border-violet-100 bg-white p-4 m-4 w-sm">
      <h3 className="mb-2 text-sm font-semibold text-violet-700">{title}</h3>
      <ul className="space-y-1 text-sm text-gray-700">
        {skills.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </div>
  )
}
