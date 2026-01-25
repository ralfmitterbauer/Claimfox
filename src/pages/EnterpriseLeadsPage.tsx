import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { enterpriseStrings } from '@/i18n/strings'
import { useI18n } from '@/i18n/I18nContext'
import PosterAntares from '@/assets/images/Poster-Antares.png'
import KarteDeEu from '@/assets/images/karte_de_eu.png'
import KarteDeEuEn from '@/assets/images/karte_eu_de_englisch.png'
import LogistikIndustrieDe from '@/assets/images/logistik_industrie_de.png'
import LogistikIndustrieEn from '@/assets/images/logistik_industrie_en.png'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import SlideCanvas from '@/components/SlideCanvas'
import '@/styles/slide-canvas.css'

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
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 6
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
        base: 'Base case factor',
        exposureDeValue: '12,900 Mrd. €',
        exposureEeaValue: '133,250 Mrd. €',
        corridorValue: '2,0 % – 4,0 %',
        baseValue: '3,0 %'
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
        base: 'Base case factor',
        exposureDeValue: '12,900 Mrd. €',
        exposureEeaValue: '133,250 Mrd. €',
        corridorValue: '2,0 % – 4,0 %',
        baseValue: '3,0 %'
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
    document.body.classList.add('enterprise-fullscreen', 'is-slide-route')
    return () => {
      document.body.classList.remove('enterprise-fullscreen', 'is-slide-route')
    }
  }, [isPrint])

  return (
    <section className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}>
      <SlideCanvas isPrint={isPrint} className="enterprise-slide-canvas">
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
                  <div className="enterprise-table-card enterprise-table-card-left">
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
                  <div className="enterprise-table-card enterprise-table-card-left">
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
                      <strong>{premiumStrings.kpis.exposureDeValue}</strong>
                    </div>
                    <div className="enterprise-premium-card">
                      <span>{premiumStrings.kpis.exposureEea}</span>
                      <strong>{premiumStrings.kpis.exposureEeaValue}</strong>
                    </div>
                    <div className="enterprise-premium-card">
                      <span>{premiumStrings.kpis.corridor}</span>
                      <strong>{premiumStrings.kpis.corridorValue}</strong>
                    </div>
                    <div className="enterprise-premium-card">
                      <span>{premiumStrings.kpis.base}</span>
                      <strong>{premiumStrings.kpis.baseValue}</strong>
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
                      <h3 className="enterprise-premium-image-title">Partners and verified leads</h3>
                      <img src={industryImage} alt="Logistik Industrie" />
                    </div>
                  </div>
                  <div className="enterprise-premium-charts">
                    <div className="enterprise-table-card enterprise-premium-chart">
                      <h3>Germany – Indicative premium corridor</h3>
                      <svg width="260" height="180" role="img" aria-label="Germany premium corridor">
                        <line className="axis" x1="20" y1="120" x2="240" y2="120" />
                        <rect className="bar bar-low" x="40" y="85" width="28" height="35" />
                        <rect className="bar bar-base" x="116" y="70" width="28" height="50" />
                        <rect className="bar bar-high" x="192" y="55" width="28" height="65" />
                        <text className="bar-value" x="54" y="78" textAnchor="middle">258 Mio €</text>
                        <text className="bar-value" x="130" y="63" textAnchor="middle">387 Mio €</text>
                        <text className="bar-value" x="206" y="48" textAnchor="middle">516 Mio €</text>
                        <g className="legend">
                          <line className="legend-line bar-low" x1="20" y1="155" x2="36" y2="155" />
                          <text className="legend-text" x="42" y="158">Low (2.0%)</text>
                          <line className="legend-line bar-base" x1="118" y1="155" x2="134" y2="155" />
                          <text className="legend-text" x="140" y="158">Base (3.0%)</text>
                          <line className="legend-line bar-high" x1="206" y1="155" x2="222" y2="155" />
                          <text className="legend-text" x="228" y="158">High (4.0%)</text>
                        </g>
                      </svg>
                    </div>
                    <div className="enterprise-table-card enterprise-premium-chart">
                      <h3>EEA – Indicative premium corridor</h3>
                      <svg width="260" height="180" role="img" aria-label="EEA premium corridor">
                        <line className="axis" x1="20" y1="120" x2="240" y2="120" />
                        <rect className="bar bar-low" x="40" y="70" width="28" height="50" />
                        <rect className="bar bar-base" x="116" y="50" width="28" height="70" />
                        <rect className="bar bar-high" x="192" y="35" width="28" height="85" />
                        <text className="bar-value" x="54" y="62" textAnchor="middle">2.7 Mrd €</text>
                        <text className="bar-value" x="130" y="42" textAnchor="middle">4.0 Mrd €</text>
                        <text className="bar-value" x="206" y="27" textAnchor="middle">5.3 Mrd €</text>
                        <g className="legend">
                          <line className="legend-line bar-low" x1="20" y1="155" x2="36" y2="155" />
                          <text className="legend-text" x="42" y="158">Low (2.0%)</text>
                          <line className="legend-line bar-base" x1="118" y1="155" x2="134" y2="155" />
                          <text className="legend-text" x="140" y="158">Base (3.0%)</text>
                          <line className="legend-line bar-high" x1="206" y1="155" x2="222" y2="155" />
                          <text className="legend-text" x="228" y="158">High (4.0%)</text>
                        </g>
                      </svg>
                    </div>
                    <div className="enterprise-table-card enterprise-premium-logo-card">
                      <img src={InsurfoxLogo} alt="Insurfox" />
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
              <div className="enterprise-program-slide bp3-slide">
                <div className="bp3-header">
                  <div>
                    <h1>Program Economics &amp; Revenue Mechanics (MGA View)</h1>
                    <p>Indicative economics (70% utilization). Carrier-aligned. Exposure ≠ premium ≠ revenue.</p>
                  </div>
                </div>
                <div className="bp3-grid">
                  <div className="bp3-panel">
                    <div className="bp3-cap">Projected Gross Written Premium</div>
                    <div className="bp3-subtitle">(70% utilization, conservative base case)</div>
                    <table className="bp3-table">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th className="num">GWP (USD)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Y1</td><td className="num">$9.1M</td></tr>
                        <tr><td>Y2</td><td className="num">$19.8M</td></tr>
                        <tr><td>Y3</td><td className="num">$21.1M</td></tr>
                        <tr><td>Y4</td><td className="num">$50.9M</td></tr>
                        <tr><td className="bp3-strong">Y5</td><td className="num bp3-strong">$102.8M</td></tr>
                      </tbody>
                    </table>
                    <div className="bp3-notes">
                      <p>Based on verified enterprise leads</p>
                      <p>Broker-led distribution</p>
                      <p>Regional expansion without change to underwriting limits</p>
                    </div>
                  </div>
                  <div className="bp3-panel">
                    <div className="bp3-cap">MGA Economics</div>
                    <table className="bp3-table">
                      <tbody>
                        <tr><td>Base commission</td><td className="num">29.5%</td></tr>
                        <tr><td>Performance bonus</td><td className="num">up to 9.5%</td></tr>
                        <tr><td className="bp3-strong">Total commission potential</td><td className="num bp3-strong">up to 39.0%</td></tr>
                        <tr><td className="bp3-strong">Target loss ratio</td><td className="num bp3-strong">&lt; 27.5%</td></tr>
                      </tbody>
                    </table>
                    <ul className="bp3-bullets">
                      <li>Capital-light MGA model</li>
                      <li>No balance sheet risk retained</li>
                      <li>Incentives aligned with portfolio performance</li>
                      <li>Linear scalability with premium growth</li>
                    </ul>
                  </div>
                  <div className="bp3-panel">
                    <div className="bp3-cap">Portfolio Quality Signals</div>
                    <ul className="bp3-bullets">
                      <li>Enterprise fleet, logistics &amp; cargo insureds</li>
                      <li>Tier-1 broker distribution</li>
                      <li>Trigger-based, parametric structures</li>
                      <li>Per-risk limit: $150,000</li>
                      <li>Stable frequency / low severity profile</li>
                    </ul>
                    <div className="bp3-callout">
                      High-margin MGA economics with controlled downside risk.
                    </div>
                  </div>
                </div>
                <div className="bp3-footer">
                  <div className="bp3-footer-rule" aria-hidden="true" />
                  <div className="bp3-footer-text">
                    <span>Economics are carrier-aligned: underwriting authority is delegated,</span>
                    <span>capital and risk remain with the insurer and reinsurance panel.</span>
                  </div>
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
      </SlideCanvas>

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
