import { randomBytes } from 'node:crypto'
import type { RequestHandler, Response } from 'express'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { isProd } from '../env.ts'

// Fresh random nonce per request: only <script> tags carrying it may run (see render.ts).
export const nonce: RequestHandler = (_req, res, next) => {
  res.locals.nonce = randomBytes(16).toString('base64')
  next()
}

// Security headers (CSP, HSTS, nosniff, frame-ancestors, no X-Powered-By...).
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", (_req, res) => `'nonce-${(res as Response).locals.nonce}'`],
      // Dev only: Vite's HMR websocket runs on its own port; plain http on localhost, no https upgrade.
      connectSrc: isProd ? ["'self'"] : ["'self'", 'ws://localhost:*'],
      imgSrc: ["'self'", 'data:', 'blob:'],
      upgradeInsecureRequests: isProd ? [] : null,
    },
  },
  strictTransportSecurity: isProd,
})

/**
 * Check if the request is a login attempt
 * 
 * Decode before checking "auth.login" in path for sercurity purpose, ex: 
 * - POST /trpc/auth.login
 * - POST /trpc/auth%2Elogin
 * => "decodeURIComponent" convert escaped characters "auth%Elogin" become "auth.login" (%E is the code of .)
 *  
 *  
 * @param path Path
 * @returns True if the request is a login attempt, otherwise false
 */
const isLogin = (path: string) => {
  try { return decodeURIComponent(path).includes('auth.login') } catch { return true }
}

// Login rate limit (disabled for non-login requests)
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60_000,
  limit: 10,
  skip: (req) => !isLogin(req.path),
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})

// Ultimate express rate limit (applied on all deployed routes) 
export const apiRateLimit = rateLimit({
  windowMs: 60_000,
  limit: isProd ? 100 : 99999,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})
