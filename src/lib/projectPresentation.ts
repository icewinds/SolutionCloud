import type { Project } from '../types/content'

export interface SnapshotItem {
  label: string
  value: string
}

export function getProjectSnapshot(project: Project): SnapshotItem[] {
  return [
    { label: 'Project Type', value: project.category },
    { label: 'Business Area', value: project.businessArea },
    { label: 'Platforms', value: project.platforms },
    { label: 'Integration', value: project.integration },
  ]
}
