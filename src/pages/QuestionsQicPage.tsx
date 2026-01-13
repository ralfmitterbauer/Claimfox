import React, { useMemo } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'

type QicSection = {
  id: string
  title: string
  questions: string[]
}

function getQicContent(lang: 'de' | 'en') {
  if (lang === 'de') {
    return {
      title: 'Strategic Business Questionnaire',
      subtitle: 'Exploring a Potential Partnership between QIC and Insurfox',
      sections: [
        {
          id: 'I',
          title: 'I. Strategic Context & Portfolio Positioning',
          questions: [
            'Wie positioniert QIC aktuell sein Versicherungsportfolio über Kern- und Spezialsparten (P&C, Motor, Marine/Cargo, Liability, Health, Specialty) in internationalen Märkten?',
            'Welche Sparten gelten in den nächsten 24–36 Monaten als strategisch relevant für digitale Enablement- und skalierbare Plattform-Modelle?',
            'Wie differenziert QIC operative und Underwriting-Perspektiven zwischen Retail, SME, Mid-Market und Corporate?',
            'Welche Rolle spielen Broker, MGAs, Coverholder und digitale Vertriebskanäle in der aktuellen und zukünftigen Go-to-Market-Strategie von QIC?',
            'Wie balanciert QIC lokale Marktanpassung mit gruppenweiter Standardisierung von Versicherungsprozessen?'
          ]
        },
        {
          id: 'II',
          title: 'II. Operating Model & Value Chain',
          questions: [
            'Wie sind Kernprozesse (Underwriting, Policenverwaltung, Claims, Renewals) aktuell über Regionen und Einheiten organisiert?',
            'Welche Wertschöpfungsanteile gelten als strategische Kernkompetenzen versus Kandidaten für plattformbasierte Enablement?',
            'Wie steuert QIC die bereichsübergreifende Abstimmung zwischen Underwriting, Claims, Aktuariat, IT und Compliance?',
            'Wo sieht QIC aktuell die größten operativen Reibungen entlang des Versicherungszyklus?',
            'Wie bewertet QIC Skalierungsgrenzen seines Operating Models bei Markteintritt oder Produktlaunch?'
          ]
        },
        {
          id: 'III',
          title: 'III. Claims Strategy & Claims Excellence',
          questions: [
            'Wie definiert QIC Claims-Excellence auf Gruppenebene (z. B. Geschwindigkeit, Qualität, Leakage Control, Customer Experience)?',
            'Wie unterscheiden sich Claims-Prozesse zwischen High-Frequency/Low-Severity und Low-Frequency/High-Severity Schäden?',
            'In welchem Umfang sind Claims-Workflows standardisiert versus lokal angepasst?',
            'Wie adressiert QIC aktuell Fraud Detection, Claims Triage und Early Loss Intervention?',
            'Welche Claims-KPIs sind für Steuerung und Portfoliooptimierung am kritischsten?'
          ]
        },
        {
          id: 'IV',
          title: 'IV. Data, Analytics & Decision Support',
          questions: [
            'Wie nutzt QIC Daten aktuell über Underwriting, Pricing, Claims und Portfoliomanagement hinweg?',
            'Welche Datenbereiche gelten als besonders reif, und wo sieht QIC strukturelle Datenlücken?',
            'Wie werden historische Datenbestände über Geschäftsbereiche hinweg gesteuert und wiederverwendet?',
            'Welche Rolle spielen Real-Time oder Near-Real-Time Daten in operativen Entscheidungen?',
            'Wie stellt QIC Konsistenz zwischen Aktuariatsmodellen, Underwriting-Entscheidungen und operativen Outcomes sicher?'
          ]
        },
        {
          id: 'V',
          title: 'V. Artificial Intelligence & Advanced Analytics',
          questions: [
            'Wie klassifiziert QIC die Rolle von KI in seinen Versicherungsprozessen (Decision Support, Automation, Optimisation)?',
            'Welche KI-Use-Cases sind bereits in Produktion, Pilotierung oder Planung?',
            'Wie adressiert QIC Explainability, Transparenz und Human Oversight in KI-gestützten Entscheidungen?',
            'Wie werden KI-Modelle über ihren Lifecycle gesteuert (Entwicklung, Validierung, Deployment, Monitoring)?',
            'Welche strategischen Kriterien bestimmen Inhouse-KI versus externe KI-Lösungen?'
          ]
        },
        {
          id: 'VI',
          title: 'VI. Governance, Risk & Regulatory Alignment',
          questions: [
            'Wie stellt QIC regulatorische Compliance über mehrere Jurisdiktionen sicher und bleibt gleichzeitig effizient?',
            'Wie werden Datenschutz, Datenresidenz und Cross-Border Data Flows auf Gruppenebene gesteuert?',
            'Wie bereitet sich QIC auf wachsende KI-Regulierung (High-Risk-Klassifikationen) vor?',
            'Wie werden Auditability, Traceability und Accountability in digitalen Prozessen sichergestellt?',
            'Welche Governance-Prinzipien sind in Technologiepartnerschaften nicht verhandelbar?'
          ]
        },
        {
          id: 'VII',
          title: 'VII. Partnership & Platform Strategy',
          questions: [
            'Welche Rolle spielen strategische Technologiepartner im langfristigen Operating Model von QIC?',
            'Wie bewertet QIC Plattform-Partnerschaften gegenüber Point Solutions?',
            'Welche Erwartungen bestehen bezüglich Ownership von Daten, Modellen und Entscheidungslogik?',
            'Wie strukturiert QIC typischerweise Kollaborationsmodelle (Pilot, Phasen-Rollout, Joint Roadmap)?',
            'Welche Kriterien entscheiden über Skalierung oder Abbruch einer Partnerschaft?'
          ]
        },
        {
          id: 'VIII',
          title: 'VIII. Pilot & Joint Initiative Design',
          questions: [
            'Welche Sparten oder Prozesse eignen sich für eine kontrollierte Pilotinitiative?',
            'Welchen Umfang und welche Dauer hält QIC für einen initialen Pilot für angemessen?',
            'Welche Governance-Gremien oder Entscheidungsforen steuern den Pilot?',
            'Wie würde Erfolg aus Business-, Operations- und Risiko-Perspektive gemessen?',
            'Welche internen Voraussetzungen müssen vor einem Pilot erfüllt sein?'
          ]
        },
        {
          id: 'IX',
          title: 'IX. Commercial & Strategic Alignment',
          questions: [
            'Wie richtet QIC kommerzielle Modelle typischerweise auf langfristige strategische Partnerschaften aus?',
            'Welche Prinzipien steuern Pricing, Revenue Sharing und Plattformökonomie in Partnerbeziehungen?',
            'Wie wichtig ist Flexibilität versus Standardisierung in kommerziellen Arrangements?',
            'Welchen Zeithorizont nutzt QIC bei der Bewertung strategischer Returns auf Technologiepartnerschaften?',
            'Wie stellt QIC die Alignment zwischen kommerziellem Outcome und Risk Governance sicher?'
          ]
        },
        {
          id: 'X',
          title: 'X. Strategic Outlook',
          questions: [
            'Wie sieht QIC die Weiterentwicklung seines Operating Models in den nächsten fünf Jahren?',
            'Welche Rolle sollen integrierte digitale Plattformen dabei spielen?',
            'Wo sieht QIC die größten Chancen für strukturelle Differenzierung gegenüber Wettbewerbern?',
            'Welche externen Entwicklungen (Technologie, Regulierung, Kundenverhalten) sind für die Positionierung am kritischsten?',
            'Was definiert aus QIC-Sicht eine erfolgreiche langfristige Partnerschaft mit Insurfox?',
            'Dieser Fragebogen dient dazu, einen strukturierten strategischen Dialog aufzusetzen und konkrete Kooperationsmöglichkeiten zu identifizieren, abgestimmt auf QICs Geschäftsziele, Governance-Standards und langfristige Marktpositionierung.'
          ]
        }
      ]
    }
  }

  return {
    title: 'Strategic Business Questionnaire',
    subtitle: 'Exploring a Potential Partnership between QIC and Insurfox',
    sections: [
      {
        id: 'A',
        title: 'I. Strategic Context & Portfolio Positioning',
        questions: [
          'Which insurance lines are you currently active in?',
          'Which lines are prioritized for a potential collaboration?',
          'Which target segments do you primarily address (e.g. SME, mid-market, corporate, consumer)?',
          'Which distribution channels are predominantly used (direct, broker, MGA, digital)?',
          'In which jurisdictions are the relevant insurance activities based?'
        ]
      },
      {
        id: 'II',
        title: 'II. Operating Model & Value Chain',
        questions: [
          'How are core insurance processes (underwriting, policy administration, claims, renewals) currently organised across regions and entities?',
          'Which parts of the value chain are considered strategic core capabilities versus candidates for platform-based enablement?',
          'How does QIC currently manage cross-functional alignment between underwriting, claims, actuarial, IT and compliance functions?',
          'Where does QIC see the greatest operational friction today across the insurance lifecycle?',
          'How does QIC assess scalability constraints in its current operating model when entering new markets or launching new products?'
        ]
      },
      {
        id: 'III',
        title: 'III. Claims Strategy & Claims Excellence',
        questions: [
          'How does QIC define claims excellence at group level (e.g. speed, accuracy, leakage control, customer experience)?',
          'How are claims processes differentiated between high-frequency/low-severity and low-frequency/high-severity losses?',
          'To what extent are claims workflows standardised versus locally adapted?',
          'How does QIC currently approach fraud detection, claims triage and early loss intervention?',
          'Which claims KPIs are most critical for management steering and portfolio optimisation?'
        ]
      },
      {
        id: 'IV',
        title: 'IV. Data, Analytics & Decision Support',
        questions: [
          'How does QIC currently leverage data across underwriting, pricing, claims and portfolio management?',
          'Which data domains are considered most mature, and where does QIC see structural data gaps?',
          'How are historical data assets governed and reused across different business functions?',
          'What role does real-time or near-real-time data play today in operational decision-making?',
          'How does QIC ensure consistency between actuarial models, underwriting decisions and operational outcomes?'
        ]
      },
      {
        id: 'V',
        title: 'V. Artificial Intelligence & Advanced Analytics',
        questions: [
          'How does QIC currently classify the role of AI within its insurance operations (decision support, automation, optimisation)?',
          'Which AI-enabled use cases are already in production, piloting or strategic planning?',
          'How does QIC address explainability, transparency and human oversight in AI-supported decisions?',
          'How are AI models governed across their lifecycle (development, validation, deployment, monitoring)?',
          'What strategic considerations guide the decision between in-house AI capabilities versus external AI solutions?'
        ]
      },
      {
        id: 'VI',
        title: 'VI. Governance, Risk & Regulatory Alignment',
        questions: [
          'How does QIC ensure regulatory compliance across multiple jurisdictions while maintaining operational efficiency?',
          'How are data protection, data residency and cross-border data flows governed at group level?',
          'How does QIC prepare for evolving AI regulation, including high-risk AI classifications?',
          'How are auditability, traceability and accountability ensured within digital insurance processes?',
          'Which governance principles are considered non-negotiable in any technology partnership?'
        ]
      },
      {
        id: 'VII',
        title: 'VII. Partnership & Platform Strategy',
        questions: [
          'What role do strategic technology partners play within QIC’s long-term operating model?',
          'How does QIC evaluate platform-based partnerships versus point solutions?',
          'What expectations does QIC have regarding ownership of data, models and decision logic in a partnership context?',
          'How does QIC typically structure collaboration models (pilot, phased rollout, joint roadmap)?',
          'Which success criteria determine whether a partnership is scaled or discontinued?'
        ]
      },
      {
        id: 'VIII',
        title: 'VIII. Pilot & Joint Initiative Design',
        questions: [
          'Which lines of business or processes would be most suitable for a controlled pilot initiative?',
          'What scope and duration would QIC consider appropriate for an initial pilot?',
          'Which governance bodies or decision forums would oversee such a pilot?',
          'How would success be measured from a business, operational and risk perspective?',
          'What internal prerequisites must be fulfilled before initiating a joint pilot?'
        ]
      },
      {
        id: 'IX',
        title: 'IX. Commercial & Strategic Alignment',
        questions: [
          'How does QIC typically align commercial models with long-term strategic partnerships?',
          'Which principles guide pricing, revenue sharing or platform economics in partner relationships?',
          'How important is flexibility versus standardisation in commercial arrangements?',
          'What time horizon does QIC typically apply when assessing strategic return on technology partnerships?',
          'How does QIC ensure alignment between commercial outcomes and risk governance?'
        ]
      },
      {
        id: 'X',
        title: 'X. Strategic Outlook',
        questions: [
          'How does QIC envision the evolution of its insurance operating model over the next five years?',
          'What role should integrated digital platforms play in this evolution?',
          'Where does QIC see the greatest opportunity for structural differentiation versus competitors?',
          'Which external developments (technology, regulation, customer behaviour) are most critical for future positioning?',
          'What would define a successful long-term partnership between QIC and Insurfox from QIC’s perspective?',
          'This questionnaire is intended to establish a structured strategic dialogue and identify concrete collaboration opportunities, aligned with QIC’s business objectives, governance standards and long-term market positioning.'
        ]
      }
    ]
  }
}

export default function QuestionsQicPage() {
  const { lang } = useI18n()
  const content = useMemo(() => getQicContent(lang), [lang])

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
        <div className="insurfox-whitepaper-grid">
          {content.sections.map((section) => (
            <Card key={section.id} className="insurfox-whitepaper-card">
              <div className="insurfox-whitepaper-card-head">
                <h3>{section.title}</h3>
              </div>
              <ul>
                {section.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
        {content.sections.map((section) => (
          <div key={section.id} className="framework-print-section">
            <h2>{section.title}</h2>
            <ul>
              {section.questions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
