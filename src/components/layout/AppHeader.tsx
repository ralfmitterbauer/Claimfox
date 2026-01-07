import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoDark from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import { useI18n } from '@/i18n/I18nContext'
import type { Lang } from '@/i18n/translations'
import { useAuth } from '@/features/auth/AuthContext'
import './AppHeader.css'

const LANGUAGES: Array<{ label: string; value: Lang }> = [
  { label: 'DE', value: 'de' },
  { label: 'EN', value: 'en' }
]

export default function AppHeader() {
  const navigate = useNavigate()
  const { lang, setLang, t } = useI18n()
  const { isAuthenticated, logout } = useAuth()

  const authLabel = isAuthenticated ? t('header.logout') : t('header.login')

  function handleAuthClick() {
    if (isAuthenticated) {
      logout()
      navigate('/login')
      return
    }
    navigate('/login')
  }

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/roles" className="app-header__logo" aria-label="Insurfox">
          <img src={logoDark} alt="Insurfox" />
        </Link>

        <div className="app-header__actions">
          <div className="app-header__lang-switch" role="group" aria-label="Language switch">
            {LANGUAGES.map((language) => {
              const isActive = language.value === lang
              return (
                <button
                  key={language.value}
                  type="button"
                  className={`app-header__lang-btn${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setLang(language.value)}
                >
                  {language.label}
                </button>
              )
            })}
          </div>
          <button type="button" className="app-header__auth-btn" onClick={handleAuthClick}>
            {authLabel}
          </button>
        </div>
      </div>
    </header>
  )
}
