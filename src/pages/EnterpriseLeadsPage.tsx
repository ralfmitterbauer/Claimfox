import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { enterpriseStrings } from '@/i18n/strings'
import { useI18n } from '@/i18n/I18nContext'
import PosterAntares from '@/assets/images/Poster-Antares.png'
import KarteDeEu from '@/assets/images/karte_de_eu.png'
import KarteDeEuEn from '@/assets/images/karte_eu_de_englisch.png'
import LogistikIndustrieDe from '@/assets/images/logistik_industrie_de.png'
import LogistikIndustrieEn from '@/assets/images/logistik_industrie_en.png'

function buildDocRaptorUrl(route: string, filename: string) {
  return `/.netlify/functions/pdf?${new URLSearchParams({ route, filename }).toString()}`
}

export default function EnterpriseLeadsPage() {
  const [searchParams] = useSearchParams()
  const { lang } = useI18n()
  const isPrint = searchParams.get('print') === '1'
  const copy = enterpriseStrings[lang]
  const mapImage = lang === 'en' ? KarteDeEuEn : KarteDeEu
  const industryImage = lang === 'en' ? LogistikIndustrieEn : LogistikIndustrieDe
  const slidesRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 6
  const [scale, setScale] = useState(1)
  const [headerHeight, setHeaderHeight] = useState(0)
  const compositionRows = [
    { label: 'Motor (Kraftfahrt)', value: '€ 34.015 bn' },
    { label: 'Property (Sach)', value: '€ 11.306 bn' },
    { label: 'Liability (Haftpflicht)', value: '€ 8.932 bn' },
    { label: 'Transport', value: '€ 2.467 bn' },
    { label: 'Technical Lines', value: '€ 3.044 bn' },
    { label: 'Cyber', value: '€ 0.330 bn' }
  ]
  const stackRows = [
    { label: 'Fleet Motor', value: '€ 34.015 bn' },
    { label: 'Cargo', value: '€ 2.467 bn' },
    { label: 'Liability', value: '€ 8.932 bn' },
    { label: 'Property', value: '€ 11.306 bn' },
    { label: 'Technical', value: '€ 3.044 bn' },
    { label: 'Cyber', value: '€ 0.330 bn' }
  ]
  const premiumContent = {
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
      tableColumns: ['Market', 'Low (2.0%)', 'Base (3.0%)', 'High (4.0%)'],
      marketDe: 'Deutschland',
      marketEea: 'EEA',
      assumptionsTitle: 'Assumptions',
      assumptions: [
        'Premium factor corridor reflects typical multi-line logistics portfolios.',
        'Actual premium depends on mix, retention, cycle, deductibles and underwriting.',
        'This is a sizing corridor, not a revenue forecast.'
      ],
      chartDe: 'Germany',
      chartEea: 'EEA',
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
      tableColumns: ['Market', 'Low (2.0%)', 'Base (3.0%)', 'High (4.0%)'],
      marketDe: 'Germany',
      marketEea: 'EEA',
      assumptionsTitle: 'Assumptions',
      assumptions: [
        'Premium factor corridor reflects typical multi-line logistics portfolios.',
        'Actual premium depends on mix, retention, cycle, deductibles and underwriting.',
        'This is a sizing corridor, not a revenue forecast.'
      ],
      chartDe: 'Germany',
      chartEea: 'EEA',
      legend: ['Low', 'Base', 'High']
    }
  }

  const premiumStrings = premiumContent[lang]
  const exposureDe = 12.9e9
  const exposureEea = 133.25e9
  const lowFactor = 0.02
  const baseFactor = 0.03
  const highFactor = 0.04

  const formatMoney = (value: number) => {
    if (lang === 'de') {
      if (value >= 1e9) {
        return `${(value / 1e9).toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} Mrd. €`
      }
      return `${(value / 1e6).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Mio. €`
    }
    if (value >= 1e9) {
      return `€${(value / 1e9).toLocaleString('en-GB', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}bn`
    }
    return `€${(value / 1e6).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}m`
  }

  const formatPercent = (value: number) => {
    const pct = (value * 100).toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })
    return lang === 'de' ? `${pct} %` : `${pct}%`
  }

  function exportPdf() {
    const route = lang === 'de'
      ? '/enterprise-leads-intelligence/print/de'
      : '/enterprise-leads-intelligence/print/en'
    const filename = lang === 'de'
      ? 'insurfox-business-plan-part1-de.pdf'
      : 'insurfox-business-plan-part1-en.pdf'
    window.location.href = buildDocRaptorUrl(route, filename)
  }

  function goToSlide(nextIndex: number) {
    const safeIndex = Math.max(0, Math.min(totalSlides - 1, nextIndex))
    setActiveIndex(safeIndex)
  }

  useEffect(() => {
    if (isPrint) {
      return
    }
    document.body.classList.add('enterprise-fullscreen')
    return () => {
      document.body.classList.remove('enterprise-fullscreen')
    }
  }, [isPrint])

  useEffect(() => {
    if (isPrint) {
      return
    }
    const PAGE_WIDTH = 1122
    const PAGE_HEIGHT = 793
    const updateScale = () => {
      const currentHeaderHeight = headerRef.current?.offsetHeight ?? 0
      const appHeaderHeight = document.querySelector<HTMLElement>('.home-marketing-header')?.offsetHeight ?? 0
      const totalHeaderHeight = appHeaderHeight
      const availableWidth = document.documentElement.clientWidth
      const availableHeight = document.documentElement.clientHeight - totalHeaderHeight
      const maxScale = 1.2
      const nextScale = Math.min(
        availableWidth / PAGE_WIDTH,
        availableHeight / PAGE_HEIGHT,
        maxScale
      )
      setHeaderHeight(totalHeaderHeight)
      setScale(nextScale)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [isPrint])

  return (
    <section
      className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}
      style={{ '--enterprise-header-height': `${headerHeight}px` } as React.CSSProperties}
    >
      <div className="enterprise-stage">
        <div
          className="enterprise-canvas"
          style={{ transform: isPrint ? 'none' : `scale(${scale})` }}
        >
          <div
            className="enterprise-slides"
            ref={slidesRef}
            style={{ transform: `translateX(-${activeIndex * 1122}px)` }}
          >
            <section className="enterprise-page slide-cover enterprise-section">
              <div className="enterprise-grid-only">
                <h1>German and European Markets</h1>
                <div className="enterprise-grid-3">
                  <div className="enterprise-table-stack">
                  <div className="enterprise-table-card">
                    <h3>German Market</h3>
                    <table>
                      <thead>
                        <tr>
                          <th className="label">Line of Business</th>
                          <th className="num">Market Volume</th>
                        </tr>
                      </thead>
                        <tbody>
                          {compositionRows.map((row) => (
                            <tr key={row.label}>
                              <td>{row.label}</td>
                              <td className="num">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  <div className="enterprise-table-card">
                    <h3>Germany - Logistic / Cargo</h3>
                    <table>
                      <thead>
                        <tr>
                          <th className="label">Insurance Segment</th>
                          <th className="num">Market Volume</th>
                        </tr>
                      </thead>
                        <tbody>
                          {stackRows.map((row) => (
                            <tr key={row.label}>
                              <td>{row.label}</td>
                              <td className="num">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="enterprise-map-card">
                    <div className="enterprise-map-heading">
                      <span className="heading-line heading-line-left" aria-hidden="true" />
                      <div className="heading-text">
                        <span className="heading-title">AI-IAAS B2B PLATFORM</span>
                        <span className="heading-subtitle">For Brokers and Insurance Operations</span>
                        <span className="heading-note">Enterprise-grade. Core-system agnostic.</span>
                      </div>
                      <span className="heading-line heading-line-right" aria-hidden="true" />
                    </div>
                    <img src={mapImage} alt={copy.marketImageAlt} />
                  </div>
                  <div className="enterprise-table-stack">
                  <div className="enterprise-table-card">
                    <h3>EEA Market - GWP (Solvency II)</h3>
                    <table>
                      <thead>
                        <tr>
                          <th className="label">Line of Business</th>
                          <th className="num">Market Volume</th>
                        </tr>
                      </thead>
                        <tbody>
                          <tr><td>Motor vehicle liability</td><td className="num">€ 68.511 bn</td></tr>
                          <tr><td>Other motor</td><td className="num">€ 57.203 bn</td></tr>
                          <tr><td>Property (Fire & other damage)</td><td className="num">€ 101.823 bn</td></tr>
                          <tr><td>General liability</td><td className="num">€ 42.442 bn</td></tr>
                          <tr><td>Medical expense</td><td className="num">€ 113.123 bn</td></tr>
                          <tr className="total-row"><td>Total non-life</td><td className="num">€ 457.220 bn</td></tr>
                        </tbody>
                      </table>
                    </div>
                  <div className="enterprise-table-card">
                    <h3>EEA - Logistic / Cargo</h3>
                    <table>
                      <thead>
                        <tr>
                          <th className="label">Line of Business</th>
                          <th className="num">Market Volume</th>
                        </tr>
                      </thead>
                        <tbody>
                          <tr><td>Motor</td><td className="num">~€ 149 bn (36%)</td></tr>
                          <tr><td>Property</td><td className="num">~€ 113 bn (27%)</td></tr>
                          <tr><td>General liability</td><td className="num">~€ 50 bn (12%)</td></tr>
                          <tr><td>Other</td><td className="num">~€ 105 bn (25%)</td></tr>
                          <tr className="total-row"><td>Total P&C</td><td className="num">€ 419 bn (100%)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <p className="enterprise-footnote">{copy.cover.summary}</p>
              </div>
            </section>

            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-premium-slide">
                <div className="enterprise-premium-header">
                  <div>
                    <h1>{premiumStrings.title}</h1>
                    <p>{premiumStrings.subline}</p>
                  </div>
                </div>
                <div className="enterprise-premium-content">
                  <div className="enterprise-premium-kpis">
                    <div className="enterprise-premium-card">
                      <span>{premiumStrings.kpis.exposureDe}</span>
                      <strong>{formatMoney(exposureDe)}</strong>
                    </div>
                    <div className="enterprise-premium-card">
                      <span>{premiumStrings.kpis.exposureEea}</span>
                      <strong>{formatMoney(exposureEea)}</strong>
                    </div>
                    <div className="enterprise-premium-card">
                      <span>{premiumStrings.kpis.corridor}</span>
                      <strong>{formatPercent(lowFactor)} – {formatPercent(highFactor)}</strong>
                    </div>
                    <div className="enterprise-premium-card">
                      <span>{premiumStrings.kpis.base}</span>
                      <strong>{formatPercent(baseFactor)}</strong>
                    </div>
                  </div>
                  <div className="enterprise-premium-stack">
                    <div className="enterprise-table-card enterprise-premium-table">
                      <h3>{premiumStrings.tableTitle}</h3>
                      <table>
                        <thead>
                          <tr>
                            {premiumStrings.tableColumns.map((col) => (
                              <th key={col}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{premiumStrings.marketDe}</td>
                            <td className="num">{formatMoney(exposureDe * lowFactor)}</td>
                            <td className="num">{formatMoney(exposureDe * baseFactor)}</td>
                            <td className="num">{formatMoney(exposureDe * highFactor)}</td>
                          </tr>
                          <tr>
                            <td>{premiumStrings.marketEea}</td>
                            <td className="num">{formatMoney(exposureEea * lowFactor)}</td>
                            <td className="num">{formatMoney(exposureEea * baseFactor)}</td>
                            <td className="num">{formatMoney(exposureEea * highFactor)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="enterprise-premium-image">
                      <h3 className="enterprise-premium-image-title">Partner and verified leads</h3>
                      <img src={industryImage} alt="Logistik Industrie" />
                    </div>
                  </div>
                  <div className="enterprise-premium-charts">
                    <div className="enterprise-table-card enterprise-premium-chart">
                      <h3>{premiumStrings.chartDe}</h3>
                      <svg viewBox="0 0 160 120" role="img" aria-label="Germany premium corridor">
                        <rect className="bar bar-low" x="20" y="70" width="20" height="20" rx="3" />
                        <rect className="bar bar-base" x="60" y="60" width="20" height="30" rx="3" />
                        <rect className="bar bar-high" x="100" y="50" width="20" height="40" rx="3" />
                        <line className="axis" x1="15" y1="90" x2="145" y2="90" />
                      </svg>
                    </div>
                    <div className="enterprise-table-card enterprise-premium-chart">
                      <h3>{premiumStrings.chartEea}</h3>
                      <svg viewBox="0 0 160 120" role="img" aria-label="EEA premium corridor">
                        <rect className="bar bar-low" x="20" y="60" width="20" height="30" rx="3" />
                        <rect className="bar bar-base" x="60" y="45" width="20" height="45" rx="3" />
                        <rect className="bar bar-high" x="100" y="35" width="20" height="55" rx="3" />
                        <line className="axis" x1="15" y1="90" x2="145" y2="90" />
                      </svg>
                    </div>
                    <div className="enterprise-premium-legend">
                      {premiumStrings.legend.map((label, index) => (
                        <div key={label} className={`legend-item legend-${index}`}>{label}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="enterprise-premium-assumptions">
                  <h2>{premiumStrings.assumptionsTitle}</h2>
                  <ul>
                    {premiumStrings.assumptions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-page-top enterprise-page-full">
                <div className="enterprise-slide-title">
                  Business model
                </div>
              </div>
            </section>
            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-page-top enterprise-page-full">
                <div className="enterprise-slide-title">
                  Portfolio slide
                </div>
              </div>
            </section>
            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-page-top enterprise-page-full">
                <div className="enterprise-slide-title">
                  Erwartete Prämienentwicklung (GWP)
                </div>
              </div>
            </section>
            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-page-top enterprise-page-full">
                <div className="enterprise-slide-title">
                  Partnership and roles
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="enterprise-nav no-print" aria-hidden="true">
        <button
          type="button"
          className="enterprise-nav-arrow left"
          onClick={() => goToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          type="button"
          className="enterprise-nav-arrow right"
          onClick={() => goToSlide(activeIndex + 1)}
          disabled={activeIndex === totalSlides - 1}
          aria-label="Next"
        >
          →
        </button>
      </div>

    </section>
  )
}
