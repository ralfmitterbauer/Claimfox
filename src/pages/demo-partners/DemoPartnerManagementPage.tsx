import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_MGMT_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_MGMT_AUDIT'

type PartnerMgmtState = {
  partner: string
  onboardingStatus: 'none' | 'invited' | 'verified' | 'active'
  contractMode: 'standard' | 'premium-sla' | 'restricted'
  kpiMonitoring: boolean
  escalationRule: 'none' | 'auto' | 'manual'
  locked: boolean
}

function defaultState(): PartnerMgmtState {
  return {
    partner: 'RoadAssist Süd',
    onboardingStatus: 'invited',
    contractMode: 'standard',
    kpiMonitoring: true,
    escalationRule: 'auto',
    locked: false
  }
}

export default function DemoPartnerManagementPage() {
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
                <h2 className="page-title">{tr('Partner Management – Onboarding & Controls', 'Partner Management – Onboarding & Controls')}</h2>
                <div className="text-muted">{tr('Click-only · Onboarding and performance rules', 'Nur Klicks · Onboarding und Performance-Regeln')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                  }}>{tr('Reset', 'Zurücksetzen')}</button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-partners/management/step/intake')}>
                    {tr('Start partner setup', 'Partner-Setup starten')}
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
                      <h3 className="card-title">{tr('5 steps · onboarding → lock', '5 Schritte · Onboarding → Sperren')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Partner', 'Partner')}</div>
                    <div className="fw-semibold">RoadAssist Süd</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-partners/management/step/intake')}>
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
                  <h4>{tr('Partner Management – Accountability', 'Partner Management – Verantwortung')}</h4>
                  <div>{tr('Decides: onboarding + controls + performance', 'Entscheidet: Onboarding + Controls + Performance')}</div>
                  <div>{tr('Accountable: partner quality & governance', 'Verantwortlich: Partnerqualität & Governance')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
