import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoDark from '@/assets/logos/Dark_blink.svg'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import { useAuth } from '@/features/auth/AuthContext'

export default function AppHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const { lang, setLang, t } = useI18n()
  const { isAuthenticated, logout, user } = useAuth()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const authLabel = isAuthenticated ? t('header.logout') : t('header.login')

  function handleAuthClick() {
    if (isAuthenticated) {
      logout()
      navigate('/login')
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }
    navigate('/login')
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  function go(route: string) {
    navigate(route)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const navItems = [
    { label: t('header.nav.insurance'), route: '/insurance' },
    { label: t('header.nav.broker'), route: '/broker-portal' },
    { label: t('header.nav.logistics'), route: '/logistics' },
    { label: t('header.nav.fleet'), route: '/fleet' },
    { label: t('header.nav.partner'), route: '/partner' },
    { label: t('header.nav.demo'), route: '/demo' }
  ].filter((item) => (user?.mode === 'insurance-only' ? item.route === '/insurance' : true))

  useEffect(() => {
    const header = headerRef.current
    if (!header) {
      return
    }

    const updateViewportVars = () => {
      const vv = window.visualViewport
      const viewportHeight = vv?.height ?? window.innerHeight
      const viewportTop = vv?.offsetTop ?? 0
      document.documentElement.style.setProperty('--vvh', `${viewportHeight}px`)
      document.documentElement.style.setProperty('--vv-top', `${viewportTop}px`)
    }

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--app-header-h', `${header.offsetHeight}px`)
    }

    updateHeaderHeight()
    updateViewportVars()

    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateHeaderHeight)
      observer.observe(header)
    }

    const vv = window.visualViewport
    const handleResize = () => {
      updateHeaderHeight()
      updateViewportVars()
    }
    window.addEventListener('resize', handleResize)
    vv?.addEventListener('resize', updateViewportVars)
    vv?.addEventListener('scroll', updateViewportVars)
    return () => {
      window.removeEventListener('resize', handleResize)
      vv?.removeEventListener('resize', updateViewportVars)
      vv?.removeEventListener('scroll', updateViewportVars)
      observer?.disconnect()
    }
  }, [])

  return (
    <header className="home-marketing-header" ref={headerRef}>
      <div className="home-marketing-header-inner">
        <button type="button" onClick={() => go('/home')} className="home-marketing-logo-button" aria-label="Insurfox Home">
          <img src={logoDark} alt="Insurfox" className="home-marketing-logo" />
        </button>
        <nav className="home-marketing-nav">
          {navItems.map((item) => (
            <button key={item.route} type="button" onClick={() => go(item.route)}>
              {item.label}
            </button>
          ))}
          <div className="home-marketing-lang-switch" role="group" aria-label="Language switch">
            <button type="button" className={lang === 'de' ? 'is-active' : ''} onClick={() => setLang('de')}>
              DE
            </button>
            <button type="button" className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>
              EN
            </button>
          </div>
          <Button
            onClick={handleAuthClick}
            className="home-marketing-login"
            style={{ padding: '0.5rem 1.1rem' }}
            disableHover
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.8-3.5 5-6 8-6s6.2 2.5 8 6" />
            </svg>
            <span className="home-marketing-login-text">{authLabel}</span>
          </Button>
          <button
            type="button"
            className="home-marketing-menu home-marketing-menu-trigger"
            aria-label="Menü öffnen"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        {isMobileNavOpen && (
          <div className="home-marketing-mobile-panel" role="dialog" aria-label="Navigation">
            {navItems.map((item) => (
              <button key={item.route} type="button" onClick={() => { go(item.route); setIsMobileNavOpen(false) }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
