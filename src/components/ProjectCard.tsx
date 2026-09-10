import { Link } from 'react-router-dom'
import type { Project } from '../types/content'
import './ProjectCard.css'

interface ProjectCardProps {
  project: Project
  compact?: boolean
}

function summariseProblem(text: string, maxLength = 140): string {
  if (text.length <= maxLength) {
    return text
  }

  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return `${truncated.slice(0, lastSpace > 80 ? lastSpace : maxLength).trimEnd()}…`
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className={`project-card${compact ? ' project-card-compact' : ''}`}>
      <p className="project-card-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="project-card-lead">{project.shortDescription}</p>

      {!compact ? (
        <>
          <div className="project-card-block">
            <h4>The Problem</h4>
            <p>{summariseProblem(project.businessProblem)}</p>
          </div>

          <ul className="project-card-capabilities" aria-label="Key capabilities">
            {project.capabilities.slice(0, 2).map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>

          <ul className="project-card-tech" aria-label="Technologies">
            {project.technologies.slice(0, 3).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </>
      ) : null}

      <Link
        to={`/projects/${project.id}`}
        className="project-card-link"
        aria-label={`View case study: ${project.title}`}
      >
        View Case Study
      </Link>
    </article>
  )
}
