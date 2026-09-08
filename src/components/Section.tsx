import type { ReactNode } from 'react'
import './Section.css'

interface SectionProps {
  id?: string
  eyebrow?: string
  heading: string
  intro?: string
  children: ReactNode
  className?: string
  tone?: 'default' | 'muted' | 'ink'
}

export function Section({
  id,
  eyebrow,
  heading,
  intro,
  children,
  className = '',
  tone = 'default',
}: SectionProps) {
  return (
    <section id={id} className={`section section-${tone} ${className}`.trim()}>
      <div className="container">
        <header className="section-header">
          {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
          <h2>{heading}</h2>
          {intro ? <p className="section-intro">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
