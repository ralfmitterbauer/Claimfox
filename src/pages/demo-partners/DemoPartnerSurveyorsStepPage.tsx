import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_SURVEY_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_SURVEY_AUDIT'

type StepId = 'intake' | 'assign' | 'report' | 'sla-kpi' | 'close'

type SurveyState = {
  selectedPartner: string
  assignment: 'none' | 'onsite' | 'remote' | 'desk-review'
  reportStatus: 'none' | 'requested' | 'received'
  slaChecked: boolean
  chatTemplate: 'none' | 'request-report' | 'remind-sla' | 'close'
  closed: boolean
}

const PARTNERS = ['GutachtenPlus', 'IngenieurBüro Keller', 'SurveyPro']

const STEPS: StepId[] = ['intake', 'assign', 'report', 'sla-kpi', 'close']

function defaultState(): SurveyState {
  return {
    selectedPartner: '',
    assignment: 'none',
    reportStatus: 'none',
    slaChecked: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerSurveyorsStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Assign surveyor', 'Gutachter zuweisen') },
    { id: 'assign', title: tr('Assign', 'Zuweisen'), subtitle: tr('Select partner & mode', 'Partner & Modus wählen') },
    { id: 'report', title: tr('Report', 'Bericht'), subtitle: tr('Request or receive', 'Anfordern oder erhalten') },
    { id: 'sla-kpi', title: tr('SLA/KPI', 'SLA/KPI'), subtitle: tr('Confirm SLA check', 'SLA-Check bestätigen') },
    { id: 'close', title: tr('Close', 'Abschluss'), subtitle: tr('Close survey', 'Gutachten abschließen') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<SurveyState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/surveyors/step/intake" replace />

  function setPartial(p: Partial<SurveyState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const assignmentLabel = (value: SurveyState['assignment']) => {
    if (value === 'onsite') return tr('Onsite', 'Vor Ort')
    if (value === 'remote') return tr('Remote', 'Remote')
    if (value === 'desk-review') return tr('Desk review', 'Desk Review')
    return tr('None', 'Keine')
  }
  const reportLabel = (value: SurveyState['reportStatus']) => {
    if (value === 'requested') return tr('Requested', 'Angefordert')
    if (value === 'received') return tr('Received', 'Erhalten')
    return tr('None', 'Keiner')
  }
  const snapshot = [
    { label: state.selectedPartner || tr('Partner unset', 'Partner nicht gesetzt'), ok: !!state.selectedPartner },
    { label: `${tr('Assign', 'Zuweisung')} ${assignmentLabel(state.assignment)}`, ok: state.assignment !== 'none' },
    { label: `${tr('Report', 'Bericht')} ${reportLabel(state.reportStatus)}`, ok: state.reportStatus === 'received' },
    { label: state.slaChecked ? tr('SLA checked', 'SLA geprüft') : tr('SLA not checked', 'SLA nicht geprüft'), ok: state.slaChecked },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/surveyors')}>
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
                    <div className="fw-semibold">CLM-10421 · {tr('Survey request', 'Gutachten-Anfrage')}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Assign the fastest qualified surveyor.', 'Schnellsten qualifizierten Gutachter zuweisen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Survey flow started', 'Gutachter-Flow gestartet'))
                            nav('/demo-partners/surveyors/step/assign')
                          }}>{tr('Assign surveyor', 'Gutachter zuweisen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'assign' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div><div className="text-muted">{tr('Choose partner and assignment mode.', 'Partner und Modus wählen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Surveyor selected: ${p}`, `Gutachter gewählt: ${p}`))
                              setPartial({ selectedPartner: p })
                            }}>{p}</button>
                          ))}
                          {[
                            { label: tr('Assignment: Onsite', 'Zuweisung: Vor Ort'), value: 'onsite' },
                            { label: tr('Assignment: Remote', 'Zuweisung: Remote'), value: 'remote' },
                            { label: tr('Assignment: Desk review', 'Zuweisung: Desk Review'), value: 'desk-review' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-outline-secondary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Assignment mode: ${opt.value}`, `Zuweisungsmodus: ${opt.value}`))
                              setPartial({ assignment: opt.value as SurveyState['assignment'] })
                              nav('/demo-partners/surveyors/step/report')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'report' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div><div className="text-muted">{tr('Request report and confirm reception.', 'Bericht anfordern und Empfang bestätigen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Report requested', 'Bericht angefordert'))
                            setPartial({ reportStatus: 'requested', chatTemplate: 'request-report' })
                          }}>{tr('Request report', 'Bericht anfordern')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Report received', 'Bericht erhalten'))
                            setPartial({ reportStatus: 'received' })
                            nav('/demo-partners/surveyors/step/sla-kpi')
                          }}>{tr('Receive report', 'Bericht erhalten')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'sla-kpi' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Target report SLA: 48 h.', 'Ziel-Bericht-SLA: 48 h.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('SLA checked', 'SLA geprüft'))
                            setPartial({ slaChecked: true })
                          }}>{tr('Confirm SLA check', 'SLA-Check bestätigen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('SLA breach escalated', 'SLA-Verstoß eskaliert'))
                          }}>{tr('Escalate SLA breach', 'SLA-Verstoß eskalieren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/surveyors/step/close')}>
                            {tr('Proceed to close', 'Zum Abschluss')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Close once report is received and logged.', 'Abschließen, sobald Bericht erhalten und protokolliert ist.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Survey closed', 'Gutachten geschlossen'))
                            setPartial({ closed: true })
                            nav('/demo-partners/surveyors')
                          }}>{tr('Close with report', 'Mit Bericht schließen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/surveyors')}>
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/surveyors/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: surveyor assignment + report flow', 'Entscheidet: Gutachterzuweisung + Bericht-Flow')}</div>
                  <div>{tr('Accountable: report SLA', 'Verantwortlich: Bericht-SLA')}</div>
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
