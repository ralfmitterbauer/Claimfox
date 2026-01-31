import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_UW_CARRIER_STATE'
const KEY_AUDIT = 'DEMO_UW_CARRIER_AUDIT'

type StepId = 'handover' | 'capacity' | 'limits' | 'compliance' | 'final'

type CarrierAuthorityState = {
  caseId: string
  insured: string
  product: string
  requestedLimit: number
  capacityAvailable: number
  capacityConfirmed: boolean
  limitApproved: boolean
  complianceChecked: boolean
  decision: 'pending' | 'approve' | 'restrict' | 'decline'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): CarrierAuthorityState {
  return {
    caseId: 'UW-CAR-77104',
    insured: 'Nordbahn Freight AG',
    product: 'Fleet Liability + Cargo Extension',
    requestedLimit: 20,
    capacityAvailable: 28,
    capacityConfirmed: false,
    limitApproved: false,
    complianceChecked: false,
    decision: 'pending',
    decisionLocked: false,
  }
}

function readState(): CarrierAuthorityState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: CarrierAuthorityState) {
  sessionStorage.setItem(KEY_STATE, JSON.stringify(next))
}
function readAudit(): AuditItem[] {
  try {
    const raw = sessionStorage.getItem(KEY_AUDIT)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
function appendAudit(message: string) {
  const list = readAudit()
  list.unshift({ ts: nowTs(), message })
  sessionStorage.setItem(KEY_AUDIT, JSON.stringify(list))
}

function Kv({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <>
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </>
  )
}

function money(n: number, isEn: boolean) {
  return isEn ? `€ ${n} M` : `€ ${n} Mio.`
}

export default function DemoCarrierAuthorityStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'handover', title: tr('Escalation handover', 'Eskalations-Übergabe'), subtitle: tr('Review escalation summary', 'Eskalationszusammenfassung prüfen') },
    { id: 'capacity', title: tr('Capacity check', 'Kapazitätsprüfung'), subtitle: tr('Confirm carrier capacity', 'Carrier-Kapazität bestätigen') },
    { id: 'limits', title: tr('Limit approval', 'Limitfreigabe'), subtitle: tr('Approve full or reduced limit', 'Volles oder reduziertes Limit freigeben') },
    { id: 'compliance', title: tr('Compliance check', 'Compliance-Prüfung'), subtitle: tr('Regulatory checklist review', 'Regulatorische Checkliste prüfen') },
    { id: 'final', title: tr('Final decision', 'Finale Entscheidung'), subtitle: tr('Lock capacity & limits', 'Kapazität & Limits sperren') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])

  const [state, setState] = useState<CarrierAuthorityState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-underwriter/carrier/step/handover" replace />
  const stepIndex = STEPS_LOCAL.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<CarrierAuthorityState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-underwriter/carrier/step/${next}`)
  }

  const snapshotBadges = [
    { label: tr('Capacity Confirmed', 'Kapazität bestätigt'), ok: state.capacityConfirmed },
    { label: tr('Limit Approved', 'Limit freigegeben'), ok: state.limitApproved },
    { label: tr('Compliance Checked', 'Compliance geprüft'), ok: state.complianceChecked },
    { label: tr('Decision Locked', 'Entscheidung gesperrt'), ok: state.decisionLocked },
  ]

  const canGoNext = (() => {
    if (stepId === 'handover') return true
    if (stepId === 'capacity') return state.capacityConfirmed || state.decision === 'restrict'
    if (stepId === 'limits') return state.limitApproved || state.decision === 'restrict' || state.decision === 'decline'
    if (stepId === 'compliance') return state.complianceChecked
    if (stepId === 'final') return true
    return false
  })()

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('UNDERWRITER DEMO', 'UNDERWRITER DEMO')}</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/carrier')}>
                    {tr('Restart', 'Neustart')}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => goTo(STEPS_LOCAL[Math.max(0, stepIndex - 1)].id)}
                    disabled={stepIndex === 0}
                  >
                    {tr('Back', 'Zurück')}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => goTo(STEPS_LOCAL[Math.min(STEPS_LOCAL.length - 1, stepIndex + 1)].id)}
                    disabled={!canGoNext || stepIndex === STEPS_LOCAL.length - 1}
                  >
                    {tr('Next', 'Weiter')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="uw-shell">
              <div className="uw-left">
                <div className="uw-decision uw-fade-in">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{current.title}</strong>
                      <span>{tr('Step', 'Schritt')} {stepIndex + 1}/{STEPS_LOCAL.length} · {tr('one decision', 'eine Entscheidung')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Carrier Authority', 'Carrier Authority')}</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <Kv k={tr('Case ID', 'Fall-ID')} v={state.caseId} />
                        <Kv k={tr('Insured', 'Versicherter')} v={state.insured} />
                        <Kv k={tr('Product', 'Produkt')} v={tr('Fleet Liability + Cargo Extension', 'Flottenhaftpflicht + Fracht-Erweiterung')} />
                        <Kv k={tr('Requested limit', 'Angefragtes Limit')} v={<span className="badge bg-azure-lt">{money(state.requestedLimit, isEn)}</span>} />
                        <Kv k={tr('Capacity available', 'Verfügbare Kapazität')} v={<span className="badge bg-azure-lt">{money(state.capacityAvailable, isEn)}</span>} />
                      </div>
                    </div>

                    {stepId === 'handover' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI escalation summary', 'KI-Eskalationszusammenfassung')}</div>
                          <div className="uw-admin-small">
                            {tr('Senior UW escalated due to override requirements and concentration guardrails.', 'Senior UW hat wegen Override-Anforderungen und Konzentrations-Leitplanken eskaliert.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Reason', 'Grund')} v={tr('Limit exceeds senior authority, portfolio concentration check required', 'Limit überschreitet Senior-Autorität, Portfolio-Konzentrationsprüfung erforderlich')} />
                            <Kv k={tr('AI note', 'KI-Hinweis')} v={tr('Capacity sufficient but concentrated; compliance clear', 'Kapazität ausreichend aber konzentriert; Compliance unauffällig')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Carrier Authority received escalation', 'Carrier Authority erhielt Eskalation'))
                              goTo('capacity')
                            }}
                          >
                            {tr('Review capacity', 'Kapazität prüfen')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'capacity' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Capacity assessment', 'Kapazitätsbewertung')}</div>
                          <div className="uw-admin-small">
                            {tr('AI flags concentration risk but indicates overall capacity suffices.', 'KI markiert Konzentrationsrisiko, insgesamt reicht die Kapazität.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Capacity', 'Kapazität')} v={<span className="badge bg-green-lt">{tr('Sufficient', 'Ausreichend')}</span>} />
                            <Kv k={tr('Concentration', 'Konzentration')} v={<span className="badge bg-yellow-lt">{tr('Elevated', 'Erhöht')}</span>} />
                            <Kv k={tr('Recommendation', 'Empfehlung')} v={tr('Confirm capacity or restrict exposure', 'Kapazität bestätigen oder Exponierung begrenzen')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Capacity confirmed (sufficient)', 'Kapazität bestätigt (ausreichend)'))
                              setPartial({ capacityConfirmed: true })
                              goTo('limits')
                            }}
                          >
                            {tr('Confirm capacity', 'Kapazität bestätigen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Capacity restricted (exposure limited)', 'Kapazität begrenzt (Exponierung limitiert)'))
                              setPartial({ decision: 'restrict' })
                              goTo('limits')
                            }}
                          >
                            {tr('Restrict exposure', 'Exponierung begrenzen')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'limits' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Limit recommendation', 'Limit-Empfehlung')}</div>
                          <div className="uw-admin-small">
                            {tr('AI recommends a full limit approval if capacity confirmed, otherwise reduce limit.', 'KI empfiehlt volle Limitfreigabe bei bestätigter Kapazität, sonst Limit reduzieren.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Requested', 'Angefragt')} v={<span className="badge bg-azure-lt">{money(state.requestedLimit, isEn)}</span>} />
                            <Kv k={tr('Suggested', 'Vorgeschlagen')} v={<span className="badge bg-azure-lt">{money(state.requestedLimit - 4, isEn)}</span>} />
                            <Kv k={tr('Why', 'Warum')} v={tr('Reduce tail exposure while staying within appetite', 'Tail-Exposure reduzieren und im Appetite bleiben')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Full limit approved', 'Volles Limit freigegeben'))
                              setPartial({ limitApproved: true, decision: 'approve' })
                              goTo('compliance')
                            }}
                          >
                            {tr('Approve full limit', 'Volles Limit freigeben')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Reduced limit approved', 'Reduziertes Limit freigegeben'))
                              setPartial({ limitApproved: true, decision: 'restrict' })
                              goTo('compliance')
                            }}
                          >
                            {tr('Approve reduced limit', 'Reduziertes Limit freigeben')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'compliance' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Regulatory checklist', 'Regulatorische Checkliste')}</div>
                          <div className="uw-admin-small">{tr('No regulatory conflicts detected.', 'Keine regulatorischen Konflikte erkannt.')}</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Sanctions', 'Sanktionen')} v={<span className="badge bg-green-lt">{tr('Clear', 'Unauffällig')}</span>} />
                            <Kv k={tr('Jurisdiction', 'Jurisdiktion')} v={<span className="badge bg-green-lt">{tr('Compliant', 'Konform')}</span>} />
                            <Kv k={tr('Documentation', 'Dokumentation')} v={<span className="badge bg-green-lt">{tr('Complete', 'Vollständig')}</span>} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Compliance confirmed', 'Compliance bestätigt'))
                              setPartial({ complianceChecked: true })
                              goTo('final')
                            }}
                          >
                            {tr('Confirm compliance', 'Compliance bestätigen')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'final' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{tr('Decision summary', 'Entscheidungsübersicht')}</div>
                          <div className="uw-admin-small">
                            {tr('This decision locks final capacity and limit approval.', 'Diese Entscheidung sperrt die finale Kapazitäts- und Limitfreigabe.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Decision', 'Entscheidung')} v={<span className="badge bg-indigo-lt">{state.decision === 'restrict' ? tr('Approve reduced limit', 'Reduziertes Limit freigeben') : state.decision === 'approve' ? tr('Approve full limit', 'Volles Limit freigeben') : tr('Pending', 'Ausstehend')}</span>} />
                            <Kv k={tr('Capacity', 'Kapazität')} v={<span className={`badge ${state.capacityConfirmed ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.capacityConfirmed ? tr('Confirmed', 'Bestätigt') : tr('Pending', 'Ausstehend')}</span>} />
                            <Kv k={tr('Compliance', 'Compliance')} v={<span className={`badge ${state.complianceChecked ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.complianceChecked ? tr('Checked', 'Geprüft') : tr('Pending', 'Ausstehend')}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI audit note', 'KI-Audit-Hinweis')}</div>
                          <div className="uw-admin-small">
                            {tr('AI records why this capacity/limit decision is safe and compliant.', 'KI dokumentiert, warum die Kapazitäts-/Limitentscheidung sicher und konform ist.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Rationale stored', 'Begründung gespeichert')} v={tr('Capacity available, concentration mitigated, compliance clear', 'Kapazität verfügbar, Konzentration mitigiert, Compliance unauffällig')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              if (!state.decisionLocked) {
                                appendAudit(tr('Decision locked (audit-ready)', 'Entscheidung gesperrt (audit-ready)'))
                                setPartial({ decisionLocked: true })
                              }
                              nav('/demo-underwriter/carrier')
                            }}
                          >
                            {tr('Lock decision', 'Entscheidung sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/carrier')}>
                            {tr('Restart demo', 'Demo neu starten')}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>{tr('Step navigation', 'Schritt-Navigation')}</h4>
                  <div className="list-group list-group-flush">
                    {STEPS_LOCAL.map((s, idx) => {
                      const active = s.id === stepId
                      return (
                        <button
                          key={s.id}
                          className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${active ? 'active' : ''}`}
                          onClick={() => goTo(s.id)}
                          type="button"
                        >
                          <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span className="badge bg-indigo-lt">{idx + 1}</span>
                            <span>{s.title}</span>
                          </span>
                          {active ? <span className="badge bg-white text-indigo">{tr('Current', 'Aktuell')}</span> : <span className="badge bg-indigo-lt">{tr('Open', 'Offen')}</span>}
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('AI & Accountability', 'KI & Verantwortlichkeit')}</h4>
                    <div className="uw-admin-small">
                      <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('final capacity & limits', 'finale Kapazität & Limits')}</div>
                      <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('risk bearing & regulatory compliance', 'Risikotragung & regulatorische Compliance')}</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>{tr('AI summarizes escalation rationale', 'KI fasst Eskalationsbegründung zusammen')}</li>
                      <li>{tr('Capacity review checks concentration', 'Kapazitätsprüfung prüft Konzentration')}</li>
                      <li>{tr('Limit approval sets final exposure', 'Limitfreigabe setzt finales Exposure')}</li>
                      <li>{tr('Compliance must be confirmed before lock', 'Compliance muss vor Sperre bestätigt sein')}</li>
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('Snapshot', 'Snapshot')}</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {snapshotBadges.map((b) => (
                        <span key={b.label} className={`badge ${b.ok ? 'bg-green-lt' : 'bg-muted-lt'}`}>
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('Audit log', 'Audit-Log')}</h4>
                    <div className="uw-audit">
                      {(() => {
                        const items = readAudit()
                        if (!items.length) return <div className="uw-admin-small">{tr('No entries yet.', 'Noch keine Einträge.')}</div>
                        return items.slice(0, 8).map((it) => (
                          <div className="uw-audit-item" key={it.ts}>
                            <div className="ts">{fmt(it.ts)}</div>
                            <div className="msg">{it.message}</div>
                          </div>
                        ))
                      })()}
                    </div>
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
