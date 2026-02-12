import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

const navItems = [
  { key: 'dashboard', to: '/fleetfox' },
  { key: 'vehicles', to: '/fleetfox/vehicles' },
  { key: 'drivers', to: '/fleetfox/drivers' },
  { key: 'routes', to: '/fleetfox/routes' },
  { key: 'vision', to: '/fleetfox/vision' },
  { key: 'maintenance', to: '/fleetfox/maintenance' },
  { key: 'insurance', to: '/fleetfox/insurance' },
  { key: 'assistant', to: '/fleetfox/assistant' },
  { key: 'reporting', to: '/fleetfox/reporting' },
  { key: 'audit', to: '/fleetfox/audit' }
]

export default function FleetfoxNav() {
  const { t } = useI18n()
  const location = useLocation()

  return (
    <nav aria-label={t('fleetfox.nav.title')}>
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
          const isDashboard = item.to === '/fleetfox'
          const match = matchPath(
            { path: isDashboard ? '/fleetfox' : `${item.to}/*`, end: isDashboard },
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
                whiteSpace: 'nowrap'
              }}
            >
              {t(`fleetfox.nav.${item.key}`)}
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
