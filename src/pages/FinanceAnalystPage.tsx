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
  noteParams?: { amountMinor?: number; hours?: number; version?: string }
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

export default function FinanceAnalystPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Finance Analyst — Finance Dashboard',
        subtitle: 'Portfolio and performance analytics with carrier-aligned controls.',
        lastUpdated: 'Last updated: 27 Jan 2026, 15:05',
        badges: ['Audit-ready', 'HITL', 'Portfolio view'],
        kpi: {
          premium: 'Premium collected (MTD)',
          claims: 'Claims paid (MTD)',
          lossRatio: 'Loss ratio (indicative)',
          expense: 'Expense ratio (indicative)',
          open: 'Open finance decisions',
          sla: 'SLA at risk',
          exceptions: 'Exceptions open',
          recoveries: 'Reinsurance recoveries outstanding'
        },
        filters: {
          status: 'Status filter',
          sort: 'Sort by',
          sortAmount: 'Amount',
          sortSla: 'SLA due',
          sortRisk: 'Risk tier'
        },
        statusAll: 'All',
        table: {
          title: 'Decision inbox',
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
          summary: 'Performance summary',
          aiTitle: 'AI-generated decision template — requires human review',
          aiItems: ['Highlight variance drivers', 'Validate corridor thresholds', 'Propose next control action'],
          templates: 'Decision templates',
          variance: 'Variance drivers',
          split: 'Portfolio split',
          amountLabel: 'Amount',
          statusLabel: 'Status',
          rationalePlaceholder: 'Rationale / conditions'
        },
        actions: {
          approve: 'Approve analysis',
          conditions: 'Approve with conditions',
          reject: 'Reject / rework',
          evidence: 'Request evidence',
          escalate: 'Escalate',
          note: 'Add note'
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
          ok: 'ok',
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
            awaiting_note: 'Awaiting additional note',
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
        footer: 'Indicative demo data. Not a forecast. HITL: AI suggests, humans decide.'
      }
    : {
        title: 'Finance Analyst — Finance Dashboard',
        subtitle: 'Portfolio- und Performance-Analyse mit carrier-konformen Kontrollen.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 15:05',
        badges: ['Audit-ready', 'HITL', 'Portfolio-View'],
        kpi: {
          premium: 'Prämien vereinnahmt (MTD)',
          claims: 'Schäden gezahlt (MTD)',
          lossRatio: 'Loss Ratio (indikativ)',
          expense: 'Expense Ratio (indikativ)',
          open: 'Offene Finance-Entscheidungen',
          sla: 'SLA gefährdet',
          exceptions: 'Offene Exceptions',
          recoveries: 'Ausstehende Rückversicherungs-Recoveries'
        },
        filters: {
          status: 'Status-Filter',
          sort: 'Sortieren nach',
          sortAmount: 'Betrag',
          sortSla: 'SLA fällig',
          sortRisk: 'Risikostufe'
        },
        statusAll: 'Alle',
        table: {
          title: 'Decision Inbox',
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
          summary: 'Performance Summary',
          aiTitle: 'AI-Decision-Template — Human Review erforderlich',
          aiItems: ['Varianztreiber hervorheben', 'Korridor-Schwellen prüfen', 'Nächste Kontrollmaßnahme vorschlagen'],
          templates: 'Entscheidungsvorlagen',
          variance: 'Varianztreiber',
          split: 'Portfolio-Split',
          amountLabel: 'Betrag',
          statusLabel: 'Status',
          rationalePlaceholder: 'Begründung / Auflagen'
        },
        actions: {
          approve: 'Analyse freigeben',
          conditions: 'Freigabe mit Auflagen',
          reject: 'Ablehnen / Rework',
          evidence: 'Evidenz anfordern',
          escalate: 'Eskalieren',
          note: 'Notiz hinzufügen'
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
          ok: 'ok',
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
            awaiting_note: 'Zusätzliche Notiz ausstehend',
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
        footer: 'Indikative Demo-Daten. Keine Finanzprognose. HITL: KI schlägt vor, Menschen entscheiden.'
      }

  const cases: DecisionCase[] = [
    {
      id: 'FA-2041',
      type: 'exception',
      portfolio: 'Fleet Germany',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 9150000,
      currency: 'EUR',
      dueAt: '2026-01-30T12:00:00Z',
      slaDueAt: '2026-01-27T16:00:00Z',
      riskTier: 'medium',
      status: 'in_review',
      recommendation: 'approve_with_conditions',
      breach: [{ kind: 'threshold', severity: 'med', note: 'Loss ratio corridor breach' }],
      tags: ['variance', 'corridor'],
      evidence: {
        completeness: 86,
        freshnessHours: 5,
        missing: ['Broker variance memo'],
        sources: [
          { name: 'Claims ledger', status: 'ok' },
          { name: 'Premium bordereaux', status: 'ok' },
          { name: 'Broker memo', status: 'missing', note: 'Variance explanation pending' }
        ]
      },
      governance: {
        ruleVersion: 'PERF-3.2',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Controller'],
        approvalsDone: ['Finance Analyst']
      }
    },
    {
      id: 'FA-2042',
      type: 'exception',
      portfolio: 'Cargo EU',
      counterparty: 'Northbridge Logistics',
      amountMinor: 6720000,
      currency: 'EUR',
      dueAt: '2026-02-02T12:00:00Z',
      slaDueAt: '2026-01-28T11:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['expense', 'drift'],
      evidence: {
        completeness: 91,
        freshnessHours: 8,
        missing: [],
        sources: [
          { name: 'Expense ledger', status: 'ok' },
          { name: 'Commission schedule', status: 'ok' }
        ]
      },
      governance: {
        ruleVersion: 'PERF-3.1',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Analyst'],
        approvalsDone: []
      }
    },
    {
      id: 'FA-2043',
      type: 'limit',
      portfolio: 'Carrier Liability',
      counterparty: 'Bluegate Haulage',
      amountMinor: 12840000,
      currency: 'EUR',
      dueAt: '2026-01-31T12:00:00Z',
      slaDueAt: '2026-01-27T09:00:00Z',
      riskTier: 'high',
      status: 'escalated',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', note: 'Concentration exceeds limit' }],
      tags: ['aggregation', 'limit'],
      evidence: {
        completeness: 72,
        freshnessHours: 24,
        missing: ['Aggregation report'],
        sources: [
          { name: 'Exposure snapshot', status: 'ok' },
          { name: 'Aggregation report', status: 'missing' }
        ]
      },
      governance: {
        ruleVersion: 'CAP-4.0',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Controller', 'CFO'],
        approvalsDone: ['Finance Analyst']
      }
    },
    {
      id: 'FA-2044',
      type: 'payment',
      portfolio: 'Fleet Nordics',
      counterparty: 'Polar Hauliers',
      amountMinor: 4890000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-29T12:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['payment', 'outlier'],
      evidence: {
        completeness: 94,
        freshnessHours: 6,
        missing: [],
        sources: [
          { name: 'Payment ledger', status: 'ok' },
          { name: 'Claims summary', status: 'ok' }
        ]
      },
      governance: {
        ruleVersion: 'PAY-2.4',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Analyst'],
        approvalsDone: []
      }
    },
    {
      id: 'FA-2045',
      type: 'exception',
      portfolio: 'Cargo UK',
      counterparty: 'Vector Freight',
      amountMinor: 7520000,
      currency: 'EUR',
      dueAt: '2026-02-04T12:00:00Z',
      slaDueAt: '2026-01-30T10:00:00Z',
      riskTier: 'medium',
      status: 'needs_evidence',
      recommendation: 'approve_with_conditions',
      tags: ['variance', 'evidence'],
      evidence: {
        completeness: 68,
        freshnessHours: 36,
        missing: ['Variance memo', 'Broker note'],
        sources: [
          { name: 'Loss report', status: 'stale', note: 'Updated 36h ago' },
          { name: 'Broker note', status: 'missing' }
        ]
      },
      governance: {
        ruleVersion: 'PERF-3.0',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Analyst'],
        approvalsDone: []
      }
    },
    {
      id: 'FA-2046',
      type: 'close',
      portfolio: 'Fleet Iberia',
      counterparty: 'Roadline Iberia',
      amountMinor: 3550000,
      currency: 'EUR',
      dueAt: '2026-02-01T12:00:00Z',
      slaDueAt: '2026-01-29T08:30:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['close', 'month-end'],
      evidence: {
        completeness: 90,
        freshnessHours: 10,
        missing: [],
        sources: [
          { name: 'Close checklist', status: 'ok' },
          { name: 'Journal entries', status: 'ok' }
        ]
      },
      governance: {
        ruleVersion: 'CLOSE-1.8',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Analyst'],
        approvalsDone: []
      }
    },
    {
      id: 'FA-2047',
      type: 'exception',
      portfolio: 'Carrier Liability',
      counterparty: 'Cobalt Transport',
      amountMinor: 10440000,
      currency: 'EUR',
      dueAt: '2026-02-05T12:00:00Z',
      slaDueAt: '2026-01-29T16:00:00Z',
      riskTier: 'high',
      status: 'in_review',
      recommendation: 'escalate',
      breach: [{ kind: 'data', severity: 'med', note: 'Outlier claim severity' }],
      tags: ['outlier', 'severity'],
      evidence: {
        completeness: 80,
        freshnessHours: 18,
        missing: ['Severity rationale'],
        sources: [
          { name: 'Claims summary', status: 'ok' },
          { name: 'Severity rationale', status: 'missing' }
        ]
      },
      governance: {
        ruleVersion: 'RISK-3.4',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Controller'],
        approvalsDone: ['Finance Analyst']
      }
    },
    {
      id: 'FA-2048',
      type: 'exception',
      portfolio: 'Fleet DACH',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 6120000,
      currency: 'EUR',
      dueAt: '2026-02-02T12:00:00Z',
      slaDueAt: '2026-01-28T15:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['expense', 'ratio'],
      evidence: {
        completeness: 88,
        freshnessHours: 9,
        missing: [],
        sources: [
          { name: 'Expense ledger', status: 'ok' },
          { name: 'Commission schedule', status: 'ok' }
        ]
      },
      governance: {
        ruleVersion: 'PERF-3.2',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Analyst'],
        approvalsDone: []
      }
    },
    {
      id: 'FA-2049',
      type: 'payment',
      portfolio: 'Cargo EEA',
      counterparty: 'Swift Cargo Europe',
      amountMinor: 2460000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-28T13:00:00Z',
      riskTier: 'low',
      status: 'approved',
      recommendation: 'approve',
      tags: ['payment'],
      evidence: {
        completeness: 96,
        freshnessHours: 4,
        missing: [],
        sources: [
          { name: 'Payment ledger', status: 'ok' },
          { name: 'Claims summary', status: 'ok' }
        ]
      },
      governance: {
        ruleVersion: 'PAY-2.4',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Analyst'],
        approvalsDone: ['Finance Analyst']
      }
    },
    {
      id: 'FA-2050',
      type: 'limit',
      portfolio: 'Fleet UK',
      counterparty: 'Harbor Fleet UK',
      amountMinor: 13750000,
      currency: 'EUR',
      dueAt: '2026-02-06T12:00:00Z',
      slaDueAt: '2026-01-30T09:30:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'escalate',
      breach: [{ kind: 'threshold', severity: 'high', note: 'Capital allocation threshold breached' }],
      tags: ['capital', 'threshold'],
      evidence: {
        completeness: 79,
        freshnessHours: 22,
        missing: ['Capital allocation note'],
        sources: [
          { name: 'Capital pack', status: 'stale', note: 'Updated 22h ago' },
          { name: 'Allocation note', status: 'missing' }
        ]
      },
      governance: {
        ruleVersion: 'CAP-4.0',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Controller', 'CFO'],
        approvalsDone: []
      }
    },
    {
      id: 'FA-2051',
      type: 'exception',
      portfolio: 'Cargo Benelux',
      counterparty: 'Meridian Freight',
      amountMinor: 5800000,
      currency: 'EUR',
      dueAt: '2026-02-05T12:00:00Z',
      slaDueAt: '2026-01-30T14:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['drift', 'variance'],
      evidence: {
        completeness: 84,
        freshnessHours: 12,
        missing: ['Variance note'],
        sources: [
          { name: 'Variance pack', status: 'ok' },
          { name: 'Variance note', status: 'missing' }
        ]
      },
      governance: {
        ruleVersion: 'PERF-3.1',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Analyst'],
        approvalsDone: []
      }
    },
    {
      id: 'FA-2052',
      type: 'exception',
      portfolio: 'Fleet France',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 4200000,
      currency: 'EUR',
      dueAt: '2026-02-01T12:00:00Z',
      slaDueAt: '2026-01-28T09:30:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['ratio', 'monitor'],
      evidence: {
        completeness: 93,
        freshnessHours: 7,
        missing: [],
        sources: [
          { name: 'Loss ratio pack', status: 'ok' }
        ]
      },
      governance: {
        ruleVersion: 'PERF-3.2',
        policyVersion: 'FIN-2.6',
        approvalsRequired: ['Finance Analyst'],
        approvalsDone: []
      }
    }
  ]

  const auditLogs: AuditLog[] = [
    { ts: '2026-01-27T14:40:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'ai_viewed', entityId: 'FA-2041', ruleVersion: 'PERF-3.2', evidenceStatus: 'Partial', noteKey: 'awaiting_note' },
    { ts: '2026-01-27T14:32:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'ai_template_applied', entityId: 'FA-2043', ruleVersion: 'CAP-4.0', evidenceStatus: 'Missing', noteKey: 'threshold_breach' },
    { ts: '2026-01-27T14:20:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'human_override', entityId: 'FA-2045', ruleVersion: 'PERF-3.0', evidenceStatus: 'Missing', noteKey: 'missing_doc' },
    { ts: '2026-01-27T14:10:00Z', actor: 'System', role: 'Analytics', actionKey: 'alert', entityId: 'FA-2044', ruleVersion: 'PAY-2.4', evidenceStatus: 'OK', noteKey: 'evidence_ok' },
    { ts: '2026-01-27T14:05:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'approved', entityId: 'FA-2049', ruleVersion: 'PAY-2.4', evidenceStatus: 'OK', noteKey: 'evidence_ok' },
    { ts: '2026-01-27T13:58:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'flagged', entityId: 'FA-2050', ruleVersion: 'CAP-4.0', evidenceStatus: 'Partial', noteKey: 'threshold_breach' },
    { ts: '2026-01-27T13:50:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'updated', entityId: 'FA-2051', ruleVersion: 'PERF-3.1', evidenceStatus: 'Partial', noteKey: 'evidence_partial' },
    { ts: '2026-01-27T13:40:00Z', actor: 'System', role: 'Analytics', actionKey: 'alert', entityId: 'FA-2041', ruleVersion: 'PERF-3.2', evidenceStatus: 'Partial', noteKey: 'evidence_partial' },
    { ts: '2026-01-27T13:32:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'updated', entityId: 'FA-2042', ruleVersion: 'PERF-3.1', evidenceStatus: 'OK', noteKey: 'evidence_ok' },
    { ts: '2026-01-27T13:20:00Z', actor: 'System', role: 'Analytics', actionKey: 'alert', entityId: 'FA-2048', ruleVersion: 'PERF-3.2', evidenceStatus: 'OK', noteKey: 'evidence_ok' },
    { ts: '2026-01-27T13:10:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'updated', entityId: 'FA-2046', ruleVersion: 'CLOSE-1.8', evidenceStatus: 'OK', noteKey: 'evidence_ok' },
    { ts: '2026-01-27T12:58:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'flagged', entityId: 'FA-2047', ruleVersion: 'RISK-3.4', evidenceStatus: 'Missing', noteKey: 'evidence_missing' },
    { ts: '2026-01-27T12:48:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'updated', entityId: 'FA-2052', ruleVersion: 'PERF-3.2', evidenceStatus: 'OK', noteKey: 'evidence_ok' },
    { ts: '2026-01-27T12:40:00Z', actor: 'System', role: 'Analytics', actionKey: 'alert', entityId: 'FA-2042', ruleVersion: 'PERF-3.1', evidenceStatus: 'OK', noteKey: 'evidence_ok' },
    { ts: '2026-01-27T12:28:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'escalated', entityId: 'FA-2043', ruleVersion: 'CAP-4.0', evidenceStatus: 'Missing', noteKey: 'evidence_missing' },
    { ts: '2026-01-27T12:12:00Z', actor: 'System', role: 'Analytics', actionKey: 'alert', entityId: 'FA-2050', ruleVersion: 'CAP-4.0', evidenceStatus: 'Partial', noteKey: 'evidence_partial' },
    { ts: '2026-01-27T11:58:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'updated', entityId: 'FA-2047', ruleVersion: 'RISK-3.4', evidenceStatus: 'Partial', noteKey: 'evidence_partial' },
    { ts: '2026-01-27T11:40:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'policy_sync', entityId: 'FIN-2.6', ruleVersion: 'PERF-3.2', evidenceStatus: 'OK', noteKey: 'policy_sync', noteParams: { version: 'FIN-2.6' } },
    { ts: '2026-01-27T11:18:00Z', actor: 'F. Keller', role: 'Finance Analyst', actionKey: 'updated', entityId: 'FA-2041', ruleVersion: 'PERF-3.2', evidenceStatus: 'Partial', noteKey: 'evidence_partial' },
    { ts: '2026-01-27T11:05:00Z', actor: 'System', role: 'Analytics', actionKey: 'sla_started', entityId: 'FA-2041', ruleVersion: 'PERF-3.2', evidenceStatus: 'Partial', noteKey: 'evidence_partial' }
  ]

  const [statusFilter, setStatusFilter] = React.useState<'all' | DecisionCase['status']>('all')
  const [sortKey, setSortKey] = React.useState<'amount' | 'sla' | 'risk'>('sla')
  const [selectedId, setSelectedId] = React.useState(cases[0]?.id)
  const [decisionTemplate, setDecisionTemplate] = React.useState<'approve' | 'approve_with_conditions' | 'reject'>('approve')
  const [note, setNote] = React.useState('')

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
    const open = cases.filter((item) => item.status === 'open' || item.status === 'in_review').length
    const slaRisk = cases.filter((item) => new Date(item.slaDueAt).getTime() < new Date('2026-01-28T12:00:00Z').getTime()).length
    const exceptions = cases.filter((item) => item.type === 'exception').length
    const recoveries = cases.filter((item) => item.type === 'recovery').length
    return {
      premium: formatMoney(235000000, lang),
      claims: formatMoney(41200000, lang),
      lossRatio: '64.8%',
      expense: '21.4%',
      open,
      slaRisk,
      exceptions,
      recoveries
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
          <Card title={copy.kpi.premium} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.premium}</strong></div></Card>
          <Card title={copy.kpi.claims} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.claims}</strong></div></Card>
          <Card title={copy.kpi.lossRatio} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.lossRatio}</strong></div></Card>
          <Card title={copy.kpi.expense} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.expense}</strong></div></Card>
          <Card title={copy.kpi.open} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.open}</strong></div></Card>
          <Card title={copy.kpi.sla} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.slaRisk}</strong></div></Card>
          <Card title={copy.kpi.exceptions} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.exceptions}</strong></div></Card>
          <Card title={copy.kpi.recoveries} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.recoveries}</strong></div></Card>
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
                  <textarea
                    aria-label={copy.snapshot.rationalePlaceholder}
                    placeholder={copy.snapshot.rationalePlaceholder}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="uw-actions">
                <Button onClick={() => {}}>{copy.actions.approve}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.evidence}</Button>
                <Button variant="secondary" onClick={() => {}}>{copy.actions.escalate}</Button>
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
              <span className="uw-muted">{copy.slaPanel.sod}: {copy.slaPanel.ok}</span>
              <span className="uw-muted">{copy.slaPanel.threshold}: 2 {copy.slaPanel.pending}</span>
              <span className="uw-muted">{copy.slaPanel.exception}: 1 {copy.slaPanel.active}</span>
            </div>
          </Card>
          <Card title={copy.audit.rulesTitle} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>PERF-3.2 / FIN-2.6</strong>
              <span className="uw-muted">{copy.audit.effectiveFrom} {formatDate('2026-01-01T00:00:00Z', lang)}</span>
            </div>
          </Card>
          <Card title={copy.audit.evidenceTitle} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.audit.hashLabel}: 7f3b...92a1</strong>
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
