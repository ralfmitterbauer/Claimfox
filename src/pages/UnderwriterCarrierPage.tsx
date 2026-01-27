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
  slaDue: string
  slaBucket: 'due_today' | 'due_48h' | 'breached'
  recommendation: { action: 'approve' | 'referral' | 'decline'; noteKey: 'within_corridor' | 'aggregation_risk' | 'tail_cluster' }
  evidenceReady: boolean
  aggregationImpact: number
  corridorStatus: 'within' | 'out'
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
    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{label}</div>
    <div style={{ background: '#e2e8f0', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, background: value > 80 ? '#dc2626' : '#2563eb', height: '100%' }} />
    </div>
    <div style={{ fontSize: '0.85rem', color: '#0f172a' }}>{value}%</div>
  </div>
)

const SlaBucketBar = ({ counts, labels }: { counts: Record<string, number>; labels: Record<string, string> }) => {
  const total = Object.values(counts).reduce((acc, value) => acc + value, 0) || 1
  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      <div style={{ display: 'flex', height: '10px', borderRadius: '999px', overflow: 'hidden', background: '#e2e8f0' }}>
        <div style={{ width: `${(counts.due_today / total) * 100}%`, background: '#f97316' }} />
        <div style={{ width: `${(counts.due_48h / total) * 100}%`, background: '#38bdf8' }} />
        <div style={{ width: `${(counts.breached / total) * 100}%`, background: '#ef4444' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
        <span>{labels.due_today}: {counts.due_today}</span>
        <span>{labels.due_48h}: {counts.due_48h}</span>
        <span>{labels.breached}: {counts.breached}</span>
      </div>
    </div>
  )
}

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
        status: { due_today: 'Due today', due_48h: 'Due in 48h', breached: 'Breached', within: 'Within corridor', out: 'Out-of-corridor' },
        products: { fleet: 'Fleet', cargo: 'Cargo', carrier_liability: 'Carrier liability' },
        queueTitle: 'Final approval queue',
        detailTitle: 'Case detail',
        recommendationTitle: 'MGA recommendation',
        recommendationNotes: {
          within_corridor: 'Within corridor and supported by evidence bundle.',
          aggregation_risk: 'Aggregation risk exceeds senior threshold.',
          tail_cluster: 'Tail clustering detected, carrier review required.'
        },
        evidenceTitle: 'Evidence bundle',
        evidenceBadge: { ready: 'Audit-ready', pending: 'Pending evidence' },
        evidenceItems: ['Bordereaux reconciliation', 'Trigger validation checks', 'Exposure aggregation summary'],
        governanceTitle: 'Governance checklist',
        governanceItems: ['Delegated authority scope verified', 'Referral logic satisfied', 'Capital efficiency impact assessed'],
        actions: { approve: 'Approve', approveConditions: 'Approve with conditions', decline: 'Decline' },
        portfolioTitle: 'Portfolio steering',
        aggregationLabel: 'Exposure aggregation utilization',
        portfolioItems: {
          caps: 'Capacity caps & roll-out gates',
          capsNote: 'Gate 2 open · Gate 3 requires approval',
          monthly: 'Monthly performance review',
          monthlyNote: 'Loss ratio band stable · Frequency stable'
        },
        breachHistory: 'Breach history (last 6 months)',
        slaTitle: 'SLA buckets',
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
        status: { due_today: 'Heute fällig', due_48h: 'In 48h fällig', breached: 'Verletzt', within: 'Innerhalb Korridor', out: 'Out-of-corridor' },
        products: { fleet: 'Flotte', cargo: 'Cargo', carrier_liability: 'Frachtführerhaftung' },
        queueTitle: 'Final Approval Queue',
        detailTitle: 'Case Detail',
        recommendationTitle: 'MGA Recommendation',
        recommendationNotes: {
          within_corridor: 'Innerhalb Korridor und durch Evidenzpaket gestützt.',
          aggregation_risk: 'Aggregationsrisiko über Senior-Threshold.',
          tail_cluster: 'Tail-Clustering erkannt, Carrier-Review erforderlich.'
        },
        evidenceTitle: 'Evidenzpaket',
        evidenceBadge: { ready: 'Audit-ready', pending: 'Evidenz offen' },
        evidenceItems: ['Bordereaux-Reconciliation', 'Trigger-Validierung', 'Exposure-Aggregationssummary'],
        governanceTitle: 'Governance-Checklist',
        governanceItems: ['Delegated Authority Scope geprüft', 'Referral-Logik erfüllt', 'Capital Efficiency Wirkung geprüft'],
        actions: { approve: 'Approve', approveConditions: 'Approve mit Auflagen', decline: 'Decline' },
        portfolioTitle: 'Portfolio Steering',
        aggregationLabel: 'Exposure Aggregation Auslastung',
        portfolioItems: {
          caps: 'Capacity Caps & Roll-out Gates',
          capsNote: 'Gate 2 offen · Gate 3 benötigt Approval',
          monthly: 'Monthly Performance Review',
          monthlyNote: 'Loss Ratio Band stabil · Frequency stabil'
        },
        breachHistory: 'Breach History (letzte 6 Monate)',
        slaTitle: 'SLA Buckets',
        authorityNote: 'Carrier behält die finale Entscheidungsautorität. KI-Assistenz nur unterstützend.'
      }

  const cases: CaseItem[] = [
    {
      id: 'CU-2201',
      productKey: 'fleet',
      account: 'Anchor Fleet Omega',
      slaDue: '2026-01-27T12:00:00Z',
      slaBucket: 'due_today',
      recommendation: { action: 'approve', noteKey: 'within_corridor' },
      evidenceReady: true,
      aggregationImpact: 64,
      corridorStatus: 'within'
    },
    {
      id: 'CU-2207',
      productKey: 'cargo',
      account: 'TransitBridge Cargo',
      slaDue: '2026-01-28T09:00:00Z',
      slaBucket: 'due_48h',
      recommendation: { action: 'referral', noteKey: 'aggregation_risk' },
      evidenceReady: false,
      aggregationImpact: 82,
      corridorStatus: 'out'
    },
    {
      id: 'CU-2216',
      productKey: 'carrier_liability',
      account: 'Northport Haulage',
      slaDue: '2026-01-27T08:30:00Z',
      slaBucket: 'breached',
      recommendation: { action: 'referral', noteKey: 'tail_cluster' },
      evidenceReady: true,
      aggregationImpact: 91,
      corridorStatus: 'out'
    }
  ]

  const kpis = {
    approvals: cases.length,
    decisionTime: '2.1d',
    escalations: 7,
    capacity: '78%',
    exceptions: 4
  }

  const slaCounts = cases.reduce(
    (acc, item) => ({ ...acc, [item.slaBucket]: acc[item.slaBucket] + 1 }),
    { due_today: 0, due_48h: 0, breached: 0 }
  )

  const [selectedId, setSelectedId] = React.useState(cases[0]?.id)
  const selected = cases.find((item) => item.id === selectedId) || cases[0]

  return (
    <section style={{ minHeight: '100vh', width: '100%', color: '#0e0d1c' }}>
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
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '32px 1.25rem 4rem', display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem' }}>
          <Card title={copy.kpi.approvals} variant="glass"><strong>{kpis.approvals}</strong><MiniSparkline data={[5, 6, 7, 6, 7]} /></Card>
          <Card title={copy.kpi.decisionTime} variant="glass"><strong>{kpis.decisionTime}</strong><MiniSparkline data={[2.6, 2.4, 2.2, 2.1, 2.1]} /></Card>
          <Card title={copy.kpi.escalations} variant="glass"><strong>{kpis.escalations}</strong><MiniSparkline data={[4, 5, 6, 6, 7]} /></Card>
          <Card title={copy.kpi.capacity} variant="glass"><strong>{kpis.capacity}</strong><MiniSparkline data={[68, 70, 72, 76, 78]} /></Card>
          <Card title={copy.kpi.exceptions} variant="glass"><strong>{kpis.exceptions}</strong><MiniSparkline data={[2, 3, 4, 3, 4]} /></Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '1.25rem' }}>
          <Card title={copy.queueTitle} variant="glass" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
              <thead>
                <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.id}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.account}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.product}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.sla}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.status}</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((item) => (
                  <tr key={item.id} onClick={() => setSelectedId(item.id)} style={{ cursor: 'pointer', background: item.id === selectedId ? '#eef2ff' : 'transparent' }}>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{item.id}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{item.account}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.products[item.productKey]}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{formatSla(item.slaDue, lang)}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.status[item.corridorStatus]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title={copy.detailTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <strong>{selected.id}</strong>
                <div style={{ color: '#64748b' }}>{selected.account} · {copy.products[selected.productKey]}</div>
              </div>
              <div>
                <strong>{copy.recommendationTitle}</strong>
                <div style={{ color: '#475569' }}>{copy.recommendationNotes[selected.recommendation.noteKey]}</div>
              </div>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <strong>{copy.evidenceTitle}</strong>
                <span style={{ fontSize: '0.8rem', color: selected.evidenceReady ? '#16a34a' : '#f97316' }}>{selected.evidenceReady ? copy.evidenceBadge.ready : copy.evidenceBadge.pending}</span>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.5 }}>
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
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <Button onClick={() => {}}>{copy.actions.approve}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.approveConditions}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.decline}</Button>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{copy.authorityNote}</div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <Card title={copy.portfolioTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.9rem' }}>
              <AggregationGauge value={82} label={copy.aggregationLabel} />
              <div><strong>{copy.portfolioItems.caps}</strong><div style={{ color: '#64748b' }}>{copy.portfolioItems.capsNote}</div></div>
              <div><strong>{copy.portfolioItems.monthly}</strong><div style={{ color: '#64748b' }}>{copy.portfolioItems.monthlyNote}</div></div>
            </div>
          </Card>
          <Card title={copy.breachHistory} variant="glass">
            <MiniSparkline data={[12, 10, 14, 11, 9, 8]} />
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>12 → 8</div>
          </Card>
          <Card title={copy.slaTitle} variant="glass">
            <SlaBucketBar counts={slaCounts} labels={copy.status} />
          </Card>
        </div>
      </div>
    </section>
  )
}
