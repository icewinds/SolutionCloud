import { Link } from 'react-router-dom'
import type { Project } from '../types/content'
import './ProjectCard.css'

interface ProjectCardProps {
  project: Project
  compact?: boolean
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
            <p>{project.businessProblem}</p>
          </div>

          <ul className="project-card-capabilities" aria-label="Key capabilities">
            {project.capabilities.slice(0, 3).map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>

          <ul className="project-card-tech" aria-label="Technologies">
            {project.technologies.slice(0, 4).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </>
      ) : null}

      <Link to={`/projects/${project.id}`} className="project-card-link">
        View Details
      </Link>
    </article>
  )
}
