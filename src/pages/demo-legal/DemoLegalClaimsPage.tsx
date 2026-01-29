import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_LEGAL_CLAIMS_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_CLAIMS_AUDIT'

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

function writeState(next: ClaimsLegalState) {
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

export default function DemoLegalClaimsPage() {
  const nav = useNavigate()

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
                <div className="page-pretitle">LEGAL DEMO</div>
                <h2 className="page-title">Claims Legal – Litigation & Settlement</h2>
                <div className="text-muted">Click-only · Litigation strategy · No dashboards</div>
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
                      nav('/demo-legal/claims/step/intake')
                    }}
                  >
                    Start legal flow
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
                      <span>5 screens · litigation & settlement</span>
                    </div>
                    <span className="badge bg-indigo-lt">Claims Legal</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">Case</div><div className="v">LGL-LIT-90211</div>
                        <div className="k">Claimant</div><div className="v">Stadtwerke München</div>
                        <div className="k">Insured</div><div className="v">Nordstadt Logistics GmbH</div>
                        <div className="k">Goal</div><div className="v">Litigation strategy + settlement posture</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI stance (non-binding)</div>
                      <div className="uw-admin-small">
                        Exposure moderate; evidence medium; recommend evaluate defend vs mediate.
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">Liability</span>
                        <span className="badge bg-azure-lt">Strategy</span>
                        <span className="badge bg-azure-lt">Settlement</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-legal/claims/step/intake')}>
                        Start at step 1 (intake)
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/legal/claims-specialist')}>
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
                  <h4>Claims Legal – Accountability</h4>
                  <div className="uw-admin-small">
                    <div><strong>Decides:</strong> litigation strategy & settlement path</div>
                    <div><strong>Accountable:</strong> legal risk & cost containment</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">Strategy</span>
                    <span className="badge bg-indigo-lt">Counsel</span>
                    <span className="badge bg-indigo-lt">Settlement</span>
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
