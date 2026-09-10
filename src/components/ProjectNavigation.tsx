import { Link } from 'react-router-dom'
import type { Project } from '../types/content'
import './ProjectNavigation.css'

interface ProjectNavigationProps {
  previousProject?: Project
  nextProject?: Project
}

export function ProjectNavigation({
  previousProject,
  nextProject,
}: ProjectNavigationProps) {
  return (
    <nav className="case-study-nav" aria-label="Case study navigation">
      <div className="container case-study-nav-inner">
        {previousProject ? (
          <Link
            to={`/projects/${previousProject.id}`}
            className="case-study-nav-link"
          >
            <span className="case-study-nav-label">Previous Project</span>
            <span className="case-study-nav-title">{previousProject.title}</span>
          </Link>
        ) : (
          <span />
        )}

        <Link to="/projects" className="case-study-nav-all">
          All Projects
        </Link>

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.id}`}
            className="case-study-nav-link case-study-nav-next"
          >
            <span className="case-study-nav-label">Next Project</span>
            <span className="case-study-nav-title">{nextProject.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  )
}
