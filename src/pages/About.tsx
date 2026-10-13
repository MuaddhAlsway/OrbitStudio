import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { usePageMeta } from '../hooks/usePageMeta'
import { SERVICES } from '../data/services'
import { BELIEFS, MISSION, STORY } from '../data/about'
import RelatedProjects from '../components/services/RelatedProjects'
import ConversionCta from '../components/services/ConversionCta'
import '../css/About.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function EngineeringCanvas() {
  return (
    <svg viewBox="0 0 480 420" role="img" aria-label="A system map of connected engineering modules" focusable="false">
      <rect className="abt-fig__frame" x="40" y="40" width="400" height="340" rx="4" />
      <line className="abt-fig__dim" x1="40" y1="300" x2="440" y2="300" />
      <line className="abt-fig__dim" x1="240" y1="40" x2="240" y2="380" />

      <rect className="abt-fig__box" x="72" y="72" width="130" height="86" rx="3" />
      <rect className="abt-fig__box" x="278" y="72" width="130" height="86" rx="3" />
      <rect className="abt-fig__box" x="72" y="262" width="130" height="86" rx="3" />
      <rect className="abt-fig__box" x="278" y="262" width="130" height="86" rx="3" />

      <circle className="abt-fig__core" cx="240" cy="210" r="46" />
      <circle className="abt-fig__core-dot" cx="240" cy="210" r="6" />

      <line className="abt-fig__link" x1="202" y1="158" x2="240" y2="210" />
      <line className="abt-fig__link" x1="278" y1="158" x2="240" y2="210" />
      <line className="abt-fig__link" x1="202" y1="262" x2="240" y2="210" />
      <line className="abt-fig__link" x1="278" y1="262" x2="240" y2="210" />

      <line className="abt-fig__accent" x1="92" y1="102" x2="180" y2="102" />
      <line className="abt-fig__accent" x1="92" y1="122" x2="150" y2="122" />
      <line className="abt-fig__dim" x1="298" y1="112" x2="388" y2="112" />
      <line className="abt-fig__dim" x1="92" y1="300" x2="164" y2="300" />
      <line className="abt-fig__accent" x1="298" y1="300" x2="388" y2="300" />

      <circle className="abt-fig__node" cx="150" cy="102" r="0" />
      <circle className="abt-fig__dot" cx="150" cy="122" r="3.4" />
      <circle className="abt-fig__dot abt-fig__dot--accent" cx="164" cy="300" r="3.4" />
      <circle className="abt-fig__dot" cx="298" cy="300" r="3.4" />
    </svg>
  )
}

