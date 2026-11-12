import { createTRPCClient, httpLink, type TRPCLink } from '@trpc/client'
import { observable } from '@trpc/server/observable'
// `import type` only: no server code ends up in the client bundle.
import type { AppRouter } from '../src/endpoint/appRouter.ts'

// Session expired mid-use: any UNAUTHORIZED (except a wrong password) sends back to the login page.
const authLink: TRPCLink<AppRouter> = () => ({ op, next }) => observable((observer) =>
  next(op).subscribe({
    next: (value) => observer.next(value),
    error: (err) => {
      if (err.data?.code === 'UNAUTHORIZED' && op.path !== 'auth.login') navigation.navigate('/admin/login')
      observer.error(err)
    },
    complete: () => observer.complete(),
  }),
)

// Trpc api. httpLink, not httpBatchLink: batching is disabled server-side (see server.ts).
export const api = createTRPCClient<AppRouter>({ links: [authLink, httpLink({ url: '/trpc' })] })

/**
 * File upload (raw PUT, the body is the file itself). Same 401 handling as authLink.
 *
 * @param url Upload route, e.g. /api/cv/fr
 * @param file File picked by the user
 * @returns The JSON sent back by the server
 */
export async function upload<T>(url: string, file: File): Promise<T> {
  const res = await fetch(url, { method: 'PUT', body: file, headers: { 'content-type': file.type } })
  if (res.status === 401) navigation.navigate('/admin/login')
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? res.statusText)
  return res.json()
}
