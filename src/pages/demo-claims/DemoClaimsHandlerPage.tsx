import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_claimsStorage'

const KEY_STATE = 'DEMO_CLAIMS_HANDLER_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_HANDLER_AUDIT'

type ClaimsHandlerState = {
  caseId: string
  insured: string
  policyNumber: string
  product: string
  reportedAmount: number
  coverageSignal: 'clear' | 'ambiguous' | 'excluded'
  evidencePack: 'missing' | 'partial' | 'complete'
  decision: 'pending' | 'pay' | 'deny' | 'refer'
  nextAction: 'none' | 'request_docs' | 'appoint_expert' | 'payment_release' | 'refer_legal'
  decisionReady: boolean
}

function defaultState(): ClaimsHandlerState {
  return {
    caseId: 'CLM-10421',
    insured: 'Nordstadt Logistics GmbH',
    policyNumber: 'PL-204889',
    product: 'Carrier Liability + Fleet',
    reportedAmount: 42000,
    coverageSignal: 'ambiguous',
    evidencePack: 'partial',
    decision: 'pending',
    nextAction: 'none',
    decisionReady: false
  }
}

export default function DemoClaimsHandlerPage() {
  const nav = useNavigate()

  useEffect(() => {
    resetKeys([KEY_STATE, KEY_AUDIT])
    writeJson(KEY_STATE, defaultState())
    appendAudit(KEY_AUDIT, 'Demo started (state reset)')
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">CLAIMS DEMO</div>
                <h2 className="page-title">Versicherungssachbearbeiter – Evidence & Decision</h2>
                <div className="text-muted">Click-only · Coverage position & next actions</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      resetKeys([KEY_STATE, KEY_AUDIT])
                      writeJson(KEY_STATE, defaultState())
                      appendAudit(KEY_AUDIT, 'Demo reset (manual)')
                    }}
                  >
                    Reset
                  </button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-claims/handler/step/intake')}>
                    Start handler flow
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
                      <div className="text-muted">What you will review</div>
                      <h3 className="card-title">5 steps · coverage & next actions</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Case</div>
                    <div className="fw-semibold">CLM-10421 · PL-204889</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-claims/handler/step/intake')}>
                        Start at step 1 (intake)
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/demo')}>
                        Back to demo overview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>Claims Handler – Accountability</h4>
                  <div>Decides: coverage position + next actions</div>
                  <div>Accountable: evidence quality & SLA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
