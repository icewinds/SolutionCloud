import './SolutionFlow.css'

interface SolutionFlowProps {
  steps: string[]
}

export function SolutionFlow({ steps }: SolutionFlowProps) {
  if (steps.length === 0) {
    return null
  }

  return (
    <ol
      className="solution-flow"
      aria-label="Solution process"
      style={{ ['--flow-steps' as string]: steps.length }}
    >
      {steps.map((step, index) => (
        <li key={step} className="solution-flow-step">
          <span className="solution-flow-index" aria-hidden="true">
            {index + 1}
          </span>
          <span className="solution-flow-label">{step}</span>
        </li>
      ))}
    </ol>
  )
}
