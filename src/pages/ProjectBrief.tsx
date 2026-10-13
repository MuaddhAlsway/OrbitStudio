import { useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useBriefForm } from '../hooks/useBriefForm'
import { BRIEF_STEPS, SERVICE_OPTIONS, TOTAL_STEPS } from '../data/brief'
import BriefProgress from '../components/brief/BriefProgress'
import {
  ContactStep,
  ProjectStep,
  ReviewStep,
  ScopeStep,
  ServicesStep,
} from '../components/brief/BriefSteps'
import '../css/ProjectBrief.css'

gsap.registerPlugin(useGSAP)

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d="M4.75 11.25 11.25 4.75M6 4.75h5.25V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProjectBrief() {
  const root = useRef<HTMLElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const firstRender = useRef(true)
  const reduced = useReducedMotion()
  const [params] = useSearchParams()

  const slug = params.get('service')
  const preselected =
    slug && SERVICE_OPTIONS.some((option) => option.id === slug) ? [slug] : []

  const form = useBriefForm(preselected)
  const {
    data,
    step,
    errors,
    status,
    result,
    serverError,
    update,
    toggleService,
    goTo,
    back,
    next,
    submit,
    honeypot,
    setHoneypot,
  } = form

  usePageMeta(
    'Project Brief',
    'Tell us about your project in five short steps. Manara will review your brief and respond with a practical next step.',
  )

  /* Animate each step in ------------------------------------------ */
  useGSAP(
    () => {
      if (reduced || status === 'success') return
      gsap.from('.pb-step__head, .pb-step__body', {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.06,
      })
    },
    { dependencies: [step, status], scope: root },
  )

  /* Move focus to the step heading for keyboard + SR users ------- */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (status === 'submitting') return
    submit()
  }

  const renderStep = () => {
    switch (BRIEF_STEPS[step].id) {
      case 'services':
        return (
          <ServicesStep
            data={data}
            errors={errors}
            update={update}
            toggleService={toggleService}
          />
        )
      case 'project':
        return <ProjectStep data={data} errors={errors} update={update} toggleService={toggleService} />
      case 'scope':
        return <ScopeStep data={data} errors={errors} update={update} toggleService={toggleService} />
      case 'contact':
        return <ContactStep data={data} errors={errors} update={update} toggleService={toggleService} />
      default:
        return <ReviewStep data={data} goTo={goTo} />
    }
  }

  const isLast = step === TOTAL_STEPS - 1

  return (
    <main className="pb" ref={root}>
      <div className="pb__bg" aria-hidden="true">
        <div className="pb__grid" />
        <div className="pb__glow" />
      </div>

      <div className="pb-container pb__inner">
        <header className="pb-head">
          <Link className="pb-head__back" to="/start-project">
            <span className="pb-head__back-arrow" aria-hidden="true">
              &#8592;
            </span>
            Start a project
          </Link>
          <p className="pb-head__eyebrow">Project brief</p>
          <h1 className="pb-head__title">
            Start your <span className="pb-head__title-serif">project.</span>
          </h1>
          <p className="pb-head__lead">
            Five short steps, about three minutes. We will review your brief and get back to you
            with a practical next step.
          </p>
        </header>

        {status === 'success' ? (
          <section className="pb-success" aria-labelledby="pb-success-title">
            <span className="pb-success__mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                <path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="pb-success__title" id="pb-success-title">
              Your brief is on its way.
            </h2>
            <p className="pb-success__text">
              Thank you, {data.fullName.split(' ')[0] || 'there'}. Our team will review your
              project and respond shortly.
              {result?.emailConfigured
                ? ' A confirmation has been sent to your email.'
                : ' Keep an eye on your inbox for our reply.'}
            </p>
            {result?.reference && (
              <p className="pb-success__ref">
                Reference <strong>{result.reference}</strong>
              </p>
            )}
            <div className="pb-success__actions">
              <Link className="pb-btn pb-btn--primary" to="/services">
                Explore our services
                <Arrow />
              </Link>
              <Link className="pb-btn pb-btn--ghost" to="/">
                Back to home
              </Link>
            </div>
          </section>
        ) : (
          <div className="pb-layout">
            <BriefProgress current={step} onJump={goTo} />

            <form className="pb-panel" onSubmit={onSubmit} noValidate>
              <div className="pb-step">
                <header className="pb-step__head">
                  <span className="pb-step__index">
                    Step {step + 1} / {TOTAL_STEPS}
                  </span>
                  <h2 className="pb-step__title" ref={headingRef} tabIndex={-1}>
                    {BRIEF_STEPS[step].title}
                  </h2>
                  <p className="pb-step__intro">{BRIEF_STEPS[step].intro}</p>
                </header>

                {serverError && (
                  <p className="pb-alert" role="alert">
                    {serverError}
                  </p>
                )}

                <div className="pb-step__body">{renderStep()}</div>

                <div className="pb-nav">
                  {step > 0 && (
                    <button type="button" className="pb-btn pb-btn--ghost" onClick={back}>
                      Back
                    </button>
                  )}
                  {!isLast ? (
                    <button
                      type="button"
                      className="pb-btn pb-btn--primary"
                      onClick={next}
                    >
                      Continue
                      <Arrow />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="pb-btn pb-btn--primary"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'Sending your brief…' : 'Send my brief'}
                      {status !== 'submitting' && <Arrow />}
                    </button>
                  )}
                </div>
              </div>

              {/* Spam honeypot — hidden from people, tempting to bots */}
              <div className="pb-honeypot" aria-hidden="true">
                <label htmlFor="pb-company-url">Company URL</label>
                <input
                  id="pb-company-url"
                  type="text"
                  name="company_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
