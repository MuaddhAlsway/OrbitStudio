import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PROJECTS, type Project } from '../data/projects'
import '../css/SelectedWork.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type ArtKind = 'nova' | 'property' | 'forever' | 'cinema'

/** Decorative fallback drawn only if a project image fails to load. */
const FALLBACK_ART: Record<string, ArtKind> = {
  'trq-studio': 'property',
  'lakum-artspace': 'forever',
  'td-logistics': 'cinema',
  'mu-commerce': 'nova',
  estate: 'property',
}

function Art({ kind }: { kind: ArtKind }) {
  if (kind === 'nova') {
    return (
      <svg viewBox="0 0 480 360" aria-hidden="true" focusable="false">
        <rect className="sw-art__frame" x="36" y="36" width="408" height="288" rx="2" />
        <rect className="sw-art__box" x="60" y="60" width="112" height="112" rx="2" />
        <rect className="sw-art__box" x="184" y="60" width="112" height="112" rx="2" />
        <rect className="sw-art__box" x="60" y="184" width="112" height="112" rx="2" />
        <rect className="sw-art__box" x="184" y="184" width="112" height="112" rx="2" />
        <circle className="sw-art__dot-accent" cx="116" cy="116" r="15" />
        <circle className="sw-art__dot-accent" cx="240" cy="240" r="15" />
        <line className="sw-art__line" x1="320" y1="72" x2="420" y2="72" />
        <line className="sw-art__dim" x1="320" y1="102" x2="420" y2="102" />
        <line className="sw-art__dim" x1="320" y1="126" x2="392" y2="126" />
        <line className="sw-art__dim" x1="320" y1="162" x2="420" y2="162" />
        <line className="sw-art__dim" x1="320" y1="186" x2="376" y2="186" />
        <rect className="sw-art__accent-fill" x="320" y="252" width="100" height="14" rx="2" />
        <line className="sw-art__dim" x1="320" y1="292" x2="404" y2="292" />
      </svg>
    )
  }

  if (kind === 'property') {
    return (
      <svg viewBox="0 0 480 360" aria-hidden="true" focusable="false">
        <rect className="sw-art__frame" x="48" y="48" width="384" height="264" rx="2" />
        <rect className="sw-art__box" x="72" y="72" width="150" height="116" rx="2" />
        <rect className="sw-art__box" x="72" y="204" width="150" height="84" rx="2" />
        <rect className="sw-art__box" x="234" y="72" width="174" height="216" rx="2" />
        <line className="sw-art__dim" x1="234" y1="156" x2="408" y2="156" />
        <line className="sw-art__dim" x1="321" y1="156" x2="321" y2="288" />
        <path className="sw-art__dim" d="M222 128 a20 20 0 0 0 20 20" fill="none" />
        <path
          className="sw-art__accent"
          d="M300 108 c0 -30 46 -30 46 0 c0 21 -23 40 -23 40 c0 0 -23 -19 -23 -40 z"
          fill="none"
        />
        <circle className="sw-art__dot-accent" cx="323" cy="106" r="8" />
      </svg>
    )
  }

  if (kind === 'forever') {
    return (
      <svg viewBox="0 0 480 360" aria-hidden="true" focusable="false">
        <rect className="sw-art__frame" x="48" y="48" width="384" height="264" rx="2" />
        <path className="sw-art__accent" d="M240 96 L302 150 L240 264 L178 150 Z" fill="none" />
        <line className="sw-art__dim" x1="178" y1="150" x2="302" y2="150" />
        <line className="sw-art__dim" x1="240" y1="96" x2="214" y2="150" />
        <line className="sw-art__dim" x1="240" y1="96" x2="266" y2="150" />
        <line className="sw-art__dim" x1="214" y1="150" x2="240" y2="264" />
        <line className="sw-art__dim" x1="266" y1="150" x2="240" y2="264" />
        <circle className="sw-art__box" cx="118" cy="238" r="44" />
        <circle className="sw-art__dim" cx="118" cy="238" r="31" />
        <circle className="sw-art__dot-accent" cx="118" cy="238" r="4.5" />
        <path className="sw-art__dim" d="M346 92 L404 92 L404 150 L364 190 L324 150 Z" fill="none" />
        <circle className="sw-art__dot" cx="382" cy="114" r="5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 480 360" aria-hidden="true" focusable="false">
      <rect className="sw-art__frame" x="36" y="36" width="408" height="288" rx="2" />
      <rect className="sw-art__box" x="80" y="62" width="320" height="66" rx="2" />
      <rect className="sw-art__accent-fill" x="150" y="88" width="180" height="6" rx="3" />
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 8 }).map((__, c) => {
          const selected = (r === 1 && c === 3) || (r === 2 && c === 5)
          return (
            <rect
              key={`${r}-${c}`}
              className={selected ? 'sw-art__seat-accent' : 'sw-art__seat'}
              x={100 + c * 34}
              y={166 + r * 26}
              width="22"
              height="16"
              rx="3"
            />
          )
        }),
      )}
      <line className="sw-art__dim" x1="80" y1="288" x2="400" y2="288" />
      <rect className="sw-art__accent" x="80" y="300" width="200" height="1.5" rx="1" />
      <circle className="sw-art__dot-accent" cx="410" cy="292" r="9" />
    </svg>
  )
}

