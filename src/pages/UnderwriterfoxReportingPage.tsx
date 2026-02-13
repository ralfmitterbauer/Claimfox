import { useEffect, useMemo, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import Card from '@/components/ui/Card'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases } from '@/underwriterfox/api/underwriterfoxApi'
import type { UnderwritingCase } from '@/underwriterfox/types'

const COLORS = ['#0f172a', '#f97316', '#38bdf8', '#22c55e', '#eab308', '#ef4444']

export default function UnderwriterfoxReportingPage() {
  const { t } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [cases, setCases] = useState<UnderwritingCase[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listCases(ctx)
      if (!mounted) return
      setCases(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx.tenantId])

  const riskDistribution = useMemo(() => {
    const buckets = [
      { name: '0-40', value: 0 },
      { name: '41-60', value: 0 },
      { name: '61-80', value: 0 },
      { name: '81-100', value: 0 }
    ]
    cases.forEach((item) => {
      if (item.risk.score <= 40) buckets[0].value += 1
      else if (item.risk.score <= 60) buckets[1].value += 1
      else if (item.risk.score <= 80) buckets[2].value += 1
      else buckets[3].value += 1
    })
    return buckets
  }, [cases])

  const cycleBuckets = useMemo(() => {
    return [
      { name: t('underwriterfox.reporting.cycleBuckets.lt7'), value: 10 },
      { name: t('underwriterfox.reporting.cycleBuckets.d7_14'), value: 8 },
      { name: t('underwriterfox.reporting.cycleBuckets.d15_30'), value: 7 },
      { name: t('underwriterfox.reporting.cycleBuckets.d30plus'), value: 5 }
    ]
  }, [t])

  const decisionBreakdown = useMemo(() => {
    const counts = { approved: 0, declined: 0, referred: 0 }
    cases.forEach((item) => {
      if (item.decision?.status === 'approved') counts.approved += 1
      if (item.decision?.status === 'declined') counts.declined += 1
      if (item.decision?.status === 'referred') counts.referred += 1
    })
    return [
      { name: t('underwriterfox.ai.decision.approve'), value: counts.approved },
      { name: t('underwriterfox.ai.decision.decline'), value: counts.declined },
      { name: t('underwriterfox.ai.decision.refer'), value: counts.referred }
    ]
  }, [cases, t])

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.reporting.title')} subtitle={t('underwriterfox.reporting.subtitle')}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <Card variant="glass" title={t('underwriterfox.reporting.riskDistribution')}>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={riskDistribution} dataKey="value" nameKey="name" outerRadius={80}>
                    {riskDistribution.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card variant="glass" title={t('underwriterfox.reporting.cycleTime')}>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={cycleBuckets}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0f172a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card variant="glass" title={t('underwriterfox.reporting.decisions')}>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={decisionBreakdown} dataKey="value" nameKey="name" outerRadius={80}>
                    {decisionBreakdown.map((_, idx) => (
                      <Cell key={`cell-dec-${idx}`} fill={COLORS[(idx + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </UnderwriterfoxLayout>
    </section>
  )
}
