import { trpcRouter } from './trpc.ts'
import { authEndpoint } from './authEndpoint.ts'
import { projectEndpoint } from './projectEndpoint.ts'

// tRPC API served on /trpc. Add a feature = add its router here.
export const appRouter = trpcRouter({
  auth: authEndpoint,
  project: projectEndpoint,
})

// Single source of truth: client/api.ts infers every type from this.
export type AppRouter = typeof appRouter
