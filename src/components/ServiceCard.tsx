import { Link } from 'react-router-dom'
import type { Service } from '../types/content'
import './ServiceCard.css'

interface ServiceCardProps {
  service: Service
  href?: string
}

export function ServiceCard({ service, href }: ServiceCardProps) {
  const content = (
    <>
      <h3>{service.title}</h3>
      <p className="service-card-lead">{service.shortDescription}</p>
      <p>{service.description}</p>
      <ul className="service-card-list">
        {service.capabilities.slice(0, 4).map((capability) => (
          <li key={capability.title}>{capability.title}</li>
        ))}
      </ul>
      {href ? <span className="service-card-link">Learn more</span> : null}
    </>
  )

  if (href) {
    return (
      <Link to={href} className="service-card service-card-linkable">
        {content}
      </Link>
    )
  }

  return <article className="service-card">{content}</article>
}
