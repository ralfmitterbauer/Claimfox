import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_UW_COMPLIANCE_STATE'
const KEY_AUDIT = 'DEMO_UW_COMPLIANCE_AUDIT'

type ComplianceState = {
  caseId: string
  insured: string
  product: string
  referralReason: string
  ruleSetVersion: string
  modelVersion: string
  consentLogged: boolean
  evidenceScore: number
  evidenceChecked: boolean
  rulesChecked: boolean
  exceptionFlagged: boolean
  exceptionReason: 'none' | 'low_evidence' | 'rule_conflict' | 'consent_missing' | 'data_mismatch'
  auditSealed: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): ComplianceState {
  return {
    caseId: 'UW-CA-77102',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    referralReason: 'Senior UW requested compliance validation (override path)',
    ruleSetVersion: 'UW-RULESET-4.8.2',
    modelVersion: 'risk-model-2.3.1',
    consentLogged: true,
    evidenceScore: 86,
    evidenceChecked: false,
    rulesChecked: false,
    exceptionFlagged: false,
    exceptionReason: 'none',
    auditSealed: false,
  }
}

function writeState(next: ComplianceState) {
  sessionStorage.setItem(KEY_STATE, JSON.stringify(next))
}
function clearAll() {
  sessionStorage.removeItem(KEY_STATE)
  sessionStorage.removeItem(KEY_AUDIT)
}
function appendAudit(message: string) {
  const prev = sessionStorage.getItem(KEY_AUDIT)
  const list: AuditItem[] = prev ? JSON.parse(prev) : []
  list.unshift({ ts: nowTs(), message })
  sessionStorage.setItem(KEY_AUDIT, JSON.stringify(list))
}

export default function DemoCompliancePage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)

  useEffect(() => {
    clearAll()
    writeState(defaultState())
    appendAudit(tr('Demo started (state reset)', 'Demo gestartet (Status zurückgesetzt)'))
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('UNDERWRITER DEMO', 'UNDERWRITER DEMO')}</div>
                <h2 className="page-title">{tr('Compliance – Audit & Governance Review', 'Compliance – Audit & Governance Review')}</h2>
                <div className="text-muted">{tr('Click-only · Audit validation · No underwriting decisions', 'Nur Klicks · Audit-Prüfung · Keine Underwriting-Entscheidungen')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      clearAll()
                      writeState(defaultState())
                      appendAudit(tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                    }}
                  >
                    {tr('Reset', 'Zurücksetzen')}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      appendAudit(tr('Case opened', 'Fall geöffnet'))
                      nav('/demo-underwriter/compliance/step/intake')
                    }}
                  >
                    {tr('Start review', 'Review starten')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="uw-shell">
              <div className="uw-left">
                <div className="uw-decision">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{tr('What you will click through', 'Was Sie durchklicken')}</strong>
                      <span>{tr('5 screens · audit-only validation', '5 Screens · Audit-only Validierung')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Compliance', 'Compliance')}</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">{tr('Case', 'Fall')}</div><div className="v">UW-CA-77102</div>
                        <div className="k">{tr('Insured', 'Versicherter')}</div><div className="v">Nordstadt Logistics GmbH</div>
                        <div className="k">{tr('Product', 'Produkt')}</div><div className="v">{tr('Carrier Liability + Fleet', 'Carrier Liability + Fleet')}</div>
                        <div className="k">{tr('Goal', 'Ziel')}</div><div className="v">{tr('Audit integrity & governance discipline', 'Audit-Integrität & Governance-Disziplin')}</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI stance (non-binding)', 'KI-Position (unverbindlich)')}</div>
                      <div className="uw-admin-small">
                        {tr('Compliance validates rules, evidence, consent, and audit completeness only.', 'Compliance validiert ausschließlich Regeln, Evidenz, Einwilligung und Audit-Vollständigkeit.')}
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">{tr('Rules', 'Regeln')}</span>
                        <span className="badge bg-azure-lt">{tr('Evidence', 'Evidenz')}</span>
                        <span className="badge bg-azure-lt">{tr('Consent', 'Einwilligung')}</span>
                        <span className="badge bg-azure-lt">{tr('Audit trail', 'Audit-Trail')}</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-underwriter/compliance/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/compliance')}>
                        {tr('Back to role page', 'Zurück zur Rollen-Seite')}
                      </button>
                    </div>

                    <div className="text-muted" style={{ fontSize: '0.82rem' }}>
                      {tr('Note: This start screen auto-resets session state on every visit to ensure the click flow always works.', 'Hinweis: Dieser Startscreen setzt den Status bei jedem Besuch zurück, damit der Klick-Flow immer funktioniert.')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>{tr('Compliance – Accountability', 'Compliance – Verantwortlichkeit')}</h4>
                  <div className="uw-admin-small">
                    <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('rule & audit integrity checks', 'Regel- & Audit-Integritätsprüfungen')}</div>
                    <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('audit trail & governance discipline', 'Audit-Trail & Governance-Disziplin')}</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">{tr('Rules', 'Regeln')}</span>
                    <span className="badge bg-indigo-lt">{tr('Evidence', 'Evidenz')}</span>
                    <span className="badge bg-indigo-lt">{tr('Consent', 'Einwilligung')}</span>
                    <span className="badge bg-indigo-lt">{tr('Audit', 'Audit')}</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('Audit (live)', 'Audit (live)')}</h4>
                    <div className="uw-audit">
                      {(() => {
                        const raw = sessionStorage.getItem(KEY_AUDIT)
                        const items: { ts: number; message: string }[] = raw ? JSON.parse(raw) : []
                        if (!items.length) return <div className="uw-admin-small">{tr('No entries yet.', 'Noch keine Einträge.')}</div>
                        return items.slice(0, 6).map((it) => (
                          <div className="uw-audit-item" key={it.ts}>
                            <div className="ts">{fmt(it.ts)}</div>
                            <div className="msg">{it.message}</div>
                          </div>
                        ))
                      })()}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
