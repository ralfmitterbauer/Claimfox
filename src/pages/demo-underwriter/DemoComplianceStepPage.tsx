import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_UW_COMPLIANCE_STATE'
const KEY_AUDIT = 'DEMO_UW_COMPLIANCE_AUDIT'

type StepId = 'intake' | 'rules' | 'evidence' | 'exceptions' | 'signoff'

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

function readState(): ComplianceState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: ComplianceState) {
  sessionStorage.setItem(KEY_STATE, JSON.stringify(next))
}
function readAudit(): AuditItem[] {
  try {
    const raw = sessionStorage.getItem(KEY_AUDIT)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
function appendAudit(message: string) {
  const list = readAudit()
  list.unshift({ ts: nowTs(), message })
  sessionStorage.setItem(KEY_AUDIT, JSON.stringify(list))
}

function Kv({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <>
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </>
  )
}

export default function DemoComplianceStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Compliance intake', 'Compliance-Eingang'), subtitle: tr('Scope & governance only', 'Nur Scope & Governance') },
    { id: 'rules', title: tr('Rules integrity', 'Regel-Integrität'), subtitle: tr('Validate ruleset execution', 'Regelset-Ausführung prüfen') },
    { id: 'evidence', title: tr('Evidence review', 'Evidenzprüfung'), subtitle: tr('Confirm evidence quality', 'Evidenzqualität bestätigen') },
    { id: 'exceptions', title: tr('Exceptions', 'Ausnahmen'), subtitle: tr('Escalate or mark informational', 'Eskalieren oder informational markieren') },
    { id: 'signoff', title: tr('Audit sign-off', 'Audit-Abschluss'), subtitle: tr('Seal audit trail', 'Audit-Trail versiegeln') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])

  const [state, setState] = useState<ComplianceState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-underwriter/compliance/step/intake" replace />
  const stepIndex = STEPS_LOCAL.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<ComplianceState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-underwriter/compliance/step/${next}`)
  }

  const snapshotBadges = [
    { label: tr('Rules checked', 'Regeln geprüft'), ok: state.rulesChecked },
    { label: tr('Evidence checked', 'Evidenz geprüft'), ok: state.evidenceChecked },
    { label: tr('Consent logged', 'Einwilligung erfasst'), ok: state.consentLogged },
    { label: tr('Exception flagged', 'Ausnahme markiert'), ok: state.exceptionFlagged },
    { label: tr('Audit sealed', 'Audit versiegelt'), ok: state.auditSealed },
  ]

  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'rules') return state.rulesChecked
    if (stepId === 'evidence') return state.evidenceChecked
    if (stepId === 'exceptions') return true
    if (stepId === 'signoff') return true
    return false
  })()

  const exceptionAction = (() => {
    switch (state.exceptionReason) {
      case 'low_evidence':
        return tr('Request additional documentation', 'Zusätzliche Dokumente anfordern')
      case 'rule_conflict':
        return tr('Escalate to Compliance Lead', 'An Compliance Lead eskalieren')
      case 'consent_missing':
        return tr('Block until consent logged', 'Blockieren bis Einwilligung erfasst ist')
      case 'data_mismatch':
        return tr('Reconcile entity identifiers', 'Entitätskennungen abgleichen')
      default:
        return tr('No exceptions detected', 'Keine Ausnahmen erkannt')
    }
  })()

  const exceptionReasonLabel = (() => {
    switch (state.exceptionReason) {
      case 'low_evidence':
        return tr('Low evidence', 'Geringe Evidenz')
      case 'rule_conflict':
        return tr('Rule conflict', 'Regelkonflikt')
      case 'consent_missing':
        return tr('Consent missing', 'Einwilligung fehlt')
      case 'data_mismatch':
        return tr('Data mismatch', 'Datenabweichung')
      default:
        return tr('None', 'Keine')
    }
  })()

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('UNDERWRITER DEMO', 'UNDERWRITER-DEMO')}</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/compliance')}>
                    {tr('Restart', 'Neu starten')}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => goTo(STEPS_LOCAL[Math.max(0, stepIndex - 1)].id)}
                    disabled={stepIndex === 0}
                  >
                    {tr('Back', 'Zurück')}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => goTo(STEPS_LOCAL[Math.min(STEPS_LOCAL.length - 1, stepIndex + 1)].id)}
                    disabled={!canGoNext || stepIndex === STEPS_LOCAL.length - 1}
                  >
                    {tr('Next', 'Weiter')}
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
                <div className="uw-decision uw-fade-in">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{current.title}</strong>
                      <span>{tr('Step', 'Schritt')} {stepIndex + 1}/{STEPS_LOCAL.length} · {tr('audit only', 'nur Audit')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Compliance', 'Compliance')}</span>
                  </div>

                  <div className="uw-decision-body">
                    {stepId === 'intake' && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k={tr('Case ID', 'Fall-ID')} v={state.caseId} />
                            <Kv k={tr('Insured', 'Versicherungsnehmer')} v={state.insured} />
                            <Kv k={tr('Product', 'Produkt')} v={state.product} />
                            <Kv k={tr('Referral', 'Weiterleitung')} v={tr('Senior UW requested compliance validation (override path)', 'Senior UW fordert Compliance-Validierung (Override-Pfad)')} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Scope', 'Scope')}</div>
                          <div className="uw-admin-small">
                            {tr(
                              'Scope is governance validation only. Underwriting decision remains with Underwriter/Carrier Authority.',
                              'Scope ist ausschließlich Governance-Validierung. Die Underwriting-Entscheidung bleibt beim Underwriter/Carrier Authority.',
                            )}
                          </div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Verify consent', 'Einwilligung prüfen')}</li>
                            <li>{tr('Verify rule set version and applied rules', 'Regelset-Version und angewendete Regeln prüfen')}</li>
                            <li>{tr('Verify evidence completeness', 'Evidenz-Vollständigkeit prüfen')}</li>
                            <li>{tr('Ensure audit trail is complete', 'Audit-Trail auf Vollständigkeit prüfen')}</li>
                          </ul>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Compliance review started (case received)', 'Compliance-Prüfung gestartet (Fall erhalten)'))
                              goTo('rules')
                            }}
                          >
                            {tr('Start compliance review', 'Compliance-Prüfung starten')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'rules' && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k={tr('RuleSet', 'Regelset')} v={<span className="badge bg-azure-lt">{state.ruleSetVersion}</span>} />
                            <Kv k={tr('Model', 'Modell')} v={<span className="badge bg-azure-lt">{state.modelVersion}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Rules executed', 'Regeln ausgeführt')}</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Appetite check: PASS', 'Appetite-Check: BESTANDEN')}</li>
                            <li>{tr('Sanctions screening: PASS', 'Sanktionsprüfung: BESTANDEN')}</li>
                            <li>{tr('Geo constraints: PASS', 'Geo-Constraints: BESTANDEN')}</li>
                            <li>{tr('Override used: YES (requires audit justification)', 'Override verwendet: JA (Audit-Begründung erforderlich)')}</li>
                          </ul>
                          <div className="uw-admin-small" style={{ marginTop: '0.4rem' }}>
                            {tr('Override path detected. Ensure justification + approval trail exists.', 'Override-Pfad erkannt. Begründung + Genehmigungspfad sicherstellen.')}
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Rules integrity confirmed (ruleset validated)', 'Regel-Integrität bestätigt (Regelset validiert)'))
                              setPartial({ rulesChecked: true, exceptionFlagged: false, exceptionReason: 'none' })
                              goTo('evidence')
                            }}
                          >
                            {tr('Confirm rule integrity', 'Regel-Integrität bestätigen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Exception flagged: rule conflict (manual review required)', 'Ausnahme markiert: Regelkonflikt (manuelle Prüfung erforderlich)'))
                              setPartial({ rulesChecked: true, exceptionFlagged: true, exceptionReason: 'rule_conflict' })
                              goTo('evidence')
                            }}
                          >
                            {tr('Flag rule conflict', 'Regelkonflikt markieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'evidence' && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k={tr('Company registry match', 'Handelsregister-Abgleich')} v={<span className="badge bg-green-lt">{tr('MATCH', 'MATCH')}</span>} />
                            <Kv k={tr('Loss history', 'Schadenhistorie')} v={<span className="badge bg-green-lt">{tr('YES', 'JA')}</span>} />
                            <Kv k={tr('Financials', 'Finanzdaten')} v={<span className="badge bg-green-lt">{tr('YES', 'JA')}</span>} />
                            <Kv k={tr('Consent record', 'Einwilligungsnachweis')} v={<span className="badge bg-green-lt">{tr('PRESENT', 'VORHANDEN')}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Evidence quality', 'Evidenzqualität')}</div>
                          <div className="uw-admin-small">{tr('Evidence score', 'Evidenz-Score')}: {state.evidenceScore}/100</div>
                          <div className="uw-admin-small">{tr('Evidence quality is within threshold. Escalate only if below 70.', 'Evidenzqualität liegt im Schwellenbereich. Nur eskalieren, wenn unter 70.')}</div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Evidence pack confirmed (quality sufficient)', 'Evidenzpaket bestätigt (Qualität ausreichend)'))
                              setPartial({ evidenceChecked: true })
                              goTo('exceptions')
                            }}
                          >
                            {tr('Confirm evidence complete', 'Evidenz vollständig bestätigen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Exception flagged: low evidence (quality below threshold)', 'Ausnahme markiert: geringe Evidenz (Qualität unter Schwelle)'))
                              setPartial({ evidenceChecked: true, exceptionFlagged: true, exceptionReason: 'low_evidence' })
                              goTo('exceptions')
                            }}
                          >
                            {tr('Flag low evidence', 'Geringe Evidenz markieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'exceptions' && (
                      <>
                        {state.exceptionFlagged ? (
                          <>
                            <div className="uw-block uw-ai">
                              <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Exception flagged', 'Ausnahme markiert')}</div>
                              <div className="uw-admin-small">{tr('Reason', 'Grund')}: {exceptionReasonLabel}</div>
                              <div className="uw-admin-small">{tr('Recommended action', 'Empfohlene Maßnahme')}: {exceptionAction}</div>
                              <div className="uw-admin-small" style={{ marginTop: '0.3rem' }}>
                                {tr(
                                  'Do not block underwriting automatically unless consent missing. Escalate with clear rationale.',
                                  'Underwriting nicht automatisch blockieren, außer Einwilligung fehlt. Mit klarer Begründung eskalieren.',
                                )}
                              </div>
                            </div>

                            <div className="uw-cta-row">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  appendAudit(tr('Escalated to Compliance Lead (exception review)', 'An Compliance Lead eskaliert (Ausnahmeprüfung)'))
                                  goTo('signoff')
                                }}
                              >
                                {tr('Escalate to Compliance Lead', 'An Compliance Lead eskalieren')}
                              </button>
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                  appendAudit(tr('Exception noted (informational) – underwriting not blocked', 'Ausnahme vermerkt (informational) – Underwriting nicht blockiert'))
                                  goTo('signoff')
                                }}
                              >
                                {tr('Mark as informational (no block)', 'Als informational markieren (kein Block)')}
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="uw-block">
                              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{tr('No exceptions detected', 'Keine Ausnahmen erkannt')}</div>
                              <div className="uw-admin-small">{tr('All governance checks passed.', 'Alle Governance-Prüfungen bestanden.')}</div>
                            </div>
                            <div className="uw-cta-row">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  appendAudit(tr('No exceptions detected (proceed to audit seal)', 'Keine Ausnahmen erkannt (weiter zur Audit-Versiegelung)'))
                                  goTo('signoff')
                                }}
                              >
                                {tr('Proceed to audit seal', 'Zur Audit-Versiegelung')}
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {stepId === 'signoff' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{tr('Compliance summary', 'Compliance-Zusammenfassung')}</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Rules checked', 'Regeln geprüft')} v={<span className={`badge ${state.rulesChecked ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.rulesChecked ? tr('Yes', 'Ja') : tr('No', 'Nein')}</span>} />
                            <Kv k={tr('Evidence checked', 'Evidenz geprüft')} v={<span className={`badge ${state.evidenceChecked ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.evidenceChecked ? tr('Yes', 'Ja') : tr('No', 'Nein')}</span>} />
                            <Kv k={tr('Consent logged', 'Einwilligung erfasst')} v={<span className={`badge ${state.consentLogged ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.consentLogged ? tr('Yes', 'Ja') : tr('No', 'Nein')}</span>} />
                            <Kv k={tr('Exception', 'Ausnahme')} v={<span className={`badge ${state.exceptionFlagged ? 'bg-yellow-lt' : 'bg-green-lt'}`}>{state.exceptionFlagged ? tr('Flagged', 'Markiert') : tr('None', 'Keine')}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Output', 'Ergebnis')}</div>
                          <div className="uw-admin-small">
                            {state.exceptionFlagged || !state.rulesChecked || !state.evidenceChecked
                              ? tr('Compliance exception flagged', 'Compliance-Ausnahme markiert')
                              : tr('Compliance cleared', 'Compliance freigegeben')}
                          </div>
                          <div className="uw-admin-small" style={{ marginTop: '0.3rem' }}>
                            {tr(
                              'Sealing audit trail ensures traceability for governance & regulators.',
                              'Das Versiegeln des Audit-Trails sichert Nachvollziehbarkeit für Governance & Regulatoren.',
                            )}
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              if (!state.auditSealed) {
                                appendAudit(tr('Audit sealed (compliance sign-off recorded)', 'Audit versiegelt (Compliance-Sign-off erfasst)'))
                                setPartial({ auditSealed: true })
                              }
                              nav('/demo-underwriter/compliance')
                            }}
                          >
                            {tr('Seal audit trail', 'Audit-Trail versiegeln')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => nav('/demo-underwriter/compliance')}
                          >
                            {tr('Restart demo', 'Demo neu starten')}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>{tr('Step navigation', 'Schritt-Navigation')}</h4>
                  <div className="list-group list-group-flush">
                    {STEPS_LOCAL.map((s, idx) => {
                      const active = s.id === stepId
                      return (
                        <button
                          key={s.id}
                          className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${active ? 'active' : ''}`}
                          onClick={() => goTo(s.id)}
                          type="button"
                        >
                          <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span className="badge bg-indigo-lt">{idx + 1}</span>
                            <span>{s.title}</span>
                          </span>
                          {active ? <span className="badge bg-white text-indigo">{tr('Current', 'Aktuell')}</span> : <span className="badge bg-indigo-lt">{tr('Open', 'Offen')}</span>}
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('AI & Accountability', 'KI & Verantwortung')}</h4>
                    <div className="uw-admin-small">
                      <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('rule & audit integrity checks', 'Regel- & Audit-Integritätsprüfungen')}</div>
                      <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('audit trail & governance discipline', 'Audit-Trail & Governance-Disziplin')}</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>{tr('Validates ruleset + model versions', 'Validiert Regelset- und Modellversionen')}</li>
                      <li>{tr('Confirms evidence completeness', 'Bestätigt Evidenz-Vollständigkeit')}</li>
                      <li>{tr('Flags exceptions with rationale', 'Markiert Ausnahmen mit Begründung')}</li>
                      <li>{tr('Seals audit trail for regulators', 'Versiegelt Audit-Trail für Regulatoren')}</li>
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('Snapshot', 'Snapshot')}</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {snapshotBadges.map((b) => (
                        <span key={b.label} className={`badge ${b.ok ? 'bg-green-lt' : 'bg-muted-lt'}`}>
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('Audit log', 'Audit-Log')}</h4>
                    <div className="uw-audit">
                      {(() => {
                        const items = readAudit()
                        if (!items.length) return <div className="uw-admin-small">{tr('No entries yet.', 'Noch keine Einträge.')}</div>
                        return items.slice(0, 8).map((it) => (
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
