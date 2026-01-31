import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_claimsStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_CLAIMS_REGRESS_STATE'
const KEY_AUDIT = 'DEMO_CLAIMS_REGRESS_AUDIT'

type StepId = 'intake' | 'liability' | 'outreach' | 'settlement' | 'lock'

type RegressState = {
  caseId: string
  claimant: string
  thirdParty: string
  liabilitySignal: 'low' | 'medium' | 'high'
  recoveryPotential: 'none' | 'low' | 'mid' | 'high'
  outreachSent: boolean
  settlementPosture: 'none' | 'soft' | 'firm'
  recoveredStatus: 'open' | 'settled' | 'litigation'
  locked: boolean
}

const STEPS: StepId[] = ['intake', 'liability', 'outreach', 'settlement', 'lock']

function defaultState(): RegressState {
  return {
    caseId: 'CLM-10421',
    claimant: 'Stadtwerke München',
    thirdParty: 'München Tiefbau GmbH',
    liabilitySignal: 'medium',
    recoveryPotential: 'mid',
    outreachSent: false,
    settlementPosture: 'none',
    recoveredStatus: 'open',
    locked: false
  }
}

export default function DemoRegressStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Assess liability', 'Haftung prüfen') },
    { id: 'liability', title: tr('Liability', 'Haftung'), subtitle: tr('Set liability signal', 'Haftungssignal setzen') },
    { id: 'outreach', title: tr('Outreach', 'Kontakt'), subtitle: tr('Send notice', 'Mitteilung senden') },
    { id: 'settlement', title: tr('Settlement', 'Vergleich'), subtitle: tr('Set posture', 'Posture setzen') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock recovery decision', 'Recovery-Entscheidung sperren') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<RegressState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-claims/regress/step/intake" replace />

  function setPartial(p: Partial<RegressState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const liabilityLabel = (lvl: RegressState['liabilitySignal']) =>
    lvl === 'high' ? tr('High', 'Hoch') : lvl === 'medium' ? tr('Medium', 'Mittel') : tr('Low', 'Niedrig')
  const recoveryLabel = (lvl: RegressState['recoveryPotential']) => {
    if (lvl === 'none') return tr('None', 'Keine')
    if (lvl === 'mid') return tr('Mid', 'Mittel')
    return lvl === 'high' ? tr('High', 'Hoch') : tr('Low', 'Niedrig')
  }
  const postureLabel = (p: RegressState['settlementPosture']) => {
    if (p === 'soft') return tr('Soft', 'Weich')
    if (p === 'firm') return tr('Firm', 'Hart')
    return tr('None', 'Keine')
  }
  const statusLabel = (s: RegressState['recoveredStatus']) => {
    if (s === 'settled') return tr('Settled', 'Verglichen')
    if (s === 'litigation') return tr('Litigation', 'Rechtsstreit')
    return tr('Open', 'Offen')
  }
  const snapshot = [
    { label: `${tr('Liability', 'Haftung')} ${liabilityLabel(state.liabilitySignal)}`, ok: state.liabilitySignal !== 'low' },
    { label: `${tr('Recovery', 'Recovery')} ${recoveryLabel(state.recoveryPotential)}`, ok: state.recoveryPotential !== 'none' },
    { label: state.outreachSent ? tr('Outreach sent', 'Kontakt gesendet') : tr('No outreach', 'Kein Kontakt'), ok: state.outreachSent },
    { label: `${tr('Posture', 'Posture')} ${postureLabel(state.settlementPosture)}`, ok: state.settlementPosture !== 'none' },
    { label: `${tr('Status', 'Status')} ${statusLabel(state.recoveredStatus)}`, ok: state.recoveredStatus !== 'open' },
    { label: state.locked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Nicht gesperrt'), ok: state.locked }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/regress')}>
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
                    <div className="fw-semibold">{state.caseId} · {state.claimant}</div>
                    <div className="text-muted mt-2">{tr('Third party', 'Dritte Partei')}</div>
                    <div className="fw-semibold">{state.thirdParty}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Potential third-party liability detected; validate duty/breach quickly.', 'Mögliche Drittverschulden; Pflicht/Verletzung schnell prüfen.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Regress intake started', 'Regress Intake gestartet'))
                            nav('/demo-claims/regress/step/liability')
                          }}>{tr('Assess liability', 'Haftung prüfen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'liability' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Set liability to high only with clear breach evidence.', 'Haftung nur auf hoch setzen bei klarer Pflichtverletzung.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {['high', 'medium', 'low'].map((lvl) => (
                            <button key={lvl} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Liability set: ${lvl}`, `Haftung gesetzt: ${lvl}`))
                              setPartial({ liabilitySignal: lvl as RegressState['liabilitySignal'] })
                              nav('/demo-claims/regress/step/outreach')
                            }}>{tr('Liability', 'Haftung')}: {liabilityLabel(lvl as RegressState['liabilitySignal'])}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'outreach' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Send notice + document request before firm settlement posture.', 'Mitteilung + Unterlagen anfordern vor harter Posture.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Outreach sent (notice + doc request)', 'Kontakt gesendet (Mitteilung + Dokumente)'))
                            setPartial({ outreachSent: true })
                            nav('/demo-claims/regress/step/settlement')
                          }}>{tr('Send notice + request docs', 'Mitteilung senden + Unterlagen anfordern')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Outreach held', 'Kontakt zurückgestellt'))
                            nav('/demo-claims/regress/step/settlement')
                          }}>{tr('Hold outreach', 'Kontakt zurückstellen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'settlement' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('High liability → firm posture; medium → soft posture with docs.', 'Hohe Haftung → harte Posture; mittel → weich mit Doku.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Settlement posture: soft', 'Posture: weich'))
                            setPartial({ settlementPosture: 'soft' })
                          }}>{tr('Posture: Soft', 'Posture: weich')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Settlement posture: firm', 'Posture: hart'))
                            setPartial({ settlementPosture: 'firm' })
                          }}>{tr('Posture: Firm', 'Posture: hart')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Escalated to litigation', 'An Rechtsstreit eskaliert'))
                            setPartial({ recoveredStatus: 'litigation' })
                          }}>{tr('Escalate to litigation', 'An Rechtsstreit eskalieren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Marked settled', 'Als verglichen markiert'))
                            setPartial({ recoveredStatus: 'settled' })
                            nav('/demo-claims/regress/step/lock')
                          }} disabled={!state.outreachSent}>
                            {tr('Mark settled', 'Als verglichen markieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                          <div className="text-muted">{tr('Liability', 'Haftung')}: {liabilityLabel(state.liabilitySignal)}</div>
                          <div className="text-muted">{tr('Outreach', 'Kontakt')}: {state.outreachSent ? tr('Yes', 'Ja') : tr('No', 'Nein')}</div>
                          <div className="text-muted">{tr('Status', 'Status')}: {statusLabel(state.recoveredStatus)}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Regress decision locked', 'Regress-Entscheidung gesperrt'))
                            setPartial({ locked: true })
                            nav('/demo-claims/regress')
                          }} disabled={!state.outreachSent && state.recoveredStatus !== 'litigation'}>
                            {tr('Lock regress decision', 'Regress-Entscheidung sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-claims/regress')}>
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
                        onClick={() => nav(`/demo-claims/regress/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: liability assessment + recovery posture', 'Entscheidet: Haftung + Recovery-Posture')}</div>
                  <div>{tr('Accountable: recoverable value & defensibility', 'Verantwortlich: Recoverable-Wert & Nachvollziehbarkeit')}</div>

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
