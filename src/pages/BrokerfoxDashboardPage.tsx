import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  createClient,
  createTender,
  getHeroIds,
  listAllTimelineEvents,
  listClients,
  listOffers,
  listRenewals,
  listTasks,
  listTenders
} from '@/brokerfox/api/brokerfoxApi'

export default function BrokerfoxDashboardPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const ctx = useTenantContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    clients: 0,
    tenders: 0,
    offers: 0,
    renewals: 0,
    unread: 0,
    tasks: 0
  })
  const [hero, setHero] = useState<{ clientId: string; tenderId: string } | null>(null)
  const [newClientName, setNewClientName] = useState('')
  const [newTenderTitle, setNewTenderTitle] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [clients, tenders, offers, renewals, tasks, timeline] = await Promise.all([
          listClients(ctx),
          listTenders(ctx),
          listOffers(ctx),
          listRenewals(ctx),
          listTasks(ctx),
          listAllTimelineEvents(ctx)
        ])
        if (!mounted) return
        const unread = timeline.filter((event) => event.type === 'externalMessage').length
        setStats({
          clients: clients.length,
          tenders: tenders.filter((tender) => tender.status !== 'won' && tender.status !== 'lost').length,
          offers: offers.length,
          renewals: renewals.length,
          unread,
          tasks: tasks.filter((task) => task.status !== 'done').length
        })
        setHero(getHeroIds(ctx.tenantId))
        setLoading(false)
      } catch (err) {
        if (!mounted) return
        setError(t('brokerfox.state.error'))
        setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [ctx, t])

  async function handleCreateClient() {
    if (!newClientName.trim()) {
      return
    }
    await createClient(ctx, { name: newClientName.trim() })
    setNewClientName('')
    navigate('/brokerfox/clients')
  }

  async function handleCreateTender() {
    if (!newTenderTitle.trim()) {
      return
    }
    const clients = await listClients(ctx)
    const clientId = clients[0]?.id
    if (!clientId) {
      return
    }
    await createTender(ctx, { clientId, title: newTenderTitle.trim() })
    setNewTenderTitle('')
    navigate('/brokerfox/tenders')
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.dashboard.title')}
        subtitle={t('brokerfox.dashboard.subtitle')}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
        {error ? <p>{error}</p> : null}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
          <Card variant="glass">
            <p style={{ margin: 0 }}>{t('brokerfox.dashboard.kpi.clients')}</p>
            <strong style={{ fontSize: '1.8rem' }}>{stats.clients}</strong>
          </Card>
          <Card variant="glass">
            <p style={{ margin: 0 }}>{t('brokerfox.dashboard.kpi.tenders')}</p>
            <strong style={{ fontSize: '1.8rem' }}>{stats.tenders}</strong>
          </Card>
          <Card variant="glass">
            <p style={{ margin: 0 }}>{t('brokerfox.dashboard.kpi.offers')}</p>
            <strong style={{ fontSize: '1.8rem' }}>{stats.offers}</strong>
          </Card>
          <Card variant="glass">
            <p style={{ margin: 0 }}>{t('brokerfox.dashboard.kpi.renewals')}</p>
            <strong style={{ fontSize: '1.8rem' }}>{stats.renewals}</strong>
          </Card>
          <Card variant="glass">
            <p style={{ margin: 0 }}>{t('brokerfox.dashboard.kpi.unread')}</p>
            <strong style={{ fontSize: '1.8rem' }}>{stats.unread}</strong>
          </Card>
          <Card variant="glass">
            <p style={{ margin: 0 }}>{t('brokerfox.dashboard.kpi.tasks')}</p>
            <strong style={{ fontSize: '1.8rem' }}>{stats.tasks}</strong>
          </Card>
        </div>

        <Card
          variant="glass"
          title={t('brokerfox.dashboard.quickActions')}
          subtitle={t('brokerfox.dashboard.quickActionsSubtitle')}
        >
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <strong>{t('brokerfox.actions.newClient')}</strong>
              <input
                value={newClientName}
                onChange={(event) => setNewClientName(event.target.value)}
                placeholder={t('brokerfox.clients.newPlaceholder')}
                style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
              />
              <Button size="sm" onClick={handleCreateClient}>{t('brokerfox.actions.save')}</Button>
            </div>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <strong>{t('brokerfox.actions.newTender')}</strong>
              <input
                value={newTenderTitle}
                onChange={(event) => setNewTenderTitle(event.target.value)}
                placeholder={t('brokerfox.tenders.newPlaceholder')}
                style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
              />
              <Button size="sm" onClick={handleCreateTender}>{t('brokerfox.actions.save')}</Button>
            </div>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <strong>{t('brokerfox.actions.newMessage')}</strong>
              <Button size="sm" onClick={() => navigate(hero ? `/brokerfox/clients/${hero.clientId}` : '/brokerfox/clients')}>{t('brokerfox.dashboard.goToClients')}</Button>
            </div>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <strong>{t('brokerfox.actions.uploadDocument')}</strong>
              <Button size="sm" onClick={() => navigate('/brokerfox/documents')}>{t('brokerfox.dashboard.goToDocuments')}</Button>
            </div>
          </div>
        </Card>
      </BrokerfoxLayout>
    </section>
  )
}
