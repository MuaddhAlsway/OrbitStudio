import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Service } from '../../data/services'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ServiceArchitecture({ service }: { service: Service }) {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.from('.sdp-sec__eyebrow', { y: 14, opacity: 0, duration: 0.55 })
          .from('.sdp-sec__title-line', { yPercent: 112, duration: 1, stagger: 0.12 }, 0.08)
          .from('.sdp-arch__node', { yPercent: 22, opacity: 0, duration: 0.65, stagger: 0.1 }, 0.36)
          .from('.sdp-arch__connector', { scale: 0, duration: 0.45, stagger: 0.1 }, 0.5)
      })
    },
    { scope: root },
  )

  return (
    <section className="sdp-sec sdp-arch-sec" ref={root} aria-labelledby="sdp-arch-title">
      <div className="sdp-container">
        <header className="sdp-sec__head">
          <p className="sdp-sec__eyebrow">System visualisation</p>
          <h2 className="sdp-sec__title" id="sdp-arch-title">
            <span className="sdp-sec__title-mask">
              <span className="sdp-sec__title-line">{service.architecture.title}</span>
            </span>
          </h2>
          <p className="sdp-sec__lead">
            A simplified view of the path this work follows from the first layer to the last.
          </p>
        </header>

        <ol className="sdp-arch" role="list">
          {service.architecture.steps.map((step, i) => (
            <li className="sdp-arch__step" key={step.label}>
              <div
                className="sdp-arch__node"
                tabIndex={0}
                role="listitem"
                aria-label={`${step.label}: ${step.note}`}
              >
                <span className="sdp-arch__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="sdp-arch__label">{step.label}</span>
                <span className="sdp-arch__note">{step.note}</span>
              </div>
              {i < service.architecture.steps.length - 1 && (
                <span className="sdp-arch__connector" aria-hidden="true">
                  <span className="sdp-arch__signal" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
