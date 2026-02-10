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
    <nav aria-label={t('brokerfox.nav.title')}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '6px 4px 8px',
          background: '#f1f5f9',
          borderRadius: 14,
          overflow: 'visible'
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
                borderRadius: 999,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#0f172a' : '#475569',
                border: 'none',
                boxShadow: isActive ? '0 2px 6px rgba(15,23,42,0.08)' : 'none',
                position: 'relative',
                whiteSpace: 'nowrap'
              }}
            >
              {t(`brokerfox.nav.${item.key}`)}
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
