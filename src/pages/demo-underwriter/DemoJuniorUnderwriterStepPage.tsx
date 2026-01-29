import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_UW_JUNIOR_STATE'
const KEY_AUDIT = 'DEMO_UW_JUNIOR_AUDIT'

type StepId = 'intake' | 'evidence' | 'recommendation' | 'sla' | 'confirm'

type JuniorUwState = {
  caseId: string
  insured: string
  product: string
  corridorInside: boolean
  evidenceOk: boolean
  recommendationShown: boolean
  approved: boolean
  slaOk: boolean
}

type AuditItem = { ts: number; message: string }

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Case intake', subtitle: 'Confirm corridor fit' },
  { id: 'evidence', title: 'Evidence check', subtitle: 'Validate completeness & red flags' },
  { id: 'recommendation', title: 'AI recommendation', subtitle: 'Approve under standard terms' },
  { id: 'sla', title: 'SLA confirmation', subtitle: 'Confirm decision in time' },
  { id: 'confirm', title: 'Final confirmation', subtitle: 'Record approval (audit-ready)' },
]

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): JuniorUwState {
  return {
    caseId: 'UW-REF-10421',
    insured: 'Atlas Logistics GmbH',
    product: 'Commercial Auto Liability',
    corridorInside: true,
    evidenceOk: true,
    recommendationShown: false,
    approved: false,
    slaOk: false,
  }
}

