import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_ASSIST_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_ASSIST_AUDIT'

type AssistState = {
  selectedPartner: string
  dispatchMode: 'none' | 'tow' | 'roadside' | 'replacement'
  slaChecked: boolean
  kpiChecked: boolean
  chatTemplate: 'none' | 'dispatch' | 'status' | 'close'
  closed: boolean
}

function defaultState(): AssistState {
  return {
    selectedPartner: '',
    dispatchMode: 'none',
    slaChecked: false,
    kpiChecked: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerAssistancePage() {
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
                <h2 className="page-title">{tr('Assistance – Dispatch & SLA', 'Assistance – Dispatch & SLA')}</h2>
                <div className="text-muted">{tr('Click-only · Dispatch and partner chat', 'Nur Klicks · Dispatch und Partner-Chat')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                  }}>{tr('Reset', 'Zurücksetzen')}</button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-partners/assistance/step/intake')}>
                    {tr('Start assistance', 'Assistance starten')}
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
                      <h3 className="card-title">{tr('5 steps · dispatch → close', '5 Schritte · Dispatch → Abschluss')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">CLM-10421 · München</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-partners/assistance/step/intake')}>
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
                  <h4>{tr('Assistance – Accountability', 'Assistance – Verantwortung')}</h4>
                  <div>{tr('Decides: dispatch + SLA/KPI checks', 'Entscheidet: Dispatch + SLA/KPI Checks')}</div>
                  <div>{tr('Accountable: response time & comms', 'Verantwortlich: Reaktionszeit & Kommunikation')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
