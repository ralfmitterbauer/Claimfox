import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type SubRole = {
  label: string
  route: string
}

type RoleConfig = {
  title: string
  subtitle: string
  subroles: SubRole[]
}

export default function DemoRoleOverviewPage() {
  const { roleId } = useParams()
  const navigate = useNavigate()
  const { lang, t } = useI18n()

  const isEn = lang === 'en'

  const roles: Record<string, RoleConfig> = {
    underwriter: {
      title: t('roles.cards.underwriter.title'),
      subtitle: isEn ? 'Underwriting subroles' : 'Underwriter Unterrollen',
      subroles: [
        { label: 'Junior Underwriter', route: '/roles/underwriter/junior' },
        { label: 'Senior Underwriter', route: '/roles/underwriter/senior' },
        { label: 'Carrier UW', route: '/roles/underwriter/carrier' },
        { label: 'Compliance', route: '/roles/underwriter/compliance' },
        { label: isEn ? 'Underwriter Reporting' : 'Underwriter Reporting', route: '/roles/underwriter/reporting' }
      ]
    },
    legal: {
      title: t('roles.cards.legal.title'),
      subtitle: isEn ? 'Legal subroles' : 'Legal Unterrollen',
      subroles: [
        { label: 'Legal Intake', route: '/roles/legal/intake' },
        { label: 'Legal Claims Specialist', route: '/roles/legal/claims-specialist' },
        { label: 'Legal Product Distribution', route: '/roles/legal/product-distribution' },
        { label: 'Legal Regulatory Compliance', route: '/roles/legal/regulatory-compliance' },
        { label: 'Legal Litigation Manager', route: '/roles/legal/litigation-manager' },
        { label: 'Legal Carrier Final Authority', route: '/roles/legal/carrier-final-authority' }
      ]
    },
    finance: {
      title: t('roles.cards.finance.title'),
      subtitle: isEn ? 'Finance subroles' : 'Finance Unterrollen',
      subroles: [
        { label: 'Finance Analyst', route: '/roles/finance/analyst' },
        { label: 'Premium & Billing Operations', route: '/roles/finance/premium-billing' },
        { label: 'Claims Finance', route: '/roles/finance/claims' },
        { label: 'Reinsurance Finance', route: '/roles/finance/reinsurance' },
        { label: 'Financial Controller', route: '/roles/finance/controller' },
        { label: 'CFO / Carrier Finance Final Authority', route: '/roles/finance/cfo-final-authority' }
      ]
    },
    claims: {
      title: t('roles.cards.claims.title'),
      subtitle: isEn ? 'Claims subroles' : 'Claims Unterrollen',
      subroles: [
        { label: isEn ? 'Claim Manager Overview' : 'Schadenmanager Übersicht', route: '/claim-manager' },
        { label: isEn ? 'Claim Manager App' : 'Schadenmanager App', route: '/claim-manager-app' },
        { label: isEn ? 'Claim Case' : 'Schadenfall', route: '/claim-manager-case' },
        { label: isEn ? 'Claim Intake (Chatbot)' : 'Schadenmeldung (Chatbot)', route: '/claim-process' }
      ]
    },
    partner: {
      title: t('roles.cards.partner.title'),
      subtitle: isEn ? 'Partner subroles' : 'Partner Unterrollen',
      subroles: [
        { label: isEn ? 'Partner Overview' : 'Partner Übersicht', route: '/partner-management-overview' },
        { label: isEn ? 'Partner Management' : 'Partner Management', route: '/partner-management' },
        { label: isEn ? 'Assistance' : 'Assistance', route: '/partner-management-assistance' },
        { label: isEn ? 'Rental' : 'Rental', route: '/partner-management-rental' },
        { label: isEn ? 'Surveyors' : 'Surveyors', route: '/partner-management-surveyors' },
        { label: isEn ? 'Major Loss' : 'Major Loss', route: '/partner-management-major-loss' },
        { label: isEn ? 'Parts' : 'Parts', route: '/partner-management-parts' }
      ]
    },
    reporting: {
      title: t('roles.cards.reporting.title'),
      subtitle: isEn ? 'Reporting subroles' : 'Reporting Unterrollen',
      subroles: [
        { label: isEn ? 'Fleet Reporting' : 'Fleet Reporting', route: '/fleet-reporting' },
        { label: isEn ? 'Marketing Landing' : 'Marketing Landing', route: '/marketing' }
      ]
    },
    'fleet-management': {
      title: t('roles.cards.fleetManagement.title'),
      subtitle: isEn ? 'Fleet subroles' : 'Fleet Unterrollen',
      subroles: [
        { label: isEn ? 'Fleet Management' : 'Fuhrparkverwaltung', route: '/fleet-management' },
        { label: isEn ? 'Fleet Reporting' : 'Fleet Reporting', route: '/fleet-reporting' }
      ]
    },
    logistics: {
      title: t('roles.cards.logistics.title'),
      subtitle: isEn ? 'Logistics subroles' : 'Logistik Unterrollen',
      subroles: [
        { label: isEn ? 'Logistics Landing' : 'Logistik Landing', route: '/logistics' },
        { label: isEn ? 'Logistics App' : 'Logistik App', route: '/logistics-app' }
      ]
    },
    broker: {
      title: t('roles.brokerPortal'),
      subtitle: isEn ? 'Broker subroles' : 'Makler Unterrollen',
      subroles: [
        { label: isEn ? 'Broker Portal' : 'Maklerportal', route: '/broker-portal' },
        { label: isEn ? 'Broker CRM' : 'Makler CRM', route: '/broker-crm' }
      ]
    }
  }

  if (!roleId || !roles[roleId]) {
    return <Navigate to="/demo" replace />
  }

  const config = roles[roleId]

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header
          title={config.title}
          subtitle={config.subtitle}
          subtitleColor="#65748b"
          actions={(
            <Button variant="secondary" disableHover onClick={() => navigate('/demo')}>
              Back to overview
            </Button>
          )}
        />

        <div className="uw-grid uw-cards">
          {config.subroles.map((subrole) => (
            <Card
              key={subrole.route}
              title={subrole.label}
              variant="glass"
              className="uw-card"
            >
              <div className="uw-card-body" style={{ gap: '0.75rem' }}>
                <Button onClick={() => navigate(subrole.route)} disableHover>
                  Demo starten
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
