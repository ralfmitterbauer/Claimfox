import React from 'react'
import { useNavigate } from 'react-router-dom'
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
        { label: 'Fahrer', roleId: 'driver-demo' },
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
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-primary" onClick={() => navigate('/demo/step/1')}>
                    Start guided demo
                  </button>
                  <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/demo-driver')}>
                    Driver journey
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              {overviewGroups.map((group, index) => (
                <div className="col-12 col-md-6 col-xl-3" key={group.title}>
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">{group.title}</h3>
                      <span className={`badge ${index % 2 === 0 ? 'bg-indigo-lt' : 'bg-azure-lt'}`}>
                        {group.items.length} roles
                      </span>
                    </div>
                    <div className="card-body d-grid gap-2">
                      {group.items.map((role, roleIndex) => (
                        <button
                          key={role.roleId}
                          type="button"
                          className={`btn btn-outline-${roleIndex % 2 === 0 ? 'primary' : 'secondary'} btn-pill`}
                          onClick={() => {
                            if (role.roleId === 'driver-demo') {
                              navigate('/demo-driver')
                              return
                            }
                            navigate(`/demo/role/${role.roleId}`)
                          }}
                        >
                          <span className="me-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 3l7 4v6c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
                              <path d="M9 12l2 2 4-4" />
                            </svg>
                          </span>
                          {role.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
