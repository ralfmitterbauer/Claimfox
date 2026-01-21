import React, { useMemo } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import { useI18n } from '@/i18n/I18nContext'

type ModelSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

function getModelContent(lang: 'de' | 'en') {
  if (lang === 'de') {
    return {
      title: 'Business Modell Antares',
      subtitle: 'Business Model: Insurfox x Antares',
      intro: [
        'Insurfox betreibt eine KI-getriebene Versicherungsinfrastruktur (AI IaaS) für Logistik, Transport und Mobilität, während Antares als regulierter Versicherungsträger fungiert.',
        'Im Co-Branding-Modell "Insurfox - powered by Antares" sind Verantwortlichkeiten klar getrennt.'
      ],
      sections: [
        {
          id: '01',
          title: 'Rolle von Antares',
          bullets: [
            "Versicherer, Rückversicherer und Underwriter über Lloyd's / Lloyd's Europe",
            'Alleiniger Risikoträger',
            'Stellt Versicherungskapazität, maßgeschneiderte Policen und Bedingungen bereit',
            'Finaler Entscheidungsträger für Schadenregulierung, optional delegierbar für Low-Value-Claims bei vollständig digital bereitgestellten Daten via Insurfox'
          ]
        },
        {
          id: '02',
          title: 'Rolle von Insurfox',
          bullets: [
            'Lizenzierter Versicherungsmakler (EU)',
            'Betreibt die KI-gestützte B2B-Plattform',
            'Steuert Distribution, Maklerzugang und Kundenbeziehungen',
            'Digitalisiert und automatisiert Policierung, Vertrags- und Portfoliomanagement, Schadenbearbeitung, Verlängerungen und Endorsements',
            'Liefert native KI-Fähigkeiten für Risikobewertung, Scoring, Prozessorchestrierung und Analytics',
            'Vernetzt Versicherer, Makler, Kunden und Partner über eine API-first, cloud-native Architektur'
          ]
        },
        {
          id: '03',
          title: 'Value Creation Logic',
          paragraphs: [
            'Antares fokussiert sich auf Risiko, Kapital und Underwriting-Exzellenz.',
            'Insurfox fokussiert sich auf Technologie, KI, Distribution und operative Effizienz.',
            'Diese Trennung ermöglicht:'
          ],
          bullets: [
            'schnellere Innovation ohne regulatorische Reibung',
            'skalierbare digitale Distribution',
            'niedrigere operative Kosten für Versicherer',
            'verbesserte Underwriting- und Claims-Performance'
          ]
        },
        {
          id: '04',
          title: 'Ergebnis',
          paragraphs: [
            'Das Ergebnis ist eine transparente, effiziente und skalierbare Versicherungsinfrastruktur, die für komplexe Logistik- und Transportrisiken optimiert ist.'
          ]
        },
        {
          id: '05',
          title: 'Revenue Logic (Investor View)',
          bullets: [
            'Plattform- und KI-Nutzungsgebühren (IaaS-Modell)',
            'Broker- und distributionsbezogene Erlöse',
            'Potentieller Revenue Share durch verbesserte Underwriting- und Claims-Effizienz',
            'Starke Plattformhebel durch Multi-Tenant-Skalierung'
          ]
        },
        {
          id: '06',
          title: 'One-Sentence Investor Summary',
          paragraphs: [
            '"Insurfox provides the AI-powered insurance platform and distribution layer, while Antares supplies regulated risk capacity - together enabling scalable, digital insurance without replacing legacy systems."'
          ]
        },
        {
          id: '07',
          title: 'Whitepaper Antares',
          paragraphs: ['Whitepaper Antares']
        }
      ]
    }
  }

  return {
    title: 'Business Model Antares',
    subtitle: 'Business Model: Insurfox x Antares',
    intro: [
      'Insurfox operates an AI-driven insurance infrastructure platform (AI IaaS) for logistics, transport and mobility, while Antares acts as the regulated insurance backbone.',
      'Within the co-branding model "Insurfox - powered by Antares", responsibilities are clearly separated.'
    ],
    sections: [
      {
        id: '01',
        title: 'Role of Antares',
        bullets: [
          "Acts as insurer, reinsurer and underwriter via Lloyd's / Lloyd's Europe",
          'Is the sole risk carrier',
          'Provides insurance capacity, bespoke policies and conditions',
          'Acts as final decision-maker for claims settlement, with optional delegation for low-value claims if full data is provided digitally via Insurfox'
        ]
      },
      {
        id: '02',
        title: 'Role of Insurfox',
        bullets: [
          'Acts as a licensed insurance broker (EU)',
          'Operates the AI-powered B2B platform',
          'Manages distribution, broker access and customer relationships',
          'Digitizes and automates policy issuance, contract and portfolio management, claims handling, renewals and endorsements',
          'Delivers native AI capabilities for risk assessment, scoring, process orchestration and analytics',
          'Connects insurers, brokers, customers and partners via an API-first, cloud-native architecture'
        ]
      },
      {
        id: '03',
        title: 'Value Creation Logic',
        paragraphs: [
          'Antares focuses on risk, capital and underwriting excellence.',
          'Insurfox focuses on technology, AI, distribution and operational efficiency.',
          'This separation allows:'
        ],
        bullets: [
          'faster innovation without regulatory friction',
          'scalable digital distribution',
          'lower operational cost for insurers',
          'improved underwriting and claims performance'
        ]
      },
      {
        id: '04',
        title: 'Result',
        paragraphs: [
          'The result is a transparent, efficient and scalable insurance infrastructure, purpose-built for complex logistics and transport risks.'
        ]
      },
      {
        id: '05',
        title: 'Revenue Logic (Investor View)',
        bullets: [
          'Platform and AI usage fees (IaaS model)',
          'Broker and distribution-related revenues',
          'Potential revenue share linked to improved underwriting and claims efficiency',
          'Strong platform leverage through multi-tenant scalability'
        ]
      },
        {
          id: '06',
          title: 'One-Sentence Investor Summary',
          paragraphs: [
            '"Insurfox provides the AI-powered insurance platform and distribution layer, while Antares supplies regulated risk capacity - together enabling scalable, digital insurance without replacing legacy systems."'
          ]
        },
      {
        id: '07',
        title: 'Whitepaper Antares',
        paragraphs: ['Whitepaper Antares']
      }
    ]
  }
}

