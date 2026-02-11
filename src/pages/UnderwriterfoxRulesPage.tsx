import { useMemo, useState } from 'react'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import RulesPanel from '@/underwriterfox/components/RulesPanel'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { saveRuleEvaluation } from '@/underwriterfox/api/underwriterfoxApi'
import type { RuleHit } from '@/underwriterfox/types'

export default function UnderwriterfoxRulesPage() {
  const { t } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [hits] = useState<RuleHit[]>([
    { ruleId: 'R-101', name: 'Loss ratio threshold', outcome: 'warn', severity: 'high' },
    { ruleId: 'R-204', name: 'Geo aggregation check', outcome: 'pass', severity: 'medium' },
    { ruleId: 'R-315', name: 'Sanctions screening', outcome: 'pass', severity: 'high' },
    { ruleId: 'R-408', name: 'Coverage gap review', outcome: 'warn', severity: 'low' }
  ])

  const editorText = useMemo(() => `// Ruleset v3.4
rule LossRatioThreshold {
  if (lossRatio > 0.65) then WARN
}

rule GeoAggregationCheck {
  if (topRegionShare > 0.45) then WARN
}

rule SanctionsScreening {
  if (sanctionsHit == true) then FAIL
}`, [])

  async function handleSave() {
    await saveRuleEvaluation(ctx, 'ruleset', hits)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.rulesPage.title')} subtitle={t('underwriterfox.rulesPage.subtitle')}>
        <RulesPanel hits={hits} onSaveVersion={handleSave} />
        <Card variant="glass" title={t('underwriterfox.rulesPage.editorTitle')} subtitle={t('underwriterfox.rulesPage.editorSubtitle')}>
          <pre style={{ margin: 0, background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: 12, fontSize: '0.85rem', overflowX: 'auto' }}>
            {editorText}
          </pre>
        </Card>
      </UnderwriterfoxLayout>
    </section>
  )
}
