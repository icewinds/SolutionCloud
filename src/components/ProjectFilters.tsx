interface ProjectFiltersProps {
  categories: string[]
  activeCategory: string
  onChange: (category: string) => void
}

export function ProjectFilters({
  categories,
  activeCategory,
  onChange,
}: ProjectFiltersProps) {
  return (
    <div className="project-filters" role="group" aria-label="Filter projects by category">
      {categories.map((category) => {
        const isActive = category === activeCategory
        return (
          <button
            key={category}
            type="button"
            className={`project-filter${isActive ? ' is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
