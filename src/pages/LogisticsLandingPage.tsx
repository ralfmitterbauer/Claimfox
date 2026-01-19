import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HomeHeroBackground from '@/assets/images/Home1.png'
import LogisticsHeroImage from '@/assets/images/logistik_portal.png'

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
  const [isHeroPreviewOpen, setIsHeroPreviewOpen] = React.useState(false)

  const roleCards = [
    {
      title: t('roles.cards.logistics.title'),
      body: t('roles.cards.logistics.description'),
      route: '/logistics'
    },
    {
      title: t('roles.cards.fleetManagement.title'),
      body: t('roles.cards.fleetManagement.description'),
      route: '/fleet-management'
    }
  ]

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
        <div
          style={{
            position: 'relative',
            backgroundImage: `url(${HomeHeroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '3.5rem clamp(1.5rem, 4vw, 3.25rem)',
            color: '#ffffff',
            boxShadow: '0 30px 70px rgba(11, 28, 108, 0.25)',
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 1220,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: 0, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
                {t('logisticsLanding.badge')}
              </p>
              <h1 style={{ margin: '0.75rem 0 0', fontSize: 'clamp(2.8rem, 5vw, 3.8rem)', fontWeight: 700, color: 'var(--insurfox-orange)' }}>
                {t('logisticsLanding.title')}
              </h1>
              <p style={{ marginTop: '1rem', maxWidth: '720px', color: 'rgba(255,255,255,0.82)', fontSize: '1.2rem' }}>
                {t('logisticsLanding.subtitle')}
              </p>
            </div>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 30px 70px rgba(11, 28, 108, 0.25)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                aspectRatio: '1 / 1',
                maxWidth: '420px',
                width: '100%',
                justifySelf: 'end',
                cursor: 'pointer'
              }}
              onClick={() => setIsHeroPreviewOpen(true)}
              role="button"
              aria-label="Bildvorschau öffnen"
            >
              <img src={LogisticsHeroImage} alt="Logistikportal" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          </div>
          <span style={{ position: 'absolute', left: 0, bottom: 0, width: 260, height: 4, background: '#d4380d' }} />
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <h2 style={{ margin: '0 0 0.5rem', color: 'var(--insurfox-orange)' }}>
              {t('roles.overviewGroups.logistics')}
            </h2>
            <p style={{ margin: 0, color: '#475569' }}>
              {t('roles.subtitle')}
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {roleCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.route)}
                style={{
                  textAlign: 'left',
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid rgba(148, 163, 184, 0.16)',
                  boxShadow: '0 16px 32px rgba(15, 23, 42, 0.08)',
                  cursor: 'pointer'
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem', color: 'var(--insurfox-orange)' }}>{card.title}</h3>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.55 }}>{card.body}</p>
              </button>
            ))}
          </div>
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
                    <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', color: 'var(--insurfox-orange)' }}>
                      {t(`logisticsLanding.cards.${key}.title`)}
                    </h3>
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

      {isHeroPreviewOpen && (
        <div className="hero-image-modal" role="dialog" aria-modal="true">
          <button type="button" className="hero-image-modal__close" onClick={() => setIsHeroPreviewOpen(false)} aria-label="Schließen">
            ×
          </button>
          <div className="hero-image-modal__content">
            <img src={LogisticsHeroImage} alt="Logistikportal" />
          </div>
        </div>
      )}
    </section>
  )
}
