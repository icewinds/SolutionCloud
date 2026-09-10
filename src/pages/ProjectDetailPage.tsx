import { Link, Navigate, useParams } from 'react-router-dom'
import projects from '../data/projects.json'
import services from '../data/services.json'
import site from '../data/site.json'
import type { Project, Service, SiteContent } from '../types/content'
import { CapabilityGrid } from '../components/CapabilityGrid'
import { CTASection } from '../components/CTASection'
import { ProjectNavigation } from '../components/ProjectNavigation'
import { ProjectSnapshot } from '../components/ProjectSnapshot'
import { RelatedServices } from '../components/RelatedServices'
import { Section } from '../components/Section'
import { SolutionFlow } from '../components/SolutionFlow'
import { TechnologyTags } from '../components/TechnologyTags'
import {
  getProjectSnapshot,
  getSolutionFlow,
} from '../lib/projectPresentation'
import { usePageMeta } from '../hooks/usePageMeta'
import './ProjectDetailPage.css'

const siteContent = site as SiteContent
const projectItems = projects as Project[]
const serviceItems = services as Service[]

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const projectIndex = projectItems.findIndex((item) => item.id === projectId)
  const project = projectIndex >= 0 ? projectItems[projectIndex] : undefined

  usePageMeta(
    project
      ? `${project.title} | SolutionCloud`
      : siteContent.seo.projects.title,
    project
      ? project.shortDescription
      : siteContent.seo.projects.description,
  )

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const previousProject =
    projectIndex > 0 ? projectItems[projectIndex - 1] : undefined
  const nextProject =
    projectIndex < projectItems.length - 1
      ? projectItems[projectIndex + 1]
      : undefined

  const relatedServices = serviceItems.filter((service) =>
    project.relatedServiceIds.includes(service.id),
  )
  const snapshot = getProjectSnapshot(project)
  const solutionFlow = getSolutionFlow(project)

  return (
    <div className="case-study-page">
      <Section
        className="case-study-hero"
        eyebrow={project.category}
        heading={project.title}
        intro={project.shortDescription}
        compact
      >
        <p className="case-study-hero-actions">
          <Link to="/contact" className="button">
            Discuss Your Project
          </Link>
        </p>
        <ProjectSnapshot items={snapshot} />
      </Section>

      <Section heading="The Challenge" tone="muted" compact>
        <p className="case-study-prose">{project.businessProblem}</p>
      </Section>

      <Section heading="The Solution" compact className="case-study-solution">
        <div className="case-study-solution-layout">
          <p className="case-study-prose case-study-prose-emphasis">
            {project.solution}
          </p>
          {solutionFlow ? (
            <div className="case-study-flow-panel">
              <p className="case-study-flow-label">Solution flow</p>
              <SolutionFlow steps={solutionFlow} />
            </div>
          ) : null}
        </div>
      </Section>

      <Section heading="What It Delivered" tone="muted" compact>
        <div className="case-study-outcome">
          <p>{project.outcome}</p>
        </div>
      </Section>

      <Section heading="Key Capabilities" compact>
        <CapabilityGrid capabilities={project.capabilities} />
      </Section>

      <Section heading="Technology" tone="muted" compact>
        <TechnologyTags technologies={project.technologies} />
      </Section>

      <Section heading="What This Demonstrates" compact>
        <p className="case-study-prose case-study-demonstrates-intro">
          This work aligns with the following SolutionCloud service areas:
        </p>
        <ul className="case-study-demonstrates">
          {relatedServices.map((service) => (
            <li key={service.id}>{service.title}</li>
          ))}
        </ul>
        <RelatedServices services={relatedServices} />
      </Section>

      <ProjectNavigation
        previousProject={previousProject}
        nextProject={nextProject}
      />

      <CTASection
        cta={{
          heading: 'Have a similar problem?',
          text: "Let's talk about your requirements and whether a practical software, integration or automation solution could help.",
          buttonLabel: 'Contact SolutionCloud',
          path: '/contact',
        }}
      />
    </div>
  )
}
