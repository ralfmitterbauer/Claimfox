import { useState } from 'react'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import RatingPanel from '@/underwriterfox/components/RatingPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { saveRatingSnapshot } from '@/underwriterfox/api/underwriterfoxApi'
import type { RatingSnapshot } from '@/underwriterfox/types'

export default function UnderwriterfoxRatingPage() {
  const { t } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [snapshot, setSnapshot] = useState<RatingSnapshot | null>(null)

  async function handleRecalc(inputs: { revenue: number; lossRatio: number; fleetSize: number }) {
    const next: RatingSnapshot = {
      version: `v${Math.floor(inputs.revenue / 1000000)}.${Math.floor(inputs.lossRatio * 10)}`,
      inputs,
      outputs: {
        technicalPremium: Math.round(inputs.revenue * 0.005 + inputs.fleetSize * 120),
        indicatedRate: Math.round((1.02 + inputs.lossRatio * 0.4) * 100) / 100,
        adjustment: inputs.lossRatio > 0.6 ? '+8%' : '+3%'
      }
    }
    await saveRatingSnapshot(ctx, 'rating', next)
    setSnapshot(next)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.ratingPage.title')} subtitle={t('underwriterfox.ratingPage.subtitle')}>
        <RatingPanel snapshot={snapshot} onRecalculate={handleRecalc} />
      </UnderwriterfoxLayout>
    </section>
  )
}
