import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '../css/Expertise.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type FigureKind = 'software' | 'web' | 'commerce' | 'api' | 'uiux' | 'maintenance'

interface Service {
  index: string
  title: string
  description: string
  figure: FigureKind
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Website Design & Development',
    description:
      'Brand-led, responsive websites that present your business clearly and perform reliably.',
    figure: 'web',
  },
  {
    index: '02',
    title: 'E-Commerce Development',
    description:
      'Storefronts, catalogues and checkout flows that make browsing and buying straightforward.',
    figure: 'commerce',
  },
  {
    index: '03',
    title: 'Custom Web Applications',
    description:
      'Purpose-built applications and dashboards shaped around your operations.',
    figure: 'software',
  },
  {
    index: '04',
    title: 'Backend & API Development',
    description:
      'APIs, data models and authentication that keep applications dependable.',
    figure: 'api',
  },
  {
    index: '05',
    title: 'Cloud Deployment & Maintenance',
    description:
      'Hosting, deployment and ongoing maintenance that keep systems live and healthy.',
    figure: 'maintenance',
  },
  {
    index: '06',
    title: 'UI/UX & Interactive Experiences',
    description:
      'Interface design and motion that make products clear, considered and engaging.',
    figure: 'uiux',
  },
]

const HOVER_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 641px)'

