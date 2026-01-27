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
  breachSeverity: 'low' | 'med' | 'high'
  corridorStatus: 'within' | 'out'
  recommendation: { action: 'approve' | 'referral' | 'decline'; rationaleKey: 'within_corridor' | 'agg_alert' | 'tail_cluster' }
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

export default function UnderwriterSeniorPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Senior Underwriter',
        subtitle: 'Expanded limits with mandatory override reason and governance sign-off.',
        kpi: {
          open: 'Open decisions',
          overrides: 'Overrides used',
          referralRate: 'Referral rate',
          alerts: 'Aggregation alerts',
          evidenceAvg: 'Evidence quality avg',
          authority: 'Authority utilization'
        },
        table: { id: 'ID', account: 'Account', product: 'Product', sla: 'SLA', severity: 'Breach severity', status: 'Status' },
        status: { due_today: 'Due today', due_48h: 'Due in 48h', breached: 'Breached', within: 'Within corridor', out: 'Out-of-corridor' },
        severity: { low: 'Low', med: 'Medium', high: 'High' },
        products: { fleet: 'Fleet', cargo: 'Cargo', carrier_liability: 'Carrier liability' },
        inbox: 'Decision inbox',
        snapshot: 'Decision snapshot',
        corridorLabel: 'Pricing corridor',
        aiTitle: 'AI decision templates — senior review required',
        aiTemplates: ['Approve within corridor', 'Refer for aggregation review', 'Decline due to tail clustering'],
        aiNote: 'Templates are suggestions and require governance sign-off.',
        overrideTitle: 'Override controls',
        overrideType: 'Override reason',
        overridePlaceholder: 'Select reason',
        overrideNotes: 'Override rationale',
        overrideNotesPlaceholder: 'Provide a concise governance rationale',
        overrideOptions: { data: 'Data integrity exception', governance: 'Governance escalation', strategic: 'Strategic carrier exception' },
        actions: { apply: 'Apply override', refer: 'Refer to carrier' },
        evidenceTitle: 'Evidence & data integrity',
        evidenceItems: ['Evidence bundle completeness: 96%', 'Latest bordereaux ingested', 'Audit trail version v3.4'],
        portfolioTitle: 'Portfolio steering',
        aggregationLabel: 'Aggregation utilization',
        portfolioItems: {
          caps: 'Capacity caps & roll-out gates',
          capsNote: 'Gate 2 open · Gate 3 pending approval',
          monthly: 'Monthly performance review',
          monthlyNote: 'Loss ratio band stable · Frequency trending down'
        },
        corridorsTitle: 'Underwriting corridors',
        corridorsItems: {
          eligibility: 'Eligibility checks',
          eligibilityNote: '94% within corridor',
          breaches: 'Top corridor breaches',
          breachesNote: '3 high-severity breaches in review'
        },
        referralTitle: 'Referral logic',
        referralItems: {
          approvals: 'Governance approvals pending',
          approvalsNote: '8 approvals waiting',
          triggers: 'Escalation triggers fired',
          triggersNote: '5 triggers in last 7 days'
        },
        slaTitle: 'SLA buckets',
        disclaimer: 'Human-in-the-loop. Indicative data only — not a forecast.'
      }
    : {
        title: 'Senior Underwriter',
        subtitle: 'Erweiterte Limits mit Pflicht zur Override-Begründung und Governance-Sign-off.',
        kpi: {
          open: 'Offene Entscheidungen',
          overrides: 'Genutzte Overrides',
          referralRate: 'Referral-Quote',
          alerts: 'Aggregation Alerts',
          evidenceAvg: 'Evidenz-Qualität Ø',
          authority: 'Authority Utilization'
        },
        table: { id: 'ID', account: 'Account', product: 'Produkt', sla: 'SLA', severity: 'Breach Severity', status: 'Status' },
        status: { due_today: 'Heute fällig', due_48h: 'In 48h fällig', breached: 'Verletzt', within: 'Innerhalb Korridor', out: 'Out-of-corridor' },
        severity: { low: 'Low', med: 'Medium', high: 'High' },
        products: { fleet: 'Flotte', cargo: 'Cargo', carrier_liability: 'Frachtführerhaftung' },
        inbox: 'Decision Inbox',
        snapshot: 'Decision Snapshot',
        corridorLabel: 'Pricing Corridor',
        aiTitle: 'AI Decision Templates — Senior Review erforderlich',
        aiTemplates: ['Approve innerhalb Korridor', 'Referral für Aggregationsreview', 'Decline wegen Tail-Clustering'],
        aiNote: 'Vorlagen sind Vorschläge und erfordern Governance-Sign-off.',
        overrideTitle: 'Override-Kontrollen',
        overrideType: 'Override-Grund',
        overridePlaceholder: 'Grund wählen',
        overrideNotes: 'Override-Begründung',
        overrideNotesPlaceholder: 'Kurze Governance-Begründung erfassen',
        overrideOptions: { data: 'Datenintegritäts-Exception', governance: 'Governance-Eskalation', strategic: 'Strategische Carrier-Exception' },
        actions: { apply: 'Override anwenden', refer: 'An Carrier verweisen' },
        evidenceTitle: 'Evidenz & Datenintegrität',
        evidenceItems: ['Evidenzpaket vollständig: 96%', 'Aktuelles Bordereaux eingespielt', 'Audit Trail Version v3.4'],
        portfolioTitle: 'Portfolio Steering',
        aggregationLabel: 'Aggregationsauslastung',
        portfolioItems: {
          caps: 'Capacity Caps & Roll-out Gates',
          capsNote: 'Gate 2 offen · Gate 3 wartet Approval',
          monthly: 'Monatliches Performance Review',
          monthlyNote: 'Loss Ratio Band stabil · Frequency leicht fallend'
        },
        corridorsTitle: 'Underwriting-Korridore',
        corridorsItems: {
          eligibility: 'Eligibility-Checks',
          eligibilityNote: '94% innerhalb Korridor',
          breaches: 'Top Korridor-Breaches',
          breachesNote: '3 High-Severity Breaches in Review'
        },
        referralTitle: 'Referral-Logik',
        referralItems: {
          approvals: 'Governance Approvals pending',
          approvalsNote: '8 Approvals warten',
          triggers: 'Eskalations-Triggers ausgelöst',
          triggersNote: '5 Trigger in den letzten 7 Tagen'
        },
        slaTitle: 'SLA Buckets',
        disclaimer: 'Human-in-the-loop. Indikative Daten — keine Prognose.'
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
      recommendation: { action: 'approve', rationaleKey: 'within_corridor' },
      evidenceQuality: 92,
      aggregationImpact: 44,
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
      recommendation: { action: 'approve', rationaleKey: 'within_corridor' },
      evidenceQuality: 86,
      aggregationImpact: 37,
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
      recommendation: { action: 'referral', rationaleKey: 'tail_cluster' },
      evidenceQuality: 68,
      aggregationImpact: 81,
      pricingCorridor: { min: 22, target: 26, max: 32, suggested: 31 }
    }
  ]

  const kpis = {
    open: cases.length,
    overrides: 6,
    referralRate: '24%',
    alerts: 5,
    evidenceAvg: `${Math.round(cases.reduce((acc, item) => acc + item.evidenceQuality, 0) / cases.length)}%`,
    authority: '74%'
  }

  const slaCounts = cases.reduce(
    (acc, item) => ({ ...acc, [item.slaBucket]: acc[item.slaBucket] + 1 }),
    { due_today: 0, due_48h: 0, breached: 0 }
  )

  const [selectedId, setSelectedId] = React.useState(cases[0]?.id)
  const selected = cases.find((item) => item.id === selectedId) || cases[0]
  const [selectedTemplate, setSelectedTemplate] = React.useState(0)
  const [overrideReason, setOverrideReason] = React.useState('')
  const [overrideNotes, setOverrideNotes] = React.useState('')
  const canApply = overrideReason.trim().length > 0 && overrideNotes.trim().length > 0

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
          <Card title={copy.kpi.open} variant="glass"><strong>{kpis.open}</strong><MiniSparkline data={[12, 14, 11, 15, 16]} /></Card>
          <Card title={copy.kpi.overrides} variant="glass"><strong>{kpis.overrides}</strong><MiniSparkline data={[2, 3, 4, 5, 6]} /></Card>
          <Card title={copy.kpi.referralRate} variant="glass"><strong>{kpis.referralRate}</strong><MiniSparkline data={[18, 21, 19, 24, 24]} /></Card>
          <Card title={copy.kpi.alerts} variant="glass"><strong>{kpis.alerts}</strong><MiniSparkline data={[3, 4, 4, 5, 5]} /></Card>
          <Card title={copy.kpi.evidenceAvg} variant="glass"><strong>{kpis.evidenceAvg}</strong><MiniSparkline data={[82, 84, 86, 88, 90]} /></Card>
          <Card title={copy.kpi.authority} variant="glass"><strong>{kpis.authority}</strong><MiniSparkline data={[68, 70, 72, 74, 74]} /></Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '1.25rem' }}>
          <Card title={copy.inbox} variant="glass" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
              <thead>
                <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.id}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.account}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.product}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.sla}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.table.severity}</th>
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
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.severity[item.breachSeverity]}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.status[item.corridorStatus]}</td>
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
                <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {copy.aiTemplates.map((template, index) => (
                    <label key={template} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#475569' }}>
                      <input
                        type="radio"
                        name="template"
                        checked={selectedTemplate === index}
                        onChange={() => setSelectedTemplate(index)}
                      />
                      <span>{template}</span>
                    </label>
                  ))}
                </div>
                <div style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>{copy.aiNote}</div>
              </div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.75rem', display: 'grid', gap: '0.5rem' }}>
                <strong>{copy.overrideTitle}</strong>
                <label style={{ fontSize: '0.85rem', color: '#64748b' }}>{copy.overrideType}</label>
                <select value={overrideReason} onChange={(event) => setOverrideReason(event.target.value)} style={{ padding: '0.5rem', borderRadius: '8px', borderColor: '#cbd5f5' }}>
                  <option value="">{copy.overridePlaceholder}</option>
                  <option value="data">{copy.overrideOptions.data}</option>
                  <option value="governance">{copy.overrideOptions.governance}</option>
                  <option value="strategic">{copy.overrideOptions.strategic}</option>
                </select>
                <label style={{ fontSize: '0.85rem', color: '#64748b' }}>{copy.overrideNotes}</label>
                <textarea
                  value={overrideNotes}
                  onChange={(event) => setOverrideNotes(event.target.value)}
                  rows={3}
                  placeholder={copy.overrideNotesPlaceholder}
                  style={{ padding: '0.5rem', borderRadius: '8px', borderColor: '#cbd5f5' }}
                />
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <Button disabled={!canApply} onClick={() => {}}>{copy.actions.apply}</Button>
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.refer}</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <Card title={copy.portfolioTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.9rem' }}>
              <AggregationGauge value={72} label={copy.aggregationLabel} />
              <div><strong>{copy.portfolioItems.caps}</strong><div style={{ color: '#64748b' }}>{copy.portfolioItems.capsNote}</div></div>
              <div><strong>{copy.portfolioItems.monthly}</strong><div style={{ color: '#64748b' }}>{copy.portfolioItems.monthlyNote}</div></div>
            </div>
          </Card>
          <Card title={copy.corridorsTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><strong>{copy.corridorsItems.eligibility}</strong><div style={{ color: '#64748b' }}>{copy.corridorsItems.eligibilityNote}</div></div>
              <div><strong>{copy.corridorsItems.breaches}</strong><div style={{ color: '#64748b' }}>{copy.corridorsItems.breachesNote}</div></div>
            </div>
          </Card>
          <Card title={copy.referralTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><strong>{copy.referralItems.approvals}</strong><div style={{ color: '#64748b' }}>{copy.referralItems.approvalsNote}</div></div>
              <div><strong>{copy.referralItems.triggers}</strong><div style={{ color: '#64748b' }}>{copy.referralItems.triggersNote}</div></div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.25rem' }}>
          <Card title={copy.evidenceTitle} variant="glass">
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.evidenceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card title={copy.slaTitle} variant="glass">
            <SlaBucketBar counts={slaCounts} labels={copy.status} />
          </Card>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{copy.disclaimer}</div>
      </div>
    </section>
  )
}
