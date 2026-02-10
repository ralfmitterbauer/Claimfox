import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  applyExtraction,
  createTask,
  listClients,
  listContracts,
  listExtractions,
  listMailboxItems,
  listOffers,
  listRenewals,
  listTenders,
  updateMailboxItem,
  uploadDocument
} from '@/brokerfox/api/brokerfoxApi'
import { generateDocumentText } from '@/brokerfox/utils/documentGenerator'
import type { MailboxItem } from '@/brokerfox/types'

export default function BrokerfoxMailboxPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [items, setItems] = useState<MailboxItem[]>([])
  const [selected, setSelected] = useState<MailboxItem | null>(null)
  const [clients, setClients] = useState<any[]>([])
  const [tenders, setTenders] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [renewals, setRenewals] = useState<any[]>([])
  const [contracts, setContracts] = useState<any[]>([])
  const [extractions, setExtractions] = useState<any[]>([])
  const [entityType, setEntityType] = useState<'client' | 'tender' | 'offer' | 'renewal' | 'contract'>('client')
  const [entityId, setEntityId] = useState('')
  const [approvedExtraction, setApprovedExtraction] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let mounted = true
    async function load() {
      const [mail, clientData, tenderData, offerData, renewalData, contractData, extractionData] = await Promise.all([
        listMailboxItems(ctx),
        listClients(ctx),
        listTenders(ctx),
        listOffers(ctx),
        listRenewals(ctx),
        listContracts(ctx),
        listExtractions(ctx)
      ])
      if (!mounted) return
      setItems(mail)
      setSelected(mail[0] ?? null)
      setClients(clientData)
      setTenders(tenderData)
      setOffers(offerData)
      setRenewals(renewalData)
      setContracts(contractData)
      setExtractions(extractionData)
      setEntityId(clientData[0]?.id ?? tenderData[0]?.id ?? offerData[0]?.id ?? renewalData[0]?.id ?? contractData[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const entityOptions = useMemo(() => {
    return entityType === 'client'
      ? clients
      : entityType === 'tender'
        ? tenders
        : entityType === 'offer'
          ? offers
          : entityType === 'contract'
            ? contracts
            : renewals
  }, [clients, tenders, offers, renewals, contracts, entityType])

  async function handleAssign() {
    if (!selected || !entityId) return
    const updated = await updateMailboxItem(ctx, selected.id, { status: 'assigned', entityType, entityId })
    if (!updated) return
    setItems((prev) => prev.map((item) => (item.id === selected.id ? updated : item)))
    setSelected(updated)
    for (const attachment of selected.attachments) {
      await uploadDocument(ctx, {
        name: attachment.name,
        type: attachment.type,
        size: attachment.size,
        entityType,
        entityId,
        url: attachment.url,
        source: attachment.source ?? 'demo'
      })
    }
    const extractionData = await listExtractions(ctx)
    setExtractions(extractionData)
    await addTimelineEvent(ctx, {
      entityType,
      entityId,
      type: 'documentAssigned',
      title: t('brokerfox.mailbox.assignedTitle'),
      message: `${selected.subject} ${t('brokerfox.mailbox.assignedMessage')}`
    })
  }

  async function handleMarkDone() {
    if (!selected) return
    const updated = await updateMailboxItem(ctx, selected.id, { status: 'done' })
    if (!updated) return
    setItems((prev) => prev.map((item) => (item.id === selected.id ? updated : item)))
    setSelected(updated)
    await addTimelineEvent(ctx, {
      entityType: selected.entityType ?? 'document',
      entityId: selected.entityId ?? selected.id,
      type: 'statusUpdate',
      title: t('brokerfox.mailbox.doneTitle'),
      message: t('brokerfox.mailbox.doneMessage')
    })
  }

  async function handleCreateTask() {
    if (!selected) return
    const task = await createTask(ctx, {
      title: `${t('brokerfox.mailbox.taskPrefix')}: ${selected.subject}`,
      description: selected.body,
      status: 'todo',
      linkedEntityType: selected.entityType ?? entityType,
      linkedEntityId: selected.entityId ?? entityId
    })
    await addTimelineEvent(ctx, {
      entityType: task.linkedEntityType ?? 'task',
      entityId: task.linkedEntityId ?? task.id,
      type: 'statusUpdate',
      title: t('brokerfox.mailbox.taskCreatedTitle'),
      message: t('brokerfox.mailbox.taskCreatedMessage')
    })
  }

  async function handleDownloadAttachment(name: string) {
    if (!selected) return
    const attachment = selected.attachments.find((doc) => doc.name === name)
    if (!attachment) return
    if (attachment.url) {
      window.open(attachment.url, '_blank')
    } else {
      const client = clients.find((item) => item.id === selected.entityId) ?? null
      const tender = tenders.find((item) => item.id === selected.entityId) ?? null
      const offer = offers.find((item) => item.id === selected.entityId) ?? null
      const text = generateDocumentText({ doc: attachment, client, tender, offer })
      const blob = new Blob([text], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = attachment.name.replace(/\.[^.]+$/, '') + '_generated.txt'
      anchor.click()
      window.URL.revokeObjectURL(url)
    }
    await addTimelineEvent(ctx, {
      entityType: selected.entityType ?? 'document',
      entityId: selected.entityId ?? selected.id,
      type: 'statusUpdate',
      title: t('brokerfox.mailbox.downloadedTitle'),
      message: t('brokerfox.mailbox.downloadedMessage')
    })
  }

  async function handleApplyExtraction(docId: string) {
    if (!approvedExtraction[docId]) return
    await applyExtraction(ctx, docId)
    const extractionData = await listExtractions(ctx)
    setExtractions(extractionData)
    setApprovedExtraction((prev) => ({ ...prev, [docId]: false }))
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.mailbox.title')}
        subtitle={t('brokerfox.mailbox.subtitle')}
        topRight={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'minmax(260px, 1fr) minmax(300px, 1fr)' }}>
          <Card variant="glass" title={t('brokerfox.mailbox.inboxTitle')}>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.6rem 0',
                  border: 'none',
                  background: 'transparent'
                }}
              >
                <strong>{item.subject}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.sender} · {new Date(item.receivedAt).toLocaleString()}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{t(`brokerfox.mailbox.status.${item.status}`)}</div>
              </button>
            ))}
          </Card>

          <Card variant="glass" title={t('brokerfox.mailbox.detailTitle')}>
            {selected ? (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div>
                  <strong>{selected.subject}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{selected.sender}</div>
                </div>
                <p style={{ margin: 0 }}>{selected.body ?? t('brokerfox.mailbox.previewPlaceholder')}</p>
                <div>
                  <strong>{t('brokerfox.mailbox.attachments')}</strong>
                  {selected.attachments.map((doc) => (
                    <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0' }}>
                      <span>{doc.name}</span>
                      <Button onClick={() => handleDownloadAttachment(doc.name)}>{t('brokerfox.documents.download')}</Button>
                    </div>
                  ))}
                </div>
                {selected.attachments.map((doc) => {
                  const extraction = extractions.find((entry) => entry.documentId === doc.id)
                  if (!extraction) return null
                  return (
                    <div key={`${doc.id}-extraction`} style={{ padding: '0.6rem', borderRadius: 12, background: '#f8fafc' }}>
                      <strong>{t('brokerfox.extraction.title')}</strong>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.extraction.suggestionNotice')}</div>
                      <div style={{ marginTop: '0.4rem', display: 'grid', gap: '0.25rem' }}>
                        <div>{t('brokerfox.extraction.suggestedClient')}: {clients.find((client) => client.id === extraction.suggestedClientId)?.name ?? '-'}</div>
                        <div>{t('brokerfox.extraction.suggestedContract')}: {contracts.find((contract) => contract.id === extraction.suggestedContractId)?.policyNumber ?? '-'}</div>
                        <div>{t('brokerfox.extraction.confidence')}: {Math.round(extraction.confidence * 100)}%</div>
                        {Object.entries(extraction.extractedFields).map(([key, value]) => (
                          <div key={key} style={{ fontSize: '0.85rem' }}>{key}: {value}</div>
                        ))}
                      </div>
                      <label style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={Boolean(approvedExtraction[doc.id])}
                          onChange={(event) => setApprovedExtraction((prev) => ({ ...prev, [doc.id]: event.target.checked }))}
                        />
                        {t('brokerfox.extraction.approval')}
                      </label>
                      <Button onClick={() => handleApplyExtraction(doc.id)} disabled={!approvedExtraction[doc.id]}>
                        {t('brokerfox.extraction.apply')}
                      </Button>
                    </div>
                  )
                })}
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('brokerfox.mailbox.assignTo')}</label>
                  <select value={entityType} onChange={(event) => setEntityType(event.target.value as typeof entityType)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
                    <option value="client">{t('brokerfox.documents.entityClient')}</option>
                    <option value="tender">{t('brokerfox.documents.entityTender')}</option>
                    <option value="offer">{t('brokerfox.documents.entityOffer')}</option>
                    <option value="renewal">{t('brokerfox.documents.entityRenewal')}</option>
                    <option value="contract">{t('brokerfox.documents.entityContract')}</option>
                  </select>
                  <select value={entityId} onChange={(event) => setEntityId(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
                    {entityOptions.map((item: any) => (
                      <option key={item.id} value={item.id}>{item.name ?? item.title ?? item.policyName ?? item.policyNumber ?? item.carrier?.name}</option>
                    ))}
                  </select>
                  <Button onClick={handleAssign}>{t('brokerfox.mailbox.assignAction')}</Button>
                  <Button onClick={handleCreateTask}>{t('brokerfox.mailbox.convertTask')}</Button>
                  <Button onClick={handleMarkDone}>{t('brokerfox.mailbox.markDone')}</Button>
                </div>
              </div>
            ) : (
              <p>{t('brokerfox.mailbox.noSelection')}</p>
            )}
          </Card>
        </div>
      </BrokerfoxLayout>
    </section>
  )
}
