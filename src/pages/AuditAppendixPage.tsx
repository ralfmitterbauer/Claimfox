import React, { useMemo } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import InternAuthGate from '@/components/InternAuthGate'
import { useI18n } from '@/i18n/I18nContext'
import type { Lang } from '@/i18n/translations'

type TableRow = {
  label: string
  value: string
}

type SectionBlock = {
  id: string
  title: string
  intro?: string
  bullets?: string[]
  subSections?: { title: string; bullets?: string[]; text?: string }[]
  table?: { headers: [string, string]; rows: TableRow[] }
  text?: string
}

function getAuditContent(lang: Lang) {
  if (lang === 'en') {
    return {
      title: 'Audit Appendix',
      subtitle: 'Regulatory & AI Governance Framework – Insurfox AI IaaS',
      left: [
        {
          id: 'A1',
          title: 'A.1 Purpose of this Audit Appendix',
          intro:
            'This document supplements the Regulatory & AI Governance Framework of Insurfox AI IaaS and serves as an audit-ready reference for:',
          bullets: ['Supervisory authorities', 'Internal and external auditors', 'Compliance, risk and governance functions', 'Due diligence reviews'],
          text: 'The focus is on traceability, controllability, and clear accountability.'
        },
        {
          id: 'A2',
          title: 'A.2 System boundary',
          subSections: [
            {
              title: 'In scope',
              bullets: ['Insurfox AI IaaS as a technology and process platform']
            },
            {
              title: 'Out of scope',
              bullets: ['Risk carrying', 'Final underwriting, pricing or claims decisions', 'Insurance product responsibility']
            }
          ],
          text: 'Insurfox acts solely as a technical provider of decision support.'
        },
        {
          id: 'A3',
          title: 'A.3 Roles and responsibility matrix',
          table: {
            headers: ['Domain', 'Assignment'],
            rows: [
              { label: 'Platform operations', value: 'Insurfox' },
              { label: 'AI models (technical)', value: 'Insurfox' },
              { label: 'AI usage (business)', value: 'Insurer / reinsurer' },
              { label: 'Risk carrying', value: 'Insurer / reinsurer' },
              { label: 'Final decisions', value: 'Insurer / reinsurer' },
              { label: 'Data ownership', value: 'Insurer / reinsurer' },
              { label: 'Supervisory communication', value: 'Insurer / reinsurer' }
            ]
          }
        },
        {
          id: 'A4',
          title: 'A.4 Classification of AI systems',
          bullets: [
            'AI systems are used exclusively for decision support.',
            'No autonomous, legally binding decisions.',
            'Human-in-the-loop required for all material processes.'
          ],
          subSections: [
            {
              title: 'EU AI Act classification',
              bullets: ['High-risk AI systems (conservative view)', 'Decision autonomy: low', 'Governance requirements: high']
            }
          ]
        },
        {
          id: 'A5',
          title: 'A.5 AI governance – control mechanisms',
          subSections: [
            {
              title: 'A.5.1 Use-case governance',
              bullets: ['Documented AI use cases', 'Clear usage boundaries', 'Prohibition of non-approved use cases']
            },
            {
              title: 'A.5.2 Model lifecycle management',
              bullets: ['Model registration', 'Versioning', 'Documented training data', 'Controlled release and rollback processes']
            }
          ]
        },
        {
          id: 'A6',
          title: 'A.6 Data governance & privacy',
          subSections: [
            {
              title: 'A.6.1 Core principles',
              bullets: ['Purpose limitation', 'Data minimisation', 'Lawful processing', 'Role-based access', 'Audit logging']
            },
            {
              title: 'A.6.2 Data ownership',
              bullets: ['Data remains with the insurer', 'No cross-tenant usage', 'No use for third-party training']
            }
          ]
        },
        {
          id: 'A7',
          title: 'A.7 Handling of sensitive data',
          subSections: [
            {
              title: 'A.7.1 Data categories',
              bullets: ['Health data', 'Biometric data', 'Movement and location data']
            },
            {
              title: 'A.7.2 Legal bases',
              bullets: ['Explicit consent', 'Statutory insurance obligations']
            },
            {
              title: 'A.7.3 Additional safeguards',
              bullets: [
                'Segregated data and processing domains',
                'Restricted model access',
                'Separate training and inference pipelines',
                'Enhanced review and approval processes'
              ]
            }
          ]
        }
      ],
      right: [
        {
          id: 'A8',
          title: 'A.8 Auditability & logging',
          subSections: [
            {
              title: 'A.8.1 Logged events',
              table: {
                headers: ['Event', 'Recorded information'],
                rows: [
                  { label: 'Data input', value: 'Source, purpose, timestamp (pseudonymized)' },
                  { label: 'Model usage', value: 'Model ID, version' },
                  { label: 'AI output', value: 'Score/indicator' },
                  { label: 'User interaction', value: 'Role, action' },
                  { label: 'Decision', value: 'Override / approval' }
                ]
              }
            },
            {
              title: 'A.8.2 Retention',
              bullets: ['Retention aligned with regulatory requirements', 'Tamper-proof storage']
            }
          ]
        },
        {
          id: 'A9',
          title: 'A.9 Outsourcing & third-party risks',
          bullets: [
            'No external AI service providers',
            'No transfer of training or inference data',
            'No dependency on external foundation models',
            'Minimised outsourcing risk in line with supervisory expectations'
          ]
        },
        {
          id: 'A10',
          title: 'A.10 Data sovereignty & security',
          subSections: [
            {
              title: 'A.10.1 Data sovereignty',
              bullets: ['Configurable data residency per jurisdiction', 'No cross-tenant access', 'Insurers retain full data control']
            },
            {
              title: 'A.10.2 Security measures',
              bullets: ['Logical tenant isolation', 'Encryption at rest and in transit', 'Access controls and monitoring', 'Incident response processes']
            }
          ]
        },
        {
          id: 'A11',
          title: 'A.11 Human oversight',
          bullets: ['AI results are recommendations', 'Human decision obligation', 'Documented override mechanisms', 'Escalation and review processes']
        },
        {
          id: 'A12',
          title: 'A.12 EU AI Act – article mapping (summary)',
          table: {
            headers: ['EU AI Act article', 'Implementation in Insurfox'],
            rows: [
              { label: 'Art. 9 (Risk Management)', value: 'Use-case governance, model reviews' },
              { label: 'Art. 10 (Data Governance)', value: 'Purpose limitation, data domains' },
              { label: 'Art. 11 (Documentation)', value: 'Model & training documentation' },
              { label: 'Art. 12 (Logging)', value: 'Full audit logs' },
              { label: 'Art. 13 (Transparency)', value: 'Explainable outputs' },
              { label: 'Art. 14 (Human Oversight)', value: 'Mandatory review' },
              { label: 'Art. 15 (Security)', value: 'Monitoring & safeguards' }
            ]
          }
        },
        {
          id: 'A13',
          title: 'A.13 Negative delimitation',
          bullets: ['Prohibited AI systems (Art. 5 EU AI Act)', 'Autonomous insurance decisions', 'Social scoring mechanisms', 'Covert profiling']
        },
        {
          id: 'A14',
          title: 'A.14 Summary audit assessment',
          text:
            'Insurfox AI IaaS provides a structured, technically enforced AI and data governance framework addressing regulated insurance markets. Governance, transparency, and supervisory readiness are integral to the system architecture.'
        }
      ]
    }
  }

  return {
    title: 'Audit Appendix',
    subtitle: 'Regulatory & AI Governance Framework – Insurfox AI IaaS',
    left: [
      {
        id: 'A1',
        title: 'A.1 Zweck dieses Audit Appendix',
        intro:
          'Dieses Dokument ergänzt das Regulatory & AI Governance Framework der Insurfox AI IaaS und dient als prüfungsnahe Referenz für:',
        bullets: [
          'Aufsichtsbehörden',
          'interne und externe Auditoren',
          'Compliance-, Risk- und Governance-Funktionen',
          'Due-Diligence-Prüfungen'
        ],
        text: 'Der Fokus liegt auf Nachvollziehbarkeit, Kontrollierbarkeit und klarer Verantwortungszuordnung.'
      },
      {
        id: 'A2',
        title: 'A.2 Systemabgrenzung',
        subSections: [
          {
            title: 'Gegenstand der Prüfung',
            bullets: ['Insurfox AI IaaS als Technologie- und Prozessplattform']
          },
          {
            title: 'Nicht Gegenstand',
            bullets: [
              'Risikoträgerschaft',
              'finale Underwriting-, Pricing- oder Schadenentscheidungen',
              'versicherungsspezifische Produktverantwortung'
            ]
          }
        ],
        text: 'Insurfox agiert ausschließlich als technischer Anbieter von Entscheidungsunterstützung.'
      },
      {
        id: 'A3',
        title: 'A.3 Rollen- und Verantwortlichkeitsmatrix',
        table: {
          headers: ['Bereich', 'Zuordnung'],
          rows: [
            { label: 'Plattformbetrieb', value: 'Insurfox' },
            { label: 'KI-Modelle (technisch)', value: 'Insurfox' },
            { label: 'KI-Nutzung (fachlich)', value: 'Versicherer / Rückversicherer' },
            { label: 'Risikoträgerschaft', value: 'Versicherer / Rückversicherer' },
            { label: 'Finale Entscheidungen', value: 'Versicherer / Rückversicherer' },
            { label: 'Datenhoheit', value: 'Versicherer / Rückversicherer' },
            { label: 'Aufsichtskommunikation', value: 'Versicherer / Rückversicherer' }
          ]
        }
      },
      {
        id: 'A4',
        title: 'A.4 Klassifikation der KI-Systeme',
        bullets: [
          'KI-Systeme dienen ausschließlich der Entscheidungsunterstützung.',
          'Keine autonomen, rechtsverbindlichen Entscheidungen.',
          'Human-in-the-Loop für alle wesentlichen Prozesse verpflichtend.'
        ],
        subSections: [
          {
            title: 'Einordnung nach EU AI Act',
            bullets: [
              'High-Risk-KI-Systeme (konservativ betrachtet)',
              'Entscheidungsautonomie: niedrig',
              'Governance-Anforderungen: hoch'
            ]
          }
        ]
      },
      {
        id: 'A5',
        title: 'A.5 AI Governance – Kontrollmechanismen',
        subSections: [
          {
            title: 'A.5.1 Use-Case-Governance',
            bullets: ['Dokumentierte KI-Anwendungsfälle', 'Klare Einsatzgrenzen', 'Verbot nicht freigegebener Use-Cases']
          },
          {
            title: 'A.5.2 Model Lifecycle Management',
            bullets: ['Modellregistrierung', 'Versionierung', 'Dokumentierte Trainingsdaten', 'Kontrollierte Release- und Rollback-Prozesse']
          }
        ]
      },
      {
        id: 'A6',
        title: 'A.6 Data Governance & Datenschutz',
        subSections: [
          {
            title: 'A.6.1 Grundprinzipien',
            bullets: ['Zweckbindung', 'Datenminimierung', 'Rechtmäßige Verarbeitung', 'Rollenbasierter Zugriff', 'Audit-Logging']
          },
          {
            title: 'A.6.2 Datenhoheit',
            bullets: ['Daten verbleiben beim Versicherer', 'Keine mandantenübergreifende Nutzung', 'Keine Nutzung für fremde Trainings']
          }
        ]
      },
      {
        id: 'A7',
        title: 'A.7 Umgang mit sensiblen Daten',
        subSections: [
          {
            title: 'A.7.1 Datenkategorien',
            bullets: ['Gesundheitsdaten', 'biometrische Daten', 'Bewegungs- und Standortdaten']
          },
          {
            title: 'A.7.2 Rechtsgrundlagen',
            bullets: ['ausdrückliche Einwilligung', 'gesetzliche Versicherungsverpflichtungen']
          },
          {
            title: 'A.7.3 Zusätzliche Schutzmaßnahmen',
            bullets: [
              'getrennte Daten- und Verarbeitungsdomänen',
              'eingeschränkter Modellzugriff',
              'separate Trainings- und Inferenzpipelines',
              'erweiterte Review- und Freigabeprozesse'
            ]
          }
        ]
      }
    ],
    right: [
      {
        id: 'A8',
        title: 'A.8 Auditierbarkeit & Logging',
        subSections: [
          {
            title: 'A.8.1 Protokollierte Ereignisse',
            table: {
              headers: ['Ereignis', 'Protokollierte Informationen'],
              rows: [
                { label: 'Dateneingabe', value: 'Quelle, Zweck, Zeitstempel (pseudonymisiert)' },
                { label: 'Modellnutzung', value: 'Modell-ID, Version' },
                { label: 'KI-Output', value: 'Score/Indikator' },
                { label: 'Nutzerinteraktion', value: 'Rolle, Aktion' },
                { label: 'Entscheidung', value: 'Override / Freigabe' }
              ]
            }
          },
          {
            title: 'A.8.2 Aufbewahrung',
            bullets: ['Retention gemäß regulatorischer Vorgaben', 'Revisionssichere Speicherung']
          }
        ]
      },
      {
        id: 'A9',
        title: 'A.9 Outsourcing & Drittparteirisiken',
        bullets: [
          'Keine externen KI-Service-Provider',
          'Keine Weitergabe von Trainings- oder Inferenzdaten',
          'Keine Abhängigkeit von externen Foundation Models',
          'Minimiertes Outsourcing-Risiko gemäß aufsichtsrechtlicher Erwartungen'
        ]
      },
      {
        id: 'A10',
        title: 'A.10 Datensouveränität & Sicherheit',
        subSections: [
          {
            title: 'A.10.1 Datensouveränität',
            bullets: [
              'Konfigurierbare Datenresidenz je Jurisdiktion',
              'Kein Cross-Tenant-Zugriff',
              'Versicherer behalten volle Datenkontrolle'
            ]
          },
          {
            title: 'A.10.2 Sicherheitsmaßnahmen',
            bullets: ['Logische Mandantentrennung', 'Verschlüsselung at rest und in transit', 'Zugriffskontrollen und Monitoring', 'Incident-Response-Prozesse']
          }
        ]
      },
      {
        id: 'A11',
        title: 'A.11 Human Oversight',
        bullets: [
          'KI-Ergebnisse sind Empfehlungen',
          'Menschliche Entscheidungspflicht',
          'Dokumentierte Override-Mechanismen',
          'Eskalations- und Review-Prozesse'
        ]
      },
      {
        id: 'A12',
        title: 'A.12 EU AI Act – Artikel-Mapping (Kurzfassung)',
        table: {
          headers: ['EU AI Act Artikel', 'Umsetzung in Insurfox'],
          rows: [
            { label: 'Art. 9 (Risk Management)', value: 'Use-Case-Governance, Modellreviews' },
            { label: 'Art. 10 (Data Governance)', value: 'Zweckbindung, Datendomänen' },
            { label: 'Art. 11 (Dokumentation)', value: 'Modell- & Trainingsdokumentation' },
            { label: 'Art. 12 (Logging)', value: 'Vollständige Audit-Logs' },
            { label: 'Art. 13 (Transparenz)', value: 'Erklärbare Outputs' },
            { label: 'Art. 14 (Human Oversight)', value: 'Pflichtprüfung' },
            { label: 'Art. 15 (Security)', value: 'Monitoring & Schutzmaßnahmen' }
          ]
        }
      },
      {
        id: 'A13',
        title: 'A.13 Negativabgrenzung',
        bullets: [
          'verbotenen KI-Systeme (Art. 5 EU AI Act)',
          'autonomen Versicherungsentscheidungen',
          'sozialen Scoring-Mechanismen',
          'verdecktes Profiling'
        ]
      },
      {
        id: 'A14',
        title: 'A.14 Zusammenfassende Auditbewertung',
        text:
          'Die Insurfox AI IaaS stellt ein strukturiertes, technisch durchgesetztes AI- und Data-Governance-Framework bereit, das die Anforderungen regulierter Versicherungsmärkte adressiert. Governance, Transparenz und Aufsichtsfähigkeit sind integrale Bestandteile der Systemarchitektur.'
      }
    ]
  }
}

