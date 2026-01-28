import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

type RoleOption = {
  id: string
  label: string
  decision: string
  accountability: string
}

const BASE_ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'junior-underwriter',
    label: 'Junior Underwriter',
    decision: 'standard underwriting within corridor',
    accountability: 'evidence completeness and SLA'
  },
  {
    id: 'senior-underwriter',
    label: 'Senior Underwriter',
    decision: 'exception approvals and pricing overrides',
    accountability: 'portfolio impact and escalation quality'
  },
  {
    id: 'carrier-authority',
    label: 'Carrier Authority',
    decision: 'final capacity and limit commitments',
    accountability: 'risk ownership and regulatory alignment'
  },
  {
    id: 'legal',
    label: 'Legal',
    decision: 'coverage interpretation and dispute stance',
    accountability: 'policy compliance and claims defensibility'
  },
  {
    id: 'finance',
    label: 'Finance',
    decision: 'capital allocation and recoveries posture',
    accountability: 'cash impact and audit trace'
  },
  {
    id: 'fraud',
    label: 'Fraud',
    decision: 'suspicious activity escalation',
    accountability: 'loss leakage prevention and evidence trail'
  }
]

const TOTAL_STEPS = 5
const ROLE_STORAGE_KEY = 'insurfox-demo-role'

const STEP_TITLES: Record<number, string> = {
  1: 'Who is making the decision?',
  2: 'What requires attention right now?',
  3: 'How AI supports - not replaces - decisions',
  4: 'Decision, accountability and governance',
  5: 'What remains visible and auditable'
}

const STEP_TITLES_UNDERWRITER: Record<number, string> = {
  1: 'Wer trifft die Entscheidung?',
  2: 'Welche Fälle erfordern jetzt Aufmerksamkeit?',
  3: 'Wie KI Entscheidungen vorbereitet',
  4: 'Entscheidung, Verantwortung und Governance',
  5: 'Auditierbarkeit und Management-Impact'
}
const UNDERWRITER_ROLE_MAP: Record<string, RoleOption> = {
  'uw-junior': {
    id: 'junior-underwriter',
    label: 'Junior Underwriter',
    decision: 'Risiken im Korridor freigeben',
    accountability: 'Evidenzqualität und SLA-Einhaltung'
  },
  'uw-senior': {
    id: 'senior-underwriter',
    label: 'Senior Underwriter',
    decision: 'Overrides mit Governance-Freigabe',
    accountability: 'Portfolio-Impact und Eskalationslogik'
  },
  'uw-carrier': {
    id: 'carrier-authority',
    label: 'Carrier Authority',
    decision: 'finale Kapazitäts- und Limitfreigaben',
    accountability: 'Risikotragung und regulatorische Konformität'
  },
  'uw-compliance': {
    id: 'underwriter-compliance',
    label: 'Compliance',
    decision: 'Regel- und Audit-Integrität prüfen',
    accountability: 'Audit-Trail und Governance-Disziplin'
  },
  'uw-reporting': {
    id: 'underwriter-reporting',
    label: 'Underwriter Reporting',
    decision: 'Portfolio- und Referral-Transparenz steuern',
    accountability: 'Entscheidungsqualität und Reporting-Standards'
  }
}

type DemoFlowCopy = {
  inboxCases: Array<{ id: string; type: string; risk: string; sla: string; flag: string }>
  kpis: Array<{ label: string; value: string; note?: string }>
  aiRecommendation: { action: string; confidence: string; drivers: string[] }
  governance: { approvals: string; authority: string; policy: string; sla: string }
  auditTimeline: string[]
  whyMatters: string[]
  subtitle: string
}

