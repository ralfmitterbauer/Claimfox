import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_FIN_ANALYST_STATE'
const KEY_AUDIT = 'DEMO_FIN_ANALYST_AUDIT'

type FinanceAnalystState = {
  reportId: string
  period: 'MTD' | 'QTD'
  signal: 'loss_ratio' | 'expense_ratio' | 'premium_leakage'
  varianceLevel: 'low' | 'medium' | 'high'
  classification: 'data_issue' | 'ops_issue' | 'pricing_issue' | 'claims_drift' | 'none'
  controlRaised: boolean
  signoff: boolean
}

function defaultState(): FinanceAnalystState {
  return {
    reportId: 'FIN-REP-118',
    period: 'MTD',
    signal: 'loss_ratio',
    varianceLevel: 'medium',
    classification: 'none',
    controlRaised: false,
    signoff: false
  }
}

export default function DemoFinanceAnalystPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)

  useEffect(() => {
    resetKeys([KEY_STATE, KEY_AUDIT])
    writeJson(KEY_STATE, defaultState())
    appendAudit(KEY_AUDIT, tr('Demo started (state reset)', 'Demo gestartet (State zurückgesetzt)'))
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('FINANCE DEMO', 'FINANCE-DEMO')}</div>
                <h2 className="page-title">{tr('Finance Analyst – Variance Review', 'Finance Analyst – Varianzprüfung')}</h2>
                <div className="text-muted">{tr('Click-only · Variance classification · No dashboards', 'Click-only · Varianzklassifizierung · Keine Dashboards')}</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/analyst/step/intake')}>
                    {tr('Start review', 'Prüfung starten')}
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
                      <div className="text-muted">{tr('What you will review', 'Was du prüfst')}</div>
                      <h3 className="card-title">{tr('4 steps · variance classification', '4 Schritte · Varianzklassifizierung')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row g-2">
                      <div className="col-12">
                        <div className="text-muted">{tr('Report', 'Report')}</div>
                        <div className="fw-semibold">FIN-REP-118 · MTD · {tr('Loss ratio', 'Schadenquote')}</div>
                      </div>
                      <div className="col-12">
                        <div className="text-muted">{tr('Goal', 'Ziel')}</div>
                        <div className="fw-semibold">{tr('Classify variance and decide control action', 'Varianz klassifizieren und Kontrollmaßnahme entscheiden')}</div>
                      </div>
                    </div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/analyst/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/demo')}>
                        {tr('Back to demo overview', 'Zur Demo-Übersicht')}
                      </button>
                    </div>
                    <div className="text-muted mt-3" style={{ fontSize: '0.82rem' }}>
                      {tr('Auto-reset on entry ensures a clean click flow every time.', 'Auto-Reset beim Einstieg sorgt immer für einen sauberen Click-Flow.')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>{tr('Finance Analyst – Accountability', 'Finance Analyst – Verantwortung')}</h4>
                  <div>{tr('Decides: variance classification + follow-up route', 'Entscheidet: Varianzklassifizierung + Folgeroute')}</div>
                  <div>{tr('Accountable: signal quality & actionability', 'Verantwortlich: Signalqualität & Handlungsfähigkeit')}</div>
                  <hr />
                  <h4>{tr('Audit log', 'Audit-Log')}</h4>
                  <div className="admin-audit">
                    {(() => {
                      const items = [] as { ts: string; message: string }[]
                      return items.length ? null : <div className="text-muted">{tr('No entries yet.', 'Noch keine Einträge.')}</div>
                    })()}
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
