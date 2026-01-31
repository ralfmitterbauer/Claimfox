import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_FIN_CLAIMS_STATE'
const KEY_AUDIT = 'DEMO_FIN_CLAIMS_AUDIT'

type StepId = 'intake' | 'severity' | 'settlement-range' | 'automation' | 'lock'

type ClaimsFinanceState = {
  caseId: string
  claimType: 'liability' | 'collision' | 'cargo'
  grossEstimate: number
  aiRecommendedSettlement: number
  historicalMedian: number
  severitySignal: 'normal' | 'elevated' | 'anomalous'
  approvedRange: 'none' | 'full' | 'reduced' | 'capped'
  automationAllowed: boolean
  escalatedToLegal: boolean
  decisionLocked: boolean
}

function defaultState(): ClaimsFinanceState {
  return {
    caseId: 'CLM-10421',
    claimType: 'liability',
    grossEstimate: 42000,
    aiRecommendedSettlement: 42000,
    historicalMedian: 31500,
    severitySignal: 'elevated',
    approvedRange: 'none',
    automationAllowed: false,
    escalatedToLegal: false,
    decisionLocked: false
  }
}

export default function DemoClaimsFinanceStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Review estimate vs median', 'Schätzung vs. Median prüfen') },
    { id: 'severity', title: tr('Severity', 'Schweregrad'), subtitle: tr('Validate drivers', 'Treiber validieren') },
    { id: 'settlement-range', title: tr('Settlement range', 'Settlement-Range'), subtitle: tr('Approve range', 'Range freigeben') },
    { id: 'automation', title: tr('Automation', 'Automatisierung'), subtitle: tr('Allow or block', 'Erlauben oder blockieren') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock finance decision', 'Finance-Entscheidung sperren') }
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<ClaimsFinanceState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/claims/step/intake" replace />

  const severityLabel = (value: ClaimsFinanceState['severitySignal']) => {
    switch (value) {
      case 'normal':
        return tr('Normal', 'Normal')
      case 'elevated':
        return tr('Elevated', 'Erhöht')
      default:
        return tr('Anomalous', 'Anomal')
    }
  }
  const rangeLabel = (value: ClaimsFinanceState['approvedRange']) => {
    switch (value) {
      case 'full':
        return tr('Full', 'Voll')
      case 'reduced':
        return tr('Reduced', 'Reduziert')
      case 'capped':
        return tr('Capped', 'Gedeckelt')
      default:
        return tr('None', 'Keine')
    }
  }
  const claimTypeLabel = (value: ClaimsFinanceState['claimType']) => {
    switch (value) {
      case 'liability':
        return tr('Liability', 'Haftung')
      case 'collision':
        return tr('Collision', 'Kollision')
      default:
        return tr('Cargo', 'Fracht')
    }
  }

  function setPartial(p: Partial<ClaimsFinanceState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)

  const snapshot = [
    { label: `${tr('Severity', 'Schweregrad')} ${severityLabel(state.severitySignal)}`, ok: state.severitySignal !== 'anomalous' },
    { label: `${tr('Range', 'Range')} ${rangeLabel(state.approvedRange)}`, ok: state.approvedRange !== 'none' },
    { label: state.automationAllowed ? tr('Automation allowed', 'Automatisierung erlaubt') : tr('Manual review', 'Manuelle Prüfung'), ok: state.automationAllowed },
    { label: state.escalatedToLegal ? tr('Escalated', 'Eskaliert') : tr('Not escalated', 'Nicht eskaliert'), ok: state.escalatedToLegal },
    { label: state.decisionLocked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Entsperrt'), ok: state.decisionLocked }
  ]

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/claims')}>
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
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">{state.caseId} · {claimTypeLabel(state.claimType)}</div>
                    <div className="text-muted mt-2">{tr('Estimate vs median', 'Schätzung vs. Median')}</div>
                    <div className="fw-semibold">€ {state.grossEstimate} vs € {state.historicalMedian}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI note', 'KI-Hinweis')}</div>
                            <div className="text-muted">{tr('Recommendation is above median; review severity drivers.', 'Empfehlung liegt über Median; Schweregrad-Treiber prüfen.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Claims finance intake confirmed', 'Claims-Finance Intake bestätigt'))
                            nav('/demo-finance/claims/step/severity')
                          }}>
                            {tr('Review severity', 'Schweregrad prüfen')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Automation allowed (provisional)', 'Automatisierung erlaubt (vorläufig)'))
                            setPartial({ automationAllowed: true })
                          }}>
                            {tr('Allow automation (provisional)', 'Automatisierung erlauben (vorläufig)')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'severity' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI recommendation', 'KI-Empfehlung')}</div>
                            <div className="text-muted">{tr('Severity elevated but explainable; flag anomalous only if evidence weak.', 'Schweregrad erhöht aber erklärbar; anomal nur bei schwacher Evidenz markieren.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Severity accepted', 'Schweregrad akzeptiert'))
                            setPartial({ severitySignal: 'elevated' })
                            nav('/demo-finance/claims/step/settlement-range')
                          }}>
                            {tr('Accept severity', 'Schweregrad akzeptieren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Severity marked anomalous', 'Schweregrad als anomal markiert'))
                            setPartial({ severitySignal: 'anomalous' })
                          }}>
                            {tr('Mark anomalous', 'Als anomal markieren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Escalated to Legal', 'An Legal eskaliert'))
                            setPartial({ escalatedToLegal: true })
                          }}>
                            {tr('Escalate to Legal', 'An Legal eskalieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'settlement-range' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI recommendation', 'KI-Empfehlung')}</div>
                            <div className="text-muted">{tr('Approve reduced range to control tail risk.', 'Reduzierte Range freigeben, um Tail-Risiko zu kontrollieren.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Approve full range', 'Volle Range freigeben'), value: 'full' },
                            { label: tr('Approve reduced range', 'Reduzierte Range freigeben'), value: 'reduced' },
                            { label: tr('Cap settlement', 'Settlement deckeln'), value: 'capped' }
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              className="btn btn-primary"
                              onClick={() => {
                                appendAudit(KEY_AUDIT, tr(`Settlement range approved: ${opt.value}`, `Settlement-Range freigegeben: ${rangeLabel(opt.value as ClaimsFinanceState['approvedRange'])}`))
                                setPartial({ approvedRange: opt.value as ClaimsFinanceState['approvedRange'] })
                                nav('/demo-finance/claims/step/automation')
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'automation' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('AI recommendation', 'KI-Empfehlung')}</div>
                            <div className="text-muted">{tr('Allow automation only if range approved and not anomalous.', 'Automatisierung nur erlauben, wenn Range freigegeben und nicht anomal.')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Automation allowed', 'Automatisierung erlaubt'))
                              setPartial({ automationAllowed: true })
                              nav('/demo-finance/claims/step/lock')
                            }}
                            disabled={state.approvedRange === 'none' || state.severitySignal === 'anomalous'}
                          >
                            {tr('Allow automated settlement', 'Automatisierte Abwicklung erlauben')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(KEY_AUDIT, tr('Manual review required', 'Manuelle Prüfung erforderlich'))
                              setPartial({ automationAllowed: false })
                              nav('/demo-finance/claims/step/lock')
                            }}
                          >
                            {tr('Require manual review', 'Manuelle Prüfung erforderlich')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3">
                          <div className="card-body">
                            <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                            <div className="text-muted">{tr('Severity', 'Schweregrad')}: {severityLabel(state.severitySignal)}</div>
                            <div className="text-muted">{tr('Range', 'Range')}: {rangeLabel(state.approvedRange)}</div>
                            <div className="text-muted">{tr('Automation', 'Automatisierung')}: {state.automationAllowed ? tr('Allowed', 'Erlaubt') : tr('Manual', 'Manuell')}</div>
                          </div>
                        </div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Claims finance decision locked', 'Claims-Finance Entscheidung gesperrt'))
                            setPartial({ decisionLocked: true })
                            nav('/demo-finance/claims')
                          }}>
                            {tr('Lock finance decision', 'Finance-Entscheidung sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/claims')}>
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
                        onClick={() => nav(`/demo-finance/claims/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'KI & Verantwortung')}</h4>
                  <div>{tr('Decides: settlement range + automation gate', 'Entscheidet: Settlement-Range + Automations-Gate')}</div>
                  <div>{tr('Accountable: claims ratio & leakage', 'Verantwortlich: Schadenquote & Leakage')}</div>

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
