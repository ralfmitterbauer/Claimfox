import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'
import '@/styles/underwriter-premium.css'

type CaseItem = {
  id: string
  productKey: 'fleet' | 'cargo' | 'carrier_liability'
  account: string
  slaDue: string
  slaBucket: 'due_today' | 'due_48h' | 'breached'
  breachSeverity: 'low' | 'med' | 'high'
  corridorStatus: 'within' | 'out'
  pricingCorridor: { min: number; target: number; max: number; suggested: number }
}

const formatSla = (iso: string, lang: string) => {
  const date = new Date(iso)
  const formatter = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-DE', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
  return formatter.format(date)
}

const MiniSparkline = ({ data }: { data: number[] }) => {
  const max = Math.max(...data)
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 30 - (value / max) * 30
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg width="100%" height="40" viewBox="0 0 100 30" aria-hidden>
      <polyline fill="none" stroke="#1d4ed8" strokeWidth="2" points={points} />
    </svg>
  )
}

const CorridorChart = ({ corridor, label }: { corridor: CaseItem['pricingCorridor']; label: string }) => {
  const range = corridor.max - corridor.min
  const targetX = ((corridor.target - corridor.min) / range) * 100
  const suggestedX = ((corridor.suggested - corridor.min) / range) * 100
  return (
    <svg width="100%" height="50" viewBox="0 0 100 50" aria-label={label}>
      <rect x="5" y="20" width="90" height="10" fill="#e2e8f0" rx="5" />
      <rect x="5" y="20" width="90" height="10" fill="#c7d2fe" rx="5" opacity="0.65" />
      <line x1={5 + targetX * 0.9} y1="15" x2={5 + targetX * 0.9} y2="35" stroke="#1d4ed8" strokeWidth="2" />
      <circle cx={5 + suggestedX * 0.9} cy="25" r="4" fill="#0f172a" />
      <text x="5" y="12" fontSize="6" fill="#64748b">{corridor.min.toFixed(0)}</text>
      <text x="85" y="12" fontSize="6" fill="#64748b">{corridor.max.toFixed(0)}</text>
    </svg>
  )
}

