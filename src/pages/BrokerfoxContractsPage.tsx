import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listClients, listContracts } from '@/brokerfox/api/brokerfoxApi'
import type { Contract } from '@/brokerfox/types'

export default function BrokerfoxContractsPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [filters, setFilters] = useState({ lob: 'all', carrier: 'all', status: 'all' })

  useEffect(() => {
    let mounted = true
    async function load() {
      const [contractData, clientData] = await Promise.all([
        listContracts(ctx),
        listClients(ctx)
      ])
      if (!mounted) return
      setContracts(contractData)
      setClients(clientData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const filtered = useMemo(() => {
    return contracts.filter((contract) => {
      if (filters.lob !== 'all' && contract.lob !== filters.lob) return false
      if (filters.carrier !== 'all' && contract.carrierName !== filters.carrier) return false
      if (filters.status !== 'all' && contract.status !== filters.status) return false
      return true
    })
  }, [contracts, filters])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => (b.isHero ? 1 : 0) - (a.isHero ? 1 : 0))
  }, [filtered])

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.contracts.title')}
        subtitle={t('brokerfox.contracts.subtitle')}
        topRight={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        <Card variant="glass" title={t('brokerfox.contracts.filtersTitle')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <select value={filters.lob} onChange={(event) => setFilters((prev) => ({ ...prev, lob: event.target.value }))} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="all">{t('brokerfox.contracts.filterAllLob')}</option>
              {Array.from(new Set(contracts.map((contract) => contract.lob))).map((lob) => (
                <option key={lob} value={lob}>{lob}</option>
              ))}
            </select>
            <select value={filters.carrier} onChange={(event) => setFilters((prev) => ({ ...prev, carrier: event.target.value }))} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="all">{t('brokerfox.contracts.filterAllCarrier')}</option>
              {Array.from(new Set(contracts.map((contract) => contract.carrierName))).map((carrier) => (
                <option key={carrier} value={carrier}>{carrier}</option>
              ))}
            </select>
            <select value={filters.status} onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="all">{t('brokerfox.contracts.filterAllStatus')}</option>
              <option value="active">{t('brokerfox.contracts.status.active')}</option>
              <option value="pending">{t('brokerfox.contracts.status.pending')}</option>
              <option value="cancelled">{t('brokerfox.contracts.status.cancelled')}</option>
            </select>
          </div>
        </Card>

        <Card variant="glass" title={t('brokerfox.contracts.listTitle')} subtitle={t('brokerfox.contracts.listSubtitle')}>
          {sorted.length === 0 ? <p>{t('brokerfox.contracts.empty')}</p> : null}
          {sorted.map((contract) => (
            <div key={contract.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '0.75rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{contract.policyNumber}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  {clients.find((client) => client.id === contract.clientId)?.name ?? t('brokerfox.clients.clientUnknown')} · {contract.lob} · {contract.carrierName}
                </div>
                {contract.isHero ? <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>{t('brokerfox.contracts.heroBadge')}</span> : null}
              </div>
              <span style={{ color: '#94a3b8' }}>€ {contract.premiumEUR.toLocaleString()}</span>
              <span style={{ color: '#64748b' }}>{t(`brokerfox.contracts.status.${contract.status}`)}</span>
              <Button onClick={() => navigate(`/brokerfox/contracts/${contract.id}`)}>{t('brokerfox.contracts.viewDetail')}</Button>
            </div>
          ))}
        </Card>
      </BrokerfoxLayout>
    </section>
  )
}