const DEFAULT_FLOW_COPY: DemoFlowCopy = {
  subtitle: 'Focused, role-based decisions with AI support and governance built in.',
  inboxCases: [
    { id: 'CLM-9021', type: 'Claim', risk: 'High', sla: 'Due today', flag: 'Out of corridor' },
    { id: 'PLC-5580', type: 'Policy', risk: 'Medium', sla: '8h left', flag: 'Pricing exception' },
    { id: 'PAY-7742', type: 'Payment', risk: 'High', sla: '2h left', flag: 'Suspicious routing' },
    { id: 'CLM-9033', type: 'Claim', risk: 'Low', sla: '24h left', flag: 'AI anomaly' }
  ],
  kpis: [
    { label: 'Open decisions', value: '28' },
    { label: 'Overrides', value: '6' },
    { label: 'SLA at risk', value: '3' }
  ],
  aiRecommendation: {
    action: 'Hold and request additional evidence',
    confidence: '82%',
    drivers: [
      'Coverage mismatch in prior endorsements',
      'Loss frequency above corridor threshold',
      'Payment routing anomaly in vendor data'
    ]
  },
  governance: {
    approvals: 'Carrier + Legal',
    authority: 'Tier 3',
    policy: 'PL-2024-11',
    sla: '2 hours remaining'
  },
  auditTimeline: ['AI viewed - 09:18', 'Human decision - 09:24', 'Approval recorded - 09:26', 'SLA timestamp - 09:27'],
  whyMatters: ['Faster decisions', 'Clear accountability', 'Audit-ready by design']
}

