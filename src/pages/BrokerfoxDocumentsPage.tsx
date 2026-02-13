import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  applyExtraction,
  assignDocument,
  createSignatureRequest,
  listClients,
  listContracts,
  listDocuments,
  listExtractions,
  listOffers,
  listRenewals,
  listSignatures,
  listTenders,
  updateSignatureStatus,
  uploadDocument
} from '@/brokerfox/api/brokerfoxApi'
import { generateDocumentText } from '@/brokerfox/utils/documentGenerator'
import { localizeLob, localizePolicyName, localizeTenderTitle } from '@/brokerfox/utils/localizeDemoValues'
import type { Client, DocumentMeta } from '@/brokerfox/types'

export default function BrokerfoxDocumentsPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [documents, setDocuments] = useState<DocumentMeta[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [tenders, setTenders] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [renewals, setRenewals] = useState<any[]>([])
  const [contracts, setContracts] = useState<any[]>([])
  const [extractions, setExtractions] = useState<any[]>([])
  const [signatures, setSignatures] = useState<any[]>([])
  const [inboxOnly, setInboxOnly] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [entityType, setEntityType] = useState<'client' | 'tender' | 'offer' | 'renewal' | 'contract'>('client')
  const [entityId, setEntityId] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [approvedExtraction, setApprovedExtraction] = useState<Record<string, boolean>>({})
  const [signatureDraft, setSignatureDraft] = useState<{ docId: string; name: string; email: string }>({ docId: '', name: '', email: '' })
  const locale = lang === 'de' ? 'de-DE' : 'en-US'

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [docs, clientData, tenderData, offerData, renewalData, contractData, extractionData, signatureData] = await Promise.all([
          listDocuments(ctx),
          listClients(ctx),
          listTenders(ctx),
          listOffers(ctx),
          listRenewals(ctx),
          listContracts(ctx),
          listExtractions(ctx),
          listSignatures(ctx)
        ])
        if (!mounted) return
        setDocuments(docs)
        setClients(clientData)
        setTenders(tenderData)
        setOffers(offerData)
        setRenewals(renewalData)
        setContracts(contractData)
        setExtractions(extractionData)
        setSignatures(signatureData)
        setEntityId(clientData[0]?.id ?? tenderData[0]?.id ?? offerData[0]?.id ?? renewalData[0]?.id ?? contractData[0]?.id ?? '')
        setLoading(false)
      } catch {
        if (!mounted) return
        setError(t('brokerfox.state.error'))
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [ctx, t])

  const filtered = useMemo(() => {
    if (!inboxOnly) return documents
    return documents.filter((doc) => !doc.entityId)
  }, [documents, inboxOnly])

  async function handleUpload(uploadFile?: File | null) {
    const target = uploadFile ?? file
    if (!target) return
    setProgress(10)
    const doc = await uploadDocument(ctx, {
      name: target.name,
      type: target.type || 'application/octet-stream',
      size: target.size,
      entityType: entityId ? entityType : undefined,
      entityId: entityId || undefined,
      source: 'upload'
    })
    setProgress(100)
    setTimeout(() => setProgress(0), 600)
    setDocuments((prev) => [doc, ...prev])
    const extractionData = await listExtractions(ctx)
    setExtractions(extractionData)
    setFile(null)
  }

  async function handleAssign(doc: DocumentMeta) {
    if (!entityId) return
    const updated = await assignDocument(ctx, doc.id, entityType, entityId)
    if (!updated) return
    setDocuments((prev) => prev.map((item) => (item.id === doc.id ? updated : item)))
  }

  async function handleDownload(doc: DocumentMeta) {
    if (doc.url) {
      await addTimelineEvent(ctx, {
        entityType: doc.entityType ?? 'document',
        entityId: doc.entityId ?? doc.id,
        type: 'statusUpdate',
        title: t('brokerfox.documents.downloaded'),
        message: `${doc.name} ${t('brokerfox.documents.downloadedMessage')}`
      })
      window.open(doc.url, '_blank')
      return
    }
    const blob = new Blob([`Demo upload: ${doc.name}`], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = doc.name
    anchor.click()
    window.URL.revokeObjectURL(url)
    await addTimelineEvent(ctx, {
      entityType: doc.entityType ?? 'document',
      entityId: doc.entityId ?? doc.id,
      type: 'statusUpdate',
      title: t('brokerfox.documents.downloaded'),
      message: `${doc.name} ${t('brokerfox.documents.downloadedMessage')}`
    })
  }

  async function handleGeneratedDownload(doc: DocumentMeta) {
    const client = clients.find((item) => item.id === doc.entityId) ?? null
    const tender = tenders.find((item) => item.id === doc.entityId) ?? null
    const offer = offers.find((item) => item.id === doc.entityId) ?? null
    const text = generateDocumentText({ doc, client, tender, offer })
    const blob = new Blob([text], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = doc.name.replace(/\\.[^.]+$/, '') + '_generated.txt'
    anchor.click()
    window.URL.revokeObjectURL(url)
    await addTimelineEvent(ctx, {
      entityType: doc.entityType ?? 'document',
      entityId: doc.entityId ?? doc.id,
      type: 'statusUpdate',
      title: t('brokerfox.documents.generated'),
      message: `${doc.name} ${t('brokerfox.documents.generatedMessage')}`
    })
  }

  async function handleApplyExtraction(docId: string) {
    if (!approvedExtraction[docId]) return
    await applyExtraction(ctx, docId)
    const [docData, extractionData] = await Promise.all([listDocuments(ctx), listExtractions(ctx)])
    setDocuments(docData)
    setExtractions(extractionData)
    setApprovedExtraction((prev) => ({ ...prev, [docId]: false }))
  }

  async function handleRequestSignature(doc: DocumentMeta) {
    if (!signatureDraft.name.trim() || !signatureDraft.email.trim()) return
    const entry = await createSignatureRequest(ctx, {
      documentId: doc.id,
      status: 'SENT',
      recipientName: signatureDraft.name.trim(),
      recipientEmail: signatureDraft.email.trim()
    })
    setSignatures((prev) => [entry, ...prev])
    setSignatureDraft({ docId: '', name: '', email: '' })
  }

  async function handleMarkSigned(signatureId: string) {
    const updated = await updateSignatureStatus(ctx, signatureId, 'SIGNED')
    if (!updated) return
    setSignatures((prev) => prev.map((item) => (item.id === signatureId ? updated : item)))
  }

  const entityOptions =
    entityType === 'client'
      ? clients
      : entityType === 'tender'
        ? tenders
        : entityType === 'offer'
          ? offers
          : entityType === 'contract'
            ? contracts
            : renewals

  function getEntityLabel(item: any) {
    if (item.name) return item.name
    if (item.title) return localizeTenderTitle(item.title, lang) ?? item.title
    if (item.policyName) return localizePolicyName(item.policyName, lang) ?? item.policyName
    if (item.policyNumber) return localizePolicyName(item.policyNumber, lang) ?? item.policyNumber
    return item.carrier?.name ?? item.id
  }

  function localizeExtractionFieldLabel(key: string) {
    if (lang === 'de') {
      if (key === 'policyNumber') return 'Policennummer'
      if (key === 'insurer') return 'Versicherer'
      if (key === 'premium') return 'Praemie'
      if (key === 'startDate') return 'Beginn'
      if (key === 'endDate') return 'Ablauf'
      if (key === 'lineOfBusiness') return 'Sparte'
      if (key === 'attachmentType') return 'Anhangstyp'
      if (key === 'sender') return 'Absender'
    }
    if (key === 'policyNumber') return 'Policy number'
    if (key === 'insurer') return 'Insurer'
    if (key === 'premium') return 'Premium'
    if (key === 'startDate') return 'Start date'
    if (key === 'endDate') return 'End date'
    if (key === 'lineOfBusiness') return 'Line of business'
    if (key === 'attachmentType') return 'Attachment type'
    if (key === 'sender') return 'Sender'
    return key
  }

  function localizeExtractionFieldValue(key: string, value: string) {
    if (key === 'lineOfBusiness') return localizeLob(value, lang) ?? value
    if (key === 'policyNumber') return localizePolicyName(value, lang) ?? value
    return value
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.documents.title')}
        subtitle={t('brokerfox.documents.subtitle')}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        <Card variant="glass" title={t('brokerfox.documents.uploadTitle')} subtitle={t('brokerfox.documents.uploadSubtitle')}>
          <div
            onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setIsDragging(false)
              const dropped = event.dataTransfer.files?.[0]
              handleUpload(dropped)
            }}
            style={{
              border: `2px dashed ${isDragging ? '#0f172a' : '#cbd5f5'}`,
              borderRadius: 16,
              padding: '1rem',
              background: isDragging ? '#f8fafc' : '#ffffff',
              marginBottom: '1rem'
            }}
          >
            <strong>{t('brokerfox.documents.dragDrop')}</strong>
            <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>{t('brokerfox.documents.dragDropHint')}</p>
          </div>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
            <select value={entityType} onChange={(event) => setEntityType(event.target.value as typeof entityType)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="client">{t('brokerfox.documents.entityClient')}</option>
              <option value="tender">{t('brokerfox.documents.entityTender')}</option>
              <option value="offer">{t('brokerfox.documents.entityOffer')}</option>
              <option value="renewal">{t('brokerfox.documents.entityRenewal')}</option>
              <option value="contract">{t('brokerfox.documents.entityContract')}</option>
            </select>
            <select value={entityId} onChange={(event) => setEntityId(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              {entityOptions.map((item: any) => (
                <option key={item.id} value={item.id}>{getEntityLabel(item)}</option>
              ))}
            </select>
            <Button size="sm" onClick={() => handleUpload()}>{t('brokerfox.actions.uploadDocument')}</Button>
          </div>
          {progress > 0 ? (
            <div style={{ marginTop: '0.75rem', height: 8, borderRadius: 999, background: '#e2e8f0', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: '#0f172a' }} />
            </div>
          ) : null}
        </Card>

        <Card variant="glass" title={t('brokerfox.documents.listTitle')} subtitle={t('brokerfox.documents.listSubtitle')}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input type="checkbox" checked={inboxOnly} onChange={(event) => setInboxOnly(event.target.checked)} />
            {t('brokerfox.documents.inboxOnly')}
          </label>
          {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
          {error ? <p>{error}</p> : null}
          {filtered.length === 0 ? <p>{t('brokerfox.empty.noDocuments')}</p> : null}
          {filtered.map((doc) => {
            const extraction = extractions.find((entry) => entry.documentId === doc.id)
            const signature = signatures.find((entry) => entry.documentId === doc.id)
            return (
              <div key={doc.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: '0.75rem', alignItems: 'center' }}>
                  <div>
                    <strong>{doc.name}</strong>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{doc.entityType ?? t('brokerfox.documents.unassigned')}</div>
                  </div>
                  <span style={{ color: '#94a3b8' }}>{Math.round(doc.size / 1000).toLocaleString(locale)} KB</span>
                  <Button size="sm" onClick={() => handleDownload(doc)}>{t('brokerfox.documents.download')}</Button>
                  <Button size="sm" onClick={() => handleGeneratedDownload(doc)}>{t('brokerfox.documents.downloadGenerated')}</Button>
                  {!doc.entityId ? <Button size="sm" onClick={() => handleAssign(doc)}>{t('brokerfox.documents.assignAction')}</Button> : null}
                </div>

                {extraction ? (
                  <div style={{ marginTop: '0.6rem', padding: '0.6rem', borderRadius: 12, background: '#f8fafc' }}>
                    <strong>{t('brokerfox.extraction.title')}</strong>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.extraction.suggestionNotice')}</div>
                    <div style={{ marginTop: '0.4rem', display: 'grid', gap: '0.3rem' }}>
                      <div>{t('brokerfox.extraction.suggestedClient')}: {clients.find((client) => client.id === extraction.suggestedClientId)?.name ?? '-'}</div>
                      <div>{t('brokerfox.extraction.suggestedContract')}: {localizePolicyName(contracts.find((contract) => contract.id === extraction.suggestedContractId)?.policyNumber, lang) ?? '-'}</div>
                      <div>{t('brokerfox.extraction.confidence')}: {Math.round(extraction.confidence * 100)}%</div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.extraction.fieldsTitle')}</div>
                      {Object.entries(extraction.extractedFields).map(([key, value]) => (
                        <div key={key} style={{ fontSize: '0.85rem' }}>
                          {localizeExtractionFieldLabel(key)}: {localizeExtractionFieldValue(key, String(value))}
                        </div>
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
                    <Button size="sm" onClick={() => handleApplyExtraction(doc.id)} disabled={!approvedExtraction[doc.id]}>
                      {t('brokerfox.extraction.apply')}
                    </Button>
                  </div>
                ) : null}

                <div style={{ marginTop: '0.6rem', display: 'grid', gap: '0.4rem' }}>
                  <strong>{t('brokerfox.signature.title')}</strong>
                  {signature ? (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span>{t('brokerfox.signature.statusLabel')}: {t(`brokerfox.signature.status.${signature.status}`)}</span>
                      {signature.status !== 'SIGNED' ? (
                        <Button size="sm" onClick={() => handleMarkSigned(signature.id)}>{t('brokerfox.signature.markSigned')}</Button>
                      ) : null}
                    </div>
                  ) : (
                    <>
                      {signatureDraft.docId === doc.id ? (
                        <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                          <input
                            value={signatureDraft.name}
                            onChange={(event) => setSignatureDraft((prev) => ({ ...prev, name: event.target.value }))}
                            placeholder={t('brokerfox.signature.recipientName')}
                            style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
                          />
                          <input
                            value={signatureDraft.email}
                            onChange={(event) => setSignatureDraft((prev) => ({ ...prev, email: event.target.value }))}
                            placeholder={t('brokerfox.signature.recipientEmail')}
                            style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
                          />
                          <Button size="sm" onClick={() => handleRequestSignature(doc)}>{t('brokerfox.signature.requestAction')}</Button>
                          <Button size="sm" variant="secondary" onClick={() => setSignatureDraft({ docId: '', name: '', email: '' })}>{t('brokerfox.actions.cancel')}</Button>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => setSignatureDraft({ docId: doc.id, name: '', email: '' })}>{t('brokerfox.signature.requestAction')}</Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </Card>
      </BrokerfoxLayout>
    </section>
  )
}
