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

type Slide1Labels = {
  title: string
  leftTitle: string
  leftSubtitle: string
  rightTitle: string
  rightSubtitle: string
  lineOfBusiness: string
  insuranceSegment: string
  marketVolume: string
  headingTitle: string
  headingSubtitle: string
  headingNote: string
}

type ProgramCopy = {
  title: string
  subline: string
  gwpTitle: string
  gwpSubtitle: string
  yearLabel: string
  gwpLabel: string
  gwpNotes: string[]
  mgaTitle: string
  mgaRows: { label: string; value: string; strong?: boolean }[]
  mgaBullets: string[]
  qualityTitle: string
  qualityBullets: string[]
  callout: string
  footer: string[]
}

type GovernanceCopy = {
  title: string
  subline: string
  leftTitle: string
  leftItems: string[]
  leftControlsTitle: string
  leftControls: string[]
  centerTitle: string
  centerRows: { label: string; value: string }[]
  rightTitle: string
  rightStages: {
    sources: string
    validation: string
    engine: string
    memo: string
    outputs: string
  }
  assurance: string
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
    title: 'Prämienkorridor aus modellbasiertem Exposure',
    subline: 'Konservative Ableitung. Exposure ≠ Prämie ≠ Umsatz.',
    kpis: {
      exposureDe: 'Lead-Exposure DE',
      exposureEea: 'Lead-Exposure EEA',
      corridor: 'Prämienfaktor-Korridor',
      base: 'Basisfaktor',
      exposureDeValue: '12,900 Mrd. EUR',
      exposureEeaValue: '133,250 Mrd. EUR',
      corridorValue: '2,0 % – 4,0 %',
      baseValue: '3,0 %'
    },
    tableTitle: 'Indikativer Prämienkorridor (DE & EEA)',
    tableColumns: ['Markt', 'Niedrig (2,0%)', 'Basis (3,0%)', 'Hoch (4,0%)'],
    marketDe: 'Deutschland',
    marketEea: 'EEA',
    assumptionsTitle: 'Annahmen',
    assumptions: [
      'Prämienfaktor-Korridor basiert auf typischen Multi-Line-Logistikportfolios.',
      'Tatsächliche Prämien hängen von Mix, Retention, Zyklus, Selbstbehalten und Underwriting ab.',
      'Dies ist ein Größenkorridor, keine Umsatzprognose.'
    ]
  },
  en: {
    title: 'Premium corridor from model-based exposure',
    subline: 'Conservative derivation. Exposure ≠ premium ≠ revenue.',
    kpis: {
      exposureDe: 'Lead Exposure DE',
      exposureEea: 'Lead Exposure EEA',
      corridor: 'Premium factor corridor',
      base: 'Base case factor',
      exposureDeValue: '12,900 Mrd. EUR',
      exposureEeaValue: '133,250 Mrd. EUR',
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
    ]
  }
}

const slide1Labels: Record<Lang, Slide1Labels> = {
  de: {
    title: 'Deutscher und europäischer Markt',
    leftTitle: 'Deutscher Markt',
    leftSubtitle: 'Deutschland – Logistik / Cargo',
    rightTitle: 'EEA Markt – GWP (Solvency II)',
    rightSubtitle: 'EEA – Logistik / Cargo',
    lineOfBusiness: 'Sparte',
    insuranceSegment: 'Versicherungssegment',
    marketVolume: 'Marktvolumen',
    headingTitle: 'AI-IAAS B2B PLATTFORM',
    headingSubtitle: 'Für Makler und Versicherungsoperationen',
    headingNote: 'Enterprise-grade. Core-system agnostic.'
  },
  en: {
    title: 'German and European Markets',
    leftTitle: 'German Market',
    leftSubtitle: 'Germany – Logistic / Cargo',
    rightTitle: 'EEA Market – GWP (Solvency II)',
    rightSubtitle: 'EEA – Logistic / Cargo',
    lineOfBusiness: 'Line of Business',
    insuranceSegment: 'Insurance Segment',
    marketVolume: 'Market Volume',
    headingTitle: 'AI-IAAS B2B PLATFORM',
    headingSubtitle: 'For Brokers and Insurance Operations',
    headingNote: 'Enterprise-grade. Core-system agnostic.'
  }
}