const UNDERWRITER_FLOW_COPY: Record<string, DemoFlowCopy> = {
  'uw-junior': {
    subtitle: 'Operative Entscheidung im Korridor mit klarer Evidenzpflicht.',
    inboxCases: [
      { id: 'UW-1842', type: 'Policy', risk: 'Low', sla: '4h left', flag: 'Within corridor' },
      { id: 'UW-1881', type: 'Policy', risk: 'Medium', sla: 'Today', flag: 'Missing evidence' },
      { id: 'UW-1903', type: 'Policy', risk: 'Medium', sla: '6h left', flag: 'Referral threshold' }
    ],
    kpis: [
      { label: 'Cases in corridor', value: '18' },
      { label: 'Evidence gaps', value: '4' },
      { label: 'Referrals', value: '3' }
    ],
    aiRecommendation: {
      action: 'Freigabe im Korridor mit Evidenznachforderung',
      confidence: '79%',
      drivers: [
        'Korridor erfüllt, aber Belegdichte unter Ziel',
        'Historischer Schadentrend neutral',
        'Kein Aggregations-Alarm'
      ]
    },
    governance: {
      approvals: 'Senior Underwriter',
      authority: 'Delegated Authority L2',
      policy: 'UW-2024-07',
      sla: '4 Stunden verbleiben'
    },
    auditTimeline: ['AI geprüft - 08:41', 'Junior Entscheidung - 08:46', 'Referral ausgelöst - 08:47', 'SLA Timer - 08:47'],
    whyMatters: ['Schnelle Triage', 'Saubere Evidenzkette', 'Transparente Eskalation']
  },
  'uw-senior': {
    subtitle: 'Management-Entscheidung für Overrides und Portfolio-Impact.',
    inboxCases: [
      { id: 'UW-2419', type: 'Policy', risk: 'High', sla: '2h left', flag: 'Override requested' },
      { id: 'UW-2455', type: 'Policy', risk: 'High', sla: 'Today', flag: 'Aggregation breach' },
      { id: 'UW-2470', type: 'Policy', risk: 'Medium', sla: '6h left', flag: 'Pricing exception' }
    ],
    kpis: [
      { label: 'Override requests', value: '7' },
      { label: 'Aggregation risk', value: '2' },
      { label: 'Portfolio impact', value: '+3.6pp LR' }
    ],
    aiRecommendation: {
      action: 'Override nur mit Auflage und Limit-Adjustierung',
      confidence: '74%',
      drivers: [
        'Aggregationsquote über Zielband',
        'Loss Ratio Segment +6pp über Plan',
        'Cross-Sell Potenzial kompensiert Risiko'
      ]
    },
    governance: {
      approvals: 'Carrier Authority',
      authority: 'Senior UW Override',
      policy: 'UW-2024-09',
      sla: '2 Stunden verbleiben'
    },
    auditTimeline: ['AI Risiko-Review - 10:12', 'Senior Override - 10:20', 'Carrier Review - 10:21', 'SLA Timer - 10:21'],
    whyMatters: ['Kapitaldisziplin', 'Portfolio-Steuerung', 'Governance-Transparenz']
  },
  'uw-carrier': {
    subtitle: 'Finale Kapazitäts- und Limitfreigaben aus Carrier-Sicht.',
    inboxCases: [
      { id: 'UW-3204', type: 'Policy', risk: 'High', sla: '90m left', flag: 'Final approval' },
      { id: 'UW-3222', type: 'Policy', risk: 'High', sla: 'Today', flag: 'Capacity escalation' },
      { id: 'UW-3235', type: 'Policy', risk: 'Medium', sla: '4h left', flag: 'Limit exception' }
    ],
    kpis: [
      { label: 'Capacity used', value: '92%' },
      { label: 'Limit exceptions', value: '3' },
      { label: 'Reinsurance match', value: '97%' }
    ],
    aiRecommendation: {
      action: 'Freigabe mit reduzierter Kapazität',
      confidence: '81%',
      drivers: [
        'Kapazitätsauslastung 92%',
        'Risiko über Benchmark, aber strategisch relevant',
        'Reinsurance Match bestätigt'
      ]
    },
    governance: {
      approvals: 'Carrier Board Delegate',
      authority: 'Carrier Final Authority',
      policy: 'UW-2024-11',
      sla: '90 Minuten verbleiben'
    },
    auditTimeline: ['AI Exposure Check - 11:05', 'Carrier Decision - 11:12', 'Limit bestätigt - 11:13', 'SLA Timer - 11:13'],
    whyMatters: ['Kapazitätsschutz', 'Regulatorische Konformität', 'Strategische Steuerung']
  },
  'uw-compliance': {
    subtitle: 'Audit- und Regelkonformität entlang aller Entscheidungen.',
    inboxCases: [
      { id: 'UW-4001', type: 'Audit', risk: 'Medium', sla: 'Today', flag: 'Override without rationale' },
      { id: 'UW-4014', type: 'Audit', risk: 'High', sla: '4h left', flag: 'Missing evidence trail' },
      { id: 'UW-4022', type: 'Audit', risk: 'Low', sla: 'Tomorrow', flag: 'Ruleset mismatch' }
    ],
    kpis: [
      { label: 'Audit gaps', value: '5' },
      { label: 'Ruleset mismatches', value: '2' },
      { label: 'Governance SLA', value: '96%' }
    ],
    aiRecommendation: {
      action: 'Entscheidungen mit fehlender Begründung eskalieren',
      confidence: '88%',
      drivers: [
        'Governance-Checkpoint nicht erfüllt',
        'Regelversion inkonsistent',
        'Audit-Completeness unter Ziel'
      ]
    },
    governance: {
      approvals: 'Compliance Lead',
      authority: 'Governance Oversight',
      policy: 'GOV-2024-05',
      sla: 'Heute 17:00'
    },
    auditTimeline: ['AI Audit-Scan - 09:02', 'Compliance Review - 09:10', 'Eskalation - 09:12', 'SLA Timer - 09:12'],
    whyMatters: ['Regulatorische Sicherheit', 'Nachvollziehbarkeit', 'Governance-Disziplin']
  },
  'uw-reporting': {
    subtitle: 'Reporting zur Steuerung von Qualität, Volumen und Referral-Logik.',
    inboxCases: [
      { id: 'UW-5102', type: 'Report', risk: 'Medium', sla: 'Today', flag: 'Referral rate spike' },
      { id: 'UW-5127', type: 'Report', risk: 'Low', sla: 'Tomorrow', flag: 'Corridor drift' },
      { id: 'UW-5141', type: 'Report', risk: 'Medium', sla: '6h left', flag: 'Override trend' }
    ],
    kpis: [
      { label: 'Referral rate', value: '28%' },
      { label: 'Override trend', value: '+12%' },
      { label: 'Portfolio quality', value: 'A-' }
    ],
    aiRecommendation: {
      action: 'Korridor-Review mit Senior UW abstimmen',
      confidence: '77%',
      drivers: [
        'Referral-Quote +12% im Segment',
        'Override-Rate über Ziel',
        'Kapazitätsauslastung stabil'
      ]
    },
    governance: {
      approvals: 'UW Leadership',
      authority: 'Reporting Governance',
      policy: 'REP-2024-03',
      sla: 'Heute 18:00'
    },
    auditTimeline: ['AI Trend-Scan - 07:50', 'Reporting Review - 08:05', 'Action logged - 08:08', 'SLA Timer - 08:08'],
    whyMatters: ['Steuerung auf Portfolio-Ebene', 'Klarer Eskalationspfad', 'Management-Transparenz']
  }
}

