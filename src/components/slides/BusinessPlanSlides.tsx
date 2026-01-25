import React from 'react'
import { enterpriseStrings } from '@/i18n/strings'
import KarteDeEu from '@/assets/images/karte_de_eu.png'
import KarteDeEuEn from '@/assets/images/karte_eu_de_englisch.png'
import LogistikIndustrieDe from '@/assets/images/logistik_industrie_de.png'
import LogistikIndustrieEn from '@/assets/images/logistik_industrie_en.png'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'

type SlideProps = {
  lang: 'de' | 'en'
}

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
    ]
  }
}

const formatMoney = (value: number, lang: 'de' | 'en') => {
  if (lang === 'de') {
    return `${(value / 1e9).toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} Mrd. €`
  }
  return `€${(value / 1e9).toLocaleString('en-GB', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}bn`
}

export function Slide1Markets({ lang }: SlideProps) {
  const copy = enterpriseStrings[lang]
  const mapImage = lang === 'en' ? KarteDeEuEn : KarteDeEu

  return (
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
                <tr><td>Property (Fire &amp; other damage)</td><td className="num">€ 101.823 bn</td></tr>
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
                <tr className="total-row"><td>Total P&amp;C</td><td className="num">€ 419 bn (100%)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="enterprise-footnote">{copy.cover.summary}</p>
    </div>
  )
}

export function Slide2Premium({ lang }: SlideProps) {
  const premiumStrings = premiumContent[lang]
  const industryImage = lang === 'en' ? LogistikIndustrieEn : LogistikIndustrieDe
  const exposureDe = 12.9e9
  const exposureEea = 133.25e9

  return (
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
                  <td className="num">{formatMoney(exposureDe * 0.02, lang)}</td>
                  <td className="num">{formatMoney(exposureDe * 0.03, lang)}</td>
                  <td className="num">{formatMoney(exposureDe * 0.04, lang)}</td>
                </tr>
                <tr>
                  <td>{premiumStrings.marketEea}</td>
                  <td className="num">{formatMoney(exposureEea * 0.02, lang)}</td>
                  <td className="num">{formatMoney(exposureEea * 0.03, lang)}</td>
                  <td className="num">{formatMoney(exposureEea * 0.04, lang)}</td>
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
  )
}

