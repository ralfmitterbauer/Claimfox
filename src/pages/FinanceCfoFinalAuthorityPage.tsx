import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'
import '@/styles/underwriter-premium.css'

type DecisionCase = {
  id: string
  type: 'invoice' | 'payment' | 'reserve' | 'cession' | 'recovery' | 'close' | 'exception' | 'limit'
  portfolio: string
  counterparty: string
  amountMinor: number
  currency: 'EUR' | 'USD'
  dueAt: string
  slaDueAt: string
  riskTier: 'low' | 'medium' | 'high'
  status: 'open' | 'in_review' | 'approved' | 'rejected' | 'escalated' | 'needs_evidence'
  recommendation: 'approve' | 'approve_with_conditions' | 'reject' | 'escalate'
  breach?: { kind: 'sla' | 'threshold' | 'sod' | 'policy' | 'data'; severity: 'low' | 'med' | 'high'; note?: string; noteKey?: AuditNoteKey }[]
  tags: string[]
  evidence: {
    completeness: number
    freshnessHours: number
    missing: string[]
    sources: { name: string; status: 'ok' | 'missing' | 'stale'; note?: string; noteKey?: AuditNoteKey }[]
  }
  governance: { ruleVersion: string; policyVersion: string; approvalsRequired: string[]; approvalsDone: string[] }
}

type AuditActionKey = 'case_opened' | 'evidence_requested' | 'approved' | 'escalated' | 'flagged' | 'alert' | 'updated' | 'policy_sync' | 'sla_started' | 'ai_viewed' | 'ai_template_applied' | 'human_override'
type AuditNoteKey = 'awaiting_note' | 'missing_doc' | 'threshold_breach' | 'policy_sync' | 'evidence_partial' | 'evidence_missing' | 'evidence_ok'

type AuditLog = {
  ts: string
  actor: string
  role: string
  actionKey: AuditActionKey
  entityId: string
  ruleVersion: string
  evidenceStatus: string
  noteKey?: AuditNoteKey
  noteParams?: { version?: string }
}

const formatMoney = (amountMinor: number, lang: string) => {
  const value = amountMinor / 100
  const locale = lang === 'en' ? 'en-US' : 'de-DE'
  const currency = lang === 'en' ? 'USD' : 'EUR'
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}

const formatDate = (iso: string, lang: string) => {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(iso))
}

const formatSla = (iso: string, lang: string) => {
  const now = new Date('2026-01-27T12:00:00Z').getTime()
  const due = new Date(iso).getTime()
  const diffHours = Math.round((due - now) / (1000 * 60 * 60))
  if (diffHours < 0) {
    const days = Math.abs(Math.round(diffHours / 24))
    return lang === 'en' ? `breach ${days}d` : `Verstoß ${days}T`
  }
  if (diffHours <= 24) return lang === 'en' ? `due in ${diffHours}h` : `fällig in ${diffHours}h`
  const days = Math.round(diffHours / 24)
  return lang === 'en' ? `due in ${days}d` : `fällig in ${days}T`
}

const statusLabel = (status: DecisionCase['status'], lang: string) => {
  const mapEn: Record<DecisionCase['status'], string> = {
    open: 'Open',
    in_review: 'In review',
    approved: 'Approved',
    rejected: 'Rejected',
    escalated: 'Escalated',
    needs_evidence: 'Needs evidence'
  }
  const mapDe: Record<DecisionCase['status'], string> = {
    open: 'Offen',
    in_review: 'In Prüfung',
    approved: 'Freigegeben',
    rejected: 'Abgelehnt',
    escalated: 'Eskaliert',
    needs_evidence: 'Evidenz fehlt'
  }
  return lang === 'en' ? mapEn[status] : mapDe[status]
}

const typeLabel = (type: DecisionCase['type'], lang: string) => {
  const mapEn: Record<DecisionCase['type'], string> = {
    invoice: 'Invoice',
    payment: 'Payment',
    reserve: 'Reserve',
    cession: 'Cession',
    recovery: 'Recovery',
    close: 'Close',
    exception: 'Exception',
    limit: 'Limit'
  }
  const mapDe: Record<DecisionCase['type'], string> = {
    invoice: 'Rechnung',
    payment: 'Zahlung',
    reserve: 'Reserve',
    cession: 'Zession',
    recovery: 'Recovery',
    close: 'Close',
    exception: 'Exception',
    limit: 'Limit'
  }
  return lang === 'en' ? mapEn[type] : mapDe[type]
}

