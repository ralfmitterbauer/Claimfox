import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_FIN_CFO_STATE'
const KEY_AUDIT = 'DEMO_FIN_CFO_AUDIT'

type StepId = 'intake' | 'exposure' | 'decision' | 'governance' | 'lock'

type CfoState = {
  decisionId: string
  topic: 'automation_guardrail' | 'claims_tail_risk' | 'reins_exposure'
  capitalImpact: 'low' | 'medium' | 'high'
  allowed: boolean
  governanceEscalated: boolean
  decisionLocked: boolean
}

const STEPS: StepId[] = ['intake', 'exposure', 'decision', 'governance', 'lock']

function defaultState(): CfoState {
  return {
    decisionId: 'CFO-DEC-0091',
    topic: 'claims_tail_risk',
    capitalImpact: 'medium',
    allowed: false,
    governanceEscalated: false,
    decisionLocked: false
  }
}

export default function DemoCfoFinanceAuthorityStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Review finance gate', 'Finanz-Gate prüfen') },
    { id: 'exposure', title: tr('Exposure', 'Exposure'), subtitle: tr('Set capital impact', 'Kapitalwirkung setzen') },
    { id: 'decision', title: tr('Decision', 'Entscheidung'), subtitle: tr('Allow or restrict', 'Erlauben oder begrenzen') },
    { id: 'governance', title: tr('Governance', 'Governance'), subtitle: tr('Escalation path', 'Eskalationspfad') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock CFO decision', 'CFO-Entscheidung sperren') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<CfoState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/cfo/step/intake" replace />

  function setPartial(p: Partial<CfoState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const topicLabel = (topic: CfoState['topic']) => {
    if (topic === 'automation_guardrail') return tr('Automation guardrail', 'Automation-Guardrail')
    if (topic === 'reins_exposure') return tr('Reinsurance exposure', 'Rückversicherungs-Exposure')
    return tr('Claims tail risk', 'Claims Tail Risk')
  }
  const impactLabel = (lvl: CfoState['capitalImpact']) =>
    lvl === 'low' ? tr('Low', 'Niedrig') : lvl === 'medium' ? tr('Medium', 'Mittel') : tr('High', 'Hoch')

  const snapshot = [
    { label: `${tr('Topic', 'Thema')} ${topicLabel(state.topic)}`, ok: true },
    { label: `${tr('Impact', 'Kapitalwirkung')} ${impactLabel(state.capitalImpact)}`, ok: state.capitalImpact !== 'high' },
    { label: state.allowed ? tr('Allowed', 'Erlaubt') : tr('Restricted', 'Eingeschränkt'), ok: state.allowed },
    { label: state.governanceEscalated ? tr('Escalated', 'Eskaliert') : tr('No escalation', 'Keine Eskalation'), ok: state.governanceEscalated },
    { label: state.decisionLocked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Nicht gesperrt'), ok: state.decisionLocked }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('FINANCE DEMO', 'FINANZ DEMO')}</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/cfo')}>
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
                      <div className="text-muted">{tr('Step', 'Schritt')} {STEPS.findIndex((s) => s === stepId) + 1}/{STEPS.length}</div>
                      <h3 className="card-title mb-0">{current.title}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Decision ID', 'Entscheidungs-ID')}</div>
                    <div className="fw-semibold">{state.decisionId}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Decision requested due to elevated tail risk signal.', 'Entscheidung wegen erhöhtem Tail-Risk angefordert.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('CFO intake confirmed', 'CFO Intake bestätigt'))
                            nav('/demo-finance/cfo/step/exposure')
                          }}>{tr('Review exposure', 'Exposure prüfen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'exposure' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Capital impact medium; tighten guardrail instead of full stop.', 'Kapitalwirkung mittel; Guardrail schärfen statt Full Stop.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {['low', 'medium', 'high'].map((lvl) => (
                            <button key={lvl} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Capital impact set: ${lvl}`, `Kapitalwirkung gesetzt: ${lvl}`))
                              setPartial({ capitalImpact: lvl as CfoState['capitalImpact'] })
                              nav('/demo-finance/cfo/step/decision')
                            }}>
                              {tr('Set capital impact', 'Kapitalwirkung setzen')}: {impactLabel(lvl as CfoState['capitalImpact'])}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'decision' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">
                            {state.capitalImpact === 'high'
                              ? tr('Restrict automation; require manual for tail claims.', 'Automation einschränken; manuell für Tail Claims.')
                              : tr('Allow with monitoring and guardrails.', 'Erlauben mit Monitoring und Guardrails.')}
                          </div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Decision: allow', 'Entscheidung: erlauben'))
                            setPartial({ allowed: true })
                            nav('/demo-finance/cfo/step/governance')
                          }}>{tr('Allow', 'Erlauben')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Decision: restrict', 'Entscheidung: begrenzen'))
                            setPartial({ allowed: false })
                            nav('/demo-finance/cfo/step/governance')
                          }}>{tr('Restrict', 'Begrenzen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Decision: stop automation', 'Entscheidung: Automation stoppen'))
                            setPartial({ allowed: false })
                            nav('/demo-finance/cfo/step/governance')
                          }}>{tr('Stop automation', 'Automation stoppen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'governance' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Record rationale for regulator & board traceability.', 'Rationale für Regulator & Board dokumentieren.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Escalated to governance committee', 'An Governance-Kommittee eskaliert'))
                            setPartial({ governanceEscalated: true })
                            nav('/demo-finance/cfo/step/lock')
                          }}>{tr('Escalate to governance committee', 'An Governance-Kommittee eskalieren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('No escalation required', 'Keine Eskalation erforderlich'))
                            setPartial({ governanceEscalated: false })
                            nav('/demo-finance/cfo/step/lock')
                          }}>{tr('No escalation', 'Keine Eskalation')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                          <div className="text-muted">{tr('Impact', 'Kapitalwirkung')}: {impactLabel(state.capitalImpact)}</div>
                          <div className="text-muted">{tr('Decision', 'Entscheidung')}: {state.allowed ? tr('Allowed', 'Erlaubt') : tr('Restricted', 'Eingeschränkt')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('CFO finance decision locked', 'CFO Finanz-Entscheidung gesperrt'))
                            setPartial({ decisionLocked: true })
                            nav('/demo-finance/cfo')
                          }}>{tr('Lock CFO decision', 'CFO-Entscheidung sperren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/cfo')}>
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
                  <h4>{tr('Step navigation', 'Schritt Navigation')}</h4>
                  <div className="list-group">
                    {STEPS_LOCAL.map((s) => (
                      <button
                        key={s.id}
                        className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`}
                        onClick={() => nav(`/demo-finance/cfo/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: finance gate for exceptions', 'Entscheidet: Finanz-Gate für Ausnahmen')}</div>
                  <div>{tr('Accountable: capital impact & governance', 'Verantwortlich: Kapitalwirkung & Governance')}</div>

                  <hr />
                  <h4>{tr('Snapshot', 'Status')}</h4>
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
