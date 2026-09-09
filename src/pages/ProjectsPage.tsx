import { useMemo, useState } from 'react'
import projects from '../data/projects.json'
import site from '../data/site.json'
import type { Project, SiteContent } from '../types/content'
import { CTASection } from '../components/CTASection'
import { ProjectFilters } from '../components/ProjectFilters'
import { ProjectGrid } from '../components/ProjectGrid'
import { Section } from '../components/Section'
import { usePageMeta } from '../hooks/usePageMeta'
import './ProjectsPage.css'

const siteContent = site as SiteContent
const projectItems = projects as Project[]
const ALL_CATEGORY = 'All'

export function ProjectsPage() {
  usePageMeta(siteContent.seo.projects.title, siteContent.seo.projects.description)

  const categories = useMemo(() => {
    const unique = [...new Set(projectItems.map((project) => project.category))]
    return [ALL_CATEGORY, ...unique]
  }, [])

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)

  const filteredProjects = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return projectItems
    }

    return projectItems.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <Section
        eyebrow={siteContent.projectsPage.eyebrow}
        heading={siteContent.projectsPage.heading}
        intro={siteContent.projectsPage.intro}
      >
        <ProjectFilters
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
        <ProjectGrid projects={filteredProjects} />
      </Section>

      <CTASection
        cta={{
          heading: 'Have a similar problem?',
          text: "Let's talk about your requirements and whether a practical software, integration or automation solution is the right next step.",
          buttonLabel: 'Contact SolutionCloud',
          path: '/contact',
        }}
      />
    </>
  )
}
