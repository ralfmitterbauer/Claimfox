import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import type { RiskAnalysis } from '@/brokerfox/ai/riskEngine'

const LEVEL_COLORS: Record<string, string> = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444'
}

type RiskAnalysisPanelProps = {
  analysis: RiskAnalysis
  onCopyMessage: () => void
  onCreateTask: () => void
  onMarkReviewed: () => void
}

export default function RiskAnalysisPanel({ analysis, onCopyMessage, onCreateTask, onMarkReviewed }: RiskAnalysisPanelProps) {
  const { t } = useI18n()

  return (
    <Card variant="glass" title={t('brokerfox.ai.riskAnalysis.title')} subtitle={t('brokerfox.ai.riskAnalysis.subtitle')}>
      <p style={{ marginTop: 0, color: '#475569' }}>{t('brokerfox.ai.suggestionNotice')}</p>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <div>
          <strong>{t('brokerfox.ai.inputs')}</strong>
          <ul style={{ margin: '0.35rem 0', paddingLeft: '1.1rem' }}>
            <li>{t('brokerfox.ai.inputIndustry')}: {analysis.inputs.industry}</li>
            <li>{t('brokerfox.ai.inputRevenue')}: {analysis.inputs.revenue}</li>
            <li>{t('brokerfox.ai.inputEmployees')}: {analysis.inputs.employees}</li>
            <li>{t('brokerfox.ai.inputLocations')}: {analysis.inputs.locations}</li>
            <li>{t('brokerfox.ai.inputClaims')}: {analysis.inputs.claims}</li>
            <li>{t('brokerfox.ai.inputCoverages')}: {analysis.inputs.coverages.join(', ')}</li>
          </ul>
        </div>
        <div>
          <strong>{t('brokerfox.ai.riskBreakdown')}</strong>
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            {analysis.ratings.map((rating) => (
              <div key={rating.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{t(`brokerfox.ai.risk.${rating.key}`)}</span>
                <span style={{ color: LEVEL_COLORS[rating.level], fontWeight: 600 }}>{t(`brokerfox.ai.level.${rating.level}`)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <strong>{t('brokerfox.ai.drivers')}</strong>
          <ul style={{ margin: '0.35rem 0', paddingLeft: '1.1rem' }}>
            {analysis.drivers.map((driver) => (
              <li key={driver}>{driver}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{t('brokerfox.ai.missingInfo')}</strong>
          <ul style={{ margin: '0.35rem 0', paddingLeft: '1.1rem' }}>
            {analysis.missingInfo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{t('brokerfox.ai.policySuggestion.title')}</strong>
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <div>{t('brokerfox.ai.policySuggestion.coverages')}: {analysis.policySuggestion.coverages.join(', ')}</div>
            <div>{t('brokerfox.ai.policySuggestion.limits')}: {analysis.policySuggestion.limits.join(', ')}</div>
            <div>{t('brokerfox.ai.policySuggestion.deductibles')}: {analysis.policySuggestion.deductibles.join(', ')}</div>
            <div>{t('brokerfox.ai.policySuggestion.endorsements')}: {analysis.policySuggestion.endorsements.join(', ')}</div>
          </div>
          <ul style={{ margin: '0.35rem 0', paddingLeft: '1.1rem' }}>
            {analysis.policySuggestion.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={onCopyMessage}>{t('brokerfox.ai.copyToMessage')}</Button>
          <Button size="sm" onClick={onCreateTask}>{t('brokerfox.ai.createTask')}</Button>
          <Button size="sm" onClick={onMarkReviewed}>{t('brokerfox.ai.markReviewed')}</Button>
        </div>
      </div>
    </Card>
  )
}
