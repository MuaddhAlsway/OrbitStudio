import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface ConversionCtaProps {
  eyebrow?: string
  title?: string
  text?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export default function ConversionCta({
  eyebrow = 'Next step',
  title = 'Have something worth building?',
  text = 'Tell us what your business needs. We will help define a practical path from idea to implementation.',
  primaryLabel = 'Discuss Your Project',
  primaryTo = '/start-project',
  secondaryLabel = 'View Our Work',
  secondaryTo = '/#work',
}: ConversionCtaProps) {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.from('.svc-cta__eyebrow', { y: 14, opacity: 0, duration: 0.6 })
          .from('.svc-cta__title-line', { yPercent: 112, duration: 1.05, stagger: 0.12 }, 0.08)
          .from('.svc-cta__text', { y: 18, opacity: 0, duration: 0.7 }, 0.34)
          .from('.svc-cta__actions > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.46)
      })
    },
    { scope: root },
  )

  return (
    <section className="svc-cta" ref={root} aria-labelledby="svc-cta-title">
      <div className="svc-cta__bg" aria-hidden="true">
        <div className="svc-cta__grid" />
      </div>
      <div className="svc-container svc-cta__inner">
        <p className="svc-cta__eyebrow">{eyebrow}</p>
        <h2 className="svc-cta__title" id="svc-cta-title">
          <span className="svc-cta__title-mask">
            <span className="svc-cta__title-line">{title}</span>
          </span>
        </h2>
        <p className="svc-cta__text">{text}</p>
        <div className="svc-cta__actions">
          <Link className="svc-btn svc-btn--primary" to={primaryTo}>
            {primaryLabel}
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
          {secondaryLabel && secondaryTo && (
            <Link className="svc-btn svc-btn--ghost" to={secondaryTo}>
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
