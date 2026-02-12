import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listClaims, listTasks, listMailbox } from '@/claimsfox/api/claimsfoxApi'
import type { Claim, Task, MailMessage } from '@/claimsfox/types'

export default function ClaimsfoxDashboardPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [claims, setClaims] = useState<Claim[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [mailbox, setMailbox] = useState<MailMessage[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [claimsData, tasksData, mailboxData] = await Promise.all([
        listClaims(ctx),
        listTasks(ctx),
        listMailbox(ctx)
      ])
      if (!mounted) return
      setClaims(claimsData)
      setTasks(tasksData)
      setMailbox(mailboxData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const kpis = useMemo(() => {
    const openClaims = claims.filter((claim) => !['closed', 'denied'].includes(claim.status)).length
    const slaRisks = claims.filter((claim) => new Date(claim.slaDueAt).getTime() < Date.now() + 5 * 86400000).length
    const fraudFlags = claims.filter((claim) => claim.fraudScore > 0.3).length
    return [
      { label: t('claimsfox.dashboard.kpi.openClaims'), value: openClaims },
      { label: t('claimsfox.dashboard.kpi.slaRisk'), value: slaRisks },
      { label: t('claimsfox.dashboard.kpi.fraudFlags'), value: fraudFlags },
      { label: t('claimsfox.dashboard.kpi.queue'), value: tasks.filter((task) => task.status !== 'done').length }
    ]
  }, [claims, tasks, t])

  const recentClaims = useMemo(() => {
    return [...claims].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
  }, [claims])

  const myQueue = useMemo(() => {
    return tasks.filter((task) => task.status !== 'done').slice(0, 5)
  }, [tasks])

  return (
    <ClaimsfoxLayout
      title={t('claimsfox.dashboard.title')}
      subtitle={t('claimsfox.dashboard.subtitle')}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} style={{ padding: '1rem', display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{kpi.label}</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>{kpi.value}</span>
            </Card>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '1.5rem' }}>
          <Card title={t('claimsfox.dashboard.queueTitle')} subtitle={t('claimsfox.dashboard.queueSubtitle')}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {myQueue.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => navigate('/claimsfox/tasks')}
                  style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', border: 'none', background: 'transparent', color: '#0f172a', padding: 0, textAlign: 'left', cursor: 'pointer' }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{task.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{task.owner}</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>{new Date(task.dueAt).toLocaleDateString()}</div>
                </button>
              ))}
            </div>
          </Card>
          <Card title={t('claimsfox.dashboard.mailTitle')} subtitle={t('claimsfox.dashboard.mailSubtitle')}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {mailbox.slice(0, 4).map((mail) => (
                <div key={mail.id} style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ fontWeight: 600 }}>{mail.subject}</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{mail.from}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card title={t('claimsfox.dashboard.recentTitle')} subtitle={t('claimsfox.dashboard.recentSubtitle')}>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {recentClaims.map((claim) => (
              <button
                key={claim.id}
                type="button"
                onClick={() => navigate(`/claimsfox/claims/${claim.id}`)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '0.75rem 1rem',
                  background: '#fff',
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'grid', gap: '0.2rem', textAlign: 'left' }}>
                  <span style={{ fontWeight: 600 }}>{claim.claimNumber}</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{claim.insured} · {claim.lineOfBusiness}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>{t(`claimsfox.status.${claim.status}`)}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </ClaimsfoxLayout>
  )
}
