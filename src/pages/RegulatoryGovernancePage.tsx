import React, { useEffect, useMemo, useRef, useState } from 'react'
import InternAuthGate from '@/components/InternAuthGate'
import Header from '@/components/ui/Header'
import GovernanceImage from '@/assets/images/hero_ai_iaas.png'
import { useI18n } from '@/i18n/I18nContext'
import { translations, type Lang } from '@/i18n/translations'

type SlideSection = {
  heading: string
  bullets?: string[]
  text?: string
  table?: { headers: [string, string]; rows: [string, string][] }
}

type SlideContent = {
  id: number
  title: string
  intro: string
  sections: SlideSection[]
  footer?: string
}

function getSlides(lang: Lang): SlideContent[] {
  if (lang === 'de') {
    return [
      {
        id: 1,
        title: 'Purpose, Scope and Regulatory Landscape',
        intro:
          'Diese Präsentation beschreibt das Regulatory & AI Governance Framework der Insurfox AI IaaS. Fokus ist der kontrollierte KI-Einsatz in Versicherungsprozessen für eine aufsichts- und auditfähige Umsetzung.',
        sections: [
          {
            heading: 'Scope',
            bullets: ['Versicherung', 'Krankenversicherung', 'Mobility', 'InsurTech']
          },
          {
            heading: 'Regulatory frameworks',
            bullets: ['GDPR/DSGVO', 'BaFin', 'EU AI Act', 'EIOPA', 'Lloyd’s Standards']
          },
          {
            heading: 'Intended audience',
            bullets: ['Supervisory authorities', 'Insurers & reinsurers', 'Auditors']
          }
        ],
        footer: 'Scope: Insurance, Health, Mobility, InsurTech'
      },
      {
        id: 2,
        title: 'Roles, Accountability and Decision Authority',
        intro:
          'Insurfox agiert als Technologie- und Prozessplattform und ist nicht der Risikoträger. Entscheidungen mit Rechtswirkung verbleiben beim Versicherer.',
        sections: [
          {
            heading: 'Role allocation',
            bullets: ['Provider: Insurfox Plattformbetrieb', 'Deployer: Versicherer und Rückversicherer']
          },
          {
            heading: 'Decision authority',
            bullets: ['Human-in-the-Loop verpflichtend', 'Keine autonomen, bindenden Entscheidungen']
          },
          {
            heading: 'Responsibility allocation',
            table: {
              headers: ['Responsibility', 'Assigned to'],
              rows: [
                ['Platform operation & controls', 'Insurfox'],
                ['Underwriting & claims decision', 'Insurer'],
                ['Risk acceptance & pricing', 'Insurer'],
                ['Compliance reporting', 'Insurer (with Insurfox support)']
              ]
            }
          }
        ]
      },
      {
        id: 3,
        title: 'AI Governance Framework',
        intro:
          'Governance verbindet Policy, Model Lifecycle und operative Aufsicht. Der Fokus liegt auf nachvollziehbarer Nutzung und kontrollierten Releases.',
        sections: [
          {
            heading: 'Permitted AI usage',
            bullets: ['Decision support only', 'Risk/pricing recommendations', 'Fraud/anomaly detection']
          },
          {
            heading: 'Model lifecycle governance',
            bullets: ['Registry & versioning', 'Controlled release process', 'Documented training sources']
          },
          {
            heading: 'Explainability',
            bullets: ['Score-level explainability', 'Documented rationale & features']
          },
          {
            heading: 'Human oversight',
            bullets: ['Review & override', 'Escalation paths for material decisions']
          }
        ]
      },
      {
        id: 4,
        title: 'Data Governance and Sensitive Data Controls',
        intro:
          'Datensouveränität wird durch klare Prinzipien, rechtliche Grundlagen und technische Kontrollen abgesichert.',
        sections: [
          {
            heading: 'Data governance principles',
            bullets: ['Purpose limitation', 'Data minimisation', 'Lawful processing', 'Role-based access control']
          },
          {
            heading: 'Sensitive data handling',
            bullets: [
              'Health, biometric and location data where legally permitted',
              'Lawful basis: consent or statutory obligation',
              'Enhanced safeguards for sensitive data'
            ]
          },
          {
            heading: 'Controls',
            bullets: ['Segregated domains', 'Restricted access', 'Separate pipelines', 'Enhanced review']
          },
          {
            heading: 'Control levels',
            table: {
              headers: ['Standard controls', 'Additional for sensitive data'],
              rows: [
                ['RBAC, logging, encryption', 'Restricted model access'],
                ['Tenant isolation', 'Separate processing pipelines'],
                ['Retention policies', 'Mandatory human review']
              ]
            }
          }
        ]
      },
      {
        id: 5,
        title: 'Auditability, Traceability and Record-Keeping',
        intro:
          'Auditierbarkeit basiert auf vollständigen Logs, nachvollziehbaren Modellständen und dokumentierten Entscheidungen.',
        sections: [
          {
            heading: 'What is logged',
            bullets: ['Input data', 'Model version', 'Output score', 'Timestamp', 'User interaction']
          },
          {
            heading: 'Evidence matrix',
            table: {
              headers: ['Event', 'Recorded fields'],
              rows: [
                ['Input', 'Schema, source, timestamp'],
                ['Model execution', 'Model ID, version, parameters'],
                ['Output', 'Score, confidence, rationale'],
                ['User action', 'Reviewer, decision, timestamp']
              ]
            }
          },
          {
            heading: 'Retention & supervisory evidence',
            text: 'Retention aligned with regulatory requirements and supervisory review readiness.'
          }
        ]
      },
      {
        id: 6,
        title: 'Third-Party Risk, Security and EU AI Act Alignment',
        intro:
          'Sicherheitsmaßnahmen und EU-AI-Act-Konformität sind integraler Bestandteil der Infrastruktur.',
        sections: [
          {
            heading: 'Third-party risk & outsourcing',
            bullets: ['No external AI providers', 'No transfer of training/inference data', 'No foundation model dependency']
          },
          {
            heading: 'Security measures',
            bullets: ['Tenant isolation', 'Encryption at rest/in transit', 'Monitoring & logging', 'Incident response']
          },
          {
            heading: 'Data residency & sovereignty',
            bullets: ['Jurisdiction configurable', 'Insurer retains ownership', 'No cross-tenant usage']
          },
          {
            heading: 'EU AI Act alignment',
            bullets: ['Risk management', 'Transparency', 'Human oversight', 'Logging & auditability']
          }
        ]
      }
    ]
  }

  return [
    {
      id: 1,
      title: 'Purpose, Scope and Regulatory Landscape',
      intro:
        'This presentation describes the Regulatory & AI Governance Framework of the Insurfox AI IaaS. It focuses on controlled AI use within insurance processes for supervisory and audit readiness.',
      sections: [
        {
          heading: 'Scope',
          bullets: ['Insurance', 'Health Insurance', 'Mobility', 'InsurTech']
        },
        {
          heading: 'Regulatory frameworks',
          bullets: ['GDPR/DSGVO', 'BaFin', 'EU AI Act', 'EIOPA', 'Lloyd’s standards']
        },
        {
          heading: 'Intended audience',
          bullets: ['Supervisory authorities', 'Insurers & reinsurers', 'Auditors']
        }
      ],
      footer: 'Scope: Insurance, Health, Mobility, InsurTech'
    },
    {
      id: 2,
      title: 'Roles, Accountability and Decision Authority',
      intro:
        'Insurfox operates as a technology and process platform and is not the risk carrier. Binding decisions remain with the insurer.',
      sections: [
        {
          heading: 'Role allocation',
          bullets: ['Provider: Insurfox platform operations', 'Deployer: insurers and reinsurers']
        },
        {
          heading: 'Decision authority',
          bullets: ['Human-in-the-loop mandatory', 'No autonomous binding decisions']
        },
        {
          heading: 'Responsibility allocation',
          table: {
            headers: ['Responsibility', 'Assigned to'],
            rows: [
              ['Platform operation & controls', 'Insurfox'],
              ['Underwriting & claims decision', 'Insurer'],
              ['Risk acceptance & pricing', 'Insurer'],
              ['Compliance reporting', 'Insurer (with Insurfox support)']
            ]
          }
        }
      ]
    },
    {
      id: 3,
      title: 'AI Governance Framework',
      intro:
        'Governance connects policy, model lifecycle, and operational oversight with controlled releases and clear accountability.',
      sections: [
        {
          heading: 'Permitted AI usage',
          bullets: ['Decision support only', 'Risk/pricing recommendations', 'Fraud/anomaly detection']
        },
        {
          heading: 'Model lifecycle governance',
          bullets: ['Registry & versioning', 'Controlled release process', 'Documented training sources']
        },
        {
          heading: 'Explainability',
          bullets: ['Score-level explainability', 'Documented rationale & features']
        },
        {
          heading: 'Human oversight',
          bullets: ['Review & override', 'Escalation paths for material decisions']
        }
      ]
    },
    {
      id: 4,
      title: 'Data Governance and Sensitive Data Controls',
      intro:
        'Data sovereignty is ensured through clear principles, lawful bases, and technical controls.',
      sections: [
        {
          heading: 'Data governance principles',
          bullets: ['Purpose limitation', 'Data minimisation', 'Lawful processing', 'Role-based access control']
        },
        {
          heading: 'Sensitive data handling',
          bullets: [
            'Health, biometric and location data where legally permitted',
            'Lawful basis: consent or statutory obligation',
            'Enhanced safeguards for sensitive data'
          ]
        },
        {
          heading: 'Controls',
          bullets: ['Segregated domains', 'Restricted access', 'Separate pipelines', 'Enhanced review']
        },
        {
          heading: 'Control levels',
          table: {
            headers: ['Standard controls', 'Additional for sensitive data'],
            rows: [
              ['RBAC, logging, encryption', 'Restricted model access'],
              ['Tenant isolation', 'Separate processing pipelines'],
              ['Retention policies', 'Mandatory human review']
            ]
          }
        }
      ]
    },
    {
      id: 5,
      title: 'Auditability, Traceability and Record-Keeping',
      intro:
        'Auditability is built on complete logs, traceable model states, and documented decisions.',
      sections: [
        {
          heading: 'What is logged',
          bullets: ['Input data', 'Model version', 'Output score', 'Timestamp', 'User interaction']
        },
        {
          heading: 'Evidence matrix',
          table: {
            headers: ['Event', 'Recorded fields'],
            rows: [
              ['Input', 'Schema, source, timestamp'],
              ['Model execution', 'Model ID, version, parameters'],
              ['Output', 'Score, confidence, rationale'],
              ['User action', 'Reviewer, decision, timestamp']
            ]
          }
        },
        {
          heading: 'Retention & supervisory evidence',
          text: 'Retention aligned with regulatory requirements and supervisory review readiness.'
        }
      ]
    },
    {
      id: 6,
      title: 'Third-Party Risk, Security and EU AI Act Alignment',
      intro:
        'Security measures and EU AI Act alignment are embedded in the infrastructure design.',
      sections: [
        {
          heading: 'Third-party risk & outsourcing',
          bullets: ['No external AI providers', 'No transfer of training/inference data', 'No foundation model dependency']
        },
        {
          heading: 'Security measures',
          bullets: ['Tenant isolation', 'Encryption at rest/in transit', 'Monitoring & logging', 'Incident response']
        },
        {
          heading: 'Data residency & sovereignty',
          bullets: ['Jurisdiction configurable', 'Insurer retains ownership', 'No cross-tenant usage']
        },
        {
          heading: 'EU AI Act alignment',
          bullets: ['Risk management', 'Transparency', 'Human oversight', 'Logging & auditability']
        }
      ]
    }
  ]
}