function readState(): JuniorUwState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: JuniorUwState) {
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

export default function DemoJuniorUnderwriterStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])

  const [state, setState] = useState<JuniorUwState>(() => readState())

  // Ensure defaults on deep link
  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-underwriter/junior/step/intake" replace />

  const stepIndex = STEPS.findIndex((s) => s.id === stepId)

  const canGoNext = (() => {
    if (stepId === 'intake') return state.corridorInside
    if (stepId === 'evidence') return state.evidenceOk
    if (stepId === 'recommendation') return state.recommendationShown
    if (stepId === 'sla') return state.slaOk
    if (stepId === 'confirm') return true
    return false
  })()

  function goTo(next: StepId) {
    nav(`/demo-underwriter/junior/step/${next}`)
  }

  function setPartial(p: Partial<JuniorUwState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  const snapshotBadges = [
    { label: 'Inside corridor', ok: state.corridorInside },
    { label: 'Evidence ok', ok: state.evidenceOk },
    { label: 'Approved', ok: state.approved },
    { label: 'SLA ok', ok: state.slaOk },
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">UNDERWRITER DEMO</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>

              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/junior')}>
                    Restart
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      const prev = STEPS[Math.max(0, stepIndex - 1)].id
                      goTo(prev)
                    }}
                    disabled={stepIndex === 0}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const next = STEPS[Math.min(STEPS.length - 1, stepIndex + 1)].id
                      goTo(next)
                    }}
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
              {/* LEFT */}
              <div className="uw-left">
                <div className="uw-decision uw-fade-in">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{current.title}</strong>
                      <span>Step {stepIndex + 1}/{STEPS.length} · one decision</span>
                    </div>
                    <span className="badge bg-blue-lt">Junior UW</span>
                  </div>

                  <div className="uw-decision-body">
                    {/* Case context */}
                    <div className="uw-block">
                      <div className="uw-kv">
                        <Kv k="Case ID" v={state.caseId} />
                        <Kv k="Insured" v={state.insured} />
                        <Kv k="Product" v={state.product} />
                        <Kv k="AI risk score" v={<span className="badge bg-azure-lt">42 / 100</span>} />
                      </div>
                    </div>

                    {/* Step-specific decision content */}
                    {stepId === 'intake' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">
                            Corridor fit is evaluated against appetite rules and historical loss patterns.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Corridor" v={<span className="badge bg-green-lt">Inside appetite</span>} />
                            <Kv k="Reason" v="Loss ratio forecast within corridor threshold" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Corridor fit confirmed (inside appetite)')
                              setPartial({ corridorInside: true })
                              goTo('evidence')
                            }}
                          >
                            Confirm corridor fit
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Clarification requested (corridor rules)')
                              // keep state but show as “needs review” by disabling next until confirmed
                              setPartial({ corridorInside: false })
                            }}
                          >
                            Request clarification
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'evidence' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI evidence check</div>
                          <div className="uw-admin-small">
                            Evidence completeness and red-flag signals are validated before you approve.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Completeness" v={<span className="badge bg-green-lt">96%</span>} />
                            <Kv k="Red flags" v={<span className="badge bg-green-lt">None detected</span>} />
                            <Kv k="Missing" v="None" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Evidence validated (complete, no red flags)')
                              setPartial({ evidenceOk: true })
                              goTo('recommendation')
                            }}
                          >
                            Accept evidence quality
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Evidence flagged (manual clarification needed)')
                              setPartial({ evidenceOk: false })
                            }}
                          >
                            Flag missing evidence
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'recommendation' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation (non-binding)</div>
                          <div className="uw-admin-small">
                            AI proposes a standard approval when corridor + evidence are OK.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Suggested decision" v={<span className="badge bg-green-lt">Approve</span>} />
                            <Kv k="Terms" v="Standard terms (no override)" />
                            <Kv k="Why" v="Comparable accounts show stable frequency; severity capped by limits" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('AI recommendation reviewed (approve under standard terms)')
                              setPartial({ recommendationShown: true, approved: true })
                              goTo('sla')
                            }}
                          >
                            Approve under standard terms
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Clarification requested (pricing/rationale)')
                              setPartial({ recommendationShown: false, approved: false })
                            }}
                          >
                            Request clarification
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'sla' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>SLA guardrail</div>
                          <div className="uw-admin-small">
                            Junior UW is accountable for timely decisions when corridor approvals are eligible.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="SLA remaining" v={<span className="badge bg-azure-lt">2h 03m</span>} />
                            <Kv k="Status" v={<span className="badge bg-green-lt">Within SLA</span>} />
                            <Kv k="Next" v="Confirm and record approval" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('SLA confirmed (decision within SLA)')
                              setPartial({ slaOk: true })
                              goTo('confirm')
                            }}
                          >
                            Confirm SLA compliance
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('SLA risk flagged (manual review)')
                              setPartial({ slaOk: false })
                            }}
                          >
                            Flag SLA risk
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'confirm' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Decision recorded</div>
                          <div className="uw-admin-small">
                            This is the final click: approval is locked into the audit trail.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Decision" v={<span className="badge bg-green-lt">Approved</span>} />
                            <Kv k="Corridor" v={<span className="badge bg-green-lt">Inside</span>} />
                            <Kv k="Evidence" v={<span className="badge bg-green-lt">OK</span>} />
                            <Kv k="SLA" v={<span className="badge bg-green-lt">OK</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI note</div>
                          <div className="uw-admin-small">
                            AI stores decision rationale for traceability. Human remains accountable.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Rationale stored" v="Corridor fit + evidence completeness + SLA compliance" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Approval locked (audit-ready)')
                              nav('/demo-underwriter/junior')
                            }}
                          >
                            Finish & restart
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/junior')}>
                            Back to role page
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
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
                            <span className="badge bg-blue-lt">{idx + 1}</span>
                            <span>{s.title}</span>
                          </span>
                          {active ? <span className="badge bg-white text-blue">Current</span> : <span className="badge bg-blue-lt">Open</span>}
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>AI & Accountability</h4>
                    <div className="uw-admin-small">
                      <div><strong>Decides:</strong> corridor approvals</div>
                      <div><strong>Accountable:</strong> evidence quality & SLA adherence</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>AI validates corridor fit; you confirm</li>
                      <li>AI checks evidence; you accept or flag</li>
                      <li>AI suggests approve; you decide</li>
                      <li>SLA guardrail; you confirm compliance</li>
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
                        ))
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
