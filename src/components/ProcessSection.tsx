import type { ProcessStep } from '../types/content'
import './ProcessSection.css'

interface ProcessSectionProps {
  steps: ProcessStep[]
}

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <ol className="process-list">
      {steps.map((step) => (
        <li key={step.number} className="process-item">
          <span className="process-number" aria-hidden="true">
            {step.number}
          </span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
