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

export interface SiteContent {
  companyName: string
  tagline: string
  description: string
  seo: {
    home: SeoMeta
    services: SeoMeta
    contact: SeoMeta
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
}

export interface ContactPlaceholders {
  email: boolean
  phone: boolean
  location: boolean
  linkedin: boolean
}

export interface ContactInfo {
  heading: string
  supportingMessage: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  form: {
    mailtoSubject: string
    successMessage: string
  }
  placeholders: ContactPlaceholders
}

export interface ContactFormValues {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>