function Figure({ kind }: { kind: FigureKind }) {
  if (kind === 'software') {
    return (
      <svg viewBox="0 0 320 240" aria-hidden="true" focusable="false">
        <rect className="xp-fig__stroke" x="58" y="52" width="204" height="140" rx="2" />
        <line className="xp-fig__dim" x1="126" y1="52" x2="126" y2="192" />
        <line className="xp-fig__dim" x1="194" y1="52" x2="194" y2="192" />
        <line className="xp-fig__dim" x1="58" y1="99" x2="262" y2="99" />
        <line className="xp-fig__dim" x1="58" y1="145" x2="262" y2="145" />
        <rect className="xp-fig__accent" x="194" y="99" width="68" height="46" />
        <circle className="xp-fig__dot xp-fig__dot--accent" cx="228" cy="122" r="3.2" />
        <line className="xp-fig__stroke" x1="58" y1="34" x2="126" y2="34" />
        <line className="xp-fig__dim" x1="58" y1="30" x2="58" y2="38" />
        <line className="xp-fig__dim" x1="126" y1="30" x2="126" y2="38" />
      </svg>
    )
  }

  if (kind === 'web') {
    return (
      <svg viewBox="0 0 320 240" aria-hidden="true" focusable="false">
        <rect className="xp-fig__stroke" x="54" y="54" width="212" height="132" rx="3" />
        <line className="xp-fig__dim" x1="54" y1="82" x2="266" y2="82" />
        <circle className="xp-fig__dot" cx="68" cy="68" r="3" />
        <circle className="xp-fig__dot" cx="80" cy="68" r="3" />
        <circle className="xp-fig__dot" cx="92" cy="68" r="3" />
        <rect className="xp-fig__dim" x="70" y="98" width="180" height="20" />
        <rect className="xp-fig__stroke" x="70" y="130" width="86" height="36" />
        <rect className="xp-fig__stroke" x="164" y="130" width="86" height="36" />
        <rect className="xp-fig__accent-fill" x="70" y="174" width="36" height="8" rx="1.5" />
      </svg>
    )
  }

  if (kind === 'api') {
    return (
      <svg viewBox="0 0 320 240" aria-hidden="true" focusable="false">
        <rect className="xp-fig__stroke" x="60" y="42" width="200" height="44" rx="2" />
        <rect className="xp-fig__stroke" x="60" y="98" width="200" height="44" rx="2" />
        <rect className="xp-fig__stroke" x="60" y="154" width="200" height="44" rx="2" />
        <line className="xp-fig__dim" x1="160" y1="86" x2="160" y2="98" />
        <line className="xp-fig__dim" x1="160" y1="142" x2="160" y2="154" />
        <circle className="xp-fig__dot xp-fig__dot--accent" cx="84" cy="64" r="4" />
        <line className="xp-fig__accent" x1="102" y1="64" x2="150" y2="64" />
        <circle className="xp-fig__dot" cx="84" cy="120" r="4" />
        <line className="xp-fig__dim" x1="102" y1="120" x2="178" y2="120" />
        <circle className="xp-fig__dot" cx="84" cy="176" r="4" />
        <line className="xp-fig__dim" x1="102" y1="176" x2="150" y2="176" />
      </svg>
    )
  }

  if (kind === 'uiux') {
    return (
      <svg viewBox="0 0 320 240" aria-hidden="true" focusable="false">
        <rect className="xp-fig__stroke" x="46" y="46" width="150" height="104" rx="2" />
        <line className="xp-fig__dim" x1="46" y1="68" x2="196" y2="68" />
        <circle className="xp-fig__dot" cx="60" cy="57" r="3" />
        <rect className="xp-fig__dim" x="62" y="82" width="118" height="10" rx="1.5" />
        <rect className="xp-fig__dim" x="62" y="100" width="86" height="10" rx="1.5" />
        <rect className="xp-fig__accent-fill" x="62" y="122" width="46" height="12" rx="2" />
        <rect className="xp-fig__stroke" x="146" y="112" width="134" height="88" rx="2" />
        <line className="xp-fig__dim" x1="146" y1="134" x2="280" y2="134" />
        <rect className="xp-fig__dim" x="162" y="148" width="102" height="8" rx="1.5" />
        <rect className="xp-fig__stroke" x="162" y="164" width="46" height="20" rx="2" />
        <rect className="xp-fig__accent" x="216" y="164" width="48" height="20" rx="2" />
        <circle className="xp-fig__dot xp-fig__dot--accent" cx="112" cy="128" r="3.5" />
      </svg>
    )
  }

  if (kind === 'commerce') {
    return (
      <svg viewBox="0 0 320 240" aria-hidden="true" focusable="false">
        <rect className="xp-fig__stroke" x="66" y="50" width="84" height="84" rx="2" />
        <rect className="xp-fig__stroke" x="170" y="50" width="84" height="84" rx="2" />
        <rect className="xp-fig__stroke" x="66" y="150" width="84" height="40" rx="2" />
        <rect className="xp-fig__accent" x="170" y="150" width="84" height="40" rx="2" />
        <line className="xp-fig__dim" x1="80" y1="118" x2="136" y2="118" />
        <line className="xp-fig__dim" x1="184" y1="118" x2="240" y2="118" />
        <circle className="xp-fig__dot xp-fig__dot--accent" cx="200" cy="168" r="4" />
        <line className="xp-fig__dim" x1="214" y1="168" x2="240" y2="168" />
        <line className="xp-fig__dim" x1="184" y1="180" x2="228" y2="180" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 320 240" aria-hidden="true" focusable="false">
      <path className="xp-fig__stroke" d="M96 132 a64 64 0 0 1 128 0" fill="none" />
      <line className="xp-fig__dim" x1="96" y1="132" x2="224" y2="132" />
      <line className="xp-fig__dim" x1="104" y1="120" x2="98" y2="112" />
      <line className="xp-fig__dim" x1="160" y1="70" x2="160" y2="60" />
      <line className="xp-fig__dim" x1="216" y1="120" x2="222" y2="112" />
      <line className="xp-fig__accent" x1="160" y1="132" x2="194" y2="86" />
      <circle className="xp-fig__dot xp-fig__dot--accent" cx="160" cy="132" r="4" />
      <circle className="xp-fig__dot" cx="80" cy="180" r="3.5" />
      <line className="xp-fig__stroke" x1="94" y1="180" x2="150" y2="180" />
      <circle className="xp-fig__dot" cx="170" cy="180" r="3.5" />
      <line className="xp-fig__stroke" x1="184" y1="180" x2="240" y2="180" />
    </svg>
  )
}

export default function Expertise() {
  const root = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [canHover, setCanHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(HOVER_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY)
    const onChange = () => setCanHover(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const reveal = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        reveal
          .from('.xp-head__eyebrow', { y: 16, opacity: 0, duration: 0.6 }, 0)
          .from('.xp-head__rule', { scaleX: 0, duration: 1.1, ease: 'power2.inOut' }, 0.05)
          .from(
            '.xp-headline__line',
            { yPercent: 112, duration: 1.1, stagger: 0.12, ease: 'power4.out' },
            0.12,
          )
          .from('.xp-head__desc', { y: 20, opacity: 0, duration: 0.8 }, 0.46)
          .from('.xp-row', { yPercent: 26, opacity: 0, duration: 0.85, stagger: 0.08 }, 0.5)
          .from('.xp-preview', { opacity: 0, y: 40, duration: 0.9 }, 0.66)

        gsap.fromTo(
          '.xp-preview__stage',
          { y: 38 },
          {
            y: -38,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section className="xp" id="expertise" ref={root} aria-labelledby="xp-heading">
      <div className="xp-container">
        <header className="xp-head">
          <p className="xp-head__eyebrow">
            <span className="xp-head__eyebrow-line">01 / Our Expertise</span>
          </p>

          <h2 className="xp-headline" id="xp-heading">
            <span className="xp-headline__mask">
              <span className="xp-headline__line">Engineering digital</span>
            </span>
            <span className="xp-headline__mask">
              <span className="xp-headline__line xp-headline__line--indent">
                possibilities<span className="xp-accent">.</span>
              </span>
            </span>
          </h2>

          <p className="xp-head__desc">
            From complex software systems to exceptional digital experiences, we build
            technology designed to perform and scale.
          </p>

          <span className="xp-head__rule" aria-hidden="true" />
        </header>

        <div className="xp-body">
          <ul className="xp-list" role="list">
            {SERVICES.map((service, i) => {
              const isActive = active === i
              const isOpen = expanded === i
              return (
                <li className={`xp-item${isActive ? ' is-active' : ''}`} key={service.title}>
                  <button
                    type="button"
                    className="xp-row"
                    aria-expanded={canHover ? undefined : isOpen}
                    aria-controls={canHover ? undefined : `xp-detail-${i}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => {
                      setActive(i)
                      if (!canHover) setExpanded((prev) => (prev === i ? null : i))
                    }}
                  >
                    <span className="xp-row__main">
                      <span className="xp-row__index">{service.index}</span>
                      <span className="xp-row__title">{service.title}</span>
                    </span>
                    <span className="xp-row__arrow" aria-hidden="true">
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
                  </button>

                  {!canHover && (
                    <div className="xp-row__detail" id={`xp-detail-${i}`} hidden={!isOpen}>
                      <div className="xp-row__detail-inner">
                        <p className="xp-row__detail-text">{service.description}</p>
                        <div className="xp-row__detail-figure" aria-hidden="true">
                          <Figure kind={service.figure} />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <aside className="xp-preview" aria-hidden="true">
            <div className="xp-preview__stage">
              <div className="xp-preview__frame">
                {SERVICES.map((service, i) => (
                  <div
                    className={`xp-figure${active === i ? ' is-active' : ''}`}
                    key={service.title}
                  >
                    <Figure kind={service.figure} />
                  </div>
                ))}
              </div>

              <div className="xp-preview__meta">
                {SERVICES.map((service, i) => (
                  <div
                    className={`xp-preview__meta-item${active === i ? ' is-active' : ''}`}
                    key={service.title}
                  >
                    <span className="xp-preview__index">{service.index}</span>
                    <span className="xp-preview__title">{service.title}</span>
                    <p className="xp-preview__desc">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
