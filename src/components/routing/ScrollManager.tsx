import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Keeps scroll position predictable across route changes:
 * - Land at the top of a new page.
 * - When a hash is present, scroll to the matching section (used by the
 *   navbar links that point back to homepage sections such as /#work).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' })
        } else {
          window.scrollTo(0, 0)
        }
      })
      return () => window.cancelAnimationFrame(frame)
    }

    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}
