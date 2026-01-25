import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '@/i18n/I18nContext'
import { enterpriseStrings } from '@/i18n/strings'
import KarteDeEu from '@/assets/images/karte_de_eu.png'
import KarteDeEuEn from '@/assets/images/karte_eu_de_englisch.png'
import LogistikIndustrieDe from '@/assets/images/logistik_industrie_de.png'
import LogistikIndustrieEn from '@/assets/images/logistik_industrie_en.png'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import '@/styles/bcia-deck.css'

type Lang = 'de' | 'en'

type Slide = {
  key: string
  node: React.ReactNode
}

type CorridorCopy = {
  title: string
  subline: string
  kpis: {
    exposureDe: string
    exposureEea: string
    corridor: string
    base: string
    exposureDeValue: string
    exposureEeaValue: string
    corridorValue: string
    baseValue: string
  }
  tableTitle: string
  tableColumns: string[]
  marketDe: string
  marketEea: string
  assumptionsTitle: string
  assumptions: string[]
}

const compositionRows = [
  { label: 'Motor (Kraftfahrt)', value: 'EUR 34.015 bn' },
  { label: 'Property (Sach)', value: 'EUR 11.306 bn' },
  { label: 'Liability (Haftpflicht)', value: 'EUR 8.932 bn' },
  { label: 'Transport', value: 'EUR 2.467 bn' },
  { label: 'Technical Lines', value: 'EUR 3.044 bn' },
  { label: 'Cyber', value: 'EUR 0.330 bn' }
]

const stackRows = [
  { label: 'Fleet Motor', value: 'EUR 34.015 bn' },
  { label: 'Cargo', value: 'EUR 2.467 bn' },
  { label: 'Liability', value: 'EUR 8.932 bn' },
  { label: 'Property', value: 'EUR 11.306 bn' },
  { label: 'Technical', value: 'EUR 3.044 bn' },
  { label: 'Cyber', value: 'EUR 0.330 bn' }
]

const premiumContent: Record<Lang, CorridorCopy> = {
  de: {
    title: 'Premium Corridor from Model-based Exposure',
    subline: 'Conservative derivation. Exposure != Praemie != Umsatz.',
    kpis: {
      exposureDe: 'Lead Exposure DE',
      exposureEea: 'Lead Exposure EEA',
      corridor: 'Premium factor corridor',
      base: 'Base case factor',
      exposureDeValue: '12,900 Mrd. EUR',
      exposureEeaValue: '133,250 Mrd. EUR',
      corridorValue: '2,0 % - 4,0 %',
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
    ]
  },
  en: {
    title: 'Premium corridor from model-based exposure',
    subline: 'Conservative derivation. Exposure != premium != revenue.',
    kpis: {
      exposureDe: 'Lead Exposure DE',
      exposureEea: 'Lead Exposure EEA',
      corridor: 'Premium factor corridor',
      base: 'Base case factor',
      exposureDeValue: '12,900 Mrd. EUR',
      exposureEeaValue: '133,250 Mrd. EUR',
      corridorValue: '2,0 % - 4,0 %',
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
    ]
  }
}

const formatMoney = (value: number, lang: Lang) => {
  if (lang === 'de') {
    return `${(value / 1e9).toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} Mrd. EUR`
  }
  return `EUR ${(value / 1e9).toLocaleString('en-GB', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}bn`
}

