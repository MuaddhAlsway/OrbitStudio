import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { getWhatsAppUrl } from '../../config/whatsapp'
import WhatsAppIcon from '../icons/WhatsAppIcon'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CaseCta({ projectName }: { projectName: string }) {
  const root = useRef<HTMLElement | null>(null)

  const message = [
    'Hello ORBIT STUDIO,',
    '',
    `I viewed your ${projectName} case study and would like to discuss a similar project.`,
    '',
    'Could you help me understand the process and next steps?',
  ].join('\n')

  const whatsappUrl = getWhatsAppUrl(message)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.from('.cs-cta__eyebrow', { y: 14, opacity: 0, duration: 0.55 })
          .from('.cs-cta__title-line', { yPercent: 112, duration: 1 }, 0.08)
          .from('.cs-cta__actions > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.4)
      })
    },
    { scope: root },
  )

  return (
    <section className="cs-cta" ref={root} aria-labelledby="cs-cta-title">
      <div className="cs-cta__bg" aria-hidden="true">
        <div className="cs-cta__grid" />
      </div>
      <div className="svc-container cs-cta__inner">
        <p className="cs-cta__eyebrow">Next step</p>
        <h2 className="cs-cta__title" id="cs-cta-title">
          <span className="cs-cta__title-mask">
            <span className="cs-cta__title-line">Let&rsquo;s Build Something That Works.</span>
          </span>
        </h2>

        <div className="cs-cta__actions">
          {whatsappUrl ? (
            <a
              className="svc-btn svc-btn--primary"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={16} />
              Discuss a Similar Project
            </a>
          ) : (
            <Link className="svc-btn svc-btn--primary" to="/start-project">
              Discuss a Similar Project
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
