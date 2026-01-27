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

export default function FinanceClaimsPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Claims Finance — Finance Dashboard',
        subtitle: 'Reserving discipline and payment control oversight.',
        lastUpdated: 'Last updated: 27 Jan 2026, 15:15',
        badges: ['Audit-ready', 'HITL', 'Payments control'],
        kpi: {
          paid: 'Paid today',
          approvals: 'Payment approvals pending',
          reserves: 'Reserve changes pending',
          largeLoss: 'Large loss flags',
          leakage: 'Leakage alerts (indicative)',
          cycle: 'Avg cycle time',
          sla: 'SLA at risk'
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
          portfolio: 'Portfolio',
          counterparty: 'Counterparty',
          amount: 'Amount',
          sla: 'SLA',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision snapshot',
          summary: 'Claim summary',
          aiTitle: 'AI-generated decision template — requires human review',
          aiItems: ['Validate reserve delta', 'Check payment controls', 'Flag duplicate payment risk'],
          templates: 'Decision templates',
          triangle: 'Reserve triangle (demo)',
          checklist: 'Payment controls',
          amountLabel: 'Amount',
          statusLabel: 'Status',
          rationalePlaceholder: 'Rationale / conditions'
        },
        actions: {
          approve: 'Approve payment',
          conditions: 'Approve with conditions',
          reject: 'Reject / hold',
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
        title: 'Claims Finance — Finance Dashboard',
        subtitle: 'Reserving-Disziplin und Payment-Control-Überwachung.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 15:15',
        badges: ['Audit-ready', 'HITL', 'Payment-Control'],
        kpi: {
          paid: 'Heute gezahlt',
          approvals: 'Payment-Freigaben offen',
          reserves: 'Reserve-Änderungen offen',
          largeLoss: 'Large-Loss-Flags',
          leakage: 'Leakage-Alerts (indikativ)',
          cycle: 'Ø Zykluszeit',
          sla: 'SLA gefährdet'
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
          portfolio: 'Portfolio',
          counterparty: 'Gegenpartei',
          amount: 'Betrag',
          sla: 'SLA',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision Snapshot',
          summary: 'Claim Summary',
          aiTitle: 'AI-Decision-Template — Human Review erforderlich',
          aiItems: ['Reserve-Delta validieren', 'Payment-Kontrollen prüfen', 'Duplicate-Payment-Risiko markieren'],
          templates: 'Entscheidungsvorlagen',
          triangle: 'Reserve Triangle (Demo)',
          checklist: 'Payment-Kontrollen',
          amountLabel: 'Betrag',
          statusLabel: 'Status',
          rationalePlaceholder: 'Begründung / Auflagen'
        },
        actions: {
          approve: 'Zahlung freigeben',
          conditions: 'Freigabe mit Auflagen',
          reject: 'Ablehnen / Halten',
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
      id: 'CF-5201',
      type: 'payment',
      portfolio: 'Fleet Germany',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 4850000,
      currency: 'EUR',
      dueAt: '2026-01-28T12:00:00Z',
      slaDueAt: '2026-01-27T14:00:00Z',
      riskTier: 'medium',
      status: 'in_review',
      recommendation: 'approve_with_conditions',
      breach: [{ kind: 'threshold', severity: 'med', noteKey: 'evidence_partial' }],
      tags: ['payment', 'threshold'],
      evidence: {
        completeness: 88,
        freshnessHours: 6,
        missing: ['Bank verification'],
        sources: [
          { name: 'Payment request', status: 'ok' },
          { name: 'Bank verification', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Lead'], approvalsDone: ['Claims Finance Analyst'] }
    },
    {
      id: 'CF-5202',
      type: 'reserve',
      portfolio: 'Cargo EU',
      counterparty: 'Northbridge Logistics',
      amountMinor: 9200000,
      currency: 'EUR',
      dueAt: '2026-01-29T12:00:00Z',
      slaDueAt: '2026-01-27T18:00:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['reserve', 'large-loss'],
      evidence: {
        completeness: 74,
        freshnessHours: 12,
        missing: ['Adjuster report'],
        sources: [
          { name: 'Reserve memo', status: 'ok' },
          { name: 'Adjuster report', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RES-2.9', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Lead', 'Carrier Legal'], approvalsDone: [] }
    },
    {
      id: 'CF-5203',
      type: 'payment',
      portfolio: 'Fleet Nordics',
      counterparty: 'Polar Hauliers',
      amountMinor: 2650000,
      currency: 'EUR',
      dueAt: '2026-01-30T12:00:00Z',
      slaDueAt: '2026-01-28T10:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['payment'],
      evidence: {
        completeness: 96,
        freshnessHours: 4,
        missing: [],
        sources: [
          { name: 'Payment request', status: 'ok' },
          { name: 'Bank verification', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'CF-5204',
      type: 'reserve',
      portfolio: 'Carrier Liability',
      counterparty: 'Bluegate Haulage',
      amountMinor: 14700000,
      currency: 'EUR',
      dueAt: '2026-01-31T12:00:00Z',
      slaDueAt: '2026-01-28T12:00:00Z',
      riskTier: 'high',
      status: 'escalated',
      recommendation: 'escalate',
      breach: [{ kind: 'threshold', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['reserve', 'large-loss'],
      evidence: {
        completeness: 70,
        freshnessHours: 22,
        missing: ['Loss adjuster update'],
        sources: [
          { name: 'Loss notice', status: 'ok' },
          { name: 'Adjuster update', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RES-2.9', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Lead', 'Carrier Finance'], approvalsDone: ['Claims Finance Lead'] }
    },
    {
      id: 'CF-5205',
      type: 'payment',
      portfolio: 'Cargo UK',
      counterparty: 'Vector Freight',
      amountMinor: 5850000,
      currency: 'EUR',
      dueAt: '2026-02-01T12:00:00Z',
      slaDueAt: '2026-01-28T16:00:00Z',
      riskTier: 'medium',
      status: 'needs_evidence',
      recommendation: 'approve_with_conditions',
      tags: ['payment', 'evidence'],
      evidence: {
        completeness: 69,
        freshnessHours: 30,
        missing: ['Invoice match', 'Bank verification'],
        sources: [
          { name: 'Payment request', status: 'stale', noteKey: 'evidence_partial' },
          { name: 'Invoice match', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'CF-5206',
      type: 'payment',
      portfolio: 'Fleet Iberia',
      counterparty: 'Roadline Iberia',
      amountMinor: 1900000,
      currency: 'EUR',
      dueAt: '2026-02-02T12:00:00Z',
      slaDueAt: '2026-01-29T10:00:00Z',
      riskTier: 'low',
      status: 'approved',
      recommendation: 'approve',
      tags: ['payment'],
      evidence: {
        completeness: 98,
        freshnessHours: 5,
        missing: [],
        sources: [
          { name: 'Payment request', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Analyst'], approvalsDone: ['Claims Finance Analyst'] }
    },
    {
      id: 'CF-5207',
      type: 'reserve',
      portfolio: 'Cargo EEA',
      counterparty: 'Meridian Freight',
      amountMinor: 8700000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-29T15:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['reserve'],
      evidence: {
        completeness: 86,
        freshnessHours: 10,
        missing: ['Reserve rationale'],
        sources: [
          { name: 'Reserve memo', status: 'ok' },
          { name: 'Reserve rationale', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RES-2.9', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Lead'], approvalsDone: [] }
    },
    {
      id: 'CF-5208',
      type: 'payment',
      portfolio: 'Fleet UK',
      counterparty: 'Harbor Fleet UK',
      amountMinor: 3600000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-29T18:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['payment'],
      evidence: {
        completeness: 93,
        freshnessHours: 7,
        missing: [],
        sources: [
          { name: 'Payment request', status: 'ok' },
          { name: 'Bank verification', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'CF-5209',
      type: 'reserve',
      portfolio: 'Cargo Benelux',
      counterparty: 'Swift Cargo Europe',
      amountMinor: 5400000,
      currency: 'EUR',
      dueAt: '2026-02-04T12:00:00Z',
      slaDueAt: '2026-01-30T09:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['reserve'],
      evidence: {
        completeness: 82,
        freshnessHours: 14,
        missing: ['Reserve rationale'],
        sources: [
          { name: 'Reserve memo', status: 'ok' },
          { name: 'Reserve rationale', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RES-2.9', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Lead'], approvalsDone: [] }
    },
    {
      id: 'CF-5210',
      type: 'payment',
      portfolio: 'Fleet France',
      counterparty: 'Anchor Fleet Alpha',
      amountMinor: 4100000,
      currency: 'EUR',
      dueAt: '2026-02-04T12:00:00Z',
      slaDueAt: '2026-01-30T12:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve',
      tags: ['payment'],
      evidence: {
        completeness: 91,
        freshnessHours: 9,
        missing: [],
        sources: [
          { name: 'Payment request', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Analyst'], approvalsDone: [] }
    },
    {
      id: 'CF-5211',
      type: 'reserve',
      portfolio: 'Cargo Nordics',
      counterparty: 'Polar Hauliers',
      amountMinor: 9600000,
      currency: 'EUR',
      dueAt: '2026-02-05T12:00:00Z',
      slaDueAt: '2026-01-30T15:00:00Z',
      riskTier: 'high',
      status: 'in_review',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['reserve', 'authority'],
      evidence: {
        completeness: 78,
        freshnessHours: 18,
        missing: ['Authority approval'],
        sources: [
          { name: 'Reserve memo', status: 'ok' },
          { name: 'Authority approval', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RES-2.9', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Lead'], approvalsDone: ['Claims Finance Analyst'] }
    },
    {
      id: 'CF-5212',
      type: 'payment',
      portfolio: 'Fleet Benelux',
      counterparty: 'Meridian Freight',
      amountMinor: 2700000,
      currency: 'EUR',
      dueAt: '2026-02-06T12:00:00Z',
      slaDueAt: '2026-01-31T10:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['payment'],
      evidence: {
        completeness: 94,
        freshnessHours: 6,
        missing: [],
        sources: [
          { name: 'Payment request', status: 'ok' },
          { name: 'Bank verification', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'PAY-3.3', policyVersion: 'CLAIM-2.5', approvalsRequired: ['Claims Finance Analyst'], approvalsDone: [] }
    }
  ]

  const auditLogs: AuditLog[] = [
    { ts: '2026-01-27T14:44:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'ai_viewed', entityId: 'CF-5201', ruleVersion: 'PAY-3.3', evidenceStatus: 'Partial', noteKey: 'evidence_partial' },
    { ts: '2026-01-27T14:30:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'ai_template_applied', entityId: 'CF-5202', ruleVersion: 'RES-2.9', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T14:18:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'human_override', entityId: 'CF-5204', ruleVersion: 'RES-2.9', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T14:04:00Z', actor: 'System', role: 'Payments', actionKey: 'updated', entityId: 'CF-5205', ruleVersion: 'PAY-3.3', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T13:52:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'updated', entityId: 'CF-5206', ruleVersion: 'PAY-3.3', evidenceStatus: 'OK' },
    { ts: '2026-01-27T13:40:00Z', actor: 'System', role: 'Controls', actionKey: 'updated', entityId: 'CF-5205', ruleVersion: 'PAY-3.3', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T13:28:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'updated', entityId: 'CF-5204', ruleVersion: 'RES-2.9', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T13:16:00Z', actor: 'System', role: 'Analytics', actionKey: 'updated', entityId: 'CF-5207', ruleVersion: 'RES-2.9', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T13:02:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'updated', entityId: 'CF-5209', ruleVersion: 'RES-2.9', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T12:52:00Z', actor: 'System', role: 'Payments', actionKey: 'updated', entityId: 'CF-5210', ruleVersion: 'PAY-3.3', evidenceStatus: 'OK' },
    { ts: '2026-01-27T12:40:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'updated', entityId: 'CF-5211', ruleVersion: 'RES-2.9', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T12:28:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'updated', entityId: 'CF-5204', ruleVersion: 'RES-2.9', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T12:16:00Z', actor: 'System', role: 'Controls', actionKey: 'updated', entityId: 'CF-5201', ruleVersion: 'PAY-3.3', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T12:04:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'updated', entityId: 'CF-5202', ruleVersion: 'RES-2.9', evidenceStatus: 'Missing' },
    { ts: '2026-01-27T11:52:00Z', actor: 'System', role: 'Analytics', actionKey: 'updated', entityId: 'CF-5205', ruleVersion: 'PAY-3.3', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T11:40:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'updated', entityId: 'CF-5203', ruleVersion: 'PAY-3.3', evidenceStatus: 'OK' },
    { ts: '2026-01-27T11:28:00Z', actor: 'System', role: 'Rules Engine', actionKey: 'updated', entityId: 'CLAIM-2.5', ruleVersion: 'RES-2.9', evidenceStatus: 'OK' },
    { ts: '2026-01-27T11:16:00Z', actor: 'System', role: 'Payments', actionKey: 'updated', entityId: 'CF-5203', ruleVersion: 'PAY-3.3', evidenceStatus: 'OK' },
    { ts: '2026-01-27T11:04:00Z', actor: 'M. Schultz', role: 'Claims Finance', actionKey: 'updated', entityId: 'CF-5207', ruleVersion: 'RES-2.9', evidenceStatus: 'Partial' },
    { ts: '2026-01-27T10:50:00Z', actor: 'System', role: 'Analytics', actionKey: 'updated', entityId: 'CF-5202', ruleVersion: 'RES-2.9', evidenceStatus: 'Missing' }
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
    const paid = formatMoney(9850000, lang)
    const approvals = cases.filter((item) => item.status === 'open' || item.status === 'in_review').length
    const reserves = cases.filter((item) => item.type === 'reserve').length
    const largeLoss = cases.filter((item) => item.tags.includes('large-loss')).length
    const leakage = cases.filter((item) => item.tags.includes('leakage')).length
    const slaRisk = cases.filter((item) => new Date(item.slaDueAt).getTime() < new Date('2026-01-28T12:00:00Z').getTime()).length
    return {
      paid,
      approvals,
      reserves,
      largeLoss,
      leakage: leakage || 2,
      cycle: lang === 'en' ? '2.6d' : '2,6T',
      slaRisk
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
          <Card title={copy.kpi.paid} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.paid}</strong></div></Card>
          <Card title={copy.kpi.approvals} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.approvals}</strong></div></Card>
          <Card title={copy.kpi.reserves} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.reserves}</strong></div></Card>
          <Card title={copy.kpi.largeLoss} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.largeLoss}</strong></div></Card>
          <Card title={copy.kpi.leakage} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.leakage}</strong></div></Card>
          <Card title={copy.kpi.cycle} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.cycle}</strong></div></Card>
          <Card title={copy.kpi.sla} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.slaRisk}</strong></div></Card>
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
                <strong>{copy.snapshot.triangle}</strong>
                <table className="uw-table" aria-label={copy.snapshot.triangle}>
                  <tbody>
                    <tr><td>AY-1</td><td>{formatMoney(4200000, lang)}</td><td>+6%</td></tr>
                    <tr><td>AY-2</td><td>{formatMoney(3100000, lang)}</td><td>+3%</td></tr>
                    <tr><td>AY-3</td><td>{formatMoney(2800000, lang)}</td><td>-1%</td></tr>
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
              <strong>CLAIM-2.5 / PAY-3.3</strong>
              <span className="uw-muted">{copy.audit.effectiveFrom} {formatDate('2026-01-10T00:00:00Z', lang)}</span>
            </div>
          </Card>
          <Card title={copy.audit.evidenceTitle} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.audit.hashLabel}: 9c2e...71bd</strong>
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
