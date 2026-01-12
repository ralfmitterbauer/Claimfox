import React, { useMemo } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import type { Lang } from '@/i18n/translations'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'

type SectionBlock = {
  id: string
  title: string
  intro?: string
  bullets?: string[]
  text?: string
}

function getSections(lang: Lang): SectionBlock[] {
  if (lang === 'en') {
    return [
      {
        id: 'intro',
        title: 'Regulatory & AI Governance Framework',
        intro:
          'This document describes the Regulatory & AI Governance Framework of the Insurfox AI IaaS. It explains how AI is used in insurance processes in a controlled, traceable, and compliant manner.',
        text:
          'The focus is on governance structures, responsibilities, data and model control, and ensuring supervisory requirements for regulated insurance markets.'
      },
      {
        id: 'audience',
        title: 'Audience',
        bullets: ['Supervisory authorities', 'Insurance companies', 'Reinsurers', 'Internal and external audit bodies']
      },
      {
        id: 'scope',
        title: 'Regulatory scope',
        bullets: [
          'GDPR / DSGVO',
          'BaFin supervisory requirements',
          'EU AI Act (especially high-risk AI systems)',
          'EIOPA guidance on digitalisation and AI',
          'Lloyd’s minimum standards and comparable regimes'
        ],
        text:
          'The scope includes insurance, health insurance, mobility and telematics-based insurance, as well as InsurTech platforms.'
      },
      {
        id: 'roles',
        title: 'Role of Insurfox and responsibilities',
        bullets: [
          'Insurfox acts solely as a technology and process platform.',
          'Insurfox is neither risk carrier nor decision maker under insurance law.',
          'Decision authority remains with the insurer or reinsurer.',
          'Underwriting, pricing, and claims decisions are not automated.',
          'Insurfox provides decision support, analytics, and insights only.'
        ],
        text:
          'This separation ensures responsibilities, liability, and supervisory obligations remain clearly assigned.'
      },
      {
        id: 'ai-classification',
        title: 'AI usage and classification',
        bullets: [
          'Risk assessment and indicators',
          'Pricing and tariff recommendations',
          'Fraud and anomaly detection',
          'Portfolio, process, and inventory analytics'
        ],
        text:
          'Autonomous, legally binding decisions by AI do not occur. Human-in-the-loop is mandatory for all material decisions.'
      },
      {
        id: 'ai-governance',
        title: 'AI Governance Framework',
        bullets: [
          'Clearly defined AI use cases and boundaries',
          'Full model lifecycle management',
          'Versioning and documentation of all models',
          'Controlled release and change processes',
          'Traceable and explainable AI outputs'
        ],
        text: 'Governance is technically enforced and continuously auditable.'
      },
      {
        id: 'data-governance',
        title: 'Data governance and privacy',
        bullets: [
          'Purpose limitation',
          'Data minimisation',
          'Lawful processing',
          'Role-based access control',
          'Complete audit logging'
        ],
        text: 'Data ownership always remains with the insurer.'
      },
      {
        id: 'sensitive-data',
        title: 'Handling of sensitive data',
        bullets: ['Health data', 'Biometric data', 'Movement and location data'],
        text:
          'Processing of sensitive data occurs only on the basis of explicit consent or statutory insurance obligations.'
      },
      {
        id: 'sensitive-controls',
        title: 'Additional safeguards for sensitive data',
        bullets: [
          'Segregated data and processing domains',
          'Restricted access to models and training pipelines',
          'Separate processing and analytics paths',
          'Enhanced logging, review, and approval requirements'
        ],
        text: 'No cross-line or cross-tenant use of sensitive data.'
      },
      {
        id: 'auditability',
        title: 'Auditability and traceability',
        bullets: [
          'Input data used (pseudonymised)',
          'Model version and configuration',
          'AI outputs generated',
          'Timestamps',
          'User and role interactions'
        ],
        text:
          'Log retention follows regulatory requirements and enables supervisory review at any time.'
      },
      {
        id: 'outsourcing',
        title: 'Outsourcing, third parties, and model dependencies',
        bullets: [
          'No external AI service providers',
          'Training and inference data are not shared with third parties',
          'No dependency on external foundation models'
        ],
        text: 'Outsourcing and third-party risks are significantly reduced.'
      },
      {
        id: 'security',
        title: 'Data sovereignty, tenant isolation, and security',
        bullets: [
          'Data residency configurable by jurisdiction',
          'No cross-tenant data or model usage',
          'Logical tenant isolation at infrastructure level',
          'Encryption at rest and in transit',
          'Access controls, monitoring, and incident response processes'
        ]
      },
      {
        id: 'eu-ai-act',
        title: 'EU AI Act – classification and compliance',
        text:
          'AI systems deployed within Insurfox AI IaaS are classified, depending on use case, as high-risk AI systems under the EU AI Act.',
        bullets: ['Risk management', 'Data and model governance', 'Transparency', 'Human oversight', 'Auditability']
      },
      {
        id: 'summary',
        title: 'Summary',
        text:
          'Insurfox AI IaaS provides a structured Regulatory & AI Governance Framework that enables controlled AI use in regulated insurance markets. Governance, transparency, and supervisory readiness are integral parts of the platform architecture.'
      }
    ]
  }

  return [
    {
      id: 'intro',
      title: 'Regulatory & AI Governance Framework',
      intro:
        'Dieses Dokument beschreibt das Regulatory & AI Governance Framework der Insurfox AI IaaS. Es erläutert, wie künstliche Intelligenz innerhalb von Versicherungsprozessen kontrolliert, nachvollziehbar und regulatorisch konform eingesetzt wird.',
      text:
        'Der Fokus liegt auf Governance-Strukturen, Verantwortlichkeiten, Daten- und Modellkontrolle sowie auf der Sicherstellung der aufsichtsrechtlichen Anforderungen für regulierte Versicherungsmärkte.'
    },
    {
      id: 'audience',
      title: 'Adressaten',
      bullets: ['Aufsichtsbehörden', 'Versicherungsunternehmen', 'Rückversicherer', 'Interne und externe Prüfungsinstanzen']
    },
    {
      id: 'scope',
      title: 'Regulatorischer Geltungsbereich',
      bullets: [
        'DSGVO / GDPR',
        'BaFin-aufsichtsrechtliche Anforderungen',
        'EU AI Act (insbesondere High-Risk-KI-Systeme)',
        'EIOPA-Leitlinien zur Digitalisierung und KI',
        'Mindeststandards von Lloyd’s und vergleichbaren Aufsichtsregimen'
      ],
      text:
        'Der Anwendungsbereich umfasst unter anderem Versicherungen, Krankenversicherungen, Mobilitäts- und Telematik-basierte Versicherungen sowie InsurTech-Plattformen.'
    },
    {
      id: 'roles',
      title: 'Rolle von Insurfox und Verantwortlichkeiten',
      bullets: [
        'Insurfox agiert ausschließlich als Technologie- und Prozessplattform.',
        'Insurfox ist weder Risikoträger noch Entscheidungsträger im versicherungsrechtlichen Sinne.',
        'Die Entscheidungshoheit verbleibt stets beim Versicherer bzw. Rückversicherer.',
        'Underwriting-, Pricing- und Schadenentscheidungen werden nicht automatisiert getroffen.',
        'Insurfox stellt ausschließlich Entscheidungsunterstützung, Analysen und Hinweise bereit.'
      ],
      text:
        'Diese klare Trennung stellt sicher, dass Verantwortlichkeiten, Haftung und Aufsichtspflichten eindeutig zugeordnet bleiben.'
    },
    {
      id: 'ai-classification',
      title: 'Einsatz und Klassifikation von KI',
      bullets: [
        'Risikobewertung und Risikoindikatoren',
        'Preis- und Tarifempfehlungen',
        'Betrugs- und Anomalieerkennung',
        'Portfolio-, Prozess- und Bestandsanalysen'
      ],
      text:
        'Autonome, rechtsverbindliche Entscheidungen durch KI finden nicht statt. Für alle wesentlichen Entscheidungen ist ein Human-in-the-Loop verbindlich vorgesehen.'
    },
    {
      id: 'ai-governance',
      title: 'AI Governance Framework',
      bullets: [
        'klar definierte KI-Use-Cases und Einsatzgrenzen',
        'vollständiges Model Lifecycle Management',
        'Versionierung und Dokumentation aller Modelle',
        'kontrollierte Release- und Änderungsprozesse',
        'nachvollziehbare und erklärbare KI-Outputs'
      ],
      text: 'Governance wird technisch erzwungen und ist jederzeit überprüfbar.'
    },
    {
      id: 'data-governance',
      title: 'Data Governance und Datenschutz',
      bullets: [
        'Zweckbindung',
        'Datenminimierung',
        'Rechtmäßige Verarbeitung',
        'Rollenbasierte Zugriffskontrolle',
        'Vollständiges Audit-Logging'
      ],
      text: 'Die Datenhoheit verbleibt stets beim jeweiligen Versicherer.'
    },
    {
      id: 'sensitive-data',
      title: 'Umgang mit sensiblen Daten',
      bullets: ['Gesundheitsdaten', 'biometrische Daten', 'Bewegungs- und Standortdaten'],
      text:
        'Die Verarbeitung sensibler Daten erfolgt ausschließlich auf Basis ausdrücklicher Einwilligung oder gesetzlicher Versicherungsverpflichtungen.'
    },
    {
      id: 'sensitive-controls',
      title: 'Zusätzliche Schutzmaßnahmen für sensible Daten',
      bullets: [
        'getrennte Daten- und Verarbeitungsdomänen',
        'eingeschränkter Zugriff auf Modelle und Trainingspipelines',
        'separate Verarbeitungs- und Analysepfade',
        'erweiterte Logging-, Review- und Freigabeanforderungen'
      ],
      text: 'Eine sparten- oder mandantenübergreifende Nutzung sensibler Daten findet nicht statt.'
    },
    {
      id: 'auditability',
      title: 'Auditierbarkeit und Nachvollziehbarkeit',
      bullets: [
        'verwendete Eingabedaten (pseudonymisiert)',
        'Modellversion und Konfiguration',
        'erzeugte KI-Outputs',
        'Zeitstempel',
        'Nutzer- und Rolleninteraktionen'
      ],
      text:
        'Die Aufbewahrung der Protokolle erfolgt gemäß regulatorischer Aufbewahrungsanforderungen und ermöglicht jederzeit eine aufsichtsrechtliche Prüfung.'
    },
    {
      id: 'outsourcing',
      title: 'Outsourcing, Drittanbieter und Modellabhängigkeiten',
      bullets: [
        'Es werden keine externen KI-Service-Provider eingesetzt.',
        'Trainings- und Inferenzdaten werden nicht an Dritte weitergegeben.',
        'Es besteht keine Abhängigkeit von externen Foundation Models.'
      ],
      text: 'Dadurch werden Outsourcing- und Drittparteirisiken signifikant reduziert.'
    },
    {
      id: 'security',
      title: 'Datensouveränität, Mandantentrennung und Sicherheit',
      bullets: [
        'Datenresidenz ist je Jurisdiktion konfigurierbar.',
        'Keine Cross-Tenant-Datennutzung oder Modellnutzung.',
        'Logische Mandantentrennung auf Infrastruktur-Ebene.',
        'Verschlüsselung von Daten im Ruhezustand und während der Übertragung.',
        'Zugriffskontrollen, Monitoring und Incident-Response-Prozesse.'
      ]
    },
    {
      id: 'eu-ai-act',
      title: 'EU AI Act – Einordnung und Konformität',
      text:
        'Die innerhalb der Insurfox AI IaaS eingesetzten KI-Systeme sind – abhängig vom Use Case – als High-Risk-KI-Systeme im Sinne des EU AI Act einzuordnen.',
      bullets: ['Risikomanagement', 'Daten- und Modellgovernance', 'Transparenz', 'menschliche Aufsicht', 'Auditierbarkeit']
    },
    {
      id: 'summary',
      title: 'Zusammenfassung',
      text:
        'Die Insurfox AI IaaS stellt ein strukturiertes Regulatory & AI Governance Framework bereit, das den kontrollierten Einsatz von KI in regulierten Versicherungsmärkten ermöglicht. Governance, Transparenz und Aufsicht sind integrale Bestandteile der Plattformarchitektur und bilden die Grundlage für eine nachhaltige, regulatorisch konforme Nutzung von KI.'
    }
  ]
}

export default function RegulatoryGovernancePage() {
  const { lang } = useI18n()
  const sections = useMemo(() => getSections(lang), [lang])

  return (
    <section className="page regulatory-framework-page">
        <div className="framework-header-row">
          <Header
            title="Regulatory & AI Governance Framework"
            subtitle={lang === 'en' ? 'Regulatory overview for supervision, audits, and governance' : 'Regulatorische Übersicht für Aufsicht, Audits und Governance'}
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
        <div className="framework-print">
          <div className="framework-print-header">
            <img src={InsurfoxLogo} alt="Insurfox" />
          </div>
          <h1>Regulatory & AI Governance Framework</h1>
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
        <div className="regulatory-framework-grid">
          <div className="regulatory-framework-column">
            {sections.slice(0, 7).map((section) => (
              <Card key={section.id} title={section.title}>
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
          <div className="regulatory-framework-column">
            {sections.slice(7).map((section) => (
              <Card key={section.id} title={section.title}>
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
    </section>
  )
}
