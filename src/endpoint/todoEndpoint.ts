import { todoCreateInput } from '../types/todo.ts'
import { todoService } from '../services/todoService.ts'
import { adminProcedure, publicProcedure, trpcRouter } from './trpc.ts'

// Todo endpoint
export const todoEndpoint = trpcRouter({
  list: publicProcedure.query(() => todoService.list()),
  add: adminProcedure.input(todoCreateInput).mutation(({ input }) => todoService.add(input)),
})
