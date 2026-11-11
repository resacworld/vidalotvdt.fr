export type Step = {
  date: string
  school: string
  schoolDetail: string
  role: string
  company: string
  companyDetail?: string
  current?: boolean
}

/*
  md+    : one row per step: date | dot on vertical line | Formation | Entreprise.
  mobile : 2 columns: dot + line on the left (spans the step's 3 rows) | date, school, company stacked.
  grid-flow-dense lets each dot go back up to its step's first row instead of being pushed below the date.
*/
export default function TimeLine({ steps }: { steps: Step[] }) {
  return (
    <div className="mx-6 md:mx-4 overflow-x-auto">
      <div className="grid grid-cols-[1.5rem_1fr] gap-x-4 text-sm max-md:grid-flow-dense md:min-w-2xl md:grid-cols-[8rem_1.5rem_12rem_12rem] md:gap-x-6 md:justify-center">
        <div className="hidden md:block" />
        <div className="hidden md:block" />
        <p className="hidden pb-6 text-violet-700 md:block">Formation</p>
        <p className="hidden pb-6 text-violet-700 md:block">Entreprise</p>

        {steps.map((s) => (
          <div key={s.date} className="contents">
            <p className={`col-start-2 pt-1 font-medium md:col-start-auto ${s.current ? 'text-violet-700' : 'text-indigo-950'}`}>{s.date}</p>
            <div className="relative col-start-1 row-span-3 flex justify-center md:col-start-auto md:row-span-1">
              <span className="absolute inset-y-0 w-px bg-violet-100" />
              <span className={`relative mt-1.5 size-3.5 rounded-full ${s.current ? 'bg-violet-700' : 'bg-violet-200'}`} />
            </div>
            <div className="col-start-2 space-y-2 pt-2 pb-4 md:col-start-auto md:pt-0 md:pb-10">
              <p className="text-xl font-semibold text-indigo-950">{s.school}</p>
              <p className="text-gray-700">{s.schoolDetail}</p>
            </div>
            <div className="col-start-2 space-y-2 pb-10 md:col-start-auto">
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
