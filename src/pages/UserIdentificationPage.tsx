import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type VerificationStatus = 'idle' | 'success' | 'failed'
type CaptureTarget = 'front' | 'back' | 'selfie' | null

const steps = [
  'identification.steps.start',
  'identification.steps.capture',
  'identification.steps.verification',
  'identification.steps.selfie',
  'identification.steps.summary'
]

export default function UserIdentificationPage() {
  const { t } = useI18n()
  const [activeStep, setActiveStep] = useState(0)
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [frontImage, setFrontImage] = useState<string | null>(null)
  const [backImage, setBackImage] = useState<string | null>(null)
  const [selfieImage, setSelfieImage] = useState<string | null>(null)
  const [captureTarget, setCaptureTarget] = useState<CaptureTarget>(null)
  const [cameraError, setCameraError] = useState('')
  const [ocrData, setOcrData] = useState<Record<string, string> | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle')
  const [auditId] = useState(() => `ID-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const progress = Math.round((activeStep / (steps.length - 1)) * 100)
  const isDocComplete = Boolean(frontImage || frontFile) && Boolean(backImage || backFile)
  const isSelfieComplete = Boolean(selfieImage || selfieFile)

  const overallStatus = useMemo(() => {
    if (verificationStatus === 'failed') return 'failed'
    if (verificationStatus === 'success' && isSelfieComplete) return 'success'
    return 'idle'
  }, [verificationStatus, isSelfieComplete])

  function handleNext() {
    setActiveStep((step) => Math.min(step + 1, steps.length - 1))
  }

  function handleBack() {
    setActiveStep((step) => Math.max(step - 1, 0))
  }

  function handleVerify() {
    if (isDocComplete) {
      setVerificationStatus('success')
    } else {
      setVerificationStatus('failed')
    }
  }

  async function startCamera(target: CaptureTarget) {
    setCameraError('')
    setCaptureTarget(target)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: target === 'selfie' ? 'user' : 'environment' },
        audio: false
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      setCameraError(t('identification.camera.error'))
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setCaptureTarget(null)
  }

  function captureFrame() {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
    if (captureTarget === 'front') {
      setFrontImage(dataUrl)
      setOcrData({
        docNumber: '11995594',
        name: 'RALF MITTERBAUER',
        dob: '17.04.1970',
        expiry: '25.09.2029',
        nationality: 'Österreich'
      })
    }
    if (captureTarget === 'back') {
      setBackImage(dataUrl)
    }
    if (captureTarget === 'selfie') {
      setSelfieImage(dataUrl)
    }
    stopCamera()
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <section className="page" style={{ gap: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Header title={t('identification.title')} subtitle={t('identification.subtitle')} subtitleColor="#65748b" />

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <strong style={{ color: '#0f172a' }}>{t('identification.progress')}</strong>
              <span style={{ color: '#64748b' }}>{t(steps[activeStep])}</span>
            </div>
            <div style={{ minWidth: 180, textAlign: 'right', color: '#64748b', fontWeight: 600 }}>{progress}%</div>
          </div>
          <div style={{ height: 8, background: '#e2e8f0', borderRadius: 999, marginTop: '0.75rem', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#d4380d' }} />
          </div>
        </Card>

        {activeStep === 0 && (
          <Card>
            <h2>{t('identification.intro.title')}</h2>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>{t('identification.intro.body')}</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Button onClick={handleNext}>{t('identification.actions.start')}</Button>
            </div>
          </Card>
        )}

        {activeStep === 1 && (
          <Card>
            <h2>{t('identification.capture.title')}</h2>
            <p style={{ color: '#475569' }}>{t('identification.capture.subtitle')}</p>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <div className="id-preview-card">
                <span>{t('identification.capture.front')}</span>
                {frontImage ? <img src={frontImage} alt="" /> : <div className="id-placeholder">{t('identification.capture.placeholder')}</div>}
                <div className="id-actions">
                  <Button variant="secondary" onClick={() => startCamera('front')}>
                    {t('identification.camera.capture')}
                  </Button>
                </div>
              </div>
              <div className="id-preview-card">
                <span>{t('identification.capture.back')}</span>
                {backImage ? <img src={backImage} alt="" /> : <div className="id-placeholder">{t('identification.capture.placeholder')}</div>}
                <div className="id-actions">
                  <Button variant="secondary" onClick={() => startCamera('back')}>
                    {t('identification.camera.capture')}
                  </Button>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label className="form-field">
                {t('identification.capture.front')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setFrontFile(event.target.files?.[0] ?? null)}
                />
                {frontFile && <span style={{ color: '#64748b' }}>{frontFile.name}</span>}
              </label>
              <label className="form-field">
                {t('identification.capture.back')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setBackFile(event.target.files?.[0] ?? null)}
                />
                {backFile && <span style={{ color: '#64748b' }}>{backFile.name}</span>}
              </label>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={handleBack}>
                {t('identification.actions.back')}
              </Button>
              <Button onClick={handleNext} disabled={!isDocComplete}>
                {t('identification.actions.next')}
              </Button>
            </div>
          </Card>
        )}

        {activeStep === 2 && (
          <Card>
            <h2>{t('identification.verify.title')}</h2>
            <p style={{ color: '#475569' }}>{t('identification.verify.subtitle')}</p>
            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('identification.verify.issuing')}</span>
                <strong>{ocrData?.nationality ?? '—'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('identification.verify.authenticity')}</span>
                <strong>{verificationStatus === 'success' ? t('identification.status.ok') : t('identification.status.pending')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('identification.verify.mrz')}</span>
                <strong>{verificationStatus === 'success' ? t('identification.status.ok') : t('identification.status.pending')}</strong>
              </div>
            </div>
            {ocrData && (
              <div className="ocr-card">
                <strong>{t('identification.ocr.title')}</strong>
                <div>
                  <span>{t('identification.ocr.name')}</span>
                  <strong>{ocrData.name}</strong>
                </div>
                <div>
                  <span>{t('identification.ocr.number')}</span>
                  <strong>{ocrData.docNumber}</strong>
                </div>
                <div>
                  <span>{t('identification.ocr.dob')}</span>
                  <strong>{ocrData.dob}</strong>
                </div>
                <div>
                  <span>{t('identification.ocr.expiry')}</span>
                  <strong>{ocrData.expiry}</strong>
                </div>
                <div>
                  <span>{t('identification.ocr.nationality')}</span>
                  <strong>{ocrData.nationality}</strong>
                </div>
              </div>
            )}
            {verificationStatus === 'failed' && (
              <p style={{ color: '#b42318', fontWeight: 600 }}>{t('identification.verify.failed')}</p>
            )}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={handleBack}>
                {t('identification.actions.back')}
              </Button>
              <Button onClick={handleVerify}>{t('identification.actions.verify')}</Button>
              <Button onClick={handleNext} disabled={verificationStatus !== 'success'}>
                {t('identification.actions.next')}
              </Button>
            </div>
          </Card>
        )}

        {activeStep === 3 && (
          <Card>
            <h2>{t('identification.selfie.title')}</h2>
            <p style={{ color: '#475569' }}>{t('identification.selfie.subtitle')}</p>
            <div className="selfie-frame">
              {selfieImage ? <img src={selfieImage} alt="" /> : <div className="selfie-placeholder" />}
              <div className="selfie-overlay">{t('identification.selfie.overlay')}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={() => startCamera('selfie')}>
                {t('identification.camera.capture')}
              </Button>
            </div>
            <label className="form-field">
              {t('identification.selfie.capture')}
              <input type="file" accept="image/*" onChange={(event) => setSelfieFile(event.target.files?.[0] ?? null)} />
              {selfieFile && <span style={{ color: '#64748b' }}>{selfieFile.name}</span>}
            </label>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={handleBack}>
                {t('identification.actions.back')}
              </Button>
              <Button onClick={handleNext} disabled={!isSelfieComplete}>
                {t('identification.actions.next')}
              </Button>
            </div>
          </Card>
        )}

        {activeStep === 4 && (
          <Card>
            <h2>{t('identification.summary.title')}</h2>
            <p style={{ color: '#475569' }}>{t('identification.summary.subtitle')}</p>
            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('identification.summary.status')}</span>
                <strong style={{ color: overallStatus === 'success' ? '#15803d' : '#b42318' }}>
                  {overallStatus === 'success' ? t('identification.status.success') : t('identification.status.failed')}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('identification.summary.docType')}</span>
                <strong>{t('identification.document.typePassport')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('identification.summary.country')}</span>
                <strong>{ocrData?.nationality ?? '—'}</strong>
              </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('identification.summary.audit')}</span>
              <strong>{auditId}</strong>
            </div>
            {ocrData && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('identification.summary.ocr')}</span>
                <strong>{t('identification.status.ok')}</strong>
              </div>
            )}
            </div>
            <p style={{ marginTop: '1rem', color: '#475569' }}>{t('identification.summary.notice')}</p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={() => setActiveStep(0)}>
                {t('identification.actions.restart')}
              </Button>
            </div>
          </Card>
        )}

        {captureTarget && (
          <div className="modal-backdrop" onClick={stopCamera}>
            <div className="modal-card id-camera-modal" onClick={(event) => event.stopPropagation()}>
              <div className="id-camera-header">
                <strong>{t(`identification.camera.title.${captureTarget}`)}</strong>
                <Button variant="secondary" onClick={stopCamera}>
                  {t('identification.actions.back')}
                </Button>
              </div>
              {cameraError ? (
                <p style={{ color: '#b42318' }}>{cameraError}</p>
              ) : (
                <div className="id-camera-view">
                  <video ref={videoRef} autoPlay playsInline />
                  {captureTarget !== 'selfie' && (
                    <div className="id-camera-overlay">
                      <div className="id-camera-frame" />
                      <div className="id-camera-slot">{t('identification.camera.slot')}</div>
                      <div className="id-camera-line" />
                      <p>{t('identification.camera.guide')}</p>
                    </div>
                  )}
                  {captureTarget === 'selfie' && (
                    <div className="selfie-overlay-layer">
                      <div className="selfie-cutout" />
                      <p>{t('identification.selfie.overlay')}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="id-camera-actions">
                <Button onClick={captureFrame}>{t('identification.camera.take')}</Button>
              </div>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
