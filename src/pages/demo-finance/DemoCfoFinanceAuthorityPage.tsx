import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_CFO_STATE'
const KEY_AUDIT = 'DEMO_FIN_CFO_AUDIT'

type CfoState = {
  decisionId: string
  topic: 'automation_guardrail' | 'claims_tail_risk' | 'reins_exposure'
  capitalImpact: 'low' | 'medium' | 'high'
  allowed: boolean
  governanceEscalated: boolean
  decisionLocked: boolean
}

function defaultState(): CfoState {
  return {
    decisionId: 'CFO-DEC-0091',
    topic: 'claims_tail_risk',
    capitalImpact: 'medium',
    allowed: false,
    governanceEscalated: false,
    decisionLocked: false
  }
}

export default function DemoCfoFinanceAuthorityPage() {
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
                <h2 className="page-title">CFO / Carrier Finance Final Authority</h2>
                <div className="text-muted">Click-only · Capital impact & governance</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/cfo/step/intake')}>
                    Start decision
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
                      <h3 className="card-title">5 steps · finance final authority</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Decision</div>
                    <div className="fw-semibold">CFO-DEC-0091 · Claims tail risk</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/cfo/step/intake')}>
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
                  <h4>CFO – Accountability</h4>
                  <div>Decides: finance gate for exceptions</div>
                  <div>Accountable: capital impact & governance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
