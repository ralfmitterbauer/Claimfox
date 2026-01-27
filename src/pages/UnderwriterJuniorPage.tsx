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
  reasonKey: 'vehicle_cluster' | 'seasonal_peak' | 'corridor_request'
  riskTier: string
  slaDue: string
  slaBucket: 'due_today' | 'due_48h' | 'breached'
  corridorStatus: { state: 'within' | 'out'; severity: 'low' | 'med' | 'high' }
  recommendation: { action: 'approve' | 'referral' | 'decline'; rationaleKey: 'within_corridor' | 'agg_exceeds' | 'out_high' }
  evidenceQuality: number
  aggregationImpact: number
  pricingCorridor: { min: number; target: number; max: number; suggested: number }
  status: 'new' | 'in_review' | 'referred' | 'approved' | 'declined'
}

type EvidenceSource = {
  nameKey: 'telematics' | 'broker_submission' | 'loss_history' | 'fleet_manifest'
  freshnessHours: number
  status: 'ok' | 'missing' | 'stale'
  notesKey: 'hourly' | 'complete_schedule' | 'awaiting_bordereaux' | 'requested_broker'
}

type LogEntry = {
  ts: string
  actorRole: 'junior' | 'senior' | 'carrier' | 'compliance'
  actionKey: 'created_referral' | 'updated_decision' | 'requested_evidence' | 'escalation_review' | 'audit_check'
  ruleVersion: string
  evidenceStatus: 'ok' | 'missing' | 'stale'
  noteKey: 'aggregation_flag' | 'within_corridor' | 'fleet_manifest' | 'override_pending' | 'no_issues'
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

const badgeVariantForStatus = (status: string) => {
  if (status === 'breached') return '#dc2626'
  if (status === 'due_today') return '#f97316'
  return '#0f172a'
}

const computeKpis = (cases: CaseItem[]) => {
  const open = cases.filter((item) => item.status !== 'approved' && item.status !== 'declined').length
  const avgTime = '1.8d'
  const dueToday = cases.filter((item) => item.slaBucket === 'due_today').length
  const referrals = cases.filter((item) => item.status === 'referred').length
  const evidenceAvg = Math.round(cases.reduce((acc, item) => acc + item.evidenceQuality, 0) / cases.length)
  const corridor = Math.round((cases.filter((item) => item.corridorStatus.state === 'within').length / cases.length) * 100)
  return { open, avgTime, dueToday, referrals, evidenceAvg, corridor }
}

const sortCasesByPriority = (cases: CaseItem[]) => {
  const order: Record<string, number> = { breached: 0, due_today: 1, due_48h: 2 }
  return [...cases].sort((a, b) => order[a.slaBucket] - order[b.slaBucket])
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
      <polyline fill="none" stroke="#2563eb" strokeWidth="2" points={points} />
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
      <rect x="5" y="20" width="90" height="10" fill="#cbd5f5" rx="5" opacity="0.6" />
      <line x1={5 + targetX * 0.9} y1="15" x2={5 + targetX * 0.9} y2="35" stroke="#2563eb" strokeWidth="2" />
      <circle cx={5 + suggestedX * 0.9} cy="25" r="4" fill="#0f172a" />
      <text x="5" y="12" fontSize="6" fill="#64748b">{corridor.min.toFixed(0)}</text>
      <text x="85" y="12" fontSize="6" fill="#64748b">{corridor.max.toFixed(0)}</text>
    </svg>
  )
}

