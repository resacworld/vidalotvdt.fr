import express, { Router, type RequestHandler } from 'express'
import { HttpError } from '../middlewares/errorHandler.ts'
import { authService } from '../services/authService.ts'
import { cvDownloadName, fileService, imageExtensionAccepted, imagesDir, isCvLang, isPdf } from '../services/fileService.ts'
import { projectService } from '../services/projectService.ts'

/*
 Plain Express, not tRPC: tRPC only carries JSON. 
 - The request body IS the file
 - So no multipart parsing and no multer. 
 - CSRF: a PUT with a non-form Content-Type needs a CORS preflight a foreign site can't pass, and the session cookie is SameSite=Strict anyway.
*/
export const fileEndpoint = Router()

const MAX_SIZE = '10mb'

const adminOnly: RequestHandler = (req, _res, next) => next(authService.isAdmin(req) ? undefined : new HttpError(401, 'Unauthorized'))

// req.body is a Buffer only when the Content-Type matched; anything else leaves {} -> 415.
const raw = (type: string | string[]) => [
  express.raw({ type, limit: MAX_SIZE }),
  ((req, _res, next) => next(Buffer.isBuffer(req.body) && req.body.length ? undefined : new HttpError(415, 'Unsupported file'))) as RequestHandler,
]

// --- CV: one per language, public download with a readable file name.
fileEndpoint.get('/cv/:lang', (req, res, next) => {
  const { lang } = req.params
  if (!isCvLang(lang)) return next() // -> 404 page

  // no-cache: revalidate (ETag) so a replaced CV shows up immediately.
  res.download(fileService.cvPath(lang), cvDownloadName[lang], { headers: { 'Cache-Control': 'no-cache' } }, (err) => {
    if (err && !res.headersSent) next() // no CV uploaded yet -> 404 page
  })
})

fileEndpoint.put('/api/cv/:lang', adminOnly, ...raw('application/pdf'), async (req, res) => {
  const lang = String(req.params.lang) // the spread middlewares widen the param type
  if (!isCvLang(lang)) throw new HttpError(404, 'Unknown language')
  if (!isPdf(req.body)) throw new HttpError(415, 'Not a PDF')
  await fileService.saveCv(lang, req.body)
  res.json(await fileService.cvInfo(lang))
})

// --- Project image: stored under a unique name, the project's image path is updated, the old file removed.
fileEndpoint.put('/api/projects/:id/image', adminOnly, ...raw(['image/png', 'image/jpeg', 'image/webp']), async (req, res) => {
  const id = Number(req.params.id)
  const fileExtension = imageExtensionAccepted(req.body)
  if (!fileExtension) throw new HttpError(415, 'Not a PNG, JPG or WebP image')
  const project = Number.isInteger(id) ? await projectService.get(id) : null
  if (!project) throw new HttpError(404, 'Unknown project')

  const url = await fileService.saveImage(`project-${id}`, req.body, fileExtension)
  const updated = await projectService.update({ ...project, image: url })
  await fileService.removeImage(project.image)
  res.json(updated)
})

// Unique names -> safe to cache for a year.
fileEndpoint.use('/uploads/images', express.static(imagesDir, { index: false, immutable: true, maxAge: '1y' }))
