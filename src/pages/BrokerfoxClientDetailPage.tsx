import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import RiskAnalysisPanel from '@/brokerfox/components/RiskAnalysisPanel'
import TimelineThread from '@/brokerfox/components/TimelineThread'
import TimelineComposer from '@/brokerfox/components/TimelineComposer'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  getClient,
  listDocuments,
  listTimelineEvents,
  uploadDocument
} from '@/brokerfox/api/brokerfoxApi'
import type { DocumentMeta } from '@/brokerfox/types'
import { buildRiskAnalysis } from '@/brokerfox/ai/riskEngine'

export default function BrokerfoxClientDetailPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const { clientId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [client, setClient] = useState<any>(null)
  const [documents, setDocuments] = useState<DocumentMeta[]>([])
  const [events, setEvents] = useState([])
  const [draftMessage, setDraftMessage] = useState('')
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!clientId) {
        return
      }
      try {
        const [clientData, docs, timeline] = await Promise.all([
          getClient(ctx, clientId),
          listDocuments(ctx),
          listTimelineEvents(ctx, 'client', clientId)
        ])
        if (!mounted) return
        setClient(clientData)
        setDocuments(docs.filter((doc) => doc.entityType === 'client' && doc.entityId === clientId))
        setEvents(timeline)
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
  }, [clientId, ctx, t])

  const contacts = useMemo(() => client?.contacts ?? [], [client])
  const analysis = useMemo(() => buildRiskAnalysis(client, null), [client])

  async function handleComposer(payload: { type: any; message: string; attachments: DocumentMeta[] }) {
    if (!clientId) {
      return
    }
    for (const attachment of payload.attachments) {
      await uploadDocument(ctx, {
        name: attachment.name,
        type: attachment.type,
        size: attachment.size,
        entityType: 'client',
        entityId: clientId
      })
    }
    await addTimelineEvent(ctx, {
      entityType: 'client',
      entityId: clientId,
      type: payload.type,
      title: payload.type === 'externalMessage' ? t('brokerfox.timeline.externalMessage') : payload.type === 'internalNote' ? t('brokerfox.timeline.internalNote') : t('brokerfox.timeline.statusUpdate'),
      message: payload.message
    })
    const [nextDocs, nextEvents] = await Promise.all([
      listDocuments(ctx),
      listTimelineEvents(ctx, 'client', clientId)
    ])
    setDocuments(nextDocs.filter((doc) => doc.entityType === 'client' && doc.entityId === clientId))
    setEvents(nextEvents)
  }

  async function handleSendDraft() {
    if (!clientId || !draftMessage.trim() || !approved) return
    await addTimelineEvent(ctx, {
      entityType: 'client',
      entityId: clientId,
      type: 'externalMessage',
      title: t('brokerfox.ai.draftSentTitle'),
      message: draftMessage
    })
    const nextEvents = await listTimelineEvents(ctx, 'client', clientId)
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

  if (error || !client) {
    return (
      <section className="page">
        <p>{error ?? t('brokerfox.state.notFound')}</p>
        <Button onClick={() => navigate('/brokerfox/clients')}>{t('brokerfox.clients.back')}</Button>
      </section>
    )
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={client.name}
        subtitle={t('brokerfox.clients.detailSubtitle')}
        topRight={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        <Button onClick={() => navigate('/brokerfox/clients')}>{t('brokerfox.clients.back')}</Button>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <Card variant="glass" title={t('brokerfox.clients.detailSummary')}>
            <p style={{ margin: 0 }}>{t('brokerfox.clients.segmentLabel')}: {client.segment ?? t('brokerfox.clients.segmentMissing')}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.clients.industryLabel')}: {client.industry ?? t('brokerfox.clients.industryMissing')}</p>
          </Card>
          <Card variant="glass" title={t('brokerfox.clients.contactsTitle')}>
            {contacts.length === 0 ? <p>{t('brokerfox.clients.noContacts')}</p> : null}
            {contacts.map((contact: any) => (
              <div key={contact.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{contact.name}</strong>
                <div style={{ color: '#64748b' }}>{contact.role ?? t('brokerfox.clients.contactRoleMissing')}</div>
                <div style={{ color: '#64748b' }}>{contact.email}</div>
              </div>
            ))}
          </Card>
          <Card variant="glass" title={t('brokerfox.clients.programsTitle')}>
            <p style={{ margin: 0 }}>{t('brokerfox.clients.programsPlaceholder')}</p>
          </Card>
        </div>

        <Card variant="glass" title={t('brokerfox.documents.title')}>
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

        <RiskAnalysisPanel
          analysis={analysis}
          onCopyMessage={() => setDraftMessage(t('brokerfox.ai.draftTemplate', { client: client.name }))}
          onCreateTask={async () => {
            await addTimelineEvent(ctx, {
              entityType: 'client',
              entityId: clientId,
              type: 'statusUpdate',
              title: t('brokerfox.ai.taskCreatedTitle'),
              message: t('brokerfox.ai.taskCreatedMessage')
            })
            const nextEvents = await listTimelineEvents(ctx, 'client', clientId)
            setEvents(nextEvents)
          }}
          onMarkReviewed={async () => {
            await addTimelineEvent(ctx, {
              entityType: 'client',
              entityId: clientId,
              type: 'statusUpdate',
              title: t('brokerfox.ai.reviewedTitle'),
              message: t('brokerfox.ai.reviewedMessage')
            })
            const nextEvents = await listTimelineEvents(ctx, 'client', clientId)
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
      </BrokerfoxLayout>
    </section>
  )
}
