import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import ClaimsfoxIcon from '@/assets/logos/Claimsfox_icon.png'

const STORAGE_KEY = 'cf_registration_draft'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BOT_BUBBLE_COLOR = '#D3F261'

const QUESTION_KEYS = new Set<string>([
  'registration.bot.name',
  'registration.bot.email',
  'registration.bot.phone',
  'registration.bot.role',
  'registration.bot.privacy',
  'registration.bot.summary'
])

type Step =
  | 'mode'
  | 'voice'
  | 'voiceConfirm'
  | 'name'
  | 'email'
  | 'phone'
  | 'role'
  | 'privacy'
  | 'summary'

type InputMode = 'text' | 'voice'

declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition
    webkitSpeechRecognition?: typeof SpeechRecognition
  }
}

type BotMessage = {
  id: string
  author: 'bot'
  key: string
  vars?: Record<string, string>
  timestamp: number
}

type UserMessage = {
  id: string
  author: 'user'
  text: string
  timestamp: number
}

type ChatMessage = BotMessage | UserMessage

type Answers = {
  name?: string
  email?: string
  phone?: string
  role?: string
  privacyConsent?: boolean
}

type RegistrationState = {
  messages: ChatMessage[]
  step: Step
  answers: Answers
  isTyping: boolean
  blocked: boolean
  completed: boolean
  inputMode?: InputMode
  voiceChoiceId?: string // <-- wir speichern jetzt nur noch eine der 4 IDs
}

type Action =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'SET_ANSWERS'; payload: Partial<Answers> }
  | { type: 'SET_BLOCKED'; payload: boolean }
  | { type: 'SET_COMPLETED'; payload: boolean }
  | { type: 'SET_INPUT_MODE'; payload?: InputMode }
  | { type: 'SET_VOICE_CHOICE_ID'; payload?: string }
  | { type: 'RESET'; payload: RegistrationState }

