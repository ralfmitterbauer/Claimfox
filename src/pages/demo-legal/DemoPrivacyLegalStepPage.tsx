import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_LEGAL_PRIVACY_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_PRIVACY_AUDIT'

type StepId = 'intake' | 'lawful-basis' | 'data-scope' | 'risk' | 'signoff'

type PrivacyLegalState = {
  caseId: string
  sourceProcess: 'Underwriting' | 'Claims' | 'Reporting'
  insured: string
  dataCategories: ('personal' | 'financial' | 'health' | 'telematics')[]
  jurisdiction: 'DE' | 'EU'
  lawfulBasis: 'contract' | 'legal_obligation' | 'legitimate_interest' | 'consent' | 'none'
  specialCategoryData: boolean
  processingAllowed: boolean
  dataScope: 'minimised' | 'standard' | 'extended'
  riskLevel: 'low' | 'medium' | 'high'
  escalationRequired: boolean
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): PrivacyLegalState {
  return {
    caseId: 'GDPR-2024-1182',
    sourceProcess: 'Underwriting',
    insured: 'Nordstadt Logistics GmbH',
    dataCategories: ['personal', 'financial'],
    jurisdiction: 'DE',
    lawfulBasis: 'legitimate_interest',
    specialCategoryData: false,
    processingAllowed: false,
    dataScope: 'standard',
    riskLevel: 'medium',
    escalationRequired: false,
    decisionLocked: false
  }
}