export default function BciaDeckPage() {
  const { lang } = useI18n()
  const typedLang = (lang === 'en' ? 'en' : 'de') as Lang
  const isPrintMode = new URLSearchParams(window.location.search).get('print') === '1'
  const [headerHeight, setHeaderHeight] = useState(0)
  const [scale, setScale] = useState(1)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    document.body.classList.add('bcia-deck-route')
    if (isPrintMode) {
      document.body.classList.add('bcia-print-mode')
    }
    return () => document.body.classList.remove('bcia-deck-route')
  }, [isPrintMode])

  useEffect(() => {
    if (!isPrintMode) return
    const timer = window.setTimeout(() => window.print(), 300)
    return () => window.clearTimeout(timer)
  }, [isPrintMode])

  useLayoutEffect(() => {
    const header = document.querySelector('[data-app-header="true"]') as HTMLElement | null
    if (!header) {
      setHeaderHeight(0)
      return
    }

    const observer = new ResizeObserver(() => {
      setHeaderHeight(header.getBoundingClientRect().height)
    })
    observer.observe(header)
    setHeaderHeight(header.getBoundingClientRect().height)

    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const updateScale = () => {
      const stage = stageRef.current
      if (!stage) return
      const stageWidth = stage.clientWidth
      const stageHeight = stage.clientHeight
      const slideWidth = 1122
      const slideHeight = 793
      const nextScale = Math.min(stageWidth / slideWidth, stageHeight / slideHeight, 1)
      setScale(Number.isFinite(nextScale) ? nextScale : 1)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    window.visualViewport?.addEventListener('resize', updateScale)

    return () => {
      window.removeEventListener('resize', updateScale)
      window.visualViewport?.removeEventListener('resize', updateScale)
    }
  }, [])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToSlide(activeIndex + 1)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToSlide(activeIndex - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex])

  const slides = useMemo<Slide[]>(() => {
    const copy = enterpriseStrings[typedLang]
    const mapImage = typedLang === 'en' ? KarteDeEuEn : KarteDeEu
    const premiumStrings = premiumContent[typedLang]
    const industryImage = typedLang === 'en' ? LogistikIndustrieEn : LogistikIndustrieDe
    const exposureDe = 12.9e9
    const exposureEea = 133.25e9

    return [
      {
        key: 'markets',
        node: (
          <div className="enterprise-grid-only">
            <h1>{typedLang === 'en' ? 'German and European Markets' : 'Deutscher und europaeischer Markt'}</h1>
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
                      <tr><td>Motor vehicle liability</td><td className="num">EUR 68.511 bn</td></tr>
                      <tr><td>Other motor</td><td className="num">EUR 57.203 bn</td></tr>
                      <tr><td>Property (Fire &amp; other damage)</td><td className="num">EUR 101.823 bn</td></tr>
                      <tr><td>General liability</td><td className="num">EUR 42.442 bn</td></tr>
                      <tr><td>Medical expense</td><td className="num">EUR 113.123 bn</td></tr>
                      <tr className="total-row"><td>Total non-life</td><td className="num">EUR 457.220 bn</td></tr>
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
                      <tr><td>Motor</td><td className="num">~EUR 149 bn (36%)</td></tr>
                      <tr><td>Property</td><td className="num">~EUR 113 bn (27%)</td></tr>
                      <tr><td>General liability</td><td className="num">~EUR 50 bn (12%)</td></tr>
                      <tr><td>Other</td><td className="num">~EUR 105 bn (25%)</td></tr>
                      <tr className="total-row"><td>Total P&amp;C</td><td className="num">EUR 419 bn (100%)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <p className="enterprise-footnote">{copy.cover.summary}</p>
          </div>
        )
      },
      {
        key: 'premium',
        node: (
          <div className="enterprise-premium-slide">
            <div className="enterprise-premium-header">
              <h1>{premiumStrings.title}</h1>
              <p>{premiumStrings.subline}</p>
            </div>
            <div className="enterprise-premium-content">
              <div className="enterprise-premium-kpis">
                <div className="enterprise-premium-card"><span>{premiumStrings.kpis.exposureDe}</span><strong>{premiumStrings.kpis.exposureDeValue}</strong></div>
                <div className="enterprise-premium-card"><span>{premiumStrings.kpis.exposureEea}</span><strong>{premiumStrings.kpis.exposureEeaValue}</strong></div>
                <div className="enterprise-premium-card"><span>{premiumStrings.kpis.corridor}</span><strong>{premiumStrings.kpis.corridorValue}</strong></div>
                <div className="enterprise-premium-card"><span>{premiumStrings.kpis.base}</span><strong>{premiumStrings.kpis.baseValue}</strong></div>
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
                        <td className="num">{formatMoney(exposureDe * 0.02, typedLang)}</td>
                        <td className="num">{formatMoney(exposureDe * 0.03, typedLang)}</td>
                        <td className="num">{formatMoney(exposureDe * 0.04, typedLang)}</td>
                      </tr>
                      <tr>
                        <td>{premiumStrings.marketEea}</td>
                        <td className="num">{formatMoney(exposureEea * 0.02, typedLang)}</td>
                        <td className="num">{formatMoney(exposureEea * 0.03, typedLang)}</td>
                        <td className="num">{formatMoney(exposureEea * 0.04, typedLang)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="enterprise-premium-image">
                  <h3 className="enterprise-premium-image-title">Partners and verified leads</h3>
                  <img src={industryImage} alt="Partners and verified leads" />
                </div>
              </div>
              <div className="enterprise-premium-charts">
                <div className="enterprise-table-card enterprise-premium-chart">
                  <h3>Germany - Indicative premium corridor</h3>
                  <svg width="260" height="180" role="img" aria-label="Germany premium corridor">
                    <line className="axis" x1="20" y1="120" x2="240" y2="120" />
                    <rect className="bar bar-low" x="40" y="85" width="28" height="35" />
                    <rect className="bar bar-base" x="116" y="70" width="28" height="50" />
                    <rect className="bar bar-high" x="192" y="55" width="28" height="65" />
                    <text className="bar-value" x="54" y="78" textAnchor="middle">258 Mio EUR</text>
                    <text className="bar-value" x="130" y="63" textAnchor="middle">387 Mio EUR</text>
                    <text className="bar-value" x="206" y="48" textAnchor="middle">516 Mio EUR</text>
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
                  <h3>EEA - Indicative premium corridor</h3>
                  <svg width="260" height="180" role="img" aria-label="EEA premium corridor">
                    <line className="axis" x1="20" y1="120" x2="240" y2="120" />
                    <rect className="bar bar-low" x="40" y="70" width="28" height="50" />
                    <rect className="bar bar-base" x="116" y="50" width="28" height="70" />
                    <rect className="bar bar-high" x="192" y="35" width="28" height="85" />
                    <text className="bar-value" x="54" y="62" textAnchor="middle">2.7 Mrd EUR</text>
                    <text className="bar-value" x="130" y="42" textAnchor="middle">4.0 Mrd EUR</text>
                    <text className="bar-value" x="206" y="27" textAnchor="middle">5.3 Mrd EUR</text>
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
        )
      },
      {
        key: 'program',
        node: (
          <div className="bp3-slide">
            <div className="bp3-header">
              <h1>Program Economics &amp; Revenue Mechanics (MGA View)</h1>
              <p>Indicative economics (70% utilization). Carrier-aligned. Exposure != premium != revenue.</p>
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
                <div className="bp3-callout">High-margin MGA economics with controlled downside risk.</div>
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
        )
      }
    ]
  }, [typedLang])

  const totalSlides = slides.length

  const goToSlide = useCallback((index: number) => {
    setActiveIndex((current) => {
      const nextIndex = Math.max(0, Math.min(index, totalSlides - 1))
      return nextIndex === current ? current : nextIndex
    })
  }, [totalSlides])

  return (
    <section className="bcia-deck" style={{ '--bcia-header-h': `${headerHeight}px` } as React.CSSProperties}>
      <div className="bcia-toolbar">
        <button
          type="button"
          className="bcia-print"
          onClick={() => {
            const url = new URL(window.location.href)
            url.searchParams.set('print', '1')
            const win = window.open(url.toString(), '_blank', 'noopener,noreferrer')
            if (!win) {
              window.location.href = url.toString()
            }
          }}
        >
          {typedLang === 'en' ? 'Print' : 'Drucken'}
        </button>
      </div>
      <div className="bcia-stage" ref={stageRef}>
        <button
          type="button"
          className="bcia-arrow bcia-arrow-left"
          onClick={() => goToSlide(activeIndex - 1)}
          aria-label={typedLang === 'en' ? 'Previous slide' : 'Vorherige Folie'}
        >
          &lt;
        </button>
        <div className="bcia-slider">
          <div className="bcia-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {slides.map((slide, index) => (
              <div
                key={slide.key}
                className="bcia-slide"
                ref={(node) => {
                  slideRefs.current[index] = node
                }}
              >
                <div className="bcia-canvas" style={{ transform: `scale(${scale})` }}>
                  <div className="bcia-page">
                    {slide.node}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="bcia-arrow bcia-arrow-right"
          onClick={() => goToSlide(activeIndex + 1)}
          aria-label={typedLang === 'en' ? 'Next slide' : 'Naechste Folie'}
        >
          &gt;
        </button>
      </div>
    </section>
  )
}
