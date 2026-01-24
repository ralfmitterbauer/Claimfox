import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import '@/styles/premium-corridor.css'

function buildDocRaptorUrl(route: string, filename: string) {
  return `/.netlify/functions/pdf?${new URLSearchParams({ route, filename }).toString()}`
}

function formatMoney(value: number, lang: 'de' | 'en') {
  if (value >= 1e9) {
    const bn = value / 1e9
    const digits = bn < 10 ? 3 : 2
    const formatted = bn.toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    })
    return lang === 'de' ? `${formatted} Mrd. €` : `€${formatted}bn`
  }
  const m = value / 1e6
  const digits = m < 100 ? 1 : 0
  const formatted = m.toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  })
  return lang === 'de' ? `${formatted} Mio. €` : `€${formatted}m`
}

function formatPercent(value: number, lang: 'de' | 'en') {
  const pct = (value * 100).toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })
  return lang === 'de' ? `${pct} %` : `${pct}%`
}

const content = {
  de: {
    title: 'Premium Corridor from Model-based Exposure',
    subline: 'Conservative derivation. Exposure ≠ premium ≠ revenue.',
    kpis: {
      exposureDe: 'Lead Exposure DE',
      exposureEea: 'Lead Exposure EEA',
      corridor: 'Premium factor corridor',
      base: 'Base case factor'
    },
    tableTitle: 'Indicative premium corridor (DE & EEA)',
    columns: ['Market', 'Low (2.0%)', 'Base (3.0%)', 'High (4.0%)'],
    assumptions: [
      'Premium factor corridor reflects typical multi-line logistics portfolios.',
      'Actual premium depends on mix, retention, cycle, deductibles and underwriting.',
      'This is a sizing corridor, not a revenue forecast.'
    ],
    chartTitleDe: 'Germany',
    chartTitleEea: 'EEA',
    legend: ['Low', 'Base', 'High']
  },
  en: {
    title: 'Premium corridor from model-based exposure',
    subline: 'Conservative derivation. Exposure ≠ premium ≠ revenue.',
    kpis: {
      exposureDe: 'Lead Exposure DE',
      exposureEea: 'Lead Exposure EEA',
      corridor: 'Premium factor corridor',
      base: 'Base case factor'
    },
    tableTitle: 'Indicative premium corridor (DE & EEA)',
    columns: ['Market', 'Low (2.0%)', 'Base (3.0%)', 'High (4.0%)'],
    assumptions: [
      'Premium factor corridor reflects typical multi-line logistics portfolios.',
      'Actual premium depends on mix, retention, cycle, deductibles and underwriting.',
      'This is a sizing corridor, not a revenue forecast.'
    ],
    chartTitleDe: 'Germany',
    chartTitleEea: 'EEA',
    legend: ['Low', 'Base', 'High']
  }
}

export default function PremiumCorridorPage() {
  const [searchParams] = useSearchParams()
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'de'
  const strings = content[lang]

  const exposureDe = 12.9e9
  const exposureEea = 133.25e9
  const lowFactor = 0.02
  const baseFactor = 0.03
  const highFactor = 0.04

  const tableRows = useMemo(() => (
    [
      {
        market: lang === 'de' ? 'Deutschland' : 'Germany',
        low: exposureDe * lowFactor,
        base: exposureDe * baseFactor,
        high: exposureDe * highFactor
      },
      {
        market: lang === 'de' ? 'EEA' : 'EEA',
        low: exposureEea * lowFactor,
        base: exposureEea * baseFactor,
        high: exposureEea * highFactor
      }
    ]
  ), [lang])

  function exportPdf() {
    const route = lang === 'de'
      ? '/premium-corridor/print/de'
      : '/premium-corridor/print/en'
    const filename = lang === 'de'
      ? 'insurfox-premium-corridor-de.pdf'
      : 'insurfox-premium-corridor-en.pdf'
    window.location.href = buildDocRaptorUrl(route, filename)
  }

  const maxEea = exposureEea * highFactor
  const chartValuesDe = [exposureDe * lowFactor, exposureDe * baseFactor, exposureDe * highFactor]
  const chartValuesEea = [exposureEea * lowFactor, exposureEea * baseFactor, exposureEea * highFactor]

  return (
    <section className="premium-corridor-page">
      <div className="premium-corridor-slide">
        <header className="premium-corridor-header">
          <div>
            <h1>{strings.title}</h1>
            <p>{strings.subline}</p>
          </div>
          <button type="button" className="premium-corridor-export" onClick={exportPdf}>
            {lang === 'de' ? 'PDF exportieren' : 'Export PDF'}
          </button>
        </header>

        <div className="premium-corridor-content">
          <div className="premium-corridor-kpis">
            <div className="kpi-card">
              <span>{strings.kpis.exposureDe}</span>
              <strong>{formatMoney(exposureDe, lang)}</strong>
            </div>
            <div className="kpi-card">
              <span>{strings.kpis.exposureEea}</span>
              <strong>{formatMoney(exposureEea, lang)}</strong>
            </div>
            <div className="kpi-card">
              <span>{strings.kpis.corridor}</span>
              <strong>{formatPercent(lowFactor, lang)} – {formatPercent(highFactor, lang)}</strong>
            </div>
            <div className="kpi-card">
              <span>{strings.kpis.base}</span>
              <strong>{formatPercent(baseFactor, lang)}</strong>
            </div>
          </div>

          <div className="premium-corridor-table">
            <h2>{strings.tableTitle}</h2>
            <table>
              <thead>
                <tr>
                  {strings.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.market}>
                    <td>{row.market}</td>
                    <td className="num">{formatMoney(row.low, lang)}</td>
                    <td className="num">{formatMoney(row.base, lang)}</td>
                    <td className="num">{formatMoney(row.high, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="premium-corridor-charts">
            <div className="chart-card">
              <h3>{strings.chartTitleDe}</h3>
              <svg viewBox="0 0 160 120" role="img" aria-label="Germany premium corridor">
                {chartValuesDe.map((value, index) => {
                  const height = (value / (exposureDe * highFactor)) * 80
                  const x = 20 + index * 40
                  const y = 90 - height
                  return (
                    <rect key={value} x={x} y={y} width={20} height={height} rx={3} className={`bar bar-${index}`} />
                  )
                })}
                <line x1="15" y1="90" x2="145" y2="90" className="axis" />
              </svg>
            </div>
            <div className="chart-card">
              <h3>{strings.chartTitleEea}</h3>
              <svg viewBox="0 0 160 120" role="img" aria-label="EEA premium corridor">
                {chartValuesEea.map((value, index) => {
                  const height = (value / maxEea) * 80
                  const x = 20 + index * 40
                  const y = 90 - height
                  return (
                    <rect key={value} x={x} y={y} width={20} height={height} rx={3} className={`bar bar-${index}`} />
                  )
                })}
                <line x1="15" y1="90" x2="145" y2="90" className="axis" />
              </svg>
            </div>
            <div className="chart-legend">
              {strings.legend.map((label, index) => (
                <div key={label} className={`legend-item legend-${index}`}>{label}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="premium-corridor-assumptions">
          <h2>{lang === 'de' ? 'Assumptions' : 'Assumptions'}</h2>
          <ul>
            {strings.assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
