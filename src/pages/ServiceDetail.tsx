import { useParams } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { usePageMeta } from '../hooks/usePageMeta'
import NotFound from './NotFound'
import ServiceDetailHero from '../components/services/ServiceDetailHero'
import ServiceCapabilities from '../components/services/ServiceCapabilities'
import ServiceProcess from '../components/services/ServiceProcess'
import ServiceArchitecture from '../components/services/ServiceArchitecture'
import RelatedProjects from '../components/services/RelatedProjects'
import ConversionCta from '../components/services/ConversionCta'
import '../css/Services.css'
import '../css/ServiceDetail.css'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = SERVICES.find((item) => item.slug === slug)

  usePageMeta(
    service ? service.title : 'Service not found',
    service ? service.shortDescription : undefined,
  )

  if (!service) {
    return <NotFound />
  }

  return (
    <main className="sdp-page" id="service">
      <ServiceDetailHero service={service} />
      <ServiceCapabilities service={service} />
      <ServiceProcess service={service} />
      <ServiceArchitecture service={service} />
      <RelatedProjects
        projectIds={service.relatedProjectIds}
        id="service-work"
        eyebrow="Relevant work"
        title="Where this shows up."
      />
      <ConversionCta
        eyebrow={service.label}
        primaryLabel="Discuss Your Project"
      />
    </main>
  )
}