const initialState: RegistrationState = {
  messages: [],
  step: 'mode',
  answers: {},
  isTyping: false,
  blocked: false,
  completed: false,
  inputMode: undefined,
  voiceChoiceId: undefined
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function createBotMessage(key: string, vars?: Record<string, string>): BotMessage {
  return {
    id: `bot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author: 'bot',
    key,
    vars,
    timestamp: Date.now()
  }
}

function createUserMessage(text: string): UserMessage {
  return {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author: 'user',
    text,
    timestamp: Date.now()
  }
}

function registrationReducer(state: RegistrationState, action: Action): RegistrationState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'SET_ANSWERS':
      return { ...state, answers: { ...state.answers, ...action.payload } }
    case 'SET_BLOCKED':
      return { ...state, blocked: action.payload }
    case 'SET_COMPLETED':
      return { ...state, completed: action.payload }
    case 'SET_INPUT_MODE':
      return { ...state, inputMode: action.payload }
    case 'SET_VOICE_CHOICE_ID':
      return { ...state, voiceChoiceId: action.payload }
    case 'RESET':
      return action.payload
    default:
      return state
  }
}

function loadInitialState(): RegistrationState {
  if (!isBrowser()) return initialState

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialState
    const parsed = JSON.parse(stored) as RegistrationState
    return {
      ...initialState,
      ...parsed,
      isTyping: false
    }
  } catch {
    return initialState
  }
}

/** TTS natürlicher: Chunking + Pausen */
function splitForSpeech(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+|(?<=,)\s+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

async function speakChunks(
  text: string,
  voice: SpeechSynthesisVoice,
  opts?: { rate?: number; pitch?: number; volume?: number }
) {
  if (!('speechSynthesis' in window)) return
  const chunks = splitForSpeech(text)
  const synth = window.speechSynthesis
  synth.cancel()

  for (const chunk of chunks) {
    await new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(chunk)
      u.voice = voice
      u.lang = voice.lang
      u.rate = opts?.rate ?? 0.9
      u.pitch = opts?.pitch ?? 1.05
      u.volume = opts?.volume ?? 1

      u.onend = () => resolve()
      u.onerror = () => resolve()
      synth.speak(u)
    })

    const lastChar = chunk.slice(-1)
    const pause =
      lastChar === ',' ? 180 : lastChar === '.' || lastChar === '!' || lastChar === '?' ? 280 : 220
    await new Promise((r) => setTimeout(r, pause))
  }
}

/** Nur 4 Voice-Optionen */
type VoiceChoiceId = 'de-male' | 'de-female' | 'en-male' | 'en-female'
type VoiceChoice = { id: VoiceChoiceId; label: string; voice: SpeechSynthesisVoice }

function scoreVoice(v: SpeechSynthesisVoice) {
  const name = (v.name || '').toLowerCase()
  let score = 0
  if (name.includes('natural')) score += 5
  if (name.includes('enhanced')) score += 4
  if (name.includes('premium')) score += 4
  if (name.includes('siri')) score += 3
  if (name.includes('google')) score += 3
  if (name.includes('microsoft')) score += 2
  if (name.includes('apple')) score += 2
  if (name.includes('espeak')) score -= 10
  if (name.includes('robot')) score -= 10
  if (v.localService) score += 1
  return score
}

function pickBestVoice(voices: SpeechSynthesisVoice[], langPrefix: 'de' | 'en', gender: 'male' | 'female') {
  const langMatches = voices.filter((v) => (v.lang || '').toLowerCase().startsWith(langPrefix))
  if (!langMatches.length) return undefined

  const femaleHints = /(female|frau|samantha|victoria|karen|zoe|anna|helena|katja|sarah|vicki)/i
  const maleHints = /(male|mann|alex|daniel|fred|tom|bernd|stefan|markus|thomas)/i
  const hintRegex = gender === 'female' ? femaleHints : maleHints

  const hinted = langMatches.filter((v) => hintRegex.test(v.name || ''))
  const candidates = hinted.length ? hinted : langMatches

  return [...candidates].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0]
}

export default function RegistrationPage() {
  const [state, dispatch] = useReducer(registrationReducer, undefined, loadInitialState)
  const [inputValue, setInputValue] = useState('')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isListening, setIsListening] = useState(false)

  // Voice confirm state (nach jeder Spracheingabe)
  const [pendingTranscript, setPendingTranscript] = useState<string | null>(null)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<number[]>([])
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const isListeningRef = useRef(false)
  const lastSpokenMessageIdRef = useRef<string | null>(null)

  // Wir merken uns den "echten" Step vor voiceConfirm
  const lastRealStepRef = useRef<Exclude<Step, 'voiceConfirm'>>('name')

  const navigate = useNavigate()
  const { t } = useI18n()

  // i18n helper mit Fallback
  const tr = useCallback(
    (key: string, fallback: string, vars?: Record<string, string>) => {
      const val = t(key, vars)
      return val === key ? fallback : val
    },
    [t]
  )

  const speechSupported = isBrowser() && 'speechSynthesis' in window

  const preferredVoices: VoiceChoice[] = useMemo(() => {
    if (!voices.length) return []

    const deMale = pickBestVoice(voices, 'de', 'male')
    const deFemale = pickBestVoice(voices, 'de', 'female')
    const enMale = pickBestVoice(voices, 'en', 'male')
    const enFemale = pickBestVoice(voices, 'en', 'female')

    const out: VoiceChoice[] = []
    if (deMale) out.push({ id: 'de-male', label: tr('registration.voice.deMale', 'Deutsch – männlich'), voice: deMale })
    if (deFemale) out.push({ id: 'de-female', label: tr('registration.voice.deFemale', 'Deutsch – weiblich'), voice: deFemale })
    if (enMale) out.push({ id: 'en-male', label: tr('registration.voice.enMale', 'English – male'), voice: enMale })
    if (enFemale) out.push({ id: 'en-female', label: tr('registration.voice.enFemale', 'English – female'), voice: enFemale })

    return out
  }, [tr, voices])

  const selectedVoice = useMemo(() => {
    if (!state.voiceChoiceId) return undefined
    return preferredVoices.find((v) => v.id === state.voiceChoiceId)?.voice
  }, [preferredVoices, state.voiceChoiceId])

  const queueBotMessages = useCallback(
    (items: Array<{ key: string; vars?: Record<string, string> }>) => {
      if (!items.length) return
      dispatch({ type: 'SET_TYPING', payload: true })
      let delay = 0
      items.forEach((item, index) => {
        delay += 350 + Math.floor(Math.random() * 350)
        const timeoutId = window.setTimeout(() => {
          dispatch({ type: 'ADD_MESSAGE', payload: createBotMessage(item.key, item.vars) })
          if (index === items.length - 1) {
            dispatch({ type: 'SET_TYPING', payload: false })
          }
        }, delay)
        timeoutsRef.current.push(timeoutId)
      })
    },
    [dispatch]
  )

  const stopVoiceInteraction = useCallback(() => {
    if (!isBrowser()) return
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null
        recognitionRef.current.onerror = null
        recognitionRef.current.onend = null
        recognitionRef.current.stop()
      } catch {
        // ignore
      }
      recognitionRef.current = null
    }
    isListeningRef.current = false
    setIsListening(false)
  }, [])

  const fallbackToTextInput = useCallback(() => {
    stopVoiceInteraction()
    if (state.inputMode !== 'voice') return
    dispatch({ type: 'SET_INPUT_MODE', payload: 'text' })
    queueBotMessages([{ key: 'registration.bot.voiceInputNotSupported' }])
  }, [queueBotMessages, state.inputMode, stopVoiceInteraction])

  function handleUserSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Im voiceConfirm ist Submit = Korrektur übernehmen + weiter
    if (state.step === 'voiceConfirm') {
      confirmTranscriptAndContinue(inputValue)
      return
    }
    sendUserInput(inputValue)
  }

  function sendUserInput(value: string) {
    if (state.isTyping || state.blocked || state.completed) return
    const trimmed = value.trim()
    if (!trimmed) return

    if (state.inputMode === 'voice') stopVoiceInteraction()

    dispatch({ type: 'ADD_MESSAGE', payload: createUserMessage(trimmed) })
    setInputValue('')
    processUserResponse(trimmed)
  }

  const startRecognition = useCallback(() => {
    if (!isBrowser() || isListeningRef.current) return

    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionConstructor) {
      fallbackToTextInput()
      return
    }

    const recognition = new SpeechRecognitionConstructor()
    recognitionRef.current = recognition

    const browserLang = typeof navigator !== 'undefined' ? navigator.language : undefined
    recognition.lang = selectedVoice?.lang ?? browserLang ?? 'de-DE'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      recognition.stop()
      const result = event.results?.[0]?.[0]?.transcript?.trim()
      setIsListening(false)
      isListeningRef.current = false

      if (result) {
        // ✅ Nicht direkt verarbeiten – erst bestätigen lassen
        stopVoiceInteraction()
        setPendingTranscript(result)
        dispatch({ type: 'SET_STEP', payload: 'voiceConfirm' })
        setInputValue(result)
        queueBotMessages([{ key: 'registration.bot.voiceConfirm' }])
      }
    }

    recognition.onerror = (event) => {
      setIsListening(false)
      isListeningRef.current = false
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        fallbackToTextInput()
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      isListeningRef.current = false
    }

    try {
      recognition.start()
      isListeningRef.current = true
      setIsListening(true)
    } catch {
      fallbackToTextInput()
    }
  }, [fallbackToTextInput, queueBotMessages, selectedVoice, stopVoiceInteraction])

  const speakAndListen = useCallback(
    async (text: string) => {
      if (!speechSupported || !selectedVoice || !text) return
      if (!isBrowser()) return
      await speakChunks(text, selectedVoice, { rate: 0.9, pitch: 1.05, volume: 1 })
      startRecognition()
    },
    [selectedVoice, speechSupported, startRecognition]
  )

  // Stimmen laden
  useEffect(() => {
    if (!speechSupported) return
    const synth = window.speechSynthesis
    const handleVoicesChanged = () => setVoices(synth.getVoices())
    handleVoicesChanged()

    if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', handleVoicesChanged)
    else synth.onvoiceschanged = handleVoicesChanged

    return () => {
      if (typeof synth.removeEventListener === 'function') synth.removeEventListener('voiceschanged', handleVoicesChanged)
      if (synth.onvoiceschanged === handleVoicesChanged) synth.onvoiceschanged = null
    }
  }, [speechSupported])

  // VoiceMode verlassen -> alles stoppen
  useEffect(() => {
    if (state.inputMode !== 'voice') {
      stopVoiceInteraction()
      lastSpokenMessageIdRef.current = null
      setPendingTranscript(null)
    }
  }, [state.inputMode, stopVoiceInteraction])

  // lastRealStep aktualisieren
  useEffect(() => {
    if (state.step !== 'voiceConfirm') {
      lastRealStepRef.current = state.step as Exclude<Step, 'voiceConfirm'>
    }
  }, [state.step])

  // Auto-Voice: Frage finden und sprechen (aber NICHT im mode/voice/voiceConfirm)
  useEffect(() => {
    if (
      state.inputMode !== 'voice' ||
      state.isTyping ||
      state.blocked ||
      state.completed ||
      state.step === 'mode' ||
      state.step === 'voice' ||
      state.step === 'voiceConfirm' ||
      !state.voiceChoiceId ||
      !selectedVoice
    ) {
      return
    }

    const questionMessage = [...state.messages]
      .reverse()
      .find((m) => m.author === 'bot' && QUESTION_KEYS.has(m.key)) as BotMessage | undefined

    if (!questionMessage) return
    if (lastSpokenMessageIdRef.current === questionMessage.id) return
    lastSpokenMessageIdRef.current = questionMessage.id

    const text = t(questionMessage.key, questionMessage.vars)
    void speakAndListen(text)
  }, [
    selectedVoice,
    speakAndListen,
    state.blocked,
    state.completed,
    state.inputMode,
    state.isTyping,
    state.messages,
    state.step,
    state.voiceChoiceId,
    t
  ])

  // cleanup
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id))
      timeoutsRef.current = []
      stopVoiceInteraction()
    }
  }, [stopVoiceInteraction])

  // persist
  useEffect(() => {
    if (!isBrowser()) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // scroll
  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' })
  }, [state.messages.length, state.isTyping])

  // initial bot prompt
  useEffect(() => {
    if (!state.messages.length && !state.isTyping) {
      queueBotMessages([{ key: 'registration.bot.welcome' }, { key: 'registration.bot.mode' }])
    }
  }, [queueBotMessages, state.isTyping, state.messages.length])

  function processUserResponse(rawValue: string) {
    const trimmed = rawValue.trim()
    const normalized = trimmed.toLowerCase()

    switch (state.step) {
      case 'mode': {
        queueBotMessages([{ key: 'registration.bot.mode' }])
        return
      }
      case 'voice': {
        queueBotMessages([{ key: speechSupported ? 'registration.bot.voiceSelect' : 'registration.bot.voiceNotSupported' }])
        return
      }
      case 'voiceConfirm': {
        queueBotMessages([{ key: 'registration.bot.voiceConfirm' }])
        return
      }
      case 'name': {
        if (trimmed.length < 3) {
          queueBotMessages([{ key: 'registration.bot.name' }])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { name: trimmed } })
        dispatch({ type: 'SET_STEP', payload: 'email' })
        queueBotMessages([{ key: 'registration.bot.email' }])
        return
      }
      case 'email': {
        if (!EMAIL_REGEX.test(trimmed)) {
          queueBotMessages([{ key: 'registration.bot.emailInvalid' }])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { email: trimmed } })
        dispatch({ type: 'SET_STEP', payload: 'phone' })
        queueBotMessages([{ key: 'registration.bot.phone' }])
        return
      }
      case 'phone': {
        const skipCommands = ['skip', 'überspringen', 'ueberspringen', 'auslassen']
        if (skipCommands.includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { phone: undefined } })
          dispatch({ type: 'SET_STEP', payload: 'role' })
          queueBotMessages([
            { key: 'registration.bot.skip' },
            { key: 'registration.bot.role' },
            { key: 'registration.bot.roleCustomer' },
            { key: 'registration.bot.rolePartner' },
            { key: 'registration.bot.roleInternal' }
          ])
          return
        }
        if (trimmed.length < 5) {
          queueBotMessages([{ key: 'registration.bot.phone' }])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { phone: trimmed } })
        dispatch({ type: 'SET_STEP', payload: 'role' })
        queueBotMessages([
          { key: 'registration.bot.role' },
          { key: 'registration.bot.roleCustomer' },
          { key: 'registration.bot.rolePartner' },
          { key: 'registration.bot.roleInternal' }
        ])
        return
      }
      case 'role': {
        if (trimmed.length < 3) {
          queueBotMessages([{ key: 'registration.bot.role' }])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { role: trimmed } })
        dispatch({ type: 'SET_STEP', payload: 'privacy' })
        queueBotMessages([{ key: 'registration.bot.privacy' }])
        return
      }
      case 'privacy': {
        const positive = ['yes', 'y', 'ja', 'j', 'ok', 'okay', 'accept', 'zustimme', 'zustimmen']
        const negative = ['no', 'n', 'nein']

        if (positive.includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { privacyConsent: true } })
          dispatch({ type: 'SET_BLOCKED', payload: false })
          dispatch({ type: 'SET_STEP', payload: 'summary' })
          queueBotMessages([
            { key: 'registration.bot.privacyYes' },
            {
              key: 'registration.bot.summary',
              vars: {
                name: state.answers.name ?? '–',
                email: state.answers.email ?? '–',
                phone: state.answers.phone ?? '–',
                role: state.answers.role ?? '–'
              }
            }
          ])
          return
        }

        if (negative.includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { privacyConsent: false } })
          dispatch({ type: 'SET_BLOCKED', payload: true })
          queueBotMessages([{ key: 'registration.bot.privacyNo' }, { key: 'registration.bot.privacyNoStop' }])
          return
        }

        queueBotMessages([{ key: 'registration.bot.privacy' }])
        return
      }
      case 'summary': {
        const submitCommands = [
          'submit',
          'abschicken',
          'registrierung abschicken',
          t('registration.bot.submit').toLowerCase()
        ]
        const editCommands = ['edit', 'bearbeiten', t('registration.bot.edit').toLowerCase()]

        if (submitCommands.includes(normalized)) {
          dispatch({ type: 'SET_COMPLETED', payload: true })
          queueBotMessages([{ key: 'registration.bot.success' }])
          return
        }

        if (editCommands.includes(normalized)) {
          dispatch({ type: 'SET_COMPLETED', payload: false })
          dispatch({ type: 'SET_STEP', payload: 'name' })
          queueBotMessages([{ key: 'registration.bot.name' }])
          return
        }

        queueBotMessages([
          {
            key: 'registration.bot.summary',
            vars: {
              name: state.answers.name ?? '–',
              email: state.answers.email ?? '–',
              phone: state.answers.phone ?? '–',
              role: state.answers.role ?? '–'
            }
          }
        ])
        return
      }
      default:
        return
    }
  }

  function handleModeSelection(mode: InputMode) {
    if (mode === 'text') {
      dispatch({ type: 'SET_INPUT_MODE', payload: 'text' })
      dispatch({ type: 'SET_STEP', payload: 'name' })
      queueBotMessages([{ key: 'registration.bot.name' }])
      return
    }

    dispatch({ type: 'SET_INPUT_MODE', payload: 'voice' })
    dispatch({ type: 'SET_STEP', payload: 'voice' })

    if (!speechSupported) {
      queueBotMessages([{ key: 'registration.bot.voiceNotSupported' }])
      return
    }

    queueBotMessages([{ key: 'registration.bot.voiceSelect' }])
  }

  function handleVoiceStart() {
    if (!state.voiceChoiceId) return
    lastSpokenMessageIdRef.current = null
    dispatch({ type: 'SET_STEP', payload: 'name' })
    queueBotMessages([{ key: 'registration.bot.name' }])
  }

  function confirmTranscriptAndContinue(finalText: string) {
    const trimmed = finalText.trim()
    if (!trimmed) return

    const realStep = lastRealStepRef.current

    setPendingTranscript(null)
    dispatch({ type: 'SET_STEP', payload: realStep })
    dispatch({ type: 'ADD_MESSAGE', payload: createUserMessage(trimmed) })
    setInputValue('')
    processUserResponse(trimmed)
  }

  function handleVoiceConfirmYes() {
    if (!pendingTranscript) return
    confirmTranscriptAndContinue(pendingTranscript)
  }

  function handleRestart() {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    timeoutsRef.current = []
    if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY)

    stopVoiceInteraction()
    lastSpokenMessageIdRef.current = null
    setPendingTranscript(null)
    setInputValue('')
    dispatch({ type: 'RESET', payload: initialState })
  }

  const waitingForModeSelection = state.step === 'mode'
  const waitingForVoiceSetup = state.step === 'voice'

  const inputDisabled =
    state.isTyping ||
    state.blocked ||
    state.completed ||
    waitingForModeSelection ||
    waitingForVoiceSetup ||
    (state.inputMode === 'voice' && isListening && state.step !== 'voiceConfirm')

  const placeholder = state.blocked
    ? t('registration.bot.privacyNoStop')
    : state.inputMode === 'voice' && isListening
    ? tr('registration.bot.listening', '🎙️ Ich höre zu…')
    : state.step === 'voiceConfirm'
    ? tr('registration.voiceConfirm.placeholder', 'Bitte korrigiere die Antwort im Textfeld und drücke auf absenden.')
    : t('registration.inputPlaceholder')

  // UI Labels
  const labelWrite = tr('registration.modeWrite', '✍️ Schreiben')
  const labelSpeak = tr('registration.modeSpeak', '🎙️ Sprechen')
  const labelVoiceLabel = tr('registration.voiceLabel', 'Stimme auswählen')
  const labelVoicePlaceholder = tr('registration.voicePlaceholder', 'Bitte wählen…')
  const labelVoiceStart = tr('registration.voiceStart', 'Starten')
  const labelVoiceLoading = tr('registration.voiceLoading', 'Stimmen werden geladen…')

  const labelConfirmTitle = tr('registration.voiceConfirm.title', 'Ist das so richtig?')
  const labelConfirmYes = tr('registration.voiceConfirm.yes', '✅ Ja')
  const labelConfirmEdit = tr('registration.voiceConfirm.edit', '✏️ Korrigieren')
  const labelConfirmHint = tr(
    'registration.voiceConfirm.hint',
    'Bitte korrigiere die Antwort im Textfeld und drücke auf absenden.'
  )

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <Header
        title={t('registration.title')}
        subtitle={t('registration.subtitle')}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={() => navigate('/roles')}>
              {t('registration.back')}
            </Button>
            <Button variant="secondary" onClick={handleRestart}>
              {t('registration.restart')}
            </Button>
          </div>
        }
      />

      <Card>
        <div
          ref={chatContainerRef}
          style={{
            background: '#f8f8ff',
            borderRadius: '18px',
            padding: '1.25rem',
            minHeight: '420px',
            maxHeight: '420px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}
        >
          {state.messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.author === 'user' ? 'flex-end' : 'flex-start',
                gap: '0.5rem'
              }}
            >
              {message.author === 'bot' && (
                <img
                  src={ClaimsfoxIcon}
                  alt="Claimsfox"
                  style={{ width: '28px', height: '28px', alignSelf: 'flex-start' }}
                />
              )}

              <div
                style={{
                  background:
                    message.author === 'user'
                      ? 'linear-gradient(135deg, #5b2d8b, #ee6a7c)'
                      : BOT_BUBBLE_COLOR,
                  color: message.author === 'user' ? '#fff' : '#0e0d1c',
                  padding: '0.85rem 1.1rem',
                  borderRadius:
                    message.author === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  boxShadow: '0 12px 25px rgba(8, 4, 50, 0.08)',
                  whiteSpace: 'pre-line',
                  maxWidth: '80%'
                }}
              >
                {message.author === 'bot' ? t(message.key, message.vars) : message.text}
              </div>
            </div>
          ))}

          {state.isTyping && (
            <div
              style={{
                alignSelf: 'flex-start',
                background: BOT_BUBBLE_COLOR,
                color: '#0e0d1c',
                padding: '0.85rem 1.1rem',
                borderRadius: '18px 18px 18px 4px',
                boxShadow: '0 12px 25px rgba(8, 4, 50, 0.08)',
                display: 'flex',
                gap: '0.35rem'
              }}
            >
              <span style={{ animation: 'chatPulse 1.2s infinite', opacity: 0.8 }}>•</span>
              <span style={{ animation: 'chatPulse 1.2s infinite 0.2s', opacity: 0.8 }}>•</span>
              <span style={{ animation: 'chatPulse 1.2s infinite 0.4s', opacity: 0.8 }}>•</span>
            </div>
          )}
        </div>

        {state.step === 'mode' && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Button variant="secondary" type="button" onClick={() => handleModeSelection('text')}>
              {labelWrite}
            </Button>
            <Button type="button" onClick={() => handleModeSelection('voice')}>
              {labelSpeak}
            </Button>
          </div>
        )}

        {state.step === 'voice' && (
          <div
            style={{
              background: '#f0f0ff',
              borderRadius: '16px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center'
            }}
          >
            {speechSupported ? (
              preferredVoices.length ? (
                <>
                  <label htmlFor="voiceSelect" style={{ fontWeight: 600 }}>
                    {labelVoiceLabel}
                  </label>

                  <select
                    id="voiceSelect"
                    value={state.voiceChoiceId ?? ''}
                    onChange={(event) =>
                      dispatch({
                        type: 'SET_VOICE_CHOICE_ID',
                        payload: (event.target.value || undefined) as VoiceChoiceId | undefined
                      })
                    }
                    style={{
                      flex: 1,
                      minWidth: '240px',
                      borderRadius: '12px',
                      border: '1px solid #d6d6f2',
                      padding: '0.65rem 0.9rem',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">{labelVoicePlaceholder}</option>
                    {preferredVoices.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <Button type="button" disabled={!state.voiceChoiceId} onClick={handleVoiceStart}>
                    {labelVoiceStart}
                  </Button>
                </>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span>{labelVoiceLoading}</span>
                  <Button variant="secondary" type="button" onClick={() => handleModeSelection('text')}>
                    {labelWrite}
                  </Button>
                </div>
              )
            ) : (
              <Button variant="secondary" type="button" onClick={() => handleModeSelection('text')}>
                {labelWrite}
              </Button>
            )}
          </div>
        )}

        {state.step === 'voiceConfirm' && (
          <div
            style={{
              background: '#f0f0ff',
              borderRadius: '16px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}
          >
            <div style={{ fontWeight: 700 }}>{labelConfirmTitle}</div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #d6d6f2',
                borderRadius: '12px',
                padding: '0.75rem 0.9rem'
              }}
            >
              {pendingTranscript ?? inputValue ?? '—'}
            </div>

            <div style={{ color: '#616075', fontSize: '0.95rem' }}>{labelConfirmHint}</div>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Button type="button" onClick={handleVoiceConfirmYes} disabled={!pendingTranscript}>
                {labelConfirmYes}
              </Button>
              <Button type="button" variant="secondary" onClick={() => {/* user edits input */}}>
                {labelConfirmEdit}
              </Button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleUserSubmit}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={placeholder}
            disabled={inputDisabled}
            style={{
              flex: 1,
              minWidth: '240px',
              borderRadius: '999px',
              border: '1px solid #d6d6f2',
              padding: '0.85rem 1.1rem',
              fontSize: '1rem'
            }}
          />
          <Button type="submit" disabled={inputDisabled}>
            {t('registration.send')}
          </Button>
        </form>

        {state.step === 'summary' && !state.completed && !state.blocked && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="secondary" type="button" onClick={() => sendUserInput(t('registration.bot.submit'))}>
              {t('registration.bot.submit')}
            </Button>
            <Button variant="secondary" type="button" onClick={() => sendUserInput(t('registration.bot.edit'))}>
              {t('registration.bot.edit')}
            </Button>
          </div>
        )}

        {state.completed && (
          <div style={{ marginTop: '1rem' }}>
            <Button onClick={() => navigate('/roles')}>{t('registration.back')}</Button>
          </div>
        )}
      </Card>
    </section>
  )
}
