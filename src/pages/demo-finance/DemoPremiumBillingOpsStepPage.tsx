import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_BILLING_STATE'
const KEY_AUDIT = 'DEMO_FIN_BILLING_AUDIT'

type StepId = 'intake' | 'invoice' | 'exceptions' | 'reconcile' | 'lock'

type BillingState = {
  accountId: string
  customer: string
  cycle: 'monthly' | 'annual'
  invoiceAmount: number
  exception: 'none' | 'bank_reject' | 'address_mismatch' | 'tax_issue'
  exceptionCleared: boolean
  invoiceReleased: boolean
  locked: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Confirm billing cycle' },
  { id: 'invoice', title: 'Invoice', subtitle: 'Release or hold' },
  { id: 'exceptions', title: 'Exceptions', subtitle: 'Resolve exception' },
  { id: 'reconcile', title: 'Reconcile', subtitle: 'Confirm checks' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock billing decision' }
]

function defaultState(): BillingState {
  return {
    accountId: 'ACC-44021',
    customer: 'Nordstadt Logistics GmbH',
    cycle: 'monthly',
    invoiceAmount: 12900,
    exception: 'address_mismatch',
    exceptionCleared: false,
    invoiceReleased: false,
    locked: false
  }
}

function money(amount: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)
}

export default function DemoPremiumBillingOpsStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<BillingState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/billing/step/intake" replace />

  function setPartial(p: Partial<BillingState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)

  const snapshot = [
    { label: `Exception ${state.exception}`, ok: state.exception === 'none' },
    { label: state.invoiceReleased ? 'Invoice released' : 'Held', ok: state.invoiceReleased },
    { label: state.locked ? 'Locked' : 'Unlocked', ok: state.locked }
  ]

  const amount = state.cycle === 'annual' ? state.invoiceAmount * 12 : state.invoiceAmount

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/billing')}>
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
                    <div className="text-muted">Account</div>
                    <div className="fw-semibold">{state.accountId} · {state.customer}</div>
                    <div className="text-muted mt-2">Cycle</div>
                    <div className="fw-semibold">{state.cycle}</div>
                    <div className="text-muted mt-2">Invoice amount</div>
                    <div className="fw-semibold">{money(amount)}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI note</div>
                            <div className="text-muted">Potential exception detected: address_mismatch.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Billing intake confirmed')
                              nav('/demo-finance/billing/step/invoice')
                            }}
                          >
                            Review invoice
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              const next = state.cycle === 'monthly' ? 'annual' : 'monthly'
                              appendAudit(KEY_AUDIT, `Cycle set to ${next}`)
                              setPartial({ cycle: next })
                            }}
                          >
                            Set cycle: Annual
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'invoice' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI recommendation</div>
                            <div className="text-muted">Hold release if exception present.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Invoice released (override)')
                              setPartial({ invoiceReleased: true })
                              nav('/demo-finance/billing/step/exceptions')
                            }}
                          >
                            Release invoice
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Invoice held pending exception')
                              setPartial({ invoiceReleased: false })
                              nav('/demo-finance/billing/step/exceptions')
                            }}
                          >
                            Hold invoice
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'exceptions' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">Exception status</div>
                            <div className="text-muted">{state.exception}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Exception cleared (address updated)')
                              setPartial({ exception: 'none', exceptionCleared: true })
                              nav('/demo-finance/billing/step/reconcile')
                            }}
                          >
                            Clear exception
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Exception escalated to billing lead')
                              nav('/demo-finance/billing/step/reconcile')
                            }}
                          >
                            Escalate to billing lead
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'reconcile' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">AI note</div>
                            <div className="text-muted">Reconciliation complete; safe to release if held.</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Reconciliation confirmed')
                              nav('/demo-finance/billing/step/lock')
                            }}
                          >
                            Confirm reconciliation
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Exception reopened')
                              setPartial({ exception: 'address_mismatch', exceptionCleared: false })
                            }}
                          >
                            Re-open exception
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">Summary</div>
                            <div className="text-muted">Exception: {state.exception}</div>
                            <div className="text-muted">Invoice released: {state.invoiceReleased ? 'Yes' : 'No'}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, 'Billing decision locked')
                              setPartial({ locked: true })
                              nav('/demo-finance/billing')
                            }}
                          >
                            Lock billing decision
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/billing')}>
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
                        onClick={() => nav(`/demo-finance/billing/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: invoice release + exception handling path</div>
                  <div>Accountable: premium capture & billing integrity</div>

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
