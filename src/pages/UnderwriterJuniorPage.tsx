import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

type CaseItem = {
  id: string
  productKey: 'fleet' | 'cargo' | 'carrier_liability'
  account: string
  reasonKey: 'cluster' | 'seasonal' | 'corridor'
  riskTier: string
  slaDue: string
  slaBucket: 'due_today' | 'due_48h' | 'breached'
  corridorStatus: 'within' | 'out'
  recommendation: 'approve' | 'referral' | 'decline'
  evidenceQuality: number
  aggregationImpact: number
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

const MiniBars = ({ data }: { data: number[] }) => {
  const max = Math.max(...data)
  const barWidth = 6
  const gap = 3
  const totalWidth = data.length * barWidth + (data.length - 1) * gap
  const startX = (100 - totalWidth) / 2
  return (
    <svg className="uw-chart" width="100%" height="42" viewBox="0 0 100 32" aria-hidden shapeRendering="crispEdges">
      <line x1="8" y1="28" x2="92" y2="28" stroke="var(--ix-border, #e2e8f0)" strokeWidth="1" />
      {data.map((value, index) => {
        const height = (value / max) * 22
        const x = startX + index * (barWidth + gap)
        const y = 28 - height
        return (
          <rect
            key={value + index}
            x={x}
            y={y}
            width={barWidth}
            height={height}
            fill={index === data.length - 1 ? 'var(--insurfox-orange, #d4380d)' : 'var(--blue-dark, #0e0d1c)'}
          />
        )
      })}
    </svg>
  )
}

const CorridorChart = ({ corridor, label }: { corridor: CaseItem['pricingCorridor']; label: string }) => {
  const range = corridor.max - corridor.min
  const targetX = ((corridor.target - corridor.min) / range) * 100
  const suggestedX = ((corridor.suggested - corridor.min) / range) * 100
  return (
    <svg className="uw-chart" width="100%" height="50" viewBox="0 0 100 50" aria-label={label}>
      <rect x="5" y="20" width="90" height="10" fill="var(--ix-border)" rx="5" />
      <rect x="5" y="20" width="90" height="10" fill="var(--ix-primary-100)" rx="5" opacity="0.7" />
      <line x1={5 + targetX * 0.9} y1="15" x2={5 + targetX * 0.9} y2="35" stroke="var(--ix-primary)" strokeWidth="2" />
      <circle cx={5 + suggestedX * 0.9} cy="25" r="4" fill="var(--ix-primary)" />
      <text x="5" y="12" fontSize="6" fill="var(--ix-text-muted)">{corridor.min.toFixed(0)}</text>
      <text x="85" y="12" fontSize="6" fill="var(--ix-text-muted)">{corridor.max.toFixed(0)}</text>
    </svg>
  )
}

export default function UnderwriterJuniorPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Junior Underwriter',
        subtitle: 'Decision inbox with guided corridors, referrals and evidence checks.',
        kpi: {
          open: 'Open decisions',
          avg: 'Avg decision time',
          due: 'SLA due today',
          referrals: 'Referrals created',
          evidence: 'Evidence quality avg',
          corridor: 'Corridor adherence'
        },
        table: { id: 'ID', account: 'Account', product: 'Product', sla: 'SLA', status: 'Status' },
        products: { fleet: 'Fleet', cargo: 'Cargo', carrier_liability: 'Carrier liability' },
        statuses: { within: 'Within corridor', out: 'Out-of-corridor' },
        buckets: { due_today: 'Due today', due_48h: 'Due in 48h', breached: 'Breached' },
        snapshot: 'Decision snapshot',
        corridorLabel: 'Pricing corridor',
        aiTitle: 'AI decision template — requires human review',
        aiItems: ['Highlight risk tier and corridor status', 'Summarize evidence bundle quality', 'Suggest next step based on ruleset'],
        actions: { evidence: 'Request evidence', escalate: 'Escalate to senior', draft: 'Draft decision' },
        evidenceTitle: 'Evidence & data integrity',
        evidenceItems: ['Telematics feed: ok (2h)', 'Broker submission: ok (14h)', 'Loss history: stale (36h)', 'Fleet manifest: missing'],
        corridorTitle: 'Underwriting corridors',
        corridorItems: ['Eligibility checks: 92% pass rate', 'Top breaches: 5 high-severity', 'Escalate at 25% aggregation impact'],
        referralTitle: 'Referral logic',
        referralItems: ['Out-of-corridor queue: 12 cases', 'Aggregation alerts: 3 active', 'Governance approvals: 6 pending'],
        auditTitle: 'Audit trail preview'
      }
    : {
        title: 'Junior Underwriter',
        subtitle: 'Decision Inbox mit geführten Korridoren, Referrals und Evidenz-Checks.',
        kpi: {
          open: 'Offene Entscheidungen',
          avg: 'Ø Entscheidungszeit',
          due: 'SLA heute fällig',
          referrals: 'Erstellte Referrals',
          evidence: 'Evidenz-Qualität Ø',
          corridor: 'Korridor-Adhärenz'
        },
        table: { id: 'ID', account: 'Account', product: 'Produkt', sla: 'SLA', status: 'Status' },
        products: { fleet: 'Flotte', cargo: 'Cargo', carrier_liability: 'Frachtführerhaftung' },
        statuses: { within: 'Innerhalb Korridor', out: 'Out-of-corridor' },
        buckets: { due_today: 'Heute fällig', due_48h: 'In 48h fällig', breached: 'Verletzt' },
        snapshot: 'Decision Snapshot',
        corridorLabel: 'Pricing Corridor',
        aiTitle: 'AI Decision Template — Human Review erforderlich',
        aiItems: ['Risikotier und Korridorstatus hervorheben', 'Evidenzqualität zusammenfassen', 'Nächsten Schritt nach Ruleset vorschlagen'],
        actions: { evidence: 'Evidenz anfordern', escalate: 'An Senior eskalieren', draft: 'Entscheidung entwerfen' },
        evidenceTitle: 'Evidenz & Datenintegrität',
        evidenceItems: ['Telematik-Feed: ok (2h)', 'Broker Submission: ok (14h)', 'Schadenhistorie: veraltet (36h)', 'Flottenliste: fehlt'],
        corridorTitle: 'Underwriting-Korridore',
        corridorItems: ['Eligibility-Checks: 92% pass rate', 'Top Breaches: 5 High-Severity', 'Eskalation ab 25% Aggregationswirkung'],
        referralTitle: 'Referral-Logik',
        referralItems: ['Out-of-corridor Queue: 12 Fälle', 'Aggregation Alerts: 3 aktiv', 'Governance Approvals: 6 pending'],
        auditTitle: 'Audit Trail Preview'
      }

  const cases: CaseItem[] = [
    {
      id: 'UW-1932',
      productKey: 'fleet',
      account: 'Anchor Fleet Alpha',
      reasonKey: 'cluster',
      riskTier: 'B',
      slaDue: '2026-01-27T16:00:00Z',
      slaBucket: 'due_today',
      corridorStatus: 'within',
      recommendation: 'approve',
      evidenceQuality: 88,
      aggregationImpact: 32,
      pricingCorridor: { min: 18, target: 22, max: 28, suggested: 21 }
    },
    {
      id: 'UW-1941',
      productKey: 'cargo',
      account: 'Northbridge Logistics',
      reasonKey: 'seasonal',
      riskTier: 'C',
      slaDue: '2026-01-28T11:00:00Z',
      slaBucket: 'due_48h',
      corridorStatus: 'out',
      recommendation: 'referral',
      evidenceQuality: 74,
      aggregationImpact: 58,
      pricingCorridor: { min: 16, target: 20, max: 26, suggested: 25 }
    },
    {
      id: 'UW-1955',
      productKey: 'carrier_liability',
      account: 'Bluegate Haulage',
      reasonKey: 'corridor',
      riskTier: 'B',
      slaDue: '2026-01-27T09:00:00Z',
      slaBucket: 'breached',
      corridorStatus: 'out',
      recommendation: 'referral',
      evidenceQuality: 61,
      aggregationImpact: 72,
      pricingCorridor: { min: 20, target: 24, max: 30, suggested: 29 }
    }
  ]

  const kpis = {
    open: cases.length,
    avg: '1.8d',
    due: cases.filter((item) => item.slaBucket === 'due_today').length,
    referrals: cases.filter((item) => item.recommendation === 'referral').length,
    evidence: `${Math.round(cases.reduce((acc, item) => acc + item.evidenceQuality, 0) / cases.length)}%`,
    corridor: `${Math.round((cases.filter((item) => item.corridorStatus === 'within').length / cases.length) * 100)}%`
  }

  const [selectedId, setSelectedId] = React.useState(cases[0]?.id)
  const selected = cases.find((item) => item.id === selectedId) || cases[0]

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
          <Card title={copy.kpi.open} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.open}</strong><MiniBars data={[10, 12, 11, 14, 13]} /></div></Card>
          <Card title={copy.kpi.avg} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.avg}</strong><MiniBars data={[2.4, 2.1, 1.9, 1.8, 1.8]} /></div></Card>
          <Card title={copy.kpi.due} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.due}</strong><MiniBars data={[3, 2, 4, 3, 3]} /></div></Card>
          <Card title={copy.kpi.referrals} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.referrals}</strong><MiniBars data={[1, 2, 2, 3, 2]} /></div></Card>
          <Card title={copy.kpi.evidence} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.evidence}</strong><MiniBars data={[70, 76, 81, 78, 82]} /></div></Card>
          <Card title={copy.kpi.corridor} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.corridor}</strong><MiniBars data={[82, 84, 79, 86, 88]} /></div></Card>
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
                    <td>{copy.statuses[item.corridorStatus]}</td>
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
              <div className="uw-chart-block">
                <div className="uw-muted">{copy.corridorLabel}</div>
                <CorridorChart corridor={selected.pricingCorridor} label={copy.corridorLabel} />
              </div>
              <div className="uw-panel">
                <strong>{copy.aiTitle}</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', color: '#475569' }}>
                  {copy.aiItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="uw-actions">
                <Button variant="secondary" onClick={() => {}}>{copy.actions.evidence}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.escalate}</Button>
                <Button onClick={() => {}}>{copy.actions.draft}</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-triplet">
          <Card title={copy.evidenceTitle} variant="glass" className="uw-card">
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.evidenceItems.map((item) => (
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

        <Card title={copy.auditTitle} variant="glass" className="uw-card">
          <div className="uw-muted">2026-01-27 08:12 · junior · Referral created · v3.4 · evidence stale</div>
          <div className="uw-muted">2026-01-26 16:40 · junior · Decision updated · v3.4 · evidence ok</div>
          <div className="uw-muted">2026-01-26 10:05 · junior · Evidence requested · v3.4 · missing manifest</div>
        </Card>
      </div>
    </section>
  )
}
