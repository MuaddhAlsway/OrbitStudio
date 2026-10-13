import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { CaseGalleryItem } from '../../data/caseStudies'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CaseGallery({
  number,
  title,
  items,
}: {
  number: string
  title: string
  items: CaseGalleryItem[]
}) {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const head = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        head
          .from('.cs-sec__label', { y: 14, opacity: 0, duration: 0.55 })
          .from('.cs-sec__title-line', { yPercent: 112, duration: 1, stagger: 0.12 }, 0.08)

        const tiles = gsap.utils.toArray<HTMLElement>('.cs-gallery__tile', root.current)

        tiles.forEach((tile, i) => {
          gsap.fromTo(
            tile,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.15,
              delay: i * 0.08,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: tile,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        })
      })
    },
    { scope: root },
  )

  if (items.length === 0) return null

  return (
    <section className="cs-sec cs-gallery" ref={root} aria-labelledby="cs-gallery-title">
      <div className="svc-container">
        <header className="cs-sec__head">
          <p className="cs-sec__label">
            <span className="cs-sec__num">{number}</span>
            <span className="cs-sec__eyebrow">Project gallery</span>
          </p>
          <h2 className="cs-sec__title" id="cs-gallery-title">
            <span className="cs-sec__title-mask">
              <span className="cs-sec__title-line">{title}</span>
            </span>
          </h2>
        </header>

        <div className="cs-gallery__grid">
          {items.map((item) => (
            <figure className="cs-gallery__tile" key={item.src}>
              <img
                className="cs-gallery__img"
                src={item.src}
                alt={item.alt}
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
