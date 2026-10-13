import fs from 'node:fs'
import path from 'node:path'
import { config } from './config.js'

/* ==================================================================
   Server-side validation

   Never trusts the client. Reads the allowed option ids from
   shared/briefOptions.json so client and server cannot drift apart.
   ================================================================== */

const optionsPath = path.join(config.rootDir, 'shared', 'briefOptions.json')
const options = JSON.parse(fs.readFileSync(optionsPath, 'utf8'))

const idsOf = (list) => new Set((list || []).map((item) => item.id))

const SERVICE_IDS = idsOf(options.services)
const BUDGET_IDS = idsOf(options.budgets)
const TIMELINE_IDS = idsOf(options.timelines)
const URGENCY_IDS = idsOf(options.urgency)
const COMMUNICATION_IDS = idsOf(options.communication)

const MIN_ELAPSED_MS = 2000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+()\d][\d\s()+-]{5,19}$/

const singleLine = (value, max) => {
  if (typeof value !== 'string') return ''
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

const multiLine = (value, max) => {
  if (typeof value !== 'string') return ''
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

const normalizeUrl = (value) => {
  const raw = singleLine(value, 300)
  if (!raw) return ''
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  try {
    const url = new URL(withProtocol)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return ''
    return url.toString()
  } catch {
    return null
  }
}

export function validateInquiry(raw) {
  const errors = {}
  const body = raw && typeof raw === 'object' ? raw : {}

  /* --- Spam traps (treated as success by the caller) -------------- */
  const honeypot = typeof body.honeypot === 'string' ? body.honeypot.trim() : ''
  const elapsedMs = Number(body.elapsedMs)
  const looksAutomated = Boolean(honeypot) || (Number.isFinite(elapsedMs) && elapsedMs < MIN_ELAPSED_MS)

  /* --- Services -------------------------------------------------- */
  const rawServices = Array.isArray(body.services)
    ? body.services
    : typeof body.services === 'string'
      ? [body.services]
      : []
  const services = [...new Set(rawServices.map((s) => singleLine(s, 60)).filter(Boolean))]
  if (services.length === 0) {
    errors.services = 'Select at least one service.'
  } else if (services.some((id) => !SERVICE_IDS.has(id))) {
    errors.services = 'One or more selected services are not recognised.'
  }

  /* --- Project information --------------------------------------- */
  const projectName = singleLine(body.projectName, 140)
  if (projectName.length < 2) errors.projectName = 'Enter a project name.'

  const company = singleLine(body.company, 140)

  const description = multiLine(body.description, 4000)
  if (description.length < 20) {
    errors.description = 'Please describe the project in at least 20 characters.'
  }

  const existingWebsite = normalizeUrl(body.existingWebsite)
  if (existingWebsite === null) errors.existingWebsite = 'Enter a valid website address.'

  const features = multiLine(body.features, 1500)

  const launchDate = singleLine(body.launchDate, 32)
  if (launchDate && Number.isNaN(Date.parse(launchDate))) {
    errors.launchDate = 'Enter a valid date.'
  }

  /* --- Budget & timeline ----------------------------------------- */
  const budget = singleLine(body.budget, 40)
  if (!BUDGET_IDS.has(budget)) errors.budget = 'Choose an estimated budget.'
  const timeline = singleLine(body.timeline, 40)
  if (!TIMELINE_IDS.has(timeline)) errors.timeline = 'Choose a desired timeline.'
  const urgency = singleLine(body.urgency, 40)
  if (!URGENCY_IDS.has(urgency)) errors.urgency = 'Choose a project urgency.'

  /* --- Contact --------------------------------------------------- */
  const fullName = singleLine(body.fullName, 140)
  if (fullName.length < 2) errors.fullName = 'Enter your full name.'

  const email = singleLine(body.email, 200).toLowerCase()
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'

  const phone = singleLine(body.phone, 24)
  if (!PHONE_RE.test(phone)) errors.phone = 'Enter a valid phone number.'

  const companyContact = singleLine(body.companyContact, 140)

  const communication = singleLine(body.communication, 40)
  if (!COMMUNICATION_IDS.has(communication)) {
    errors.communication = 'Choose a preferred communication method.'
  }

  if (looksAutomated) {
    return { ok: false, spam: true, errors: {} }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      services,
      projectName,
      company,
      description,
      existingWebsite: existingWebsite || '',
      features,
      launchDate,
      budget,
      timeline,
      urgency,
      fullName,
      email,
      phone,
      companyContact,
      communication,
      meta: {
        submittedAt: new Date().toISOString(),
        userAgent: singleLine(body.userAgent, 300),
      },
    },
  }
}

export function getOptionLabels() {
  const toMap = (list) => Object.fromEntries((list || []).map((item) => [item.id, item.label]))
  return {
    services: toMap(options.services),
    budgets: toMap(options.budgets),
    timelines: toMap(options.timelines),
    urgency: toMap(options.urgency),
    communication: toMap(options.communication),
  }
}
