import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '../css/Hero.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ------------------------------------------------------------------ */
/*  Precision-instrument geometry (the signature visual)               */
/* ------------------------------------------------------------------ */

const CX = 300
const CY = 300

const polar = (radius: number, degrees: number): [number, number] => {
  const radians = ((degrees - 90) * Math.PI) / 180
  return [CX + radius * Math.cos(radians), CY + radius * Math.sin(radians)]
}

const TICKS = Array.from({ length: 90 }, (_, index) => {
  const degrees = index * 4
  const outer = index % 15 === 0 ? 288 : index % 5 === 0 ? 276 : 266
  const [x1, y1] = polar(250, degrees)
  const [x2, y2] = polar(outer, degrees)
  return { x1, y1, x2, y2 }
})

const arcPath = (radius: number, start: number, end: number): string => {
  const [sx, sy] = polar(radius, start)
  const [ex, ey] = polar(radius, end)
  const large = end - start > 180 ? 1 : 0
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`
}

const [markerX, markerY] = polar(250, 34)
const [nodeX, nodeY] = polar(140, 205)

function Instrument() {
  return (
    <svg viewBox="0 0 600 600" role="presentation" aria-hidden="true" focusable="false">
      <g>
        <circle className="hero-ring hero-ring--faint" cx={CX} cy={CY} r={286} pathLength={1} vectorEffect="non-scaling-stroke" />
        <circle className="hero-ring" cx={CX} cy={CY} r={250} pathLength={1} vectorEffect="non-scaling-stroke" />
        <circle className="hero-ring hero-ring--dashed" cx={CX} cy={CY} r={196} vectorEffect="non-scaling-stroke" />
        <circle className="hero-ring hero-ring--faint" cx={CX} cy={CY} r={140} pathLength={1} vectorEffect="non-scaling-stroke" />
        <circle className="hero-ring" cx={CX} cy={CY} r={72} pathLength={1} vectorEffect="non-scaling-stroke" />
      </g>

      <g className="hero-ticks">
        {TICKS.map((tick, index) => (
          <line
            key={index}
            className="hero-tick"
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      <path className="hero-arc" d={arcPath(268, -64, 16)} pathLength={1} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      <path className="hero-arc hero-arc--thin" d={arcPath(232, 122, 212)} pathLength={1} strokeWidth={1} vectorEffect="non-scaling-stroke" />

      <g className="hero-core">
        <path
          className="hero-core__mark"
          d={`M ${CX} ${CY - 15} L ${CX + 15} ${CY} L ${CX} ${CY + 15} L ${CX - 15} ${CY} Z`}
          vectorEffect="non-scaling-stroke"
        />
        <circle className="hero-node" cx={CX} cy={CY} r={3} />
      </g>

      <circle className="hero-node hero-node--accent" cx={markerX} cy={markerY} r={3.5} />
      <circle className="hero-node" cx={nodeX} cy={nodeY} r={2.5} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      /* ---- Entrance sequence (motion-safe only) ---------------- */
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

        intro
          .from('.hero-grid', { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
          .from('.hero-eyebrow__line', { y: 18, opacity: 0, duration: 0.7, stagger: 0.09 }, 0.18)
          .from(
            '.hero-headline__line',
            { yPercent: 115, duration: 1.15, stagger: 0.12, ease: 'power4.out' },
            0.34,
          )
          .from('.hero-desc', { y: 22, opacity: 0, duration: 0.8 }, 0.78)
          .from('.hero-cta', { y: 18, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.92)
          .from('.hero-visual__inner', { opacity: 0, duration: 0.9 }, 0.66)
          .from(
            '.hero-ring',
            { strokeDashoffset: 1, duration: 1.4, stagger: 0.12, ease: 'power2.inOut' },
            0.78,
          )
          .from(
            '.hero-tick',
            { opacity: 0, duration: 0.6, stagger: { each: 0.004, from: 'random' } },
            0.98,
          )
          .from('.hero-arc', { strokeDashoffset: 1, opacity: 0, duration: 1, ease: 'power2.out' }, 1.08)
          .from('.hero-core', { opacity: 0, duration: 0.7 }, 1.2)
          .from('.hero-visual__label', { opacity: 0, y: 10, duration: 0.6 }, 1.5)
          .from('.hero-scroll', { opacity: 0, y: 12, duration: 0.7 }, 1.58)
      })

      /* ---- Desktop: pinned cinematic scroll ------------------- */
      mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none', immediateRender: false },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=135%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.fromTo('.hero-headline', { yPercent: 0, scale: 1 }, { yPercent: -16, scale: 0.95, transformOrigin: 'left center' }, 0)
          .fromTo('.hero-eyebrow', { y: 0, opacity: 1 }, { y: -44, opacity: 0 }, 0)
          .fromTo('.hero-lower', { y: 0, opacity: 1 }, { y: -96, opacity: 0 }, 0)
          .fromTo('.hero-visual', { rotate: 0, scale: 1, x: 0 }, { rotate: 40, scale: 1.07, x: -80 }, 0)
          .to('.hero-grid', { opacity: 0.35 }, 0)
          .to('.hero-scroll', { opacity: 0 }, 0)
          /* cinematic exit */
          .to('.hero-headline__mask', { yPercent: -120 }, 0.62)
      })

      /* ---- Tablet: light parallax, no pin --------------------- */
      mm.add(
        '(min-width: 641px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const tl = gsap.timeline({
            defaults: { ease: 'none', immediateRender: false },
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
          })
          tl.fromTo('.hero-headline', { yPercent: 0 }, { yPercent: -10 }, 0)
            .fromTo('.hero-visual', { rotate: 0, scale: 1 }, { rotate: 24, scale: 1.04 }, 0)
            .fromTo('.hero-lower', { y: 0, opacity: 1 }, { y: -44, opacity: 0.15 }, 0)
        },
      )

      /* Refresh once webfonts have settled so pin distances are exact */
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh())
      }
    },
    { scope: root },
  )

  return (
    <section className="hero" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-vignette" />
      </div>

      <div className="hero-inner">
        <p className="hero-eyebrow">
          <span className="hero-eyebrow__line">Independent technology studio</span>
          <span className="hero-eyebrow__line">Based in Saudi Arabia</span>
        </p>

        <h1 className="hero-headline">
          <span className="hero-headline__mask">
            <span className="hero-headline__line">We build</span>
          </span>
          <span className="hero-headline__mask">
            <span className="hero-headline__line hero-headline__line--serif">
              what&rsquo;s next<span className="hero-headline__dot">.</span>
            </span>
          </span>
        </h1>

        <div className="hero-lower">
          <p className="hero-desc">
            We design and engineer digital products, intelligent platforms, and
            scalable software for ambitious businesses.
          </p>
          <div className="hero-ctas">
            <Link className="hero-cta hero-cta--primary" to="/start-project">
              Start a project
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
            <a className="hero-cta hero-cta--ghost" href="#work">
              Explore our work
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual__inner">
            <Instrument />
          </div>
          <span className="hero-visual__label">Riyadh — 24.71&deg;N / 46.67&deg;E</span>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll__line" />
        <span className="hero-scroll__text">Scroll to explore</span>
      </div>
    </section>
  )
}
