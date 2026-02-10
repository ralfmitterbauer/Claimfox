import React, { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import type { TimelineEvent } from '@/brokerfox/types'

const TYPE_COLORS: Record<string, string> = {
  externalMessage: '#2563eb',
  internalNote: '#7c3aed',
  statusUpdate: '#059669',
  documentUploaded: '#d97706',
  documentAssigned: '#0ea5e9',
  extractionSuggested: '#f59e0b',
  extractionApplied: '#10b981',
  signatureRequested: '#6366f1',
  signatureSigned: '#22c55e',
  commissionReminderSent: '#ef4444',
  integrationSync: '#475569',
  taskDelegated: '#f97316'
}

type TimelineThreadProps = {
  events: TimelineEvent[]
}

export default function TimelineThread({ events }: TimelineThreadProps) {
  const { t } = useI18n()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return events
    }
    const lower = query.toLowerCase()
    return events.filter((event) => event.message.toLowerCase().includes(lower) || (event.title ?? '').toLowerCase().includes(lower))
  }, [events, query])

  return (
    <Card
      variant="glass"
      title={t('brokerfox.timeline.title')}
      subtitle={t('brokerfox.timeline.subtitle')}
      style={{ width: '100%' }}
    >
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('brokerfox.timeline.searchPlaceholder')}
          style={{ flex: 1, padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
        />
      </div>
      {filtered.length === 0 ? (
        <p style={{ margin: 0, color: '#64748b' }}>{t('brokerfox.timeline.empty')}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((event) => (
            <div key={event.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: TYPE_COLORS[event.type] ?? '#64748b',
                  marginTop: 6
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <strong style={{ color: '#0f172a' }}>{event.title ?? t(`brokerfox.timeline.${event.type}`)}</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{new Date(event.timestamp).toLocaleString()}</span>
                </div>
                <p style={{ margin: '0.35rem 0 0', color: '#334155' }}>{event.message}</p>
                {event.attachments && event.attachments.length > 0 ? (
                  <div style={{ marginTop: '0.35rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {event.attachments.map((file) => (
                      <span key={file.id} style={{ fontSize: '0.8rem', color: '#475569', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 999 }}>
                        {file.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
