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
  corridorStatus: 'within' | 'out'
  evidenceReady: boolean
  aggregationImpact: number
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

const AggregationGauge = ({ value, label }: { value: number; label: string }) => (
  <div style={{ display: 'grid', gap: '0.35rem' }}>
    <div className="uw-muted">{label}</div>
    <div style={{ background: '#e2e8f0', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, background: value > 80 ? '#dc2626' : '#2563eb', height: '100%' }} />
    </div>
    <div style={{ fontSize: '0.85rem', color: '#0f172a' }}>{value}%</div>
  </div>
)

export default function UnderwriterCarrierPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Carrier UW',
        subtitle: 'Read-only portfolio view with final approval authority.',
        kpi: {
          approvals: 'Pending approvals',
          decisionTime: 'Avg carrier decision time',
          escalations: 'Escalations from MGA',
          capacity: 'Capacity utilization',
          exceptions: 'Exceptions'
        },
        table: { id: 'ID', account: 'Account', product: 'Product', sla: 'SLA', status: 'Status' },
        products: { fleet: 'Fleet', cargo: 'Cargo', carrier_liability: 'Carrier liability' },
        statuses: { within: 'Within corridor', out: 'Out-of-corridor' },
        queueTitle: 'Final approval queue',
        detailTitle: 'Case detail',
        evidenceTitle: 'Evidence bundle',
        evidenceItems: ['Bordereaux reconciliation', 'Trigger validation checks', 'Exposure aggregation summary'],
        governanceTitle: 'Governance checklist',
        governanceItems: ['Delegated authority scope verified', 'Referral logic satisfied', 'Capital efficiency impact assessed'],
        actions: { approve: 'Approve', approveConditions: 'Approve with conditions', decline: 'Decline' },
        portfolioTitle: 'Portfolio steering',
        portfolioItems: ['Capacity caps & roll-out gates', 'Monthly performance review summary'],
        aggregationLabel: 'Exposure aggregation utilization',
        authorityNote: 'Carrier retains final decision authority. AI assist only.'
      }
    : {
        title: 'Carrier UW',
        subtitle: 'Read-only Portfolio-View mit finaler Approval-Authority.',
        kpi: {
          approvals: 'Offene Approvals',
          decisionTime: 'Ø Carrier-Entscheidungszeit',
          escalations: 'Eskalationen vom MGA',
          capacity: 'Kapazitätsauslastung',
          exceptions: 'Exceptions'
        },
        table: { id: 'ID', account: 'Account', product: 'Produkt', sla: 'SLA', status: 'Status' },
        products: { fleet: 'Flotte', cargo: 'Cargo', carrier_liability: 'Frachtführerhaftung' },
        statuses: { within: 'Innerhalb Korridor', out: 'Out-of-corridor' },
        queueTitle: 'Final Approval Queue',
        detailTitle: 'Case Detail',
        evidenceTitle: 'Evidenzpaket',
        evidenceItems: ['Bordereaux-Reconciliation', 'Trigger-Validierung', 'Exposure-Aggregationssummary'],
        governanceTitle: 'Governance-Checklist',
        governanceItems: ['Delegated Authority Scope geprüft', 'Referral-Logik erfüllt', 'Capital Efficiency Wirkung geprüft'],
        actions: { approve: 'Approve', approveConditions: 'Approve mit Auflagen', decline: 'Decline' },
        portfolioTitle: 'Portfolio Steering',
        portfolioItems: ['Capacity Caps & Roll-out Gates', 'Monthly Performance Review Summary'],
        aggregationLabel: 'Exposure Aggregation Auslastung',
        authorityNote: 'Carrier behält die finale Entscheidungsautorität. KI-Assistenz nur unterstützend.'
      }

  const cases: CaseItem[] = [
    {
      id: 'CU-2201',
      productKey: 'fleet',
      account: 'Anchor Fleet Omega',
      slaDue: '2026-01-27T12:00:00Z',
      slaBucket: 'due_today',
      corridorStatus: 'within',
      evidenceReady: true,
      aggregationImpact: 64
    },
    {
      id: 'CU-2207',
      productKey: 'cargo',
      account: 'TransitBridge Cargo',
      slaDue: '2026-01-28T09:00:00Z',
      slaBucket: 'due_48h',
      corridorStatus: 'out',
      evidenceReady: false,
      aggregationImpact: 82
    },
    {
      id: 'CU-2216',
      productKey: 'carrier_liability',
      account: 'Northport Haulage',
      slaDue: '2026-01-27T08:30:00Z',
      slaBucket: 'breached',
      corridorStatus: 'out',
      evidenceReady: true,
      aggregationImpact: 91
    }
  ]

  const kpis = {
    approvals: cases.length,
    decisionTime: '2.1d',
    escalations: 7,
    capacity: '78%',
    exceptions: 4
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
          <Card title={copy.kpi.approvals} variant="glass" className="uw-card"><strong>{kpis.approvals}</strong><MiniSparkline data={[5, 6, 7, 6, 7]} /></Card>
          <Card title={copy.kpi.decisionTime} variant="glass" className="uw-card"><strong>{kpis.decisionTime}</strong><MiniSparkline data={[2.6, 2.4, 2.2, 2.1, 2.1]} /></Card>
          <Card title={copy.kpi.escalations} variant="glass" className="uw-card"><strong>{kpis.escalations}</strong><MiniSparkline data={[4, 5, 6, 6, 7]} /></Card>
          <Card title={copy.kpi.capacity} variant="glass" className="uw-card"><strong>{kpis.capacity}</strong><MiniSparkline data={[68, 70, 72, 76, 78]} /></Card>
          <Card title={copy.kpi.exceptions} variant="glass" className="uw-card"><strong>{kpis.exceptions}</strong><MiniSparkline data={[2, 3, 4, 3, 4]} /></Card>
        </div>

        <div className="uw-grid uw-split">
          <Card title={copy.queueTitle} variant="glass" className="uw-card" style={{ overflowX: 'auto' }}>
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

          <Card title={copy.detailTitle} variant="glass" className="uw-card">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <strong>{selected.id}</strong>
                <div className="uw-muted">{selected.account} · {copy.products[selected.productKey]}</div>
              </div>
              <div>
                <strong>{copy.evidenceTitle}</strong>
                <span className="uw-badge" style={{ background: selected.evidenceReady ? 'rgba(22,163,74,0.15)' : 'rgba(249,115,22,0.15)', color: selected.evidenceReady ? '#15803d' : '#c2410c' }}>
                  {selected.evidenceReady ? 'Audit-ready' : 'Pending evidence'}
                </span>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.5 }}>
                  {copy.evidenceItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>{copy.governanceTitle}</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.5 }}>
                  {copy.governanceItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="uw-actions">
                <Button onClick={() => {}}>{copy.actions.approve}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.approveConditions}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.decline}</Button>
              </div>
              <div className="uw-disclaimer">{copy.authorityNote}</div>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-triplet">
          <Card title={copy.portfolioTitle} variant="glass" className="uw-card">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <AggregationGauge value={82} label={copy.aggregationLabel} />
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
                {copy.portfolioItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>
          <Card title="Exposure trend" variant="glass" className="uw-card">
            <MiniSparkline data={[12, 10, 14, 11, 9, 8]} />
            <div className="uw-muted">12 → 8 (6 months)</div>
          </Card>
          <Card title="Escalation monitor" variant="glass" className="uw-card">
            <div className="uw-muted">Tail clusters flagged: 3</div>
            <div className="uw-muted">Aggregation alerts: 5</div>
            <div className="uw-muted">Exceptions open: 2</div>
          </Card>
        </div>
      </div>
    </section>
  )
}
