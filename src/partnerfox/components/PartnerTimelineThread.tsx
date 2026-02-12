import type { TimelineEvent } from '@/partnerfox/types'

type PartnerTimelineThreadProps = {
  events: TimelineEvent[]
  emptyLabel: string
}

export default function PartnerTimelineThread({ events, emptyLabel }: PartnerTimelineThreadProps) {
  if (events.length === 0) {
    return <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{emptyLabel}</div>
  }

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {events.map((event) => (
        <div key={event.id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
          <div style={{ fontWeight: 600 }}>{event.title}</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            {new Date(event.createdAt).toLocaleString()} · {event.meta?.actor ?? 'partner-ops'}
          </div>
          <div style={{ color: '#475569', fontSize: '0.9rem' }}>{event.message}</div>
        </div>
      ))}
    </div>
  )
}
