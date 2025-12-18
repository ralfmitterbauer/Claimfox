import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'
import Background1 from '@/assets/images/background1.jpg'

const highlightKeys = ['ai', 'workflows', 'insights'] as const
const moduleKeys = ['backoffice', 'tenders', 'fleetReporting', 'fleetManagement', 'registration', 'compliance'] as const
const whyKeys = ['fast', 'ai', 'scale'] as const

const chipBaseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.65rem 1.2rem',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.14)',
  border: '1px solid rgba(255,255,255,0.28)',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '0.95rem',
  letterSpacing: '0.01em',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  boxShadow: '0 16px 38px rgba(0,0,0,0.2)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)'
}

const glassCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '26px',
  padding: '2.4rem',
  boxShadow: '0 24px 70px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  color: '#ffffff'
}

const iconProps = {
  width: 32,
  height: 32,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#D4380D',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
} as const

const whyIcons: Record<(typeof whyKeys)[number], React.ReactNode> = {
  fast: (
    <svg {...iconProps}>
      <path d="M5 12h14" />
      <path d="M5 12l4-4" />
      <path d="M5 12l4 4" />
      <path d="M13 8h6" />
      <path d="M13 16h6" />
    </svg>
  ),
  ai: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
    </svg>
  ),
  scale: (
    <svg {...iconProps}>
      <path d="M3 20h18" />
      <rect x="5" y="10" width="4" height="10" rx="1" />
      <rect x="10" y="6" width="4" height="14" rx="1" />
      <rect x="15" y="3" width="4" height="17" rx="1" />
    </svg>
  )
}

export default function MarketingLandingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: '#ffffff', overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${Background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,0,100,0.65) 0%, rgba(8,0,100,0.45) 50%, rgba(8,0,100,0.65) 100%)',
          zIndex: 1
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 'calc(var(--header-height, 72px) + 12px)',
          right: '3vw',
          zIndex: 3
        }}
      >
        <Button
          onClick={() => navigate('/home')}
          style={{
            background: '#D4380D',
            borderColor: '#D4380D',
            borderRadius: '999px',
            padding: '0.65rem 1.4rem',
            boxShadow: '0 14px 36px rgba(0,0,0,0.35)'
          }}
        >
          {t('marketing.login')}
        </Button>
      </div>
      <section
        className="page"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: 'calc(var(--header-height, 72px) + 3rem)',
          paddingBottom: '4rem'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 3vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', textAlign: 'center' }}>
            <img src={InsurfoxLogoLight} alt="Insurfox" style={{ width: '140px', height: 'auto' }} />
            <header>
              <h1 style={{ margin: 0, fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em' }}>{t('marketing.title')}</h1>
              <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', maxWidth: '720px' }}>
                {t('marketing.subtitle')}
              </p>
            </header>
          </div>

          <div style={{ ...glassCardStyle }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem' }}>{t('marketing.highlights.title')}</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
              {highlightKeys.map((key) => (
                <span key={key} style={chipBaseStyle}>
                  {t(`marketing.highlights.${key}`)}
                </span>
              ))}
            </div>
          </div>

          <div style={{ ...glassCardStyle }}>
            <div style={{ marginBottom: '1.2rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.35rem' }}>{t('marketing.modules.title')}</h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.9rem'
              }}
            >
              {moduleKeys.map((key) => (
                <span key={key} style={{ ...chipBaseStyle, width: '100%' }}>
                  {t(`marketing.modules.${key}`)}
                </span>
              ))}
            </div>
          </div>

          <div style={{ ...glassCardStyle }}>
            <div style={{ marginBottom: '1.4rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.35rem' }}>{t('marketing.why.title')}</h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}
            >
              {whyKeys.map((key) => (
                <div
                  key={key}
                  style={{
                    background: 'rgba(8,0,100,0.35)',
                    borderRadius: '18px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '1.25rem',
                    minHeight: '170px',
                    boxShadow: '0 18px 46px rgba(0,0,0,0.28)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem'
                  }}
                >
                  <span style={{ display: 'inline-flex' }}>{whyIcons[key]}</span>
                  <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.4, color: 'rgba(255,255,255,0.92)' }}>
                    {t(`marketing.why.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => navigate('/roles')}
              style={{
                minWidth: '220px',
                fontSize: '1rem',
                padding: '0.9rem 1.4rem',
                background: '#D4380D',
                borderColor: '#D4380D',
                boxShadow: '0 14px 40px rgba(0,0,0,0.35)'
              }}
            >
              {t('marketing.cta')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
