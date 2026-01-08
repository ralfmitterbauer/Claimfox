import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type FieldType = 'text' | 'email' | 'password' | 'tel' | 'boolean' | 'select'

type FieldDefinition = {
  key: string
  labelKey: string
  required: boolean
  type: FieldType
  group: 'personal' | 'company'
  options?: Array<{ value: string; labelKey: string }>
}

const PERSONAL_FIELDS: FieldDefinition[] = [
  { key: 'contact.salutation', labelKey: 'profile.fields.salutation', required: false, type: 'text', group: 'personal' },
  { key: 'contact.first_name', labelKey: 'profile.fields.contactFirstName', required: true, type: 'text', group: 'personal' },
  { key: 'contact.last_name', labelKey: 'profile.fields.contactLastName', required: true, type: 'text', group: 'personal' },
  { key: 'contact.phone_country_code', labelKey: 'profile.fields.phoneCountryCode', required: true, type: 'text', group: 'personal' },
  { key: 'contact.phone', labelKey: 'profile.fields.phone', required: true, type: 'tel', group: 'personal' },
  {
    key: 'account.language',
    labelKey: 'profile.fields.language',
    required: true,
    type: 'select',
    group: 'personal',
    options: [
      { value: 'de', labelKey: 'profile.options.language.de' },
      { value: 'en', labelKey: 'profile.options.language.en' }
    ]
  },
  { key: 'account.password', labelKey: 'profile.fields.password', required: true, type: 'password', group: 'personal' },
  { key: 'account.password_confirm', labelKey: 'profile.fields.passwordConfirm', required: true, type: 'password', group: 'personal' },
  { key: 'account.advisor_code', labelKey: 'profile.fields.advisorCode', required: false, type: 'text', group: 'personal' },
  { key: 'company.director.first_name', labelKey: 'profile.fields.directorFirstName', required: true, type: 'text', group: 'personal' },
  { key: 'company.director.last_name', labelKey: 'profile.fields.directorLastName', required: true, type: 'text', group: 'personal' },
  { key: 'kyc.has_branch_in_sanctioned_region', labelKey: 'profile.fields.kycBranch', required: true, type: 'boolean', group: 'personal' },
  { key: 'kyc.director_from_sanctioned_region', labelKey: 'profile.fields.kycDirector', required: true, type: 'boolean', group: 'personal' },
  { key: 'kyc.has_business_with_sanctioned_region', labelKey: 'profile.fields.kycBusiness', required: true, type: 'boolean', group: 'personal' }
]

const COMPANY_FIELDS: FieldDefinition[] = [
  { key: 'company.name', labelKey: 'profile.fields.companyName', required: true, type: 'text', group: 'company' },
  { key: 'company.legal_form', labelKey: 'profile.fields.legalForm', required: true, type: 'text', group: 'company' },
  { key: 'company.address.street', labelKey: 'profile.fields.street', required: true, type: 'text', group: 'company' },
  { key: 'company.address.house_number', labelKey: 'profile.fields.houseNumber', required: true, type: 'text', group: 'company' },
  { key: 'company.address.additional', labelKey: 'profile.fields.addressAdditional', required: false, type: 'text', group: 'company' },
  { key: 'company.address.zip', labelKey: 'profile.fields.zip', required: true, type: 'text', group: 'company' },
  { key: 'company.address.city', labelKey: 'profile.fields.city', required: true, type: 'text', group: 'company' },
  { key: 'company.address.country', labelKey: 'profile.fields.country', required: true, type: 'text', group: 'company' },
  { key: 'company.vat_id', labelKey: 'profile.fields.vatId', required: false, type: 'text', group: 'company' }
]

const STORAGE_KEY = 'cf_profile_wizard'

function IllustrationPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          position: 'relative',
          minHeight: '320px',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #ffffff 100%)',
          overflow: 'hidden',
          padding: '1.5rem'
        }}
      >
        <div style={{ position: 'absolute', top: '8%', right: '6%', width: '12px', height: '12px', borderRadius: '50%', background: '#D4380D' }} />
        <div style={{ position: 'absolute', top: '12%', left: '10%', width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8' }} />
        <div style={{ position: 'absolute', bottom: '16%', right: '14%', width: '18px', height: '18px', borderRadius: '50%', background: '#e2e8f0' }} />
        <IllustrationScene variant="A" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem' }}>
        {(['B', 'C', 'D'] as const).map((variant) => (
          <div
            key={variant}
            style={{
              borderRadius: '18px',
              border: '1px solid #e2e8f0',
              padding: '0.75rem',
              background: '#ffffff',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IllustrationScene variant={variant} />
          </div>
        ))}
      </div>
    </div>
  )
}

type IllustrationVariant = 'A' | 'B' | 'C' | 'D'

function IllustrationScene({ variant }: { variant: IllustrationVariant }) {
  const stroke = '#cbd5e1'
  const accent = '#D4380D'
  const dark = '#1f2a5f'

  if (variant === 'B') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 220 120" fill="none">
        <path d="M10 95h200" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="50" cy="68" r="18" stroke={stroke} strokeWidth="1.4" />
        <circle cx="150" cy="68" r="18" stroke={stroke} strokeWidth="1.4" />
        <path d="M38 68h24M138 68h24" stroke={stroke} strokeWidth="1.4" />
        <path d="M72 40h78l18 20H54l18-20Z" stroke={stroke} strokeWidth="1.4" />
        <path d="M60 60h100v32a8 8 0 0 1-8 8H68a8 8 0 0 1-8-8V60Z" stroke={stroke} strokeWidth="1.4" />
        <path d="M100 78h38" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 28c12-10 30-10 42 0" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M160 32c10-8 26-8 36 0" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }

  if (variant === 'C') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 220 120" fill="none">
        <path d="M14 92c30-18 60-26 94-26 40 0 74 12 98 34" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <rect x="20" y="30" width="48" height="32" rx="8" stroke={stroke} strokeWidth="1.4" />
        <rect x="86" y="20" width="60" height="42" rx="10" stroke={stroke} strokeWidth="1.4" />
        <rect x="162" y="34" width="40" height="28" rx="8" stroke={stroke} strokeWidth="1.4" />
        <path d="M30 46h26M96 38h34M96 52h24" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="178" cy="80" r="10" stroke={dark} strokeWidth="1.6" />
        <path d="M178 76v8M174 80h8" stroke={dark} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  if (variant === 'D') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 220 120" fill="none">
        <path d="M12 86h196" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M36 86V40l24-14 24 14v46" stroke={stroke} strokeWidth="1.4" />
        <path d="M120 86V34l30-18 30 18v52" stroke={stroke} strokeWidth="1.4" />
        <path d="M48 58h24M132 54h26" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 30c12-10 30-10 42 0" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M150 24c12-10 30-10 42 0" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg width="100%" height="100%" viewBox="0 0 320 260" fill="none">
      <path d="M30 210h260" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M60 210V120l36-20 38 20v90" stroke={stroke} strokeWidth="1.6" />
      <path d="M160 210V110l46-26 46 26v100" stroke={stroke} strokeWidth="1.6" />
      <path d="M80 146h36M180 136h40" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M96 176h22M196 174h24" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M40 86c16-12 40-12 56 0" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M210 70c16-12 40-12 56 0" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M130 54c12-10 28-10 40 0" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="258" cy="170" r="14" stroke={dark} strokeWidth="1.8" />
      <path d="M258 164v12M252 170h12" stroke={dark} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function ProfileOnboardingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const storedEmail = typeof window !== 'undefined' ? window.localStorage.getItem('registrationEmail') ?? '' : ''
  const storedConsent =
    typeof window !== 'undefined' ? window.localStorage.getItem('registrationPrivacyConsent') === 'true' : false

  const [stepIndex, setStepIndex] = useState(() => {
    if (typeof window === 'undefined') return 0
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as { step?: number }) : undefined
    return parsed?.step ?? 0
  })

  const [formData, setFormData] = useState<Record<string, string | boolean>>(() => {
    if (typeof window === 'undefined') return {}
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as { data?: Record<string, string | boolean> }) : undefined
    return parsed?.data ?? {}
  })

  const [saved, setSaved] = useState(false)

  const steps = useMemo(() => [...PERSONAL_FIELDS, ...COMPANY_FIELDS], [])
  const totalSteps = steps.length
  const activeField = steps[stepIndex]

  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100)

  function isFieldComplete(field: FieldDefinition) {
    const value = formData[field.key]
    if (field.type === 'boolean') {
      return value === true || value === false
    }
    return typeof value === 'string' && value.trim().length > 0
  }

  function persist(nextStep: number, nextData: Record<string, string | boolean>, completed = false) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: nextStep, data: nextData, completed }))
    }
  }

  function handleChange(fieldKey: string, value: string | boolean) {
    const next = { ...formData, [fieldKey]: value }
    setFormData(next)
    persist(stepIndex, next, false)
  }

  function handleSave() {
    persist(stepIndex, formData, false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleSkip() {
    if (stepIndex === totalSteps - 1) {
      persist(stepIndex, formData, true)
      navigate('/profile')
      return
    }
    const nextStep = stepIndex + 1
    setStepIndex(nextStep)
    persist(nextStep, formData, false)
  }

  function handleNext() {
    if (stepIndex === totalSteps - 1) {
      persist(stepIndex, formData, true)
      navigate('/profile')
      return
    }
    const nextStep = stepIndex + 1
    setStepIndex(nextStep)
    persist(nextStep, formData, false)
  }

  function handleLater() {
    persist(stepIndex, formData, false)
    navigate('/profile')
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('profile.onboarding.title')} subtitle={t('profile.onboarding.subtitle')} subtitleColor="#65748b" />

        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <strong style={{ color: '#0f172a' }}>{t('profile.progress.title')}</strong>
              <span style={{ color: '#64748b', fontWeight: 600 }}>{progressPercent}%</span>
            </div>
            <div style={{ height: 10, background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, background: '#D4380D' }} />
            </div>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              {t('profile.progress.caption', { percent: progressPercent })}
            </span>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 360px)', gap: '1.5rem' }}>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.85rem',
                    borderRadius: '999px',
                    background: activeField.group === 'personal' ? '#fde8df' : '#e0ecff',
                    color: '#1f2a5f',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {activeField.group === 'personal' ? t('profile.steps.personal.title') : t('profile.steps.company.title')}
                </span>
                <h2 style={{ margin: '0.6rem 0 0' }}>{t(activeField.labelKey)}</h2>
                <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>
                  {t('profile.stepLabel', { current: stepIndex + 1, total: totalSteps })}
                </p>
              </div>

              {activeField.type === 'boolean' ? (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => handleChange(activeField.key, true)}
                    style={{
                      borderRadius: '999px',
                      padding: '0.55rem 1.2rem',
                      border: '1px solid #d9d9d9',
                      background: formData[activeField.key] === true ? '#fde8df' : '#ffffff',
                      color: '#0f172a',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {t('profile.options.yes')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange(activeField.key, false)}
                    style={{
                      borderRadius: '999px',
                      padding: '0.55rem 1.2rem',
                      border: '1px solid #d9d9d9',
                      background: formData[activeField.key] === false ? '#fde8df' : '#ffffff',
                      color: '#0f172a',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {t('profile.options.no')}
                  </button>
                </div>
              ) : activeField.type === 'select' ? (
                <select
                  className="text-input"
                  value={typeof formData[activeField.key] === 'string' ? (formData[activeField.key] as string) : ''}
                  onChange={(event) => handleChange(activeField.key, event.target.value)}
                >
                  <option value="">{t('profile.options.select')}</option>
                  {activeField.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="text-input"
                  type={activeField.type}
                  value={typeof formData[activeField.key] === 'string' ? (formData[activeField.key] as string) : ''}
                  onChange={(event) => handleChange(activeField.key, event.target.value)}
                />
              )}

              {activeField.required && (
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{t('profile.onboarding.requiredHint')}</span>
              )}

              {activeField.key === 'account.password_confirm' &&
                formData['account.password'] &&
                formData['account.password_confirm'] &&
                formData['account.password'] !== formData['account.password_confirm'] && (
                  <p style={{ margin: 0, color: '#B42318', fontWeight: 600 }}>{t('profile.passwordMismatch')}</p>
                )}

              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Button variant="secondary" onClick={handleLater}>
                    {t('profile.actions.later')}
                  </Button>
                  <Button variant="secondary" onClick={handleSkip}>
                    {t('profile.actions.skip')}
                  </Button>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <Button variant="secondary" onClick={handleSave}>
                    {t('profile.actions.save')}
                  </Button>
                  {saved && <span style={{ alignSelf: 'center', color: '#15803d', fontWeight: 600 }}>{t('profile.saved')}</span>}
                  <Button
                    onClick={handleNext}
                    disabled={activeField.required ? !isFieldComplete(activeField) : false}
                  >
                    {stepIndex === totalSteps - 1 ? t('profile.actions.finish') : t('profile.actions.next')}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <IllustrationPanel />
        </div>

        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ color: '#0f172a' }}>{t('profile.registration.title')}</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: '1 1 260px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                  {t('profile.fields.email')}
                </label>
                <input
                  type="email"
                  value={storedEmail}
                  readOnly
                  className="text-input"
                  style={{ background: '#f8fafc' }}
                />
                <p style={{ margin: '0.4rem 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>{t('profile.registration.emailHint')}</p>
              </div>
              <div style={{ flex: '1 1 260px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                  {t('profile.fields.privacyConsent')}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={storedConsent} readOnly />
                  <span style={{ color: '#475569' }}>{t('profile.registration.consentHint')}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
