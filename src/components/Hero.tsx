import { Link } from 'react-router-dom'
import './Hero.css'

interface HeroProps {
  companyName: string
  tagline: string
  description: string
  primaryLabel: string
  primaryPath: string
  secondaryLabel: string
  secondaryPath: string
}

export function Hero({
  companyName,
  tagline,
  description,
  primaryLabel,
  primaryPath,
  secondaryLabel,
  secondaryPath,
}: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="container hero-content">
        <p className="hero-brand">{companyName}</p>
        <h1 id="hero-heading">{tagline}</h1>
        <p className="hero-copy">{description}</p>
        <div className="hero-actions">
          <Link to={primaryPath} className="button">
            {primaryLabel}
          </Link>
          <Link to={secondaryPath} className="button button-secondary">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
