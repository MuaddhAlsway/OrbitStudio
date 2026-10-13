import { useParams } from 'react-router-dom'
import { getCaseStudy } from '../data/caseStudies'
import { SITE_URL, usePageMeta } from '../hooks/usePageMeta'
import NotFound from './NotFound'
import RelatedProjects from '../components/services/RelatedProjects'
import CaseHero from '../components/work/CaseHero'
import CaseText from '../components/work/CaseText'
import CaseFeatures from '../components/work/CaseFeatures'
import CaseScope from '../components/work/CaseScope'
import CaseArchitecture from '../components/work/CaseArchitecture'
import CaseGallery from '../components/work/CaseGallery'
import CaseCta from '../components/work/CaseCta'
import '../css/Services.css'
import '../css/CaseStudy.css'

export default function CaseStudy() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)

  usePageMeta(
    study ? `${study.name} Case Study` : 'Work not found',
    study?.metaDescription,
    study
      ? {
          canonical: `${SITE_URL}/work/${study.slug}`,
          image: `${SITE_URL}${study.image}`,
          imageAlt: `${study.name} — ${study.category}`,
          type: 'article',
        }
      : undefined,
  )

  if (!study) {
    return <NotFound />
  }

  const scope = study.scope ?? []
  let sectionNo = 2
  const num = () => String(sectionNo++).padStart(2, '0')

  return (
    <main className="cs-page" id="work">
      <CaseHero study={study} />

      <CaseText
        id="cs-overview"
        number={num()}
        eyebrow="Overview"
        title="What the project is."
        paragraphs={study.overview}
      />

      <CaseText
        id="cs-challenge"
        number={num()}
        eyebrow="The challenge"
        title="What it had to solve."
        paragraphs={study.challenge}
      />

      <CaseText
        id="cs-solution"
        number={num()}
        eyebrow="The solution"
        title="How it was built."
        paragraphs={study.solution}
      />

      {scope.length > 0 && (
        <CaseScope number={num()} title="Documented engineering scope." items={scope} />
      )}

      <CaseFeatures number={num()} title="Features in the product." features={study.features} />

      <CaseArchitecture
        number={num()}
        title="How the system is put together."
        architecture={study.architecture}
        note={study.architectureNote}
      />

      <CaseGallery number={num()} title="Showcase." items={study.gallery} />

      <RelatedProjects
        projectIds={study.related}
        id="cs-related"
        eyebrow="Related work"
        title="More from the studio."
      />

      <CaseCta projectName={study.name} />
    </main>
  )
}
