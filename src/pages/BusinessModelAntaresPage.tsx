import React, { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import AntaresHeroImage from '@/assets/images/Poster-Antares-big.png'
import AntaresCoverImage from '@/assets/images/Poster-Antares.png'
import { useI18n } from '@/i18n/I18nContext'

function getModelContent(lang: 'de' | 'en') {
  const enContent = {
    title: 'INSURFOX powered by ANTARES',
    subtitle: 'European Logistics & Fleet Insurance Portfolio',
    model: 'Executive Investment Proposition',
    overview: {
      paragraphs: [
        'Insurfox establishes and manages a pan-European logistics and fleet insurance portfolio as a Managing General Agent (MGA), with Antares acting as sole capacity provider and lead underwriter.',
        'The portfolio targets a structurally attractive segment of the European Non-Life market, addressing logistics, transport and fleet risks with standardized risk intake, controlled underwriting execution, predictable claims behaviour and recurring, broker-driven premium inflow.'
      ],
      highlight:
        "The objective is the delivery of a transparent, governable and profitable specialty portfolio, aligned with Lloyd's portfolio steering and capital efficiency principles."
    },
    marketContext: {
      title: 'Market Context',
      rows: [
        { label: 'Fleet Insurance Market Volume (2024)', value: '~USD 13.2bn', reference: 'European commercial motor & fleet' },
        { label: 'Fleet Market Outlook (2032)', value: '~USD 26.7bn', reference: 'Projected market size' },
        { label: 'Fleet Growth Rate (CAGR)', value: '~9%', reference: '2024-2032' },
        { label: "Logistics & Transport Composite (Fleet + Cargo + Carrier's Liability + Ancillary)", value: '~USD 30-40bn', reference: 'European Commercial P&C composite' },
        { label: 'Composite Attach Rate (Ancillary Lines)', value: '20-40% of base premium', reference: 'Cyber, D&O, Legal, Equipment' },
        { label: 'Premium Characteristics', value: 'Recurring & Compounding', reference: 'Fleet-based, contract-driven' }
      ],
      bullets: [
        "Logistics-related insurance (fleet, cargo, carrier's liability) is a core sub-segment of European Commercial P&C, driven by professional insureds, repeatable risk structures and high data availability.",
        'Premium flows are recurring and compounding, supported by fleet continuity, contractual logistics chains and high renewal ratios - creating a durable underwriting base.'
      ],
      driversLabel: 'Key signals'
    },
    portfolioScope: {
      title: 'Portfolio Scope',
      insureds: {
        title: 'Target Insureds',
        bullets: [
          'Logistics companies',
          'Freight forwarders',
          'Transport operators',
          'Fleet owners',
          'Mobility and subcontractor networks'
        ]
      },
      lines: {
        title: 'Lines of Business',
        bullets: [
          'Motor fleet insurance',
          "Carrier's liability",
          'Cargo insurance',
          'Logistics combined policies',
          'Ancillary covers (cyber, D&O, legal expenses, equipment)'
        ]
      },
      geography: {
        title: 'Geography',
        bullets: ['Germany (initial build-out)', "EU expansion via Lloyd's Europe framework"]
      },
      risk: {
        title: 'Risk Characteristics',
        bullets: [
          'Professional insured base',
          'Repetitive, homogeneous risk structures',
          'High frequency / controlled severity loss patterns',
          'Lower volatility compared to SME retail portfolios',
          'Limited tail exposure'
        ]
      }
    },
    premiumOutlook: {
      title: 'Expected Premium Development (GWP)',
      rows: [
        { year: 'Year 1', conservative: 'EUR 3-5m', upside: 'EUR 7m' },
        { year: 'Year 2', conservative: 'EUR 10-15m', upside: 'EUR 20m' },
        { year: 'Year 3', conservative: 'EUR 25-40m', upside: 'EUR 50m+' }
      ],
      bullets: ['Broker aggregation', 'Embedded fleet onboarding', 'Standardized underwriting logic', 'Portfolio renewals'],
      driversLabel: 'Growth drivers'
    },
    economics: {
      title: 'Target Portfolio Economics',
      metrics: [
        { label: 'Gross Loss Ratio', value: '45-55%' },
        { label: 'Expense Ratio', value: '20-25%' },
        { label: 'Combined Ratio', value: '<= 80%' },
        { label: 'Claims Frequency', value: 'Medium' },
        { label: 'Claims Severity', value: 'Controlled' },
        { label: 'Tail Risk', value: 'Limited' }
      ]
    },
    operatingModel: {
      title: 'Operating Model',
      antares: {
        title: 'Role of Antares',
        bullets: [
          'Sole risk carrier',
          'Lead underwriting authority',
          'Capital provision and capacity steering',
          'Final claims decision authority',
          'Portfolio-level governance and oversight'
        ]
      },
      insurfox: {
        title: 'Role of Insurfox (MGA)',
        bullets: [
          'Portfolio construction and risk management',
          'Broker onboarding and distribution management',
          'Policy issuance and contract administration',
          'Delegated underwriting within agreed authority',
          'Delegated claims handling for low-value claims (subject to data completeness)',
          'Ongoing portfolio monitoring and reporting'
        ]
      }
    },
    leadAssignment: {
      title: 'Lead Allocation',
      paragraphs: [
        'Immediate direct lead access to executive boards and supervisory boards, e.g. DB Schenker, Dachser, Hellmann Logistics, Transporeon, timocom, etc.'
      ]
    },
    claims: {
      title: 'Claims Governance Framework',
      bullets: [
        'Antares retains final claims authority',
        'Optional delegated authority up to EUR 10,000, subject to complete structured digital FNOL and predefined escalation rules',
        'Loss adjusters mandated for large or complex claims'
      ]
    },
    qualityControl: {
      title: 'Portfolio Quality Control',
      traditional: {
        title: 'Traditional broker portfolios',
        bullets: [
          'Inconsistent submissions',
          'PDF-based risk data',
          'Fragmented exposure',
          'Limited transparency',
          'Volatile loss ratios'
        ]
      },
      insurfox: {
        title: 'Insurfox MGA portfolio',
        bullets: [
          'Standardized risk objects',
          'Clean exposure data',
          'Continuous monitoring',
          'Unified underwriting rules',
          'Portfolio-level reporting'
        ]
      },
      result: 'Antares receives one aggregated, continuously governed portfolio, not isolated broker risks.'
    },
    strategicValue: {
      title: 'Strategic Value to Antares',
      bullets: [
        'Exclusive capacity position',
        'Lead underwriting role',
        'Full portfolio transparency',
        'Recurring premium pipeline',
        'Capital-efficient deployment',
        'Scalable European expansion',
        'Long-term MGA partnership model'
      ]
    },
    decision: {
      title: 'Decision Framework',
      antares: {
        title: 'Antares',
        bullets: ['Capacity appetite', 'Target loss ratio corridor', 'Initial line size', 'Governance and reporting cadence']
      },
      insurfox: {
        title: 'Insurfox',
        bullets: ['Portfolio build-out', 'Broker onboarding', 'Risk management', 'Operational execution']
      }
    },
    coreStatement: {
      title: 'Core Positioning',
      paragraphs: [
        'Insurfox operates as MGA, delivering a scalable and controlled European logistics insurance portfolio.',
        'Antares provides capital, underwriting authority and risk leadership.'
      ]
    },
    labels: {
      premiumTable: { year: 'Year', conservative: 'Conservative', upside: 'Upside' }
    }
  }

  if (lang === 'de') {
    return {
      title: 'INSURFOX powered by ANTARES',
      subtitle: 'Europäisches Logistik- und Flottenversicherungsportfolio',
      model: 'Business Modell',
      overview: {
        paragraphs: [
          'Insurfox etabliert und managt als Managing General Agent (MGA) ein paneuropäisches Logistik- und Flottenversicherungsportfolio, wobei Antares als alleiniger Kapazitätsgeber und Lead Underwriter agiert.',
          'Das Portfolio adressiert ein strukturell attraktives Segment des europäischen Non-Life-Marktes und fokussiert Logistik-, Transport- und Flottenrisiken mit standardisierter Risikoannahme, kontrollierter Underwriting-Execution, vorhersehbarem Schadenverhalten und wiederkehrendem, brokergetriebenem Prämienzufluss.'
        ],
        highlight:
          'Ziel ist ein transparentes, steuerbares und profitables Specialty-Portfolio im Einklang mit den Portfolio-Steering- und Kapitaleffizienz-Prinzipien von Lloyd’s.'
      },
      marketContext: {
        title: 'Marktkontext',
        rows: [
          { label: 'Flottenversicherung Marktvolumen (2024)', value: '~USD 13,2 Mrd.', reference: 'Europäischer Commercial Motor & Fleet' },
          { label: 'Flottenmarkt Ausblick (2032)', value: '~USD 26,7 Mrd.', reference: 'Prognostizierte Marktgröße' },
          { label: 'Flotten Wachstumsrate (CAGR)', value: '~9 %', reference: '2024-2032' },
          { label: 'Logistik- und Transport-Composite (Fleet + Cargo + Frachtführerhaftpflicht + Zusatzlinien)', value: '~USD 30-40 Mrd.', reference: 'European Commercial P&C Composite' },
          { label: 'Composite Attach Rate (Zusatzlinien)', value: '20-40 % der Basisprämie', reference: 'Cyber, D&O, Rechtsschutz, Equipment' },
          { label: 'Prämiencharakteristik', value: 'Wiederkehrend & kumulativ', reference: 'Flottenbasiert, vertragsgetrieben' }
        ],
        bullets: [
          'Logistiknahe Versicherungen (Fleet, Cargo, Frachtführerhaftpflicht) bilden ein Kernsegment der europäischen Commercial P&C mit professionellen Versicherungsnehmern, wiederholbaren Risikostrukturen und hoher Datenverfügbarkeit.',
          'Prämienflüsse sind wiederkehrend und kumulativ, getragen durch Flottenkontinuität, vertragliche Logistikketten und hohe Erneuerungsquoten.'
        ],
        driversLabel: 'Kernaussagen'
      },
      portfolioScope: {
        title: 'Portfolio-Umfang',
        insureds: {
          title: 'Zielkunden',
          bullets: [
            'Logistikunternehmen',
            'Spediteure',
            'Transportunternehmen',
            'Flottenbetreiber',
            'Mobilitäts- und Subunternehmernetzwerke'
          ]
        },
        lines: {
          title: 'Versicherungslinien',
          bullets: [
            'Kfz-Flottenversicherung',
            'Frachtführerhaftpflicht',
            'Transportversicherung',
            'Logistik-Kombipolicen',
            'Zusatzdeckungen (Cyber, D&O, Rechtsschutz, Equipment)'
          ]
        },
        geography: {
          title: 'Geografie',
          bullets: ['Deutschland (Initialaufbau)', "EU-Expansion über das Lloyd's-Europe-Framework"]
        },
        risk: {
          title: 'Risikoprofil',
          bullets: [
            'Professioneller Versicherungsnehmerstamm',
            'Repetitive, homogene Risikostrukturen',
            'Hohe Frequenz bei kontrollierter Schadenhöhe',
            'Geringere Volatilität gegenüber KMU-Retail-Portfolios',
            'Begrenztes Tail-Exposure'
          ]
        }
      },
      premiumOutlook: {
        title: 'Erwartete Prämienentwicklung (GWP)',
        rows: [
          { year: 'Jahr 1', conservative: 'EUR 3–5 Mio.', upside: 'EUR 7 Mio.' },
          { year: 'Jahr 2', conservative: 'EUR 10–15 Mio.', upside: 'EUR 20 Mio.' },
          { year: 'Jahr 3', conservative: 'EUR 25–40 Mio.', upside: 'EUR 50 Mio.+' }
        ],
        bullets: ['Broker-Aggregation', 'Eingebettetes Flotten-Onboarding', 'Standardisierte Underwriting-Logik', 'Portfolio-Erneuerungen'],
        driversLabel: 'Wachstumstreiber',
        note:
          'Prämienentwicklung ohne Berücksichtigung des Makler-Onboardings. Portfolio-Erweiterung durch Zugang zu weiteren ca. 145 Branchen allein in DE.'
      },
      economics: {
        title: 'Zielportfolio-Ökonomie',
        metrics: [
          { label: 'Brutto-Schadenquote', value: '45-55%' },
          { label: 'Kostenquote', value: '20-25%' },
          { label: 'Combined Ratio', value: '<= 80%' },
          { label: 'Schadenfrequenz', value: 'Mittel' },
          { label: 'Schadenhöhe', value: 'Kontrolliert' },
          { label: 'Tail-Risiko', value: 'Begrenzt' }
        ]
      },
      operatingModel: {
        title: 'Betriebsmodell',
        antares: {
          title: 'Rolle von Antares',
          bullets: [
            'Alleiniger Risikoträger Insuerer/Reinsurer',
            'Lead Underwriting Authority',
            'Kapitalbereitstellung und Kapazitätssteuerung',
            'Finale Schadenentscheidung',
            'Portfolio-Governance und Aufsicht'
          ]
        },
        insurfox: {
          title: 'Rolle von Insurfox (MGA)',
          bullets: [
            'Portfolioaufbau und Risikomanagement',
            'Broker-Onboarding und Distribution-Management',
            'Policierung und Vertragsadministration, Prolongierung, Editierung, Digitale Nachträge',
            'Delegiertes Underwriting im vereinbarten Rahmen',
            'Delegierte Schadenbearbeitung für geringwertige Schäden (bei Datenvollständigkeit)',
            'KI getriebene Auswertung von Unternehmens und Risikodaten für die zukünftige Tarifberechnung der Antares Produkte (Real Time)',
            'Operative Umsetzung, Betrieb und Skalierung',
            'Laufendes Portfoliomonitoring und Reporting'
          ]
        }
      },
      leadAssignment: {
        title: 'Leadzuweisung',
        paragraphs: [
          'Direkter Leadzugang ab sofort zu allen Vorständen und Aufsichtsräten wie z. B. DB Schenker, Dachser, Hellmann Logistik, Transporeon, timocom etc.'
        ]
      },
      claims: {
        title: 'Schaden-Governance-Framework',
        bullets: [
          'Antares behält die finale Claims Authority',
          'Optionale Delegation bis EUR 10.000 bei vollständig strukturierter digitaler FNOL und vordefinierten Eskalationsregeln',
          'Loss Adjuster für große oder komplexe Schäden'
        ]
      },
      qualityControl: {
        title: 'Portfolio-Qualitätskontrolle',
        traditional: {
          title: 'Traditionelle Brokerportfolios',
          bullets: [
            'Inkonsistente Einreichungen',
            'PDF-basierte Risikodaten',
            'Fragmentierte Exposure-Daten',
            'Begrenzte Transparenz',
            'Volatile Schadenquoten'
          ]
        },
        insurfox: {
          title: 'Insurfox MGA Portfolio',
          bullets: [
            'Standardisierte Risikoobjekte',
            'Saubere Exposure-Daten',
            'Kontinuierliches Monitoring',
            'Einheitliche Underwriting-Regeln',
            'Reporting auf Portfolioebene'
          ]
        },
        result: 'Antares erhält ein aggregiertes, kontinuierlich gesteuertes Portfolio - keine isolierten Broker-Risiken.'
      },
      strategicValue: {
        title: 'Strategischer Wert für Antares',
        bullets: [
          'Exklusive Kapazitätsposition',
          'Lead-Underwriting-Rolle',
          'Vollständige Portfolio-Transparenz',
          'Wiederkehrende Prämien-Pipeline',
          'Kapitaleffiziente Allokation',
          'Skalierbare europaweite Expansion',
          'Langfristiges MGA-Partnerschaftsmodell'
        ]
      },
      decision: {
        title: 'Entscheidungsrahmen',
        antares: {
          title: 'Antares',
          bullets: ['Kapazitätsappetit', 'Ziel-Schadenquoten-Korridor', 'Initiale Liniengröße', 'Governance- und Reporting-Kadenz']
        },
        insurfox: {
          title: 'Insurfox',
          bullets: ['Portfolioaufbau', 'Broker-Onboarding', 'Risikomanagement', 'Operative Umsetzung']
        }
      },
      coreStatement: {
        title: 'Kernpositionierung',
        paragraphs: [
          'Insurfox agiert als MGA und liefert ein skalierbares und kontrolliertes europäisches Logistik-Versicherungsportfolio.',
          'Antares stellt Kapital, Underwriting Authority und Risiko-Führung bereit.'
        ]
      },
      labels: {
        premiumTable: { year: 'Jahr', conservative: 'Konservativ', upside: 'Upside' }
      }
    }
  }

  return enContent
}

export default function BusinessModelAntaresPage() {
  const { lang } = useI18n()
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const queryLang = searchParams?.get('lang')
  const resolvedLang = queryLang === 'en' || queryLang === 'de' ? queryLang : lang
  const isPrintMode = searchParams?.get('print') === '1'
  const content = useMemo(() => getModelContent(resolvedLang), [resolvedLang])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handlePdfDownload = async () => {
    const downloadLang = resolvedLang === 'en' ? 'en' : 'de'
    const baseUrl = import.meta.env.VITE_PDF_BASE_URL || ''
    if (!baseUrl) {
      const anchor = document.createElement('a')
      anchor.href = `/pdfs/insurfox-antares-business-model-${downloadLang}.pdf`
      anchor.download = `insurfox-antares-business-model-${downloadLang}.pdf`
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      return
    }

    const response = await fetch(
      `${baseUrl}/api/pdf/business-model-antares?lang=${downloadLang}`
    )
    const contentType = response.headers.get('content-type') || ''
    if (!response.ok || !contentType.includes('application/pdf')) {
      const errorText = await response.text().catch(() => '')
      throw new Error(errorText || 'PDF download failed')
    }
    const buffer = await response.arrayBuffer()
    const url = window.URL.createObjectURL(new Blob([buffer], { type: 'application/pdf' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `insurfox-antares-business-model-${downloadLang}.pdf`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.URL.revokeObjectURL(url)
  }

  return (
    <section className="page insurfox-whitepaper-page antares-marketing-page">
      <div className="insurfox-whitepaper-shell">
        <div className="antares-print-cover">
          <img src={AntaresCoverImage} alt="Insurfox powered by Antares" />
        </div>
        <div className="antares-print-body">
          <div className="antares-print-header">
            <div className="antares-print-header-row">
              <div className="antares-print-header-cell">
                <img src={InsurfoxLogo} alt="Insurfox" />
              </div>
            </div>
          </div>
          <div className="antares-print-content">
            <div className="framework-header-row insurfox-whitepaper-header antares-header">
              <div className="antares-header-copy">
                <span className="antares-eyebrow">{content.model}</span>
                <h1 className="antares-title antares-title-accent">{content.title}</h1>
                <p className="antares-subtitle">{content.subtitle}</p>
              </div>
              {!isPrintMode && (
                <button
                  type="button"
                  className="framework-download"
                  onClick={() => {
                    handlePdfDownload().catch((error) => {
                      window.alert(
                        resolvedLang === 'en'
                          ? 'PDF generation failed. Please check the PDF server.'
                          : 'PDF-Generierung fehlgeschlagen. Bitte den PDF-Server prüfen.'
                      )
                      console.error(error)
                    })
                  }}
                >
                  {resolvedLang === 'en' ? 'Download PDF' : 'PDF herunterladen'}
                </button>
              )}
            </div>
            <div className="antares-hero">
              <Card className="antares-hero-card antares-hero-split">
                <div className="antares-hero-content">
                  <h2>{content.model}</h2>
                  {content.overview.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="antares-hero-media">
                  <button
                    type="button"
                    className="antares-image-button"
                    onClick={() => setIsPreviewOpen(true)}
                  >
                    <img src={AntaresHeroImage} alt="Insurfox powered by Antares" />
                  </button>
                </div>
              </Card>
            </div>
            <div className="antares-highlight">{content.overview.highlight}</div>
            <section className="antares-section antares-section-market">
              <div className="antares-section-head">
                <h2>{content.marketContext.title}</h2>
              </div>
              <Card className="antares-card">
                <div className="antares-table">
              <div className="antares-table-row antares-table-header">
                    <span>{resolvedLang === 'en' ? 'Metric' : 'Kennzahl'}</span>
                    <span>{resolvedLang === 'en' ? 'Value' : 'Wert'}</span>
                    <span>{resolvedLang === 'en' ? 'Reference' : 'Referenz'}</span>
                  </div>
                  {content.marketContext.rows.map((row) => (
                    <div key={row.label} className="antares-table-row">
                      <span>{row.label}</span>
                      <span>{row.value}</span>
                      <span>{row.reference}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="antares-card">
                <h3>{content.marketContext.driversLabel}</h3>
                <ul>
                  {content.marketContext.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </section>
            <section className="antares-section antares-section-portfolio">
              <div className="antares-section-head">
                <h2>{content.portfolioScope.title}</h2>
              </div>
              <div className="antares-grid antares-grid-two">
                {[content.portfolioScope.insureds, content.portfolioScope.lines, content.portfolioScope.geography, content.portfolioScope.risk].map(
                  (section) => (
                    <Card key={section.title} className="antares-card antares-scope-card">
                      <h3>{section.title}</h3>
                      <ul>
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Card>
                  )
                )}
              </div>
            </section>
            <section className="antares-section">
              <div className="antares-section-head">
                <h2>{content.premiumOutlook.title}</h2>
              </div>
              <Card className="antares-card">
                <div className="antares-table">
                  <div className="antares-table-row antares-table-header">
                    <span>{content.labels.premiumTable.year}</span>
                    <span>{content.labels.premiumTable.conservative}</span>
                    <span>{content.labels.premiumTable.upside}</span>
                  </div>
                  {content.premiumOutlook.rows.map((row) => (
                    <div key={row.year} className="antares-table-row">
                      <span>{row.year}</span>
                      <span>{row.conservative}</span>
                      <span>{row.upside}</span>
                    </div>
                  ))}
                </div>
                {content.premiumOutlook.note && (
                  <p className="antares-note">{content.premiumOutlook.note}</p>
                )}
              </Card>
              <Card className="antares-card">
                <h3>{content.premiumOutlook.driversLabel}</h3>
                <ul>
                  {content.premiumOutlook.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </section>
            <section className="antares-section">
              <div className="antares-section-head">
                <h2>{content.economics.title}</h2>
              </div>
              <div className="antares-grid antares-grid-three">
                {content.economics.metrics.map((metric) => (
                  <Card key={metric.label} className="antares-card antares-metric-card">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </Card>
                ))}
              </div>
            </section>
            <section className="antares-section">
              <div className="antares-section-head">
                <h2>{content.operatingModel.title}</h2>
              </div>
              <div className="antares-grid antares-grid-two">
                <Card className="antares-card">
                  <h3>{content.operatingModel.antares.title}</h3>
                  <ul>
                    {content.operatingModel.antares.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
                <Card className="antares-card">
                  <h3>{content.operatingModel.insurfox.title}</h3>
                  <ul>
                    {content.operatingModel.insurfox.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>
            <section className="antares-section">
              <div className="antares-section-head">
                <h2>{content.leadAssignment.title}</h2>
              </div>
              <Card className="antares-card">
                {content.leadAssignment.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Card>
            </section>
            <section className="antares-section">
              <div className="antares-section-head">
                <h2>{content.claims.title}</h2>
              </div>
              <Card className="antares-card">
                <ul>
                  {content.claims.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </section>
            <section className="antares-section">
              <div className="antares-section-head">
                <h2>{content.qualityControl.title}</h2>
              </div>
              <div className="antares-grid antares-grid-two">
                <Card className="antares-card">
                  <h3>{content.qualityControl.traditional.title}</h3>
                  <ul>
                    {content.qualityControl.traditional.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
                <Card className="antares-card">
                  <h3>{content.qualityControl.insurfox.title}</h3>
                  <ul>
                    {content.qualityControl.insurfox.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
              </div>
              <Card className="antares-card antares-statement-card">
                <p>{content.qualityControl.result}</p>
              </Card>
            </section>
            <section className="antares-section">
              <div className="antares-section-head">
                <h2>{content.strategicValue.title}</h2>
              </div>
              <Card className="antares-card">
                <ul>
                  {content.strategicValue.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </section>
            <section className="antares-section">
              <div className="antares-section-head">
                <h2>{content.decision.title}</h2>
              </div>
              <div className="antares-grid antares-grid-two">
                <Card className="antares-card">
                  <h3>{content.decision.antares.title}</h3>
                  <ul>
                    {content.decision.antares.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
                <Card className="antares-card">
                  <h3>{content.decision.insurfox.title}</h3>
                  <ul>
                    {content.decision.insurfox.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>
            <section className="antares-section">
              <Card className="antares-card antares-core-card">
                <h2>{content.coreStatement.title}</h2>
                {content.coreStatement.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Card>
            </section>
          </div>
        </div>
      </div>
      <div className="framework-print">
        <div className="framework-print-header">
          <img src={InsurfoxLogo} alt="Insurfox" />
        </div>
        <h1>{content.title}</h1>
        <p className="framework-print-subtitle">{content.subtitle}</p>
        <p className="framework-print-subtitle">{content.model}</p>
        <div className="framework-print-section">
          {content.overview.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>{content.overview.highlight}</p>
        </div>
        <div className="framework-print-section">
          <h2>{content.marketContext.title}</h2>
          <ul>
            {content.marketContext.rows.map((row) => (
              <li key={row.label}>
                {row.label}: {row.value}
              </li>
            ))}
          </ul>
          <p>{content.marketContext.driversLabel}</p>
          <ul>
            {content.marketContext.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.portfolioScope.title}</h2>
          <p>{content.portfolioScope.insureds.title}</p>
          <ul>
            {content.portfolioScope.insureds.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.portfolioScope.lines.title}</p>
          <ul>
            {content.portfolioScope.lines.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.portfolioScope.geography.title}</p>
          <ul>
            {content.portfolioScope.geography.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.portfolioScope.risk.title}</p>
          <ul>
            {content.portfolioScope.risk.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.premiumOutlook.title}</h2>
          <ul>
            {content.premiumOutlook.rows.map((row) => (
              <li key={row.year}>
                {row.year}: {row.conservative} / {row.upside}
              </li>
            ))}
          </ul>
          <p>{content.premiumOutlook.driversLabel}</p>
          <ul>
            {content.premiumOutlook.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {content.premiumOutlook.note && <p>{content.premiumOutlook.note}</p>}
        </div>
        <div className="framework-print-section">
          <h2>{content.economics.title}</h2>
          <ul>
            {content.economics.metrics.map((metric) => (
              <li key={metric.label}>
                {metric.label}: {metric.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.operatingModel.title}</h2>
          <p>{content.operatingModel.antares.title}</p>
          <ul>
            {content.operatingModel.antares.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.operatingModel.insurfox.title}</p>
          <ul>
            {content.operatingModel.insurfox.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.leadAssignment.title}</h2>
          {content.leadAssignment.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="framework-print-section">
          <h2>{content.claims.title}</h2>
          <ul>
            {content.claims.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.qualityControl.title}</h2>
          <p>{content.qualityControl.traditional.title}</p>
          <ul>
            {content.qualityControl.traditional.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.qualityControl.insurfox.title}</p>
          <ul>
            {content.qualityControl.insurfox.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.qualityControl.result}</p>
        </div>
        <div className="framework-print-section">
          <h2>{content.strategicValue.title}</h2>
          <ul>
            {content.strategicValue.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.decision.title}</h2>
          <p>{content.decision.antares.title}</p>
          <ul>
            {content.decision.antares.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.decision.insurfox.title}</p>
          <ul>
            {content.decision.insurfox.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.coreStatement.title}</h2>
          {content.coreStatement.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      {isPreviewOpen && (
        <div className="antares-image-overlay" role="dialog" aria-modal="true">
          <div className="antares-image-overlay-content">
            <button
              type="button"
              className="antares-image-close"
              onClick={() => setIsPreviewOpen(false)}
              aria-label={lang === 'en' ? 'Close preview' : 'Vorschau schließen'}
            >
              <span aria-hidden="true">×</span>
            </button>
            <img src={AntaresHeroImage} alt="Insurfox powered by Antares" />
          </div>
        </div>
      )}
    </section>
  )
}
