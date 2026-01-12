import React from 'react'
import { useNavigate } from 'react-router-dom'
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
    | 'aiOnboarding'
    | 'onboarding'
    | 'identification'
    | 'regulatoryGovernance'
    | 'auditAppendix'
    | 'registration'
    | 'profile'
    | 'policyPurchase'
    | 'strategicDeepDive'
    | 'insurfoxWhitepaper'
    | 'requirementsCatalog'
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
  { key: 'registration', route: '/registration' },
  { key: 'onboarding', route: '/profile/onboarding' },
  { key: 'profile', route: '/profile' },
  { key: 'identification', route: '/user-identification' },
  { key: 'getQuote', route: '/get-quote', ctaKey: 'roles.cards.getQuote.cta' },
  { key: 'policyPurchase', route: '/policy-purchase' },
  { key: 'claimProcess', route: '/claim-process', ctaKey: 'roles.cards.claimProcess.cta' }
]

const GOVERNANCE_ITEMS: RoleItem[] = [
  { key: 'regulatoryGovernance', route: '/governance/regulatory-ai-governance' },
  { key: 'auditAppendix', route: '/governance/audit-appendix' }
]

const PRESENTATION_ITEMS: RoleItem[] = [
  { key: 'insurfoxWhitepaper', route: '/insurfox-whitepaper' },
  { key: 'strategicDeepDive', route: '/governance/strategic-deep-dive' },
  { key: 'requirementsCatalog', route: '/requirements-catalog' },
  { key: 'whitepaper', route: '/ai-whitepaper' }
]

const DEVELOPMENT_ITEMS: RoleItem[] = [
  { key: 'mvp', route: '/mvp' },
  { key: 'aiOnboarding', route: '/ai-onboarding' },
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

    const handleClick = hasRoute
      ? () => {
          navigate(item.route!)
        }
      : undefined

    return (
      <Card
        key={item.key}
        title={t(titleKey)}
        variant="glass"
        interactive={hasRoute}
        onClick={handleClick}
        className="card roles-card"
        style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0.85rem', minHeight: '150px' }}
      >
        <p style={descriptionStyle}>{t(descriptionKey)}</p>
      </Card>
    )
  }

  function renderSection(title: string, items: RoleItem[]) {
    return (
      <div className="roles-section">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <div className="roles-grid">
          {items.map((item) => renderCard(item))}
        </div>
      </div>
    )
  }

  return (
    <section className="page roles-page">
      <div className="roles-container">
        <div
          className="roles-hero"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
          }}
        >
          <div className="roles-hero-inner">
            <Header
              title={t('roles.title')}
              subtitle={t('roles.subtitle')}
              subtitleColor="rgba(255,255,255,0.82)"
            />
          </div>
        </div>
        {renderSection(t('roles.sections.overview'), OVERVIEW_ITEMS)}
        <div className="roles-divider" />
        {renderSection(t('roles.sections.processes'), PROCESS_ITEMS)}
        <div className="roles-divider" />
        {renderSection(t('roles.sections.governance'), GOVERNANCE_ITEMS)}
        <div className="roles-divider" />
        {renderSection(t('roles.sections.presentations'), PRESENTATION_ITEMS)}
        <div className="roles-divider" />
        {renderSection(t('roles.sections.development'), DEVELOPMENT_ITEMS)}
      </div>
    </section>
  )
}
