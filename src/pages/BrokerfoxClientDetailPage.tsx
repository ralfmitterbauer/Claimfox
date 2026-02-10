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
  createContract,
  getClient,
  listContractsByClient,
  listCommissionsByContract,
  listDocuments,
  listTimelineEvents,
  runBiproSync,
  sendCommissionReminder,
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
  const [contracts, setContracts] = useState<any[]>([])
  const [commissions, setCommissions] = useState<any[]>([])
  const [events, setEvents] = useState([])
  const [draftMessage, setDraftMessage] = useState('')
  const [approved, setApproved] = useState(false)
  const [contractFilters, setContractFilters] = useState({ lob: 'all', carrier: 'all', status: 'all' })

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!clientId) {
        return
      }
      try {
        const [clientData, docs, timeline, contractData] = await Promise.all([
          getClient(ctx, clientId),
          listDocuments(ctx),
          listTimelineEvents(ctx, 'client', clientId),
          listContractsByClient(ctx, clientId)
        ])
        if (!mounted) return
        setClient(clientData)
        setDocuments(docs.filter((doc) => doc.entityType === 'client' && doc.entityId === clientId))
        setEvents(timeline)
        setContracts(contractData)
        const commissionData = await Promise.all(contractData.map((contract: any) => listCommissionsByContract(ctx, contract.id)))
        setCommissions(commissionData.flat())
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
  const filteredContracts = useMemo(() => {
    const next = contracts.filter((contract) => {
      if (contractFilters.lob !== 'all' && contract.lob !== contractFilters.lob) return false
      if (contractFilters.carrier !== 'all' && contract.carrierName !== contractFilters.carrier) return false
      if (contractFilters.status !== 'all' && contract.status !== contractFilters.status) return false
      return true
    })
    return next.sort((a, b) => (b.isHero ? 1 : 0) - (a.isHero ? 1 : 0))
  }, [contracts, contractFilters])

  const folderGroups = useMemo(() => {
    const groups: Record<string, DocumentMeta[]> = { Offer: [], Loss: [], Policy: [], KYC: [], Other: [] }
    documents.forEach((doc) => {
      const name = doc.name.toLowerCase()
      if (name.includes('offer')) groups.Offer.push(doc)
      else if (name.includes('loss')) groups.Loss.push(doc)
      else if (name.includes('policy') || name.includes('police')) groups.Policy.push(doc)
      else if (name.includes('kyc')) groups.KYC.push(doc)
      else groups.Other.push(doc)
    })
    return groups
  }, [documents])

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

  async function handleCreateContract() {
    if (!clientId || !client) return
    const created = await createContract(ctx, {
      clientId,
      carrierName: 'AXA',
      lob: client.industry ?? 'General Liability',
      policyNumber: `POL-${clientId.slice(-4)}-${Math.floor(Math.random() * 900) + 100}`,
      status: 'pending',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 365 * 86400000).toISOString(),
      premiumEUR: 18000,
      renewalDueDate: new Date(Date.now() + 300 * 86400000).toISOString()
    })
    setContracts((prev) => [created, ...prev])
  }

  async function handleSyncBipro() {
    await runBiproSync(ctx)
    const contractData = await listContractsByClient(ctx, clientId ?? '')
    setContracts(contractData)
  }

  async function handleCommissionReminder() {
    const outstanding = commissions.find((item) => item.outstandingEUR > 0)
    if (!outstanding) return
    await sendCommissionReminder(ctx, outstanding.contractId, outstanding.id)
    const timeline = await listTimelineEvents(ctx, 'client', clientId ?? '')
    setEvents(timeline)
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
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button onClick={handleCreateContract}>{t('brokerfox.contracts.createAction')}</Button>
          <Button onClick={handleSyncBipro}>{t('brokerfox.integrations.biproAction')}</Button>
          <Button onClick={handleCommissionReminder}>{t('brokerfox.commissions.sendReminder')}</Button>
        </div>

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

        <Card variant="glass" title={t('brokerfox.contracts.sectionTitle')} subtitle={t('brokerfox.contracts.sectionSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', marginBottom: '0.75rem' }}>
            <select value={contractFilters.lob} onChange={(event) => setContractFilters((prev) => ({ ...prev, lob: event.target.value }))} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="all">{t('brokerfox.contracts.filterAllLob')}</option>
              {Array.from(new Set(contracts.map((contract) => contract.lob))).map((lob) => (
                <option key={lob} value={lob}>{lob}</option>
              ))}
            </select>
            <select value={contractFilters.carrier} onChange={(event) => setContractFilters((prev) => ({ ...prev, carrier: event.target.value }))} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="all">{t('brokerfox.contracts.filterAllCarrier')}</option>
              {Array.from(new Set(contracts.map((contract) => contract.carrierName))).map((carrier) => (
                <option key={carrier} value={carrier}>{carrier}</option>
              ))}
            </select>
            <select value={contractFilters.status} onChange={(event) => setContractFilters((prev) => ({ ...prev, status: event.target.value }))} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="all">{t('brokerfox.contracts.filterAllStatus')}</option>
              <option value="active">{t('brokerfox.contracts.status.active')}</option>
              <option value="pending">{t('brokerfox.contracts.status.pending')}</option>
              <option value="cancelled">{t('brokerfox.contracts.status.cancelled')}</option>
            </select>
          </div>
          {filteredContracts.length === 0 ? <p>{t('brokerfox.contracts.empty')}</p> : null}
          {filteredContracts.map((contract: any) => (
            <div key={contract.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '0.75rem', alignItems: 'center', padding: '0.4rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{contract.policyNumber}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{contract.lob} · {contract.carrierName}</div>
              </div>
              <span style={{ color: '#94a3b8' }}>€ {contract.premiumEUR.toLocaleString()}</span>
              <span style={{ color: '#64748b' }}>{t(`brokerfox.contracts.status.${contract.status}`)}</span>
              <Button onClick={() => navigate(`/brokerfox/contracts/${contract.id}`)}>{t('brokerfox.contracts.viewDetail')}</Button>
            </div>
          ))}
        </Card>

        <Card variant="glass" title={t('brokerfox.clients.digitalFolderTitle')} subtitle={t('brokerfox.clients.digitalFolderSubtitle')}>
          {Object.entries(folderGroups).map(([key, docs]) => (
            <div key={key} style={{ marginBottom: '0.6rem' }}>
              <strong>{t(`brokerfox.clients.folder.${key.toLowerCase()}`)}</strong>
              {docs.length === 0 ? (
                <div style={{ color: '#94a3b8' }}>{t('brokerfox.clients.folderEmpty')}</div>
              ) : (
                docs.map((doc) => (
                  <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                    <span>{doc.name}</span>
                    <span style={{ color: '#94a3b8' }}>{Math.round(doc.size / 1000)} KB</span>
                  </div>
                ))
              )}
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
