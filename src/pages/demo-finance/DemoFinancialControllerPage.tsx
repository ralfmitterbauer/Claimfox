import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

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
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)

  useEffect(() => {
    resetKeys([KEY_STATE, KEY_AUDIT])
    writeJson(KEY_STATE, defaultState())
    appendAudit(KEY_AUDIT, tr('Demo started (state reset)', 'Demo gestartet (Status zurückgesetzt)'))
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('FINANCE DEMO', 'FINANZ DEMO')}</div>
                <h2 className="page-title">{tr('Financial Controller – Close & Controls', 'Financial Controller – Close & Controls')}</h2>
                <div className="text-muted">
                  {tr('Click-only · Accrual posture & close readiness', 'Nur Klicks · Abgrenzung & Close-Readiness')}
                </div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/controller/step/intake')}>
                    {tr('Start close flow', 'Close-Flow starten')}
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
                      <div className="text-muted">{tr('What you will review', 'Was Sie prüfen')}</div>
                      <h3 className="card-title">{tr('5 steps · close readiness', '5 Schritte · Close-Readiness')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Close', 'Close')}</div>
                    <div className="fw-semibold">CLOSE-2025-01</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/controller/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/demo')}>
                        {tr('Back to demo overview', 'Zurück zur Demo-Übersicht')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>{tr('Financial Controller – Accountability', 'Financial Controller – Verantwortung')}</h4>
                  <div>{tr('Decides: accrual posture + close readiness', 'Entscheidet: Abgrenzung + Close-Readiness')}</div>
                  <div>{tr('Accountable: control environment', 'Verantwortlich: Kontrollumfeld')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
