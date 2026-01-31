import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_LEGAL_CLAIMS_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_CLAIMS_AUDIT'

type StepId = 'intake' | 'liability' | 'strategy' | 'settlement' | 'lock'

type ClaimsLegalState = {
  caseId: string
  claimant: string
  insured: string
  venue: string
  exposure: number
  evidenceStrength: 'low' | 'medium' | 'high'
  strategy: 'pending' | 'defend' | 'settle' | 'mediate'
  counselEngaged: boolean
  settlementRange: 'none' | 'low' | 'mid' | 'high'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): ClaimsLegalState {
  return {
    caseId: 'LGL-LIT-90211',
    claimant: 'Stadtwerke München',
    insured: 'Nordstadt Logistics GmbH',
    venue: 'Munich',
    exposure: 250000,
    evidenceStrength: 'medium',
    strategy: 'pending',
    counselEngaged: false,
    settlementRange: 'none',
    decisionLocked: false,
  }
}

function readState(): ClaimsLegalState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: ClaimsLegalState) {
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

export default function DemoLegalClaimsStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Litigation intake', 'Litigation-Intake'), subtitle: tr('Review liability trigger', 'Haftungsauslöser prüfen') },
    { id: 'liability', title: tr('Liability assessment', 'Haftungsbewertung'), subtitle: tr('Evidence strength check', 'Evidenzstärke prüfen') },
    { id: 'strategy', title: tr('Strategy selection', 'Strategieauswahl'), subtitle: tr('Defend, mediate, or settle', 'Verteidigen, mediieren oder vergleichen') },
    { id: 'settlement', title: tr('Settlement posture', 'Settlement-Position'), subtitle: tr('Set settlement range', 'Settlement-Range festlegen') },
    { id: 'lock', title: tr('Decision lock', 'Entscheidung fixieren'), subtitle: tr('Record litigation posture', 'Litigation-Position dokumentieren') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])

  const [state, setState] = useState<ClaimsLegalState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-legal/claims/step/intake" replace />
  const stepIndex = STEPS_LOCAL.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<ClaimsLegalState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-legal/claims/step/${next}`)
  }

  const snapshotBadges = [
    { label: `${tr('Evidence', 'Evidenz')}: ${tr(state.evidenceStrength, state.evidenceStrength === 'low' ? 'niedrig' : state.evidenceStrength === 'medium' ? 'mittel' : 'hoch')}`, ok: true },
    { label: `${tr('Strategy', 'Strategie')}: ${state.strategy === 'pending' ? tr('Pending', 'Offen') : tr(state.strategy, state.strategy === 'defend' ? 'verteidigen' : state.strategy === 'mediate' ? 'mediieren' : 'vergleichen')}`, ok: state.strategy !== 'pending' },
    { label: tr('Counsel engaged', 'Counsel beauftragt'), ok: state.counselEngaged },
    { label: `${tr('Settlement', 'Settlement')}: ${state.settlementRange === 'none' ? tr('None', 'Keine') : state.settlementRange === 'low' ? tr('Low', 'Niedrig') : state.settlementRange === 'mid' ? tr('Mid', 'Mittel') : tr('High', 'Hoch')}`, ok: state.settlementRange !== 'none' },
    { label: tr('Locked', 'Gesperrt'), ok: state.decisionLocked },
  ]
  const auditItems = readAudit()

  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'liability') return true
    if (stepId === 'strategy') return state.strategy !== 'pending'
    if (stepId === 'settlement') return true
    if (stepId === 'lock') return true
    return false
  })()

  const aiStrategy = state.evidenceStrength === 'high'
    ? tr('Defend with strong evidence; avoid early settlement.', 'Mit starker Evidenz verteidigen; frühen Vergleich vermeiden.')
    : state.evidenceStrength === 'low'
      ? tr('Recommend early settlement to reduce cost risk.', 'Frühen Vergleich empfehlen, um Kostenrisiko zu reduzieren.')
      : tr('Liability uncertain; consider early mediation.', 'Haftung unklar; frühe Mediation erwägen.')

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('LEGAL DEMO', 'LEGAL-DEMO')}</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/claims')}>
                    {tr('Restart', 'Neu starten')}
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
                      <span>{tr('Step', 'Schritt')} {stepIndex + 1}/{STEPS_LOCAL.length} · {tr('litigation review', 'Litigation-Review')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Claims Legal', 'Claims Legal')}</span>
                  </div>

                  <div className="uw-decision-body">
                    {(stepId === 'intake') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k={tr('Case ID', 'Fall-ID')} v={state.caseId} />
                            <Kv k={tr('Claimant', 'Anspruchsteller')} v={state.claimant} />
                            <Kv k={tr('Insured', 'Versicherungsnehmer')} v={state.insured} />
                            <Kv k={tr('Venue', 'Gerichtsstand')} v={state.venue} />
                            <Kv k={tr('Exposure', 'Exponierung')} v={<span className="badge bg-azure-lt">€ {state.exposure.toLocaleString()}</span>} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI note', 'KI-Hinweis')}</div>
                          <div className="uw-admin-small">{tr('Exposure moderate; evidence medium; recommend evaluate defend vs mediate.', 'Exponierung moderat; Evidenz mittel; Verteidigen vs. Mediation prüfen.')}</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Claims Legal received litigation referral', 'Claims Legal hat Litigation-Weiterleitung erhalten'))
                              goTo('liability')
                            }}
                          >
                            {tr('Review liability', 'Haftung prüfen')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'liability') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Liability factors', 'Haftungsfaktoren')}</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Duty', 'Pflicht')}</li>
                            <li>{tr('Breach', 'Pflichtverletzung')}</li>
                            <li>{tr('Causation', 'Kausalität')}</li>
                            <li>{tr('Damages', 'Schaden')}</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">{tr('Liability uncertain; pursue early mediation if costs escalate.', 'Haftung unklar; frühe Mediation prüfen, wenn Kosten steigen.')}</div>
                        </div>
                        <div className="uw-cta-row">
                          {(['high', 'medium', 'low'] as const).map((level) => (
                            <button
                              key={level}
                              className={level === 'medium' ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                              onClick={() => {
                                appendAudit(tr(`Evidence strength set: ${level}`, `Evidenzstärke gesetzt: ${level === 'high' ? 'hoch' : level === 'medium' ? 'mittel' : 'niedrig'}`))
                                setPartial({ evidenceStrength: level })
                                goTo('strategy')
                              }}
                            >
                              {tr('Mark evidence', 'Evidenz markieren')}: {tr(level.charAt(0).toUpperCase() + level.slice(1), level === 'high' ? 'Hoch' : level === 'medium' ? 'Mittel' : 'Niedrig')}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {(stepId === 'strategy') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Cost & risk levers', 'Kosten- & Risikotreiber')}</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Defense cost', 'Verteidigungskosten')}</li>
                            <li>{tr('Adverse PR', 'Negative PR')}</li>
                            <li>{tr('Precedent risk', 'Präzedenzrisiko')}</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">{aiStrategy}</div>
                        </div>
                        <div className="uw-cta-row">
                          {([
                            { label: tr('Strategy: Defend', 'Strategie: Verteidigen'), value: 'defend' },
                            { label: tr('Strategy: Mediate', 'Strategie: Mediation'), value: 'mediate' },
                            { label: tr('Strategy: Settle', 'Strategie: Vergleich'), value: 'settle' },
                          ] as const).map((item) => (
                            <button
                              key={item.value}
                              className={item.value === 'mediate' ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                              onClick={() => {
                                appendAudit(tr(`Strategy set: ${item.value}`, `Strategie gesetzt: ${item.value === 'defend' ? 'verteidigen' : item.value === 'mediate' ? 'mediieren' : 'vergleichen'}`))
                                setPartial({ strategy: item.value })
                                goTo('settlement')
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className={`btn ${state.counselEngaged ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => {
                              appendAudit(state.counselEngaged ? tr('External counsel removed', 'Externer Counsel entfernt') : tr('External counsel engaged', 'Externer Counsel beauftragt'))
                              setPartial({ counselEngaged: !state.counselEngaged })
                            }}
                          >
                            {state.counselEngaged ? tr('Counsel engaged', 'Counsel beauftragt') : tr('Engage external counsel', 'Externen Counsel beauftragen')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'settlement') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Settlement posture', 'Settlement-Position')}</div>
                          <div className="uw-admin-small">{tr('Guidance aligned to exposure and evidence strength.', 'Leitlinie abgestimmt auf Exponierung und Evidenzstärke.')}</div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI note', 'KI-Hinweis')}</div>
                          <div className="uw-admin-small">
                            {state.evidenceStrength === 'high'
                              ? tr('Suggest low range or no settlement offer.', 'Niedrige Range oder kein Angebot vorschlagen.')
                              : state.evidenceStrength === 'low'
                                ? tr('Suggest mid-to-high range to cap risk.', 'Mittlere bis hohe Range vorschlagen, um Risiko zu begrenzen.')
                                : tr('Suggest mid range for cost control.', 'Mittlere Range zur Kostenkontrolle vorschlagen.')}
                          </div>
                        </div>
                        <div className="uw-cta-row">
                          {([
                            { label: tr('Set range: Low', 'Range setzen: Niedrig'), value: 'low' },
                            { label: tr('Set range: Mid', 'Range setzen: Mittel'), value: 'mid' },
                            { label: tr('Set range: High', 'Range setzen: Hoch'), value: 'high' },
                          ] as const).map((item) => (
                            <button
                              key={item.value}
                              className={item.value === 'mid' ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                              onClick={() => {
                                appendAudit(tr(`Settlement range set: ${item.value}`, `Settlement-Range gesetzt: ${item.value === 'low' ? 'niedrig' : item.value === 'mid' ? 'mittel' : 'hoch'}`))
                                setPartial({ settlementRange: item.value })
                                goTo('lock')
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('No settlement offer', 'Kein Settlement-Angebot'))
                              setPartial({ settlementRange: 'none' })
                              goTo('lock')
                            }}
                          >
                            {tr('No settlement offer', 'Kein Settlement-Angebot')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'lock') && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{tr('Decision summary', 'Entscheidungszusammenfassung')}</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Evidence', 'Evidenz')} v={tr(state.evidenceStrength, state.evidenceStrength === 'low' ? 'niedrig' : state.evidenceStrength === 'medium' ? 'mittel' : 'hoch')} />
                            <Kv k={tr('Strategy', 'Strategie')} v={state.strategy === 'pending' ? tr('Pending', 'Offen') : tr(state.strategy, state.strategy === 'defend' ? 'verteidigen' : state.strategy === 'mediate' ? 'mediieren' : 'vergleichen')} />
                            <Kv k={tr('Counsel', 'Counsel')} v={state.counselEngaged ? tr('Engaged', 'Beauftragt') : tr('Not engaged', 'Nicht beauftragt')} />
                            <Kv k={tr('Settlement', 'Settlement')} v={state.settlementRange === 'none' ? tr('None', 'Keine') : state.settlementRange === 'low' ? tr('Low', 'Niedrig') : state.settlementRange === 'mid' ? tr('Mid', 'Mittel') : tr('High', 'Hoch')} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI audit note', 'KI-Audit-Hinweis')}</div>
                          <div className="uw-admin-small">{tr('Decision consistent with evidence strength and cost controls.', 'Entscheidung konsistent mit Evidenzstärke und Kostenkontrollen.')}</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Legal decision locked (litigation posture recorded)', 'Legal-Entscheidung gesperrt (Litigation-Position erfasst)'))
                              setPartial({ decisionLocked: true })
                              nav('/demo-legal/claims')
                            }}
                          >
                            {tr('Lock legal decision', 'Legal-Entscheidung sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/claims')}>
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
                    <h4>{tr('AI & Accountability', 'KI & Verantwortung')}</h4>
                    <div className="uw-admin-small">
                      <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('litigation strategy & settlement path', 'Litigation-Strategie & Settlement-Pfad')}</div>
                      <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('legal risk & cost containment', 'rechtliches Risiko & Kostenkontrolle')}</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>{tr('Strategy based on evidence strength', 'Strategie basiert auf Evidenzstärke')}</li>
                      <li>{tr('Settlement range aligned to exposure', 'Settlement-Range an Exponierung ausgerichtet')}</li>
                      <li>{tr('Counsel engagement recorded', 'Counsel-Beauftragung erfasst')}</li>
                      <li>{tr('Decision locked with audit trail', 'Entscheidung mit Audit-Trail gesperrt')}</li>
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
                      {auditItems.length === 0 ? (
                        <div className="uw-admin-small">{tr('No entries yet.', 'Noch keine Einträge.')}</div>
                      ) : (
                        auditItems.slice(0, 8).map((it) => (
                          <div className="uw-audit-item" key={it.ts}>
                            <div className="ts">{fmt(it.ts)}</div>
                            <div className="msg">{it.message}</div>
                          </div>
                        ))
                      )}
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
