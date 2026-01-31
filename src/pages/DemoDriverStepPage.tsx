import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import IphoneMock from '@/assets/images/iphonemock.png'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import { useI18n } from '@/i18n/I18nContext'

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

const getDemoDefaults = (isEn: boolean) => ({
  email: 'alex.driver@demo.insurfox',
  driver: 'Alex Driver',
  vehicle: 'M-IF 421',
  vehicleType: isEn ? 'Car' : 'Auto',
  policyNumber: 'PL-204889',
  insurer: 'Atlas Insurance',
  claimId: 'CLM-10421',
  location: isEn ? 'Munich' : 'München'
})

const getStepMeta = (isEn: boolean): Array<{ id: StepId; label: string; short: string; subtitle: string }> => [
  { id: 'register', label: isEn ? 'Registration' : 'Registrierung', short: isEn ? 'Register' : 'Start', subtitle: isEn ? 'Capture email in one click' : 'E-Mail mit einem Klick erfassen' },
  { id: 'onboarding', label: isEn ? 'Onboarding' : 'Onboarding', short: isEn ? 'Onboard' : 'Setup', subtitle: isEn ? 'Wizard with progress' : 'Wizard mit Fortschritt' },
  { id: 'profile', label: isEn ? 'Profile' : 'Profil', short: isEn ? 'Profile' : 'Profil', subtitle: isEn ? 'Driver + company overview' : 'Fahrer- & Unternehmensübersicht' },
  { id: 'identification', label: isEn ? 'Identification' : 'Identifikation', short: isEn ? 'ID Check' : 'ID-Check', subtitle: isEn ? 'ID + selfie match' : 'ID + Selfie-Abgleich' },
  { id: 'quote', label: isEn ? 'Quote' : 'Angebot', short: isEn ? 'Quote' : 'Quote', subtitle: isEn ? 'Liability + vehicle quote' : 'Haftpflicht + Fahrzeug-Angebot' },
  { id: 'purchase', label: isEn ? 'Purchase' : 'Abschluss', short: isEn ? 'Purchase' : 'Kauf', subtitle: isEn ? 'Checkout & payment' : 'Checkout & Zahlung' },
  { id: 'claims', label: isEn ? 'Claims' : 'Schaden', short: isEn ? 'Claims' : 'Schaden', subtitle: isEn ? 'FNOL chatbot intake' : 'FNOL-Chatbot Intake' },
  { id: 'chat', label: isEn ? 'Chat' : 'Chat', short: isEn ? 'Chat' : 'Chat', subtitle: isEn ? 'Insurer communication' : 'Kommunikation mit dem Versicherer' }
]

const getInitialChat = (isEn: boolean): ChatMessage[] => ([
  { id: 'c1', from: 'driver', text: isEn ? 'Hi, I need help with my claim.' : 'Hallo, ich brauche Hilfe mit meinem Schaden.' },
  { id: 'c2', from: 'insurer', text: isEn ? 'Thanks. I can see your FNOL. Can you confirm the location?' : 'Danke. Ich sehe Ihre FNOL. Können Sie den Ort bestätigen?' },
  { id: 'c3', from: 'driver', text: isEn ? 'Munich, Leopoldstrasse 14.' : 'München, Leopoldstraße 14.' },
  { id: 'c4', from: 'insurer', text: isEn ? 'Got it. A handler will review. Do you prefer repair or payout?' : 'Verstanden. Ein Sachbearbeiter prüft. Bevorzugen Sie Reparatur oder Auszahlung?' }
])

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

const readChat = (fallback: ChatMessage[]): ChatMessage[] => safeParse(sessionStorage.getItem(DEMO_DRIVER_CHAT), fallback)
const writeChat = (messages: ChatMessage[]) => sessionStorage.setItem(DEMO_DRIVER_CHAT, JSON.stringify(messages))

const delay = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

