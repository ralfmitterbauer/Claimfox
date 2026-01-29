import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_ANALYST_STATE'
const KEY_AUDIT = 'DEMO_FIN_ANALYST_AUDIT'

type StepId = 'intake' | 'variance' | 'controls' | 'signoff'

type FinanceAnalystState = {
  reportId: string
  period: 'MTD' | 'QTD'
  signal: 'loss_ratio' | 'expense_ratio' | 'premium_leakage'
  varianceLevel: 'low' | 'medium' | 'high'
  classification: 'data_issue' | 'ops_issue' | 'pricing_issue' | 'claims_drift' | 'none'
  controlRaised: boolean
  signoff: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Confirm variance signal' },
  { id: 'variance', title: 'Variance', subtitle: 'Classify driver' },
  { id: 'controls', title: 'Controls', subtitle: 'Decide action' },
  { id: 'signoff', title: 'Sign-off', subtitle: 'Record analyst sign-off' }
]

function defaultState(): FinanceAnalystState {
  return {
    reportId: 'FIN-REP-118',
    period: 'MTD',
    signal: 'loss_ratio',
    varianceLevel: 'medium',
    classification: 'none',
    controlRaised: false,
    signoff: false
  }
}

export default function DemoFinanceAnalystStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<FinanceAnalystState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/analyst/step/intake" replace />

  function setPartial(p: Partial<FinanceAnalystState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const snapshot = [
    { label: `Period ${state.period}`, ok: true },
    { label: `Classification ${state.classification === 'none' ? 'pending' : state.classification}`, ok: state.classification !== 'none' },
    { label: state.controlRaised ? 'Control raised' : 'No control', ok: state.controlRaised },
    { label: state.signoff ? 'Sign-off' : 'Not signed', ok: state.signoff }
  ]

  const audit = readAudit(KEY_AUDIT)

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/analyst')}>
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
                    <div className="row g-2">
                      <div className="col-12">
                        <div className="text-muted">Report</div>
                        <div className="fw-semibold">{state.reportId} · {state.period} · {state.signal}</div>
                      </div>
                      <div className="col-12">
                        <div className="text-muted">Variance</div>
                        <div className="fw-semibold">{state.varianceLevel}</div>
                      </div>
                    </div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI recommendation</div>
                            <div className="text-muted">Variance likely driven by claims severity drift; confirm classification.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Finance intake confirmed')
                              nav('/demo-finance/analyst/step/variance')
                            }}
                          >
                            Review variance
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              const next = state.period === 'MTD' ? 'QTD' : 'MTD'
                              appendAudit(KEY_AUDIT, `Period set to ${next}`)
                              setPartial({ period: next })
                            }}
                          >
                            Switch period (MTD/QTD)
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'variance' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI recommendation</div>
                            <div className="text-muted">Classify as claims drift unless evidence indicates data issue.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Classify: Claims drift', value: 'claims_drift' },
                            { label: 'Classify: Data issue', value: 'data_issue' },
                            { label: 'Classify: Pricing issue', value: 'pricing_issue' }
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              className="btn btn-primary"
                              onClick={() => {
                                appendAudit(KEY_AUDIT, `Classification set: ${opt.value}`)
                                setPartial({ classification: opt.value as FinanceAnalystState['classification'] })
                                nav('/demo-finance/analyst/step/controls')
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'controls' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI recommendation</div>
                            <div className="text-muted">
                              {state.classification === 'claims_drift'
                                ? 'Raise control: tighten settlement guardrail.'
                                : state.classification === 'data_issue'
                                  ? 'Raise control: data reconciliation.'
                                  : 'Raise control if classification indicates structural driver.'}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, `Control action raised (${state.classification})`)
                              setPartial({ controlRaised: true })
                              nav('/demo-finance/analyst/step/signoff')
                            }}
                          >
                            Raise control action
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'No control action')
                              setPartial({ controlRaised: false })
                              nav('/demo-finance/analyst/step/signoff')
                            }}
                          >
                            No control action
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'signoff' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">Summary</div>
                            <div className="text-muted">Classification: {state.classification}</div>
                            <div className="text-muted">Control: {state.controlRaised ? 'Raised' : 'None'}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              if (state.classification === 'none') return
                              appendAudit(KEY_AUDIT, 'Finance analyst sign-off recorded')
                              setPartial({ signoff: true })
                              nav('/demo-finance/analyst')
                            }}
                            disabled={state.classification === 'none'}
                          >
                            Record analyst sign-off
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/analyst')}>
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
                        onClick={() => nav(`/demo-finance/analyst/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: variance classification + follow-up route</div>
                  <div>Accountable: signal quality & actionability</div>

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
