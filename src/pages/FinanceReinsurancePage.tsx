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
  noteParams?: {
    amountMinor?: number
    currency?: 'EUR' | 'USD'
    slaHours?: number
    treaty?: string
    counterparty?: string
    versionFrom?: string
    versionTo?: string
    missingDoc?: string
    completeness?: number
    threshold?: string
  }
}

const formatMoney = (amountMinor: number, lang: string, currencyOverride?: 'EUR' | 'USD') => {
  const value = amountMinor / 100
  const locale = lang === 'en' ? 'en-US' : 'de-DE'
  const currency = currencyOverride || (lang === 'en' ? 'USD' : 'EUR')
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

const formatHours = (hours: number, lang: string) => {
  return lang === 'en' ? `${hours}h` : `${hours} Std.`
}

const renderAuditNote = (noteKey: AuditNoteKey, lang: string, noteParams?: AuditLog['noteParams']) => {
  const templates = {
    en: {
      awaiting_note: 'Awaiting additional note',
      missing_doc: 'Missing document: {missingDoc}',
      threshold_breach: 'Threshold breach: {threshold} — amount {amount}, SLA {slaHours}',
      policy_sync: 'Policy version {versionFrom} → {versionTo} synced',
      evidence_partial: 'Evidence partial ({completeness}%) — follow up required',
      evidence_missing: 'Evidence missing — follow up required',
      evidence_ok: 'Evidence complete'
    },
    de: {
      awaiting_note: 'Zusätzliche Notiz ausstehend',
      missing_doc: 'Dokument fehlt: {missingDoc}',
      threshold_breach: 'Threshold-Verstoß: {threshold} — Betrag {amount}, SLA {slaHours}',
      policy_sync: 'Policy-Version {versionFrom} → {versionTo} synchronisiert',
      evidence_partial: 'Evidenz teilweise ({completeness}%) — Follow-up erforderlich',
      evidence_missing: 'Evidenz fehlt — Follow-up erforderlich',
      evidence_ok: 'Evidenz vollständig'
    }
  }

  const tpl = (lang === 'en' ? templates.en : templates.de)[noteKey]
  const amount = noteParams?.amountMinor !== undefined
    ? formatMoney(noteParams.amountMinor, lang, noteParams.currency)
    : ''
  const slaHours = noteParams?.slaHours !== undefined ? formatHours(noteParams.slaHours, lang) : ''
  const completeness = noteParams?.completeness !== undefined
    ? new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'de-DE', { maximumFractionDigits: 0 }).format(noteParams.completeness)
    : ''

  return tpl
    .replace('{amount}', amount)
    .replace('{slaHours}', slaHours)
    .replace('{versionFrom}', noteParams?.versionFrom || '')
    .replace('{versionTo}', noteParams?.versionTo || '')
    .replace('{missingDoc}', noteParams?.missingDoc || '')
    .replace('{completeness}', completeness)
    .replace('{threshold}', noteParams?.threshold || '')
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

export default function FinanceReinsurancePage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Reinsurance Finance — Finance Dashboard',
        subtitle: 'Cessions, bordereaux and recoveries monitoring.',
        lastUpdated: 'Last updated: 27 Jan 2026, 15:20',
        badges: ['Audit-ready', 'HITL', 'Treaty view'],
        kpi: {
          ceded: 'Ceded premium (MTD)',
          bordDue: 'Bordereaux due',
          bordLate: 'Bordereaux late',
          recoveries: 'Recoveries outstanding',
          sla: 'Recovery SLA at risk',
          exceptions: 'Treaty mapping exceptions',
          cash: 'Cash received (MTD)'
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
          portfolio: 'Treaty',
          counterparty: 'Counterparty',
          amount: 'Amount',
          sla: 'SLA',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision snapshot',
          summary: 'Treaty summary',
          aiTitle: 'AI-generated decision template — requires human review',
          aiItems: ['Validate cession calculation', 'Check bordereaux completeness', 'Flag recovery follow-up'],
          templates: 'Decision templates',
          terms: 'Treaty terms highlights',
          breakdown: 'Cession breakdown',
          amountLabel: 'Amount',
          statusLabel: 'Status',
          rationalePlaceholder: 'Rationale / conditions',
          termsItems: ['Quota share 30%', 'Attachment 12,500,000', 'Claims reporting: 30 days'],
          breakdownItems: ['Gross premium', 'Ceded premium', 'Net retained']
        },
        actions: {
          approve: 'Approve bordereaux',
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
            missing_doc: 'Missing document: {missingDoc}',
            threshold_breach: 'Threshold breach: {threshold} — amount {amount}, SLA {slaHours}',
            policy_sync: 'Policy version {versionFrom} → {versionTo} synced',
            evidence_partial: 'Evidence partial ({completeness}%) — follow up required',
            evidence_missing: 'Evidence missing — follow up required',
            evidence_ok: 'Evidence complete'
          },
          effectiveFrom: 'Effective from',
          hashLabel: 'hash'
        },
        footer: 'Indicative demo data. Not a forecast. HITL: AI suggests, humans decide.',
        statusAll: 'All'
      }
    : {
        title: 'Reinsurance Finance — Finance Dashboard',
        subtitle: 'Cessions, Bordereaux und Recoveries Monitoring.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 15:20',
        badges: ['Audit-ready', 'HITL', 'Treaty-View'],
        kpi: {
          ceded: 'Ceded Premium (MTD)',
          bordDue: 'Bordereaux fällig',
          bordLate: 'Bordereaux verspätet',
          recoveries: 'Recoveries ausstehend',
          sla: 'Recovery SLA gefährdet',
          exceptions: 'Treaty-Mapping-Exceptions',
          cash: 'Cash erhalten (MTD)'
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
          portfolio: 'Treaty',
          counterparty: 'Gegenpartei',
          amount: 'Betrag',
          sla: 'SLA',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision Snapshot',
          summary: 'Treaty Summary',
          aiTitle: 'AI-Decision-Template — Human Review erforderlich',
          aiItems: ['Cession-Berechnung validieren', 'Bordereaux-Vollständigkeit prüfen', 'Recovery-Follow-up markieren'],
          templates: 'Entscheidungsvorlagen',
          terms: 'Treaty-Terms (Highlights)',
          breakdown: 'Cession Breakdown',
          amountLabel: 'Betrag',
          statusLabel: 'Status',
          rationalePlaceholder: 'Begründung / Auflagen',
          termsItems: ['Quota Share 30%', 'Attachment 12.500.000', 'Claims Reporting: 30 Tage'],
          breakdownItems: ['Bruttoprämie', 'Zedierte Prämie', 'Netto verbleibend']
        },
        actions: {
          approve: 'Bordereaux freigeben',
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
            missing_doc: 'Dokument fehlt: {missingDoc}',
            threshold_breach: 'Threshold-Verstoß: {threshold} — Betrag {amount}, SLA {slaHours}',
            policy_sync: 'Policy-Version {versionFrom} → {versionTo} synchronisiert',
            evidence_partial: 'Evidenz teilweise ({completeness}%) — Follow-up erforderlich',
            evidence_missing: 'Evidenz fehlt — Follow-up erforderlich',
            evidence_ok: 'Evidenz vollständig'
          },
          effectiveFrom: 'Gültig ab',
          hashLabel: 'Hash'
        },
        footer: 'Indikative Demo-Daten. Keine Finanzprognose. HITL: KI schlägt vor, Menschen entscheiden.',
        statusAll: 'Alle'
      }

  const cases: DecisionCase[] = [
    {
      id: 'RI-6101',
      type: 'cession',
      portfolio: 'Treaty A – Fleet',
      counterparty: 'Lloyd’s Syndicate 1023',
      amountMinor: 12800000,
      currency: 'EUR',
      dueAt: '2026-01-28T12:00:00Z',
      slaDueAt: '2026-01-27T14:00:00Z',
      riskTier: 'medium',
      status: 'in_review',
      recommendation: 'approve_with_conditions',
      breach: [{ kind: 'data', severity: 'med', noteKey: 'evidence_partial' }],
      tags: ['bordereaux', 'cession'],
      evidence: {
        completeness: 84,
        freshnessHours: 6,
        missing: ['Premium bordereaux addendum'],
        sources: [
          { name: 'Bordereaux pack', status: 'ok' },
          { name: 'Addendum', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Lead'], approvalsDone: ['Reinsurance Analyst'] }
    },
    {
      id: 'RI-6102',
      type: 'recovery',
      portfolio: 'Treaty B – Cargo',
      counterparty: 'Swiss Re',
      amountMinor: 9400000,
      currency: 'EUR',
      dueAt: '2026-01-29T12:00:00Z',
      slaDueAt: '2026-01-27T18:00:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'escalate',
      breach: [{ kind: 'sla', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['recovery', 'sla'],
      evidence: {
        completeness: 72,
        freshnessHours: 20,
        missing: ['Loss advice'],
        sources: [
          { name: 'Recovery pack', status: 'ok' },
          { name: 'Loss advice', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Lead'], approvalsDone: [] }
    },
    {
      id: 'RI-6103',
      type: 'cession',
      portfolio: 'Treaty C – Liability',
      counterparty: 'Munich Re',
      amountMinor: 6800000,
      currency: 'EUR',
      dueAt: '2026-01-30T12:00:00Z',
      slaDueAt: '2026-01-28T10:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['cession'],
      evidence: {
        completeness: 96,
        freshnessHours: 4,
        missing: [],
        sources: [
          { name: 'Bordereaux pack', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Analyst'], approvalsDone: [] }
    },
    {
      id: 'RI-6104',
      type: 'exception',
      portfolio: 'Treaty D – Fleet',
      counterparty: 'Hannover Re',
      amountMinor: 15200000,
      currency: 'EUR',
      dueAt: '2026-01-31T12:00:00Z',
      slaDueAt: '2026-01-28T12:00:00Z',
      riskTier: 'high',
      status: 'escalated',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['exception', 'mapping'],
      evidence: {
        completeness: 70,
        freshnessHours: 22,
        missing: ['Mapping approval'],
        sources: [
          { name: 'Mapping report', status: 'missing' },
          { name: 'Treaty schedule', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Lead', 'Carrier Finance'], approvalsDone: ['Reinsurance Lead'] }
    },
    {
      id: 'RI-6105',
      type: 'recovery',
      portfolio: 'Treaty A – Fleet',
      counterparty: 'Lloyd’s Syndicate 1023',
      amountMinor: 5200000,
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
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Analyst'], approvalsDone: [] }
    },
    {
      id: 'RI-6106',
      type: 'cession',
      portfolio: 'Treaty B – Cargo',
      counterparty: 'Swiss Re',
      amountMinor: 7400000,
      currency: 'EUR',
      dueAt: '2026-02-02T12:00:00Z',
      slaDueAt: '2026-01-29T10:00:00Z',
      riskTier: 'low',
      status: 'approved',
      recommendation: 'approve',
      tags: ['cession'],
      evidence: {
        completeness: 98,
        freshnessHours: 5,
        missing: [],
        sources: [
          { name: 'Bordereaux pack', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Analyst'], approvalsDone: ['Reinsurance Analyst'] }
    },
    {
      id: 'RI-6107',
      type: 'exception',
      portfolio: 'Treaty C – Liability',
      counterparty: 'Munich Re',
      amountMinor: 13400000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-29T15:00:00Z',
      riskTier: 'high',
      status: 'open',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['exception', 'sod'],
      evidence: {
        completeness: 76,
        freshnessHours: 16,
        missing: ['SoD approval'],
        sources: [
          { name: 'SoD register', status: 'missing' },
          { name: 'Treaty schedule', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Lead'], approvalsDone: [] }
    },
    {
      id: 'RI-6108',
      type: 'recovery',
      portfolio: 'Treaty D – Fleet',
      counterparty: 'Hannover Re',
      amountMinor: 4200000,
      currency: 'EUR',
      dueAt: '2026-02-03T12:00:00Z',
      slaDueAt: '2026-01-29T18:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['recovery'],
      evidence: {
        completeness: 91,
        freshnessHours: 7,
        missing: [],
        sources: [
          { name: 'Recovery pack', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Analyst'], approvalsDone: [] }
    },
    {
      id: 'RI-6109',
      type: 'cession',
      portfolio: 'Treaty E – Cargo',
      counterparty: 'SCOR',
      amountMinor: 6500000,
      currency: 'EUR',
      dueAt: '2026-02-04T12:00:00Z',
      slaDueAt: '2026-01-30T09:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['cession'],
      evidence: {
        completeness: 83,
        freshnessHours: 14,
        missing: ['Bordereaux attestation'],
        sources: [
          { name: 'Bordereaux pack', status: 'ok' },
          { name: 'Attestation', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Analyst'], approvalsDone: [] }
    },
    {
      id: 'RI-6110',
      type: 'recovery',
      portfolio: 'Treaty F – Liability',
      counterparty: 'Partner Re',
      amountMinor: 5100000,
      currency: 'EUR',
      dueAt: '2026-02-05T12:00:00Z',
      slaDueAt: '2026-01-30T12:00:00Z',
      riskTier: 'medium',
      status: 'open',
      recommendation: 'approve_with_conditions',
      tags: ['recovery'],
      evidence: {
        completeness: 88,
        freshnessHours: 12,
        missing: ['Claims bordereaux'],
        sources: [
          { name: 'Recovery pack', status: 'ok' },
          { name: 'Claims bordereaux', status: 'missing' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Analyst'], approvalsDone: [] }
    },
    {
      id: 'RI-6111',
      type: 'exception',
      portfolio: 'Treaty A – Fleet',
      counterparty: 'Lloyd’s Syndicate 1023',
      amountMinor: 14500000,
      currency: 'EUR',
      dueAt: '2026-02-05T12:00:00Z',
      slaDueAt: '2026-01-30T15:00:00Z',
      riskTier: 'high',
      status: 'in_review',
      recommendation: 'escalate',
      breach: [{ kind: 'policy', severity: 'high', noteKey: 'evidence_partial' }],
      tags: ['commutation', 'exception'],
      evidence: {
        completeness: 75,
        freshnessHours: 18,
        missing: ['Commutation memo'],
        sources: [
          { name: 'Commutation pack', status: 'missing' },
          { name: 'Treaty schedule', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Lead', 'Carrier Finance'], approvalsDone: ['Reinsurance Lead'] }
    },
    {
      id: 'RI-6112',
      type: 'cession',
      portfolio: 'Treaty G – Fleet',
      counterparty: 'Everest Re',
      amountMinor: 5900000,
      currency: 'EUR',
      dueAt: '2026-02-06T12:00:00Z',
      slaDueAt: '2026-01-31T10:00:00Z',
      riskTier: 'low',
      status: 'open',
      recommendation: 'approve',
      tags: ['cession'],
      evidence: {
        completeness: 95,
        freshnessHours: 9,
        missing: [],
        sources: [
          { name: 'Bordereaux pack', status: 'ok' }
        ]
      },
      governance: { ruleVersion: 'RE-3.2', policyVersion: 'REIN-2.1', approvalsRequired: ['Reinsurance Analyst'], approvalsDone: [] }
    }
  ]

  const auditLogs: AuditLog[] = [
    {
      ts: '2026-01-27T14:46:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'ai_viewed',
      entityId: 'RI-6101',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Partial',
      noteKey: 'evidence_partial',
      noteParams: { completeness: 84 }
    },
    {
      ts: '2026-01-27T14:34:00Z',
      actor: 'System',
      role: 'Rules Engine',
      actionKey: 'ai_template_applied',
      entityId: 'RI-6102',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Missing',
      noteKey: 'missing_doc',
      noteParams: { missingDoc: 'Loss advice', treaty: 'Treaty B – Cargo', counterparty: 'Swiss Re' }
    },
    {
      ts: '2026-01-27T14:22:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'human_override',
      entityId: 'RI-6105',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Missing',
      noteKey: 'threshold_breach',
      noteParams: { threshold: 'Recovery SLA', amountMinor: 5200000, currency: 'EUR', slaHours: 18 }
    },
    {
      ts: '2026-01-27T14:10:00Z',
      actor: 'System',
      role: 'Bordereaux',
      actionKey: 'alert',
      entityId: 'RI-6104',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Missing',
      noteKey: 'missing_doc',
      noteParams: { missingDoc: 'Mapping approval', treaty: 'Treaty D – Fleet' }
    },
    {
      ts: '2026-01-27T13:58:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'approved',
      entityId: 'RI-6106',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'OK',
      noteKey: 'evidence_ok'
    },
    {
      ts: '2026-01-27T13:46:00Z',
      actor: 'System',
      role: 'Rules Engine',
      actionKey: 'flagged',
      entityId: 'RI-6107',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Missing',
      noteKey: 'threshold_breach',
      noteParams: { threshold: 'SoD approval', amountMinor: 13400000, currency: 'EUR', slaHours: 48 }
    },
    {
      ts: '2026-01-27T13:34:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'updated',
      entityId: 'RI-6108',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'OK',
      noteKey: 'evidence_ok'
    },
    {
      ts: '2026-01-27T13:22:00Z',
      actor: 'System',
      role: 'Rules Engine',
      actionKey: 'escalated',
      entityId: 'RI-6111',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Missing',
      noteKey: 'missing_doc',
      noteParams: { missingDoc: 'Commutation memo', treaty: 'Treaty A – Fleet' }
    },
    {
      ts: '2026-01-27T13:10:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'updated',
      entityId: 'RI-6110',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Partial',
      noteKey: 'evidence_partial',
      noteParams: { completeness: 88 }
    },
    {
      ts: '2026-01-27T12:58:00Z',
      actor: 'System',
      role: 'Bordereaux',
      actionKey: 'updated',
      entityId: 'RI-6109',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Partial',
      noteKey: 'missing_doc',
      noteParams: { missingDoc: 'Bordereaux attestation', treaty: 'Treaty E – Cargo' }
    },
    {
      ts: '2026-01-27T12:46:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'updated',
      entityId: 'RI-6110',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Partial',
      noteKey: 'evidence_partial',
      noteParams: { completeness: 88 }
    },
    {
      ts: '2026-01-27T12:34:00Z',
      actor: 'System',
      role: 'Rules Engine',
      actionKey: 'policy_sync',
      entityId: 'REIN-2.1',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'OK',
      noteKey: 'policy_sync',
      noteParams: { versionFrom: 'REIN-2.0', versionTo: 'REIN-2.1' }
    },
    {
      ts: '2026-01-27T12:22:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'updated',
      entityId: 'RI-6104',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Missing',
      noteKey: 'missing_doc',
      noteParams: { missingDoc: 'Mapping approval', treaty: 'Treaty D – Fleet' }
    },
    {
      ts: '2026-01-27T12:10:00Z',
      actor: 'System',
      role: 'Bordereaux',
      actionKey: 'alert',
      entityId: 'RI-6101',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Partial',
      noteKey: 'evidence_partial',
      noteParams: { completeness: 84 }
    },
    {
      ts: '2026-01-27T11:58:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'approved',
      entityId: 'RI-6103',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'OK',
      noteKey: 'evidence_ok'
    },
    {
      ts: '2026-01-27T11:46:00Z',
      actor: 'System',
      role: 'Rules Engine',
      actionKey: 'sla_started',
      entityId: 'RI-6102',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Missing',
      noteKey: 'threshold_breach',
      noteParams: { threshold: 'Recovery SLA', amountMinor: 9400000, currency: 'EUR', slaHours: 48 }
    },
    {
      ts: '2026-01-27T11:34:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'updated',
      entityId: 'RI-6109',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Partial',
      noteKey: 'evidence_partial',
      noteParams: { completeness: 83 }
    },
    {
      ts: '2026-01-27T11:22:00Z',
      actor: 'System',
      role: 'Rules Engine',
      actionKey: 'case_opened',
      entityId: 'RI-6112',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'OK',
      noteKey: 'evidence_ok'
    },
    {
      ts: '2026-01-27T11:10:00Z',
      actor: 'S. Grant',
      role: 'Reinsurance Finance',
      actionKey: 'updated',
      entityId: 'RI-6112',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'OK',
      noteKey: 'evidence_ok'
    },
    {
      ts: '2026-01-27T10:58:00Z',
      actor: 'System',
      role: 'Bordereaux',
      actionKey: 'updated',
      entityId: 'RI-6101',
      ruleVersion: 'RE-3.2',
      evidenceStatus: 'Partial',
      noteKey: 'evidence_partial',
      noteParams: { completeness: 84 }
    }
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
    const bordDue = cases.filter((item) => item.tags.includes('bordereaux')).length
    const bordLate = cases.filter((item) => item.status === 'escalated').length
    const recoveries = cases.filter((item) => item.type === 'recovery').length
    const exceptions = cases.filter((item) => item.tags.includes('exception') || item.tags.includes('mapping')).length
    const slaRisk = cases.filter((item) => new Date(item.slaDueAt).getTime() < new Date('2026-01-28T12:00:00Z').getTime()).length
    return {
      ceded: formatMoney(32600000, lang),
      bordDue,
      bordLate,
      recoveries,
      slaRisk,
      exceptions,
      cash: formatMoney(18200000, lang)
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
          <Card title={copy.kpi.ceded} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.ceded}</strong></div></Card>
          <Card title={copy.kpi.bordDue} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.bordDue}</strong></div></Card>
          <Card title={copy.kpi.bordLate} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.bordLate}</strong></div></Card>
          <Card title={copy.kpi.recoveries} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.recoveries}</strong></div></Card>
          <Card title={copy.kpi.sla} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.slaRisk}</strong></div></Card>
          <Card title={copy.kpi.exceptions} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.exceptions}</strong></div></Card>
          <Card title={copy.kpi.cash} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.cash}</strong></div></Card>
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
                <strong>{copy.snapshot.terms}</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem' }}>
                  <li>{copy.snapshot.termsItems[0]}</li>
                  <li>{copy.snapshot.termsItems[1]}</li>
                  <li>{copy.snapshot.termsItems[2]}</li>
                </ul>
              </div>

              <div className="uw-panel">
                <strong>{copy.snapshot.breakdown}</strong>
                <table className="uw-table" aria-label={copy.snapshot.breakdown}>
                  <tbody>
                    <tr><td>{copy.snapshot.breakdownItems[0]}</td><td>{formatMoney(22000000, lang)}</td></tr>
                    <tr><td>{copy.snapshot.breakdownItems[1]}</td><td>{formatMoney(6600000, lang)}</td></tr>
                    <tr><td>{copy.snapshot.breakdownItems[2]}</td><td>{formatMoney(15400000, lang)}</td></tr>
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
              <strong>RE-3.2 / REIN-2.1</strong>
              <span className="uw-muted">{copy.audit.effectiveFrom} {formatDate('2026-01-08T00:00:00Z', lang)}</span>
            </div>
          </Card>
          <Card title={copy.audit.evidenceTitle} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{copy.audit.hashLabel}: 5bd2...f11c</strong>
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
                      <td>{log.noteKey ? renderAuditNote(log.noteKey, lang, log.noteParams) : '-'}</td>
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
