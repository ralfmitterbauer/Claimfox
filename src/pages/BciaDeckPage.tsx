import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import '@/styles/bcia-deck.css'

type Lang = 'de' | 'en'

type SlideContent = {
  title: string
  subline?: string
}

type MarketRow = {
  region: string
  market: string
  definition: string
  note: string
}

type CorridorRow = {
  label: string
  de: string
  eea: string
}

function useLang(): Lang {
  const search = new URLSearchParams(window.location.search)
  return search.get('lang') === 'en' ? 'en' : 'de'
}

export default function BciaDeckPage() {
  const [lang, setLang] = useState<Lang>(() => useLang())
  const [headerHeight, setHeaderHeight] = useState(0)
  const [scale, setScale] = useState(1)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const onPopState = () => setLang(useLang())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    document.body.classList.add('bcia-deck-route')
    return () => document.body.classList.remove('bcia-deck-route')
  }, [])

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
      const slideWidth = 1400
      const slideHeight = 990
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

  const goToSlide = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1))
    const target = slideRefs.current[nextIndex]
    if (sliderRef.current && target) {
      sliderRef.current.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
    }
    setActiveIndex(nextIndex)
  }

  const slides = useMemo(() => {
    const shared = {
      note: lang === 'en' ? 'Exposure != premium != revenue' : 'Exposure != Praemie != Umsatz'
    }

    const slide1: SlideContent & { kpis: Array<{ label: string; value: string }>; rows: MarketRow[] } = {
      title: lang === 'en' ? 'German and European Markets' : 'Deutscher und europaeischer Markt',
      subline: shared.note,
      kpis: [
        { label: lang === 'en' ? 'Germany market' : 'Deutschland Markt', value: lang === 'en' ? 'EUR 24 bn' : '24 Mrd. EUR' },
        { label: lang === 'en' ? 'EEA market' : 'EEA Markt', value: lang === 'en' ? 'EUR 250 bn' : '250 Mrd. EUR' },
        { label: lang === 'en' ? 'Focus' : 'Fokus', value: lang === 'en' ? 'Fleet & Logistics' : 'Flotte & Logistik' },
        { label: lang === 'en' ? 'Method' : 'Methode', value: lang === 'en' ? 'Exposure model' : 'Exposure-Modell' }
      ],
      rows: [
        {
          region: lang === 'en' ? 'Germany (DE)' : 'Deutschland (DE)',
          market: lang === 'en' ? 'EUR 24 bn' : '24 Mrd. EUR',
          definition: lang === 'en' ? 'Commercial fleet & logistics exposure' : 'Gewerbliche Flotten- & Logistikexposure',
          note: lang === 'en' ? 'Model-based anchor' : 'Modellierter Anker'
        },
        {
          region: lang === 'en' ? 'EEA' : 'EEA',
          market: lang === 'en' ? 'EUR 250 bn' : '250 Mrd. EUR',
          definition: lang === 'en' ? 'Expanded exposure baseline' : 'Erweitertes Exposure-Baseline',
          note: lang === 'en' ? 'Mid-case sizing' : 'Mid-Case Sizing'
        }
      ]
    }

    const slide2: SlideContent & {
      kpis: Array<{ label: string; value: string }>
      rows: CorridorRow[]
      assumptions: string
    } = {
      title: lang === 'en' ? 'Premium corridor from model-based exposure' : 'Premium Corridor from Model-based Exposure',
      subline: lang === 'en'
        ? 'Conservative derivation. Exposure != premium != revenue.'
        : 'Conservative derivation. Exposure != Praemie != Umsatz.',
      kpis: [
        { label: lang === 'en' ? 'Lead exposure DE' : 'Lead Exposure DE', value: lang === 'en' ? 'EUR 12.9 bn' : '12,9 Mrd. EUR' },
        { label: lang === 'en' ? 'Lead exposure EEA' : 'Lead Exposure EEA', value: lang === 'en' ? 'EUR 133.25 bn' : '133,25 Mrd. EUR' },
        { label: lang === 'en' ? 'Premium factor corridor' : 'Premium factor corridor', value: '2.0% - 4.0%' },
        { label: lang === 'en' ? 'Base case factor' : 'Base case factor', value: '3.0%' }
      ],
      rows: [
        { label: lang === 'en' ? 'Low (2.0%)' : 'Low (2,0%)', de: lang === 'en' ? 'EUR 0.258 bn' : '0,258 Mrd. EUR', eea: lang === 'en' ? 'EUR 2.665 bn' : '2,665 Mrd. EUR' },
        { label: lang === 'en' ? 'Base (3.0%)' : 'Base (3,0%)', de: lang === 'en' ? 'EUR 0.387 bn' : '0,387 Mrd. EUR', eea: lang === 'en' ? 'EUR 3.998 bn' : '3,998 Mrd. EUR' },
        { label: lang === 'en' ? 'High (4.0%)' : 'High (4,0%)', de: lang === 'en' ? 'EUR 0.516 bn' : '0,516 Mrd. EUR', eea: lang === 'en' ? 'EUR 5.330 bn' : '5,330 Mrd. EUR' }
      ],
      assumptions: lang === 'en'
        ? 'Premium factor corridor reflects typical multi-line logistics portfolios, actual premium depends on mix, retention, cycle, deductibles and underwriting, sizing corridor only.'
        : 'Premium factor corridor reflects typical multi-line logistics portfolios, actual premium depends on mix, retention, cycle, deductibles and underwriting, sizing corridor only.'
    }

    const slide3: SlideContent & {
      gwpRows: Array<{ year: string; value: string }>
      economicsRows: Array<{ label: string; value: string }>
      quality: string[]
      takeaway: string
      footer: string
    } = {
      title: lang === 'en' ? 'Program Economics & Revenue Mechanics (MGA View)' : 'Program Economics & Revenue Mechanics (MGA View)',
      subline: lang === 'en'
        ? 'Indicative economics (70% utilization). Carrier-aligned. Exposure != premium != revenue.'
        : 'Indicative economics (70% utilization). Carrier-aligned. Exposure != Praemie != Umsatz.',
      gwpRows: [
        { year: 'Y1', value: '$9.1M' },
        { year: 'Y2', value: '$19.8M' },
        { year: 'Y3', value: '$21.1M' },
        { year: 'Y4', value: '$50.9M' },
        { year: 'Y5', value: '$102.8M' }
      ],
      economicsRows: [
        { label: lang === 'en' ? 'Base commission' : 'Base commission', value: '29.5%' },
        { label: lang === 'en' ? 'Performance bonus' : 'Performance bonus', value: 'up to 9.5%' },
        { label: lang === 'en' ? 'Total commission potential' : 'Total commission potential', value: 'up to 39.0%' },
        { label: lang === 'en' ? 'Target loss ratio' : 'Target loss ratio', value: '< 27.5%' }
      ],
      quality: [
        lang === 'en' ? 'Enterprise fleet, logistics & cargo insureds' : 'Enterprise fleet, logistics & cargo insureds',
        lang === 'en' ? 'Tier-1 broker distribution' : 'Tier-1 broker distribution',
        lang === 'en' ? 'Trigger-based, parametric structures' : 'Trigger-based, parametric structures',
        lang === 'en' ? 'Per-risk limit: $150,000' : 'Per-risk limit: $150,000',
        lang === 'en' ? 'Stable frequency / low severity profile' : 'Stable frequency / low severity profile'
      ],
      takeaway: lang === 'en'
        ? 'High-margin MGA economics with controlled downside risk.'
        : 'High-margin MGA economics with controlled downside risk.',
      footer: lang === 'en'
        ? 'Economics are carrier-aligned: underwriting authority is delegated, capital and risk remain with the insurer and reinsurance panel.'
        : 'Economics are carrier-aligned: underwriting authority is delegated, capital and risk remain with the insurer and reinsurance panel.'
    }

    const slide4: SlideContent & {
      leftTitle: string
      leftBlocks: Array<{ title: string; lines: string[] }>
      centerTitle: string
      centerBlocks: Array<{ title: string; lines: string[] }>
      rightTitle: string
      rightLines: string[]
      footer: string
    } = {
      title: lang === 'en' ? 'Risk, Governance & Delegated Authority Framework' : 'Risk, Governance & Delegated Authority Framework',
      subline: lang === 'en'
        ? 'Deterministic triggers, real-time monitoring and carrier-aligned control structures'
        : 'Deterministic triggers, real-time monitoring and carrier-aligned control structures',
      leftTitle: lang === 'en' ? 'Deterministic Risk Triggers' : 'Deterministic Risk Triggers',
      leftBlocks: [
        {
          title: lang === 'en' ? 'Delay triggers' : 'Delay triggers',
          lines: [
            lang === 'en'
              ? 'Shipment delay beyond contractual thresholds (7 / 9 / 10 days)'
              : 'Shipment delay beyond contractual thresholds (7 / 9 / 10 days)',
            lang === 'en' ? 'Port congestion or cross-border transit delays' : 'Port congestion or cross-border transit delays',
            lang === 'en' ? 'Validated by multiple independent data sources' : 'Validated by multiple independent data sources'
          ]
        },
        {
          title: lang === 'en' ? 'Outage triggers' : 'Outage triggers',
          lines: [
            lang === 'en' ? 'Platform outages (3h / 6h / 9h / 24h)' : 'Platform outages (3h / 6h / 9h / 24h)',
            lang === 'en' ? 'Fleet or operational system unavailability' : 'Fleet or operational system unavailability',
            lang === 'en' ? 'Continuous telemetry and system monitoring' : 'Continuous telemetry and system monitoring'
          ]
        }
      ],
      centerTitle: lang === 'en' ? 'Real-Time Monitoring & Governance Layer' : 'Real-Time Monitoring & Governance Layer',
      centerBlocks: [
        {
          title: lang === 'en' ? 'Data aggregation' : 'Data aggregation',
          lines: [
            lang === 'en' ? 'Logistics systems, fleet telemetry, transport platforms' : 'Logistics systems, fleet telemetry, transport platforms',
            lang === 'en' ? 'External system signals' : 'External system signals'
          ]
        },
        {
          title: lang === 'en' ? 'AI-assisted decision framework' : 'AI-assisted decision framework',
          lines: [
            lang === 'en' ? 'Detects trigger conditions' : 'Detects trigger conditions',
            lang === 'en' ? 'Prepares structured decision templates' : 'Prepares structured decision templates',
            lang === 'en' ? 'Flags anomalies and edge cases' : 'Flags anomalies and edge cases'
          ]
        }
      ],
      rightTitle: lang === 'en' ? 'Delegated Authority & Carrier Control' : 'Delegated Authority & Carrier Control',
      rightLines: [
        lang === 'en' ? 'Delegated underwriting authority limited to pre-approved terms' : 'Delegated underwriting authority limited to pre-approved terms',
        lang === 'en' ? 'Carrier retains capital at risk and ultimate risk ownership' : 'Carrier retains capital at risk and ultimate risk ownership',
        lang === 'en' ? 'Oversight via reporting and governance access' : 'Oversight via reporting and governance access',
        lang === 'en' ? 'No balance sheet risk at MGA level' : 'No balance sheet risk at MGA level',
        lang === 'en' ? 'No discretionary claim handling' : 'No discretionary claim handling',
        lang === 'en' ? 'No deviation from approved trigger logic' : 'No deviation from approved trigger logic'
      ],
      footer: lang === 'en'
        ? 'All triggers, payouts and authority levels are contractually defined and subject to continuous monitoring and audit.'
        : 'All triggers, payouts and authority levels are contractually defined and subject to continuous monitoring and audit.'
    }

    return [slide1, slide2, slide3, slide4]
  }, [lang])

  const updateLang = (next: Lang) => {
    const params = new URLSearchParams(window.location.search)
    params.set('lang', next)
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
    setLang(next)
  }

  return (
    <div className="bcia-page" style={{ '--bcia-header-h': `${headerHeight}px` } as React.CSSProperties}>
      <div className="bcia-toolbar">
        <div className="bcia-language">
          <button
            type="button"
            className={lang === 'de' ? 'is-active' : ''}
            onClick={() => updateLang('de')}
          >
            DE
          </button>
          <button
            type="button"
            className={lang === 'en' ? 'is-active' : ''}
            onClick={() => updateLang('en')}
          >
            EN
          </button>
        </div>
        <button type="button" className="bcia-print" onClick={() => window.print()}>
          {lang === 'en' ? 'Print' : 'Drucken'}
        </button>
      </div>
      <div className="bcia-stage" ref={stageRef}>
        <button
          type="button"
          className="bcia-arrow bcia-arrow-left"
          onClick={() => goToSlide(activeIndex - 1)}
          aria-label={lang === 'en' ? 'Previous slide' : 'Vorherige Folie'}
        >
          &lt;
        </button>
        <div className="bcia-slider" ref={sliderRef}>
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className="bcia-slide"
              ref={(node) => {
                slideRefs.current[index] = node
              }}
            >
              <div
                className="bcia-slideCanvas"
                style={{ transform: `scale(${scale})` }}
              >
                {index === 0 && (
                  <section className="bcia-slideContent">
                    <header className="bcia-slideHeader">
                      <h1>{slide.title}</h1>
                      <p>{slide.subline}</p>
                    </header>
                    <div className="bcia-kpiRow">
                      {(slide as typeof slides[0]).kpis.map((kpi) => (
                        <div key={kpi.label} className="bcia-kpiCard">
                          <span>{kpi.label}</span>
                          <strong>{kpi.value}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="bcia-tableCard">
                      <table>
                        <thead>
                          <tr>
                            <th>{lang === 'en' ? 'Region' : 'Region'}</th>
                            <th>{lang === 'en' ? 'Market (Mid-case)' : 'Markt (Mid-Case)'}</th>
                            <th>{lang === 'en' ? 'Definition' : 'Definition'}</th>
                            <th>{lang === 'en' ? 'Note' : 'Hinweis'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(slide as typeof slides[0]).rows.map((row) => (
                            <tr key={row.region}>
                              <td>{row.region}</td>
                              <td className="is-num">{row.market}</td>
                              <td>{row.definition}</td>
                              <td>{row.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}
                {index === 1 && (
                  <section className="bcia-slideContent">
                    <header className="bcia-slideHeader">
                      <h1>{slide.title}</h1>
                      <p>{slide.subline}</p>
                    </header>
                    <div className="bcia-grid-three">
                      <div className="bcia-stack">
                        {(slide as typeof slides[1]).kpis.map((kpi) => (
                          <div key={kpi.label} className="bcia-kpiCard">
                            <span>{kpi.label}</span>
                            <strong>{kpi.value}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="bcia-tableCard">
                        <table>
                          <thead>
                            <tr>
                              <th>{lang === 'en' ? 'Scenario' : 'Szenario'}</th>
                              <th>{lang === 'en' ? 'Germany' : 'Deutschland'}</th>
                              <th>{lang === 'en' ? 'EEA' : 'EEA'}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(slide as typeof slides[1]).rows.map((row) => (
                              <tr key={row.label}>
                                <td>{row.label}</td>
                                <td className="is-num">{row.de}</td>
                                <td className="is-num">{row.eea}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="bcia-chartStack">
                        <div className="bcia-chartCard">
                          <h3>{lang === 'en' ? 'Germany - Indicative premium corridor' : 'Germany - Indicative premium corridor'}</h3>
                          <svg width="300" height="180" role="img" aria-label="Germany premium corridor">
                            <line x1="24" y1="150" x2="276" y2="150" stroke="var(--muted)" strokeWidth="1" />
                            <rect x="45" y="88" width="40" height="62" fill="var(--insurfox-orange)" opacity="0.45" />
                            <rect x="120" y="64" width="40" height="86" fill="var(--insurfox-orange)" opacity="0.75" />
                            <rect x="195" y="40" width="40" height="110" fill="var(--insurfox-orange)" />
                            <text x="65" y="78" textAnchor="middle" fontSize="11" fill="var(--text)">258</text>
                            <text x="140" y="54" textAnchor="middle" fontSize="11" fill="var(--text)">387</text>
                            <text x="215" y="30" textAnchor="middle" fontSize="11" fill="var(--text)">516</text>
                            <text x="65" y="168" textAnchor="middle" fontSize="10" fill="var(--muted)">Low</text>
                            <text x="140" y="168" textAnchor="middle" fontSize="10" fill="var(--muted)">Base</text>
                            <text x="215" y="168" textAnchor="middle" fontSize="10" fill="var(--muted)">High</text>
                          </svg>
                          <div className="bcia-legend">
                            <span><span className="swatch low"></span>Low</span>
                            <span><span className="swatch base"></span>Base</span>
                            <span><span className="swatch high"></span>High</span>
                          </div>
                        </div>
                        <div className="bcia-chartCard">
                          <h3>{lang === 'en' ? 'EEA - Indicative premium corridor' : 'EEA - Indicative premium corridor'}</h3>
                          <svg width="300" height="180" role="img" aria-label="EEA premium corridor">
                            <line x1="24" y1="150" x2="276" y2="150" stroke="var(--muted)" strokeWidth="1" />
                            <rect x="45" y="100" width="40" height="50" fill="var(--insurfox-orange)" opacity="0.45" />
                            <rect x="120" y="72" width="40" height="78" fill="var(--insurfox-orange)" opacity="0.75" />
                            <rect x="195" y="40" width="40" height="110" fill="var(--insurfox-orange)" />
                            <text x="65" y="90" textAnchor="middle" fontSize="11" fill="var(--text)">2.7</text>
                            <text x="140" y="62" textAnchor="middle" fontSize="11" fill="var(--text)">4.0</text>
                            <text x="215" y="30" textAnchor="middle" fontSize="11" fill="var(--text)">5.3</text>
                            <text x="65" y="168" textAnchor="middle" fontSize="10" fill="var(--muted)">Low</text>
                            <text x="140" y="168" textAnchor="middle" fontSize="10" fill="var(--muted)">Base</text>
                            <text x="215" y="168" textAnchor="middle" fontSize="10" fill="var(--muted)">High</text>
                          </svg>
                          <div className="bcia-legend">
                            <span><span className="swatch low"></span>Low</span>
                            <span><span className="swatch base"></span>Base</span>
                            <span><span className="swatch high"></span>High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="bcia-assumptions">{(slide as typeof slides[1]).assumptions}</p>
                  </section>
                )}
                {index === 2 && (
                  <section className="bcia-slideContent">
                    <header className="bcia-slideHeader">
                      <h1>{slide.title}</h1>
                      <p>{slide.subline}</p>
                    </header>
                    <div className="bcia-grid-three">
                      <div className="bcia-tableCard">
                        <h3>{lang === 'en' ? 'Projected Gross Written Premium' : 'Projected Gross Written Premium'}</h3>
                        <p className="bcia-muted">(70% utilization, conservative base case)</p>
                        <table>
                          <thead>
                            <tr>
                              <th>Year</th>
                              <th className="is-num">GWP (USD)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(slide as typeof slides[2]).gwpRows.map((row) => (
                              <tr key={row.year}>
                                <td>{row.year}</td>
                                <td className="is-num">{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="bcia-muted">Based on verified enterprise leads, broker-led distribution, regional expansion without change to underwriting limits</p>
                      </div>
                      <div className="bcia-tableCard">
                        <h3>{lang === 'en' ? 'MGA Economics' : 'MGA Economics'}</h3>
                        <table>
                          <tbody>
                            {(slide as typeof slides[2]).economicsRows.map((row) => (
                              <tr key={row.label}>
                                <td>{row.label}</td>
                                <td className="is-num">{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <ul className="bcia-list">
                          <li>Capital-light MGA model</li>
                          <li>No balance sheet risk retained</li>
                          <li>Incentives aligned with portfolio performance</li>
                          <li>Linear scalability with premium growth</li>
                        </ul>
                      </div>
                      <div className="bcia-tableCard">
                        <h3>{lang === 'en' ? 'Portfolio Quality Signals' : 'Portfolio Quality Signals'}</h3>
                        <ul className="bcia-list">
                          {(slide as typeof slides[2]).quality.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className="bcia-callout">
                          {(slide as typeof slides[2]).takeaway}
                        </div>
                      </div>
                    </div>
                    <div className="bcia-footer">
                      {(slide as typeof slides[2]).footer}
                    </div>
                  </section>
                )}
                {index === 3 && (
                  <section className="bcia-slideContent">
                    <header className="bcia-slideHeader">
                      <h1>{slide.title}</h1>
                      <p>{slide.subline}</p>
                    </header>
                    <div className="bcia-grid-three">
                      <div className="bcia-tableCard">
                        <h3>{(slide as typeof slides[3]).leftTitle}</h3>
                        {(slide as typeof slides[3]).leftBlocks.map((block) => (
                          <div key={block.title} className="bcia-block">
                            <span className="bcia-blockTitle">{block.title}</span>
                            <ul className="bcia-list">
                              {block.lines.map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <p className="bcia-muted">Triggers are binary, objective and non-discretionary.</p>
                      </div>
                      <div className="bcia-tableCard">
                        <h3>{(slide as typeof slides[3]).centerTitle}</h3>
                        {(slide as typeof slides[3]).centerBlocks.map((block) => (
                          <div key={block.title} className="bcia-block">
                            <span className="bcia-blockTitle">{block.title}</span>
                            <ul className="bcia-list">
                              {block.lines.map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="bcia-callout">Human-in-the-loop governance with full audit trail.</div>
                      </div>
                      <div className="bcia-tableCard">
                        <h3>{(slide as typeof slides[3]).rightTitle}</h3>
                        <ul className="bcia-list">
                          {(slide as typeof slides[3]).rightLines.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                        <div className="bcia-callout">Carrier-aligned governance with controlled downside and full transparency.</div>
                      </div>
                    </div>
                    <div className="bcia-footer">
                      {(slide as typeof slides[3]).footer}
                    </div>
                  </section>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bcia-arrow bcia-arrow-right"
          onClick={() => goToSlide(activeIndex + 1)}
          aria-label={lang === 'en' ? 'Next slide' : 'Naechste Folie'}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}
