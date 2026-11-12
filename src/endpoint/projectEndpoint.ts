import { projectInput, projectUpdateInput } from '../types/project.ts'
import { projectService } from '../services/projectService.ts'
import { adminProcedure, publicProcedure, trpcRouter } from './trpc.ts'

// Project endpoint: public read (same data as the home page), admin write.
export const projectEndpoint = trpcRouter({
  list: publicProcedure.query(() => projectService.list()),
  create: adminProcedure.input(projectInput).mutation(({ input }) => projectService.create(input)),
  update: adminProcedure.input(projectUpdateInput).mutation(({ input }) => projectService.update(input)),
})
