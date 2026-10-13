import { useCallback, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PROCESS_STAGES } from '../../data/process'
import ProcessVisual from './ProcessVisual'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ProcessTimeline() {
  const root = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(0)

  const goTo = useCallback((index: number) => {
    setActive(index)
    const stage = PROCESS_STAGES[index]
    const el = document.getElementById(`process-stage-${stage.index}`)
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const head = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: '.prc-tl__head',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        head
          .from('.svc-eyebrow', { y: 14, opacity: 0, duration: 0.6 })
          .from('.prc-tl__title-line', { yPercent: 112, duration: 1.05, stagger: 0.12 }, 0.08)
          .from('.prc-tl__desc', { y: 18, opacity: 0, duration: 0.7 }, 0.34)
          .from('.prc-tl__tab', { y: 14, opacity: 0, duration: 0.5, stagger: 0.05 }, 0.42)

        gsap.fromTo(
          '.prc-tl__spine-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: '.prc-tl__stages',
              start: 'top 72%',
              end: 'bottom 78%',
              scrub: true,
            },
          },
        )

        const stages = gsap.utils.toArray<HTMLElement>('.prc-stage', root.current)

        stages.forEach((stage, i) => {
          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: stage,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          })

          tl.from(stage.querySelector('.prc-stage__marker'), {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            transformOrigin: 'center',
          })
            .from(stage.querySelector('.prc-stage__connector'), {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 0.5,
            })
            .from(
              stage.querySelector('.prc-stage__card'),
              { y: 34, opacity: 0, duration: 0.8 },
              0.05,
            )
            .from(
              stage.querySelectorAll('.prc-dg__accent, .prc-dg__dot--accent'),
              { opacity: 0, scale: 0.6, transformOrigin: 'center', duration: 0.6, stagger: 0.08 },
              0.4,
            )

        ScrollTrigger.create({
          trigger: stage,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="prc-tl" ref={root} aria-labelledby="prc-tl-title">
      <div className="svc-container">
        <header className="prc-tl__head">
          <p className="svc-eyebrow">The process</p>
          <h2 className="prc-tl__title" id="prc-tl-title">
            <span className="prc-tl__title-mask">
              <span className="prc-tl__title-line">Six stages, one</span>
            </span>
            <span className="prc-tl__title-mask">
              <span className="prc-tl__title-line prc-tl__title-line--serif">
                continuous process<span className="svc-accent-dot">.</span>
              </span>
            </span>
          </h2>
          <p className="prc-tl__desc">
            A consistent path from the first conversation to a deployed, documented product. The
            depth of each stage is shaped by the work, not a fixed template.
          </p>
        </header>

        <nav className="prc-tl__nav" aria-label="Jump to a process stage">
          {PROCESS_STAGES.map((stage, i) => (
            <button
              type="button"
              className={`prc-tl__tab${active === i ? ' is-active' : ''}`}
              key={stage.index}
              onClick={() => goTo(i)}
              aria-current={active === i ? 'true' : undefined}
            >
              <span className="prc-tl__tab-index">{stage.index}</span>
              <span className="prc-tl__tab-title">{stage.title}</span>
            </button>
          ))}
        </nav>

        <div className="prc-tl__track">
          <span className="prc-tl__spine" aria-hidden="true">
            <span className="prc-tl__spine-fill" />
          </span>

          <ol className="prc-tl__stages" role="list">
            {PROCESS_STAGES.map((stage, i) => (
            <li
              className={`prc-stage${active === i ? ' is-active' : ''}`}
              id={`process-stage-${stage.index}`}
              key={stage.index}
            >
              <div className="prc-stage__marker" aria-hidden="true">
                <span className="prc-stage__marker-index">{stage.index}</span>
                <span className="prc-stage__dot" />
                <span className="prc-stage__connector" />
              </div>

              <article className="prc-stage__card">
                <header className="prc-stage__head">
                  <span className="prc-stage__index">Stage {stage.index}</span>
                  <h3 className="prc-stage__title">{stage.title}</h3>
                  <p className="prc-stage__summary">{stage.summary}</p>
                </header>

                <div className="prc-stage__visual">
                  <ProcessVisual kind={stage.key} />
                </div>

                <div className="prc-stage__cols">
                  <div className="prc-stage__col">
                    <h4 className="prc-stage__label">Key activities</h4>
                    <ul className="prc-stage__list">
                      {stage.activities.map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="prc-stage__col">
                    <h4 className="prc-stage__label">Typical deliverables</h4>
                    <ul className="prc-stage__list prc-stage__list--deliverables">
                      {stage.deliverables.map((deliverable) => (
                        <li key={deliverable}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
