/* oxlint-disable react/no-array-index-key -- cells are positional: their index IS their identity. ponytail: pass row ids if rows get reordered/edited in place */
import type { ReactNode } from 'react'

// columns = header titles, rows = one array of cells per line (same order as columns).
export default function Table({ columns, rows }: { columns: string[]; rows: ReactNode[][] }) {
  const bad = rows.findIndex((r) => r.length !== columns.length)
  if (bad !== -1) throw new Error(`Table: row ${bad} has ${rows[bad].length} cells, expected ${columns.length} (columns).`)

  return (
    <div className="overflow-x-auto rounded-xl border border-light font-grotesk">
      <table className="w-full text-left text-sm">
        <thead className="bg-light">
          <tr>
            {columns.map((c, i) => <th key={i} className="px-5 py-2 font-semibold text-bold">{c}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-light bg-extralight">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j} className="px-5 py-4 text-extrabold">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
