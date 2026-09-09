import { Link, Navigate, useParams } from 'react-router-dom'
import projects from '../data/projects.json'
import site from '../data/site.json'
import type { Project, SiteContent } from '../types/content'
import { CTASection } from '../components/CTASection'
import { Section } from '../components/Section'
import { usePageMeta } from '../hooks/usePageMeta'
import './ProjectDetailPage.css'

const siteContent = site as SiteContent
const projectItems = projects as Project[]

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const project = projectItems.find((item) => item.id === projectId)

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

  return (
    <>
      <Section
        eyebrow={project.category}
        heading={project.title}
        intro={project.shortDescription}
      >
        <p className="project-detail-back">
          <Link to="/projects">Back to all projects</Link>
        </p>

        <div className="project-detail-grid">
          <article className="project-detail-panel">
            <h3>The Challenge</h3>
            <p>{project.businessProblem}</p>
          </article>

          <article className="project-detail-panel">
            <h3>The Solution</h3>
            <p>{project.solution}</p>
          </article>

          <article className="project-detail-panel">
            <h3>Business Outcome</h3>
            <p>{project.outcome}</p>
          </article>
        </div>

        <div className="project-detail-lower">
          <div>
            <h3>Key Capabilities</h3>
            <ul className="project-detail-list">
              {project.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Technology</h3>
            <ul className="tech-list" aria-label="Project technologies">
              {project.technologies.map((tech) => (
                <li key={tech} className="tech-chip">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTASection
        cta={{
          heading: 'Have a similar problem?',
          text: "Let's talk about your requirements.",
          buttonLabel: 'Contact SolutionCloud',
          path: '/contact',
        }}
      />
    </>
  )
}
