import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HomeHeroBackground from '@/assets/images/Home1.png'
import AiInsuranceProcessImage from '@/assets/images/ai_insurance_process.png'
import InsuranceAiImage from '@/assets/images/insurance_ai.png'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'

export default function InsuranceLandingPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const [isHeroPreviewOpen, setIsHeroPreviewOpen] = React.useState(false)

  const go = (route: string) => {
    navigate(route)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const copy = {
    heroKicker: lang === 'en' ? 'Insurfox AI IaaS' : 'Insurfox AI IaaS',
    heroTitle: lang === 'en' ? 'AI for insurance decision processes' : 'KI für Versicherungs-Entscheidungsprozesse',
    heroBody: lang === 'en'
      ? 'AI supports structuring, prioritization and evidence preparation. Decisions remain with the carrier, with human review.'
      : 'KI unterstützt Strukturierung, Priorisierung und Evidenzaufbereitung. Entscheidungen bleiben beim Carrier, mit menschlicher Prüfung.',
    heroContext: lang === 'en' ? 'Underwriting • Claims • Governance' : 'Underwriting • Schaden • Governance',
    heroCta: lang === 'en' ? 'Open dashboard' : 'Dashboard öffnen',
    lifecycleTitle: lang === 'en' ? 'Decision lifecycle, end-to-end' : 'Entscheidungs-Lifecycle – Ende zu Ende',
    lifecycleBody: lang === 'en'
      ? 'Standardized steps make decisions repeatable and controlled across partners and markets.'
      : 'Standardisierte Schritte machen Entscheidungen wiederholbar und kontrollierbar über Partner und Märkte.',
    lifecycleCards: [
      {
        title: lang === 'en' ? 'Intake & validation' : 'Intake & Validierung',
        body: lang === 'en'
          ? 'Structured case intake with rule checks and initial data quality gates.'
          : 'Strukturierter Fall-Intake mit Regelprüfungen und Datenqualitäts-Gates.'
      },
      {
        title: lang === 'en' ? 'Assessment & recommendation' : 'Bewertung & Empfehlung',
        body: lang === 'en'
          ? 'Decision packs summarize risk, options and rationale for review.'
          : 'Decision Packs fassen Risiko, Optionen und Begründung für die Prüfung zusammen.'
      },
      {
        title: lang === 'en' ? 'Decision & controls' : 'Entscheidung & Kontrollen',
        body: lang === 'en'
          ? 'Human decisions follow limits, thresholds and escalation rules.'
          : 'Menschliche Entscheidungen folgen Limits, Schwellen und Eskalationsregeln.'
      },
      {
        title: lang === 'en' ? 'Audit & monitoring' : 'Audit & Monitoring',
        body: lang === 'en'
          ? 'Every decision is recorded with evidence and versioned logic.'
          : 'Jede Entscheidung wird mit Evidenz und versionierter Logik dokumentiert.'
      }
    ],
    underwritingTitle: lang === 'en' ? 'Underwriting decision support' : 'Underwriting-Entscheidungsunterstützung',
    underwritingBody: lang === 'en'
      ? 'Decision packs provide structured inputs, outputs and controls for underwriting.'
      : 'Decision Packs liefern strukturierte Inputs, Outputs und Kontrollen für Underwriting.',
    underwritingPacks: [
      {
        title: lang === 'en' ? 'Risk & exposure snapshot' : 'Risiko- & Exposure-Snapshot',
        bullets: lang === 'en'
          ? ['Inputs: exposure, loss history, corridor fit', 'Output: risk snapshot with drivers', 'Control: corridor thresholds and limits']
          : ['Input: Exposure, Schadenshistorie, Korridor-Fit', 'Output: Risiko-Snapshot mit Treibern', 'Control: Korridor-Schwellen und Limits']
      },
      {
        title: lang === 'en' ? 'Pricing and terms suggestion' : 'Preis- und Konditionen-Vorschlag',
        bullets: lang === 'en'
          ? ['Inputs: pricing rules and benchmarks', 'Output: terms within authority', 'Control: approval limits and overrides']
          : ['Input: Pricing-Regeln und Benchmarks', 'Output: Konditionen innerhalb der Autorität', 'Control: Freigabegrenzen und Overrides']
      },
      {
        title: lang === 'en' ? 'Document & evidence pack' : 'Dokumenten- & Evidenzpaket',
        bullets: lang === 'en'
          ? ['Inputs: required documents and checks', 'Output: completeness score', 'Control: mandatory evidence gates']
          : ['Input: erforderliche Dokumente und Checks', 'Output: Vollständigkeits-Score', 'Control: Pflicht-Evidenz-Gates']
      },
      {
        title: lang === 'en' ? 'Referral & escalation routing' : 'Referral- & Eskalationsrouting',
        bullets: lang === 'en'
          ? ['Inputs: triggers and exception signals', 'Output: routing to authority', 'Control: escalation policy']
          : ['Input: Trigger und Ausnahme-Signale', 'Output: Routing zur Autorität', 'Control: Eskalations-Policy']
      }
    ],
    claimsTitle: lang === 'en' ? 'Claims decision support' : 'Schaden-Entscheidungsunterstützung',
    claimsBody: lang === 'en'
      ? 'Decision packs align claims handling with controls and consistent escalation.'
      : 'Decision Packs richten die Schadenbearbeitung an Kontrollen und konsistenter Eskalation aus.',
    claimsPacks: [
      {
        title: lang === 'en' ? 'Triage and severity banding' : 'Triage und Schweregrad',
        bullets: lang === 'en'
          ? ['Inputs: FNOL, severity signals', 'Output: triage band', 'Control: escalation thresholds']
          : ['Input: FNOL, Schwere-Signale', 'Output: Triage-Band', 'Control: Eskalationsschwellen']
      },
      {
        title: lang === 'en' ? 'Coverage check & policy context' : 'Deckungsprüfung & Policenkontext',
        bullets: lang === 'en'
          ? ['Inputs: policy terms, exclusions', 'Output: coverage position', 'Control: mandatory review paths']
          : ['Input: Policenbedingungen, Ausschlüsse', 'Output: Deckungsposition', 'Control: Pflicht-Review-Pfade']
      },
      {
        title: lang === 'en' ? 'Reserve and cost-approval' : 'Reserve- und Kostenfreigabe',
        bullets: lang === 'en'
          ? ['Inputs: estimates and benchmarks', 'Output: reserve recommendation', 'Control: approval limits']
          : ['Input: Schätzungen und Benchmarks', 'Output: Reserve-Empfehlung', 'Control: Freigabegrenzen']
      },
      {
        title: lang === 'en' ? 'Partner orchestration & next actions' : 'Partner-Orchestrierung & Next Actions',
        bullets: lang === 'en'
          ? ['Inputs: partner availability and SLA', 'Output: action plan', 'Control: SLA and KPI gates']
          : ['Input: Partnerverfügbarkeit und SLA', 'Output: Maßnahmenplan', 'Control: SLA- und KPI-Gates']
      }
    ],
    governanceTitle: lang === 'en' ? 'Governance and control' : 'Governance und Kontrolle',
    governanceBody: lang === 'en'
      ? 'Decision packs make governance explicit and auditable.'
      : 'Decision Packs machen Governance explizit und auditierbar.',
    governancePacks: [
      {
        title: lang === 'en' ? 'Audit trail and decision record' : 'Audit-Trail und Entscheidungsnachweis',
        bullets: lang === 'en'
          ? ['Inputs: decision steps and evidence', 'Output: auditable record', 'Control: mandatory logging']
          : ['Input: Entscheidungssteps und Evidenz', 'Output: auditierbarer Nachweis', 'Control: Pflicht-Logging']
      },
      {
        title: lang === 'en' ? 'Rule/model versioning' : 'Regel-/Modellversionierung',
        bullets: lang === 'en'
          ? ['Inputs: policy and model versions', 'Output: change log', 'Control: approval workflow']
          : ['Input: Policy- und Modellversionen', 'Output: Änderungslog', 'Control: Freigabe-Workflow']
      },
      {
        title: lang === 'en' ? 'Access and mandate controls' : 'Zugriff- und Mandatskontrollen',
        bullets: lang === 'en'
          ? ['Inputs: roles and mandates', 'Output: access scope', 'Control: segregation of duties']
          : ['Input: Rollen und Mandate', 'Output: Zugriffsumfang', 'Control: Trennung von Aufgaben']
      },
      {
        title: lang === 'en' ? 'Portfolio signals and exceptions' : 'Portfolio-Signale und Ausnahmen',
        bullets: lang === 'en'
          ? ['Inputs: portfolio KPIs', 'Output: exception flags', 'Control: escalation routing']
          : ['Input: Portfolio-KPIs', 'Output: Ausnahme-Flags', 'Control: Eskalationsrouting']
      }
    ],
    aiDoesTitle: lang === 'en' ? 'AI supports' : 'KI unterstützt',
    aiDoesBullets: lang === 'en'
      ? ['Case structuring', 'Prioritization', 'Evidence preparation', 'Recommendation drafting', 'Consistency checks']
      : ['Fallstrukturierung', 'Priorisierung', 'Evidenzaufbereitung', 'Empfehlungsentwürfe', 'Konsistenzprüfungen'],
    aiDoesNotTitle: lang === 'en' ? 'AI does not' : 'KI tut nicht',
    aiDoesNotBullets: lang === 'en'
      ? ['Approve or bind automatically', 'Override carrier authority', 'Decide without evidence', 'Bypass controls', 'Obscure rationale']
      : ['Autonom genehmigen oder binden', 'Carrier-Autorität überschreiben', 'Ohne Evidenz entscheiden', 'Kontrollen umgehen', 'Begründung verschleiern'],
    platformKicker: lang === 'en' ? 'Platform' : 'Plattform',
    platformTitle: lang === 'en'
      ? 'One portal, multiple insurance programs'
      : 'Ein Portal, mehrere Versicherungsprogramme',
    platformBody: lang === 'en'
      ? 'Unified execution across lines, API-first integration, reporting and bordereaux. Supports carrier, broker and enterprise operating models.'
      : 'Einheitliche Ausfuehrung ueber Sparten, API-first Integration, Reporting und Bordereaux. Unterstuetzt Carrier-, Makler- und Enterprise-Operating-Modelle.',
    rolesTitle: lang === 'en' ? 'Operational views' : 'Operative Ansichten',
    rolesBody: lang === 'en'
      ? 'Open role-based views with controlled workflows and approvals.'
      : 'Öffnen Sie rollenbasierte Ansichten mit kontrollierten Workflows und Freigaben.',
    roleCards: [
      {
        title: lang === 'en' ? 'Claims Manager' : 'Schadenmanager',
        body: lang === 'en' ? 'Claims routing and escalation oversight.' : 'Steuerung von Schadenrouting und Eskalation.',
        route: '/claim-manager'
      },
      {
        title: lang === 'en' ? 'Partner Management' : 'Partner Management',
        body: lang === 'en' ? 'Partner networks and communication workflows.' : 'Partnernetzwerke und Kommunikations-Workflows.',
        route: '/partner-management-overview'
      }
    ],
    controlsTitle: lang === 'en' ? 'Decision controls built in' : 'Entscheidungskontrollen integriert',
    controlsBody: lang === 'en'
      ? 'Controls enforce consistent execution and traceability across the lifecycle.'
      : 'Kontrollen sichern konsistente Ausführung und Nachvollziehbarkeit über den Lifecycle.',
    controlsItems: [
      {
        title: lang === 'en' ? 'Role-based access' : 'Rollenbasierter Zugriff',
        body: lang === 'en'
          ? 'Segregation of duties and clear mandates.'
          : 'Trennung von Aufgaben und klare Mandate.'
      },
      {
        title: lang === 'en' ? 'Limits and thresholds' : 'Limits und Schwellen',
        body: lang === 'en'
          ? 'Defined guardrails with escalation paths.'
          : 'Definierte Guardrails mit Eskalationspfaden.'
      },
      {
        title: lang === 'en' ? 'Versioning and change management' : 'Versionierung und Change Management',
        body: lang === 'en'
          ? 'Controlled updates for rules and models.'
          : 'Kontrollierte Änderungen an Regeln und Modellen.'
      },
      {
        title: lang === 'en' ? 'Evidence and audit trail' : 'Evidenz und Audit-Trail',
        body: lang === 'en'
          ? 'Complete decision records with evidence links.'
          : 'Vollständige Entscheidungsnachweise mit Evidenzbezug.'
      }
    ]
  }

  return (
    <main className="home-marketing">
      <section className="home-hero" style={{ backgroundImage: `url(${HomeHeroBackground})` }}>
        <div className="home-hero-inner">
          <div className="home-hero-content">
            <span className="home-hero-kicker">{copy.heroKicker}</span>
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroBody}</p>
            <Button
              onClick={() => go('/insurance-dashboard')}
              className="home-marketing-login home-hero-cta"
              style={{ padding: '0.55rem 1.2rem', width: 'fit-content', marginBottom: '0.6rem' }}
              disableHover
            >
              {copy.heroCta}
            </Button>
            <p>{copy.heroContext}</p>
          </div>
          <div className="home-hero-card" aria-label="Insurfox Logo" style={{ background: 'transparent', boxShadow: 'none', border: 'none', alignSelf: 'center' }}>
            <img
              src={InsurfoxLogoLight}
              alt="Insurfox"
              style={{
                width: 'clamp(200px, 28vw, 360px)',
                height: 'auto',
                objectFit: 'contain',
                transform: 'translateX(-72px)',
                transformOrigin: 'right center'
              }}
            />
          </div>
        </div>
        <span className="home-hero-accent" aria-hidden />
      </section>

      <section className="home-product">
        <div className="home-product-card">
          <div>
            <span className="home-product-kicker">{copy.platformKicker}</span>
            <h2>{copy.platformTitle}</h2>
            <img
              src={AiInsuranceProcessImage}
              alt="AI insurance process"
              style={{
                width: '100%',
                margin: '0.5rem 0 1rem',
                borderRadius: 18,
                border: '1px solid rgba(148, 163, 184, 0.18)',
                boxShadow: '0 14px 32px rgba(15, 23, 42, 0.08)'
              }}
            />
            <p>{copy.platformBody}</p>
            <div className="home-product-actions">
              <div />
            </div>
          </div>
          <div className="home-product-media">
            <img src={InsuranceAiImage} alt="Insurance AI" />
          </div>
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.lifecycleTitle}</h2>
          <p>{copy.lifecycleBody}</p>
        </div>
        <div className="home-value-grid">
          {copy.lifecycleCards.map((card) => (
            <div key={card.title} className="home-value-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.underwritingTitle}</h2>
          <p>{copy.underwritingBody}</p>
        </div>
        <div className="home-value-grid">
          {copy.underwritingPacks.map((pack) => (
            <div key={pack.title} className="home-value-card">
              <h3>{pack.title}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.5 }}>
                {pack.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.claimsTitle}</h2>
          <p>{copy.claimsBody}</p>
        </div>
        <div className="home-value-grid">
          {copy.claimsPacks.map((pack) => (
            <div key={pack.title} className="home-value-card">
              <h3>{pack.title}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.5 }}>
                {pack.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="home-section-header">
          <p>{copy.claimsFooter}</p>
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.governanceTitle}</h2>
          <p>{copy.governanceBody}</p>
        </div>
        <div className="home-value-grid">
          {copy.governancePacks.map((pack) => (
            <div key={pack.title} className="home-value-card">
              <h3>{pack.title}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.5 }}>
                {pack.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{lang === 'en' ? 'What AI does—and what it does not do' : 'Was KI tut – und was nicht'}</h2>
        </div>
        <div className="home-value-grid">
          <div className="home-value-card">
            <h3>{copy.aiDoesTitle}</h3>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.5 }}>
              {copy.aiDoesBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          <div className="home-value-card">
            <h3>{copy.aiDoesNotTitle}</h3>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.5 }}>
              {copy.aiDoesNotBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.rolesTitle}</h2>
          <p>{copy.rolesBody}</p>
        </div>
        <div className="home-value-grid">
          {copy.roleCards.map((card) => (
            <button
              key={card.title}
              type="button"
              className="home-value-card"
              onClick={() => go(card.route)}
              style={{ textAlign: 'left' }}
            >
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="home-trust">
        <div className="home-trust-card">
          <h2>{copy.controlsTitle}</h2>
          <p>{copy.controlsBody}</p>
          <div className="home-trust-grid">
            {copy.controlsItems.map((item) => (
              <div key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
