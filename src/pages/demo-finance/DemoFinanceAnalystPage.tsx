import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_ANALYST_STATE'
const KEY_AUDIT = 'DEMO_FIN_ANALYST_AUDIT'

type FinanceAnalystState = {
  reportId: string
  period: 'MTD' | 'QTD'
  signal: 'loss_ratio' | 'expense_ratio' | 'premium_leakage'
  varianceLevel: 'low' | 'medium' | 'high'
  classification: 'data_issue' | 'ops_issue' | 'pricing_issue' | 'claims_drift' | 'none'
  controlRaised: boolean
  signoff: boolean
}

function defaultState(): FinanceAnalystState {
  return {
    reportId: 'FIN-REP-118',
    period: 'MTD',
    signal: 'loss_ratio',
    varianceLevel: 'medium',
    classification: 'none',
    controlRaised: false,
    signoff: false
  }
}

export default function DemoFinanceAnalystPage() {
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
                <h2 className="page-title">Finance Analyst – Variance Review</h2>
                <div className="text-muted">Click-only · Variance classification · No dashboards</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/analyst/step/intake')}>
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
                      <h3 className="card-title">4 steps · variance classification</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row g-2">
                      <div className="col-12">
                        <div className="text-muted">Report</div>
                        <div className="fw-semibold">FIN-REP-118 · MTD · Loss ratio</div>
                      </div>
                      <div className="col-12">
                        <div className="text-muted">Goal</div>
                        <div className="fw-semibold">Classify variance and decide control action</div>
                      </div>
                    </div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/analyst/step/intake')}>
                        Start at step 1 (intake)
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/demo')}>
                        Back to demo overview
                      </button>
                    </div>
                    <div className="text-muted mt-3" style={{ fontSize: '0.82rem' }}>
                      Auto-reset on entry ensures a clean click flow every time.
                    </div>
                  </div>
                </div>
              </div>

              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>Finance Analyst – Accountability</h4>
                  <div>Decides: variance classification + follow-up route</div>
                  <div>Accountable: signal quality & actionability</div>
                  <hr />
                  <h4>Audit log</h4>
                  <div className="admin-audit">
                    {(() => {
                      const items = [] as { ts: string; message: string }[]
                      return items.length ? null : <div className="text-muted">No entries yet.</div>
                    })()}
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
