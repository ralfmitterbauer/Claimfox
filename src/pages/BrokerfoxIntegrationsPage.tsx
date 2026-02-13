import React, { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { applyGdvImport, listContracts, listIntegrations, runBiproSync, runPortalFetch, updateIntegrationStatus } from '@/brokerfox/api/brokerfoxApi'
import type { Contract, IntegrationItem, IntegrationStatus } from '@/brokerfox/types'
import { localizeIntegrationDescription, localizeIntegrationName } from '@/brokerfox/utils/localizeDemoValues'

type GdvPreviewItem = {
  id: string
  premiumEUR: number
  status: Contract['status']
}

export default function BrokerfoxIntegrationsPage() {
  const { lang, t } = useI18n()
  const ctx = useTenantContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<IntegrationItem[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [gdvFile, setGdvFile] = useState<File | null>(null)
  const [gdvPreview, setGdvPreview] = useState<GdvPreviewItem[]>([])
  const currencyFormatter = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [data, contractData] = await Promise.all([listIntegrations(ctx), listContracts(ctx)])
        if (!mounted) return
        setItems(data)
        setContracts(contractData)
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

  async function handleBiproSync() {
    await runBiproSync(ctx)
    const nextContracts = await listContracts(ctx)
    setContracts(nextContracts)
  }

  function handleGdvPreview() {
    if (!gdvFile) return
    const preview = contracts.slice(0, 3).map((contract, idx) => ({
      id: contract.id,
      premiumEUR: contract.premiumEUR + (idx + 1) * 300,
      status: contract.status === 'pending' ? 'active' : contract.status
    }) satisfies GdvPreviewItem)
    setGdvPreview(preview)
  }

  async function handleGdvApply() {
    if (gdvPreview.length === 0) return
    await applyGdvImport(ctx, gdvPreview)
    const nextContracts = await listContracts(ctx)
    setContracts(nextContracts)
    setGdvPreview([])
    setGdvFile(null)
  }

  async function handlePortalFetch() {
    await runPortalFetch(ctx)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.integrations.title')}
        subtitle={t('brokerfox.integrations.subtitle')}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => window.location.reload()} />}
      >
        <Card variant="glass" title={t('brokerfox.integrations.actionsTitle')} subtitle={t('brokerfox.integrations.actionsSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div>
                <strong>{t('brokerfox.integrations.biproAction')}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.integrations.biproHint')}</div>
              </div>
              <button type="button" onClick={handleBiproSync} style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', borderRadius: 999, padding: '0.35rem 0.9rem' }}>
                {t('brokerfox.integrations.runAction')}
              </button>
            </div>

            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <strong>{t('brokerfox.integrations.gdvAction')}</strong>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.integrations.gdvHint')}</div>
              <input type="file" accept=".csv" onChange={(event) => setGdvFile(event.target.files?.[0] ?? null)} />
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button type="button" onClick={handleGdvPreview} style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', borderRadius: 999, padding: '0.35rem 0.9rem' }}>
                  {t('brokerfox.integrations.preview')}
                </button>
                <button type="button" onClick={handleGdvApply} style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', borderRadius: 999, padding: '0.35rem 0.9rem' }}>
                  {t('brokerfox.integrations.apply')}
                </button>
              </div>
              {gdvPreview.length > 0 ? (
                <div style={{ display: 'grid', gap: '0.35rem' }}>
                  {gdvPreview.map((item) => (
                    <div key={item.id} style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {item.id}: {currencyFormatter.format(item.premiumEUR)}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div>
                <strong>{t('brokerfox.integrations.portalAction')}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.integrations.portalHint')}</div>
              </div>
              <button type="button" onClick={handlePortalFetch} style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', borderRadius: 999, padding: '0.35rem 0.9rem' }}>
                {t('brokerfox.integrations.runAction')}
              </button>
            </div>
          </div>
        </Card>

        <Card variant="glass" title={t('brokerfox.integrations.listTitle')} subtitle={t('brokerfox.integrations.listSubtitle')}>
          {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
          {error ? <p>{error}</p> : null}
          {items.length === 0 ? <p>{t('brokerfox.empty.noIntegrations')}</p> : null}
          {items.map((item) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{localizeIntegrationName(item.name, lang) ?? item.name}</strong>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{localizeIntegrationDescription(item.description, lang) ?? item.description}</div>
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
      </BrokerfoxLayout>
    </section>
  )
}
