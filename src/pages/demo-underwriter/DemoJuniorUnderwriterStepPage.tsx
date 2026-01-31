import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_UW_JUNIOR_STATE'
const KEY_AUDIT = 'DEMO_UW_JUNIOR_AUDIT'

type StepId = 'intake' | 'evidence' | 'recommendation' | 'sla' | 'confirm'

type JuniorUwState = {
  caseId: string
  insured: string
  product: string
  corridorInside: boolean
  evidenceOk: boolean
  recommendationShown: boolean
  approved: boolean
  slaOk: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): JuniorUwState {
  return {
    caseId: 'UW-REF-10421',
    insured: 'Atlas Logistics GmbH',
    product: 'Commercial Auto Liability',
    corridorInside: true,
    evidenceOk: true,
    recommendationShown: false,
    approved: false,
    slaOk: false,
  }
}

function readState(): JuniorUwState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: JuniorUwState) {
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

export default function DemoJuniorUnderwriterStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Case intake', 'Fallannahme'), subtitle: tr('Confirm corridor fit', 'Korridor-Fit bestätigen') },
    { id: 'evidence', title: tr('Evidence check', 'Evidenzprüfung'), subtitle: tr('Validate completeness & red flags', 'Vollständigkeit & Red Flags prüfen') },
    { id: 'recommendation', title: tr('AI recommendation', 'KI-Empfehlung'), subtitle: tr('Approve under standard terms', 'Freigabe zu Standardkonditionen') },
    { id: 'sla', title: tr('SLA confirmation', 'SLA-Bestätigung'), subtitle: tr('Confirm decision in time', 'Entscheidung rechtzeitig bestätigen') },
    { id: 'confirm', title: tr('Final confirmation', 'Finale Bestätigung'), subtitle: tr('Record approval (audit-ready)', 'Freigabe dokumentieren (audit-ready)') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])

  const [state, setState] = useState<JuniorUwState>(() => readState())

  // Ensure defaults on deep link
  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-underwriter/junior/step/intake" replace />

  const stepIndex = STEPS_LOCAL.findIndex((s) => s.id === stepId)

  const canGoNext = (() => {
    if (stepId === 'intake') return state.corridorInside
    if (stepId === 'evidence') return state.evidenceOk
    if (stepId === 'recommendation') return state.recommendationShown
    if (stepId === 'sla') return state.slaOk
    if (stepId === 'confirm') return true
    return false
  })()

  function goTo(next: StepId) {
    nav(`/demo-underwriter/junior/step/${next}`)
  }

  function setPartial(p: Partial<JuniorUwState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  const snapshotBadges = [
    { label: tr('Inside corridor', 'Im Korridor'), ok: state.corridorInside },
    { label: tr('Evidence ok', 'Evidenz ok'), ok: state.evidenceOk },
    { label: tr('Approved', 'Freigegeben'), ok: state.approved },
    { label: tr('SLA ok', 'SLA ok'), ok: state.slaOk },
  ]

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/junior')}>
                    {tr('Restart', 'Neustart')}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      const prev = STEPS_LOCAL[Math.max(0, stepIndex - 1)].id
                      goTo(prev)
                    }}
                    disabled={stepIndex === 0}
                  >
                    {tr('Back', 'Zurück')}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const next = STEPS_LOCAL[Math.min(STEPS_LOCAL.length - 1, stepIndex + 1)].id
                      goTo(next)
                    }}
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
              {/* LEFT */}
              <div className="uw-left">
                <div className="uw-decision uw-fade-in">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{current.title}</strong>
                    <span>{tr('Step', 'Schritt')} {stepIndex + 1}/{STEPS_LOCAL.length} · {tr('one decision', 'eine Entscheidung')}</span>
                  </div>
                    <span className="badge bg-blue-lt">{tr('Junior UW', 'Junior UW')}</span>
                  </div>

                  <div className="uw-decision-body">
                    {/* Case context */}
                    <div className="uw-block">
                      <div className="uw-kv">
                        <Kv k={tr('Case ID', 'Fall-ID')} v={state.caseId} />
                        <Kv k={tr('Insured', 'Versicherter')} v={state.insured} />
                        <Kv k={tr('Product', 'Produkt')} v={tr('Commercial Auto Liability', 'Gewerbliche Kfz-Haftpflicht')} />
                        <Kv k={tr('AI risk score', 'KI-Risikoscore')} v={<span className="badge bg-azure-lt">42 / 100</span>} />
                      </div>
                    </div>

                    {/* Step-specific decision content */}
                    {stepId === 'intake' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">
                            {tr('Corridor fit is evaluated against appetite rules and historical loss patterns.', 'Der Korridor-Fit wird gegen Appetite-Regeln und historische Schadensmuster geprüft.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Corridor', 'Korridor')} v={<span className="badge bg-green-lt">{tr('Inside appetite', 'Im Appetite')}</span>} />
                            <Kv k={tr('Reason', 'Begründung')} v={tr('Loss ratio forecast within corridor threshold', 'Schadenquote-Prognose innerhalb des Korridors')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Corridor fit confirmed (inside appetite)', 'Korridor-Fit bestätigt (im Appetite)'))
                              setPartial({ corridorInside: true })
                              goTo('evidence')
                            }}
                          >
                            {tr('Confirm corridor fit', 'Korridor-Fit bestätigen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Clarification requested (corridor rules)', 'Klärung angefordert (Korridor-Regeln)'))
                              // keep state but show as “needs review” by disabling next until confirmed
                              setPartial({ corridorInside: false })
                            }}
                          >
                            {tr('Request clarification', 'Klärung anfordern')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'evidence' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI evidence check', 'KI-Evidenzprüfung')}</div>
                          <div className="uw-admin-small">
                            {tr('Evidence completeness and red-flag signals are validated before you approve.', 'Vollständigkeit der Evidenz und Red-Flag-Signale werden vor der Freigabe geprüft.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Completeness', 'Vollständigkeit')} v={<span className="badge bg-green-lt">96%</span>} />
                            <Kv k={tr('Red flags', 'Red Flags')} v={<span className="badge bg-green-lt">{tr('None detected', 'Keine')}</span>} />
                            <Kv k={tr('Missing', 'Fehlt')} v={tr('None', 'Keine')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Evidence validated (complete, no red flags)', 'Evidenz bestätigt (vollständig, keine Red Flags)'))
                              setPartial({ evidenceOk: true })
                              goTo('recommendation')
                            }}
                          >
                            {tr('Accept evidence quality', 'Evidenzqualität akzeptieren')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Evidence flagged (manual clarification needed)', 'Evidenz markiert (manuelle Klärung nötig)'))
                              setPartial({ evidenceOk: false })
                            }}
                          >
                            {tr('Flag missing evidence', 'Fehlende Evidenz markieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'recommendation' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation (non-binding)', 'KI-Empfehlung (unverbindlich)')}</div>
                          <div className="uw-admin-small">
                            {tr('AI proposes a standard approval when corridor + evidence are OK.', 'KI schlägt eine Standardfreigabe vor, wenn Korridor + Evidenz ok sind.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Suggested decision', 'Vorgeschlagene Entscheidung')} v={<span className="badge bg-green-lt">{tr('Approve', 'Freigeben')}</span>} />
                            <Kv k={tr('Terms', 'Konditionen')} v={tr('Standard terms (no override)', 'Standardkonditionen (kein Override)')} />
                            <Kv k={tr('Why', 'Warum')} v={tr('Comparable accounts show stable frequency; severity capped by limits', 'Vergleichbare Risiken stabil; Schwere durch Limits gedeckelt')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('AI recommendation reviewed (approve under standard terms)', 'KI-Empfehlung geprüft (Freigabe Standardkonditionen)'))
                              setPartial({ recommendationShown: true, approved: true })
                              goTo('sla')
                            }}
                          >
                            {tr('Approve under standard terms', 'Zu Standardkonditionen freigeben')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Clarification requested (pricing/rationale)', 'Klärung angefordert (Pricing/Begründung)'))
                              setPartial({ recommendationShown: false, approved: false })
                            }}
                          >
                            {tr('Request clarification', 'Klärung anfordern')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'sla' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('SLA guardrail', 'SLA-Leitplanke')}</div>
                          <div className="uw-admin-small">
                            {tr('Junior UW is accountable for timely decisions when corridor approvals are eligible.', 'Junior UW ist verantwortlich für zeitnahe Entscheidungen bei Korridor-Freigaben.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('SLA remaining', 'SLA verbleibend')} v={<span className="badge bg-azure-lt">2h 03m</span>} />
                            <Kv k={tr('Status', 'Status')} v={<span className="badge bg-green-lt">{tr('Within SLA', 'Innerhalb SLA')}</span>} />
                            <Kv k={tr('Next', 'Nächster Schritt')} v={tr('Confirm and record approval', 'Freigabe bestätigen & dokumentieren')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('SLA confirmed (decision within SLA)', 'SLA bestätigt (Entscheidung innerhalb SLA)'))
                              setPartial({ slaOk: true })
                              goTo('confirm')
                            }}
                          >
                            {tr('Confirm SLA compliance', 'SLA-Einhaltung bestätigen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('SLA risk flagged (manual review)', 'SLA-Risiko markiert (manuelle Prüfung)'))
                              setPartial({ slaOk: false })
                            }}
                          >
                            {tr('Flag SLA risk', 'SLA-Risiko markieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'confirm' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{tr('Decision recorded', 'Entscheidung dokumentiert')}</div>
                          <div className="uw-admin-small">
                            {tr('This is the final click: approval is locked into the audit trail.', 'Finaler Klick: Freigabe wird im Audit-Trail gesperrt.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Decision', 'Entscheidung')} v={<span className="badge bg-green-lt">{tr('Approved', 'Freigegeben')}</span>} />
                            <Kv k={tr('Corridor', 'Korridor')} v={<span className="badge bg-green-lt">{tr('Inside', 'Innerhalb')}</span>} />
                            <Kv k={tr('Evidence', 'Evidenz')} v={<span className="badge bg-green-lt">OK</span>} />
                            <Kv k="SLA" v={<span className="badge bg-green-lt">OK</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI note', 'KI-Hinweis')}</div>
                          <div className="uw-admin-small">
                            {tr('AI stores decision rationale for traceability. Human remains accountable.', 'KI speichert die Entscheidungsbegründung. Verantwortung bleibt beim Menschen.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Rationale stored', 'Begründung gespeichert')} v={tr('Corridor fit + evidence completeness + SLA compliance', 'Korridor-Fit + Evidenz-Vollständigkeit + SLA-Einhaltung')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Approval locked (audit-ready)', 'Freigabe gesperrt (audit-ready)'))
                              nav('/demo-underwriter/junior')
                            }}
                          >
                            {tr('Finish & restart', 'Abschließen & neu starten')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/junior')}>
                            {tr('Back to role page', 'Zurück zur Rollen-Seite')}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
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
                            <span className="badge bg-blue-lt">{idx + 1}</span>
                            <span>{s.title}</span>
                          </span>
                          {active ? <span className="badge bg-white text-blue">{tr('Current', 'Aktuell')}</span> : <span className="badge bg-blue-lt">{tr('Open', 'Offen')}</span>}
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>{tr('AI & Accountability', 'KI & Verantwortlichkeit')}</h4>
                    <div className="uw-admin-small">
                      <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('corridor approvals', 'Korridor-Freigaben')}</div>
                      <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('evidence quality & SLA adherence', 'Evidenzqualität & SLA-Einhaltung')}</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>{tr('AI validates corridor fit; you confirm', 'KI validiert Korridor-Fit; Sie bestätigen')}</li>
                      <li>{tr('AI checks evidence; you accept or flag', 'KI prüft Evidenz; Sie akzeptieren oder markieren')}</li>
                      <li>{tr('AI suggests approve; you decide', 'KI schlägt Freigabe vor; Sie entscheiden')}</li>
                      <li>{tr('SLA guardrail; you confirm compliance', 'SLA-Leitplanke; Sie bestätigen Einhaltung')}</li>
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
