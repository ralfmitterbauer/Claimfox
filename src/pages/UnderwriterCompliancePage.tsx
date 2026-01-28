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

const AggregationGauge = ({ value, label }: { value: number; label: string }) => (
  <div style={{ display: 'grid', gap: '0.35rem' }}>
    <div className="uw-muted">{label}</div>
    <div style={{ background: 'var(--ix-border)', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, background: value > 80 ? 'var(--ix-danger)' : 'var(--ix-primary)', height: '100%' }} />
    </div>
    <div style={{ fontSize: '0.85rem', color: '#0f172a' }}>{value}%</div>
  </div>
)

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
          ruleChanges: 'Rule version changes',
          completeness: 'Evidence completeness'
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
        owners: { uw_governance: 'UW Governance', carrier_ops: 'Carrier Ops', compliance: 'Compliance' },
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
        aggregationLabel: 'Evidence completeness'
      }
    : {
        title: 'Compliance',
        subtitle: 'Audit-Logs, Governance-Kontrollen und Nachvollziehbarkeit im Underwriting.',
        kpi: {
          decisions: 'Entscheidungen geloggt',
          missingEvidence: 'Fehlende Evidenz',
          overrides: 'Overrides ohne Begründung',
          breaches: 'SLA Breaches',
          ruleChanges: 'Rule-Version-Änderungen',
          completeness: 'Evidenz-Vollständigkeit'
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
        owners: { uw_governance: 'UW Governance', carrier_ops: 'Carrier Ops', compliance: 'Compliance' },
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
        aggregationLabel: 'Evidenz-Vollständigkeit'
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
    ruleChanges: 2,
    completeness: `${Math.round((logs.filter((log) => log.evidenceStatus === 'ok').length / logs.length) * 100)}%`
  }

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
          <Card title={copy.kpi.decisions} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.decisions}</strong><MiniBars data={[410, 430, 452, 488, 512]} /></div></Card>
          <Card title={copy.kpi.missingEvidence} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.missingEvidence}</strong><MiniBars data={[12, 10, 9, 11, 8]} /></div></Card>
          <Card title={copy.kpi.overrides} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.overrides}</strong><MiniBars data={[0, 0, 0, 0, 0]} /></div></Card>
          <Card title={copy.kpi.breaches} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.breaches}</strong><MiniBars data={[4, 3, 3, 2, 3]} /></div></Card>
          <Card title={copy.kpi.ruleChanges} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.ruleChanges}</strong><MiniBars data={[1, 1, 2, 2, 2]} /></div></Card>
          <Card title={copy.kpi.completeness} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.completeness}</strong><MiniBars data={[82, 84, 86, 88, 90]} /></div></Card>
        </div>

        <Card title={copy.auditTitle} variant="glass" className="uw-card" style={{ overflowX: 'auto' }}>
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
          <table className="uw-table" style={{ minWidth: '720px' }}>
            <thead>
              <tr>
                <th>{copy.auditCols.ts}</th>
                <th>{copy.auditCols.role}</th>
                <th>{copy.auditCols.action}</th>
                <th>{copy.auditCols.rule}</th>
                <th>{copy.auditCols.evidence}</th>
                <th>{copy.auditCols.note}</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={`${log.ts}-${log.actionKey}`}>
                  <td>{log.ts}</td>
                  <td>{copy.roles[log.role]}</td>
                  <td>{copy.actions[log.actionKey]}</td>
                  <td>{log.ruleVersion}</td>
                  <td>{copy.evidence[log.evidenceStatus]}</td>
                  <td>{copy.notes[log.noteKey]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="uw-grid uw-triplet">
          <Card title={copy.governanceTitle} variant="glass" className="uw-card">
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
                <div className="uw-muted">{copy.sovereigntyBody}</div>
              </div>
            </div>
          </Card>
          <Card title={copy.exceptionTitle} variant="glass" className="uw-card" style={{ overflowX: 'auto' }}>
            <table className="uw-table" style={{ minWidth: '420px' }}>
              <thead>
                <tr>
                  <th>{copy.exceptionCols.id}</th>
                  <th>{copy.exceptionCols.type}</th>
                  <th>{copy.exceptionCols.status}</th>
                  <th>{copy.exceptionCols.owner}</th>
                </tr>
              </thead>
              <tbody>
                {exceptions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{copy.exceptionTypes[item.typeKey]}</td>
                    <td>{copy.exceptionStatus[item.statusKey]}</td>
                    <td>{copy.owners[item.ownerKey]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title={copy.exportTitle} variant="glass" className="uw-card">
            <div className="uw-actions">
              <Button disabled onClick={() => {}}>{copy.exportActions.audit}</Button>
              <Button disabled onClick={() => {}}>{copy.exportActions.exceptions}</Button>
              <Button disabled onClick={() => {}}>{copy.exportActions.snapshot}</Button>
              <div className="uw-muted">{copy.exportNote}</div>
            </div>
          </Card>
        </div>

        <Card title={copy.referralTitle} variant="glass" className="uw-card">
          <div className="uw-chart-block">
            <div><strong>{copy.referralItems.traceability}</strong><div className="uw-muted">{copy.referralItems.traceabilityNote}</div></div>
            <div><strong>{copy.referralItems.sampling}</strong><div className="uw-muted">{copy.referralItems.samplingNote}</div></div>
            <AggregationGauge value={96} label={copy.aggregationLabel} />
          </div>
        </Card>
      </div>
    </section>
  )
}
