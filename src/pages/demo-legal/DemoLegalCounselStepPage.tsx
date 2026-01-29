import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_LEGAL_COUNSEL_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_COUNSEL_AUDIT'

type StepId = 'intake' | 'coverage' | 'wording' | 'comms' | 'signoff'

type LegalCounselState = {
  caseId: string
  insured: string
  product: string
  incidentType: 'accident' | 'theft' | 'glass'
  policyNumber: string
  jurisdiction: string
  coverageSignal: 'clear' | 'ambiguous' | 'excluded'
  coveragePosition: 'pending' | 'cover' | 'reserve_rights' | 'deny'
  wordingAction: 'none' | 'endorsement_needed' | 'clarify_wording'
  commsTemplate: 'neutral' | 'ror' | 'deny'
  governanceEscalated: boolean
  legalSignoff: boolean
}

type AuditItem = { ts: number; message: string }

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Legal intake', subtitle: 'Scope & governance only' },
  { id: 'coverage', title: 'Coverage position', subtitle: 'Set legal stance' },
  { id: 'wording', title: 'Wording actions', subtitle: 'Clarify or endorse' },
  { id: 'comms', title: 'Communications', subtitle: 'Select legal template' },
  { id: 'signoff', title: 'Legal sign-off', subtitle: 'Record defensibility' },
]

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): LegalCounselState {
  return {
    caseId: 'LGL-CLM-55410',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    incidentType: 'accident',
    policyNumber: 'PL-204889',
    jurisdiction: 'DE-BY',
    coverageSignal: 'ambiguous',
    coveragePosition: 'pending',
    wordingAction: 'none',
    commsTemplate: 'neutral',
    governanceEscalated: false,
    legalSignoff: false,
  }
}

