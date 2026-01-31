import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

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
                <h2 className="page-title">{tr('Reinsurance Finance – Recoverables', 'Rückversicherung – Recoverables')}</h2>
                <div className="text-muted">
                  {tr('Click-only · Attachment & recoverable booking', 'Nur Klicks · Attachment & Recoverable-Buchung')}
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/reinsurance/step/intake')}>
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
                      <div className="text-muted">{tr('What you will review', 'Was Sie prüfen')}</div>
                      <h3 className="card-title">{tr('5 steps · recoverables', '5 Schritte · Recoverables')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Treaty', 'Vertrag')}</div>
                    <div className="fw-semibold">QS-2025-ALPHA</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/reinsurance/step/intake')}>
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
                  <h4>{tr('Reinsurance Finance – Accountability', 'Rückversicherung – Verantwortung')}</h4>
                  <div>{tr('Decides: attachment + recoverable booking', 'Entscheidet: Attachment + Recoverable-Buchung')}</div>
                  <div>{tr('Accountable: treaty compliance & accuracy', 'Verantwortlich: Vertragstreue & Genauigkeit')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
