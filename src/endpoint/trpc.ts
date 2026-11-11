import { initTRPC, TRPCError } from '@trpc/server'
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { authService } from '../services/authService.ts'

// req/res reachable in procedures (read / set the session cookie).
export const createContext = ({ req, res }: CreateExpressContextOptions) => ({ req, res })

// Own file so routers can import it without a cycle through appRouter.
const t = initTRPC.context<typeof createContext>().create()

// Trpc router and procedure, used in enpoints
export const trpcRouter = t.router
export const publicProcedure = t.procedure

// Requires a valid admin session cookie.
export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!authService.isAdmin(ctx.req)) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next()
})
