import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const demoTracks = [
  {
    id: 'underwriting',
    title: 'Underwriting Decision',
    description: 'Decide fast with clear corridors and accountable authority.',
    badges: ['AI-supported', 'Audit-ready']
  },
  {
    id: 'claims-legal',
    title: 'Claims & Legal Review',
    description: 'Resolve complex cases with explainable guidance and traceability.',
    badges: ['AI-supported', 'Audit-ready']
  },
  {
    id: 'finance-reinsurance',
    title: 'Finance & Reinsurance',
    description: 'Protect capital while keeping decisions aligned and recorded.',
    badges: ['AI-supported', 'Audit-ready']
  },
  {
    id: 'fraud-compliance',
    title: 'Fraud & Compliance',
    description: 'Surface anomalies early with governance built into every action.',
    badges: ['AI-supported', 'Audit-ready']
  }
]

const clickDummies = [
  {
    id: 'guided-flow',
    title: 'Guided Decision Flow',
    description: 'Role to audit in five clear steps.',
    cta: 'Start flow'
  },
  {
    id: 'claims-legal',
    title: 'Claims & Legal Review',
    description: 'Dispute handling with explainable guidance.',
    cta: 'Open dummy'
  },
  {
    id: 'finance-reinsurance',
    title: 'Finance & Reinsurance',
    description: 'Capital decisions with governance guardrails.',
    cta: 'Open dummy'
  },
  {
    id: 'fraud-compliance',
    title: 'Fraud & Compliance',
    description: 'Anomaly escalation with audit trail.',
    cta: 'Open dummy'
  }
]

export default function DemoOverviewPage() {
  const navigate = useNavigate()

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header
          title="Insurfox Interactive Demo"
          subtitle="Experience insurance decisions across roles - powered by AI and governance."
          subtitleColor="#65748b"
          actions={(
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button onClick={() => navigate('/demo/step/1')} disableHover>
                Start Guided Demo
              </Button>
              <Button onClick={() => navigate('/demo/step/1')} variant="secondary" disableHover>
                Jump to Role
              </Button>
            </div>
          )}
        />

        <div className="uw-section">
          <h2 className="uw-section-title">Decision storylines</h2>
          <div className="uw-grid uw-cards">
            {demoTracks.map((track) => (
              <Card
                key={track.id}
                title={track.title}
                subtitle={track.description}
                variant="glass"
                className="uw-card"
                interactive
                onClick={() => navigate('/demo/step/1')}
              >
                <div className="uw-card-body" style={{ gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {track.badges.map((badge) => (
                      <span
                        key={badge}
                        style={{
                          fontSize: '0.72rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.5rem',
                          border: '1px solid var(--ix-border)',
                          color: 'var(--ix-text-muted)'
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <Button onClick={() => navigate('/demo/step/1')} variant="secondary" disableHover>
                    Open track
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">Click dummies</h2>
          <div className="uw-grid uw-cards">
            {clickDummies.map((dummy) => (
              <Card
                key={dummy.id}
                title={dummy.title}
                subtitle={dummy.description}
                variant="glass"
                className="uw-card"
                interactive
                onClick={() => navigate('/demo/step/1')}
              >
                <div className="uw-card-body" style={{ gap: '0.75rem' }}>
                  <Button onClick={() => navigate('/demo/step/1')} variant="secondary" disableHover>
                    {dummy.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
