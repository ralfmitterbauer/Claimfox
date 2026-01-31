import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_LEGAL_REGULATORY_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_REGULATORY_AUDIT'

type RegulatoryLegalState = {
  caseId: string
  sourceRole: 'Underwriting' | 'Claims' | 'Compliance'
  insured: string
  product: string
  jurisdiction: 'DE' | 'EU'
  triggerType: 'override' | 'systemic_issue' | 'complaint' | 'incident'
  materialityLevel: 'low' | 'medium' | 'high'
  reportable: boolean
  disclosureScope: 'none' | 'partial' | 'full'
  regulatorTarget: 'BaFin' | 'EIOPA' | 'LocalAuthority'
  escalationRequired: boolean
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): RegulatoryLegalState {
  return {
    caseId: 'REG-2024-0917',
    sourceRole: 'Underwriting',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    jurisdiction: 'DE',
    triggerType: 'override',
    materialityLevel: 'medium',
    reportable: false,
    disclosureScope: 'none',
    regulatorTarget: 'BaFin',
    escalationRequired: false,
    decisionLocked: false,
  }
}

function writeState(next: RegulatoryLegalState) {
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

export default function DemoRegulatoryLegalPage() {
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
                <h2 className="page-title">{tr('Regulatory Legal – Supervisory Liaison', 'Regulatory Legal – Aufsichtliche Schnittstelle')}</h2>
                <div className="text-muted">{tr('Click-only · Regulatory actions · No dashboards', 'Click-only · Regulatorische Maßnahmen · Keine Dashboards')}</div>
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
                      nav('/demo-legal/regulatory/step/intake')
                    }}
                  >
                    {tr('Start review', 'Prüfung starten')}
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
                      <span>{tr('5 screens · supervisory actions', '5 Screens · Aufsichtliche Maßnahmen')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Regulatory Legal', 'Regulatory Legal')}</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">{tr('Case', 'Fall')}</div><div className="v">REG-2024-0917</div>
                        <div className="k">{tr('Insured', 'Versicherungsnehmer')}</div><div className="v">Nordstadt Logistics GmbH</div>
                        <div className="k">{tr('Product', 'Produkt')}</div><div className="v">Carrier Liability + Fleet</div>
                        <div className="k">{tr('Goal', 'Ziel')}</div><div className="v">{tr('Reportability + disclosure scope', 'Meldepflicht + Offenlegungsscope')}</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI stance (non-binding)', 'KI-Einschätzung (unverbindlich)')}</div>
                      <div className="uw-admin-small">
                        {tr(
                          'Override-based underwriting decisions may trigger supervisory notification depending on materiality.',
                          'Override-basierte Underwriting-Entscheidungen können je nach Materialität eine Aufsichtsmitteilung auslösen.',
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">{tr('Materiality', 'Materialität')}</span>
                        <span className="badge bg-azure-lt">{tr('Disclosure', 'Offenlegung')}</span>
                        <span className="badge bg-azure-lt">{tr('Escalation', 'Eskalation')}</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-legal/regulatory/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/legal')}
                      >
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
                  <h4>{tr('Regulatory Legal – Accountability', 'Regulatory Legal – Verantwortung')}</h4>
                  <div className="uw-admin-small">
                    <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('reportability, disclosure scope, escalation', 'Meldepflicht, Offenlegungsscope, Eskalation')}</div>
                    <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('supervisory compliance & timeliness', 'Aufsichts-Compliance & Timeliness')}</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">{tr('Reportability', 'Meldepflicht')}</span>
                    <span className="badge bg-indigo-lt">{tr('Disclosure', 'Offenlegung')}</span>
                    <span className="badge bg-indigo-lt">{tr('Escalation', 'Eskalation')}</span>
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
