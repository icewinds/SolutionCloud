import './CapabilityGrid.css'

interface CapabilityGridProps {
  capabilities: string[]
}

export function CapabilityGrid({ capabilities }: CapabilityGridProps) {
  return (
    <ul className="capability-grid" aria-label="Key capabilities">
      {capabilities.map((capability) => (
        <li key={capability}>{capability}</li>
      ))}
    </ul>
  )
}
