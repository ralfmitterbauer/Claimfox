import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import { demoTenants } from '@/brokerfox/demo/demoCatalog'
import { resetDemoData, seedAllTenantsIfEmpty } from '@/brokerfox/api/brokerfoxApi'
import { setTenantOverride } from '@/brokerfox/hooks/useTenantContext'

const isDemoMode = Boolean(import.meta.env.DEV || import.meta.env.VITE_DEMO_MODE)

type DemoUtilitiesPanelProps = {
  tenantId: string
  onTenantChange: () => void
}

export default function DemoUtilitiesPanel({ tenantId, onTenantChange }: DemoUtilitiesPanelProps) {
  const { t } = useI18n()

  if (!isDemoMode) {
    return null
  }

  function handleTenantChange(nextId: string) {
    setTenantOverride(nextId)
    onTenantChange()
  }

  function handleReset() {
    resetDemoData(tenantId)
    onTenantChange()
  }

  function handleSeedAll() {
    seedAllTenantsIfEmpty()
    onTenantChange()
  }

  return (
    <Card variant="glass" title={t('brokerfox.demo.title')} subtitle={t('brokerfox.demo.subtitle')}>
      <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('brokerfox.demo.tenant')}</label>
          <select
            value={tenantId}
            onChange={(event) => handleTenantChange(event.target.value)}
            style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
          >
            {demoTenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>{tenant.label}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'grid', gap: '0.4rem', alignContent: 'end' }}>
          <Button size="sm" onClick={handleReset}>{t('brokerfox.demo.reset')}</Button>
        </div>
        <div style={{ display: 'grid', gap: '0.4rem', alignContent: 'end' }}>
          <Button size="sm" onClick={handleSeedAll}>{t('brokerfox.demo.seedAll')}</Button>
        </div>
      </div>
    </Card>
  )
}
