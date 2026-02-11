import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import type { AiRecommendation } from '@/underwriterfox/types'

type AiRecommendationPanelProps = {
  recommendation: AiRecommendation | null
  onGenerate: () => void
}

export default function AiRecommendationPanel({ recommendation, onGenerate }: AiRecommendationPanelProps) {
  const { t } = useI18n()

  return (
    <Card variant="glass" title={t('underwriterfox.ai.title')} subtitle={t('underwriterfox.ai.subtitle')}>
      {recommendation ? (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <strong style={{ color: '#0f172a' }}>{recommendation.summary}</strong>
          <div style={{ color: '#475569', fontSize: '0.9rem' }}>{t('underwriterfox.ai.recommendation')}: {t(`underwriterfox.ai.decision.${recommendation.recommendedDecision}`)}</div>
          <div style={{ color: '#475569', fontSize: '0.85rem' }}>{t('underwriterfox.ai.confidence')}: {Math.round(recommendation.confidence * 100)}%</div>
          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569' }}>
            {recommendation.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{t('underwriterfox.ai.empty')}</p>
      )}
      <div style={{ marginTop: '0.75rem' }}>
        <Button size="sm" onClick={onGenerate}>{t('underwriterfox.ai.generate')}</Button>
      </div>
    </Card>
  )
}
