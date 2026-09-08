import type { Service } from '../types/content'
import { ServiceCard } from './ServiceCard'
import './ServiceList.css'

interface ServiceListProps {
  services: Service[]
  linkToDetails?: boolean
}

export function ServiceList({ services, linkToDetails = false }: ServiceListProps) {
  return (
    <div className="service-list">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          href={linkToDetails ? `/services#${service.id}` : undefined}
        />
      ))}
    </div>
  )
}
