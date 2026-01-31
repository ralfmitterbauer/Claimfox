import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_MAJORLOSS_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_MAJORLOSS_AUDIT'

type StepId = 'intake' | 'triage' | 'experts' | 'governance' | 'lock'

type MajorLossState = {
  selectedPartner: string
  triageLevel: 'none' | 'high-touch' | 'standard' | 'containment'
  expertsRequested: boolean
  governanceNotified: boolean
  locked: boolean
}

const PARTNERS = ['CrisisAdjust', 'MajorLoss Partners', 'ForensicClaims']

const STEPS: StepId[] = ['intake', 'triage', 'experts', 'governance', 'lock']

function defaultState(): MajorLossState {
  return {
    selectedPartner: '',
    triageLevel: 'none',
    expertsRequested: false,
    governanceNotified: false,
    locked: false
  }
}

export default function DemoPartnerMajorLossStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Begin major loss triage', 'Major-Loss-Triage starten') },
    { id: 'triage', title: tr('Triage', 'Triage'), subtitle: tr('Set triage level', 'Triage-Level setzen') },
    { id: 'experts', title: tr('Experts', 'Experten'), subtitle: tr('Request experts pack', 'Expertenpaket anfordern') },
    { id: 'governance', title: tr('Governance', 'Governance'), subtitle: tr('Notify governance', 'Governance informieren') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock major loss plan', 'Major-Loss-Plan sperren') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<MajorLossState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/major-loss/step/intake" replace />

  function setPartial(p: Partial<MajorLossState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const triageLabel = (value: MajorLossState['triageLevel']) => {
    if (value === 'high-touch') return tr('High-touch', 'High-touch')
    if (value === 'standard') return tr('Standard', 'Standard')
    if (value === 'containment') return tr('Containment', 'Containment')
    return tr('None', 'Keine')
  }
  const snapshot = [
    { label: state.selectedPartner || tr('Partner unset', 'Partner nicht gesetzt'), ok: !!state.selectedPartner },
    { label: `${tr('Triage', 'Triage')} ${triageLabel(state.triageLevel)}`, ok: state.triageLevel !== 'none' },
    { label: state.expertsRequested ? tr('Experts requested', 'Experten angefordert') : tr('Experts not requested', 'Experten nicht angefordert'), ok: state.expertsRequested },
    { label: state.governanceNotified ? tr('Governance notified', 'Governance informiert') : tr('Governance not notified', 'Governance nicht informiert'), ok: state.governanceNotified },
    { label: state.locked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Nicht gesperrt'), ok: state.locked }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('PARTNER DEMO', 'PARTNER DEMO')}</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/major-loss')}>
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
                    <div className="fw-semibold">CLM-10421 · {tr('Major loss', 'Großschaden')}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('High exposure: start triage and identify expert network.', 'Hohe Exponierung: Triage starten und Expertennetzwerk wählen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Major loss intake started', 'Major-Loss-Intake gestartet'))
                            nav('/demo-partners/major-loss/step/triage')
                          }}>{tr('Begin major loss triage', 'Major-Loss-Triage starten')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'triage' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div><div className="text-muted">{tr('Use high-touch for catastrophic exposure.', 'High-touch bei katastrophaler Exponierung.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Triage: High-touch', 'Triage: High-touch'), value: 'high-touch' },
                            { label: tr('Triage: Standard', 'Triage: Standard'), value: 'standard' },
                            { label: tr('Triage: Containment', 'Triage: Containment'), value: 'containment' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Triage level: ${opt.value}`, `Triage-Level: ${opt.value}`))
                              setPartial({ triageLevel: opt.value as MajorLossState['triageLevel'] })
                              nav('/demo-partners/major-loss/step/experts')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'experts' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div><div className="text-muted">{tr('Select a major loss partner and request experts pack.', 'Major-Loss-Partner wählen und Expertenpaket anfordern.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Partner selected: ${p}`, `Partner gewählt: ${p}`))
                              setPartial({ selectedPartner: p })
                            }}>{p}</button>
                          ))}
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Experts pack requested', 'Expertenpaket angefordert'))
                            setPartial({ expertsRequested: true })
                            nav('/demo-partners/major-loss/step/governance')
                          }}>{tr('Request experts pack', 'Expertenpaket anfordern')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'governance' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Notify governance if exposure exceeds thresholds.', 'Governance informieren, wenn Schwellen überschritten werden.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Governance notified', 'Governance informiert'))
                            setPartial({ governanceNotified: true })
                            nav('/demo-partners/major-loss/step/lock')
                          }}>{tr('Notify governance', 'Governance informieren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Governance held', 'Governance zurückgestellt'))
                            setPartial({ governanceNotified: false })
                            nav('/demo-partners/major-loss/step/lock')
                          }}>{tr('Hold governance', 'Governance zurückstellen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div><div className="text-muted">{tr('Triage', 'Triage')}: {triageLabel(state.triageLevel)}</div><div className="text-muted">{tr('Partner', 'Partner')}: {state.selectedPartner || '—'}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Major loss plan locked', 'Major-Loss-Plan gesperrt'))
                            setPartial({ locked: true })
                            nav('/demo-partners/major-loss')
                          }}>{tr('Lock major loss plan', 'Major-Loss-Plan sperren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/major-loss')}>
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/major-loss/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: triage + experts + governance', 'Entscheidet: Triage + Experten + Governance')}</div>
                  <div>{tr('Accountable: severity control', 'Verantwortlich: Severity-Kontrolle')}</div>
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
