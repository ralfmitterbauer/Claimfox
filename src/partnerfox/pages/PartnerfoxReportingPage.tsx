import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases, listPartners, listSubrogation } from '@/partnerfox/api/partnerfoxApi'
import type { Partner, PartnerCase, Subrogation } from '@/partnerfox/types'

export default function PartnerfoxReportingPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [cases, setCases] = useState<PartnerCase[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [subrogation, setSubrogation] = useState<Subrogation[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [caseData, partnerData, subrogationData] = await Promise.all([listCases(ctx), listPartners(ctx), listSubrogation(ctx)])
      if (!mounted) return
      setCases(caseData)
      setPartners(partnerData)
      setSubrogation(subrogationData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const kpis = useMemo(() => {
    const avgRepair = Math.round(cases.reduce((acc, item) => acc + item.repairDurationDays, 0) / Math.max(cases.length, 1))
    const directRatio = Math.round((cases.filter((item) => item.aiApproved).length / Math.max(cases.length, 1)) * 100)
    const rentalDays = cases.reduce((acc, item) => acc + (item.rentalPartnerId ? Math.round(item.repairDurationDays * 0.7) : 0), 0)
    const recovered = subrogation.filter((item) => item.status === 'Recovered').length
    const recoveryRate = Math.round((recovered / Math.max(subrogation.length, 1)) * 100)
    const networkIndex = Math.round(partners.reduce((acc, item) => acc + item.performanceScore, 0) / Math.max(partners.length, 1))
    const costPerClaim = Math.round(cases.reduce((acc, item) => acc + item.estimatedCost, 0) / Math.max(cases.length, 1))
    return [
      { label: t('partnerfox.reporting.kpi.avgRepair'), value: `${avgRepair}d` },
      { label: t('partnerfox.reporting.kpi.directBilling'), value: `${directRatio}%` },
      { label: t('partnerfox.reporting.kpi.rentalDays'), value: rentalDays.toString() },
      { label: t('partnerfox.reporting.kpi.recoveryRate'), value: `${recoveryRate}%` },
      { label: t('partnerfox.reporting.kpi.networkIndex'), value: networkIndex.toString() },
      { label: t('partnerfox.reporting.kpi.costPerClaim'), value: `EUR ${costPerClaim.toLocaleString()}` }
    ]
  }, [cases, partners, subrogation, t])

  const statusData = useMemo(() => {
    const statuses: PartnerCase['status'][] = ['FNOL', 'InRepair', 'WaitingParts', 'RentalActive', 'Closed']
    return statuses.map((status) => ({ name: status, value: cases.filter((item) => item.status === status).length }))
  }, [cases])

  const repairDistribution = useMemo(() => {
    const buckets = [
      { name: '0-3d', min: 0, max: 3 },
      { name: '4-7d', min: 4, max: 7 },
      { name: '8-14d', min: 8, max: 14 },
      { name: '15+d', min: 15, max: 999 }
    ]
    return buckets.map((bucket) => ({
      name: bucket.name,
      value: cases.filter((item) => item.repairDurationDays >= bucket.min && item.repairDurationDays <= bucket.max).length
    }))
  }, [cases])

  const recoveryTrend = useMemo(() => {
    const statuses = ['Open', 'Negotiation', 'Recovered', 'Lost']
    return statuses.map((status) => ({
      status,
      value: subrogation.filter((item) => item.status === status).length
    }))
  }, [subrogation])

  return (
    <PartnerfoxLayout title={t('partnerfox.reporting.title')} subtitle={t('partnerfox.reporting.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} style={{ padding: '1rem', display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{kpi.label}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{kpi.value}</span>
            </Card>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
          <Card title={t('partnerfox.reporting.casesByStatus')}>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={86} fill="#d4380d" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title={t('partnerfox.reporting.repairDistribution')}>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={repairDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#d4380d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card title={t('partnerfox.reporting.recoveryTrend')}>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recoveryTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#d4380d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </PartnerfoxLayout>
  )
}
