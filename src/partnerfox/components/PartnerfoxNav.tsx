import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

const navItems = [
  { key: 'dashboard', to: '/partnerfox' },
  { key: 'network', to: '/partnerfox/network' },
  { key: 'cases', to: '/partnerfox/cases' },
  { key: 'rental', to: '/partnerfox/rental' },
  { key: 'towing', to: '/partnerfox/towing' },
  { key: 'subrogation', to: '/partnerfox/subrogation' },
  { key: 'assistance', to: '/partnerfox/assistance' },
  { key: 'reporting', to: '/partnerfox/reporting' },
  { key: 'audit', to: '/partnerfox/audit' }
]

export default function PartnerfoxNav() {
  const { t } = useI18n()
  const location = useLocation()

  return (
    <nav aria-label={t('partnerfox.nav.title')}>
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
          const isDashboard = item.to === '/partnerfox'
          const match = matchPath(
            { path: isDashboard ? '/partnerfox' : `${item.to}/*`, end: isDashboard },
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
              className={`partnerfox-tab${isActive ? ' active' : ''}`}
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
              {t(`partnerfox.nav.${item.key}`)}
            </NavLink>
          )
        })}
      </div>
      <style>
        {`
          .partnerfox-tab:focus-visible {
            outline: 2px solid rgba(234,88,12,0.35);
            outline-offset: 2px;
          }
          .partnerfox-tab:not(.active):hover {
            background: #e9eff7;
          }
        `}
      </style>
    </nav>
  )
}
