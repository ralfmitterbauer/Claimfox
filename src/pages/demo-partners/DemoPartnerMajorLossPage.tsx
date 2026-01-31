import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_MAJORLOSS_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_MAJORLOSS_AUDIT'

type MajorLossState = {
  selectedPartner: string
  triageLevel: 'none' | 'high-touch' | 'standard' | 'containment'
  expertsRequested: boolean
  governanceNotified: boolean
  locked: boolean
}

function defaultState(): MajorLossState {
  return {
    selectedPartner: '',
    triageLevel: 'none',
    expertsRequested: false,
    governanceNotified: false,
    locked: false
  }
}

export default function DemoPartnerMajorLossPage() {
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
                <div className="page-pretitle">{tr('PARTNER DEMO', 'PARTNER DEMO')}</div>
                <h2 className="page-title">{tr('Major Loss – Triage & Governance', 'Major Loss – Triage & Governance')}</h2>
                <div className="text-muted">{tr('Click-only · Expert pack & governance', 'Nur Klicks · Expertenpaket & Governance')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                  }}>{tr('Reset', 'Zurücksetzen')}</button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-partners/major-loss/step/intake')}>
                    {tr('Start major loss flow', 'Major-Loss-Flow starten')}
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
                      <h3 className="card-title">{tr('5 steps · triage → lock', '5 Schritte · Triage → Sperren')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">CLM-10421 · {tr('Major loss', 'Großschaden')}</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-partners/major-loss/step/intake')}>
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
                  <h4>{tr('Major Loss – Accountability', 'Major Loss – Verantwortung')}</h4>
                  <div>{tr('Decides: triage + expert pack + governance', 'Entscheidet: Triage + Expertenpaket + Governance')}</div>
                  <div>{tr('Accountable: severity control', 'Verantwortlich: Severity-Kontrolle')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
