import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto'
import type { CookieOptions, Request, Response } from 'express'
import { env, isProd } from '../env.ts'

const COOKIE = 'admin_session'
const MAX_AGE = 7 * 24 * 3600 * 1000
const cookieOptions: CookieOptions = { httpOnly: true, secure: isProd, sameSite: 'strict', path: '/' }

// Sign/create a cookie with static cookie session secret (from .env)
const sign = (exp: string) => createHmac('sha256', env.SESSION_SECRET).update(exp).digest('hex')

/**
 * Method to compare two string 
 * => used to compare hashed clear password (the one from client) and the hashed password (from the .env)
 * 
 * @param a 
 * @param b 
 * @returns 
 */
const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export const authService = {
  // ADMIN_PASSWORD_HASH = "<salt hex>:<scrypt hex>" (see .env.example to generate it).

  /**
   * Compare clear password with hashed password (stored in .env file => because only one admin)
   * 
   * @param password Password to compare / check
   * @returns True if both passwrods are identical, otherwise false
   */
  checkPassword(password: string) {
    const [salt, hash] = env.ADMIN_PASSWORD_HASH.split(':')
    return safeEqual(scryptSync(password, salt, 64).toString('hex'), hash)
  },

  /**
   * Create cookie in client response (wwith client)
   * 
   * @param res Express response
   */
  login(res: Response) {
    const exp = String(Date.now() + MAX_AGE)
    res.cookie(COOKIE, `${exp}.${sign(exp)}`, { ...cookieOptions, maxAge: MAX_AGE })
  },

  /**
   * Remove cookie from client
   * 
   * @param res Express response
   */
  logout(res: Response) {
    res.clearCookie(COOKIE, cookieOptions)
  },

  /**
   * Check if cookie is valid (check authentication)
   * 
   * @param req Express request
   * @returns True if authenticated (cookie is valid), otherwise false (no cookie, cookie expired, etc...)
   */
  isAdmin(req: Request) {
    const token = req.headers.cookie?.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`))?.[1]
    const [exp, sig] = token?.split('.') ?? []
    return !!exp && !!sig && Number(exp) > Date.now() && safeEqual(sig, sign(exp))
  },
}
