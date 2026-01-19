import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useAuth } from '@/features/auth/AuthContext'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoDark from '@/assets/logos/Insurfox_Logo_colored_dark.png'

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
    if (isAuthenticated) navigate('/home', { replace: true })
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
        navigate('/home', { replace: true })
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
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem'
        }}
      >
        <img src={InsurfoxLogoDark} alt="Insurfox" style={{ height: 110, objectFit: 'contain' }} />
        <div style={{ width: '100%' }}>
          <Header title={t('login.title')} titleColor="#0e0d1c" subtitleColor="#65748b" />
          <Card>
            <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
