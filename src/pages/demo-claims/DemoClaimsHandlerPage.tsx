import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_claimsStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_CLAIMS_HANDLER_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_HANDLER_AUDIT'

type ClaimsHandlerState = {
  caseId: string
  insured: string
  policyNumber: string
  product: string
  reportedAmount: number
  coverageSignal: 'clear' | 'ambiguous' | 'excluded'
  evidencePack: 'missing' | 'partial' | 'complete'
  decision: 'pending' | 'pay' | 'deny' | 'refer'
  nextAction: 'none' | 'request_docs' | 'appoint_expert' | 'payment_release' | 'refer_legal'
  decisionReady: boolean
}

function defaultState(): ClaimsHandlerState {
  return {
    caseId: 'CLM-10421',
    insured: 'Nordstadt Logistics GmbH',
    policyNumber: 'PL-204889',
    product: 'Carrier Liability + Fleet',
    reportedAmount: 42000,
    coverageSignal: 'ambiguous',
    evidencePack: 'partial',
    decision: 'pending',
    nextAction: 'none',
    decisionReady: false
  }
}

export default function DemoClaimsHandlerPage() {
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
                <div className="page-pretitle">{tr('CLAIMS DEMO', 'SCHADEN DEMO')}</div>
                <h2 className="page-title">{tr('Claims Handler – Evidence & Decision', 'Versicherungssachbearbeiter – Evidenz & Entscheidung')}</h2>
                <div className="text-muted">{tr('Click-only · Coverage position & next actions', 'Nur Klicks · Deckung & nächste Schritte')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      resetKeys([KEY_STATE, KEY_AUDIT])
                      writeJson(KEY_STATE, defaultState())
                      appendAudit(KEY_AUDIT, tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                    }}
                  >
                    {tr('Reset', 'Zurücksetzen')}
                  </button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-claims/handler/step/intake')}>
                    {tr('Start handler flow', 'Sachbearbeiter-Flow starten')}
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
                      <h3 className="card-title">{tr('5 steps · coverage & next actions', '5 Schritte · Deckung & nächste Schritte')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">CLM-10421 · PL-204889</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-claims/handler/step/intake')}>
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
                  <h4>{tr('Claims Handler – Accountability', 'Sachbearbeiter – Verantwortung')}</h4>
                  <div>{tr('Decides: coverage position + next actions', 'Entscheidet: Deckungsposition + nächste Schritte')}</div>
                  <div>{tr('Accountable: evidence quality & SLA', 'Verantwortlich: Evidenzqualität & SLA')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
