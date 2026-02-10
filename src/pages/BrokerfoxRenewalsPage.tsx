import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import TimelineComposer from '@/brokerfox/components/TimelineComposer'
import TimelineThread from '@/brokerfox/components/TimelineThread'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listRenewals, listTimelineEvents } from '@/brokerfox/api/brokerfoxApi'
import type { DocumentMeta, RenewalItem } from '@/brokerfox/types'

export default function BrokerfoxRenewalsPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [renewals, setRenewals] = useState<RenewalItem[]>([])
  const [selected, setSelected] = useState<RenewalItem | null>(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await listRenewals(ctx)
        if (!mounted) return
        setRenewals(data)
        setSelected(data[0] ?? null)
        if (data[0]) {
          const timeline = await listTimelineEvents(ctx, 'renewal', data[0].id)
          setEvents(timeline)
        }
        setLoading(false)
      } catch {
        if (!mounted) return
        setError(t('brokerfox.state.error'))
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [ctx, t])

  const grouped = useMemo(() => {
    const groups: Record<string, RenewalItem[]> = { '30': [], '60': [], '90': [] }
    renewals.forEach((item) => {
      const days = Math.ceil((new Date(item.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      if (days <= 30) groups['30'].push(item)
      else if (days <= 60) groups['60'].push(item)
      else groups['90'].push(item)
    })
    return groups
  }, [renewals])

  async function handleSelect(item: RenewalItem) {
    setSelected(item)
    const timeline = await listTimelineEvents(ctx, 'renewal', item.id)
    setEvents(timeline)
  }

  async function handleComposer(payload: { type: any; message: string; attachments: DocumentMeta[] }) {
    if (!selected) return
    await addTimelineEvent(ctx, {
      entityType: 'renewal',
      entityId: selected.id,
      type: payload.type,
      title: payload.type === 'externalMessage' ? t('brokerfox.timeline.externalMessage') : payload.type === 'internalNote' ? t('brokerfox.timeline.internalNote') : t('brokerfox.timeline.statusUpdate'),
      message: payload.message,
      attachments: payload.attachments.map((file) => ({ ...file, tenantId: ctx.tenantId }))
    })
    const nextEvents = await listTimelineEvents(ctx, 'renewal', selected.id)
    setEvents(nextEvents)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.renewals.title')}
        subtitle={t('brokerfox.renewals.subtitle')}
        topRight={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
        {error ? <p>{error}</p> : null}
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {(['30', '60', '90'] as const).map((bucket) => (
            <Card key={bucket} variant="glass" title={t('brokerfox.renewals.bucket', { days: bucket })}>
              {grouped[bucket].length === 0 ? <p>{t('brokerfox.empty.noRenewals')}</p> : null}
              {grouped[bucket].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0', border: 'none', background: 'transparent' }}
                >
                  <strong>{item.policyName}</strong>
                  <div style={{ color: '#64748b' }}>{new Date(item.renewalDate).toLocaleDateString()}</div>
                </button>
              ))}
            </Card>
          ))}
        </div>

        {selected ? (
          <Card variant="glass" title={t('brokerfox.renewals.detailTitle')} subtitle={t('brokerfox.renewals.detailSubtitle')}>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.policyLabel')}: {selected.policyName}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.carrierLabel')}: {selected.carrier}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.premiumLabel')}: {selected.premium}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.statusLabel')}: {t(`brokerfox.renewals.status.${selected.status}`)}</p>
          </Card>
        ) : null}

        {selected ? (
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <TimelineComposer onSubmit={handleComposer} />
            <TimelineThread events={events} />
          </div>
        ) : (
          <Button onClick={() => setSelected(renewals[0] ?? null)}>{t('brokerfox.renewals.selectFirst')}</Button>
        )}
      </BrokerfoxLayout>
    </section>
  )
}
