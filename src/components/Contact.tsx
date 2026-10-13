import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { getWhatsAppUrl } from '../config/whatsapp'
import '../css/Contact.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type ContactDetail = {
  label: string
  value: string
  href?: string
  external?: boolean
}

const WHATSAPP_URL = getWhatsAppUrl()

const DETAILS: ContactDetail[] = [
  { label: 'Location', value: 'Riyadh, Saudi Arabia' },
  ...(WHATSAPP_URL
    ? [
        {
          label: 'WhatsApp',
          value: '+966 56 039 4576',
          href: WHATSAPP_URL,
          external: true,
        },
      ]
    : []),
]

export default function Contact() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.from('.ct-head__eyebrow', { y: 16, opacity: 0, duration: 0.6 })
          .from('.ct-headline__line', { yPercent: 112, duration: 1.05, stagger: 0.12 }, 0.1)
          .from('.ct-head__desc', { y: 18, opacity: 0, duration: 0.7 }, 0.42)
          .from('.ct-detail', { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.5)
          .from('.ct-actions > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.62)
      })
    },
    { scope: root },
  )

  return (
    <section className="ct" id="contact" ref={root} aria-labelledby="ct-heading">
      <div className="ct__bg" aria-hidden="true">
        <div className="ct__grid" />
      </div>

      <div className="ct-container ct__inner">
        <header className="ct-head">
          <p className="ct-head__eyebrow">03 / Contact</p>
          <h2 className="ct-headline" id="ct-heading">
            <span className="ct-headline__mask">
              <span className="ct-headline__line">Let&rsquo;s build</span>
            </span>
            <span className="ct-headline__mask">
              <span className="ct-headline__line ct-headline__line--serif">
                what&rsquo;s next<span className="ct-accent">.</span>
              </span>
            </span>
          </h2>
          <p className="ct-head__desc">
            Tell us what you are working on. Share the problem and the outcome you need, and we
            will suggest a practical next step.
          </p>
        </header>

        <div className="ct-body">
          <ul className="ct-details" role="list">
            {DETAILS.map((detail) => (
              <li className="ct-detail" key={detail.label}>
                <span className="ct-detail__label">{detail.label}</span>
                {detail.href ? (
                  <a
                    className="ct-detail__value ct-detail__value--link"
                    href={detail.href}
                    {...(detail.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="ct-detail__value">{detail.value}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="ct-actions">
            <Link className="ct-btn ct-btn--primary" to="/start-project">
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
          </div>
        </div>
      </div>
    </section>
  )
}
