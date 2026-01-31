import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_FIN_REINS_STATE'
const KEY_AUDIT = 'DEMO_FIN_REINS_AUDIT'

type StepId = 'intake' | 'attach' | 'recoverable' | 'notice' | 'lock'

type ReinsState = {
  caseId: string
  treaty: string
  retention: number
  grossLoss: number
  attaches: boolean
  recoverable: number
  noticeSent: boolean
  booked: boolean
  locked: boolean
}

const STEPS: StepId[] = ['intake', 'attach', 'recoverable', 'notice', 'lock']

function defaultState(): ReinsState {
  return {
    caseId: 'CLM-10421',
    treaty: 'QS-2025-ALPHA',
    retention: 25000,
    grossLoss: 42000,
    attaches: false,
    recoverable: 0,
    noticeSent: false,
    booked: false,
    locked: false
  }
}

export default function DemoReinsuranceFinanceStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Check attachment', 'Attachment prüfen') },
    { id: 'attach', title: tr('Attachment', 'Attachment'), subtitle: tr('Confirm attaches', 'Greifen bestätigen') },
    { id: 'recoverable', title: tr('Recoverable', 'Recoverable'), subtitle: tr('Calculate recoverable', 'Recoverable berechnen') },
    { id: 'notice', title: tr('Notice', 'Meldung'), subtitle: tr('Send treaty notice', 'Vertragsmeldung senden') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Book recoverable', 'Recoverable buchen') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<ReinsState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/reinsurance/step/intake" replace />

  function setPartial(p: Partial<ReinsState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)

  const snapshot = [
    { label: state.attaches ? tr('Attachment: yes', 'Attachment: ja') : tr('Attachment: no', 'Attachment: nein'), ok: state.attaches },
    { label: `${tr('Recoverable', 'Recoverable')} ${state.recoverable}`, ok: state.recoverable > 0 },
    { label: state.noticeSent ? tr('Notice sent', 'Meldung gesendet') : tr('No notice', 'Keine Meldung'), ok: state.noticeSent },
    { label: state.booked ? tr('Booked', 'Gebucht') : tr('Not booked', 'Nicht gebucht'), ok: state.booked },
    { label: state.locked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Nicht gesperrt'), ok: state.locked }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/reinsurance')}>
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
                    <div className="text-muted">{tr('Treaty', 'Vertrag')}</div>
                    <div className="fw-semibold">{state.treaty}</div>
                    <div className="text-muted mt-2">{tr('Retention vs gross', 'Retention vs. Brutto')}</div>
                    <div className="fw-semibold">€ {state.retention} vs € {state.grossLoss}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Loss may attach above retention; validate treaty and aggregation.', 'Schaden kann über Retention attachen; Vertrag und Aggregation prüfen.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Attachment check started', 'Attachment-Prüfung gestartet'))
                            nav('/demo-finance/reinsurance/step/attach')
                          }}>{tr('Check attachment', 'Attachment prüfen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'attach' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Attaches when gross exceeds retention.', 'Greift, wenn Brutto die Retention übersteigt.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Attachment confirmed', 'Attachment bestätigt'))
                            setPartial({ attaches: true })
                            nav('/demo-finance/reinsurance/step/recoverable')
                          }}>{tr('Confirm attaches', 'Greifen bestätigen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('No attachment', 'Kein Attachment'))
                            setPartial({ attaches: false })
                          }}>{tr('Does not attach', 'Greift nicht')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'recoverable' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Recoverable equals gross minus retention (simplified).', 'Recoverable = Brutto minus Retention (vereinfacht).')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            const rec = Math.max(0, state.grossLoss - state.retention)
                            appendAudit(KEY_AUDIT, tr(`Recoverable calculated: €${rec}`, `Recoverable berechnet: €${rec}`))
                            setPartial({ recoverable: rec })
                            nav('/demo-finance/reinsurance/step/notice')
                          }}>{tr('Calculate recoverable', 'Recoverable berechnen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Recoverable pending documentation', 'Recoverable ausstehend (Doku)'))
                          }}>{tr('Mark pending documentation', 'Als ausstehend markieren')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'notice' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Send notice if attaches or near threshold.', 'Meldung senden, wenn Attachment greift oder nahe Schwelle.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Treaty notice sent', 'Vertragsmeldung gesendet'))
                            setPartial({ noticeSent: true })
                            nav('/demo-finance/reinsurance/step/lock')
                          }}>{tr('Send treaty notice', 'Vertragsmeldung senden')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Notice deferred', 'Meldung verschoben'))
                            nav('/demo-finance/reinsurance/step/lock')
                          }}>{tr('Defer notice', 'Meldung verschieben')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                          <div className="text-muted">{tr('Recoverable', 'Recoverable')}: € {state.recoverable}</div>
                          <div className="text-muted">{tr('Notice', 'Meldung')}: {state.noticeSent ? tr('Sent', 'Gesendet') : tr('Not sent', 'Nicht gesendet')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Recoverable booked', 'Recoverable gebucht'))
                            setPartial({ booked: true, locked: true })
                            nav('/demo-finance/reinsurance')
                          }} disabled={!state.attaches || state.recoverable <= 0 || !state.noticeSent}>
                            {tr('Book recoverable', 'Recoverable buchen')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/reinsurance')}>
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
                        onClick={() => nav(`/demo-finance/reinsurance/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: attachment + notice + recoverable', 'Entscheidet: Attachment + Meldung + Recoverable')}</div>
                  <div>{tr('Accountable: treaty compliance', 'Verantwortlich: Vertragstreue')}</div>

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
