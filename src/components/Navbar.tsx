import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { SERVICES } from '../data/services'
import WhatsAppIcon from './icons/WhatsAppIcon'
import { getWhatsAppUrl } from '../config/whatsapp'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { hasPlayed, markPlayed, useIntroReady } from '../motion'
import '../css/navbar.css'

/* ------------------------------------------------------------------ */
/*  Content model                                                      */
/* ------------------------------------------------------------------ */

interface MenuLink {
  title: string
  description: string
  href: string
}

interface NavEntry {
  label: string
  href: string
  menu?: MenuLink[]
}

const SERVICE_MENU: MenuLink[] = SERVICES.map((service) => ({
  title: service.label,
  description: service.shortDescription,
  href: `/services/${service.slug}`,
}))

const NAV_ENTRIES: NavEntry[] = [
  { label: 'Home', href: '/' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Services', href: '/services', menu: SERVICE_MENU },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/#contact' },
]

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function BrandSymbol() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6.75 20.25v-8.5a5.25 5.25 0 0 1 10.5 0v8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3.75 20.25h16.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ArrowNe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.75 11.25 11.25 4.75M6 4.75h5.25V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width={11}
      height={11}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m3.75 6 4.25 4.25L12.25 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null)
  const desktopRef = useRef<HTMLElement | null>(null)
  const mobileRef = useRef<HTMLDivElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const hoverTimer = useRef<number | null>(null)
  const closeTimer = useRef<number | null>(null)

  const reduced = useReducedMotion()
  const introReady = useIntroReady()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSub, setMobileSub] = useState<string | null>(null)

  const whatsappUrl = getWhatsAppUrl()

  /* Scroll state ---------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Entrance — waits for the intro and only plays once per session ---- */
  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el || reduced || !introReady || hasPlayed('nav-entrance')) return

    markPlayed('nav-entrance')
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.7 } })
      tl.from('[data-brand]', { y: -10, opacity: 0 })
        .from('[data-nav-item]', { y: -10, opacity: 0, stagger: 0.05 }, 0.06)
        .from('[data-cta]', { y: -10, opacity: 0 }, 0.14)
    }, el)

    return () => ctx.revert()
  }, [reduced, introReady])

  /* Dropdown reveal ------------------------------------------------ */
  useLayoutEffect(() => {
    const el = desktopRef.current
    if (!el || !openMenu || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-menu-panel]',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' },
      )
      gsap.fromTo(
        '[data-menu-row]',
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.34, stagger: 0.03, delay: 0.04, ease: 'power2.out' },
      )
    }, el)

    return () => ctx.revert()
  }, [openMenu, reduced])

  /* Escape to close ------------------------------------------------ */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Close on outside click ----------------------------------------- */
  useEffect(() => {
    if (!openMenu) return
    const onDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [openMenu])

  /* Body scroll lock ----------------------------------------------- */
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  /* Mobile menu focus handling ------------------------------------- */
  useEffect(() => {
    if (!mobileOpen) return undefined
    const root = mobileRef.current
    if (!root) return undefined

    const scope = root.querySelector<HTMLElement>('[data-mobile-panel]') ?? root
    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusables = scope.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusables[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || focusables.length === 0) return
      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    scope.addEventListener('keydown', onKeyDown)
    return () => {
      scope.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [mobileOpen])

  /* Fullscreen menu reveal ----------------------------------------- */
  useLayoutEffect(() => {
    const el = mobileRef.current
    if (!el || !mobileOpen || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-overlay]', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo(
        '[data-mobile-line]',
        { yPercent: 120 },
        { yPercent: 0, duration: 0.7, stagger: 0.055, delay: 0.1, ease: 'power3.out' },
      )
      gsap.fromTo(
        '[data-mobile-foot]',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.32, ease: 'power2.out' },
      )
    }, el)

    return () => ctx.revert()
  }, [mobileOpen, reduced])

  /* Handlers ------------------------------------------------------- */
  const clearHoverTimers = useCallback(() => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  useEffect(() => () => clearHoverTimers(), [clearHoverTimers])

  const openOnHover = useCallback(
    (label: string) => {
      clearHoverTimers()
      hoverTimer.current = window.setTimeout(() => setOpenMenu(label), 60)
    },
    [clearHoverTimers],
  )

  const closeOnHover = useCallback(() => {
    clearHoverTimers()
    // Small grace period so the pointer can travel from the label into the
    // panel (across the visual gap) without the menu snapping shut.
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 180)
  }, [clearHoverTimers])

  const handleTriggerClick = useCallback((entry: NavEntry, event: ReactMouseEvent) => {
    if (!entry.menu) return
    event.preventDefault()
    setOpenMenu((current) => (current === entry.label ? null : entry.label))
  }, [])

  const openMobile = useCallback(() => {
    setOpenMenu(null)
    setMobileSub(null)
    setMobileOpen(true)
  }, [])

  const closeMobile = useCallback(() => {
    const el = mobileRef.current
    if (reduced || !el) {
      setMobileOpen(false)
      setMobileSub(null)
      return
    }

    const reset = () => {
      setMobileOpen(false)
      setMobileSub(null)
    }

    gsap.to(el.querySelector('[data-mobile-panel]'), {
      autoAlpha: 0,
      yPercent: -2,
      duration: 0.3,
      ease: 'power2.in',
    })
    gsap.to(el.querySelector('[data-overlay]'), {
      autoAlpha: 0,
      duration: 0.32,
      ease: 'power2.in',
      onComplete: reset,
    })
  }, [reduced])

  const toggleMobile = useCallback(() => {
    if (mobileOpen) closeMobile()
    else openMobile()
  }, [mobileOpen, closeMobile, openMobile])

  const toggleSub = useCallback((label: string) => {
    setMobileSub((current) => (current === label ? null : label))
  }, [])

  const isOpen = (label: string) => openMenu === label

  const isActive = useCallback(
    (href: string) => {
      if (href.includes('#')) return false
      if (href === '/') return pathname === '/'
      return pathname === href || pathname.startsWith(`${href}/`)
    },
    [pathname],
  )

  return (
    <header
      ref={headerRef}
      className={[
        'mn-nav',
        scrolled ? 'is-scrolled' : '',
        openMenu ? 'is-menu-open' : '',
        mobileOpen ? 'is-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mn-nav__inner">
        <Link className="mn-nav__brand" to="/" data-brand aria-label="Orbit Studio — home">
          <span className="mn-nav__mark">
            <BrandSymbol />
          </span>
          <span className="mn-nav__wordmark">Orbit Studio</span>
        </Link>

        <nav className="mn-nav__desktop" aria-label="Primary" ref={desktopRef}>
          <ul className="mn-nav__list">
            {NAV_ENTRIES.map((entry) => {
              const open = isOpen(entry.label)
              return (
                <li
                  key={entry.label}
                  className={`mn-nav__item${open ? ' is-open' : ''}`}
                  data-nav-item
                  onMouseEnter={entry.menu ? () => openOnHover(entry.label) : undefined}
                  onMouseLeave={entry.menu ? closeOnHover : undefined}
                >
                  {entry.menu ? (
                    <button
                      type="button"
                      className={`mn-nav__link${isActive(entry.href) ? ' is-active' : ''}`}
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={(event) => handleTriggerClick(entry, event)}
                    >
                      <span className="mn-nav__link-text">{entry.label}</span>
                      <ChevronDown className="mn-nav__chev" />
                    </button>
                  ) : (
                    <Link
                      className={`mn-nav__link${isActive(entry.href) ? ' is-active' : ''}`}
                      to={entry.href}
                      aria-current={isActive(entry.href) ? 'page' : undefined}
                    >
                      <span className="mn-nav__link-text">{entry.label}</span>
                    </Link>
                  )}

                  {entry.menu && open && (
                    <div
                      className="mn-nav__menu"
                      data-menu-panel
                      role="region"
                      aria-label={`${entry.label} menu`}
                      onMouseEnter={clearHoverTimers}
                    >
                      <ul className="mn-nav__menu-list">
                        {entry.menu.map((link) => (
                          <li key={link.title}>
                            <Link
                              className="mn-nav__menu-row"
                              data-menu-row
                              to={link.href}
                              onClick={() => setOpenMenu(null)}
                            >
                              <span className="mn-nav__menu-copy">
                                <span className="mn-nav__menu-title">{link.title}</span>
                                <span className="mn-nav__menu-desc">{link.description}</span>
                              </span>
                              <ArrowNe className="mn-nav__menu-arrow" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mn-nav__right">
          {whatsappUrl && (
            <a
              className="mn-nav__wa"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              data-cta
            >
              <WhatsAppIcon className="mn-nav__wa-icon" />
            </a>
          )}
          <Link className="mn-nav__cta" to="/start-project" data-cta>
            <span>Let&rsquo;s Talk</span>
            <ArrowNe className="mn-nav__cta-arrow" />
          </Link>
          <button
            type="button"
            className="mn-nav__toggle"
            ref={toggleRef}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mn-mobile-menu"
            onClick={toggleMobile}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mn-nav__mobile" ref={mobileRef}>
          <button
            type="button"
            className="mn-nav__overlay"
            data-overlay
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div
            className="mn-nav__mobile-panel"
            id="mn-mobile-menu"
            data-mobile-panel
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <nav className="mn-nav__mobile-nav" aria-label="Mobile primary">
              <ul className="mn-nav__mobile-list">
                {NAV_ENTRIES.map((entry) => {
                  const open = mobileSub === entry.label
                  return (
                    <li
                      key={entry.label}
                      className={`mn-nav__mobile-item${open ? ' is-open' : ''}`}
                    >
                      {entry.menu ? (
                        <>
                          <button
                            type="button"
                            className="mn-nav__mobile-trigger"
                            aria-expanded={open}
                            onClick={() => toggleSub(entry.label)}
                          >
                            <span className="mn-nav__line-mask">
                              <span className="mn-nav__line" data-mobile-line>
                                {entry.label}
                              </span>
                            </span>
                            <ChevronDown className="mn-nav__mobile-chev" />
                          </button>
                          <div className={`mn-nav__mobile-sub${open ? ' is-open' : ''}`}>
                            <ul>
                              {entry.menu.map((link) => (
                                <li key={link.title}>
                                  <Link to={link.href} onClick={closeMobile}>
                                    {link.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <Link
                          className={`mn-nav__mobile-trigger${isActive(entry.href) ? ' is-active' : ''}`}
                          to={entry.href}
                          onClick={closeMobile}
                        >
                          <span className="mn-nav__line-mask">
                            <span className="mn-nav__line" data-mobile-line>
                              {entry.label}
                            </span>
                          </span>
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="mn-nav__mobile-foot" data-mobile-foot>
              <Link
                className="mn-nav__mobile-cta"
                to="/start-project"
                onClick={closeMobile}
              >
                <span>Let&rsquo;s Talk</span>
                <ArrowNe className="mn-nav__cta-arrow" />
              </Link>
              <div className="mn-nav__mobile-meta">
                {whatsappUrl && (
                  <a
                    className="mn-nav__mobile-wa"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                  >
                    <WhatsAppIcon size={15} />
                    <span>WhatsApp</span>
                  </a>
                )}
                <a href="mailto:muaddhalsway@gmail.com">muaddhalsway@gmail.com</a>
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
