import React, { useEffect, useState } from 'react'
import InternAuthGate from '@/components/InternAuthGate'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'

type SlideContent = {
  title: string
  bullets: string[]
  footer?: string
}

const SLIDES: SlideContent[] = [
  {
    title: 'Purpose and Regulatory Scope',
    bullets: [
      'This presentation describes the Regulatory & AI Governance Framework of the Insurfox AI IaaS.',
      'It focuses on the controlled use of artificial intelligence within insurance processes.',
      'The intended audience includes supervisory authorities, insurers, reinsurers, and auditors.'
    ],
    footer: 'Scope: Insurance, Health Insurance, Mobility, InsurTech'
  },
  {
    title: 'Regulatory Landscape',
    bullets: [
      'GDPR / DSGVO',
      'BaFin supervisory requirements',
      'EU AI Act (High-Risk AI Systems)',
      'EIOPA guidelines on AI and digitalisation',
      'Lloyd’s minimum standards'
    ]
  },
  {
    title: 'Role of Insurfox',
    bullets: [
      'Insurfox operates as a technology and process platform.',
      'Insurfox is not the risk carrier.',
      'Final underwriting and claims decisions remain with the insurer or reinsurer.',
      'Insurfox provides decision support only.'
    ]
  },
  {
    title: 'AI Usage Classification',
    bullets: [
      'AI is used for decision support, not for autonomous decision-making.',
      'Risk indication, pricing recommendations, fraud detection.',
      'Human-in-the-loop is mandatory for all material decisions.'
    ]
  },
  {
    title: 'AI Governance Framework',
    bullets: [
      'Defined AI use cases and boundaries.',
      'Model lifecycle management.',
      'Version control and traceability.',
      'Clear accountability between system, AI, and insurer.'
    ]
  },
  {
    title: 'Data Governance Principles',
    bullets: [
      'Purpose limitation.',
      'Data minimisation.',
      'Lawful processing.',
      'Role-based access control.',
      'Audit logging.'
    ]
  },
  {
    title: 'Handling of Sensitive Data',
    bullets: [
      'Health data, biometric data and location data may be processed where legally permitted.',
      'Processing requires explicit consent or statutory insurance obligations.',
      'Additional safeguards apply to sensitive data.'
    ]
  },
  {
    title: 'Sensitive Data Controls',
    bullets: [
      'Segregated data domains.',
      'Restricted access to models.',
      'Separate processing pipelines.',
      'Enhanced logging and review requirements.'
    ]
  },
  {
    title: 'Model Management and Explainability',
    bullets: [
      'All models are versioned and documented.',
      'Training data sources are recorded.',
      'Outputs are explainable.',
      'Model changes follow controlled release procedures.'
    ]
  },
  {
    title: 'Human Oversight',
    bullets: [
      'AI outputs are recommendations only.',
      'Final decisions are made by authorised insurance staff.',
      'Override and review mechanisms are enforced.'
    ]
  },
  {
    title: 'Auditability and Traceability',
    bullets: [
      'Input data is logged.',
      'Model version is logged.',
      'Output and timestamp are logged.',
      'User interactions are logged.'
    ],
    footer: 'Retention aligned with regulatory requirements.'
  },
  {
    title: 'Outsourcing and Third-Party Risk',
    bullets: [
      'No external AI service providers.',
      'No transfer of training or inference data to third parties.',
      'No dependency on external foundation models.'
    ]
  },
  {
    title: 'Data Residency and Sovereignty',
    bullets: [
      'Data residency configurable per jurisdiction.',
      'No cross-tenant data usage.',
      'Insurers retain full data ownership.'
    ]
  },
  {
    title: 'Security Measures',
    bullets: [
      'Logical tenant isolation.',
      'Encryption at rest and in transit.',
      'Access monitoring and logging.',
      'Incident response processes.'
    ]
  },
  {
    title: 'Compliance Monitoring',
    bullets: [
      'Continuous internal monitoring.',
      'Review of AI usage.',
      'Change management procedures.',
      'Documentation for supervisory review.'
    ]
  },
  {
    title: 'EU AI Act Alignment',
    bullets: [
      'High-risk AI system requirements addressed.',
      'Risk management and human oversight enforced.',
      'Transparency and auditability ensured.'
    ]
  },
  {
    title: 'Summary',
    bullets: [
      'Controlled AI usage within insurance processes.',
      'Governance enforced by system architecture.',
      'Clear allocation of responsibility and accountability.'
    ]
  },
  {
    title: 'Closing Statement',
    bullets: [
      'Insurfox AI IaaS provides Regulatory & AI Governance as infrastructure for regulated insurance markets.'
    ]
  }
]

const TOTAL_SLIDES = SLIDES.length

export default function RegulatoryGovernancePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  function goToSlide(nextIndex: number) {
    setActiveSlide(Math.max(0, Math.min(nextIndex, TOTAL_SLIDES - 1)))
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        goToSlide(activeSlide + 1)
      }
      if (event.key === 'ArrowLeft') {
        goToSlide(activeSlide - 1)
      }
      if (event.key === 'Home') {
        goToSlide(0)
      }
      if (event.key === 'End') {
        goToSlide(TOTAL_SLIDES - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlide])

  return (
    <InternAuthGate>
      <section className="page deck-page">
        <div className="deck-shell">
          <div className="deck-header">
            <Header
              title="Regulatory & AI Governance Framework"
              subtitle="Oversight, Control and Accountability for AI in Insurance"
              subtitleColor="#65748b"
            />
          </div>
          <div className="deck-slider">
            <div className="deck-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {SLIDES.map((slide, index) => (
                <div key={slide.title} className={`deck-slide${activeSlide === index ? ' is-active' : ''}`}>
                  <div className="deck-slide-inner">
                    <div className="deck-content">
                      <div className="deck-meta">
                        <span>INSURFOX AI IaaS</span>
                        <span>
                          {String(index + 1).padStart(2, '0')} / {String(TOTAL_SLIDES).padStart(2, '0')}
                        </span>
                      </div>
                      <h1>{slide.title}</h1>
                      <ul>
                        {slide.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                      {slide.footer && <div className="deck-footer">{slide.footer}</div>}
                    </div>
                    <div className="deck-aside">
                      <div className="deck-aside-card">
                        <div className="deck-divider" />
                      </div>
                      <div className="deck-aside-caption">
                        <span>Regulatory deck</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="deck-nav">
              <button
                type="button"
                className="deck-arrow"
                onClick={() => goToSlide(activeSlide - 1)}
                disabled={activeSlide === 0}
                aria-label="Previous slide"
              >
                ←
              </button>
              <div className="deck-dots">
                {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === activeSlide ? 'deck-dot active' : 'deck-dot'}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className="deck-arrow"
                onClick={() => goToSlide(activeSlide + 1)}
                disabled={activeSlide === TOTAL_SLIDES - 1}
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
