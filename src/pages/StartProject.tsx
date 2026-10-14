import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useIntroReady } from '../motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { SERVICE_OPTIONS } from '../data/brief'
import { getWhatsAppUrl, isWhatsAppConfigured } from '../config/whatsapp'
import '../css/StartProject.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PROCESS = [
  {
    index: '01',
    title: 'Tell us about the project',
    text: 'Complete a short brief: what you need built, the outcome you want, and your rough budget and timeline.',
  },
  {
    index: '02',
    title: 'We review and respond',
    text: 'Our team reads every brief. We come back with questions, an honest read on scope, and a practical next step.',
  },
  {
    index: '03',
    title: 'We shape the plan',
    text: 'If it is a fit, we define the approach, the milestones and the team — then we start building.',
  },
]

export default function StartProject() {
  const root = useRef<HTMLElement | null>(null)
  const introReady = useIntroReady()
  const whatsappUrl = getWhatsAppUrl()

  useEffect(() => {
    if (!isWhatsAppConfigured) {
      console.warn(
        '[ORBIT STUDIO] WhatsApp is not configured. Set VITE_WHATSAPP_NUMBER ' +
          '(full international format, e.g. +966500000000) to enable the "Begin the Project Brief" button.',
      )
    }
  }, [])

  usePageMeta(
    'Start a Project',
    'Share your project with Manara. Tell us what you need built and we will respond with a practical next step.',
  )

  useGSAP(
    () => {
      if (!introReady) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .from('.sp-eyebrow', { y: 16, opacity: 0, duration: 0.6 })
          .from('.sp-hero__title-line', { yPercent: 112, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.08)
          .from('.sp-hero__lead', { y: 20, opacity: 0, duration: 0.8 }, 0.42)
          .from('.sp-hero__ctas > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.54)
          .from('.sp-hero__service', { y: 16, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.6)
          .from('.sp-hero__note', { y: 12, opacity: 0, duration: 0.6 }, 0.8)

        gsap.from('.sp-process__item', {
          y: 26,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sp-process',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: root, dependencies: [introReady], revertOnUpdate: true },
  )

  return (
    <main className="sp" ref={root}>
      <div className="sp__bg" aria-hidden="true">
        <div className="sp__grid" />
        <div className="sp__glow" />
      </div>

      <section className="sp-hero">
        <div className="sp-container sp-hero__inner">
          <div className="sp-hero__copy">
            <p className="sp-eyebrow">Start a project</p>

            <h1 className="sp-hero__title">
              <span className="sp-hero__title-mask">
                <span className="sp-hero__title-line">Let&rsquo;s build something</span>
              </span>
              <span className="sp-hero__title-mask">
                <span className="sp-hero__title-line sp-hero__title-line--serif">
                  exceptional<span className="sp-accent-dot">.</span>
                </span>
              </span>
            </h1>

            <p className="sp-hero__lead">
              Tell us what you are working on and what you need it to do. A short brief is all it
              takes for our team to understand the project and respond with a practical next step.
            </p>

            <div className="sp-hero__ctas">
              {whatsappUrl ? (
                <a
                  className="svc-btn svc-btn--primary"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Begin the Project Brief
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
                    <path
                      d="M4.75 11.25 11.25 4.75M6 4.75h5.25V10"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <button
                  type="button"
                  className="svc-btn svc-btn--primary"
                  disabled
                  aria-disabled="true"
                  title="WhatsApp is not configured yet"
                >
                  Begin the Project Brief
                </button>
              )}
              <Link className="svc-btn svc-btn--ghost" to="/services">
                Explore our services
              </Link>
            </div>

            {!whatsappUrl && (
              <p className="sp-hero__config" role="status">
                Project enquiries are temporarily unavailable — WhatsApp is not configured. Set{' '}
                <code>VITE_WHATSAPP_NUMBER</code> to enable this button.
              </p>
            )}

            <p className="sp-hero__note">
              Prefer email? Write to{' '}
              <a href="mailto:muaddhalsway@gmail.com">muaddhalsway@gmail.com</a>.
            </p>
          </div>

          <div className="sp-hero__visual" aria-hidden="true">
            <ul className="sp-hero__services">
              {SERVICE_OPTIONS.map((service, index) => (
                <li className="sp-hero__service" key={service.id}>
                  <span className="sp-hero__service-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="sp-hero__service-label">{service.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sp-process" aria-labelledby="sp-process-title">
        <div className="sp-container">
          <header className="sp-process__head">
            <p className="sp-eyebrow">How it works</p>
            <h2 className="sp-process__title" id="sp-process-title">
              From brief to build.
            </h2>
          </header>

          <ol className="sp-process__list">
            {PROCESS.map((step) => (
              <li className="sp-process__item" key={step.index}>
                <span className="sp-process__index">{step.index}</span>
                <h3 className="sp-process__item-title">{step.title}</h3>
                <p className="sp-process__item-text">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="sp-process__cta">
            <Link className="svc-btn svc-btn--primary" to="/start-project/brief">
              Start your brief
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
                <path
                  d="M4.75 11.25 11.25 4.75M6 4.75h5.25V10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
