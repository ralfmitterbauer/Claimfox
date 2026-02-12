import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { createClient, listClients } from '@/brokerfox/api/brokerfoxApi'
import { localizeClientIndustry, localizeClientSegment } from '@/brokerfox/utils/localizeDemoValues'

export default function BrokerfoxClientsPage() {
  const { lang, t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [clients, setClients] = useState([])
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({ name: '', segment: '', industry: '' })

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await listClients(ctx)
        if (!mounted) return
        setClients(data)
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

  const filtered = useMemo(() => {
    const list = query.trim()
      ? clients.filter((client: any) => client.name.toLowerCase().includes(query.toLowerCase()))
      : clients
    return [...list].sort((a: any, b: any) => Number(Boolean(b.isHero)) - Number(Boolean(a.isHero)))
  }, [clients, query])

  async function handleCreate() {
    if (!form.name.trim()) {
      return
    }
    const created = await createClient(ctx, {
      name: form.name.trim(),
      segment: form.segment.trim() || undefined,
      industry: form.industry.trim() || undefined
    })
    setClients((prev) => [created, ...prev])
    setForm({ name: '', segment: '', industry: '' })
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.clients.title')}
        subtitle={t('brokerfox.clients.subtitle')}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        <Card variant="glass" title={t('brokerfox.clients.createTitle')} subtitle={t('brokerfox.clients.createSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder={t('brokerfox.clients.fieldName')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <input
              value={form.segment}
              onChange={(event) => setForm((prev) => ({ ...prev, segment: event.target.value }))}
              placeholder={t('brokerfox.clients.fieldSegment')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <input
              value={form.industry}
              onChange={(event) => setForm((prev) => ({ ...prev, industry: event.target.value }))}
              placeholder={t('brokerfox.clients.fieldIndustry')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <Button size="sm" onClick={handleCreate}>{t('brokerfox.actions.newClient')}</Button>
          </div>
        </Card>
        <Card variant="glass" title={t('brokerfox.clients.listTitle')} subtitle={t('brokerfox.clients.listSubtitle')}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('brokerfox.clients.searchPlaceholder')}
            style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0', marginBottom: '1rem' }}
          />
          {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
          {error ? <p>{error}</p> : null}
          {filtered.length === 0 ? <p>{t('brokerfox.empty.noClients')}</p> : null}
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {filtered.map((client: any) => (
              <button
                key={client.id}
                type="button"
                onClick={() => navigate(`/brokerfox/clients/${client.id}`)}
                style={{
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#0f172a',
                  borderRadius: 12,
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left'
                }}
              >
                <div>
                  <strong style={{ color: '#0f172a' }}>{client.name}</strong>
                  <div style={{ color: '#475569', fontSize: '0.9rem' }}>
                    {localizeClientSegment(client.segment, lang) ?? t('brokerfox.clients.segmentMissing')} · {localizeClientIndustry(client.industry, lang) ?? t('brokerfox.clients.industryMissing')}
                  </div>
                </div>
                <span style={{ color: '#64748b' }}>{t('brokerfox.clients.viewDetails')}</span>
              </button>
            ))}
          </div>
        </Card>
      </BrokerfoxLayout>
    </section>
  )
}
