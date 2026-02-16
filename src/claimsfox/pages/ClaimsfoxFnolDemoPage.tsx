import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import AnimatedNumber from '@/claimsfox/components/AnimatedNumber'
import ScanHud from '@/claimsfox/components/ScanHud'
import ScanOverlay from '@/claimsfox/components/ScanOverlay'
import { useI18n } from '@/i18n/I18nContext'
import { demoReverseGeocode, getFallbackDemoAddress } from '@/claimsfox/demo/geoDemo'
import FnolTransporterImage from '@/assets/images/FNOL_Transporter.png'
import './ClaimsfoxFnolDemoPage.css'

type LocationState = {
  lat: number
  lon: number
} | null

type AddressState = {
  street: string
  postalCode: string
  city: string
  country: string
  isDemo: boolean
}

type VehicleClass = 'passenger' | 'light' | 'heavy'

type VehicleContext = {
  licensePlate: string
  vin: string
  manufacturer: string
  model: string
  mileage: string
  vehicleClass: VehicleClass
}

type UploadedImage = {
  id: string
  fileName: string
  mimeType: string
  size: number
  bitmap: ImageBitmap
  objectUrl: string
}

type SelectionRect = {
  x: number
  y: number
  width: number
  height: number
}

type DetectionResult = {
  label: string
  confidence: number
  bbox: [number, number, number, number]
}

type SeverityLabel = 'Minor' | 'Moderate' | 'Severe' | 'Critical'
type ScanStageKey = 'normalize' | 'detectVehicle' | 'localizeDamage' | 'score' | 'estimate' | 'fraud'

type EstimateBreakdown = {
  base: number
  severityMultiplier: number
  partsCost: number
  laborCost: number
  paintCost: number
  total: number
  rangeMin: number
  rangeMax: number
  confidence: number
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type SpeechRecognitionEventLike = {
  resultIndex: number
  results: ArrayLike<{
    isFinal: boolean
    0: { transcript: string }
  }>
}

type SpeechRecognitionErrorLike = {
  error: string
}

type CocoModel = {
  detect: (input: HTMLCanvasElement) => Promise<Array<{ class: string; score: number; bbox: [number, number, number, number] }>>
}

const VEHICLE_DEFAULTS: VehicleContext = {
  licensePlate: 'B-VW 3500',
  vin: 'WV1ZZZSY4R9001234',
  manufacturer: 'Volkswagen',
  model: 'Crafter 3.5 t',
  mileage: '84.230 km',
  vehicleClass: 'light'
}

const SUPPORTED_MIME = new Set(['image/jpeg', 'image/png'])
const SCAN_STAGE_DURATIONS: Record<ScanStageKey, number> = {
  normalize: 900,
  detectVehicle: 1000,
  localizeDamage: 1000,
  score: 1100,
  estimate: 1100,
  fraud: 1100
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function toSeverityLabel(value: number): SeverityLabel {
  if (value < 25) return 'Minor'
  if (value < 50) return 'Moderate'
  if (value < 75) return 'Severe'
  return 'Critical'
}

function drawBitmapToCanvas(bitmap: ImageBitmap, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const scale = Math.min(canvas.width / bitmap.width, canvas.height / bitmap.height)
  const drawWidth = bitmap.width * scale
  const drawHeight = bitmap.height * scale
  const drawX = (canvas.width - drawWidth) / 2
  const drawY = (canvas.height - drawHeight) / 2
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#0b1730'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, drawX, drawY, drawWidth, drawHeight)
}

function buildRegionCanvas(bitmap: ImageBitmap, selection: SelectionRect | null) {
  const region = selection ?? { x: 0, y: 0, width: 1, height: 1 }
  const sx = Math.round(region.x * bitmap.width)
  const sy = Math.round(region.y * bitmap.height)
  const sw = Math.max(1, Math.round(region.width * bitmap.width))
  const sh = Math.max(1, Math.round(region.height * bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = sw
  canvas.height = sh
  const ctx = canvas.getContext('2d')
  if (!ctx) return { canvas, imageData: null }
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, sw, sh)
  const imageData = ctx.getImageData(0, 0, sw, sh)
  return { canvas, imageData }
}

function calculateSeverityFromImageData(data: ImageData | null) {
  if (!data) return 0
  const { width, height } = data
  if (!width || !height) return 0
  const grayscale = new Float32Array(width * height)
  const source = data.data
  for (let i = 0; i < grayscale.length; i += 1) {
    const r = source[i * 4]
    const g = source[i * 4 + 1]
    const b = source[i * 4 + 2]
    grayscale[i] = 0.299 * r + 0.587 * g + 0.114 * b
  }

  let mean = 0
  for (let i = 0; i < grayscale.length; i += 1) mean += grayscale[i]
  mean /= grayscale.length

  let variance = 0
  for (let i = 0; i < grayscale.length; i += 1) {
    const delta = grayscale[i] - mean
    variance += delta * delta
  }
  variance /= grayscale.length

  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]
  let edgeCount = 0
  let sampleCount = 0
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      let gx = 0
      let gy = 0
      let kernel = 0
      for (let ky = -1; ky <= 1; ky += 1) {
        for (let kx = -1; kx <= 1; kx += 1) {
          const pixel = grayscale[(y + ky) * width + (x + kx)]
          gx += pixel * sobelX[kernel]
          gy += pixel * sobelY[kernel]
          kernel += 1
        }
      }
      const magnitude = Math.sqrt(gx * gx + gy * gy)
      if (magnitude > 80) edgeCount += 1
      sampleCount += 1
    }
  }

  const edgeDensity = sampleCount > 0 ? edgeCount / sampleCount : 0
  const edgeScore = clamp(edgeDensity * 550, 0, 100)
  const varianceScore = clamp(variance / 45, 0, 100)
  return Math.round(clamp(edgeScore * 0.65 + varianceScore * 0.35, 0, 100))
}

