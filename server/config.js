import 'dotenv/config'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const toBool = (value, fallback = false) =>
  value == null ? fallback : /^(1|true|yes|on)$/i.test(String(value).trim())

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toString = (value) => (value == null ? '' : String(value).trim())

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: toInt(process.env.PORT, 3001),
  rootDir,
  distDir: path.join(rootDir, 'dist'),
  dataDir: process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : process.env.VERCEL
      ? path.join(os.tmpdir(), 'manara-data')
      : path.join(rootDir, 'data'),
  corsOrigin: toString(process.env.CORS_ORIGIN),

  rateLimit: {
    windowMs: toInt(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: toInt(process.env.RATE_LIMIT_MAX, 5),
  },

  mailFrom: toString(process.env.MAIL_FROM),
  companyEmail: toString(process.env.COMPANY_EMAIL),

  smtp: {
    host: toString(process.env.SMTP_HOST),
    port: toInt(process.env.SMTP_PORT, 587),
    secure: toBool(process.env.SMTP_SECURE, false),
    user: toString(process.env.SMTP_USER),
    pass: toString(process.env.SMTP_PASS),
  },
}

/** Email is only considered enabled when the minimum settings exist. */
export const emailEnabled = Boolean(
  config.smtp.host && config.mailFrom && config.companyEmail,
)

export function describeEmailConfig() {
  return {
    enabled: emailEnabled,
    host: config.smtp.host || null,
    from: config.mailFrom || null,
    companyEmail: config.companyEmail || null,
  }
}
