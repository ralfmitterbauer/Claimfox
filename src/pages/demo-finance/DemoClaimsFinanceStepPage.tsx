import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_CLAIMS_STATE'
const KEY_AUDIT = 'DEMO_FIN_CLAIMS_AUDIT'

type StepId = 'intake' | 'severity' | 'settlement-range' | 'automation' | 'lock'

type ClaimsFinanceState = {
  caseId: string
  claimType: 'liability' | 'collision' | 'cargo'
  grossEstimate: number
  aiRecommendedSettlement: number
  historicalMedian: number
  severitySignal: 'normal' | 'elevated' | 'anomalous'
  approvedRange: 'none' | 'full' | 'reduced' | 'capped'
  automationAllowed: boolean
  escalatedToLegal: boolean
  decisionLocked: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Review estimate vs median' },
  { id: 'severity', title: 'Severity', subtitle: 'Validate drivers' },
  { id: 'settlement-range', title: 'Settlement range', subtitle: 'Approve range' },
  { id: 'automation', title: 'Automation', subtitle: 'Allow or block' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock finance decision' }
]

function defaultState(): ClaimsFinanceState {
  return {
    caseId: 'CLM-10421',
    claimType: 'liability',
    grossEstimate: 42000,
    aiRecommendedSettlement: 42000,
    historicalMedian: 31500,
    severitySignal: 'elevated',
    approvedRange: 'none',
    automationAllowed: false,
    escalatedToLegal: false,
    decisionLocked: false
  }
}

export default function DemoClaimsFinanceStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<ClaimsFinanceState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/claims/step/intake" replace />

  function setPartial(p: Partial<ClaimsFinanceState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)

  const snapshot = [
    { label: `Severity ${state.severitySignal}`, ok: state.severitySignal !== 'anomalous' },
    { label: `Range ${state.approvedRange}`, ok: state.approvedRange !== 'none' },
    { label: state.automationAllowed ? 'Automation allowed' : 'Manual review', ok: state.automationAllowed },
    { label: state.escalatedToLegal ? 'Escalated' : 'Not escalated', ok: state.escalatedToLegal },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/claims')}>
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
                    <div className="fw-semibold">{state.caseId} · {state.claimType}</div>
                    <div className="text-muted mt-2">Estimate vs median</div>
                    <div className="fw-semibold">€ {state.grossEstimate} vs € {state.historicalMedian}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI note</div>
                            <div className="text-muted">Recommendation is above median; review severity drivers.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Claims finance intake confirmed')
                            nav('/demo-finance/claims/step/severity')
                          }}>
                            Review severity
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Automation allowed (provisional)')
                            setPartial({ automationAllowed: true })
                          }}>
                            Allow automation (provisional)
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'severity' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI recommendation</div>
                            <div className="text-muted">Severity elevated but explainable; flag anomalous only if evidence weak.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Severity accepted')
                            setPartial({ severitySignal: 'elevated' })
                            nav('/demo-finance/claims/step/settlement-range')
                          }}>
                            Accept severity
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Severity marked anomalous')
                            setPartial({ severitySignal: 'anomalous' })
                          }}>
                            Mark anomalous
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Escalated to Legal')
                            setPartial({ escalatedToLegal: true })
                          }}>
                            Escalate to Legal
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'settlement-range' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI recommendation</div>
                            <div className="text-muted">Approve reduced range to control tail risk.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Approve full range', value: 'full' },
                            { label: 'Approve reduced range', value: 'reduced' },
                            { label: 'Cap settlement', value: 'capped' }
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              className="btn btn-primary"
                              onClick={() => {
                                appendAudit(KEY_AUDIT, `Settlement range approved: ${opt.value}`)
                                setPartial({ approvedRange: opt.value as ClaimsFinanceState['approvedRange'] })
                                nav('/demo-finance/claims/step/automation')
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'automation' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI recommendation</div>
                            <div className="text-muted">Allow automation only if range approved and not anomalous.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Automation allowed')
                              setPartial({ automationAllowed: true })
                              nav('/demo-finance/claims/step/lock')
                            }}
                            disabled={state.approvedRange === 'none' || state.severitySignal === 'anomalous'}
                          >
                            Allow automated settlement
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Manual review required')
                              setPartial({ automationAllowed: false })
                              nav('/demo-finance/claims/step/lock')
                            }}
                          >
                            Require manual review
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">Summary</div>
                            <div className="text-muted">Severity: {state.severitySignal}</div>
                            <div className="text-muted">Range: {state.approvedRange}</div>
                            <div className="text-muted">Automation: {state.automationAllowed ? 'Allowed' : 'Manual'}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Claims finance decision locked')
                            setPartial({ decisionLocked: true })
                            nav('/demo-finance/claims')
                          }}>
                            Lock finance decision
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/claims')}>
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
                        onClick={() => nav(`/demo-finance/claims/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: settlement range + automation gate</div>
                  <div>Accountable: claims ratio & leakage</div>

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
