import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { CaseScopeItem } from '../../data/caseStudies'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CaseScope({
  number,
  title,
  items,
}: {
  number: string
  title: string
  items: CaseScopeItem[]
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
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.from('.cs-sec__label', { y: 14, opacity: 0, duration: 0.55 })
          .from('.cs-sec__title-line', { yPercent: 112, duration: 1, stagger: 0.12 }, 0.08)
          .from('.cs-scope__item', { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.32)
      })
    },
    { scope: root },
  )

  if (items.length === 0) return null

  return (
    <section className="cs-sec cs-scope" ref={root} aria-labelledby="cs-scope-title">
      <div className="svc-container">
        <header className="cs-sec__head">
          <p className="cs-sec__label">
            <span className="cs-sec__num">{number}</span>
            <span className="cs-sec__eyebrow">Engineering scope</span>
          </p>
          <h2 className="cs-sec__title" id="cs-scope-title">
            <span className="cs-sec__title-mask">
              <span className="cs-sec__title-line">{title}</span>
            </span>
          </h2>
        </header>

        <dl className="cs-scope__grid">
          {items.map((item) => (
            <div className="cs-scope__item" key={item.label}>
              <dd className="cs-scope__value">{item.value}</dd>
              <dt className="cs-scope__label">{item.label}</dt>
            </div>
          ))}
        </dl>

        <p className="cs-scope__note">
          Documented implementation scope — a measure of engineering effort, not a business result.
        </p>
      </div>
    </section>
  )
}
