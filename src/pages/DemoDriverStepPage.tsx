import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const STEP_IDS = ['register', 'onboarding', 'profile', 'identification', 'quote', 'purchase', 'claims', 'chat'] as const

type StepId = (typeof STEP_IDS)[number]

type DemoState = {
  verified: boolean
  quoteReady: boolean
  policyActive: boolean
  claimSubmitted: boolean
  locationCaptured: boolean
  timeCaptured: boolean
}

type ChatMessage = { id: string; from: 'driver' | 'insurer'; text: string }

type StepMeta = { id: StepId; label: string; short: string }

const STEP_META: StepMeta[] = [
  { id: 'register', label: 'Register', short: 'Register' },
  { id: 'onboarding', label: 'Onboarding', short: 'Onboard' },
  { id: 'profile', label: 'Profile', short: 'Profile' },
  { id: 'identification', label: 'Identification', short: 'ID Check' },
  { id: 'quote', label: 'Quote', short: 'Quote' },
  { id: 'purchase', label: 'Purchase', short: 'Purchase' },
  { id: 'claims', label: 'Claims (FNOL)', short: 'Claims' },
  { id: 'chat', label: 'Chat', short: 'Chat' }
]

const INITIAL_CHAT: ChatMessage[] = [
  { id: 'm1', from: 'driver', text: 'Hi, I need help with my claim.' },
  { id: 'm2', from: 'insurer', text: 'Thanks. I can see your FNOL. Can you confirm the location?' },
  { id: 'm3', from: 'driver', text: 'Munich, Leopoldstrasse 14.' },
  { id: 'm4', from: 'insurer', text: 'Got it. A handler will review. Do you prefer repair or payout?' }
]

const defaultState: DemoState = {
  verified: false,
  quoteReady: false,
  policyActive: false,
  claimSubmitted: false,
  locationCaptured: false,
  timeCaptured: false
}

const stateKey = 'driverDemoState'
const chatKey = 'driverDemoChat'

const safeParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export default function DemoDriverStepPage() {
  const { stepId } = useParams()
  const navigate = useNavigate()

  const [demoState, setDemoState] = useState<DemoState>(() => safeParse(sessionStorage.getItem(stateKey), defaultState))
  const [chatLog, setChatLog] = useState<ChatMessage[]>(() => safeParse(sessionStorage.getItem(chatKey), INITIAL_CHAT))

  useEffect(() => {
    sessionStorage.setItem(stateKey, JSON.stringify(demoState))
  }, [demoState])

  useEffect(() => {
    sessionStorage.setItem(chatKey, JSON.stringify(chatLog))
  }, [chatLog])

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

  const handleJump = (step: StepId) => {
    navigate(`/demo-driver/step/${step}`)
  }

  const stepperStatus = {
    identification: demoState.verified,
    quote: demoState.quoteReady,
    purchase: demoState.policyActive,
    claims: demoState.claimSubmitted
  }

  const appendChat = (text: string) => {
    setChatLog((prev) => [
      ...prev,
      { id: `m${prev.length + 1}`, from: 'driver', text },
      { id: `m${prev.length + 2}`, from: 'insurer', text: 'Thanks. A handler response is queued (demo).' }
    ])
  }

  const claimLocation = demoState.locationCaptured ? 'Munich, Leopoldstrasse 14' : 'Capture location'
  const claimTime = demoState.timeCaptured ? '29 Jan 2026, 08:42' : 'Capture timestamp'

  const stepView = {
    register: (
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="text-muted">Prefilled email</div>
            <div className="fw-bold">alex.driver@insurfox.demo</div>
          </div>
          <span className="badge bg-blue-lt text-blue">Verified domain</span>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <span className="badge bg-indigo-lt text-indigo">No password needed</span>
          <span className="badge bg-green-lt text-green">Consent stored</span>
          <span className="badge bg-azure-lt text-azure">2 min setup</span>
        </div>
        <button type="button" className="btn btn-primary" onClick={goNext}>Confirm email</button>
      </div>
    ),
    onboarding: (
      <div className="d-flex flex-column gap-3">
        <div className="text-muted">Guided onboarding wizard</div>
        <div className="d-flex flex-wrap gap-2">
          {['Account', 'Vehicle', 'Coverage', 'Support'].map((item, index) => (
            <span key={item} className={`badge ${index < 2 ? 'bg-green-lt text-green' : 'bg-blue-lt text-blue'}`}>
              {item}
            </span>
          ))}
        </div>
        <div className="progress">
          <div className="progress-bar bg-blue" style={{ width: '55%' }} />
        </div>
        <button type="button" className="btn btn-primary" onClick={goNext}>Continue onboarding</button>
      </div>
    ),
    profile: (
      <div className="d-flex flex-column gap-3">
        <div className="row g-2">
          {[
            { label: 'Driver', value: 'Alex Driver' },
            { label: 'Company', value: 'Insurfox Fleet GmbH' },
            { label: 'Vehicle', value: 'BMW 320d · M-IF 421' },
            { label: 'Coverage', value: 'Carrier liability + casco' }
          ].map((item) => (
            <div className="col-12 col-md-6" key={item.label}>
              <div className="border rounded-3 p-3">
                <div className="text-muted">{item.label}</div>
                <div className="fw-bold">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={goNext}>Confirm profile</button>
      </div>
    ),
    identification: (
      <div className="d-flex flex-column gap-3">
        <div className="row g-2">
          {[
            { label: 'ID document', value: 'German ID · OCR matched' },
            { label: 'Selfie match', value: demoState.verified ? 'Match verified' : 'Pending verification' }
          ].map((item) => (
            <div className="col-12 col-md-6" key={item.label}>
              <div className="border rounded-3 p-3 d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted">{item.label}</div>
                  <div className="fw-bold">{item.value}</div>
                </div>
                <span className={`badge ${demoState.verified ? 'bg-green-lt text-green' : 'bg-yellow-lt text-yellow'}`}>
                  {demoState.verified ? 'Verified' : 'Awaiting'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setDemoState((prev) => ({ ...prev, verified: true }))
            goNext()
          }}
        >
          Verify identity
        </button>
      </div>
    ),
    quote: (
      <div className="d-flex flex-column gap-3">
        <div className="text-muted">Carrier liability quote wizard</div>
        <div className="d-flex flex-wrap gap-2">
          {['Carrier liability', '3 vehicles', 'EU coverage', 'Telematics discount'].map((item) => (
            <span key={item} className="badge bg-azure-lt text-azure">{item}</span>
          ))}
        </div>
        <div className="border rounded-3 p-3 d-flex justify-content-between align-items-center">
          <div>
            <div className="text-muted">Estimated premium</div>
            <div className="fw-bold">€ 1,420 / month</div>
          </div>
          <span className={`badge ${demoState.quoteReady ? 'bg-green-lt text-green' : 'bg-yellow-lt text-yellow'}`}>
            {demoState.quoteReady ? 'Quote ready' : 'Draft'}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setDemoState((prev) => ({ ...prev, quoteReady: true }))
            goNext()
          }}
        >
          Generate quote
        </button>
      </div>
    ),
    purchase: (
      <div className="d-flex flex-column gap-3">
        <div className="text-muted">Checkout</div>
        <div className="border rounded-3 p-3">
          <div className="d-flex justify-content-between">
            <span>Carrier liability package</span>
            <span className="fw-semibold">€ 1,420</span>
          </div>
          <div className="d-flex justify-content-between text-muted">
            <span>Vehicles</span>
            <span>3</span>
          </div>
          <div className="d-flex justify-content-between text-muted">
            <span>Billing</span>
            <span>Monthly</span>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {['SEPA', 'Card', 'Invoice'].map((item) => (
            <span key={item} className="badge bg-indigo-lt text-indigo">{item}</span>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setDemoState((prev) => ({ ...prev, policyActive: true }))
            goNext()
          }}
        >
          Activate policy
        </button>
      </div>
    ),
    claims: (
      <div className="d-flex flex-column gap-3">
        <div className="text-muted">FNOL chatbot intake (structured)</div>
        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className={`btn btn-sm ${demoState.locationCaptured ? 'btn-success' : 'btn-outline-primary'}`}
            onClick={() => setDemoState((prev) => ({ ...prev, locationCaptured: true }))}
          >
            {claimLocation}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${demoState.timeCaptured ? 'btn-success' : 'btn-outline-primary'}`}
            onClick={() => setDemoState((prev) => ({ ...prev, timeCaptured: true }))}
          >
            {claimTime}
          </button>
        </div>
        <div className="row g-2">
          {[
            { label: 'Incident', value: 'Rear-end collision' },
            { label: 'Driver status', value: 'No injuries' },
            { label: 'Vehicle', value: 'BMW 320d · M-IF 421' },
            { label: 'Road conditions', value: 'Wet surface' }
          ].map((item) => (
            <div className="col-12 col-md-6" key={item.label}>
              <div className="border rounded-3 p-3">
                <div className="text-muted">{item.label}</div>
                <div className="fw-bold">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setDemoState((prev) => ({ ...prev, claimSubmitted: true }))
            goNext()
          }}
        >
          Submit FNOL
        </button>
      </div>
    ),
    chat: (
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          {chatLog.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded-3 ${msg.from === 'driver' ? 'bg-blue-lt text-blue ms-auto' : 'bg-gray-100 text-muted'}`}
              style={{ maxWidth: '85%' }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="d-flex flex-wrap gap-2">
          {['Book repair', 'Prefer payout', 'Need a call'].map((reply) => (
            <button key={reply} type="button" className="btn btn-outline-primary btn-sm" onClick={() => appendChat(reply)}>
              {reply}
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={goNext}>Finish demo</button>
      </div>
    )
  }[currentStep]

  const systemSnapshot = {
    register: [
      { label: 'Account status', value: 'Created (demo)' },
      { label: 'Email verified', value: 'Auto-confirmed' },
      { label: 'Risk score', value: 'Low' }
    ],
    onboarding: [
      { label: 'Wizard completion', value: '55%' },
      { label: 'Data quality', value: 'High' },
      { label: 'Support flag', value: 'None' }
    ],
    profile: [
      { label: 'Driver segment', value: 'Fleet driver' },
      { label: 'Company match', value: 'Validated' },
      { label: 'Vehicle class', value: 'Sedan' }
    ],
    identification: [
      { label: 'ID check', value: demoState.verified ? 'Verified' : 'Pending' },
      { label: 'Selfie match', value: demoState.verified ? '98% match' : 'Awaiting' },
      { label: 'Fraud signal', value: 'None' }
    ],
    quote: [
      { label: 'Carrier liability', value: 'Included' },
      { label: 'Vehicles', value: '3 added' },
      { label: 'Quote status', value: demoState.quoteReady ? 'Ready to bind' : 'Draft' }
    ],
    purchase: [
      { label: 'Payment method', value: 'SEPA' },
      { label: 'Policy state', value: demoState.policyActive ? 'Active' : 'Pending' },
      { label: 'Coverage start', value: 'Immediate' }
    ],
    claims: [
      { label: 'Location', value: demoState.locationCaptured ? 'Captured' : 'Missing' },
      { label: 'Timestamp', value: demoState.timeCaptured ? 'Captured' : 'Missing' },
      { label: 'FNOL status', value: demoState.claimSubmitted ? 'Submitted' : 'Draft' }
    ],
    chat: [
      { label: 'Handler', value: 'Assigned' },
      { label: 'HITL', value: 'Required' },
      { label: 'Next action', value: 'Repair decision' }
    ]
  }[currentStep]

  const aiCard = {
    register: 'AI suggests low-risk onboarding. Human review not required.',
    onboarding: 'AI recommends prioritizing vehicle data. Human review required.',
    profile: 'AI validates company profile; human approval for exceptions.',
    identification: 'AI face match suggests approval — requires human review.',
    quote: 'AI suggests coverage limits based on fleet usage.',
    purchase: 'AI flags policy for carrier confirmation.',
    claims: 'AI triages FNOL severity — requires human review.',
    chat: 'AI drafts responses; human handler approves.'
  }[currentStep]

  const auditLog = {
    register: ['Email captured', 'Consent stored', 'Account created'],
    onboarding: ['Wizard started', 'Vehicle section completed', 'Support resources shown'],
    profile: ['Profile confirmed', 'Company matched', 'Coverage recommended'],
    identification: ['ID uploaded', 'Selfie matched', demoState.verified ? 'Identity verified' : 'Identity pending'],
    quote: ['Quote draft created', demoState.quoteReady ? 'Quote approved' : 'Quote pending', 'Carrier rules applied'],
    purchase: ['Checkout reviewed', demoState.policyActive ? 'Policy activated' : 'Activation pending', 'Payment scheduled'],
    claims: ['Location captured', 'Timestamp captured', demoState.claimSubmitted ? 'FNOL submitted' : 'FNOL draft'],
    chat: ['Chat opened', 'HITL notice delivered', 'Handler response queued']
  }[currentStep]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Driver demo</div>
                <h2 className="page-title">{STEP_META[stepIndex].label}</h2>
                <div className="text-muted">Click-only guided journey. No manual input required.</div>
              </div>
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-outline-primary" onClick={goBack}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={goNext}>
                    {stepIndex === STEP_IDS.length - 1 ? 'Finish demo' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="card mb-3">
              <div className="card-body d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="fw-semibold">Step navigation</div>
                  <span className="badge bg-blue-lt">{stepLabel}</span>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {STEP_META.map((step) => {
                    const isActive = step.id === currentStep
                    const isDone = stepperStatus[step.id as keyof typeof stepperStatus]
                    const buttonClass = isActive
                      ? 'btn btn-primary btn-sm'
                      : isDone
                        ? 'btn btn-success btn-sm'
                        : 'btn btn-outline-primary btn-sm'

                    return (
                      <button key={step.id} type="button" className={buttonClass} onClick={() => handleJump(step.id)}>
                        {step.short}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="row row-cards">
              <div className="col-12 col-xl-7">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-blue-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 4h18v16H3z" />
                          <path d="M7 8h10" />
                          <path d="M7 12h6" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Step view</h3>
                    </div>
                    <span className="badge bg-blue-lt">{STEP_META[stepIndex].label}</span>
                  </div>
                  <div className="card-body">{stepView}</div>
                </div>
              </div>

              <div className="col-12 col-xl-5">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-yellow-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16v16H4z" />
                          <path d="M8 4v16" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">System snapshot</h3>
                    </div>
                    <span className="badge bg-yellow-lt">Captured</span>
                  </div>
                  <div className="card-body d-flex flex-column gap-2">
                    {systemSnapshot.map((item) => (
                      <div className="d-flex align-items-center justify-content-between" key={item.label}>
                        <span className="text-muted">{item.label}</span>
                        <span className="fw-semibold">{item.value}</span>
                      </div>
                    ))}
                    <div className="mt-3">
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-blue" style={{ width: demoState.policyActive ? '90%' : '60%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card h-100">
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
                    <div className="text-muted">{aiCard}</div>
                    <div className="mt-2">
                      <span className="badge bg-yellow-lt">AI suggestion — requires human review</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-8">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-green-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 7h16" />
                          <path d="M4 12h16" />
                          <path d="M4 17h16" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Audit log</h3>
                    </div>
                    <span className="badge bg-green-lt">Demo</span>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {auditLog.map((entry) => (
                        <div className="col-12 col-md-6" key={entry}>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="badge bg-blue-lt">Log</span>
                            <span>{entry}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info mt-3" role="alert">
              Demo data only. AI suggestions require human review.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
