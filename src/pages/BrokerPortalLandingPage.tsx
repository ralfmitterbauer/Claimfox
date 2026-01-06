import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'
import BrokerBackground from '@/assets/images/background_broker.png'

const featureKeys = ['crm', 'tender', 'ai', 'insights', 'workflows', 'compliance'] as const
const trustKeys = ['crm', 'tender', 'ai'] as const
const sectorKeys = [
  'carriers',
  'fleet',
  'cargo',
  'logistics',
  'contents',
  'liability',
  'photovoltaic',
  'cyber',
  'do',
  'legal',
  'electronics',
  'machinery',
  'tradeCredit'
] as const
const whyKeys = ['relationship', 'automation', 'compliance'] as const

const iconBaseProps = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const featureIcons: Record<(typeof featureKeys)[number], JSX.Element> = {
  crm: (
    <svg {...iconBaseProps}>
      <path d="M4 7h16M4 12h16M4 17h10" />
      <circle cx="18" cy="17" r="2" />
    </svg>
  ),
  tender: (
    <svg {...iconBaseProps}>
      <path d="M6 3h12l3 5-9 13-9-13z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  ai: (
    <svg {...iconBaseProps}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
    </svg>
  ),
  insights: (
    <svg {...iconBaseProps}>
      <path d="M4 19V5l6 6 4-4 6 6v6z" />
      <path d="M4 19h16" />
    </svg>
  ),
  workflows: (
    <svg {...iconBaseProps}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v4a2 2 0 0 0 2 2h8" />
      <path d="M18 9v4a2 2 0 0 1-2 2h-2" />
    </svg>
  ),
  compliance: (
    <svg {...iconBaseProps}>
      <path d="M12 3l7 4v6c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

const trustIcons: Record<(typeof trustKeys)[number], JSX.Element> = {
  crm: (
    <svg {...iconBaseProps}>
      <path d="M4 7h16M4 12h10M4 17h6" />
      <circle cx="18" cy="17" r="2.5" />
    </svg>
  ),
  tender: (
    <svg {...iconBaseProps}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 4v16M4 9h16M12 13h4M12 17h4" />
    </svg>
  ),
  ai: (
    <svg {...iconBaseProps}>
      <path d="M12 8v8" />
      <path d="M9 10l3-3 3 3" />
      <path d="M9 14l3 3 3-3" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

const SectionDivider = () => (
  <div
    style={{
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)',
      opacity: 0.85
    }}
  />
)

const SectorsBannerGraphic = () => (
  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="35" width="35" height="25" rx="4" fill="rgba(255,255,255,0.08)" />
    <rect x="45" y="25" width="35" height="35" rx="4" fill="rgba(255,255,255,0.08)" />
    <rect x="85" y="15" width="30" height="45" rx="6" fill="rgba(255,255,255,0.08)" />
    <path d="M12 30v-8a4 4 0 0 1 4-4h24" />
    <path d="M52 20v-6a4 4 0 0 1 4-4h42" />
    <path d="M90 62v18H10V60" />
    <path d="M17 50h18M57 42h12M97 34h12" />
  </svg>
)

const glassChipBaseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 14px',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.18)',
  color: '#ffffff',
  border: '1px solid rgba(255,255,255,0.4)',
  fontSize: '0.95rem',
  lineHeight: 1,
  fontWeight: 700,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
  cursor: 'default',
  gap: '0.45rem'
}

function GlassChip({ label, weight = 700, icon }: { label: string; weight?: number; icon?: React.ReactNode }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glassChipBaseStyle,
        fontWeight: weight,
        transform: hovered ? 'translateY(-1px)' : undefined,
        background: hovered ? 'rgba(255,255,255,0.22)' : glassChipBaseStyle.background,
        boxShadow: hovered ? '0 14px 34px rgba(0,0,0,0.22)' : glassChipBaseStyle.boxShadow
      }}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{label}</span>
    </span>
  )
}

