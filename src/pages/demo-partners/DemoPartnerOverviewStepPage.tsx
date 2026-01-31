import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_OVERVIEW_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_OVERVIEW_AUDIT'

type StepId = 'intake' | 'network' | 'selection' | 'data-pack' | 'lock'

type OverviewState = {
  caseId: string
  network: 'assistance' | 'rental' | 'surveyors' | 'major-loss' | 'parts' | 'none'
  selectedPartner: string
  dataPack: 'calc' | 'report' | 'claim' | 'all' | 'none'
  locked: boolean
}

const NETWORK_PARTNERS: Record<string, string[]> = {
  assistance: ['RoadAssist Süd', 'AutoHelp24', 'FleetRescue'],
  rental: ['RentMobil', 'CityRent', 'TruckLease Pro'],
  surveyors: ['GutachtenPlus', 'IngenieurBüro Keller', 'SurveyPro'],
  'major-loss': ['CrisisAdjust', 'MajorLoss Partners', 'ForensicClaims'],
  parts: ['PartsDirect', 'OEM Hub', 'Aftermarket Pro']
}

const STEPS: StepId[] = ['intake', 'network', 'selection', 'data-pack', 'lock']

function defaultState(): OverviewState {
  return {
    caseId: 'CLM-10421',
    network: 'none',
    selectedPartner: '',
    dataPack: 'none',
    locked: false
  }
}

export default function DemoPartnerOverviewStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Start network selection', 'Netzwerkauswahl starten') },
    { id: 'network', title: tr('Network', 'Netzwerk'), subtitle: tr('Choose a network', 'Netzwerk wählen') },
    { id: 'selection', title: tr('Selection', 'Auswahl'), subtitle: tr('Pick a partner', 'Partner wählen') },
    { id: 'data-pack', title: tr('Data pack', 'Datenpaket'), subtitle: tr('Request data', 'Daten anfordern') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock selection', 'Auswahl sperren') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<OverviewState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/overview/step/intake" replace />

  function setPartial(p: Partial<OverviewState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const networkLabel = (value: OverviewState['network']) => {
    if (value === 'assistance') return tr('Assistance', 'Assistance')
    if (value === 'rental') return tr('Rental', 'Rental')
    if (value === 'surveyors') return tr('Surveyors', 'Gutachter')
    if (value === 'major-loss') return tr('Major Loss', 'Major Loss')
    if (value === 'parts') return tr('Parts', 'Teile')
    return tr('None', 'Keine')
  }
  const dataPackLabel = (value: OverviewState['dataPack']) => {
    if (value === 'calc') return tr('Calculations', 'Kalkulationen')
    if (value === 'report') return tr('Gutachten/Report', 'Gutachten/Report')
    if (value === 'claim') return tr('Claim info', 'Claim Info')
    if (value === 'all') return tr('Full pack', 'Vollpaket')
    return tr('None', 'Keins')
  }
  const snapshot = [
    { label: `${tr('Network', 'Netzwerk')} ${networkLabel(state.network)}`, ok: state.network !== 'none' },
    { label: state.selectedPartner || tr('Partner not set', 'Partner nicht gesetzt'), ok: !!state.selectedPartner },
    { label: `${tr('Data pack', 'Datenpaket')} ${dataPackLabel(state.dataPack)}`, ok: state.dataPack !== 'none' },
    { label: state.locked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Nicht gesperrt'), ok: state.locked }
  ]

  const partnerOptions = state.network !== 'none' ? NETWORK_PARTNERS[state.network] : []

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/overview')}>
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
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Select network first; avoid cross-network leakage.', 'Zuerst Netzwerk wählen; Cross-Network-Leakage vermeiden.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Partner overview started', 'Partner Overview gestartet'))
                            nav('/demo-partners/overview/step/network')
                          }}>{tr('Choose network', 'Netzwerk wählen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'network' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Pick the network that owns the operational step.', 'Netzwerk wählen, das den operativen Schritt besitzt.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Network: Assistance', 'Netzwerk: Assistance'), value: 'assistance' },
                            { label: tr('Network: Rental', 'Netzwerk: Rental'), value: 'rental' },
                            { label: tr('Network: Surveyors', 'Netzwerk: Gutachter'), value: 'surveyors' },
                            { label: tr('Network: Major Loss', 'Netzwerk: Major Loss'), value: 'major-loss' },
                            { label: tr('Network: Parts', 'Netzwerk: Teile'), value: 'parts' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Network selected: ${opt.value}`, `Netzwerk gewählt: ${opt.value}`))
                              setPartial({ network: opt.value as OverviewState['network'], selectedPartner: '' })
                              nav('/demo-partners/overview/step/selection')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'selection' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Select partner based on SLA and proximity.', 'Partner nach SLA und Nähe wählen.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {partnerOptions.map((partner) => (
                            <button key={partner} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Partner selected: ${partner}`, `Partner gewählt: ${partner}`))
                              setPartial({ selectedPartner: partner })
                              nav('/demo-partners/overview/step/data-pack')
                            }}>{partner}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'data-pack' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Pull calculations + claim info first; request report if needed.', 'Zuerst Kalkulationen + Claim Info ziehen; Report bei Bedarf.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: tr('Request: Calculations', 'Anfordern: Kalkulationen'), value: 'calc' },
                            { label: tr('Request: Gutachten/Report', 'Anfordern: Gutachten/Report'), value: 'report' },
                            { label: tr('Request: Claim info', 'Anfordern: Claim Info'), value: 'claim' },
                            { label: tr('Request: Full pack', 'Anfordern: Vollpaket'), value: 'all' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, tr(`Data pack requested: ${opt.value}`, `Datenpaket angefordert: ${opt.value}`))
                              setPartial({ dataPack: opt.value as OverviewState['dataPack'] })
                              nav('/demo-partners/overview/step/lock')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                          <div className="text-muted">{tr('Network', 'Netzwerk')}: {networkLabel(state.network)}</div>
                          <div className="text-muted">{tr('Partner', 'Partner')}: {state.selectedPartner || '—'}</div>
                          <div className="text-muted">{tr('Pack', 'Paket')}: {dataPackLabel(state.dataPack)}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Partner overview locked', 'Partner Overview gesperrt'))
                            setPartial({ locked: true })
                            nav('/demo-partners/overview')
                          }}>{tr('Lock selection', 'Auswahl sperren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/overview')}>
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
                        onClick={() => nav(`/demo-partners/overview/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: network + partner + data pack', 'Entscheidet: Netzwerk + Partner + Datenpaket')}</div>
                  <div>{tr('Accountable: access discipline', 'Verantwortlich: Zugriffsdiziplin')}</div>

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
