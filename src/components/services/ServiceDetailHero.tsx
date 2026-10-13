import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ServiceVisual from './ServiceVisual'
import type { Service } from '../../data/services'

gsap.registerPlugin(useGSAP)

export default function ServiceDetailHero({ service }: { service: Service }) {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.sdp-eyebrow', { y: 16, opacity: 0, duration: 0.6 })
          .from('.sdp-hero__title-line', { yPercent: 112, duration: 1.05, stagger: 0.12, ease: 'power4.out' }, 0.08)
          .from('.sdp-hero__lead', { y: 20, opacity: 0, duration: 0.8 }, 0.4)
          .from('.sdp-hero__note', { y: 14, opacity: 0, duration: 0.6 }, 0.5)
          .from('.sdp-hero__actions > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.54)
          .from('.sdp-hero__visual-inner', { opacity: 0, y: 30, duration: 0.9 }, 0.36)
      })
    },
    { scope: root },
  )

  return (
    <section className="sdp-hero" ref={root} aria-labelledby="sdp-hero-title">
      <div className="sdp-hero__bg" aria-hidden="true">
        <div className="sdp-hero__grid" />
        <div className="sdp-hero__glow" />
      </div>

      <div className="sdp-container sdp-hero__inner">
        <div className="sdp-hero__copy">
          <p className="sdp-eyebrow">
            <span className="sdp-eyebrow__index">{service.index}</span>
            <span className="sdp-eyebrow__label">{service.label}</span>
          </p>

          <h1 className="sdp-hero__title" id="sdp-hero-title">
            <span className="sdp-hero__title-mask">
              <span className="sdp-hero__title-line">{service.title}</span>
            </span>
          </h1>

          <p className="sdp-hero__lead">{service.headline}</p>

          <div className="sdp-hero__actions">
            <Link className="svc-btn svc-btn--primary" to="/start-project">
              Start a Project
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
            <Link className="svc-btn svc-btn--ghost" to="/services">
              All Services
            </Link>
          </div>
        </div>

        <div className="sdp-hero__visual" aria-hidden="true">
          <div className="sdp-hero__visual-inner">
            <ServiceVisual kind={service.visual} />
          </div>
        </div>
      </div>
    </section>
  )
}
