import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listClaims, listTasks } from '@/claimsfox/api/claimsfoxApi'
import type { Claim, Task } from '@/claimsfox/types'

export default function ClaimsfoxReportingPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [claims, setClaims] = useState<Claim[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [claimsData, tasksData] = await Promise.all([
        listClaims(ctx),
        listTasks(ctx)
      ])
      if (!mounted) return
      setClaims(claimsData)
      setTasks(tasksData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const statusDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    claims.forEach((claim) => { counts[claim.status] = (counts[claim.status] ?? 0) + 1 })
    return Object.entries(counts).map(([key, value]) => ({ name: t(`claimsfox.status.${key}`), value }))
  }, [claims, t])

  const severityDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    claims.forEach((claim) => { counts[claim.severity] = (counts[claim.severity] ?? 0) + 1 })
    return Object.entries(counts).map(([key, value]) => ({ name: t(`claimsfox.severity.${key}`), value }))
  }, [claims, t])

  const slaRisk = useMemo(() => {
    const nearDue = claims.filter((claim) => new Date(claim.slaDueAt).getTime() < Date.now() + 5 * 86400000).length
    return [
      { name: t('claimsfox.reporting.slaOnTrack'), value: claims.length - nearDue },
      { name: t('claimsfox.reporting.slaRisk'), value: nearDue }
    ]
  }, [claims, t])

  const tasksByStatus = useMemo(() => {
    const counts: Record<string, number> = {}
    tasks.forEach((task) => { counts[task.status] = (counts[task.status] ?? 0) + 1 })
    return Object.entries(counts).map(([key, value]) => ({ name: t(`claimsfox.tasks.status.${key}`), value }))
  }, [tasks, t])

  const fraudCount = useMemo(() => claims.filter((claim) => claim.fraudScore > 0.3).length, [claims])

  async function exportAudit() {
    await addTimelineEvent(ctx, {
      entityType: 'claim',
      entityId: claims[0]?.id ?? 'audit',
      type: 'system',
      title: lang === 'de' ? 'Audit-Export angefordert' : 'Audit export requested',
      message: lang === 'de' ? 'Compliance-Export für aktuellen Mandanten erzeugt.' : 'Compliance export generated for current tenant.',
      actor: ctx.userId
    })
  }

  return (
    <ClaimsfoxLayout title={t('claimsfox.reporting.title')} subtitle={t('claimsfox.reporting.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Card title={t('claimsfox.reporting.statusTitle')}>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" nameKey="name" outerRadius={90} fill="#d4380d" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <Card title={t('claimsfox.reporting.severityTitle')}>
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={severityDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t('claimsfox.reporting.slaTitle')}>
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={slaRisk}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0f172a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t('claimsfox.reporting.tasksTitle')}>
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={tasksByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t('claimsfox.reporting.auditTitle')} subtitle={t('claimsfox.reporting.auditSubtitle')}>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#475569' }}>{t('claimsfox.reporting.fraudFlags')}: <strong>{fraudCount}</strong></div>
              <div style={{ fontSize: '0.9rem', color: '#475569' }}>{t('claimsfox.reporting.auditHint')}</div>
              <Button size="sm" onClick={exportAudit}>{t('claimsfox.reporting.auditExport')}</Button>
            </div>
          </Card>
        </div>
      </div>
    </ClaimsfoxLayout>
  )
}
