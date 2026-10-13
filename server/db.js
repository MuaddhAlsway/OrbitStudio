import fs from 'node:fs'
import path from 'node:path'
import { config } from './config.js'

/* ==================================================================
   Persistence

   Prefers the built-in SQLite module (node:sqlite, Node 22.5+). If it
   is unavailable, falls back to an append-only JSON-lines file so the
   API still works. Both stores live under config.dataDir.
   ================================================================== */

let driver = 'json'
let sqlite = null
let jsonFile = ''

function ensureDataDir() {
  fs.mkdirSync(config.dataDir, { recursive: true })
}

export async function initStore() {
  ensureDataDir()
  jsonFile = path.join(config.dataDir, 'inquiries.json')

  try {
    const { DatabaseSync } = await import('node:sqlite')
    const db = new DatabaseSync(path.join(config.dataDir, 'inquiries.sqlite'))
    db.exec(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reference TEXT UNIQUE NOT NULL,
        created_at TEXT NOT NULL,
        full_name TEXT,
        email TEXT,
        company TEXT,
        phone TEXT,
        project_name TEXT,
        services TEXT,
        budget TEXT,
        timeline TEXT,
        urgency TEXT,
        communication TEXT,
        description TEXT,
        payload TEXT NOT NULL
      )
    `)
    sqlite = db
    driver = 'sqlite'
  } catch {
    if (!fs.existsSync(jsonFile)) fs.writeFileSync(jsonFile, '', 'utf8')
    driver = 'json'
  }

  return driver
}

export function getDriver() {
  return driver
}

export function insertInquiry(record) {
  if (driver === 'sqlite' && sqlite) {
    const statement = sqlite.prepare(`
      INSERT INTO inquiries (
        reference, created_at, full_name, email, company, phone,
        project_name, services, budget, timeline, urgency, communication,
        description, payload
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const info = statement.run(
      record.reference,
      record.createdAt,
      record.fullName,
      record.email,
      record.company || '',
      record.phone,
      record.projectName,
      JSON.stringify(record.services || []),
      record.budget || '',
      record.timeline || '',
      record.urgency || '',
      record.communication || '',
      record.description || '',
      JSON.stringify(record),
    )
    return { id: info.lastInsertRowid, reference: record.reference }
  }

  const line = `${JSON.stringify(record)}\n`
  fs.appendFileSync(jsonFile, line, 'utf8')
  return { id: null, reference: record.reference }
}

export function getInquiryByReference(reference) {
  if (driver === 'sqlite' && sqlite) {
    const row = sqlite
      .prepare('SELECT reference, created_at, payload FROM inquiries WHERE reference = ?')
      .get(reference)
    return row ? JSON.parse(row.payload) : null
  }

  if (!fs.existsSync(jsonFile)) return null
  const lines = fs.readFileSync(jsonFile, 'utf8').split('\n')
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i].trim()
    if (!line) continue
    try {
      const parsed = JSON.parse(line)
      if (parsed.reference === reference) return parsed
    } catch {
      /* skip malformed line */
    }
  }
  return null
}

export function countInquiries() {
  if (driver === 'sqlite' && sqlite) {
    const row = sqlite.prepare('SELECT COUNT(*) AS total FROM inquiries').get()
    return row ? Number(row.total) : 0
  }
  if (!fs.existsSync(jsonFile)) return 0
  return fs
    .readFileSync(jsonFile, 'utf8')
    .split('\n')
    .filter((line) => line.trim()).length
}
