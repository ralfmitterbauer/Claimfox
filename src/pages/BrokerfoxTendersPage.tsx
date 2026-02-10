import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { createTender, listClients, listTenders } from '@/brokerfox/api/brokerfoxApi'
import type { Client } from '@/brokerfox/types'

export default function BrokerfoxTendersPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tenders, setTenders] = useState<any[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [form, setForm] = useState({ title: '', clientId: '', description: '' })

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [tenderData, clientData] = await Promise.all([listTenders(ctx), listClients(ctx)])
        if (!mounted) return
        setTenders(tenderData)
        setClients(clientData)
        setForm((prev) => ({ ...prev, clientId: clientData[0]?.id ?? '' }))
        setLoading(false)
      } catch {
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

  const clientLookup = useMemo(() => {
    return clients.reduce<Record<string, Client>>((acc, client) => {
      acc[client.id] = client
      return acc
    }, {})
  }, [clients])

  async function handleCreate() {
    if (!form.title.trim() || !form.clientId) {
      return
    }
    const created = await createTender(ctx, {
      clientId: form.clientId,
      title: form.title.trim(),
      description: form.description.trim() || undefined
    })
    setTenders((prev) => [created, ...prev])
    setForm((prev) => ({ ...prev, title: '', description: '' }))
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.tenders.title')}
        subtitle={t('brokerfox.tenders.subtitle')}
        topRight={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        <Card variant="glass" title={t('brokerfox.tenders.createTitle')} subtitle={t('brokerfox.tenders.createSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder={t('brokerfox.tenders.fieldTitle')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <select
              value={form.clientId}
              onChange={(event) => setForm((prev) => ({ ...prev, clientId: event.target.value }))}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
            <input
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder={t('brokerfox.tenders.fieldDescription')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <Button onClick={handleCreate}>{t('brokerfox.actions.newTender')}</Button>
          </div>
        </Card>
        <Card variant="glass" title={t('brokerfox.tenders.listTitle')} subtitle={t('brokerfox.tenders.listSubtitle')}>
          {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
          {error ? <p>{error}</p> : null}
          {tenders.length === 0 ? <p>{t('brokerfox.empty.noTenders')}</p> : null}
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[...tenders].sort((a, b) => Number(Boolean(b.isHero)) - Number(Boolean(a.isHero))).map((tender) => (
              <button
                key={tender.id}
                type="button"
                onClick={() => navigate(`/brokerfox/tenders/${tender.id}`)}
                style={{
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  borderRadius: 12,
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left'
                }}
              >
                <div>
                  <strong>{tender.title}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{clientLookup[tender.clientId]?.name ?? t('brokerfox.tenders.clientMissing')}</div>
                </div>
                <span style={{ color: '#94a3b8' }}>{t(`brokerfox.status.${tender.status}`)}</span>
              </button>
            ))}
          </div>
        </Card>
      </BrokerfoxLayout>
    </section>
  )
}
