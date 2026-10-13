import nodemailer from 'nodemailer'
import { config, emailEnabled } from './config.js'
import { getOptionLabels } from './validation.js'

/* ==================================================================
   Email delivery

   Completely optional. When SMTP/company env vars are missing the API
   still records the inquiry and reports email as "not_configured" —
   it never pretends a message was sent.
   ================================================================== */

let transporter = null

if (emailEnabled) {
  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
  })
}

const label = (map, id, fallback = '—') => map[id] || fallback || id || '—'

function summaryRows(record, labels) {
  const serviceNames = (record.services || [])
    .map((id) => label(labels.services, id))
    .join(', ')

  return [
    ['Reference', record.reference],
    ['Services', serviceNames],
    ['Project', record.projectName],
    ['Business', record.company || '—'],
    ['Budget', label(labels.budgets, record.budget)],
    ['Timeline', label(labels.timelines, record.timeline)],
    ['Priority', label(labels.urgency, record.urgency)],
    ['Desired launch', record.launchDate || '—'],
    ['Existing website', record.existingWebsite || '—'],
    ['Required features', record.features || '—'],
    ['Name', record.fullName],
    ['Email', record.email],
    ['Phone', record.phone],
    ['Company (contact)', record.companyContact || '—'],
    ['Preferred contact', label(labels.communication, record.communication)],
    ['Submitted', record.createdAt],
  ]
}

function toText(rows) {
  return rows.map(([key, value]) => `${key}: ${value}`).join('\n')
}

function toHtml(rows, record) {
  const cells = rows
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b7a8d;white-space:nowrap;vertical-align:top">${key}</td><td style="padding:6px 0;color:#111c2a">${String(
          value,
        ).replace(/</g, '&lt;')}</td></tr>`,
    )
    .join('')

  return `<!doctype html><html><body style="margin:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:640px;margin:24px auto;background:#ffffff;border:1px solid #e4e9ef;border-radius:12px;overflow:hidden">
    <div style="background:#111c2a;padding:20px 26px;color:#f5f7fa">
      <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#9baaba">${config.company.name} · New project brief</div>
      <div style="font-size:20px;margin-top:6px">${record.projectName}</div>
    </div>
    <div style="padding:20px 26px">
      <table style="border-collapse:collapse;font-size:14px;width:100%">${cells}</table>
      <p style="margin:18px 0 0 0;color:#6b7a8d;font-size:12px">Message</p>
      <p style="white-space:pre-wrap;color:#111c2a;font-size:14px;line-height:1.6;margin:6px 0 0 0">${record.description}</p>
    </div>
  </body></html>`
}

function companyMessage(record, labels) {
  const rows = summaryRows(record, labels)
  return {
    from: config.mailFrom,
    to: config.companyEmail,
    replyTo: record.email,
    subject: `New project brief — ${record.projectName} (${record.reference})`,
    text: `New project brief received.\n\n${toText(rows)}\n\nMessage:\n${record.description}\n`,
    html: toHtml(rows, record),
  }
}

function clientMessage(record, labels) {
  const firstName = record.fullName.split(' ')[0] || 'there'
  const text =
    `Hi ${firstName},\n\n` +
    `Thank you for telling us about ${record.projectName}. We've received your brief ` +
    `and a member of our team will review it and get back to you shortly.\n\n` +
    `Your reference is ${record.reference} — please quote it if you follow up.\n\n` +
    `Summary\n${toText(summaryRows(record, labels))}\n\n` +
    `${config.company.name}`

  const html =
    `<div style="font-family:Inter,Arial,sans-serif;color:#111c2a;line-height:1.6;max-width:560px">` +
    `<p>Hi ${firstName},</p>` +
    `<p>Thank you for telling us about <strong>${record.projectName}</strong>. We've received ` +
    `your brief and a member of our team will review it and get back to you shortly.</p>` +
    `<p>Your reference is <strong>${record.reference}</strong> — please quote it if you follow up.</p>` +
    `<p style="color:#6b7a8d;font-size:13px">${config.company.name}</p>` +
    `</div>`

  return {
    from: config.mailFrom,
    to: record.email,
    subject: `We've received your project brief — ${config.company.name}`,
    text,
    html,
  }
}

export function isEmailEnabled() {
  return emailEnabled
}

export async function sendInquiryEmails(record) {
  if (!transporter) {
    return { company: 'not_configured', client: 'not_configured' }
  }

  const labels = getOptionLabels()
  const result = { company: 'failed', client: 'failed', error: null }

  try {
    await transporter.sendMail(companyMessage(record, labels))
    result.company = 'sent'
  } catch (error) {
    result.error = error.message
  }

  try {
    await transporter.sendMail(clientMessage(record, labels))
    result.client = 'sent'
  } catch (error) {
    result.error = result.error || error.message
  }

  return result
}

export async function verifyTransport() {
  if (!transporter) return { ok: false, reason: 'not_configured' }
  try {
    await transporter.verify()
    return { ok: true }
  } catch (error) {
    return { ok: false, reason: error.message }
  }
}
