import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_claimsStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_CLAIMS_MANAGER_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_MANAGER_AUDIT'

type StepId = 'intake' | 'triage' | 'authority' | 'plan' | 'lock'

type ClaimsManagerState = {
  caseId: string
  insured: string
  product: string
  reportedAmount: number
  severity: 'low' | 'medium' | 'high'
  triageRoute: 'fast_track' | 'standard' | 'complex' | 'siu' | 'none'
  authorityLevel: 'handler' | 'senior' | 'legal' | 'manager'
  planSelected: 'pay' | 'investigate' | 'deny' | 'settle' | 'none'
  escalated: boolean
  decisionLocked: boolean
}

const STEPS: StepId[] = ['intake', 'triage', 'authority', 'plan', 'lock']

function defaultState(): ClaimsManagerState {
  return {
    caseId: 'CLM-10421',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    reportedAmount: 42000,
    severity: 'medium',
    triageRoute: 'none',
    authorityLevel: 'handler',
    planSelected: 'none',
    escalated: false,
    decisionLocked: false
  }
}

export default function DemoClaimsManagerStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Start triage', 'Triage starten') },
    { id: 'triage', title: tr('Triage', 'Triage'), subtitle: tr('Choose routing', 'Routing wählen') },
    { id: 'authority', title: tr('Authority', 'Authority'), subtitle: tr('Assign authority', 'Authority zuweisen') },
    { id: 'plan', title: tr('Plan', 'Plan'), subtitle: tr('Select operational plan', 'Operationalen Plan wählen') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock manager decision', 'Manager-Entscheidung sperren') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<ClaimsManagerState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-claims/manager/step/intake" replace />

  function setPartial(p: Partial<ClaimsManagerState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const triageLabel = (value: ClaimsManagerState['triageRoute']) => {
    if (value === 'fast_track') return tr('Fast-track', 'Schnellspur')
    if (value === 'complex') return tr('Complex', 'Komplex')
    if (value === 'siu') return tr('SIU review', 'SIU-Prüfung')
    if (value === 'standard') return tr('Standard', 'Standard')
    return tr('None', 'Keine')
  }
  const authorityLabel = (value: ClaimsManagerState['authorityLevel']) => {
    if (value === 'handler') return tr('Handler', 'Sachbearbeiter')
    if (value === 'senior') return tr('Senior', 'Senior')
    if (value === 'legal') return tr('Legal', 'Legal')
    return tr('Manager', 'Manager')
  }
  const planLabel = (value: ClaimsManagerState['planSelected']) => {
    if (value === 'investigate') return tr('Investigate', 'Prüfen')
    if (value === 'settle') return tr('Settle', 'Vergleichen')
    if (value === 'pay') return tr('Pay', 'Zahlen')
    if (value === 'deny') return tr('Deny', 'Ablehnen')
    return tr('None', 'Keiner')
  }
  const snapshot = [
    { label: `${tr('Triage', 'Triage')} ${triageLabel(state.triageRoute)}`, ok: state.triageRoute !== 'none' },
    { label: `${tr('Authority', 'Authority')} ${authorityLabel(state.authorityLevel)}`, ok: state.authorityLevel !== 'handler' },
    { label: `${tr('Plan', 'Plan')} ${planLabel(state.planSelected)}`, ok: state.planSelected !== 'none' },
    { label: state.escalated ? tr('Escalated', 'Eskaliert') : tr('Not escalated', 'Nicht eskaliert'), ok: state.escalated },
    { label: state.decisionLocked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Nicht gesperrt'), ok: state.decisionLocked }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/manager')}>
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
                    <div className="fw-semibold">{state.caseId} · {state.insured}</div>
                    <div className="text-muted mt-2">{tr('Reported amount', 'Gemeldeter Betrag')}</div>
                    <div className="fw-semibold">€ {state.reportedAmount}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Claim appears medium severity; route depends on liability clarity and documentation.', 'Schaden mit mittlerer Schwere; Routing hängt von Haftungsklarheit und Doku ab.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Claims Manager intake started (case received)', 'Claims Intake gestartet (Fall erhalten)'))
                            nav('/demo-claims/manager/step/triage')
                          }}>{tr('Start triage', 'Triage starten')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'triage' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Route: standard unless liability unclear after first evidence review.', 'Route: Standard, außer Haftung bleibt nach erster Prüfung unklar.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Route: Fast-track', 'Route: Schnellspur'), value: 'fast_track' },
                            { label: tr('Route: Standard', 'Route: Standard'), value: 'standard' },
                            { label: tr('Route: Complex', 'Route: Komplex'), value: 'complex' },
                            { label: tr('Route: SIU review', 'Route: SIU-Prüfung'), value: 'siu' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Triage route set: ${opt.value}`, `Triage-Route gesetzt: ${opt.value}`))
                              setPartial({ triageRoute: opt.value as ClaimsManagerState['triageRoute'] })
                              nav('/demo-claims/manager/step/authority')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'authority' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Reported amount above 25k → senior authority suggested.', 'Gemeldeter Betrag über 25k → Senior Authority empfohlen.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Assign authority: Handler', 'Authority: Sachbearbeiter'), value: 'handler' },
                            { label: tr('Assign authority: Senior', 'Authority: Senior'), value: 'senior' },
                            { label: tr('Assign authority: Legal', 'Authority: Legal'), value: 'legal' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Authority assigned: ${opt.value}`, `Authority zugewiesen: ${opt.value}`))
                              setPartial({ authorityLevel: opt.value as ClaimsManagerState['authorityLevel'] })
                            }}>{opt.label}</button>
                          ))}
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, state.escalated ? tr('Escalation removed', 'Eskalation entfernt') : tr('Escalated to manager review', 'An Manager Review eskaliert'))
                            setPartial({ escalated: !state.escalated })
                            nav('/demo-claims/manager/step/plan')
                          }}>
                            {state.escalated ? tr('Remove escalation', 'Eskalation entfernen') : tr('Escalate to manager review', 'An Manager Review eskalieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'plan' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Investigate first, then settle if liability confirmed.', 'Zuerst prüfen, dann vergleichen bei bestätigter Haftung.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Plan: Investigate', 'Plan: Prüfen'), value: 'investigate' },
                            { label: tr('Plan: Settle', 'Plan: Vergleichen'), value: 'settle' },
                            { label: tr('Plan: Pay', 'Plan: Zahlen'), value: 'pay' },
                            { label: tr('Plan: Deny', 'Plan: Ablehnen'), value: 'deny' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Operational plan selected: ${opt.value}`, `Operationaler Plan gewählt: ${opt.value}`))
                              setPartial({ planSelected: opt.value as ClaimsManagerState['planSelected'] })
                              nav('/demo-claims/manager/step/lock')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                          <div className="text-muted">{tr('Triage', 'Triage')}: {triageLabel(state.triageRoute)}</div>
                          <div className="text-muted">{tr('Authority', 'Authority')}: {authorityLabel(state.authorityLevel)}</div>
                          <div className="text-muted">{tr('Plan', 'Plan')}: {planLabel(state.planSelected)}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Claims Manager decision locked', 'Claims-Entscheidung gesperrt'))
                            setPartial({ decisionLocked: true })
                            nav('/demo-claims/manager')
                          }} disabled={state.triageRoute === 'none' || state.planSelected === 'none'}>
                            {tr('Lock manager decision', 'Manager-Entscheidung sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/manager')}>
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
                        onClick={() => nav(`/demo-claims/manager/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: triage path + authority routing + plan', 'Entscheidet: Triage-Pfad + Authority-Routing + Plan')}</div>
                  <div>{tr('Accountable: SLA & escalation discipline', 'Verantwortlich: SLA & Eskalationsdisziplin')}</div>

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
