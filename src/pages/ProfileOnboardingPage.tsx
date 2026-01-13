import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import lkwFahrerImage from '@/assets/images/lkw_fahrer.png'
import ffhvImage from '@/assets/images/ffhv.png'

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
  { key: 'account.advisor_code', labelKey: 'profile.fields.advisorCode', required: false, type: 'text', group: 'personal' }
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
  { key: 'company.vat_id', labelKey: 'profile.fields.vatId', required: false, type: 'text', group: 'company' },
  { key: 'company.director.first_name', labelKey: 'profile.fields.directorFirstName', required: true, type: 'text', group: 'company' },
  { key: 'company.director.last_name', labelKey: 'profile.fields.directorLastName', required: true, type: 'text', group: 'company' },
  { key: 'kyc.has_branch_in_sanctioned_region', labelKey: 'profile.fields.kycBranch', required: true, type: 'boolean', group: 'company' },
  { key: 'kyc.director_from_sanctioned_region', labelKey: 'profile.fields.kycDirector', required: true, type: 'boolean', group: 'company' },
  { key: 'kyc.has_business_with_sanctioned_region', labelKey: 'profile.fields.kycBusiness', required: true, type: 'boolean', group: 'company' }
]

const STORAGE_KEY = 'cf_profile_wizard'

function IllustrationPanel({ image, secondaryImage }: { image: string; secondaryImage: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div
        style={{
          borderRadius: '22px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          background: '#ffffff',
          width: '100%',
          flex: 1
        }}
      >
        <img
          src={image}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div
        style={{
          borderRadius: '22px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          background: '#ffffff',
          width: '100%',
          flex: 1
        }}
      >
        <img
          src={secondaryImage}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#ffffff' }}
        />
      </div>
    </div>
  )
}

