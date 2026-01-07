import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

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
      background: 'linear-gradient(90deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.18) 50%, rgba(15,23,42,0) 100%)',
      opacity: 0.85
    }}
  />
)

const SectorsBannerGraphic = () => (
  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="35" width="35" height="25" rx="4" fill="#f8fafc" />
    <rect x="45" y="25" width="35" height="35" rx="4" fill="#f8fafc" />
    <rect x="85" y="15" width="30" height="45" rx="6" fill="#f8fafc" />
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
  background: '#ffffff',
  color: '#0f172a',
  border: '1px solid #e2e8f0',
  fontSize: '0.95rem',
  lineHeight: 1,
  fontWeight: 700,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
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
        background: hovered ? '#fde8df' : glassChipBaseStyle.background,
        boxShadow: hovered ? '0 14px 34px rgba(15, 23, 42, 0.12)' : glassChipBaseStyle.boxShadow
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
        color: '#0f172a',
        background: 'linear-gradient(180deg, #f7f7f8 0%, #ffffff 100%)'
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
            background: '#D4380D',
            color: '#ffffff',
            border: '1px solid #D4380D',
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
          <div
            style={{
              textAlign: 'center',
              backgroundImage: `linear-gradient(135deg, rgba(11, 28, 108, 0.85) 0%, rgba(18, 59, 154, 0.85) 100%), url(${HeroBlockBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2.5rem clamp(1rem, 4vw, 3rem)',
              color: '#ffffff',
              boxShadow: '0 30px 70px rgba(11, 28, 108, 0.25)',
              width: '100vw',
              marginLeft: 'calc(50% - 50vw)'
            }}
          >
            <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
              <h1
                style={{
                  margin: 0,
                  color: '#ffffff',
                  fontSize: 'clamp(2.6rem, 4vw, 3.6rem)',
                  lineHeight: 1.25,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                {t('brokerPortal.title')}
              </h1>
              <p
                style={{
                  marginTop: '1rem',
                  maxWidth: '740px',
                  marginInline: 'auto',
                  color: 'rgba(255,255,255,0.82)',
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
                <p key={line} style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
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
              <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, color: '#94a3b8' }}>
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
            <p style={{ marginTop: '0.35rem', color: '#475569' }}>{t('brokerLanding.sectorsSubtitle')}</p>
            <div
              style={{
                marginTop: '1.25rem',
                display: 'flex',
                gap: '1rem',
                padding: '1rem 1.5rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 18px 38px rgba(15, 23, 42, 0.08)',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 240px', color: '#0f172a', fontWeight: 600, fontSize: '1rem' }}>
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
            <p style={{ marginTop: '0.5rem', color: '#475569' }}>{t('brokerLanding.whySubtitle')}</p>
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
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    minHeight: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1f2937',
                    boxShadow: '0 12px 28px rgba(15, 23, 42, 0.08)'
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
