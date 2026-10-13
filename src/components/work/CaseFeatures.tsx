import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CaseFeatures({
  number,
  title,
  features,
}: {
  number: string
  title: string
  features: string[]
}) {
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

        tl.from('.cs-sec__label', { y: 14, opacity: 0, duration: 0.55 })
          .from('.cs-sec__title-line', { yPercent: 112, duration: 1, stagger: 0.12 }, 0.08)
          .from('.cs-feature', { y: 26, opacity: 0, duration: 0.65, stagger: 0.07 }, 0.32)
      })
    },
    { scope: root },
  )

  return (
    <section className="cs-sec cs-features" ref={root} aria-labelledby="cs-features-title">
      <div className="svc-container">
        <header className="cs-sec__head">
          <p className="cs-sec__label">
            <span className="cs-sec__num">{number}</span>
            <span className="cs-sec__eyebrow">Key features</span>
          </p>
          <h2 className="cs-sec__title" id="cs-features-title">
            <span className="cs-sec__title-mask">
              <span className="cs-sec__title-line">{title}</span>
            </span>
          </h2>
        </header>

        <ul className="cs-features__grid" role="list">
          {features.map((feature, i) => (
            <li className="cs-feature" key={feature}>
              <span className="cs-feature__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="cs-feature__title">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
