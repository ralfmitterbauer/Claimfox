import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'

export default function DemoOverviewPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  const overviewGroups = [
    {
      title: t('roles.overviewGroups.insurance'),
      items: [
        { label: t('roles.cards.underwriter.title'), roleId: 'underwriter' },
        { label: t('roles.cards.legal.title'), roleId: 'legal' },
        { label: t('roles.cards.finance.title'), roleId: 'finance' },
        { label: t('roles.cards.claims.title'), roleId: 'claims' },
        { label: t('roles.cards.partner.title'), roleId: 'partner' }
      ]
    },
    {
      title: t('roles.overviewGroups.fleet'),
      items: [
        { label: t('roles.cards.reporting.title'), roleId: 'reporting' },
        { label: t('roles.cards.fleetManagement.title'), roleId: 'fleet-management' }
      ]
    },
    {
      title: t('roles.overviewGroups.logistics'),
      items: [
        { label: t('roles.cards.logistics.title'), roleId: 'logistics' }
      ]
    },
    {
      title: t('roles.overviewGroups.broker'),
      items: [
        { label: t('roles.brokerPortal'), roleId: 'broker' }
      ]
    }
  ]

  return (
    <section className="uw-page">
      <div className="uw-container">
        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.overview')}</h2>
          <div className="uw-grid uw-cards">
            {overviewGroups.map((group) => (
              <Card key={group.title} variant="glass" className="uw-card">
                <div className="uw-card-body" style={{ gap: '0.5rem' }}>
                  <strong>{group.title}</strong>
                  {group.items.map((role) => (
                    <button
                      key={role.roleId}
                      type="button"
                      onClick={() => navigate(`/demo/role/${role.roleId}`)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: 'var(--ix-primary)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
