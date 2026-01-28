import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

type DriverDemoState = {
  authMethod: 'email' | 'phone'
  contact: string
  password: string
  agreed: boolean
  accountCreated: boolean
  profile: {
    fullName: string
    dob: string
    licensePlate: string
    vehicleType: string
    policyNumber: string
    insurer: string
  }
  profileSkipped: boolean
  claim: {
    claimType: string
    when: string
    location: string
    injured: string
    description: string
    claimId: string
  }
  uploads: {
    photos: boolean
    report: boolean
    license: boolean
  }
  chatLog: { id: string; from: 'driver' | 'insurer'; text: string }[]
}

const STEP_IDS = ['register', 'profile', 'claim', 'upload', 'chat', 'summary'] as const

const STEP_TITLES: Record<(typeof STEP_IDS)[number], string> = {
  register: 'Registration',
  profile: 'Profile',
  claim: 'Report claim',
  upload: 'Upload evidence',
  chat: 'Chat support',
  summary: 'Summary'
}

const INITIAL_CHAT = [
  { id: 'm1', from: 'driver' as const, text: 'Hi, I reported an accident. What’s next?' },
  { id: 'm2', from: 'insurer' as const, text: 'Thanks. Please confirm location and if vehicle is drivable.' },
  { id: 'm3', from: 'driver' as const, text: 'Vehicle drivable, location Munich.' },
  { id: 'm4', from: 'insurer' as const, text: 'We assigned handler. Next step: repair partner or payout options.' },
  { id: 'm5', from: 'insurer' as const, text: 'Would you like a repair appointment?' },
  { id: 'm6', from: 'driver' as const, text: 'Prefer payout.' }
]

const createInitialState = (): DriverDemoState => ({
  authMethod: 'email',
  contact: 'alex.driver@demo.insurfox',
  password: 'demo',
  agreed: true,
  accountCreated: false,
  profile: {
    fullName: 'Alex Driver',
    dob: '12 Apr 1993',
    licensePlate: 'M-IF 421',
    vehicleType: 'Car',
    policyNumber: 'PL-204889',
    insurer: 'Atlas Insurance'
  },
  profileSkipped: false,
  claim: {
    claimType: 'Accident',
    when: 'Today',
    location: 'Munich',
    injured: 'No',
    description: 'Rear-end collision at traffic light.',
    claimId: 'CLM-10421'
  },
  uploads: {
    photos: true,
    report: true,
    license: true
  },
  chatLog: INITIAL_CHAT
})

