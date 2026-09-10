import { Link } from 'react-router-dom'
import type { Service } from '../types/content'
import './RelatedServices.css'

interface RelatedServicesProps {
  services: Service[]
  showHeading?: boolean
}

export function RelatedServices({
  services,
  showHeading = true,
}: RelatedServicesProps) {
  if (services.length === 0) {
    return null
  }

  return (
    <div className="related-services">
      {showHeading ? <h3>Related Services</h3> : null}
      <ul className="related-services-list">
        {services.map((service) => (
          <li key={service.id}>
            <Link to={`/services#${service.id}`}>
              <span className="related-services-title">{service.title}</span>
              <span className="related-services-copy">{service.shortDescription}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
