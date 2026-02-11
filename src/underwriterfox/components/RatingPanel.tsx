import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import type { RatingSnapshot } from '@/underwriterfox/types'

type RatingPanelProps = {
  snapshot: RatingSnapshot | null
  onRecalculate: (inputs: { revenue: number; lossRatio: number; fleetSize: number }) => void
}

export default function RatingPanel({ snapshot, onRecalculate }: RatingPanelProps) {
  const { t } = useI18n()
  const [revenue, setRevenue] = useState(18000000)
  const [lossRatio, setLossRatio] = useState(0.52)
  const [fleetSize, setFleetSize] = useState(240)

  return (
    <Card variant="glass" title={t('underwriterfox.rating.title')} subtitle={t('underwriterfox.rating.subtitle')}>
      <div style={{ display: 'grid', gap: '0.6rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
          {t('underwriterfox.rating.revenue')}
          <input type="number" value={revenue} onChange={(event) => setRevenue(Number(event.target.value))} style={{ padding: '0.5rem 0.6rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
        </label>
        <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
          {t('underwriterfox.rating.lossRatio')}
          <input type="number" step="0.01" value={lossRatio} onChange={(event) => setLossRatio(Number(event.target.value))} style={{ padding: '0.5rem 0.6rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
        </label>
        <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
          {t('underwriterfox.rating.fleetSize')}
          <input type="number" value={fleetSize} onChange={(event) => setFleetSize(Number(event.target.value))} style={{ padding: '0.5rem 0.6rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
        </label>
      </div>
      <div style={{ marginTop: '0.75rem' }}>
        <Button size="sm" onClick={() => onRecalculate({ revenue, lossRatio, fleetSize })}>{t('underwriterfox.rating.recalculate')}</Button>
      </div>
      {snapshot ? (
        <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.25rem', fontSize: '0.85rem', color: '#475569' }}>
          <div>{t('underwriterfox.rating.version')}: {snapshot.version}</div>
          <div>{t('underwriterfox.rating.techPremium')}: €{snapshot.outputs.technicalPremium}</div>
          <div>{t('underwriterfox.rating.indicatedRate')}: {snapshot.outputs.indicatedRate}</div>
        </div>
      ) : null}
    </Card>
  )
}
