import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'

type CaseKpiCardsProps = {
  totals: {
    intake: number
    screening: number
    manualReview: number
    offer: number
    bound: number
    declined: number
  }
}

export default function CaseKpiCards({ totals }: CaseKpiCardsProps) {
  const { t } = useI18n()

  const items = [
    { label: t('underwriterfox.status.intake'), value: totals.intake },
    { label: t('underwriterfox.status.screening'), value: totals.screening },
    { label: t('underwriterfox.status.manualReview'), value: totals.manualReview },
    { label: t('underwriterfox.status.offer'), value: totals.offer },
    { label: t('underwriterfox.status.bound'), value: totals.bound },
    { label: t('underwriterfox.status.declined'), value: totals.declined }
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
      {items.map((item) => (
        <Card key={item.label} variant="glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start', minHeight: 90 }}>
          <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: 1.2, minHeight: '2.2rem' }}>{item.label}</p>
          <strong style={{ fontSize: '1.8rem', lineHeight: 1 }}>{item.value}</strong>
        </Card>
      ))}
    </div>
  )
}
