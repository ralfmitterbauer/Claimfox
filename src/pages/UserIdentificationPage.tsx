import React, { useMemo, useState } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type VerificationStatus = 'idle' | 'success' | 'failed'

const steps = [
  'identification.steps.start',
  'identification.steps.documents',
  'identification.steps.capture',
  'identification.steps.verification',
  'identification.steps.selfie',
  'identification.steps.summary'
]

export default function UserIdentificationPage() {
  const { t } = useI18n()
  const [activeStep, setActiveStep] = useState(0)
  const [docType, setDocType] = useState('')
  const [issuingCountry, setIssuingCountry] = useState('')
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle')
  const [auditId] = useState(() => `ID-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)

  const progress = Math.round(((activeStep + 1) / steps.length) * 100)
  const isDocComplete = docType && issuingCountry && frontFile && backFile
  const isSelfieComplete = Boolean(selfieFile)

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
            <h2>{t('identification.document.title')}</h2>
            <p style={{ color: '#475569' }}>{t('identification.document.subtitle')}</p>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label className="form-field">
                {t('identification.document.type')}
                <select className="text-input" value={docType} onChange={(event) => setDocType(event.target.value)}>
                  <option value="">{t('identification.document.typePlaceholder')}</option>
                  <option value="id">{t('identification.document.typeId')}</option>
                  <option value="passport">{t('identification.document.typePassport')}</option>
                  <option value="other">{t('identification.document.typeOther')}</option>
                </select>
              </label>
              <label className="form-field">
                {t('identification.document.country')}
                <input
                  className="text-input"
                  value={issuingCountry}
                  placeholder={t('identification.document.countryPlaceholder')}
                  onChange={(event) => setIssuingCountry(event.target.value)}
                />
              </label>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={handleBack}>
                {t('identification.actions.back')}
              </Button>
              <Button onClick={handleNext} disabled={!docType || !issuingCountry}>
                {t('identification.actions.next')}
              </Button>
            </div>
          </Card>
        )}

        {activeStep === 2 && (
          <Card>
            <h2>{t('identification.capture.title')}</h2>
            <p style={{ color: '#475569' }}>{t('identification.capture.subtitle')}</p>
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

        {activeStep === 3 && (
          <Card>
            <h2>{t('identification.verify.title')}</h2>
            <p style={{ color: '#475569' }}>{t('identification.verify.subtitle')}</p>
            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('identification.verify.issuing')}</span>
                <strong>{issuingCountry || '—'}</strong>
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

        {activeStep === 4 && (
          <Card>
            <h2>{t('identification.selfie.title')}</h2>
            <p style={{ color: '#475569' }}>{t('identification.selfie.subtitle')}</p>
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

        {activeStep === 5 && (
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
                <strong>{docType || '—'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('identification.summary.country')}</span>
                <strong>{issuingCountry || '—'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('identification.summary.audit')}</span>
                <strong>{auditId}</strong>
              </div>
            </div>
            <p style={{ marginTop: '1rem', color: '#475569' }}>{t('identification.summary.notice')}</p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={() => setActiveStep(0)}>
                {t('identification.actions.restart')}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
