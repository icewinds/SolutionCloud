import { Link } from 'react-router-dom'
import type { FinalCta } from '../types/content'
import './CTASection.css'

interface CTASectionProps {
  cta: FinalCta
}

export function CTASection({ cta }: CTASectionProps) {
  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <div className="container cta-inner">
        <h2 id="cta-heading">{cta.heading}</h2>
        <p>{cta.text}</p>
        <Link to={cta.path} className="button">
          {cta.buttonLabel}
        </Link>
      </div>
    </section>
  )
}