export default function UnderwriterJuniorPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Junior Underwriter',
        subtitle: 'Lower authority with more referrals. Guided corridor checks and escalation triggers.',
        kpi: {
          open: 'Open decisions',
          avgTime: 'Avg decision time',
          dueToday: 'SLA due today',
          referrals: 'Referrals created',
          evidenceAvg: 'Evidence quality avg',
          corridor: 'Corridor adherence'
        },
        table: { id: 'ID', account: 'Account', product: 'Product', sla: 'SLA', status: 'Status' },
        status: { due_today: 'Due today', due_48h: 'Due in 48h', breached: 'Breached' },
        products: { fleet: 'Fleet', cargo: 'Cargo', carrier_liability: 'Carrier liability' },
        inbox: 'Decision inbox',
        snapshot: 'Decision snapshot',
        corridorLabel: 'Pricing corridor',
        aiTitle: 'AI decision template — requires human review',
        aiItems: ['Highlight risk tier and corridor status', 'Summarize evidence bundle quality', 'Suggest next step based on ruleset'],
        actions: { evidence: 'Request evidence', escalate: 'Escalate to senior', draft: 'Draft decision' },
        evidenceTitle: 'Evidence & data integrity',
        corridorsTitle: 'Underwriting corridors',
        referralTitle: 'Referral logic',
        auditTitle: 'Audit trail preview',
        corridorSummary: 'Eligibility checks summary',
        corridorBreaches: 'Top corridor breaches',
        corridorThresholds: 'Escalation thresholds',
        corridorSummaryNote: '92% eligibility checks passed',
        corridorBreachesNote: '5 high-severity breaches in queue',
        corridorThresholdsNote: 'Escalate at 25% aggregation impact',
        referralOut: 'Out-of-corridor',
        referralOutNote: '12 cases pending referral',
        referralAgg: 'Aggregation alerts',
        referralAggNote: '3 alerts (daily caps)',
        referralGov: 'Governance approvals',
        referralGovNote: '6 approvals waiting',
        evidence: {
          telematics: 'Telematics feed',
          broker_submission: 'Broker submission',
          loss_history: 'Loss history',
          fleet_manifest: 'Fleet manifest',
          hourly: 'Updated hourly',
          complete_schedule: 'Complete schedule',
          awaiting_bordereaux: 'Awaiting latest bordereaux',
          requested_broker: 'Requested from broker',
          ok: 'ok',
          missing: 'missing',
          stale: 'stale'
        },
        rationale: {
          within_corridor: 'Within corridor and strong evidence.',
          agg_exceeds: 'Aggregation impact exceeds junior authority.',
          out_high: 'Out-of-corridor with high severity.'
        },
        logs: {
          created_referral: 'Created referral',
          updated_decision: 'Updated decision',
          requested_evidence: 'Requested evidence',
          escalation_review: 'Escalation review',
          audit_check: 'Audit log check',
          aggregation_flag: 'Aggregation flag',
          within_corridor: 'Within corridor',
          fleet_manifest: 'Fleet manifest',
          override_pending: 'Override pending',
          no_issues: 'No issues',
          junior: 'junior',
          senior: 'senior',
          carrier: 'carrier',
          compliance: 'compliance'
        }
      }
    : {
        title: 'Junior Underwriter',
        subtitle: 'Weniger Authority mit mehr Referrals. Geführte Korridor-Checks und Eskalationslogik.',
        kpi: {
          open: 'Offene Entscheidungen',
          avgTime: 'Ø Entscheidungszeit',
          dueToday: 'SLA heute fällig',
          referrals: 'Erstellte Referrals',
          evidenceAvg: 'Evidenz-Qualität Ø',
          corridor: 'Korridor-Adhärenz'
        },
        table: { id: 'ID', account: 'Account', product: 'Produkt', sla: 'SLA', status: 'Status' },
        status: { due_today: 'Heute fällig', due_48h: 'In 48h fällig', breached: 'Verletzt' },
        products: { fleet: 'Flotte', cargo: 'Cargo', carrier_liability: 'Frachtführerhaftung' },
        inbox: 'Decision Inbox',
        snapshot: 'Decision Snapshot',
        corridorLabel: 'Pricing Corridor',
        aiTitle: 'AI Decision Template — Human Review erforderlich',
        aiItems: ['Risikotier und Korridorstatus hervorheben', 'Evidenzqualität zusammenfassen', 'Nächsten Schritt nach Ruleset vorschlagen'],
        actions: { evidence: 'Evidenz anfordern', escalate: 'An Senior eskalieren', draft: 'Entscheidung entwerfen' },
        evidenceTitle: 'Evidenz & Datenintegrität',
        corridorsTitle: 'Underwriting-Korridore',
        referralTitle: 'Referral-Logik',
        auditTitle: 'Audit Trail Preview',
        corridorSummary: 'Eligibility-Checks Übersicht',
        corridorBreaches: 'Top Korridor-Breaches',
        corridorThresholds: 'Eskalationsschwellen',
        corridorSummaryNote: '92% Eligibility-Checks bestanden',
        corridorBreachesNote: '5 High-Severity Breaches in Queue',
        corridorThresholdsNote: 'Eskalation ab 25% Aggregationswirkung',
        referralOut: 'Out-of-corridor',
        referralOutNote: '12 Fälle pending Referral',
        referralAgg: 'Aggregation Alerts',
        referralAggNote: '3 Alerts (Daily Caps)',
        referralGov: 'Governance Approvals',
        referralGovNote: '6 Approvals warten',
        evidence: {
          telematics: 'Telematik-Feed',
          broker_submission: 'Broker Submission',
          loss_history: 'Schadenhistorie',
          fleet_manifest: 'Flottenliste',
          hourly: 'Stündlich aktualisiert',
          complete_schedule: 'Vollständiger Schedule',
          awaiting_bordereaux: 'Wartet auf aktuelles Bordereaux',
          requested_broker: 'Beim Broker angefragt',
          ok: 'ok',
          missing: 'fehlt',
          stale: 'veraltet'
        },
        rationale: {
          within_corridor: 'Innerhalb Korridor und starke Evidenz.',
          agg_exceeds: 'Aggregationswirkung über Junior-Authority.',
          out_high: 'Out-of-corridor mit hoher Severity.'
        },
        logs: {
          created_referral: 'Referral erstellt',
          updated_decision: 'Entscheidung aktualisiert',
          requested_evidence: 'Evidenz angefordert',
          escalation_review: 'Eskalationsreview',
          audit_check: 'Audit-Log-Check',
          aggregation_flag: 'Aggregations-Flag',
          within_corridor: 'Innerhalb Korridor',
          fleet_manifest: 'Flottenliste',
          override_pending: 'Override offen',
          no_issues: 'Keine Auffälligkeiten',
          junior: 'junior',
          senior: 'senior',
          carrier: 'carrier',
          compliance: 'compliance'
        }
      }

  const cases: CaseItem[] = [
    {
      id: 'UW-1932',
      productKey: 'fleet',
      account: 'Anchor Fleet Alpha',
      reasonKey: 'vehicle_cluster',
      riskTier: 'B',
      slaDue: '2026-01-27T16:00:00Z',
      slaBucket: 'due_today',
      corridorStatus: { state: 'within', severity: 'low' },
      recommendation: { action: 'approve', rationaleKey: 'within_corridor' },
      evidenceQuality: 88,
      aggregationImpact: 32,
      pricingCorridor: { min: 18, target: 22, max: 28, suggested: 21 },
      status: 'in_review'
    },
    {
      id: 'UW-1941',
      productKey: 'cargo',
      account: 'Northbridge Logistics',
      reasonKey: 'seasonal_peak',
      riskTier: 'C',
      slaDue: '2026-01-28T11:00:00Z',
      slaBucket: 'due_48h',
      corridorStatus: { state: 'out', severity: 'med' },
      recommendation: { action: 'referral', rationaleKey: 'agg_exceeds' },
      evidenceQuality: 74,
      aggregationImpact: 58,
      pricingCorridor: { min: 16, target: 20, max: 26, suggested: 25 },
      status: 'referred'
    },
    {
      id: 'UW-1955',
      productKey: 'carrier_liability',
      account: 'Bluegate Haulage',
      reasonKey: 'corridor_request',
      riskTier: 'B',
      slaDue: '2026-01-27T09:00:00Z',
      slaBucket: 'breached',
      corridorStatus: { state: 'out', severity: 'high' },
      recommendation: { action: 'referral', rationaleKey: 'out_high' },
      evidenceQuality: 61,
      aggregationImpact: 72,
      pricingCorridor: { min: 20, target: 24, max: 30, suggested: 29 },
      status: 'referred'
    }
  ]

  const evidenceSources: EvidenceSource[] = [
    { nameKey: 'telematics', freshnessHours: 2, status: 'ok', notesKey: 'hourly' },
    { nameKey: 'broker_submission', freshnessHours: 14, status: 'ok', notesKey: 'complete_schedule' },
    { nameKey: 'loss_history', freshnessHours: 36, status: 'stale', notesKey: 'awaiting_bordereaux' },
    { nameKey: 'fleet_manifest', freshnessHours: 0, status: 'missing', notesKey: 'requested_broker' }
  ]

  const logs: LogEntry[] = [
    { ts: '2026-01-27 08:12', actorRole: 'junior', actionKey: 'created_referral', ruleVersion: 'v3.4', evidenceStatus: 'stale', noteKey: 'aggregation_flag' },
    { ts: '2026-01-26 16:40', actorRole: 'junior', actionKey: 'updated_decision', ruleVersion: 'v3.4', evidenceStatus: 'ok', noteKey: 'within_corridor' },
    { ts: '2026-01-26 10:05', actorRole: 'junior', actionKey: 'requested_evidence', ruleVersion: 'v3.4', evidenceStatus: 'missing', noteKey: 'fleet_manifest' },
    { ts: '2026-01-25 15:22', actorRole: 'senior', actionKey: 'escalation_review', ruleVersion: 'v3.4', evidenceStatus: 'ok', noteKey: 'override_pending' },
    { ts: '2026-01-25 09:10', actorRole: 'compliance', actionKey: 'audit_check', ruleVersion: 'v3.3', evidenceStatus: 'ok', noteKey: 'no_issues' }
  ]

  const kpis = computeKpis(cases)
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
          <Card title={copy.kpi.open} variant="glass"><strong>{kpis.open}</strong><MiniSparkline data={[12, 14, 11, 16, 18]} /></Card>
          <Card title={copy.kpi.avgTime} variant="glass"><strong>{kpis.avgTime}</strong><MiniSparkline data={[2.4, 2.0, 1.7, 1.6, 1.8]} /></Card>
          <Card title={copy.kpi.dueToday} variant="glass"><strong>{kpis.dueToday}</strong><MiniSparkline data={[3, 2, 4, 3, 3]} /></Card>
          <Card title={copy.kpi.referrals} variant="glass"><strong>{kpis.referrals}</strong><MiniSparkline data={[1, 2, 2, 3, 2]} /></Card>
          <Card title={copy.kpi.evidenceAvg} variant="glass"><strong>{kpis.evidenceAvg}%</strong><MiniSparkline data={[70, 76, 81, 78, 82]} /></Card>
          <Card title={copy.kpi.corridor} variant="glass"><strong>{kpis.corridor}%</strong><MiniSparkline data={[82, 84, 79, 86, 88]} /></Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '1.25rem' }}>
          <Card title={copy.inbox} variant="glass" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '540px' }}>
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
                {sortCasesByPriority(cases).map((item) => (
                  <tr key={item.id} onClick={() => setSelectedId(item.id)} style={{ cursor: 'pointer', background: item.id === selectedId ? '#eef2ff' : 'transparent' }}>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{item.id}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{item.account}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.products[item.productKey]}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{formatSla(item.slaDue, lang)}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9', color: badgeVariantForStatus(item.slaBucket) }}>{copy.status[item.slaBucket]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title={copy.snapshot} variant="glass">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <strong>{selected.id}</strong>
                <div style={{ color: '#64748b' }}>{selected.account} · {copy.products[selected.productKey]}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{copy.corridorLabel}</div>
                <CorridorChart corridor={selected.pricingCorridor} label={copy.corridorLabel} />
              </div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.75rem' }}>
                <strong>{copy.aiTitle}</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', color: '#475569' }}>
                  {copy.aiItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.evidence}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.escalate}</Button>
                <Button onClick={() => {}}>{copy.actions.draft}</Button>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <Card title={copy.evidenceTitle} variant="glass">
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {evidenceSources.map((source) => (
                <li key={source.nameKey}>
                  <strong>{copy.evidence[source.nameKey]}</strong> · {source.freshnessHours}h · {copy.evidence[source.status]} — {copy.evidence[source.notesKey]}
                </li>
              ))}
            </ul>
          </Card>
          <Card title={copy.corridorsTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><strong>{copy.corridorSummary}</strong><div style={{ color: '#64748b' }}>{copy.corridorSummaryNote}</div></div>
              <div><strong>{copy.corridorBreaches}</strong><div style={{ color: '#64748b' }}>{copy.corridorBreachesNote}</div></div>
              <div><strong>{copy.corridorThresholds}</strong><div style={{ color: '#64748b' }}>{copy.corridorThresholdsNote}</div></div>
            </div>
          </Card>
          <Card title={copy.referralTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><strong>{copy.referralOut}</strong><div style={{ color: '#64748b' }}>{copy.referralOutNote}</div></div>
              <div><strong>{copy.referralAgg}</strong><div style={{ color: '#64748b' }}>{copy.referralAggNote}</div></div>
              <div><strong>{copy.referralGov}</strong><div style={{ color: '#64748b' }}>{copy.referralGovNote}</div></div>
            </div>
          </Card>
        </div>

        <Card title={copy.auditTitle} variant="glass">
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
            {logs.map((log) => (
              <li key={`${log.ts}-${log.actionKey}`}>{log.ts} · {copy.logs[log.actorRole]} · {copy.logs[log.actionKey]} · {log.ruleVersion} · {copy.evidence[log.evidenceStatus]} — {copy.logs[log.noteKey]}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
