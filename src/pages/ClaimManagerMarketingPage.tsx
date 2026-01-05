import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'

const featureKeys = [
  'statusTimeline',
  'coverage',
  'partners',
  'workflows',
  'documents',
  'aiInsights'
] as const

const featureIcons: Record<(typeof featureKeys)[number], React.ReactNode> = {
  statusTimeline: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M6 8v12" />
      <path d="M12 14v6" />
      <path d="M18 8v12" />
      <path d="M6 12h6l6-4" />
    </svg>
  ),
  coverage: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 6v7c0 4.5 3.1 6.9 7 8 3.9-1.1 7-3.5 7-8V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  partners: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 17v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
      <circle cx="6" cy="9" r="3" />
      <path d="M21 17v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
      <circle cx="17" cy="9" r="3" />
    </svg>
  ),
  workflows: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7h14v4H5z" />
      <path d="M5 13h14v4H5z" />
      <path d="M9 3v4" />
      <path d="M15 17v4" />
      <path d="M9 13V7" />
      <path d="M15 17v-4" />
    </svg>
  ),
  documents: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6M10 17h6" />
    </svg>
  ),
  aiInsights: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4380D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
    </svg>
  )
}

const previewKpis = [
  { key: 'active', value: '128' },
  { key: 'sla', value: '92%' },
  { key: 'ai', value: '14' }
] as const

const previewSeries = [
  { week: 'KW 18', value: 6420 },
  { week: 'KW 19', value: 7120 },
  { week: 'KW 20', value: 5840 },
  { week: 'KW 21', value: 8030 },
  { week: 'KW 22', value: 6910 },
  { week: 'KW 23', value: 8670 }
] as const

const gridStyles = `
  .claim-manager-feature-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }
  @media (max-width: 1100px) {
    .claim-manager-feature-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 720px) {
    .claim-manager-feature-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`

export default function ClaimManagerMarketingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const chartMax = Math.max(...previewSeries.map((item) => item.value))
  const chartMin = Math.min(...previewSeries.map((item) => item.value))
  const chartWidth = 320
  const chartHeight = 180
  const chartPadding = { top: 12, right: 12, bottom: 36, left: 28 }
  const chartInnerHeight = chartHeight - chartPadding.top - chartPadding.bottom
  const chartInnerWidth = chartWidth - chartPadding.left - chartPadding.right
  const chartPoints = previewSeries.map((item, index) => {
    const x = chartPadding.left + (chartInnerWidth / (previewSeries.length - 1)) * index
    const normalized = chartMax === chartMin ? 0.5 : (item.value - chartMin) / (chartMax - chartMin)
    const y = chartPadding.top + (1 - normalized) * chartInnerHeight
    return { x, y, value: item.value }
  })
  const chartLinePath = chartPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
    .join(' ')
  const chartAreaPath = `${chartLinePath} L ${chartPadding.left + chartInnerWidth},${chartPadding.top + chartInnerHeight} L ${chartPadding.left},${chartPadding.top + chartInnerHeight} Z`

  return (
    <>
      <style>{gridStyles}</style>
        <section
          style={{
            minHeight: '100vh',
            width: '100%',
            padding: 'calc(var(--header-height) + 32px) 1.25rem 4rem',
            display: 'flex',
            justifyContent: 'center',
            color: '#ffffff'
          }}
        >
          <div style={{ width: '100%', maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <img src={InsurfoxLogoLight} alt="Insurfox" style={{ height: '56px' }} />
              <Button
                onClick={() => navigate('/claim-manager-app')}
                style={{ background: '#D4380D', padding: '0.65rem 1.4rem' }}
              >
                {t('claimManager.marketing.hero.login')}
              </Button>
            </div>

            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                {t('claimManager.marketing.hero.overline')}
              </p>
              <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 700 }}>{t('claimManager.marketing.hero.title')}</h1>
              <p style={{ maxWidth: '760px', color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem' }}>
                {t('claimManager.marketing.hero.subtitle')}
              </p>
            </div>

            <div className="claim-manager-feature-grid">
              {featureKeys.map((key) => (
                <Card
                  key={key}
                  variant="glass"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    minHeight: '180px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {featureIcons[key]}
                    <div>
                      <h3 style={{ margin: '0 0 0.35rem' }}>{t(`claimManager.marketing.features.${key}.title`)}</h3>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)' }}>
                        {t(`claimManager.marketing.features.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card
              variant="glass"
              style={{
                background: 'rgba(255,255,255,0.09)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.75rem',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: '1 1 320px' }}>
                <h2 style={{ margin: '0 0 0.5rem' }}>{t('claimManager.marketing.preview.title')}</h2>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)' }}>
                  {t('claimManager.marketing.preview.subtitle')}
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {previewKpis.map((item) => (
                    <div
                      key={item.key}
                      style={{
                        flex: '1 1 120px',
                        padding: '0.85rem',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                        {t(`claimManager.marketing.preview.kpis.${item.key}`)}
                      </p>
                      <strong style={{ fontSize: '1.4rem' }}>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  flex: '1 1 360px',
                  background: 'rgba(8,16,64,0.6)',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 30px 50px rgba(3,0,40,0.4)'
                }}
              >
                <p style={{ margin: '0 0 1rem', fontWeight: 600 }}>{t('claimManager.marketing.preview.chartTitle')}</p>
                <div style={{ width: '100%', display: 'grid', gap: '0.5rem' }}>
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: '180px' }}>
                    <defs>
                      <linearGradient id="costLine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(211,242,97,0.95)" />
                        <stop offset="100%" stopColor="rgba(211,242,97,0.1)" />
                      </linearGradient>
                      <linearGradient id="costArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(211,242,97,0.35)" />
                        <stop offset="100%" stopColor="rgba(211,242,97,0)" />
                      </linearGradient>
                    </defs>
                    {[0.25, 0.5, 0.75, 1].map((ratio) => (
                      <line
                        key={ratio}
                        x1={chartPadding.left}
                        x2={chartPadding.left + chartInnerWidth}
                        y1={chartPadding.top + chartInnerHeight * ratio}
                        y2={chartPadding.top + chartInnerHeight * ratio}
                        stroke="rgba(255,255,255,0.12)"
                        strokeDasharray="4 6"
                      />
                    ))}
                    <path d={chartAreaPath} fill="url(#costArea)" />
                    <path d={chartLinePath} fill="none" stroke="url(#costLine)" strokeWidth="3" />
                    {chartPoints.map((point, index) => (
                      <circle
                        key={`${point.x}-${point.y}`}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="rgba(211,242,97,0.95)"
                        stroke="rgba(8,16,64,0.9)"
                        strokeWidth="2"
                      />
                    ))}
                    {chartPoints.map((point) => (
                      <text
                        key={`label-${point.x}`}
                        x={point.x}
                        y={Math.max(chartPadding.top + 12, point.y - 8)}
                        textAnchor="middle"
                        fontSize="10"
                        fill="rgba(255,255,255,0.7)"
                      >
                        {`€${point.value.toLocaleString('de-DE')}`}
                      </text>
                    ))}
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                    {previewSeries.map((item) => (
                      <span key={item.week}>{item.week}</span>
                    ))}
                  </div>
                </div>
                <p style={{ margin: '1rem 0 0', color: 'rgba(255,255,255,0.75)' }}>
                  {t('claimManager.marketing.preview.notes')}
                </p>
              </div>
            </Card>
          </div>
        </section>
    </>
  )
}
