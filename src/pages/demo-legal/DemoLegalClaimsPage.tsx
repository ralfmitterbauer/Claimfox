import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_LEGAL_CLAIMS_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_CLAIMS_AUDIT'

type ClaimsLegalState = {
  caseId: string
  claimant: string
  insured: string
  venue: string
  exposure: number
  evidenceStrength: 'low' | 'medium' | 'high'
  strategy: 'pending' | 'defend' | 'settle' | 'mediate'
  counselEngaged: boolean
  settlementRange: 'none' | 'low' | 'mid' | 'high'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): ClaimsLegalState {
  return {
    caseId: 'LGL-LIT-90211',
    claimant: 'Stadtwerke München',
    insured: 'Nordstadt Logistics GmbH',
    venue: 'Munich',
    exposure: 250000,
    evidenceStrength: 'medium',
    strategy: 'pending',
    counselEngaged: false,
    settlementRange: 'none',
    decisionLocked: false,
  }
}

function writeState(next: ClaimsLegalState) {
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

export default function DemoLegalClaimsPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)

  useEffect(() => {
    clearAll()
    writeState(defaultState())
    appendAudit(tr('Demo started (state reset)', 'Demo gestartet (State zurückgesetzt)'))
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('LEGAL DEMO', 'LEGAL-DEMO')}</div>
                <h2 className="page-title">{tr('Claims Legal – Litigation & Settlement', 'Claims Legal – Prozessführung & Vergleich')}</h2>
                <div className="text-muted">{tr('Click-only · Litigation strategy · No dashboards', 'Click-only · Litigation-Strategie · Keine Dashboards')}</div>
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
                      nav('/demo-legal/claims/step/intake')
                    }}
                  >
                    {tr('Start legal flow', 'Legal-Flow starten')}
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
                      <strong>{tr('What you will click through', 'Was du durchklickst')}</strong>
                      <span>{tr('5 screens · litigation & settlement', '5 Screens · Litigation & Settlement')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Claims Legal', 'Claims Legal')}</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">{tr('Case', 'Fall')}</div><div className="v">LGL-LIT-90211</div>
                        <div className="k">{tr('Claimant', 'Anspruchsteller')}</div><div className="v">Stadtwerke München</div>
                        <div className="k">{tr('Insured', 'Versicherungsnehmer')}</div><div className="v">Nordstadt Logistics GmbH</div>
                        <div className="k">{tr('Goal', 'Ziel')}</div><div className="v">{tr('Litigation strategy + settlement posture', 'Litigation-Strategie + Settlement-Position')}</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI stance (non-binding)', 'KI-Einschätzung (unverbindlich)')}</div>
                      <div className="uw-admin-small">
                        {tr(
                          'Exposure moderate; evidence medium; recommend evaluate defend vs mediate.',
                          'Exponierung moderat; Evidenz mittel; Empfehlung: Verteidigen vs. Mediation prüfen.',
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">{tr('Liability', 'Haftung')}</span>
                        <span className="badge bg-azure-lt">{tr('Strategy', 'Strategie')}</span>
                        <span className="badge bg-azure-lt">{tr('Settlement', 'Settlement')}</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-legal/claims/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/legal/claims-specialist')}>
                        {tr('Back to role page', 'Zur Rollen-Seite')}
                      </button>
                    </div>

                    <div className="text-muted" style={{ fontSize: '0.82rem' }}>
                      {tr(
                        'Note: This start screen auto-resets session state on every visit to ensure the click flow always works.',
                        'Hinweis: Dieser Start-Screen setzt den Session-State bei jedem Besuch automatisch zurück.',
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>{tr('Claims Legal – Accountability', 'Claims Legal – Verantwortung')}</h4>
                  <div className="uw-admin-small">
                    <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('litigation strategy & settlement path', 'Litigation-Strategie & Settlement-Pfad')}</div>
                    <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('legal risk & cost containment', 'rechtliches Risiko & Kostenkontrolle')}</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">{tr('Strategy', 'Strategie')}</span>
                    <span className="badge bg-indigo-lt">{tr('Counsel', 'Counsel')}</span>
                    <span className="badge bg-indigo-lt">{tr('Settlement', 'Settlement')}</span>
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
