import { trpcRouter } from './trpc.ts'
import { todoEndpoint } from './todoEndpoint.ts'
import { authEndpoint } from './authEndpoint.ts'

// tRPC API served on /trpc. Add a feature = add its router here.
export const appRouter = trpcRouter({
  auth: authEndpoint,
  todo: todoEndpoint,
})

// Single source of truth: client/api.ts infers every type from this.
export type AppRouter = typeof appRouter