const useTypewriter = (text: string, enabled: boolean, speedMs = 36) => {
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
    <div className={`${isTyping ? 'typing-cursor fill-anim' : ''} fw-semibold text-dark`}>{value}</div>
  </div>
)

export default function DemoDriverStepPage() {
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const tr = useCallback((en: string, de: string) => (isEn ? en : de), [isEn])
  const { stepId } = useParams()
  const navigate = useNavigate()

  const demoDefaults = useMemo(() => getDemoDefaults(isEn), [isEn])
  const locale = isEn ? 'en-US' : 'de-DE'
  const STEP_META = useMemo(() => getStepMeta(isEn), [isEn])
  const STEP_IDS: StepId[] = useMemo(() => STEP_META.map((item) => item.id), [STEP_META])
  const STEP_TITLES: Record<StepId, string> = useMemo(() => STEP_META.reduce((acc, item) => {
    acc[item.id] = item.label
    return acc
  }, {} as Record<StepId, string>), [STEP_META])
  const INITIAL_CHAT = useMemo(() => getInitialChat(isEn), [isEn])

  const stepIndex = useMemo(() => STEP_META.findIndex((step) => step.id === stepId), [stepId])

  if (stepIndex === -1) {
    return <Navigate to="/demo-driver" replace />
  }

  const step = STEP_META[stepIndex]
  const animDoneMap = readAnimDone()
  const shouldAnimate = !animDoneMap[step.id]

  const [demoState, setDemoState] = useState<DriverDemoState>(() => readDemoState())
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(() => readAudit())
  const [chatLog, setChatLog] = useState<ChatMessage[]>(() => readChat(INITIAL_CHAT))

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
    { label: tr('Verified', 'Verifiziert'), active: demoState.verified, tone: 'green' },
    { label: tr('Quote Ready', 'Angebot bereit'), active: demoState.quoteReady, tone: 'blue' },
    { label: tr('Policy Active', 'Police aktiv'), active: demoState.policyActive, tone: 'indigo' },
    { label: tr('Claim Submitted', 'Schaden eingereicht'), active: demoState.claimSubmitted, tone: 'orange' },
    { label: tr('Handler Assigned', 'Sachbearbeiter zugewiesen'), active: demoState.handlerAssigned, tone: 'green' },
    { label: tr('SLA Running', 'SLA läuft'), active: demoState.slaRunning, tone: 'red' }
  ]

  const hitlBullets: Record<StepId, string[]> = {
    register: [
      tr('AI checks domain risk score', 'KI prüft Domain-Risikoscore'),
      tr('Auto-approves low risk signup', 'Gibt Low-Risk-Anmeldungen automatisch frei'),
      tr('No decision without human override', 'Keine Entscheidung ohne menschliche Freigabe')
    ],
    onboarding: [
      tr('AI suggests completion order', 'KI schlägt Reihenfolge vor'),
      tr('Flags missing vehicle info', 'Markiert fehlende Fahrzeugdaten'),
      tr('Human review required for exceptions', 'Ausnahmen erfordern menschliche Prüfung')
    ],
    profile: [
      tr('AI validates company match', 'KI validiert Unternehmensabgleich'),
      tr('Detects policy overlap', 'Erkennt Policen-Überschneidungen'),
      tr('Human review for overrides', 'Overrides benötigen menschliche Prüfung')
    ],
    identification: [
      tr('AI runs ID + selfie match', 'KI führt ID- + Selfie-Abgleich aus'),
      tr('Confidence score shown', 'Konfidenz wird angezeigt'),
      tr('Human approval required', 'Menschliche Freigabe erforderlich')
    ],
    quote: [
      tr('AI recommends liability limits', 'KI empfiehlt Haftpflicht-Limits'),
      tr('Uses fleet exposure data', 'Nutzt Flotten-Exposure-Daten'),
      tr('Human review before bind', 'Menschliche Prüfung vor Bindung')
    ],
    purchase: [
      tr('AI checks payment anomalies', 'KI prüft Zahlungsanomalien'),
      tr('Flags policy conflicts', 'Markiert Policen-Konflikte'),
      tr('Human review required', 'Menschliche Prüfung erforderlich')
    ],
    claims: [
      tr('AI triages FNOL severity', 'KI triagiert FNOL-Schwere'),
      tr('Detects injury risk', 'Erkennt Verletzungsrisiko'),
      tr('Human handler approves', 'Sachbearbeiter gibt frei')
    ],
    chat: [
      tr('AI drafts responses', 'KI entwirft Antworten'),
      tr('Human handler approves', 'Sachbearbeiter gibt frei'),
      tr('Audit trail stored', 'Audit-Trail wird gespeichert')
    ]
  }

  const registerTyping = useTypewriter(demoDefaults.email, shouldAnimate && step.id === 'register', 42)
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
  const profileName = useTypewriter('Alex Driver', shouldAnimate && step.id === 'profile' && profileKey === 'name', 33)
  const profileDob = useTypewriter(tr('12 Apr 1993', '12. Apr 1993'), shouldAnimate && step.id === 'profile' && profileKey === 'dob', 33)
  const profilePlate = useTypewriter('M-IF 421', shouldAnimate && step.id === 'profile' && profileKey === 'plate', 33)
  const profileVehicle = useTypewriter(tr('Car', 'Auto'), shouldAnimate && step.id === 'profile' && profileKey === 'vehicle', 33)
  const profilePolicy = useTypewriter(demoDefaults.policyNumber, shouldAnimate && step.id === 'profile' && profileKey === 'policy', 33)
  const profileInsurer = useTypewriter(demoDefaults.insurer, shouldAnimate && step.id === 'profile' && profileKey === 'insurer', 33)

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
  const idStatus = useTypewriter(tr('ID scanned (demo)', 'ID gescannt (Demo)'), shouldAnimate && step.id === 'identification' && idKey === 'id', 33)
  const selfieStatus = useTypewriter(tr('Selfie matched (demo)', 'Selfie abgeglichen (Demo)'), shouldAnimate && step.id === 'identification' && idKey === 'selfie', 33)
  const confidenceStatus = useTypewriter(tr('Match confidence: 96%', 'Match-Konfidenz: 96%'), shouldAnimate && step.id === 'identification' && idKey === 'confidence', 33)

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
  const quoteCoverage = useTypewriter(tr('Carrier liability + vehicle', 'Haftpflicht + Fahrzeug'), shouldAnimate && step.id === 'quote' && quoteStage >= 3, 33)
  const quotePremium = useTypewriter('€ 129 / month', shouldAnimate && step.id === 'quote' && quoteStage >= 3 && quoteCoverage.done, 33)

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
  const paymentMethod = useTypewriter('Visa •••• 2048', shouldAnimate && step.id === 'purchase' && purchaseKey === 'payment', 33)
  const billingCycle = useTypewriter(tr('Monthly', 'Monatlich'), shouldAnimate && step.id === 'purchase' && purchaseKey === 'billing', 33)
  const purchaseTotal = useTypewriter('€ 129 / month', shouldAnimate && step.id === 'purchase' && purchaseKey === 'total', 33)

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
    ? tr('Select incident', 'Ereignis wählen')
    : claimIncidentChoice === 'Theft'
      ? tr('Vehicle theft', 'Diebstahl')
      : claimIncidentChoice === 'Glass'
        ? tr('Glass damage', 'Glasschaden')
        : tr('Rear-end collision', 'Auffahrunfall')

  const descriptionText = !claimIncidentChoice
    ? tr('Tap incident chip to fill', 'Tippe auf ein Ereignis, um auszufüllen')
    : claimIncidentChoice === 'Theft'
      ? tr('Vehicle missing from parking area.', 'Fahrzeug vom Parkplatz verschwunden.')
      : claimIncidentChoice === 'Glass'
        ? tr('Front windshield cracked during drive.', 'Frontscheibe während der Fahrt gerissen.')
        : tr('Rear-end collision at traffic light.', 'Auffahrunfall an der Ampel.')

  const incidentTyped = useTypewriter(incidentText, shouldAnimate && step.id === 'claims' && incidentTyping, 33)
  const descriptionTyped = useTypewriter(descriptionText, shouldAnimate && step.id === 'claims' && incidentTyping && incidentTyped.done, 33)

  const locationTyped = useTypewriter(demoDefaults.location, shouldAnimate && step.id === 'claims' && locationTyping, 33)
  const timestampTyped = useTypewriter(demoState.claimTimestamp || tr('29 Jan 2026, 08:42', '29. Jan 2026, 08:42'), shouldAnimate && step.id === 'claims' && locationTyping && locationTyped.done, 33)

  const locationValue = shouldAnimate
    ? (locationTyping ? locationTyped.out : (demoState.locationCaptured ? demoDefaults.location : tr('Tap capture location', 'Ort erfassen')))
    : (demoState.locationCaptured ? demoDefaults.location : tr('Tap capture location', 'Ort erfassen'))

  const timestampValue = shouldAnimate
    ? (locationTyping ? timestampTyped.out : (demoState.claimTimestamp || tr('Tap to capture time', 'Zeit erfassen')))
    : (demoState.claimTimestamp || tr('Tap to capture time', 'Zeit erfassen'))

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
    logAudit(tr('Driver sent quick reply', 'Fahrer hat Schnellantwort gesendet'))
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
    const timestamp = new Date().toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })
    const time = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
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
            <div className="title">{tr('Welcome to Insurfox', 'Willkommen bei Insurfox')}</div>
            <div className="hint">{tr('1-tap registration', '1‑Klick‑Registrierung')}</div>
          </div>
          <div className="phone-card-body">
            <PhoneField label={tr('Email', 'E-Mail')} value={registerTyping.out} isTyping={!registerTyping.done && shouldAnimate} isDone={registerTyping.done} />
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-blue-lt text-blue">{tr('Auto-verified', 'Auto-verifiziert')}</span>
              <span className="badge bg-green-lt text-green">{tr('Consent stored', 'Einwilligung gespeichert')}</span>
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!registerReady}
            onClick={() => {
              updateState({ ...demoState, accountCreated: true })
              logAudit(tr('Registration started (email captured)', 'Registrierung gestartet (E-Mail erfasst)'))
              setAnimDone('register')
              goNext()
            }}
          >
            {tr('Continue', 'Weiter')}
          </button>
        </div>
      </>
    ),
    onboarding: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">{tr('Onboarding wizard', 'Onboarding-Wizard')}</div>
            <div className="hint">{tr('Progressive setup', 'Schrittweises Setup')}</div>
          </div>
          <div className="phone-card-body">
            <div className="progress">
              <div className="progress-bar bg-indigo" style={{ width: `${30 + onboardingStage * 20}%` }} />
            </div>
            <div className="d-flex flex-wrap gap-2">
              {[tr('Basics', 'Basics'), tr('Vehicle', 'Fahrzeug'), tr('Consent', 'Einwilligung')].map((item, index) => (
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
            className="btn btn-primary btn-sm"
            disabled={!onboardingReady}
            onClick={() => {
              updateState({ ...demoState, onboardingComplete: true })
              logAudit(tr('Onboarding completed (wizard)', 'Onboarding abgeschlossen (Wizard)'))
              setAnimDone('onboarding')
              goNext()
            }}
          >
            {tr('Complete onboarding', 'Onboarding abschließen')}
          </button>
        </div>
      </>
    ),
    profile: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">{tr('Profile overview', 'Profilübersicht')}</div>
            <div className="hint">{tr('Auto-filled', 'Auto-ausgefüllt')}</div>
          </div>
          <div className="phone-card-body">
            <PhoneField label={tr('Full name', 'Name')} value={profileName.out} isTyping={profileKey === 'name' && shouldAnimate} isDone={profileName.done} />
            <PhoneField label={tr('DOB', 'Geburtsdatum')} value={profileDob.out} isTyping={profileKey === 'dob' && shouldAnimate} isDone={profileDob.done} />
            <PhoneField label={tr('Plate', 'Kennzeichen')} value={profilePlate.out} isTyping={profileKey === 'plate' && shouldAnimate} isDone={profilePlate.done} />
            <PhoneField label={tr('Vehicle', 'Fahrzeug')} value={profileVehicle.out} isTyping={profileKey === 'vehicle' && shouldAnimate} isDone={profileVehicle.done} />
            <PhoneField label={tr('Policy', 'Police')} value={profilePolicy.out} isTyping={profileKey === 'policy' && shouldAnimate} isDone={profilePolicy.done} />
            <PhoneField label={tr('Insurer', 'Versicherer')} value={profileInsurer.out} isTyping={profileKey === 'insurer' && shouldAnimate} isDone={profileInsurer.done} />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!profileReady}
            onClick={() => {
              updateState({ ...demoState, profileConfirmed: true })
              logAudit(tr('Profile confirmed', 'Profil bestätigt'))
              setAnimDone('profile')
              goNext()
            }}
          >
            {tr('Confirm profile', 'Profil bestätigen')}
          </button>
        </div>
      </>
    ),
    identification: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">{tr('Identification', 'Identifikation')}</div>
            <div className="hint">{tr('ID + selfie match', 'ID + Selfie-Abgleich')}</div>
          </div>
          <div className="phone-card-body">
            <PhoneField label={tr('ID status', 'ID-Status')} value={idStatus.out} isTyping={idKey === 'id' && shouldAnimate} isDone={idStatus.done} />
            <PhoneField label={tr('Selfie', 'Selfie')} value={selfieStatus.out} isTyping={idKey === 'selfie' && shouldAnimate} isDone={selfieStatus.done} />
            <PhoneField label={tr('Confidence', 'Konfidenz')} value={confidenceStatus.out} isTyping={idKey === 'confidence' && shouldAnimate} isDone={confidenceStatus.done} />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!identificationReady}
            onClick={() => {
              updateState({ ...demoState, verified: true })
              logAudit(tr('Identity verified (ID + selfie match)', 'Identität verifiziert (ID + Selfie)'))
              setAnimDone('identification')
              goNext()
            }}
          >
            {tr('Verify identity', 'Identität verifizieren')}
          </button>
        </div>
      </>
    ),
    quote: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">{tr('Quote builder', 'Angebots-Builder')}</div>
            <div className="hint">{tr('Liability + vehicles', 'Haftpflicht + Fahrzeuge')}</div>
          </div>
          <div className="phone-card-body">
            <div className="d-flex flex-wrap gap-2">
              {[tr('Liability', 'Haftpflicht'), tr('Vehicle', 'Fahrzeug'), tr('Summary', 'Zusammenfassung')].map((item, index) => (
                <span
                  key={item}
                  className={`badge ${quoteStage > index ? 'bg-green-lt text-green demo-fade-in' : 'bg-blue-lt text-blue'}`}
                >
                  {item}
                </span>
              ))}
            </div>
            <PhoneField label={tr('Coverage', 'Deckung')} value={quoteCoverage.out} isTyping={!quoteCoverage.done && shouldAnimate && quoteStage >= 3} isDone={quoteCoverage.done} />
            <PhoneField label={tr('Premium', 'Prämie')} value={quotePremium.out} isTyping={!quotePremium.done && shouldAnimate && quoteStage >= 3} isDone={quotePremium.done} />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!quoteReady}
            onClick={() => {
              updateState({ ...demoState, quoteReady: true })
              logAudit(tr('Quote generated (liability + vehicle)', 'Angebot erstellt (Haftpflicht + Fahrzeug)'))
              setAnimDone('quote')
              goNext()
            }}
          >
            {tr('Generate quote', 'Angebot erstellen')}
          </button>
        </div>
      </>
    ),
    purchase: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">{tr('Checkout', 'Checkout')}</div>
            <div className="hint">{tr('Payment ready', 'Zahlung bereit')}</div>
          </div>
          <div className="phone-card-body">
            <PhoneField label={tr('Payment method', 'Zahlungsmethode')} value={paymentMethod.out} isTyping={purchaseKey === 'payment' && shouldAnimate} isDone={paymentMethod.done} />
            <PhoneField label={tr('Billing', 'Abrechnung')} value={billingCycle.out} isTyping={purchaseKey === 'billing' && shouldAnimate} isDone={billingCycle.done} />
            <PhoneField label={tr('Total', 'Gesamt')} value={purchaseTotal.out} isTyping={purchaseKey === 'total' && shouldAnimate} isDone={purchaseTotal.done} />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!purchaseReady}
            onClick={() => {
              updateState({ ...demoState, policyActive: true })
              logAudit(tr('Policy purchased and activated', 'Police gekauft und aktiviert'))
              setAnimDone('purchase')
              goNext()
            }}
          >
            {tr('Activate policy', 'Police aktivieren')}
          </button>
        </div>
      </>
    ),
    claims: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">{tr('FNOL chatbot', 'FNOL-Chatbot')}</div>
            <div className="hint">{tr('Structured intake', 'Strukturierter Intake')}</div>
          </div>
          <div className="phone-card-body">
            <div className="d-flex flex-wrap gap-2">
              {[tr('Accident', 'Unfall'), tr('Theft', 'Diebstahl'), tr('Glass', 'Glas')].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`btn btn-sm ${claimIncidentChoice === item ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleIncidentClick((item === tr('Accident', 'Unfall') ? 'Accident' : item === tr('Theft', 'Diebstahl') ? 'Theft' : 'Glass') as 'Accident' | 'Theft' | 'Glass')}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                className={`btn btn-sm ${demoState.locationCaptured ? 'btn-success' : 'btn-outline-primary'}`}
                onClick={handleLocationClick}
              >
                {tr('Capture location', 'Ort erfassen')}
              </button>
            </div>
            <PhoneField
              label={tr('Incident type', 'Ereignisart')}
              value={shouldAnimate ? incidentTyped.out : incidentText}
              isTyping={incidentTyping && shouldAnimate && !incidentTyped.done}
              isDone={!shouldAnimate || incidentTyped.done}
            />
            <PhoneField
              label={tr('Description', 'Beschreibung')}
              value={shouldAnimate ? descriptionTyped.out : descriptionText}
              isTyping={incidentTyping && shouldAnimate && incidentTyped.done && !descriptionTyped.done}
              isDone={!shouldAnimate || descriptionTyped.done}
            />
            <PhoneField
              label={tr('Location', 'Ort')}
              value={locationValue}
              isTyping={locationTyping && shouldAnimate && !locationTyped.done}
              isDone={!shouldAnimate || locationTyped.done}
            />
            <PhoneField
              label={tr('Timestamp', 'Zeitstempel')}
              value={timestampValue}
              isTyping={locationTyping && shouldAnimate && locationTyped.done && !timestampTyped.done}
              isDone={!shouldAnimate || timestampTyped.done}
            />
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!claimsReady}
            onClick={() => {
              const fnolChat: ChatMessage[] = [
                {
                  id: `fnol-${Date.now()}`,
                  from: 'insurer',
                  text: tr('We received your claim. A handler is assigned to your case.', 'Wir haben Ihren Schaden erhalten. Ein Sachbearbeiter ist zugewiesen.'),
                },
                {
                  id: `fnol-${Date.now()}-2`,
                  from: 'insurer',
                  text: tr('Please upload the police report and any additional photos.', 'Bitte laden Sie den Polizeibericht und weitere Fotos hoch.'),
                },
              ]
              const nextChat = [...chatLog, ...fnolChat]
              setChatLog(nextChat)
              writeChat(nextChat)
              updateState({ ...demoState, claimSubmitted: true, slaRunning: true })
              logAudit(tr(`FNOL submitted (${demoDefaults.claimId})`, `FNOL eingereicht (${demoDefaults.claimId})`))
              logAudit(tr('SLA started (24h initial response)', 'SLA gestartet (24h erste Antwort)'))
              setAnimDone('claims')
              goNext()
            }}
          >
            {tr('Submit FNOL', 'FNOL senden')}
          </button>
        </div>
      </>
    ),
    chat: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">{tr('Chat with insurer', 'Chat mit Versicherer')}</div>
            <div className="hint">{tr('HITL enabled', 'HITL aktiviert')}</div>
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
              {[tr('Book repair', 'Reparatur buchen'), tr('Prefer payout', 'Auszahlung bevorzugen'), tr('Need a call', 'Bitte anrufen')].map((reply) => (
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
            className="btn btn-primary btn-sm"
            disabled={!chatReady}
            onClick={() => {
              updateState({ ...demoState, handlerAssigned: true })
              logAudit(tr('Handler assigned (HITL)', 'Sachbearbeiter zugewiesen (HITL)'))
              setAnimDone('chat')
              goNext()
            }}
          >
            {tr('Assign handler', 'Sachbearbeiter zuweisen')}
          </button>
        </div>
      </>
    )
  }

  const currentStep = step.id
  const snapshot = snapshotBadges.map((badge) => ({ label: badge.label, on: badge.active }))
  const stepStatus: Record<StepId, boolean> = {
    register: demoState.accountCreated || currentStep === 'register',
    onboarding: demoState.onboardingComplete || currentStep === 'onboarding',
    profile: demoState.profileConfirmed || currentStep === 'profile',
    identification: demoState.verified || currentStep === 'identification',
    quote: demoState.quoteReady || currentStep === 'quote',
    purchase: demoState.policyActive || currentStep === 'purchase',
    claims: demoState.claimSubmitted || currentStep === 'claims',
    chat: demoState.handlerAssigned || currentStep === 'chat',
  }

  const audit = auditLog

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{tr('Driver demo', 'Fahrer-Demo')}</div>
                <h2 className="page-title">{step.label}</h2>
                <div className="text-muted">{step.subtitle}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="demo-shell">
            <aside className="demo-admin-left">
              <div className="admin-panel">
                <h4>{tr('AI & HITL', 'KI & HITL')}</h4>
                <ul>
                  {hitlBullets[currentStep].map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <h4>{tr('Audit log', 'Audit-Log')}</h4>
                <div className="admin-audit">
                  {audit.slice(0, 10).map((a, idx) => (
                    <div key={`${a.ts}-${idx}`} className="admin-audit-item">
                      <div className="ts">{new Date(a.ts).toLocaleString(locale)}</div>
                      <div className="msg">{a.message}</div>
                    </div>
                  ))}
                  {audit.length === 0 && <div className="text-muted">{tr('No entries yet.', 'Noch keine Einträge.')}</div>}
                </div>
              </div>
            </aside>

            <div className="demo-driver">
              <div className="phone-shell">
                <img src={IphoneMock} alt="" className="phone-mock" aria-hidden="true" />
                <div className="phone-frame">
                  <div className="phone-statusbar">
                    <span>09:41</span>
                    <span>LTE · 88%</span>
                  </div>
                  <div className="phone-logo">
                    <img src={InsurfoxLogo} alt="Insurfox" />
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
            </div>

            <aside className="demo-admin-right">
              <div className="admin-panel">
                <h4>{tr('Step navigation', 'Schritt-Navigation')}</h4>
                <div className="list-group">
                  {STEP_IDS.map((s) => (
                    <div key={s} className="list-group-item d-flex align-items-center justify-content-between">
                      <span>{STEP_TITLES[s]}</span>
                      <span className={`step-status ${stepStatus[s] ? 'done' : 'todo'}`} aria-hidden="true">
                        {stepStatus[s] ? '✓' : '×'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
