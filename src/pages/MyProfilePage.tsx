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
  const formData = (() => {
    if (typeof window === 'undefined') return {}
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as { data?: Record<string, string | boolean> }) : undefined
    return parsed?.data ?? {}
  })()
  const completed = (() => {
    if (typeof window === 'undefined') return false
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as { completed?: boolean }) : undefined
    return parsed?.completed ?? false
  })()

  function handleReset() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
      window.localStorage.removeItem('registrationEmail')
      window.localStorage.removeItem('registrationPrivacyConsent')
    }
    navigate(0)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('profile.overview.title')} subtitle={t('profile.overview.subtitle')} subtitleColor="#65748b" />

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <div>
              <strong style={{ color: '#0f172a' }}>{t('profile.onboarding.cardTitle')}</strong>
              <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>{t('profile.onboarding.cardSubtitle')}</p>
              <p style={{ margin: '0.35rem 0 0', color: '#94a3b8' }}>
                {completed ? t('profile.onboarding.completed') : t('profile.onboarding.incomplete')}
              </p>
            </div>
            <Button onClick={() => navigate('/profile/onboarding')}>
              {completed ? t('profile.onboarding.resume') : t('profile.onboarding.start')}
            </Button>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <strong style={{ color: '#0f172a' }}>{t('profile.overview.sections.title')}</strong>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[
                { key: 'personal', label: t('profile.overview.sections.personal'), action: () => navigate('/profile/personal') },
                { key: 'company', label: t('profile.overview.sections.company'), action: () => navigate('/profile/company') },
                { key: 'insurances', label: t('profile.overview.sections.insurances'), action: () => navigate('/profile/insurances') },
                { key: 'fleet', label: t('profile.overview.sections.fleet'), action: () => navigate('/profile/fleet') },
                { key: 'locations', label: t('profile.overview.sections.locations'), action: () => navigate('/profile/locations') }
              ].map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    background: '#f8fafc'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.label}</span>
                  <Button variant="secondary" onClick={item.action}>
                    {t('profile.overview.open')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <div>
              <strong style={{ color: '#0f172a' }}>{t('profile.overview.summaryTitle')}</strong>
              <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>{t('profile.overview.summarySubtitle')}</p>
            </div>
            <Button variant="secondary" onClick={handleReset}>
              {t('profile.overview.reset')}
            </Button>
          </div>
          <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>{t('profile.fields.email')}</span>
              <strong>{storedEmail || '—'}</strong>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: '#475569' }}>
              <span style={{ flex: '1 1 220px' }}>
                {t('profile.fields.companyName')}{' '}
                <strong>{typeof formData['company.name'] === 'string' ? formData['company.name'] : '—'}</strong>
              </span>
              <span style={{ flex: '1 1 220px' }}>
                {t('profile.fields.legalForm')}{' '}
                <strong>{typeof formData['company.legal_form'] === 'string' ? formData['company.legal_form'] : '—'}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>{t('profile.fields.contactFirstName')}</span>
              <strong>{typeof formData['contact.first_name'] === 'string' ? formData['contact.first_name'] : '—'}</strong>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
