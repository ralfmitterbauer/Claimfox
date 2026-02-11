import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import type { RuleHit } from '@/underwriterfox/types'

type RulesPanelProps = {
  hits: RuleHit[]
  onSaveVersion: () => void
}

export default function RulesPanel({ hits, onSaveVersion }: RulesPanelProps) {
  const { t } = useI18n()

  return (
    <Card variant="glass" title={t('underwriterfox.rules.title')} subtitle={t('underwriterfox.rules.subtitle')}>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {hits.map((hit) => (
          <div key={hit.ruleId} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', alignItems: 'center' }}>
            <div>
              <strong style={{ color: '#0f172a' }}>{hit.ruleId} · {hit.name}</strong>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t(`underwriterfox.rules.outcome.${hit.outcome}`)} · {t(`underwriterfox.rules.severity.${hit.severity}`)}</div>
            </div>
            <span style={{ fontSize: '0.75rem', color: hit.outcome === 'fail' ? '#dc2626' : hit.outcome === 'warn' ? '#f59e0b' : '#16a34a' }}>{hit.outcome.toUpperCase()}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '0.75rem' }}>
        <Button size="sm" onClick={onSaveVersion}>{t('underwriterfox.rules.saveVersion')}</Button>
      </div>
    </Card>
  )
}
