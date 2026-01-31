import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_FIN_ANALYST_STATE'
const KEY_AUDIT = 'DEMO_FIN_ANALYST_AUDIT'

type StepId = 'intake' | 'variance' | 'controls' | 'signoff'

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

export default function DemoFinanceAnalystStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Confirm variance signal', 'Varianzsignal bestätigen') },
    { id: 'variance', title: tr('Variance', 'Varianz'), subtitle: tr('Classify driver', 'Treiber klassifizieren') },
    { id: 'controls', title: tr('Controls', 'Kontrollen'), subtitle: tr('Decide action', 'Maßnahme entscheiden') },
    { id: 'signoff', title: tr('Sign-off', 'Sign-off'), subtitle: tr('Record analyst sign-off', 'Analysten-Sign-off erfassen') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<FinanceAnalystState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/analyst/step/intake" replace />

  const periodLabel = (value: FinanceAnalystState['period']) => (value === 'MTD' ? tr('MTD', 'MTD') : tr('QTD', 'QTD'))
  const signalLabel = (value: FinanceAnalystState['signal']) => {
    switch (value) {
      case 'loss_ratio':
        return tr('Loss ratio', 'Schadenquote')
      case 'expense_ratio':
        return tr('Expense ratio', 'Kostenquote')
      default:
        return tr('Premium leakage', 'Prämien-Leakage')
    }
  }
  const varianceLabel = (value: FinanceAnalystState['varianceLevel']) => {
    switch (value) {
      case 'low':
        return tr('Low', 'Niedrig')
      case 'medium':
        return tr('Medium', 'Mittel')
      default:
        return tr('High', 'Hoch')
    }
  }
  const classificationLabel = (value: FinanceAnalystState['classification']) => {
    switch (value) {
      case 'data_issue':
        return tr('Data issue', 'Datenproblem')
      case 'ops_issue':
        return tr('Ops issue', 'Operations-Problem')
      case 'pricing_issue':
        return tr('Pricing issue', 'Pricing-Problem')
      case 'claims_drift':
        return tr('Claims drift', 'Schaden-Drift')
      default:
        return tr('Pending', 'Offen')
    }
  }

  function setPartial(p: Partial<FinanceAnalystState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const snapshot = [
    { label: `${tr('Period', 'Periode')} ${periodLabel(state.period)}`, ok: true },
    { label: `${tr('Classification', 'Klassifizierung')} ${classificationLabel(state.classification)}`, ok: state.classification !== 'none' },
    { label: state.controlRaised ? tr('Control raised', 'Kontrolle ausgelöst') : tr('No control', 'Keine Kontrolle'), ok: state.controlRaised },
    { label: state.signoff ? tr('Sign-off', 'Sign-off') : tr('Not signed', 'Nicht signiert'), ok: state.signoff }
  ]

  const audit = readAudit(KEY_AUDIT)

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/analyst')}>
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
                    <div className="row g-2">
                      <div className="col-12">
                        <div className="text-muted">{tr('Report', 'Report')}</div>
                        <div className="fw-semibold">{state.reportId} · {periodLabel(state.period)} · {signalLabel(state.signal)}</div>
                      </div>
                      <div className="col-12">
                        <div className="text-muted">{tr('Variance', 'Varianz')}</div>
                        <div className="fw-semibold">{varianceLabel(state.varianceLevel)}</div>
                      </div>
                    </div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI recommendation', 'KI-Empfehlung')}</div>
                            <div className="text-muted">{tr('Variance likely driven by claims severity drift; confirm classification.', 'Varianz vermutlich durch Schaden-Schwere-Drift getrieben; Klassifizierung bestätigen.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Finance intake confirmed', 'Finance-Intake bestätigt'))
                              nav('/demo-finance/analyst/step/variance')
                            }}
                          >
                            {tr('Review variance', 'Varianz prüfen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              const next = state.period === 'MTD' ? 'QTD' : 'MTD'
                              appendAudit(KEY_AUDIT, tr(`Period set to ${next}`, `Periode gesetzt: ${next}`))
                              setPartial({ period: next })
                            }}
                          >
                            {tr('Switch period (MTD/QTD)', 'Periode wechseln (MTD/QTD)')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'variance' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI recommendation', 'KI-Empfehlung')}</div>
                            <div className="text-muted">{tr('Classify as claims drift unless evidence indicates data issue.', 'Als Schaden-Drift klassifizieren, sofern kein Datenproblem vorliegt.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Classify: Claims drift', 'Klassifizieren: Schaden-Drift'), value: 'claims_drift' },
                            { label: tr('Classify: Data issue', 'Klassifizieren: Datenproblem'), value: 'data_issue' },
                            { label: tr('Classify: Pricing issue', 'Klassifizieren: Pricing-Problem'), value: 'pricing_issue' }
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              className="btn btn-primary"
                              onClick={() => {
                                appendAudit(KEY_AUDIT, tr(`Classification set: ${opt.value}`, `Klassifizierung gesetzt: ${classificationLabel(opt.value as FinanceAnalystState['classification'])}`))
                                setPartial({ classification: opt.value as FinanceAnalystState['classification'] })
                                nav('/demo-finance/analyst/step/controls')
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'controls' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI recommendation', 'KI-Empfehlung')}</div>
                            <div className="text-muted">
                              {state.classification === 'claims_drift'
                                ? tr('Raise control: tighten settlement guardrail.', 'Kontrolle auslösen: Settlement-Guardrail verschärfen.')
                                : state.classification === 'data_issue'
                                  ? tr('Raise control: data reconciliation.', 'Kontrolle auslösen: Datenabgleich.')
                                  : tr('Raise control if classification indicates structural driver.', 'Kontrolle auslösen, wenn Strukturtreiber vorliegt.')}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Control action raised (${state.classification})`, `Kontrollmaßnahme ausgelöst (${classificationLabel(state.classification)})`))
                              setPartial({ controlRaised: true })
                              nav('/demo-finance/analyst/step/signoff')
                            }}
                          >
                            {tr('Raise control action', 'Kontrollmaßnahme auslösen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('No control action', 'Keine Kontrollmaßnahme'))
                              setPartial({ controlRaised: false })
                              nav('/demo-finance/analyst/step/signoff')
                            }}
                          >
                            {tr('No control action', 'Keine Kontrollmaßnahme')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'signoff' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                            <div className="text-muted">{tr('Classification', 'Klassifizierung')}: {classificationLabel(state.classification)}</div>
                            <div className="text-muted">{tr('Control', 'Kontrolle')}: {state.controlRaised ? tr('Raised', 'Ausgelöst') : tr('None', 'Keine')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              if (state.classification === 'none') return
                              appendAudit(KEY_AUDIT, tr('Finance analyst sign-off recorded', 'Finance-Analyst Sign-off erfasst'))
                              setPartial({ signoff: true })
                              nav('/demo-finance/analyst')
                            }}
                            disabled={state.classification === 'none'}
                          >
                            {tr('Record analyst sign-off', 'Analysten-Sign-off erfassen')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/analyst')}>
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
                        onClick={() => nav(`/demo-finance/analyst/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'KI & Verantwortung')}</h4>
                  <div>{tr('Decides: variance classification + follow-up route', 'Entscheidet: Varianzklassifizierung + Folgeroute')}</div>
                  <div>{tr('Accountable: signal quality & actionability', 'Verantwortlich: Signalqualität & Handlungsfähigkeit')}</div>

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
