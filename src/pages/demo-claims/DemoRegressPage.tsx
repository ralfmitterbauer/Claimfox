import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_claimsStorage'

const KEY_STATE = 'DEMO_CLAIMS_REGRESS_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_REGRESS_AUDIT'

type RegressState = {
  caseId: string
  claimant: string
  thirdParty: string
  liabilitySignal: 'low' | 'medium' | 'high'
  recoveryPotential: 'none' | 'low' | 'mid' | 'high'
  outreachSent: boolean
  settlementPosture: 'none' | 'soft' | 'firm'
  recoveredStatus: 'open' | 'settled' | 'litigation'
  locked: boolean
}

function defaultState(): RegressState {
  return {
    caseId: 'CLM-10421',
    claimant: 'Stadtwerke München',
    thirdParty: 'München Tiefbau GmbH',
    liabilitySignal: 'medium',
    recoveryPotential: 'mid',
    outreachSent: false,
    settlementPosture: 'none',
    recoveredStatus: 'open',
    locked: false
  }
}

export default function DemoRegressPage() {
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
                <h2 className="page-title">Regressierung – Recovery Path</h2>
                <div className="text-muted">Click-only · Liability & recovery posture</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, 'Demo reset (manual)')
                  }}>Reset</button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-claims/regress/step/intake')}>
                    Start recovery flow
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
                      <h3 className="card-title">5 steps · recovery</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Case</div>
                    <div className="fw-semibold">CLM-10421 · Stadtwerke München</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-claims/regress/step/intake')}>
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
                  <h4>Regress – Accountability</h4>
                  <div>Decides: liability assessment + recovery posture</div>
                  <div>Accountable: recoverable value & defensibility</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