const riskLabel = (risk: DecisionCase['riskTier'], lang: string) => {
  const mapEn = { low: 'Low', medium: 'Medium', high: 'High' }
  const mapDe = { low: 'Niedrig', medium: 'Mittel', high: 'Hoch' }
  return lang === 'en' ? mapEn[risk] : mapDe[risk]
}

export default function FinanceCfoFinalAuthorityPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'CFO / Carrier Finance Final Authority — Finance Dashboard',
        subtitle: 'Final approvals, governance sign-off and carrier authority view.',
        lastUpdated: 'Last updated: 27 Jan 2026, 15:30',
        badges: ['Audit-ready', 'HITL', 'Final authority'],
        kpi: {
          pending: 'Pending final approvals',
          capital: 'Capital / capacity note (indicative)',
          cash: 'Large cash movements pending',
          exceptions: 'Exceptions requiring sign-off',
          sla: 'SLA at risk',
          audit: 'Audit readiness score'
        },
        filters: {
          status: 'Status filter',
          sort: 'Sort by',
          sortAmount: 'Amount',
          sortSla: 'SLA due',
          sortRisk: 'Risk tier'
        },
        table: {
          title: 'Final approval queue',
          id: 'Case ID',
          type: 'Case type',
          portfolio: 'Portfolio',
          counterparty: 'Counterparty',
          amount: 'Amount',
          sla: 'SLA',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision snapshot',
          summary: 'Final approval summary',
          aiTitle: 'AI-generated decision template — requires human review',
          aiItems: ['Summarize authority breaches', 'Validate SoD exceptions', 'Recommend approval conditions'],
          templates: 'Decision templates',
          conditions: 'Approval conditions',
          authorityNote: 'Carrier retains final approval authority at all times.',
          scopeNote: 'FoS / product-class scope note (informational, not legal advice).',
          amountLabel: 'Amount',
          statusLabel: 'Status',
          conditionsPlaceholder: 'Conditions for approval',
          noteLabel: 'Internal note',
          notePlaceholder: 'Add internal note'
        },
        actions: {
          approve: 'Final approve',
          conditions: 'Approve with conditions',
          reject: 'Decline',
          evidence: 'Request evidence',
          escalate: 'Escalate',
          noteKey: 'evidence_partial'
        },
        slaPanel: {
          title: 'SLA & controls',
          buckets: 'SLA buckets',
          controls: 'Control checks',
          sod: 'Segregation of duties',
          threshold: 'Threshold approvals',
          exception: 'Exception policy',
          dueToday: 'Due today',
          due48: 'Due in 48h',
          breached: 'Breached',
          pending: 'pending',
          active: 'active'
        },
        audit: {
          title: 'Audit & governance',
          logTitle: 'Audit log (immutable)',
          rulesTitle: 'Ruleset & policy version',
          evidenceTitle: 'Evidence bundle',
          logCols: ['Timestamp', 'Actor', 'Action', 'Rule', 'Evidence', 'Note'],
          actions: {
            case_opened: 'Case opened',
            evidence_requested: 'Evidence requested',
            approved: 'Approved',
            escalated: 'Escalated',
            flagged: 'Flagged',
            alert: 'Alert raised',
            updated: 'Updated',
            policy_sync: 'Policy version sync',
            sla_started: 'SLA clock started',
            ai_viewed: 'AI recommendation viewed',
            ai_template_applied: 'AI template applied',
            human_override: 'Human override recorded'
          },
          notes: {
            awaiting_note: 'evidence_partial',
            missing_doc: 'Missing documentation',
            threshold_breach: 'Threshold breach detected',
            policy_sync: 'Policy version {version} synced',
            evidence_partial: 'Evidence status: partial',
            evidence_missing: 'Evidence status: missing',
            evidence_ok: 'Evidence status: ok'
          },
          effectiveFrom: 'Effective from',
          hashLabel: 'hash'
        },
        footer: 'Indicative demo data. Not a forecast. HITL: AI suggests, humans decide.',
        statusAll: 'All'
      }
    : {
        title: 'CFO / Carrier Finance Final Authority — Finance Dashboard',
        subtitle: 'Finale Freigaben, Governance-Sign-off und Carrier-Authority-View.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 15:30',
        badges: ['Audit-ready', 'HITL', 'Final Authority'],
        kpi: {
          pending: 'Finale Freigaben offen',
          capital: 'Capital / Capacity Note (indikativ)',
          cash: 'Große Cash-Bewegungen offen',
          exceptions: 'Exceptions mit Sign-off',
          sla: 'SLA gefährdet',
          audit: 'Audit-Readiness-Score'
        },
        filters: {
          status: 'Status-Filter',
          sort: 'Sortieren nach',
          sortAmount: 'Betrag',
          sortSla: 'SLA fällig',
          sortRisk: 'Risikostufe'
        },
        table: {
          title: 'Final Approval Queue',
          id: 'Case ID',
          type: 'Case-Typ',
          portfolio: 'Portfolio',
          counterparty: 'Gegenpartei',
          amount: 'Betrag',
          sla: 'SLA',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision Snapshot',
          summary: 'Final Approval Summary',
          aiTitle: 'AI-Decision-Template — Human Review erforderlich',
          aiItems: ['Authority Breaches zusammenfassen', 'SoD-Exceptions prüfen', 'Freigabe-Auflagen empfehlen'],
          templates: 'Entscheidungsvorlagen',
          conditions: 'Freigabe-Auflagen',
          authorityNote: 'Carrier behält jederzeit die finale Freigabehoheit.',
          scopeNote: 'FoS / Product-Class Scope Hinweis (nur informativ, keine Rechtsberatung).',
          amountLabel: 'Betrag',
          statusLabel: 'Status',
          conditionsPlaceholder: 'Auflagen für die Freigabe',
          noteLabel: 'Interne Notiz',
          notePlaceholder: 'Interne Notiz hinzufügen'
        },
        actions: {
          approve: 'Final freigeben',
          conditions: 'Freigabe mit Auflagen',
          reject: 'Ablehnen',
          evidence: 'Evidenz anfordern',
          escalate: 'Eskalieren',
          noteKey: 'evidence_partial'
        },
        slaPanel: {
          title: 'SLA & Kontrollen',
          buckets: 'SLA-Buckets',
          controls: 'Kontroll-Checks',
          sod: 'Trennung von Funktionen',
          threshold: 'Threshold-Freigaben',
          exception: 'Exception-Policy',
          dueToday: 'Heute fällig',
          due48: 'In 48h fällig',
          breached: 'Verletzt',
          pending: 'offen',
          active: 'aktiv'
        },
        audit: {
          title: 'Audit & Governance',
          logTitle: 'Audit-Log (immutable)',
          rulesTitle: 'Ruleset- & Policy-Version',
          evidenceTitle: 'Evidenzpaket',
          logCols: ['Zeitstempel', 'Akteur', 'Aktion', 'Rule', 'Evidenz', 'Notiz'],
          actions: {
            case_opened: 'Case eröffnet',
            evidence_requested: 'Evidenz angefordert',
            approved: 'Freigegeben',
            escalated: 'Eskaliert',
            flagged: 'Markiert',
            alert: 'Alarm ausgelöst',
            updated: 'Aktualisiert',
            policy_sync: 'Policy-Version synchronisiert',
            sla_started: 'SLA-Uhr gestartet',
            ai_viewed: 'KI-Empfehlung angesehen',
            ai_template_applied: 'KI-Template angewendet',
            human_override: 'Manueller Override erfasst'
          },
          notes: {
            awaiting_note: 'evidence_partial',
            missing_doc: 'Dokumentation fehlt',
            threshold_breach: 'Threshold-Verstoß erkannt',
            policy_sync: 'Policy-Version {version} synchronisiert',
            evidence_partial: 'Evidenzstatus: teilweise',
            evidence_missing: 'Evidenzstatus: fehlt',
            evidence_ok: 'Evidenzstatus: ok'
          },
          effectiveFrom: 'Gültig ab',
          hashLabel: 'Hash'
        },
        footer: 'Indikative Demo-Daten. Keine Finanzprognose. HITL: KI schlägt vor, Menschen entscheiden.',
        statusAll: 'Alle'
      }

  const cases: DecisionCase[] = [
    {
      id: 'CFO-8101',
      type: 'limit',
      portfolio: 'Fleet Germany',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 22500000,
      currency: 'EUR',
      dueAt: '2026-01-28T12:00:00Z',
      slaDueAt: '2026-01-27T14:00:00Z',
      riskTier: 'high',
      status: 'in_review',
      recommendation: 'approve_with_conditions',
      breach: [{ kind: 'threshold', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['threshold', 'capital'],
      evidence: {
        completeness: 80,
        freshnessHours: 8,
        missing: ['Capital committee note'],
        sources: [
          { name: 'Capital pack', status: 'ok' },
          { name: 'Committee note', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'CAP-4.1', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: ['Finance Controller'] }
    },
    {
      id: 'CFO-8102',
      type: 'payment',
      portfolio: 'Cargo EU',
      counterparty: 'Northbridge Logistics',
      amountMinor: 14800000,
      currency: 'EUR',
      dueAt: '2026-01-29T12:00:00Z',
      slaDueAt: '2026-01-27T18:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve',
      tags: ['payment', 'large-cash'],
      evidence: {
        completeness: 90,
        freshnessHours: 10,
        missing: [],
        sources: [
          { name: 'Payment pack', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: [] }
    },
    {
      id: 'CFO-8103',
      type: 'exception',
      portfolio: 'Carrier Liability',
      counterparty: 'Bluegate Haulage',
      amountMinor: 18200000,
      currency: 'EUR',
      dueAt: '2026-01-30T12:00:00Z',
      slaDueAt: '2026-01-28T10:00:00Z',
      riskTier: 'high',
      status: 'escalated',
      recommendation: 'escalate',
      breach: [{ kind: 'sod', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['sod', 'exception'],
      evidence: {
        completeness: 72,
        freshnessHours: 20,
        missing: ['SoD approval'],
        sources: [
          { name: 'SoD register', status: 'missing' },
          { name: 'Approval pack', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'GOV-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: ['Finance Controller'] }
    },
    {
      id: 'CFO-8104',
      type: 'exception',
      portfolio: 'Fleet Nordics',
      counterparty: 'Polar Hauliers',
      amountMinor: 16500000,
      currency: 'EUR',
      dueAt: '2026-01-31T12:00:00Z',
      slaDueAt: '2026-01-28T12:00:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'approve_with_conditions',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['write-off', 'exception'],
      evidence: {
        completeness: 76,
        freshnessHours: 18,
        missing: ['Write-off memo'],
        sources: [
          { name: 'Write-off pack', status: 'missing' },
          { name: 'Finance memo', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'GOV-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: [] }
    },
    {
      id: 'CFO-8105',
      type: 'recovery',
      portfolio: 'Cargo UK',
      counterparty: 'Swiss Re',
      amountMinor: 8800000,
      currency: 'EUR',
      dueAt: '2026-02-01T12:00:00Z',
      slaDueAt: '2026-01-28T16:00:00Z',
      riskTier: 'medium',
      status: 'needs_evidence',
      recommendation: 'approve_with_conditions',
      tags: ['recovery'],
      evidence: {
        completeness: 68,
        freshnessHours: 30,
        missing: ['Recovery calculation'],
        sources: [
          { name: 'Recovery pack', status: 'stale', noteKey: 'evidence_partial' },
          { name: 'Calculation sheet', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: [] }
    },
    {
      id: 'CFO-8106',
      type: 'payment',
      portfolio: 'Fleet Iberia',
      counterparty: 'Roadline Iberia',
      amountMinor: 9500000,
      currency: 'EUR',
      dueAt: '2026-02-02T12:00:00Z',
      slaDueAt: '2026-01-29T10:00:00Z',
      riskTier: 'medium',
      status: 'approved',
      recommendation: 'approve',
      tags: ['payment', 'large-cash'],
      evidence: {
        completeness: 95,
        freshnessHours: 6,
        missing: [],
        sources: [
          { name: 'Payment pack', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: ['CFO'] }
    },
    {
      id: 'CFO-8107',
      type: 'exception',
      portfolio: 'Cargo EEA',
      counterparty: 'Meridian Freight',
      amountMinor: 14200000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-29T15:00:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['commutation', 'exception'],
      evidence: {
        completeness: 74,
        freshnessHours: 16,
        missing: ['Commutation memo'],
        sources: [
          { name: 'Commutation pack', status: 'missing' },
          { name: 'Finance memo', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'GOV-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: [] }
    },
    {
      id: 'CFO-8108',
      type: 'limit',
      portfolio: 'Fleet UK',
      counterparty: 'Harbor Fleet UK',
      amountMinor: 19800000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-29T18:00:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['limit', 'capital'],
      evidence: {
        completeness: 79,
        freshnessHours: 14,
        missing: ['Capital allocation note'],
        sources: [
          { name: 'Capital pack', status: 'ok' },
          { name: 'Allocation note', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'CAP-4.1', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: [] }
    },
    {
      id: 'CFO-8109',
      type: 'exception',
      portfolio: 'Cargo Benelux',
      counterparty: 'Swift Cargo Europe',
      amountMinor: 11600000,
      currency: 'EUR',
      dueAt: '2026-02-04T12:00:00Z',
      slaDueAt: '2026-01-30T09:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['exception'],
      evidence: {
        completeness: 82,
        freshnessHours: 12,
        missing: ['Approval memo'],
        sources: [
          { name: 'Approval pack', status: 'ok' },
          { name: 'Approval memo', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GOV-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: [] }
    },
    {
      id: 'CFO-8110',
      type: 'payment',
      portfolio: 'Fleet France',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 13800000,
      currency: 'EUR',
      dueAt: '2026-02-04T12:00:00Z',
      slaDueAt: '2026-01-30T12:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve',
      tags: ['payment', 'large-cash'],
      evidence: {
        completeness: 90,
        freshnessHours: 9,
        missing: [],
        sources: [
          { name: 'Payment pack', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: [] }
    },
    {
      id: 'CFO-8111',
      type: 'limit',
      portfolio: 'Cargo Nordics',
      counterparty: 'Polar Hauliers',
      amountMinor: 20400000,
      currency: 'EUR',
      dueAt: '2026-02-05T12:00:00Z',
      slaDueAt: '2026-01-30T15:00:00Z',
      riskTier: 'high',
      status: 'in_review',
      recommendation: 'approve_with_conditions',
      breach: [{ kind: 'threshold', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['limit', 'capital'],
      evidence: {
        completeness: 77,
        freshnessHours: 18,
        missing: ['Capital committee note'],
        sources: [
          { name: 'Capital pack', status: 'ok' },
          { name: 'Committee note', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'CAP-4.1', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: ['Finance Controller'] }
    },
    {
      id: 'CFO-8112',
      type: 'exception',
      portfolio: 'Fleet Benelux',
      counterparty: 'Meridian Freight',
      amountMinor: 13200000,
      currency: 'EUR',
      dueAt: '2026-02-06T12:00:00Z',
      slaDueAt: '2026-01-31T10:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['exception'],
      evidence: {
        completeness: 84,
        freshnessHours: 26,
        missing: ['Exception memo'],
        sources: [
          { name: 'Exception pack', status: 'ok' },
          { name: 'Memo', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GOV-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['CFO'], approvalsDone: [] }
    }
  ]

  const auditLogs: AuditLog[] = [
    { ts: '2026-01-27T14:50:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'ai_viewed', entityId: 'CFO-8101', ruleVersion: 'CAP-4.1', evidenceStatus: 'Partial', noteKey: 'evidence_partial' },
    { ts: '2026-01-27T14:36:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'ai_template_applied', entityId: 'CFO-8103', ruleVersion: 'GOV-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T14:22:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'human_override', entityId: 'CFO-8104', ruleVersion: 'GOV-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T14:08:00Z', actor: 'System', role: 'Payments', actionKey: 'updated', entityId: 'CFO-8102', ruleVersion: 'PAY-3.3', evidenceStatus: 'OK' },
    { ts: '2026-01-27T13:56:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'updated', entityId: 'CFO-8106', ruleVersion: 'PAY-3.3', evidenceStatus: 'OK' },
    { ts: '2026-01-27T13:44:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'updated', entityId: 'CFO-8107', ruleVersion: 'GOV-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T13:30:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'updated', entityId: 'CFO-8108', ruleVersion: 'CAP-4.1', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T13:18:00Z', actor: 'System', role: 'Controls', actionKey: 'updated', entityId: 'CFO-8109', ruleVersion: 'GOV-3.0', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T13:06:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'updated', entityId: 'CFO-8112', ruleVersion: 'GOV-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T12:54:00Z', actor: 'System', role: 'Controls', actionKey: 'updated', entityId: 'CFO-8111', ruleVersion: 'CAP-4.1', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T12:42:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'updated', entityId: 'CFO-8105', ruleVersion: 'RE-3.2', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T12:30:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'updated', entityId: 'FIN-2.6', ruleVersion: 'GOV-3.0', evidenceStatus: 'OK' },
    { ts: '2026-01-27T12:18:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'updated', entityId: 'CFO-8101', ruleVersion: 'CAP-4.1', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T12:06:00Z', actor: 'System', role: 'Controls', actionKey: 'updated', entityId: 'CFO-8103', ruleVersion: 'GOV-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T11:54:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'updated', entityId: 'CFO-8102', ruleVersion: 'PAY-3.3', evidenceStatus: 'OK' },
    { ts: '2026-01-27T11:42:00Z', actor: 'System', role: 'Controls', actionKey: 'updated', entityId: 'CFO-8101', ruleVersion: 'CAP-4.1', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T11:30:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'updated', entityId: 'CFO-8104', ruleVersion: 'GOV-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T11:18:00Z', actor: 'System', role: 'Controls', actionKey: 'updated', entityId: 'CFO-8111', ruleVersion: 'CAP-4.1', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T11:06:00Z', actor: 'CFO Office', role: 'CFO', actionKey: 'updated', entityId: 'CFO-8109', ruleVersion: 'GOV-3.0', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T10:54:00Z', actor: 'System', role: 'Controls', actionKey: 'updated', entityId: 'CFO-8108', ruleVersion: 'CAP-4.1', evidenceStatus: 'Missing' }
  ]

  const [statusFilter, setStatusFilter] = React.useState<'all' | DecisionCase['status']>('all')
  const [sortKey, setSortKey] = React.useState<'amount' | 'sla' | 'risk'>('sla')
  const [selectedId, setSelectedId] = React.useState(cases[0]?.id)
  const [decisionTemplate, setDecisionTemplate] = React.useState<'approve' | 'approve_with_conditions' | 'reject'>('approve')
  const [note, setNote] = React.useState('')
  const [conditions, setConditions] = React.useState('')

  const filteredCases = React.useMemo(() => {
    const base = statusFilter === 'all' ? cases : cases.filter((item) => item.status === statusFilter)
    const sorted = [...base].sort((a, b) => {
      if (sortKey === 'amount') return b.amountMinor - a.amountMinor
      if (sortKey === 'risk') return a.riskTier.localeCompare(b.riskTier)
      return new Date(a.slaDueAt).getTime() - new Date(b.slaDueAt).getTime()
    })
    return sorted
  }, [statusFilter, sortKey, cases])

  const selected = filteredCases.find((item) => item.id === selectedId) || cases[0]

  const kpis = React.useMemo(() => {
    const pending = cases.filter((item) => item.status === 'open' || item.status === 'in_review').length
    const cash = cases.filter((item) => item.tags.includes('large-cash')).length
    const exceptions = cases.filter((item) => item.tags.includes('exception') || item.tags.includes('sod')).length
    const slaRisk = cases.filter((item) => new Date(item.slaDueAt).getTime() < new Date('2026-01-28T12:00:00Z').getTime()).length
    const auditScore = Math.round(cases.reduce((sum, item) => sum + item.evidence.completeness, 0) / cases.length)
    return {
      pending,
      capital: lang === 'en' ? 'Capital ratio 118% (indicative)' : 'Kapitalquote 118% (indikativ)',
      cash,
      exceptions,
      slaRisk,
      auditScore: `${auditScore}%`
    }
  }, [cases, lang])

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
        <div className="uw-panel" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {copy.badges.map((badge) => (
              <span key={badge} className="uw-badge">{badge}</span>
            ))}
          </div>
          <span className="uw-muted">{copy.lastUpdated}</span>
        </div>

        <div className="uw-grid uw-kpi">
          <Card title={copy.kpi.pending} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.pending}</strong></div></Card>
          <Card title={copy.kpi.capital} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.capital}</strong></div></Card>
          <Card title={copy.kpi.cash} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.cash}</strong></div></Card>
          <Card title={copy.kpi.exceptions} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.exceptions}</strong></div></Card>
          <Card title={copy.kpi.sla} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.slaRisk}</strong></div></Card>
          <Card title={copy.kpi.audit} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.auditScore}</strong></div></Card>
        </div>

        <div className="uw-grid uw-split">
          <Card title={copy.table.title} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <label className="uw-muted">
                  {copy.filters.status}
                  <select
                    aria-label={copy.filters.status}
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <option value="all">{copy.statusAll}</option>
                    <option value="open">{statusLabel('open', lang)}</option>
                    <option value="in_review">{statusLabel('in_review', lang)}</option>
                    <option value="escalated">{statusLabel('escalated', lang)}</option>
                    <option value="needs_evidence">{statusLabel('needs_evidence', lang)}</option>
                    <option value="approved">{statusLabel('approved', lang)}</option>
                    <option value="rejected">{statusLabel('rejected', lang)}</option>
                  </select>
                </label>
                <label className="uw-muted">
                  {copy.filters.sort}
                  <select
                    aria-label={copy.filters.sort}
                    value={sortKey}
                    onChange={(event) => setSortKey(event.target.value as typeof sortKey)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <option value="sla">{copy.filters.sortSla}</option>
                    <option value="amount">{copy.filters.sortAmount}</option>
                    <option value="risk">{copy.filters.sortRisk}</option>
                  </select>
                </label>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="uw-table" aria-label={copy.table.title}>
                  <thead>
                    <tr>
                      <th>{copy.table.id}</th>
                      <th>{copy.table.type}</th>
                      <th>{copy.table.portfolio}</th>
                      <th>{copy.table.counterparty}</th>
                      <th>{copy.table.amount}</th>
                      <th>{copy.table.sla}</th>
                      <th>{copy.table.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map((item) => (
                      <tr
                        key={item.id}
                        className={item.id === selected?.id ? 'uw-row-active' : undefined}
                        onClick={() => setSelectedId(item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{item.id}</td>
                        <td>{typeLabel(item.type, lang)}</td>
                        <td>{item.portfolio}</td>
                        <td>{item.counterparty}</td>
                        <td>{formatMoney(item.amountMinor, lang)}</td>
                        <td>{formatSla(item.slaDueAt, lang)}</td>
                        <td>{statusLabel(item.status, lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card title={copy.snapshot.title} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              <div className="uw-grid uw-cards">
                <Card title={copy.snapshot.summary} variant="glass" className="uw-card">
                  <div className="uw-card-body">
                    <strong>{selected?.portfolio}</strong>
                    <span className="uw-muted">{selected?.counterparty}</span>
                  </div>
                </Card>
                <Card title={copy.snapshot.amountLabel} variant="glass" className="uw-card">
                  <div className="uw-card-body">
                    <strong>{formatMoney(selected?.amountMinor || 0, lang)}</strong>
                    <span className="uw-muted">{formatDate(selected?.dueAt || '', lang)}</span>
                  </div>
                </Card>
                <Card title={copy.snapshot.statusLabel} variant="glass" className="uw-card">
                  <div className="uw-card-body">
                    <strong>{statusLabel(selected?.status || 'open', lang)}</strong>
                    <span className="uw-muted">{selected ? riskLabel(selected.riskTier, lang) : ''}</span>
                  </div>
                </Card>
              </div>

              <div className="uw-panel">
                <strong>{copy.snapshot.aiTitle}</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem' }}>
                  {copy.snapshot.aiItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="uw-panel">
                <strong>{copy.snapshot.templates}</strong>
                <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {(['approve', 'approve_with_conditions', 'reject'] as const).map((value) => (
                    <label key={value} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="decisionTemplate"
                        value={value}
                        checked={decisionTemplate === value}
                        onChange={() => setDecisionTemplate(value)}
                      />
                      <span>{copy.actions[value]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="uw-panel">
                <strong>{copy.snapshot.conditions}</strong>
                <textarea
                  aria-label={copy.snapshot.conditions}
                  placeholder={copy.snapshot.conditionsPlaceholder}
                  value={conditions}
                  onChange={(event) => setConditions(event.target.value)}
                  rows={3}
                />
              </div>

              <div className="uw-panel">
                <strong>{copy.snapshot.noteLabel}</strong>
                <textarea
                  aria-label={copy.snapshot.noteLabel}
                  placeholder={copy.snapshot.notePlaceholder}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={2}
                />
              </div>

              <div className="uw-panel">
                <strong>{copy.snapshot.authorityNote}</strong>
                <p className="uw-muted" style={{ marginTop: '0.4rem' }}>{copy.snapshot.scopeNote}</p>
              </div>

              <div className="uw-actions">
                <Button onClick={() => {}}>{copy.actions.approve}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.conditions}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.reject}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.note}</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-cards">
          <Card title={copy.slaPanel.title} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.slaPanel.buckets}</strong>
              <span className="uw-muted">{copy.slaPanel.dueToday}: {cases.filter((item) => new Date(item.slaDueAt).getTime() < new Date('2026-01-27T23:59:00Z').getTime()).length}</span>
              <span className="uw-muted">{copy.slaPanel.due48}: {cases.filter((item) => new Date(item.slaDueAt).getTime() < new Date('2026-01-29T12:00:00Z').getTime()).length}</span>
              <span className="uw-muted">{copy.slaPanel.breached}: {cases.filter((item) => item.status === 'escalated').length}</span>
            </div>
          </Card>
          <Card title={copy.slaPanel.controls} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <span className="uw-muted">{copy.slaPanel.sod}: 2 {copy.slaPanel.pending}</span>
              <span className="uw-muted">{copy.slaPanel.threshold}: 3 {copy.slaPanel.pending}</span>
              <span className="uw-muted">{copy.slaPanel.exception}: 2 {copy.slaPanel.active}</span>
            </div>
          </Card>
          <Card title={copy.audit.rulesTitle} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>CAP-4.1 / FIN-2.6</strong>
              <span className="uw-muted">{copy.audit.effectiveFrom} {formatDate('2026-01-02T00:00:00Z', lang)}</span>
            </div>
          </Card>
          <Card title={copy.audit.evidenceTitle} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.audit.hashLabel}: 8e7f...c21d</strong>
              <span className="uw-muted">Completeness {selected?.evidence.completeness}%</span>
            </div>
          </Card>
        </div>

        <Card title={copy.audit.title} variant="glass" className="uw-card">
          <div className="uw-card-body" style={{ gap: '0.75rem' }}>
            <strong>{copy.audit.logTitle}</strong>
            <div style={{ overflowX: 'auto' }}>
              <table className="uw-table" aria-label={copy.audit.logTitle}>
                <thead>
                  <tr>
                    {copy.audit.logCols.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.slice(0, 10).map((log) => (
                    <tr key={log.ts + log.entityId}>
                      <td>{formatDate(log.ts, lang)}</td>
                      <td>{log.actor}</td>
                      <td>{copy.audit.actions[log.actionKey]}</td>
                      <td>{log.ruleVersion}</td>
                      <td>{log.evidenceStatus}</td>
                      <td>{log.noteKey ? copy.audit.notes[log.noteKey].replace('{version}', log.noteParams?.version || '') : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <p className="uw-disclaimer">{copy.footer}</p>
      </div>
    </section>
  )
}
