import React, { useMemo } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import { useI18n } from '@/i18n/I18nContext'

type SectionBlock = {
  id: string
  title: string
  intro?: string
  bullets?: string[]
  text?: string
}

function getSections(lang: 'de' | 'en'): SectionBlock[] {
  if (lang === 'en') {
    return [
      {
        id: 'intro',
        title: 'Strategic Technology & AI Governance Deep Dive',
        intro: 'Insurfox IaaS – Enabling Regulated AI at Scale',
        text:
          'This document provides a strategic deep dive into the technology architecture and AI governance model of Insurfox IaaS. It builds on previous presentations and whitepapers and addresses investment committees and strategic partners in the insurance and reinsurance domain.'
      },
      {
        id: 'purpose',
        title: '1. Purpose of this document',
        bullets: ['technology maturity and architecture decisions', 'regulatory certainty for AI usage', 'long-term strategic control over AI systems', 'scalability in regulated insurance markets'],
        text: 'This document serves as the basis for a deeper collaboration.'
      },
      {
        id: 'context',
        title: '2. Context and strategic baseline',
        bullets: ['incurring regulatory risks', 'losing operational control', 'creating strategic dependencies on external AI providers'],
        text:
          'Insurers and reinsurers face the challenge of using AI productively. Insurfox addresses this gap by providing AI as an integrated infrastructure component within an Insurance IaaS platform. With this solution it is possible to avoid:'
      },
      {
        id: 'overview',
        title: '3. Insurfox IaaS overview',
        bullets: ['insurance process logic', 'scalable IaaS structures', 'native, internally operated AI systems', 'technical AI and data governance'],
        text:
          'Insurfox is an AI-native Insurance IaaS platform that covers core insurance processes including underwriting, pricing, claims, fleet and portfolio management.'
      },
      {
        id: 'architecture',
        title: '4. Technology approach and architecture',
        bullets: ['modular IaaS structure', 'clear tenant separation', 'defined data and AI domains', 'end-to-end auditability'],
        text: 'This architecture enables controlled integration of new products, insurers and markets.'
      },
      {
        id: 'native-ai',
        title: '5. Native AI as strategic infrastructure',
        bullets: ['no external AI SaaS usage', 'no dependency on hyperscalers or foundation models', 'no transfer of training or inference data'],
        text:
          'All AI models are operated and controlled within Insurfox IaaS. AI is used exclusively for decision support.'
      },
      {
        id: 'ai-use',
        title: '6. Strategic control over AI',
        bullets: ['models and model versions', 'training and inference data', 'usage contexts and use cases', 'outputs and decision logic'],
        text: 'Insurers retain ownership of business decisions, regulatory responsibility and strategic development.'
      },
      {
        id: 'regulatory',
        title: '7. Regulatory security as the foundation',
        bullets: ['GDPR', 'BaFin supervisory requirements', 'EU AI Act (incl. high-risk AI systems)', 'EIOPA digitalisation guidelines', 'Lloyd’s minimum standards and governance requirements'],
        text: 'Regulatory requirements are technically embedded, not retrofitted.'
      },
      {
        id: 'high-risk',
        title: '8. High-risk AI readiness',
        bullets: ['clearly defined AI use cases', 'mandatory human-in-the-loop', 'full model lifecycle management', 'documented release and change processes'],
        text: 'Insurfox assumes a conservative high-risk classification and provides planning certainty.'
      },
      {
        id: 'data-governance',
        title: '9. Data governance and privacy',
        bullets: ['purpose-bound', 'minimised', 'lawful basis'],
        text:
          'Core pillars include role-based access control, tenant isolation and full audit logging. Data ownership remains with the insurer.'
      },
      {
        id: 'sensitive',
        title: '10. Handling of sensitive data',
        bullets: ['health data', 'biometric data', 'movement and location data'],
        text: 'Processing only occurs with explicit consent or statutory insurance basis.'
      },
      {
        id: 'sensitive-controls',
        title: '11. Enhanced controls for sensitive data',
        bullets: ['segregated data and AI domains', 'restricted model access', 'separate processing and analysis pipelines', 'enhanced logging and review duties'],
        text: 'No cross-tenant or cross-line usage of sensitive data.'
      },
      {
        id: 'audit',
        title: '12. Auditability and traceability',
        bullets: ['input data used (pseudonymised)', 'model versions and configurations', 'generated outputs', 'timestamps', 'user and role interactions'],
        text: 'Retention is aligned with regulatory requirements.'
      },
      {
        id: 'outsourcing',
        title: '13. Outsourcing and third-party risks',
        bullets: ['no external AI service providers', 'no transfer of training or inference data', 'no dependency on external AI models'],
        text: 'This significantly reduces regulatory complexity.'
      },
      {
        id: 'sovereignty',
        title: '14. Data sovereignty, security and residency',
        bullets: ['configurable data residency within the EU', 'logical tenant separation', 'encryption at rest and in transit', 'access controls, monitoring and incident response processes'],
        text: 'Insurers retain full data control at all times.'
      },
      {
        id: 'maturity',
        title: '15. Market maturity and current status',
        bullets: [
          'one product (carrier’s liability) is live',
          'policies are active',
          'smaller logistics and transport companies use the platform',
          'a larger insurer is an active partner',
          'additional insurers are in definition phase after letters of intent'
        ],
        text: 'Overall status: ~75% architecture and concept maturity with ongoing MVP implementation.'
      },
      {
        id: 'framework',
        title: '16. Strategic framework: Europe, Emirates and Lloyd’s',
        bullets: [
          'Europe: operations, regulation, data residency',
          'Emirates: capital base and international insurance expertise',
          'Lloyd’s: governance and trust layer for European market access'
        ],
        text: 'This structure enables international collaboration without regulatory compromises.'
      },
      {
        id: 'business',
        title: '17. Business model and monetisation',
        bullets: [
          'product and role licences within the IaaS',
          'flat fees for claims and fleet management',
          'revenue-share models with insurers',
          'platform and marketplace approaches'
        ],
        text: 'Monetisation is scalable and focused on long-term partnerships.'
      },
      {
        id: 'market',
        title: '18. Market differentiation',
        bullets: ['full control over AI and data', 'regulatory-integrated governance', 'no strategic dependencies'],
        text: 'This is central for insurers and reinsurers.'
      },
      {
        id: 'summary',
        title: '19. Summary and investment perspective',
        bullets: ['technological lead', 'regulatory security', 'strategic control over AI', 'trust and compliance capability', 'access to European insurance markets'],
        text:
          'Insurfox addresses the controlled, regulatorily sound use of AI in productive insurance processes.'
      },
      {
        id: 'closing',
        title: 'Closing statement',
        text: 'Insurfox treats AI not as an experiment, but as critical infrastructure for regulated insurance markets.'
      }
    ]
  }

  return [
    {
      id: 'intro',
      title: 'Strategic Technology & AI Governance Deep Dive',
      intro: 'Insurfox IaaS – Enabling Regulated AI at Scale',
      text:
        'Dieses Dokument stellt einen strategischen Deep Dive in die technologische Architektur und das AI-Governance-Modell der Insurfox IaaS dar. Es baut auf vorangegangenen Präsentationen und Whitepapern auf und richtet sich an Investment Committees sowie strategische Partner aus dem Versicherungs- und Rückversicherungsumfeld.'
    },
    {
      id: 'purpose',
      title: '1. Zweck dieses Dokuments',
      bullets: [
        'technologischer Reife und Architekturentscheidungen',
        'regulatorischer Sicherheit im Einsatz von KI',
        'langfristiger strategischer Kontrolle über KI-Systeme',
        'Skalierbarkeit in regulierten Versicherungsmärkten'
      ],
      text: 'Dieses Dokument dient als Entscheidungsgrundlage für eine vertiefte Zusammenarbeit.'
    },
    {
      id: 'context',
      title: '2. Ausgangslage und strategischer Kontext',
      bullets: [
        'regulatorische Risiken einzugehen',
        'operative Kontrolle zu verlieren',
        'strategische Abhängigkeiten von externen KI-Anbietern zu schaffen'
      ],
      text:
        'Versicherer und Rückversicherer stehen vor der Herausforderung, KI produktiv zu nutzen. Insurfox adressiert diese Lücke, indem KI als integrierte Infrastrukturkomponente innerhalb einer Insurance-IaaS bereitgestellt wird. Mit dieser Lösung kann es vermieden werden:'
    },
    {
      id: 'overview',
      title: '3. Überblick Insurfox IaaS',
      bullets: [
        'versicherungsfachliche Prozesslogik',
        'skalierbare IaaS-Strukturen',
        'native, intern betriebene KI-Systeme',
        'technische AI- und Data-Governance'
      ],
      text:
        'Insurfox ist eine AI-native Insurance-IaaS-Plattform zur Abbildung zentraler Versicherungsprozesse, darunter Underwriting, Pricing, Claims, Fleet- und Bestandsmanagement.'
    },
    {
      id: 'architecture',
      title: '4. Technologischer Ansatz und Architektur',
      bullets: [
        'modulare IaaS-Struktur',
        'klare Mandantentrennung',
        'definierte Daten- und KI-Domänen',
        'durchgängige Auditierbarkeit'
      ],
      text: 'Diese Architektur erlaubt es, neue Produkte, Versicherer und Märkte kontrolliert zu integrieren.'
    },
    {
      id: 'native-ai',
      title: '5. Native KI als strategische Infrastruktur',
      bullets: [
        'keine Nutzung externer AI-SaaS-Angebote',
        'keine Abhängigkeit von Hyperscalern oder Foundation Models',
        'keine Weitergabe von Trainings- oder Inferenzdaten'
      ],
      text:
        'Alle KI-Modelle werden innerhalb der Insurfox IaaS betrieben und kontrolliert. KI wird ausschließlich entscheidungsunterstützend eingesetzt.'
    },
    {
      id: 'ai-use',
      title: '6. Strategische Kontrolle über KI',
      bullets: [
        'Modelle und Modellversionen',
        'Trainings- und Inferenzdaten',
        'Einsatzkontexte und Use-Cases',
        'Outputs und Entscheidungslogiken'
      ],
      text: 'Versicherer behalten die Hoheit über fachliche Entscheidungen, regulatorische Verantwortung und strategische Weiterentwicklung.'
    },
    {
      id: 'regulatory',
      title: '7. Regulatorische Sicherheit als Fundament',
      bullets: [
        'DSGVO / GDPR',
        'BaFin-aufsichtsrechtliche Anforderungen',
        'EU AI Act (inkl. High-Risk-KI-Systeme)',
        'EIOPA-Leitlinien zur Digitalisierung',
        'Lloyd’s Mindeststandards und Governance-Anforderungen'
      ],
      text: 'Regulatorische Anforderungen sind technisch verankert, nicht nachgelagert.'
    },
    {
      id: 'high-risk',
      title: '8. High-Risk-KI-Readiness',
      bullets: [
        'klar definierte KI-Use-Cases',
        'verpflichtender Human-in-the-Loop',
        'vollständiges Model Lifecycle Management',
        'dokumentierte Release- und Änderungsprozesse'
      ],
      text: 'Insurfox geht konservativ von High-Risk-Einstufung aus und schafft Planungssicherheit.'
    },
    {
      id: 'data-governance',
      title: '9. Data Governance und Datenschutz',
      bullets: ['zweckgebunden', 'minimiert', 'auf rechtmäßiger Grundlage'],
      text:
        'Grundpfeiler der Data Governance sind rollenbasierte Zugriffskontrolle, Mandantentrennung und vollständiges Audit-Logging. Die Datenhoheit verbleibt beim jeweiligen Versicherer.'
    },
    {
      id: 'sensitive',
      title: '10. Umgang mit sensiblen Daten',
      bullets: ['Gesundheitsdaten', 'biometrische Daten', 'Bewegungs- und Standortdaten'],
      text: 'Die Verarbeitung erfolgt ausschließlich mit expliziter Einwilligung oder gesetzlicher Versicherungsgrundlage.'
    },
    {
      id: 'sensitive-controls',
      title: '11. Erweiterte Schutzmaßnahmen für sensible Daten',
      bullets: [
        'getrennte Daten- und KI-Domänen',
        'eingeschränkten Zugriff auf Modelle',
        'separate Verarbeitungs- und Analysepipelines',
        'erweiterte Logging- und Reviewpflichten'
      ],
      text: 'Eine mandanten- oder spartenübergreifende Nutzung sensibler Daten findet nicht statt.'
    },
    {
      id: 'audit',
      title: '12. Auditierbarkeit und Nachvollziehbarkeit',
      bullets: [
        'verwendete Eingabedaten (pseudonymisiert)',
        'Modellversionen und Konfigurationen',
        'erzeugte Outputs',
        'Zeitstempel',
        'Nutzer- und Rolleninteraktionen'
      ],
      text: 'Die Aufbewahrung erfolgt gemäß regulatorischer Anforderungen.'
    },
    {
      id: 'outsourcing',
      title: '13. Outsourcing- und Drittparteirisiken',
      bullets: [
        'keine externen KI-Service-Provider',
        'keine Weitergabe von Trainings- oder Inferenzdaten',
        'keine Abhängigkeit von externen KI-Modellen'
      ],
      text: 'Dadurch wird die regulatorische Komplexität deutlich reduziert.'
    },
    {
      id: 'sovereignty',
      title: '14. Datensouveränität, Sicherheit und Residenz',
      bullets: [
        'konfigurierbare Datenresidenz innerhalb der EU',
        'logische Mandantentrennung',
        'Verschlüsselung von Daten im Ruhezustand und bei Übertragung',
        'Zugriffskontrollen, Monitoring und Incident-Response-Prozesse'
      ],
      text: 'Versicherer behalten jederzeit die volle Datenhoheit.'
    },
    {
      id: 'maturity',
      title: '15. Marktreife und aktueller Status',
      bullets: [
        'ein Produkt (Frachtführerhaftpflicht) ist produktiv im Einsatz',
        'Policen sind aktiv',
        'kleinere Logistik- und Transportunternehmen nutzen die Plattform',
        'ein größerer Versicherer ist aktiver Partner',
        'weitere Versicherer befinden sich nach Letter of Intent in der Definitionsphase'
      ],
      text: 'Der Gesamtstatus liegt bei ca. 75 % Architektur- und Konzeptreife bei laufender MVP-Umsetzung.'
    },
    {
      id: 'framework',
      title: '16. Strategischer Rahmen: Europa, Emirate und Lloyd’s',
      bullets: [
        'Europa: operative Nutzung, Regulierung, Datenresidenz',
        'Emirate: Kapitalbasis und internationale Versicherungsexpertise',
        'Lloyd’s: Governance- und Trust-Layer für den Zugang zum europäischen Markt'
      ],
      text: 'Diese Struktur ermöglicht internationale Zusammenarbeit ohne regulatorische Abstriche.'
    },
    {
      id: 'business',
      title: '17. Geschäftsmodell und Monetarisierung',
      bullets: [
        'Produkt- und Rollenlizenzen innerhalb der IaaS',
        'Flat Fees für Claims- und Fleet-Management',
        'Revenue-Share-Modelle mit Versicherungen',
        'Plattform- und Marketplace-Ansätze'
      ],
      text: 'Die Monetarisierung ist skalierbar und auf langfristige Partnerschaften ausgelegt.'
    },
    {
      id: 'market',
      title: '18. Abgrenzung zum Markt',
      bullets: [
        'vollständige Kontrolle über KI und Daten',
        'regulatorisch integrierte Governance',
        'keine strategischen Abhängigkeiten'
      ],
      text: 'Dies ist insbesondere für Versicherer und Rückversicherer von zentraler Bedeutung.'
    },
    {
      id: 'summary',
      title: '19. Zusammenfassung und Investment-Perspektive',
      bullets: [
        'technologischen Vorsprung',
        'regulatorische Sicherheit',
        'strategische Kontrolle über KI',
        'Vertrauen und Compliance-Fähigkeit',
        'Zugang zu europäischen Versicherungsmärkten'
      ],
      text:
        'Insurfox adressiert den kontrollierten, regulatorisch sauberen Einsatz von KI in produktiven Versicherungsprozessen.'
    },
    {
      id: 'closing',
      title: 'Schlussbemerkung',
      text: 'Insurfox versteht KI nicht als Experiment, sondern als kritische Infrastruktur für regulierte Versicherungsmärkte.'
    }
  ]
}

export default function StrategicDeepDivePage() {
  const { lang } = useI18n()
  const sections = useMemo(() => getSections(lang), [lang])
  const headerTitle = 'Strategic Technology & AI Governance Deep Dive'
  const headerSubtitle = 'Insurfox IaaS – Enabling Regulated AI at Scale'

  return (
    <section className="page strategic-deep-dive-page">
        <div className="strategic-shell">
          <div className="framework-header-row strategic-header">
            <Header
              title={headerTitle}
              subtitle={headerSubtitle}
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
          <div className="strategic-grid">
            {sections.map((section, index) => (
              <Card
                key={section.id}
                title={section.title}
                className={`card strategic-card${index === 0 ? ' strategic-card--full' : ''}`}
              >
                {section.intro && <p className="framework-paragraph">{section.intro}</p>}
                {section.text && <p className="framework-paragraph">{section.text}</p>}
                {section.bullets && (
                  <ul className="framework-list">
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
          <h1>{headerTitle}</h1>
          <p className="framework-print-subtitle">{headerSubtitle}</p>
          {sections.map((section) => (
            <div key={section.id} className="framework-print-section">
              <h2>{section.title}</h2>
              {section.intro && <p>{section.intro}</p>}
              {section.text && <p>{section.text}</p>}
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
