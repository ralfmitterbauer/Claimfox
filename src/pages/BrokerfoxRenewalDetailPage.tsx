import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import Button from '@/components/ui/Button'
import TimelineComposer from '@/brokerfox/components/TimelineComposer'
import TimelineThread from '@/brokerfox/components/TimelineThread'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listClients, listContracts, listDocuments, listRenewals, listTimelineEvents } from '@/brokerfox/api/brokerfoxApi'
import type { DocumentMeta, RenewalItem, TimelineEvent, TimelineEventType } from '@/brokerfox/types'
import { localizePolicyName } from '@/brokerfox/utils/localizeDemoValues'

export default function BrokerfoxRenewalDetailPage() {
  const { lang, t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const { renewalId } = useParams()
  const [renewal, setRenewal] = useState<RenewalItem | null>(null)
  const [clientName, setClientName] = useState('')
  const [contractNumber, setContractNumber] = useState('')
  const [documents, setDocuments] = useState<DocumentMeta[]>([])
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const numberFormatter = new Intl.NumberFormat(locale)
  const currencyFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

  function localizePremium(value: string) {
    const normalized = value.trim().replace(/\s+/g, '')
    const match = normalized.match(/^€?(\d+(?:[.,]\d+)?)([kKmM])?$/)
    if (!match) return value
    const numeric = Number(match[1].replace(',', '.'))
    if (Number.isNaN(numeric)) return value
    const suffix = match[2]?.toLowerCase()
    const amount = suffix === 'k' ? numeric * 1000 : suffix === 'm' ? numeric * 1000000 : numeric
    return currencyFormatter.format(amount)
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      const [renewals, clients, contracts, docs] = await Promise.all([
        listRenewals(ctx),
        listClients(ctx),
        listContracts(ctx),
        listDocuments(ctx)
      ])
      if (!mounted) return
      const current = renewals.find((item) => item.id === renewalId) ?? null
      setRenewal(current)
      if (current) {
        setClientName(clients.find((client) => client.id === current.clientId)?.name ?? '')
        setContractNumber(contracts.find((contract) => contract.id === current.contractId)?.policyNumber ?? '')
        setDocuments(docs.filter((doc) => doc.entityType === 'renewal' && doc.entityId === current.id))
        const timeline = await listTimelineEvents(ctx, 'renewal', current.id)
        setEvents(timeline)
      }
    }
    load()
    return () => { mounted = false }
  }, [ctx, renewalId])

  const nextSteps = useMemo(() => (
    [
      t('brokerfox.renewals.nextSteps.updateLossRuns'),
      t('brokerfox.renewals.nextSteps.confirmExposure'),
      t('brokerfox.renewals.nextSteps.scheduleReview')
    ]
  ), [t])

  async function handleComposer(payload: { type: TimelineEventType; message: string; attachments: DocumentMeta[] }) {
    if (!renewal) return
    await addTimelineEvent(ctx, {
      entityType: 'renewal',
      entityId: renewal.id,
      type: payload.type,
      title: payload.type === 'externalMessage' ? t('brokerfox.timeline.externalMessage') : payload.type === 'internalNote' ? t('brokerfox.timeline.internalNote') : t('brokerfox.timeline.statusUpdate'),
      message: payload.message,
      attachments: payload.attachments.map((file) => ({ ...file, tenantId: ctx.tenantId }))
    })
    const timeline = await listTimelineEvents(ctx, 'renewal', renewal.id)
    setEvents(timeline)
  }

  if (!renewal) {
    return (
      <section className="page">
        <p>{t('brokerfox.state.notFound')}</p>
        <Button size="sm" onClick={() => navigate('/brokerfox/renewals')}>{t('brokerfox.renewals.back')}</Button>
      </section>
    )
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.renewals.detailTitle')}
        subtitle={localizePolicyName(renewal.policyName, lang) ?? renewal.policyName}
        topLeft={(
          <div style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1rem', color: '#ffffff', fontSize: '0.9rem' }}>
              <span><strong>{t('brokerfox.renewals.policyLabel')}:</strong> {localizePolicyName(renewal.policyName, lang) ?? renewal.policyName}</span>
              <span><strong>{t('brokerfox.renewals.carrierLabel')}:</strong> {renewal.carrier}</span>
              <span><strong>{t('brokerfox.renewals.premiumLabel')}:</strong> {localizePremium(renewal.premium)}</span>
              <span><strong>{t('brokerfox.renewals.statusLabel')}:</strong> {t(`brokerfox.renewals.status.${renewal.status}`)}</span>
              <span><strong>{t('brokerfox.renewals.dueDateLabel')}:</strong> {new Date(renewal.renewalDate).toLocaleDateString(locale)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button size="sm" variant="secondary" onClick={() => navigate('/brokerfox/renewals')}>{t('brokerfox.renewals.back')}</Button>
              <DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />
            </div>
          </div>
        )}
      >
        <div className="renewal-detail-grid">
          <Card variant="glass" title={t('brokerfox.renewals.statusLabel')}>
            <p style={{ margin: 0 }}>{t(`brokerfox.renewals.status.${renewal.status}`)}</p>
            <div style={{ marginTop: '0.75rem' }}>
              <TimelineComposer onSubmit={handleComposer} />
            </div>
          </Card>
          <Card variant="glass" title={t('brokerfox.renewals.linksTitle')}>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.clientLabel')}: {clientName || t('brokerfox.clients.clientUnknown')}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.contractLabel')}: {localizePolicyName(contractNumber, lang) || t('brokerfox.renewals.contractMissing')}</p>
          </Card>
          <Card variant="glass" title={t('brokerfox.renewals.nextStepsTitle')}>
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
              {nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </Card>
        </div>

        <Card variant="glass" title={t('brokerfox.renewals.detailSubtitle')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <div><strong>{t('brokerfox.renewals.policyLabel')}:</strong> {localizePolicyName(renewal.policyName, lang) ?? renewal.policyName}</div>
            <div><strong>{t('brokerfox.renewals.carrierLabel')}:</strong> {renewal.carrier}</div>
            <div><strong>{t('brokerfox.renewals.premiumLabel')}:</strong> {localizePremium(renewal.premium)}</div>
            <div><strong>{t('brokerfox.renewals.dueDateLabel')}:</strong> {new Date(renewal.renewalDate).toLocaleDateString(locale)}</div>
          </div>
        </Card>

        <Card variant="glass" title={t('brokerfox.renewals.documentsTitle')}>
          {documents.length === 0 ? <p>{t('brokerfox.empty.noDocuments')}</p> : null}
          {documents.map((doc) => (
            <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0' }}>
              <span>{doc.name}</span>
              <span style={{ color: '#94a3b8' }}>{numberFormatter.format(Math.round(doc.size / 1000))} KB</span>
            </div>
          ))}
        </Card>

        <TimelineThread events={events} />
        <style>
          {`
            .renewal-detail-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 1.25rem;
            }
            @media (max-width: 1024px) {
              .renewal-detail-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }
            @media (max-width: 720px) {
              .renewal-detail-grid {
                grid-template-columns: 1fr;
              }
            }
          `}
        </style>
      </BrokerfoxLayout>
    </section>
  )
}