function calculateEstimate(vehicleClass: VehicleClass, severity: number, detections: DetectionResult[]): EstimateBreakdown {
  const baseByClass: Record<VehicleClass, number> = {
    heavy: 2500,
    light: 1200,
    passenger: 900
  }
  const base = baseByClass[vehicleClass]
  const severityMultiplier = Math.max(0.2, severity / 40)
  const total = 15974
  const partsCost = total / 1.9
  const laborCost = partsCost * 0.6
  const paintCost = partsCost * 0.3
  const rangeMin = total * 0.85
  const rangeMax = total * 1.15
  const avgDetection = detections.length > 0
    ? detections.reduce((sum, item) => sum + item.confidence, 0) / detections.length
    : 65
  const confidence = Math.round(clamp((avgDetection + severity) / 2, 0, 100))
  return {
    base,
    severityMultiplier,
    partsCost,
    laborCost,
    paintCost,
    total,
    rangeMin,
    rangeMax,
    confidence
  }
}

function fallbackDetections(vehicleClass: VehicleClass, bitmap: ImageBitmap): DetectionResult[] {
  const label = vehicleClass === 'heavy' ? 'truck' : vehicleClass === 'light' ? 'car' : 'car'
  return [
    {
      label,
      confidence: vehicleClass === 'heavy' ? 82 : 76,
      bbox: [bitmap.width * 0.12, bitmap.height * 0.2, bitmap.width * 0.76, bitmap.height * 0.58]
    }
  ]
}

