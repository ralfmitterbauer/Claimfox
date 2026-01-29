import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_CFO_STATE'
const KEY_AUDIT = 'DEMO_FIN_CFO_AUDIT'

type StepId = 'intake' | 'exposure' | 'decision' | 'governance' | 'lock'

type CfoState = {
  decisionId: string
  topic: 'automation_guardrail' | 'claims_tail_risk' | 'reins_exposure'
  capitalImpact: 'low' | 'medium' | 'high'
  allowed: boolean
  governanceEscalated: boolean
  decisionLocked: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Review finance gate' },
  { id: 'exposure', title: 'Exposure', subtitle: 'Set capital impact' },
  { id: 'decision', title: 'Decision', subtitle: 'Allow or restrict' },
  { id: 'governance', title: 'Governance', subtitle: 'Escalation path' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock CFO decision' }
]

function defaultState(): CfoState {
  return {
    decisionId: 'CFO-DEC-0091',
    topic: 'claims_tail_risk',
    capitalImpact: 'medium',
    allowed: false,
    governanceEscalated: false,
    decisionLocked: false
  }
}

export default function DemoCfoFinanceAuthorityStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<CfoState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/cfo/step/intake" replace />

  function setPartial(p: Partial<CfoState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)

  const snapshot = [
    { label: `Topic ${state.topic}`, ok: true },
    { label: `Impact ${state.capitalImpact}`, ok: state.capitalImpact !== 'high' },
    { label: state.allowed ? 'Allowed' : 'Restricted', ok: state.allowed },
    { label: state.governanceEscalated ? 'Escalated' : 'No escalation', ok: state.governanceEscalated },
    { label: state.decisionLocked ? 'Locked' : 'Unlocked', ok: state.decisionLocked }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">FINANCE DEMO</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/cfo')}>
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
                    <div className="text-muted">Decision ID</div>
                    <div className="fw-semibold">{state.decisionId}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Decision requested due to elevated tail risk signal.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'CFO intake confirmed')
                            nav('/demo-finance/cfo/step/exposure')
                          }}>Review exposure</button>
                        </div>
                      </>
                    )}

                    {stepId === 'exposure' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Capital impact medium; tighten guardrail instead of full stop.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {['low', 'medium', 'high'].map((lvl) => (
                            <button key={lvl} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Capital impact set: ${lvl}`)
                              setPartial({ capitalImpact: lvl as CfoState['capitalImpact'] })
                              nav('/demo-finance/cfo/step/decision')
                            }}>
                              Set capital impact: {lvl}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'decision' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">
                            {state.capitalImpact === 'high'
                              ? 'Restrict automation; require manual for tail claims.'
                              : 'Allow with monitoring and guardrails.'}
                          </div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Decision: allow')
                            setPartial({ allowed: true })
                            nav('/demo-finance/cfo/step/governance')
                          }}>Allow</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Decision: restrict')
                            setPartial({ allowed: false })
                            nav('/demo-finance/cfo/step/governance')
                          }}>Restrict</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Decision: stop automation')
                            setPartial({ allowed: false })
                            nav('/demo-finance/cfo/step/governance')
                          }}>Stop automation</button>
                        </div>
                      </>
                    )}

                    {stepId === 'governance' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Record rationale for regulator & board traceability.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Escalated to governance committee')
                            setPartial({ governanceEscalated: true })
                            nav('/demo-finance/cfo/step/lock')
                          }}>Escalate to governance committee</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'No escalation required')
                            setPartial({ governanceEscalated: false })
                            nav('/demo-finance/cfo/step/lock')
                          }}>No escalation</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">Summary</div>
                          <div className="text-muted">Impact: {state.capitalImpact}</div>
                          <div className="text-muted">Decision: {state.allowed ? 'Allowed' : 'Restricted'}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'CFO finance decision locked')
                            setPartial({ decisionLocked: true })
                            nav('/demo-finance/cfo')
                          }}>Lock CFO decision</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/cfo')}>
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
                        onClick={() => nav(`/demo-finance/cfo/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: finance gate for exceptions</div>
                  <div>Accountable: capital impact & governance</div>

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
