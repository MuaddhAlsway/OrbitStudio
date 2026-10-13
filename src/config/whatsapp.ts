/* ==================================================================
   WhatsApp click-to-chat configuration

   The number and greeting can be overridden through Vite's public env
   vars (VITE_*), which are safe to expose because they are not secrets:

     VITE_WHATSAPP_NUMBER  — full international number, e.g. +966560394576
     VITE_WHATSAPP_MESSAGE — optional pre-filled greeting (has a default)

   ORBIT STUDIO's WhatsApp line is the default below so the integration
   works out of the box; a deployment may still override it per environment.
   ================================================================== */

export const DEFAULT_WHATSAPP_NUMBER = '+966560394576'

export const DEFAULT_WHATSAPP_MESSAGE = [
  'Hello ORBIT STUDIO,',
  '',
  "I'd like to discuss a new project. Could you please share more about your services, pricing, and next steps?",
  '',
  'Thank you.',
].join('\n')

/** Digits only — wa.me rejects spaces, dashes and a leading "+". */
function normalizeNumber(value: unknown): string {
  return typeof value === 'string' ? value.replace(/\D/g, '') : ''
}

const configuredNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim()

export const WHATSAPP_NUMBER = normalizeNumber(configuredNumber || DEFAULT_WHATSAPP_NUMBER)

export const WHATSAPP_MESSAGE =
  (import.meta.env.VITE_WHATSAPP_MESSAGE as string | undefined)?.trim() ||
  DEFAULT_WHATSAPP_MESSAGE

/** A number shorter than this cannot be a valid international WhatsApp line. */
const MIN_DIGITS = 8

export const isWhatsAppConfigured = WHATSAPP_NUMBER.length >= MIN_DIGITS

/**
 * Returns the official wa.me click-to-chat URL, or `null` when no valid
 * number is configured — callers must never build a broken link.
 */
export function getWhatsAppUrl(message: string = WHATSAPP_MESSAGE): string | null {
  if (!isWhatsAppConfigured) return null
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
