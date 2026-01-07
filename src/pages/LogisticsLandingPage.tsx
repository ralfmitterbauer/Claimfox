import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoDark from '@/assets/logos/Insurfox_Logo_colored_dark.png'

const KPI_KEYS = ['liveShipments', 'coverageRate', 'openIncidents', 'etaDeviation'] as const
const FEATURE_KEYS = ['realtime', 'coverage', 'incidents', 'thirdparty', 'ai', 'routes'] as const

const featureIcons: Record<(typeof FEATURE_KEYS)[number], React.ReactNode> = {
  realtime: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 7-7" />
      <path d="M21 7h-4V3" />
      <path d="M3 21h18" />
    </svg>
  ),
  coverage: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 5 6v7c0 4.5 3.1 6.9 7 8 3.9-1.1 7-3.5 7-8V6l-7-4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  incidents: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 8h10M7 12h4" />
    </svg>
  ),
  thirdparty: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="7" r="4" />
      <circle cx="16" cy="17" r="4" />
      <path d="M12 12l3 3" />
      <path d="M4 21h8" />
    </svg>
  ),
  ai: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M2 12h2M20 12h2M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" />
    </svg>
  ),
  routes: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h1a2 2 0 0 1 2 2v2h6a3 3 0 0 1 3 3 3 3 0 0 1-3 3H8v4a3 3 0 0 1-3 3H4" />
      <circle cx="6" cy="3" r="2" />
      <circle cx="6" cy="21" r="2" />
    </svg>
  )
}

const previewBars = [68, 92, 78, 84, 73, 96]
const PREVIEW_VALUE_KEYS = ['eta', 'temp', 'customs'] as const

export default function LogisticsLandingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '48px clamp(1rem, 4vw, 3rem) 4rem',
        color: '#0f172a'
      }}
    >
      <div style={{ width: '100%', maxWidth: 1220, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <img src={InsurfoxLogoDark} alt="Insurfox" style={{ height: 70, objectFit: 'contain' }} />
          <Button
            onClick={() => navigate('/logistics-app')}
            style={{ background: '#D4380D', padding: '0.65rem 1.5rem', borderRadius: '999px', fontWeight: 600 }}
          >
            {t('logisticsLanding.login')}
          </Button>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <p style={{ margin: 0, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#64748b' }}>
            {t('logisticsLanding.badge')}
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(2.8rem, 5vw, 3.8rem)', fontWeight: 700 }}>{t('logisticsLanding.title')}</h1>
          <p style={{ margin: 0, maxWidth: '840px', color: '#475569', fontSize: '1.2rem' }}>{t('logisticsLanding.subtitle')}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem'
          }}
        >
          {KPI_KEYS.map((key) => (
            <Card
              key={key}
              variant="glass"
              style={{ padding: '1.1rem', minHeight: '120px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
            >
              <p style={{ margin: 0, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                {t(`logisticsLanding.kpi.${key}`)}
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{t(`logisticsLanding.kpiValues.${key}`)}</p>
            </Card>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 360px)',
            gap: '1.5rem',
            alignItems: 'stretch'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}
          >
            {FEATURE_KEYS.map((key) => (
              <Card key={key} variant="glass" style={{ minHeight: '180px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {featureIcons[key]}
                  <div>
                    <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem' }}>{t(`logisticsLanding.cards.${key}.title`)}</h3>
                    <p style={{ margin: 0, color: '#475569' }}>{t(`logisticsLanding.cards.${key}.body`)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card variant="glass" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', fontSize: '0.85rem' }}>
              {t('logisticsLanding.preview.title')}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              {PREVIEW_VALUE_KEYS.map((key) => (
                <div
                  key={key}
                  style={{
                    flex: '1 1 100px',
                    background: '#ffffff',
                    borderRadius: '14px',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{t(`logisticsLanding.preview.${key}`)}</p>
                  <strong style={{ fontSize: '1.4rem' }}>{t(`logisticsLanding.previewValues.${key}`)}</strong>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
              {previewBars.map((value, idx) => (
                <div key={value + idx} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '70%',
                      height: `${value}%`,
                      borderRadius: '16px',
                      background: 'linear-gradient(180deg, rgba(212,56,13,0.7), rgba(212,56,13,0.15))',
                      boxShadow: '0 15px 30px rgba(15, 23, 42, 0.12)'
                    }}
                  />
                </div>
              ))}
            </div>
            <p style={{ margin: 0, color: '#64748b' }}>{t('logisticsLanding.preview.footer')}</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
