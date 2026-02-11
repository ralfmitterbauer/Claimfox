import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import type { CaseDocument } from '@/underwriterfox/types'

type CaseDocumentsPanelProps = {
  documents: CaseDocument[]
  onOpen?: (doc: CaseDocument) => void
}

export default function CaseDocumentsPanel({ documents, onOpen }: CaseDocumentsPanelProps) {
  const { t } = useI18n()

  return (
    <Card variant="glass" title={t('underwriterfox.documents.title')} subtitle={t('underwriterfox.documents.subtitle')}>
      {documents.length === 0 ? <p>{t('underwriterfox.documents.empty')}</p> : null}
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {documents.map((doc) => (
          <div key={doc.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ minWidth: 0 }}>
              <strong style={{ color: '#0f172a' }}>{doc.name}</strong>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('underwriterfox.documents.statusLabel')}: {t(`underwriterfox.documents.status.${doc.status}`)}</div>
            </div>
            <Button size="sm" variant="secondary" onClick={() => onOpen?.(doc)}>{t('underwriterfox.documents.view')}</Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
