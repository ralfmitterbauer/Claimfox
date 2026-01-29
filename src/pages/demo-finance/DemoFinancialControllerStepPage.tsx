import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_CONTROLLER_STATE'
const KEY_AUDIT = 'DEMO_FIN_CONTROLLER_AUDIT'

type StepId = 'intake' | 'accrual' | 'reserving' | 'close' | 'lock'

type ControllerState = {
  closeId: string
  accrualMode: 'conservative' | 'standard'
  claimsAccrual: 'none' | 'booked'
  reserveReviewed: boolean
  closeReady: boolean
  locked: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Review accrual posture' },
  { id: 'accrual', title: 'Accrual', subtitle: 'Book or hold' },
  { id: 'reserving', title: 'Reserving', subtitle: 'Confirm review' },
  { id: 'close', title: 'Close', subtitle: 'Mark readiness' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock controller sign-off' }
]

function defaultState(): ControllerState {
  return {
    closeId: 'CLOSE-2025-01',
    accrualMode: 'conservative',
    claimsAccrual: 'none',
    reserveReviewed: false,
    closeReady: false,
    locked: false
  }
}

export default function DemoFinancialControllerStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<ControllerState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/controller/step/intake" replace />

  function setPartial(p: Partial<ControllerState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: `Mode ${state.accrualMode}`, ok: true },
    { label: state.claimsAccrual === 'booked' ? 'Accrual booked' : 'No accrual', ok: state.claimsAccrual === 'booked' },
    { label: state.reserveReviewed ? 'Reserve reviewed' : 'Reserve not reviewed', ok: state.reserveReviewed },
    { label: state.closeReady ? 'Close ready' : 'Close hold', ok: state.closeReady },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/controller')}>
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
                    <div className="text-muted">Close ID</div>
                    <div className="fw-semibold">{state.closeId}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Claims volatility suggests conservative accrual.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Accrual review started')
                            nav('/demo-finance/controller/step/accrual')
                          }}>Review accrual</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            const next = state.accrualMode === 'conservative' ? 'standard' : 'conservative'
                            appendAudit(KEY_AUDIT, `Accrual mode set: ${next}`)
                            setPartial({ accrualMode: next })
                          }}>Set mode: Conservative/Standard</button>
                        </div>
                      </>
                    )}

                    {stepId === 'accrual' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Book accrual if exposure uncertain.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Accrual booked')
                            setPartial({ claimsAccrual: 'booked' })
                            nav('/demo-finance/controller/step/reserving')
                          }}>Book accrual</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'No accrual')
                            setPartial({ claimsAccrual: 'none' })
                            nav('/demo-finance/controller/step/reserving')
                          }}>No accrual</button>
                        </div>
                      </>
                    )}

                    {stepId === 'reserving' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Reserve review improves defensibility.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Reserve reviewed')
                            setPartial({ reserveReviewed: true })
                            nav('/demo-finance/controller/step/close')
                          }}>Confirm reserve reviewed</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Escalated to actuarial')
                          }}>Escalate to actuarial</button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Close is ready if reserve reviewed.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Close marked ready')
                            setPartial({ closeReady: true })
                            nav('/demo-finance/controller/step/lock')
                          }} disabled={!state.reserveReviewed}>
                            Mark close ready
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Close held')
                            setPartial({ closeReady: false })
                          }}>Hold close</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">Summary</div>
                          <div className="text-muted">Accrual: {state.claimsAccrual}</div>
                          <div className="text-muted">Reserve reviewed: {state.reserveReviewed ? 'Yes' : 'No'}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Controller sign-off locked')
                            setPartial({ locked: true })
                            nav('/demo-finance/controller')
                          }} disabled={!state.closeReady}>
                            Lock controller sign-off
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/controller')}>
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
                        onClick={() => nav(`/demo-finance/controller/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: accrual posture + close readiness</div>
                  <div>Accountable: control environment</div>

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
