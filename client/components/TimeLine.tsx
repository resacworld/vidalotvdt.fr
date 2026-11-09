export type Step = {
  date: string
  school: string
  schoolDetail: string
  role: string
  company: string
  companyDetail?: string
  current?: boolean
}

// One row per step: date | dot on vertical line | Formation | Entreprise.
export default function TimeLine({ steps }: { steps: Step[] }) {
  return (
    <div className="mx-4 overflow-x-auto">
      <div className="grid min-w-2xl grid-cols-[8rem_1.5rem_1fr_1fr] gap-x-6 text-sm">
        <div />
        <div />
        <p className="pb-6 text-violet-700">Formation</p>
        <p className="pb-6 text-violet-700">Entreprise</p>

        {steps.map((s, index) => (
          <div key={s.date} className="contents">
            <p className={`pt-1 font-medium ${s.current ? 'text-violet-700' : 'text-indigo-950'}`}>{s.date}</p>
            <div className="relative flex justify-center">
              {steps.length !== index + 1 ? <span className="absolute inset-y-0 w-px bg-violet-100" /> : null}
              <span className={`relative mt-1.5 size-3.5 rounded-full ${s.current ? 'bg-violet-700' : 'bg-violet-200'}`} />
            </div>
            <div className="space-y-2 pb-10">
              <p className="text-xl font-semibold text-indigo-950">{s.school}</p>
              <p className="text-gray-700">{s.schoolDetail}</p>
            </div>
            <div className="space-y-2 pb-10">
              <p className="pt-1 font-semibold text-indigo-950">{s.role}</p>
              <p className="text-violet-700">{s.company}</p>
              {s.companyDetail && <p className="text-gray-700">{s.companyDetail}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
