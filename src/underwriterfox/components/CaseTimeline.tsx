import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import type { TimelineEvent } from '@/underwriterfox/types'

type CaseTimelineProps = {
  events: TimelineEvent[]
}

export default function CaseTimeline({ events }: CaseTimelineProps) {
  const { t } = useI18n()

  return (
    <Card variant="glass" title={t('underwriterfox.timeline.title')} subtitle={t('underwriterfox.timeline.subtitle')}>
      {events.length === 0 ? <p>{t('underwriterfox.timeline.empty')}</p> : null}
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {events.map((event) => (
          <div key={event.id} style={{ display: 'grid', gap: '0.15rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem' }}>
              <strong style={{ color: '#0f172a' }}>{event.title}</strong>
              <span style={{ color: '#94a3b8' }}>{new Date(event.createdAt).toLocaleString()}</span>
            </div>
            <div style={{ color: '#475569', fontSize: '0.9rem' }}>{event.message}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{event.actor} · {t(`underwriterfox.timeline.type.${event.type}`)}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
