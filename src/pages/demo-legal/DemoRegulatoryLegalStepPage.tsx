import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_LEGAL_REGULATORY_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_REGULATORY_AUDIT'

type StepId = 'intake' | 'materiality' | 'disclosure' | 'escalation' | 'signoff'

type RegulatoryLegalState = {
  caseId: string
  sourceRole: 'Underwriting' | 'Claims' | 'Compliance'
  insured: string
  product: string
  jurisdiction: 'DE' | 'EU'
  triggerType: 'override' | 'systemic_issue' | 'complaint' | 'incident'
  materialityLevel: 'low' | 'medium' | 'high'
  reportable: boolean
  disclosureScope: 'none' | 'partial' | 'full'
  regulatorTarget: 'BaFin' | 'EIOPA' | 'LocalAuthority'
  escalationRequired: boolean
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): RegulatoryLegalState {
  return {
    caseId: 'REG-2024-0917',
    sourceRole: 'Underwriting',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    jurisdiction: 'DE',
    triggerType: 'override',
    materialityLevel: 'medium',
    reportable: false,
    disclosureScope: 'none',
    regulatorTarget: 'BaFin',
    escalationRequired: false,
    decisionLocked: false,
  }
}

function readState(): RegulatoryLegalState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: RegulatoryLegalState) {
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

export default function DemoRegulatoryLegalStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Regulatory intake', 'Regulatory-Intake'), subtitle: tr('Supervisory scope review', 'Aufsichts-Scope prüfen') },
    { id: 'materiality', title: tr('Materiality', 'Materialität'), subtitle: tr('Assess reporting threshold', 'Meldeschwelle bewerten') },
    { id: 'disclosure', title: tr('Disclosure', 'Offenlegung'), subtitle: tr('Define disclosure scope', 'Offenlegungsscope definieren') },
    { id: 'escalation', title: tr('Escalation', 'Eskalation'), subtitle: tr('Internal escalation decision', 'Interne Eskalation entscheiden') },
    { id: 'signoff', title: tr('Regulatory sign-off', 'Regulatory Sign-off'), subtitle: tr('Lock supervisory position', 'Aufsichtsposition fixieren') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])

  const [state, setState] = useState<RegulatoryLegalState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-legal/regulatory/step/intake" replace />
  const stepIndex = STEPS_LOCAL.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<RegulatoryLegalState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-legal/regulatory/step/${next}`)
  }

  const materialityLabel = (value: RegulatoryLegalState['materialityLevel']) => {
    switch (value) {
      case 'low':
        return tr('Low', 'Niedrig')
      case 'medium':
        return tr('Medium', 'Mittel')
      default:
        return tr('High', 'Hoch')
    }
  }
  const disclosureLabel = (value: RegulatoryLegalState['disclosureScope']) => {
    switch (value) {
      case 'none':
        return tr('None', 'Keine')
      case 'partial':
        return tr('Partial', 'Teilweise')
      default:
        return tr('Full', 'Vollständig')
    }
  }

  const snapshotBadges = [
    { label: `${tr('Materiality', 'Materialität')}: ${materialityLabel(state.materialityLevel)}`, ok: true },
    { label: `${tr('Reportable', 'Meldepflicht')}: ${state.reportable ? tr('Yes', 'Ja') : tr('No', 'Nein')}`, ok: state.reportable },
    { label: `${tr('Disclosure', 'Offenlegung')}: ${disclosureLabel(state.disclosureScope)}`, ok: state.disclosureScope !== 'none' },
    { label: tr('Escalation Required', 'Eskalation erforderlich'), ok: state.escalationRequired },
    { label: tr('Decision Locked', 'Entscheidung gesperrt'), ok: state.decisionLocked },
  ]

  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'materiality') return true
    if (stepId === 'disclosure') return true
    if (stepId === 'escalation') return true
    if (stepId === 'signoff') return true
    return false
  })()

  const disclosureHint = state.materialityLevel === 'high'
    ? tr('Full disclosure required; notify immediately.', 'Volle Offenlegung erforderlich; sofort melden.')
    : state.materialityLevel === 'medium'
      ? tr('Partial disclosure to BaFin recommended.', 'Teiloffenlegung an BaFin empfohlen.')
      : tr('No disclosure required if materiality is low.', 'Keine Offenlegung erforderlich bei niedriger Materialität.')

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/regulatory')}>
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
                      <span>{tr('Step', 'Schritt')} {stepIndex + 1}/{STEPS_LOCAL.length} · {tr('supervisory review', 'Aufsichtsprüfung')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Regulatory Legal', 'Regulatory Legal')}</span>
                  </div>

                  <div className="uw-decision-body">
                    {(stepId === 'intake') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k={tr('Case ID', 'Fall-ID')} v={state.caseId} />
                            <Kv k={tr('Source', 'Quelle')} v={tr(state.sourceRole, state.sourceRole === 'Underwriting' ? 'Underwriting' : state.sourceRole === 'Claims' ? 'Claims' : 'Compliance')} />
                            <Kv k={tr('Insured', 'Versicherungsnehmer')} v={state.insured} />
                            <Kv k={tr('Product', 'Produkt')} v={state.product} />
                            <Kv k={tr('Trigger', 'Auslöser')} v={tr(state.triggerType, state.triggerType === 'override' ? 'Override' : state.triggerType === 'systemic_issue' ? 'Systemisches Thema' : state.triggerType === 'complaint' ? 'Beschwerde' : 'Vorfall')} />
                            <Kv k={tr('Jurisdiction', 'Gerichtsstand')} v={state.jurisdiction} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI note', 'KI-Hinweis')}</div>
                          <div className="uw-admin-small">
                            {tr(
                              'Override-based underwriting decisions may trigger supervisory notification depending on materiality.',
                              'Override-basierte Underwriting-Entscheidungen können je nach Materialität eine Aufsichtsmitteilung auslösen.',
                            )}
                          </div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Regulatory reporting assessment', 'Bewertung der Meldepflicht')}</li>
                            <li>{tr('Disclosure scope definition', 'Definition des Offenlegungsscopes')}</li>
                            <li>{tr('Escalation obligation check', 'Prüfung der Eskalationspflicht')}</li>
                          </ul>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Regulatory Legal received case for supervisory assessment', 'Regulatory Legal hat Fall zur Aufsichtsprüfung erhalten'))
                              goTo('materiality')
                            }}
                          >
                            {tr('Assess materiality', 'Materialität bewerten')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'materiality') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Materiality factors', 'Materialitätsfaktoren')}</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Financial impact: Moderate', 'Finanzielle Auswirkung: Moderat')}</li>
                            <li>{tr('Systemic relevance: Low', 'Systemische Relevanz: Niedrig')}</li>
                            <li>{tr('Customer detriment risk: Medium', 'Kundennachteil-Risiko: Mittel')}</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">{tr('Materiality likely medium; reporting may be required depending on disclosure scope.', 'Materialität vermutlich mittel; Meldepflicht abhängig vom Offenlegungsscope.')}</div>
                        </div>
                        <div className="uw-cta-row">
                          {(['low', 'medium', 'high'] as const).map((level) => (
                            <button
                              key={level}
                              className={level === 'medium' ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                              onClick={() => {
                                appendAudit(tr(`Materiality set to ${level}`, `Materialität gesetzt: ${level === 'low' ? 'niedrig' : level === 'medium' ? 'mittel' : 'hoch'}`))
                                setPartial({ materialityLevel: level })
                                goTo('disclosure')
                              }}
                            >
                              {tr('Set materiality', 'Materialität setzen')}: {tr(level.charAt(0).toUpperCase() + level.slice(1), level === 'low' ? 'Niedrig' : level === 'medium' ? 'Mittel' : 'Hoch')}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {(stepId === 'disclosure') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Regulatory guidance', 'Regulatorische Leitlinie')}</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Medium materiality → selective disclosure recommended', 'Mittlere Materialität → selektive Offenlegung empfohlen')}</li>
                            <li>{tr('High materiality → mandatory notification', 'Hohe Materialität → Pflichtmeldung')}</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">{disclosureHint}</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Disclosure scope set: none', 'Offenlegungsscope gesetzt: keiner'))
                              setPartial({ disclosureScope: 'none', reportable: false })
                              goTo('escalation')
                            }}
                          >
                            {tr('No disclosure required', 'Keine Offenlegung erforderlich')}
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Disclosure scope set: partial', 'Offenlegungsscope gesetzt: teilweise'))
                              setPartial({ disclosureScope: 'partial', reportable: true })
                              goTo('escalation')
                            }}
                          >
                            {tr('Partial disclosure', 'Teiloffenlegung')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Disclosure scope set: full', 'Offenlegungsscope gesetzt: vollständig'))
                              setPartial({ disclosureScope: 'full', reportable: true })
                              goTo('escalation')
                            }}
                          >
                            {tr('Full disclosure', 'Vollständige Offenlegung')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'escalation') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Escalation rules', 'Eskalationsregeln')}</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('High materiality → CRO + Board notification', 'Hohe Materialität → CRO + Board informieren')}</li>
                            <li>{tr('Regulatory deadline risk → escalation required', 'Regulatorisches Fristrisiko → Eskalation erforderlich')}</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI note', 'KI-Hinweis')}</div>
                          <div className="uw-admin-small">{tr('Escalation ensures governance alignment before regulator contact.', 'Eskalation stellt Governance-Abstimmung vor Regulator-Kontakt sicher.')}</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Escalation set: none', 'Eskalation gesetzt: keine'))
                              setPartial({ escalationRequired: false })
                              goTo('signoff')
                            }}
                          >
                            {tr('No escalation required', 'Keine Eskalation erforderlich')}
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Escalation set: CRO', 'Eskalation gesetzt: CRO'))
                              setPartial({ escalationRequired: true })
                              goTo('signoff')
                            }}
                          >
                            {tr('Escalate to CRO', 'An CRO eskalieren')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Escalation set: Board', 'Eskalation gesetzt: Board'))
                              setPartial({ escalationRequired: true })
                              goTo('signoff')
                            }}
                          >
                            {tr('Escalate to Board', 'An Board eskalieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'signoff') && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{tr('Decision summary', 'Entscheidungszusammenfassung')}</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Materiality', 'Materialität')} v={materialityLabel(state.materialityLevel)} />
                            <Kv k={tr('Disclosure', 'Offenlegung')} v={disclosureLabel(state.disclosureScope)} />
                            <Kv k={tr('Reportable', 'Meldepflicht')} v={state.reportable ? tr('Yes', 'Ja') : tr('No', 'Nein')} />
                            <Kv k={tr('Escalation', 'Eskalation')} v={state.escalationRequired ? tr('Required', 'Erforderlich') : tr('No', 'Nein')} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI audit note', 'KI-Audit-Hinweis')}</div>
                          <div className="uw-admin-small">{tr('Decision aligned with jurisdictional supervisory guidance.', 'Entscheidung entspricht jurisdiktionaler Aufsichtsleitlinie.')}</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Regulatory decision locked (supervisory position recorded)', 'Regulatorische Entscheidung gesperrt (Aufsichtsposition erfasst)'))
                              setPartial({ decisionLocked: true })
                              nav('/demo-legal/regulatory')
                            }}
                          >
                            {tr('Lock regulatory decision', 'Regulatorische Entscheidung sperren')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/regulatory')}>
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
                      <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('reportability, disclosure scope, escalation', 'Meldepflicht, Offenlegungsscope, Eskalation')}</div>
                      <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('supervisory compliance & timeliness', 'Aufsichts-Compliance & Timeliness')}</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>{tr('Materiality sets reporting threshold', 'Materialität setzt Meldeschwelle')}</li>
                      <li>{tr('Disclosure scope must match guidance', 'Offenlegungsscope muss Leitlinie entsprechen')}</li>
                      <li>{tr('Escalation ensures governance alignment', 'Eskalation stellt Governance-Abstimmung sicher')}</li>
                      <li>{tr('Audit trail locked for regulators', 'Audit-Trail für Regulatoren gesperrt')}</li>
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
