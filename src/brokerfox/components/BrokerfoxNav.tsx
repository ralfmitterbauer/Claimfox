import React from 'react'
import { NavLink } from 'react-router-dom'
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

  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }} aria-label={t('brokerfox.nav.title')}>
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          to={item.to}
          style={({ isActive }) => ({
            padding: '0.4rem 0.85rem',
            borderRadius: 999,
            textDecoration: 'none',
            fontWeight: 600,
            background: isActive ? '#111827' : '#e2e8f0',
            color: isActive ? '#ffffff' : '#0f172a'
          })}
        >
          {t(`brokerfox.nav.${item.key}`)}
        </NavLink>
      ))}
    </nav>
  )
}
