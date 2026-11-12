import { mkdir, rename, rm, stat, writeFile } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { env } from '../env.ts'

/*
 Files live on disk in UPLOAD_DIR
*/

const root = resolve(env.UPLOAD_DIR)
export const imagesDir = join(root, 'images')
export const IMAGES_URL = '/uploads/images/'

export const cvLangs = ['fr', 'en'] as const
export type CvLang = (typeof cvLangs)[number]
export const isCvLang = (v: string): v is CvLang => (cvLangs as readonly string[]).includes(v)

const cvPath = (lang: CvLang) => join(root, `cv-${lang}.pdf`)
export const cvDownloadName: Record<CvLang, string> = { fr: 'CV_Victor_Vidalot.pdf', en: 'CV_Victor_Vidalot_EN.pdf' }

/**
 * The Content-Type header is client-declared: trust the file's first bytes instead.
 * 
 * @param buf File data 
 * @param bytes Bytes to compare
 * @param offset Offset to apply on the bytes
 */
const startsWith = (buf: Buffer, bytes: number[], offset = 0) => bytes.every((b, i) => buf[offset + i] === b)

/**
 * Convert a string to bytes (by Unicode)
 * 
 * @param s String to convert
 * @returns 
 */
const ascii = (s: string) => [...s].map((c) => c.charCodeAt(0))

/**
 * Check if the file is a pdf
 * Check that with the data inside the file, not the extension 
 * 
 * @param buf File data 
 * @returns True if this is a pdf, otherwise false
 */
export const isPdf = (buf: Buffer) => startsWith(buf, ascii('%PDF-'))

/**
 * Check extension from the content, the client's file name is not trusted. 
 * !! => No SVG: it can carry scripts.
 */
export function imageExtensionAccepted(buf: Buffer): 'png' | 'jpg' | 'webp' | null {
  if (startsWith(buf, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'png'
  if (startsWith(buf, [0xff, 0xd8, 0xff])) return 'jpg'
  if (startsWith(buf, ascii('RIFF')) && startsWith(buf, ascii('WEBP'), 8)) return 'webp'
  return null
}

/**
 * Write to a temp file then rename: a reader never gets a half-written file.
 * 
 * @param path Where the file will be writed 
 * @param data Data of the file to be writed
 */
async function safeWriteFile(path: string, data: Buffer) {
  await mkdir(join(path, '..'), { recursive: true })
  await writeFile(`${path}.tmp`, data)
  await rename(`${path}.tmp`, path)
}

export const fileService = {
  cvPath,

  /** 
   * Locally save a file, this method is specifically for cv.pdf 
   * 
   * @param lang 
   * @param pdf 
   */
  saveCv: (lang: CvLang, pdf: Buffer) => safeWriteFile(cvPath(lang), pdf),

  /**
   *  Upload date = file modification time; null when no CV was uploaded yet.
   * 
   * @param lang The lang of the cv to upload
   * @returns Null or cv infos (json)
   */
  async cvInfo(lang: CvLang) {
    const s = await stat(cvPath(lang)).catch(() => null)
    return s && { name: cvDownloadName[lang], uploadedAt: s.mtimeMs, url: `/cv/${lang}` }
  },

  /**
   * Unique name per upload: the URL can be cached forever, a new image gets a new URL.
   * 
   * @param prefix Name of the file
   * @param img The image's data 
   * @param ext Image extension
   * @returns File url
   */
  async saveImage(prefix: string, img: Buffer, ext: string) {
    const name = `${prefix}-${Date.now()}.${ext}`
    await safeWriteFile(join(imagesDir, name), img)
    return IMAGES_URL + name
  },

  /**
   * Check basename: avoid that a stored path like /uploads/images/../../dev.db escape the folder.
   * 
   * @param url Url of the file to remove
   */
  async removeImage(url: string | null) {
    if (!url?.startsWith(IMAGES_URL)) return
    const name = url.slice(IMAGES_URL.length)
    if (name === basename(name)) await rm(join(imagesDir, name), { force: true })
  },
}
