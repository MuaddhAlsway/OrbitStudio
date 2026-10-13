import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Service } from '../../data/services'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ServiceCapabilities({ service }: { service: Service }) {
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
          .from('.sdp-sec__lead', { y: 18, opacity: 0, duration: 0.7 }, 0.34)
          .from('.sdp-cap', { y: 30, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.4)
      })
    },
    { scope: root },
  )

  return (
    <section className="sdp-sec sdp-build" ref={root} aria-labelledby="sdp-build-title">
      <div className="sdp-container">
        <header className="sdp-sec__head">
          <p className="sdp-sec__eyebrow">What we build</p>
          <h2 className="sdp-sec__title" id="sdp-build-title">
            <span className="sdp-sec__title-mask">
              <span className="sdp-sec__title-line">{service.title}</span>
            </span>
          </h2>
          <p className="sdp-sec__lead">{service.positioning}</p>
        </header>

        <ul className="sdp-caps" role="list">
          {service.capabilities.map((capability, i) => (
            <li className="sdp-cap" key={capability.title}>
              <span className="sdp-cap__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="sdp-cap__title">{capability.title}</h3>
              <p className="sdp-cap__text">{capability.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