function WorkMedia({ project, priority }: { project: Project; priority: boolean }) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(project.image) && !failed

  return (
    <figure className="sw-project__media">
      <div className={`sw-project__art${showImage ? ' sw-project__art--media' : ''}`}>
        {showImage ? (
          <img
            className="sw-project__img"
            src={project.image}
            alt={`${project.title} — ${project.category}`}
            width={1672}
            height={941}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <Art kind={FALLBACK_ART[project.id] ?? 'nova'} />
        )}
      </div>
    </figure>
  )
}

export default function SelectedWork() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const head = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        head
          .from('.sw-head__eyebrow', { y: 16, opacity: 0, duration: 0.6 }, 0)
          .from('.sw-head__rule', { scaleX: 0, duration: 1.1, ease: 'power2.inOut' }, 0.05)
          .from(
            '.sw-headline__line',
            { yPercent: 112, duration: 1.1, stagger: 0.12, ease: 'power4.out' },
            0.12,
          )
          .from('.sw-head__desc', { y: 20, opacity: 0, duration: 0.8 }, 0.46)

        const items = gsap.utils.toArray<HTMLElement>('.sw-item', root.current)

        items.forEach((item) => {
          const media = item.querySelector('.sw-project__media')
          const art = item.querySelector('.sw-project__art')
          const titleLine = item.querySelector('.sw-project__title-line')
          const meta = item.querySelectorAll('.sw-project__category')

          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          })

          if (media) {
            tl.fromTo(
              media,
              { clipPath: 'inset(0% 0% 100% 0%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.1,
                ease: 'power3.inOut',
              },
              0,
            )
          }

          if (art) {
            tl.fromTo(art, { scale: 1.16 }, { scale: 1, duration: 1.3 }, 0)
          }

          if (titleLine) {
            tl.fromTo(titleLine, { yPercent: 112 }, { yPercent: 0, duration: 0.9 }, 0.16)
          }

          tl.fromTo(
            meta,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 },
            0.28,
          )
        })
      })

      mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        const projects = gsap.utils.toArray<HTMLElement>('.sw-project', root.current)

        projects.forEach((project) => {
          const art = project.querySelector('.sw-project__art')
          const meta = project.querySelector('.sw-project__meta')
          const hasImage = !!project.querySelector('.sw-project__img')

          if (art && !hasImage) {
            gsap.fromTo(
              art,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                  trigger: project,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              },
            )
          }

          if (meta) {
            gsap.fromTo(
              meta,
              { y: 26 },
              {
                y: -26,
                ease: 'none',
                scrollTrigger: {
                  trigger: project,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              },
            )
          }
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="sw" id="work" ref={root} aria-labelledby="sw-heading">
      <div className="sw-container">
        <header className="sw-head">
          <p className="sw-head__eyebrow">
            <span className="sw-head__eyebrow-line">02 / Selected Work</span>
          </p>

          <h2 className="sw-headline" id="sw-heading">
            <span className="sw-headline__mask">
              <span className="sw-headline__line">Built with</span>
            </span>
            <span className="sw-headline__mask">
              <span className="sw-headline__line sw-headline__line--indent">
                purpose<span className="sw-accent">.</span>
              </span>
            </span>
          </h2>

          <p className="sw-head__desc">
            A selection of digital products and platforms engineered for real-world impact.
          </p>

          <span className="sw-head__rule" aria-hidden="true" />
        </header>

        <ol className="sw-list" role="list">
          {PROJECTS.map((project, i) => (
            <li className="sw-item" key={project.title}>
              <article className={`sw-project sw-project--${i + 1}`}>
                <Link
                  className="sw-project__stretch"
                  to={project.href}
                  aria-label={`${project.title} — ${project.category}`}
                />

                <WorkMedia project={project} priority={i === 0} />

                <div className="sw-project__meta">
                  <div className="sw-project__meta-top">
                    <span className="sw-project__category">{project.category}</span>
                    <span className="sw-project__arrow" aria-hidden="true">
                      <svg viewBox="0 0 26 12" fill="none" focusable="false">
                        <path
                          d="M0 6h24M18.5 1l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <h3 className="sw-project__title">
                    <span className="sw-project__title-mask">
                      <span className="sw-project__title-line">{project.title}</span>
                    </span>
                  </h3>

                  {project.live && (
                    <div className="sw-project__links">
                      <a
                        className="sw-project__link-btn"
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Website
                        <svg viewBox="0 0 8 8" fill="none" aria-hidden="true" focusable="false">
                          <path
                            d="M1 7L7 1M2.6 1H7v4.4"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
