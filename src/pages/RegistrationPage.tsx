import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoDark from '@/assets/logos/Insurfox_Logo_colored_dark.png'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RegistrationPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const trimmed = email.trim()
    if (!EMAIL_REGEX.test(trimmed)) {
      setError(t('registration.emailError'))
      return
    }
    if (!consent) {
      setError(t('registration.privacyError'))
      return
    }
    setSubmitted(true)
  }

  return (
    <section className="page registration-page" style={{ gap: '1.75rem' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <img src={InsurfoxLogoDark} alt="Insurfox" style={{ height: 56, objectFit: 'contain' }} />
          <Button variant="secondary" onClick={() => navigate('/roles')}>
            {t('registration.back')}
          </Button>
        </div>

        <Header
          title={t('registration.title')}
          subtitle={t('registration.subtitle')}
          titleColor="#0e0d1c"
          subtitleColor="#65748b"
        />

        <Card style={{ padding: '1.75rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <label className="form-field" style={{ marginBottom: 0, color: '#475569' }}>
              {t('registration.emailLabel')}
              <input
                className="text-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t('registration.emailPlaceholder')}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontSize: '0.95rem',
                color: '#475569'
              }}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                style={{ marginTop: '0.2rem' }}
              />
              <span>
                {t('registration.privacyText')}{' '}
                <a href={t('registration.privacyLink')} target="_blank" rel="noreferrer" style={{ color: '#D4380D', fontWeight: 600 }}>
                  {t('registration.privacyLinkText')}
                </a>
                .
              </span>
            </label>

            {error && <p style={{ margin: 0, color: '#B42318', fontWeight: 600 }}>{error}</p>}
            {submitted && !error && <p style={{ margin: 0, color: '#1b7f3c', fontWeight: 600 }}>{t('registration.success')}</p>}

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button type="submit">{t('registration.submit')}</Button>
            </div>
          </form>

          <div style={{ marginTop: '1rem', color: '#2f2b3a', fontSize: '0.95rem' }}>
            {t('registration.alreadyRegistered')}{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                color: '#D4380D',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {t('registration.login')}
            </button>
          </div>
        </Card>
      </div>
    </section>
  )
}
