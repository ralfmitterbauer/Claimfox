import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_RENTAL_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_RENTAL_AUDIT'

type RentalState = {
  selectedPartner: string
  vehicleMatch: 'none' | 'van' | 'truck' | 'replacement-car'
  pricingMode: 'none' | 'standard' | 'capped' | 'exception'
  calcReceived: boolean
  chatTemplate: 'none' | 'reserve' | 'confirm-price' | 'close'
  closed: boolean
}

function defaultState(): RentalState {
  return {
    selectedPartner: '',
    vehicleMatch: 'none',
    pricingMode: 'none',
    calcReceived: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerRentalPage() {
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
                <h2 className="page-title">{tr('Rental – Vehicle Match & Pricing', 'Rental – Fahrzeugmatch & Pricing')}</h2>
                <div className="text-muted">{tr('Click-only · Match vehicle and confirm pricing', 'Nur Klicks · Fahrzeug matchen und Pricing bestätigen')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                  }}>{tr('Reset', 'Zurücksetzen')}</button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-partners/rental/step/intake')}>
                    {tr('Start rental', 'Rental starten')}
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
                      <h3 className="card-title">{tr('5 steps · match → close', '5 Schritte · Match → Abschluss')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">CLM-10421 · {tr('Rental need', 'Rental Bedarf')}</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-partners/rental/step/intake')}>
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
                  <h4>{tr('Rental – Accountability', 'Rental – Verantwortung')}</h4>
                  <div>{tr('Decides: vehicle match + pricing', 'Entscheidet: Fahrzeugmatch + Pricing')}</div>
                  <div>{tr('Accountable: cost & SLA adherence', 'Verantwortlich: Kosten & SLA-Einhaltung')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