export default function BusinessModelAntaresPage() {
  const { lang } = useI18n()
  const content = useMemo(() => getModelContent(lang), [lang])

  return (
    <section className="page insurfox-whitepaper-page">
      <div className="insurfox-whitepaper-shell">
        <div className="framework-header-row insurfox-whitepaper-header">
          <Header title={content.title} subtitle={content.subtitle} subtitleColor="#65748b" />
          <button
            type="button"
            className="framework-download"
            onClick={() => window.print()}
          >
            {lang === 'en' ? 'Download PDF' : 'PDF herunterladen'}
          </button>
        </div>
        <div className="insurfox-whitepaper-hero">
          <Card className="insurfox-whitepaper-summary">
            <h2>{lang === 'en' ? 'Overview' : 'Überblick'}</h2>
            {content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Card>
        </div>
        <div className="insurfox-whitepaper-grid">
          {content.sections.map((section) => (
            <Card key={section.id} className="insurfox-whitepaper-card">
              <div className="insurfox-whitepaper-card-head">
                <h3>{section.title}</h3>
              </div>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </div>
      <div className="framework-print">
        <div className="framework-print-header">
          <img src={InsurfoxLogo} alt="Insurfox" />
        </div>
        <h1>{content.title}</h1>
        <p className="framework-print-subtitle">{content.subtitle}</p>
        <div className="framework-print-section">
          <h2>{lang === 'en' ? 'Overview' : 'Überblick'}</h2>
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {content.sections.map((section) => (
          <div key={section.id} className="framework-print-section">
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