function SectionCard({ section }: { section: SectionBlock }) {
  return (
    <Card title={section.title}>
      {section.intro && <p className="audit-paragraph">{section.intro}</p>}
      {section.bullets && (
        <ul className="audit-list">
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.subSections?.map((sub) => (
        <div key={sub.title} className="audit-subsection">
          <h3>{sub.title}</h3>
          {sub.text && <p className="audit-paragraph">{sub.text}</p>}
          {sub.bullets && (
            <ul className="audit-list">
              {sub.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {sub.table && (
            <div className="audit-table">
              <div className="audit-table-head">
                <span>{sub.table.headers[0]}</span>
                <span>{sub.table.headers[1]}</span>
              </div>
              {sub.table.rows.map((row) => (
                <div key={`${row.label}-${row.value}`} className="audit-table-row">
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {section.table && (
        <div className="audit-table">
          <div className="audit-table-head">
            <span>{section.table.headers[0]}</span>
            <span>{section.table.headers[1]}</span>
          </div>
          {section.table.rows.map((row) => (
            <div key={`${row.label}-${row.value}`} className="audit-table-row">
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      )}
      {section.text && <p className="audit-paragraph">{section.text}</p>}
    </Card>
  )
}

export default function AuditAppendixPage() {
  const { lang } = useI18n()
  const content = useMemo(() => getAuditContent(lang), [lang])

  return (
    <InternAuthGate>
      <section className="page audit-appendix-page">
        <Header
          title={content.title}
          subtitle={content.subtitle}
          subtitleColor="#65748b"
        />
        <div className="audit-appendix-grid">
          <div className="audit-column">
            {content.left.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
          <div className="audit-column">
            {content.right.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
