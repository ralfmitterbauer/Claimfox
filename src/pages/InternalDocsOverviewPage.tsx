import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import InternalDocsAuthGate from '@/components/InternalDocsAuthGate'

type RoleItem = {
  key:
    | 'regulatoryGovernance'
    | 'auditAppendix'
    | 'insurfoxWhitepaper'
    | 'businessModelAntares'
    | 'businessModelAntaresTest'
    | 'strategicDeepDive'
    | 'requirementsCatalog'
    | 'whitepaper'
    | 'questionsQic'
    | 'landingSitemap'
    | 'landingTools'
    | 'mvp'
    | 'setup'
    | 'aiOnboarding'
    | 'featureTree'
    | 'intern'
  route?: string
}

const GOVERNANCE_ITEMS: RoleItem[] = [
  { key: 'regulatoryGovernance', route: '/governance/regulatory-ai-governance' },
  { key: 'auditAppendix', route: '/governance/audit-appendix' }
]

const PRESENTATION_ITEMS: RoleItem[] = [
  { key: 'insurfoxWhitepaper', route: '/insurfox-whitepaper' },
  { key: 'businessModelAntares', route: '/business-model-antares' },
  { key: 'businessModelAntaresTest', route: '/business-model-antares-test' },
  { key: 'strategicDeepDive', route: '/governance/strategic-deep-dive' },
  { key: 'requirementsCatalog', route: '/requirements-catalog' },
  { key: 'whitepaper', route: '/ai-whitepaper' },
  { key: 'questionsQic', route: '/questions-qic' }
]

const PROJECT_LANDING_ITEMS: RoleItem[] = [
  { key: 'landingSitemap', route: '/landing/sitemap' },
  { key: 'landingTools', route: '/landing/tools' }
]

const DEVELOPMENT_ITEMS: RoleItem[] = [
  { key: 'mvp', route: '/mvp' },
  { key: 'setup', route: '/setup' },
  { key: 'aiOnboarding', route: '/ai-onboarding' },
  { key: 'featureTree', route: '/feature-tree' },
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

export default function InternalDocsOverviewPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  function renderCard(item: RoleItem) {
    const titleKey = `roles.cards.${item.key}.title`
    const descriptionKey = `roles.cards.${item.key}.description`

    return (
      <Card
        key={item.key}
        title={t(titleKey)}
        variant="glass"
        interactive={Boolean(item.route)}
        onClick={() => item.route && navigate(item.route)}
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
    <InternalDocsAuthGate>
      <section className="page roles-page">
        <div className="roles-container">
          <Header
            title={t('roles.internalDocs.title')}
            subtitle={t('roles.internalDocs.subtitle')}
            subtitleColor="#65748b"
          />
          {renderSection(t('roles.sections.governance'), GOVERNANCE_ITEMS)}
          <div className="roles-divider" />
          {renderSection(t('roles.sections.presentations'), PRESENTATION_ITEMS)}
          <div className="roles-divider" />
          {renderSection(t('roles.sections.projectLanding'), PROJECT_LANDING_ITEMS)}
          <div className="roles-divider" />
          {renderSection(t('roles.sections.development'), DEVELOPMENT_ITEMS)}
        </div>
      </section>
    </InternalDocsAuthGate>
  )
}
