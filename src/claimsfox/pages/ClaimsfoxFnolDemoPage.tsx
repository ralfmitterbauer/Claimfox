import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import AnimatedNumber from '@/claimsfox/components/AnimatedNumber'
import ScanHud from '@/claimsfox/components/ScanHud'
import ScanOverlay from '@/claimsfox/components/ScanOverlay'
import './ClaimsfoxFnolDemoPage.css'

type LocationState = {
  lat: number
  lon: number
} | null

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
  licensePlate: 'HH-FX 4821',
  vin: 'WDB9634061L123456',
  manufacturer: 'Mercedes-Benz',
  model: 'Actros 1845',
  mileage: '184.230 km',
  vehicleClass: 'heavy'
}

const SUPPORTED_MIME = new Set(['image/jpeg', 'image/png'])
const SCAN_STAGE_SEQUENCE: Array<{ key: ScanStageKey; ms: number; log: string }> = [
  { key: 'normalize', ms: 900, log: 'Stabilizing frame geometry and exposure curves...' },
  { key: 'detectVehicle', ms: 1000, log: 'Evaluating fleet object signatures and confidence vectors...' },
  { key: 'localizeDamage', ms: 1000, log: 'Isolating impacted region contours and reference masks...' },
  { key: 'score', ms: 1100, log: 'Running edge-density and luminance variance scoring...' },
  { key: 'estimate', ms: 1100, log: 'Building deterministic parts/labor/paint breakdown...' },
  { key: 'fraud', ms: 1100, log: 'Checking pattern anomalies against synthetic fraud heuristics...' }
]

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
  const partsCost = base * severityMultiplier
  const laborCost = partsCost * 0.6
  const paintCost = partsCost * 0.3
  const total = partsCost + laborCost + paintCost
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
  const [now, setNow] = useState<Date>(() => new Date())
  const [location, setLocation] = useState<LocationState>(null)
  const [locationStatus, setLocationStatus] = useState<'loading' | 'ready' | 'denied'>('loading')
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
  const [scanLogLine, setScanLogLine] = useState('Ready for deterministic scan.')
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
    () => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
    []
  )

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('denied')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
        setLocationStatus('ready')
      },
      () => {
        setLocationStatus('denied')
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    )
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
    recognition.lang = 'de-DE'

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
      setVoiceError(`Voice capture unavailable: ${event.error}`)
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
  }, [])

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

  function toNormalizedPoint(clientX: number, clientY: number) {
    const canvas = mainCanvasRef.current
    const transform = previewTransformsRef.current
    if (!canvas || !transform) return null
    const bounds = canvas.getBoundingClientRect()
    const x = clientX - bounds.left
    const y = clientY - bounds.top
    if (x < transform.x || y < transform.y || x > transform.x + transform.width || y > transform.y + transform.height) {
      return null
    }
    return {
      x: clamp((x - transform.x) / transform.width, 0, 1),
      y: clamp((y - transform.y) / transform.height, 0, 1)
    }
  }

  function startDrawing(clientX: number, clientY: number) {
    const point = toNormalizedPoint(clientX, clientY)
    if (!point) return
    dragStartRef.current = point
    setDrawRect({ x: point.x, y: point.y, width: 0, height: 0 })
  }

  function moveDrawing(clientX: number, clientY: number) {
    if (!dragStartRef.current) return
    const point = toNormalizedPoint(clientX, clientY)
    if (!point) return
    const x = Math.min(dragStartRef.current.x, point.x)
    const y = Math.min(dragStartRef.current.y, point.y)
    const width = Math.abs(dragStartRef.current.x - point.x)
    const height = Math.abs(dragStartRef.current.y - point.y)
    setDrawRect({ x, y, width, height })
  }

  function endDrawing() {
    if (drawRect && drawRect.width > 0.01 && drawRect.height > 0.01) {
      setSelection(drawRect)
    }
    setDrawRect(null)
    dragStartRef.current = null
  }

  function resetScanResultState() {
    setScanStage('idle')
    setScanStageKey(null)
    setScanStageIndex(-1)
    setScanCompletedStages([])
    setScanLogLine('Ready for deterministic scan.')
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
    setScanLogLine('Scan canceled. Ready for re-run.')
    setActionMessage('AI scan canceled by user.')
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
      setScanLogLine('Initializing cinematic scan sequence...')
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
      for (let idx = 0; idx < SCAN_STAGE_SEQUENCE.length; idx += 1) {
        const stage = SCAN_STAGE_SEQUENCE[idx]
        setScanStageIndex(idx)
        setScanStageKey(stage.key)
        setScanLogLine(stage.log)
        if (!(await waitWithToken(token, stage.ms))) return
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
      setScanLogLine('Pipeline completed. Deterministic estimate ready.')
      if (!aiAvailable) {
        setActionMessage('AI model packages not available in this runtime. Demo fallback detection was used.')
      }
    } catch {
      setScanStage('error')
      setScanStageKey(null)
      setScanStageIndex(-1)
      setScanLogLine('Pipeline aborted. Browser runtime raised an error.')
      setActionMessage('AI scan could not be completed in this browser context.')
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
  const isScanBusy = scanStage === 'loading' || scanStage === 'scanning' || scanStage === 'analyzing'

  return (
    <ClaimsfoxLayout
      title="FNOL Live Demo"
      subtitle="First Notice of Loss · Browser-native capture and deterministic AI estimate"
      topLeft={(
        <div style={{ display: 'grid', gap: '0.35rem', color: '#ffffff', fontSize: '0.84rem' }}>
          <span>Incident captured at {now.toLocaleString()}</span>
          <span>
            Location: {locationStatus === 'ready' && location
              ? `${location.lat.toFixed(5)}, ${location.lon.toFixed(5)}`
              : locationStatus === 'loading'
                ? 'Locating...'
                : 'Location unavailable'}
          </span>
        </div>
      )}
    >
      <Card title="A · Auto Context" subtitle="Real-time incident context captured directly in browser">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          <div style={infoBoxStyle}><strong>Timestamp</strong><span>{now.toLocaleString()}</span></div>
          <div style={infoBoxStyle}>
            <strong>Geolocation</strong>
            <span>
              {locationStatus === 'ready' && location
                ? `${location.lat.toFixed(5)}, ${location.lon.toFixed(5)}`
                : locationStatus === 'loading'
                  ? 'Locating...'
                  : 'Location unavailable'}
            </span>
          </div>
          <div style={infoBoxStyle}><strong>Browser</strong><span>{deviceInfo.browser}</span></div>
          <div style={infoBoxStyle}><strong>Screen</strong><span>{deviceInfo.screen}</span></div>
        </div>
      </Card>

      <Card title="B · Voice-to-Text Incident Description" subtitle="Web Speech API capture with live transcript">
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {voiceSupported ? (
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Button size="sm" onClick={toggleVoiceCapture}>
                {voiceActive ? 'Stop Voice Capture' : 'Start Voice Capture'}
              </Button>
              <span style={{ fontSize: '0.85rem', color: '#64748b', alignSelf: 'center' }}>
                {voiceActive ? 'Listening...' : 'Microphone idle'}
              </span>
            </div>
          ) : (
            <div style={{ color: '#b91c1c', fontSize: '0.9rem' }}>
              Voice capture is not supported in this browser.
            </div>
          )}
          {voiceError ? <div style={{ color: '#b91c1c', fontSize: '0.9rem' }}>{voiceError}</div> : null}
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe incident details (driver statement, impact sequence, third-party involvement...)"
            style={{ minHeight: 110, border: '1px solid #dbe2ea', borderRadius: 12, padding: '0.7rem' }}
          />
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Transcript: {transcript || 'No transcript yet'}
          </div>
        </div>
      </Card>

      <Card title="C · Vehicle Context" subtitle="Realistic fleet profile, editable for demo scenarios">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.7rem' }}>
          <Field label="License plate" value={vehicle.licensePlate} onChange={(value) => setVehicle((prev) => ({ ...prev, licensePlate: value }))} />
          <Field label="VIN" value={vehicle.vin} onChange={(value) => setVehicle((prev) => ({ ...prev, vin: value }))} />
          <Field label="Manufacturer" value={vehicle.manufacturer} onChange={(value) => setVehicle((prev) => ({ ...prev, manufacturer: value }))} />
          <Field label="Model" value={vehicle.model} onChange={(value) => setVehicle((prev) => ({ ...prev, model: value }))} />
          <Field label="Mileage" value={vehicle.mileage} onChange={(value) => setVehicle((prev) => ({ ...prev, mileage: value }))} />
          <label style={fieldLabelStyle}>
            Gross weight class
            <select
              value={vehicle.vehicleClass}
              onChange={(event) => setVehicle((prev) => ({ ...prev, vehicleClass: event.target.value as VehicleClass }))}
              style={fieldInputStyle}
            >
              <option value="passenger">passenger</option>
              <option value="light">light</option>
              <option value="heavy">heavy</option>
            </select>
          </label>
        </div>
      </Card>

      <Card title="D + E · Photo Upload & Damage Region Selector" subtitle="Drop images and draw damage rectangle on preview canvas">
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
            <span style={{ color: '#475569' }}>Drop JPG/PNG files here or use file picker</span>
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
                onMouseDown={(event) => startDrawing(event.clientX, event.clientY)}
                onMouseMove={(event) => moveDrawing(event.clientX, event.clientY)}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
              />
              <ScanOverlay isScanning={isScanBusy} phaseIndex={scanStageIndex} />
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.84rem', color: '#64748b' }}>
              {selection
                ? `Selected region: x=${selection.x.toFixed(2)} y=${selection.y.toFixed(2)} w=${selection.width.toFixed(2)} h=${selection.height.toFixed(2)}`
                : 'No damage region selected. Full image will be analyzed.'}
            </div>
          </div>
          <ScanHud activeStage={scanStageKey} completed={scanCompletedStages} logLine={scanLogLine} />
          <div style={{ display: 'grid', gap: '0.6rem', alignContent: 'start' }}>
            {images.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>No photos uploaded yet.</div>
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

      <Card title="F + G + H · Browser AI Scan, Severity & Estimate" subtitle="COCO-SSD detection + deterministic repair cost model">
        <div style={{ display: 'grid', gap: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button size="sm" onClick={() => void runAiScan()} disabled={!activeImage || estimateApproved || isScanBusy}>
              {isScanBusy ? 'Scanning...' : 'Scan with AI'}
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
                Cancel scan
              </button>
            ) : null}
            {!isScanBusy && scanStage === 'done' ? (
              <Button size="sm" variant="secondary" onClick={resetScanResultState} disabled={!activeImage}>
                Re-Scan
              </Button>
            ) : null}
          </div>
          <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
            {scanStage === 'loading' ? 'Loading AI model...' : null}
            {scanStage === 'scanning' ? 'Scanning image...' : null}
            {scanStage === 'analyzing' ? 'Analyzing damage region...' : null}
            {scanStage === 'done' ? 'Scan completed.' : null}
            {scanStage === 'error' ? 'AI scan failed in this browser session.' : null}
            {scanStage === 'idle' ? 'Ready to run scan.' : null}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
            <Card title="Detected Objects">
              {detections.length === 0 ? <div style={{ color: '#64748b', fontSize: '0.9rem' }}>No objects detected yet.</div> : null}
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                {detections.map((item, idx) => (
                  <div key={`${item.label}-${idx}`} className="fnol-box-pop" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span>{item.label}</span>
                    <strong><AnimatedNumber value={item.confidence} durationMs={760} formatter={(value) => `${Math.round(value)}%`} /></strong>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Damage Severity">
              <div style={{ height: 10, borderRadius: 999, background: '#e2e8f0', overflow: 'hidden' }}>
                <div style={{ width: `${severityScore}%`, height: '100%', background: '#d4380d', transition: 'width 640ms cubic-bezier(0.22, 0.8, 0.3, 1)' }} />
              </div>
              <div style={{ marginTop: '0.45rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <strong>{severityLabel}</strong>
                <span><AnimatedNumber value={severityScore} durationMs={800} />/100</span>
              </div>
            </Card>
          </div>

          {estimate ? (
            <Card title="Indicative AI Estimate (Demo)">
              <div className="fnol-cost-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.7rem' }}>
                {revealedEstimateTiles >= 1 ? <EstimateTile label="Parts" value={currency.format(estimate.partsCost)} /> : null}
                {revealedEstimateTiles >= 2 ? <EstimateTile label="Labor" value={currency.format(estimate.laborCost)} /> : null}
                {revealedEstimateTiles >= 3 ? <EstimateTile label="Paint" value={currency.format(estimate.paintCost)} /> : null}
                {revealedEstimateTiles >= 4 ? <EstimateTile label="Total" value={currency.format(estimate.total)} emphasize /> : null}
                {revealedEstimateTiles >= 5 ? <EstimateTile label="Range" value={`${currency.format(estimate.rangeMin)} - ${currency.format(estimate.rangeMax)}`} /> : null}
                {revealedEstimateTiles >= 6 ? <EstimateTile label="Confidence" value={`${estimate.confidence}%`} /> : null}
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.84rem', color: '#64748b' }}>
                Base class: {currency.format(estimate.base)} · Severity multiplier: {estimate.severityMultiplier.toFixed(2)}
              </div>
              {showAiExplanation ? (
                <div className="fnol-explain" style={{ marginTop: '0.7rem' }}>
                  <details>
                    <summary style={{ cursor: 'pointer', color: '#0f172a', fontWeight: 600 }}>AI Explanation</summary>
                    <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1rem', color: '#475569', fontSize: '0.86rem' }}>
                      <li>Vehicle class baseline and severity multiplier define the deterministic parts estimate.</li>
                      <li>Labor and paint are fixed model factors (60% and 30%) to ensure reproducible outputs.</li>
                      <li>Confidence combines object detection quality with normalized severity metrics from the selected region.</li>
                    </ul>
                  </details>
                </div>
              ) : null}
            </Card>
          ) : null}
        </div>
      </Card>

      <Card title="I · Actions" subtitle="Finalize demo workflow">
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Button
            size="sm"
            onClick={() => {
              setEstimateApproved(true)
              setActionMessage('Estimate approved and locked.')
            }}
            disabled={!estimate || estimateApproved || isScanBusy}
          >
            Approve Estimate
          </Button>
          <Button size="sm" variant="secondary" onClick={() => window.print()} disabled={isScanBusy}>
            Export PDF (Demo)
          </Button>
          <button
            type="button"
            onClick={() => setActionMessage('FNOL package sent to partner network (demo action).')}
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
            Send to Partner (Dummy)
          </button>
        </div>
        {actionMessage ? (
          <div style={{ marginTop: '0.7rem', color: '#166534', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '0.6rem 0.8rem' }}>
            {actionMessage}
          </div>
        ) : null}
        {estimateApproved ? (
          <div style={{ marginTop: '0.6rem', fontSize: '0.84rem', color: '#64748b' }}>
            Estimate is locked after approval in this demo run.
          </div>
        ) : null}
      </Card>

      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
        Demo notice: This FNOL tool is a deterministic browser simulation for product demonstration.
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
