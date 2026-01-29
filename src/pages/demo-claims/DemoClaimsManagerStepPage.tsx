import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_claimsStorage'

const KEY_STATE = 'DEMO_CLAIMS_MANAGER_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_MANAGER_AUDIT'

type StepId = 'intake' | 'triage' | 'authority' | 'plan' | 'lock'

type ClaimsManagerState = {
  caseId: string
  insured: string
  product: string
  reportedAmount: number
  severity: 'low' | 'medium' | 'high'
  triageRoute: 'fast_track' | 'standard' | 'complex' | 'siu' | 'none'
  authorityLevel: 'handler' | 'senior' | 'legal' | 'manager'
  planSelected: 'pay' | 'investigate' | 'deny' | 'settle' | 'none'
  escalated: boolean
  decisionLocked: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Start triage' },
  { id: 'triage', title: 'Triage', subtitle: 'Choose routing' },
  { id: 'authority', title: 'Authority', subtitle: 'Assign authority' },
  { id: 'plan', title: 'Plan', subtitle: 'Select operational plan' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock manager decision' }
]

function defaultState(): ClaimsManagerState {
  return {
    caseId: 'CLM-10421',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    reportedAmount: 42000,
    severity: 'medium',
    triageRoute: 'none',
    authorityLevel: 'handler',
    planSelected: 'none',
    escalated: false,
    decisionLocked: false
  }
}

export default function DemoClaimsManagerStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<ClaimsManagerState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-claims/manager/step/intake" replace />

  function setPartial(p: Partial<ClaimsManagerState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: `Triage ${state.triageRoute}`, ok: state.triageRoute !== 'none' },
    { label: `Authority ${state.authorityLevel}`, ok: state.authorityLevel !== 'handler' },
    { label: `Plan ${state.planSelected}`, ok: state.planSelected !== 'none' },
    { label: state.escalated ? 'Escalated' : 'Not escalated', ok: state.escalated },
    { label: state.decisionLocked ? 'Locked' : 'Unlocked', ok: state.decisionLocked }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/manager')}>
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
                    <div className="fw-semibold">{state.caseId} · {state.insured}</div>
                    <div className="text-muted mt-2">Reported amount</div>
                    <div className="fw-semibold">€ {state.reportedAmount}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Claim appears medium severity; route depends on liability clarity and documentation.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Claims Manager intake started (case received)')
                            nav('/demo-claims/manager/step/triage')
                          }}>Start triage</button>
                        </div>
                      </>
                    )}

                    {stepId === 'triage' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Route: standard unless liability unclear after first evidence review.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Route: Fast-track', value: 'fast_track' },
                            { label: 'Route: Standard', value: 'standard' },
                            { label: 'Route: Complex', value: 'complex' },
                            { label: 'Route: SIU review', value: 'siu' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Triage route set: ${opt.value}`)
                              setPartial({ triageRoute: opt.value as ClaimsManagerState['triageRoute'] })
                              nav('/demo-claims/manager/step/authority')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'authority' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Reported amount above 25k → senior authority suggested.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Assign authority: Handler', value: 'handler' },
                            { label: 'Assign authority: Senior', value: 'senior' },
                            { label: 'Assign authority: Legal', value: 'legal' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Authority assigned: ${opt.value}`)
                              setPartial({ authorityLevel: opt.value as ClaimsManagerState['authorityLevel'] })
                            }}>{opt.label}</button>
                          ))}
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, state.escalated ? 'Escalation removed' : 'Escalated to manager review')
                            setPartial({ escalated: !state.escalated })
                            nav('/demo-claims/manager/step/plan')
                          }}>
                            {state.escalated ? 'Remove escalation' : 'Escalate to manager review'}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'plan' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Investigate first, then settle if liability confirmed.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Plan: Investigate', value: 'investigate' },
                            { label: 'Plan: Settle', value: 'settle' },
                            { label: 'Plan: Pay', value: 'pay' },
                            { label: 'Plan: Deny', value: 'deny' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Operational plan selected: ${opt.value}`)
                              setPartial({ planSelected: opt.value as ClaimsManagerState['planSelected'] })
                              nav('/demo-claims/manager/step/lock')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">Summary</div>
                          <div className="text-muted">Triage: {state.triageRoute}</div>
                          <div className="text-muted">Authority: {state.authorityLevel}</div>
                          <div className="text-muted">Plan: {state.planSelected}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Claims Manager decision locked')
                            setPartial({ decisionLocked: true })
                            nav('/demo-claims/manager')
                          }} disabled={state.triageRoute === 'none' || state.planSelected === 'none'}>
                            Lock manager decision
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/manager')}>
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
                        onClick={() => nav(`/demo-claims/manager/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: triage path + authority routing + plan</div>
                  <div>Accountable: SLA & escalation discipline</div>

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
