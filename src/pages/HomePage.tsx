import site from '../data/site.json'
import services from '../data/services.json'
import type { Service, SiteContent } from '../types/content'
import { CTASection } from '../components/CTASection'
import { Hero } from '../components/Hero'
import { ProcessSection } from '../components/ProcessSection'
import { Section } from '../components/Section'
import { ServiceList } from '../components/ServiceList'
import { usePageMeta } from '../hooks/usePageMeta'

const siteContent = site as SiteContent
const serviceItems = services as Service[]

export function HomePage() {
  usePageMeta(siteContent.seo.home.title, siteContent.seo.home.description)

  return (
    <>
      <Hero
        companyName={siteContent.companyName}
        tagline={siteContent.tagline}
        description={siteContent.description}
        primaryLabel={siteContent.cta.primary.label}
        primaryPath={siteContent.cta.primary.path}
        secondaryLabel={siteContent.cta.secondary.label}
        secondaryPath={siteContent.cta.secondary.path}
      />

      <Section
        heading={siteContent.problems.heading}
        intro={siteContent.problems.intro}
        tone="muted"
      >
        <ul className="problem-list">
          {siteContent.problems.items.map((item) => (
            <li key={item} className="problem-item">
              “{item}”
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow={siteContent.servicesOverview.eyebrow}
        heading={siteContent.servicesOverview.heading}
        intro={siteContent.servicesOverview.intro}
      >
        <ServiceList services={serviceItems} linkToDetails />
      </Section>

      <Section
        heading={siteContent.benefits.heading}
        intro={siteContent.benefits.intro}
        tone="muted"
      >
        <div className="card-grid card-grid-3">
          {siteContent.benefits.items.map((benefit) => (
            <article key={benefit.title} className="benefit-card">
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        heading={siteContent.process.heading}
        intro={siteContent.process.intro}
      >
        <ProcessSection steps={siteContent.process.steps} />
      </Section>

      <CTASection cta={siteContent.cta.final} />
    </>
  )
}
