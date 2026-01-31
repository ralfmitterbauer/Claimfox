import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_UW_SENIOR_STATE'
const KEY_AUDIT = 'DEMO_UW_SENIOR_AUDIT'

type StepId = 'intake' | 'override' | 'portfolio' | 'governance' | 'decision' | 'confirm'

type SeniorUwState = {
  caseId: string
  insured: string
  product: string
  basePremiumMonthly: number
  aiSuggestedOverride: 'none' | 'limit_increase' | 'deductible_adjust'
  overrideProposed: boolean
  portfolioChecked: boolean
  governanceRequested: boolean
  governanceApproved: boolean
  escalatedToCarrier: boolean
  decision: 'pending' | 'approve_override' | 'decline' | 'escalate'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): SeniorUwState {
  return {
    caseId: 'UW-OVR-88317',
    insured: 'Nordbahn Freight AG',
    product: 'Fleet Liability + Cargo Extension',
    basePremiumMonthly: 189,
    aiSuggestedOverride: 'limit_increase',
    overrideProposed: false,
    portfolioChecked: false,
    governanceRequested: false,
    governanceApproved: false,
    escalatedToCarrier: false,
    decision: 'pending',
    decisionLocked: false,
  }
}

function readState(): SeniorUwState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: SeniorUwState) {
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
  return isEn ? `€ ${n} / month` : `€ ${n} / Monat`
}

export default function DemoSeniorUnderwriterStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Referral intake', 'Referral-Intake'), subtitle: tr('Identify override need', 'Override-Bedarf erkennen') },
    { id: 'override', title: tr('Override proposal', 'Override-Vorschlag'), subtitle: tr('Choose override path', 'Override-Pfad wählen') },
    { id: 'portfolio', title: tr('Portfolio impact', 'Portfolio-Impact'), subtitle: tr('Confirm portfolio constraints', 'Portfolio-Grenzen bestätigen') },
    { id: 'governance', title: tr('Governance gate', 'Governance-Gate'), subtitle: tr('Request + receive approval', 'Freigabe anfordern + erhalten') },
    { id: 'decision', title: tr('Decision', 'Entscheidung'), subtitle: tr('Approve override, decline, or escalate', 'Override freigeben, ablehnen oder eskalieren') },
    { id: 'confirm', title: tr('Final confirmation', 'Finale Bestätigung'), subtitle: tr('Lock audit rationale', 'Audit-Begründung sperren') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])

  const [state, setState] = useState<SeniorUwState>(() => readState())

  // Ensure defaults on deep link
  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-underwriter/senior/step/intake" replace />
  const stepIndex = STEPS_LOCAL.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<SeniorUwState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-underwriter/senior/step/${next}`)
  }

  const snapshotBadges = [
    { label: tr('Override Proposed', 'Override vorgeschlagen'), ok: state.overrideProposed },
    { label: tr('Portfolio Checked', 'Portfolio geprüft'), ok: state.portfolioChecked },
    { label: tr('Governance Approved', 'Governance freigegeben'), ok: state.governanceApproved },
    { label: tr('Escalated', 'Eskaliert'), ok: state.escalatedToCarrier },
    { label: tr('Decision Locked', 'Entscheidung gesperrt'), ok: state.decisionLocked },
  ]

  // Next enabling rules (keep it strict + click-only)
  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'override') return state.overrideProposed || state.escalatedToCarrier || state.decision === 'decline'
    if (stepId === 'portfolio') return state.portfolioChecked
    if (stepId === 'governance') return state.governanceApproved || state.escalatedToCarrier || state.decision === 'decline'
    if (stepId === 'decision') {
      if (state.decision === 'approve_override') return state.governanceApproved && state.portfolioChecked
      if (state.decision === 'escalate') return state.escalatedToCarrier
      if (state.decision === 'decline') return true
      return false
    }
    if (stepId === 'confirm') return true
    return false
  })()

  const aiOverrideText =
    state.aiSuggestedOverride === 'limit_increase'
      ? tr('Increase limit with governance approval (controlled exposure)', 'Limit erhöhen mit Governance-Freigabe (kontrollierte Exponierung)')
      : state.aiSuggestedOverride === 'deductible_adjust'
        ? tr('Adjust deductible to align with corridor severity', 'Selbstbehalt an Schwere im Korridor anpassen')
        : tr('No override needed', 'Kein Override erforderlich')

  const premiumWithOverride = state.aiSuggestedOverride === 'limit_increase' ? state.basePremiumMonthly + 24 : state.basePremiumMonthly + 12

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/senior')}>
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
              {/* LEFT */}
              <div className="uw-left">
                <div className="uw-decision uw-fade-in">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{current.title}</strong>
                      <span>{tr('Step', 'Schritt')} {stepIndex + 1}/{STEPS_LOCAL.length} · {tr('one decision', 'eine Entscheidung')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">Senior UW</span>
                  </div>

                  <div className="uw-decision-body">
                    {/* Case context */}
                    <div className="uw-block">
                      <div className="uw-kv">
                        <Kv k={tr('Case ID', 'Fall-ID')} v={state.caseId} />
                        <Kv k={tr('Insured', 'Versicherter')} v={state.insured} />
                        <Kv k={tr('Product', 'Produkt')} v={tr('Fleet Liability + Cargo Extension', 'Flottenhaftpflicht + Fracht-Erweiterung')} />
                        <Kv k={tr('Base premium', 'Basisprämie')} v={<span className="badge bg-azure-lt">{money(state.basePremiumMonthly, isEn)}</span>} />
                        <Kv k={tr('AI risk score', 'KI-Risikoscore')} v={<span className="badge bg-azure-lt">57 / 100</span>} />
                      </div>
                    </div>

                    {stepId === 'intake' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI triage', 'KI-Triage')}</div>
                          <div className="uw-admin-small">
                            {tr('Referral triggers because the requested limit exceeds standard corridor for this insured segment.', 'Referral ausgelöst, da das angefragte Limit den Standardkorridor für dieses Segment überschreitet.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Trigger', 'Trigger')} v={<span className="badge bg-yellow-lt">{tr('Limit request exceeds corridor', 'Limitanfrage überschreitet Korridor')}</span>} />
                            <Kv k={tr('Suggested path', 'Vorgeschlagener Pfad')} v={aiOverrideText} />
                            <Kv k={tr('Escalation hint', 'Eskalationshinweis')} v={tr('Escalate if governance rejects or portfolio cap is hit', 'Eskalieren bei Governance-Ablehnung oder Portfolio-Cap')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                            appendAudit(tr('Intake completed (referral classified: override candidate)', 'Intake abgeschlossen (Referral klassifiziert: Override-Kandidat)'))
                            goTo('override')
                          }}
                        >
                          {tr('Proceed to override proposal', 'Weiter zum Override-Vorschlag')}
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            appendAudit(tr('Escalated to Carrier Authority (direct)', 'Direkt an Carrier Authority eskaliert'))
                            setPartial({ escalatedToCarrier: true, decision: 'escalate' })
                            goTo('confirm')
                          }}
                        >
                          {tr('Escalate to Carrier Authority now', 'Jetzt an Carrier Authority eskalieren')}
                        </button>
                        </div>
                      </>
                    )}

                    {stepId === 'override' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI proposal', 'KI-Vorschlag')}</div>
                          <div className="uw-admin-small">
                            {tr('AI proposes an override that stays within governance rules and documents rationale.', 'KI schlägt einen Override vor, der innerhalb der Governance-Regeln bleibt und die Begründung dokumentiert.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Override', 'Override')} v={<span className="badge bg-indigo-lt">{aiOverrideText}</span>} />
                            <Kv k={tr('Premium (with override)', 'Prämie (mit Override)')} v={<span className="badge bg-azure-lt">{money(premiumWithOverride, isEn)}</span>} />
                            <Kv k={tr('Why', 'Warum')} v={tr('Limit uplift reduces rejection risk; pricing compensates severity tail', 'Limitanhebung senkt Ablehnungsrisiko; Pricing kompensiert Severity-Tail')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                            appendAudit(tr('Override proposed (AI-aligned)', 'Override vorgeschlagen (KI-konform)'))
                            setPartial({ overrideProposed: true, decision: 'pending' })
                            goTo('portfolio')
                          }}
                        >
                          {tr('Propose this override', 'Diesen Override vorschlagen')}
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            appendAudit(tr('Decline path selected (override not pursued)', 'Ablehnung gewählt (kein Override)'))
                            setPartial({ decision: 'decline', overrideProposed: false })
                          }}
                        >
                          {tr('Decline (no override)', 'Ablehnen (kein Override)')}
                        </button>
                        </div>

                        <div className="uw-cta-row">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            appendAudit(tr('Escalation selected (override outside authority)', 'Eskalation gewählt (Override außerhalb der Autorität)'))
                            setPartial({ escalatedToCarrier: true, decision: 'escalate' })
                          }}
                        >
                          {tr('Escalate to Carrier Authority', 'An Carrier Authority eskalieren')}
                        </button>
                        </div>
                      </>
                    )}

                    {stepId === 'portfolio' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Portfolio impact', 'Portfolio-Impact')}</div>
                          <div className="uw-admin-small">
                            {tr('Senior UW is accountable for portfolio impact before requesting governance approval.', 'Senior UW ist vor Governance-Freigabe für den Portfolio-Impact verantwortlich.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Portfolio capacity', 'Portfolio-Kapazität')} v={<span className="badge bg-green-lt">OK</span>} />
                            <Kv k={tr('Concentration', 'Konzentration')} v={<span className="badge bg-green-lt">{tr('Within guardrails', 'Innerhalb Leitplanken')}</span>} />
                            <Kv k={tr('Impact', 'Impact')} v={tr('Neutral to slightly positive (priced for limit uplift)', 'Neutral bis leicht positiv (Pricing für Limitanhebung)')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                            appendAudit(tr('Portfolio impact confirmed (guardrails OK)', 'Portfolio-Impact bestätigt (Leitplanken OK)'))
                            setPartial({ portfolioChecked: true })
                            goTo('governance')
                          }}
                        >
                          {tr('Confirm portfolio impact', 'Portfolio-Impact bestätigen')}
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            appendAudit(tr('Portfolio risk flagged (escalate)', 'Portfolio-Risiko markiert (eskalieren)'))
                            setPartial({ escalatedToCarrier: true, decision: 'escalate' })
                          }}
                        >
                          {tr('Flag risk & escalate', 'Risiko markieren & eskalieren')}
                        </button>
                        </div>
                      </>
                    )}

                    {stepId === 'governance' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Governance gate', 'Governance-Gate')}</div>
                          <div className="uw-admin-small">
                            {tr('Overrides require governance approval. This step simulates request + approval by click.', 'Overrides erfordern Governance-Freigabe. Dieser Schritt simuliert Anfrage + Freigabe per Klick.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Request status', 'Anfragestatus')} v={<span className={`badge ${state.governanceRequested ? 'bg-azure-lt' : 'bg-muted-lt'}`}>{state.governanceRequested ? tr('Requested', 'Angefragt') : tr('Not requested', 'Nicht angefragt')}</span>} />
                            <Kv k={tr('Approval', 'Freigabe')} v={<span className={`badge ${state.governanceApproved ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.governanceApproved ? tr('Approved', 'Freigegeben') : tr('Pending', 'Ausstehend')}</span>} />
                            <Kv k={tr('Required', 'Erforderlich')} v={tr('Rationale + portfolio check + authority boundary', 'Begründung + Portfolio-Check + Autoritätsgrenze')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Governance approval requested', 'Governance-Freigabe angefordert'))
                              setPartial({ governanceRequested: true })
                            }}
                            disabled={state.governanceRequested}
                          >
                            {tr('Request governance approval', 'Governance-Freigabe anfordern')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Governance approved (simulated)', 'Governance freigegeben (simuliert)'))
                              setPartial({ governanceApproved: true })
                              goTo('decision')
                            }}
                            disabled={!state.governanceRequested || state.governanceApproved}
                          >
                            {tr('Receive approval', 'Freigabe erhalten')}
                          </button>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Escalated to Carrier Authority (governance alternative)', 'An Carrier Authority eskaliert (Governance-Alternative)'))
                              setPartial({ escalatedToCarrier: true, decision: 'escalate' })
                              goTo('confirm')
                            }}
                          >
                            {tr('Escalate to Carrier Authority instead', 'Stattdessen an Carrier Authority eskalieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'decision' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Decision options', 'Entscheidungsoptionen')}</div>
                          <div className="uw-admin-small">
                            {tr('Approve requires governance + portfolio confirmation. Escalate if outside authority.', 'Freigabe erfordert Governance + Portfolio-Bestätigung. Eskalieren, wenn außerhalb der Autorität.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Governance" v={<span className={`badge ${state.governanceApproved ? 'bg-green-lt' : 'bg-yellow-lt'}`}>{state.governanceApproved ? tr('Approved', 'Freigegeben') : tr('Not approved', 'Nicht freigegeben')}</span>} />
                            <Kv k="Portfolio" v={<span className={`badge ${state.portfolioChecked ? 'bg-green-lt' : 'bg-yellow-lt'}`}>{state.portfolioChecked ? tr('Checked', 'Geprüft') : tr('Not checked', 'Nicht geprüft')}</span>} />
                            <Kv k={tr('AI stance', 'KI-Position')} v={tr('Approve override if both gates are satisfied', 'Override freigeben, wenn beide Gates erfüllt sind')} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                            appendAudit(tr('Decision set: approve override', 'Entscheidung gesetzt: Override freigeben'))
                            setPartial({ decision: 'approve_override' })
                            goTo('confirm')
                          }}
                          disabled={!state.governanceApproved || !state.portfolioChecked}
                        >
                          {tr('Approve override', 'Override freigeben')}
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            appendAudit(tr('Decision set: decline', 'Entscheidung gesetzt: Ablehnen'))
                            setPartial({ decision: 'decline' })
                            goTo('confirm')
                          }}
                        >
                          {tr('Decline', 'Ablehnen')}
                        </button>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Decision set: escalate to Carrier Authority', 'Entscheidung gesetzt: An Carrier Authority eskalieren'))
                              setPartial({ decision: 'escalate', escalatedToCarrier: true })
                              goTo('confirm')
                            }}
                          >
                            {tr('Escalate to Carrier Authority', 'An Carrier Authority eskalieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'confirm' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{tr('Decision summary', 'Entscheidungsübersicht')}</div>
                          <div className="uw-admin-small">{tr('Final click locks the decision rationale into the audit trail.', 'Finaler Klick sperrt die Entscheidungsbegründung im Audit-Trail.')}</div>

                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Decision', 'Entscheidung')} v={<span className="badge bg-indigo-lt">{state.decision === 'approve_override' ? tr('Approve override', 'Override freigeben') : state.decision === 'decline' ? tr('Decline', 'Ablehnen') : tr('Escalate', 'Eskalieren')}</span>} />
                            <Kv k={tr('Governance', 'Governance')} v={<span className={`badge ${state.governanceApproved ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.governanceApproved ? tr('Approved', 'Freigegeben') : 'N/A'}</span>} />
                            <Kv k={tr('Portfolio', 'Portfolio')} v={<span className={`badge ${state.portfolioChecked ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.portfolioChecked ? tr('Checked', 'Geprüft') : 'N/A'}</span>} />
                            <Kv k={tr('Escalation', 'Eskalation')} v={<span className={`badge ${state.escalatedToCarrier ? 'bg-yellow-lt' : 'bg-muted-lt'}`}>{state.escalatedToCarrier ? tr('Carrier Authority', 'Carrier Authority') : tr('No', 'Nein')}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI audit note', 'KI-Audit-Hinweis')}</div>
                          <div className="uw-admin-small">
                            {tr('AI stores structured rationale fields (non-sensitive) for governance traceability and portfolio reporting.', 'KI speichert strukturierte Begründungen (nicht sensitiv) für Governance-Nachvollziehbarkeit und Reporting.')}
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Rationale stored', 'Begründung gespeichert')} v={tr('Override trigger + portfolio guardrails + governance status + escalation path', 'Override-Trigger + Portfolio-Leitplanken + Governance-Status + Eskalationspfad')} />
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
                              nav('/demo-underwriter/senior')
                            }}
                          >
                            {tr('Lock & restart', 'Sperren & neu starten')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/senior')}>
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
                      <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('overrides with governance approval', 'Overrides mit Governance-Freigabe')}</div>
                      <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('portfolio impact & escalation logic', 'Portfolio-Impact & Eskalationslogik')}</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>{tr('AI proposes an override and explains tradeoffs', 'KI schlägt Override vor und erklärt Trade-offs')}</li>
                      <li>{tr('Portfolio check confirms guardrails before governance', 'Portfolio-Check bestätigt Leitplanken vor Governance')}</li>
                      <li>{tr('Governance gate is mandatory for override approval', 'Governance-Gate ist Pflicht für Override-Freigabe')}</li>
                      <li>{tr('Escalate to Carrier Authority if outside authority', 'An Carrier Authority eskalieren, wenn außerhalb der Autorität')}</li>
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
