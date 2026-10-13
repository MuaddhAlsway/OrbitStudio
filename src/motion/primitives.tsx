import { useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import '../css/Motion.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ------------------------------------------------------------------ */
/*  Shared option model                                               */
/* ------------------------------------------------------------------ */

export interface RevealOptions {
  /** Vertical travel in pixels (ignored by TextReveal/ImageReveal). */
  y?: number
  duration?: number
  delay?: number
  /** ScrollTrigger start, e.g. 'top 82%'. */
  start?: string
  /** Play a single time instead of reversing when scrolled back up. */
  once?: boolean
}

interface BaseProps extends RevealOptions {
  children: ReactNode
  as?: ElementType
  className?: string
  id?: string
}

const scrollTriggerFor = (trigger: Element | null, start: string, once: boolean) => ({
  trigger,
  start,
  toggleActions: once ? 'play none none none' : 'play none none reverse',
})

function reduceArmed(reduced: boolean, add: () => void): void {
  // Reduced-motion visitors get the settled layout with no tween at all.
  if (!reduced) add()
}

/* ------------------------------------------------------------------ */
/*  FadeUp / SectionReveal                                            */
/* ------------------------------------------------------------------ */

function useSingleReveal<T extends HTMLElement>(
  { y = 24, duration = 0.8, delay = 0, start = 'top 84%', once = false }: RevealOptions,
) {
  const root = useRef<T | null>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      reduceArmed(reduced, () => {
        gsap.from(el, {
          y,
          autoAlpha: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: scrollTriggerFor(el, start, once),
        })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return root
}

export function FadeUp({ children, as: Tag = 'div', className = '', ...options }: BaseProps) {
  const root = useSingleReveal<HTMLElement>(options)
  return (
    <Tag ref={root} className={`mr-fade-up ${className}`.trim()}>
      {children}
    </Tag>
  )
}

export function SectionReveal({
  children,
  as: Tag = 'section',
  className = '',
  ...options
}: BaseProps & { y?: number }) {
  const root = useSingleReveal<HTMLElement>({ start: 'top 80%', duration: 0.9, ...options })
  return (
    <Tag ref={root} className={`mr-section-reveal ${className}`.trim()}>
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  StaggerReveal — animates its direct element children              */
/* ------------------------------------------------------------------ */

export interface StaggerRevealProps extends BaseProps {
  stagger?: number
  childSelector?: string
}

export function StaggerReveal({
  children,
  as: Tag = 'div',
  className = '',
  y = 26,
  duration = 0.7,
  delay = 0,
  stagger = 0.08,
  start = 'top 84%',
  once = false,
  childSelector,
}: StaggerRevealProps) {
  const root = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const targets = childSelector
        ? gsap.utils.toArray<HTMLElement>(childSelector, el)
        : Array.from(el.children) as HTMLElement[]
      if (targets.length === 0) return
      reduceArmed(reduced, () => {
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: scrollTriggerFor(el, start, once),
        })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <Tag ref={root} className={`mr-stagger ${className}`.trim()}>
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  TextReveal — word-by-word mask reveal from a string               */
/* ------------------------------------------------------------------ */

export interface TextRevealProps {
  text: string
  as?: ElementType
  className?: string
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  once?: boolean
}

export function TextReveal({
  text,
  as: Tag = 'span',
  className = '',
  duration = 0.85,
  delay = 0,
  stagger = 0.055,
  start = 'top 85%',
  once = false,
}: TextRevealProps) {
  const root = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()
  const words = text.split(' ')

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const targets = gsap.utils.toArray<HTMLElement>('.mr-text__word', el)
      if (targets.length === 0) return
      reduceArmed(reduced, () => {
        gsap.from(targets, {
          yPercent: 118,
          autoAlpha: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: scrollTriggerFor(el, start, once),
        })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <Tag ref={root} className={`mr-text ${className}`.trim()} aria-label={text}>
      {words.map((word, index) => (
        <span className="mr-text__mask" aria-hidden="true" key={`${word}-${index}`}>
          <span className="mr-text__word">{word}</span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  ImageReveal — clip-path wipe + settle scale                       */
/* ------------------------------------------------------------------ */

export interface ImageRevealProps extends BaseProps {
  /** Applied to an inner wrapper so the media can scale without clipping. */
  mediaClassName?: string
}

export function ImageReveal({
  children,
  as: Tag = 'div',
  className = '',
  mediaClassName = '',
  duration = 1.15,
  delay = 0,
  start = 'top 82%',
  once = false,
}: ImageRevealProps) {
  const root = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const media = el.querySelector<HTMLElement>('.mr-image__media')
      reduceArmed(reduced, () => {
        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.12 },
            { scale: 1, duration, delay, ease: 'power3.out', scrollTrigger: scrollTriggerFor(el, start, once) },
          )
        }
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration,
            delay,
            ease: 'power3.inOut',
            scrollTrigger: scrollTriggerFor(el, start, once),
          },
        )
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <Tag ref={root} className={`mr-image ${className}`.trim()}>
      <span className={`mr-image__media ${mediaClassName}`.trim()}>{children}</span>
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  SubtleParallax — small scrubbed translate                          */
/* ------------------------------------------------------------------ */

export interface SubtleParallaxProps extends BaseProps {
  /** Total travel in pixels across the scroll range. */
  amount?: number
}

export function SubtleParallax({
  children,
  as: Tag = 'div',
  className = '',
  amount = 26,
}: SubtleParallaxProps) {
  const root = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      reduceArmed(reduced, () => {
        gsap.fromTo(
          el,
          { y: amount / 2 },
          {
            y: -amount / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <Tag ref={root} className={`mr-parallax ${className}`.trim()}>
      {children}
    </Tag>
  )
}
