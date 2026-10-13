import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { IntroProvider } from '../../motion'
import LoadingWordmark from './LoadingWordmark'
import OctopusScene from './OctopusScene'
import SkipIntroButton from './SkipIntroButton'
import WaterBackground from './WaterBackground'
import '../../css/CinematicLoader.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const INTRO_TIMEOUT_MS = 7000
const REVEAL_LABEL_TIME = 3.85

const BUBBLES = Array.from({ length: 16 }, (_, index) => ({
  left: (index * 6.3 + 4) % 100,
  size: 3 + ((index * 7) % 7),
  dur: 3.2 + ((index * 13) % 22) / 10,
  delay: 0.9 + ((index * 11) % 18) / 10,
  gap: 0.6 + ((index * 5) % 14) / 10,
}))

type Props = {
  children: ReactNode
}

export default function CinematicLoader({ children }: Props) {
  const reduced = useReducedMotion()
  /* The intro plays on every fresh page load (including refresh). It never
     replays on client-side route changes because the loader stays mounted. */
  const [playing, setPlaying] = useState(() => !reduced)

  const rootRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const location = useLocation()
  const initialKeyRef = useRef(location.key)

  const finish = useCallback(() => {
    setPlaying(false)
  }, [])

  useGSAP(
    () => {
      if (!playing || !rootRef.current) return

      try {
        const timeline = gsap.timeline({
          paused: true,
          defaults: { ease: 'power3.out' },
          onComplete: finish,
        })

        timeline.from('.cl-wordmark__char', {
          yPercent: 130,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.045,
        }, 0)
        timeline.from('.cl-wordmark__rule', { scaleX: 0, duration: 0.6, ease: 'power2.inOut' }, 0.18)
        timeline.from('.cl-wordmark__tag', { y: 12, autoAlpha: 0, duration: 0.5 }, 0.32)
        timeline.fromTo('.cl-glow', { opacity: 0.16 }, {
          opacity: 0.48,
          duration: 1.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1,
        }, 0)

        timeline.fromTo('.cl-rise', { yPercent: 100 }, {
          yPercent: 45,
          duration: 1,
          ease: 'power2.out',
        }, 0.6)
        timeline.fromTo('.cl-bubbles', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.9)

        timeline.fromTo('.cl-octo', {
          yPercent: 36,
          autoAlpha: 0,
          scale: 0.82,
          transformOrigin: '50% 62%',
        }, {
          yPercent: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
        }, 1.6)
        timeline.fromTo('.cl-stage', { scale: 1 }, { scale: 1.03, duration: 1.4, ease: 'sine.inOut' }, 1.6)
        timeline.to('.cl-seg', {
          rotation: (_index, element) => Number((element as Element).getAttribute('data-mid')),
          duration: 1.2,
          ease: 'power2.out',
          stagger: { each: 0.012, from: 'start' },
        }, 1.7)

        timeline.to('.cl-seg', {
          rotation: (_index, element) => Number((element as Element).getAttribute('data-reach')),
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: { each: 0.01, from: 'end' },
        }, 3)
        timeline.to('.cl-cup', { autoAlpha: 1, duration: 0.5, stagger: 0.008 }, 3.1)
        timeline.fromTo('.cl-stage', { scale: 1.03 }, { scale: 1, duration: 0.8, ease: 'power2.inOut' }, 3)
        timeline.fromTo('.cl-glass', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 3.05)
        timeline.fromTo('.cl-seam', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 3.05)
        timeline.to('.cl-wordmark', { autoAlpha: 0, y: -26, duration: 0.6 }, 3.15)
        timeline.to('.cl-glass', { autoAlpha: 0, duration: 0.5 }, 3.7)
        timeline.to('.cl-seam', { autoAlpha: 0, duration: 0.5 }, 3.7)

        timeline.addLabel('reveal', REVEAL_LABEL_TIME)

        timeline.to('.cl-octo', { autoAlpha: 0, yPercent: 12, scale: 0.94, duration: 0.9, ease: 'power2.in' }, REVEAL_LABEL_TIME)
        timeline.to('.cl-submerge', { autoAlpha: 0, duration: 0.6 }, REVEAL_LABEL_TIME)
        timeline.to('.cl-bubbles', { autoAlpha: 0, duration: 0.5 }, REVEAL_LABEL_TIME)
        timeline.to('.cl-progress', { autoAlpha: 0, duration: 0.4 }, REVEAL_LABEL_TIME)
        timeline.to('.cl-panel--l', { xPercent: -101, duration: 1, ease: 'power3.inOut' }, REVEAL_LABEL_TIME + 0.05)
        timeline.to('.cl-panel--r', { xPercent: 101, duration: 1, ease: 'power3.inOut' }, REVEAL_LABEL_TIME + 0.05)
        if (rootRef.current) {
          timeline.to(rootRef.current, { autoAlpha: 0, duration: 0.28, ease: 'power1.in' }, 4.62)
        }

        timeline.eventCallback('onUpdate', () => {
          const percent = Math.min(100, Math.round(timeline.progress() * 100))
          if (numberRef.current) numberRef.current.textContent = String(percent).padStart(2, '0')
          if (fillRef.current) fillRef.current.style.transform = `scaleX(${timeline.progress()})`
        })

        BUBBLES.forEach((bubble, index) => {
          gsap.fromTo(
            `.cl-bubble--${index}`,
            { yPercent: 8, autoAlpha: 0 },
            {
              yPercent: -118,
              autoAlpha: 1,
              duration: bubble.dur,
              delay: bubble.delay,
              repeat: -1,
              repeatDelay: bubble.gap,
              ease: 'sine.inOut',
            },
          )
        })

        timelineRef.current = timeline
        timeline.play()
      } catch (error) {
        console.error('[CinematicLoader] intro failed, revealing site immediately', error)
        finish()
      }
    },
    { scope: rootRef, dependencies: [playing], revertOnUpdate: true },
  )

  const skip = useCallback(() => {
    const timeline = timelineRef.current
    if (!timeline) {
      finish()
      return
    }
    timeline.timeScale(1)
    timeline.play()
    timeline.seek('reveal')
  }, [finish])

  useEffect(() => {
    if (!playing) return undefined
    skipRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skip()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [playing, skip])

  useEffect(() => {
    if (!playing) return undefined
    const guard = window.setTimeout(() => {
      if (!timelineRef.current) finish()
    }, 1200)
    const timer = window.setTimeout(() => {
      timelineRef.current?.progress(1)
    }, INTRO_TIMEOUT_MS)
    return () => {
      window.clearTimeout(guard)
      window.clearTimeout(timer)
    }
  }, [playing, finish])

  useEffect(() => {
    if (!playing) return undefined
    const { body, documentElement } = document
    const previousBody = body.style.overflow
    const previousHtml = documentElement.style.overflow
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'
    return () => {
      body.style.overflow = previousBody
      documentElement.style.overflow = previousHtml
    }
  }, [playing])

  useEffect(() => {
    if (!playing) return
    if (location.key !== initialKeyRef.current) finish()
  }, [location, playing, finish])

  /* Re-measure scroll-driven animations once the overlay has lifted. */
  useEffect(() => {
    if (playing) return undefined
    let second = 0
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    return () => {
      window.cancelAnimationFrame(first)
      window.cancelAnimationFrame(second)
    }
  }, [playing])

  return (
    <IntroProvider value={playing ? 'active' : 'ready'}>
      <div className="cl-app" inert={playing || undefined} aria-hidden={playing || undefined}>
        {children}
      </div>

      {playing && (
        <div
          className="cl-intro"
          ref={rootRef}
          role="dialog"
          aria-modal="true"
          aria-label="ORBIT STUDIO intro animation"
        >
          <div className="cl-panels" aria-hidden="true">
            <div className="cl-panel cl-panel--l">
              <div className="cl-panel__inner">
                <WaterBackground />
              </div>
            </div>
            <div className="cl-panel cl-panel--r">
              <div className="cl-panel__inner">
                <WaterBackground />
              </div>
            </div>
          </div>

          <div className="cl-stage" aria-hidden="true">
            <div className="cl-glow" />
            <div className="cl-bubbles">
              {BUBBLES.map((bubble, index) => (
                <span
                  key={index}
                  className={`cl-bubble cl-bubble--${index}`}
                  style={{
                    left: `${bubble.left}%`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                  }}
                />
              ))}
            </div>
            <div className="cl-octo-wrap">
              <OctopusScene />
            </div>
            <div className="cl-submerge cl-rise" />
            <div className="cl-glass" />
            <div className="cl-seam" />
          </div>

          <div className="cl-ui">
            <div className="cl-wordmark-wrap">
              <LoadingWordmark />
            </div>
            <div className="cl-progress" aria-hidden="true">
              <span className="cl-progress__num" ref={numberRef}>
                00
              </span>
              <span className="cl-progress__track">
                <span className="cl-progress__fill" ref={fillRef} />
              </span>
              <span className="cl-progress__pct">%</span>
            </div>
          </div>

          <SkipIntroButton ref={skipRef} onClick={skip} />
        </div>
      )}
    </IntroProvider>
  )
}
