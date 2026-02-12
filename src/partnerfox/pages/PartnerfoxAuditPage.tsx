import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import PartnerTimelineThread from '@/partnerfox/components/PartnerTimelineThread'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listTimelineEvents } from '@/partnerfox/api/partnerfoxApi'
import type { TimelineEvent } from '@/partnerfox/types'

export default function PartnerfoxAuditPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [search, setSearch] = useState('')
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])

  useEffect(() => {
    let mounted = true
    listTimelineEvents(ctx).then((data) => {
      if (!mounted) return
      setTimeline(data)
    })
    return () => { mounted = false }
  }, [ctx])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return timeline
    return timeline.filter((item) =>
      item.title.toLowerCase().includes(q)
      || item.message.toLowerCase().includes(q)
      || item.entityId.toLowerCase().includes(q)
    )
  }, [search, timeline])

  return (
    <PartnerfoxLayout title={t('partnerfox.audit.title')} subtitle={t('partnerfox.audit.subtitle')}>
      <Card title={t('partnerfox.audit.search')}>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('partnerfox.audit.search')}
            style={{ minWidth: 260, maxWidth: 420, padding: '0.5rem 0.65rem', borderRadius: 8, border: '1px solid #dbe3ed' }}
          />
          <PartnerTimelineThread events={filtered} emptyLabel={t('partnerfox.audit.empty')} />
        </div>
      </Card>
    </PartnerfoxLayout>
  )
}
