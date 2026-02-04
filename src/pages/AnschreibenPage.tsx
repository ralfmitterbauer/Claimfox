import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import CvAuthGate from '@/components/CvAuthGate'
import profileImage from '@/assets/images/profilbild.png'

export default function AnschreibenPage() {
  return (
    <CvAuthGate>
      <section className="page cv-page">
        <div className="cv-shell">
          <div className="cv-header">
            <Header title="Application" subtitle="Ralf Mitterbauer" subtitleColor="#65748b" />
            <Button className="cv-download" onClick={() => window.print()}>
              PDF herunterladen
            </Button>
          </div>

          <div className="cv-hero">
            <div className="cv-hero-left">
              <h2>Senior Technical Product Manager – Platform &amp; Workflow Orchestration</h2>
              <p>Bad Salzdetfuth (Region Hannover), Germany</p>
              <p>Phone: +49 (0)151 22644067</p>
              <p>Email: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
              <p>Remote (Germany)</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Senior Technical Product Manager – Platform &amp; Workflow Orchestration</strong>
              </div>
            </Card>
          </div>

          <Card className="cv-card cv-letter">
            <h3>Senior Technical Product Manager – Platform &amp; Workflow Orchestration</h3>
            <div className="cv-letter-space cv-letter-space-2" />
            <p>Bad Salzdetfuth (Region Hannover), Germany</p>
            <p>Phone: +49 (0)151 22644067</p>
            <p>Email: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            <p>Remote (Germany)</p>
            <div className="cv-letter-space cv-letter-space-3" />
            <h3 className="cv-letter-heading">Statement of Interest</h3>
            <div className="cv-letter-space cv-letter-space-2" />
            <p>Dear Hiring Team,</p>
            <p>
              I am writing to express my interest in the Senior Technical Product Manager – Platform &amp; Workflow Orchestration role. The
              position strongly resonates with my background in owning and evolving mission-critical, horizontal platforms that coordinate
              complex workflows across multiple services, stakeholders, and regulatory constraints.
            </p>
            <p>
              In my current role as Product Owner / Technical Product Manager at Insurfox, I take end-to-end ownership of a central,
              revenue-generating platform within the insurance domain. This platform coordinates complex workflows across intake, validation,
              decision logic, partner interaction, and communication. My responsibilities include defining product vision and roadmaps, owning
              and prioritizing the backlog, and translating business, operational, and compliance requirements into robust, reusable platform
              capabilities. I work closely with senior engineers and architects to ensure scalability, reliability, and long-term
              maintainability while actively managing dependencies across multiple domains.
            </p>
            <p>
              Throughout my career, I have consistently focused on orchestration, coordination, and platform ownership in complex environments.
              Earlier, as Service Manager at Nobilas (Akzo Nobel), I was responsible for steering nationwide partner networks within the
              insurance claims ecosystem. I coordinated end-to-end workflows across insurers, service partners, and internal teams and held
              leadership responsibility for more than 50 employees. This experience significantly shaped my systems-oriented mindset and my
              understanding of how platform decisions directly impact operational efficiency, partner performance, and customer outcomes.
            </p>
            <p>
              What particularly attracts me to this role is the focus on an already live, business-critical orchestration layer, where the
              challenge lies not in validation but in continuously improving performance, reliability, scalability, and economic efficiency
              under increasing complexity. I am comfortable operating in environments where workflows are revenue-critical, highly
              interconnected, and subject to regulatory requirements, and where product decisions must carefully balance technical integrity
              with business impact.
            </p>
            <p>
              I view the orchestration platform not as a technical abstraction, but as a product in its own right—one that enables
              consistency, quality, and speed across multiple services while protecting long-term platform health. I enjoy working at this
              horizontal layer, aligning product, engineering, operations, and compliance, and taking clear ownership when trade-offs are
              required.
            </p>
            <p>
              I would welcome the opportunity to discuss how my experience in platform ownership, workflow coordination, and cross-functional
              leadership can contribute to the continued evolution of your orchestration platform. Thank you for your time and consideration.
            </p>
            <p>Kind regards,</p>
            <p>Ralf Mitterbauer</p>
          </Card>
        </div>

        <div className="cv-print">
          <div className="cv-print-header">
            <div>
              <h1>Ralf Mitterbauer</h1>
              <h2>Senior Technical Product Manager | Platform &amp; Workflow Orchestration</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover), Germany</p>
            <p>Phone: +49 (0)151 22644067</p>
            <p>Email: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <h3>Senior Technical Product Manager – Platform &amp; Workflow Orchestration</h3>
          <p>Bad Salzdetfuth (Region Hannover), Germany</p>
          <p>Phone: +49 (0)151 22644067</p>
          <p>Email: ralf.mitterbauer@t-online.de</p>
          <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          <p>Remote (Germany)</p>
          <h3>Cover Letter</h3>
          <p>Dear Hiring Team,</p>
          <p>
            I am writing to express my interest in the Senior Technical Product Manager – Platform &amp; Workflow Orchestration role. The
            position strongly resonates with my background in owning and evolving mission-critical, horizontal platforms that coordinate
            complex workflows across multiple services, stakeholders, and regulatory constraints.
          </p>
          <p>
            In my current role as Product Owner / Technical Product Manager at Insurfox, I take end-to-end ownership of a central,
            revenue-generating platform within the insurance domain. This platform coordinates complex workflows across intake, validation,
            decision logic, partner interaction, and communication. My responsibilities include defining product vision and roadmaps, owning
            and prioritizing the backlog, and translating business, operational, and compliance requirements into robust, reusable platform
            capabilities. I work closely with senior engineers and architects to ensure scalability, reliability, and long-term
            maintainability while actively managing dependencies across multiple domains.
          </p>
          <p>
            Throughout my career, I have consistently focused on orchestration, coordination, and platform ownership in complex environments.
            Earlier, as Service Manager at Nobilas (Akzo Nobel), I was responsible for steering nationwide partner networks within the
            insurance claims ecosystem. I coordinated end-to-end workflows across insurers, service partners, and internal teams and held
            leadership responsibility for more than 50 employees. This experience significantly shaped my systems-oriented mindset and my
            understanding of how platform decisions directly impact operational efficiency, partner performance, and customer outcomes.
          </p>
          <p>
            What particularly attracts me to this role is the focus on an already live, business-critical orchestration layer, where the
            challenge lies not in validation but in continuously improving performance, reliability, scalability, and economic efficiency
            under increasing complexity. I am comfortable operating in environments where workflows are revenue-critical, highly
            interconnected, and subject to regulatory requirements, and where product decisions must carefully balance technical integrity
            with business impact.
          </p>
          <p>
            I view the orchestration platform not as a technical abstraction, but as a product in its own right—one that enables
            consistency, quality, and speed across multiple services while protecting long-term platform health. I enjoy working at this
            horizontal layer, aligning product, engineering, operations, and compliance, and taking clear ownership when trade-offs are
            required.
          </p>
          <p>
            I would welcome the opportunity to discuss how my experience in platform ownership, workflow coordination, and cross-functional
            leadership can contribute to the continued evolution of your orchestration platform. Thank you for your time and consideration.
          </p>
          <p>Kind regards,</p>
          <p>Ralf Mitterbauer</p>
        </div>
      </section>
    </CvAuthGate>
  )
}
