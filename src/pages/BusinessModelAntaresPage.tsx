import React, { useMemo } from 'react'
import Card from '@/components/ui/Card'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import AntaresHeroImage from '@/assets/images/insurfox_antares.png'
import { useI18n } from '@/i18n/I18nContext'

function getModelContent(lang: 'de' | 'en') {
  const enContent = {
    title: 'INSURFOX x ANTARES',
    subtitle: 'European Logistics and Fleet Insurance Portfolio',
    model: 'Executive Investment Proposition',
    overview: {
      paragraphs: [
        'Insurfox establishes and manages a pan-European logistics and fleet insurance portfolio as a Managing General Agent (MGA), with Antares acting as sole capacity provider and lead underwriter.',
        'The portfolio targets a structurally attractive segment of the European Non-Life market, addressing logistics, transport and fleet risks with standardized risk intake, controlled underwriting execution, predictable claims behaviour and recurring, broker-driven premium inflow.',
        "The objective is the delivery of a transparent, governable and profitable specialty portfolio, aligned with Lloyd's portfolio steering and capital efficiency principles."
      ]
    },
    marketContext: {
      title: 'Market Context',
      paragraphs: [
        'The European fleet insurance market represents a multi-billion-euro premium pool, estimated at ~USD 13.2bn (2024), with projected growth toward ~USD 26.7bn by 2032 (~9% CAGR).',
        "Logistics-related insurance (fleet, cargo, carrier's liability) forms a core sub-segment of European Commercial P&C, characterized by professional insureds, repeatable risk structures and high data availability.",
        'Premium flows are recurring and compounding, driven by fleet continuity, contractual logistics chains and high renewal ratios.'
      ]
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
          'Portfolio construction and risk aggregation',
          'Broker onboarding and distribution management',
          'Policierung and contract administration',
          'Delegated underwriting within agreed authority',
          'Delegated claims handling for low-value claims (subject to data completeness)',
          'Ongoing portfolio monitoring and reporting'
        ]
      }
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
        bullets: ['Portfolio build-out', 'Broker onboarding', 'Risk aggregation', 'Operational execution']
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
      title: 'INSURFOX x ANTARES',
      subtitle: 'Europaeisches Logistik- und Flottenversicherungsportfolio',
      model: 'Investmentthese fuer Entscheider',
      overview: {
        paragraphs: [
          'Insurfox etabliert und managt als Managing General Agent (MGA) ein paneuropaeisches Logistik- und Flottenversicherungsportfolio, wobei Antares als alleiniger Kapazitaetsgeber und Lead Underwriter agiert.',
          'Das Portfolio adressiert ein strukturell attraktives Segment des europaeischen Non-Life-Marktes und fokussiert Logistik-, Transport- und Flottenrisiken mit standardisierter Risikoannahme, kontrollierter Underwriting-Execution, vorhersehbarem Schadenverhalten und wiederkehrendem, brokergetriebenem Praemienzufluss.',
          "Ziel ist ein transparentes, steuerbares und profitables Specialty-Portfolio im Einklang mit den Portfolio-Steering- und Kapitaleffizienz-Prinzipien von Lloyd's."
        ]
      },
      marketContext: {
        title: 'Marktkontext',
        paragraphs: [
          'Der europaeische Flottenversicherungsmarkt umfasst einen mehrmilliardigen Praemienpool, geschaetzt auf ca. USD 13,2 Mrd. (2024) mit Wachstum auf ca. USD 26,7 Mrd. bis 2032 (~9% CAGR).',
          "Logistiknahe Versicherungen (Fleet, Cargo, Frachtfuehrerhaftpflicht) bilden ein zentrales Teilsegment der europaeischen Commercial P&C mit professionellen Versicherungsnehmern, wiederholbaren Risikostrukturen und hoher Datenverfuegbarkeit.",
          'Praemienfluesse sind wiederkehrend und kumulativ, getrieben durch Flottenkontinuitaet, vertragliche Logistikketten und hohe Renewal-Raten.'
        ]
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
            'Mobilitaets- und Subunternehmernetzwerke'
          ]
        },
        lines: {
          title: 'Versicherungslinien',
          bullets: [
            'Kfz-Flottenversicherung',
            'Frachtfuehrerhaftpflicht',
            'Transportversicherung',
            'Logistik-Kombipolicen',
            'Zusatzdeckungen (Cyber, D&O, Rechtsschutz, Equipment)'
          ]
        },
        geography: {
          title: 'Geografie',
          bullets: ['Deutschland (Initialaufbau)', "EU-Expansion ueber das Lloyd's-Europe-Framework"]
        },
        risk: {
          title: 'Risikoprofil',
          bullets: [
            'Professioneller Versicherungsnehmerstamm',
            'Repetitive, homogene Risikostrukturen',
            'Hohe Frequenz bei kontrollierter Schadenhoehe',
            'Geringere Volatilitaet gegenueber SME-Retail-Portfolios',
            'Begrenzte Tail-Exposure'
          ]
        }
      },
      premiumOutlook: {
        title: 'Erwartete Praemienentwicklung (GWP)',
        rows: [
          { year: 'Jahr 1', conservative: 'EUR 3-5m', upside: 'EUR 7m' },
          { year: 'Jahr 2', conservative: 'EUR 10-15m', upside: 'EUR 20m' },
          { year: 'Jahr 3', conservative: 'EUR 25-40m', upside: 'EUR 50m+' }
        ],
        bullets: ['Broker-Aggregation', 'Embedded Fleet Onboarding', 'Standardisierte Underwriting-Logik', 'Portfolio-Renewals'],
        driversLabel: 'Wachstumstreiber'
      },
      economics: {
        title: 'Zielportfolio-Oekonomie',
        metrics: [
          { label: 'Gross Loss Ratio', value: '45-55%' },
          { label: 'Expense Ratio', value: '20-25%' },
          { label: 'Combined Ratio', value: '<= 80%' },
          { label: 'Claims Frequency', value: 'Mittel' },
          { label: 'Claims Severity', value: 'Kontrolliert' },
          { label: 'Tail Risk', value: 'Begrenzt' }
        ]
      },
      operatingModel: {
        title: 'Betriebsmodell',
        antares: {
          title: 'Rolle von Antares',
          bullets: [
            'Alleiniger Risikotraeger',
            'Lead Underwriting Authority',
            'Kapitalbereitstellung und Kapazitaetssteuerung',
            'Finale Claims-Entscheidung',
            'Portfolio-Governance und Aufsicht'
          ]
        },
        insurfox: {
          title: 'Rolle von Insurfox (MGA)',
          bullets: [
            'Portfolioaufbau und Risikoaggregation',
            'Broker-Onboarding und Distribution-Management',
            'Policierung und Vertragsadministration',
            'Delegiertes Underwriting im vereinbarten Rahmen',
            'Delegierte Schadenbearbeitung fuer Low-Value-Claims (bei Datenvollstaendigkeit)',
            'Laufendes Portfoliomonitoring und Reporting'
          ]
        }
      },
      claims: {
        title: 'Schaden-Governance-Framework',
        bullets: [
          'Antares behaelt die finale Claims Authority',
          'Optionale Delegation bis EUR 10.000 bei vollstaendiger strukturierter digitaler FNOL und vordefinierten Eskalationsregeln',
          'Loss Adjusters fuer grosse oder komplexe Schaeden'
        ]
      },
      qualityControl: {
        title: 'Portfolio-Qualitaetskontrolle',
        traditional: {
          title: 'Traditionelle Brokerportfolios',
          bullets: [
            'Inkonsistente Submissions',
            'PDF-basierte Risikodaten',
            'Fragmentierte Exposure',
            'Begrenzte Transparenz',
            'Volatile Loss Ratios'
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
        result: 'Antares erhaelt ein aggregiertes, kontinuierlich gesteuertes Portfolio - keine isolierten Broker-Risiken.'
      },
      strategicValue: {
        title: 'Strategischer Wert fuer Antares',
        bullets: [
          'Exklusive Kapazitaetsposition',
          'Lead Underwriting Rolle',
          'Vollstaendige Portfolio-Transparenz',
          'Wiederkehrende Praemien-Pipeline',
          'Kapitaleffiziente Allokation',
          'Skalierbare europaweite Expansion',
          'Langfristiges MGA-Partnerschaftsmodell'
        ]
      },
      decision: {
        title: 'Entscheidungsrahmen',
        antares: {
          title: 'Antares',
          bullets: ['Kapazitaetsappetit', 'Ziel-Loss-Ratio-Korridor', 'Initiale Line Size', 'Governance- und Reporting-Kadenz']
        },
        insurfox: {
          title: 'Insurfox',
          bullets: ['Portfolioaufbau', 'Broker-Onboarding', 'Risikoaggregation', 'Operative Umsetzung']
        }
      },
      coreStatement: {
        title: 'Kernpositionierung',
        paragraphs: [
          'Insurfox agiert als MGA und liefert ein skalierbares und kontrolliertes europaeisches Logistik-Versicherungsportfolio.',
          'Antares stellt Kapital, Underwriting Authority und Risiko-Fuehrung bereit.'
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
  const content = useMemo(() => getModelContent(lang), [lang])

  return (
    <section className="page insurfox-whitepaper-page antares-marketing-page">
      <div className="insurfox-whitepaper-shell">
        <div className="framework-header-row insurfox-whitepaper-header antares-header">
          <div className="antares-header-copy">
            <span className="antares-eyebrow">{content.model}</span>
            <h1 className="antares-title">{content.title}</h1>
            <p className="antares-subtitle">{content.subtitle}</p>
          </div>
          <button
            type="button"
            className="framework-download"
            onClick={() => window.print()}
          >
            {lang === 'en' ? 'Download PDF' : 'PDF herunterladen'}
          </button>
        </div>
        <div className="antares-hero">
          <Card className="antares-hero-card">
            <div className="antares-hero-content">
              <h2>{content.model}</h2>
              {content.overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="antares-hero-media">
              <img src={AntaresHeroImage} alt="Insurfox x Antares" />
            </div>
          </Card>
        </div>
        <div className="antares-highlight">{content.overview.paragraphs[2]}</div>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.marketContext.title}</h2>
          </div>
          <Card className="antares-card">
            {content.marketContext.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Card>
        </section>
        <section className="antares-section">
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
        </div>
        <div className="framework-print-section">
          <h2>{content.marketContext.title}</h2>
          {content.marketContext.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
    </section>
  )
}
