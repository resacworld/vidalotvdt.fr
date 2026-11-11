import { z } from 'zod'

// Status is a code, not a French label: each language translates it on display.
export const projectStatuses = ['ongoing', 'done'] as const
export type ProjectStatus = (typeof projectStatuses)[number]

// DTO: what the API accepts to create / update a project (validated by tRPC before reaching the service).
export const projectInput = z.object({
  titleFr: z.string().trim().min(1).max(200),
  titleEn: z.string().trim().min(1).max(200),
  descriptionFr: z.string().trim().max(2000),
  descriptionEn: z.string().trim().max(2000),
  status: z.enum(projectStatuses),
  // Stored comma-separated: a comma inside a tag would split it.
  tags: z.array(z.string().trim().min(1).max(50).regex(/^[^,]+$/)).max(20),
  // Local path only (public/): no external URL, no blob:, no javascript:.
  image: z.string().regex(/^\/[\w./-]+$/).nullable(),
})
export type ProjectInput = z.infer<typeof projectInput>

export const projectUpdateInput = projectInput.extend({ id: z.number().int().positive() })

// What the app reads (tags split, status typed). Client files must `import type` only (keeps zod out of the bundle).
export type Project = ProjectInput & { id: number }
