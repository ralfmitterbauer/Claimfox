import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

type SubRole = {
  label: string
  route: string
  demoKey?: string
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
        { label: 'Junior Underwriter', route: '/roles/underwriter/junior', demoKey: 'uw-junior' },
        { label: 'Senior Underwriter', route: '/roles/underwriter/senior', demoKey: 'uw-senior' },
        { label: 'Carrier UW', route: '/roles/underwriter/carrier', demoKey: 'uw-carrier' },
        { label: 'Compliance', route: '/roles/underwriter/compliance', demoKey: 'uw-compliance' },
        { label: isEn ? 'Underwriter Reporting' : 'Underwriter Reporting', route: '/roles/underwriter/reporting', demoKey: 'uw-reporting' }
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
    'broker-crm': {
      title: t('roles.brokerPortal'),
      subtitle: isEn ? 'Broker CRM subroles' : 'Broker CRM Unterrollen',
      subroles: [
        { label: t('roles.brokerPortal'), route: '/broker-crm' }
      ]
    },
    'broker-admin': {
      title: t('roles.cards.brokerAdmin.title'),
      subtitle: isEn ? 'Broker administration subroles' : 'Broker Verwaltung Unterrollen',
      subroles: [
        { label: t('roles.cards.brokerAdmin.title'), route: '/broker-admin' }
      ]
    }
  }

  if (!roleId || !roles[roleId]) {
    return <Navigate to="/demo" replace />
  }

  const config = roles[roleId]
  const showContext = roleId === 'underwriter'
  const underwriterContext = showContext
    ? [
        {
          label: 'Junior Underwriter',
          decision: 'Risiken im Korridor freigeben.',
          accountability: 'Evidenzqualität und SLA-Einhaltung.',
          selected: true
        },
        {
          label: 'Senior Underwriter',
          decision: 'Overrides mit Governance-Freigabe.',
          accountability: 'Portfolio-Impact und Eskalationslogik.'
        },
        {
          label: 'Carrier Authority',
          decision: 'finale Kapazitäts- und Limitfreigaben.',
          accountability: 'Risikotragung und regulatorische Konformität.'
        },
        {
          label: 'Compliance',
          decision: 'Regel- und Audit-Integrität prüfen.',
          accountability: 'Audit-Trail und Governance-Disziplin.'
        },
        {
          label: 'Underwriter Reporting',
          decision: 'Portfolio- und Referral-Transparenz steuern.',
          accountability: 'Entscheidungsqualität und Reporting-Standards.'
        }
      ]
    : []
  const underwriterDescriptions = showContext
    ? underwriterContext.reduce<Record<string, { decision: string; accountability: string }>>((acc, role) => {
        const key = role.label.toLowerCase().replace(/\s+/g, '-')
        acc[key] = { decision: role.decision, accountability: role.accountability }
        return acc
      }, {})
    : {}

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Role overview</div>
                <h2 className="page-title">{config.title}</h2>
                <div className="text-muted">{config.subtitle}</div>
              </div>
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/demo')}>
                    Back to overview
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => navigate('/demo/step/1')}>
                    Start demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            {showContext && (
              <div className="row row-cards mb-3">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="avatar avatar-sm bg-indigo-lt">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3l7 4v6c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
                            <path d="M9 12l2 2 4-4" />
                          </svg>
                        </span>
                        <h3 className="card-title mb-0">Role context</h3>
                      </div>
                      <span className="badge bg-indigo-lt">Management summary</span>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        {underwriterContext.map((role) => (
                          <div className="col-12 col-md-6 col-xl-4" key={role.label}>
                            <div className="card card-sm h-100">
                              <div className="card-body d-flex flex-column gap-2">
                                <div className="d-flex align-items-center justify-content-between">
                                  <strong>{role.label}</strong>
                                  {role.selected && <span className="badge bg-azure-lt">Selected</span>}
                                </div>
                                <div className="text-muted">
                                  <span className="text-secondary text-uppercase me-1">Decides</span>
                                  {role.decision}
                                </div>
                                <div className="text-muted">
                                  <span className="text-secondary text-uppercase me-1">Accountable</span>
                                  {role.accountability}
                                </div>
                                <div className="progress progress-sm mt-1">
                                  <div className="progress-bar bg-indigo" style={{ width: role.selected ? '86%' : '62%' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-muted">
                        This role decides on Risiken im Korridor freigeben and is accountable for Evidenzqualität und SLA-Einhaltung.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row row-cards">
              {config.subroles.map((subrole, index) => {
                const targetRoute = subrole.demoKey ? `/demo/step/1?role=${subrole.demoKey}` : '/demo/step/1'
                const descriptionKey = showContext
                  ? subrole.label.toLowerCase().replace(/\s+/g, '-')
                  : ''
                const description = showContext ? underwriterDescriptions[descriptionKey] : undefined
                const badgeClass = index % 2 === 0 ? 'bg-green-lt' : 'bg-blue-lt'
                return (
                  <div className="col-12 col-md-6 col-xl-3" key={subrole.route}>
                    <div className="card card-md h-100">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <span className={`avatar avatar-sm ${badgeClass}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 7v10" />
                              <path d="M7 12h10" />
                            </svg>
                          </span>
                          <h3 className="card-title mb-0">{subrole.label}</h3>
                        </div>
                        <span className={`badge ${badgeClass}`}>Demo</span>
                      </div>
                      <div className="card-body d-flex flex-column gap-2">
                        {description && (
                          <>
                            <div className="text-muted">
                              <span className="text-secondary text-uppercase me-1">Decides</span>
                              {description.decision}
                            </div>
                            <div className="text-muted">
                              <span className="text-secondary text-uppercase me-1">Accountable</span>
                              {description.accountability}
                            </div>
                          </>
                        )}
                        {!description && (
                          <div className="text-muted">
                            Start the guided demo flow (no data captured).
                          </div>
                        )}
                        <div className="progress progress-sm mt-2">
                          <div className={`progress-bar ${index % 2 === 0 ? 'bg-green' : 'bg-blue'}`} style={{ width: `${68 + index * 4}%` }} />
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={() => navigate(targetRoute)}
                        >
                          Demo starten
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
