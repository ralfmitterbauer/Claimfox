import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_UW_JUNIOR_STATE'
const KEY_AUDIT = 'DEMO_UW_JUNIOR_AUDIT'

type JuniorUwState = {
  caseId: string
  insured: string
  product: string
  corridorInside: boolean
  evidenceOk: boolean
  recommendationShown: boolean
  approved: boolean
  slaOk: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): JuniorUwState {
  return {
    caseId: 'UW-REF-10421',
    insured: 'Atlas Logistics GmbH',
    product: 'Commercial Auto Liability',
    corridorInside: true,
    evidenceOk: true,
    recommendationShown: false,
    approved: false,
    slaOk: false,
  }
}

function writeState(next: JuniorUwState) {
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

export default function DemoJuniorUnderwriterPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)

  // AUTO RESET ON START (required)
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
                <h2 className="page-title">{tr('Junior Underwriter – Decision Journey', 'Junior Underwriter – Entscheidungsreise')}</h2>
                <div className="text-muted">
                  {tr('Click-only · AI recommends · Human decides · No dashboards', 'Nur Klicks · KI empfiehlt · Mensch entscheidet · Keine Dashboards')}
                </div>
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
                      nav('/demo-underwriter/junior/step/intake')
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
                      <span>{tr('5 screens · one decision per screen', '5 Screens · eine Entscheidung pro Screen')}</span>
                    </div>
                    <span className="badge bg-blue-lt">{tr('Junior UW', 'Junior UW')}</span>
                  </div>
                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">{tr('Case', 'Fall')}</div><div className="v">UW-REF-10421</div>
                        <div className="k">{tr('Insured', 'Versicherter')}</div><div className="v">Atlas Logistics GmbH</div>
                        <div className="k">{tr('Product', 'Produkt')}</div><div className="v">{tr('Commercial Auto Liability', 'Gewerbliche Kfz-Haftpflicht')}</div>
                        <div className="k">{tr('Goal', 'Ziel')}</div><div className="v">{tr('Approve inside corridor within SLA', 'Freigabe im Korridor innerhalb SLA')}</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI stance (always non-binding)', 'KI-Position (immer unverbindlich)')}</div>
                      <div className="uw-admin-small">
                        {tr('AI checks corridor fit and evidence quality. You confirm or request clarification.', 'KI prüft Korridor-Fit und Evidenzqualität. Sie bestätigen oder fordern Klärung an.')}
                      </div>
                      <div className="badge bg-green-lt" style={{ justifySelf: 'start' }}>{tr('Inside corridor', 'Im Korridor')}</div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-underwriter/junior/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/junior')}>
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
                  <h4>{tr('Junior UW – Accountability', 'Junior UW – Verantwortlichkeit')}</h4>
                  <div className="uw-admin-small">
                    {tr('Decides: corridor approvals · Accountable: evidence quality & SLA compliance.', 'Entscheidet: Korridor-Freigaben · Verantwortlich: Evidenzqualität & SLA-Einhaltung.')}
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-blue-lt">{tr('Evidence quality', 'Evidenzqualität')}</span>
                    <span className="badge bg-blue-lt">SLA</span>
                    <span className="badge bg-blue-lt">{tr('Audit trail', 'Audit-Trail')}</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('How AI helps', 'Wie KI hilft')}</h4>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                      <li>{tr('Validates corridor fit (appetite rules)', 'Validiert Korridor-Fit (Appetite-Regeln)')}</li>
                      <li>{tr('Checks evidence completeness & red flags', 'Prüft Evidenz-Vollständigkeit & Red Flags')}</li>
                      <li>{tr('Explains recommendation rationale', 'Erklärt die Empfehlung')}</li>
                      <li>{tr('Highlights SLA remaining time', 'Hebt verbleibende SLA-Zeit hervor')}</li>
                    </ul>
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
