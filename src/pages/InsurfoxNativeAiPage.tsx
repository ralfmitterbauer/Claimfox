import React, { useEffect, useState } from 'react'
import InternAuthGate from '@/components/InternAuthGate'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import CoverImage from '@/assets/images/hero_ai_iaas.png'

type DiagramType = 'layers' | 'flow' | 'zone' | 'matrix' | 'pillars'

type SlideContent = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  footer?: string
  diagram?: DiagramType
  twoColumn?: {
    leftTitle: string
    leftItems: string[]
    rightTitle: string
    rightItems: string[]
  }
  twoLists?: {
    leftTitle: string
    leftItems: string[]
    rightTitle: string
    rightItems: string[]
  }
  numbered?: string[]
  note?: string
}

const COVER_TITLE = 'INSURFOX AI IaaS'
const DECK_TITLE = 'INSURFOX AI IaaS'
const DECK_SUBTITLE = 'AI & Data Governance Framework'

const CONTENT_SLIDES: SlideContent[] = [
  {
    title: 'Executive Summary',
    bullets: [
      'Insurfox is an AI-native Insurance IaaS enabling governable AI in regulated markets.',
      'AI & Data Governance is embedded into the architecture (not policy-only).',
      'No external AI providers; no data/model exfiltration.',
      'Full control over data, models, and decision support.'
    ],
    footer: 'Governance reduces risk and increases scalability.'
  },
  {
    title: 'Market Reality',
    bullets: [
      'Rising AI adoption in underwriting, claims, pricing.',
      'Increasing regulatory requirements (GDPR/DSGVO, BaFin, EU AI Act).',
      'External platform dependence increases operational and compliance risk.'
    ]
  },
  {
    title: 'Insurfox Core Assumption',
    paragraphs: [
      'AI is not a feature; it is a control-relevant component of insurance value creation.',
      'Therefore governance must be enforced technically, not retrofitted organizationally.'
    ]
  },
  {
    title: 'Insurfox Positioning',
    bullets: [
      'End-to-end insurance processes on one platform.',
      'Native AI embedded into process execution.',
      'Clear separation of system, AI decision support, and insurer decision authority.'
    ]
  },
  {
    title: 'Definition: AI & Data Governance',
    bullets: [
      'Controlled data flows and purpose binding.',
      'Versioned, auditable model lifecycle.',
      'Role-based access and accountability.',
      'Traceable decision support outputs.'
    ],
    diagram: 'pillars'
  },
  {
    title: 'Platform Structure',
    numbered: ['IaaS', 'Processes', 'Native AI', 'Governance Layer'],
    note: 'Governance spans all layers.',
    diagram: 'layers'
  },
  {
    title: 'Native AI as Governance Prerequisite',
    bullets: [
      'Internal training + inference environments.',
      'Model registry + versioning.',
      'No external AI APIs or third-party model hosting.'
    ],
    diagram: 'flow'
  },
  {
    title: 'Role of AI',
    bullets: [
      'Risk indicators and pricing recommendations.',
      'Fraud/anomaly detection.',
      'Portfolio and process analytics.',
      'No legally binding automated decisions.'
    ]
  },
  {
    title: 'Sensitive Data: Designed for Control',
    bullets: [
      'Health data, biometric data, location/mobility data can be processed when lawful.',
      'Processing is purpose-bound, access-restricted, and fully logged.'
    ]
  },
  {
    title: 'Sensitive Data Governance',
    bullets: [
      'Segregated data zones.',
      'Separate restricted models and pipelines.',
      'Mandatory human review.'
    ],
    diagram: 'zone'
  },
  {
    title: 'Data Sovereignty & Tenant Isolation',
    bullets: [
      'Insurer retains data ownership and governance.',
      'Tenant isolation at infrastructure level.',
      'No cross-tenant learning or model sharing.'
    ]
  },
  {
    title: 'Interfaces & Integration',
    twoLists: {
      leftTitle: 'Inbound',
      leftItems: ['Policies', 'Claims history', 'Pricing/tariff parameters', 'Optional real-time signals'],
      rightTitle: 'Outbound',
      rightItems: ['Risk indicators', 'Pricing indications', 'Fraud/anomaly alerts', 'Dashboards/reports']
    },
    diagram: 'matrix'
  },
  {
    title: 'Historical Data Requirements',
    twoLists: {
      leftTitle: 'Required',
      leftItems: ['Policy/contract data', 'Claims history', 'Claims handling/process data', 'Object/risk data'],
      rightTitle: 'Optional',
      rightItems: ['Telematics', 'Process times', 'Health programs', 'Status/event streams']
    }
  },
  {
    title: 'Governance as Economic Advantage',
    bullets: [
      'Lower regulatory and operational risk.',
      'Higher partner and supervisory trust.',
      'Scalable growth without data/control loss.',
      'Protection of AI and data IP.'
    ]
  },
  {
    title: 'Market Differentiation',
    twoColumn: {
      leftTitle: 'Typical approach',
      leftItems: ['External AI', 'Limited transparency', 'Difficult auditability'],
      rightTitle: 'Insurfox approach',
      rightItems: ['Internal AI', 'Full control', 'Audit-ready governance']
    }
  },
  {
    title: 'Summary',
    bullets: [
      'AI-native Insurance IaaS',
      'Governance-by-design architecture',
      'Safe innovation with controlled sensitive data use'
    ]
  },
  {
    title: 'Closing',
    paragraphs: ['Insurfox AI IaaS provides AI & Data Governance as infrastructure for regulated insurance markets.']
  }
]

