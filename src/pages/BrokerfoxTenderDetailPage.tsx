import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxHeader from '@/brokerfox/components/BrokerfoxHeader'
import Button from '@/components/ui/Button'
import BrokerfoxNav from '@/brokerfox/components/BrokerfoxNav'
import TimelineComposer from '@/brokerfox/components/TimelineComposer'
import TimelineThread from '@/brokerfox/components/TimelineThread'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import RiskAnalysisPanel from '@/brokerfox/components/RiskAnalysisPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  getTender,
  listClients,
  listDocuments,
  listTimelineEvents,
  updateTender,
  uploadDocument
} from '@/brokerfox/api/brokerfoxApi'
import type { DocumentMeta, TenderStatus } from '@/brokerfox/types'
import { buildRiskAnalysis } from '@/brokerfox/ai/riskEngine'

const wizardSteps = ['requirements', 'risk', 'timeline'] as const

type WizardStep = typeof wizardSteps[number]

export default function BrokerfoxTenderDetailPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const { tenderId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tender, setTender] = useState<any>(null)
  const [client, setClient] = useState<any>(null)
  const [documents, setDocuments] = useState<DocumentMeta[]>([])
  const [events, setEvents] = useState([])
  const [wizardStep, setWizardStep] = useState<WizardStep>('requirements')
  const [draftMessage, setDraftMessage] = useState('')
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!tenderId) return
      try {
        const [tenderData, docs, timeline, clients] = await Promise.all([
          getTender(ctx, tenderId),
          listDocuments(ctx),
          listTimelineEvents(ctx, 'tender', tenderId),
          listClients(ctx)
        ])
        if (!mounted) return
        setTender(tenderData)
        setDocuments(docs.filter((doc) => doc.entityType === 'tender' && doc.entityId === tenderId))
        setEvents(timeline)
        setClient(clients.find((item) => item.id === tenderData?.clientId) ?? null)
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
  }, [tenderId, ctx, t])

  const coverageRequests = useMemo(() => tender?.coverageRequests ?? [], [tender])
  const analysis = useMemo(() => buildRiskAnalysis(client, tender), [client, tender])

  async function handleComposer(payload: { type: any; message: string; attachments: DocumentMeta[] }) {
    if (!tenderId) return
    for (const attachment of payload.attachments) {
      await uploadDocument(ctx, {
        name: attachment.name,
        type: attachment.type,
        size: attachment.size,
        entityType: 'tender',
        entityId: tenderId
      })
    }
    await addTimelineEvent(ctx, {
      entityType: 'tender',
      entityId: tenderId,
      type: payload.type,
      title: payload.type === 'externalMessage' ? t('brokerfox.timeline.externalMessage') : payload.type === 'internalNote' ? t('brokerfox.timeline.internalNote') : t('brokerfox.timeline.statusUpdate'),
      message: payload.message
    })
    const [nextDocs, nextEvents] = await Promise.all([
      listDocuments(ctx),
      listTimelineEvents(ctx, 'tender', tenderId)
    ])
    setDocuments(nextDocs.filter((doc) => doc.entityType === 'tender' && doc.entityId === tenderId))
    setEvents(nextEvents)
  }

  async function handleStatusChange(next: TenderStatus) {
    if (!tenderId) return
    const updated = await updateTender(ctx, tenderId, { status: next })
    setTender(updated)
  }

  async function handleSendDraft() {
    if (!tenderId || !draftMessage.trim() || !approved) return
    await addTimelineEvent(ctx, {
      entityType: 'tender',
      entityId: tenderId,
      type: 'externalMessage',
      title: t('brokerfox.ai.draftSentTitle'),
      message: draftMessage
    })
    const nextEvents = await listTimelineEvents(ctx, 'tender', tenderId)
    setEvents(nextEvents)
    setDraftMessage('')
    setApproved(false)
  }

  if (loading) {
    return (
      <section className="page">
        <p>{t('brokerfox.state.loading')}</p>
      </section>
    )
  }

  if (error || !tender) {
    return (
      <section className="page">
        <p>{error ?? t('brokerfox.state.notFound')}</p>
        <Button onClick={() => navigate('/brokerfox/tenders')}>{t('brokerfox.tenders.back')}</Button>
      </section>
    )
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <BrokerfoxHeader title={tender.title} subtitle={t('brokerfox.tenders.detailSubtitle')} />
        <DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />
        <BrokerfoxNav />
        <Button onClick={() => navigate('/brokerfox/tenders')}>{t('brokerfox.tenders.back')}</Button>

        <Card variant="glass" title={t('brokerfox.tenders.statusTitle')}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>{t('brokerfox.tenders.statusLabel')}</span>
            <select
              value={tender.status}
              onChange={(event) => handleStatusChange(event.target.value as TenderStatus)}
              style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            >
              {['draft', 'sent', 'offersReceived', 'negotiation', 'won', 'lost'].map((status) => (
                <option key={status} value={status}>{t(`brokerfox.status.${status}`)}</option>
              ))}
            </select>
          </div>
        </Card>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <Card variant="glass" title={t('brokerfox.tenders.requirementsTitle')}>
            {coverageRequests.length === 0 ? <p>{t('brokerfox.tenders.requirementsEmpty')}</p> : null}
            {coverageRequests.map((req: any) => (
              <div key={req.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{req.label}</strong>
                <div style={{ color: '#64748b' }}>{t('brokerfox.tenders.limitLabel')}: {req.limit}</div>
                <div style={{ color: '#64748b' }}>{t('brokerfox.tenders.deductibleLabel')}: {req.deductible ?? t('brokerfox.tenders.none')}</div>
              </div>
            ))}
          </Card>
          <Card variant="glass" title={t('brokerfox.tenders.carriersTitle')}>
            {tender.invitedCarriers.length === 0 ? <p>{t('brokerfox.tenders.carriersEmpty')}</p> : null}
            {tender.invitedCarriers.map((carrier: any) => (
              <div key={carrier.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{carrier.name}</strong>
                <div style={{ color: '#64748b' }}>{carrier.email ?? t('brokerfox.tenders.noEmail')}</div>
              </div>
            ))}
          </Card>
          <Card variant="glass" title={t('brokerfox.documents.title')}>
            {documents.length === 0 ? <p>{t('brokerfox.empty.noDocuments')}</p> : null}
            {documents.map((doc) => (
              <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0' }}>
                <span>{doc.name}</span>
                <span style={{ color: '#94a3b8' }}>{Math.round(doc.size / 1000)} KB</span>
              </div>
            ))}
          </Card>
        </div>

        <Card variant="glass" title={t('brokerfox.tenders.wizardTitle')} subtitle={t('brokerfox.tenders.wizardSubtitle')}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {wizardSteps.map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setWizardStep(step)}
                style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: 999,
                  border: '1px solid #e2e8f0',
                  background: wizardStep === step ? '#0f172a' : '#ffffff',
                  color: wizardStep === step ? '#ffffff' : '#0f172a'
                }}
              >
                {t(`brokerfox.tenders.wizard.${step}`)}
              </button>
            ))}
          </div>
          {wizardStep === 'requirements' ? (
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <p style={{ margin: 0 }}>{t('brokerfox.tenders.wizard.requirementsHint')}</p>
              <input placeholder={t('brokerfox.tenders.wizard.requirementsField')} style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
            </div>
          ) : null}
          {wizardStep === 'risk' ? (
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <p style={{ margin: 0 }}>{t('brokerfox.tenders.wizard.riskHint')}</p>
              <input placeholder={t('brokerfox.tenders.wizard.riskField')} style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
            </div>
          ) : null}
          {wizardStep === 'timeline' ? (
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <p style={{ margin: 0 }}>{t('brokerfox.tenders.wizard.timelineHint')}</p>
              <input placeholder={t('brokerfox.tenders.wizard.timelineField')} style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
            </div>
          ) : null}
        </Card>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <TimelineComposer onSubmit={handleComposer} />
          <TimelineThread events={events} />
        </div>

        <RiskAnalysisPanel
          analysis={analysis}
          onCopyMessage={() => setDraftMessage(t('brokerfox.ai.draftTemplate', { client: client?.name ?? tender.title }))}
          onCreateTask={async () => {
            await addTimelineEvent(ctx, {
              entityType: 'tender',
              entityId: tenderId,
              type: 'statusUpdate',
              title: t('brokerfox.ai.taskCreatedTitle'),
              message: t('brokerfox.ai.taskCreatedMessage')
            })
            const nextEvents = await listTimelineEvents(ctx, 'tender', tenderId)
            setEvents(nextEvents)
          }}
          onMarkReviewed={async () => {
            await addTimelineEvent(ctx, {
              entityType: 'tender',
              entityId: tenderId,
              type: 'statusUpdate',
              title: t('brokerfox.ai.reviewedTitle'),
              message: t('brokerfox.ai.reviewedMessage')
            })
            const nextEvents = await listTimelineEvents(ctx, 'tender', tenderId)
            setEvents(nextEvents)
          }}
        />

        {draftMessage ? (
          <Card variant="glass" title={t('brokerfox.ai.draftTitle')} subtitle={t('brokerfox.ai.draftSubtitle')}>
            <textarea value={draftMessage} onChange={(event) => setDraftMessage(event.target.value)} rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
            <label style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input type="checkbox" checked={approved} onChange={(event) => setApproved(event.target.checked)} />
              {t('brokerfox.ai.approvalLabel')}
            </label>
            <Button onClick={handleSendDraft} disabled={!approved}>{t('brokerfox.ai.sendDraft')}</Button>
          </Card>
        ) : null}
      </div>
    </section>
  )
}
