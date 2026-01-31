import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_claimsStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_CLAIMS_HANDLER_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_HANDLER_AUDIT'

type StepId = 'intake' | 'coverage-check' | 'evidence' | 'decision' | 'next-actions'

type ClaimsHandlerState = {
  caseId: string
  insured: string
  policyNumber: string
  product: string
  reportedAmount: number
  coverageSignal: 'clear' | 'ambiguous' | 'excluded'
  evidencePack: 'missing' | 'partial' | 'complete'
  decision: 'pending' | 'pay' | 'deny' | 'refer'
  nextAction: 'none' | 'request_docs' | 'appoint_expert' | 'payment_release' | 'refer_legal'
  decisionReady: boolean
}

const STEPS: StepId[] = ['intake', 'coverage-check', 'evidence', 'decision', 'next-actions']

function defaultState(): ClaimsHandlerState {
  return {
    caseId: 'CLM-10421',
    insured: 'Nordstadt Logistics GmbH',
    policyNumber: 'PL-204889',
    product: 'Carrier Liability + Fleet',
    reportedAmount: 42000,
    coverageSignal: 'ambiguous',
    evidencePack: 'partial',
    decision: 'pending',
    nextAction: 'none',
    decisionReady: false
  }
}

function readyForDecision(state: ClaimsHandlerState) {
  if (state.decision === 'pay' && state.coverageSignal === 'clear' && state.evidencePack === 'complete') return true
  if (state.decision === 'deny' && state.coverageSignal === 'excluded') return true
  if (state.decision === 'refer' && state.coverageSignal !== 'clear') return true
  return false
}

