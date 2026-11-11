import type { ErrorRequestHandler } from 'express'

/**
 * Class to define an internal httpError
 */
export class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

/**
 * Handle any error returned by any route of the server 
 * I hope it will never be exectued in prod (pleaaase !!)
 * 
 * @param err Standard error "catched" by express (the purpose of this handler is to manage it) 
 * @param _req Express request
 * @param res Express response
 * @param _next Express next method
 * @returns 
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) return res.status(err.status).json({ error: err.message })
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}
