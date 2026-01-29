import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'
import UnderwriterIcon from '@/assets/images/underwriter.png'
import LegalIcon from '@/assets/images/legal.png'
import InsuranceIcon from '@/assets/images/insurance_icon.png'
import FleetIcon from '@/assets/images/flotte.png'
import LogisticsIcon from '@/assets/images/logistic_icon.png'
import BrokerIcon from '@/assets/images/broker_icon.png'

export default function DemoOverviewPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [underwriterOpen, setUnderwriterOpen] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)
  const [financeOpen, setFinanceOpen] = useState(false)
  const [claimsOpen, setClaimsOpen] = useState(false)
  const [partnerOpen, setPartnerOpen] = useState(false)
  const [fleetOpen, setFleetOpen] = useState(false)
  const [logisticsOpen, setLogisticsOpen] = useState(false)
  const [brokerOpen, setBrokerOpen] = useState(false)

  const groupMeta = [
    { key: 'insurance', iconBg: 'bg-indigo-lt', accent: 'bg-indigo-lt' },
    { key: 'fleet', iconBg: 'bg-azure-lt', accent: 'bg-azure-lt' },
    { key: 'logistics', iconBg: 'bg-teal-lt', accent: 'bg-teal-lt' },
    { key: 'broker', iconBg: 'bg-orange-lt', accent: 'bg-orange-lt' }
  ]

  const overviewGroups = [
    {
      key: 'insurance',
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
      key: 'fleet',
      title: t('roles.overviewGroups.fleet'),
      items: [
        { label: 'Fahrer', roleId: 'driver-demo' },
        { label: t('roles.cards.reporting.title'), roleId: 'reporting' },
        { label: t('roles.cards.fleetManagement.title'), roleId: 'fleet-management' }
      ]
    },
    {
      key: 'logistics',
      title: t('roles.overviewGroups.logistics'),
      items: [
        { label: t('roles.cards.logistics.title'), roleId: 'logistics' }
      ]
    },
    {
      key: 'broker',
      title: t('roles.overviewGroups.broker'),
      items: [
        { label: t('roles.brokerPortal'), roleId: 'broker-crm' },
        { label: t('roles.cards.brokerAdmin.title'), roleId: 'broker-admin' }
      ]
    }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Overview</div>
                <h2 className="page-title">{t('roles.sections.overview')}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards align-items-stretch">
              {overviewGroups.map((group, index) => {
                const meta = groupMeta[index]
                return (
                <div className="col-12 col-md-6 col-xl-3" key={group.title}>
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className={group.key === 'insurance' || group.key === 'fleet' || group.key === 'logistics' || group.key === 'broker' ? 'd-inline-flex align-items-center me-2' : `avatar avatar-sm ${meta?.iconBg ?? 'bg-indigo-lt'}`}>
                          {group.key === 'insurance' ? (
                            <img src={InsuranceIcon} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                          ) : group.key === 'fleet' ? (
                            <img src={FleetIcon} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                          ) : group.key === 'logistics' ? (
                            <img src={LogisticsIcon} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                          ) : group.key === 'broker' ? (
                            <img src={BrokerIcon} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              {group.key === 'fleet' && (
                                <>
                                  <rect x="3" y="11" width="18" height="7" rx="2" />
                                  <path d="M7 11l3-5h4l3 5" />
                                  <circle cx="7.5" cy="18" r="1.5" />
                                  <circle cx="16.5" cy="18" r="1.5" />
                                </>
                              )}
                              {group.key === 'logistics' && (
                                <>
                                  <path d="M3 7h18v10H3z" />
                                  <path d="M7 7v10" />
                                  <path d="M3 12h18" />
                                </>
                              )}
                              {group.key === 'broker' && (
                                <>
                                  <path d="M6 8h12v12H6z" />
                                  <path d="M9 4h6v4H9z" />
                                  <path d="M9 12h6" />
                                </>
                              )}
                            </svg>
                          )}
                        </span>
                        <div>
                          <h3 className="card-title mb-0">{group.title}</h3>
                          <div className="text-muted fs-4">Roles</div>
                        </div>
                      </div>
                      {group.key !== 'insurance' && group.key !== 'fleet' && group.key !== 'logistics' && group.key !== 'broker' && (
                        <span className={`badge ${meta?.accent ?? 'bg-indigo-lt'}`}>
                          {group.items.length} roles
                        </span>
                      )}
                    </div>
                    <div className="list-group list-group-flush">
                      {group.items.map((role) => {
                        if (role.roleId === 'underwriter') {
                          return (
                            <React.Fragment key={role.roleId}>
                              <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                                onClick={() => setUnderwriterOpen((prev) => !prev)}
                              >
                                <span className="d-flex align-items-center gap-2">
                                  <span className="d-inline-flex align-items-center">
                                  <img src={UnderwriterIcon} alt="" style={{ width: 42, height: 42, objectFit: 'contain' }} />
                                  </span>
                                  <span className="fw-semibold">{role.label}</span>
                                </span>
                                <span className="text-blue" style={{ fontSize: '1rem', lineHeight: 1 }}>{underwriterOpen ? '▲' : '▼'}</span>
                              </button>
                              {underwriterOpen && (
                                <div className="list-group list-group-flush">
                                  {[
                                    { label: 'Junior Underwriter', to: '/demo-underwriter/junior/step/intake' },
                                    { label: 'Senior Underwriter', to: '/demo-underwriter/senior/step/intake' },
                                    { label: 'Carrier Authority', to: '/demo-underwriter/carrier/step/handover' },
                                    { label: 'Compliance', to: '/demo-underwriter/compliance/step/intake' },
                                    { label: 'Underwriter Reporting', to: '/roles/underwriter/reporting' },
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between ps-5"
                                      onClick={() => navigate(item.to)}
                                    >
                                      <span className="fw-semibold">{item.label}</span>
                                      <span className="badge bg-blue-lt text-blue">Demo</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        }

                        if (role.roleId === 'legal') {
                          return (
                            <React.Fragment key={role.roleId}>
                              <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                                onClick={() => setLegalOpen((prev) => !prev)}
                              >
                                <span className="d-flex align-items-center gap-2">
                                  <span className="d-inline-flex align-items-center">
                                    <img src={LegalIcon} alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                                  </span>
                                  <span className="fw-semibold">{role.label}</span>
                                </span>
                                <span className="text-blue" style={{ fontSize: '1rem', lineHeight: 1 }}>{legalOpen ? '▲' : '▼'}</span>
                              </button>
                              {legalOpen && (
                                <div className="list-group list-group-flush">
                                  {[
                                    { label: 'Legal Counsel', to: '/demo-legal/counsel/step/intake' },
                                    { label: 'Claims Legal', to: '/demo-legal/claims/step/intake' },
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between ps-5"
                                      onClick={() => navigate(item.to)}
                                    >
                                      <span className="fw-semibold">{item.label}</span>
                                      <span className="badge bg-blue-lt text-blue">Demo</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        }

                        if (role.roleId === 'finance') {
                          return (
                            <React.Fragment key={role.roleId}>
                              <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                                onClick={() => setFinanceOpen((prev) => !prev)}
                              >
                                <span className="d-flex align-items-center gap-2">
                                  <span className="avatar avatar-xs bg-blue-lt text-blue">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 5v14" />
                                      <path d="M5 12h14" />
                                    </svg>
                                  </span>
                                  <span className="fw-semibold">{role.label}</span>
                                </span>
                                <span className="text-blue" style={{ fontSize: '1rem', lineHeight: 1 }}>{financeOpen ? '▲' : '▼'}</span>
                              </button>
                              {financeOpen && (
                                <div className="list-group list-group-flush">
                                  {[
                                    { label: 'Finance Analyst', to: '/roles/finance/analyst' },
                                    { label: 'Premium & Billing Operations', to: '/roles/finance/premium-billing' },
                                    { label: 'Claims Finance', to: '/roles/finance/claims' },
                                    { label: 'Reinsurance Finance', to: '/roles/finance/reinsurance' },
                                    { label: 'Financial Controller', to: '/roles/finance/controller' },
                                    { label: 'CFO / Carrier Finance Final Authority', to: '/roles/finance/cfo-final-authority' },
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between ps-5"
                                      onClick={() => navigate(item.to)}
                                    >
                                      <span className="fw-semibold">{item.label}</span>
                                      <span className="badge bg-blue-lt text-blue">Demo</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        }

                        if (role.roleId === 'claims') {
                          return (
                            <React.Fragment key={role.roleId}>
                              <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                                onClick={() => setClaimsOpen((prev) => !prev)}
                              >
                                <span className="d-flex align-items-center gap-2">
                                  <span className="avatar avatar-xs bg-blue-lt text-blue">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 5v14" />
                                      <path d="M5 12h14" />
                                    </svg>
                                  </span>
                                  <span className="fw-semibold">{role.label}</span>
                                </span>
                                <span className="text-blue" style={{ fontSize: '1rem', lineHeight: 1 }}>{claimsOpen ? '▲' : '▼'}</span>
                              </button>
                              {claimsOpen && (
                                <div className="list-group list-group-flush">
                                  {[
                                    { label: 'Claim Manager Overview', to: '/claim-manager' },
                                    { label: 'Claim Manager App', to: '/claim-manager-app' },
                                    { label: 'Claim Case', to: '/claim-manager-case' },
                                    { label: 'Claim Intake (Chatbot)', to: '/claim-process' },
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between ps-5"
                                      onClick={() => navigate(item.to)}
                                    >
                                      <span className="fw-semibold">{item.label}</span>
                                      <span className="badge bg-blue-lt text-blue">Demo</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        }

                        if (role.roleId === 'partner') {
                          return (
                            <React.Fragment key={role.roleId}>
                              <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                                onClick={() => setPartnerOpen((prev) => !prev)}
                              >
                                <span className="d-flex align-items-center gap-2">
                                  <span className="avatar avatar-xs bg-blue-lt text-blue">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 5v14" />
                                      <path d="M5 12h14" />
                                    </svg>
                                  </span>
                                  <span className="fw-semibold">{role.label}</span>
                                </span>
                                <span className="text-blue" style={{ fontSize: '1rem', lineHeight: 1 }}>{partnerOpen ? '▲' : '▼'}</span>
                              </button>
                              {partnerOpen && (
                                <div className="list-group list-group-flush">
                                  {[
                                    { label: 'Partner Overview', to: '/partner-management-overview' },
                                    { label: 'Partner Management', to: '/partner-management' },
                                    { label: 'Assistance', to: '/partner-management-assistance' },
                                    { label: 'Rental', to: '/partner-management-rental' },
                                    { label: 'Surveyors', to: '/partner-management-surveyors' },
                                    { label: 'Major Loss', to: '/partner-management-major-loss' },
                                    { label: 'Parts', to: '/partner-management-parts' },
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between ps-5"
                                      onClick={() => navigate(item.to)}
                                    >
                                      <span className="fw-semibold">{item.label}</span>
                                      <span className="badge bg-blue-lt text-blue">Demo</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        }

                        if (role.roleId === 'reporting') {
                          return (
                            <React.Fragment key={role.roleId}>
                              <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                                onClick={() => setFleetOpen((prev) => !prev)}
                              >
                                <span className="d-flex align-items-center gap-2">
                                  <span className="avatar avatar-xs bg-blue-lt text-blue">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 5v14" />
                                      <path d="M5 12h14" />
                                    </svg>
                                  </span>
                                  <span className="fw-semibold">{role.label}</span>
                                </span>
                                <span className="text-blue" style={{ fontSize: '1rem', lineHeight: 1 }}>{fleetOpen ? '▲' : '▼'}</span>
                              </button>
                              {fleetOpen && (
                                <div className="list-group list-group-flush">
                                  {[
                                    { label: 'Fahrer', to: '/demo-driver/step/register' },
                                    { label: 'Fleet Reporting', to: '/fleet-reporting' },
                                    { label: 'Fleet Management', to: '/fleet-management' },
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between ps-5"
                                      onClick={() => navigate(item.to)}
                                    >
                                      <span className="fw-semibold">{item.label}</span>
                                      <span className="badge bg-blue-lt text-blue">Demo</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        }

                        if (role.roleId === 'logistics') {
                          return (
                            <React.Fragment key={role.roleId}>
                              <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                                onClick={() => setLogisticsOpen((prev) => !prev)}
                              >
                                <span className="d-flex align-items-center gap-2">
                                  <span className="avatar avatar-xs bg-blue-lt text-blue">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 5v14" />
                                      <path d="M5 12h14" />
                                    </svg>
                                  </span>
                                  <span className="fw-semibold">{role.label}</span>
                                </span>
                                <span className="text-blue" style={{ fontSize: '1rem', lineHeight: 1 }}>{logisticsOpen ? '▲' : '▼'}</span>
                              </button>
                              {logisticsOpen && (
                                <div className="list-group list-group-flush">
                                  {[
                                    { label: 'Logistics', to: '/logistics' },
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between ps-5"
                                      onClick={() => navigate(item.to)}
                                    >
                                      <span className="fw-semibold">{item.label}</span>
                                      <span className="badge bg-blue-lt text-blue">Demo</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        }

                        if (role.roleId === 'broker-crm') {
                          return (
                            <React.Fragment key={role.roleId}>
                              <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                                onClick={() => setBrokerOpen((prev) => !prev)}
                              >
                                <span className="d-flex align-items-center gap-2">
                                  <span className="avatar avatar-xs bg-blue-lt text-blue">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 5v14" />
                                      <path d="M5 12h14" />
                                    </svg>
                                  </span>
                                  <span className="fw-semibold">{role.label}</span>
                                </span>
                                <span className="text-blue" style={{ fontSize: '1rem', lineHeight: 1 }}>{brokerOpen ? '▲' : '▼'}</span>
                              </button>
                              {brokerOpen && (
                                <div className="list-group list-group-flush">
                                  {[
                                    { label: 'Broker CRM', to: '/broker-crm' },
                                    { label: 'Broker Administration', to: '/broker-admin' },
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between ps-5"
                                      onClick={() => navigate(item.to)}
                                    >
                                      <span className="fw-semibold">{item.label}</span>
                                      <span className="badge bg-blue-lt text-blue">Demo</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        }

                        return (
                          <button
                            key={role.roleId}
                            type="button"
                            className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                            onClick={() => {
                              if (role.roleId === 'driver-demo') {
                                navigate('/demo-driver/step/register')
                                return
                              }
                              navigate(`/demo/role/${role.roleId}`)
                            }}
                          >
                            <span className="d-flex align-items-center gap-2">
                              <span className="avatar avatar-xs bg-blue-lt text-blue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 5v14" />
                                  <path d="M5 12h14" />
                                </svg>
                              </span>
                              <span className="fw-semibold">{role.label}</span>
                            </span>
                            <span className="badge bg-blue-lt text-blue">Demo</span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="card-footer">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-muted">Readiness</span>
                        <span className="badge bg-green-lt">Active</span>
                      </div>
                      <div className="progress progress-sm mt-2">
                        <div className="progress-bar bg-blue" style={{ width: `${70 + index * 6}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12">
                <div className="card card-md">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="avatar avatar-lg bg-blue-lt">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 8v4l3 3" />
                          </svg>
                        </span>
                      </div>
                      <div className="col">
                        <h3 className="card-title mb-1">Enterprise-ready decision demos</h3>
                        <div className="text-muted">
                          Clear decisions, governance checkpoints, and audit trails. AI assists — humans decide.
                        </div>
                      </div>
                      <div className="col-auto">
                        <button type="button" className="btn btn-success" onClick={() => navigate('/demo/step/1')}>
                          Open decision flow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
