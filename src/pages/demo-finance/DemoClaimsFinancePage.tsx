import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_CLAIMS_STATE'
const KEY_AUDIT = 'DEMO_FIN_CLAIMS_AUDIT'

type ClaimsFinanceState = {
  caseId: string
  claimType: 'liability' | 'collision' | 'cargo'
  grossEstimate: number
  aiRecommendedSettlement: number
  historicalMedian: number
  severitySignal: 'normal' | 'elevated' | 'anomalous'
  approvedRange: 'none' | 'full' | 'reduced' | 'capped'
  automationAllowed: boolean
  escalatedToLegal: boolean
  decisionLocked: boolean
}

function defaultState(): ClaimsFinanceState {
  return {
    caseId: 'CLM-10421',
    claimType: 'liability',
    grossEstimate: 42000,
    aiRecommendedSettlement: 42000,
    historicalMedian: 31500,
    severitySignal: 'elevated',
    approvedRange: 'none',
    automationAllowed: false,
    escalatedToLegal: false,
    decisionLocked: false
  }
}

export default function DemoClaimsFinancePage() {
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
                <div className="page-pretitle">FINANCE DEMO</div>
                <h2 className="page-title">Claims Finance – Severity Control</h2>
                <div className="text-muted">Click-only · Settlement range & automation</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, 'Demo reset (manual)')
                  }}>
                    Reset
                  </button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/claims/step/intake')}>
                    Start review
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
                      <h3 className="card-title">5 steps · severity & automation</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Case</div>
                    <div className="fw-semibold">CLM-10421 · Liability</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/claims/step/intake')}>
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
                  <h4>Claims Finance – Accountability</h4>
                  <div>Decides: settlement range + automation gate</div>
                  <div>Accountable: claims ratio & leakage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
