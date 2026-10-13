import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface CaseTextProps {
  id: string
  number: string
  eyebrow: string
  title: string
  paragraphs: string[]
  points?: string[]
}

export default function CaseText({ id, number, eyebrow, title, paragraphs, points }: CaseTextProps) {
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

        tl.from('.cs-text__label', { y: 14, opacity: 0, duration: 0.55 })
          .from('.cs-text__title-line', { yPercent: 112, duration: 1, stagger: 0.12 }, 0.08)
          .from('.cs-text__para', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.34)

        if (points && points.length > 0) {
          tl.from('.cs-text__point', { y: 16, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.5)
        }
      })
    },
    { scope: root },
  )

  return (
    <section className="cs-sec cs-text" id={id} ref={root} aria-labelledby={`${id}-title`}>
      <div className="svc-container cs-text__grid">
        <div className="cs-text__aside">
          <p className="cs-text__label">
            <span className="cs-text__num">{number}</span>
            <span className="cs-text__eyebrow">{eyebrow}</span>
          </p>
          <h2 className="cs-text__title" id={`${id}-title`}>
            <span className="cs-text__title-mask">
              <span className="cs-text__title-line">{title}</span>
            </span>
          </h2>
        </div>

        <div className="cs-text__body">
          {paragraphs.map((paragraph) => (
            <p className="cs-text__para" key={paragraph}>
              {paragraph}
            </p>
          ))}

          {points && points.length > 0 && (
            <ul className="cs-text__points" role="list">
              {points.map((point) => (
                <li className="cs-text__point" key={point}>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