export default function RegulatoryGovernancePage() {
  const { lang } = useI18n()
  const [activeSlide, setActiveSlide] = useState(0)
  const deck = useMemo(() => translations[lang]?.regulatoryDeck ?? translations.en.regulatoryDeck, [lang])
  const slides = useMemo(() => getSlides(lang), [lang])
  const navRef = useRef<HTMLDivElement | null>(null)
  const [deckHeight, setDeckHeight] = useState(0)

  const totalSlides = slides.length

  function goToSlide(nextIndex: number) {
    setActiveSlide(Math.max(0, Math.min(nextIndex, totalSlides - 1)))
  }

  useEffect(() => {
    setActiveSlide(0)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    function updateHeights() {
      const navHeight = navRef.current?.getBoundingClientRect().height ?? 0
      setDeckHeight(window.innerHeight - navHeight - 48)
    }

    updateHeights()
    window.addEventListener('resize', updateHeights)
    return () => window.removeEventListener('resize', updateHeights)
  }, [])

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
        goToSlide(totalSlides - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlide, totalSlides])

  return (
    <InternAuthGate>
      <section className="page regulatory-overview" style={{ ['--deck-height' as never]: `${deckHeight}px` }}>
        <div className="regulatory-slider">
          <div className="regulatory-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={`${slide.title}-${index}`} className="regulatory-slide">
                <div className="regulatory-layout">
                  <div className="regulatory-left-card">
                    <div className="regulatory-left-header">
                      <Header title={deck.title} subtitle={deck.subtitle} subtitleColor="#65748b" />
                      <span className="regulatory-slide-index">
                        {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="regulatory-slide-content">
                      <h1>{slide.title}</h1>
                      <p>{slide.intro}</p>
                      <div className="regulatory-sections">
                        {slide.sections.map((section) => (
                          <div key={section.heading} className="regulatory-section">
                            <h3>{section.heading}</h3>
                            {section.text && <p>{section.text}</p>}
                            {section.bullets && (
                              <ul>
                                {section.bullets.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            )}
                            {section.table && (
                              <div className="regulatory-table">
                                <div className="regulatory-table-head">
                                  <span>{section.table.headers[0]}</span>
                                  <span>{section.table.headers[1]}</span>
                                </div>
                                {section.table.rows.map((row) => (
                                  <div key={row.join('-')} className="regulatory-table-row">
                                    <span>{row[0]}</span>
                                    <span>{row[1]}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {slide.footer && <div className="regulatory-footer">{slide.footer}</div>}
                    </div>
                  </div>
                  <div className="regulatory-right">
                    <div className="regulatory-media-stack">
                      <div className="regulatory-media-card">
                        <img src={GovernanceImage} alt={deck.title} />
                      </div>
                      <div className="regulatory-media-card">
                        <img src={GovernanceImage} alt={deck.title} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="regulatory-nav" ref={navRef}>
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
              {Array.from({ length: totalSlides }).map((_, index) => (
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
              disabled={activeSlide === totalSlides - 1}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
