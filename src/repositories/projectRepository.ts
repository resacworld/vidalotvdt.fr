import type { Project as ProjectRow } from '../generated/prisma/client.ts'
import type { Project, ProjectInput, ProjectStatus } from '../types/project.ts'
import { db } from './db.ts'

// SQLite has no arrays: tags live as "C#,KRL" in the DB, string[] everywhere else.
const toProject = ({ tags, status, ...row }: ProjectRow): Project => ({
  ...row,
  status: status as ProjectStatus, // only written through zod-validated input
  tags: tags ? tags.split(',') : [],
})
const toRow = (p: ProjectInput) => ({ ...p, tags: p.tags.join(',') })

export const projectRepository = {
  findById: async (id: number) => {
    const row = await db.project.findUnique({ where: { id } })
    return row && toProject(row)
  },
  findAll: async () => (await db.project.findMany({ orderBy: { id: 'asc' } })).map(toProject),
  create: async (p: ProjectInput) => toProject(await db.project.create({ data: toRow(p) })),
  update: async (id: number, p: ProjectInput) => toProject(await db.project.update({ where: { id }, data: toRow(p) })),
}