export default function About() {
  const root = useRef<HTMLElement | null>(null)

  usePageMeta(
    'About',
    'ORBIT STUDIO is an engineering-led technology studio building websites, e-commerce, web applications and backend systems — practical digital products shaped around real requirements.',
  )

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .from('.abt-eyebrow', { y: 16, opacity: 0, duration: 0.6 })
          .from('.abt-hero__title-line', { yPercent: 112, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.08)
          .from('.abt-hero__lead', { y: 20, opacity: 0, duration: 0.8 }, 0.42)
          .from('.abt-hero__meta > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.54)
          .from('.abt-fig__frame', { opacity: 0, duration: 0.9 }, 0.4)
          .from('.abt-fig__box', { opacity: 0, scale: 0.9, transformOrigin: 'center', duration: 0.7, stagger: 0.08 }, 0.6)
          .from('.abt-fig__core', { opacity: 0, scale: 0.7, transformOrigin: 'center', duration: 0.8 }, 0.7)
          .from('.abt-fig__core-dot', { opacity: 0, scale: 0, transformOrigin: 'center', duration: 0.5 }, 0.95)

        gsap.from('.abt-narrative__col', {
          y: 34,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.abt-narrative',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.abt-belief', {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.abt-beliefs__grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.abt-exp__row', {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.abt-exp__list',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <main className="about-page" id="about" ref={root}>
      <div className="abt__bg" aria-hidden="true">
        <div className="abt__grid" />
        <div className="abt__glow" />
      </div>

      <section className="abt-hero">
        <div className="svc-container abt-hero__inner">
          <div className="abt-hero__copy">
            <p className="svc-eyebrow abt-eyebrow">About ORBIT STUDIO</p>

            <h1 className="abt-hero__title">
              <span className="abt-hero__title-mask">
                <span className="abt-hero__title-line">Engineering-led,</span>
              </span>
              <span className="abt-hero__title-mask">
                <span className="abt-hero__title-line abt-hero__title-line--serif">
                  built to work<span className="svc-accent-dot">.</span>
                </span>
              </span>
            </h1>

            <p className="abt-hero__lead">
              ORBIT STUDIO is an engineering-led technology studio. We design and build websites,
              e-commerce platforms, web applications and the backend systems behind them — practical
              digital products shaped around real requirements.
            </p>

            <dl className="abt-hero__meta">
              <div className="abt-hero__meta-item">
                <dt>Disciplines</dt>
                <dd>Six connected services</dd>
              </div>
              <div className="abt-hero__meta-item">
                <dt>Approach</dt>
                <dd>Design and engineering as one</dd>
              </div>
              <div className="abt-hero__meta-item">
                <dt>Focus</dt>
                <dd>Products built to be maintained</dd>
              </div>
            </dl>
          </div>

          <div className="abt-hero__visual" aria-hidden="true">
            <EngineeringCanvas />
          </div>
        </div>
      </section>

      <section className="abt-narrative" aria-label="Our story and mission">
        <div className="svc-container abt-narrative__grid">
          <article className="abt-narrative__col">
            <p className="svc-eyebrow">{STORY.eyebrow}</p>
            <h2 className="abt-narrative__title">
              {STORY.title} <em>{STORY.titleAccent}</em>
            </h2>
            {STORY.paragraphs.map((paragraph) => (
              <p className="abt-narrative__text" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </article>

          <article className="abt-narrative__col">
            <p className="svc-eyebrow">{MISSION.eyebrow}</p>
            <h2 className="abt-narrative__title">{MISSION.title}</h2>
            {MISSION.paragraphs.map((paragraph) => (
              <p className="abt-narrative__text" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </section>

      <section className="abt-beliefs" aria-labelledby="abt-beliefs-title">
        <div className="svc-container">
          <header className="abt-beliefs__head">
            <p className="svc-eyebrow">What we believe</p>
            <h2 className="abt-beliefs__title" id="abt-beliefs-title">
              Principles that shape the work.
            </h2>
            <p className="abt-beliefs__desc">
              The standards we hold ourselves to on every project — from the first conversation to
              the systems we hand over.
            </p>
          </header>

          <ul className="abt-beliefs__grid" role="list">
            {BELIEFS.map((belief) => (
              <li className="abt-belief" key={belief.index}>
                <span className="abt-belief__index">{belief.index}</span>
                <h3 className="abt-belief__title">{belief.title}</h3>
                <p className="abt-belief__text">{belief.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="abt-exp" aria-labelledby="abt-exp-title">
        <div className="svc-container">
          <header className="abt-exp__head">
            <p className="svc-eyebrow">Our expertise</p>
            <h2 className="abt-exp__title" id="abt-exp-title">
              Six disciplines, one engineering practice.
            </h2>
          </header>

          <ol className="abt-exp__list" role="list">
            {SERVICES.map((service) => (
              <li className="abt-exp__row" key={service.id}>
                <Link className="abt-exp__link" to={`/services/${service.slug}`}>
                  <span className="abt-exp__index">{service.index}</span>
                  <span className="abt-exp__main">
                    <span className="abt-exp__name">{service.title}</span>
                    <span className="abt-exp__summary">{service.shortDescription}</span>
                  </span>
                  <span className="abt-exp__arrow" aria-hidden="true">
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
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RelatedProjects
        all
        id="about-work"
        eyebrow="Selected work"
        title="Shipped, not speculated."
        description="A selection of platforms we have designed and built, shown as delivered."
      />

      <ConversionCta
        eyebrow="Start a conversation"
        title="Have something worth building?"
        text="Tell us what you are working with. We will review it and respond with a practical next step — a short conversation is all it takes to begin."
        primaryLabel="Start a project"
        primaryTo="/start-project"
        secondaryLabel="See our services"
        secondaryTo="/services"
      />
    </main>
  )
}
