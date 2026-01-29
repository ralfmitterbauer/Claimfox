import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DemoDriverOverviewPage() {
  const navigate = useNavigate()
  const kpis = [
    {
      title: 'Steps',
      value: '8',
      note: 'Register to chat support',
      color: 'bg-blue-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      )
    },
    {
      title: 'Audience',
      value: 'Driver',
      note: 'Claims journey',
      color: 'bg-indigo-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      )
    },
    {
      title: 'Mode',
      value: 'Demo',
      note: 'No login required',
      color: 'bg-azure-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 4v6c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
        </svg>
      )
    },
    {
      title: 'Channel',
      value: 'Guided demo',
      note: 'Click-only journey',
      color: 'bg-teal-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 3 1.5-4.5A8.5 8.5 0 1 1 21 11.5z" />
        </svg>
      )
    },
    {
      title: 'Response SLA',
      value: '24h',
      note: 'Initial response',
      color: 'bg-red-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    },
    {
      title: 'Status',
      value: 'Ready',
      note: 'Start the demo',
      color: 'bg-green-lt',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" />
          <path d="M12 3l7 4v6c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
        </svg>
      )
    }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Driver journey</div>
                <h2 className="page-title">Driver Journey Demo</h2>
                <div className="text-muted">
                  Register, complete your profile, report a claim — and see how chat supports you.
                </div>
              </div>
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-primary" onClick={() => navigate('/demo-driver/step/register')}>
                    Start demo
                  </button>
                  <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/demo')}>
                    Back to overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              {kpis.map((item, index) => (
                <div className="col-6 col-md-4 col-xl-2" key={item.title}>
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column gap-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className={`avatar avatar-sm ${item.color}`}>{item.icon}</span>
                        <span className={`badge ${item.color}`}>{item.title}</span>
                      </div>
                      <div className="fw-bold">{item.value}</div>
                      <div className="text-muted">{item.note}</div>
                      <div className="progress progress-sm mt-1">
                        <div className={`progress-bar ${index % 2 === 0 ? 'bg-blue' : 'bg-green'}`} style={{ width: `${64 + index * 5}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12 col-xl-8">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-blue-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 6h16" />
                          <path d="M4 12h16" />
                          <path d="M4 18h16" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Step overview</h3>
                    </div>
                    <span className="badge bg-blue-lt">Journey</span>
                  </div>
                  <div className="table-responsive">
                    <table className="table card-table table-vcenter">
                      <thead>
                        <tr>
                          <th>Step</th>
                          <th>Focus</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Register</td>
                          <td>Prefilled</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Onboarding</td>
                          <td>Guided</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Profile</td>
                          <td>Validated</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Identification</td>
                          <td>HITL check</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Quote</td>
                          <td>Carrier aligned</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>Purchase</td>
                          <td>Activate policy</td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>Claims (FNOL)</td>
                          <td>Structured intake</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>Chat support</td>
                          <td>HITL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-yellow-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16v16H4z" />
                          <path d="M8 4v16" />
                          <path d="M4 9h16" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Snapshot</h3>
                    </div>
                    <span className="badge bg-yellow-lt">HITL</span>
                  </div>
                  <div className="card-body d-flex flex-column gap-2">
                    <div className="fw-bold">Driver journey demo</div>
                    <div className="text-muted">Pre-filled data, no manual input required.</div>
                    <div className="text-muted">AI suggestion — requires human review</div>
                    <div className="text-muted">Insurance communication shown</div>
                    <div className="mt-2">
                      <svg width="100%" height="72" viewBox="0 0 240 72" fill="none">
                        <rect x="0" y="8" width="50" height="56" rx="6" fill="#e0e7ff" />
                        <rect x="60" y="20" width="50" height="44" rx="6" fill="#dbeafe" />
                        <rect x="120" y="12" width="50" height="52" rx="6" fill="#cffafe" />
                        <rect x="180" y="28" width="50" height="36" rx="6" fill="#dcfce7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-orange-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3v6" />
                          <path d="M12 15v6" />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">AI & HITL</h3>
                    </div>
                    <span className="badge bg-orange-lt">Human review</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">AI triages the intake, humans approve the outcome.</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-indigo-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3l7 4v6c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Governance</h3>
                    </div>
                    <span className="badge bg-indigo-lt">Audit trail</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Decision accountability stays with the carrier.</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-teal-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 3 1.5-4.5A8.5 8.5 0 1 1 21 11.5z" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Communication</h3>
                    </div>
                    <span className="badge bg-teal-lt">Chat</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Driver + insurance chat with clear next steps.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar avatar-sm bg-green-lt">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 7h16" />
                          <path d="M4 12h16" />
                          <path d="M4 17h16" />
                        </svg>
                      </span>
                      <h3 className="card-title mb-0">Audit log</h3>
                    </div>
                    <span className="badge bg-green-lt">Demo</span>
                  </div>
                  <div className="card-body d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-blue-lt">Log</span>
                      <span>Demo created</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-blue-lt">Log</span>
                      <span>Driver journey staged</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-blue-lt">Log</span>
                      <span>HITL checkpoints defined</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info mt-3" role="alert">
              Demo data only. AI suggestions require human review.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
