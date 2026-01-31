import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_OVERVIEW_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_OVERVIEW_AUDIT'

type OverviewState = {
  caseId: string
  network: 'assistance' | 'rental' | 'surveyors' | 'major-loss' | 'parts' | 'none'
  selectedPartner: string
  dataPack: 'calc' | 'report' | 'claim' | 'all' | 'none'
  locked: boolean
}

function defaultState(): OverviewState {
  return {
    caseId: 'CLM-10421',
    network: 'none',
    selectedPartner: '',
    dataPack: 'none',
    locked: false
  }
}

export default function DemoPartnerOverviewPage() {
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
                <h2 className="page-title">{tr('Partner Overview – Network Selection', 'Partner Overview – Netzwerk Auswahl')}</h2>
                <div className="text-muted">{tr('Click-only · Choose network, partner, and data pack', 'Nur Klicks · Netzwerk, Partner und Datenpaket auswählen')}</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-partners/overview/step/intake')}>
                    {tr('Start overview', 'Übersicht starten')}
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
                      <h3 className="card-title">{tr('5 steps · network → data pack', '5 Schritte · Netzwerk → Datenpaket')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">CLM-10421 · {tr('Fleet liability', 'Flottenhaftung')}</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-partners/overview/step/intake')}>
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
                  <h4>{tr('Partner Overview – Accountability', 'Partner Overview – Verantwortung')}</h4>
                  <div>{tr('Decides: network + partner + data pack', 'Entscheidet: Netzwerk + Partner + Datenpaket')}</div>
                  <div>{tr('Accountable: data access discipline', 'Verantwortlich: Datennutzungsdisziplin')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
