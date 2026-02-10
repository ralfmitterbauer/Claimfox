import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

const navItems = [
  { key: 'dashboard', to: '/brokerfox' },
  { key: 'clients', to: '/brokerfox/clients' },
  { key: 'contracts', to: '/brokerfox/contracts' },
  { key: 'mailbox', to: '/brokerfox/mailbox' },
  { key: 'tenders', to: '/brokerfox/tenders' },
  { key: 'offers', to: '/brokerfox/offers' },
  { key: 'renewals', to: '/brokerfox/renewals' },
  { key: 'documents', to: '/brokerfox/documents' },
  { key: 'reporting', to: '/brokerfox/reporting' },
  { key: 'tasks', to: '/brokerfox/tasks' },
  { key: 'integrations', to: '/brokerfox/integrations' }
]

export default function BrokerfoxNav() {
  const { t } = useI18n()
  const location = useLocation()

  return (
    <nav aria-label={t('brokerfox.nav.title')} style={{ position: 'relative', zIndex: 2 }}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'flex-end',
          padding: '0 12px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {navItems.map((item) => {
          const isDashboard = item.to === '/brokerfox'
          const match = matchPath(
            { path: isDashboard ? '/brokerfox' : `${item.to}/*`, end: isDashboard },
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
                padding: '0 14px',
                borderRadius: '12px 12px 10px 10px',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                background: isActive ? '#ffffff' : '#f3f6fb',
                color: '#0f172a',
                border: '1px solid #cfd6e3',
                borderBottomColor: isActive ? 'transparent' : '#cfd6e3',
                boxShadow: isActive ? '0 1px 0 rgba(15,23,42,0.06)' : 'none',
                position: isActive ? 'relative' : 'static',
                transform: isActive ? 'translateY(0)' : 'translateY(2px)',
                opacity: isActive ? 1 : 0.95,
                zIndex: isActive ? 4 : 1,
                whiteSpace: 'nowrap'
              }}
            >
              {t(`brokerfox.nav.${item.key}`)}
              {isActive && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 1,
                    right: 1,
                    bottom: -1,
                    height: 2,
                    background: '#ffffff'
                  }}
                />
              )}
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
            background: #eef3fb;
          }
        `}
      </style>
    </nav>
  )
}
