import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_CONTROLLER_STATE'
const KEY_AUDIT = 'DEMO_FIN_CONTROLLER_AUDIT'

type ControllerState = {
  closeId: string
  accrualMode: 'conservative' | 'standard'
  claimsAccrual: 'none' | 'booked'
  reserveReviewed: boolean
  closeReady: boolean
  locked: boolean
}

function defaultState(): ControllerState {
  return {
    closeId: 'CLOSE-2025-01',
    accrualMode: 'conservative',
    claimsAccrual: 'none',
    reserveReviewed: false,
    closeReady: false,
    locked: false
  }
}

export default function DemoFinancialControllerPage() {
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
                <h2 className="page-title">Financial Controller – Close & Controls</h2>
                <div className="text-muted">Click-only · Accrual posture & close readiness</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/controller/step/intake')}>
                    Start close flow
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
                      <h3 className="card-title">5 steps · close readiness</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Close</div>
                    <div className="fw-semibold">CLOSE-2025-01</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/controller/step/intake')}>
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
                  <h4>Financial Controller – Accountability</h4>
                  <div>Decides: accrual posture + close readiness</div>
                  <div>Accountable: control environment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
