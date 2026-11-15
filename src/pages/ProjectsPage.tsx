import projects from '../data/projects.json'
import site from '../data/site.json'
import type { Project, ProjectGroup, SiteContent } from '../types/content'
import { CTASection } from '../components/CTASection'
import { ProjectGrid } from '../components/ProjectGrid'
import { Section } from '../components/Section'
import { usePageMeta } from '../hooks/usePageMeta'
import './ProjectsPage.css'

const siteContent = site as SiteContent
const projectItems = projects as Project[]
const projectsById = new Map(projectItems.map((project) => [project.id, project]))

interface ResolvedGroup extends ProjectGroup {
  projects: Project[]
}

const groupedIds = new Set(siteContent.projectsPage.groups.flatMap((group) => group.projectIds))
const ungrouped = projectItems.filter((project) => !groupedIds.has(project.id))

// Any project not assigned to a group still shows, in a final "More projects" section.
const projectGroups: ResolvedGroup[] = [
  ...siteContent.projectsPage.groups.map((group) => ({
    ...group,
    projects: group.projectIds
      .map((id) => projectsById.get(id))
      .filter((project): project is Project => Boolean(project)),
  })),
  ...(ungrouped.length
    ? [{ id: 'more-projects', heading: 'More projects', intro: '', projectIds: [], projects: ungrouped }]
    : []),
].filter((group) => group.projects.length > 0)

export function ProjectsPage() {
  usePageMeta(siteContent.seo.projects.title, siteContent.seo.projects.description)

  return (
    <>
      <Section
        eyebrow={siteContent.projectsPage.eyebrow}
        heading={siteContent.projectsPage.heading}
        className="projects-page-top"
      >
        {siteContent.projectsPage.lead ? (
          <p className="projects-page-lead">{siteContent.projectsPage.lead}</p>
        ) : null}
        <p className="projects-page-intro">{siteContent.projectsPage.intro}</p>

        <nav className="projects-index" aria-label="Project areas">
          <ol>
            {projectGroups.map((group, index) => (
              <li key={group.id}>
                <a href={`#${group.id}`}>
                  <span className="projects-index-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="projects-index-label">{group.heading}</span>
                  <span className="projects-index-count">
                    {group.projects.length} {group.projects.length === 1 ? 'project' : 'projects'}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Section>

      {projectGroups.map((group, index) => (
        <section
          key={group.id}
          id={group.id}
          className="project-group"
          aria-labelledby={`${group.id}-heading`}
        >
          <div className="container">
            <header className="project-group-header">
              <p className="project-group-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </p>
              <div>
                <h2 id={`${group.id}-heading`}>{group.heading}</h2>
                {group.intro ? <p>{group.intro}</p> : null}
              </div>
            </header>
            <ProjectGrid projects={group.projects} />
          </div>
        </section>
      ))}

      <CTASection
        cta={{
          heading: 'Have a similar problem?',
          text: "Let's talk about your requirements and whether a practical software, integration or automation solution could help.",
          buttonLabel: 'Contact SolutionCloud',
          path: '/contact',
        }}
      />
    </>
  )
}
