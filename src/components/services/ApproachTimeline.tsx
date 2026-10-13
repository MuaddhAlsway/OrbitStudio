import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { APPROACH_PHASES } from '../../data/services'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ApproachTimeline() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 74%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.from('.svc-approach__title-line', { yPercent: 112, duration: 1.05, stagger: 0.12 }, 0).from(
          '.svc-approach__desc',
          { y: 18, opacity: 0, duration: 0.7 },
          0.3,
        )

        gsap.from('.svc-approach__item', {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.svc-approach__list',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="svc-approach" ref={root} aria-labelledby="svc-approach-title">
      <div className="svc-container svc-approach__inner">
        <header className="svc-approach__head">
          <p className="svc-approach__eyebrow">Our approach</p>
          <h2 className="svc-approach__title" id="svc-approach-title">
            <span className="svc-approach__title-mask">
              <span className="svc-approach__title-line">From complexity</span>
            </span>
            <span className="svc-approach__title-mask">
              <span className="svc-approach__title-line svc-approach__title-line--serif">
                to clarity<span className="svc-accent-dot">.</span>
              </span>
            </span>
          </h2>
          <p className="svc-approach__desc">
            Five phases that keep a project understandable from first conversation to launch. The
            depth of each phase is shaped by the work, not a fixed timeline.
          </p>
        </header>

        <ol className="svc-approach__list" role="list">
          {APPROACH_PHASES.map((phase) => (
            <li className="svc-approach__item" key={phase.index}>
              <span className="svc-approach__index">{phase.index}</span>
              <div className="svc-approach__content">
                <h3 className="svc-approach__name">{phase.title}</h3>
                <p className="svc-approach__text">{phase.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
