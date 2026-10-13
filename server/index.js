import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { config, describeEmailConfig } from './config.js'
import { initStore, getDriver, insertInquiry } from './db.js'
import { validateInquiry } from './validation.js'
import { sendInquiryEmails, verifyTransport } from './mailer.js'
import { rateLimit } from './rateLimit.js'

const app = express()
app.set('trust proxy', 1)
app.disable('x-powered-by')

/* --- CORS (permissive in development, allow-list in production) -- */
app.use((req, res, next) => {
  const origin = req.headers.origin
  const allowed =
    config.env !== 'production' ||
    !config.corsOrigin ||
    config.corsOrigin
      .split(',')
      .map((value) => value.trim())
      .includes(origin)

  if (origin && allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  return next()
})

app.use(express.json({ limit: '96kb' }))

/* --- Idempotency guard ------------------------------------------ */
const recentSubmissions = new Map()
const IDEMPOTENCY_TTL_MS = 10 * 60 * 1000

function recordSubmission(submissionId, reference) {
  const now = Date.now()
  recentSubmissions.set(submissionId, { reference, at: now })
  for (const [key, value] of recentSubmissions) {
    if (now - value.at > IDEMPOTENCY_TTL_MS) recentSubmissions.delete(key)
  }
}

/* --- Health ----------------------------------------------------- */
app.get('/api/health', async (req, res) => {
  const email = await verifyTransport()
  res.json({
    ok: true,
    service: 'manara-inquiries',
    env: config.env,
    store: getDriver(),
    email: { ...describeEmailConfig(), verified: email.ok, reason: email.ok ? null : email.reason },
  })
})

/* --- Submit a project brief ------------------------------------- */
app.post('/api/inquiries', async (req, res) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  const limit = rateLimit(ip, config.rateLimit)
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfter))
    return res.status(429).json({
      ok: false,
      error: 'rate_limited',
      message: 'Too many submissions from this address. Please try again later.',
      retryAfter: limit.retryAfter,
    })
  }

  const submissionId = String(req.body?.submissionId || '').slice(0, 80)
  const existing = submissionId ? recentSubmissions.get(submissionId) : null
  if (existing) {
    return res.status(200).json({ ok: true, reference: existing.reference, duplicate: true })
  }

  const validation = validateInquiry(req.body)
  if (!validation.ok) {
    if (validation.spam) {
      // Behave like a success so bots do not learn what tripped them.
      return res.status(201).json({ ok: true, reference: null, discarded: true })
    }
    return res.status(400).json({
      ok: false,
      error: 'validation_error',
      message: 'Please correct the highlighted fields.',
      fields: validation.errors,
    })
  }

  const reference = generateReference()
  const record = { ...validation.value, reference, createdAt: validation.value.meta.submittedAt }

  let persisted = false
  try {
    insertInquiry(record)
    persisted = true
  } catch (error) {
    console.error('[inquiries] failed to persist', error)
  }

  const email = await sendInquiryEmails(record)
  if (submissionId) recordSubmission(submissionId, reference)

  return res.status(201).json({
    ok: true,
    reference,
    persisted,
    store: getDriver(),
    email,
  })
})

function generateReference() {
  return `MQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomSuffix()}`
}

function randomSuffix() {
  const alphabet = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  return Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
}

/* --- API 404 ----------------------------------------------------- */
app.use('/api', (req, res) => {
  res.status(404).json({ ok: false, error: 'not_found', message: 'Unknown API endpoint.' })
})

/* --- Static build (production) ---------------------------------- */
if (fs.existsSync(config.distDir)) {
  app.use(express.static(config.distDir, { index: false }))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
    return res.sendFile(path.join(config.distDir, 'index.html'))
  })
}

/* --- Error handler ---------------------------------------------- */
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error('[server] unhandled error', error)
  if (res.headersSent) return
  res.status(500).json({ ok: false, error: 'server_error', message: 'Something went wrong.' })
})

async function start() {
  const driver = await initStore()
  app.listen(config.port, () => {
    const email = describeEmailConfig()
    console.log(`\n  Manara inquiries API`)
    console.log(`  → http://localhost:${config.port}`)
    console.log(`  → store:  ${driver}`)
    console.log(
      `  → email:  ${email.configured ? `configured (${email.host})` : 'not configured — inquiries will still be saved'}\n`,
    )
  })
}

start()
