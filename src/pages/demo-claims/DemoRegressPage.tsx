import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_claimsStorage'
import { useI18n } from '@/i18n/I18nContext'

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
                <h2 className="page-title">{tr('Regress – Recovery Path', 'Regress – Recovery-Pfad')}</h2>
                <div className="text-muted">{tr('Click-only · Liability & recovery posture', 'Nur Klicks · Haftung & Recovery-Posture')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                  }}>{tr('Reset', 'Zurücksetzen')}</button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-claims/regress/step/intake')}>
                    {tr('Start recovery flow', 'Recovery-Flow starten')}
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
                      <h3 className="card-title">{tr('5 steps · recovery', '5 Schritte · Recovery')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">CLM-10421 · Stadtwerke München</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-claims/regress/step/intake')}>
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
                  <h4>{tr('Regress – Accountability', 'Regress – Verantwortung')}</h4>
                  <div>{tr('Decides: liability assessment + recovery posture', 'Entscheidet: Haftung + Recovery-Posture')}</div>
                  <div>{tr('Accountable: recoverable value & defensibility', 'Verantwortlich: Recoverable-Wert & Nachvollziehbarkeit')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