function readState(): PrivacyLegalState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: PrivacyLegalState) {
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

function toTitle(s: string) {
  return s.replace(/_/g, ' ')
}

export default function DemoPrivacyLegalStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Privacy intake', 'Privacy-Intake'), subtitle: tr('GDPR scope confirmation', 'GDPR-Scope bestätigen') },
    { id: 'lawful-basis', title: tr('Lawful basis', 'Rechtsgrundlage'), subtitle: tr('Art. 6 GDPR assessment', 'Art. 6 DSGVO Bewertung') },
    { id: 'data-scope', title: tr('Data scope', 'Datenscope'), subtitle: tr('Minimisation check', 'Datenminimierung prüfen') },
    { id: 'risk', title: tr('Privacy risk', 'Privacy-Risiko'), subtitle: tr('DPIA screening', 'DPIA-Screening') },
    { id: 'signoff', title: tr('Privacy sign-off', 'Privacy Sign-off'), subtitle: tr('Lock GDPR position', 'GDPR-Position fixieren') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])

  const [state, setState] = useState<PrivacyLegalState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-legal/privacy/step/intake" replace />
  const stepIndex = STEPS_LOCAL.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<PrivacyLegalState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-legal/privacy/step/${next}`)
  }

  const lawfulBasisLabel = (value: PrivacyLegalState['lawfulBasis']) => {
    switch (value) {
      case 'contract':
        return tr('Contract', 'Vertrag')
      case 'legal_obligation':
        return tr('Legal obligation', 'Rechtliche Verpflichtung')
      case 'legitimate_interest':
        return tr('Legitimate interest', 'Berechtigtes Interesse')
      case 'consent':
        return tr('Consent', 'Einwilligung')
      default:
        return tr('None', 'Keine')
    }
  }
  const dataScopeLabel = (value: PrivacyLegalState['dataScope']) => {
    switch (value) {
      case 'minimised':
        return tr('Minimised', 'Minimiert')
      case 'standard':
        return tr('Standard', 'Standard')
      default:
        return tr('Extended', 'Erweitert')
    }
  }
  const riskLabel = (value: PrivacyLegalState['riskLevel']) => {
    switch (value) {
      case 'low':
        return tr('Low', 'Niedrig')
      case 'medium':
        return tr('Medium', 'Mittel')
      default:
        return tr('High', 'Hoch')
    }
  }
  const dataCategoryLabel = (value: PrivacyLegalState['dataCategories'][number]) => {
    switch (value) {
      case 'personal':
        return tr('personal', 'personenbezogen')
      case 'financial':
        return tr('financial', 'finanziell')
      case 'health':
        return tr('health', 'gesundheitlich')
      default:
        return tr('telematics', 'Telematik')
    }
  }

  const snapshotBadges = [
    { label: `${tr('Lawful basis', 'Rechtsgrundlage')}: ${lawfulBasisLabel(state.lawfulBasis)}`, ok: state.lawfulBasis !== 'none' },
    { label: `${tr('Data scope', 'Datenscope')}: ${dataScopeLabel(state.dataScope)}`, ok: state.dataScope !== 'extended' },
    { label: `${tr('Risk', 'Risiko')}: ${riskLabel(state.riskLevel)}`, ok: state.riskLevel !== 'high' },
    { label: tr('Escalation required', 'Eskalation erforderlich'), ok: state.escalationRequired },
    { label: tr('Decision locked', 'Entscheidung gesperrt'), ok: state.decisionLocked }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('LEGAL DEMO', 'LEGAL-DEMO')}</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/privacy')}>
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
                    disabled={stepIndex === STEPS_LOCAL.length - 1}
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
                      <span>{tr('Step', 'Schritt')} {stepIndex + 1}/{STEPS_LOCAL.length} · {tr('GDPR review', 'GDPR-Review')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Privacy Legal', 'Privacy Legal')}</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <Kv k={tr('Case ID', 'Fall-ID')} v={state.caseId} />
                        <Kv k={tr('Process', 'Prozess')} v={tr(state.sourceProcess, state.sourceProcess === 'Underwriting' ? 'Underwriting' : state.sourceProcess === 'Claims' ? 'Claims' : 'Reporting')} />
                        <Kv k={tr('Insured', 'Versicherungsnehmer')} v={state.insured} />
                        <Kv k={tr('Jurisdiction', 'Gerichtsstand')} v={state.jurisdiction} />
                        <Kv k={tr('Data categories', 'Datenkategorien')} v={state.dataCategories.map(dataCategoryLabel).join(', ')} />
                      </div>
                    </div>

                    {stepId === 'intake' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI note', 'KI-Hinweis')}</div>
                          <div className="uw-admin-small">
                            {tr(
                              'Processing involves personal data under GDPR. Lawful basis must be confirmed before continuation.',
                              'Verarbeitung umfasst personenbezogene Daten nach GDPR. Rechtsgrundlage muss vor Fortsetzung bestätigt werden.',
                            )}
                          </div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Lawful basis assessment', 'Bewertung der Rechtsgrundlage')}</li>
                            <li>{tr('Data minimisation check', 'Prüfung der Datenminimierung')}</li>
                            <li>{tr('Risk & DPIA screening', 'Risiko- & DPIA-Screening')}</li>
                          </ul>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Privacy Legal received case for GDPR assessment', 'Privacy Legal hat Fall zur GDPR-Bewertung erhalten'))
                              goTo('lawful-basis')
                            }}
                          >
                            {tr('Assess lawful basis', 'Rechtsgrundlage prüfen')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'lawful-basis' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">
                            {tr('Legitimate interest appears applicable for underwriting risk assessment.', 'Berechtigtes Interesse scheint für Underwriting-Risikobewertung anwendbar.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Suggested', 'Vorgeschlagen')} v={<span className="badge bg-azure-lt">{tr('Legitimate interest', 'Berechtigtes Interesse')}</span>} />
                            <Kv k={tr('Special category', 'Besondere Kategorie')} v={state.specialCategoryData ? tr('Yes', 'Ja') : tr('No', 'Nein')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Lawful basis set: Contract', 'Rechtsgrundlage gesetzt: Vertrag'))
                              setPartial({ lawfulBasis: 'contract', processingAllowed: true })
                              goTo('data-scope')
                            }}
                          >
                            {tr('Set lawful basis: Contract', 'Rechtsgrundlage setzen: Vertrag')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Lawful basis set: Legitimate interest', 'Rechtsgrundlage gesetzt: Berechtigtes Interesse'))
                              setPartial({ lawfulBasis: 'legitimate_interest', processingAllowed: true })
                              goTo('data-scope')
                            }}
                          >
                            {tr('Set lawful basis: Legitimate interest', 'Rechtsgrundlage setzen: Berechtigtes Interesse')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Lawful basis set: Consent', 'Rechtsgrundlage gesetzt: Einwilligung'))
                              setPartial({ lawfulBasis: 'consent', processingAllowed: true })
                              goTo('data-scope')
                            }}
                          >
                            {tr('Set lawful basis: Consent', 'Rechtsgrundlage setzen: Einwilligung')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Lawful basis set: none', 'Rechtsgrundlage gesetzt: keine'))
                              setPartial({ lawfulBasis: 'none', processingAllowed: false })
                              goTo('data-scope')
                            }}
                          >
                            {tr('No lawful basis', 'Keine Rechtsgrundlage')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'data-scope' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">
                            {tr('Standard scope is sufficient; avoid expansion unless strictly necessary.', 'Standard-Scope ist ausreichend; Ausweitung nur bei strenger Notwendigkeit.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Required for purpose', 'Für Zweck erforderlich')} v={tr('Yes', 'Ja')} />
                            <Kv k={tr('Excess fields', 'Überflüssige Felder')} v={tr('No', 'Nein')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Data scope set: minimised', 'Datenscope gesetzt: minimiert'))
                              setPartial({ dataScope: 'minimised', riskLevel: state.riskLevel === 'high' ? 'medium' : state.riskLevel })
                              goTo('risk')
                            }}
                          >
                            {tr('Set scope: Minimised', 'Scope setzen: Minimiert')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Data scope set: standard', 'Datenscope gesetzt: standard'))
                              setPartial({ dataScope: 'standard' })
                              goTo('risk')
                            }}
                          >
                            {tr('Set scope: Standard', 'Scope setzen: Standard')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Data scope set: extended', 'Datenscope gesetzt: erweitert'))
                              setPartial({ dataScope: 'extended', riskLevel: 'high' })
                              goTo('risk')
                            }}
                          >
                            {tr('Set scope: Extended', 'Scope setzen: Erweitert')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'risk' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">
                            {tr('Risk is medium. DPIA not mandatory but escalation is optional.', 'Risiko ist mittel. DPIA nicht verpflichtend, Eskalation optional.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Volume', 'Volumen')} v={tr('Moderate', 'Moderat')} />
                            <Kv k={tr('Sensitivity', 'Sensitivität')} v={tr('Standard personal data', 'Standard personenbezogene Daten')} />
                            <Kv k={tr('Automation impact', 'Automatisierungswirkung')} v={tr('Medium', 'Mittel')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Privacy risk set: low', 'Privacy-Risiko gesetzt: niedrig'))
                              setPartial({ riskLevel: 'low' })
                            }}
                          >
                            {tr('Set risk: Low', 'Risiko setzen: Niedrig')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Privacy risk set: medium', 'Privacy-Risiko gesetzt: mittel'))
                              setPartial({ riskLevel: 'medium' })
                            }}
                          >
                            {tr('Set risk: Medium', 'Risiko setzen: Mittel')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Privacy risk set: high', 'Privacy-Risiko gesetzt: hoch'))
                              setPartial({ riskLevel: 'high' })
                            }}
                          >
                            {tr('Set risk: High', 'Risiko setzen: Hoch')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('DPIA escalation triggered', 'DPIA-Eskalation ausgelöst'))
                              setPartial({ escalationRequired: true })
                            }}
                          >
                            {tr('Escalate for DPIA review', 'Zur DPIA-Prüfung eskalieren')}
                          </button>
                        </div>

                        <div className="uw-cta-row">
                          <button className="btn btn-primary" onClick={() => goTo('signoff')}>
                            {tr('Proceed to sign-off', 'Weiter zum Sign-off')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'signoff' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{tr('Decision summary', 'Entscheidungszusammenfassung')}</div>
                          <div className="uw-admin-small">
                            {tr('GDPR processing is permitted only with lawful basis and proportionate risk controls.', 'GDPR-Verarbeitung ist nur mit Rechtsgrundlage und angemessenen Risikokontrollen zulässig.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Lawful basis', 'Rechtsgrundlage')} v={lawfulBasisLabel(state.lawfulBasis)} />
                            <Kv k={tr('Data scope', 'Datenscope')} v={dataScopeLabel(state.dataScope)} />
                            <Kv k={tr('Risk', 'Risiko')} v={riskLabel(state.riskLevel)} />
                            <Kv k={tr('Escalation', 'Eskalation')} v={state.escalationRequired ? 'DPIA' : tr('None', 'Keine')} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI audit note', 'KI-Audit-Hinweis')}</div>
                          <div className="uw-admin-small">
                            {tr(
                              'Decision aligned with GDPR principles of lawfulness, minimisation, and accountability.',
                              'Entscheidung entspricht GDPR-Prinzipien (Rechtmäßigkeit, Minimierung, Verantwortlichkeit).',
                            )}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv
                              k={tr('Output', 'Ergebnis')}
                              v={
                                state.lawfulBasis !== 'none' && state.riskLevel !== 'high'
                                  ? tr('GDPR processing permitted', 'GDPR-Verarbeitung erlaubt')
                                  : tr('Processing restricted / blocked', 'Verarbeitung eingeschränkt / blockiert')
                              }
                            />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Privacy decision locked (GDPR position recorded)', 'Privacy-Entscheidung gesperrt (GDPR-Position erfasst)'))
                              setPartial({ decisionLocked: true })
                              nav('/demo-legal/privacy')
                            }}
                          >
                            {tr('Lock privacy decision', 'Privacy-Entscheidung sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/privacy')}>
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
                      )}
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('AI & Accountability', 'KI & Verantwortung')}</h4>
                    <div className="uw-admin-small">
                      <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('lawful basis, data scope, risk', 'Rechtsgrundlage, Datenscope, Risiko')}</div>
                      <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('GDPR compliance & defensibility', 'GDPR-Compliance & rechtliche Belastbarkeit')}</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>{tr('Lawful basis under Art. 6', 'Rechtsgrundlage nach Art. 6')}</li>
                      <li>{tr('Data minimisation and scope', 'Datenminimierung und Scope')}</li>
                      <li>{tr('DPIA escalation if risk is high', 'DPIA-Eskalation bei hohem Risiko')}</li>
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
