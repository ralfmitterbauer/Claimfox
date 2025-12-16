import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useAuth } from '@/features/auth/AuthContext'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    // Extra hard reset gegen Browser-Autofill-Events
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
      setError('Benutzername und Passwort sind erforderlich.')
      return
    }

    setIsSubmitting(true)
    try {
      const success = login(username, password)
      if (success) navigate('/roles', { replace: true })
      else setError('Ungültige Anmeldedaten.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="page"
      style={{
        minHeight: 'calc(100vh - 150px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem',
        }}
      >
        <img
          src={InsurfoxLogo}
          alt="Insurfox"
          style={{ height: 120, objectFit: 'contain' }}
        />

        <div style={{ width: '100%' }}>
          <Header title="IaaS - Portal" />

          <Card>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <label className="form-field">
                Benutzername
                <input
                  className="text-input"
                  name="cf_username"
                  autoComplete="off"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </label>

              <label className="form-field">
                Passwort
                <input
                  className="text-input"
                  type="password"
                  name="cf_password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </label>

              {error && <p className="error-text">{error}</p>}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Anmeldung läuft...' : 'Login'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
