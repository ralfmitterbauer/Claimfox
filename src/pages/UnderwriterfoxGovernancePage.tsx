import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listCases, listTimeline } from '@/underwriterfox/api/underwriterfoxApi'
import type { TimelineEvent, UnderwritingCase } from '@/underwriterfox/types'

export default function UnderwriterfoxGovernancePage() {
  const { t } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [cases, setCases] = useState<UnderwritingCase[]>([])
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [selectedCaseId, setSelectedCaseId] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const [caseList, timeline] = await Promise.all([listCases(ctx), listTimeline(ctx)])
      if (!mounted) return
      setCases(caseList)
      setEvents(timeline)
      setSelectedCaseId(caseList[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx.tenantId])

  const filtered = useMemo(() => {
    return events.filter((event) => event.entityId === selectedCaseId).slice(0, 10)
  }, [events, selectedCaseId])

  async function handleExport() {
    await addTimelineEvent(ctx, {
      entityType: 'case',
      entityId: selectedCaseId || 'audit',
      type: 'system',
      title: t('underwriterfox.governance.exportedTitle'),
      message: t('underwriterfox.governance.exportedMessage'),
      actor: ctx.userId
    })
    const timeline = await listTimeline(ctx)
    setEvents(timeline)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.governance.title')} subtitle={t('underwriterfox.governance.subtitle')}>
        <Card variant="glass" title={t('underwriterfox.governance.export')}>
          <Button size="sm" onClick={handleExport}>{t('underwriterfox.governance.export')}</Button>
        </Card>
        <Card variant="glass" title={t('underwriterfox.governance.decisionTrace')}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('underwriterfox.governance.selectCase')}</label>
            <select value={selectedCaseId} onChange={(event) => setSelectedCaseId(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              {cases.map((item) => (
                <option key={item.id} value={item.id}>{item.caseNumber}</option>
              ))}
            </select>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
              {filtered.map((event) => (
                <div key={event.id} style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a' }}>{event.title}</strong>
                  <div style={{ color: '#475569', fontSize: '0.9rem' }}>{event.message}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{new Date(event.createdAt).toLocaleString()} · {event.actor}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </UnderwriterfoxLayout>
    </section>
  )
}