const programContent: Record<Lang, ProgramCopy> = {
  de: {
    title: 'Programmökonomie & Erlösmechanik (MGA-Sicht)',
    subline: 'Indikative Ökonomie (70 % Auslastung). Carrier-aligned. Exposure ≠ Prämie ≠ Umsatz.',
    gwpTitle: 'Projizierte Bruttobeiträge (GWP)',
    gwpSubtitle: '(70 % Auslastung, konservativer Base Case)',
    yearLabel: 'Jahr',
    gwpLabel: 'GWP (USD)',
    gwpNotes: [
      'Basierend auf verifizierten Enterprise Leads',
      'Broker-getriebene Distribution',
      'Regionale Expansion ohne Änderung der Zeichnungslimits'
    ],
    mgaTitle: 'MGA-Ökonomie',
    mgaRows: [
      { label: 'Basisprovision', value: '29,5%' },
      { label: 'Performance-Bonus', value: 'bis zu 9,5%' },
      { label: 'Gesamtprovisionspotenzial', value: 'bis zu 39,0%', strong: true },
      { label: 'Ziel-Schadenquote', value: '< 27,5%', strong: true }
    ],
    mgaBullets: [
      'Kapitalleichtes MGA-Modell',
      'Kein Bilanzrisiko',
      'Anreize auf Portfolio-Performance ausgerichtet',
      'Lineare Skalierung mit Prämienwachstum'
    ],
    qualityTitle: 'Portfolio-Qualitätsindikatoren',
    qualityBullets: [
      'Enterprise-Flotten, Logistik- & Cargo-Versicherte',
      'Tier-1 Broker-Distribution',
      'Trigger-basierte, parametrische Strukturen',
      'Per-Risiko-Limit: $150,000',
      'Stabile Frequenz / geringe Schwere'
    ],
    callout: 'Hochmargige MGA-Ökonomie mit kontrolliertem Downside-Risiko.',
    footer: [
      'Ökonomie carrier-aligned: Zeichnungsbefugnis delegiert,',
      'Kapital und Risiko verbleiben beim Versicherer und Rückversicherungs-Panel.'
    ]
  },
  en: {
    title: 'Program Economics & Revenue Mechanics (MGA View)',
    subline: 'Indicative economics (70% utilization). Carrier-aligned. Exposure ≠ premium ≠ revenue.',
    gwpTitle: 'Projected Gross Written Premium',
    gwpSubtitle: '(70% utilization, conservative base case)',
    yearLabel: 'Year',
    gwpLabel: 'GWP (USD)',
    gwpNotes: [
      'Based on verified enterprise leads',
      'Broker-led distribution',
      'Regional expansion without change to underwriting limits'
    ],
    mgaTitle: 'MGA Economics',
    mgaRows: [
      { label: 'Base commission', value: '29.5%' },
      { label: 'Performance bonus', value: 'up to 9.5%' },
      { label: 'Total commission potential', value: 'up to 39.0%', strong: true },
      { label: 'Target loss ratio', value: '< 27.5%', strong: true }
    ],
    mgaBullets: [
      'Capital-light MGA model',
      'No balance sheet risk retained',
      'Incentives aligned with portfolio performance',
      'Linear scalability with premium growth'
    ],
    qualityTitle: 'Portfolio Quality Signals',
    qualityBullets: [
      'Enterprise fleet, logistics & cargo insureds',
      'Tier-1 broker distribution',
      'Trigger-based, parametric structures',
      'Per-risk limit: $150,000',
      'Stable frequency / low severity profile'
    ],
    callout: 'High-margin MGA economics with controlled downside risk.',
    footer: [
      'Economics are carrier-aligned: underwriting authority is delegated,',
      'capital and risk remain with the insurer and reinsurance panel.'
    ]
  }
}

