import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_UW_SENIOR_STATE'
const KEY_AUDIT = 'DEMO_UW_SENIOR_AUDIT'

type SeniorUwState = {
  caseId: string
  insured: string
  product: string
  basePremiumMonthly: number
  aiSuggestedOverride: 'none' | 'limit_increase' | 'deductible_adjust'
  overrideProposed: boolean
  portfolioChecked: boolean
  governanceRequested: boolean
  governanceApproved: boolean
  escalatedToCarrier: boolean
  decision: 'pending' | 'approve_override' | 'decline' | 'escalate'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): SeniorUwState {
  return {
    caseId: 'UW-OVR-88317',
    insured: 'Nordbahn Freight AG',
    product: 'Fleet Liability + Cargo Extension',
    basePremiumMonthly: 189,
    aiSuggestedOverride: 'limit_increase',
    overrideProposed: false,
    portfolioChecked: false,
    governanceRequested: false,
    governanceApproved: false,
    escalatedToCarrier: false,
    decision: 'pending',
    decisionLocked: false,
  }
}

function writeState(next: SeniorUwState) {
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

export default function DemoSeniorUnderwriterPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)

  // AUTO RESET ON START
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
                <h2 className="page-title">{tr('Senior Underwriter – Override + Governance', 'Senior Underwriter – Override + Governance')}</h2>
                <div className="text-muted">{tr('Click-only · AI recommends · Governance gate · No dashboards', 'Nur Klicks · KI empfiehlt · Governance-Gate · Keine Dashboards')}</div>
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
                      nav('/demo-underwriter/senior/step/intake')
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
                      <span>{tr('6 screens · override requires governance', '6 Screens · Override erfordert Governance')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Senior UW', 'Senior UW')}</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">{tr('Case', 'Fall')}</div><div className="v">UW-OVR-88317</div>
                        <div className="k">{tr('Insured', 'Versicherter')}</div><div className="v">Nordbahn Freight AG</div>
                        <div className="k">{tr('Product', 'Produkt')}</div><div className="v">{tr('Fleet Liability + Cargo Extension', 'Flottenhaftpflicht + Fracht-Erweiterung')}</div>
                        <div className="k">{tr('Goal', 'Ziel')}</div><div className="v">{tr('Override under governance + portfolio check', 'Override unter Governance + Portfolio-Check')}</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI stance (non-binding)', 'KI-Position (unverbindlich)')}</div>
                      <div className="uw-admin-small">
                        {tr('AI suggests a controlled override and highlights portfolio constraints and escalation triggers.', 'KI schlägt einen kontrollierten Override vor und markiert Portfolio-Grenzen sowie Eskalations-Trigger.')}
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">{tr('Override candidate', 'Override-Kandidat')}</span>
                        <span className="badge bg-azure-lt">{tr('Governance gate', 'Governance-Gate')}</span>
                        <span className="badge bg-azure-lt">{tr('Portfolio impact', 'Portfolio-Impact')}</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-underwriter/senior/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/senior')}>
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
                  <h4>{tr('Senior UW – Accountability', 'Senior UW – Verantwortlichkeit')}</h4>
                  <div className="uw-admin-small">
                    <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('overrides with governance approval', 'Overrides mit Governance-Freigabe')}</div>
                    <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('portfolio impact & escalation logic', 'Portfolio-Impact & Eskalationslogik')}</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">{tr('Override governance', 'Override-Governance')}</span>
                    <span className="badge bg-indigo-lt">{tr('Portfolio impact', 'Portfolio-Impact')}</span>
                    <span className="badge bg-indigo-lt">{tr('Escalations', 'Eskalationen')}</span>
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
