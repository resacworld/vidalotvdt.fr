import type { RequestHandler } from "express"
import { renderPage } from "../render.ts"

/**
 * 404 page handler 
 * 
 * @param req Express request 
 * @param res Express response
 * @param next Express next function
 */
export const Page404Handler: RequestHandler = async (req, res, next) => {
  await renderPage(req, res, next, { page: '404' }, 404)
}