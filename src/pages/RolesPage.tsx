import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useAuth } from '@/features/auth/AuthContext'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

type RoleItem = {
  key: 'claims' | 'claimProcess' | 'partner' | 'reporting' | 'fleetManagement' | 'logistics' | 'featureTree' | 'getQuote'
  route?: string
  ctaKey?: string
}

const ROLE_ITEMS: RoleItem[] = [
  { key: 'claims', route: '/claim-manager', ctaKey: 'roles.cards.claims.cta' },
  { key: 'claimProcess', route: '/claim-process', ctaKey: 'roles.cards.claimProcess.cta' },
  { key: 'partner', route: '/partner-management' },
  { key: 'reporting', route: '/marketing' },
  { key: 'featureTree', route: '/feature-tree', ctaKey: 'roles.cards.featureTree.cta' },
  { key: 'getQuote', route: '/get-quote', ctaKey: 'roles.cards.getQuote.cta' },
  { key: 'logistics', route: '/logistics', ctaKey: 'roles.cards.logistics.cta' },
  { key: 'fleetManagement', route: '/fleet-management' }
] as const

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
          <div
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(11, 28, 108, 0.85) 0%, rgba(18, 59, 154, 0.85) 100%), url(${HeroBlockBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2.5rem clamp(1rem, 4vw, 3rem)',
              color: '#ffffff',
              boxShadow: '0 30px 70px rgba(11, 28, 108, 0.25)',
              width: '100vw',
              marginLeft: 'calc(50% - 50vw)'
            }}
          >
            <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
              <Header
                title={t('roles.title')}
                subtitle={t('roles.subtitle')}
                subtitleColor="rgba(255,255,255,0.82)"
                actions={
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    style={{ background: '#ffffff', color: '#0b1c6c', borderColor: 'transparent' }}
                  >
                    {t('roles.logout')}
                  </Button>
                }
              />
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
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
                  style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.25rem', minHeight: '200px' }}
                >
                  <p style={descriptionStyle}>{t(`roles.cards.${item.key}.description`)}</p>
                  <Button
                    style={{ width: '100%', marginTop: 'auto' }}
                    onClick={
                      hasRoute
                        ? (event) => {
                            event.stopPropagation()
                            navigate(item.route!)
                          }
                        : undefined
                    }
                  >
                    {t('roles.view')}
                  </Button>
                </Card>
              )
            })}
            <Card
              title={t('roles.registrationCardTitle')}
              interactive
              onClick={() => navigate('/registration')}
              variant="glass"
              style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.25rem', minHeight: '200px' }}
            >
              <p style={descriptionStyle}>{t('roles.registrationCardSubtitle')}</p>
              <Button
                style={{ width: '100%', marginTop: 'auto' }}
                onClick={(event) => {
                  event.stopPropagation()
                  navigate('/registration')
                }}
              >
                {t('roles.view')}
              </Button>
            </Card>
            <Card
              title={t('roles.brokerPortal')}
              interactive
              onClick={() => navigate('/broker-portal')}
              variant="glass"
              style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.25rem', minHeight: '200px' }}
            >
              <p style={descriptionStyle}>{t('roles.brokerPortal')}</p>
              <Button
                style={{ width: '100%', marginTop: 'auto' }}
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
