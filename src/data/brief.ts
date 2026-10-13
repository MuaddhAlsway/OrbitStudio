import briefOptions from '../../shared/briefOptions.json'

/* ==================================================================
   Project brief — shared configuration & types

   Option lists live in shared/briefOptions.json so the client and the
   API validate against exactly the same values.
   ================================================================== */

export interface BriefOption {
  id: string
  label: string
  description?: string
}

export const SERVICE_OPTIONS = briefOptions.services as BriefOption[]
export const BUDGET_OPTIONS = briefOptions.budgets as BriefOption[]
export const TIMELINE_OPTIONS = briefOptions.timelines as BriefOption[]
export const URGENCY_OPTIONS = briefOptions.urgency as BriefOption[]
export const COMMUNICATION_OPTIONS = briefOptions.communication as BriefOption[]

export interface BriefData {
  services: string[]
  projectName: string
  company: string
  description: string
  existingWebsite: string
  features: string
  launchDate: string
  budget: string
  timeline: string
  urgency: string
  fullName: string
  email: string
  phone: string
  companyContact: string
  communication: string
}

export type BriefErrors = Partial<Record<keyof BriefData, string>>

export const EMPTY_BRIEF: BriefData = {
  services: [],
  projectName: '',
  company: '',
  description: '',
  existingWebsite: '',
  features: '',
  launchDate: '',
  budget: '',
  timeline: '',
  urgency: '',
  fullName: '',
  email: '',
  phone: '',
  companyContact: '',
  communication: 'email',
}

export interface BriefStep {
  id: 'services' | 'project' | 'scope' | 'contact' | 'review'
  label: string
  short: string
  title: string
  intro: string
}

export const BRIEF_STEPS: BriefStep[] = [
  {
    id: 'services',
    label: 'Services',
    short: 'Services',
    title: 'What do you need built?',
    intro: 'Select every area that applies. You can change this later.',
  },
  {
    id: 'project',
    label: 'The project',
    short: 'Project',
    title: 'Tell us about the project.',
    intro: 'A few details help us understand the problem and the outcome.',
  },
  {
    id: 'scope',
    label: 'Budget & timeline',
    short: 'Budget',
    title: 'Where should we aim?',
    intro: 'A rough range is enough — it helps us shape a realistic plan.',
  },
  {
    id: 'contact',
    label: 'Contact',
    short: 'Contact',
    title: 'How do we reach you?',
    intro: 'We will only use these details to respond to your enquiry.',
  },
  {
    id: 'review',
    label: 'Review',
    short: 'Review',
    title: 'Review and send.',
    intro: 'Check everything over, then send your brief to our team.',
  },
]

export const TOTAL_STEPS = BRIEF_STEPS.length

/* --- Shared validators (mirror the server) ------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+()\d][\d\s()+-]{5,19}$/

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim())
}

export function isValidPhone(value: string) {
  return PHONE_RE.test(value.trim())
}

export function isValidUrl(value: string) {
  const raw = value.trim()
  if (!raw) return true
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function validateStep(step: number, data: BriefData): BriefErrors {
  const errors: BriefErrors = {}
  const id = BRIEF_STEPS[step]?.id

  if (id === 'services') {
    if (data.services.length === 0) errors.services = 'Select at least one service.'
  }

  if (id === 'project') {
    if (data.projectName.trim().length < 2) errors.projectName = 'Enter a project name.'
    if (data.description.trim().length < 20) {
      errors.description = 'Please describe the project in at least 20 characters.'
    }
    if (!isValidUrl(data.existingWebsite)) {
      errors.existingWebsite = 'Enter a valid website address.'
    }
  }

  if (id === 'scope') {
    if (!data.budget) errors.budget = 'Choose an estimated budget.'
    if (!data.timeline) errors.timeline = 'Choose a desired timeline.'
    if (!data.urgency) errors.urgency = 'Choose a project urgency.'
  }

  if (id === 'contact') {
    if (data.fullName.trim().length < 2) errors.fullName = 'Enter your full name.'
    if (!isValidEmail(data.email)) errors.email = 'Enter a valid email address.'
    if (!isValidPhone(data.phone)) errors.phone = 'Enter a valid phone number.'
    if (!data.communication) errors.communication = 'Choose a preferred communication method.'
  }

  if (id === 'review') {
    for (let i = 0; i < TOTAL_STEPS - 1; i += 1) {
      Object.assign(errors, validateStep(i, data))
    }
  }

  return errors
}

/* --- Submission ---------------------------------------------------- */

export interface SubmitResult {
  ok: boolean
  reference?: string | null
  emailConfigured?: boolean
  errors?: BriefErrors
  message?: string
}

export async function submitBrief(
  data: BriefData,
  submissionId: string,
  elapsedMs: number,
  honeypot = '',
): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        submissionId,
        elapsedMs,
        honeypot,
        userAgent: navigator.userAgent,
      }),
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      if (response.status === 429) {
        return {
          ok: false,
          message: 'Too many submissions from this device. Please try again in a little while.',
        }
      }
      return {
        ok: false,
        errors: payload?.fields,
        message: payload?.message || 'Something went wrong. Please try again.',
      }
    }

    return {
      ok: true,
      reference: payload?.reference ?? null,
      emailConfigured: payload?.email?.client === 'sent',
    }
  } catch {
    return {
      ok: false,
      message:
        'We could not reach the server. Please check your connection and try again, or email us at hello@manara.sa.',
    }
  }
}
