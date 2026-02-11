import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

const navItems = [
  { key: 'dashboard', to: '/underwriterfox' },
  { key: 'cases', to: '/underwriterfox/cases' },
  { key: 'documents', to: '/underwriterfox/documents' },
  { key: 'rules', to: '/underwriterfox/rules' },
  { key: 'rating', to: '/underwriterfox/rating' },
  { key: 'ai', to: '/underwriterfox/ai' },
  { key: 'reporting', to: '/underwriterfox/reporting' },
  { key: 'governance', to: '/underwriterfox/governance' }
]

export default function UnderwriterfoxNav() {
  const { t } = useI18n()
  const location = useLocation()

  return (
    <nav aria-label={t('underwriterfox.nav.title')}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          padding: '4px 4px 6px',
          background: '#f1f5f9',
          borderRadius: 14,
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {navItems.map((item) => {
          const isDashboard = item.to === '/underwriterfox'
          const match = matchPath(
            { path: isDashboard ? '/underwriterfox' : `${item.to}/*`, end: isDashboard },
            location.pathname
          )
          const isActive = Boolean(match)
          return (
            <NavLink
              key={item.key}
              to={item.to}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`underwriterfox-tab${isActive ? ' active' : ''}`}
              style={{
                height: 36,
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 12px',
                borderRadius: 999,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#0f172a' : '#475569',
                border: 'none',
                boxShadow: isActive ? '0 2px 6px rgba(15,23,42,0.08)' : 'none',
                position: 'relative',
                whiteSpace: 'nowrap'
              }}
            >
              {t(`underwriterfox.nav.${item.key}`)}
            </NavLink>
          )
        })}
      </div>
      <style>
        {`
          .underwriterfox-tab:focus-visible {
            outline: 2px solid rgba(234,88,12,0.35);
            outline-offset: 2px;
          }
          .underwriterfox-tab:not(.active):hover {
            background: #e9eff7;
          }
        `}
      </style>
    </nav>
  )
}
