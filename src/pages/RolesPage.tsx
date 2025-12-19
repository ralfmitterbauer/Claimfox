import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useAuth } from '@/features/auth/AuthContext'
import { useI18n } from '@/i18n/I18nContext'

type RoleItem = {
  key: 'claims' | 'partner' | 'reporting' | 'fleetManagement' | 'logistics'
  route?: string
  ctaKey?: string
}

const ROLE_ITEMS: RoleItem[] = [
  { key: 'claims', route: '/claim-manager', ctaKey: 'roles.cards.claims.cta' },
  { key: 'partner' },
  { key: 'reporting', route: '/marketing' },
  { key: 'logistics', route: '/logistics', ctaKey: 'roles.cards.logistics.cta' },
  { key: 'fleetManagement', route: '/fleet-management' }
] as const

export default function RolesPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useI18n()

  function handleLogout() {
    logout()
    navigate('/home', { replace: true })
  }

  return (
    <section className="page" style={{ gap: '2rem' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}
        >
          <Header
            title={t('roles.title')}
            subtitle={t('roles.subtitle')}
            titleColor="#ffffff"
            subtitleColor="rgba(255,255,255,0.85)"
            actions={
              <Button variant="secondary" onClick={handleLogout}>
                {t('roles.logout')}
              </Button>
            }
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {ROLE_ITEMS.map((item) => {
              const hasRoute = Boolean(item.route)
              return (
                <Card
                  key={item.key}
                  title={t(`roles.cards.${item.key}.title`)}
                  variant="glass"
                  interactive={hasRoute}
                  onClick={hasRoute ? () => navigate(item.route!) : undefined}
                >
                  <p style={{ marginTop: 0, color: 'rgba(255,255,255,0.85)', minHeight: '3rem' }}>
                    {t(`roles.cards.${item.key}.description`)}
                  </p>
                  <Button
                    style={{ width: '100%' }}
                    onClick={
                      hasRoute
                        ? (event) => {
                            event.stopPropagation()
                            navigate(item.route!)
                          }
                        : undefined
                    }
                  >
                    {item.ctaKey ? t(item.ctaKey) : t('roles.view')}
                  </Button>
                </Card>
              )
            })}
            <Card
              title={t('roles.registrationCardTitle')}
              subtitle={t('roles.registrationCardSubtitle')}
              interactive
              onClick={() => navigate('/registration')}
              variant="glass"
            >
              <Button
                style={{ width: '100%' }}
                onClick={(event) => {
                  event.stopPropagation()
                  navigate('/registration')
                }}
              >
                {t('roles.startJourney')}
              </Button>
            </Card>
            <Card
              title={t('roles.brokerPortal')}
              interactive
              onClick={() => navigate('/broker-portal')}
              variant="glass"
            >
              <p style={{ marginTop: 0, color: 'rgba(255,255,255,0.85)', minHeight: '3rem' }}>
                {t('roles.brokerPortal')}
              </p>
              <Button
                style={{ width: '100%' }}
                onClick={(event) => {
                  event.stopPropagation()
                  navigate('/broker-portal')
                }}
              >
                {t('roles.view')}
              </Button>
            </Card>
          </div>
        </div>
      </section>
  )
}
