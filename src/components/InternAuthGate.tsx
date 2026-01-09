import React, { useMemo, useState } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

const AUTH_KEY = 'cf_intern_auth'

type InternAuthGateProps = {
  children: React.ReactNode
}

export default function InternAuthGate({ children }: InternAuthGateProps) {
  const { t } = useI18n()
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(AUTH_KEY) === 'true'
  })
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const isValid = useMemo(() => username.trim().toLowerCase() === 'ralf' && pin.trim() === '1704', [username, pin])

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    if (!isValid) {
      setError(t('roles.internalAuth.error'))
      return
    }
    setError('')
    setIsAuthed(true)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_KEY, 'true')
    }
  }

  if (!isAuthed) {
    return (
      <section className="page" style={{ gap: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
          <Header title={t('roles.internalAuth.title')} subtitle={t('roles.internalAuth.subtitle')} subtitleColor="#65748b" />
          <Card>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label className="form-field">
                {t('roles.internalAuth.username')}
                <input className="text-input" value={username} onChange={(event) => setUsername(event.target.value)} />
              </label>
              <label className="form-field">
                {t('roles.internalAuth.pin')}
                <input
                  className="text-input"
                  type="password"
                  inputMode="numeric"
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                />
              </label>
              {error && <span className="error-text">{error}</span>}
              <Button type="submit">{t('roles.internalAuth.submit')}</Button>
            </form>
          </Card>
        </div>
      </section>
    )
  }

  return <>{children}</>
}
