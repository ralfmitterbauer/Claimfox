import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

type OverviewItem = {
  key: string
  route: string
}

const OVERVIEW_ITEMS: OverviewItem[] = [
  { key: 'repair', route: '/partner-management' },
  { key: 'assistance', route: '/partner-management-assistance' },
  { key: 'rental', route: '/partner-management-rental' },
  { key: 'surveyors', route: '/partner-management-surveyors' },
  { key: 'majorLoss', route: '/partner-management-major-loss' },
  { key: 'parts', route: '/partner-management-parts' }
]

export default function PartnerManagementOverviewPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <section style={{ minHeight: '100vh', width: '100%', color: '#0e0d1c' }}>
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header
            title={t('partnerManagement.overview.title')}
            subtitle={t('partnerManagement.overview.subtitle')}
            subtitleColor="rgba(255,255,255,0.82)"
          />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '32px 1.25rem 4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {OVERVIEW_ITEMS.map((item) => (
          <Card
            key={item.key}
            title={t(`partnerManagement.overview.items.${item.key}.title`)}
            variant="glass"
            interactive
            onClick={() => navigate(item.route)}
            style={{ display: 'flex', flexDirection: 'column', minHeight: '160px' }}
          >
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: 1.45 }}>
              {t(`partnerManagement.overview.items.${item.key}.description`)}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
