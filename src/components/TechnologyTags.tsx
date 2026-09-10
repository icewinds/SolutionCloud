import './TechnologyTags.css'

interface TechnologyTagsProps {
  technologies: string[]
}

export function TechnologyTags({ technologies }: TechnologyTagsProps) {
  return (
    <ul className="technology-tags" aria-label="Project technologies">
      {technologies.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  )
}