export default function DemoDriverStepPage() {
  const { stepId } = useParams()
  const navigate = useNavigate()
  const state = createInitialState()

  const stepIndex = useMemo(
    () => STEP_IDS.findIndex((step) => step === stepId),
    [stepId]
  )

  if (stepIndex === -1) {
    return <Navigate to="/demo-driver" replace />
  }

  const currentStep = STEP_IDS[stepIndex]
  const stepLabel = `Step ${stepIndex + 1} of ${STEP_IDS.length}`

  const goBack = () => {
    if (stepIndex === 0) {
      navigate('/demo-driver')
      return
    }
    navigate(`/demo-driver/step/${STEP_IDS[stepIndex - 1]}`)
  }

  const goNext = () => {
    if (stepIndex >= STEP_IDS.length - 1) {
      navigate('/demo-driver')
      return
    }
    navigate(`/demo-driver/step/${STEP_IDS[stepIndex + 1]}`)
  }

  const stepContent = {
    register: {
      inboxRows: [
        { item: 'Email', value: state.contact },
        { item: 'Password', value: '••••••••' },
        { item: 'Consent', value: 'Granted (demo)' }
      ],
      snapshot: [
        { label: 'Account', value: 'Created (demo)' },
        { label: 'Login', value: 'Not required' }
      ]
    },
    profile: {
      inboxRows: [
        { item: 'Full name', value: state.profile.fullName },
        { item: 'Date of birth', value: state.profile.dob },
        { item: 'License plate', value: state.profile.licensePlate },
        { item: 'Vehicle type', value: state.profile.vehicleType }
      ],
      snapshot: [
        { label: 'Policy number', value: state.profile.policyNumber },
        { label: 'Insurer', value: state.profile.insurer }
      ]
    },
    claim: {
      inboxRows: [
        { item: 'Incident type', value: state.claim.claimType },
        { item: 'When', value: state.claim.when },
        { item: 'Where', value: state.claim.location },
        { item: 'Injured', value: state.claim.injured }
      ],
      snapshot: [
        { label: 'Claim ID', value: state.claim.claimId },
        { label: 'SLA', value: '24h initial response' }
      ]
    },
    upload: {
      inboxRows: [
        { item: 'Damage photos', value: 'Uploaded (demo)' },
        { item: 'Police report', value: 'Uploaded (demo)' },
        { item: 'Driver license', value: 'Uploaded (demo)' }
      ],
      snapshot: [
        { label: 'Encryption', value: 'Active' },
        { label: 'Claim file', value: 'Updated' }
      ]
    },
    chat: {
      inboxRows: state.chatLog.map((item) => ({ item: item.from === 'driver' ? 'Driver' : 'Insurer', value: item.text })),
      snapshot: [
        { label: 'Handler', value: 'Assigned' },
        { label: 'Status', value: 'HITL' }
      ]
    },
    summary: {
      inboxRows: [
        { item: 'Account created', value: 'Yes' },
        { item: 'Profile saved', value: 'Yes' },
        { item: 'Claim reported', value: state.claim.claimId },
        { item: 'Evidence attached', value: 'Yes' },
        { item: 'Chat log', value: 'Recorded' }
      ],
      snapshot: [
        { label: 'Outcome', value: 'Audit-ready' },
        { label: 'Next step', value: 'Repair or payout' }
      ]
    }
  }[currentStep]

  const kpis = [
    {
      title: 'Progress',
      value: stepLabel,
      note: 'Driver journey',
      color: 'bg-blue-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    },
    {
      title: 'Driver',
      value: state.profile.fullName,
      note: state.profile.licensePlate,
      color: 'bg-indigo-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      )
    },
    {
      title: 'Claim ID',
      value: state.claim.claimId,
      note: 'FNOL',
      color: 'bg-azure-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4h9l3 3v13H6z" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      )
    },
    {
      title: 'Channel',
      value: 'Chat',
      note: 'HITL support',
      color: 'bg-teal-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 3 1.5-4.5A8.5 8.5 0 1 1 21 11.5z" />
        </svg>
      )
    },
    {
      title: 'SLA',
      value: '24h',
      note: 'Initial response',
      color: 'bg-red-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5" />
        </svg>
      )
    },
    {
      title: 'Status',
      value: 'Demo',
      note: 'Prefilled',
      color: 'bg-green-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" />
          <path d="M12 3l7 4v6c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
        </svg>
      )
    }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Driver demo</div>
                <h2 className="page-title">{STEP_TITLES[currentStep]}</h2>
                <div className="text-muted">Driver journey demo — prefilled, no manual input.</div>
              </div>
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-outline-primary" onClick={goBack}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={goNext}>
                    {currentStep === 'summary' ? 'Finish demo' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              {kpis.map((item, index) => (
                <div className="col-6 col-md-4 col-xl-2" key={item.title}>
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column gap-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className={`avatar avatar-sm ${item.color}`}>{item.icon}</span>
                        <span className={`badge ${item.color}`}>{item.title}</span>
                      </div>
                      <div className="fw-bold">{item.value}</div>
                      <div className="text-muted">{item.note}</div>
                      <div className="progress progress-sm mt-1">
                        <div className={`progress-bar ${index % 2 === 0 ? 'bg-blue' : 'bg-green'}`} style={{ width: `${62 + index * 5}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12 col-xl-8">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-blue-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 4h18v16H3z" />
                          <path d="M7 8h10" />
                          <path d="M7 12h6" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Step details</h3>
                    </div>
                    <span className="badge bg-blue-lt">{stepLabel}</span>
                  </div>
                  <div className="table-responsive">
                    <table className="table card-table table-vcenter">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stepContent.inboxRows.map((row) => (
                          <tr key={`${row.item}-${row.value}`}>
                            <td>{row.item}</td>
                            <td>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-yellow-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16v16H4z" />
                          <path d="M8 4v16" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Snapshot</h3>
                    </div>
                    <span className="badge bg-yellow-lt">Prefilled</span>
                  </div>
                  <div className="card-body d-flex flex-column gap-2">
                    {stepContent.snapshot.map((item) => (
                      <div className="d-flex align-items-center justify-content-between" key={item.label}>
                        <span className="text-muted">{item.label}</span>
                        <span className="fw-semibold">{item.value}</span>
                      </div>
                    ))}
                    <div className="mt-2">
                      <svg width="100%" height="70" viewBox="0 0 200 70" fill="none">
                        <rect x="0" y="10" width="38" height="50" rx="6" fill="#e0e7ff" />
                        <rect x="44" y="20" width="38" height="40" rx="6" fill="#dbeafe" />
                        <rect x="88" y="6" width="38" height="54" rx="6" fill="#cffafe" />
                        <rect x="132" y="26" width="38" height="34" rx="6" fill="#dcfce7" />
                        <rect x="176" y="16" width="20" height="44" rx="6" fill="#fde68a" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-orange-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3v6" />
                          <path d="M12 15v6" />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">AI & HITL</h3>
                    </div>
                    <span className="badge bg-orange-lt">Human review</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">AI suggestion — requires human review.</div>
                    <div className="text-muted">AI supports triage, humans approve outcomes.</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-indigo-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3l7 4v6c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Governance</h3>
                    </div>
                    <span className="badge bg-indigo-lt">Audit trail</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Audit trail across all steps.</div>
                    <div className="text-muted">Carrier oversight preserved.</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-red-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">SLA & service</h3>
                    </div>
                    <span className="badge bg-red-lt">Time-bound</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Initial response within 24h.</div>
                    <div className="text-muted">Escalation if SLA risk.</div>
                    <div className="progress progress-sm mt-2">
                      <div className="progress-bar bg-red" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-green-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 7h16" />
                          <path d="M4 12h16" />
                          <path d="M4 17h16" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Audit & logs</h3>
                    </div>
                    <span className="badge bg-green-lt">Demo</span>
                  </div>
                  <div className="card-body d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-blue-lt">Log</span>
                      <span>Step viewed: {STEP_TITLES[currentStep]}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-blue-lt">Log</span>
                      <span>Data captured: demo only</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-blue-lt">Log</span>
                      <span>HITL checkpoint confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info mt-3" role="alert">
              Demo data only. AI suggestion — requires human review.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
