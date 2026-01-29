import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'

const KEY_STATE = 'DEMO_FIN_BILLING_STATE'
const KEY_AUDIT = 'DEMO_FIN_BILLING_AUDIT'

type BillingState = {
  accountId: string
  customer: string
  cycle: 'monthly' | 'annual'
  invoiceAmount: number
  exception: 'none' | 'bank_reject' | 'address_mismatch' | 'tax_issue'
  exceptionCleared: boolean
  invoiceReleased: boolean
  locked: boolean
}

function defaultState(): BillingState {
  return {
    accountId: 'ACC-44021',
    customer: 'Nordstadt Logistics GmbH',
    cycle: 'monthly',
    invoiceAmount: 12900,
    exception: 'address_mismatch',
    exceptionCleared: false,
    invoiceReleased: false,
    locked: false
  }
}

export default function DemoPremiumBillingOpsPage() {
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
                <h2 className="page-title">Premium & Billing Operations</h2>
                <div className="text-muted">Click-only · Invoice release & exceptions</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/billing/step/intake')}>
                    Start billing flow
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
                      <h3 className="card-title">5 steps · invoice & exceptions</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Account</div>
                    <div className="fw-semibold">ACC-44021 · Nordstadt Logistics GmbH</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/billing/step/intake')}>
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
                  <h4>Billing Ops – Accountability</h4>
                  <div>Decides: invoice release + exception handling</div>
                  <div>Accountable: premium capture integrity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
