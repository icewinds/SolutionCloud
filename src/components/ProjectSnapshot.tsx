import type { SnapshotItem } from '../lib/projectPresentation'
import './ProjectSnapshot.css'

interface ProjectSnapshotProps {
  items: SnapshotItem[]
}

export function ProjectSnapshot({ items }: ProjectSnapshotProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <dl className="project-snapshot" aria-label="Project snapshot">
      {items.map((item) => (
        <div key={item.label} className="project-snapshot-item">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
