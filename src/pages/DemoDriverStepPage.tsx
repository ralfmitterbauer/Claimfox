import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'

type StepId = 'register' | 'onboarding' | 'profile' | 'identification' | 'quote' | 'purchase' | 'claims' | 'chat'

type DriverDemoState = {
  accountCreated: boolean
  onboardingComplete: boolean
  profileConfirmed: boolean
  verified: boolean
  quoteReady: boolean
  policyActive: boolean
  claimSubmitted: boolean
  handlerAssigned: boolean
  slaRunning: boolean
  incidentSelected: boolean
  locationCaptured: boolean
  timestampCaptured: boolean
  claimTimestamp: string
}

type AuditEntry = { ts: string; message: string }

type AnimDoneMap = Record<string, boolean>

type ChatMessage = { id: string; from: 'driver' | 'insurer'; text: string }

type SnapshotBadge = { label: string; active: boolean; tone: 'green' | 'blue' | 'orange' | 'indigo' | 'red' }

type PhoneFieldProps = {
  label: string
  value: string
  isTyping?: boolean
  isDone?: boolean
}

const DEMO_DRIVER_STATE = 'DEMO_DRIVER_STATE'
const DEMO_DRIVER_AUDIT = 'DEMO_DRIVER_AUDIT'
const DEMO_DRIVER_ANIM_DONE = 'DEMO_DRIVER_ANIM_DONE'
const DEMO_DRIVER_CHAT = 'DEMO_DRIVER_CHAT'

const demoDefaults = {
  email: 'alex.driver@demo.insurfox',
  driver: 'Alex Driver',
  vehicle: 'M-IF 421',
  vehicleType: 'Car',
  policyNumber: 'PL-204889',
  insurer: 'Atlas Insurance',
  claimId: 'CLM-10421',
  location: 'Munich'
}

const STEP_META: Array<{ id: StepId; label: string; short: string; subtitle: string }> = [
  { id: 'register', label: 'Registration', short: 'Register', subtitle: 'Capture email in one click' },
  { id: 'onboarding', label: 'Onboarding', short: 'Onboard', subtitle: 'Wizard with progress' },
  { id: 'profile', label: 'Profile', short: 'Profile', subtitle: 'Driver + company overview' },
  { id: 'identification', label: 'Identification', short: 'ID Check', subtitle: 'ID + selfie match' },
  { id: 'quote', label: 'Quote', short: 'Quote', subtitle: 'Liability + vehicle quote' },
  { id: 'purchase', label: 'Purchase', short: 'Purchase', subtitle: 'Checkout & payment' },
  { id: 'claims', label: 'Claims', short: 'Claims', subtitle: 'FNOL chatbot intake' },
  { id: 'chat', label: 'Chat', short: 'Chat', subtitle: 'Insurer communication' }
]
const STEP_IDS: StepId[] = STEP_META.map((item) => item.id)
const STEP_TITLES: Record<StepId, string> = STEP_META.reduce((acc, item) => {
  acc[item.id] = item.label
  return acc
}, {} as Record<StepId, string>)

const INITIAL_CHAT: ChatMessage[] = [
  { id: 'c1', from: 'driver', text: 'Hi, I need help with my claim.' },
  { id: 'c2', from: 'insurer', text: 'Thanks. I can see your FNOL. Can you confirm the location?' },
  { id: 'c3', from: 'driver', text: 'Munich, Leopoldstrasse 14.' },
  { id: 'c4', from: 'insurer', text: 'Got it. A handler will review. Do you prefer repair or payout?' }
]

const defaultState: DriverDemoState = {
  accountCreated: false,
  onboardingComplete: false,
  profileConfirmed: false,
  verified: false,
  quoteReady: false,
  policyActive: false,
  claimSubmitted: false,
  handlerAssigned: false,
  slaRunning: false,
  incidentSelected: false,
  locationCaptured: false,
  timestampCaptured: false,
  claimTimestamp: ''
}

const safeParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

const readDemoState = (): DriverDemoState => safeParse(sessionStorage.getItem(DEMO_DRIVER_STATE), defaultState)
const writeDemoState = (next: DriverDemoState) => sessionStorage.setItem(DEMO_DRIVER_STATE, JSON.stringify(next))

