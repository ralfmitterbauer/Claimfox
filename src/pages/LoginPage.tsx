import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useAuth } from '@/features/auth/AuthContext'
import { useI18n } from '@/i18n/I18nContext'

// ✅ Neues Logo (light)
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'

// ✅ Hintergrundbild Login (shared with /home)
import LoginBackground from '@/assets/images/background_login.png'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const { t } = useI18n()

  // Hard reset against browser autofill
  useEffect(() => {
    setUsername('')
    setPassword('')
  }, [])

  useEffect(() => {
    if (isAuthenticated) navigate('/roles', { replace: true })
  }, [isAuthenticated, navigate])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!username.trim() || !password.trim()) {
      setError(t('login.required'))
      return
    }

    setIsSubmitting(true)
    try {
      const success = login(username, password)
      if (success) {
        navigate('/roles', { replace: true })
      } else {
        setError(t('login.invalid'))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="page login-page"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${LoginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Overlay Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 480,
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem',
        }}
      >
        {/* ✅ Insurfox Logo (light) */}
        <img
          src={InsurfoxLogoLight}
          alt="Insurfox"
          style={{
            height: 110,
            objectFit: 'contain',
          }}
        />

        {/* Login Content */}
        <div style={{ width: '100%' }}>
          <Header title={t('login.title')} titleColor="#ffffff" />

          <Card>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <label className="form-field">
                {t('login.username')}
                <input
                  className="text-input"
                  name="cf_username"
                  autoComplete="off"
                  placeholder={t('login.username')}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </label>

              <label className="form-field">
                {t('login.password')}
                <input
                  className="text-input"
                  type="password"
                  name="cf_password"
                  autoComplete="new-password"
                  placeholder={t('login.password')}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </label>

              {error && <p className="error-text">{error}</p>}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('login.submitting') : t('login.submit')}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