const governanceContent: Record<Lang, GovernanceCopy> = {
  de: {
    title: 'Risiko-, Governance- & Delegated-Authority-Framework',
    subline:
      'Carrier-konforme Kontrollen: begrenzte Authority, auditierbare Entscheidungen, Kapital und Risiko verbleiben bei Versicherer und Rückversicherern.',
    leftTitle: 'Delegated Authority Scope',
    leftItems: [
      'Underwriting-Authority delegiert an MGA innerhalb der Binder-Regeln',
      'Tarife/Terms innerhalb genehmigter Pricing-Korridore',
      'Per-Risiko-Limit: $150,000',
      'Tages- und regionale Aggregate: unverändert',
      'Parametrische, ereignisbasierte Produktlogik',
      'Klare Abgrenzung von Rollen und Verantwortlichkeiten'
    ],
    leftControlsTitle: 'Controls',
    leftControls: [
      'Regel-Engine & Schwellenwerte',
      'Threshold-Checks vor Bindung',
      'Exception-Workflow mit Referral',
      'Audit-Log für Entscheidungen'
    ],
    centerTitle: 'Governance & Controls',
    centerRows: [
      { label: 'Datenintegrität', value: 'Realtime-Validierung, Abgleich & Reconciliation' },
      { label: 'Event-Definition', value: 'Deterministische Schwellen & Evidenzanforderungen' },
      { label: 'Pricing-Governance', value: 'Korridor, Freigaben, Monitoring' },
      { label: 'Claims-Governance', value: 'Payout-Regeln, Anti-Fraud, Audit-Trace' },
      { label: 'Exposure & Aggregation', value: 'Akkumulationsmonitoring, Alerts' },
      { label: 'Model-Risk-Management', value: 'AI-Templates, HITL-Gates, Versioning' }
    ],
    rightTitle: 'Realtime Trigger & Evidence Layer',
    rightStages: {
      sources: 'Quellen: Telematik/Fleet, TMS/Logistik, Weather/External, System-Logs',
      validation: 'Validierung: Deduplizierung, Zeitstempel-Checks, SLA-Checks, Anomaly Flags',
      engine: 'Trigger-Engine: deterministische Event-Schwellen',
      memo: 'Decision Memo (AI): Underwriting-Template, Rationale, Empfehlung',
      outputs: 'Outputs: Reporting Pack, Audit Evidence, Bordereaux, Reinsurer Reporting'
    },
    assurance:
      'Carrier-konforme Governance: klar begrenzte Delegationsrechte, deterministische Trigger, auditierbare Entscheidungen und kontinuierliches Monitoring.'
  },
  en: {
    title: 'Risk, Governance & Delegated Authority Framework',
    subline:
      'Carrier-aligned controls with real-time validation; capital and risk remain with insurer and reinsurers.',
    leftTitle: 'Delegated Authority Scope',
    leftItems: [
      'Underwriting authority delegated to MGA within binder rules',
      'Rates/terms within approved pricing corridors',
      'Per-risk limit: $150,000',
      'Daily and regional aggregates unchanged',
      'Parametric, event-based product rules',
      'Clear separation of roles and responsibilities'
    ],
    leftControlsTitle: 'Controls',
    leftControls: [
      'Rules engine and thresholds',
      'Threshold checks before binding',
      'Exception workflow with referral',
      'Audit log for decisions'
    ],
    centerTitle: 'Governance & Controls',
    centerRows: [
      { label: 'Data integrity', value: 'Realtime validation, reconciliation' },
      { label: 'Event definition', value: 'Deterministic thresholds, evidence requirements' },
      { label: 'Pricing governance', value: 'Corridor, approvals, monitoring' },
      { label: 'Claims governance', value: 'Payout rules, anti-fraud, audit trail' },
      { label: 'Exposure & accumulation', value: 'Aggregation monitoring, alerts' },
      { label: 'Model risk management', value: 'AI templates, HITL gates, versioning' }
    ],
    rightTitle: 'Realtime Trigger & Evidence Layer',
    rightStages: {
      sources: 'Sources: Telematics/Fleet, TMS/Logistics, Weather/External, System logs',
      validation: 'Validation: dedup, timestamp checks, SLA checks, anomaly flags',
      engine: 'Trigger engine: deterministic event thresholds',
      memo: 'Decision memo (AI): underwriting template, rationale, recommendation',
      outputs: 'Outputs: reporting pack, audit evidence, bordereaux, reinsurer reporting'
    },
    assurance:
      'Carrier-aligned governance: bounded delegated authority, deterministic triggers, auditable decisioning and continuous monitoring.'
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
    const slide1 = slide1Labels[typedLang]
    const programStrings = programContent[typedLang]
    const governanceStrings = governanceContent[typedLang]
    const industryImage = typedLang === 'en' ? LogistikIndustrieEn : LogistikIndustrieDe
    const exposureDe = 12.9e9
    const exposureEea = 133.25e9

    return [
      {
        key: 'markets',
        node: (
          <div className="enterprise-grid-only">
            <h1>{slide1.title}</h1>
            <div className="enterprise-grid-3">
              <div className="enterprise-table-stack">
                <div className="enterprise-table-card enterprise-table-card-left">
                  <h3>{slide1.leftTitle}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th className="label">{slide1.lineOfBusiness}</th>
                        <th className="num">{slide1.marketVolume}</th>
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
                  <h3>{slide1.leftSubtitle}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th className="label">{slide1.insuranceSegment}</th>
                        <th className="num">{slide1.marketVolume}</th>
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
                    <span className="heading-title">{slide1.headingTitle}</span>
                    <span className="heading-subtitle">{slide1.headingSubtitle}</span>
                    <span className="heading-note">{slide1.headingNote}</span>
                  </div>
                  <span className="heading-line heading-line-right" aria-hidden="true" />
                </div>
                <img src={mapImage} alt={copy.marketImageAlt} />
              </div>
              <div className="enterprise-table-stack">
                <div className="enterprise-table-card">
                  <h3>{slide1.rightTitle}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th className="label">{slide1.lineOfBusiness}</th>
                        <th className="num">{slide1.marketVolume}</th>
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
                  <h3>{slide1.rightSubtitle}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th className="label">{slide1.lineOfBusiness}</th>
                        <th className="num">{slide1.marketVolume}</th>
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
                <h3 className="enterprise-premium-image-title">
                  {typedLang === 'en' ? 'Partners and verified leads' : 'Partner und verifizierte Leads'}
                </h3>
                <img
                  src={industryImage}
                  alt={typedLang === 'en' ? 'Partners and verified leads' : 'Partner und verifizierte Leads'}
                />
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
              <h1>{programStrings.title}</h1>
              <p>{programStrings.subline}</p>
            </div>
            <div className="bp3-grid">
              <div className="bp3-panel">
                <div className="bp3-cap">{programStrings.gwpTitle}</div>
                <div className="bp3-subtitle">{programStrings.gwpSubtitle}</div>
                <table className="bp3-table">
                  <thead>
                    <tr>
                      <th>{programStrings.yearLabel}</th>
                      <th className="num">{programStrings.gwpLabel}</th>
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
                  {programStrings.gwpNotes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              </div>
              <div className="bp3-panel">
                <div className="bp3-cap">{programStrings.mgaTitle}</div>
                <table className="bp3-table">
                  <tbody>
                    {programStrings.mgaRows.map((row) => (
                      <tr key={row.label}>
                        <td className={row.strong ? 'bp3-strong' : undefined}>{row.label}</td>
                        <td className={`num${row.strong ? ' bp3-strong' : ''}`}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ul className="bp3-bullets">
                  {programStrings.mgaBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bp3-panel">
                <div className="bp3-cap">{programStrings.qualityTitle}</div>
                <ul className="bp3-bullets">
                  {programStrings.qualityBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="bp3-callout">{programStrings.callout}</div>
              </div>
            </div>
            <div className="bp3-footer">
              <div className="bp3-footer-rule" aria-hidden="true" />
              <div className="bp3-footer-text">
                {programStrings.footer.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          </div>
        )
      },
      {
        key: 'governance',
        node: (
          <div className="bp4-slide">
            <div className="bp4-header">
              <h1>{governanceStrings.title}</h1>
              <p>{governanceStrings.subline}</p>
            </div>
            <div className="bp4-grid">
              <div className="bp4-panel">
                <div className="bp4-cap">{governanceStrings.leftTitle}</div>
                <ul className="bp4-list">
                  {governanceStrings.leftItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="bp4-subcap">{governanceStrings.leftControlsTitle}</div>
                <ul className="bp4-list bp4-list-compact">
                  {governanceStrings.leftControls.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bp4-panel">
                <div className="bp4-cap">{governanceStrings.centerTitle}</div>
                <table className="bp4-table">
                  <tbody>
                    {governanceStrings.centerRows.map((row) => (
                      <tr key={row.label}>
                        <td>{row.label}</td>
                        <td className="bp4-value">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bp4-panel">
                <div className="bp4-cap">{governanceStrings.rightTitle}</div>
                <div className="bp4-diagram">
                  <svg width="260" height="180" role="img" aria-label={governanceStrings.rightTitle}>
                    <rect className="bp4-diagram-box" x="10" y="10" width="240" height="160" />
                    <line className="bp4-diagram-line" x1="30" y1="45" x2="230" y2="45" />
                    <line className="bp4-diagram-line" x1="30" y1="80" x2="230" y2="80" />
                    <line className="bp4-diagram-line" x1="30" y1="115" x2="230" y2="115" />
                    <line className="bp4-diagram-line" x1="30" y1="150" x2="230" y2="150" />
                    <text className="bp4-diagram-text" x="32" y="38">Sources</text>
                    <text className="bp4-diagram-text" x="32" y="73">Validation</text>
                    <text className="bp4-diagram-text" x="32" y="108">Trigger Engine</text>
                    <text className="bp4-diagram-text" x="32" y="143">Decision Memo (AI)</text>
                    <text className="bp4-diagram-text" x="32" y="168">Outputs</text>
                  </svg>
                  <div className="bp4-diagram-notes">
                    <p>{governanceStrings.rightStages.sources}</p>
                    <p>{governanceStrings.rightStages.validation}</p>
                    <p>{governanceStrings.rightStages.engine}</p>
                    <p>{governanceStrings.rightStages.memo}</p>
                    <p>{governanceStrings.rightStages.outputs}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bp4-assurance">{governanceStrings.assurance}</div>
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
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            goToSlide(activeIndex - 1)
          }}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            goToSlide(activeIndex - 1)
          }}
          onTouchStart={(event) => {
            event.preventDefault()
            event.stopPropagation()
            goToSlide(activeIndex - 1)
          }}
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
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            goToSlide(activeIndex + 1)
          }}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            goToSlide(activeIndex + 1)
          }}
          onTouchStart={(event) => {
            event.preventDefault()
            event.stopPropagation()
            goToSlide(activeIndex + 1)
          }}
          aria-label={typedLang === 'en' ? 'Next slide' : 'Naechste Folie'}
        >
          &gt;
        </button>
      </div>
    </section>
  )
}
