import Card from '@/components/ui/Card'
import type { FleetAssistantInsight } from '@/fleetfox/types'

type FleetAIExplanationCardProps = {
  title: string
  subtitle: string
  insight: FleetAssistantInsight
}

export default function FleetAIExplanationCard({ title, subtitle, insight }: FleetAIExplanationCardProps) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div style={{ display: 'grid', gap: '0.55rem' }}>
        <div style={{ fontWeight: 600 }}>{insight.title}</div>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Confidence: {insight.confidence}%</div>
        <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569', display: 'grid', gap: '0.25rem' }}>
          {insight.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{insight.evidenceRefs.join(' | ')}</div>
      </div>
    </Card>
  )
}
