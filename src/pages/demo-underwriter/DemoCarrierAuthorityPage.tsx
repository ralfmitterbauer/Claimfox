import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_UW_CARRIER_STATE'
const KEY_AUDIT = 'DEMO_UW_CARRIER_AUDIT'

type CarrierAuthorityState = {
  caseId: string
  insured: string
  product: string
  requestedLimit: number
  capacityAvailable: number
  capacityConfirmed: boolean
  limitApproved: boolean
  complianceChecked: boolean
  decision: 'pending' | 'approve' | 'restrict' | 'decline'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): CarrierAuthorityState {
  return {
    caseId: 'UW-CAR-77104',
    insured: 'Nordbahn Freight AG',
    product: 'Fleet Liability + Cargo Extension',
    requestedLimit: 20,
    capacityAvailable: 28,
    capacityConfirmed: false,
    limitApproved: false,
    complianceChecked: false,
    decision: 'pending',
    decisionLocked: false,
  }
}

function writeState(next: CarrierAuthorityState) {
  sessionStorage.setItem(KEY_STATE, JSON.stringify(next))
}
function clearAll() {
  sessionStorage.removeItem(KEY_STATE)
  sessionStorage.removeItem(KEY_AUDIT)
}
function appendAudit(message: string) {
  const prev = sessionStorage.getItem(KEY_AUDIT)
  const list: AuditItem[] = prev ? JSON.parse(prev) : []
  list.unshift({ ts: nowTs(), message })
  sessionStorage.setItem(KEY_AUDIT, JSON.stringify(list))
}

export default function DemoCarrierAuthorityPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)

  useEffect(() => {
    clearAll()
    writeState(defaultState())
    appendAudit(tr('Demo started (state reset)', 'Demo gestartet (Status zurückgesetzt)'))
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('UNDERWRITER DEMO', 'UNDERWRITER DEMO')}</div>
                <h2 className="page-title">{tr('Carrier Authority – Final Capacity & Limits', 'Carrier Authority – Finale Kapazität & Limits')}</h2>
                <div className="text-muted">{tr('Click-only · Escalation decision · No dashboards', 'Nur Klicks · Eskalationsentscheidung · Keine Dashboards')}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      clearAll()
                      writeState(defaultState())
                      appendAudit(tr('Demo reset (manual)', 'Demo zurückgesetzt (manuell)'))
                    }}
                  >
                    {tr('Reset', 'Zurücksetzen')}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      appendAudit(tr('Case opened', 'Fall geöffnet'))
                      nav('/demo-underwriter/carrier/step/handover')
                    }}
                  >
                    {tr('Start case', 'Fall starten')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="uw-shell">
              <div className="uw-left">
                <div className="uw-decision">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{tr('What you will click through', 'Was Sie durchklicken')}</strong>
                      <span>{tr('5 screens · final capacity & limits', '5 Screens · finale Kapazität & Limits')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Carrier Authority', 'Carrier Authority')}</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">{tr('Case', 'Fall')}</div><div className="v">UW-CAR-77104</div>
                        <div className="k">{tr('Insured', 'Versicherter')}</div><div className="v">Nordbahn Freight AG</div>
                        <div className="k">{tr('Product', 'Produkt')}</div><div className="v">{tr('Fleet Liability + Cargo Extension', 'Flottenhaftpflicht + Fracht-Erweiterung')}</div>
                        <div className="k">{tr('Goal', 'Ziel')}</div><div className="v">{tr('Final capacity & limit decision', 'Finale Kapazitäts- & Limitentscheidung')}</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI stance (non-binding)', 'KI-Position (unverbindlich)')}</div>
                      <div className="uw-admin-small">
                        {tr('AI summarizes escalation reasons and highlights capacity concentration and compliance checks.', 'KI fasst Eskalationsgründe zusammen und hebt Kapazitätskonzentration sowie Compliance-Prüfungen hervor.')}
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">{tr('Capacity check', 'Kapazitätsprüfung')}</span>
                        <span className="badge bg-azure-lt">{tr('Limit approval', 'Limitfreigabe')}</span>
                        <span className="badge bg-azure-lt">{tr('Regulatory check', 'Regulatorik-Prüfung')}</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-underwriter/carrier/step/handover')}>
                        {tr('Start at step 1 (handover)', 'Start bei Schritt 1 (Handover)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/carrier')}>
                        {tr('Back to role page', 'Zurück zur Rollen-Seite')}
                      </button>
                    </div>

                    <div className="text-muted" style={{ fontSize: '0.82rem' }}>
                      {tr('Note: This start screen auto-resets session state on every visit to ensure the click flow always works.', 'Hinweis: Dieser Startscreen setzt den Status bei jedem Besuch zurück, damit der Klick-Flow immer funktioniert.')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>{tr('Carrier Authority – Accountability', 'Carrier Authority – Verantwortlichkeit')}</h4>
                  <div className="uw-admin-small">
                    <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('final capacity & limits', 'finale Kapazität & Limits')}</div>
                    <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('risk bearing & regulatory compliance', 'Risikotragung & regulatorische Compliance')}</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">{tr('Capacity', 'Kapazität')}</span>
                    <span className="badge bg-indigo-lt">{tr('Limits', 'Limits')}</span>
                    <span className="badge bg-indigo-lt">{tr('Compliance', 'Compliance')}</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('Audit (live)', 'Audit (live)')}</h4>
                    <div className="uw-audit">
                      {(() => {
                        const raw = sessionStorage.getItem(KEY_AUDIT)
                        const items: { ts: number; message: string }[] = raw ? JSON.parse(raw) : []
                        if (!items.length) return <div className="uw-admin-small">{tr('No entries yet.', 'Noch keine Einträge.')}</div>
                        return items.slice(0, 6).map((it) => (
                          <div className="uw-audit-item" key={it.ts}>
                            <div className="ts">{fmt(it.ts)}</div>
                            <div className="msg">{it.message}</div>
                          </div>
                        ))
                      })()}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
