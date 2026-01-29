import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_UW_JUNIOR_STATE'
const KEY_AUDIT = 'DEMO_UW_JUNIOR_AUDIT'

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

function writeState(next: JuniorUwState) {
  sessionStorage.setItem(KEY_STATE, JSON.stringify(next))
}
function clearAll() {
  sessionStorage.removeItem(KEY_STATE)
  sessionStorage.removeItem(KEY_AUDIT)
}
function appendAudit(message: string) {
  const prev = sessionStorage.getItem(KEY_AUDIT)
  const list: AuditItem[] = prev ? JSON.parse(prev) : []
  list.unshift({ ts: nowTs(), message })
  sessionStorage.setItem(KEY_AUDIT, JSON.stringify(list))
}

export default function DemoJuniorUnderwriterPage() {
  const nav = useNavigate()

  // AUTO RESET ON START (required)
  useEffect(() => {
    clearAll()
    writeState(defaultState())
    appendAudit('Demo started (state reset)')
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">UNDERWRITER DEMO</div>
                <h2 className="page-title">Junior Underwriter – Decision Journey</h2>
                <div className="text-muted">
                  Click-only · AI recommends · Human decides · No dashboards
                </div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      clearAll()
                      writeState(defaultState())
                      appendAudit('Demo reset (manual)')
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      appendAudit('Case opened')
                      nav('/demo-underwriter/junior/step/intake')
                    }}
                  >
                    Start case
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
                <div className="uw-decision">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>What you will click through</strong>
                      <span>5 screens · one decision per screen</span>
                    </div>
                    <span className="badge bg-blue-lt">Junior UW</span>
                  </div>
                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">Case</div><div className="v">UW-REF-10421</div>
                        <div className="k">Insured</div><div className="v">Atlas Logistics GmbH</div>
                        <div className="k">Product</div><div className="v">Commercial Auto Liability</div>
                        <div className="k">Goal</div><div className="v">Approve inside corridor within SLA</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI stance (always non-binding)</div>
                      <div className="uw-admin-small">
                        AI checks corridor fit and evidence quality. You confirm or request clarification.
                      </div>
                      <div className="badge bg-green-lt" style={{ justifySelf: 'start' }}>Inside corridor</div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-underwriter/junior/step/intake')}>
                        Start at step 1 (intake)
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/junior')}>
                        Back to role page
                      </button>
                    </div>

                    <div className="text-muted" style={{ fontSize: '0.82rem' }}>
                      Note: This start screen auto-resets session state on every visit to ensure the click flow always works.
                    </div>
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>Junior UW – Accountability</h4>
                  <div className="uw-admin-small">
                    Decides: corridor approvals · Accountable: evidence quality & SLA compliance.
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-blue-lt">Evidence quality</span>
                    <span className="badge bg-blue-lt">SLA</span>
                    <span className="badge bg-blue-lt">Audit trail</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>How AI helps</h4>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                      <li>Validates corridor fit (appetite rules)</li>
                      <li>Checks evidence completeness & red flags</li>
                      <li>Explains recommendation rationale</li>
                      <li>Highlights SLA remaining time</li>
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>Audit (live)</h4>
                    <div className="uw-audit">
                      {(() => {
                        const raw = sessionStorage.getItem(KEY_AUDIT)
                        const items: { ts: number; message: string }[] = raw ? JSON.parse(raw) : []
                        if (!items.length) return <div className="uw-admin-small">No entries yet.</div>
                        return items.slice(0, 6).map((it) => (
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
