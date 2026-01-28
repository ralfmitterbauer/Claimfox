import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

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

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header
          title={STEP_TITLES[currentStep]}
          subtitle="Driver journey demo — prefilled, no manual input."
          subtitleColor="#65748b"
          actions={(
            <div className="uw-actions">
              <Button onClick={goBack} variant="secondary" disableHover>
                Back
              </Button>
              <Button onClick={goNext} disableHover>
                {currentStep === 'summary' ? 'Finish demo' : 'Next'}
              </Button>
            </div>
          )}
        />

        <div className="uw-grid uw-kpi">
          <Card title="Progress" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{stepLabel}</strong>
              <span className="uw-muted">Driver journey</span>
            </div>
          </Card>
          <Card title="Driver" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{state.profile.fullName}</strong>
              <span className="uw-muted">{state.profile.licensePlate}</span>
            </div>
          </Card>
          <Card title="Claim ID" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>{state.claim.claimId}</strong>
              <span className="uw-muted">FNOL</span>
            </div>
          </Card>
          <Card title="Channel" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>Chat</strong>
              <span className="uw-muted">HITL support</span>
            </div>
          </Card>
          <Card title="SLA" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>24h</strong>
              <span className="uw-muted">Initial response</span>
            </div>
          </Card>
          <Card title="Status" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>Demo</strong>
              <span className="uw-muted">Prefilled</span>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-split">
          <Card title="Step details" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <table className="uw-table">
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
          </Card>
          <Card title="Snapshot" variant="glass" className="uw-card">
            <div className="uw-card-body">
              {stepContent.snapshot.map((item) => (
                <div key={item.label}>
                  <strong>{item.label}</strong>
                  <div className="uw-muted">{item.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-triplet">
          <Card title="AI & HITL" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <div className="uw-panel">AI suggestion — requires human review</div>
              <div>AI supports triage, humans approve outcomes.</div>
            </div>
          </Card>
          <Card title="Governance" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <div>Audit trail across all steps.</div>
              <div className="uw-muted">Carrier oversight preserved.</div>
            </div>
          </Card>
          <Card title="SLA & service" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <div>Initial response within 24h.</div>
              <div className="uw-muted">Escalation if SLA risk.</div>
            </div>
          </Card>
        </div>

        <Card title="Audit & logs" variant="glass" className="uw-card">
          <div className="uw-card-body">
            <div>Step viewed: {STEP_TITLES[currentStep]}</div>
            <div>Data captured: demo only</div>
            <div>HITL checkpoint confirmed</div>
          </div>
        </Card>

        <div className="uw-disclaimer">
          Demo data only. AI suggestion — requires human review.
        </div>
      </div>
    </section>
  )
}
