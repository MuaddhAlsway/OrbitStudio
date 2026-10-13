import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SERVICES } from '../../data/services'
import ServiceVisual from './ServiceVisual'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HOVER_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1024px)'

export default function CapabilitiesIndex() {
  const root = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(0)
  const [canHover, setCanHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(HOVER_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY)
    const onChange = () => setCanHover(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

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
          .from('.svc-cap__eyebrow', { y: 16, opacity: 0, duration: 0.6 }, 0)
          .from('.svc-cap__title-line', { yPercent: 112, duration: 1.05, stagger: 0.12 }, 0.1)
          .from('.svc-cap__desc', { y: 18, opacity: 0, duration: 0.7 }, 0.4)

        gsap.from('.svc-cap__row', {
          yPercent: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.svc-cap__list',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        if (root.current?.querySelector('.svc-cap__preview')) {
          gsap.from('.svc-cap__preview', {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.svc-cap__list',
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      })
    },
    { scope: root },
  )

  return (
    <section className="svc-cap" ref={root} aria-labelledby="svc-cap-title">
      <div className="svc-container">
        <header className="svc-cap__head">
          <p className="svc-cap__eyebrow">What we do</p>
          <h2 className="svc-cap__title" id="svc-cap-title">
            <span className="svc-cap__title-mask">
              <span className="svc-cap__title-line">Capabilities built as</span>
            </span>
            <span className="svc-cap__title-mask">
              <span className="svc-cap__title-line svc-cap__title-line--serif">
                one system<span className="svc-accent-dot">.</span>
              </span>
            </span>
          </h2>
          <p className="svc-cap__desc">
            Six connected disciplines. Each one stands on its own, and together they cover the
            full path from interface to infrastructure.
          </p>
        </header>

        <div className={`svc-cap__body${canHover ? ' is-hover' : ''}`}>
          <ol className="svc-cap__list" role="list">
            {SERVICES.map((service, i) => (
              <li className={`svc-cap__item${canHover && i === active ? ' is-active' : ''}`} key={service.id}>
                <Link
                  className="svc-cap__row"
                  to={`/services/${service.slug}`}
                  onMouseEnter={() => canHover && setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="svc-cap__row-index">{service.index}</span>
                  <span className="svc-cap__row-main">
                    <span className="svc-cap__row-title">{service.title}</span>
                    {!canHover && (
                      <span className="svc-cap__row-summary">{service.shortDescription}</span>
                    )}
                  </span>
                  <span className="svc-cap__row-arrow" aria-hidden="true">
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

          {canHover && (
            <aside className="svc-cap__preview" aria-hidden="true">
              <div className="svc-cap__stage">
                {SERVICES.map((service, i) => (
                  <div className={`svc-cap__figure${i === active ? ' is-active' : ''}`} key={service.id}>
                    <ServiceVisual kind={service.visual} />
                  </div>
                ))}
              </div>

              <div className="svc-cap__preview-meta">
                {SERVICES.map((service, i) => (
                  <div
                    className={`svc-cap__preview-item${i === active ? ' is-active' : ''}`}
                    key={service.id}
                  >
                    <span className="svc-cap__preview-index">{service.index}</span>
                    <span className="svc-cap__preview-title">{service.label}</span>
                    <p className="svc-cap__preview-desc">{service.shortDescription}</p>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
