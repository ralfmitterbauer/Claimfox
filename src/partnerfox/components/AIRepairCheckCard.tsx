import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import type { PartnerCase } from '@/partnerfox/types'
import { runRepairAiCheck } from '@/partnerfox/components/SubrogationEngine'

type AIRepairCheckCardProps = {
  item: PartnerCase
  onApprove: () => void
}

export default function AIRepairCheckCard({ item, onApprove }: AIRepairCheckCardProps) {
  const { t } = useI18n()
  const result = runRepairAiCheck(item)

  return (
    <Card title={t('partnerfox.aiRepair.title')} subtitle={t('partnerfox.aiRepair.subtitle')}>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <div>{t('partnerfox.aiRepair.plausibility')}: <strong>{result.plausibilityScore}</strong></div>
        <div>{t('partnerfox.aiRepair.confidence')}: <strong>{result.confidence}%</strong></div>
        <div>{t('partnerfox.aiRepair.recommendation')}: <strong>{result.recommendation === 'approve' ? t('partnerfox.aiRepair.approve') : t('partnerfox.aiRepair.manualReview')}</strong></div>
        <div style={{ fontSize: '0.85rem', color: '#475569' }}>
          {t('partnerfox.aiRepair.anomalies')}: {result.anomalies.join(' | ')}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          {t('partnerfox.aiRepair.evidence')}: {result.evidenceRefs.join(' | ')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size="sm" onClick={onApprove}>{t('partnerfox.actions.enableDirectBilling')}</Button>
        </div>
      </div>
    </Card>
  )
}
