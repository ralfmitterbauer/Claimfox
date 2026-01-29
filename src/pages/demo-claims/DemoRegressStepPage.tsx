import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_claimsStorage'

const KEY_STATE = 'DEMO_CLAIMS_REGRESS_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_REGRESS_AUDIT'

type StepId = 'intake' | 'liability' | 'outreach' | 'settlement' | 'lock'

type RegressState = {
  caseId: string
  claimant: string
  thirdParty: string
  liabilitySignal: 'low' | 'medium' | 'high'
  recoveryPotential: 'none' | 'low' | 'mid' | 'high'
  outreachSent: boolean
  settlementPosture: 'none' | 'soft' | 'firm'
  recoveredStatus: 'open' | 'settled' | 'litigation'
  locked: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Assess liability' },
  { id: 'liability', title: 'Liability', subtitle: 'Set liability signal' },
  { id: 'outreach', title: 'Outreach', subtitle: 'Send notice' },
  { id: 'settlement', title: 'Settlement', subtitle: 'Set posture' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock recovery decision' }
]

function defaultState(): RegressState {
  return {
    caseId: 'CLM-10421',
    claimant: 'Stadtwerke München',
    thirdParty: 'München Tiefbau GmbH',
    liabilitySignal: 'medium',
    recoveryPotential: 'mid',
    outreachSent: false,
    settlementPosture: 'none',
    recoveredStatus: 'open',
    locked: false
  }
}

export default function DemoRegressStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<RegressState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-claims/regress/step/intake" replace />

  function setPartial(p: Partial<RegressState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: `Liability ${state.liabilitySignal}`, ok: state.liabilitySignal !== 'low' },
    { label: `Recovery ${state.recoveryPotential}`, ok: state.recoveryPotential !== 'none' },
    { label: state.outreachSent ? 'Outreach sent' : 'No outreach', ok: state.outreachSent },
    { label: `Posture ${state.settlementPosture}`, ok: state.settlementPosture !== 'none' },
    { label: `Status ${state.recoveredStatus}`, ok: state.recoveredStatus !== 'open' },
    { label: state.locked ? 'Locked' : 'Unlocked', ok: state.locked }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/regress')}>
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
                    <div className="fw-semibold">{state.caseId} · {state.claimant}</div>
                    <div className="text-muted mt-2">Third party</div>
                    <div className="fw-semibold">{state.thirdParty}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Potential third-party liability detected; validate duty/breach quickly.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Regress intake started')
                            nav('/demo-claims/regress/step/liability')
                          }}>Assess liability</button>
                        </div>
                      </>
                    )}

                    {stepId === 'liability' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Set liability to high only with clear breach evidence.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {['high', 'medium', 'low'].map((lvl) => (
                            <button key={lvl} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Liability set: ${lvl}`)
                              setPartial({ liabilitySignal: lvl as RegressState['liabilitySignal'] })
                              nav('/demo-claims/regress/step/outreach')
                            }}>Liability: {lvl}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'outreach' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Send notice + document request before firm settlement posture.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Outreach sent (notice + doc request)')
                            setPartial({ outreachSent: true })
                            nav('/demo-claims/regress/step/settlement')
                          }}>Send notice + request docs</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Outreach held')
                            nav('/demo-claims/regress/step/settlement')
                          }}>Hold outreach</button>
                        </div>
                      </>
                    )}

                    {stepId === 'settlement' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">High liability → firm posture; medium → soft posture with docs.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Settlement posture: soft')
                            setPartial({ settlementPosture: 'soft' })
                          }}>Posture: Soft</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Settlement posture: firm')
                            setPartial({ settlementPosture: 'firm' })
                          }}>Posture: Firm</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Escalated to litigation')
                            setPartial({ recoveredStatus: 'litigation' })
                          }}>Escalate to litigation</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Marked settled')
                            setPartial({ recoveredStatus: 'settled' })
                            nav('/demo-claims/regress/step/lock')
                          }} disabled={!state.outreachSent}>
                            Mark settled
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">Summary</div>
                          <div className="text-muted">Liability: {state.liabilitySignal}</div>
                          <div className="text-muted">Outreach: {state.outreachSent ? 'Yes' : 'No'}</div>
                          <div className="text-muted">Status: {state.recoveredStatus}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Regress decision locked')
                            setPartial({ locked: true })
                            nav('/demo-claims/regress')
                          }} disabled={!state.outreachSent && state.recoveredStatus !== 'litigation'}>
                            Lock regress decision
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/regress')}>
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
                        onClick={() => nav(`/demo-claims/regress/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: liability assessment + recovery posture</div>
                  <div>Accountable: recoverable value & defensibility</div>

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
