import { useCallback, useEffect, useRef, useState } from 'react'
import {
  BRIEF_STEPS,
  EMPTY_BRIEF,
  TOTAL_STEPS,
  submitBrief,
  validateStep,
  type BriefData,
  type BriefErrors,
} from '../data/brief'

const DRAFT_KEY = 'manara:brief-draft'
const STEP_KEY = 'manara:brief-step'

export type BriefStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface BriefResult {
  reference: string | null
  emailConfigured: boolean
}

function hasErrors(errors: BriefErrors) {
  return Object.keys(errors).length > 0
}

function firstStepWithErrors(data: BriefData) {
  for (let index = 0; index < TOTAL_STEPS - 1; index += 1) {
    if (hasErrors(validateStep(index, data))) return index
  }
  return TOTAL_STEPS - 1
}

function readDraft(): BriefData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as BriefData) : null
  } catch {
    return null
  }
}

function readStep() {
  if (typeof window === 'undefined') return 0
  const stored = Number.parseInt(window.sessionStorage.getItem(STEP_KEY) || '0', 10)
  return Number.isFinite(stored) ? Math.min(Math.max(step0(step0Safe(store)), 0)) : 0
}

/* Small helper kept separate for readability above. */
function safeStep(value: unknown) {
  return typeof window === 'undefined'
    ? 0
    : Math.min(TOTAL_STEPS - 1, Math.max(0, Number(value) || 0))
}

export function useBriefForm(preselectedServices: string[] = []) {
  const [data, setData] = useState<BriefData>(() => {
    const base: BriefData = { ...EMPTY_BRIEF, services: [...preselectedServices] }
    if (typeof window === 'undefined') return base

    try {
      const raw = window.sessionStorage.getItem(DRAFT_KEY)
      if (!raw) return base
      const draft = JSON.parse(raw) as Partial<BriefData>
      const merged: BriefData = { ...base, ...draft }
      merged.services = [
        ...new Set([...preselectedServices, ...(Array.isArray(draft.services) ? draft.services : [])]),
      ]
      return merged
    } catch {
      return base
    }
  })

  const [step, setStep] = useState(() => {
    if (typeof window === 'undefined') return 0
    return clampStep(Number(window.sessionStorage.getItem(STEP_KEY)) || 0)
  })

  const [errors, setErrors] = useState<BriefErrors>({})
  const [status, setStatus] = useState<BriefStatus>('idle')
  const [result, setResult] = useState<BriefResult | null>(null)
  const [serverError, setServerError] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const submissionId = useRef<string>(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `sub-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  )
  const startedAt = useRef<number>(Date.now())

  /* Persist a draft so a refresh never loses progress -------------- */
  useEffect(() => {
    if (typeof window === 'undefined' || status === 'success') return
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data))
      window.sessionStorage.setItem(STEP_KEY, String(step))
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [data, step, status])

  const clearErrors = useCallback((keys: (keyof BriefData)[]) => {
    setErrors((current) => {
      if (!keys.some((key) => key in current)) return current
      const next = { ...current }
      keys.forEach((key) => delete next[key])
      return next
    })
  }, [])

  const update = useCallback(
    (patch: Partial<BriefData>) => {
      setData((current) => ({ ...current, ...patch }))
      clearErrors(Object.keys(patch) as (keyof BriefData)[])
    },
    [clearErrors],
  )

  const toggleService = useCallback((id: string) => {
    setData((current) => {
      const services = current.services.includes(id)
        ? current.services.filter((item) => item !== id)
        : [...current.services, id]
      return { ...current, services }
    })
    clearErrors(['services'])
  }, [clearErrors])

  const goTo = useCallback((index: number) => {
    setErrors({})
    setStep(clampStep(index))
  }, [])

  const back = useCallback(() => {
    setErrors({})
    setStep((current) => clampStep(current - 1))
  }, [])

  const next = useCallback(() => {
    const stepErrors = validateStep(step, data)
    if (hasErrors(stepErrors)) {
      setErrors(stepErrors)
      return false
    }
    setErrors({})
    setStep((current) => clampStep(current + 1))
    return true
  }, [step, data])

  const submit = useCallback(async () => {
    const allErrors = validateStep(TOTAL_STEPS - 1, data)
    if (hasErrors(allErrors)) {
      setErrors(allErrors)
      setStep(firstStepWithErrors(data))
      return
    }

    setStatus('submitting')
    setServerError('')

    const response = await submitBrief(
      data,
      submissionId.current,
      Date.now() - startedAt.current,
      honeypot,
    )

    if (response.ok) {
      setResult({ reference: response.reference ?? null, emailConfigured: !!response.emailConfigured })
      setStatus('success')
      if (typeof window !== 'undefined') {
        try {
          window.sessionStorage.removeItem(DRAFT_KEY)
          window.sessionStorage.removeItem(STEP_KEY)
        } catch {
          /* ignore */
        }
      }
      return
    }

    setStatus('error')
    if (response.errors && hasErrors(response.errors)) {
      setErrors(response.errors)
      setStep(firstStepWithErrors(data))
    }
    setServerError(response.message || 'Something went wrong. Please try again.')
  }, [data, honeypot])

  return {
    data,
    step,
    steps: BRIEF_STEPS,
    errors,
    status,
    result,
    serverError,
    honeypot,
    setHoneypot,
    update,
    toggleService,
    goTo,
    back,
    next,
    submit,
  }
}

function clampStep(index: number) {
  if (Number.isNaN(index)) return 0
  return Math.max(0, Math.min(TOTAL_STEPS - 1, index))
}
