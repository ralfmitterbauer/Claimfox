import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_REINS_STATE'
const KEY_AUDIT = 'DEMO_FIN_REINS_AUDIT'

type StepId = 'intake' | 'attach' | 'recoverable' | 'notice' | 'lock'

type ReinsState = {
  caseId: string
  treaty: string
  retention: number
  grossLoss: number
  attaches: boolean
  recoverable: number
  noticeSent: boolean
  booked: boolean
  locked: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Check attachment' },
  { id: 'attach', title: 'Attachment', subtitle: 'Confirm attaches' },
  { id: 'recoverable', title: 'Recoverable', subtitle: 'Calculate recoverable' },
  { id: 'notice', title: 'Notice', subtitle: 'Send treaty notice' },
  { id: 'lock', title: 'Lock', subtitle: 'Book recoverable' }
]

function defaultState(): ReinsState {
  return {
    caseId: 'CLM-10421',
    treaty: 'QS-2025-ALPHA',
    retention: 25000,
    grossLoss: 42000,
    attaches: false,
    recoverable: 0,
    noticeSent: false,
    booked: false,
    locked: false
  }
}

export default function DemoReinsuranceFinanceStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<ReinsState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/reinsurance/step/intake" replace />

  function setPartial(p: Partial<ReinsState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)

  const snapshot = [
    { label: state.attaches ? 'Attaches' : 'No attach', ok: state.attaches },
    { label: `Recoverable ${state.recoverable}`, ok: state.recoverable > 0 },
    { label: state.noticeSent ? 'Notice sent' : 'No notice', ok: state.noticeSent },
    { label: state.booked ? 'Booked' : 'Not booked', ok: state.booked },
    { label: state.locked ? 'Locked' : 'Unlocked', ok: state.locked }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/reinsurance')}>
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
                    <div className="text-muted">Treaty</div>
                    <div className="fw-semibold">{state.treaty}</div>
                    <div className="text-muted mt-2">Retention vs gross</div>
                    <div className="fw-semibold">€ {state.retention} vs € {state.grossLoss}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Loss may attach above retention; validate treaty and aggregation.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Attachment check started')
                            nav('/demo-finance/reinsurance/step/attach')
                          }}>Check attachment</button>
                        </div>
                      </>
                    )}

                    {stepId === 'attach' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Attaches when gross exceeds retention.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Attachment confirmed')
                            setPartial({ attaches: true })
                            nav('/demo-finance/reinsurance/step/recoverable')
                          }}>Confirm attaches</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'No attachment')
                            setPartial({ attaches: false })
                          }}>Does not attach</button>
                        </div>
                      </>
                    )}

                    {stepId === 'recoverable' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Recoverable equals gross minus retention (simplified).</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            const rec = Math.max(0, state.grossLoss - state.retention)
                            appendAudit(KEY_AUDIT, `Recoverable calculated: €${rec}`)
                            setPartial({ recoverable: rec })
                            nav('/demo-finance/reinsurance/step/notice')
                          }}>Calculate recoverable</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Recoverable pending documentation')
                          }}>Mark pending documentation</button>
                        </div>
                      </>
                    )}

                    {stepId === 'notice' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Send notice if attaches or near threshold.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Treaty notice sent')
                            setPartial({ noticeSent: true })
                            nav('/demo-finance/reinsurance/step/lock')
                          }}>Send treaty notice</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Notice deferred')
                            nav('/demo-finance/reinsurance/step/lock')
                          }}>Defer notice</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">Summary</div>
                          <div className="text-muted">Recoverable: € {state.recoverable}</div>
                          <div className="text-muted">Notice: {state.noticeSent ? 'Sent' : 'Not sent'}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Recoverable booked')
                            setPartial({ booked: true, locked: true })
                            nav('/demo-finance/reinsurance')
                          }} disabled={!state.attaches || state.recoverable <= 0 || !state.noticeSent}>
                            Book recoverable
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/reinsurance')}>
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
                        onClick={() => nav(`/demo-finance/reinsurance/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: attachment + notice + recoverable</div>
                  <div>Accountable: treaty compliance</div>

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
