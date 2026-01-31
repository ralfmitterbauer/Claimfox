import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'
import { useI18n } from '@/i18n/I18nContext'

const KEY_STATE = 'DEMO_PARTNER_MGMT_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_MGMT_AUDIT'

type StepId = 'intake' | 'onboarding' | 'controls' | 'performance' | 'lock'

type PartnerMgmtState = {
  partner: string
  onboardingStatus: 'none' | 'invited' | 'verified' | 'active'
  contractMode: 'standard' | 'premium-sla' | 'restricted'
  kpiMonitoring: boolean
  escalationRule: 'none' | 'auto' | 'manual'
  locked: boolean
}

const STEPS: StepId[] = ['intake', 'onboarding', 'controls', 'performance', 'lock']

function defaultState(): PartnerMgmtState {
  return {
    partner: 'RoadAssist Süd',
    onboardingStatus: 'invited',
    contractMode: 'standard',
    kpiMonitoring: true,
    escalationRule: 'auto',
    locked: false
  }
}

export default function DemoPartnerManagementStepPage() {
  const nav = useNavigate()
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = (en: string, de: string) => (isEn ? en : de)
  const { stepId } = useParams<{ stepId: StepId }>()
  const STEPS_LOCAL = useMemo(() => ([
    { id: 'intake', title: tr('Intake', 'Intake'), subtitle: tr('Start onboarding review', 'Onboarding prüfen') },
    { id: 'onboarding', title: tr('Onboarding', 'Onboarding'), subtitle: tr('Verify readiness', 'Bereitschaft prüfen') },
    { id: 'controls', title: tr('Controls', 'Controls'), subtitle: tr('Set contract mode', 'Vertragsmodus setzen') },
    { id: 'performance', title: tr('Performance', 'Performance'), subtitle: tr('Set escalation rule', 'Eskalationsregel setzen') },
    { id: 'lock', title: tr('Lock', 'Sperren'), subtitle: tr('Lock partner setup', 'Partner-Setup sperren') }
  ]), [isEn])
  const current = useMemo(() => STEPS_LOCAL.find((s) => s.id === stepId), [stepId, STEPS_LOCAL])
  const [state, setState] = useState<PartnerMgmtState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/management/step/intake" replace />

  function setPartial(p: Partial<PartnerMgmtState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const onboardingLabel = (value: PartnerMgmtState['onboardingStatus']) => {
    if (value === 'active') return tr('Active', 'Aktiv')
    if (value === 'verified') return tr('Verified', 'Verifiziert')
    if (value === 'invited') return tr('Invited', 'Eingeladen')
    return tr('None', 'Keine')
  }
  const contractLabel = (value: PartnerMgmtState['contractMode']) => {
    if (value === 'premium-sla') return tr('Premium SLA', 'Premium SLA')
    if (value === 'restricted') return tr('Restricted', 'Eingeschränkt')
    return tr('Standard', 'Standard')
  }
  const escalationLabel = (value: PartnerMgmtState['escalationRule']) => {
    if (value === 'auto') return tr('Auto', 'Auto')
    if (value === 'manual') return tr('Manual', 'Manuell')
    return tr('None', 'Keine')
  }
  const snapshot = [
    { label: `${tr('Onboarding', 'Onboarding')} ${onboardingLabel(state.onboardingStatus)}`, ok: state.onboardingStatus === 'active' },
    { label: `${tr('Contract', 'Vertrag')} ${contractLabel(state.contractMode)}`, ok: state.contractMode !== 'restricted' },
    { label: state.kpiMonitoring ? tr('KPI on', 'KPI an') : tr('KPI off', 'KPI aus'), ok: state.kpiMonitoring },
    { label: `${tr('Escalation', 'Eskalation')} ${escalationLabel(state.escalationRule)}`, ok: state.escalationRule !== 'none' },
    { label: state.locked ? tr('Locked', 'Gesperrt') : tr('Unlocked', 'Nicht gesperrt'), ok: state.locked }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/management')}>
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
                    <div className="text-muted">{tr('Partner', 'Partner')}</div>
                    <div className="fw-semibold">{state.partner}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI note', 'AI Hinweis')}</div>
                          <div className="text-muted">{tr('Validate readiness before activating network access.', 'Bereitschaft prüfen, bevor Netzwerkzugang aktiviert wird.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Partner management started', 'Partner Management gestartet'))
                            nav('/demo-partners/management/step/onboarding')
                          }}>{tr('Review onboarding', 'Onboarding prüfen')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'onboarding' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Verify documents before activation.', 'Dokumente vor Aktivierung verifizieren.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Documents verified', 'Dokumente verifiziert'))
                            setPartial({ onboardingStatus: 'verified' })
                          }}>{tr('Verify documents', 'Dokumente verifizieren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Partner activated', 'Partner aktiviert'))
                            setPartial({ onboardingStatus: 'active' })
                            nav('/demo-partners/management/step/controls')
                          }}>{tr('Activate partner', 'Partner aktivieren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Onboarding held', 'Onboarding gehalten'))
                            setPartial({ onboardingStatus: 'invited' })
                          }}>{tr('Hold onboarding', 'Onboarding halten')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'controls' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Least-privilege: restrict access to claim-only unless report needed.', 'Least-Privilege: Zugriff auf Claim-only, außer Report nötig.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Contract: standard', 'Vertrag: Standard'))
                            setPartial({ contractMode: 'standard' })
                          }}>{tr('Contract: Standard', 'Vertrag: Standard')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Contract: premium SLA', 'Vertrag: Premium SLA'))
                            setPartial({ contractMode: 'premium-sla' })
                          }}>{tr('Contract: Premium SLA', 'Vertrag: Premium SLA')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Contract: restricted', 'Vertrag: Eingeschränkt'))
                            setPartial({ contractMode: 'restricted' })
                          }}>{tr('Contract: Restricted', 'Vertrag: Eingeschränkt')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, state.kpiMonitoring ? tr('KPI monitoring disabled', 'KPI Monitoring deaktiviert') : tr('KPI monitoring enabled', 'KPI Monitoring aktiviert'))
                            setPartial({ kpiMonitoring: !state.kpiMonitoring })
                            nav('/demo-partners/management/step/performance')
                          }}>
                            {tr('KPI monitoring', 'KPI Monitoring')} {state.kpiMonitoring ? tr('OFF', 'AUS') : tr('ON', 'AN')}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'performance' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('AI recommendation', 'AI Empfehlung')}</div>
                          <div className="text-muted">{tr('Escalate only on repeated SLA breach.', 'Nur bei wiederholtem SLA-Verstoß eskalieren.')}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Escalation rule: auto', 'Eskalationsregel: Auto'))
                            setPartial({ escalationRule: 'auto' })
                            nav('/demo-partners/management/step/lock')
                          }}>{tr('Escalation: Auto', 'Eskalation: Auto')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Escalation rule: manual', 'Eskalationsregel: Manuell'))
                            setPartial({ escalationRule: 'manual' })
                            nav('/demo-partners/management/step/lock')
                          }}>{tr('Escalation: Manual', 'Eskalation: Manuell')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('No escalation rule', 'Keine Eskalationsregel'))
                            setPartial({ escalationRule: 'none' })
                            nav('/demo-partners/management/step/lock')
                          }}>{tr('No escalation rule', 'Keine Eskalationsregel')}</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">{tr('Summary', 'Zusammenfassung')}</div>
                          <div className="text-muted">{tr('Onboarding', 'Onboarding')}: {onboardingLabel(state.onboardingStatus)}</div>
                          <div className="text-muted">{tr('Contract', 'Vertrag')}: {contractLabel(state.contractMode)}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, tr('Partner setup locked', 'Partner-Setup gesperrt'))
                            setPartial({ locked: true })
                            nav('/demo-partners/management')
                          }}>{tr('Lock partner setup', 'Partner-Setup sperren')}</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/management')}>
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/management/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>{tr('AI & Accountability', 'AI & Verantwortung')}</h4>
                  <div>{tr('Decides: onboarding + contract controls', 'Entscheidet: Onboarding + Vertrags-Controls')}</div>
                  <div>{tr('Accountable: partner quality & governance', 'Verantwortlich: Partnerqualität & Governance')}</div>

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
