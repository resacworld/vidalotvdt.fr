import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { authService } from '../services/authService.ts'
import { publicProcedure, trpcRouter } from './trpc.ts'

// Auth endpoint (login is rate limited in server.ts)
export const authEndpoint = trpcRouter({
  login: publicProcedure.input(z.object({ password: z.string().max(200) })).mutation(({ input, ctx }) => {
    if (!authService.checkPassword(input.password)) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Mot de passe incorrect' })
    authService.login(ctx.res)
  }),
  logout: publicProcedure.mutation(({ ctx }) => authService.logout(ctx.res)),
})
