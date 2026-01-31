import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_ASSIST_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_ASSIST_AUDIT'

type StepId = 'intake' | 'dispatch' | 'sla-kpi' | 'chat' | 'close'

type AssistState = {
  selectedPartner: string
  dispatchMode: 'none' | 'tow' | 'roadside' | 'replacement'
  slaChecked: boolean
  kpiChecked: boolean
  chatTemplate: 'none' | 'dispatch' | 'status' | 'close'
  closed: boolean
}

const PARTNERS = ['RoadAssist Süd', 'AutoHelp24', 'FleetRescue']

const STEPS: StepId[] = ['intake', 'dispatch', 'sla-kpi', 'chat', 'close']

function defaultState(): AssistState {
  return {
    selectedPartner: '',
    dispatchMode: 'none',
    slaChecked: false,
    kpiChecked: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerAssistanceStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Select partner', 'Partner wählen') },
    { id: 'dispatch', title: tr('Dispatch', 'Dispatch'), subtitle: tr('Set dispatch mode', 'Dispatch-Modus setzen') },
    { id: 'sla-kpi', title: tr('SLA/KPI', 'SLA/KPI'), subtitle: tr('Confirm checks', 'Checks bestätigen') },
    { id: 'chat', title: tr('Chat', 'Chat'), subtitle: tr('Send templates', 'Templates senden') },
    { id: 'close', title: tr('Close', 'Abschluss'), subtitle: tr('Close assistance', 'Assistance abschließen') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<AssistState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/assistance/step/intake" replace />

  function setPartial(p: Partial<AssistState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const dispatchLabel = (value: AssistState['dispatchMode']) => {
    if (value === 'tow') return tr('Tow', 'Abschleppen')
    if (value === 'roadside') return tr('Roadside', 'Pannenhilfe')
    if (value === 'replacement') return tr('Replacement', 'Ersatzfahrzeug')
    return tr('None', 'Keine')
  }
  const snapshot = [
    { label: state.selectedPartner || tr('Partner unset', 'Partner nicht gesetzt'), ok: !!state.selectedPartner },
    { label: `${tr('Dispatch', 'Dispatch')} ${dispatchLabel(state.dispatchMode)}`, ok: state.dispatchMode !== 'none' },
    { label: state.slaChecked ? tr('SLA checked', 'SLA geprüft') : tr('SLA not checked', 'SLA nicht geprüft'), ok: state.slaChecked },
    { label: state.kpiChecked ? tr('KPI checked', 'KPI geprüft') : tr('KPI not checked', 'KPI nicht geprüft'), ok: state.kpiChecked },
    { label: state.closed ? tr('Closed', 'Abgeschlossen') : tr('Open', 'Offen'), ok: state.closed }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/assistance')}>
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
                    <div className="fw-semibold">CLM-10421 · München</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Pick closest capable partner; confirm dispatch type.', 'Nächsten geeigneten Partner wählen; Dispatch-Typ bestätigen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Assistance flow started', 'Assistance-Flow gestartet'))
                            nav('/demo-partners/assistance/step/dispatch')
                          }}>{tr('Select assistance partner', 'Assistance-Partner wählen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'dispatch' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div><div className="text-muted">{tr('Select partner and dispatch mode aligned with SLA.', 'Partner und Dispatch-Modus SLA-konform wählen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Partner selected: ${p}`, `Partner gewählt: ${p}`))
                              setPartial({ selectedPartner: p })
                            }}>{p}</button>
                          ))}
                          {[
                            { label: tr('Dispatch: Tow', 'Dispatch: Abschleppen'), value: 'tow' },
                            { label: tr('Dispatch: Roadside', 'Dispatch: Pannenhilfe'), value: 'roadside' },
                            { label: tr('Dispatch: Replacement vehicle', 'Dispatch: Ersatzfahrzeug'), value: 'replacement' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-outline-secondary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Dispatch mode: ${opt.value}`, `Dispatch-Modus: ${opt.value}`))
                              setPartial({ dispatchMode: opt.value as AssistState['dispatchMode'] })
                              nav('/demo-partners/assistance/step/sla-kpi')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'sla-kpi' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('SLA target 30 min; current ETA 22 min.', 'SLA-Ziel 30 Min; aktuelle ETA 22 Min.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('SLA checked', 'SLA geprüft'))
                            setPartial({ slaChecked: true })
                          }}>{tr('Confirm SLA check', 'SLA-Check bestätigen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('KPI checked', 'KPI geprüft'))
                            setPartial({ kpiChecked: true })
                            nav('/demo-partners/assistance/step/chat')
                          }}>{tr('Confirm KPI check', 'KPI-Check bestätigen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'chat' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Use structured templates; avoid free text.', 'Strukturierte Templates nutzen; kein Freitext.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Template sent: dispatch details', 'Template gesendet: Dispatch Details'))
                            setPartial({ chatTemplate: 'dispatch' })
                          }}>{tr('Send template: Dispatch details', 'Template senden: Dispatch Details')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Template sent: status request', 'Template gesendet: Statusanfrage'))
                            setPartial({ chatTemplate: 'status' })
                          }}>{tr('Send template: Status request', 'Template senden: Statusanfrage')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Partner update received', 'Partner-Update erhalten'))
                          }}>{tr('Receive partner update', 'Partner-Update empfangen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/assistance/step/close')}>
                            {tr('Proceed to close', 'Zum Abschluss')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Close once completion evidence received.', 'Abschließen, sobald Abschlussnachweis vorliegt.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Assistance completed', 'Assistance abgeschlossen'))
                            setPartial({ closed: true })
                            nav('/demo-partners/assistance')
                          }}>{tr('Mark completed', 'Als abgeschlossen markieren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/assistance')}>
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/assistance/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: dispatch + SLA/KPI checks', 'Entscheidet: Dispatch + SLA/KPI Checks')}</div>
                  <div>{tr('Accountable: response time & comms', 'Verantwortlich: Reaktionszeit & Kommunikation')}</div>
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
