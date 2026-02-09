import React, { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import BrokerfoxHeader from '@/brokerfox/components/BrokerfoxHeader'
import BrokerfoxNav from '@/brokerfox/components/BrokerfoxNav'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listIntegrations, updateIntegrationStatus } from '@/brokerfox/api/brokerfoxApi'
import type { IntegrationItem, IntegrationStatus } from '@/brokerfox/types'

export default function BrokerfoxIntegrationsPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<IntegrationItem[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await listIntegrations(ctx)
        if (!mounted) return
        setItems(data)
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

  async function handleStatus(item: IntegrationItem, status: IntegrationStatus) {
    const updated = await updateIntegrationStatus(ctx, item.id, status)
    if (!updated) return
    setItems((prev) => prev.map((entry) => (entry.id === item.id ? updated : entry)))
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <BrokerfoxHeader title={t('brokerfox.integrations.title')} subtitle={t('brokerfox.integrations.subtitle')} />
        <DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => window.location.reload()} />
        <BrokerfoxNav />
        <Card variant="glass" title={t('brokerfox.integrations.listTitle')} subtitle={t('brokerfox.integrations.listSubtitle')}>
          {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
          {error ? <p>{error}</p> : null}
          {items.length === 0 ? <p>{t('brokerfox.empty.noIntegrations')}</p> : null}
          {items.map((item) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{item.name}</strong>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.description}</div>
              </div>
              <select
                value={item.status}
                onChange={(event) => handleStatus(item, event.target.value as IntegrationStatus)}
                style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
              >
                <option value="connected">{t('brokerfox.integrations.connected')}</option>
                <option value="notConnected">{t('brokerfox.integrations.notConnected')}</option>
              </select>
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}