const readAudit = (): AuditEntry[] => safeParse(sessionStorage.getItem(DEMO_DRIVER_AUDIT), [])
const appendAudit = (message: string) => {
  const ts = new Date().toISOString()
  const next = [{ ts, message }, ...readAudit()]
  sessionStorage.setItem(DEMO_DRIVER_AUDIT, JSON.stringify(next))
}
const clearAudit = () => sessionStorage.removeItem(DEMO_DRIVER_AUDIT)

const readAnimDone = (): AnimDoneMap => safeParse(sessionStorage.getItem(DEMO_DRIVER_ANIM_DONE), {})
const setAnimDone = (stepId: StepId, done = true) => {
  const next = { ...readAnimDone(), [stepId]: done }
  sessionStorage.setItem(DEMO_DRIVER_ANIM_DONE, JSON.stringify(next))
}

const readChat = (): ChatMessage[] => safeParse(sessionStorage.getItem(DEMO_DRIVER_CHAT), INITIAL_CHAT)
const writeChat = (messages: ChatMessage[]) => sessionStorage.setItem(DEMO_DRIVER_CHAT, JSON.stringify(messages))

const delay = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

const useTypewriter = (text: string, enabled: boolean, speedMs = 24) => {
  const [out, setOut] = useState(enabled ? '' : text)
  const [done, setDone] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      setOut(text)
      setDone(true)
      return
    }

    let index = 0
    setOut('')
    setDone(false)
    const interval = window.setInterval(() => {
      index += 1
      setOut(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(interval)
        setDone(true)
      }
    }, speedMs)

    return () => window.clearInterval(interval)
  }, [text, enabled, speedMs])

  return { out, done }
}

const useSequence = (enabled: boolean, steps: Array<() => Promise<void>>) => {
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(!enabled)

  useEffect(() => {
    let active = true

    if (!enabled) {
      setRunning(false)
      setFinished(true)
      return () => {
        active = false
      }
    }

    const run = async () => {
      setRunning(true)
      for (const step of steps) {
        if (!active) return
        await step()
      }
      if (!active) return
      setRunning(false)
      setFinished(true)
    }

    run()

    return () => {
      active = false
    }
  }, [enabled, steps])

  return { running, finished }
}

const PhoneField = ({ label, value, isTyping, isDone }: PhoneFieldProps) => (
  <div className={isDone ? 'demo-fade-in' : undefined}>
    <div className="text-muted">{label}</div>
    <div className={isTyping ? 'typing-cursor fill-anim' : undefined}>{value}</div>
  </div>
)

