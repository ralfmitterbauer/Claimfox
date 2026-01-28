import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

type LegalCase = {
  id: string
  type: string
  trigger: string
  severity: 'Low' | 'Medium' | 'High'
  slaDue: string
  slaBucket: 'due_today' | 'due_48h' | 'breached'
  recommendation: string
  status: string
  applicableRules: string[]
  keyRisks: string[]
  evidenceQuality: number
  escalationRequired: boolean
  summary: string
}

type LogEntry = {
  timestamp: string
  role: string
  action: string
  ruleVersion: string
  evidenceStatus: string
  note: string
}

const formatSla = (iso: string, lang: string) => {
  const date = new Date(iso)
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-DE', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
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

export default function LegalClaimsSpecialistPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Legal Claims Specialist — Legal Dashboard',
        subtitle: 'Coverage position, obligations and settlement guidance for claims cases.',
        lastUpdated: 'Last updated: 27 Jan 2026, 14:45',
        kpi: {
          open: 'Open legal cases',
          dueToday: 'Decisions due today',
          breaches: 'SLA breaches',
          cycle: 'Avg decision cycle',
          escalations: 'Escalations pending',
          dispute: 'Dispute rate'
        },
        table: {
          title: 'Decision inbox',
          id: 'Case ID',
          type: 'Case type',
          trigger: 'Trigger reason',
          severity: 'Severity',
          sla: 'SLA due',
          recommendation: 'Recommended action',
          status: 'Status'
        },
        filters: {
          status: 'Status filter',
          sort: 'Sort by',
          sortSla: 'SLA due'
        },
        statusAll: 'All',
        snapshot: {
          title: 'Decision snapshot',
          summary: 'Coverage position summary',
          risks: 'Legal risk assessment',
          rules: 'Applicable rules / clauses',
          aiTitle: 'AI-generated decision template — requires human validation',
          templates: 'Decision templates'
        },
        actions: {
          confirm: 'Coverage confirmed',
          deny: 'Coverage denied (with rationale)',
          settle: 'Settlement recommendation',
          escalate: 'Escalate to Carrier Legal'
        },
        slaPanel: {
          title: 'SLA & governance',
          buckets: 'SLA buckets',
          governance: 'Governance status',
          within: 'Within mandate',
          escalation: 'Escalation required',
          carrier: 'Carrier approval required'
        },
        audit: {
          title: 'Audit & governance reports',
          logTitle: 'Decision log',
          governanceTitle: 'Governance indicators',
          logCols: ['Timestamp', 'Role', 'Action', 'Rule version', 'Evidence status', 'Note'],
          indicators: ['Mandatory sign-offs completed', 'Override reason present', 'Regulatory scope confirmed']
        },
        footer: {
          hitl: 'Human-in-the-loop: AI supports decisions; final responsibility remains with authorized legal roles.',
          demo: 'Indicative demo data — not a legal opinion.'
        }
      }
    : {
        title: 'Legal Claims Specialist — Legal Dashboard',
        subtitle: 'Deckungsposition, Obliegenheiten und Vergleichsempfehlungen für Claims.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 14:45',
        kpi: {
          open: 'Offene Legal Cases',
          dueToday: 'Entscheidungen heute fällig',
          breaches: 'SLA Breaches',
          cycle: 'Ø Entscheidungszyklus',
          escalations: 'Eskalationen pending',
          dispute: 'Dispute-Quote'
        },
        table: {
          title: 'Decision Inbox',
          id: 'Case ID',
          type: 'Case-Typ',
          trigger: 'Trigger-Grund',
          severity: 'Severity',
          sla: 'SLA fällig',
          recommendation: 'Empfohlene Aktion',
          status: 'Status'
        },
        filters: {
          status: 'Statusfilter',
          sort: 'Sortieren nach',
          sortSla: 'SLA fällig'
        },
        statusAll: 'Alle',
        snapshot: {
          title: 'Decision Snapshot',
          summary: 'Coverage-Position Summary',
          risks: 'Rechtliche Risikobewertung',
          rules: 'Anwendbare Regeln / Klauseln',
          aiTitle: 'AI-Decision-Template — Human Validation erforderlich',
          templates: 'Entscheidungsvorlagen'
        },
        actions: {
          confirm: 'Coverage bestätigt',
          deny: 'Coverage abgelehnt (mit Begründung)',
          settle: 'Settlement-Empfehlung',
          escalate: 'An Carrier Legal eskalieren'
        },
        slaPanel: {
          title: 'SLA & Governance',
          buckets: 'SLA Buckets',
          governance: 'Governance-Status',
          within: 'Im Mandat',
          escalation: 'Eskalation erforderlich',
          carrier: 'Carrier-Approval erforderlich'
        },
        audit: {
          title: 'Audit- & Governance-Reports',
          logTitle: 'Decision Log',
          governanceTitle: 'Governance-Indikatoren',
          logCols: ['Zeitstempel', 'Rolle', 'Aktion', 'Rule-Version', 'Evidenzstatus', 'Notiz'],
          indicators: ['Mandatory Sign-offs abgeschlossen', 'Override-Begründung vorhanden', 'Regulatorischer Scope bestätigt']
        },
        footer: {
          hitl: 'Human-in-the-loop: AI unterstützt Entscheidungen; finale Verantwortung verbleibt bei autorisierten Legal-Rollen.',
          demo: 'Indikative Demo-Daten — keine Rechtsberatung.'
        }
      }

  const cases: LegalCase[] = [
    {
      id: 'LC-3104',
      type: 'Claim',
      trigger: 'Coverage dispute raised',
      severity: 'High',
      slaDue: '2026-01-27T15:30:00Z',
      slaBucket: 'due_today',
      recommendation: 'Coverage denied (with rationale)',
      status: 'In review',
      applicableRules: ['Policy Wording §12 Exclusions', 'Claims Protocol v4.1'],
      keyRisks: ['Potential bad faith allegation', 'Documentation gaps'],
      evidenceQuality: 77,
      escalationRequired: true,
      summary: 'Claim exceeds coverage scope; exclusion clause under review.'
    },
    {
      id: 'LC-3111',
      type: 'Claim',
      trigger: 'Settlement option requested',
      severity: 'Medium',
      slaDue: '2026-01-28T10:30:00Z',
      slaBucket: 'due_48h',
      recommendation: 'Settlement recommendation',
      status: 'Open',
      applicableRules: ['Settlement Guidelines v2.2', 'Authority Schedule 2025'],
      keyRisks: ['Reserve adequacy', 'Reputational impact'],
      evidenceQuality: 83,
      escalationRequired: false,
      summary: 'Broker proposed settlement range pending legal sign-off.'
    },
    {
      id: 'LC-3120',
      type: 'Claim',
      trigger: 'Obligation breach suspected',
      severity: 'High',
      slaDue: '2026-01-27T09:00:00Z',
      slaBucket: 'breached',
      recommendation: 'Escalate to Carrier Legal',
      status: 'Breached',
      applicableRules: ['Duties of Assured §6', 'Claims SOP v4.1'],
      keyRisks: ['Regulatory scrutiny', 'Dispute escalation'],
      evidenceQuality: 68,
      escalationRequired: true,
      summary: 'Potential breach of notification obligations identified.'
    }
  ]

  const logs: LogEntry[] = [
    { timestamp: '2026-01-27 09:18', role: 'Claims Legal', action: 'Coverage review', ruleVersion: 'v4.1', evidenceStatus: 'ok', note: 'Exclusion assessment' },
    { timestamp: '2026-01-27 08:52', role: 'Claims Legal', action: 'Settlement review', ruleVersion: 'v2.2', evidenceStatus: 'ok', note: 'Range validated' },
    { timestamp: '2026-01-26 18:05', role: 'Carrier Legal', action: 'Escalation flagged', ruleVersion: 'v4.0', evidenceStatus: 'stale', note: 'Awaiting reserves' },
    { timestamp: '2026-01-26 12:21', role: 'Claims Legal', action: 'Evidence request', ruleVersion: 'v4.1', evidenceStatus: 'missing', note: 'Loss adjuster report' },
    { timestamp: '2026-01-25 15:45', role: 'Compliance', action: 'Audit check', ruleVersion: 'v3.9', evidenceStatus: 'ok', note: 'No issues' }
  ]

  const kpis = React.useMemo(() => {
    const open = cases.filter((item) => item.status !== 'Closed').length
    const dueToday = cases.filter((item) => item.slaBucket === 'due_today').length
    const breaches = cases.filter((item) => item.slaBucket === 'breached').length
    const escalations = cases.filter((item) => item.escalationRequired).length
    return {
      open,
      dueToday,
      breaches,
      cycle: '1.9d',
      escalations,
      dispute: '12%'
    }
  }, [cases])

  const [selectedId, setSelectedId] = React.useState(cases[0]?.id)
  const selected = cases.find((item) => item.id === selectedId) || cases[0]

  const buckets = React.useMemo(() => ({
    due_today: cases.filter((item) => item.slaBucket === 'due_today').length,
    due_48h: cases.filter((item) => item.slaBucket === 'due_48h').length,
    breached: cases.filter((item) => item.slaBucket === 'breached').length
  }), [cases])

  return (
    <section className="uw-page">
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header title={copy.title} subtitle={copy.subtitle} subtitleColor="rgba(255,255,255,0.82)" />
        </div>
      </div>

      <div className="uw-container">
        <div className="uw-grid uw-kpi">
          <Card title={copy.kpi.open} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.open}</strong><MiniBars data={[10, 12, 11, 13, 12]} /></div></Card>
          <Card title={copy.kpi.dueToday} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.dueToday}</strong><MiniBars data={[4, 5, 6, 5, 6]} /></div></Card>
          <Card title={copy.kpi.breaches} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.breaches}</strong><MiniBars data={[2, 3, 2, 3, 2]} /></div></Card>
          <Card title={copy.kpi.cycle} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.cycle}</strong><MiniBars data={[1.6, 1.5, 1.4, 1.3, 1.4]} /></div></Card>
          <Card title={copy.kpi.escalations} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.escalations}</strong><MiniBars data={[3, 4, 4, 5, 4]} /></div></Card>
          <Card title={copy.kpi.dispute} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.dispute}</strong><MiniBars data={[6, 7, 6, 8, 7]} /></div></Card>
        </div>

        <div className="uw-grid uw-split">
          <Card variant="glass" className="uw-card uw-table-card">
            <div className="uw-card-body" style={{ gap: 0, justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                <strong>{copy.table.title}</strong>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <label className="uw-muted">
                    {copy.filters.status}
                    <select aria-label={copy.filters.status} defaultValue="all" style={{ marginLeft: '0.5rem' }}>
                      <option value="all">{copy.statusAll}</option>
                    </select>
                  </label>
                  <label className="uw-muted">
                    {copy.filters.sort}
                    <select aria-label={copy.filters.sort} defaultValue="sla" style={{ marginLeft: '0.5rem' }}>
                      <option value="sla">{copy.filters.sortSla}</option>
                    </select>
                  </label>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="uw-table" aria-label="Legal claims decision inbox">
                  <thead>
                    <tr>
                      <th>{copy.table.id}</th>
                      <th>{copy.table.type}</th>
                      <th>{copy.table.trigger}</th>
                      <th>{copy.table.severity}</th>
                      <th>{copy.table.sla}</th>
                      <th>{copy.table.recommendation}</th>
                      <th>{copy.table.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((item) => (
                      <tr key={item.id} onClick={() => setSelectedId(item.id)} className={item.id === selectedId ? 'uw-row-active' : undefined} style={{ cursor: 'pointer' }}>
                        <td>{item.id}</td>
                        <td>{item.type}</td>
                        <td>{item.trigger}</td>
                        <td>{item.severity}</td>
                        <td>{formatSla(item.slaDue, lang)}</td>
                        <td>{item.recommendation}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              <strong>{copy.snapshot.title}</strong>
              <div className="uw-panel">
                <strong>{selected.id}</strong>
                <div className="uw-muted">{selected.summary}</div>
              </div>
              <div className="uw-panel">
                <div className="uw-muted">{copy.snapshot.risks}</div>
                <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1rem', color: '#475569' }}>
                  {selected.keyRisks.map((risk) => (
                    <li key={risk}>{risk}</li>
                  ))}
                </ul>
              </div>
              <div className="uw-panel">
                <div className="uw-muted">{copy.snapshot.rules}</div>
                <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1rem', color: '#475569' }}>
                  {selected.applicableRules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
              <div className="uw-panel">
                <strong>{copy.snapshot.aiTitle}</strong>
                <div className="uw-muted" style={{ marginTop: '0.4rem' }}>{selected.recommendation}</div>
              </div>
              <div className="uw-panel">
                <div className="uw-muted">{copy.snapshot.templates}</div>
                <div className="uw-actions">
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.confirm}</Button>
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.deny}</Button>
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.settle}</Button>
                  <Button onClick={() => {}}>{copy.actions.escalate}</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-triplet">
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.slaPanel.title}</strong>
              <div className="uw-muted">{copy.slaPanel.buckets}</div>
              <div className="uw-muted">Due today: {buckets.due_today}</div>
              <div className="uw-muted">Due 48h: {buckets.due_48h}</div>
              <div className="uw-muted">Breached: {buckets.breached}</div>
              <div className="uw-muted" style={{ marginTop: '0.5rem' }}>{copy.slaPanel.governance}</div>
              <div className="uw-muted">{copy.slaPanel.within}</div>
              <div className="uw-muted">{selected.escalationRequired ? copy.slaPanel.escalation : copy.slaPanel.within}</div>
              <div className="uw-muted">{selected.severity === 'High' ? copy.slaPanel.carrier : copy.slaPanel.within}</div>
            </div>
          </Card>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.audit.title}</strong>
              <div className="uw-muted">{copy.audit.logTitle}</div>
              <div style={{ overflowX: 'auto' }}>
                <table className="uw-table" aria-label="Claims legal audit log">
                  <thead>
                    <tr>
                      {copy.audit.logCols.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {logs.slice(0, 5).map((log) => (
                      <tr key={log.timestamp}>
                        <td>{log.timestamp}</td>
                        <td>{log.role}</td>
                        <td>{log.action}</td>
                        <td>{log.ruleVersion}</td>
                        <td>{log.evidenceStatus}</td>
                        <td>{log.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.audit.governanceTitle}</strong>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
                {copy.audit.indicators.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="uw-disclaimer">{copy.footer.hitl}</div>
        <div className="uw-disclaimer">{copy.footer.demo}</div>
      </div>
    </section>
  )
}
