import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_LEGAL_COUNSEL_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_COUNSEL_AUDIT'

type StepId = 'intake' | 'coverage' | 'wording' | 'comms' | 'signoff'

type LegalCounselState = {
  caseId: string
  insured: string
  product: string
  incidentType: 'accident' | 'theft' | 'glass'
  policyNumber: string
  jurisdiction: string
  coverageSignal: 'clear' | 'ambiguous' | 'excluded'
  coveragePosition: 'pending' | 'cover' | 'reserve_rights' | 'deny'
  wordingAction: 'none' | 'endorsement_needed' | 'clarify_wording'
  commsTemplate: 'neutral' | 'ror' | 'deny'
  governanceEscalated: boolean
  legalSignoff: boolean
}

type AuditItem = { ts: number; message: string }

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): LegalCounselState {
  return {
    caseId: 'LGL-CLM-55410',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    incidentType: 'accident',
    policyNumber: 'PL-204889',
    jurisdiction: 'DE-BY',
    coverageSignal: 'ambiguous',
    coveragePosition: 'pending',
    wordingAction: 'none',
    commsTemplate: 'neutral',
    governanceEscalated: false,
    legalSignoff: false,
  }
}

function readState(): LegalCounselState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: LegalCounselState) {
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

export default function DemoLegalCounselStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Legal intake', 'Legal-Intake'), subtitle: tr('Scope & governance only', 'Nur Scope & Governance') },
    { id: 'coverage', title: tr('Coverage position', 'Deckungsposition'), subtitle: tr('Set legal stance', 'Rechtliche Position festlegen') },
    { id: 'wording', title: tr('Wording actions', 'Wortlaut-Aktionen'), subtitle: tr('Clarify or endorse', 'Klarstellen oder Endorsement') },
    { id: 'comms', title: tr('Communications', 'Kommunikation'), subtitle: tr('Select legal template', 'Rechtsvorlage auswählen') },
    { id: 'signoff', title: tr('Legal sign-off', 'Legal Sign-off'), subtitle: tr('Record defensibility', 'Rechtliche Belastbarkeit dokumentieren') },
  ] as const), [tr])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])

  const [state, setState] = useState<LegalCounselState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-legal/counsel/step/intake" replace />
  const stepIndex = STEPS_LOCAL.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<LegalCounselState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-legal/counsel/step/${next}`)
  }

  const coveragePositionLabel = (value: LegalCounselState['coveragePosition']) => {
    switch (value) {
      case 'cover':
        return tr('Cover', 'Deckung')
      case 'reserve_rights':
        return tr('ROR', 'ROR')
      case 'deny':
        return tr('Deny', 'Ablehnen')
      default:
        return tr('Pending', 'Offen')
    }
  }
  const wordingActionLabel = (value: LegalCounselState['wordingAction']) => {
    switch (value) {
      case 'clarify_wording':
        return tr('Clarify wording', 'Wortlaut klarstellen')
      case 'endorsement_needed':
        return tr('Endorsement needed', 'Endorsement erforderlich')
      default:
        return tr('No action', 'Keine Aktion')
    }
  }
  const commsLabel = (value: LegalCounselState['commsTemplate']) => {
    switch (value) {
      case 'ror':
        return tr('ROR', 'ROR')
      case 'deny':
        return tr('Deny', 'Ablehnung')
      default:
        return tr('Neutral', 'Neutral')
    }
  }

  const coverageLabel = state.coveragePosition === 'pending'
    ? tr('Coverage: Pending', 'Deckung: Offen')
    : tr('Coverage', 'Deckung') + `: ${coveragePositionLabel(state.coveragePosition)}`
  const snapshotBadges = [
    { label: coverageLabel, ok: state.coveragePosition !== 'pending' },
    { label: tr('Wording action set', 'Wortlaut-Aktion gesetzt'), ok: state.wordingAction !== 'none' },
    { label: tr('Comms template set', 'Kommunikationsvorlage gesetzt'), ok: state.commsTemplate !== 'neutral' },
    { label: tr('Governance escalated', 'Governance eskaliert'), ok: state.governanceEscalated },
    { label: tr('Legal sign-off', 'Legal Sign-off'), ok: state.legalSignoff },
  ]

  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'coverage') return state.coveragePosition !== 'pending'
    if (stepId === 'wording') return true
    if (stepId === 'comms') return true
    if (stepId === 'signoff') return true
    return false
  })()

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/counsel')}>
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
                      <span>{tr('Step', 'Schritt')} {stepIndex + 1}/{STEPS_LOCAL.length} · {tr('legal review', 'Legal-Review')}</span>
                    </div>
                    <span className="badge bg-indigo-lt">{tr('Legal Counsel', 'Legal Counsel')}</span>
                  </div>

                  <div className="uw-decision-body">
                    {(stepId === 'intake') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k={tr('Case ID', 'Fall-ID')} v={state.caseId} />
                            <Kv k={tr('Insured', 'Versicherungsnehmer')} v={state.insured} />
                            <Kv k={tr('Product', 'Produkt')} v={state.product} />
                            <Kv k={tr('Incident', 'Schadentyp')} v={tr(state.incidentType, state.incidentType === 'accident' ? 'Unfall' : state.incidentType === 'theft' ? 'Diebstahl' : 'Glas')} />
                            <Kv k={tr('Policy', 'Police')} v={state.policyNumber} />
                            <Kv k={tr('Jurisdiction', 'Gerichtsstand')} v={state.jurisdiction} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI note', 'KI-Hinweis')}</div>
                          <div className="uw-admin-small">
                            {tr(
                              'Coverage appears ambiguous due to exclusion wording; recommend ROR until facts complete.',
                              'Deckung wirkt wegen Ausschluss-Wortlaut uneindeutig; ROR bis zur Klärung empfehlen.',
                            )}
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Legal Counsel review started (case received)', 'Legal Counsel Review gestartet (Fall erhalten)'))
                              goTo('coverage')
                            }}
                          >
                            {tr('Begin coverage review', 'Deckungsprüfung starten')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'coverage') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Key clauses', 'Wichtige Klauseln')}</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>{tr('Exclusions – §4.2 (Ambiguous phrasing)', 'Ausschlüsse – §4.2 (uneindeutiger Wortlaut)')}</li>
                            <li>{tr('Conditions – §2.1 (Notice obligations)', 'Bedingungen – §2.1 (Anzeigepflichten)')}</li>
                            <li>{tr('Definitions – §1.7 (Use of vehicle)', 'Definitionen – §1.7 (Fahrzeugnutzung)')}</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">{tr('Set reservation of rights (ROR) pending fact confirmation.', 'ROR setzen bis Fakten bestätigt sind.')}</div>
                        </div>
                        <div className="uw-cta-row">
                          {([
                            { label: tr('Set position: Cover', 'Position setzen: Deckung'), value: 'cover' },
                            { label: tr('Set position: ROR', 'Position setzen: ROR'), value: 'reserve_rights' },
                            { label: tr('Set position: Deny', 'Position setzen: Ablehnen'), value: 'deny' },
                          ] as const).map((item) => (
                            <button
                              key={item.value}
                              className={`btn ${item.value === 'reserve_rights' ? 'btn-primary' : 'btn-outline-secondary'}`}
                              onClick={() => {
                                appendAudit(tr(
                                  `Coverage position set: ${coveragePositionLabel(item.value)}`,
                                  `Deckungsposition gesetzt: ${coveragePositionLabel(item.value)}`,
                                ))
                                setPartial({ coveragePosition: item.value })
                                goTo('wording')
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {(stepId === 'wording') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Wording risk indicator', 'Wortlaut-Risikoindikator')}</div>
                          <div className="uw-admin-small">{tr('Ambiguous phrasing detected in exclusion §4.2.', 'Uneindeutiger Wortlaut im Ausschluss §4.2 erkannt.')}</div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI note', 'KI-Hinweis')}</div>
                          <div className="uw-admin-small">{tr('Clarify wording for future renewals; endorsement may reduce disputes.', 'Wortlaut für zukünftige Erneuerungen klarstellen; Endorsement kann Streit reduzieren.')}</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Wording action set: clarify wording', 'Wortlaut-Aktion gesetzt: Klarstellung'))
                              setPartial({ wordingAction: 'clarify_wording' })
                              goTo('comms')
                            }}
                          >
                            {tr('Action: Clarify wording', 'Aktion: Wortlaut klarstellen')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Wording action set: endorsement needed', 'Wortlaut-Aktion gesetzt: Endorsement erforderlich'))
                              setPartial({ wordingAction: 'endorsement_needed' })
                              goTo('comms')
                            }}
                          >
                            {tr('Action: Endorsement needed', 'Aktion: Endorsement erforderlich')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Wording action set: no action', 'Wortlaut-Aktion gesetzt: keine Aktion'))
                              setPartial({ wordingAction: 'none' })
                              goTo('comms')
                            }}
                          >
                            {tr('No action', 'Keine Aktion')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'comms') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>{tr('Communication constraints', 'Kommunikationsvorgaben')}</div>
                          <div className="uw-admin-small">{tr('No admissions. Factual language only. Reference policy clauses.', 'Keine Schuldeingeständnisse. Nur sachliche Sprache. Policenklauseln referenzieren.')}</div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('AI recommendation', 'KI-Empfehlung')}</div>
                          <div className="uw-admin-small">
                            {state.coveragePosition === 'reserve_rights'
                              ? tr('Use ROR template with legal basis + evidence request.', 'ROR-Template mit Rechtsgrundlage + Evidenzanforderung nutzen.')
                              : state.coveragePosition === 'deny'
                                ? tr('Use denial template with clause reference and appeal path.', 'Ablehnungs-Template mit Klausel-Referenz und Rechtsbehelfsweg nutzen.')
                                : tr('Use neutral update template with fact request.', 'Neutrales Update-Template mit Faktenanforderung nutzen.')}
                          </div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit(tr('Comms template set: neutral', 'Kommunikationsvorlage gesetzt: neutral'))
                              setPartial({ commsTemplate: 'neutral' })
                            }}
                          >
                            {tr('Select template: Neutral', 'Vorlage wählen: Neutral')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Comms template set: ROR', 'Kommunikationsvorlage gesetzt: ROR'))
                              setPartial({ commsTemplate: 'ror' })
                            }}
                          >
                            {tr('Select template: ROR', 'Vorlage wählen: ROR')}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit(tr('Comms template set: deny', 'Kommunikationsvorlage gesetzt: Ablehnung'))
                              setPartial({ commsTemplate: 'deny' })
                            }}
                          >
                            {tr('Select template: Deny', 'Vorlage wählen: Ablehnung')}
                          </button>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className={`btn ${state.governanceEscalated ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => {
                              appendAudit(state.governanceEscalated ? tr('Governance escalation removed', 'Governance-Eskalation entfernt') : tr('Escalated to governance counsel', 'An Governance Counsel eskaliert'))
                              setPartial({ governanceEscalated: !state.governanceEscalated })
                            }}
                          >
                            {state.governanceEscalated ? tr('Governance escalated', 'Governance eskaliert') : tr('Escalate to governance counsel', 'An Governance Counsel eskalieren')}
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'signoff') && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{tr('Sign-off summary', 'Sign-off Zusammenfassung')}</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k={tr('Coverage', 'Deckung')} v={coveragePositionLabel(state.coveragePosition)} />
                            <Kv k={tr('Wording', 'Wortlaut')} v={wordingActionLabel(state.wordingAction)} />
                            <Kv k={tr('Comms', 'Kommunikation')} v={commsLabel(state.commsTemplate)} />
                            <Kv k={tr('Governance', 'Governance')} v={state.governanceEscalated ? tr('Escalated', 'Eskaliert') : tr('No', 'Nein')} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{tr('Output', 'Ergebnis')}</div>
                          <div className="uw-admin-small">
                            {state.coveragePosition !== 'pending' ? tr('Legal ready', 'Legal bereit') : tr('Blocked: incomplete', 'Blockiert: unvollständig')}
                          </div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            disabled={state.coveragePosition === 'pending'}
                            onClick={() => {
                              appendAudit(tr('Legal sign-off recorded (defensibility confirmed)', 'Legal Sign-off erfasst (rechtliche Belastbarkeit bestätigt)'))
                              setPartial({ legalSignoff: true })
                              nav('/demo-legal/counsel')
                            }}
                          >
                            {tr('Record legal sign-off', 'Legal Sign-off erfassen')}
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/counsel')}>
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
                      <div><strong>{tr('Decides', 'Entscheidet')}:</strong> {tr('coverage position & wording actions', 'Deckungsposition & Wortlaut-Aktionen')}</div>
                      <div><strong>{tr('Accountable', 'Verantwortlich')}:</strong> {tr('legal defensibility & governance', 'rechtliche Belastbarkeit & Governance')}</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>{tr('Coverage stance must be defensible', 'Deckungsposition muss belastbar sein')}</li>
                      <li>{tr('Wording actions prevent future disputes', 'Wortlaut-Aktionen vermeiden spätere Streitfälle')}</li>
                      <li>{tr('Comms must stay factual and clause-based', 'Kommunikation muss sachlich und klauselbasiert sein')}</li>
                      <li>{tr('Escalations recorded in audit', 'Eskalationen werden im Audit erfasst')}</li>
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
