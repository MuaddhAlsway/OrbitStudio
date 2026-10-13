import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import '../css/Motion.css'

/**
 * Non-blocking page transition.
 *
 * The new route is committed by React immediately — this only fades the
 * content layer in (opacity, no transform, so it never interferes with
 * `position: fixed` pinning or `ScrollTrigger` measurements). Navigation,
 * back/forward and scroll restoration are never delayed.
 */
export default function RouteTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const ref = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return undefined
    }
    if (reduced) return undefined

    const el = ref.current
    if (!el) return undefined

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.42,
        ease: 'power2.out',
        overwrite: true,
        clearProps: 'opacity,visibility',
      },
    )

    return () => {
      tween.kill()
    }
  }, [pathname, reduced])

  return <div className="route-fade" ref={ref}>{children}</div>
}
