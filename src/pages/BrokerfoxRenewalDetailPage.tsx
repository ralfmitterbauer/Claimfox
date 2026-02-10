import React, { useEffect, useMemo, useState } from 'react'
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
import type { DocumentMeta, RenewalItem } from '@/brokerfox/types'

export default function BrokerfoxRenewalDetailPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const { renewalId } = useParams()
  const [renewal, setRenewal] = useState<RenewalItem | null>(null)
  const [clientName, setClientName] = useState('')
  const [contractNumber, setContractNumber] = useState('')
  const [documents, setDocuments] = useState<DocumentMeta[]>([])
  const [events, setEvents] = useState<any[]>([])

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

  async function handleComposer(payload: { type: any; message: string; attachments: DocumentMeta[] }) {
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
        subtitle={renewal.policyName}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        <Button size="sm" onClick={() => navigate('/brokerfox/renewals')}>{t('brokerfox.renewals.back')}</Button>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <Card variant="glass" title={t('brokerfox.renewals.detailSubtitle')}>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.policyLabel')}: {renewal.policyName}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.carrierLabel')}: {renewal.carrier}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.premiumLabel')}: {renewal.premium}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.statusLabel')}: {t(`brokerfox.renewals.status.${renewal.status}`)}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.dueDateLabel')}: {new Date(renewal.renewalDate).toLocaleDateString()}</p>
          </Card>
          <Card variant="glass" title={t('brokerfox.renewals.linksTitle')}>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.clientLabel')}: {clientName || t('brokerfox.clients.clientUnknown')}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.renewals.contractLabel')}: {contractNumber || t('brokerfox.renewals.contractMissing')}</p>
          </Card>
          <Card variant="glass" title={t('brokerfox.renewals.nextStepsTitle')}>
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
              {nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </Card>
        </div>

        <Card variant="glass" title={t('brokerfox.renewals.documentsTitle')}>
          {documents.length === 0 ? <p>{t('brokerfox.empty.noDocuments')}</p> : null}
          {documents.map((doc) => (
            <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0' }}>
              <span>{doc.name}</span>
              <span style={{ color: '#94a3b8' }}>{Math.round(doc.size / 1000)} KB</span>
            </div>
          ))}
        </Card>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <TimelineComposer onSubmit={handleComposer} />
          <TimelineThread events={events} />
        </div>
      </BrokerfoxLayout>
    </section>
  )
}
