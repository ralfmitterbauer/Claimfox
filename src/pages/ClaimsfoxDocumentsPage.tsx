import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import ClaimsfoxModal from '@/claimsfox/components/ClaimsfoxModal'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { approveExtraction, listClaims, listDocuments, uploadDocument } from '@/claimsfox/api/claimsfoxApi'
import type { Claim, Document } from '@/claimsfox/types'

export default function ClaimsfoxDocumentsPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [documents, setDocuments] = useState<Document[]>([])
  const [claims, setClaims] = useState<Claim[]>([])
  const [selectedClaim, setSelectedClaim] = useState('')
  const [preview, setPreview] = useState<Document | null>(null)
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const numberFormatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })

  useEffect(() => {
    let mounted = true
    async function load() {
      const [data, claimsData] = await Promise.all([listDocuments(ctx), listClaims(ctx)])
      if (!mounted) return
      setDocuments(data)
      setClaims(claimsData)
      setSelectedClaim(claimsData[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  async function handleApprove(documentId: string) {
    await approveExtraction(ctx, documentId)
    const data = await listDocuments(ctx)
    setDocuments(data)
  }

  async function handleUpload() {
    const doc = await uploadDocument(ctx, {
      fileName: lang === 'de' ? 'Zusatz_Fotobericht.txt' : 'Additional_Photo_Report.txt',
      mime: 'text/plain',
      size: 12000,
      urlOrBlobKey: '/demo-docs/claimsfox/Workshop_Log.txt',
      linkedEntityType: 'claim',
      linkedEntityId: selectedClaim || documents[0]?.linkedEntityId || 'demo',
      extractedFields: { type: 'photo_report', notes: lang === 'de' ? 'Schadenübersicht angehängt.' : 'Damage overview attached.' },
      approvalStatus: 'pending'
    })
    setDocuments([doc, ...documents])
  }

  return (
    <ClaimsfoxLayout title={t('claimsfox.documents.title')} subtitle={t('claimsfox.documents.subtitle')}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'grid', gap: '0.3rem' }}>
            <div style={{ color: '#64748b' }}>{t('claimsfox.documents.helper')}</div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: '#475569' }}>{t('claimsfox.documents.linkTo')}</span>
              <select value={selectedClaim} onChange={(event) => setSelectedClaim(event.target.value)} style={{ padding: '0.45rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                {claims.map((claim) => (
                  <option key={claim.id} value={claim.id}>{claim.claimNumber}</option>
                ))}
              </select>
            </div>
          </div>
          <Button size="sm" onClick={handleUpload}>{t('claimsfox.documents.upload')}</Button>
        </div>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {documents.map((doc) => (
            <div key={doc.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr auto auto', gap: '0.75rem', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem 1rem' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{doc.fileName}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{doc.linkedEntityId}</div>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{new Date(doc.createdAt).toLocaleDateString(locale)}</div>
              <div style={{ fontSize: '0.85rem' }}>{t(`claimsfox.documents.statusLabels.${doc.approvalStatus}`)}</div>
              <Button size="sm" variant="secondary" onClick={() => setPreview(doc)}>{t('claimsfox.documents.view')}</Button>
              {doc.approvalStatus !== 'approved' && (
                <Button size="sm" onClick={() => handleApprove(doc.id)}>{t('claimsfox.documents.approve')}</Button>
              )}
            </div>
          ))}
        </div>
      </Card>
      <ClaimsfoxModal open={Boolean(preview)} onClose={() => setPreview(null)}>
        {preview && (
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <h3 style={{ margin: 0 }}>{preview.fileName}</h3>
            <div style={{ color: '#64748b' }}>{preview.mime} · {numberFormatter.format(preview.size / 1000)} KB</div>
            <div style={{ color: '#475569' }}>{t('claimsfox.documents.previewText')}</div>
            <a href={preview.urlOrBlobKey} target="_blank" rel="noreferrer" style={{ color: '#d4380d', fontWeight: 600 }}>{t('claimsfox.documents.open')}</a>
          </div>
        )}
      </ClaimsfoxModal>
    </ClaimsfoxLayout>
  )
}
