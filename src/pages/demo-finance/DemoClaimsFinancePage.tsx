import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

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
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)

  useEffect(() => {
    resetKeys([KEY_STATE, KEY_AUDIT])
    writeJson(KEY_STATE, defaultState())
    appendAudit(KEY_AUDIT, tr('Demo started (state reset)', 'Demo gestartet (State zurückgesetzt)'))
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('FINANCE DEMO', 'FINANCE-DEMO')}</div>
                <h2 className="page-title">{tr('Claims Finance – Severity Control', 'Claims Finance – Schweregrad-Steuerung')}</h2>
                <div className="text-muted">{tr('Click-only · Settlement range & automation', 'Click-only · Settlement-Range & Automatisierung')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                  }}>
                    {tr('Reset', 'Zurücksetzen')}
                  </button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/claims/step/intake')}>
                    {tr('Start review', 'Prüfung starten')}
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
                      <div className="text-muted">{tr('What you will review', 'Was du prüfst')}</div>
                      <h3 className="card-title">{tr('5 steps · severity & automation', '5 Schritte · Schweregrad & Automatisierung')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">CLM-10421 · {tr('Liability', 'Haftung')}</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/claims/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/demo')}>
                        {tr('Back to demo overview', 'Zur Demo-Übersicht')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>{tr('Claims Finance – Accountability', 'Claims Finance – Verantwortung')}</h4>
                  <div>{tr('Decides: settlement range + automation gate', 'Entscheidet: Settlement-Range + Automations-Gate')}</div>
                  <div>{tr('Accountable: claims ratio & leakage', 'Verantwortlich: Schadenquote & Leakage')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
