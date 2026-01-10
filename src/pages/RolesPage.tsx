import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

type RoleItem = {
  key:
    | 'claims'
    | 'claimProcess'
    | 'partner'
    | 'reporting'
    | 'fleetManagement'
    | 'logistics'
    | 'featureTree'
    | 'getQuote'
    | 'mvp'
    | 'whitepaper'
    | 'intern'
    | 'brokerPortal'
    | 'aiOnboarding'
    | 'onboarding'
    | 'identification'
    | 'regulatoryGovernance'
    | 'auditAppendix'
  route?: string
  ctaKey?: string
}

const OVERVIEW_ITEMS: RoleItem[] = [
  { key: 'claims', route: '/claim-manager', ctaKey: 'roles.cards.claims.cta' },
  { key: 'partner', route: '/partner-management' },
  { key: 'reporting', route: '/marketing' },
  { key: 'logistics', route: '/logistics', ctaKey: 'roles.cards.logistics.cta' },
  { key: 'fleetManagement', route: '/fleet-management' },
  { key: 'brokerPortal', route: '/broker-portal' }
]

const PROCESS_ITEMS: RoleItem[] = [
  { key: 'claimProcess', route: '/claim-process', ctaKey: 'roles.cards.claimProcess.cta' },
  { key: 'getQuote', route: '/get-quote', ctaKey: 'roles.cards.getQuote.cta' },
  { key: 'onboarding', route: '/profile/onboarding' },
  { key: 'identification', route: '/user-identification' }
]

const GOVERNANCE_ITEMS: RoleItem[] = [
  { key: 'regulatoryGovernance', route: '/governance/regulatory-ai-governance' },
  { key: 'auditAppendix', route: '/governance/audit-appendix' }
]

const PRESENTATION_ITEMS: RoleItem[] = [
  { key: 'whitepaper', route: '/ai-whitepaper' }
]

const DEVELOPMENT_ITEMS: RoleItem[] = [
  { key: 'mvp', route: '/mvp' },
  { key: 'aiOnboarding', route: '/ai-onboarding' },
  { key: 'featureTree', route: '/feature-tree', ctaKey: 'roles.cards.featureTree.cta' },
  { key: 'intern', route: '/intern' }
]

const descriptionStyle: React.CSSProperties = {
  marginTop: 0,
  color: '#475569',
  minHeight: '2.2rem',
  fontSize: '0.95rem',
  lineHeight: 1.45,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
}

export default function RolesPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [showAuth, setShowAuth] = React.useState(false)
  const [authUser, setAuthUser] = React.useState('')
  const [authPin, setAuthPin] = React.useState('')
  const [authError, setAuthError] = React.useState('')
  const [pendingRoute, setPendingRoute] = React.useState<string | null>(null)

  const isAuthed =
    typeof window !== 'undefined' && window.localStorage.getItem('cf_intern_auth') === 'true'

  function handleInternalAccess(route: string) {
    if (isAuthed) {
      navigate(route)
      return
    }
    setPendingRoute(route)
    setShowAuth(true)
  }

  function handleAuthSubmit(event: React.FormEvent) {
    event.preventDefault()
    const valid = authUser.trim().toLowerCase() === 'ralf' && authPin.trim() === '1704'
    if (!valid) {
      setAuthError(t('roles.internalAuth.error'))
      return
    }
    setAuthError('')
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cf_intern_auth', 'true')
    }
    setShowAuth(false)
    const nextRoute = pendingRoute
    setPendingRoute(null)
    if (nextRoute) {
      navigate(nextRoute)
    }
  }

  function renderCard(item: RoleItem, requireAuth = false) {
    const hasRoute = Boolean(item.route)
    const titleKey = item.key === 'brokerPortal' ? 'roles.brokerPortal' : `roles.cards.${item.key}.title`
    const descriptionKey =
      item.key === 'brokerPortal' ? 'roles.brokerPortal' : `roles.cards.${item.key}.description`

    const handleClick = hasRoute
      ? () => {
          if (requireAuth) {
            handleInternalAccess(item.route!)
            return
          }
          navigate(item.route!)
        }
      : undefined

    return (
      <Card
        key={item.key}
        title={t(titleKey)}
        variant="glass"
        interactive={hasRoute}
        onClick={handleClick}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0.85rem', minHeight: '150px' }}
      >
        <p style={descriptionStyle}>{t(descriptionKey)}</p>
      </Card>
    )
  }

  function renderSection(title: string, items: RoleItem[], requireAuth = false) {
    return (
      <div className="roles-section">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <div className="roles-grid">
          {items.map((item) => renderCard(item, requireAuth))}
        </div>
      </div>
    )
  }

  return (
    <section className="page roles-page">
      <div className="roles-container">
        <div
          className="roles-hero"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
          }}
        >
          <div className="roles-hero-inner">
            <Header
              title={t('roles.title')}
              subtitle={t('roles.subtitle')}
              subtitleColor="rgba(255,255,255,0.82)"
            />
          </div>
        </div>
        {renderSection(t('roles.sections.overview'), OVERVIEW_ITEMS)}
        <div className="roles-divider" />
        {renderSection(t('roles.sections.processes'), PROCESS_ITEMS)}
        <div className="roles-divider" />
        {renderSection(t('roles.sections.governance'), GOVERNANCE_ITEMS, true)}
        <div className="roles-divider" />
        {renderSection(t('roles.sections.presentations'), PRESENTATION_ITEMS, true)}
        <div className="roles-divider" />
        {renderSection(t('roles.sections.development'), DEVELOPMENT_ITEMS, true)}
      </div>
        {showAuth && (
          <div className="modal-backdrop" onClick={() => setShowAuth(false)}>
            <div className="modal-card" onClick={(event) => event.stopPropagation()}>
              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <strong>{t('roles.internalAuth.title')}</strong>
                <span style={{ color: '#64748b' }}>{t('roles.internalAuth.subtitle')}</span>
                <label className="form-field">
                  {t('roles.internalAuth.username')}
                  <input
                    className="text-input"
                    value={authUser}
                    onChange={(event) => setAuthUser(event.target.value)}
                  />
                </label>
                <label className="form-field">
                  {t('roles.internalAuth.pin')}
                  <input
                    className="text-input"
                    type="password"
                    inputMode="numeric"
                    value={authPin}
                    onChange={(event) => setAuthPin(event.target.value)}
                  />
                </label>
                {authError && <span className="error-text">{authError}</span>}
                <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
                  <Button type="button" variant="secondary" onClick={() => setShowAuth(false)}>
                    {t('profile.actions.back')}
                  </Button>
                  <Button type="submit">{t('roles.internalAuth.submit')}</Button>
                </div>
              </form>
            </div>
          </div>
        )}
    </section>
  )
}
