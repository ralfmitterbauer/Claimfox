import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases, listPartners, listSubrogation } from '@/partnerfox/api/partnerfoxApi'
import type { Partner, PartnerCase, Subrogation } from '@/partnerfox/types'

export default function PartnerfoxDashboardPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [partners, setPartners] = useState<Partner[]>([])
  const [cases, setCases] = useState<PartnerCase[]>([])
  const [subrogation, setSubrogation] = useState<Subrogation[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [partnerData, caseData, subrogationData] = await Promise.all([
        listPartners(ctx),
        listCases(ctx),
        listSubrogation(ctx)
      ])
      if (!mounted) return
      setPartners(partnerData)
      setCases(caseData)
      setSubrogation(subrogationData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const kpis = useMemo(() => {
    const openCases = cases.filter((item) => item.status !== 'Closed').length
    const directBilling = cases.filter((item) => item.aiApproved).length
    const recoveryRate = Math.round((subrogation.filter((item) => item.status === 'Recovered').length / Math.max(subrogation.length, 1)) * 100)
    return [
      { label: t('partnerfox.dashboard.kpi.partners'), value: partners.length.toString() },
      { label: t('partnerfox.dashboard.kpi.casesOpen'), value: openCases.toString() },
      { label: t('partnerfox.dashboard.kpi.directBilling'), value: `${Math.round((directBilling / Math.max(cases.length, 1)) * 100)}%` },
      { label: t('partnerfox.dashboard.kpi.subrogation'), value: subrogation.length.toString() },
      { label: t('partnerfox.dashboard.kpi.recoveryRate'), value: `${recoveryRate}%` }
    ]
  }, [cases, partners.length, subrogation, t])

  return (
    <PartnerfoxLayout title={t('partnerfox.dashboard.title')} subtitle={t('partnerfox.dashboard.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} style={{ padding: '1rem', display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{kpi.label}</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>{kpi.value}</span>
            </Card>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
          <Card title={t('partnerfox.dashboard.networkTitle')}>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {partners.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/partnerfox/network/${item.id}`)}
                  style={{ border: '1px solid #e2e8f0', background: '#fff', borderRadius: 10, padding: '0.55rem 0.7rem', textAlign: 'left', cursor: 'pointer' }}
                >
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.type} · {item.networkRegion}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card title={t('partnerfox.dashboard.casesTitle')}>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {cases.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/partnerfox/cases/${item.id}`)}
                  style={{ border: '1px solid #e2e8f0', background: '#fff', borderRadius: 10, padding: '0.55rem 0.7rem', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                >
                  <span><strong>{item.claimNumber}</strong><div style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.vehiclePlate}</div></span>
                  <span style={{ color: '#475569', fontSize: '0.82rem' }}>{item.status}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PartnerfoxLayout>
  )
}
