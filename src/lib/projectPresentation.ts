import type { Project } from '../types/content'

export interface SnapshotItem {
  label: string
  value: string
}

export function getProjectSnapshot(project: Project): SnapshotItem[] {
  const items: SnapshotItem[] = [
    { label: 'Project Type', value: project.category },
  ]

  const businessArea = deriveBusinessArea(project)
  if (businessArea) {
    items.push({ label: 'Business Area', value: businessArea })
  }

  const platforms = derivePlatforms(project)
  if (platforms) {
    items.push({ label: 'Platforms', value: platforms })
  }

  const integration = deriveIntegration(project)
  if (integration) {
    items.push({ label: 'Integration', value: integration })
  }

  return items
}

function deriveBusinessArea(project: Project): string | undefined {
  const text = [
    project.id,
    project.title,
    project.shortDescription,
    project.businessProblem,
  ]
    .join(' ')
    .toLowerCase()

  if (text.includes('bank') || text.includes('finance') || text.includes('supplier banking')) {
    return 'Finance'
  }

  if (
    text.includes('warehouse') ||
    text.includes('dispatch') ||
    text.includes('label') ||
    text.includes('inventory')
  ) {
    return 'Warehouse & Operations'
  }

  if (text.includes('production') || text.includes('reporting') || text.includes('gateway')) {
    return 'Operations & Reporting'
  }

  return undefined
}

function derivePlatforms(project: Project): string | undefined {
  const tech = project.technologies.map((item) => item.toLowerCase())
  const solution = project.solution.toLowerCase()

  const hasDesktop =
    tech.some((item) => item.includes('winforms') || item.includes('wpf')) ||
    solution.includes('desktop application') ||
    solution.includes('workstation application')

  const hasWeb =
    tech.some(
      (item) =>
        item.includes('blazor') ||
        item.includes('asp.net') ||
        item.includes('rest api'),
    ) ||
    solution.includes('web application') ||
    solution.includes('reporting dashboard')

  const isErpEmbedded =
    tech.includes('vbscript') ||
    solution.includes('erp-embedded') ||
    solution.includes('erp inventory transfer process')

  if (hasDesktop && hasWeb) {
    return 'Desktop + Web'
  }

  if (hasDesktop) {
    return 'Desktop'
  }

  if (hasWeb) {
    return 'Web'
  }

  if (isErpEmbedded) {
    return 'ERP Embedded'
  }

  return undefined
}

function deriveIntegration(project: Project): string | undefined {
  const tech = project.technologies.join(' ').toLowerCase()
  const solution = project.solution.toLowerCase()

  if (tech.includes('syspro') || solution.includes('syspro')) {
    return 'Syspro ERP'
  }

  return undefined
}

const SOLUTION_FLOWS: Record<string, string[]> = {
  'erp-bank-reconciliation': [
    'Bank Statement',
    'Import',
    'Match Transactions',
    'Reconcile',
    'Post to ERP',
  ],
  'erp-api-gateway': [
    'REST Request',
    'ERP Business Object',
    'Structured JSON',
    'Reporting Dashboard',
  ],
  'dispatch-stock-label-printing': [
    'Dispatch Note',
    'Retrieve Stock Lines',
    'Set Quantities',
    'Print Preview',
    'Print Labels',
  ],
  'supplier-banking-authorisation': [
    'Banking Change',
    'Capture Request',
    'Pending Approval',
    'Audit Trail',
    'Email Notification',
  ],
  'warehouse-inventory-transfer': [
    'Transfer Request',
    'Validate Route Rules',
    'Guide Operator',
    'Stock Movement',
  ],
}

export function getSolutionFlow(project: Project): string[] | undefined {
  return SOLUTION_FLOWS[project.id]
}
