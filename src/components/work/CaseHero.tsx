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

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
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
          {study.github && (
            <a
              className="svc-btn svc-btn--ghost"
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubMark />
              View on GitHub
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
