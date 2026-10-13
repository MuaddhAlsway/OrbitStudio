import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useIntroReady } from '../motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PROCESS_STAGES } from '../data/process'
import ProcessTimeline from '../components/process/ProcessTimeline'
import ConversionCta from '../components/services/ConversionCta'
import '../css/Process.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function ProcessArc() {
  const nodes = PROCESS_STAGES.map((stage, i) => ({
    index: stage.index,
    x: 60 + i * 80,
    active: i === 2,
  }))

  return (
    <svg viewBox="0 0 520 200" role="img" aria-label="Six connected process stages" focusable="false">
      <line className="prc-arc__line" x1="60" y1="110" x2="460" y2="110" />
      <line className="prc-arc__progress" x1="60" y1="110" x2="220" y2="110" />
      {nodes.map((node) => (
        <g key={node.index} transform={`translate(${node.x} 110)`}>
          <line className="prc-arc__stem" x1="0" y1="-22" x2="0" y2="-52" />
          <circle className={node.active ? 'prc-arc__node prc-arc__node--active' : 'prc-arc__node'} r="22" />
          <text className="prc-arc__index" textAnchor="middle" dy="5">
            {node.index}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function Process() {
  const root = useRef<HTMLElement | null>(null)
  const introReady = useIntroReady()

  usePageMeta(
    'Our Process',
    'How ORBIT STUDIO takes a project from idea to working software: discovery, requirements and planning, architecture and design, development, testing and validation, and deployment and handover.',
  )

  useGSAP(
    () => {
      if (!introReady) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.prc-eyebrow', { y: 16, opacity: 0, duration: 0.6 })
          .from('.prc-hero__title-line', { yPercent: 112, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.08)
          .from('.prc-hero__lead', { y: 20, opacity: 0, duration: 0.8 }, 0.42)
          .from('.prc-hero__ctas > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.54)
          .from('.prc-arc__line', { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'power3.inOut' }, 0.4)
          .from('.prc-arc__progress', { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'power3.inOut' }, 0.6)
          .from('.prc-arc__stem', { scaleY: 0, transformOrigin: 'bottom center', duration: 0.5, stagger: 0.06 }, 0.7)
          .from('.prc-arc__node', { scale: 0, opacity: 0, transformOrigin: 'center', duration: 0.6, stagger: 0.07 }, 0.8)
          .from('.prc-arc__index', { opacity: 0, duration: 0.6 }, 0.9)
      })
    },
    { scope: root, dependencies: [introReady], revertOnUpdate: true },
  )

  return (
    <main className="proc-page" id="process" ref={root}>
      <div className="prc__bg" aria-hidden="true">
        <div className="prc__grid" />
        <div className="prc__glow" />
      </div>

      <section className="prc-hero">
        <div className="svc-container prc-hero__inner">
          <div className="prc-hero__copy">
            <p className="svc-eyebrow prc-eyebrow">Our process</p>

            <h1 className="prc-hero__title">
              <span className="prc-hero__title-mask">
                <span className="prc-hero__title-line">From idea to</span>
              </span>
              <span className="prc-hero__title-mask">
                <span className="prc-hero__title-line prc-hero__title-line--serif">
                  working software<span className="svc-accent-dot">.</span>
                </span>
              </span>
            </h1>

            <p className="prc-hero__lead">
              Every project follows one defined path: understand the problem, plan the system, build
              it in reviewable stages, validate it, then deploy a product the team can run. The
              depth of each stage is shaped by the work itself.
            </p>

            <div className="prc-hero__ctas">
              <a className="svc-btn svc-btn--primary" href="#process-timeline">
                Explore the six stages
                <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
                  <path
                    d="M8.25 3.25v9.5M3.75 8.5 8.25 13l4.5-4.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <Link className="svc-btn svc-btn--ghost" to="/start-project">
                Start a project
              </Link>            </div>
          </div>

          <div className="prc-hero__visual" aria-hidden="true">
            <ProcessArc />
          </div>
        </div>
      </section>

      <div id="process-timeline">
        <ProcessTimeline />
      </div>

      <ConversionCta
        eyebrow="Next step"
        title="Ready to move from idea to working software?"
        text="Share what you are working on. We will help define the scope, plan the build and take it through the same process — stage by stage."
        primaryLabel="Discuss your project"
        primaryTo="/start-project"
        secondaryLabel="Explore our services"
        secondaryTo="/services"
      />
    </main>
  )
}
