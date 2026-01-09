import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

type RoleItem = {
  key:
    | 'claims'
    | 'claimProcess'
    | 'partner'
    | 'reporting'
    | 'fleetManagement'
    | 'logistics'
    | 'featureTree'
    | 'getQuote'
    | 'mvp'
    | 'whitepaper'
    | 'intern'
    | 'brokerPortal'
  route?: string
  ctaKey?: string
}

const OVERVIEW_ITEMS: RoleItem[] = [
  { key: 'claims', route: '/claim-manager', ctaKey: 'roles.cards.claims.cta' },
  { key: 'partner', route: '/partner-management' },
  { key: 'reporting', route: '/marketing' },
  { key: 'logistics', route: '/logistics', ctaKey: 'roles.cards.logistics.cta' },
  { key: 'fleetManagement', route: '/fleet-management' },
  { key: 'brokerPortal', route: '/broker-portal' }
]

const PROCESS_ITEMS: RoleItem[] = [
  { key: 'claimProcess', route: '/claim-process', ctaKey: 'roles.cards.claimProcess.cta' },
  { key: 'getQuote', route: '/get-quote', ctaKey: 'roles.cards.getQuote.cta' }
]

const INTERNAL_ITEMS: RoleItem[] = [
  { key: 'mvp', route: '/mvp' },
  { key: 'whitepaper', route: '/ai-whitepaper' },
  { key: 'featureTree', route: '/feature-tree', ctaKey: 'roles.cards.featureTree.cta' },
  { key: 'intern', route: '/intern' }
]

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
  const navigate = useNavigate()
  const { t } = useI18n()

  function renderCard(item: RoleItem) {
    const hasRoute = Boolean(item.route)
    const titleKey = item.key === 'brokerPortal' ? 'roles.brokerPortal' : `roles.cards.${item.key}.title`
    const descriptionKey =
      item.key === 'brokerPortal' ? 'roles.brokerPortal' : `roles.cards.${item.key}.description`

    return (
      <Card
        key={item.key}
        title={t(titleKey)}
        variant="glass"
        interactive={hasRoute}
        onClick={hasRoute ? () => navigate(item.route!) : undefined}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.25rem', minHeight: '200px' }}
      >
        <p style={descriptionStyle}>{t(descriptionKey)}</p>
        <Button
          style={{ width: '100%', marginTop: 'auto', padding: '0.55rem 0.9rem', fontSize: '0.9rem', borderRadius: '999px' }}
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
  }

  function renderSection(title: string, items: RoleItem[]) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1rem'
          }}
        >
          {items.map(renderCard)}
        </div>
      </div>
    )
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
              backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`,
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
              />
            </div>
          </div>
          {renderSection(t('roles.sections.overview'), OVERVIEW_ITEMS)}
          <div style={{ height: 2, background: '#1f2a5f', width: '100%', borderRadius: 999 }} />
          {renderSection(t('roles.sections.processes'), PROCESS_ITEMS)}
          <div style={{ height: 2, background: '#1f2a5f', width: '100%', borderRadius: 999 }} />
          {renderSection(t('roles.sections.internal'), INTERNAL_ITEMS)}
        </div>
      </section>
  )
}
