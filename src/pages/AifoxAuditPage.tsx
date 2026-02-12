import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listTimeline } from '@/aifox/api/aifoxApi'
import type { AifoxTimelineEvent } from '@/aifox/types'

export default function AifoxAuditPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [events, setEvents] = useState<AifoxTimelineEvent[]>([])
  const locale = lang === 'de' ? 'de-DE' : 'en-US'

  function mapTitle(raw: string) {
    if (raw === 'AI decision updated') return lang === 'de' ? 'KI-Entscheidung aktualisiert' : 'AI decision updated'
    if (raw === 'Fraud action logged') return lang === 'de' ? 'Betrugsaktion protokolliert' : 'Fraud action logged'
    if (raw === 'Integration toggled') return lang === 'de' ? 'Integration umgeschaltet' : 'Integration toggled'
    if (raw === 'Vision AI decision') return lang === 'de' ? 'Vision-AI-Entscheidung' : 'Vision AI decision'
    return raw
  }

  function mapMessage(raw: string) {
    if (raw.endsWith(' enabled.')) {
      const name = raw.replace(' enabled.', '')
      return lang === 'de' ? `${name} aktiviert.` : raw
    }
    if (raw.endsWith(' disabled.')) {
      const name = raw.replace(' disabled.', '')
      return lang === 'de' ? `${name} deaktiviert.` : raw
    }
    return raw
  }

  function mapType(type: AifoxTimelineEvent['type']) {
    if (type === 'system') return lang === 'de' ? 'System' : 'System'
    if (type === 'statusUpdate') return lang === 'de' ? 'Status' : 'Status'
    return type
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listTimeline(ctx)
      if (!mounted) return
      setEvents(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  return (
    <AifoxLayout title={t('aifox.audit.title')} subtitle={t('aifox.audit.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {events.map((event) => (
            <div key={event.id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
              <div style={{ fontWeight: 600 }}>{mapTitle(event.title)}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{mapType(event.type)} · {event.actor} · {new Date(event.createdAt).toLocaleString(locale)}</div>
              <div style={{ color: '#475569' }}>{mapMessage(event.message)}</div>
            </div>
          ))}
        </div>
      </Card>
    </AifoxLayout>
  )
}
