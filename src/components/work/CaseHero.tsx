import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useIntroReady } from '../../motion'
import type { CaseStudy } from '../../data/caseStudies'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function ExternalArrow() {
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

export default function CaseHero({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLElement | null>(null)
  const introReady = useIntroReady()

  useGSAP(
    () => {
      if (!introReady) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.cs-hero__crumbs', { y: 12, opacity: 0, duration: 0.5 })
          .from('.cs-hero__eyebrow', { y: 16, opacity: 0, duration: 0.6 }, 0.06)
          .from(
            '.cs-hero__title-line',
            { yPercent: 112, duration: 1.05, stagger: 0.12, ease: 'power4.out' },
            0.12,
          )
          .from('.cs-hero__lead', { y: 20, opacity: 0, duration: 0.8 }, 0.44)
          .from('.cs-hero__meta-item', { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.54)
          .from('.cs-hero__actions > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.6)
          .fromTo(
            '.cs-hero__media',
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power3.inOut' },
            0.34,
          )
          .from('.cs-hero__img', { scale: 1.12, duration: 1.35 }, 0.34)
      })
    },
    { scope: root, dependencies: [introReady], revertOnUpdate: true },
  )

  return (
    <section className="cs-hero" ref={root} aria-labelledby="cs-hero-title">
      <div className="cs-hero__bg" aria-hidden="true">
        <div className="cs-hero__grid" />
        <div className="cs-hero__glow" />
      </div>

      <div className="svc-container cs-hero__inner">
        <nav className="cs-crumbs cs-hero__crumbs" aria-label="Breadcrumb">
          <Link className="cs-crumbs__link" to="/#work">
            Selected Work
          </Link>
          <span className="cs-crumbs__sep" aria-hidden="true">
            /
          </span>
          <span className="cs-crumbs__current">{study.name}</span>
        </nav>

        <p className="cs-hero__eyebrow">{study.category}</p>

        <h1 className="cs-hero__title" id="cs-hero-title">
          <span className="cs-hero__title-mask">
            <span className="cs-hero__title-line">{study.name}</span>
          </span>
        </h1>

        <p className="cs-hero__lead">{study.headline}</p>

        <dl className="cs-hero__meta">
          <div className="cs-hero__meta-item">
            <dt>Category</dt>
            <dd>{study.category}</dd>
          </div>
          {study.live && (
            <div className="cs-hero__meta-item">
              <dt>Status</dt>
              <dd>Live</dd>
            </div>
          )}
          {study.backend && (
            <div className="cs-hero__meta-item">
              <dt>API</dt>
              <dd>
                <a
                  className="cs-hero__meta-link"
                  href={study.backend}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live backend
                </a>
              </dd>
            </div>
          )}
        </dl>

        <div className="cs-hero__actions">
          {study.live && (
            <a
              className="svc-btn svc-btn--primary"
              href={study.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Live Website
              <ExternalArrow />
            </a>
          )}
          <Link className="svc-btn svc-btn--ghost" to="/#work">
            All Work
          </Link>
        </div>
      </div>

      <div className="svc-container cs-hero__media-wrap">
        <figure className="cs-hero__media">
          <img
            className="cs-hero__img"
            src={study.image}
            alt={`${study.name} — ${study.category}`}
            width={1672}
            height={941}
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}
