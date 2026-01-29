import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_REINS_STATE'
const KEY_AUDIT = 'DEMO_FIN_REINS_AUDIT'

type ReinsState = {
  caseId: string
  treaty: string
  retention: number
  grossLoss: number
  attaches: boolean
  recoverable: number
  noticeSent: boolean
  booked: boolean
  locked: boolean
}

function defaultState(): ReinsState {
  return {
    caseId: 'CLM-10421',
    treaty: 'QS-2025-ALPHA',
    retention: 25000,
    grossLoss: 42000,
    attaches: false,
    recoverable: 0,
    noticeSent: false,
    booked: false,
    locked: false
  }
}

export default function DemoReinsuranceFinancePage() {
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
                <h2 className="page-title">Reinsurance Finance – Recoverables</h2>
                <div className="text-muted">Click-only · Attachment & recoverable booking</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/reinsurance/step/intake')}>
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
                      <h3 className="card-title">5 steps · recoverables</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Treaty</div>
                    <div className="fw-semibold">QS-2025-ALPHA</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/reinsurance/step/intake')}>
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
                  <h4>Reinsurance Finance – Accountability</h4>
                  <div>Decides: attachment + recoverable booking</div>
                  <div>Accountable: treaty compliance & accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
