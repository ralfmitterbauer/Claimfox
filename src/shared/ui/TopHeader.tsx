import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '@/assets/logos/insurfox-logo-light.png'
import { LANGUAGE_STORAGE_KEY } from '../constants/storageKeys'
import './TopHeader.css'

type LanguageCode = 'en' | 'de'

const LANGUAGES: Array<{ label: string; value: LanguageCode }> = [
  { label: 'DE', value: 'de' },
  { label: 'EN', value: 'en' }
]

function normalizeLanguage(lng?: string): LanguageCode {
  if (!lng) return 'en'
  return lng.toLowerCase().startsWith('de') ? 'de' : 'en'
}

export default function TopHeader() {
  const location = useLocation()
  const { i18n } = useTranslation()
  const activeLang = normalizeLanguage(i18n.language)
  const pathname = location.pathname
  const isLoginRoute = pathname === '/login'
  if (pathname === '/exec-login') {
    return null
  }

  const handleLanguageChange = useCallback(
    (nextLanguage: LanguageCode) => {
      if (nextLanguage === activeLang) return
      i18n.changeLanguage(nextLanguage)
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
        }
      } catch (error) {
        // ignore storage issues (private mode, etc.)
      }
    },
    [activeLang, i18n]
  )

  const logoImage = <img src={logo} alt="Insurfox" className="top-header__logo-image" />

  return (
    <div className="top-header">
      <div className="top-header__inner">
        {isLoginRoute ? (
          <div className="top-header__logo" aria-label="Insurfox">
            {logoImage}
          </div>
        ) : (
          <Link to="/my-profile" className="top-header__logo" aria-label="Go to my profile">
            {logoImage}
          </Link>
        )}

        <div className="top-header__lang-switch" role="group" aria-label="Language switch">
          {LANGUAGES.map((language) => {
            const isActive = language.value === activeLang
            return (
              <button
                key={language.value}
                type="button"
                className={`top-header__lang-btn${isActive ? ' is-active' : ''}`}
                onClick={() => handleLanguageChange(language.value)}
                aria-pressed={isActive}
              >
                {language.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