export default function DemoClaimsHandlerStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Start coverage check', 'Deckungsprüfung starten') },
    { id: 'coverage-check', title: tr('Coverage', 'Deckung'), subtitle: tr('Set coverage signal', 'Deckungssignal setzen') },
    { id: 'evidence', title: tr('Evidence', 'Evidenz'), subtitle: tr('Validate evidence pack', 'Evidenzpaket prüfen') },
    { id: 'decision', title: tr('Decision', 'Entscheidung'), subtitle: tr('Pay, deny, or refer', 'Zahlen, ablehnen oder verweisen') },
    { id: 'next-actions', title: tr('Next actions', 'Nächste Schritte'), subtitle: tr('Execute follow-up', 'Follow-up ausführen') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<ClaimsHandlerState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-claims/handler/step/intake" replace />

  function setPartial(p: Partial<ClaimsHandlerState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const coverageLabel = (value: ClaimsHandlerState['coverageSignal']) => {
    if (value === 'clear') return tr('Clear', 'Klar')
    if (value === 'excluded') return tr('Excluded', 'Ausgeschlossen')
    return tr('Ambiguous', 'Unklar')
  }
  const evidenceLabel = (value: ClaimsHandlerState['evidencePack']) => {
    if (value === 'complete') return tr('Complete', 'Vollständig')
    if (value === 'missing') return tr('Missing', 'Fehlend')
    return tr('Partial', 'Teilweise')
  }
  const decisionLabel = (value: ClaimsHandlerState['decision']) => {
    if (value === 'pay') return tr('Pay', 'Zahlen')
    if (value === 'deny') return tr('Deny', 'Ablehnen')
    if (value === 'refer') return tr('Refer', 'Verweisen')
    return tr('Pending', 'Ausstehend')
  }
  const nextActionLabel = (value: ClaimsHandlerState['nextAction']) => {
    if (value === 'request_docs') return tr('Request docs', 'Unterlagen anfordern')
    if (value === 'appoint_expert') return tr('Appoint expert', 'Gutachter beauftragen')
    if (value === 'payment_release') return tr('Release payment', 'Zahlung freigeben')
    if (value === 'refer_legal') return tr('Refer to Legal', 'An Legal verweisen')
    return tr('None', 'Keine')
  }
  const snapshot = [
    { label: `${tr('Coverage', 'Deckung')} ${coverageLabel(state.coverageSignal)}`, ok: state.coverageSignal === 'clear' },
    { label: `${tr('Evidence', 'Evidenz')} ${evidenceLabel(state.evidencePack)}`, ok: state.evidencePack === 'complete' },
    { label: `${tr('Decision', 'Entscheidung')} ${decisionLabel(state.decision)}`, ok: state.decision !== 'pending' },
    { label: `${tr('Next', 'Nächste')} ${nextActionLabel(state.nextAction)}`, ok: state.nextAction !== 'none' },
    { label: state.decisionReady ? tr('Ready', 'Bereit') : tr('Not ready', 'Nicht bereit'), ok: state.decisionReady }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('CLAIMS DEMO', 'SCHADEN DEMO')}</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/handler')}>
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
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">{state.caseId} · {state.policyNumber}</div>
                    <div className="text-muted mt-2">{tr('Reported amount', 'Gemeldeter Betrag')}</div>
                    <div className="fw-semibold">€ {state.reportedAmount}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Coverage ambiguous pending clause confirmation; ensure evidence pack completeness.', 'Deckung unklar bis Klausel bestätigt; Evidenzpaket vollständig machen.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Handler intake confirmed', 'Sachbearbeiter Intake bestätigt'))
                            nav('/demo-claims/handler/step/coverage-check')
                          }}>{tr('Begin coverage check', 'Deckungsprüfung starten')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'coverage-check' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Set coverage signal to ambiguous unless exclusion clearly applies.', 'Deckung als unklar markieren, außer Ausschluss greift klar.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Coverage: Clear', 'Deckung: Klar'), value: 'clear' },
                            { label: tr('Coverage: Ambiguous', 'Deckung: Unklar'), value: 'ambiguous' },
                            { label: tr('Coverage: Excluded', 'Deckung: Ausgeschlossen'), value: 'excluded' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Coverage signal set: ${opt.value}`, `Deckungssignal gesetzt: ${opt.value}`))
                              setPartial({ coverageSignal: opt.value as ClaimsHandlerState['coverageSignal'] })
                              nav('/demo-claims/handler/step/evidence')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'evidence' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Mark pack complete only if invoice received; else request docs.', 'Paket nur vollständig wenn Rechnung vorhanden; sonst Unterlagen anfordern.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Evidence pack confirmed complete', 'Evidenzpaket als vollständig bestätigt'))
                            setPartial({ evidencePack: 'complete' })
                            nav('/demo-claims/handler/step/decision')
                          }}>{tr('Evidence pack: Complete', 'Evidenzpaket: Vollständig')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Evidence pack marked partial', 'Evidenzpaket als teilweise markiert'))
                            setPartial({ evidencePack: 'partial' })
                            nav('/demo-claims/handler/step/decision')
                          }}>{tr('Evidence pack: Partial', 'Evidenzpaket: Teilweise')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Missing docs requested', 'Fehlende Unterlagen angefordert'))
                            setPartial({ nextAction: 'request_docs', evidencePack: 'partial' })
                          }}>{tr('Request missing docs', 'Fehlende Unterlagen anfordern')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'decision' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Decision guardrails depend on coverage + evidence status.', 'Guardrails hängen von Deckung + Evidenz ab.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Decision: Pay', 'Entscheidung: Zahlen'), value: 'pay' },
                            { label: tr('Decision: Refer', 'Entscheidung: Verweisen'), value: 'refer' },
                            { label: tr('Decision: Deny', 'Entscheidung: Ablehnen'), value: 'deny' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Handler decision set: ${opt.value}`, `Sachbearbeiter-Entscheidung gesetzt: ${opt.value}`))
                              const next = { ...state, decision: opt.value as ClaimsHandlerState['decision'] }
                              const ready = readyForDecision(next)
                              setPartial({ decision: opt.value as ClaimsHandlerState['decision'], decisionReady: ready })
                              nav('/demo-claims/handler/step/next-actions')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'next-actions' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Proceed only if decision prerequisites are met.', 'Nur fortfahren, wenn Voraussetzungen erfüllt sind.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Payment release initiated', 'Zahlungsfreigabe gestartet'))
                            setPartial({ nextAction: 'payment_release' })
                          }} disabled={!(state.decision === 'pay' && state.decisionReady)}>
                            {tr('Next: Release payment', 'Nächster Schritt: Zahlung freigeben')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Referred to Legal', 'An Legal verwiesen'))
                            setPartial({ nextAction: 'refer_legal' })
                          }} disabled={state.decision !== 'refer'}>
                            {tr('Next: Refer to Legal', 'Nächster Schritt: An Legal verweisen')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Denial notice triggered', 'Ablehnungsschreiben ausgelöst'))
                            setPartial({ nextAction: 'refer_legal' })
                          }} disabled={!(state.decision === 'deny' && state.decisionReady)}>
                            {tr('Next: Send denial notice', 'Nächster Schritt: Ablehnung versenden')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/handler')}>
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
                        onClick={() => nav(`/demo-claims/handler/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: coverage position + evidence checks', 'Entscheidet: Deckung + Evidenzprüfung')}</div>
                  <div>{tr('Accountable: SLA & communication discipline', 'Verantwortlich: SLA & Kommunikationsdisziplin')}</div>

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
