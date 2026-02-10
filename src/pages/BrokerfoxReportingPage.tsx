import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listClients, listCommissions, listContracts, listMailboxItems, listOffers, listRenewals, listTasks, listTenders, sendCommissionReminder } from '@/brokerfox/api/brokerfoxApi'

const rangeOptions = [
  { value: '30', labelKey: 'brokerfox.reporting.range30' },
  { value: '90', labelKey: 'brokerfox.reporting.range90' },
  { value: '365', labelKey: 'brokerfox.reporting.range365' }
]

export default function BrokerfoxReportingPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [range, setRange] = useState('90')
  const [industry, setIndustry] = useState('all')
  const [data, setData] = useState<any>({})

  useEffect(() => {
    let mounted = true
    async function load() {
      const [clients, tenders, offers, renewals, tasks, mailbox, contracts, commissions] = await Promise.all([
        listClients(ctx),
        listTenders(ctx),
        listOffers(ctx),
        listRenewals(ctx),
        listTasks(ctx),
        listMailboxItems(ctx),
        listContracts(ctx),
        listCommissions(ctx)
      ])
      if (!mounted) return
      setData({ clients, tenders, offers, renewals, tasks, mailbox, contracts, commissions })
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  async function handleReminder(contractId: string, commissionId: string) {
    await sendCommissionReminder(ctx, contractId, commissionId)
  }

  const filteredClients = useMemo(() => {
    if (!data.clients) return []
    if (industry === 'all') return data.clients
    return data.clients.filter((client: any) => client.industry === industry)
  }, [data.clients, industry])

  const filteredTenders = useMemo(() => {
    if (!data.tenders) return []
    const days = Number(range)
    const cutoff = Date.now() - days * 86400000
    return data.tenders.filter((tender: any) => new Date(tender.createdAt).getTime() >= cutoff)
  }, [data.tenders, range])

  const kpiData = useMemo(() => {
    return [
      { name: t('brokerfox.reporting.kpi.clients'), value: filteredClients.length },
      { name: t('brokerfox.reporting.kpi.openTenders'), value: filteredTenders.filter((t: any) => !['won', 'lost'].includes(t.status)).length },
      { name: t('brokerfox.reporting.kpi.offers'), value: data.offers?.length ?? 0 },
      { name: t('brokerfox.reporting.kpi.renewals'), value: data.renewals?.length ?? 0 }
    ]
  }, [filteredClients, filteredTenders, data.offers, data.renewals, t])

  const statusDistribution = useMemo(() => {
    const counts: Record<string, number> = { draft: 0, sent: 0, offersReceived: 0, negotiation: 0, won: 0, lost: 0 }
    filteredTenders.forEach((t: any) => { counts[t.status] = (counts[t.status] ?? 0) + 1 })
    return Object.entries(counts).map(([key, value]) => ({ name: t(`brokerfox.status.${key}`), value }))
  }, [filteredTenders, t])

  const tasksByStatus = useMemo(() => {
    const counts: Record<string, number> = { todo: 0, inProgress: 0, done: 0 }
    ;(data.tasks ?? []).forEach((task: any) => { counts[task.status] = (counts[task.status] ?? 0) + 1 })
    return Object.entries(counts).map(([key, value]) => ({ name: t(`brokerfox.tasks.${key}`), value }))
  }, [data.tasks, t])

  const timeSeries = useMemo(() => {
    const months = Array.from({ length: 12 }).map((_, idx) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - idx))
      return { key: date.toISOString().slice(0, 7), label: date.toLocaleString(undefined, { month: 'short' }) }
    })
    return months.map((month) => {
      const tenders = (data.tenders ?? []).filter((t: any) => t.createdAt.startsWith(month.key)).length
      const offers = (data.offers ?? []).filter((o: any) => o.createdAt.startsWith(month.key)).length
      const renewals = (data.renewals ?? []).filter((r: any) => r.renewalDate.startsWith(month.key)).length
      return { label: month.label, tenders, offers, renewals }
    })
  }, [data.tenders, data.offers, data.renewals])

  const premiumByLine = useMemo(() => {
    const buckets: Record<string, number> = {}
    ;(data.offers ?? []).forEach((offer: any) => {
      offer.lines.forEach((line: any) => {
        const key = line.coverage
        const value = Number(line.premium.replace(/[^0-9]/g, '')) || 0
        buckets[key] = (buckets[key] ?? 0) + value
      })
    })
    return Object.entries(buckets).map(([name, value]) => ({ name, value }))
  }, [data.offers])

  const commissionSeries = useMemo(() => {
    const months = Array.from({ length: 12 }).map((_, idx) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - idx))
      return { key: date.toISOString().slice(0, 7), label: date.toLocaleString(undefined, { month: 'short' }) }
    })
    return months.map((month) => {
      const list = (data.commissions ?? []).filter((c: any) => c.period === month.key)
      const expected = list.reduce((sum: number, item: any) => sum + item.expectedEUR, 0)
      const paid = list.reduce((sum: number, item: any) => sum + item.paidEUR, 0)
      const outstanding = list.reduce((sum: number, item: any) => sum + item.outstandingEUR, 0)
      return { label: month.label, expected, paid, outstanding }
    })
  }, [data.commissions])

  const outstandingByCarrier = useMemo(() => {
    const contractsMap = new Map((data.contracts ?? []).map((contract: any) => [contract.id, contract]))
    const buckets: Record<string, number> = {}
    ;(data.commissions ?? []).forEach((item: any) => {
      if (!item.outstandingEUR) return
      const carrier = contractsMap.get(item.contractId)?.carrierName ?? 'Unknown'
      buckets[carrier] = (buckets[carrier] ?? 0) + item.outstandingEUR
    })
    return Object.entries(buckets).map(([name, value]) => ({ name, value }))
  }, [data.contracts, data.commissions])

  const outstandingTable = useMemo(() => {
    const contractsMap = new Map((data.contracts ?? []).map((contract: any) => [contract.id, contract]))
    return (data.commissions ?? [])
      .filter((item: any) => item.outstandingEUR > 0)
      .map((item: any) => ({ ...item, carrier: contractsMap.get(item.contractId)?.carrierName ?? 'Unknown' }))
  }, [data.contracts, data.commissions])

  const mailboxBacklog = useMemo(() => {
    return (data.mailbox ?? []).filter((item: any) => item.status !== 'done').length
  }, [data.mailbox])

  const avgTenderToOffers = useMemo(() => {
    const pairs = (data.tenders ?? []).map((t: any) => {
      const offers = (data.offers ?? []).filter((o: any) => o.tenderId === t.id)
      if (!offers.length) return null
      const firstOffer = offers[0]
      const diff = new Date(firstOffer.createdAt).getTime() - new Date(t.createdAt).getTime()
      return diff / 86400000
    }).filter(Boolean) as number[]
    if (!pairs.length) return 0
    return Math.round((pairs.reduce((a, b) => a + b, 0) / pairs.length) * 10) / 10
  }, [data.tenders, data.offers])

  const industries = useMemo(() => {
    const list = (data.clients ?? []).map((client: any) => client.industry).filter(Boolean)
    return Array.from(new Set(list))
  }, [data.clients])

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.reporting.title')}
        subtitle={t('brokerfox.reporting.subtitle')}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >

        <Card variant="glass" title={t('brokerfox.reporting.filtersTitle')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            <select value={range} onChange={(event) => setRange(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              {rangeOptions.map((option) => (
                <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
              ))}
            </select>
            <select value={industry} onChange={(event) => setIndustry(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="all">{t('brokerfox.reporting.allIndustries')}</option>
              {industries.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </Card>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {kpiData.map((item) => (
            <Card key={item.name} variant="glass">
              <p style={{ margin: 0 }}>{item.name}</p>
              <strong style={{ fontSize: '1.6rem' }}>{item.value}</strong>
            </Card>
          ))}
          <Card variant="glass">
            <p style={{ margin: 0 }}>{t('brokerfox.reporting.kpi.avgOffer')}</p>
            <strong style={{ fontSize: '1.6rem' }}>{avgTenderToOffers} {t('brokerfox.reporting.days')}</strong>
          </Card>
          <Card variant="glass">
            <p style={{ margin: 0 }}>{t('brokerfox.reporting.kpi.mailboxBacklog')}</p>
            <strong style={{ fontSize: '1.6rem' }}>{mailboxBacklog}</strong>
          </Card>
        </div>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <Card variant="glass" title={t('brokerfox.reporting.timeSeriesTitle')}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={timeSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tenders" stroke="#0f172a" />
                <Line type="monotone" dataKey="offers" stroke="#f59e0b" />
                <Line type="monotone" dataKey="renewals" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card variant="glass" title={t('brokerfox.reporting.statusTitle')}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" nameKey="name" outerRadius={80} fill="#0f172a" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <Card variant="glass" title={t('brokerfox.reporting.premiumTitle')}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={premiumByLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card variant="glass" title={t('brokerfox.reporting.tasksTitle')}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={tasksByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <Card variant="glass" title={t('brokerfox.commissions.chartTitle')}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={commissionSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="expected" stroke="#0f172a" />
                <Line type="monotone" dataKey="paid" stroke="#10b981" />
                <Line type="monotone" dataKey="outstanding" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card variant="glass" title={t('brokerfox.commissions.byCarrierTitle')}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={outstandingByCarrier}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card variant="glass" title={t('brokerfox.commissions.outstandingTitle')}>
          {outstandingTable.length === 0 ? <p>{t('brokerfox.commissions.noneOutstanding')}</p> : null}
          {outstandingTable.map((item: any) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'center', padding: '0.4rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{item.period}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.carrier}</div>
              </div>
              <span style={{ color: '#ef4444' }}>€ {item.outstandingEUR.toLocaleString()}</span>
              <button
                type="button"
                onClick={() => handleReminder(item.contractId, item.id)}
                style={{ border: '1px solid #e2e8f0', background: '#fff', borderRadius: 999, padding: '0.3rem 0.8rem' }}
              >
                {t('brokerfox.commissions.sendReminder')}
              </button>
            </div>
          ))}
        </Card>
      </BrokerfoxLayout>
    </section>
  )
}
