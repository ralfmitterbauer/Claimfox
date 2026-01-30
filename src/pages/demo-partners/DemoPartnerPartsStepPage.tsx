import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_PARTS_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_PARTS_AUDIT'

type StepId = 'intake' | 'sourcing' | 'quote' | 'sla-kpi' | 'close'

type PartsState = {
  selectedPartner: string
  sourcingMode: 'none' | 'oem' | 'aftermarket' | 'mixed'
  quoteStatus: 'none' | 'requested' | 'received'
  slaChecked: boolean
  chatTemplate: 'none' | 'request-quote' | 'confirm-order' | 'close'
  closed: boolean
}

const PARTNERS = ['PartsDirect', 'OEM Hub', 'Aftermarket Pro']

function defaultState(): PartsState {
  return {
    selectedPartner: '',
    sourcingMode: 'none',
    quoteStatus: 'none',
    slaChecked: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerPartsStepPage() {
  const nav = useNavigate()
  const { tr } = useI18n()
  const { stepId } = useParams<{ stepId: StepId }>()
  const steps = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Select parts network', 'Teile-Netzwerk wählen') },
    { id: 'sourcing', title: tr('Sourcing', 'Beschaffung'), subtitle: tr('Select partner & mode', 'Partner & Modus wählen') },
    { id: 'quote', title: tr('Quote', 'Angebot'), subtitle: tr('Request quote', 'Angebot anfordern') },
    { id: 'sla-kpi', title: tr('SLA/KPI', 'SLA/KPI'), subtitle: tr('Confirm checks', 'Prüfungen bestätigen') },
    { id: 'close', title: tr('Close', 'Abschluss'), subtitle: tr('Close parts order', 'Teileauftrag schließen') }
  ] as { id: StepId; title: string; subtitle: string }[]), [tr])
  const current = useMemo(() => steps.find((s) => s.id === stepId), [stepId, steps])
  const [state, setState] = useState<PartsState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/parts/step/intake" replace />

  function setPartial(p: Partial<PartsState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  function sourcingLabel(mode: PartsState['sourcingMode']) {
    if (mode === 'oem') return tr('Sourcing OEM', 'Beschaffung OEM')
    if (mode === 'aftermarket') return tr('Sourcing Aftermarket', 'Beschaffung Aftermarket')
    if (mode === 'mixed') return tr('Sourcing Mixed', 'Beschaffung gemischt')
    return tr('Sourcing unset', 'Beschaffung offen')
  }

  function quoteLabel(status: PartsState['quoteStatus']) {
    if (status === 'requested') return tr('Quote requested', 'Angebot angefragt')
    if (status === 'received') return tr('Quote received', 'Angebot erhalten')
    return tr('Quote pending', 'Angebot ausstehend')
  }

  const snapshot = [
    { label: state.selectedPartner || tr('Partner unset', 'Partner offen'), ok: !!state.selectedPartner },
    { label: sourcingLabel(state.sourcingMode), ok: state.sourcingMode !== 'none' },
    { label: quoteLabel(state.quoteStatus), ok: state.quoteStatus === 'received' },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/parts')}>
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
                      <div className="text-muted">
                        {tr('Step', 'Schritt')} {steps.findIndex((s) => s.id === stepId) + 1}/{steps.length}
                      </div>
                      <h3 className="card-title mb-0">{current.title}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">{tr('Case', 'Fall')}</div>
                    <div className="fw-semibold">{tr('CLM-10421 · Parts request', 'CLM-10421 · Teileanfrage')}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Select network before sourcing mode.', 'Netzwerk vor Beschaffungsmodus wählen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Parts intake started', 'Teile-Intake gestartet'))
                            nav('/demo-partners/parts/step/sourcing')
                          }}>{tr('Select parts network', 'Teile-Netzwerk wählen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'sourcing' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div><div className="text-muted">{tr('OEM for warranty, aftermarket for cost control.', 'OEM für Garantie, Aftermarket zur Kostenkontrolle.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Partner selected: ${p}`, `Partner gewählt: ${p}`))
                              setPartial({ selectedPartner: p })
                            }}>{p}</button>
                          ))}
                          {[
                            { label: tr('Sourcing: OEM', 'Beschaffung: OEM'), value: 'oem' },
                            { label: tr('Sourcing: Aftermarket', 'Beschaffung: Aftermarket'), value: 'aftermarket' },
                            { label: tr('Sourcing: Mixed', 'Beschaffung: gemischt'), value: 'mixed' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-outline-secondary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Sourcing mode: ${opt.value}`, `Beschaffungsmodus: ${opt.value}`))
                              setPartial({ sourcingMode: opt.value as PartsState['sourcingMode'] })
                              nav('/demo-partners/parts/step/quote')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'quote' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Request quote before order.', 'Vor Bestellung Angebot anfordern.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Quote requested', 'Angebot angefragt'))
                            setPartial({ quoteStatus: 'requested', chatTemplate: 'request-quote' })
                          }}>{tr('Request quote', 'Angebot anfordern')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Quote received', 'Angebot erhalten'))
                            setPartial({ quoteStatus: 'received' })
                            nav('/demo-partners/parts/step/sla-kpi')
                          }}>{tr('Receive quote', 'Angebot erhalten')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'sla-kpi' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Confirm SLA/KPI before order.', 'SLA/KPI vor Bestellung bestätigen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('SLA checked', 'SLA geprüft'))
                            setPartial({ slaChecked: true })
                          }}>{tr('Confirm SLA check', 'SLA-Prüfung bestätigen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('KPI checked', 'KPI geprüft'))
                            nav('/demo-partners/parts/step/close')
                          }}>{tr('Confirm KPI check', 'KPI-Prüfung bestätigen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Close once order placed.', 'Schließen, sobald Auftrag ausgelöst ist.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Order confirmed', 'Auftrag bestätigt'))
                            setPartial({ closed: true })
                            nav('/demo-partners/parts')
                          }}>{tr('Confirm order placed', 'Auftrag bestätigt')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/parts')}>
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
                    {steps.map((s) => (
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/parts/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>{tr('AI & Accountability', 'KI & Verantwortung')}</h4>
                  <div>{tr('Decides: sourcing + quote + SLA', 'Entscheidet: Beschaffung + Angebot + SLA')}</div>
                  <div>{tr('Accountable: cost & time', 'Verantwortlich: Kosten & Zeit')}</div>
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
