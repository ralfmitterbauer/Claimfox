import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

const STORAGE_KEY = 'cf_profile_wizard'

export default function MyProfilePage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const storedEmail = typeof window !== 'undefined' ? window.localStorage.getItem('registrationEmail') ?? '' : ''
  const { formData, completed, stepIndex } = (() => {
    if (typeof window === 'undefined') {
      return { formData: {}, completed: false, stepIndex: 0 }
    }
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as { data?: Record<string, string | boolean> }) : undefined
    return {
      formData: parsed?.data ?? {},
      completed: parsed?.completed ?? false,
      stepIndex: parsed?.step ?? 0
    }
  })()
  const totalSteps = 2
  const safeStep = Math.min(stepIndex ?? 0, totalSteps - 1)
  const progressPercent = completed ? 100 : Math.round(((safeStep + 1) / totalSteps) * 100)

  function handleReset() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
      window.localStorage.removeItem('registrationEmail')
      window.localStorage.removeItem('registrationPrivacyConsent')
    }
    navigate(0)
  }

  const sectionCards = [
    { key: 'personal', label: t('profile.overview.sections.personal'), action: () => navigate('/profile/personal') },
    { key: 'company', label: t('profile.overview.sections.company'), action: () => navigate('/profile/company') },
    { key: 'insurances', label: t('profile.overview.sections.insurances'), action: () => navigate('/profile/insurances') },
    { key: 'fleet', label: t('profile.overview.sections.fleet'), action: () => navigate('/profile/fleet') },
    { key: 'locations', label: t('profile.overview.sections.locations'), action: () => navigate('/profile/locations') }
  ]

  return (
    <section className="page profile-overview-page">
      <div className="profile-overview-shell">
        <Header title={t('profile.overview.title')} subtitle={t('profile.overview.subtitle')} subtitleColor="#65748b" />

        <div className="profile-overview-hero">
          <Card className="profile-overview-card profile-overview-summary">
            <div className="profile-overview-summary-head">
              <div>
                <span className="profile-overview-kicker">{t('profile.overview.summaryTitle')}</span>
                <h2>{t('profile.overview.summarySubtitle')}</h2>
              </div>
              <Button variant="secondary" onClick={handleReset}>
                {t('profile.overview.reset')}
              </Button>
            </div>
            <div className="profile-overview-metrics">
              <div>
                <span>{t('profile.fields.email')}</span>
                <strong>{storedEmail || '—'}</strong>
              </div>
              <div>
                <span>{t('profile.fields.companyName')}</span>
                <strong>{typeof formData['company.name'] === 'string' ? formData['company.name'] : '—'}</strong>
              </div>
              <div>
                <span>{t('profile.fields.legalForm')}</span>
                <strong>{typeof formData['company.legal_form'] === 'string' ? formData['company.legal_form'] : '—'}</strong>
              </div>
              <div>
                <span>{t('profile.fields.contactFirstName')}</span>
                <strong>{typeof formData['contact.first_name'] === 'string' ? formData['contact.first_name'] : '—'}</strong>
              </div>
            </div>
          </Card>

          <Card className="profile-overview-card profile-overview-onboarding">
            <div className="profile-overview-onboarding-head">
              <div>
                <span className="profile-overview-kicker">{t('profile.onboarding.cardTitle')}</span>
                <h2>{t('profile.onboarding.cardSubtitle')}</h2>
                <p>{completed ? t('profile.onboarding.completed') : t('profile.onboarding.incomplete')}</p>
              </div>
              <Button onClick={() => navigate('/profile/onboarding')}>
                {completed ? t('profile.onboarding.resume') : t('profile.onboarding.start')}
              </Button>
            </div>
            <div className="profile-overview-progress">
              <div>
                <span>{t('profile.progress.title')}</span>
                <strong>{progressPercent}%</strong>
              </div>
              <div className="profile-overview-progress-bar">
                <div style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </Card>
        </div>

        <div className="profile-overview-sections">
          <div className="profile-overview-sections-head">
            <h2>{t('profile.overview.sections.title')}</h2>
          </div>
          <div className="profile-overview-section-grid">
            {sectionCards.map((item) => (
              <Card
                key={item.key}
                className="profile-overview-card profile-overview-section-card"
                interactive
                onClick={item.action}
              >
                <div className="profile-overview-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1f2a5f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 7.5h15M6.5 4.5h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" />
                    <path d="M8 12h4m-4 3h8" />
                  </svg>
                </div>
                <div>
                  <strong>{item.label}</strong>
                  <span>{t('profile.overview.open')}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