export default function DemoStepPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { stepId } = useParams()
  const parsedStep = Number(stepId)
  const stepNumber = Number.isFinite(parsedStep) ? parsedStep : 1

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)

  const roleKey = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.get('role') ?? ''
  }, [location.search])

  const roleOptions = useMemo(() => {
    if (roleKey in UNDERWRITER_ROLE_MAP) {
      const mapped = UNDERWRITER_ROLE_MAP[roleKey]
      return [
        UNDERWRITER_ROLE_MAP['uw-junior'],
        UNDERWRITER_ROLE_MAP['uw-senior'],
        UNDERWRITER_ROLE_MAP['uw-carrier'],
        UNDERWRITER_ROLE_MAP['uw-compliance'],
        UNDERWRITER_ROLE_MAP['uw-reporting']
      ]
        .filter(Boolean)
        .map((role) => ({
          id: role.id,
          label: role.label,
          decision: role.decision,
          accountability: role.accountability
        }))
    }
    return BASE_ROLE_OPTIONS
  }, [roleKey])

  const flowCopy = roleKey in UNDERWRITER_FLOW_COPY
    ? UNDERWRITER_FLOW_COPY[roleKey]
    : DEFAULT_FLOW_COPY
  const stepTitles = roleKey in UNDERWRITER_FLOW_COPY ? STEP_TITLES_UNDERWRITER : STEP_TITLES

  useEffect(() => {
    const storedRole = window.localStorage.getItem(ROLE_STORAGE_KEY)
    if (storedRole) {
      setSelectedRoleId(storedRole)
    }
  }, [])

  useEffect(() => {
    if (roleKey in UNDERWRITER_ROLE_MAP) {
      setSelectedRoleId(UNDERWRITER_ROLE_MAP[roleKey].id)
    }
  }, [roleKey])


  const selectedRole = useMemo(
    () => roleOptions.find((role) => role.id === selectedRoleId) ?? null,
    [roleOptions, selectedRoleId]
  )

  if (!Number.isFinite(stepNumber) || stepNumber < 1 || stepNumber > TOTAL_STEPS) {
    return <Navigate to="/demo" replace />
  }

  const handleNext = () => {
    if (stepNumber >= TOTAL_STEPS) {
      navigate('/demo')
      return
    }
    navigate(`/demo/step/${stepNumber + 1}`)
  }

  const handleBack = () => {
    if (stepNumber <= 1) {
      navigate('/demo')
      return
    }
    navigate(`/demo/step/${stepNumber - 1}`)
  }

  const progressLabel = `Step ${stepNumber} of ${TOTAL_STEPS}`
  const roleLabel = selectedRole?.label ?? 'Role not set'
  const decisionFocus = selectedRole?.decision ?? 'Decision focus not set'
  const accountability = selectedRole?.accountability ?? 'Accountability not set'

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Decision demo</div>
                <h2 className="page-title">{stepTitles[stepNumber]}</h2>
                <div className="text-muted">{flowCopy.subtitle}</div>
              </div>
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-outline-primary" onClick={handleBack}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    {stepNumber === TOTAL_STEPS ? 'Finish demo' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              {[
                { title: 'Progress', value: progressLabel, note: 'Guided flow', color: 'bg-blue-lt' },
                { title: 'Role', value: roleLabel, note: 'Decision owner', color: 'bg-indigo-lt' },
                { title: 'Decision focus', value: decisionFocus, note: 'Priority', color: 'bg-azure-lt' },
                { title: 'AI confidence', value: flowCopy.aiRecommendation.confidence, note: 'HITL required', color: 'bg-yellow-lt' },
                { title: 'SLA impact', value: flowCopy.governance.sla, note: 'Time remaining', color: 'bg-red-lt' },
                { title: 'Accountability', value: accountability, note: 'Governance', color: 'bg-green-lt' }
              ].map((item) => (
                <div className="col-6 col-md-4 col-xl-2" key={item.title}>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className={`badge ${item.color} me-2`}>{item.title}</span>
                      </div>
                      <div className="mt-2 fw-bold">{item.value}</div>
                      <div className="text-muted">{item.note}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12 col-xl-8">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Decision inbox</h3>
                    <span className="badge bg-blue-lt">Live queue</span>
                  </div>
                  <div className="table-responsive">
                    <table className="table card-table table-vcenter">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Type</th>
                          <th>Risk</th>
                          <th>SLA</th>
                          <th>AI flag</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flowCopy.inboxCases.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.type}</td>
                            <td>
                              <span className={`badge ${item.risk === 'High' ? 'bg-red-lt' : item.risk === 'Medium' ? 'bg-yellow-lt' : 'bg-green-lt'}`}>
                                {item.risk}
                              </span>
                            </td>
                            <td>{item.sla}</td>
                            <td>
                              <span className="badge bg-purple-lt">{item.flag}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Decision snapshot</h3>
                    <span className="badge bg-orange-lt">AI assisted</span>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="text-muted">Recommended action</div>
                      <div className="fw-bold">{flowCopy.aiRecommendation.action}</div>
                    </div>
                    <div className="text-muted">Approvals: {flowCopy.governance.approvals}</div>
                    <div className="text-muted">Authority: {flowCopy.governance.authority}</div>
                    <div className="text-muted">Policy: {flowCopy.governance.policy}</div>
                    <div className="mt-3">
                      <span className="badge bg-yellow-lt">AI suggestion — requires human review</span>
                    </div>
                    <div className="mt-3">
                      <svg width="100%" height="64" viewBox="0 0 200 64" fill="none">
                        <path d="M0 48 C30 20, 60 60, 90 28 C120 -2, 150 40, 200 16" stroke="#206bc4" strokeWidth="3" fill="none" />
                        <circle cx="200" cy="16" r="4" fill="#206bc4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">AI suggestion</h3>
                    <span className="badge bg-yellow-lt">Human review</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted mb-2">{flowCopy.aiRecommendation.action}</div>
                    <ul className="list-unstyled m-0">
                      {flowCopy.aiRecommendation.drivers.map((driver) => (
                        <li key={driver}>{driver}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Governance</h3>
                    <span className="badge bg-indigo-lt">Carrier ready</span>
                  </div>
                  <div className="card-body">
                    <div>Approvals: {flowCopy.governance.approvals}</div>
                    <div>Authority: {flowCopy.governance.authority}</div>
                    <div>Policy: {flowCopy.governance.policy}</div>
                    <div className="text-muted mt-2">Audit trail mandatory for every override.</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">SLA & escalation</h3>
                    <span className="badge bg-red-lt">Time-bound</span>
                  </div>
                  <div className="card-body">
                    <div>SLA impact: {flowCopy.governance.sla}</div>
                    <div className="text-muted">Escalate if SLA is breached.</div>
                    <div className="text-muted">HITL checkpoint required.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Audit & logs</h3>
                    <span className="badge bg-green-lt">Audit-ready</span>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {flowCopy.auditTimeline.map((entry) => (
                        <div className="col-12 col-md-6" key={entry}>
                          <div className="mb-2">
                            <span className="badge bg-blue-lt me-2">Log</span>
                            {entry}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info mt-3" role="alert">
              Demo data. AI suggestion — requires human review. HITL: AI suggests, humans decide.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
