import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'

type WhitepaperSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

const SECTIONS: WhitepaperSection[] = [
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

export default function InsurfoxWhitepaperPage() {
  return (
    <section className="page insurfox-whitepaper-page">
      <div className="insurfox-whitepaper-shell">
        <div className="insurfox-whitepaper-hero">
          <Header
            title="Insurfox White Paper"
            subtitle="The AI-Driven Insurance Platform for Logistics, Transport & Mobility"
            subtitleColor="#65748b"
          />
          <Card className="insurfox-whitepaper-summary">
            <h2>Executive Summary</h2>
            <p>
              Insurance companies face rising costs and stalled digital transformation due to fragmented processes and complex legacy IT systems.
              At the same time, competitive pressure, regulatory requirements and changing customer expectations are forcing the rapid adoption of
              digital, AI-enabled and user-centric solutions.
            </p>
            <p>
              Insurfox addresses these challenges with an AI-driven B2B platform for insurance, logistics, transport and mobility that digitally
              connects all stakeholders across the insurance value chain.
            </p>
            <p>
              Operating as a broker within the EU, Insurfox combines digital distribution, contract and claims management with AI-supported risk
              assessment, real-time analytics and automated decision support.
            </p>
            <p>
              The platform enables brokers, insurers and customers to collaborate seamlessly via a single system, while an API-first, cloud-based
              architecture ensures scalable integration across the insurance ecosystem.
            </p>
            <p>
              The result is a transparent, efficient and scalable insurance infrastructure that reduces complexity, improves underwriting and
              claims performance, and enables sustainable digital growth for all participants.
            </p>
          </Card>
        </div>
        <div className="insurfox-whitepaper-grid">
          {SECTIONS.map((section) => (
            <Card key={section.id} className="insurfox-whitepaper-card">
              <div className="insurfox-whitepaper-card-head">
                <span>{section.id}</span>
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
    </section>
  )
}
