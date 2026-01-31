import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

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
                <h2 className="page-title">{tr('CFO / Carrier Finance Final Authority', 'CFO / Carrier Finance Final Authority')}</h2>
                <div className="text-muted">{tr('Click-only · Capital impact & governance', 'Nur Klicks · Kapitalwirkung & Governance')}</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/cfo/step/intake')}>
                    {tr('Start decision', 'Entscheidung starten')}
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
                      <h3 className="card-title">{tr('5 steps · finance final authority', '5 Schritte · Finance Final Authority')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Decision', 'Entscheidung')}</div>
                    <div className="fw-semibold">CFO-DEC-0091 · {tr('Claims tail risk', 'Claims Tail Risk')}</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/cfo/step/intake')}>
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
                  <h4>{tr('CFO – Accountability', 'CFO – Verantwortung')}</h4>
                  <div>{tr('Decides: finance gate for exceptions', 'Entscheidet: Finanz-Gate für Ausnahmen')}</div>
                  <div>{tr('Accountable: capital impact & governance', 'Verantwortlich: Kapitalwirkung & Governance')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
