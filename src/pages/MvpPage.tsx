import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'

type MvpStep = {
  key: 'registration' | 'profile' | 'getQuote' | 'policyPurchase' | 'authentication' | 'claimProcess' | 'aiModules' | 'dashboards'
  route: string
}

const MVP_STEPS: MvpStep[] = [
  { key: 'registration', route: '/registration' },
  { key: 'profile', route: '/profile' },
  { key: 'getQuote', route: '/get-quote' },
  { key: 'policyPurchase', route: '/policy-purchase' },
  { key: 'authentication', route: '/login' },
  { key: 'claimProcess', route: '/claim-process' },
  { key: 'aiModules', route: '/feature-tree' },
  { key: 'dashboards', route: '/fleet-reporting' }
]

const descriptionStyle: React.CSSProperties = {
  marginTop: 0,
  color: '#475569',
  minHeight: '2.2rem',
  fontSize: '0.95rem',
  lineHeight: 1.45,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
}

export default function MvpPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <section className="page" style={{ gap: '2rem' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        <Header title={t('mvp.title')} subtitle={t('mvp.subtitle')} subtitleColor="#65748b" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}
        >
          {MVP_STEPS.map((step) => (
            <Card
              key={step.key}
              title={t(`mvp.steps.${step.key}.title`)}
              variant="glass"
              interactive
              onClick={() => navigate(step.route)}
              style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.25rem', minHeight: '200px' }}
            >
              <p style={descriptionStyle}>{t(`mvp.steps.${step.key}.description`)}</p>
              <Button
                style={{ width: '100%', marginTop: 'auto', padding: '0.55rem 0.9rem', fontSize: '0.9rem', borderRadius: '999px' }}
                onClick={(event) => {
                  event.stopPropagation()
                  navigate(step.route)
                }}
              >
                {t('roles.view')}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
