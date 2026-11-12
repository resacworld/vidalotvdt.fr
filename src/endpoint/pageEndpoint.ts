import { Router } from 'express'
import { renderPage } from '../render.ts'
import { authService } from '../services/authService.ts'
import { projectService } from '../services/projectService.ts'

// HTML pages. SSR = data fetched + rendered on the server. SPA = empty shell, the browser does everything.
export const pageEndpoint = Router()

// SSR calls the service directly, no HTTP round-trip.
pageEndpoint.get('/', async (req, res, next) => {
  await renderPage(req, res, next, { page: 'ssr', projects: await projectService.list() })
})

// Catch-all so client-side sub-routes (/admin/whatever) survive a refresh.
// Redirect before sending the shell: no flash of the wrong page. UX only, the API checks the session itself.
pageEndpoint.get('/admin{/*splat}', async (req, res, next) => {
  const onLogin = req.path === '/admin/login'
  const isAdmin = authService.isAdmin(req)
  if (!isAdmin && !onLogin) return res.redirect('/admin/login')
  if (isAdmin && onLogin) return res.redirect('/admin')
  await renderPage(req, res, next)
})
