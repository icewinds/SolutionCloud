import type { Project } from '../types/content'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="project-grid-empty">No projects match this category.</p>
  }

  return (
    <div className="card-grid card-grid-2 project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