function readState(): LegalCounselState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: LegalCounselState) {
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

export default function DemoLegalCounselStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])

  const [state, setState] = useState<LegalCounselState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-legal/counsel/step/intake" replace />
  const stepIndex = STEPS.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<LegalCounselState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-legal/counsel/step/${next}`)
  }

  const snapshotBadges = [
    { label: state.coveragePosition === 'pending' ? 'Coverage: Pending' : `Coverage: ${state.coveragePosition === 'reserve_rights' ? 'ROR' : state.coveragePosition}`, ok: state.coveragePosition !== 'pending' },
    { label: 'Wording Action set', ok: state.wordingAction !== 'none' },
    { label: 'Comms template set', ok: state.commsTemplate !== 'neutral' },
    { label: 'Governance escalated', ok: state.governanceEscalated },
    { label: 'Legal sign-off', ok: state.legalSignoff },
  ]

  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'coverage') return state.coveragePosition !== 'pending'
    if (stepId === 'wording') return true
    if (stepId === 'comms') return true
    if (stepId === 'signoff') return true
    return false
  })()

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/counsel')}>
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
                      <span>Step {stepIndex + 1}/{STEPS.length} · legal review</span>
                    </div>
                    <span className="badge bg-indigo-lt">Legal Counsel</span>
                  </div>

                  <div className="uw-decision-body">
                    {(stepId === 'intake') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k="Case ID" v={state.caseId} />
                            <Kv k="Insured" v={state.insured} />
                            <Kv k="Product" v={state.product} />
                            <Kv k="Incident" v={state.incidentType} />
                            <Kv k="Policy" v={state.policyNumber} />
                            <Kv k="Jurisdiction" v={state.jurisdiction} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI note</div>
                          <div className="uw-admin-small">
                            Coverage appears ambiguous due to exclusion wording; recommend ROR until facts complete.
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Legal Counsel review started (case received)')
                              goTo('coverage')
                            }}
                          >
                            Begin coverage review
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'coverage') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Key clauses</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Exclusions – §4.2 (Ambiguous phrasing)</li>
                            <li>Conditions – §2.1 (Notice obligations)</li>
                            <li>Definitions – §1.7 (Use of vehicle)</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">Set reservation of rights (ROR) pending fact confirmation.</div>
                        </div>
                        <div className="uw-cta-row">
                          {([
                            { label: 'Set position: Cover', value: 'cover' },
                            { label: 'Set position: ROR', value: 'reserve_rights' },
                            { label: 'Set position: Deny', value: 'deny' },
                          ] as const).map((item) => (
                            <button
                              key={item.value}
                              className={`btn ${item.value === 'reserve_rights' ? 'btn-primary' : 'btn-outline-secondary'}`}
                              onClick={() => {
                                appendAudit(`Coverage position set: ${item.value === 'reserve_rights' ? 'ROR' : item.value}`)
                                setPartial({ coveragePosition: item.value })
                                goTo('wording')
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {(stepId === 'wording') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Wording risk indicator</div>
                          <div className="uw-admin-small">Ambiguous phrasing detected in exclusion §4.2.</div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI note</div>
                          <div className="uw-admin-small">Clarify wording for future renewals; endorsement may reduce disputes.</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Wording action set: clarify wording')
                              setPartial({ wordingAction: 'clarify_wording' })
                              goTo('comms')
                            }}
                          >
                            Action: Clarify wording
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Wording action set: endorsement needed')
                              setPartial({ wordingAction: 'endorsement_needed' })
                              goTo('comms')
                            }}
                          >
                            Action: Endorsement needed
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Wording action set: no action')
                              setPartial({ wordingAction: 'none' })
                              goTo('comms')
                            }}
                          >
                            No action
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'comms') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Communication constraints</div>
                          <div className="uw-admin-small">No admissions. Factual language only. Reference policy clauses.</div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">
                            {state.coveragePosition === 'reserve_rights'
                              ? 'Use ROR template with legal basis + evidence request.'
                              : state.coveragePosition === 'deny'
                                ? 'Use denial template with clause reference and appeal path.'
                                : 'Use neutral update template with fact request.'}
                          </div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Comms template set: neutral')
                              setPartial({ commsTemplate: 'neutral' })
                            }}
                          >
                            Select template: Neutral
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Comms template set: ROR')
                              setPartial({ commsTemplate: 'ror' })
                            }}
                          >
                            Select template: ROR
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Comms template set: deny')
                              setPartial({ commsTemplate: 'deny' })
                            }}
                          >
                            Select template: Deny
                          </button>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className={`btn ${state.governanceEscalated ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => {
                              appendAudit(state.governanceEscalated ? 'Governance escalation removed' : 'Escalated to governance counsel')
                              setPartial({ governanceEscalated: !state.governanceEscalated })
                            }}
                          >
                            {state.governanceEscalated ? 'Governance escalated' : 'Escalate to governance counsel'}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'signoff') && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Sign-off summary</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Coverage" v={state.coveragePosition === 'pending' ? 'Pending' : state.coveragePosition === 'reserve_rights' ? 'ROR' : state.coveragePosition} />
                            <Kv k="Wording" v={state.wordingAction === 'none' ? 'No action' : state.wordingAction} />
                            <Kv k="Comms" v={state.commsTemplate} />
                            <Kv k="Governance" v={state.governanceEscalated ? 'Escalated' : 'No'} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Output</div>
                          <div className="uw-admin-small">
                            {state.coveragePosition !== 'pending' ? 'Legal ready' : 'Blocked: incomplete'}
                          </div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            disabled={state.coveragePosition === 'pending'}
                            onClick={() => {
                              appendAudit('Legal sign-off recorded (defensibility confirmed)')
                              setPartial({ legalSignoff: true })
                              nav('/demo-legal/counsel')
                            }}
                          >
                            Record legal sign-off
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/counsel')}>
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
                      <div><strong>Decides:</strong> coverage position & wording actions</div>
                      <div><strong>Accountable:</strong> legal defensibility & governance</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>Coverage stance must be defensible</li>
                      <li>Wording actions prevent future disputes</li>
                      <li>Comms must stay factual and clause-based</li>
                      <li>Escalations recorded in audit</li>
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
