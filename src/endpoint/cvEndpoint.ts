import { fileService } from '../services/fileService.ts'
import { adminProcedure, trpcRouter } from './trpc.ts'

// CV metadata for the admin (the upload itself is a raw PUT, see fileEndpoint.ts).
export const cvEndpoint = trpcRouter({
  info: adminProcedure.query(async () => ({ fr: await fileService.cvInfo('fr'), en: await fileService.cvInfo('en') })),
})
