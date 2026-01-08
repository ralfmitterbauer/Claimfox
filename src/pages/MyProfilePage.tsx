import React, { useMemo, useState } from 'react'
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
  options?: Array<{ value: string; labelKey: string }>
}

const PERSONAL_FIELDS: FieldDefinition[] = [
  { key: 'contact.salutation', labelKey: 'profile.fields.salutation', required: false, type: 'text' },
  { key: 'contact.first_name', labelKey: 'profile.fields.contactFirstName', required: true, type: 'text' },
  { key: 'contact.last_name', labelKey: 'profile.fields.contactLastName', required: true, type: 'text' },
  { key: 'contact.phone_country_code', labelKey: 'profile.fields.phoneCountryCode', required: true, type: 'text' },
  { key: 'contact.phone', labelKey: 'profile.fields.phone', required: true, type: 'tel' },
  {
    key: 'account.language',
    labelKey: 'profile.fields.language',
    required: true,
    type: 'select',
    options: [
      { value: 'de', labelKey: 'profile.options.language.de' },
      { value: 'en', labelKey: 'profile.options.language.en' }
    ]
  },
  { key: 'account.password', labelKey: 'profile.fields.password', required: true, type: 'password' },
  { key: 'account.password_confirm', labelKey: 'profile.fields.passwordConfirm', required: true, type: 'password' },
  { key: 'account.advisor_code', labelKey: 'profile.fields.advisorCode', required: false, type: 'text' },
  { key: 'company.director.first_name', labelKey: 'profile.fields.directorFirstName', required: true, type: 'text' },
  { key: 'company.director.last_name', labelKey: 'profile.fields.directorLastName', required: true, type: 'text' },
  { key: 'kyc.has_branch_in_sanctioned_region', labelKey: 'profile.fields.kycBranch', required: true, type: 'boolean' },
  { key: 'kyc.director_from_sanctioned_region', labelKey: 'profile.fields.kycDirector', required: true, type: 'boolean' },
  { key: 'kyc.has_business_with_sanctioned_region', labelKey: 'profile.fields.kycBusiness', required: true, type: 'boolean' }
]

const COMPANY_FIELDS: FieldDefinition[] = [
  { key: 'company.name', labelKey: 'profile.fields.companyName', required: true, type: 'text' },
  { key: 'company.legal_form', labelKey: 'profile.fields.legalForm', required: true, type: 'text' },
  { key: 'company.address.street', labelKey: 'profile.fields.street', required: true, type: 'text' },
  { key: 'company.address.house_number', labelKey: 'profile.fields.houseNumber', required: true, type: 'text' },
  { key: 'company.address.additional', labelKey: 'profile.fields.addressAdditional', required: false, type: 'text' },
  { key: 'company.address.zip', labelKey: 'profile.fields.zip', required: true, type: 'text' },
  { key: 'company.address.city', labelKey: 'profile.fields.city', required: true, type: 'text' },
  { key: 'company.address.country', labelKey: 'profile.fields.country', required: true, type: 'text' },
  { key: 'company.vat_id', labelKey: 'profile.fields.vatId', required: false, type: 'text' }
]

const STORAGE_KEY = 'cf_profile_wizard'

export default function MyProfilePage() {
  const { t } = useI18n()

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

  function isFieldComplete(field: FieldDefinition) {
    const value = formData[field.key]
    if (field.type === 'boolean') {
      return value === true || value === false
    }
    return typeof value === 'string' && value.trim().length > 0
  }

  const requiredFields = useMemo(() => {
    const base = [...PERSONAL_FIELDS, ...COMPANY_FIELDS].filter((field) => field.required)
    return base
  }, [])

  const completedRequired = requiredFields.filter(isFieldComplete).length + (storedEmail ? 1 : 0)
  const totalRequired = requiredFields.length + 1
  const completion = Math.round((completedRequired / totalRequired) * 100)

  const steps = [
    {
      key: 'personal',
      title: t('profile.steps.personal.title'),
      subtitle: t('profile.steps.personal.subtitle'),
      fields: PERSONAL_FIELDS
    },
    {
      key: 'company',
      title: t('profile.steps.company.title'),
      subtitle: t('profile.steps.company.subtitle'),
      fields: COMPANY_FIELDS
    }
  ] as const

  const activeStep = steps[stepIndex]

  const currentRequiredComplete = activeStep.fields.filter((field) => field.required).every(isFieldComplete)

  const [saved, setSaved] = useState(false)

  function updateStep(nextStep: number) {
    const bounded = Math.max(0, Math.min(steps.length - 1, nextStep))
    setStepIndex(bounded)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: bounded, data: formData }))
    }
  }

  function handleChange(fieldKey: string, value: string | boolean) {
    const next = { ...formData, [fieldKey]: value }
    setFormData(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: stepIndex, data: next }))
    }
  }

  function handleSave() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: stepIndex, data: formData }))
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('profile.title')} subtitle={t('profile.subtitle')} subtitleColor="#65748b" />

        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ color: '#0f172a' }}>{t('profile.registration.title')}</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: '1 1 280px' }}>
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
              <div style={{ flex: '1 1 280px' }}>
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

        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <strong style={{ color: '#0f172a' }}>{t('profile.progress.title')}</strong>
              <span style={{ color: '#64748b', fontWeight: 600 }}>{completion}%</span>
            </div>
            <div style={{ height: 10, background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${completion}%`, background: '#D4380D' }} />
            </div>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              {t('profile.progress.caption', { percent: completion })}
            </span>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0 }}>{activeStep.title}</h2>
              <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>{activeStep.subtitle}</p>
            </div>
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>
              {t('profile.stepLabel', { current: stepIndex + 1, total: steps.length })}
            </span>
          </div>

          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.25rem' }}>
            {activeStep.fields.map((field) => {
              const value = formData[field.key]
              return (
                <label key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: '#475569' }}>
                  <span style={{ fontWeight: 600 }}>
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
                          padding: '0.45rem 1rem',
                          border: '1px solid #d9d9d9',
                          background: value === true ? '#fde8df' : '#ffffff',
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
                          padding: '0.45rem 1rem',
                          border: '1px solid #d9d9d9',
                          background: value === false ? '#fde8df' : '#ffffff',
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
                      value={typeof value === 'string' ? value : ''}
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
                      value={typeof value === 'string' ? value : ''}
                      onChange={(event) => handleChange(field.key, event.target.value)}
                    />
                  )}
                </label>
              )
            })}
          </div>

          {formData['account.password'] &&
            formData['account.password_confirm'] &&
            formData['account.password'] !== formData['account.password_confirm'] && (
              <p style={{ marginTop: '0.75rem', color: '#B42318', fontWeight: 600 }}>
                {t('profile.passwordMismatch')}
              </p>
            )}

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="secondary" onClick={handleSave}>
                {t('profile.actions.save')}
              </Button>
              {saved && <span style={{ alignSelf: 'center', color: '#15803d', fontWeight: 600 }}>{t('profile.saved')}</span>}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button
                variant="secondary"
                onClick={() => updateStep(stepIndex - 1)}
                disabled={stepIndex === 0}
              >
                {t('profile.actions.back')}
              </Button>
              <Button
                onClick={() => updateStep(stepIndex + 1)}
                disabled={!currentRequiredComplete}
              >
                {stepIndex === steps.length - 1 ? t('profile.actions.finish') : t('profile.actions.next')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
