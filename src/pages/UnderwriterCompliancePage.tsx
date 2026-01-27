import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

type LogEntry = {
  ts: string
  role: 'junior' | 'senior' | 'carrier' | 'compliance'
  actionKey: 'decision' | 'referral' | 'override' | 'evidence' | 'approval'
  ruleVersion: string
  evidenceStatus: 'ok' | 'missing' | 'stale'
  noteKey: 'in_scope' | 'corridor_breach' | 'evidence_gap' | 'approval_granted'
}

type ExceptionItem = {
  id: string
  typeKey: 'corridor' | 'aggregation' | 'data'
  statusKey: 'open' | 'remediating' | 'closed'
  ownerKey: 'uw_governance' | 'carrier_ops' | 'compliance'
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

export default function UnderwriterCompliancePage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Compliance',
        subtitle: 'Audit logs, governance controls and traceability across underwriting decisions.',
        kpi: {
          decisions: 'Decisions logged',
          missingEvidence: 'Missing evidence',
          overrides: 'Overrides without rationale',
          breaches: 'SLA breaches',
          ruleChanges: 'Rule version changes'
        },
        filters: { role: 'Role', status: 'Evidence status', all: 'All' },
        roles: { junior: 'Junior', senior: 'Senior', carrier: 'Carrier', compliance: 'Compliance' },
        evidence: { ok: 'ok', missing: 'missing', stale: 'stale' },
        auditTitle: 'Audit log',
        auditCols: { ts: 'Timestamp', role: 'Role', action: 'Action', rule: 'Rule version', evidence: 'Evidence', note: 'Note' },
        actions: { decision: 'Decision updated', referral: 'Referral created', override: 'Override applied', evidence: 'Evidence requested', approval: 'Approval granted' },
        notes: { in_scope: 'Within delegated authority', corridor_breach: 'Corridor breach logged', evidence_gap: 'Evidence gap flagged', approval_granted: 'Carrier approval granted' },
        governanceTitle: 'Controls & governance',
        rulesetTitle: 'Ruleset versioning',
        rulesetItems: ['Current: v3.4 (active)', 'Previous: v3.3 (archived)', 'Change notes: corridor thresholds tightened'],
        lifecycleTitle: 'Model lifecycle governance',
        lifecycleItems: ['Validation window: Q4 2025', 'Next review: Mar 2026', 'Owner: Governance committee'],
        sovereigntyTitle: 'Data sovereignty notice',
        sovereigntyBody: 'No external AI providers. Data use limited to carrier mandate.',
        exceptionTitle: 'Exception register',
        exceptionCols: { id: 'ID', type: 'Type', status: 'Status', owner: 'Owner' },
        exceptionTypes: { corridor: 'Corridor breach', aggregation: 'Aggregation alert', data: 'Data integrity' },
        exceptionStatus: { open: 'Open', remediating: 'Remediating', closed: 'Closed' },
        exportTitle: 'Export panel',
        exportNote: 'Exports available in data room.',
        exportActions: { audit: 'Export audit log', exceptions: 'Export exceptions', snapshot: 'Export snapshot' },
        referralTitle: 'Referral logic — compliance view',
        referralItems: {
          traceability: 'Governance approvals traceability',
          traceabilityNote: '100% of approvals linked to evidence',
          sampling: 'Corridor breach sampling',
          samplingNote: 'Sample size: 24 cases',
          completeness: 'Evidence completeness rate'
        },
        aggregationLabel: 'Evidence completeness',
        slaTitle: 'SLA buckets',
        slaLabels: { due_today: 'Due today', due_48h: 'Due in 48h', breached: 'Breached' },
        owners: { uw_governance: 'UW Governance', carrier_ops: 'Carrier Ops', compliance: 'Compliance' }
      }
    : {
        title: 'Compliance',
        subtitle: 'Audit-Logs, Governance-Kontrollen und Nachvollziehbarkeit im Underwriting.',
        kpi: {
          decisions: 'Entscheidungen geloggt',
          missingEvidence: 'Fehlende Evidenz',
          overrides: 'Overrides ohne Begründung',
          breaches: 'SLA Breaches',
          ruleChanges: 'Rule-Version-Änderungen'
        },
        filters: { role: 'Rolle', status: 'Evidenzstatus', all: 'Alle' },
        roles: { junior: 'Junior', senior: 'Senior', carrier: 'Carrier', compliance: 'Compliance' },
        evidence: { ok: 'ok', missing: 'fehlt', stale: 'veraltet' },
        auditTitle: 'Audit-Log',
        auditCols: { ts: 'Zeitstempel', role: 'Rolle', action: 'Aktion', rule: 'Rule-Version', evidence: 'Evidenz', note: 'Notiz' },
        actions: { decision: 'Entscheidung aktualisiert', referral: 'Referral erstellt', override: 'Override angewendet', evidence: 'Evidenz angefordert', approval: 'Approval erteilt' },
        notes: { in_scope: 'Innerhalb Delegated Authority', corridor_breach: 'Korridor-Breach geloggt', evidence_gap: 'Evidenzlücke markiert', approval_granted: 'Carrier-Approval erteilt' },
        governanceTitle: 'Controls & Governance',
        rulesetTitle: 'Ruleset-Versionierung',
        rulesetItems: ['Aktuell: v3.4 (aktiv)', 'Vorher: v3.3 (archiviert)', 'Change Notes: Korridor-Schwellen gestrafft'],
        lifecycleTitle: 'Model-Lifecycle Governance',
        lifecycleItems: ['Validierungsfenster: Q4 2025', 'Nächster Review: März 2026', 'Owner: Governance Committee'],
        sovereigntyTitle: 'Data-Sovereignty Hinweis',
        sovereigntyBody: 'Keine externen KI-Provider. Datennutzung nur im Carrier-Mandat.',
        exceptionTitle: 'Exception Register',
        exceptionCols: { id: 'ID', type: 'Typ', status: 'Status', owner: 'Owner' },
        exceptionTypes: { corridor: 'Korridor-Breach', aggregation: 'Aggregation Alert', data: 'Datenintegrität' },
        exceptionStatus: { open: 'Offen', remediating: 'In Behebung', closed: 'Geschlossen' },
        exportTitle: 'Export Panel',
        exportNote: 'Exporte verfügbar im Data Room.',
        exportActions: { audit: 'Audit-Log exportieren', exceptions: 'Exceptions exportieren', snapshot: 'Snapshot exportieren' },
        referralTitle: 'Referral-Logik — Compliance View',
        referralItems: {
          traceability: 'Governance Approvals Traceability',
          traceabilityNote: '100% der Approvals mit Evidenz verknüpft',
          sampling: 'Korridor-Breach Sampling',
          samplingNote: 'Stichprobe: 24 Fälle',
          completeness: 'Evidenz-Vollständigkeitsrate'
        },
        aggregationLabel: 'Evidenz-Vollständigkeit',
        slaTitle: 'SLA Buckets',
        slaLabels: { due_today: 'Heute fällig', due_48h: 'In 48h fällig', breached: 'Verletzt' },
        owners: { uw_governance: 'UW Governance', carrier_ops: 'Carrier Ops', compliance: 'Compliance' }
      }

  const logs: LogEntry[] = [
    { ts: '2026-01-27 09:22', role: 'junior', actionKey: 'referral', ruleVersion: 'v3.4', evidenceStatus: 'stale', noteKey: 'corridor_breach' },
    { ts: '2026-01-27 08:54', role: 'senior', actionKey: 'override', ruleVersion: 'v3.4', evidenceStatus: 'ok', noteKey: 'in_scope' },
    { ts: '2026-01-26 17:10', role: 'junior', actionKey: 'evidence', ruleVersion: 'v3.4', evidenceStatus: 'missing', noteKey: 'evidence_gap' },
    { ts: '2026-01-26 11:45', role: 'carrier', actionKey: 'approval', ruleVersion: 'v3.4', evidenceStatus: 'ok', noteKey: 'approval_granted' },
    { ts: '2026-01-25 15:32', role: 'compliance', actionKey: 'decision', ruleVersion: 'v3.3', evidenceStatus: 'ok', noteKey: 'in_scope' }
  ]

  const exceptions: ExceptionItem[] = [
    { id: 'EX-102', typeKey: 'corridor', statusKey: 'open', ownerKey: 'uw_governance' },
    { id: 'EX-117', typeKey: 'aggregation', statusKey: 'remediating', ownerKey: 'carrier_ops' },
    { id: 'EX-121', typeKey: 'data', statusKey: 'closed', ownerKey: 'compliance' }
  ]

  const [roleFilter, setRoleFilter] = React.useState<'all' | LogEntry['role']>('all')
  const [statusFilter, setStatusFilter] = React.useState<'all' | LogEntry['evidenceStatus']>('all')

  const filteredLogs = logs.filter((log) => {
    const roleMatch = roleFilter === 'all' || log.role === roleFilter
    const statusMatch = statusFilter === 'all' || log.evidenceStatus === statusFilter
    return roleMatch && statusMatch
  })

  const kpis = {
    decisions: logs.length,
    missingEvidence: logs.filter((log) => log.evidenceStatus !== 'ok').length,
    overrides: 0,
    breaches: 3,
    ruleChanges: 2
  }

  const slaCounts = { due_today: 4, due_48h: 6, breached: 3 }

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
          <Card title={copy.kpi.decisions} variant="glass"><strong>{kpis.decisions}</strong><MiniSparkline data={[410, 430, 452, 488, 512]} /></Card>
          <Card title={copy.kpi.missingEvidence} variant="glass"><strong>{kpis.missingEvidence}</strong><MiniSparkline data={[12, 10, 9, 11, 8]} /></Card>
          <Card title={copy.kpi.overrides} variant="glass"><strong>{kpis.overrides}</strong><MiniSparkline data={[0, 0, 0, 0, 0]} /></Card>
          <Card title={copy.kpi.breaches} variant="glass"><strong>{kpis.breaches}</strong><MiniSparkline data={[4, 3, 3, 2, 3]} /></Card>
          <Card title={copy.kpi.ruleChanges} variant="glass"><strong>{kpis.ruleChanges}</strong><MiniSparkline data={[1, 1, 2, 2, 2]} /></Card>
        </div>

        <Card title={copy.auditTitle} variant="glass" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b' }}>
              {copy.filters.role}
              <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as 'all' | LogEntry['role'])} style={{ padding: '0.4rem', borderRadius: '8px', borderColor: '#cbd5f5' }}>
                <option value="all">{copy.filters.all}</option>
                <option value="junior">{copy.roles.junior}</option>
                <option value="senior">{copy.roles.senior}</option>
                <option value="carrier">{copy.roles.carrier}</option>
                <option value="compliance">{copy.roles.compliance}</option>
              </select>
            </label>
            <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b' }}>
              {copy.filters.status}
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | LogEntry['evidenceStatus'])} style={{ padding: '0.4rem', borderRadius: '8px', borderColor: '#cbd5f5' }}>
                <option value="all">{copy.filters.all}</option>
                <option value="ok">{copy.evidence.ok}</option>
                <option value="missing">{copy.evidence.missing}</option>
                <option value="stale">{copy.evidence.stale}</option>
              </select>
            </label>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
                <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.auditCols.ts}</th>
                <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.auditCols.role}</th>
                <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.auditCols.action}</th>
                <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.auditCols.rule}</th>
                <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.auditCols.evidence}</th>
                <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.auditCols.note}</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={`${log.ts}-${log.actionKey}`}>
                  <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{log.ts}</td>
                  <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.roles[log.role]}</td>
                  <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.actions[log.actionKey]}</td>
                  <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{log.ruleVersion}</td>
                  <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.evidence[log.evidenceStatus]}</td>
                  <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.notes[log.noteKey]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <Card title={copy.governanceTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <strong>{copy.rulesetTitle}</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', color: '#475569' }}>
                  {copy.rulesetItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>{copy.lifecycleTitle}</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', color: '#475569' }}>
                  {copy.lifecycleItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>{copy.sovereigntyTitle}</strong>
                <div style={{ color: '#475569' }}>{copy.sovereigntyBody}</div>
              </div>
            </div>
          </Card>
          <Card title={copy.exceptionTitle} variant="glass" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '420px' }}>
              <thead>
                <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.exceptionCols.id}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.exceptionCols.type}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.exceptionCols.status}</th>
                  <th style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{copy.exceptionCols.owner}</th>
                </tr>
              </thead>
              <tbody>
                {exceptions.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{item.id}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.exceptionTypes[item.typeKey]}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.exceptionStatus[item.statusKey]}</td>
                    <td style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9' }}>{copy.owners[item.ownerKey]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title={copy.exportTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <Button disabled onClick={() => {}}>{copy.exportActions.audit}</Button>
              <Button disabled onClick={() => {}}>{copy.exportActions.exceptions}</Button>
              <Button disabled onClick={() => {}}>{copy.exportActions.snapshot}</Button>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{copy.exportNote}</div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <Card title={copy.referralTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><strong>{copy.referralItems.traceability}</strong><div style={{ color: '#64748b' }}>{copy.referralItems.traceabilityNote}</div></div>
              <div><strong>{copy.referralItems.sampling}</strong><div style={{ color: '#64748b' }}>{copy.referralItems.samplingNote}</div></div>
              <AggregationGauge value={96} label={copy.aggregationLabel} />
            </div>
          </Card>
          <Card title={copy.slaTitle} variant="glass">
            <SlaBucketBar counts={slaCounts} labels={copy.slaLabels} />
          </Card>
        </div>
      </div>
    </section>
  )
}
