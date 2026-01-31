import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_RENTAL_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_RENTAL_AUDIT'

type StepId = 'intake' | 'vehicle-match' | 'pricing' | 'chat' | 'close'

type RentalState = {
  selectedPartner: string
  vehicleMatch: 'none' | 'van' | 'truck' | 'replacement-car'
  pricingMode: 'none' | 'standard' | 'capped' | 'exception'
  calcReceived: boolean
  chatTemplate: 'none' | 'reserve' | 'confirm-price' | 'close'
  closed: boolean
}

const PARTNERS = ['RentMobil', 'CityRent', 'TruckLease Pro']

const STEPS: StepId[] = ['intake', 'vehicle-match', 'pricing', 'chat', 'close']

function defaultState(): RentalState {
  return {
    selectedPartner: '',
    vehicleMatch: 'none',
    pricingMode: 'none',
    calcReceived: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerRentalStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Select rental partner', 'Rental-Partner wählen') },
    { id: 'vehicle-match', title: tr('Vehicle match', 'Fahrzeugmatch'), subtitle: tr('Choose vehicle type', 'Fahrzeugtyp wählen') },
    { id: 'pricing', title: tr('Pricing', 'Pricing'), subtitle: tr('Confirm pricing mode', 'Pricing-Modus bestätigen') },
    { id: 'chat', title: tr('Chat', 'Chat'), subtitle: tr('Templates & updates', 'Templates & Updates') },
    { id: 'close', title: tr('Close', 'Abschluss'), subtitle: tr('Close rental', 'Rental abschließen') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<RentalState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/rental/step/intake" replace />

  function setPartial(p: Partial<RentalState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const vehicleLabel = (value: RentalState['vehicleMatch']) => {
    if (value === 'van') return tr('Van', 'Van')
    if (value === 'truck') return tr('Truck', 'Truck')
    if (value === 'replacement-car') return tr('Replacement car', 'Ersatzwagen')
    return tr('None', 'Keine')
  }
  const pricingLabel = (value: RentalState['pricingMode']) => {
    if (value === 'standard') return tr('Standard', 'Standard')
    if (value === 'capped') return tr('Capped', 'Capped')
    if (value === 'exception') return tr('Exception', 'Ausnahme')
    return tr('None', 'Kein')
  }
  const snapshot = [
    { label: state.selectedPartner || tr('Partner unset', 'Partner nicht gesetzt'), ok: !!state.selectedPartner },
    { label: `${tr('Vehicle', 'Fahrzeug')} ${vehicleLabel(state.vehicleMatch)}`, ok: state.vehicleMatch !== 'none' },
    { label: `${tr('Pricing', 'Pricing')} ${pricingLabel(state.pricingMode)}`, ok: state.pricingMode !== 'none' },
    { label: state.calcReceived ? tr('Calc received', 'Kalkulation erhalten') : tr('Calc pending', 'Kalkulation ausstehend'), ok: state.calcReceived },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/rental')}>
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
                    <div className="fw-semibold">CLM-10421 · {tr('Rental need', 'Rental Bedarf')}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Select rental partner based on capacity and SLA.', 'Rental-Partner nach Kapazität und SLA wählen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Partner selected: ${p}`, `Partner gewählt: ${p}`))
                              setPartial({ selectedPartner: p })
                              nav('/demo-partners/rental/step/vehicle-match')
                            }}>{p}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'vehicle-match' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Match vehicle to fleet need.', 'Fahrzeug zum Bedarf matchen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Vehicle: Van', 'Fahrzeug: Van'), value: 'van' },
                            { label: tr('Vehicle: Truck', 'Fahrzeug: Truck'), value: 'truck' },
                            { label: tr('Vehicle: Replacement car', 'Fahrzeug: Ersatzwagen'), value: 'replacement-car' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Vehicle match: ${opt.value}`, `Fahrzeugmatch: ${opt.value}`))
                              setPartial({ vehicleMatch: opt.value as RentalState['vehicleMatch'] })
                              nav('/demo-partners/rental/step/pricing')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'pricing' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Use capped pricing if duration uncertain.', 'Capped Pricing bei unsicherer Dauer nutzen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Pricing: Standard', 'Pricing: Standard'), value: 'standard' },
                            { label: tr('Pricing: Capped', 'Pricing: Capped'), value: 'capped' },
                            { label: tr('Pricing: Exception', 'Pricing: Ausnahme'), value: 'exception' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Pricing mode: ${opt.value}`, `Pricing-Modus: ${opt.value}`))
                              setPartial({ pricingMode: opt.value as RentalState['pricingMode'] })
                            }}>{opt.label}</button>
                          ))}
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Calculation received', 'Kalkulation erhalten'))
                            setPartial({ calcReceived: true })
                            nav('/demo-partners/rental/step/chat')
                          }}>{tr('Receive calculation', 'Kalkulation erhalten')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'chat' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Send structured templates for reservation and pricing.', 'Strukturierte Templates für Reservierung & Pricing nutzen.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Template sent: reserve', 'Template gesendet: Reservierung'))
                            setPartial({ chatTemplate: 'reserve' })
                          }}>{tr('Send template: Reserve', 'Template senden: Reservierung')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Template sent: confirm price', 'Template gesendet: Preis bestätigen'))
                            setPartial({ chatTemplate: 'confirm-price' })
                          }}>{tr('Send template: Confirm price', 'Template senden: Preis bestätigen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Partner update received', 'Partner-Update erhalten'))
                          }}>{tr('Receive partner update', 'Partner-Update empfangen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/rental/step/close')}>
                            {tr('Proceed to close', 'Zum Abschluss')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div><div className="text-muted">{tr('Close when reservation confirmed.', 'Abschließen, wenn Reservierung bestätigt.')}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Rental confirmed', 'Rental bestätigt'))
                            setPartial({ closed: true })
                            nav('/demo-partners/rental')
                          }}>{tr('Confirm rental started', 'Rental gestartet bestätigen')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/rental')}>
                            {tr('Close (no rental)', 'Schließen (kein Rental)')}
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/rental/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: vehicle match + pricing', 'Entscheidet: Fahrzeugmatch + Pricing')}</div>
                  <div>{tr('Accountable: cost adherence', 'Verantwortlich: Kostenhaltung')}</div>
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
