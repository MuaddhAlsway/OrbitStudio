import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Architecture } from '../../data/caseStudies'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CaseArchitecture({
  number,
  title,
  architecture,
  note,
}: {
  number: string
  title: string
  architecture: Architecture
  note?: string
}) {
  const root = useRef<HTMLElement | null>(null)

  const groups: { label: string; items: string[] }[] = [
    { label: 'Supporting modules', items: architecture.modules ?? [] },
    { label: 'External services', items: architecture.integrations ?? [] },
    { label: 'Deployment', items: architecture.deployment ?? [] },
  ].filter((group) => group.items.length > 0)

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
          .from('.cs-arch__connector', { scaleY: 0, duration: 0.4, stagger: 0.08 }, 0.3)
          .from('.cs-arch__node', { y: 26, opacity: 0, duration: 0.65, stagger: 0.1 }, 0.32)
          .from('.cs-arch__group', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.5)
          .from('.cs-arch__note', { y: 14, opacity: 0, duration: 0.6 }, 0.62)
      })
    },
    { scope: root },
  )

  return (
    <section className="cs-sec cs-arch" ref={root} aria-labelledby="cs-arch-title">
      <div className="svc-container">
        <header className="cs-sec__head">
          <p className="cs-sec__label">
            <span className="cs-sec__num">{number}</span>
            <span className="cs-sec__eyebrow">Architecture</span>
          </p>
          <h2 className="cs-sec__title" id="cs-arch-title">
            <span className="cs-sec__title-mask">
              <span className="cs-sec__title-line">{title}</span>
            </span>
          </h2>
        </header>

        <ol className="cs-arch__stack">
          {architecture.flow.map((layer, i) => (
            <li className="cs-arch__layer" key={layer.label}>
              <div className="cs-arch__node">
                <span className="cs-arch__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="cs-arch__label">{layer.label}</span>
                <ul className="cs-arch__items" role="list">
                  {layer.items.map((item) => (
                    <li className="cs-arch__item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {i < architecture.flow.length - 1 && (
                <span className="cs-arch__connector" aria-hidden="true">
                  <span className="cs-arch__connector-arrow" />
                </span>
              )}
            </li>
          ))}
        </ol>

        {groups.length > 0 && (
          <div className="cs-arch__groups">
            {groups.map((group) => (
              <div className="cs-arch__group" key={group.label}>
                <p className="cs-arch__group-label">{group.label}</p>
                <ul className="cs-arch__items" role="list">
                  {group.items.map((item) => (
                    <li className="cs-arch__item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {note && <p className="cs-arch__note">{note}</p>}
      </div>
    </section>
  )
}
