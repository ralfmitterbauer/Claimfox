import { useState } from 'react'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import AiRecommendationPanel from '@/underwriterfox/components/AiRecommendationPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { saveAiRecommendation } from '@/underwriterfox/api/underwriterfoxApi'
import type { AiRecommendation } from '@/underwriterfox/types'

export default function UnderwriterfoxAiPage() {
  const { t } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [recommendation, setRecommendation] = useState<AiRecommendation | null>(null)

  async function handleGenerate() {
    const next: AiRecommendation = {
      summary: 'Pricing adjustment recommended with referral to committee.',
      recommendedDecision: 'refer',
      bullets: [
        'Loss ratio above threshold; recommend deductible adjustment.',
        'Controls evidence strong; broker submission quality high.',
        'Exposure concentration acceptable with minor wording updates.'
      ],
      confidence: 0.74
    }
    await saveAiRecommendation(ctx, 'ai', next)
    setRecommendation(next)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.aiPage.title')} subtitle={t('underwriterfox.aiPage.subtitle')}>
        <AiRecommendationPanel recommendation={recommendation} onGenerate={handleGenerate} />
      </UnderwriterfoxLayout>
    </section>
  )
}
