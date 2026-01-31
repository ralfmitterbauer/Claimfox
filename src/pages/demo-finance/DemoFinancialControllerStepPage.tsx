import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_financeStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_FIN_CONTROLLER_STATE'
const KEY_AUDIT = 'DEMO_FIN_CONTROLLER_AUDIT'

type StepId = 'intake' | 'accrual' | 'reserving' | 'close' | 'lock'

type ControllerState = {
  closeId: string
  accrualMode: 'conservative' | 'standard'
  claimsAccrual: 'none' | 'booked'
  reserveReviewed: boolean
  closeReady: boolean
  locked: boolean
}

const STEPS: StepId[] = ['intake', 'accrual', 'reserving', 'close', 'lock']

function defaultState(): ControllerState {
  return {
    closeId: 'CLOSE-2025-01',
    accrualMode: 'conservative',
    claimsAccrual: 'none',
    reserveReviewed: false,
    closeReady: false,
    locked: false
  }
}

export default function DemoFinancialControllerStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Review accrual posture', 'Abgrenzung prüfen') },
    { id: 'accrual', title: tr('Accrual', 'Abgrenzung'), subtitle: tr('Book or hold', 'Buchen oder halten') },
    { id: 'reserving', title: tr('Reserving', 'Reservierung'), subtitle: tr('Confirm review', 'Review bestätigen') },
    { id: 'close', title: tr('Close', 'Close'), subtitle: tr('Mark readiness', 'Bereitschaft markieren') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock controller sign-off', 'Sign-off sperren') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<ControllerState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-finance/controller/step/intake" replace />

  function setPartial(p: Partial<ControllerState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const modeLabel = (mode: ControllerState['accrualMode']) =>
    mode === 'conservative' ? tr('Conservative', 'Konservativ') : tr('Standard', 'Standard')
  const accrualLabel = (status: ControllerState['claimsAccrual']) =>
    status === 'booked' ? tr('Booked', 'Gebucht') : tr('None', 'Keine')
  const snapshot = [
    { label: `${tr('Mode', 'Modus')} ${modeLabel(state.accrualMode)}`, ok: true },
    { label: state.claimsAccrual === 'booked' ? tr('Accrual booked', 'Abgrenzung gebucht') : tr('No accrual', 'Keine Abgrenzung'), ok: state.claimsAccrual === 'booked' },
    { label: state.reserveReviewed ? tr('Reserve reviewed', 'Reserve geprüft') : tr('Reserve not reviewed', 'Reserve nicht geprüft'), ok: state.reserveReviewed },
    { label: state.closeReady ? tr('Close ready', 'Close bereit') : tr('Close hold', 'Close halten'), ok: state.closeReady },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/controller')}>
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
                    <div className="text-muted">{tr('Close ID', 'Close ID')}</div>
                    <div className="fw-semibold">{state.closeId}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Claims volatility suggests conservative accrual.', 'Schwankungen sprechen für konservative Abgrenzung.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Accrual review started', 'Abgrenzung geprüft'))
                            nav('/demo-finance/controller/step/accrual')
                          }}>{tr('Review accrual', 'Abgrenzung prüfen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            const next = state.accrualMode === 'conservative' ? 'standard' : 'conservative'
                            appendAudit(KEY_AUDIT, tr(`Accrual mode set: ${next}`, `Abgrenzungsmodus gesetzt: ${next}`))
                            setPartial({ accrualMode: next })
                          }}>{tr('Set mode: Conservative/Standard', 'Modus: Konservativ/Standard')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'accrual' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Book accrual if exposure uncertain.', 'Abgrenzung buchen, wenn Exposure unsicher ist.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Accrual booked', 'Abgrenzung gebucht'))
                            setPartial({ claimsAccrual: 'booked' })
                            nav('/demo-finance/controller/step/reserving')
                          }}>{tr('Book accrual', 'Abgrenzung buchen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('No accrual', 'Keine Abgrenzung'))
                            setPartial({ claimsAccrual: 'none' })
                            nav('/demo-finance/controller/step/reserving')
                          }}>{tr('No accrual', 'Keine Abgrenzung')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'reserving' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Reserve review improves defensibility.', 'Reserveprüfung erhöht die Nachvollziehbarkeit.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Reserve reviewed', 'Reserve geprüft'))
                            setPartial({ reserveReviewed: true })
                            nav('/demo-finance/controller/step/close')
                          }}>{tr('Confirm reserve reviewed', 'Reserveprüfung bestätigen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Escalated to actuarial', 'An Aktuariat eskaliert'))
                          }}>{tr('Escalate to actuarial', 'An Aktuariat eskalieren')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Close is ready if reserve reviewed.', 'Close ist bereit, wenn Reserve geprüft ist.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Close marked ready', 'Close als bereit markiert'))
                            setPartial({ closeReady: true })
                            nav('/demo-finance/controller/step/lock')
                          }} disabled={!state.reserveReviewed}>
                            {tr('Mark close ready', 'Close als bereit markieren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Close held', 'Close gehalten'))
                            setPartial({ closeReady: false })
                          }}>{tr('Hold close', 'Close halten')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                          <div className="text-muted">{tr('Accrual', 'Abgrenzung')}: {accrualLabel(state.claimsAccrual)}</div>
                          <div className="text-muted">{tr('Reserve reviewed', 'Reserve geprüft')}: {state.reserveReviewed ? tr('Yes', 'Ja') : tr('No', 'Nein')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Controller sign-off locked', 'Controller Sign-off gesperrt'))
                            setPartial({ locked: true })
                            nav('/demo-finance/controller')
                          }} disabled={!state.closeReady}>
                            {tr('Lock controller sign-off', 'Controller Sign-off sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-finance/controller')}>
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
                        onClick={() => nav(`/demo-finance/controller/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: accrual posture + close readiness', 'Entscheidet: Abgrenzung + Close-Readiness')}</div>
                  <div>{tr('Accountable: control environment', 'Verantwortlich: Kontrollumfeld')}</div>

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
