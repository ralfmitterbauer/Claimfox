import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_claimsStorage'

const KEY_STATE = 'DEMO_CLAIMS_HANDLER_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_HANDLER_AUDIT'

type StepId = 'intake' | 'coverage-check' | 'evidence' | 'decision' | 'next-actions'

type ClaimsHandlerState = {
  caseId: string
  insured: string
  policyNumber: string
  product: string
  reportedAmount: number
  coverageSignal: 'clear' | 'ambiguous' | 'excluded'
  evidencePack: 'missing' | 'partial' | 'complete'
  decision: 'pending' | 'pay' | 'deny' | 'refer'
  nextAction: 'none' | 'request_docs' | 'appoint_expert' | 'payment_release' | 'refer_legal'
  decisionReady: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Start coverage check' },
  { id: 'coverage-check', title: 'Coverage', subtitle: 'Set coverage signal' },
  { id: 'evidence', title: 'Evidence', subtitle: 'Validate evidence pack' },
  { id: 'decision', title: 'Decision', subtitle: 'Pay, deny, or refer' },
  { id: 'next-actions', title: 'Next actions', subtitle: 'Execute follow-up' }
]

function defaultState(): ClaimsHandlerState {
  return {
    caseId: 'CLM-10421',
    insured: 'Nordstadt Logistics GmbH',
    policyNumber: 'PL-204889',
    product: 'Carrier Liability + Fleet',
    reportedAmount: 42000,
    coverageSignal: 'ambiguous',
    evidencePack: 'partial',
    decision: 'pending',
    nextAction: 'none',
    decisionReady: false
  }
}

function readyForDecision(state: ClaimsHandlerState) {
  if (state.decision === 'pay' && state.coverageSignal === 'clear' && state.evidencePack === 'complete') return true
  if (state.decision === 'deny' && state.coverageSignal === 'excluded') return true
  if (state.decision === 'refer' && state.coverageSignal !== 'clear') return true
  return false
}

export default function DemoClaimsHandlerStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<ClaimsHandlerState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-claims/handler/step/intake" replace />

  function setPartial(p: Partial<ClaimsHandlerState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: `Coverage ${state.coverageSignal}`, ok: state.coverageSignal === 'clear' },
    { label: `Evidence ${state.evidencePack}`, ok: state.evidencePack === 'complete' },
    { label: `Decision ${state.decision}`, ok: state.decision !== 'pending' },
    { label: `Next ${state.nextAction}`, ok: state.nextAction !== 'none' },
    { label: state.decisionReady ? 'Ready' : 'Not ready', ok: state.decisionReady }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">CLAIMS DEMO</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/handler')}>
                    Restart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="finance-shell">
              <div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <div className="text-muted">Step {STEPS.findIndex((s) => s.id === stepId) + 1}/{STEPS.length}</div>
                      <h3 className="card-title mb-0">{current.title}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Case</div>
                    <div className="fw-semibold">{state.caseId} · {state.policyNumber}</div>
                    <div className="text-muted mt-2">Reported amount</div>
                    <div className="fw-semibold">€ {state.reportedAmount}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Coverage ambiguous pending clause confirmation; ensure evidence pack completeness.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Handler intake confirmed')
                            nav('/demo-claims/handler/step/coverage-check')
                          }}>Begin coverage check</button>
                        </div>
                      </>
                    )}

                    {stepId === 'coverage-check' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Set coverage signal to ambiguous unless exclusion clearly applies.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Coverage: Clear', value: 'clear' },
                            { label: 'Coverage: Ambiguous', value: 'ambiguous' },
                            { label: 'Coverage: Excluded', value: 'excluded' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Coverage signal set: ${opt.value}`)
                              setPartial({ coverageSignal: opt.value as ClaimsHandlerState['coverageSignal'] })
                              nav('/demo-claims/handler/step/evidence')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'evidence' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Mark pack complete only if invoice received; else request docs.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Evidence pack confirmed complete')
                            setPartial({ evidencePack: 'complete' })
                            nav('/demo-claims/handler/step/decision')
                          }}>Evidence pack: Complete</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Evidence pack marked partial')
                            setPartial({ evidencePack: 'partial' })
                            nav('/demo-claims/handler/step/decision')
                          }}>Evidence pack: Partial</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Missing docs requested')
                            setPartial({ nextAction: 'request_docs', evidencePack: 'partial' })
                          }}>Request missing docs</button>
                        </div>
                      </>
                    )}

                    {stepId === 'decision' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Decision guardrails depend on coverage + evidence status.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Decision: Pay', value: 'pay' },
                            { label: 'Decision: Refer', value: 'refer' },
                            { label: 'Decision: Deny', value: 'deny' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Handler decision set: ${opt.value}`)
                              const next = { ...state, decision: opt.value as ClaimsHandlerState['decision'] }
                              const ready = readyForDecision(next)
                              setPartial({ decision: opt.value as ClaimsHandlerState['decision'], decisionReady: ready })
                              nav('/demo-claims/handler/step/next-actions')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'next-actions' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Proceed only if decision prerequisites are met.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Payment release initiated')
                            setPartial({ nextAction: 'payment_release' })
                          }} disabled={!(state.decision === 'pay' && state.decisionReady)}>
                            Next: Release payment
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Referred to Legal')
                            setPartial({ nextAction: 'refer_legal' })
                          }} disabled={state.decision !== 'refer'}>
                            Next: Refer to Legal
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Denial notice triggered')
                            setPartial({ nextAction: 'refer_legal' })
                          }} disabled={!(state.decision === 'deny' && state.decisionReady)}>
                            Next: Send denial notice
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/handler')}>
                            Restart demo
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>Step navigation</h4>
                  <div className="list-group">
                    {STEPS.map((s) => (
                      <button
                        key={s.id}
                        className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`}
                        onClick={() => nav(`/demo-claims/handler/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: coverage position + evidence checks</div>
                  <div>Accountable: SLA & communication discipline</div>

                  <hr />
                  <h4>Snapshot</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {snapshot.map((s) => (
                      <span key={s.label} className={`badge ${s.ok ? 'bg-green-lt' : 'bg-secondary-lt'}`}>
                        {s.label}
                      </span>
                    ))}
                  </div>

                  <hr />
                  <h4>Audit log</h4>
                  <div className="admin-audit">
                    {audit.length === 0 && <div className="text-muted">No entries yet.</div>}
                    {audit.slice(0, 8).map((a) => (
                      <div key={`${a.ts}-${a.message}`} className="admin-audit-item">
                        <div className="ts">{a.ts}</div>
                        <div className="msg">{a.message}</div>
                      </div>
                    ))}
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
