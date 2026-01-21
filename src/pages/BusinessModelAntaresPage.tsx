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
        'Ich analysiere nüchtern, regulatorisch sauber und investorenfähig die drei Rollen: Insurfox als Broker, Insurfox als Assekuradeur (MGA), Insurfox als Versicherer.',
        "Zusätzlich folgen die empfohlene Zielrolle samt Begründung und warum Lloyd's / Antares strukturell sinnvoll bleibt."
      ],
      sections: [
        {
          id: '01',
          title: 'Insurfox als Broker',
          paragraphs: ['Status quo.']
        },
        {
          id: '02',
          title: 'Regulatorische Einordnung (Broker)',
          bullets: [
            'IDD-regulierte Versicherungsvermittlung (EU)',
            'Keine Risikotragung',
            'Keine Zeichnungshoheit',
            'Kein Solvency-II-Kapital'
          ]
        },
        {
          id: '03',
          title: 'Vorteile (Broker)',
          bullets: [
            'Niedrige regulatorische Eintrittsbarrieren',
            'Schnelle Marktfähigkeit',
            'Geringes Haftungs- und Kapitalrisiko',
            'Flexibilität in der Produktgestaltung (über Partner)'
          ]
        },
        {
          id: '04',
          title: 'Nachteile (strategisch)',
          bullets: [
            'Geringe Wertschöpfungstiefe',
            'Abhängigkeit von Versicherern',
            'Keine Kontrolle über Policierung und Claims',
            'Begrenzte Margen',
            'Für Investoren: kein struktureller Moat'
          ]
        },
        {
          id: '05',
          title: 'Fazit Broker',
          paragraphs: ['Broker ist ein guter Startpunkt, aber kein Endzustand für Insurfox.']
        },
        {
          id: '06',
          title: 'Insurfox als Assekuradeur / MGA',
          paragraphs: ['Realistisch und optimal im aktuellen Marktumfeld.']
        },
        {
          id: '07',
          title: 'Regulatorische Einordnung (MGA)',
          bullets: [
            'IDD + MGA-/Coverholder-Struktur',
            'Zeichnung im Auftrag eines Risikoträgers',
            'Delegierte Policierung und Claims Authority',
            'Kein eigenes Risiko'
          ]
        },
        {
          id: '08',
          title: 'Was Insurfox als MGA übernehmen kann',
          bullets: [
            'Policierung: Erstellung und Verwaltung der Policen',
            'Policierung: Anwendung definierter Underwriting Guidelines',
            'Policierung: Nutzung von AI zur Entscheidungsunterstützung',
            'Tarif bleibt beim Carrier',
            'Underwriting: Zeichnungsentscheidungen bis definierte Limits',
            'Portfolio-Steuerung: Ablehnung und Annahme im Rahmen der Authority',
            'Claims: FNOL und Schadenmanagement',
            'Claims: Settlement bis definierte Beträge',
            'Claims: Vollständige digitale Übergabe an Carrier'
          ]
        },
        {
          id: '09',
          title: 'Regulatorische Voraussetzungen (realistisch erfüllbar)',
          bullets: [
            'MGA-/Coverholder-Zulassung',
            "Delegation Agreement mit Antares / Lloyd's",
            'Klare Governance-Struktur',
            'Human-in-the-loop',
            'Audit- und Reporting-Fähigkeit',
            'Trennung von Tech und Entscheidung',
            'Die Insurfox AI ist hier ein Enabler, kein Regulator-Risiko'
          ]
        },
        {
          id: '10',
          title: 'Vorteile der MGA-Rolle',
          bullets: [
            'Hohe Margen (ohne Kapitalbindung)',
            'Kontrolle über Policierung und Claims',
            'Schnelle Produktinnovation',
            'Starke Position gegenüber Carriern',
            'Attraktiv für Investoren',
            'Skalierbar international'
          ]
        },
        {
          id: '11',
          title: 'Fazit MGA',
          paragraphs: ['MGA ist das Sweet-Spot-Modell zwischen Broker und Versicherer.']
        },
        {
          id: '12',
          title: 'Insurfox als Versicherer',
          paragraphs: ['Theoretisch möglich, strategisch riskant.']
        },
        {
          id: '13',
          title: 'Regulatorische Einordnung (Versicherer)',
          bullets: [
            'Solvency II',
            'Hohe Eigenmittel',
            'Aufsicht (BaFin, FINMA, etc.)',
            'Langsame Produktänderungen'
          ]
        },
        {
          id: '14',
          title: 'Was Insurfox dann wäre',
          bullets: ['Risikoträger', 'Kapitalintensiv', 'Stark reguliert', 'Politisch und regulatorisch exponiert']
        },
        {
          id: '15',
          title: 'Nachteile',
          bullets: [
            'Massive Kapitalbindung',
            'Geringe Flexibilität',
            'Fokus verschiebt sich von Innovation zu Kapitalmanagement',
            'Geringe Exit-Flexibilität',
            'Tech wird Nebensache'
          ]
        },
        {
          id: '16',
          title: 'Fazit Versicherer',
          paragraphs: ['Versicherer zu werden wäre ein strategischer Fehler für Insurfox.']
        },
        {
          id: '17',
          title: 'Empfohlene Zielrolle für Insurfox',
          paragraphs: [
            'Insurfox als Assekuradeur / MGA mit starker Underwriting Authority.',
            'Insurfox kontrolliert Prozesse, nicht Kapital.'
          ]
        },
        {
          id: '18',
          title: 'Begründung',
          bullets: [
            'Maximale Wertschöpfung',
            'Kein eigenes Risiko',
            "Nutzung von Lloyd's / Antares Kapital",
            'Schnelle Skalierung',
            'International replizierbar',
            'Investorenfähig',
            'Regulatorisch sauber'
          ]
        },
        {
          id: '19',
          title: "Antares / Lloyd's bleiben",
          bullets: ['Risikoträger', 'Kapitalgeber', 'Rückversicherungsstruktur', 'Finaler Risikohalter']
        },
        {
          id: '20',
          title: 'Insurfox wird',
          paragraphs: ['Insurfox sitzt zwischen Markt und Kapital - genau dort entsteht der Wert.'],
          bullets: ['Zeichnende Instanz', 'Policierungseinheit', 'Claims-Manager', 'Portfolio-Steuerer']
        },
        {
          id: '21',
          title: 'Investor Summary (1 Slide)',
          paragraphs: [
            "Insurfox is best positioned as a Managing General Agent: controlling underwriting and policy issuance, while capital and risk remain with Lloyd's-backed carriers."
          ]
        }
      ]
    }
  }

  return {
    title: 'Business Model Antares',
    subtitle: 'Business Model: Insurfox x Antares',
    intro: [
      'I analyze the three roles in a neutral, compliant, and investor-ready way: Insurfox as broker, Insurfox as MGA, Insurfox as insurer.',
      "This includes the recommended target role with rationale and why Lloyd's / Antares remains structurally sensible."
    ],
    sections: [
      {
        id: '01',
        title: 'Insurfox as Broker',
        paragraphs: ['Status quo.']
      },
      {
        id: '02',
        title: 'Regulatory Classification (Broker)',
        bullets: [
          'IDD-regulated insurance mediation (EU)',
          'No risk-bearing',
          'No binding authority',
          'No Solvency II capital'
        ]
      },
      {
        id: '03',
        title: 'Advantages (Broker)',
        bullets: [
          'Low regulatory entry barriers',
          'Fast time-to-market',
          'Low liability and capital exposure',
          'Flexible product design (via partners)'
        ]
      },
      {
        id: '04',
        title: 'Disadvantages (Strategic)',
        bullets: [
          'Limited value capture',
          'Dependence on carriers',
          'No control over policy issuance and claims',
          'Limited margins',
          'For investors: no structural moat'
        ]
      },
      {
        id: '05',
        title: 'Broker Conclusion',
        paragraphs: ['Broker is a strong starting point, but not an end state for Insurfox.']
      },
      {
        id: '06',
        title: 'Insurfox as MGA',
        paragraphs: ['Realistic and optimal in the current market structure.']
      },
      {
        id: '07',
        title: 'Regulatory Classification (MGA)',
        bullets: [
          'IDD + MGA/Coverholder structure',
          'Binding authority on behalf of a risk carrier',
          'Delegated policy issuance and claims authority',
          'No own risk'
        ]
      },
      {
        id: '08',
        title: 'What Insurfox Can Take Over as MGA',
        bullets: [
          'Policy issuance: creation and administration of policies',
          'Policy issuance: apply defined underwriting guidelines',
          'Policy issuance: use AI for decision support',
          'Tariff remains with the carrier',
          'Underwriting: binding decisions within defined limits',
          'Portfolio steering: accept/decline within authority',
          'Claims: FNOL and claims handling',
          'Claims: settlement up to defined amounts',
          'Claims: full digital handover to carrier'
        ]
      },
      {
        id: '09',
        title: 'Regulatory Preconditions (Realistic)',
        bullets: [
          'MGA/Coverholder authorization',
          "Delegation agreement with Antares / Lloyd's",
          'Clear governance structure',
          'Human-in-the-loop',
          'Audit and reporting capability',
          'Separation of tech and decision-making',
          'Insurfox AI is an enabler here, not a regulatory risk'
        ]
      },
      {
        id: '10',
        title: 'Advantages of the MGA Role',
        bullets: [
          'High margins without capital lock-up',
          'Control over policy issuance and claims',
          'Fast product innovation',
          'Strong position versus carriers',
          'Investor attractive',
          'Internationally scalable'
        ]
      },
      {
        id: '11',
        title: 'MGA Conclusion',
        paragraphs: ['MGA is the sweet-spot model between broker and insurer.']
      },
      {
        id: '12',
        title: 'Insurfox as Insurer',
        paragraphs: ['Theoretically possible, strategically risky.']
      },
      {
        id: '13',
        title: 'Regulatory Classification (Insurer)',
        bullets: ['Solvency II', 'High own funds', 'Supervision (BaFin, FINMA, etc.)', 'Slow product changes']
      },
      {
        id: '14',
        title: 'What Insurfox Would Then Be',
        bullets: ['Risk carrier', 'Capital intensive', 'Heavily regulated', 'Politically and regulatorily exposed']
      },
      {
        id: '15',
        title: 'Disadvantages',
        bullets: [
          'Massive capital tie-up',
          'Low flexibility',
          'Focus shifts from innovation to capital management',
          'Limited exit flexibility',
          'Tech becomes secondary'
        ]
      },
      {
        id: '16',
        title: 'Insurer Conclusion',
        paragraphs: ['Becoming an insurer would be a strategic mistake for Insurfox.']
      },
      {
        id: '17',
        title: 'Recommended Target Role for Insurfox',
        paragraphs: ['Insurfox as MGA with strong underwriting authority.', 'Insurfox controls processes, not capital.']
      },
      {
        id: '18',
        title: 'Rationale',
        bullets: [
          'Maximum value capture',
          'No own risk',
          "Use of Lloyd's / Antares capital",
          'Fast scaling',
          'Internationally replicable',
          'Investor ready',
          'Regulatorily sound'
        ]
      },
      {
        id: '19',
        title: "Antares / Lloyd's Remain",
        bullets: ['Risk carrier', 'Capital provider', 'Reinsurance structure', 'Final risk holder']
      },
      {
        id: '20',
        title: 'Insurfox Becomes',
        paragraphs: ['Insurfox sits between market and capital - that is where value is created.'],
        bullets: ['Binding authority', 'Policy issuance unit', 'Claims manager', 'Portfolio steward']
      },
      {
        id: '21',
        title: 'Investor Summary (1 Slide)',
        paragraphs: [
          "Insurfox is best positioned as a Managing General Agent: controlling underwriting and policy issuance, while capital and risk remain with Lloyd's-backed carriers."
        ]
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
