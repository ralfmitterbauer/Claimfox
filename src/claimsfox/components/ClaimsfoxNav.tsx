import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

const navItems = [
  { key: 'dashboard', to: '/claimsfox' },
  { key: 'claims', to: '/claimsfox/claims' },
  { key: 'intake', to: '/claimsfox/intake' },
  { key: 'fnolDemo', to: '/claimsfox/fnol-demo' },
  { key: 'triage', to: '/claimsfox/triage' },
  { key: 'documents', to: '/claimsfox/documents' },
  { key: 'mailbox', to: '/claimsfox/mailbox' },
  { key: 'partners', to: '/claimsfox/partners' },
  { key: 'reporting', to: '/claimsfox/reporting' },
  { key: 'tasks', to: '/claimsfox/tasks' },
  { key: 'integrations', to: '/claimsfox/integrations' }
]

export default function ClaimsfoxNav() {
  const { t } = useI18n()
  const location = useLocation()

  return (
    <nav aria-label={t('claimsfox.nav.title')}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'nowrap',
          padding: '4px 4px 6px',
          background: '#f1f5f9',
          borderRadius: 14,
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {navItems.map((item) => {
          const isDashboard = item.to === '/claimsfox'
          const match = matchPath(
            { path: isDashboard ? '/claimsfox' : `${item.to}/*`, end: isDashboard },
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
              className={`brokerfox-tab${isActive ? ' active' : ''}`}
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
              {t(`claimsfox.nav.${item.key}`)}
            </NavLink>
          )
        })}
      </div>
      <style>
        {`
          .brokerfox-tab:focus-visible {
            outline: 2px solid rgba(234,88,12,0.35);
            outline-offset: 2px;
          }
          .brokerfox-tab:not(.active):hover {
            background: #e9eff7;
          }
        `}
      </style>
    </nav>
  )
}
