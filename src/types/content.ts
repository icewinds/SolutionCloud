export interface NavItem {
  label: string
  path: string
}

export interface SeoMeta {
  title: string
  description: string
}

export interface CtaLink {
  label: string
  path: string
}

export interface FinalCta {
  heading: string
  text: string
  buttonLabel: string
  path: string
}

export interface BenefitItem {
  title: string
  description: string
}

export interface ProcessStep {
  number: number
  title: string
  description: string
}

export interface ProjectGroup {
  id: string
  heading: string
  intro: string
  /** Project ids from projects.json, in display order. */
  projectIds: string[]
}

export interface SiteContent {
  companyName: string
  tagline: string
  description: string
  seo: {
    home: SeoMeta
    services: SeoMeta
    contact: SeoMeta
    projects: SeoMeta
  }
  navigation: NavItem[]
  cta: {
    primary: CtaLink
    secondary: CtaLink
    final: FinalCta
  }
  servicesOverview: {
    eyebrow: string
    heading: string
    intro: string
  }
  projectsOverview: {
    eyebrow: string
    heading: string
    intro: string
    viewAllLabel: string
    viewAllPath: string
  }
  projectsPage: {
    eyebrow: string
    heading: string
    lead?: string
    intro: string
    groups: ProjectGroup[]
  }
  servicesPage: {
    eyebrow: string
    heading: string
    intro: string
  }
  problems: {
    heading: string
    intro: string
    items: string[]
  }
  benefits: {
    heading: string
    intro: string
    items: BenefitItem[]
  }
  process: {
    heading: string
    intro: string
    steps: ProcessStep[]
  }
  technologies: {
    heading: string
    intro: string
    items: string[]
  }
  footer: {
    tagline: string
    copyrightName: string
  }
}

export interface ServiceCapability {
  title: string
  description: string
}

export interface Service {
  id: string
  title: string
  shortDescription: string
  description: string
  businessBenefits: string[]
  capabilities: ServiceCapability[]
  /** Optional link to a gallery of example work for this service. */
  showcase?: CtaLink
}

export interface Project {
  id: string
  title: string
  category: string
  featured: boolean
  shortDescription: string
  businessProblem: string
  solution: string
  outcome: string
  capabilities: string[]
  technologies: string[]
  businessArea: string
  platforms: string
  integration: string
  solutionFlow: string[]
  relatedServiceIds: string[]
}

export interface ContactInfo {
  heading: string
  supportingMessage: string
  email: string
  phone: string
  location: string
  linkedin: string
  form: {
    mailtoSubject: string
    /** Public Web3Forms access key. Empty = open the visitor's email client instead. */
    web3formsAccessKey: string
    successMessage: string
    mailtoMessage: string
    errorMessage: string
  }
}

export interface ContactFormValues {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

export interface DemoSite {
  /** Folder name under public/demos/ (served at /demos/<slug>/). */
  slug: string
  name: string
  category: string
  location: string
  style: string
}

export interface DemoGroup {
  area: string
  demos: DemoSite[]
}

export interface DemoShowcase {
  seo: SeoMeta
  page: {
    eyebrow: string
    heading: string
    intro: string
  }
  notice: {
    heading: string
    text: string
  }
  cardLabel: string
  openLabel: string
  cta: FinalCta
  groups: DemoGroup[]
}