const SLIDE_TOTAL = CONTENT_SLIDES.length + 1

function CoverSlide({ isActive }: { isActive: boolean }) {
  return (
    <div className={`deck-slide deck-cover${isActive ? ' is-active' : ''}`}>
      <div className="deck-cover-bg" style={{ backgroundImage: `url(${CoverImage})` }} />
      <div className="deck-cover-title">{COVER_TITLE}</div>
    </div>
  )
}

function Diagram({ type }: { type: DiagramType }) {
  if (type === 'layers') {
    return (
      <div className="diagram diagram-layers">
        {['IaaS', 'Processes', 'Native AI', 'Governance Layer'].map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
    )
  }

  if (type === 'flow') {
    return (
      <div className="diagram diagram-flow">
        {['Inbound', 'Feature', 'Model', 'Decision Support'].map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
    )
  }

  if (type === 'zone') {
    return (
      <div className="diagram diagram-zone">
        <div className="zone-column">
          <strong>Standard</strong>
          <span>Core risk</span>
          <span>Pricing</span>
          <span>Claims</span>
        </div>
        <div className="zone-divider" />
        <div className="zone-column">
          <strong>Sensitive</strong>
          <span>Health</span>
          <span>Biometrics</span>
          <span>Mobility</span>
        </div>
      </div>
    )
  }

  if (type === 'matrix') {
    return (
      <div className="diagram diagram-matrix">
        <div>
          <strong>Inbound</strong>
          <span>Policies</span>
          <span>Claims history</span>
          <span>Tariffs</span>
        </div>
        <div>
          <strong>Outbound</strong>
          <span>Risk indicators</span>
          <span>Pricing</span>
          <span>Alerts</span>
        </div>
      </div>
    )
  }

  return (
    <div className="diagram diagram-pillars">
      {['Data', 'Model', 'Decision', 'Audit'].map((label) => (
        <div key={label}>{label}</div>
      ))}
    </div>
  )
}

function ContentSlide({ slide, index, isActive }: { slide: SlideContent; index: number; isActive: boolean }) {
  return (
    <div className={`deck-slide${isActive ? ' is-active' : ''}`}>
      <div className="deck-slide-inner">
        <div className="deck-content">
          <div className="deck-meta">
            <span>{DECK_TITLE}</span>
            <span>{String(index + 2).padStart(2, '0')} / {String(SLIDE_TOTAL).padStart(2, '0')}</span>
          </div>
          <h1>{slide.title}</h1>
          {slide.paragraphs?.map((text) => (
            <p key={text}>{text}</p>
          ))}
          {slide.bullets && (
            <ul>
              {slide.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
          {slide.numbered && (
            <ol>
              {slide.numbered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
          {slide.twoLists && (
            <div className="deck-columns">
              <div>
                <strong>{slide.twoLists.leftTitle}</strong>
                <ul>
                  {slide.twoLists.leftItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>{slide.twoLists.rightTitle}</strong>
                <ul>
                  {slide.twoLists.rightItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {slide.twoColumn && (
            <div className="deck-compare">
              <div>
                <strong>{slide.twoColumn.leftTitle}</strong>
                <ul>
                  {slide.twoColumn.leftItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>{slide.twoColumn.rightTitle}</strong>
                <ul>
                  {slide.twoColumn.rightItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {slide.note && <div className="deck-note">{slide.note}</div>}
          {slide.footer && <div className="deck-footer">{slide.footer}</div>}
        </div>
        <div className="deck-aside">
          <div className="deck-aside-card">
            {slide.diagram ? <Diagram type={slide.diagram} /> : <div className="deck-divider" />}
          </div>
          <div className="deck-aside-caption">
            <span>{DECK_SUBTITLE}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InsurfoxNativeAiPage() {
  const [activeSlide, setActiveSlide] = useState(0)

  function goToSlide(nextIndex: number) {
    setActiveSlide(Math.max(0, Math.min(nextIndex, SLIDE_TOTAL - 1)))
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
        goToSlide(SLIDE_TOTAL - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlide])

  return (
    <InternAuthGate>
      <section className="page deck-page">
        <div className="deck-shell">
          {activeSlide !== 0 && (
            <div className="deck-header">
              <Header title={DECK_TITLE} subtitle={DECK_SUBTITLE} subtitleColor="#65748b" />
            </div>
          )}
          <div className="deck-slider">
            <div className="deck-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              <CoverSlide isActive={activeSlide === 0} />
              {CONTENT_SLIDES.map((slide, index) => (
                <ContentSlide key={slide.title} slide={slide} index={index} isActive={activeSlide === index + 1} />
              ))}
            </div>
            <div className="deck-nav">
              <Button variant="secondary" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}>
                ←
              </Button>
              <div className="deck-dots">
                {Array.from({ length: SLIDE_TOTAL }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === activeSlide ? 'deck-dot active' : 'deck-dot'}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
              <Button variant="secondary" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide === SLIDE_TOTAL - 1}>
                →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