export default function DemoDriverStepPage() {
  const { stepId } = useParams()
  const navigate = useNavigate()

  const stepIndex = useMemo(() => STEP_META.findIndex((step) => step.id === stepId), [stepId])

  if (stepIndex === -1) {
    return <Navigate to="/demo-driver" replace />
  }

  const step = STEP_META[stepIndex]
  const animDoneMap = readAnimDone()
  const shouldAnimate = !animDoneMap[step.id]

  const [demoState, setDemoState] = useState<DriverDemoState>(() => readDemoState())
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(() => readAudit())
  const [chatLog, setChatLog] = useState<ChatMessage[]>(() => readChat())
  const [adminOpen, setAdminOpen] = useState(false)

  const updateState = useCallback((next: DriverDemoState) => {
    setDemoState(next)
    writeDemoState(next)
  }, [])

  const logAudit = useCallback((message: string) => {
    appendAudit(message)
    setAuditLog(readAudit())
  }, [])

  const goBack = () => {
    if (stepIndex === 0) {
      navigate('/demo-driver')
      return
    }
    navigate(`/demo-driver/step/${STEP_META[stepIndex - 1].id}`)
  }

  const goNext = () => {
    if (stepIndex >= STEP_META.length - 1) {
      navigate('/demo-driver')
      return
    }
    navigate(`/demo-driver/step/${STEP_META[stepIndex + 1].id}`)
  }

  const handleJump = (target: StepId) => {
    navigate(`/demo-driver/step/${target}`)
  }

  const resetAll = () => {
    sessionStorage.removeItem(DEMO_DRIVER_STATE)
    clearAudit()
    sessionStorage.removeItem(DEMO_DRIVER_ANIM_DONE)
    sessionStorage.removeItem(DEMO_DRIVER_CHAT)
    setDemoState(defaultState)
    setAuditLog([])
    setChatLog(INITIAL_CHAT)
  }

  const snapshotBadges: SnapshotBadge[] = [
    { label: 'Verified', active: demoState.verified, tone: 'green' },
    { label: 'Quote Ready', active: demoState.quoteReady, tone: 'blue' },
    { label: 'Policy Active', active: demoState.policyActive, tone: 'indigo' },
    { label: 'Claim Submitted', active: demoState.claimSubmitted, tone: 'orange' },
    { label: 'Handler Assigned', active: demoState.handlerAssigned, tone: 'green' },
    { label: 'SLA Running', active: demoState.slaRunning, tone: 'red' }
  ]

  const hitlBullets: Record<StepId, string[]> = {
    register: ['AI checks domain risk score', 'Auto-approves low risk signup', 'No decision without human override'],
    onboarding: ['AI suggests completion order', 'Flags missing vehicle info', 'Human review required for exceptions'],
    profile: ['AI validates company match', 'Detects policy overlap', 'Human review for overrides'],
    identification: ['AI runs ID + selfie match', 'Confidence score shown', 'Human approval required'],
    quote: ['AI recommends liability limits', 'Uses fleet exposure data', 'Human review before bind'],
    purchase: ['AI checks payment anomalies', 'Flags policy conflicts', 'Human review required'],
    claims: ['AI triages FNOL severity', 'Detects injury risk', 'Human handler approves'],
    chat: ['AI drafts responses', 'Human handler approves', 'Audit trail stored']
  }

  const registerTyping = useTypewriter(demoDefaults.email, shouldAnimate && step.id === 'register', 28)
  const registerReady = !shouldAnimate || registerTyping.done

  useEffect(() => {
    if (step.id === 'register' && shouldAnimate && registerTyping.done) {
      setAnimDone('register')
    }
  }, [step.id, shouldAnimate, registerTyping.done])

  const [onboardingStage, setOnboardingStage] = useState(shouldAnimate && step.id === 'onboarding' ? 0 : 3)
  const onboardingSteps = useMemo(() => [
    async () => {
      setOnboardingStage(1)
      await delay(280)
    },
    async () => {
      setOnboardingStage(2)
      await delay(280)
    },
    async () => {
      setOnboardingStage(3)
      await delay(200)
    }
  ], [])
  const onboardingSequence = useSequence(shouldAnimate && step.id === 'onboarding', onboardingSteps)
  const onboardingReady = !shouldAnimate || onboardingSequence.finished

  useEffect(() => {
    if (step.id === 'onboarding' && shouldAnimate && onboardingSequence.finished) {
      setAnimDone('onboarding')
    }
  }, [step.id, shouldAnimate, onboardingSequence.finished])

  type ProfileKey = 'name' | 'dob' | 'plate' | 'vehicle' | 'policy' | 'insurer' | 'done'
  const [profileKey, setProfileKey] = useState<ProfileKey>(shouldAnimate && step.id === 'profile' ? 'name' : 'done')
  const profileName = useTypewriter('Alex Driver', shouldAnimate && step.id === 'profile' && profileKey === 'name', 22)
  const profileDob = useTypewriter('12 Apr 1993', shouldAnimate && step.id === 'profile' && profileKey === 'dob', 22)
  const profilePlate = useTypewriter('M-IF 421', shouldAnimate && step.id === 'profile' && profileKey === 'plate', 22)
  const profileVehicle = useTypewriter('Car', shouldAnimate && step.id === 'profile' && profileKey === 'vehicle', 22)
  const profilePolicy = useTypewriter(demoDefaults.policyNumber, shouldAnimate && step.id === 'profile' && profileKey === 'policy', 22)
  const profileInsurer = useTypewriter(demoDefaults.insurer, shouldAnimate && step.id === 'profile' && profileKey === 'insurer', 22)

  useEffect(() => {
    if (step.id !== 'profile' || !shouldAnimate) return
    if (profileKey === 'name' && profileName.done) setProfileKey('dob')
    if (profileKey === 'dob' && profileDob.done) setProfileKey('plate')
    if (profileKey === 'plate' && profilePlate.done) setProfileKey('vehicle')
    if (profileKey === 'vehicle' && profileVehicle.done) setProfileKey('policy')
    if (profileKey === 'policy' && profilePolicy.done) setProfileKey('insurer')
    if (profileKey === 'insurer' && profileInsurer.done) setProfileKey('done')
  }, [step.id, shouldAnimate, profileKey, profileName.done, profileDob.done, profilePlate.done, profileVehicle.done, profilePolicy.done, profileInsurer.done])

  const profileReady = !shouldAnimate || profileKey === 'done'

  useEffect(() => {
    if (step.id === 'profile' && shouldAnimate && profileKey === 'done') {
      setAnimDone('profile')
    }
  }, [step.id, shouldAnimate, profileKey])

  type IdKey = 'id' | 'selfie' | 'confidence' | 'done'
  const [idKey, setIdKey] = useState<IdKey>(shouldAnimate && step.id === 'identification' ? 'id' : 'done')
  const idStatus = useTypewriter('ID scanned (demo)', shouldAnimate && step.id === 'identification' && idKey === 'id', 22)
  const selfieStatus = useTypewriter('Selfie matched (demo)', shouldAnimate && step.id === 'identification' && idKey === 'selfie', 22)
  const confidenceStatus = useTypewriter('Match confidence: 96%', shouldAnimate && step.id === 'identification' && idKey === 'confidence', 22)

  useEffect(() => {
    if (step.id !== 'identification' || !shouldAnimate) return
    if (idKey === 'id' && idStatus.done) setIdKey('selfie')
    if (idKey === 'selfie' && selfieStatus.done) setIdKey('confidence')
    if (idKey === 'confidence' && confidenceStatus.done) setIdKey('done')
  }, [step.id, shouldAnimate, idKey, idStatus.done, selfieStatus.done, confidenceStatus.done])

  const identificationReady = !shouldAnimate || idKey === 'done'

  useEffect(() => {
    if (step.id === 'identification' && shouldAnimate && idKey === 'done') {
      setAnimDone('identification')
    }
  }, [step.id, shouldAnimate, idKey])

  const [quoteStage, setQuoteStage] = useState(shouldAnimate && step.id === 'quote' ? 0 : 3)
  const quoteCoverage = useTypewriter('Carrier liability + vehicle', shouldAnimate && step.id === 'quote' && quoteStage >= 3, 22)
  const quotePremium = useTypewriter('€ 129 / month', shouldAnimate && step.id === 'quote' && quoteStage >= 3 && quoteCoverage.done, 22)

  const quoteSteps = useMemo(() => [
    async () => {
      setQuoteStage(1)
      await delay(220)
    },
    async () => {
      setQuoteStage(2)
      await delay(220)
    },
    async () => {
      setQuoteStage(3)
      await delay(220)
    }
  ], [])
  const quoteSequence = useSequence(shouldAnimate && step.id === 'quote', quoteSteps)

  const quoteReady = !shouldAnimate || (quoteSequence.finished && quotePremium.done)

  useEffect(() => {
    if (step.id === 'quote' && shouldAnimate && quoteSequence.finished && quotePremium.done) {
      setAnimDone('quote')
    }
  }, [step.id, shouldAnimate, quoteSequence.finished, quotePremium.done])

  type PurchaseKey = 'payment' | 'billing' | 'total' | 'done'
  const [purchaseKey, setPurchaseKey] = useState<PurchaseKey>(shouldAnimate && step.id === 'purchase' ? 'payment' : 'done')
  const paymentMethod = useTypewriter('Visa •••• 2048', shouldAnimate && step.id === 'purchase' && purchaseKey === 'payment', 22)
  const billingCycle = useTypewriter('Monthly', shouldAnimate && step.id === 'purchase' && purchaseKey === 'billing', 22)
  const purchaseTotal = useTypewriter('€ 129 / month', shouldAnimate && step.id === 'purchase' && purchaseKey === 'total', 22)

  useEffect(() => {
    if (step.id !== 'purchase' || !shouldAnimate) return
    if (purchaseKey === 'payment' && paymentMethod.done) setPurchaseKey('billing')
    if (purchaseKey === 'billing' && billingCycle.done) setPurchaseKey('total')
    if (purchaseKey === 'total' && purchaseTotal.done) setPurchaseKey('done')
  }, [step.id, shouldAnimate, purchaseKey, paymentMethod.done, billingCycle.done, purchaseTotal.done])

  const purchaseReady = !shouldAnimate || purchaseKey === 'done'

  useEffect(() => {
    if (step.id === 'purchase' && shouldAnimate && purchaseKey === 'done') {
      setAnimDone('purchase')
    }
  }, [step.id, shouldAnimate, purchaseKey])

  const [claimIncidentChoice, setClaimIncidentChoice] = useState<'Accident' | 'Theft' | 'Glass' | null>(demoState.incidentSelected ? 'Accident' : null)
  const [incidentTyping, setIncidentTyping] = useState(false)
  const [locationTyping, setLocationTyping] = useState(false)

  const incidentText = !claimIncidentChoice
    ? 'Select incident'
    : claimIncidentChoice === 'Theft'
      ? 'Vehicle theft'
      : claimIncidentChoice === 'Glass'
        ? 'Glass damage'
        : 'Rear-end collision'

  const descriptionText = !claimIncidentChoice
    ? 'Tap incident chip to fill'
    : claimIncidentChoice === 'Theft'
      ? 'Vehicle missing from parking area.'
      : claimIncidentChoice === 'Glass'
        ? 'Front windshield cracked during drive.'
        : 'Rear-end collision at traffic light.'

  const incidentTyped = useTypewriter(incidentText, shouldAnimate && step.id === 'claims' && incidentTyping, 22)
  const descriptionTyped = useTypewriter(descriptionText, shouldAnimate && step.id === 'claims' && incidentTyping && incidentTyped.done, 22)

  const locationTyped = useTypewriter(demoDefaults.location, shouldAnimate && step.id === 'claims' && locationTyping, 22)
  const timestampTyped = useTypewriter(demoState.claimTimestamp || '29 Jan 2026, 08:42', shouldAnimate && step.id === 'claims' && locationTyping && locationTyped.done, 22)

  const locationValue = shouldAnimate
    ? (locationTyping ? locationTyped.out : (demoState.locationCaptured ? demoDefaults.location : 'Tap capture location'))
    : (demoState.locationCaptured ? demoDefaults.location : 'Tap capture location')

  const timestampValue = shouldAnimate
    ? (locationTyping ? timestampTyped.out : (demoState.claimTimestamp || 'Tap to capture time'))
    : (demoState.claimTimestamp || 'Tap to capture time')

  useEffect(() => {
    if (step.id !== 'claims' || !shouldAnimate) return
    if (incidentTyping && incidentTyped.done && descriptionTyped.done) {
      setIncidentTyping(false)
    }
  }, [step.id, shouldAnimate, incidentTyping, incidentTyped.done, descriptionTyped.done])

  useEffect(() => {
    if (step.id !== 'claims' || !shouldAnimate) return
    if (locationTyping && locationTyped.done && timestampTyped.done) {
      setLocationTyping(false)
    }
  }, [step.id, shouldAnimate, locationTyping, locationTyped.done, timestampTyped.done])

  const claimsReady = !shouldAnimate
    ? (demoState.incidentSelected && demoState.locationCaptured && demoState.timestampCaptured)
    : (incidentTyped.done && descriptionTyped.done && locationTyped.done && timestampTyped.done)

  useEffect(() => {
    if (step.id === 'claims' && shouldAnimate && claimsReady) {
      setAnimDone('claims')
    }
  }, [step.id, shouldAnimate, claimsReady])

  const [chatVisible, setChatVisible] = useState(shouldAnimate && step.id === 'chat' ? 0 : chatLog.length)

  useEffect(() => {
    if (step.id !== 'chat' || !shouldAnimate) return
    let active = true
    const run = async () => {
      for (let i = 0; i < INITIAL_CHAT.length; i += 1) {
        if (!active) return
        setChatVisible(i + 1)
        await delay(500 + i * 120)
      }
    }
    run()
    return () => { active = false }
  }, [step.id, shouldAnimate])

  const chatReady = !shouldAnimate || chatVisible >= INITIAL_CHAT.length

  useEffect(() => {
    if (step.id === 'chat' && shouldAnimate && chatReady) {
      setAnimDone('chat')
    }
  }, [step.id, shouldAnimate, chatReady])

  const addChatMessage = async (text: string) => {
    const driverMessage: ChatMessage = { id: `c${Date.now()}`, from: 'driver', text }
    const insurerMessage: ChatMessage = { id: `c${Date.now()}-r`, from: 'insurer', text: 'Handler response queued (demo).' }
    const next = [...chatLog, driverMessage]
    setChatLog(next)
    writeChat(next)
    await delay(420)
    const nextWithReply = [...next, insurerMessage]
    setChatLog(nextWithReply)
    writeChat(nextWithReply)
    logAudit('Driver sent quick reply')
  }

  const handleIncidentClick = (choice: 'Accident' | 'Theft' | 'Glass') => {
    setClaimIncidentChoice(choice)
    setIncidentTyping(true)
    updateState({
      ...demoState,
      incidentSelected: true
    })
  }

  const handleLocationClick = () => {
    const timestamp = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
    const time = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    const fullStamp = `${timestamp}, ${time}`

    updateState({
      ...demoState,
      locationCaptured: true,
      timestampCaptured: true,
      claimTimestamp: fullStamp
    })

    if (!shouldAnimate) return
    setLocationTyping(true)
  }

  const stepCards: Record<StepId, React.ReactNode> = {
    register: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Welcome to Insurfox</div>
            <div className="hint">1-tap registration</div>
          </div>
          <div className="phone-card-body">
            <PhoneField label="Email" value={registerTyping.out} isTyping={!registerTyping.done && shouldAnimate} isDone={registerTyping.done} />
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-blue-lt text-blue">Auto-verified</span>
              <span className="badge bg-green-lt text-green">Consent stored</span>
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!registerReady}
            onClick={() => {
              updateState({ ...demoState, accountCreated: true })
              logAudit('Registration started (email captured)')
              setAnimDone('register')
              goNext()
            }}
          >
            Continue
          </button>
        </div>
      </>
    ),
    onboarding: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Onboarding wizard</div>
            <div className="hint">Progressive setup</div>
          </div>
          <div className="phone-card-body">
            <div className="progress">
              <div className="progress-bar bg-indigo" style={{ width: `${30 + onboardingStage * 20}%` }} />
            </div>
            <div className="d-flex flex-wrap gap-2">
              {['Basics', 'Vehicle', 'Consent'].map((item, index) => (
                <span
                  key={item}
                  className={`badge ${onboardingStage > index ? 'bg-green-lt text-green demo-fade-in' : 'bg-blue-lt text-blue'}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!onboardingReady}
            onClick={() => {
              updateState({ ...demoState, onboardingComplete: true })
              logAudit('Onboarding completed (wizard)')
              setAnimDone('onboarding')
              goNext()
            }}
          >
            Complete onboarding
          </button>
        </div>
      </>
    ),
    profile: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Profile overview</div>
            <div className="hint">Auto-filled</div>
          </div>
          <div className="phone-card-body">
            <PhoneField label="Full name" value={profileName.out} isTyping={profileKey === 'name' && shouldAnimate} isDone={profileName.done} />
            <PhoneField label="DOB" value={profileDob.out} isTyping={profileKey === 'dob' && shouldAnimate} isDone={profileDob.done} />
            <PhoneField label="Plate" value={profilePlate.out} isTyping={profileKey === 'plate' && shouldAnimate} isDone={profilePlate.done} />
            <PhoneField label="Vehicle" value={profileVehicle.out} isTyping={profileKey === 'vehicle' && shouldAnimate} isDone={profileVehicle.done} />
            <PhoneField label="Policy" value={profilePolicy.out} isTyping={profileKey === 'policy' && shouldAnimate} isDone={profilePolicy.done} />
            <PhoneField label="Insurer" value={profileInsurer.out} isTyping={profileKey === 'insurer' && shouldAnimate} isDone={profileInsurer.done} />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!profileReady}
            onClick={() => {
              updateState({ ...demoState, profileConfirmed: true })
              logAudit('Profile confirmed')
              setAnimDone('profile')
              goNext()
            }}
          >
            Confirm profile
          </button>
        </div>
      </>
    ),
    identification: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Identification</div>
            <div className="hint">ID + selfie match</div>
          </div>
          <div className="phone-card-body">
            <PhoneField label="ID status" value={idStatus.out} isTyping={idKey === 'id' && shouldAnimate} isDone={idStatus.done} />
            <PhoneField label="Selfie" value={selfieStatus.out} isTyping={idKey === 'selfie' && shouldAnimate} isDone={selfieStatus.done} />
            <PhoneField label="Confidence" value={confidenceStatus.out} isTyping={idKey === 'confidence' && shouldAnimate} isDone={confidenceStatus.done} />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!identificationReady}
            onClick={() => {
              updateState({ ...demoState, verified: true })
              logAudit('Identity verified (ID + selfie match)')
              setAnimDone('identification')
              goNext()
            }}
          >
            Verify identity
          </button>
        </div>
      </>
    ),
    quote: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Quote builder</div>
            <div className="hint">Liability + vehicles</div>
          </div>
          <div className="phone-card-body">
            <div className="d-flex flex-wrap gap-2">
              {['Liability', 'Vehicle', 'Summary'].map((item, index) => (
                <span
                  key={item}
                  className={`badge ${quoteStage > index ? 'bg-green-lt text-green demo-fade-in' : 'bg-blue-lt text-blue'}`}
                >
                  {item}
                </span>
              ))}
            </div>
            <PhoneField label="Coverage" value={quoteCoverage.out} isTyping={!quoteCoverage.done && shouldAnimate && quoteStage >= 3} isDone={quoteCoverage.done} />
            <PhoneField label="Premium" value={quotePremium.out} isTyping={!quotePremium.done && shouldAnimate && quoteStage >= 3} isDone={quotePremium.done} />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!quoteReady}
            onClick={() => {
              updateState({ ...demoState, quoteReady: true })
              logAudit('Quote generated (liability + vehicle)')
              setAnimDone('quote')
              goNext()
            }}
          >
            Generate quote
          </button>
        </div>
      </>
    ),
    purchase: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Checkout</div>
            <div className="hint">Payment ready</div>
          </div>
          <div className="phone-card-body">
            <PhoneField label="Payment method" value={paymentMethod.out} isTyping={purchaseKey === 'payment' && shouldAnimate} isDone={paymentMethod.done} />
            <PhoneField label="Billing" value={billingCycle.out} isTyping={purchaseKey === 'billing' && shouldAnimate} isDone={billingCycle.done} />
            <PhoneField label="Total" value={purchaseTotal.out} isTyping={purchaseKey === 'total' && shouldAnimate} isDone={purchaseTotal.done} />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!purchaseReady}
            onClick={() => {
              updateState({ ...demoState, policyActive: true })
              logAudit('Policy purchased and activated')
              setAnimDone('purchase')
              goNext()
            }}
          >
            Activate policy
          </button>
        </div>
      </>
    ),
    claims: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">FNOL chatbot</div>
            <div className="hint">Structured intake</div>
          </div>
          <div className="phone-card-body">
            <div className="d-flex flex-wrap gap-2">
              {['Accident', 'Theft', 'Glass'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`btn btn-sm ${claimIncidentChoice === item ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleIncidentClick(item as 'Accident' | 'Theft' | 'Glass')}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                className={`btn btn-sm ${demoState.locationCaptured ? 'btn-success' : 'btn-outline-primary'}`}
                onClick={handleLocationClick}
              >
                Capture location
              </button>
            </div>
            <PhoneField
              label="Incident type"
              value={shouldAnimate ? incidentTyped.out : incidentText}
              isTyping={incidentTyping && shouldAnimate && !incidentTyped.done}
              isDone={!shouldAnimate || incidentTyped.done}
            />
            <PhoneField
              label="Description"
              value={shouldAnimate ? descriptionTyped.out : descriptionText}
              isTyping={incidentTyping && shouldAnimate && incidentTyped.done && !descriptionTyped.done}
              isDone={!shouldAnimate || descriptionTyped.done}
            />
            <PhoneField
              label="Location"
              value={locationValue}
              isTyping={locationTyping && shouldAnimate && !locationTyped.done}
              isDone={!shouldAnimate || locationTyped.done}
            />
            <PhoneField
              label="Timestamp"
              value={timestampValue}
              isTyping={locationTyping && shouldAnimate && locationTyped.done && !timestampTyped.done}
              isDone={!shouldAnimate || timestampTyped.done}
            />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!claimsReady}
            onClick={() => {
              updateState({ ...demoState, claimSubmitted: true, slaRunning: true })
              logAudit(`FNOL submitted (${demoDefaults.claimId})`)
              logAudit('SLA started (24h initial response)')
              setAnimDone('claims')
              goNext()
            }}
          >
            Submit FNOL
          </button>
        </div>
      </>
    ),
    chat: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Chat with insurer</div>
            <div className="hint">HITL enabled</div>
          </div>
          <div className="phone-card-body">
            <div className="phone-chat">
              {(shouldAnimate ? INITIAL_CHAT.slice(0, chatVisible) : chatLog).map((msg) => (
                <div key={msg.id} className={`phone-bubble ${msg.from === 'driver' ? 'driver' : 'insurer'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="phone-quick-replies">
              {['Book repair', 'Prefer payout', 'Need a call'].map((reply) => (
                <button key={reply} type="button" className="phone-chip" onClick={() => addChatMessage(reply)}>
                  {reply}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!chatReady}
            onClick={() => {
              updateState({ ...demoState, handlerAssigned: true })
              logAudit('Handler assigned (HITL)')
              setAnimDone('chat')
              goNext()
            }}
          >
            Assign handler
          </button>
        </div>
      </>
    )
  }

  const currentStep = step.id
  const audit = auditLog
  const snapshot = snapshotBadges.map((badge) => ({ label: badge.label, on: badge.active }))

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Driver demo</div>
                <h2 className="page-title">{step.label}</h2>
                <div className="text-muted">{step.subtitle}</div>
              </div>
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-outline-primary" onClick={goBack}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={goNext}>
                    {stepIndex === STEP_META.length - 1 ? 'Finish demo' : 'Next'}
                  </button>
                  <button type="button" className="btn btn-outline-primary" onClick={resetAll}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="demo-shell">
            <div className="demo-driver">
              <div className="phone-frame">
                <div className="phone-statusbar">
                  <span>09:41</span>
                  <span>LTE · 88%</span>
                </div>
                <div className="phone-appbar">
                  <div className="phone-appbar-title">
                    <strong>{step.label}</strong>
                    <span>{step.subtitle}</span>
                  </div>
                  <span className="badge bg-blue-lt text-blue">{stepIndex + 1}/8</span>
                </div>
                <div className="phone-body">{stepCards[step.id]}</div>
              </div>
            </div>

            <aside className="demo-admin">
              <button
                type="button"
                className="btn btn-outline-primary admin-collapse"
                aria-expanded={adminOpen}
                onClick={() => setAdminOpen((prev) => !prev)}
              >
                {adminOpen ? 'Hide admin view' : 'Show admin view'}
              </button>
              <div className="demo-admin-inner">
                <div className="admin-panel">
                  <h4>Step navigation</h4>
                  <div className="list-group">
                    {STEP_IDS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s === currentStep ? 'active' : ''}`}
                        onClick={() => handleJump(s)}
                      >
                        <span>{STEP_TITLES[s]}</span>
                        <span className="badge bg-blue-lt">{s}</span>
                      </button>
                    ))}
                  </div>

                  <hr style={{ margin: '0.75rem 0' }} />

                  <h4>AI & HITL</h4>
                  <ul>
                    {hitlBullets[currentStep].map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <hr style={{ margin: '0.75rem 0' }} />

                  <h4>Audit log</h4>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {audit.slice(0, 10).map((a, idx) => (
                      <div key={`${a.ts}-${idx}`} className="admin-audit-item">
                        <div className="ts">{new Date(a.ts).toLocaleString()}</div>
                        <div className="msg">{a.message}</div>
                      </div>
                    ))}
                    {audit.length === 0 && <div className="text-muted">No entries yet.</div>}
                  </div>

                  <hr style={{ margin: '0.75rem 0' }} />

                  <h4>Snapshot</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {snapshot.map((s) => (
                      <span key={s.label} className={`badge ${s.on ? 'bg-success-lt' : 'bg-secondary-lt'}`}>
                        {s.label}
                      </span>
                    ))}
                  </div>

                  <hr style={{ margin: '0.75rem 0' }} />

                  <div style={{ fontSize: '0.78rem', color: 'var(--tblr-muted, #667085)' }}>
                    Demo data only. AI suggestions require human review.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
