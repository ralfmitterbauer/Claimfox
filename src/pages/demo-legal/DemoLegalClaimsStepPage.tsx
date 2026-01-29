import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_LEGAL_CLAIMS_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_CLAIMS_AUDIT'

type StepId = 'intake' | 'liability' | 'strategy' | 'settlement' | 'lock'

type ClaimsLegalState = {
  caseId: string
  claimant: string
  insured: string
  venue: string
  exposure: number
  evidenceStrength: 'low' | 'medium' | 'high'
  strategy: 'pending' | 'defend' | 'settle' | 'mediate'
  counselEngaged: boolean
  settlementRange: 'none' | 'low' | 'mid' | 'high'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Litigation intake', subtitle: 'Review liability trigger' },
  { id: 'liability', title: 'Liability assessment', subtitle: 'Evidence strength check' },
  { id: 'strategy', title: 'Strategy selection', subtitle: 'Defend, mediate, or settle' },
  { id: 'settlement', title: 'Settlement posture', subtitle: 'Set settlement range' },
  { id: 'lock', title: 'Decision lock', subtitle: 'Record litigation posture' },
]

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): ClaimsLegalState {
  return {
    caseId: 'LGL-LIT-90211',
    claimant: 'Stadtwerke München',
    insured: 'Nordstadt Logistics GmbH',
    venue: 'Munich',
    exposure: 250000,
    evidenceStrength: 'medium',
    strategy: 'pending',
    counselEngaged: false,
    settlementRange: 'none',
    decisionLocked: false,
  }
}

function readState(): ClaimsLegalState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: ClaimsLegalState) {
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

export default function DemoLegalClaimsStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])

  const [state, setState] = useState<ClaimsLegalState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-legal/claims/step/intake" replace />
  const stepIndex = STEPS.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<ClaimsLegalState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-legal/claims/step/${next}`)
  }

  const snapshotBadges = [
    { label: `Evidence: ${state.evidenceStrength}`, ok: true },
    { label: `Strategy: ${state.strategy === 'pending' ? 'Pending' : state.strategy}`, ok: state.strategy !== 'pending' },
    { label: 'Counsel engaged', ok: state.counselEngaged },
    { label: `Settlement: ${state.settlementRange}`, ok: state.settlementRange !== 'none' },
    { label: 'Locked', ok: state.decisionLocked },
  ]

  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'liability') return true
    if (stepId === 'strategy') return state.strategy !== 'pending'
    if (stepId === 'settlement') return true
    if (stepId === 'lock') return true
    return false
  })()

  const aiStrategy = state.evidenceStrength === 'high'
    ? 'Defend with strong evidence; avoid early settlement.'
    : state.evidenceStrength === 'low'
      ? 'Recommend early settlement to reduce cost risk.'
      : 'Liability uncertain; consider early mediation.'

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/claims')}>
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
                    disabled={!canGoNext || stepIndex === STEPS.length - 1}
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
                      <span>Step {stepIndex + 1}/{STEPS.length} · litigation review</span>
                    </div>
                    <span className="badge bg-indigo-lt">Claims Legal</span>
                  </div>

                  <div className="uw-decision-body">
                    {(stepId === 'intake') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k="Case ID" v={state.caseId} />
                            <Kv k="Claimant" v={state.claimant} />
                            <Kv k="Insured" v={state.insured} />
                            <Kv k="Venue" v={state.venue} />
                            <Kv k="Exposure" v={<span className="badge bg-azure-lt">€ {state.exposure.toLocaleString()}</span>} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI note</div>
                          <div className="uw-admin-small">Exposure moderate; evidence medium; recommend evaluate defend vs mediate.</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Claims Legal received litigation referral')
                              goTo('liability')
                            }}
                          >
                            Review liability
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'liability') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Liability factors</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Duty</li>
                            <li>Breach</li>
                            <li>Causation</li>
                            <li>Damages</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">Liability uncertain; pursue early mediation if costs escalate.</div>
                        </div>
                        <div className="uw-cta-row">
                          {(['high', 'medium', 'low'] as const).map((level) => (
                            <button
                              key={level}
                              className={level === 'medium' ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                              onClick={() => {
                                appendAudit(`Evidence strength set: ${level}`)
                                setPartial({ evidenceStrength: level })
                                goTo('strategy')
                              }}
                            >
                              Mark evidence: {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {(stepId === 'strategy') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Cost & risk levers</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Defense cost</li>
                            <li>Adverse PR</li>
                            <li>Precedent risk</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">{aiStrategy}</div>
                        </div>
                        <div className="uw-cta-row">
                          {([
                            { label: 'Strategy: Defend', value: 'defend' },
                            { label: 'Strategy: Mediate', value: 'mediate' },
                            { label: 'Strategy: Settle', value: 'settle' },
                          ] as const).map((item) => (
                            <button
                              key={item.value}
                              className={item.value === 'mediate' ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                              onClick={() => {
                                appendAudit(`Strategy set: ${item.value}`)
                                setPartial({ strategy: item.value })
                                goTo('settlement')
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className={`btn ${state.counselEngaged ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => {
                              appendAudit(state.counselEngaged ? 'External counsel removed' : 'External counsel engaged')
                              setPartial({ counselEngaged: !state.counselEngaged })
                            }}
                          >
                            {state.counselEngaged ? 'Counsel engaged' : 'Engage external counsel'}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'settlement') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Settlement posture</div>
                          <div className="uw-admin-small">Guidance aligned to exposure and evidence strength.</div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI note</div>
                          <div className="uw-admin-small">
                            {state.evidenceStrength === 'high'
                              ? 'Suggest low range or no settlement offer.'
                              : state.evidenceStrength === 'low'
                                ? 'Suggest mid-to-high range to cap risk.'
                                : 'Suggest mid range for cost control.'}
                          </div>
                        </div>
                        <div className="uw-cta-row">
                          {([
                            { label: 'Set range: Low', value: 'low' },
                            { label: 'Set range: Mid', value: 'mid' },
                            { label: 'Set range: High', value: 'high' },
                          ] as const).map((item) => (
                            <button
                              key={item.value}
                              className={item.value === 'mid' ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                              onClick={() => {
                                appendAudit(`Settlement range set: ${item.value}`)
                                setPartial({ settlementRange: item.value })
                                goTo('lock')
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('No settlement offer')
                              setPartial({ settlementRange: 'none' })
                              goTo('lock')
                            }}
                          >
                            No settlement offer
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'lock') && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Decision summary</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Evidence" v={state.evidenceStrength} />
                            <Kv k="Strategy" v={state.strategy === 'pending' ? 'Pending' : state.strategy} />
                            <Kv k="Counsel" v={state.counselEngaged ? 'Engaged' : 'Not engaged'} />
                            <Kv k="Settlement" v={state.settlementRange} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI audit note</div>
                          <div className="uw-admin-small">Decision consistent with evidence strength and cost controls.</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Legal decision locked (litigation posture recorded)')
                              setPartial({ decisionLocked: true })
                              nav('/demo-legal/claims')
                            }}
                          >
                            Lock legal decision
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/claims')}>
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
                      )
                    })}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>AI & Accountability</h4>
                    <div className="uw-admin-small">
                      <div><strong>Decides:</strong> litigation strategy & settlement path</div>
                      <div><strong>Accountable:</strong> legal risk & cost containment</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>Strategy based on evidence strength</li>
                      <li>Settlement range aligned to exposure</li>
                      <li>Counsel engagement recorded</li>
                      <li>Decision locked with audit trail</li>
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
                        ))}
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
