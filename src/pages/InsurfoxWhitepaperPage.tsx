import React, { useMemo } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import { useI18n } from '@/i18n/I18nContext'

type WhitepaperSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

function getWhitepaperContent(lang: 'de' | 'en') {
  if (lang === 'de') {
    return {
      title: 'Insurfox White Paper',
      subtitle: 'Die KI-basierte Versicherungsplattform für Logistik, Transport und Mobilität',
      summaryTitle: 'Executive Summary',
      summary: [
        'Insurfox adressiert die strukturellen Herausforderungen der Versicherungsbranche mit einer KI-gestützten B2B-Plattform für Versicherung, Logistik, Transport und Mobilität, die alle relevanten Akteure entlang der gesamten Versicherungswertschöpfungskette digital verbindet.',
        'Als EU-weit operierender Versicherungsvermittler kombiniert Insurfox digitale Distribution, Vertrags- und Schadenmanagement mit KI-basierter Risikobewertung, Echtzeit-Analytik und automatisierter Entscheidungsunterstützung, um Effizienz, Transparenz und Geschwindigkeit signifikant zu erhöhen.',
        'Die API-first- und cloudbasierte Plattform ermöglicht eine nahtlose Zusammenarbeit zwischen Maklern, Versicherern und Kunden über ein zentrales System und bildet die Grundlage für eine hochskalierbare Integration in bestehende Versicherungs- und IT-Ökosysteme.',
        'Das Ergebnis ist eine skalierbare, effiziente und transparente Versicherungsinfrastruktur, die Komplexität reduziert, Underwriting- und Schadenprozesse optimiert und nachhaltiges, digitales Wachstum für alle Marktteilnehmer ermöglicht.'
      ],
      sections: [
        {
          id: '01',
          title: '1. Problem: Fragmentierte Prozesse und komplexe historisch gewachsene IT-Systemlandschaften',
          paragraphs: [
            'Fragmentierte, intransparente und teilweise manuelle Prozesse treiben die operativen und administrativen Kosten von Versicherungsunternehmen signifikant in die Höhe.',
            'Gleichzeitig erhöhen intensiver Wettbewerbsdruck, regulatorische Anforderungen und veränderte Kundenerwartungen den Handlungsdruck zur schnellen Einführung digitaler und KI-gestützter Lösungen.',
            'Initiativen zur digitalen Transformation scheitern in der Versicherungswirtschaft häufig an historisch gewachsenen, heterogenen und hochkomplexen Legacy-IT-Infrastrukturen.',
            'In den kommenden fünf Jahren werden Versicherungsunternehmen gezwungen sein, digitale Lösungen sowie KI-gestützte Prozesse und Entscheidungsmechanismen zu implementieren, um Wettbewerbsfähigkeit, operative Effizienz und regulatorische Compliance sicherzustellen.',
            'Der Übergang zu nutzerzentrierten und intuitiven Systemarchitekturen (UX/UI) ist dabei zwingend erforderlich, um den Erwartungen der nächsten Generation von Versicherungsnehmern und versicherten Personen gerecht zu werden.'
          ]
        },
        {
          id: '02',
          title: '2. Insurfox: Die digitale Infrastruktur für die Versicherung der Zukunft',
          paragraphs: [
            'Insurfox entwickelt eine moderne digitale Infrastruktur für Versicherungsprozesse mit Fokus auf Logistik, Transport und Mobilität.',
            'Ziel ist eine UX/UI-first-Plattform mit Frontend-KI, einer API-first-Architektur für skalierbare Integration und einer generativen, selbstlernenden Backend-KI für hochkomplexe Versicherungsworkflows.',
            'Insurfox vernetzt Prozesse und Marktteilnehmer über eine KI-gestützte B2B-Plattform und schafft damit die Grundlage für eine durchgängige Digitalisierung der Versicherungswertschöpfungskette.'
          ]
        },
        {
          id: '03',
          title: '3. Lösung: KI-getriebene B2B-Plattform für Versicherung, Logistik, Transport und Mobilität',
          paragraphs: [
            'Insurfox stellt eine zentrale Plattform bereit, über die sich Versicherer, Makler und Versicherungskunden vernetzen und Versicherungsprozesse vollständig digital abbilden lassen.',
            'Die Plattform umfasst darüber hinaus eine Makler- und Ausschreibungsumgebung, über die sich Makler registrieren und Zugang zu Kunden sowie Versicherungsprodukten erhalten.',
            'Ein leistungsfähiges Backoffice mit angebundenem CRM-System ermöglicht umfangreiche Reporting- und Analysefunktionen. Frontend-KI unterstützt Makler sowohl bei der Neukundengewinnung als auch bei der Bestandskundenbetreuung und -kommunikation.',
            'Eine generative, KI-gestützte Risikobewertung auf Basis historischer Schadendaten ermittelt in Kombination mit dem gewünschten Versicherungsportfolio individuelle Prämien, insbesondere im Rahmen von Vertragsverlängerungen sowie der Portfoliooptimierung und -bereinigung.'
          ]
        },
        {
          id: '04',
          title: '4. Eine Plattform – alle Akteure',
          paragraphs: [
            'Versicherungskunden erhalten einen dedizierten Login und Zugriff auf ein zentrales Dashboard, das Echtzeitdaten zu Policen, Schäden sowie eine vollständige Übersicht aller relevanten Informationen einschließlich historischer Daten bereitstellt.',
            'Dies ermöglicht eine laufende Bewertung von Schadenkosten, Schadenquoten (Loss Ratios) und Schadenursachen in Echtzeit.',
            'Die Insurfox KI analysiert sämtliche Schadenfälle eines Kunden inklusive der einzelnen Prozessschritte und liefert bei Auffälligkeiten konkrete Empfehlungen für korrigierende oder präventive Maßnahmen.',
            'Auch Versicherer erhalten Zugriff auf die Plattform und können sämtliche Prozesse mit den Versicherten vollständig digital und über ein zentrales System auf Basis von Echtzeitdaten abwickeln. Bei Bedarf ermöglicht die Plattform zudem die direkte Kommunikation mit weiteren Prozessbeteiligten.',
            'Die API-first-Architektur erlaubt die nahtlose Anbindung und Integration unterschiedlicher Systeme innerhalb des Versicherungsökosystems über individuell konfigurierte digitale Schnittstellen.'
          ]
        },
        {
          id: '05',
          title: '5. Rollen, Verantwortlichkeiten und Governance',
          paragraphs: [
            'Insurfox agiert als Versicherungsvermittler im EU-Markt und fungiert als Plattformbetreiber für Versicherer, Makler sowie Unternehmen aus den Bereichen Logistik, Transport, Mobilität sowie industrielle und gewerbliche Kunden.',
            'Das Operating Model von Insurfox fokussiert gezielt auf eine reibungslose, vollständig digitale Nutzererfahrung.',
            'Finale Underwriting- und Schadenentscheidungen verbleiben bei den jeweiligen Risikoträgern gemäß den geltenden regulatorischen Anforderungen.'
          ]
        },
        {
          id: '06',
          title: '6. End-to-End-Versicherungsprozesse',
          paragraphs: ['Die Insurfox Plattform unterstützt unter anderem folgende zentrale Funktionen:'],
          bullets: [
            'Digitaler Schadenbearbeitungsprozess (Claims Handling)',
            'Digitale Policierung (Policy Issuance)',
            'Digitales Vertragsmanagement einschließlich Schadenmanagement, Vertragsänderungen (Endorsements) und Vertragsverlängerungen (Renewals)',
            'Integration in das Versicherungsökosystem über digitale Schnittstellen',
            'Verkehrshaftungsversicherung (Carrier’s Liability Insurance)',
            'Flottenversicherung',
            'Transport- und Warenversicherung (Cargo Insurance)',
            'Logistik-Kompositversicherung (u. a. Inhalts-, Haftpflicht-, Cyber-, D&O-, Maschinen- und Warenkreditversicherung)'
          ]
        },
        {
          id: '07',
          title: '7. Transparenz in Prozessen – vernetzte Schäden',
          paragraphs: [
            'Alle Schadenprozesse sind digital vernetzt und transparent abgebildet.',
            'Stakeholder erhalten Echtzeiteinblicke in Schadenstatus, Kosten und Prozesskennzahlen, wodurch operative Effizienz, Risikomanagement und Zusammenarbeit verbessert werden.'
          ]
        },
        {
          id: '08',
          title: '8. Insurfox IaaS für Makler',
          paragraphs: ['Insurfox stellt ein IaaS-Broker-Portal bereit, das umfasst:'],
          bullets: [
            'ein umfassendes Backoffice mit angebundenem CRM-System für mittelständische europäische Versicherungsmakler sowie Managing General Agents',
            'eine Ausschreibungs- und Tenderplattform für das Industrieversicherungsgeschäft',
            'die Nutzung sämtlicher Insurfox Frontend- und Backend-KI-Tools innerhalb des bestehenden Bestands- und Portfoliogeschäfts'
          ]
        },
        {
          id: '09',
          title: '9. Fazit',
          paragraphs: [
            'Insurfox bietet eine KI-getriebene Versicherungsplattform, die die strukturellen Herausforderungen fragmentierter Prozesse und komplexer Legacy-IT adressiert.',
            'Durch die Vernetzung aller relevanten Akteure, die vollständige Digitalisierung der Versicherungsprozesse und den integrierten Einsatz von KI ermöglicht Insurfox effiziente, transparente und skalierbare Versicherungsabläufe für Logistik-, Transport- und Mobilitätsmärkte.'
          ]
        }
      ]
    }
  }

  return {
    title: 'Insurfox White Paper',
    subtitle: 'The AI-Driven Insurance Platform for Logistics, Transport & Mobility',
    summaryTitle: 'Executive Summary',
    summary: [
      'Insurance companies face rising costs and stalled digital transformation due to fragmented processes and complex legacy IT systems. At the same time, competitive pressure, regulatory requirements and changing customer expectations are forcing the rapid adoption of digital, AI-enabled and user-centric solutions.',
      'Insurfox addresses these challenges with an AI-driven B2B platform for insurance, logistics, transport and mobility that digitally connects all stakeholders across the insurance value chain.',
      'Operating as a broker within the EU, Insurfox combines digital distribution, contract and claims management with AI-supported risk assessment, real-time analytics and automated decision support.',
      'The platform enables brokers, insurers and customers to collaborate seamlessly via a single system, while an API-first, cloud-based architecture ensures scalable integration across the insurance ecosystem.',
      'The result is a transparent, efficient and scalable insurance infrastructure that reduces complexity, improves underwriting and claims performance, and enables sustainable digital growth for all participants.'
    ],
    sections: [
      {
        id: '01',
        title: '1. Problem: Fragmented Processes and Complex Legacy IT',
        paragraphs: [
          'Fragmented, non-transparent and partially manual processes result in increased operational and administrative costs for insurance undertakings.',
          'At the same time, competitive pressure, regulatory requirements and changing customer expectations necessitate the rapid adoption of digital and AI-supported solutions.',
          'Digital transformation initiatives frequently fail due to historically grown, heterogeneous and highly complex legacy IT infrastructures within insurance companies.',
          'Within the next five years, insurance undertakings will be required to implement digital solutions as well as AI-supported processes and decision-making mechanisms in order to maintain competitiveness, operational efficiency and regulatory compliance.',
          'The transition towards user-centric and intuitive system architectures (UX/UI) is mandatory to meet the expectations of the next generation of policyholders and insured parties.'
        ]
      },
      {
        id: '02',
        title: '2. Insurfox: Building the Digital Infrastructure for the Future of Insurance',
        paragraphs: [
          'Insurfox builds a modern digital infrastructure for insurance markets with a focus on logistics, transport and mobility.',
          'The platform is designed around:',
          'a UX/UI-first experience layer supported by frontend AI,',
          'an API-first core architecture for scalable integration,',
          'and generative, self-learning backend AI for high-complexity insurance workflows.',
          'Insurfox connects processes and stakeholders across the insurance ecosystem through a modern, AI-supported B2B platform.'
        ]
      },
      {
        id: '03',
        title: '3. Solution: AI-Driven B2B Platform for Insurance',
        paragraphs: [
          'Insurfox provides a single platform that integrates insurers, brokers and customers.',
          'Insurance customers receive a dedicated login and access a dashboard providing real-time data on their insurance policies, claims and a complete overview of all data, including historical information.',
          'This enables real-time evaluation of claims costs, loss ratios and root causes of claims.',
          'The Insurfox AI analyzes all claims of the customer, including individual process steps, and provides recommendations for corrective or preventive actions in case of anomalies.',
          'Insurers can handle all processes with the insured fully digitally via a single system using live data. Where required, insurers can directly engage in communication with other process participants, such as reinsurers.'
        ]
      },
      {
        id: '04',
        title: '4. One Platform – Multi Access',
        paragraphs: [
          'Insurfox follows a “one platform – multi access” approach.',
          'Different user groups access the same core system according to their role and authorization:'
        ],
        bullets: ['insurers', 'brokers', 'logistics and transport companies', 'industrial and commercial clients']
      },
      {
        id: '05',
        title: '5. AI-Supported Insurance Processes',
        paragraphs: [
          'AI is embedded across the platform to support core insurance workflows.',
          'Frontend AI supports brokers in:',
          'Generative AI-supported risk assessment, based on historical claims data, determines individual premiums in combination with the desired insurance portfolio.',
          'This applies in particular to:'
        ],
        bullets: [
          'customer acquisition',
          'portfolio customer management',
          'communication',
          'policy renewal (prolongation)',
          'portfolio optimization',
          'portfolio clean-up'
        ]
      },
      {
        id: '06',
        title: '6. Roles and Responsibilities',
        paragraphs: [
          'Insurfox operates as an insurance broker within the EU market and as a platform operator for insurers, brokers, logistics, transport, mobility as well as industrial and commercial clients.',
          'The operating model deliberately emphasizes a frictionless digital experience while clearly separating operational roles and responsibilities.',
          'Final underwriting and claims settlement decisions remain with the respective risk carrier, in accordance with applicable regulatory requirements.'
        ]
      },
      {
        id: '07',
        title: '7. Insurance Processes Covered',
        paragraphs: ['The Insurfox platform supports:'],
        bullets: [
          'claims handling processes',
          'digital policy issuance',
          'digital contract management including claims management, policy endorsements and renewals',
          'integration into the broader insurance ecosystem',
          'carrier’s liability insurance',
          'fleet insurance',
          'cargo insurance',
          'logistics composite insurance, including:',
          'contents insurance',
          'general liability insurance',
          'photovoltaic insurance',
          'cyber insurance',
          'D&O insurance',
          'legal expenses insurance',
          'electronic equipment insurance',
          'machinery insurance',
          'trade credit insurance'
        ]
      },
      {
        id: '08',
        title: '8. Transparent Processes – Connected Claims',
        paragraphs: [
          'All claims-related processes are digitally connected and transparent.',
          'Stakeholders gain real-time visibility into claims status, costs and performance metrics.',
          'This transparency supports improved risk management, operational efficiency and collaboration across the insurance value chain.'
        ]
      },
      {
        id: '09',
        title: '9. Insurfox IaaS for Brokers',
        paragraphs: ['Insurfox provides an IaaS broker portal including:'],
        bullets: [
          'a comprehensive back-office',
          'CRM integration',
          'reporting capabilities for mid-sized European brokers and managing general agents (MGAs / coverholders)',
          'a tendering environment for industrial insurance business',
          'frontend and backend AI tools within their existing portfolio business'
        ]
      },
      {
        id: '10',
        title: '10. Conclusion',
        paragraphs: [
          'Insurfox delivers an AI-driven insurance platform that addresses the structural challenges of fragmented processes and legacy IT in insurance.',
          'By connecting stakeholders, digitizing workflows and embedding AI across the insurance lifecycle, Insurfox enables efficient, transparent and scalable insurance operations for logistics, transport and mobility markets.'
        ]
      }
    ]
  }
}

export default function InsurfoxWhitepaperPage() {
  const { lang } = useI18n()
  const content = useMemo(() => getWhitepaperContent(lang), [lang])

  return (
    <section className="page insurfox-whitepaper-page">
      <div className="insurfox-whitepaper-shell">
        <div className="framework-header-row insurfox-whitepaper-header">
          <Header
            title={content.title}
            subtitle={content.subtitle}
            subtitleColor="#65748b"
          />
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
            <h2>{content.summaryTitle}</h2>
            {content.summary.map((paragraph) => (
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
              {section.paragraphs.map((paragraph) => (
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
          <h2>{content.summaryTitle}</h2>
          {content.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {content.sections.map((section) => (
          <div key={section.id} className="framework-print-section">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
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
