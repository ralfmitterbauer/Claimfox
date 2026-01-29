import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'

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

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Privacy intake', subtitle: 'GDPR scope confirmation' },
  { id: 'lawful-basis', title: 'Lawful basis', subtitle: 'Art. 6 GDPR assessment' },
  { id: 'data-scope', title: 'Data scope', subtitle: 'Minimisation check' },
  { id: 'risk', title: 'Privacy risk', subtitle: 'DPIA screening' },
  { id: 'signoff', title: 'Privacy sign-off', subtitle: 'Lock GDPR position' }
]

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
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])

  const [state, setState] = useState<PrivacyLegalState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-legal/privacy/step/intake" replace />
  const stepIndex = STEPS.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<PrivacyLegalState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-legal/privacy/step/${next}`)
  }

  const snapshotBadges = [
    { label: `Lawful basis: ${state.lawfulBasis === 'none' ? 'none' : toTitle(state.lawfulBasis)}`, ok: state.lawfulBasis !== 'none' },
    { label: `Data scope: ${state.dataScope}`, ok: state.dataScope !== 'extended' },
    { label: `Risk: ${state.riskLevel}`, ok: state.riskLevel !== 'high' },
    { label: 'Escalation required', ok: state.escalationRequired },
    { label: 'Decision locked', ok: state.decisionLocked }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">LEGAL DEMO</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/privacy')}>
                    Restart
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => goTo(STEPS[Math.max(0, stepIndex - 1)].id)}
                    disabled={stepIndex === 0}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => goTo(STEPS[Math.min(STEPS.length - 1, stepIndex + 1)].id)}
                    disabled={stepIndex === STEPS.length - 1}
                  >
                    Next
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
                      <span>Step {stepIndex + 1}/{STEPS.length} · GDPR review</span>
                    </div>
                    <span className="badge bg-indigo-lt">Privacy Legal</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <Kv k="Case ID" v={state.caseId} />
                        <Kv k="Process" v={state.sourceProcess} />
                        <Kv k="Insured" v={state.insured} />
                        <Kv k="Jurisdiction" v={state.jurisdiction} />
                        <Kv k="Data categories" v={state.dataCategories.join(', ')} />
                      </div>
                    </div>

                    {stepId === 'intake' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI note</div>
                          <div className="uw-admin-small">
                            Processing involves personal data under GDPR. Lawful basis must be confirmed before continuation.
                          </div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Lawful basis assessment</li>
                            <li>Data minimisation check</li>
                            <li>Risk & DPIA screening</li>
                          </ul>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Privacy Legal received case for GDPR assessment')
                              goTo('lawful-basis')
                            }}
                          >
                            Assess lawful basis
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'lawful-basis' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">
                            Legitimate interest appears applicable for underwriting risk assessment.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Suggested" v={<span className="badge bg-azure-lt">Legitimate interest</span>} />
                            <Kv k="Special category" v={state.specialCategoryData ? 'Yes' : 'No'} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Lawful basis set: Contract')
                              setPartial({ lawfulBasis: 'contract', processingAllowed: true })
                              goTo('data-scope')
                            }}
                          >
                            Set lawful basis: Contract
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Lawful basis set: Legitimate interest')
                              setPartial({ lawfulBasis: 'legitimate_interest', processingAllowed: true })
                              goTo('data-scope')
                            }}
                          >
                            Set lawful basis: Legitimate interest
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Lawful basis set: Consent')
                              setPartial({ lawfulBasis: 'consent', processingAllowed: true })
                              goTo('data-scope')
                            }}
                          >
                            Set lawful basis: Consent
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Lawful basis set: none')
                              setPartial({ lawfulBasis: 'none', processingAllowed: false })
                              goTo('data-scope')
                            }}
                          >
                            No lawful basis
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'data-scope' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">
                            Standard scope is sufficient; avoid expansion unless strictly necessary.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Required for purpose" v="Yes" />
                            <Kv k="Excess fields" v="No" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Data scope set: minimised')
                              setPartial({ dataScope: 'minimised', riskLevel: state.riskLevel === 'high' ? 'medium' : state.riskLevel })
                              goTo('risk')
                            }}
                          >
                            Set scope: Minimised
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Data scope set: standard')
                              setPartial({ dataScope: 'standard' })
                              goTo('risk')
                            }}
                          >
                            Set scope: Standard
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Data scope set: extended')
                              setPartial({ dataScope: 'extended', riskLevel: 'high' })
                              goTo('risk')
                            }}
                          >
                            Set scope: Extended
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'risk' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">
                            Risk is medium. DPIA not mandatory but escalation is optional.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Volume" v="Moderate" />
                            <Kv k="Sensitivity" v="Standard personal data" />
                            <Kv k="Automation impact" v="Medium" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Privacy risk set: low')
                              setPartial({ riskLevel: 'low' })
                            }}
                          >
                            Set risk: Low
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Privacy risk set: medium')
                              setPartial({ riskLevel: 'medium' })
                            }}
                          >
                            Set risk: Medium
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Privacy risk set: high')
                              setPartial({ riskLevel: 'high' })
                            }}
                          >
                            Set risk: High
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('DPIA escalation triggered')
                              setPartial({ escalationRequired: true })
                            }}
                          >
                            Escalate for DPIA review
                          </button>
                        </div>

                        <div className="uw-cta-row">
                          <button className="btn btn-primary" onClick={() => goTo('signoff')}>
                            Proceed to sign-off
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'signoff' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Decision summary</div>
                          <div className="uw-admin-small">
                            GDPR processing is permitted only with lawful basis and proportionate risk controls.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Lawful basis" v={state.lawfulBasis === 'none' ? 'None' : toTitle(state.lawfulBasis)} />
                            <Kv k="Data scope" v={state.dataScope} />
                            <Kv k="Risk" v={state.riskLevel} />
                            <Kv k="Escalation" v={state.escalationRequired ? 'DPIA' : 'None'} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI audit note</div>
                          <div className="uw-admin-small">
                            Decision aligned with GDPR principles of lawfulness, minimisation, and accountability.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv
                              k="Output"
                              v={
                                state.lawfulBasis !== 'none' && state.riskLevel !== 'high'
                                  ? 'GDPR processing permitted'
                                  : 'Processing restricted / blocked'
                              }
                            />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Privacy decision locked (GDPR position recorded)')
                              setPartial({ decisionLocked: true })
                              nav('/demo-legal/privacy')
                            }}
                          >
                            Lock privacy decision
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/privacy')}>
                            Restart demo
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>Step navigation</h4>
                  <div className="list-group list-group-flush">
                    {STEPS.map((s, idx) => {
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
                          {active ? <span className="badge bg-white text-indigo">Current</span> : <span className="badge bg-indigo-lt">Open</span>}
                        </button>
                      )}
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>AI & Accountability</h4>
                    <div className="uw-admin-small">
                      <div><strong>Decides:</strong> lawful basis, data scope, risk</div>
                      <div><strong>Accountable:</strong> GDPR compliance & defensibility</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>Lawful basis under Art. 6</li>
                      <li>Data minimisation and scope</li>
                      <li>DPIA escalation if risk is high</li>
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>Snapshot</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {snapshotBadges.map((b) => (
                        <span key={b.label} className={`badge ${b.ok ? 'bg-green-lt' : 'bg-muted-lt'}`}>
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>Audit log</h4>
                    <div className="uw-audit">
                      {(() => {
                        const items = readAudit()
                        if (!items.length) return <div className="uw-admin-small">No entries yet.</div>
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