export default function BrokerPortalLandingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        color: '#fff'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '3vw',
          zIndex: 2
        }}
      >
        <Button
          onClick={() => navigate('/broker-crm')}
          style={{
            background: '#D3F261',
            color: '#081120',
            border: 'none',
            paddingInline: '1.75rem',
            fontWeight: 700
          }}
        >
          {t('brokerLanding.login')}
        </Button>
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          overflowY: 'auto'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '48px clamp(1.5rem, 4vw, 4rem) 72px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3.5rem'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <img
              src={InsurfoxLogoLight}
              alt="Insurfox"
              style={{
                height: '90px',
                width: 'auto',
                maxWidth: '260px',
                objectFit: 'contain',
                marginBottom: '1.25rem'
              }}
            />
            <h1
              style={{
                margin: 0,
                color: '#ffffff',
                fontSize: 'clamp(2.6rem, 4vw, 3.6rem)',
                lineHeight: 1.25,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textShadow: '0 14px 34px rgba(0, 0, 0, 0.6)'
              }}
            >
              {t('brokerPortal.title')}
            </h1>
            <p
              style={{
                marginTop: '1rem',
                maxWidth: '740px',
                marginInline: 'auto',
                color: 'rgba(255,255,255,0.88)',
                fontSize: '1.08rem',
                lineHeight: 1.6
              }}
            >
              {t('brokerLanding.heroSubline')}
            </p>
            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              {trustKeys.map((key) => (
                <GlassChip key={key} label={t(`brokerLanding.trust.${key}`)} icon={trustIcons[key]} weight={650} />
              ))}
            </div>
          </div>

          <SectionDivider />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.25rem',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              {[1, 2, 3].map((line) => (
                <p key={line} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                  {t(`brokerLanding.valueLine${line}`)}
                </p>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                justifyContent: 'flex-start'
              }}
            >
              {(['coverage', 'automation', 'retention'] as const).map((key) => (
                <GlassChip key={key} label={t(`brokerLanding.heroStats.${key}`)} />
              ))}
            </div>
          </div>

          <SectionDivider />

          <div>
            <header style={{ marginBottom: '1rem' }}>
              <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, color: '#d0caff' }}>
                {t('brokerLanding.featureSectionSubtitle')}
              </p>
              <h2 style={{ margin: '0.35rem 0 0', fontSize: 'clamp(1.9rem, 3vw, 2.3rem)' }}>{t('brokerLanding.featureSectionTitle')}</h2>
            </header>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.8rem'
              }}
            >
              {featureKeys.map((key) => (
                <GlassChip key={key} label={t(`brokerLanding.features.${key}`)} icon={featureIcons[key]} />
              ))}
            </div>
          </div>

          <SectionDivider />

          <div>
            <h3 style={{ margin: 0, fontSize: '1.7rem' }}>{t('brokerLanding.sectorsTitle')}</h3>
            <p style={{ marginTop: '0.35rem', color: 'rgba(255,255,255,0.85)' }}>{t('brokerLanding.sectorsSubtitle')}</p>
            <div
              style={{
                marginTop: '1.25rem',
                display: 'flex',
                gap: '1rem',
                padding: '1rem 1.5rem',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 18px 38px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 240px', color: 'rgba(255,255,255,0.92)', fontWeight: 600, fontSize: '1rem' }}>
                {t('brokerLanding.sectorsBanner')}
              </div>
              <div style={{ flex: '0 0 auto' }}>
                <SectorsBannerGraphic />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginTop: '1rem'
              }}
            >
              {sectorKeys.map((key) => (
                <GlassChip key={key} label={t(`brokerLanding.sectorsList.${key}`)} weight={650} />
              ))}
            </div>
          </div>

          <SectionDivider />

          <div>
            <h3 style={{ margin: 0, fontSize: '1.75rem' }}>{t('brokerLanding.whyTitle')}</h3>
            <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.85)' }}>{t('brokerLanding.whySubtitle')}</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                marginTop: '1.25rem'
              }}
            >
              {whyKeys.map((key) => (
                <div
                  key={key}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '18px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    minHeight: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(255,255,255,0.95)'
                  }}
                >
                  {t(`brokerLanding.whyItems.${key}`)}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
