import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases, listDocuments } from '@/underwriterfox/api/underwriterfoxApi'
import type { CaseDocument, UnderwritingCase } from '@/underwriterfox/types'
import { localizeUnderwriterExtractedText } from '@/underwriterfox/utils/localizeDemoValues'

export default function UnderwriterfoxDocumentsPage() {
  const { lang, t } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [documents, setDocuments] = useState<CaseDocument[]>([])
  const [cases, setCases] = useState<UnderwritingCase[]>([])
  const [status, setStatus] = useState('all')
  const [caseId, setCaseId] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<CaseDocument | null>(null)

  function localizeDocumentName(value: string) {
    if (lang !== 'de') return value
    return value
      .replace('_Doc_', '_Unterlage_')
      .replace(/^UW_/, 'UW_')
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      const [docs, caseList] = await Promise.all([listDocuments(ctx), listCases(ctx)])
      if (!mounted) return
      setDocuments(docs)
      setCases(caseList)
    }
    load()
    return () => { mounted = false }
  }, [ctx.tenantId])

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      if (status !== 'all' && doc.status !== status) return false
      if (caseId !== 'all' && doc.caseId !== caseId) return false
      if (query && !localizeDocumentName(doc.name).toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [documents, status, caseId, query, lang])

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.documentsPage.title')} subtitle={t('underwriterfox.documentsPage.subtitle')}>
        <Card variant="glass" title={t('underwriterfox.documentsPage.title')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
              {t('underwriterfox.documentsPage.filterStatus')}
              <select value={status} onChange={(event) => setStatus(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
                <option value="all">{t('underwriterfox.common.all')}</option>
                <option value="extracted">{t('underwriterfox.documents.status.extracted')}</option>
                <option value="needsReview">{t('underwriterfox.documents.status.needsReview')}</option>
                <option value="approved">{t('underwriterfox.documents.status.approved')}</option>
              </select>
            </label>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
              {t('underwriterfox.documentsPage.filterCase')}
              <select value={caseId} onChange={(event) => setCaseId(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
                <option value="all">{t('underwriterfox.common.all')}</option>
                {cases.map((item) => (
                  <option key={item.id} value={item.id}>{item.caseNumber}</option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
              {t('underwriterfox.documentsPage.searchPlaceholder')}
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('underwriterfox.documentsPage.searchPlaceholder')} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
            </label>
          </div>
        </Card>

        <Card variant="glass" title={t('underwriterfox.documentsPage.title')}>
          {filtered.length === 0 ? <p>{t('underwriterfox.documentsPage.empty')}</p> : null}
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {filtered.map((doc) => (
              <div key={doc.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <strong>{localizeDocumentName(doc.name)}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('underwriterfox.documents.statusLabel')}: {t(`underwriterfox.documents.status.${doc.status}`)}</div>
                </div>
                <Button size="sm" variant="secondary" onClick={() => setSelected(doc)}>{t('underwriterfox.documents.view')}</Button>
              </div>
            ))}
          </div>
        </Card>
      </UnderwriterfoxLayout>

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.35)', display: 'grid', placeItems: 'center', zIndex: 60 }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', width: 'min(520px, 90vw)', boxShadow: '0 18px 50px rgba(15,23,42,0.2)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
              <strong>{t('underwriterfox.documentsPage.modalTitle')}</strong>
              <button type="button" onClick={() => setSelected(null)} style={{ border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', padding: '0.2rem 0.5rem' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div><strong>{localizeDocumentName(selected.name)}</strong></div>
              <div>{localizeUnderwriterExtractedText(selected.extractedText, lang) ?? selected.extractedText}</div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="sm" variant="secondary" onClick={() => setSelected(null)}>{t('underwriterfox.documentsPage.modalClose')}</Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
