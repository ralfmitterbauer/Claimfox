import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import BackgroundLogin from '@/assets/images/background_login.png'

const kpis = [
  { key: 'totalClaims', value: '248', icon: '📋' },
  { key: 'openClaims', value: '32', icon: '⚠️' },
  { key: 'lossRatio', value: '61.4%', icon: '📊' },
  { key: 'avgCost', value: '€3,420', icon: '💶' },
  { key: 'coverageRate', value: '86%', icon: '✅' }
] as const

const monthlyClaims = [
  { label: 'Jan', value: 18 },
  { label: 'Feb', value: 21 },
  { label: 'Mar', value: 26 },
  { label: 'Apr', value: 24 },
  { label: 'May', value: 19 },
  { label: 'Jun', value: 22 },
  { label: 'Jul', value: 28 },
  { label: 'Aug', value: 25 },
  { label: 'Sep', value: 23 },
  { label: 'Oct', value: 27 },
  { label: 'Nov', value: 30 },
  { label: 'Dec', value: 25 }
] as const

const severityBreakdown = [
  { key: 'high', value: 25, color: '#FF6B6B' },
  { key: 'medium', value: 48, color: '#FFC857' },
  { key: 'low', value: 27, color: '#3DD598' }
] as const

const aiItemKeys = ['item1', 'item2', 'item3', 'item4'] as const

const filterTypeOptions = ['all', 'motor', 'liability', 'cargo'] as const
const filterRangeOptions = ['last30', 'last12'] as const

const tableRows = [
  {
    key: 'row1',
    date: '12.02.2025',
    vehicle: 'DE-789-XY',
    vin: 'WVWZZZ1KZ5W113456',
    locationKey: 'row1',
    type: 'motor',
    coverage: 'covered',
    status: 'open',
    cost: '€ 8.450',
    aiTag: 'alert'
  },
  {
    key: 'row2',
    date: '08.02.2025',
    vehicle: 'HH-CARGO-12',
    vin: 'WDB9510231K556789',
    locationKey: 'row2',
    type: 'cargo',
    coverage: 'uncovered',
    status: 'review',
    cost: '€ 5.870',
    aiTag: 'watch'
  },
  {
    key: 'row3',
    date: '02.02.2025',
    vehicle: 'M-FL-2045',
    vin: 'WMWZZZ3CZ4P112233',
    locationKey: 'row3',
    type: 'liability',
    coverage: 'covered',
    status: 'open',
    cost: '€ 2.180',
    aiTag: 'normal'
  },
  {
    key: 'row4',
    date: '28.01.2025',
    vehicle: 'K-TR-330',
    vin: 'YS2P4X20002156789',
    locationKey: 'row4',
    type: 'motor',
    coverage: 'covered',
    status: 'review',
    cost: '€ 1.260',
    aiTag: 'watch'
  },
  {
    key: 'row5',
    date: '22.01.2025',
    vehicle: 'FRA-LOG-71',
    vin: '1FTFW1E57KFA12345',
    locationKey: 'row5',
    type: 'cargo',
    coverage: 'uncovered',
    status: 'closed',
    cost: '€ 9.640',
    aiTag: 'alert'
  }
] as const

const GLASS_TEXT = 'rgba(255,255,255,0.85)'
const GLASS_SUBTLE = 'rgba(255,255,255,0.65)'

function getCoverageBadgeStyles(variant: 'covered' | 'uncovered') {
  if (variant === 'covered') {
    return {
      background: 'rgba(16, 185, 129, 0.25)',
      border: '1px solid rgba(16,185,129,0.6)',
      color: '#CFFAEA'
    }
  }
  return {
    background: 'rgba(248, 113, 113, 0.25)',
    border: '1px solid rgba(248,113,113,0.6)',
    color: '#FECACA'
  }
}

