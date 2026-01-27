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

export default function FinanceControllerPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Financial Controller — Finance Dashboard',
        subtitle: 'Close, GL integrity and reporting governance.',
        lastUpdated: 'Last updated: 27 Jan 2026, 15:25',
        badges: ['Audit-ready', 'HITL', 'Close control'],
        kpi: {
          close: 'Close progress',
          reconciliations: 'Reconciliations open',
          journals: 'Journal entries pending',
          suspense: 'Suspense balance',
          interco: 'Intercompany breaks',
          reporting: 'Reporting pack status',
          sla: 'SLA breaches'
        },
        filters: {
          status: 'Status filter',
          sort: 'Sort by',
          sortAmount: 'Amount',
          sortSla: 'SLA due',
          sortRisk: 'Risk tier'
        },
        table: {
          title: 'Decision inbox',
          id: 'Case ID',
          type: 'Case type',
          portfolio: 'Ledger',
          counterparty: 'Counterparty',
          amount: 'Amount',
          sla: 'SLA',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision snapshot',
          summary: 'Close item summary',
          aiTitle: 'AI-generated decision template — requires human review',
          aiItems: ['Draft closing memo', 'Highlight reconciliation break', 'Recommend policy exception handling'],
          templates: 'Decision templates',
          glImpact: 'GL impact preview',
          policy: 'Policy version note',
          amountLabel: 'Amount',
          statusLabel: 'Status',
          rationalePlaceholder: 'Rationale / conditions',
          glItems: ['Premium revenue', 'Claims expense', 'Accruals']
        },
        actions: {
          approve: 'Approve entry',
          conditions: 'Approve with conditions',
          reject: 'Reject / rework',
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
        title: 'Financial Controller — Finance Dashboard',
        subtitle: 'Close, GL-Integrität und Reporting-Governance.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 15:25',
        badges: ['Audit-ready', 'HITL', 'Close-Control'],
        kpi: {
          close: 'Close-Fortschritt',
          reconciliations: 'Offene Reconciliations',
          journals: 'Journal Entries offen',
          suspense: 'Suspense-Balance',
          interco: 'Intercompany Breaks',
          reporting: 'Reporting Pack Status',
          sla: 'SLA Breaches'
        },
        filters: {
          status: 'Status-Filter',
          sort: 'Sortieren nach',
          sortAmount: 'Betrag',
          sortSla: 'SLA fällig',
          sortRisk: 'Risikostufe'
        },
        table: {
          title: 'Decision Inbox',
          id: 'Case ID',
          type: 'Case-Typ',
          portfolio: 'Ledger',
          counterparty: 'Gegenpartei',
          amount: 'Betrag',
          sla: 'SLA',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision Snapshot',
          summary: 'Close Item Summary',
          aiTitle: 'AI-Decision-Template — Human Review erforderlich',
          aiItems: ['Closing-Memo entwerfen', 'Reconciliation-Break hervorheben', 'Policy-Exception-Vorschlag'],
          templates: 'Entscheidungsvorlagen',
          glImpact: 'GL-Impact-Preview',
          policy: 'Policy-Version-Note',
          amountLabel: 'Betrag',
          statusLabel: 'Status',
          rationalePlaceholder: 'Begründung / Auflagen',
          glItems: ['Prämienerlöse', 'Schadensaufwand', 'Abgrenzungen']
        },
        actions: {
          approve: 'Entry freigeben',
          conditions: 'Freigabe mit Auflagen',
          reject: 'Ablehnen / Rework',
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
      id: 'FC-7101',
      type: 'close',
      portfolio: 'GL Close – Fleet',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 18200000,
      currency: 'EUR',
      dueAt: '2026-01-28T12:00:00Z',
      slaDueAt: '2026-01-27T14:00:00Z',
      riskTier: 'medium',
      status: 'in_review',
      recommendation: 'approve_with_conditions',
      tags: ['close', 'reconciliation'],
      evidence: {
        completeness: 86,
        freshnessHours: 6,
        missing: ['Reconciliation memo'],
        sources: [
          { name: 'Close checklist', status: 'ok' },
          { name: 'Reconciliation memo', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'CLOSE-2.2', policyVersion: 'FIN-2.6', approvalsRequired: ['Financial Controller'], approvalsDone: ['Finance Analyst'] }
    },
    {
      id: 'FC-7102',
      type: 'exception',
      portfolio: 'GL – Cargo',
      counterparty: 'Northbridge Logistics',
      amountMinor: 9400000,
      currency: 'EUR',
      dueAt: '2026-01-29T12:00:00Z',
      slaDueAt: '2026-01-27T18:00:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['policy', 'exception'],
      evidence: {
        completeness: 70,
        freshnessHours: 20,
        missing: ['Policy exception memo'],
        sources: [
          { name: 'GL extract', status: 'ok' },
          { name: 'Policy memo', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GL-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['Financial Controller', 'CFO'], approvalsDone: [] }
    },
    {
      id: 'FC-7103',
      type: 'close',
      portfolio: 'GL Close – Liability',
      counterparty: 'Bluegate Haulage',
      amountMinor: 12400000,
      currency: 'EUR',
      dueAt: '2026-01-30T12:00:00Z',
      slaDueAt: '2026-01-28T10:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['close'],
      evidence: {
        completeness: 96,
        freshnessHours: 4,
        missing: [],
        sources: [
          { name: 'Close checklist', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'CLOSE-2.2', policyVersion: 'FIN-2.6', approvalsRequired: ['Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'FC-7104',
      type: 'exception',
      portfolio: 'GL – Fleet',
      counterparty: 'Cobalt Transport',
      amountMinor: 13600000,
      currency: 'EUR',
      dueAt: '2026-01-31T12:00:00Z',
      slaDueAt: '2026-01-28T12:00:00Z',
      riskTier: 'high',
      status: 'escalated',
      recommendation: 'escalate',
      breach: [{ kind: 'sod', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['sod', 'journal'],
      evidence: {
        completeness: 68,
        freshnessHours: 22,
        missing: ['SoD approval'],
        sources: [
          { name: 'JE pack', status: 'ok' },
          { name: 'SoD approval', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GL-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['Financial Controller'], approvalsDone: ['Finance Analyst'] }
    },
    {
      id: 'FC-7105',
      type: 'exception',
      portfolio: 'GL – Cargo',
      counterparty: 'Vector Freight',
      amountMinor: 6800000,
      currency: 'EUR',
      dueAt: '2026-02-01T12:00:00Z',
      slaDueAt: '2026-01-28T16:00:00Z',
      riskTier: 'medium',
      status: 'needs_evidence',
      recommendation: 'approve_with_conditions',
      tags: ['reconciliation'],
      evidence: {
        completeness: 72,
        freshnessHours: 30,
        missing: ['Reconciliation support'],
        sources: [
          { name: 'Reconciliation pack', status: 'stale', noteKey: 'evidence_partial' },
          { name: 'Support schedule', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GL-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'FC-7106',
      type: 'close',
      portfolio: 'GL Close – Iberia',
      counterparty: 'Roadline Iberia',
      amountMinor: 9200000,
      currency: 'EUR',
      dueAt: '2026-02-01T12:00:00Z',
      slaDueAt: '2026-01-29T10:00:00Z',
      riskTier: 'low',
      status: 'approved',
      recommendation: 'approve',
      tags: ['close'],
      evidence: {
        completeness: 98,
        freshnessHours: 5,
        missing: [],
        sources: [
          { name: 'Close checklist', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'CLOSE-2.2', policyVersion: 'FIN-2.6', approvalsRequired: ['Finance Analyst'], approvalsDone: ['Finance Analyst'] }
    },
    {
      id: 'FC-7107',
      type: 'exception',
      portfolio: 'GL – EEA',
      counterparty: 'Meridian Freight',
      amountMinor: 11800000,
      currency: 'EUR',
      dueAt: '2026-02-02T12:00:00Z',
      slaDueAt: '2026-01-29T15:00:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'escalate',
      breach: [{ kind: 'threshold', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['intercompany', 'break'],
      evidence: {
        completeness: 78,
        freshnessHours: 16,
        missing: ['Intercompany confirmation'],
        sources: [
          { name: 'Intercompany report', status: 'ok' },
          { name: 'Confirmation', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GL-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['Financial Controller'], approvalsDone: [] }
    },
    {
      id: 'FC-7108',
      type: 'close',
      portfolio: 'GL Close – UK',
      counterparty: 'Harbor Fleet UK',
      amountMinor: 7400000,
      currency: 'EUR',
      dueAt: '2026-02-02T12:00:00Z',
      slaDueAt: '2026-01-29T18:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['close'],
      evidence: {
        completeness: 93,
        freshnessHours: 7,
        missing: [],
        sources: [
          { name: 'Close checklist', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'CLOSE-2.2', policyVersion: 'FIN-2.6', approvalsRequired: ['Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'FC-7109',
      type: 'exception',
      portfolio: 'GL – Benelux',
      counterparty: 'Swift Cargo Europe',
      amountMinor: 8200000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-30T09:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['reconciliation'],
      evidence: {
        completeness: 80,
        freshnessHours: 14,
        missing: ['Reconciliation memo'],
        sources: [
          { name: 'Reconciliation pack', status: 'ok' },
          { name: 'Memo', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GL-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'FC-7110',
      type: 'exception',
      portfolio: 'GL – France',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 12800000,
      currency: 'EUR',
      dueAt: '2026-02-04T12:00:00Z',
      slaDueAt: '2026-01-30T12:00:00Z',
      riskTier: 'high',
      status: 'in_review',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['policy'],
      evidence: {
        completeness: 74,
        freshnessHours: 20,
        missing: ['Policy deviation memo'],
        sources: [
          { name: 'GL extract', status: 'ok' },
          { name: 'Deviation memo', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GL-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['Financial Controller', 'CFO'], approvalsDone: ['Finance Analyst'] }
    },
    {
      id: 'FC-7111',
      type: 'close',
      portfolio: 'GL Close – Nordics',
      counterparty: 'Polar Hauliers',
      amountMinor: 7100000,
      currency: 'EUR',
      dueAt: '2026-02-04T12:00:00Z',
      slaDueAt: '2026-01-30T15:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['close'],
      evidence: {
        completeness: 95,
        freshnessHours: 9,
        missing: [],
        sources: [
          { name: 'Close checklist', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'CLOSE-2.2', policyVersion: 'FIN-2.6', approvalsRequired: ['Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'FC-7112',
      type: 'exception',
      portfolio: 'GL – Benelux',
      counterparty: 'Meridian Freight',
      amountMinor: 8900000,
      currency: 'EUR',
      dueAt: '2026-02-05T12:00:00Z',
      slaDueAt: '2026-01-31T10:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['suspense'],
      evidence: {
        completeness: 82,
        freshnessHours: 26,
        missing: ['Suspense clearance note'],
        sources: [
          { name: 'Suspense report', status: 'ok' },
          { name: 'Clearance note', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'GL-3.0', policyVersion: 'FIN-2.6', approvalsRequired: ['Finance Analyst'], approvalsDone: [] }
    }
  ]

  const auditLogs: AuditLog[] = [
    { ts: '2026-01-27T14:48:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'ai_viewed', entityId: 'FC-7101', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'Partial', noteKey: 'evidence_partial' },
    { ts: '2026-01-27T14:36:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'ai_template_applied', entityId: 'FC-7102', ruleVersion: 'GL-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T14:22:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'human_override', entityId: 'FC-7104', ruleVersion: 'GL-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T14:10:00Z', actor: 'System', role: 'Close', actionKey: 'updated', entityId: 'FC-7103', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'OK' },
    { ts: '2026-01-27T13:58:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'updated', entityId: 'FC-7106', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'OK' },
    { ts: '2026-01-27T13:46:00Z', actor: 'System', role: 'Reconciliation', actionKey: 'updated', entityId: 'FC-7107', ruleVersion: 'GL-3.0', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T13:34:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'updated', entityId: 'FC-7105', ruleVersion: 'GL-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T13:22:00Z', actor: 'System', role: 'Close', actionKey: 'updated', entityId: 'FC-7108', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'OK' },
    { ts: '2026-01-27T13:10:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'updated', entityId: 'FC-7107', ruleVersion: 'GL-3.0', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T12:58:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'updated', entityId: 'FIN-2.6', ruleVersion: 'GL-3.0', evidenceStatus: 'OK' },
    { ts: '2026-01-27T12:46:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'updated', entityId: 'FC-7110', ruleVersion: 'GL-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T12:34:00Z', actor: 'System', role: 'Reconciliation', actionKey: 'updated', entityId: 'FC-7112', ruleVersion: 'GL-3.0', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T12:22:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'updated', entityId: 'FC-7101', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T12:10:00Z', actor: 'System', role: 'Close', actionKey: 'updated', entityId: 'FC-7101', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T11:58:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'updated', entityId: 'FC-7103', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'OK' },
    { ts: '2026-01-27T11:46:00Z', actor: 'System', role: 'Reconciliation', actionKey: 'updated', entityId: 'FC-7107', ruleVersion: 'GL-3.0', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T11:34:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'updated', entityId: 'FC-7112', ruleVersion: 'GL-3.0', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T11:22:00Z', actor: 'System', role: 'Close', actionKey: 'updated', entityId: 'FC-7108', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'OK' },
    { ts: '2026-01-27T11:10:00Z', actor: 'J. Werner', role: 'Financial Controller', actionKey: 'updated', entityId: 'FC-7101', ruleVersion: 'CLOSE-2.2', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T10:58:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'updated', entityId: 'FC-7102', ruleVersion: 'GL-3.0', evidenceStatus: 'Missing' }
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
    const reconciliations = cases.filter((item) => item.tags.includes('reconciliation')).length
    const journals = cases.filter((item) => item.tags.includes('journal')).length
    const suspense = formatMoney(4200000, lang)
    const interco = cases.filter((item) => item.tags.includes('intercompany')).length
    const slaBreaches = cases.filter((item) => item.status === 'escalated').length
    return {
      close: '72%',
      reconciliations,
      journals,
      suspense,
      interco,
      reporting: lang === 'en' ? 'In review' : 'In Prüfung',
      slaBreaches
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
          <Card title={copy.kpi.close} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.close}</strong></div></Card>
          <Card title={copy.kpi.reconciliations} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.reconciliations}</strong></div></Card>
          <Card title={copy.kpi.journals} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.journals}</strong></div></Card>
          <Card title={copy.kpi.suspense} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.suspense}</strong></div></Card>
          <Card title={copy.kpi.interco} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.interco}</strong></div></Card>
          <Card title={copy.kpi.reporting} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.reporting}</strong></div></Card>
          <Card title={copy.kpi.sla} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.slaBreaches}</strong></div></Card>
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
                <strong>{copy.snapshot.glImpact}</strong>
                <table className="uw-table" aria-label={copy.snapshot.glImpact}>
                  <tbody>
                    <tr><td>{copy.snapshot.glItems[0]}</td><td>{formatMoney(4200000, lang)}</td></tr>
                    <tr><td>{copy.snapshot.glItems[1]}</td><td>{formatMoney(2100000, lang)}</td></tr>
                    <tr><td>{copy.snapshot.glItems[2]}</td><td>{formatMoney(800000, lang)}</td></tr>
                  </tbody>
                </table>
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
              <span className="uw-muted">{copy.slaPanel.sod}: 1 {copy.slaPanel.pending}</span>
              <span className="uw-muted">{copy.slaPanel.threshold}: 2 {copy.slaPanel.pending}</span>
              <span className="uw-muted">{copy.slaPanel.exception}: 1 {copy.slaPanel.active}</span>
            </div>
          </Card>
          <Card title={copy.audit.rulesTitle} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>GL-3.0 / FIN-2.6</strong>
              <span className="uw-muted">{copy.audit.effectiveFrom} {formatDate('2026-01-05T00:00:00Z', lang)}</span>
            </div>
          </Card>
          <Card title={copy.audit.evidenceTitle} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.audit.hashLabel}: 1f2c...0aa9</strong>
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
