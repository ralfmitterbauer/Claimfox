import type { ReactNode } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import UnderwriterfoxNav from '@/underwriterfox/components/UnderwriterfoxNav'
import { useI18n } from '@/i18n/I18nContext'
import HomeHeroBackground from '@/assets/images/Home1.png'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'

type UnderwriterfoxLayoutProps = {
  title: string
  subtitle?: string
  topLeft?: ReactNode
  rightRail?: ReactNode
  children: ReactNode
}

const RIGHT_RAIL_WIDTH = 280
const TOP_ROW_HEIGHT = RIGHT_RAIL_WIDTH

export default function UnderwriterfoxLayout({ title, subtitle, topLeft, rightRail, children }: UnderwriterfoxLayoutProps) {
  const { t } = useI18n()
  const defaultDeadlines = [
    { title: t('underwriterfox.deadlines.items.review'), due: '12 Feb' },
    { title: t('underwriterfox.deadlines.items.pricing'), due: '15 Feb' },
    { title: t('underwriterfox.deadlines.items.cyber'), due: '18 Feb' },
    { title: t('underwriterfox.deadlines.items.brokerCall'), due: '21 Feb' },
    { title: t('underwriterfox.deadlines.items.qa'), due: '25 Feb' }
  ]
  const railContent = rightRail ?? (
    <Card variant="glass" title={t('underwriterfox.deadlines.title')} subtitle={t('underwriterfox.deadlines.subtitle')} style={{ height: TOP_ROW_HEIGHT }}>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {defaultDeadlines.map((item) => (
          <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: '#0f172a', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
            <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.due}</span>
          </div>
        ))}
      </div>
    </Card>
  )

  return (
    <div style={{ width: '100%', maxWidth: 1200, margin: '1rem auto 0', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderBottom: 0,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: '8px 10px 0'
        }}
      >
        <UnderwriterfoxNav />
      </div>
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderTop: 0,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          background: '#ffffff',
          padding: '22px 22px 24px',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: `minmax(0, 1fr) ${RIGHT_RAIL_WIDTH}px`, gap: '1.5rem', alignItems: 'stretch' }}>
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '1rem 1.1rem',
              display: 'grid',
              gap: '0.75rem',
              backgroundColor: '#fff',
              backgroundImage: `url(${HomeHeroBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: TOP_ROW_HEIGHT,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Header title={title} subtitle={subtitle} titleColor="#d4380d" subtitleColor="#ffffff" />
            {topLeft}
            <img
              src={InsurfoxLogoLight}
              alt="Insurfox"
              style={{
                position: 'absolute',
                right: 14,
                bottom: 12,
                width: 156,
                opacity: 0.9
              }}
            />
          </div>
          <div style={{ height: TOP_ROW_HEIGHT, alignSelf: 'stretch', minHeight: 0 }}>
            {railContent}
          </div>
        </div>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
