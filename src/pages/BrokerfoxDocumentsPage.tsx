import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, assignDocument, listClients, listDocuments, listOffers, listRenewals, listTenders, uploadDocument } from '@/brokerfox/api/brokerfoxApi'
import { generateDocumentText } from '@/brokerfox/utils/documentGenerator'
import type { Client, DocumentMeta } from '@/brokerfox/types'

export default function BrokerfoxDocumentsPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [documents, setDocuments] = useState<DocumentMeta[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [tenders, setTenders] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [renewals, setRenewals] = useState<any[]>([])
  const [inboxOnly, setInboxOnly] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [entityType, setEntityType] = useState<'client' | 'tender' | 'offer' | 'renewal'>('client')
  const [entityId, setEntityId] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [docs, clientData, tenderData, offerData, renewalData] = await Promise.all([
          listDocuments(ctx),
          listClients(ctx),
          listTenders(ctx),
          listOffers(ctx),
          listRenewals(ctx)
        ])
        if (!mounted) return
        setDocuments(docs)
        setClients(clientData)
        setTenders(tenderData)
        setOffers(offerData)
        setRenewals(renewalData)
        setEntityId(clientData[0]?.id ?? tenderData[0]?.id ?? offerData[0]?.id ?? renewalData[0]?.id ?? '')
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

  const entityOptions = entityType === 'client' ? clients : entityType === 'tender' ? tenders : entityType === 'offer' ? offers : renewals

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.documents.title')}
        subtitle={t('brokerfox.documents.subtitle')}
        topRight={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
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
            </select>
            <select value={entityId} onChange={(event) => setEntityId(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              {entityOptions.map((item: any) => (
                <option key={item.id} value={item.id}>{item.name ?? item.title ?? item.policyName ?? item.carrier?.name}</option>
              ))}
            </select>
            <Button onClick={() => handleUpload()}>{t('brokerfox.actions.uploadDocument')}</Button>
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
          {filtered.map((doc) => (
            <div key={doc.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: '0.75rem', alignItems: 'center', padding: '0.4rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{doc.name}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{doc.entityType ?? t('brokerfox.documents.unassigned')}</div>
              </div>
              <span style={{ color: '#94a3b8' }}>{Math.round(doc.size / 1000)} KB</span>
              <Button onClick={() => handleDownload(doc)}>{t('brokerfox.documents.download')}</Button>
              <Button onClick={() => handleGeneratedDownload(doc)}>{t('brokerfox.documents.downloadGenerated')}</Button>
              {!doc.entityId ? <Button onClick={() => handleAssign(doc)}>{t('brokerfox.documents.assignAction')}</Button> : null}
            </div>
          ))}
        </Card>
      </BrokerfoxLayout>
    </section>
  )
}
