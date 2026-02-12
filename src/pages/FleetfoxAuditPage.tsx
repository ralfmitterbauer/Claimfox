import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import FleetTimelineThread from '@/fleetfox/components/FleetTimelineThread'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listTimelineEvents } from '@/fleetfox/api/fleetfoxApi'
import type { TimelineEvent } from '@/fleetfox/types'

export default function FleetfoxAuditPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listTimelineEvents(ctx)
      if (!mounted) return
      setTimeline(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return timeline
    return timeline.filter((item) => `${item.title} ${item.message} ${item.entityType}`.toLowerCase().includes(q))
  }, [query, timeline])

  return (
    <FleetfoxLayout title={t('fleetfox.audit.title')} subtitle={t('fleetfox.audit.subtitle')}>
      <Card title={t('fleetfox.audit.searchTitle')}>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('fleetfox.audit.search')}
            style={{ padding: '0.5rem 0.65rem', borderRadius: 10, border: '1px solid #e2e8f0', maxWidth: 320 }}
          />
          <FleetTimelineThread events={filtered} emptyLabel={t('fleetfox.audit.empty')} />
        </div>
      </Card>
    </FleetfoxLayout>
  )
}
