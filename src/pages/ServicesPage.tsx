import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import site from '../data/site.json'
import services from '../data/services.json'
import type { Service, SiteContent } from '../types/content'
import { CTASection } from '../components/CTASection'
import { Section } from '../components/Section'
import { usePageMeta } from '../hooks/usePageMeta'
import './ServicesPage.css'

const siteContent = site as SiteContent
const serviceItems = services as Service[]

export function ServicesPage() {
  const location = useLocation()
  usePageMeta(siteContent.seo.services.title, siteContent.seo.services.description)

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const target = document.getElementById(location.hash.slice(1))
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <>
      <Section
        eyebrow={siteContent.servicesPage.eyebrow}
        heading={siteContent.servicesPage.heading}
        intro={siteContent.servicesPage.intro}
      >
        <div className="services-overview">
          {serviceItems.map((service) => (
            <a key={service.id} className="services-jump" href={`#${service.id}`}>
              {service.title}
            </a>
          ))}
        </div>
      </Section>

      {serviceItems.map((service) => (
        <section
          key={service.id}
          id={service.id}
          className="service-detail"
          aria-labelledby={`${service.id}-heading`}
        >
          <div className="container service-detail-inner">
            <header className="service-detail-header">
              <h2 id={`${service.id}-heading`}>{service.title}</h2>
              <p className="service-detail-lead">{service.shortDescription}</p>
              <p>{service.description}</p>
            </header>

            <div className="service-detail-grid">
              <div>
                <h3>Business benefits</h3>
                <ul className="benefit-list">
                  {service.businessBenefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>What this can include</h3>
                <div className="card-grid card-grid-2">
                  {service.capabilities.map((capability) => (
                    <article key={capability.title} className="capability-card">
                      <h4>{capability.title}</h4>
                      <p>{capability.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Section
        heading={siteContent.technologies.heading}
        intro={siteContent.technologies.intro}
        tone="muted"
      >
        <ul className="tech-list">
          {siteContent.technologies.items.map((tech) => (
            <li key={tech} className="tech-chip">
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      <CTASection cta={siteContent.cta.final} />
    </>
  )
}
