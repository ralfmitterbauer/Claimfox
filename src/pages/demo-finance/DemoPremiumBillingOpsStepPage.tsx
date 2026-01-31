import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_FIN_BILLING_STATE'
const KEY_AUDIT = 'DEMO_FIN_BILLING_AUDIT'

type StepId = 'intake' | 'invoice' | 'exceptions' | 'reconcile' | 'lock'

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

export default function DemoPremiumBillingOpsStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Confirm billing cycle', 'Billing-Zyklus bestätigen') },
    { id: 'invoice', title: tr('Invoice', 'Rechnung'), subtitle: tr('Release or hold', 'Freigeben oder halten') },
    { id: 'exceptions', title: tr('Exceptions', 'Ausnahmen'), subtitle: tr('Resolve exception', 'Ausnahme klären') },
    { id: 'reconcile', title: tr('Reconcile', 'Abgleich'), subtitle: tr('Confirm checks', 'Prüfungen bestätigen') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock billing decision', 'Billing-Entscheidung sperren') }
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<BillingState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/billing/step/intake" replace />

  function money(amount: number) {
    return new Intl.NumberFormat(isEn ? 'en-US' : 'de-DE', { style: 'currency', currency: 'EUR' }).format(amount)
  }

  const exceptionLabel = (value: BillingState['exception']) => {
    switch (value) {
      case 'bank_reject':
        return tr('bank reject', 'Bankablehnung')
      case 'address_mismatch':
        return tr('address mismatch', 'Adressabweichung')
      case 'tax_issue':
        return tr('tax issue', 'Steuerproblem')
      default:
        return tr('none', 'keine')
    }
  }

  function setPartial(p: Partial<BillingState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)

  const snapshot = [
    { label: `${tr('Exception', 'Ausnahme')} ${exceptionLabel(state.exception)}`, ok: state.exception === 'none' },
    { label: state.invoiceReleased ? tr('Invoice released', 'Rechnung freigegeben') : tr('Held', 'Gehalten'), ok: state.invoiceReleased },
    { label: state.locked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Entsperrt'), ok: state.locked }
  ]

  const amount = state.cycle === 'annual' ? state.invoiceAmount * 12 : state.invoiceAmount

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('FINANCE DEMO', 'FINANCE-DEMO')}</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/billing')}>
                    {tr('Restart', 'Neu starten')}
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
                      <div className="text-muted">{tr('Step', 'Schritt')} {STEPS_LOCAL.findIndex((s) => s.id === stepId) + 1}/{STEPS_LOCAL.length}</div>
                      <h3 className="card-title mb-0">{current.title}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Account', 'Konto')}</div>
                    <div className="fw-semibold">{state.accountId} · {state.customer}</div>
                    <div className="text-muted mt-2">{tr('Cycle', 'Zyklus')}</div>
                    <div className="fw-semibold">{state.cycle === 'monthly' ? tr('Monthly', 'Monatlich') : tr('Annual', 'Jährlich')}</div>
                    <div className="text-muted mt-2">{tr('Invoice amount', 'Rechnungsbetrag')}</div>
                    <div className="fw-semibold">{money(amount)}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI note', 'KI-Hinweis')}</div>
                            <div className="text-muted">{tr('Potential exception detected: address_mismatch.', 'Mögliche Ausnahme erkannt: Adressabweichung.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Billing intake confirmed', 'Billing-Intake bestätigt'))
                              nav('/demo-finance/billing/step/invoice')
                            }}
                          >
                            {tr('Review invoice', 'Rechnung prüfen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              const next = state.cycle === 'monthly' ? 'annual' : 'monthly'
                              appendAudit(KEY_AUDIT, tr(`Cycle set to ${next}`, `Zyklus gesetzt: ${next === 'annual' ? 'jährlich' : 'monatlich'}`))
                              setPartial({ cycle: next })
                            }}
                          >
                            {tr('Set cycle: Annual', 'Zyklus setzen: Jährlich')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'invoice' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI recommendation', 'KI-Empfehlung')}</div>
                            <div className="text-muted">{tr('Hold release if exception present.', 'Freigabe halten, wenn Ausnahme vorhanden ist.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Invoice released (override)', 'Rechnung freigegeben (Override)'))
                              setPartial({ invoiceReleased: true })
                              nav('/demo-finance/billing/step/exceptions')
                            }}
                          >
                            {tr('Release invoice', 'Rechnung freigeben')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Invoice held pending exception', 'Rechnung gehalten (Ausnahme offen)'))
                              setPartial({ invoiceReleased: false })
                              nav('/demo-finance/billing/step/exceptions')
                            }}
                          >
                            {tr('Hold invoice', 'Rechnung halten')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'exceptions' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('Exception status', 'Ausnahmestatus')}</div>
                            <div className="text-muted">{exceptionLabel(state.exception)}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Exception cleared (address updated)', 'Ausnahme behoben (Adresse aktualisiert)'))
                              setPartial({ exception: 'none', exceptionCleared: true })
                              nav('/demo-finance/billing/step/reconcile')
                            }}
                          >
                            {tr('Clear exception', 'Ausnahme beheben')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Exception escalated to billing lead', 'Ausnahme an Billing Lead eskaliert'))
                              nav('/demo-finance/billing/step/reconcile')
                            }}
                          >
                            {tr('Escalate to billing lead', 'An Billing Lead eskalieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'reconcile' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI note', 'KI-Hinweis')}</div>
                            <div className="text-muted">{tr('Reconciliation complete; safe to release if held.', 'Abgleich vollständig; Freigabe möglich, falls gehalten.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Reconciliation confirmed', 'Abgleich bestätigt'))
                              nav('/demo-finance/billing/step/lock')
                            }}
                          >
                            {tr('Confirm reconciliation', 'Abgleich bestätigen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Exception reopened', 'Ausnahme wieder geöffnet'))
                              setPartial({ exception: 'address_mismatch', exceptionCleared: false })
                            }}
                          >
                            {tr('Re-open exception', 'Ausnahme erneut öffnen')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                            <div className="text-muted">{tr('Exception', 'Ausnahme')}: {exceptionLabel(state.exception)}</div>
                            <div className="text-muted">{tr('Invoice released', 'Rechnung freigegeben')}: {state.invoiceReleased ? tr('Yes', 'Ja') : tr('No', 'Nein')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Billing decision locked', 'Billing-Entscheidung gesperrt'))
                              setPartial({ locked: true })
                              nav('/demo-finance/billing')
                            }}
                          >
                            {tr('Lock billing decision', 'Billing-Entscheidung sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/billing')}>
                            {tr('Restart demo', 'Demo neu starten')}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>{tr('Step navigation', 'Schritt-Navigation')}</h4>
                  <div className="list-group">
                    {STEPS_LOCAL.map((s) => (
                      <button
                        key={s.id}
                        className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`}
                        onClick={() => nav(`/demo-finance/billing/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'KI & Verantwortung')}</h4>
                  <div>{tr('Decides: invoice release + exception handling path', 'Entscheidet: Rechnungsfreigabe + Ausnahmebehandlung')}</div>
                  <div>{tr('Accountable: premium capture & billing integrity', 'Verantwortlich: Prämienerfassung & Billing-Integrität')}</div>

                  <hr />
                  <h4>{tr('Snapshot', 'Snapshot')}</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {snapshot.map((s) => (
                      <span key={s.label} className={`badge ${s.ok ? 'bg-green-lt' : 'bg-secondary-lt'}`}>
                        {s.label}
                      </span>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('Audit log', 'Audit-Log')}</h4>
                  <div className="admin-audit">
                    {audit.length === 0 && <div className="text-muted">{tr('No entries yet.', 'Noch keine Einträge.')}</div>}
                    {audit.slice(0, 8).map((a) => (
                      <div key={`${a.ts}-${a.message}`} className="admin-audit-item">
                        <div className="ts">{a.ts}</div>
                        <div className="msg">{a.message}</div>
                      </div>
                    ))}
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
