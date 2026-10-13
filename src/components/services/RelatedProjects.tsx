import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PROJECTS, type Project } from '../../data/projects'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface RelatedProjectsProps {
  projectIds?: string[]
  eyebrow?: string
  title?: string
  description?: string
  id?: string
  /** When true, shows every project; otherwise only the ids provided. */
  all?: boolean
}

export default function RelatedProjects({
  projectIds,
  eyebrow = 'Selected work',
  title = 'Engineering in practice.',
  description,
  id,
  all = false,
}: RelatedProjectsProps) {
  const root = useRef<HTMLElement | null>(null)

  const projects: Project[] = all
    ? PROJECTS
    : projectIds && projectIds.length > 0
      ? projectIds
          .map((projectId) => PROJECTS.find((p) => p.id === projectId))
          .filter((p): p is Project => Boolean(p))
      : []

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.svc-work__headline-line', {
          yPercent: 112,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.svc-work__card', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.svc-work__grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: root },
  )

  if (projects.length === 0) return null

  return (
    <section className="svc-work" id={id} ref={root} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="svc-container">
        <header className="svc-work__head">
          <p className="svc-work__eyebrow">{eyebrow}</p>
          <h2 className="svc-work__title" id={id ? `${id}-title` : undefined}>
            <span className="svc-work__title-mask">
              <span className="svc-work__headline-line">{title}</span>
            </span>
          </h2>
          {description && <p className="svc-work__desc">{description}</p>}
        </header>

        <ul className="svc-work__grid" role="list">
          {projects.map((project) => (
            <li className="svc-work__card" key={project.id}>
              <a
                className="svc-work__link"
                href={project.live ?? project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — opens the live site in a new tab`}
              >
                <span className="svc-work__media">
                  <img
                    className="svc-work__img"
                    src={project.image}
                    alt={`${project.title} showcase`}
                    loading="lazy"
                    decoding="async"
                    width={1672}
                    height={941}
                  />
                </span>
                <span className="svc-work__caption">
                  <span className="svc-work__name">{project.title}</span>
                  <span className="svc-work__arrow" aria-hidden="true">
                    <svg viewBox="0 0 8 8" fill="none" focusable="false">
                      <path
                        d="M1 7L7 1M2.6 1H7v4.4"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
