import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'

const heroKpiKeys = ['realTime', 'ai', 'tuv', 'claims', 'docs', 'compliance'] as const
const featureCardKeys = ['vehiclesMaster', 'realTime', 'aiPrioritization', 'tuvPlanning', 'claimsControl', 'docsPolicies'] as const
const useCaseKeys = ['logistics', 'delivery', 'industrial'] as const

const previewKpis = [
  { key: 'uptime', value: '98.5%' },
  { key: 'openClaims', value: '32' },
  { key: 'downtime', value: '3.1 d' }
] as const

const incidentsData = [
  { label: '01', value: 8 },
  { label: '02', value: 11 },
  { label: '03', value: 14 },
  { label: '04', value: 10 },
  { label: '05', value: 16 },
  { label: '06', value: 9 }
] as const

const downtimeData = [
  { label: 'W1', value: 2.4 },
  { label: 'W2', value: 2.9 },
  { label: 'W3', value: 3.6 },
  { label: 'W4', value: 3.1 },
  { label: 'W5', value: 2.7 },
  { label: 'W6', value: 3.8 }
] as const

const iconProps = {
  width: 32,
  height: 32,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#D4380D',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
} as const

const featureIcons: Record<(typeof featureCardKeys)[number], React.ReactNode> = {
  vehiclesMaster: (
    <svg {...iconProps}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <circle cx="16.5" cy="16.5" r="1.5" />
      <path d="M6 6v-2h4l2 2h6" />
    </svg>
  ),
  realTime: (
    <svg {...iconProps}>
      <path d="M3 15l4-4 3 3 5-5 6 6" />
      <path d="M3 9h4" />
      <path d="M17 5h4" />
    </svg>
  ),
  aiPrioritization: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
    </svg>
  ),
  tuvPlanning: (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" />
      <path d="M9 14h6M9 18h4" />
    </svg>
  ),
  claimsControl: (
    <svg {...iconProps}>
      <path d="M5 7h14v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
      <path d="M9 7V4a3 3 0 0 1 6 0v3" />
      <path d="M12 12v4" />
      <path d="M10 16h4" />
    </svg>
  ),
  docsPolicies: (
    <svg {...iconProps}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6M10 17h6" />
    </svg>
  )
}

const useCaseIcons: Record<(typeof useCaseKeys)[number], React.ReactNode> = {
  logistics: (
    <svg {...iconProps}>
      <rect x="3" y="8" width="12" height="10" rx="2" />
      <polyline points="15 13 20 13 21 14 21 18 15 18" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
      <path d="M3 12h12" />
    </svg>
  ),
  delivery: (
    <svg {...iconProps}>
      <path d="M4 5h10l5 5v9H4z" />
      <path d="M14 5v5h5" />
      <circle cx="8" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  ),
  industrial: (
    <svg {...iconProps}>
      <path d="M4 15V5h8l4 4v6" />
      <path d="M4 11h12" />
      <rect x="2" y="15" width="20" height="6" rx="2" />
      <path d="M8 15v-2h4v2" />
    </svg>
  )
}

const aiIcon = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M18.5 5.5 17 7M7 17l-1.5 1.5" />
  </svg>
)

function AiAlertsCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div
      style={{
        borderRadius: '28px',
        padding: '1.75rem',
        background: 'linear-gradient(135deg, rgba(8,0,100,0.85) 0%, rgba(19,16,64,0.6) 60%, rgba(212,56,13,0.35) 100%)',
        boxShadow: '0 40px 80px rgba(4,0,40,0.55)',
        border: '1px solid rgba(255,255,255,0.1)',
        minHeight: '320px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(255,255,255,0.25), rgba(255,255,255,0))', opacity: 0.7 }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          {aiIcon}
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>{title}</p>
            <strong style={{ fontSize: '1.3rem' }}>{value}</strong>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', height: '140px' }}>
          {[40, 70, 55, 90, 65, 80].map((value, index) => (
            <div
              key={value + index}
              style={{
                flex: 1,
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${value}%`,
                  borderRadius: '12px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.1))',
                  boxShadow: '0 10px 26px rgba(0,0,0,0.35)'
                }}
              />
            </div>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>{description}</p>
      </div>
    </div>
  )
}

const layoutStyles = `
  .marketing-feature-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
  @media (max-width: 900px) {
    .marketing-feature-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`

export default function MarketingLandingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <>
      <style>{layoutStyles}</style>
      <div style={{ position: 'relative', minHeight: '100vh', color: '#ffffff', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '3vw',
            zIndex: 4
          }}
        >
          <Button
            onClick={() => navigate('/fleet-reporting')}
            style={{
              background: '#D4380D',
              borderColor: '#D4380D',
              borderRadius: '999px',
              padding: '0.6rem 1.4rem',
              boxShadow: '0 16px 36px rgba(0,0,0,0.35)'
            }}
          >
            {t('marketingFleet.hero.login')}
          </Button>
        </div>
        <section
          className="page"
          style={{
            paddingTop: '3rem',
            paddingBottom: '4rem'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1320px',
              margin: '0 auto',
              padding: '0 3vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem'
            }}
          >
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <img src={InsurfoxLogoLight} alt="Insurfox" style={{ width: '150px', height: 'auto' }} />
              <h1 style={{ margin: 0, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', maxWidth: '680px' }}>
                {t('marketingFleet.hero.title')}
              </h1>
              <p style={{ margin: 0, fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '640px' }}>
                {t('marketingFleet.hero.subtitle')}
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.85rem'
              }}
            >
              {heroKpiKeys.map((key) => (
                <div
                  key={key}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.16)',
                    border: '1px solid rgba(255,255,255,0.35)',
                    textAlign: 'center',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)'
                  }}
                >
                  {t(`marketingFleet.kpi.${key}`)}
                </div>
              ))}
            </div>
          </section>

          <section style={glassSectionStyle}>
            <header style={{ marginBottom: '1.5rem' }}>
              <h2 style={sectionTitleStyle}>{t('marketingFleet.manage.title')}</h2>
            </header>
            <div style={{ width: '100%', maxWidth: '100%', marginBottom: '1.5rem' }}>
              <AiAlertsCard
                title={t('marketingFleet.hero.illustrationTitle')}
                value={t('marketingFleet.hero.illustrationValue')}
                description={t('marketingFleet.hero.illustrationDescription')}
              />
            </div>
            <div className="marketing-feature-grid">
              {featureCardKeys.map((key) => (
                <div key={key} style={featureCardStyle}>
                  <span>{featureIcons[key]}</span>
                  <strong style={{ fontSize: '1.05rem' }}>{t(`marketingFleet.manage.features.${key}.title`)}</strong>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.45 }}>
                    {t(`marketingFleet.manage.features.${key}.description`)}
                  </p>
                  <div style={miniIllustrationStyle}>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.25)', borderRadius: '4px' }} />
                    <div
                      style={{
                        flex: 1,
                        height: '4px',
                        background: 'linear-gradient(90deg, rgba(212,56,13,0.8), rgba(255,255,255,0.3))',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ ...glassSectionStyle, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={sectionTitleStyle}>{t('marketingFleet.preview.title')}</h2>
              <p style={{ margin: '0.3rem 0 0', color: 'rgba(255,255,255,0.85)' }}>{t('marketingFleet.preview.subtitle')}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.8rem'
              }}
            >
              {previewKpis.map((kpi) => (
                <div key={kpi.key} style={previewKpiCardStyle}>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                    {t(`marketingFleet.preview.kpis.${kpi.key}`)}
                  </p>
                  <strong style={{ fontSize: '1.6rem' }}>{kpi.value}</strong>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              <div style={miniChartCardStyle}>
                <h3 style={chartTitleStyle}>{t('marketingFleet.preview.incidentsTitle')}</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '160px' }}>
                  {incidentsData.map((entry) => (
                    <div key={entry.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div
                        style={{
                          height: `${(entry.value / 18) * 130 + 20}px`,
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.1))',
                          borderRadius: '12px',
                          boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
                        }}
                      />
                      <small style={{ color: 'rgba(255,255,255,0.75)' }}>{entry.label}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div style={miniChartCardStyle}>
                <h3 style={chartTitleStyle}>{t('marketingFleet.preview.downtimeTitle')}</h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'flex-end',
                    height: '160px'
                  }}
                >
                  {downtimeData.map((entry) => (
                    <div key={entry.label} style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                      <div
                        style={{
                          width: '100%',
                          height: `${(entry.value / 4) * 120 + 20}px`,
                          borderRadius: '6px',
                          background: 'rgba(212,56,13,0.65)'
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                  {downtimeData.map((entry) => (
                    <span key={entry.label}>{entry.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section style={glassSectionStyle}>
            <h2 style={sectionTitleStyle}>{t('marketingFleet.usecases.title')}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem'
              }}
            >
              {useCaseKeys.map((key) => (
                <div key={key} style={useCaseCardStyle}>
                  <span>{useCaseIcons[key]}</span>
                  <strong>{t(`marketingFleet.usecases.items.${key}.title`)}</strong>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', lineHeight: 1.45 }}>
                    {t(`marketingFleet.usecases.items.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ textAlign: 'center', marginTop: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Button
                onClick={() => navigate('/fleet-management')}
                style={{
                  minWidth: '220px',
                  padding: '0.9rem 1.6rem',
                  background: '#D4380D',
                  borderColor: '#D4380D',
                  boxShadow: '0 18px 46px rgba(0,0,0,0.35)',
                  fontSize: '1rem'
                }}
              >
                {t('marketingFleet.cta.primary')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/fleet-reporting')}
                style={{
                  minWidth: '220px',
                  padding: '0.9rem 1.6rem',
                  borderColor: 'rgba(255,255,255,0.6)',
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.05)'
                }}
              >
                {t('marketingFleet.cta.secondary')}
              </Button>
            </div>
          </section>
            </div>
          </section>
        </div>
      </>
  )
}

const glassSectionStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '30px',
  padding: '2.2rem',
  boxShadow: '0 35px 80px rgba(4,0,40,0.45)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)'
}

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.5rem',
  letterSpacing: '-0.01em'
}

const featureCardStyle: React.CSSProperties = {
  borderRadius: '22px',
  padding: '1.4rem',
  background: 'rgba(8,0,100,0.35)',
  border: '1px solid rgba(255,255,255,0.18)',
  boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem'
}

const miniIllustrationStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center'
}

const previewKpiCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '18px',
  padding: '1rem',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 14px 34px rgba(0,0,0,0.3)'
}

const miniChartCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  borderRadius: '18px',
  padding: '1.2rem',
  border: '1px solid rgba(255,255,255,0.18)',
  boxShadow: '0 18px 46px rgba(0,0,0,0.35)'
}

const chartTitleStyle: React.CSSProperties = {
  margin: '0 0 0.8rem',
  fontSize: '1rem',
  color: 'rgba(255,255,255,0.9)'
}

const useCaseCardStyle: React.CSSProperties = {
  borderRadius: '22px',
  padding: '1.4rem',
  background: 'rgba(8,0,100,0.4)',
  border: '1px solid rgba(255,255,255,0.18)',
  boxShadow: '0 14px 40px rgba(0,0,0,0.3)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem'
}