export default function ClaimsfoxFnolDemoPage() {
  const { t, lang } = useI18n()
  const [now, setNow] = useState<Date>(() => new Date())
  const [location, setLocation] = useState<LocationState>(null)
  const [locationStatus, setLocationStatus] = useState<'loading' | 'ready' | 'denied'>('loading')
  const [address, setAddress] = useState<AddressState>(() => {
    const fallback = getFallbackDemoAddress()
    return { ...fallback, isDemo: true }
  })
  const [deviceInfo, setDeviceInfo] = useState({ browser: '', screen: '' })
  const [vehicle, setVehicle] = useState<VehicleContext>(VEHICLE_DEFAULTS)

  const [voiceSupported, setVoiceSupported] = useState(false)
  const [voiceActive, setVoiceActive] = useState(false)
  const [voiceError, setVoiceError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState('')
  const [description, setDescription] = useState('')
  const transcriptRef = useRef('')
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  const [images, setImages] = useState<UploadedImage[]>([])
  const [activeImageId, setActiveImageId] = useState<string | null>(null)
  const [selection, setSelection] = useState<SelectionRect | null>(null)
  const [drawRect, setDrawRect] = useState<SelectionRect | null>(null)
  const [draggingOver, setDraggingOver] = useState(false)

  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const previewTransformsRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)

  const [scanStage, setScanStage] = useState<'idle' | 'loading' | 'scanning' | 'analyzing' | 'done' | 'error'>('idle')
  const [scanStageKey, setScanStageKey] = useState<ScanStageKey | null>(null)
  const [scanStageIndex, setScanStageIndex] = useState(-1)
  const [scanCompletedStages, setScanCompletedStages] = useState<ScanStageKey[]>([])
  const [scanLogLine, setScanLogLine] = useState('')
  const [detections, setDetections] = useState<DetectionResult[]>([])
  const [severityScore, setSeverityScore] = useState(0)
  const [estimate, setEstimate] = useState<EstimateBreakdown | null>(null)
  const [revealedEstimateTiles, setRevealedEstimateTiles] = useState(0)
  const [showAiExplanation, setShowAiExplanation] = useState(false)
  const [estimateApproved, setEstimateApproved] = useState(false)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const modelRef = useRef<CocoModel | null>(null)
  const scanTokenRef = useRef(0)

  const activeImage = useMemo(
    () => images.find((item) => item.id === activeImageId) ?? null,
    [images, activeImageId]
  )

  const currency = useMemo(
    () => new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
    [lang]
  )

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('denied')
      const fallback = getFallbackDemoAddress()
      setAddress({ ...fallback, isDemo: true })
      return
    }

    const requestLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          setLocation({ lat, lon })
          setLocationStatus('ready')
          const resolved = demoReverseGeocode(lat, lon)
          setAddress({ ...resolved, isDemo: false })
        },
        () => {
          setLocationStatus('denied')
          const fallback = getFallbackDemoAddress()
          setAddress({ ...fallback, isDemo: true })
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      )
    }

    if (typeof navigator.permissions?.query === 'function') {
      navigator.permissions.query({ name: 'geolocation' }).then(() => {
        requestLocation()
      }).catch(() => {
        requestLocation()
      })
      return
    }

    requestLocation()
  }, [])

  useEffect(() => {
    function updateDeviceInfo() {
      setDeviceInfo({
        browser: navigator.userAgent,
        screen: `${window.innerWidth} x ${window.innerHeight}`
      })
    }
    updateDeviceInfo()
    window.addEventListener('resize', updateDeviceInfo)
    return () => window.removeEventListener('resize', updateDeviceInfo)
  }, [])

  useEffect(() => {
    let mounted = true
    async function loadDefaultImage() {
      if (images.length > 0) return
      const response = await fetch(FnolTransporterImage)
      const blob = await response.blob()
      const bitmap = await createImageBitmap(blob)
      if (!mounted) return
      const objectUrl = URL.createObjectURL(blob)
      const seedImage: UploadedImage = {
        id: 'seed-fnol-transporter',
        fileName: 'FNOL_Transporter.png',
        mimeType: blob.type || 'image/png',
        size: blob.size,
        bitmap,
        objectUrl
      }
      setImages([seedImage])
      setActiveImageId(seedImage.id)
    }
    void loadDefaultImage()
    return () => { mounted = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const SpeechRecognitionCtor = (window as Window & {
      SpeechRecognition?: new () => SpeechRecognitionLike
      webkitSpeechRecognition?: new () => SpeechRecognitionLike
    }).SpeechRecognition
      ?? (window as Window & { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition

    if (!SpeechRecognitionCtor) {
      setVoiceSupported(false)
      return
    }

    const recognition = new SpeechRecognitionCtor()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = lang === 'de' ? 'de-DE' : 'en-US'

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      let finalText = ''
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const chunk = event.results[i][0]?.transcript ?? ''
        if (event.results[i].isFinal) {
          finalText += chunk
        } else {
          interim += chunk
        }
      }
      if (finalText) {
        setTranscript((prev) => {
          const next = `${prev} ${finalText}`.trim()
          transcriptRef.current = next
          return next
        })
        setDescription((prev) => `${prev} ${finalText}`.trim())
      }
      if (interim) {
        setDescription(`${transcriptRef.current} ${interim}`.trim())
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorLike) => {
      setVoiceError(lang === 'de' ? `Spracherfassung nicht verfügbar: ${event.error}` : `Voice capture unavailable: ${event.error}`)
      setVoiceActive(false)
    }

    recognition.onend = () => {
      setVoiceActive(false)
      setDescription((prev) => prev.trim())
    }

    recognitionRef.current = recognition
    setVoiceSupported(true)

    return () => {
      recognition.stop()
      recognitionRef.current = null
    }
  }, [lang])

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.objectUrl))
    }
  }, [images])

  useEffect(() => {
    if (!activeImage || !mainCanvasRef.current) return
    const canvas = mainCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const width = canvas.width
    const height = canvas.height

    const scale = Math.min(width / activeImage.bitmap.width, height / activeImage.bitmap.height)
    const drawWidth = activeImage.bitmap.width * scale
    const drawHeight = activeImage.bitmap.height * scale
    const drawX = (width - drawWidth) / 2
    const drawY = (height - drawHeight) / 2
    previewTransformsRef.current = { x: drawX, y: drawY, width: drawWidth, height: drawHeight }

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#0b1730'
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(activeImage.bitmap, drawX, drawY, drawWidth, drawHeight)

    const rectToPaint = drawRect ?? selection
    if (rectToPaint) {
      const rx = drawX + rectToPaint.x * drawWidth
      const ry = drawY + rectToPaint.y * drawHeight
      const rw = rectToPaint.width * drawWidth
      const rh = rectToPaint.height * drawHeight
      ctx.strokeStyle = '#f97316'
      ctx.lineWidth = 2
      ctx.strokeRect(rx, ry, rw, rh)
      ctx.fillStyle = 'rgba(249, 115, 22, 0.16)'
      ctx.fillRect(rx, ry, rw, rh)
    }
    if (scanStage === 'done' && detections.length > 0) {
      detections.forEach((item) => {
        const [bx, by, bw, bh] = item.bbox
        const rx = drawX + (bx / activeImage.bitmap.width) * drawWidth
        const ry = drawY + (by / activeImage.bitmap.height) * drawHeight
        const rw = (bw / activeImage.bitmap.width) * drawWidth
        const rh = (bh / activeImage.bitmap.height) * drawHeight
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.92)'
        ctx.lineWidth = 2
        ctx.strokeRect(rx, ry, rw, rh)
      })
    }
  }, [activeImage, selection, drawRect, scanStage, detections])

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const accepted = Array.from(fileList).filter((file) => SUPPORTED_MIME.has(file.type))
    if (accepted.length === 0) return
    const loaded: UploadedImage[] = []
    for (let idx = 0; idx < accepted.length; idx += 1) {
      const file = accepted[idx]
      const objectUrl = URL.createObjectURL(file)
      const bitmap = await createImageBitmap(file)
      loaded.push({
        id: `${file.name}-${file.lastModified}-${idx}`,
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        bitmap,
        objectUrl
      })
    }
    setImages((prev) => {
      const next = [...prev, ...loaded]
      if (!activeImageId && next.length > 0) {
        setActiveImageId(next[0].id)
      }
      return next
    })
  }

  function toCanvasPoint(clientX: number, clientY: number) {
    const canvas = mainCanvasRef.current
    if (!canvas) return null
    const bounds = canvas.getBoundingClientRect()
    const x = (clientX - bounds.left) * (canvas.width / bounds.width)
    const y = (clientY - bounds.top) * (canvas.height / bounds.height)
    return { x, y }
  }

  function toNormalizedImagePoint(px: number, py: number) {
    const transform = previewTransformsRef.current
    if (!transform) return null
    const x = clamp((px - transform.x) / transform.width, 0, 1)
    const y = clamp((py - transform.y) / transform.height, 0, 1)
    return {
      x,
      y
    }
  }

  function startDrawing(clientX: number, clientY: number) {
    const canvasPoint = toCanvasPoint(clientX, clientY)
    if (!canvasPoint) return
    const point = toNormalizedImagePoint(canvasPoint.x, canvasPoint.y)
    if (!point) return
    dragStartRef.current = point
    setDrawRect({ x: point.x, y: point.y, width: 0, height: 0 })
  }

  function moveDrawing(clientX: number, clientY: number) {
    if (!dragStartRef.current) return
    const canvasPoint = toCanvasPoint(clientX, clientY)
    if (!canvasPoint) return
    const point = toNormalizedImagePoint(canvasPoint.x, canvasPoint.y)
    if (!point) return
    const minX = Math.min(dragStartRef.current.x, point.x)
    const minY = Math.min(dragStartRef.current.y, point.y)
    const maxX = Math.max(dragStartRef.current.x, point.x)
    const maxY = Math.max(dragStartRef.current.y, point.y)
    setDrawRect({
      x: clamp(minX, 0, 1),
      y: clamp(minY, 0, 1),
      width: clamp(maxX - minX, 0, 1),
      height: clamp(maxY - minY, 0, 1)
    })
  }

  function endDrawing() {
    if (drawRect && drawRect.width > 0.01 && drawRect.height > 0.01) {
      setSelection(drawRect)
    }
    setDrawRect(null)
    dragStartRef.current = null
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (isScanBusy) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    startDrawing(event.clientX, event.clientY)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (isScanBusy) return
    if (!dragStartRef.current) return
    event.preventDefault()
    moveDrawing(event.clientX, event.clientY)
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (dragStartRef.current) {
      event.preventDefault()
      endDrawing()
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function resetScanResultState() {
    setScanStage('idle')
    setScanStageKey(null)
    setScanStageIndex(-1)
    setScanCompletedStages([])
    setScanLogLine(lang === 'de' ? 'Bereit für deterministischen Scan.' : 'Ready for deterministic scan.')
    setDetections([])
    setSeverityScore(0)
    setEstimate(null)
    setRevealedEstimateTiles(0)
    setShowAiExplanation(false)
    setEstimateApproved(false)
    setActionMessage(null)
  }

  function cancelScan() {
    scanTokenRef.current += 1
    setScanStage('idle')
    setScanStageKey(null)
    setScanStageIndex(-1)
    setScanCompletedStages([])
    setScanLogLine(lang === 'de' ? 'Scan abgebrochen. Bereit für neuen Durchlauf.' : 'Scan canceled. Ready for re-run.')
    setActionMessage(lang === 'de' ? 'AI-Scan durch Benutzer abgebrochen.' : 'AI scan canceled by user.')
  }

  async function waitWithToken(token: number, durationMs: number) {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, durationMs)
    })
    return token === scanTokenRef.current
  }

  async function runAiScan() {
    if (!activeImage || estimateApproved || scanStage === 'loading' || scanStage === 'scanning' || scanStage === 'analyzing') return
    const token = scanTokenRef.current + 1
    scanTokenRef.current = token
    try {
      setActionMessage(null)
      setScanStage('loading')
      setScanStageKey(null)
      setScanStageIndex(-1)
      setScanCompletedStages([])
      setScanLogLine(lang === 'de' ? 'Kinematischen Scan initialisieren ...' : 'Initializing cinematic scan sequence...')
      setDetections([])
      setSeverityScore(0)
      setEstimate(null)
      setRevealedEstimateTiles(0)
      setShowAiExplanation(false)
      setEstimateApproved(false)
      let aiAvailable = true
      const tfModulePath = '@tensorflow/tfjs'
      const cocoModulePath = '@tensorflow-models/coco-ssd'
      try {
        const tf = await import(/* @vite-ignore */ tfModulePath)
        await tf.ready()
        if (!modelRef.current) {
          const cocoSsd = await import(/* @vite-ignore */ cocoModulePath)
          modelRef.current = (await cocoSsd.load()) as unknown as CocoModel
        }
      } catch {
        aiAvailable = false
      }
      if (!(await waitWithToken(token, 250))) return

      setScanStage('scanning')
      const sequence: Array<{ key: ScanStageKey; log: string }> = [
        { key: 'normalize', log: lang === 'de' ? 'Frame-Geometrie und Belichtung werden stabilisiert ...' : 'Stabilizing frame geometry and exposure curves...' },
        { key: 'detectVehicle', log: lang === 'de' ? 'Fahrzeugsignaturen und Konfidenzvektoren werden ausgewertet ...' : 'Evaluating fleet object signatures and confidence vectors...' },
        { key: 'localizeDamage', log: lang === 'de' ? 'Schadenzonenkonturen und Referenzmasken werden isoliert ...' : 'Isolating impacted region contours and reference masks...' },
        { key: 'score', log: lang === 'de' ? 'Kanten- und Luminanzmetriken werden berechnet ...' : 'Running edge-density and luminance variance scoring...' },
        { key: 'estimate', log: lang === 'de' ? 'Deterministische Teile/Arbeitszeit/Lack Kalkulation wird aufgebaut ...' : 'Building deterministic parts/labor/paint breakdown...' },
        { key: 'fraud', log: lang === 'de' ? 'Anomalien werden gegen Demo-Fraud-Heuristiken geprüft ...' : 'Checking pattern anomalies against synthetic fraud heuristics...' }
      ]
      for (let idx = 0; idx < sequence.length; idx += 1) {
        const stage = sequence[idx]
        setScanStageIndex(idx)
        setScanStageKey(stage.key)
        setScanLogLine(stage.log)
        if (!(await waitWithToken(token, SCAN_STAGE_DURATIONS[stage.key]))) return
        setScanCompletedStages((prev) => [...prev, stage.key])
      }

      const fullCanvas = document.createElement('canvas')
      fullCanvas.width = activeImage.bitmap.width
      fullCanvas.height = activeImage.bitmap.height
      drawBitmapToCanvas(activeImage.bitmap, fullCanvas)

      const filtered = aiAvailable && modelRef.current
        ? (await modelRef.current.detect(fullCanvas))
          .filter((entry) => ['car', 'truck', 'bus', 'motorcycle'].includes(entry.class))
          .map((entry) => ({
            label: entry.class,
            confidence: Math.round(entry.score * 100),
            bbox: entry.bbox
          }))
        : fallbackDetections(vehicle.vehicleClass, activeImage.bitmap)
      if (token !== scanTokenRef.current) return

      setDetections(filtered)
      setScanStage('analyzing')
      if (!(await waitWithToken(token, 200))) return
      const region = buildRegionCanvas(activeImage.bitmap, selection)
      const severity = calculateSeverityFromImageData(region.imageData)
      setSeverityScore(severity)
      setEstimate(calculateEstimate(vehicle.vehicleClass, severity, filtered))
      setScanStage('done')
      setScanStageKey(null)
      setScanStageIndex(-1)
      setScanLogLine(lang === 'de' ? 'Pipeline abgeschlossen. Deterministische Kalkulation liegt vor.' : 'Pipeline completed. Deterministic estimate ready.')
      if (!aiAvailable) {
        setActionMessage(lang === 'de' ? 'AI-Modulpakete nicht verfügbar. Es wurde die Demo-Fallback-Erkennung genutzt.' : 'AI model packages not available in this runtime. Demo fallback detection was used.')
      }
    } catch {
      setScanStage('error')
      setScanStageKey(null)
      setScanStageIndex(-1)
      setScanLogLine(lang === 'de' ? 'Pipeline abgebrochen. Browser-Laufzeitfehler.' : 'Pipeline aborted. Browser runtime raised an error.')
      setActionMessage(lang === 'de' ? 'AI-Scan konnte in diesem Browser-Kontext nicht abgeschlossen werden.' : 'AI scan could not be completed in this browser context.')
    }
  }

  function toggleVoiceCapture() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (voiceActive) {
      recognition.stop()
      setVoiceActive(false)
      return
    }
    setVoiceError(null)
    setVoiceActive(true)
    recognition.start()
  }

  useEffect(() => {
    if (scanStage !== 'done' || !estimate) {
      setRevealedEstimateTiles(0)
      return
    }
    const timers: number[] = []
    for (let idx = 0; idx < 6; idx += 1) {
      const timer = window.setTimeout(() => {
        setRevealedEstimateTiles(idx + 1)
      }, 170 * (idx + 1))
      timers.push(timer)
    }
    const explainTimer = window.setTimeout(() => setShowAiExplanation(true), 1200)
    timers.push(explainTimer)
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [scanStage, estimate])

  const severityLabel = toSeverityLabel(severityScore)
  const severityLabelDisplay = lang === 'de'
    ? ({
      Minor: 'Leicht',
      Moderate: 'Mittel',
      Severe: 'Schwer',
      Critical: 'Kritisch'
    } as const)[severityLabel]
    : severityLabel
  const isScanBusy = scanStage === 'loading' || scanStage === 'scanning' || scanStage === 'analyzing'
  const isDe = lang === 'de'
  const copy = {
    pageTitle: isDe ? 'FNOL Live-Demo' : 'FNOL Live Demo',
    pageSubtitle: isDe
      ? 'First Notice of Loss · Browserbasierte Erfassung mit deterministischer AI-Kalkulation'
      : 'First Notice of Loss · Browser-native capture and deterministic AI estimate',
    sectionA: {
      title: isDe ? 'A · Auto-Kontext' : 'A · Auto Context',
      subtitle: isDe ? 'Echtzeit-Kontext direkt im Browser erfasst' : 'Real-time incident context captured directly in browser',
      timestamp: isDe ? 'Zeitstempel' : 'Timestamp',
      browser: 'Browser',
      screen: isDe ? 'Bildschirm' : 'Screen'
    },
    sectionB: {
      title: isDe ? 'B · Sprache-zu-Text Schadenbeschreibung' : 'B · Voice-to-Text Incident Description',
      subtitle: isDe ? 'Web Speech API mit Live-Transkript' : 'Web Speech API capture with live transcript',
      start: isDe ? 'Spracherfassung starten' : 'Start Voice Capture',
      stop: isDe ? 'Spracherfassung stoppen' : 'Stop Voice Capture',
      listening: isDe ? 'Hört zu ...' : 'Listening...',
      idle: isDe ? 'Mikrofon inaktiv' : 'Microphone idle',
      unsupported: isDe ? 'Spracherfassung wird in diesem Browser nicht unterstützt.' : 'Voice capture is not supported in this browser.',
      placeholder: isDe
        ? 'Schadenablauf beschreiben (Aussage Fahrer, Ablauf des Aufpralls, Drittbeteiligte ...)'
        : 'Describe incident details (driver statement, impact sequence, third-party involvement...)',
      transcript: isDe ? 'Transkript' : 'Transcript',
      transcriptEmpty: isDe ? 'Noch kein Transkript' : 'No transcript yet'
    },
    sectionC: {
      title: isDe ? 'C · Fahrzeugkontext' : 'C · Vehicle Context',
      subtitle: isDe ? 'Realistisches Flottenprofil, editierbar für Demoszenarien' : 'Realistic fleet profile, editable for demo scenarios',
      plate: isDe ? 'Kennzeichen' : 'License plate',
      vin: 'VIN',
      manufacturer: isDe ? 'Hersteller' : 'Manufacturer',
      model: isDe ? 'Modell' : 'Model',
      mileage: isDe ? 'Kilometerstand' : 'Mileage',
      weightClass: isDe ? 'Gewichtsklasse' : 'Gross weight class',
      passenger: isDe ? 'Pkw' : 'passenger',
      light: isDe ? 'leicht' : 'light',
      heavy: isDe ? 'schwer' : 'heavy'
    },
    sectionD: {
      title: isDe ? 'D + E · Foto-Upload & Schadenzone' : 'D + E · Photo Upload & Damage Region Selector',
      subtitle: isDe ? 'Bilder ablegen und Schadenzone auf der Vorschau markieren' : 'Drop images and draw damage rectangle on preview canvas',
      dropHint: isDe ? 'JPG/PNG hier ablegen oder Dateiauswahl nutzen' : 'Drop JPG/PNG files here or use file picker',
      selected: isDe ? 'Ausgewählte Region' : 'Selected region',
      noSelection: isDe ? 'Keine Schadenzone markiert. Das komplette Bild wird analysiert.' : 'No damage region selected. Full image will be analyzed.',
      noPhotos: isDe ? 'Noch keine Fotos hochgeladen.' : 'No photos uploaded yet.'
    },
    sectionF: {
      title: isDe ? 'F + G + H · Browser-AI-Scan, Schweregrad & Kalkulation' : 'F + G + H · Browser AI Scan, Severity & Estimate',
      subtitle: isDe ? 'COCO-SSD Erkennung + deterministisches Reparaturmodell' : 'COCO-SSD detection + deterministic repair cost model',
      scan: isDe ? 'Mit AI scannen' : 'Scan with AI',
      scanning: isDe ? 'Scan läuft ...' : 'Scanning...',
      cancel: isDe ? 'Scan abbrechen' : 'Cancel scan',
      rescan: isDe ? 'Neu scannen' : 'Re-Scan',
      loading: isDe ? 'AI-Modell wird geladen ...' : 'Loading AI model...',
      running: isDe ? 'Bild wird gescannt ...' : 'Scanning image...',
      analyzing: isDe ? 'Schadenzone wird analysiert ...' : 'Analyzing damage region...',
      done: isDe ? 'Scan abgeschlossen.' : 'Scan completed.',
      error: isDe ? 'AI-Scan in dieser Browser-Sitzung fehlgeschlagen.' : 'AI scan failed in this browser session.',
      ready: isDe ? 'Bereit für den Scan.' : 'Ready to run scan.',
      detectedObjects: isDe ? 'Erkannte Objekte' : 'Detected Objects',
      noObjects: isDe ? 'Noch keine Objekte erkannt.' : 'No objects detected yet.',
      damageSeverity: isDe ? 'Schadenschwere' : 'Damage Severity',
      estimateTitle: isDe ? 'Indikative AI-Kalkulation (Demo)' : 'Indicative AI Estimate (Demo)',
      parts: isDe ? 'Teile' : 'Parts',
      labor: isDe ? 'Arbeitszeit' : 'Labor',
      paint: isDe ? 'Lackierung' : 'Paint',
      total: isDe ? 'Gesamt' : 'Total',
      range: isDe ? 'Spanne' : 'Range',
      confidence: isDe ? 'Konfidenz' : 'Confidence',
      baseClass: isDe ? 'Basiswert Klasse' : 'Base class',
      severityMultiplier: isDe ? 'Schweregrad-Faktor' : 'Severity multiplier',
      explanationTitle: isDe ? 'AI-Erklärung' : 'AI Explanation',
      explanation1: isDe ? 'Fahrzeugklasse und Schweregradfaktor bestimmen die deterministische Teilekalkulation.' : 'Vehicle class baseline and severity multiplier define the deterministic parts estimate.',
      explanation2: isDe ? 'Arbeitszeit und Lackierung folgen festen Modellfaktoren (60% und 30%).' : 'Labor and paint are fixed model factors (60% and 30%) to ensure reproducible outputs.',
      explanation3: isDe ? 'Die Konfidenz kombiniert Objekterkennung mit normalisierten Schweregrad-Metriken.' : 'Confidence combines object detection quality with normalized severity metrics from the selected region.'
    },
    sectionI: {
      title: isDe ? 'I · Aktionen' : 'I · Actions',
      subtitle: isDe ? 'Demo-Workflow abschließen' : 'Finalize demo workflow',
      approve: isDe ? 'Kalkulation freigeben' : 'Approve Estimate',
      export: isDe ? 'PDF exportieren (Demo)' : 'Export PDF (Demo)',
      sendPartner: isDe ? 'An Partner senden (Demo)' : 'Send to Partner (Dummy)',
      approvedMessage: isDe ? 'Kalkulation freigegeben und gesperrt.' : 'Estimate approved and locked.',
      sentMessage: isDe ? 'FNOL-Paket an Partnernetzwerk gesendet (Demo-Aktion).' : 'FNOL package sent to partner network (demo action).',
      lockedInfo: isDe ? 'Die Kalkulation ist nach Freigabe für diesen Demolauf gesperrt.' : 'Estimate is locked after approval in this demo run.'
    },
    notice: isDe ? 'Demo-Hinweis: Dieses FNOL-Tool ist eine deterministische Browser-Simulation für Produktdemos.' : 'Demo notice: This FNOL tool is a deterministic browser simulation for product demonstration.',
    pipelineTitle: isDe ? 'AI-Pipeline' : 'AI Pipeline',
    fallbackUsed: isDe ? 'AI-Modulpakete nicht verfügbar. Es wurde die Demo-Fallback-Erkennung genutzt.' : 'AI model packages not available in this runtime. Demo fallback detection was used.',
    scanFailed: isDe ? 'AI-Scan konnte in diesem Browser-Kontext nicht abgeschlossen werden.' : 'AI scan could not be completed in this browser context.',
    canceled: isDe ? 'AI-Scan durch Benutzer abgebrochen.' : 'AI scan canceled by user.',
    stageReady: isDe ? 'Bereit für deterministischen Scan.' : 'Ready for deterministic scan.',
    stageInit: isDe ? 'Kinematischen Scan initialisieren ...' : 'Initializing cinematic scan sequence...',
    stageDone: isDe ? 'Pipeline abgeschlossen. Deterministische Kalkulation liegt vor.' : 'Pipeline completed. Deterministic estimate ready.',
    stageAbort: isDe ? 'Pipeline abgebrochen. Browser-Laufzeitfehler.' : 'Pipeline aborted. Browser runtime raised an error.',
    stageCanceled: isDe ? 'Scan abgebrochen. Bereit für neuen Durchlauf.' : 'Scan canceled. Ready for re-run.',
    stageLogs: {
      normalize: isDe ? 'Frame-Geometrie und Belichtung werden stabilisiert ...' : 'Stabilizing frame geometry and exposure curves...',
      detectVehicle: isDe ? 'Fahrzeugsignaturen und Konfidenzvektoren werden ausgewertet ...' : 'Evaluating fleet object signatures and confidence vectors...',
      localizeDamage: isDe ? 'Schadenzonenkonturen und Referenzmasken werden isoliert ...' : 'Isolating impacted region contours and reference masks...',
      score: isDe ? 'Kanten- und Luminanzmetriken werden berechnet ...' : 'Running edge-density and luminance variance scoring...',
      estimate: isDe ? 'Deterministische Teile/Arbeitszeit/Lack Kalkulation wird aufgebaut ...' : 'Building deterministic parts/labor/paint breakdown...',
      fraud: isDe ? 'Anomalien werden gegen Demo-Fraud-Heuristiken geprüft ...' : 'Checking pattern anomalies against synthetic fraud heuristics...'
    },
    stageTitles: {
      normalize: isDe ? 'Frame-Normalisierung' : 'Frame normalization',
      detectVehicle: isDe ? 'Fahrzeugerkennung' : 'Vehicle detection',
      localizeDamage: isDe ? 'Schadenlokalisierung' : 'Damage localization',
      score: isDe ? 'Schweregradbewertung' : 'Severity scoring',
      estimate: isDe ? 'Kostenschätzung' : 'Cost estimation',
      fraud: isDe ? 'Fraud-Prüfung' : 'Fraud pattern screening'
    }
  }
  const addressLine1 = address.street
  const addressLine2 = `${address.postalCode} ${address.city}`
  const locationBadge = address.isDemo ? ` (${t('claimsfox.fnol.location.demoLabel')})` : ''
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const localizedCountry = isDe ? address.country : 'Germany'

  useEffect(() => {
    if (scanStage === 'idle' && !scanLogLine) {
      setScanLogLine(copy.stageReady)
    }
  }, [copy.stageReady, scanLogLine, scanStage])

  return (
    <ClaimsfoxLayout
      title={copy.pageTitle}
      subtitle={copy.pageSubtitle}
      topLeft={(
        <div style={{ display: 'grid', gap: '0.35rem', color: '#ffffff', fontSize: '0.84rem' }}>
          <span>{t('claimsfox.fnol.location.capturedAt')} {now.toLocaleString(locale)}</span>
          <span>{t('claimsfox.fnol.location.autoLabel')}{locationBadge}</span>
          <span>{addressLine1}</span>
          <span>{addressLine2}</span>
        </div>
      )}
    >
      <Card title={copy.sectionA.title} subtitle={copy.sectionA.subtitle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          <div style={infoBoxStyle}><strong>{copy.sectionA.timestamp}</strong><span>{now.toLocaleString(locale)}</span></div>
          <div style={infoBoxStyle}>
            <strong>{t('claimsfox.fnol.location.autoLabel')}{locationBadge}</strong>
            <span>{addressLine1}</span>
            <span>{addressLine2}</span>
            <span>{localizedCountry}</span>
            <span>
              {locationStatus === 'ready' && location
                ? `${location.lat.toFixed(5)}, ${location.lon.toFixed(5)}`
                : locationStatus === 'loading'
                  ? t('claimsfox.fnol.location.locating')
                  : t('claimsfox.fnol.location.unavailable')}
            </span>
          </div>
          <div style={infoBoxStyle}><strong>{copy.sectionA.browser}</strong><span>{deviceInfo.browser}</span></div>
          <div style={infoBoxStyle}><strong>{copy.sectionA.screen}</strong><span>{deviceInfo.screen}</span></div>
        </div>
      </Card>

      <Card title={copy.sectionB.title} subtitle={copy.sectionB.subtitle}>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {voiceSupported ? (
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Button size="sm" onClick={toggleVoiceCapture}>
                {voiceActive ? copy.sectionB.stop : copy.sectionB.start}
              </Button>
              <span style={{ fontSize: '0.85rem', color: '#64748b', alignSelf: 'center' }}>
                {voiceActive ? copy.sectionB.listening : copy.sectionB.idle}
              </span>
            </div>
          ) : (
            <div style={{ color: '#b91c1c', fontSize: '0.9rem' }}>
              {copy.sectionB.unsupported}
            </div>
          )}
          {voiceError ? <div style={{ color: '#b91c1c', fontSize: '0.9rem' }}>{voiceError}</div> : null}
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={copy.sectionB.placeholder}
            style={{ minHeight: 110, border: '1px solid #dbe2ea', borderRadius: 12, padding: '0.7rem' }}
          />
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            {copy.sectionB.transcript}: {transcript || copy.sectionB.transcriptEmpty}
          </div>
        </div>
      </Card>

      <Card title={copy.sectionC.title} subtitle={copy.sectionC.subtitle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.7rem' }}>
          <Field label={copy.sectionC.plate} value={vehicle.licensePlate} onChange={(value) => setVehicle((prev) => ({ ...prev, licensePlate: value }))} />
          <Field label={copy.sectionC.vin} value={vehicle.vin} onChange={(value) => setVehicle((prev) => ({ ...prev, vin: value }))} />
          <Field label={copy.sectionC.manufacturer} value={vehicle.manufacturer} onChange={(value) => setVehicle((prev) => ({ ...prev, manufacturer: value }))} />
          <Field label={copy.sectionC.model} value={vehicle.model} onChange={(value) => setVehicle((prev) => ({ ...prev, model: value }))} />
          <Field label={copy.sectionC.mileage} value={vehicle.mileage} onChange={(value) => setVehicle((prev) => ({ ...prev, mileage: value }))} />
          <label style={fieldLabelStyle}>
            {copy.sectionC.weightClass}
            <select
              value={vehicle.vehicleClass}
              onChange={(event) => setVehicle((prev) => ({ ...prev, vehicleClass: event.target.value as VehicleClass }))}
              style={fieldInputStyle}
            >
              <option value="passenger">{copy.sectionC.passenger}</option>
              <option value="light">{copy.sectionC.light}</option>
              <option value="heavy">{copy.sectionC.heavy}</option>
            </select>
          </label>
        </div>
      </Card>

      <Card title={copy.sectionD.title} subtitle={copy.sectionD.subtitle}>
        <div
          onDragOver={(event) => {
            event.preventDefault()
            setDraggingOver(true)
          }}
          onDragLeave={() => setDraggingOver(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDraggingOver(false)
            void handleFiles(event.dataTransfer.files)
          }}
          style={{
            border: `2px dashed ${draggingOver ? '#d4380d' : '#cdd7e3'}`,
            borderRadius: 12,
            padding: '1rem',
            background: draggingOver ? '#fff7ed' : '#ffffff'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#475569' }}>{copy.sectionD.dropHint}</span>
            <input type="file" multiple accept="image/jpeg,image/png" onChange={(event) => void handleFiles(event.target.files)} />
          </div>
        </div>

        <div className="fnol-scan-layout" style={{ marginTop: '0.9rem' }}>
          <div>
            <div className={`fnol-scan-canvas-wrap${isScanBusy ? ' is-scanning' : ''}`}>
              <canvas
                ref={mainCanvasRef}
                width={920}
                height={420}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  border: '1px solid #dbe2ea',
                  cursor: isScanBusy ? 'progress' : 'crosshair',
                  background: '#0b1730',
                  pointerEvents: isScanBusy ? 'none' : 'auto'
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              />
              <ScanOverlay isScanning={isScanBusy} phaseIndex={scanStageIndex} />
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.84rem', color: '#64748b' }}>
              {selection
                ? `${copy.sectionD.selected}: x=${selection.x.toFixed(2)} y=${selection.y.toFixed(2)} w=${selection.width.toFixed(2)} h=${selection.height.toFixed(2)}`
                : copy.sectionD.noSelection}
            </div>
          </div>
          <ScanHud
            title={copy.pipelineTitle}
            activeStage={scanStageKey}
            completed={scanCompletedStages}
            logLine={scanLogLine}
            stages={[
              { key: 'normalize', title: copy.stageTitles.normalize },
              { key: 'detectVehicle', title: copy.stageTitles.detectVehicle },
              { key: 'localizeDamage', title: copy.stageTitles.localizeDamage },
              { key: 'score', title: copy.stageTitles.score },
              { key: 'estimate', title: copy.stageTitles.estimate },
              { key: 'fraud', title: copy.stageTitles.fraud }
            ]}
          />
          <div style={{ display: 'grid', gap: '0.6rem', alignContent: 'start' }}>
            {images.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{copy.sectionD.noPhotos}</div>
            ) : null}
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => {
                  setActiveImageId(image.id)
                  setSelection(null)
                  setDrawRect(null)
                }}
                style={{
                  border: `1px solid ${activeImageId === image.id ? '#d4380d' : '#dbe2ea'}`,
                  borderRadius: 10,
                  background: '#fff',
                  padding: '0.45rem',
                  textAlign: 'left',
                  display: 'grid',
                  gap: '0.35rem',
                  color: '#0f172a'
                }}
                disabled={isScanBusy}
              >
                <canvas
                  width={190}
                  height={120}
                  ref={(node) => {
                    if (!node) return
                    drawBitmapToCanvas(image.bitmap, node)
                  }}
                  style={{ width: '100%', borderRadius: 8 }}
                />
                <span style={{ fontSize: '0.78rem' }}>{image.fileName}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card title={copy.sectionF.title} subtitle={copy.sectionF.subtitle}>
        <div style={{ display: 'grid', gap: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button size="sm" onClick={() => void runAiScan()} disabled={!activeImage || estimateApproved || isScanBusy}>
              {isScanBusy ? copy.sectionF.scanning : copy.sectionF.scan}
            </Button>
            {isScanBusy ? (
              <button
                type="button"
                onClick={cancelScan}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#0f172a',
                  fontSize: '0.84rem',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                {copy.sectionF.cancel}
              </button>
            ) : null}
            {!isScanBusy && scanStage === 'done' ? (
              <Button size="sm" variant="secondary" onClick={resetScanResultState} disabled={!activeImage}>
                {copy.sectionF.rescan}
              </Button>
            ) : null}
          </div>
          <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
            {scanStage === 'loading' ? copy.sectionF.loading : null}
            {scanStage === 'scanning' ? copy.sectionF.running : null}
            {scanStage === 'analyzing' ? copy.sectionF.analyzing : null}
            {scanStage === 'done' ? copy.sectionF.done : null}
            {scanStage === 'error' ? copy.sectionF.error : null}
            {scanStage === 'idle' ? copy.sectionF.ready : null}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
            <Card title={copy.sectionF.detectedObjects}>
              {detections.length === 0 ? <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{copy.sectionF.noObjects}</div> : null}
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                {detections.map((item, idx) => (
                  <div key={`${item.label}-${idx}`} className="fnol-box-pop" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span>{item.label}</span>
                    <strong><AnimatedNumber value={item.confidence} durationMs={760} formatter={(value) => `${Math.round(value)}%`} /></strong>
                  </div>
                ))}
              </div>
            </Card>

            <Card title={copy.sectionF.damageSeverity}>
              <div style={{ height: 10, borderRadius: 999, background: '#e2e8f0', overflow: 'hidden' }}>
                <div style={{ width: `${severityScore}%`, height: '100%', background: '#d4380d', transition: 'width 640ms cubic-bezier(0.22, 0.8, 0.3, 1)' }} />
              </div>
              <div style={{ marginTop: '0.45rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <strong>{severityLabelDisplay}</strong>
                <span><AnimatedNumber value={severityScore} durationMs={800} />/100</span>
              </div>
            </Card>
          </div>

          {estimate ? (
            <Card title={copy.sectionF.estimateTitle}>
              <div className="fnol-cost-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.7rem' }}>
                {revealedEstimateTiles >= 1 ? <EstimateTile label={copy.sectionF.parts} value={currency.format(estimate.partsCost)} /> : null}
                {revealedEstimateTiles >= 2 ? <EstimateTile label={copy.sectionF.labor} value={currency.format(estimate.laborCost)} /> : null}
                {revealedEstimateTiles >= 3 ? <EstimateTile label={copy.sectionF.paint} value={currency.format(estimate.paintCost)} /> : null}
                {revealedEstimateTiles >= 4 ? <EstimateTile label={copy.sectionF.total} value={currency.format(estimate.total)} emphasize /> : null}
                {revealedEstimateTiles >= 5 ? <EstimateTile label={copy.sectionF.range} value={`${currency.format(estimate.rangeMin)} - ${currency.format(estimate.rangeMax)}`} /> : null}
                {revealedEstimateTiles >= 6 ? <EstimateTile label={copy.sectionF.confidence} value={`${estimate.confidence}%`} /> : null}
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.84rem', color: '#64748b' }}>
                {copy.sectionF.baseClass}: {currency.format(estimate.base)} · {copy.sectionF.severityMultiplier}: {estimate.severityMultiplier.toFixed(2)}
              </div>
              {showAiExplanation ? (
                <div className="fnol-explain" style={{ marginTop: '0.7rem' }}>
                  <details>
                    <summary style={{ cursor: 'pointer', color: '#0f172a', fontWeight: 600 }}>{copy.sectionF.explanationTitle}</summary>
                    <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1rem', color: '#475569', fontSize: '0.86rem' }}>
                      <li>{copy.sectionF.explanation1}</li>
                      <li>{copy.sectionF.explanation2}</li>
                      <li>{copy.sectionF.explanation3}</li>
                    </ul>
                  </details>
                </div>
              ) : null}
            </Card>
          ) : null}
        </div>
      </Card>

      <Card title={copy.sectionI.title} subtitle={copy.sectionI.subtitle}>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Button
            size="sm"
            onClick={() => {
              setEstimateApproved(true)
              setActionMessage(copy.sectionI.approvedMessage)
            }}
            disabled={!estimate || estimateApproved || isScanBusy}
          >
            {copy.sectionI.approve}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => window.print()} disabled={isScanBusy}>
            {copy.sectionI.export}
          </Button>
          <button
            type="button"
            onClick={() => setActionMessage(copy.sectionI.sentMessage)}
            disabled={!estimate || isScanBusy}
            style={{
              border: 'none',
              background: 'transparent',
              color: estimate && !isScanBusy ? '#0f172a' : '#94a3b8',
              fontSize: '0.84rem',
              textDecoration: 'underline',
              cursor: estimate && !isScanBusy ? 'pointer' : 'not-allowed',
              padding: '0 0.3rem'
            }}
          >
            {copy.sectionI.sendPartner}
          </button>
        </div>
        {actionMessage ? (
          <div style={{ marginTop: '0.7rem', color: '#166534', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '0.6rem 0.8rem' }}>
            {actionMessage}
          </div>
        ) : null}
        {estimateApproved ? (
          <div style={{ marginTop: '0.6rem', fontSize: '0.84rem', color: '#64748b' }}>
            {copy.sectionI.lockedInfo}
          </div>
        ) : null}
      </Card>

      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
        {copy.notice}
      </div>
    </ClaimsfoxLayout>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label style={fieldLabelStyle}>
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} style={fieldInputStyle} />
    </label>
  )
}

function EstimateTile({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div style={{ border: '1px solid #dbe2ea', borderRadius: 10, padding: '0.6rem' }}>
      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{label}</div>
      <div style={{ fontSize: emphasize ? '1.05rem' : '0.95rem', fontWeight: emphasize ? 700 : 600, color: '#0f172a' }}>{value}</div>
    </div>
  )
}

const fieldLabelStyle: CSSProperties = {
  display: 'grid',
  gap: '0.32rem',
  fontSize: '0.84rem',
  color: '#64748b'
}

const fieldInputStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.5rem 0.6rem',
  color: '#0f172a'
}

const infoBoxStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  display: 'grid',
  gap: '0.35rem',
  fontSize: '0.88rem',
  color: '#334155'
}
