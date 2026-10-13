import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const LAYERS = [
  { label: 'Experience', note: 'Websites, applications and interfaces people use' },
  { label: 'Application', note: 'Business logic and workflows behind each screen' },
  { label: 'API', note: 'The contracts that connect the parts together' },
  { label: 'Data', note: 'Structure and persistence for everything the system knows' },
  { label: 'Infrastructure', note: 'Hosting, deployment and the environments it runs on' },
]

export default function EngineeringDiagram() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.from('.svc-diagram__title-line', { yPercent: 112, duration: 1.05, stagger: 0.12 }, 0)
          .from('.svc-diagram__desc', { y: 18, opacity: 0, duration: 0.7 }, 0.3)
          .from(
            '.svc-diagram__node',
            { yPercent: 24, opacity: 0, duration: 0.7, stagger: 0.12 },
            0.36,
          )
          .from('.svc-diagram__connector', { scale: 0, duration: 0.5, stagger: 0.12 }, 0.5)
      })
    },
    { scope: root },
  )

  return (
    <section className="svc-diagram" ref={root} aria-labelledby="svc-diagram-title">
      <div className="svc-container">
        <header className="svc-diagram__head">
          <p className="svc-diagram__eyebrow">How it fits together</p>
          <h2 className="svc-diagram__title" id="svc-diagram-title">
            <span className="svc-diagram__title-mask">
              <span className="svc-diagram__title-line">Built as one</span>
            </span>
            <span className="svc-diagram__title-mask">
              <span className="svc-diagram__title-line svc-diagram__title-line--serif">
                connected system<span className="svc-accent-dot">.</span>
              </span>
            </span>
          </h2>
          <p className="svc-diagram__desc">
            A digital product is rarely one technology. It is a chain of decisions that run from
            the interface people touch down to the infrastructure it depends on.
          </p>
        </header>

        <ol className="svc-diagram__flow" role="list">
          {LAYERS.map((layer, i) => (
            <li className="svc-diagram__step" key={layer.label}>
              <div className="svc-diagram__node" tabIndex={0} role="listitem" aria-label={`${layer.label}: ${layer.note}`}>
                <span className="svc-diagram__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc-diagram__label">{layer.label}</span>
                <span className="svc-diagram__note">{layer.note}</span>
              </div>
              {i < LAYERS.length - 1 && (
                <span className="svc-diagram__connector" aria-hidden="true">
                  <span className="svc-diagram__signal" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