export default function UnderwriterSeniorPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Senior Underwriter',
        subtitle: 'Expanded authority with override governance and portfolio steering.',
        kpi: {
          open: 'Open decisions',
          overrides: 'Overrides used',
          referralRate: 'Referral rate',
          alerts: 'Aggregation alerts',
          evidence: 'Evidence quality avg',
          authority: 'Authority utilization'
        },
        table: { id: 'ID', account: 'Account', product: 'Product', sla: 'SLA', severity: 'Breach severity', status: 'Status' },
        products: { fleet: 'Fleet', cargo: 'Cargo', carrier_liability: 'Carrier liability' },
        severity: { low: 'Low', med: 'Medium', high: 'High' },
        status: { within: 'Within corridor', out: 'Out-of-corridor' },
        snapshot: 'Decision snapshot',
        corridorLabel: 'Pricing corridor',
        aiTitle: 'AI decision templates — senior review required',
        aiTemplates: ['Approve within corridor', 'Refer for aggregation review', 'Decline due to tail clustering'],
        aiNote: 'Templates are suggestions and require governance sign-off.',
        overrideTitle: 'Override controls',
        overrideReason: 'Override reason',
        overridePlaceholder: 'Select reason',
        overrideNotes: 'Override rationale',
        overrideNotesPlaceholder: 'Provide a concise governance rationale',
        actions: { apply: 'Apply override', refer: 'Refer to carrier' },
        portfolioTitle: 'Portfolio steering',
        portfolioItems: ['Aggregation utilization: 72%', 'Capacity caps & roll-out gates: Gate 2 open', 'Monthly performance review: stable'],
        corridorTitle: 'Underwriting corridors',
        corridorItems: ['Eligibility checks: 94% within corridor', 'Top breaches: 3 high-severity'],
        referralTitle: 'Referral logic',
        referralItems: ['Governance approvals pending: 8', 'Escalation triggers fired: 5 (7 days)']
      }
    : {
        title: 'Senior Underwriter',
        subtitle: 'Erweiterte Authority mit Override-Governance und Portfolio-Steuerung.',
        kpi: {
          open: 'Offene Entscheidungen',
          overrides: 'Genutzte Overrides',
          referralRate: 'Referral-Quote',
          alerts: 'Aggregation Alerts',
          evidence: 'Evidenz-Qualität Ø',
          authority: 'Authority Utilization'
        },
        table: { id: 'ID', account: 'Account', product: 'Produkt', sla: 'SLA', severity: 'Breach Severity', status: 'Status' },
        products: { fleet: 'Flotte', cargo: 'Cargo', carrier_liability: 'Frachtführerhaftung' },
        severity: { low: 'Low', med: 'Medium', high: 'High' },
        status: { within: 'Innerhalb Korridor', out: 'Out-of-corridor' },
        snapshot: 'Decision Snapshot',
        corridorLabel: 'Pricing Corridor',
        aiTitle: 'AI Decision Templates — Senior Review erforderlich',
        aiTemplates: ['Approve innerhalb Korridor', 'Referral für Aggregationsreview', 'Decline wegen Tail-Clustering'],
        aiNote: 'Vorlagen sind Vorschläge und erfordern Governance-Sign-off.',
        overrideTitle: 'Override-Kontrollen',
        overrideReason: 'Override-Grund',
        overridePlaceholder: 'Grund wählen',
        overrideNotes: 'Override-Begründung',
        overrideNotesPlaceholder: 'Kurze Governance-Begründung erfassen',
        actions: { apply: 'Override anwenden', refer: 'An Carrier verweisen' },
        portfolioTitle: 'Portfolio Steering',
        portfolioItems: ['Aggregationsauslastung: 72%', 'Capacity Caps & Roll-out Gates: Gate 2 offen', 'Monthly Performance Review: stabil'],
        corridorTitle: 'Underwriting-Korridore',
        corridorItems: ['Eligibility-Checks: 94% innerhalb Korridor', 'Top Breaches: 3 High-Severity'],
        referralTitle: 'Referral-Logik',
        referralItems: ['Governance Approvals pending: 8', 'Eskalations-Triggers ausgelöst: 5 (7 Tage)']
      }

  const cases: CaseItem[] = [
    {
      id: 'SU-4102',
      productKey: 'fleet',
      account: 'Anchor Fleet Delta',
      slaDue: '2026-01-27T14:00:00Z',
      slaBucket: 'due_today',
      breachSeverity: 'med',
      corridorStatus: 'within',
      pricingCorridor: { min: 20, target: 24, max: 30, suggested: 23 }
    },
    {
      id: 'SU-4111',
      productKey: 'cargo',
      account: 'Vector Freight',
      slaDue: '2026-01-28T10:30:00Z',
      slaBucket: 'due_48h',
      breachSeverity: 'low',
      corridorStatus: 'within',
      pricingCorridor: { min: 18, target: 21, max: 27, suggested: 22 }
    },
    {
      id: 'SU-4124',
      productKey: 'carrier_liability',
      account: 'Northern Haulage',
      slaDue: '2026-01-27T08:00:00Z',
      slaBucket: 'breached',
      breachSeverity: 'high',
      corridorStatus: 'out',
      pricingCorridor: { min: 22, target: 26, max: 32, suggested: 31 }
    }
  ]

  const kpis = {
    open: cases.length,
    overrides: 6,
    referralRate: '24%',
    alerts: 5,
    evidence: '86%',
    authority: '74%'
  }

  const [selectedId, setSelectedId] = React.useState(cases[0]?.id)
  const selected = cases.find((item) => item.id === selectedId) || cases[0]
  const [overrideReason, setOverrideReason] = React.useState('')
  const [overrideNotes, setOverrideNotes] = React.useState('')
  const canApply = overrideReason.trim().length > 0 && overrideNotes.trim().length > 0

  return (
    <section className="uw-page">
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header
            title={copy.title}
            subtitle={copy.subtitle}
            subtitleColor="rgba(255,255,255,0.82)"
          />
        </div>
      </div>

      <div className="uw-container">
        <div className="uw-grid uw-kpi">
          <Card title={copy.kpi.open} variant="glass" className="uw-card"><strong>{kpis.open}</strong><MiniSparkline data={[12, 14, 11, 15, 16]} /></Card>
          <Card title={copy.kpi.overrides} variant="glass" className="uw-card"><strong>{kpis.overrides}</strong><MiniSparkline data={[2, 3, 4, 5, 6]} /></Card>
          <Card title={copy.kpi.referralRate} variant="glass" className="uw-card"><strong>{kpis.referralRate}</strong><MiniSparkline data={[18, 21, 19, 24, 24]} /></Card>
          <Card title={copy.kpi.alerts} variant="glass" className="uw-card"><strong>{kpis.alerts}</strong><MiniSparkline data={[3, 4, 4, 5, 5]} /></Card>
          <Card title={copy.kpi.evidence} variant="glass" className="uw-card"><strong>{kpis.evidence}</strong><MiniSparkline data={[82, 84, 86, 88, 90]} /></Card>
          <Card title={copy.kpi.authority} variant="glass" className="uw-card"><strong>{kpis.authority}</strong><MiniSparkline data={[68, 70, 72, 74, 74]} /></Card>
        </div>

        <div className="uw-grid uw-split">
          <Card title={copy.table.id} variant="glass" className="uw-card" style={{ overflowX: 'auto' }}>
            <table className="uw-table">
              <thead>
                <tr>
                  <th>{copy.table.id}</th>
                  <th>{copy.table.account}</th>
                  <th>{copy.table.product}</th>
                  <th>{copy.table.sla}</th>
                  <th>{copy.table.severity}</th>
                  <th>{copy.table.status}</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={item.id === selectedId ? 'uw-row-active' : undefined}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{item.id}</td>
                    <td>{item.account}</td>
                    <td>{copy.products[item.productKey]}</td>
                    <td>{formatSla(item.slaDue, lang)}</td>
                    <td>{copy.severity[item.breachSeverity]}</td>
                    <td>{copy.status[item.corridorStatus]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title={copy.snapshot} variant="glass" className="uw-card">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <strong>{selected.id}</strong>
                <div className="uw-muted">{selected.account} · {copy.products[selected.productKey]}</div>
              </div>
              <div>
                <div className="uw-muted">{copy.corridorLabel}</div>
                <CorridorChart corridor={selected.pricingCorridor} label={copy.corridorLabel} />
              </div>
              <div className="uw-panel">
                <strong>{copy.aiTitle}</strong>
                <div style={{ display: 'grid', gap: '0.4rem', marginTop: '0.5rem' }}>
                  {copy.aiTemplates.map((item) => (
                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="radio" name="template" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <div className="uw-muted" style={{ marginTop: '0.5rem' }}>{copy.aiNote}</div>
              </div>
              <div className="uw-panel" style={{ display: 'grid', gap: '0.5rem' }}>
                <strong>{copy.overrideTitle}</strong>
                <label className="uw-muted">{copy.overrideReason}</label>
                <select value={overrideReason} onChange={(event) => setOverrideReason(event.target.value)} style={{ padding: '0.5rem', borderRadius: '8px', borderColor: '#cbd5f5' }}>
                  <option value="">{copy.overridePlaceholder}</option>
                  <option value="data">Data integrity exception</option>
                  <option value="governance">Governance escalation</option>
                  <option value="strategic">Strategic carrier exception</option>
                </select>
                <label className="uw-muted">{copy.overrideNotes}</label>
                <textarea
                  value={overrideNotes}
                  onChange={(event) => setOverrideNotes(event.target.value)}
                  rows={3}
                  placeholder={copy.overrideNotesPlaceholder}
                  style={{ padding: '0.5rem', borderRadius: '8px', borderColor: '#cbd5f5' }}
                />
                <div className="uw-actions">
                  <Button disabled={!canApply} onClick={() => {}}>{copy.actions.apply}</Button>
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.refer}</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-triplet">
          <Card title={copy.portfolioTitle} variant="glass" className="uw-card">
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.portfolioItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card title={copy.corridorTitle} variant="glass" className="uw-card">
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.corridorItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card title={copy.referralTitle} variant="glass" className="uw-card">
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.referralItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
