import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_claimsStorage'

const KEY_STATE = 'DEMO_CLAIMS_MANAGER_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_MANAGER_AUDIT'

type ClaimsManagerState = {
  caseId: string
  insured: string
  product: string
  reportedAmount: number
  severity: 'low' | 'medium' | 'high'
  triageRoute: 'fast_track' | 'standard' | 'complex' | 'siu' | 'none'
  authorityLevel: 'handler' | 'senior' | 'legal' | 'manager'
  planSelected: 'pay' | 'investigate' | 'deny' | 'settle' | 'none'
  escalated: boolean
  decisionLocked: boolean
}

function defaultState(): ClaimsManagerState {
  return {
    caseId: 'CLM-10421',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    reportedAmount: 42000,
    severity: 'medium',
    triageRoute: 'none',
    authorityLevel: 'handler',
    planSelected: 'none',
    escalated: false,
    decisionLocked: false
  }
}

export default function DemoClaimsManagerPage() {
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
                <h2 className="page-title">Claims Manager – Triage & Plan</h2>
                <div className="text-muted">Click-only · SLA routing & authority</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-claims/manager/step/intake')}>
                    Start triage
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
                      <h3 className="card-title">5 steps · triage → plan</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Case</div>
                    <div className="fw-semibold">CLM-10421 · Nordstadt Logistics GmbH</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-claims/manager/step/intake')}>
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
                  <h4>Claims Manager – Accountability</h4>
                  <div>Decides: triage route + authority + plan</div>
                  <div>Accountable: SLA & escalation discipline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
