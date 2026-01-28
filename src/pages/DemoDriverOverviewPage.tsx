import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DemoDriverOverviewPage() {
  const navigate = useNavigate()

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
              {[
                { title: 'Steps', value: '6', note: 'Registration to summary', color: 'bg-blue-lt' },
                { title: 'Audience', value: 'Driver', note: 'Claims journey', color: 'bg-indigo-lt' },
                { title: 'Mode', value: 'Demo', note: 'No login required', color: 'bg-azure-lt' },
                { title: 'Channel', value: 'Chat + Upload', note: 'HITL support', color: 'bg-teal-lt' },
                { title: 'Response SLA', value: '24h', note: 'Initial response', color: 'bg-red-lt' },
                { title: 'Status', value: 'Ready', note: 'Start the demo', color: 'bg-green-lt' }
              ].map((item) => (
                <div className="col-6 col-md-4 col-xl-2" key={item.title}>
                  <div className="card">
                    <div className="card-body">
                      <span className={`badge ${item.color}`}>{item.title}</span>
                      <div className="mt-2 fw-bold">{item.value}</div>
                      <div className="text-muted">{item.note}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row row-cards mt-2">
              <div className="col-12 col-xl-8">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Step overview</h3>
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
                          <td>Registration</td>
                          <td>Demo ready</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Profile completion</td>
                          <td>Prefilled</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>FNOL claim</td>
                          <td>Chat-based</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Evidence upload</td>
                          <td>Attached</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Chat support</td>
                          <td>HITL</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>Summary</td>
                          <td>Audit-ready</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Snapshot</h3>
                    <span className="badge bg-yellow-lt">HITL</span>
                  </div>
                  <div className="card-body">
                    <div className="fw-bold">Driver journey demo</div>
                    <div className="text-muted">Pre-filled data, no manual input required.</div>
                    <div className="text-muted">AI suggestion — requires human review</div>
                    <div className="text-muted">Insurance communication shown</div>
                    <div className="mt-3">
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
                  <div className="card-header">
                    <h3 className="card-title">AI & HITL</h3>
                    <span className="badge bg-orange-lt">Human review</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">AI triages the intake, humans approve the outcome.</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Governance</h3>
                    <span className="badge bg-indigo-lt">Audit trail</span>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Decision accountability stays with the carrier.</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Communication</h3>
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
                  <div className="card-header">
                    <h3 className="card-title">Audit log</h3>
                    <span className="badge bg-green-lt">Demo</span>
                  </div>
                  <div className="card-body">
                    <div>Demo created</div>
                    <div>Driver journey staged</div>
                    <div>HITL checkpoints defined</div>
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