export default function ProfileOnboardingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

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

  const groups = useMemo(
    () => [
      { key: 'personal', titleKey: 'profile.steps.personal.title', subtitleKey: 'profile.steps.personal.subtitle', fields: PERSONAL_FIELDS },
      { key: 'company', titleKey: 'profile.steps.company.title', subtitleKey: 'profile.steps.company.subtitle', fields: COMPANY_FIELDS }
    ],
    []
  )
  const totalSteps = groups.length
  const activeGroup = groups[stepIndex]
  const stepImages = useMemo(() => [lkwFahrerImage, ffhvImage], [])
  const activeImage = stepImages[stepIndex % stepImages.length]
  const secondaryImage = ffhvImage

  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100)

  function isFieldComplete(field: FieldDefinition) {
    const value = formData[field.key]
    if (field.type === 'boolean') {
      return value === true || value === false
    }
    return typeof value === 'string' && value.trim().length > 0
  }

  function isGroupComplete() {
    const requiredFields = activeGroup.fields.filter((field) => field.required)
    const requiredComplete = requiredFields.every((field) => isFieldComplete(field))
    const passwordMismatch =
      formData['account.password'] &&
      formData['account.password_confirm'] &&
      formData['account.password'] !== formData['account.password_confirm']
    return requiredComplete && !passwordMismatch
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

  function handleLater() {
    persist(stepIndex, formData, false)
    navigate('/profile')
  }

  function handleBack() {
    if (stepIndex === 0) {
      navigate('/profile')
      return
    }
    const nextStep = stepIndex - 1
    setStepIndex(nextStep)
    persist(nextStep, formData, false)
  }

  function handleReset() {
    setStepIndex(0)
    setFormData({})
    persist(0, {}, false)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Header title={t('profile.onboarding.title')} subtitle={t('profile.onboarding.subtitle')} subtitleColor="#65748b" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 340px)',
            gap: '1.25rem',
            alignItems: 'stretch'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#0f172a' }}>{t('profile.progress.title')}</strong>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>{progressPercent}%</span>
                </div>
                <div style={{ height: 8, background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progressPercent}%`, background: '#D4380D' }} />
                </div>
                <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  {t('profile.progress.caption', { percent: progressPercent })}
                </span>
              </div>
            </Card>

            <Card style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.85rem',
                    borderRadius: '999px',
                    background: activeGroup.key === 'personal' ? '#fde8df' : '#e0ecff',
                    color: '#1f2a5f',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {t(activeGroup.titleKey)}
                </span>
                <h2 style={{ margin: '0.6rem 0 0' }}>{t(activeGroup.subtitleKey)}</h2>
                <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>{t('profile.stepLabel', { current: stepIndex + 1, total: totalSteps })}</p>
              </div>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {activeGroup.fields.map((field) => (
                  <label key={field.key} className="form-field" style={{ display: 'grid', gap: '0.4rem' }}>
                    <span>
                      {t(field.labelKey)}
                      {field.required ? ' *' : ''}
                    </span>
                    {field.type === 'boolean' ? (
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handleChange(field.key, true)}
                          style={{
                            borderRadius: '999px',
                            padding: '0.55rem 1.2rem',
                            border: '1px solid #d9d9d9',
                            background: formData[field.key] === true ? '#fde8df' : '#ffffff',
                            color: '#0f172a',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {t('profile.options.yes')}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange(field.key, false)}
                          style={{
                            borderRadius: '999px',
                            padding: '0.55rem 1.2rem',
                            border: '1px solid #d9d9d9',
                            background: formData[field.key] === false ? '#fde8df' : '#ffffff',
                            color: '#0f172a',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {t('profile.options.no')}
                        </button>
                      </div>
                    ) : field.type === 'select' ? (
                      <select
                        className="text-input"
                        value={typeof formData[field.key] === 'string' ? (formData[field.key] as string) : ''}
                        onChange={(event) => handleChange(field.key, event.target.value)}
                      >
                        <option value="">{t('profile.options.select')}</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {t(option.labelKey)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="text-input"
                        type={field.type}
                        value={typeof formData[field.key] === 'string' ? (formData[field.key] as string) : ''}
                        onChange={(event) => handleChange(field.key, event.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>

              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{t('profile.onboarding.requiredHint')}</span>

              {formData['account.password'] &&
                formData['account.password_confirm'] &&
                formData['account.password'] !== formData['account.password_confirm'] && (
                  <p style={{ margin: 0, color: '#B42318', fontWeight: 600 }}>{t('profile.passwordMismatch')}</p>
                )}

              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button variant="secondary" onClick={handleBack} style={{ padding: '0.3rem 0.5rem', fontSize: '0.74rem' }}>
                    {t('profile.actions.back')}
                  </Button>
                  <Button variant="secondary" onClick={handleLater} style={{ padding: '0.3rem 0.5rem', fontSize: '0.74rem' }}>
                    {t('profile.actions.later')}
                  </Button>
                  <Button variant="secondary" onClick={handleSkip} style={{ padding: '0.3rem 0.5rem', fontSize: '0.74rem' }}>
                    {t('profile.actions.skip')}
                  </Button>
                  <Button variant="secondary" onClick={handleSave} style={{ padding: '0.3rem 0.5rem', fontSize: '0.74rem' }}>
                    {t('profile.actions.save')}
                  </Button>
                  <Button variant="secondary" onClick={handleReset} style={{ padding: '0.3rem 0.5rem', fontSize: '0.74rem' }}>
                    {t('profile.overview.reset')}
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!isGroupComplete()}
                    style={{ padding: '0.3rem 0.55rem', fontSize: '0.74rem' }}
                  >
                    {stepIndex === totalSteps - 1 ? t('profile.actions.finish') : t('profile.actions.next')}
                  </Button>
                  {saved && <span style={{ alignSelf: 'center', color: '#15803d', fontWeight: 600 }}>{t('profile.saved')}</span>}
                </div>
              </div>
            </div>
          </Card>
          </div>

          <IllustrationPanel image={activeImage} secondaryImage={secondaryImage} />
        </div>
      </div>
    </section>
  )
}
