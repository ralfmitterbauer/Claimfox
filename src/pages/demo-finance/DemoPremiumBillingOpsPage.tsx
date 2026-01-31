import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_FIN_BILLING_STATE'
const KEY_AUDIT = 'DEMO_FIN_BILLING_AUDIT'

type BillingState = {
  accountId: string
  customer: string
  cycle: 'monthly' | 'annual'
  invoiceAmount: number
  exception: 'none' | 'bank_reject' | 'address_mismatch' | 'tax_issue'
  exceptionCleared: boolean
  invoiceReleased: boolean
  locked: boolean
}

function defaultState(): BillingState {
  return {
    accountId: 'ACC-44021',
    customer: 'Nordstadt Logistics GmbH',
    cycle: 'monthly',
    invoiceAmount: 12900,
    exception: 'address_mismatch',
    exceptionCleared: false,
    invoiceReleased: false,
    locked: false
  }
}

export default function DemoPremiumBillingOpsPage() {
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
                <h2 className="page-title">{tr('Premium & Billing Operations', 'Premium- & Billing Operations')}</h2>
                <div className="text-muted">{tr('Click-only · Invoice release & exceptions', 'Click-only · Rechnungsfreigabe & Ausnahmen')}</div>
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
                  <button className="btn btn-primary" onClick={() => nav('/demo-finance/billing/step/intake')}>
                    {tr('Start billing flow', 'Billing-Flow starten')}
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
                      <h3 className="card-title">{tr('5 steps · invoice & exceptions', '5 Schritte · Rechnung & Ausnahmen')}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Account', 'Konto')}</div>
                    <div className="fw-semibold">ACC-44021 · Nordstadt Logistics GmbH</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-finance/billing/step/intake')}>
                        {tr('Start at step 1 (intake)', 'Start bei Schritt 1 (Intake)')}
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/demo')}>
                        {tr('Back to demo overview', 'Zur Demo-Übersicht')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>{tr('Billing Ops – Accountability', 'Billing Ops – Verantwortung')}</h4>
                  <div>{tr('Decides: invoice release + exception handling', 'Entscheidet: Rechnungsfreigabe + Ausnahmebehandlung')}</div>
                  <div>{tr('Accountable: premium capture integrity', 'Verantwortlich: Prämienerfassungs-Integrität')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
