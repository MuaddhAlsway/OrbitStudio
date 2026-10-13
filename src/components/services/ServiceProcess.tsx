import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Service } from '../../data/services'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ServiceProcess({ service }: { service: Service }) {
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

        gsap.from('.sdp-step', {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sdp-process',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="sdp-sec sdp-process-sec" ref={root} aria-labelledby="sdp-process-title">
      <div className="sdp-container">
        <header className="sdp-sec__head">
          <p className="sdp-sec__eyebrow">How we engineer it</p>
          <h2 className="sdp-sec__title" id="sdp-process-title">
            <span className="sdp-sec__title-mask">
              <span className="sdp-sec__title-line">A method, not a script</span>
            </span>
          </h2>
          <p className="sdp-sec__lead">
            Every engagement follows the same principles, adapted to the shape of the problem.
          </p>
        </header>

        <ol className="sdp-process" role="list">
          {service.engineeringApproach.map((step) => (
            <li className="sdp-step" key={step.title}>
              <span className="sdp-step__index">{step.index}</span>
              <div className="sdp-step__content">
                <h3 className="sdp-step__title">{step.title}</h3>
                <p className="sdp-step__text">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