function getStatusBadgeStyles(status: 'open' | 'review' | 'closed') {
  switch (status) {
    case 'open':
      return { background: 'rgba(250, 202, 21, 0.3)', border: '1px solid rgba(250,202,21,0.6)', color: '#FEF08A' }
    case 'review':
      return { background: 'rgba(129, 140, 248, 0.25)', border: '1px solid rgba(129,140,248,0.6)', color: '#E0E7FF' }
    default:
      return { background: 'rgba(45, 212, 191, 0.25)', border: '1px solid rgba(45,212,191,0.6)', color: '#99F6E4' }
  }
}

function getAiBadgeStyles(tag: 'alert' | 'watch' | 'normal') {
  if (tag === 'alert') {
    return { background: 'rgba(248, 113, 113, 0.25)', border: '1px solid rgba(248,113,113,0.6)', color: '#FECACA' }
  }
  if (tag === 'watch') {
    return { background: 'rgba(250, 204, 21, 0.25)', border: '1px solid rgba(250,204,21,0.5)', color: '#FEF9C3' }
  }
  return { background: 'rgba(74, 222, 128, 0.25)', border: '1px solid rgba(74,222,128,0.6)', color: '#DCFCE7' }
}

export default function FleetReportingPage() {
  const { t } = useI18n()
  const maxMonthly = Math.max(...monthlyClaims.map((entry) => entry.value))

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${BackgroundLogin})`,
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
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.22)',
          zIndex: 1
        }}
      />
      <section className="page" style={{ gap: '1.5rem', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <Header
            title={t('fleetReporting.title')}
            subtitle={t('fleetReporting.subtitle')}
            titleColor="#ffffff"
            subtitleColor="rgba(255,255,255,0.82)"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem'
            }}
          >
            {kpis.map((item) => (
              <Card key={item.key} variant="glass">
                <p style={{ margin: 0, fontSize: '0.95rem', color: GLASS_SUBTLE }}>{t(`fleetReporting.kpi.${item.key}`)}</p>
                <div style={{ marginTop: '0.5rem', fontSize: '2rem', fontWeight: 700, color: '#ffffff' }}>{item.value}</div>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              </Card>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}
          >
            <Card variant="glass" title={t('fleetReporting.charts.monthlyTitle')} subtitle={t('fleetReporting.charts.monthlySubtitle')}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.85rem', height: '220px' }}>
                {monthlyClaims.map((entry) => (
                  <div key={entry.label} style={{ flex: 1, textAlign: 'center' }}>
                    <div
                      style={{
                        height: `${(entry.value / maxMonthly) * 180 + 20}px`,
                        background: 'linear-gradient(180deg, #9d8bff 0%, #5b47d6 100%)',
                        borderRadius: '14px 14px 4px 4px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
                      }}
                    />
                    <small style={{ color: GLASS_SUBTLE, display: 'block', marginTop: '0.35rem' }}>{entry.label}</small>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass">
              <header style={{ marginBottom: '1rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff' }}>{t('fleetReporting.charts.coverageTitle')}</h2>
                <p style={{ margin: '0.35rem 0 0', color: GLASS_SUBTLE }}>{t('fleetReporting.charts.coverageSubtitle')}</p>
              </header>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#82f6d8' }}>86%</div>
                  <p style={{ margin: 0, color: GLASS_SUBTLE }}>{t('fleetReporting.coverageLabels.covered')}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fecaca' }}>14%</div>
                  <p style={{ margin: 0, color: GLASS_SUBTLE }}>{t('fleetReporting.coverageLabels.uncovered')}</p>
                </div>
              </div>
              <header style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>{t('fleetReporting.charts.severityTitle')}</h3>
                <p style={{ margin: '0.25rem 0 0', color: GLASS_SUBTLE }}>{t('fleetReporting.charts.severitySubtitle')}</p>
              </header>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {severityBreakdown.map((entry) => (
                  <div key={entry.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ minWidth: '90px', color: GLASS_TEXT }}>{t(`fleetReporting.severityLabels.${entry.key}`)}</span>
                    <div style={{ flex: 1, height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)' }}>
                      <div
                        style={{
                          width: `${entry.value}%`,
                          height: '100%',
                          borderRadius: '999px',
                          background: entry.color
                        }}
                      />
                    </div>
                    <strong style={{ color: '#ffffff', minWidth: '48px' }}>{entry.value}%</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card variant="glass" title={t('fleetReporting.ai.title')} subtitle={t('fleetReporting.ai.subtitle')}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              {aiItemKeys.map((key) => (
                <div
                  key={key}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '18px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 14px 32px rgba(0,0,0,0.28)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {t(`fleetReporting.ai.items.${key}`)}
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" title={t('fleetReporting.table.title')}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem',
                color: GLASS_TEXT
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: GLASS_SUBTLE }}>{t('fleetReporting.filters.typeLabel')}:</span>
                {filterTypeOptions.map((option) => (
                  <span
                    key={option}
                    style={{
                      padding: '0.35rem 0.9rem',
                      borderRadius: '999px',
                      background: option === 'all' ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      fontSize: '0.9rem'
                    }}
                  >
                    {t(`fleetReporting.filters.typeOptions.${option}`)}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: GLASS_SUBTLE }}>{t('fleetReporting.filters.rangeLabel')}:</span>
                {filterRangeOptions.map((option) => (
                  <span
                    key={option}
                    style={{
                      padding: '0.35rem 0.9rem',
                      borderRadius: '999px',
                      background: option === 'last12' ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      fontSize: '0.9rem'
                    }}
                  >
                    {t(`fleetReporting.filters.rangeOptions.${option}`)}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ffffff' }}>
                <thead>
                  <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.78)' }}>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.date')}</th>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.vehicle')}</th>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.vin')}</th>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.location')}</th>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.type')}</th>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.coverage')}</th>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.status')}</th>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.cost')}</th>
                    <th style={{ padding: '0.6rem 0.4rem' }}>{t('fleetReporting.table.columns.ai')}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr key={row.key} style={{ borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)' }}>
                      <td style={{ padding: '0.75rem 0.4rem' }}>{row.date}</td>
                      <td style={{ padding: '0.75rem 0.4rem' }}>{row.vehicle}</td>
                      <td style={{ padding: '0.75rem 0.4rem' }}>{row.vin}</td>
                      <td style={{ padding: '0.75rem 0.4rem', color: GLASS_TEXT }}>
                        {t(`fleetReporting.table.rows.${row.locationKey}.location`)}
                      </td>
                      <td style={{ padding: '0.75rem 0.4rem' }}>{t(`fleetReporting.table.types.${row.type}`)}</td>
                      <td style={{ padding: '0.75rem 0.4rem' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.25rem 0.7rem',
                            borderRadius: '999px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            minWidth: '90px',
                            ...getCoverageBadgeStyles(row.coverage as 'covered' | 'uncovered')
                          }}
                        >
                          {t(`fleetReporting.table.coverageBadges.${row.coverage}`)}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.4rem' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.25rem 0.7rem',
                            borderRadius: '999px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            minWidth: '90px',
                            ...getStatusBadgeStyles(row.status as 'open' | 'review' | 'closed')
                          }}
                        >
                          {t(`fleetReporting.table.statusBadges.${row.status}`)}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.4rem', fontWeight: 600 }}>{row.cost}</td>
                      <td style={{ padding: '0.75rem 0.4rem' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            gap: '0.35rem',
                            minWidth: '160px'
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '999px',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              ...getAiBadgeStyles(row.aiTag as 'alert' | 'watch' | 'normal')
                            }}
                          >
                            {t(`fleetReporting.table.aiBadges.${row.aiTag}`)}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: GLASS_SUBTLE }}>
                            {t(`fleetReporting.table.rows.${row.locationKey}.ai`)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
