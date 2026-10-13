import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Keeps scroll position predictable across route changes:
 * - Push/replace: land at the top of the new page.
 * - Pop (back/forward): restore the scroll position that page had.
 * - Hash links (e.g. /#work): scroll to the matching section.
 * Afterwards ScrollTrigger is refreshed so pinned/scrubbed timelines are
 * measured against the new layout instead of the previous route's.
 */
export default function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const positions = useRef(new Map<string, number>())
  const lastKey = useRef(location.key)

  useEffect(() => {
    positions.current.set(lastKey.current, window.scrollY)
    lastKey.current = location.key

    let secondFrame = 0
    const firstFrame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const id = decodeURIComponent(location.hash.slice(1))
        const target = document.getElementById(id)
        if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' })
        else window.scrollTo(0, 0)
      } else if (navigationType === 'POP') {
        const saved = positions.current.get(location.key)
        if (typeof saved === 'number') window.scrollTo(0, saved)
        else window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, 0)
      }

      secondFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [location.key, location.pathname, location.hash, navigationType])

  return null
}