export function Slide3Program() {
  return (
    <div className="bp3-slide">
      <div className="bp3-header">
        <h1>Program Economics &amp; Revenue Mechanics (MGA View)</h1>
        <p>Indicative economics (70% utilization). Carrier-aligned. Exposure ≠ premium ≠ revenue.</p>
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

export function Slide4Governance() {
  return (
    <div className="bp4-slide">
      <div className="bp4-header">
        <h1>Risk, Governance &amp; Delegated Authority Framework</h1>
        <p>Carrier-aligned controls with real-time data validation and AI-assisted decision support. Capital and risk remain with insurer and reinsurers.</p>
      </div>
      <div className="bp4-grid">
        <div className="bp4-column">
          <div className="bp4-panel">
            <div className="bp4-cap">Delegated Authority &amp; Limits</div>
            <table className="bp4-table">
              <tbody>
                <tr><td>Underwriting authority</td><td className="num">Delegated MGA / Coverholder</td></tr>
                <tr><td>Carrier oversight</td><td className="num">Binding guidelines, referrals, approvals</td></tr>
                <tr><td>Per-risk limit</td><td className="num">$150,000</td></tr>
                <tr><td>Aggregate limits</td><td className="num">Daily and regional aggregates unchanged</td></tr>
                <tr><td>Risk appetite</td><td className="num">Fleet, logistics, cargo (as per binder)</td></tr>
                <tr><td>Exceptions</td><td className="num">Mandatory referral outside defined thresholds</td></tr>
              </tbody>
            </table>
            <div className="bp4-callout">Delegated authority is explicitly bounded by limits, aggregates, appetite and referral rules.</div>
          </div>
          <div className="bp4-panel">
            <div className="bp4-cap">Trigger Mechanics (Realtime, Event-validated)</div>
            <div className="bp4-micro-grid">
              <div className="bp4-micro">
                <h3>Operational Disruption Trigger (Time-based, Days)</h3>
                <ul>
                  <li>Thresholds: 7 / 9 / 10 days</li>
                  <li>Payout logic: 40% at trigger + 3% per additional day (capped at 100%)</li>
                  <li>Validation: Verified real-time logistics and fleet event streams</li>
                </ul>
                <svg className="bp4-spark" width="180" height="72" viewBox="0 0 180 72" role="img" aria-label="Delay trigger payout curve">
                  <polyline points="8,60 60,60 60,42 108,42 108,28 160,28" fill="none" stroke="var(--ix-text-muted)" strokeWidth="2" />
                  <circle cx="60" cy="42" r="3" fill="var(--ix-primary)" />
                  <circle cx="108" cy="28" r="3" fill="var(--ix-primary)" />
                  <text x="8" y="68">7d</text>
                  <text x="58" y="34">9d</text>
                  <text x="106" y="22">10d+</text>
                </svg>
              </div>
              <div className="bp4-micro">
                <h3>Service Interruption Trigger (Telemetry-based, Hours)</h3>
                <ul>
                  <li>Thresholds: 3h / 6h / 9h / 24h</li>
                  <li>Payout logic: 40% at trigger + 6% per incremental interval</li>
                  <li>Validation: System and operational telemetry</li>
                </ul>
                <svg className="bp4-spark" width="180" height="72" viewBox="0 0 180 72" role="img" aria-label="Outage trigger payout curve">
                  <polyline points="8,60 44,60 44,44 84,44 84,30 130,30 130,20 168,20" fill="none" stroke="var(--ix-text-muted)" strokeWidth="2" />
                  <circle cx="44" cy="44" r="3" fill="var(--ix-primary)" />
                  <circle cx="84" cy="30" r="3" fill="var(--ix-primary)" />
                  <circle cx="130" cy="20" r="3" fill="var(--ix-primary)" />
                  <text x="8" y="68">3h</text>
                  <text x="40" y="38">6h</text>
                  <text x="80" y="24">9h</text>
                </svg>
              </div>
            </div>
            <p className="bp4-note">Triggers establish eligibility; payout execution remains subject to policy terms and governance controls.</p>
          </div>
        </div>
        <div className="bp4-column">
          <div className="bp4-panel">
            <div className="bp4-cap">Governance</div>
            <ul className="bp4-bullets">
              <li>Rules-based underwriting and pricing</li>
              <li>Deterministic trigger evaluation</li>
              <li>Referral escalation outside predefined parameters</li>
              <li>Policy wording and pricing version control</li>
              <li>Structured claims workflow</li>
              <li>Moratorium provisions for extreme events</li>
            </ul>
          </div>
          <div className="bp4-panel">
            <div className="bp4-cap">Realtime Data &amp; AI-assisted Decision Framework</div>
            <ul className="bp4-bullets">
              <li>Multi-source real-time data ingestion (logistics, fleet, system telemetry)</li>
              <li>Time-stamped, immutable event records</li>
              <li>Deterministic rule engine for trigger evaluation</li>
              <li>Native AI used for decision support and decision templates</li>
              <li>Human-in-the-loop for approvals and exceptions</li>
              <li>Full audit trail for all trigger and decision events</li>
            </ul>
            <p className="bp4-note">AI provides decision proposals; underwriting authority and final decisions remain governed.</p>
          </div>
        </div>
      </div>
      <footer className="bp4-footer">
        <div className="bp4-footer-rule" aria-hidden="true" />
        <div className="bp4-footer-card">
          <div className="bp4-cap">Audit &amp; Reporting Pack</div>
          <div className="bp4-footer-grid">
            <span>Premium &amp; claims bordereaux</span>
            <span>Loss ratio and frequency/severity monitoring</span>
            <span>Exposure and accumulation views</span>
            <span>Referral and exception logs</span>
            <span>Trigger evidence bundles</span>
            <span>Moratorium and incident reports</span>
          </div>
        </div>
        <p>Designed for delegated authority environments with carrier and reinsurer audit requirements.</p>
      </footer>
    </div>
  )
}
