import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_claimsStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_CLAIMS_MANAGER_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_MANAGER_AUDIT'

type ClaimsManagerState = {
  caseId: string
  insured: string
  product: string
  reportedAmount: number
  severity: 'low' | 'medium' | 'high'
  triageRoute: 'fast_track' | 'standard' | 'complex' | 'siu' | 'none'
  authorityLevel: 'handler' | 'senior' | 'legal' | 'manager'
  planSelected: 'pay' | 'investigate' | 'deny' | 'settle' | 'none'
  escalated: boolean
  decisionLocked: boolean
}

function defaultState(): ClaimsManagerState {
  return {
    caseId: 'CLM-10421',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    reportedAmount: 42000,
    severity: 'medium',
    triageRoute: 'none',
    authorityLevel: 'handler',
    planSelected: 'none',
    escalated: false,
    decisionLocked: false
  }
}

export default function DemoClaimsManagerPage() {
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
                <h2 className="page-title">{tr('Claims Manager – Triage & Plan', 'Claims – Triage & Plan')}</h2>
                <div className="text-muted">{tr('Click-only · SLA routing & authority', 'Nur Klicks · SLA-Routing & Authority')}</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-claims/manager/step/intake')}>
                    {tr('Start triage', 'Triage starten')}
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
                      <h3 className="card-title">{tr('5 steps · triage → plan', '5 Schritte · Triage → Plan')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">CLM-10421 · Nordstadt Logistics GmbH</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-claims/manager/step/intake')}>
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
                  <h4>{tr('Claims Manager – Accountability', 'Claims – Verantwortung')}</h4>
                  <div>{tr('Decides: triage route + authority + plan', 'Entscheidet: Triage-Route + Authority + Plan')}</div>
                  <div>{tr('Accountable: SLA & escalation discipline', 'Verantwortlich: SLA & Eskalationsdisziplin')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
