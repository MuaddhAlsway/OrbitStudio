import { usePageMeta } from '../hooks/usePageMeta'
import ServicesHero from '../components/services/ServicesHero'
import CapabilitiesIndex from '../components/services/CapabilitiesIndex'
import EngineeringDiagram from '../components/services/EngineeringDiagram'
import RelatedProjects from '../components/services/RelatedProjects'
import ApproachTimeline from '../components/services/ApproachTimeline'
import ConversionCta from '../components/services/ConversionCta'
import '../css/Services.css'

export default function Services() {
  usePageMeta(
    'Technology Services & Solutions',
    'Website design and development, e-commerce, custom web applications, backend and API development, cloud deployment and UI/UX — connected to work we have delivered.',
  )

  return (
    <main className="svc-page" id="services">
      <ServicesHero />
      <CapabilitiesIndex />
      <EngineeringDiagram />
      <RelatedProjects
        all
        id="services-work"
        eyebrow="Selected work"
        title="Engineering in practice."
        description="A selection of platforms we have designed and built, shown as delivered."
      />
      <ApproachTimeline />
      <ConversionCta />
    </main>
  )
}
