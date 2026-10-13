import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SERVICES } from '../../data/services'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ------------------------------------------------------------------ */
/*  Hero visual — the six capabilities as a connected lattice          */
/* ------------------------------------------------------------------ */

const CENTER = 220
const RADIUS = 150

function Lattice() {
  const nodes = SERVICES.map((service, i) => {
    const angle = (Math.PI * 2 * i) / SERVICES.length - Math.PI / 2
    return {
      index: service.index,
      label: service.label,
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    }
  })

  return (
    <svg viewBox="0 0 440 440" role="img" aria-label="Six capability areas connected as one system" focusable="false">
      <circle className="svc-lattice__ring" cx={CENTER} cy={CENTER} r={RADIUS} />
      <circle className="svc-lattice__ring svc-lattice__ring--faint" cx={CENTER} cy={CENTER} r={RADIUS + 34} />
      <circle className="svc-lattice__ring svc-lattice__ring--dashed" cx={CENTER} cy={CENTER} r={RADIUS - 46} />

      {nodes.map((node) => (
        <line
          key={`line-${node.index}`}
          className="svc-lattice__link"
          x1={CENTER}
          y1={CENTER}
          x2={node.x}
          y2={node.y}
        />
      ))}

      <circle className="svc-lattice__core" cx={CENTER} cy={CENTER} r={30} />
      <circle className="svc-lattice__core-dot" cx={CENTER} cy={CENTER} r={5} />

      {nodes.map((node) => (
        <g key={node.index} transform={`translate(${node.x} ${node.y})`}>
          <circle className="svc-lattice__node" r={26} />
          <text className="svc-lattice__node-index" textAnchor="middle" dy="5">
            {node.index}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesHero() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.svc-eyebrow', { y: 16, opacity: 0, duration: 0.6 })
          .from('.svc-hero__title-line', { yPercent: 112, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.1)
          .from('.svc-hero__lead', { y: 20, opacity: 0, duration: 0.8 }, 0.42)
          .from('.svc-hero__ctas > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.54)
          .from('.svc-lattice__ring', { opacity: 0, duration: 1, stagger: 0.12 }, 0.5)
          .from('.svc-lattice__link', { opacity: 0, duration: 0.6, stagger: 0.05 }, 0.7)
          .from('.svc-lattice__node', { scale: 0, opacity: 0, duration: 0.6, stagger: 0.06, transformOrigin: 'center' }, 0.8)
          .from('.svc-lattice__node-index', { opacity: 0, duration: 0.4, stagger: 0.06 }, 1.0)
          .from('.svc-lattice__core', { scale: 0, opacity: 0, duration: 0.7, transformOrigin: 'center' }, 0.7)
      })
    },
    { scope: root },
  )

  return (
    <section className="svc-hero" ref={root} aria-labelledby="svc-hero-title">
      <div className="svc-hero__bg" aria-hidden="true">
        <div className="svc-hero__grid" />
        <div className="svc-hero__glow" />
      </div>

      <div className="svc-container svc-hero__inner">
        <div className="svc-hero__copy">
          <p className="svc-eyebrow">Our Capabilities</p>

          <h1 className="svc-hero__title" id="svc-hero-title">
            <span className="svc-hero__title-mask">
              <span className="svc-hero__title-line">Technology built around</span>
            </span>
            <span className="svc-hero__title-mask">
              <span className="svc-hero__title-line svc-hero__title-line--serif">
                real business needs<span className="svc-accent-dot">.</span>
              </span>
            </span>
          </h1>

          <p className="svc-hero__lead">
            From customer-facing platforms to the systems behind them, we engineer digital
            solutions that make businesses more capable.
          </p>

          <div className="svc-hero__ctas">
            <Link className="svc-btn svc-btn--primary" to="/start-project">
              Start a Project
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
                <path
                  d="M4.75 11.25 11.25 4.75M6 4.75h5.25V10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link className="svc-btn svc-btn--ghost" to="/#work">
              Explore Our Work
            </Link>
          </div>
        </div>

        <div className="svc-hero__visual" aria-hidden="true">
          <div className="svc-hero__lattice">
            <Lattice />
          </div>
          <span className="svc-hero__visual-label">One connected engineering system</span>
        </div>
      </div>
    </section>
  )
}
