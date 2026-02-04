import React, { useEffect, useState } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import CvAuthGate from '@/components/CvAuthGate'
import profileImage from '@/assets/images/profilbild.png'

export default function CvPage() {
  const [printMode, setPrintMode] = useState<'cv' | 'combined' | 'cover'>('cv')

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.classList.toggle('print-combined', printMode === 'combined')
    document.body.classList.toggle('print-cover', printMode === 'cover')
  }, [printMode])

  useEffect(() => {
    function handleAfterPrint() {
      setPrintMode('cv')
    }
    window.addEventListener('afterprint', handleAfterPrint)
    return () => window.removeEventListener('afterprint', handleAfterPrint)
  }, [])

  function handlePrintCv() {
    setPrintMode('cv')
    window.print()
  }

  function handlePrintCombined() {
    setPrintMode('combined')
    window.setTimeout(() => window.print(), 0)
  }

  function handlePrintCover() {
    setPrintMode('cover')
    window.setTimeout(() => window.print(), 0)
  }

  return (
    <CvAuthGate>
      <section className="page cv-page cv-a4">
        <div className="cv-shell">
          <div className="cv-header">
            <Header title="CURRICULUM VITAE" subtitle="Ralf Mitterbauer" subtitleColor="#65748b" />
            <div className="cv-actions">
              <Button className="cv-download" onClick={handlePrintCv}>
                PDF herunterladen
              </Button>
              <Button className="cv-download" variant="secondary" onClick={handlePrintCombined}>
                Anschreiben + CV
              </Button>
              <Button className="cv-download" variant="secondary" onClick={handlePrintCover}>
                Anschreiben PDF
              </Button>
            </div>
          </div>

          <div className="cv-hero">
            <div className="cv-hero-left">
              <h2>Senior Technical Product Manager | Platform &amp; Workflow Orchestration</h2>
              <p>Bad Salzdetfuth (Region Hannover), Germany</p>
              <p>Phone: +49 (0)151 22644067 · Email: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
              <p>Remote (Germany)</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Professional Summary</strong>
                <p>
                  Senior Technical Product Manager with extensive experience owning and evolving mission-critical platforms, partner systems,
                  and end-to-end workflows in complex, regulated, and revenue-generating environments. Strong background in platform
                  orchestration, workflow coordination, and system integration, with a proven ability to translate business, operational,
                  and compliance requirements into robust, scalable product capabilities.
                </p>
                <p>
                  Highly experienced in operating as a horizontal product lead, aligning multiple domains, engineering teams, and external
                  partners while safeguarding long-term platform integrity. Structured, systems-oriented, and comfortable taking ownership
                  in high-complexity environments with strong focus on reliability, performance, and operational efficiency.
                </p>
              </div>
            </Card>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Professional Summary</h3>
              <p>
                Senior Technical Product Manager with extensive experience owning and evolving mission-critical platforms, partner systems,
                and end-to-end workflows in complex, regulated, and revenue-generating environments.
              </p>
              <p>
                Strong background in platform orchestration, workflow coordination, and system integration, with a proven ability to translate
                business, operational, and compliance requirements into robust, scalable product capabilities.
              </p>
              <p>
                Highly experienced in operating as a horizontal product lead, aligning multiple domains, engineering teams, and external partners
                while safeguarding long-term platform integrity.
              </p>
            </Card>

            <Card className="cv-card">
              <h3>Core Competencies</h3>
              <ul>
                <li>Technical Product Management (Platform &amp; Backend Products)</li>
                <li>Platform &amp; Workflow Orchestration</li>
                <li>End-to-End Process Design &amp; Coordination</li>
                <li>API-driven Systems &amp; Service Integration</li>
                <li>State-based Workflows, Rules &amp; Exception Handling</li>
                <li>Product Vision, Roadmaps &amp; Strategic Prioritization</li>
                <li>Backlog Ownership &amp; Value-based Prioritization</li>
                <li>Cross-functional Stakeholder Alignment</li>
                <li>KPI Ownership (Reliability, Conversion, Cost, Performance)</li>
                <li>Change, Transformation &amp; Product Leadership</li>
              </ul>
            </Card>
          </div>

          <div className="cv-section">
            <h3>Professional Experience</h3>
            <div className="cv-timeline">
              <div>
                <strong>Insurfox GmbH – Hamburg, Germany</strong>
                <span>Product Owner / Technical Product Manager – Claims Platform · Since 11/2025</span>
                <ul>
                  <li>Product lead for a central, revenue-critical platform coordinating end-to-end insurance workflows across multiple internal systems and external partners.</li>
                  <li>Own the vision, roadmap, and priorities for a central claims and partner platform.</li>
                  <li>Design and evolve end-to-end workflows covering intake, validation, decision logic, fulfillment, and communication.</li>
                  <li>Translate business, regulatory, and operational requirements into reusable platform capabilities.</li>
                  <li>Own and maintain the product backlog, ensuring transparency and value-driven prioritization.</li>
                  <li>Act as the central interface between Engineering, Business, Operations, and external service providers.</li>
                  <li>Collaborate closely with senior engineers and architects on system boundaries, scalability, and long-term maintainability.</li>
                  <li>Support the ongoing evolution of the platform toward higher reliability, scalability, and operational efficiency.</li>
                </ul>
              </div>
              <div>
                <strong>RLE Nova GmbH – Germany</strong>
                <span>Product Manager / Product Owner – Digital Platforms · 01/2022 – 10/2025</span>
                <ul>
                  <li>Owned digital platform and partner products from concept to market launch.</li>
                  <li>Led the restructuring and further development of existing applications in agile environments.</li>
                  <li>Coordinated integration of external systems, partners, and service providers.</li>
                  <li>Defined product requirements, roadmaps, and success metrics.</li>
                  <li>Worked closely with Engineering, Business stakeholders, and customers to deliver scalable solutions.</li>
                </ul>
              </div>
              <div>
                <strong>RLE INTERNATIONAL GmbH &amp; Co. KG – Germany / International</strong>
                <span>Senior Consultant / Project Manager (After Sales &amp; Operations) · 05/2017 – 12/2021</span>
                <ul>
                  <li>Led complex, cross-market transformation and optimization initiatives.</li>
                  <li>Designed and implemented data-driven service and operational strategies.</li>
                  <li>Moderated senior stakeholders across business and operational units.</li>
                  <li>Coordinated international, cross-functional teams.</li>
                  <li>Delivered measurable improvements in efficiency, performance, and revenue.</li>
                </ul>
              </div>
              <div>
                <strong>A.T.U. GmbH &amp; Co. KG – Germany</strong>
                <span>Branch Manager / Business Leader · 06/2015 – 05/2017</span>
                <ul>
                  <li>Full operational and commercial responsibility for a large business unit.</li>
                  <li>Leadership and development of teams with 36+ employees.</li>
                  <li>Ownership of performance, quality, cost, and operational KPIs.</li>
                  <li>Execution of organizational and process transformations.</li>
                </ul>
              </div>
              <div>
                <strong>Nobilas GmbH (Akzo Nobel) – Germany (Nationwide)</strong>
                <span>Service Manager – Claims Steering &amp; Partner Networks · 12/2006 – 04/2008</span>
                <ul>
                  <li>Senior management role in the insurance and claims ecosystem, highly relevant to platform orchestration and partner coordination.</li>
                  <li>Strategic and operational ownership of a nationwide workshop and partner network.</li>
                  <li>Key partner for major insurance groups in claims and repair management.</li>
                  <li>Coordination of end-to-end claims workflows across insurers, service partners, and internal teams.</li>
                  <li>Leadership responsibility for more than 50 employees in operational and coordinating roles.</li>
                  <li>Design and implementation of partner, quality, and control frameworks.</li>
                  <li>Moderation of complex stakeholder environments at management and operational level.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Additional Experience (Selection)</h3>
              <ul>
                <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
                <li>Operations / Innovation Manager – GIMS UG</li>
                <li>Senior Consultant – IFL Consulting Group</li>
                <li>Management &amp; Business Development Roles – Akzo Nobel</li>
                <li>Marketing Manager – Porsche Racing Team Kadach</li>
                <li>Founder / Managing Director – own companies</li>
              </ul>
            </Card>
            <Card className="cv-card">
              <h3>Education</h3>
              <ul>
                <li>Master Craftsman (DQR Level 6 – equivalent to Bachelor level)</li>
                <li>Body &amp; Vehicle Construction</li>
                <li>Chamber of Crafts Hannover, Germany</li>
              </ul>
              <h3>Skills &amp; Languages</h3>
              <p><strong>Languages:</strong> German – Native (C1+), English – Fluent / Professional Working Proficiency</p>
              <p><strong>Tools &amp; Methods:</strong> Jira, Confluence, Miro, MS Office, agile delivery tools, process modeling, platform backlogs</p>
            </Card>
          </div>
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
            <p>Remote (Germany)</p>
          </div>

          <h3>Professional Summary</h3>
          <p>
            Senior Technical Product Manager with extensive experience owning and evolving mission-critical platforms, partner systems,
            and end-to-end workflows in complex, regulated, and revenue-generating environments. Strong background in platform orchestration,
            workflow coordination, and system integration, with a proven ability to translate business, operational, and compliance requirements
            into robust, scalable product capabilities.
          </p>
          <p>
            Highly experienced in operating as a horizontal product lead, aligning multiple domains, engineering teams, and external partners
            while safeguarding long-term platform integrity. Structured, systems-oriented, and comfortable taking ownership in high-complexity
            environments with strong focus on reliability, performance, and operational efficiency.
          </p>

          <h3>Core Competencies</h3>
          <ul>
            <li>Technical Product Management (Platform &amp; Backend Products)</li>
            <li>Platform &amp; Workflow Orchestration</li>
            <li>End-to-End Process Design &amp; Coordination</li>
            <li>API-driven Systems &amp; Service Integration</li>
            <li>State-based Workflows, Rules &amp; Exception Handling</li>
            <li>Product Vision, Roadmaps &amp; Strategic Prioritization</li>
            <li>Backlog Ownership &amp; Value-based Prioritization</li>
            <li>Cross-functional Stakeholder Alignment</li>
            <li>KPI Ownership (Reliability, Conversion, Cost, Performance)</li>
            <li>Change, Transformation &amp; Product Leadership</li>
          </ul>

          <h3>Professional Experience</h3>
          <h4>Insurfox GmbH – Hamburg, Germany</h4>
          <p>Product Owner / Technical Product Manager – Claims Platform · Since 11/2025</p>
          <ul>
            <li>Product lead for a central, revenue-critical platform coordinating end-to-end insurance workflows across multiple internal systems and external partners.</li>
            <li>Own the vision, roadmap, and priorities for a central claims and partner platform.</li>
            <li>Design and evolve end-to-end workflows covering intake, validation, decision logic, fulfillment, and communication.</li>
            <li>Translate business, regulatory, and operational requirements into reusable platform capabilities.</li>
            <li>Own and maintain the product backlog, ensuring transparency and value-driven prioritization.</li>
            <li>Act as the central interface between Engineering, Business, Operations, and external service providers.</li>
            <li>Collaborate closely with senior engineers and architects on system boundaries, scalability, and long-term maintainability.</li>
            <li>Support the ongoing evolution of the platform toward higher reliability, scalability, and operational efficiency.</li>
          </ul>

          <h4>RLE Nova GmbH – Germany</h4>
          <p>Product Manager / Product Owner – Digital Platforms · 01/2022 – 10/2025</p>
          <ul>
            <li>Owned digital platform and partner products from concept to market launch.</li>
            <li>Led the restructuring and further development of existing applications in agile environments.</li>
            <li>Coordinated integration of external systems, partners, and service providers.</li>
            <li>Defined product requirements, roadmaps, and success metrics.</li>
            <li>Worked closely with Engineering, Business stakeholders, and customers to deliver scalable solutions.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH &amp; Co. KG – Germany / International</h4>
          <p>Senior Consultant / Project Manager (After Sales &amp; Operations) · 05/2017 – 12/2021</p>
          <ul>
            <li>Led complex, cross-market transformation and optimization initiatives.</li>
            <li>Designed and implemented data-driven service and operational strategies.</li>
            <li>Moderated senior stakeholders across business and operational units.</li>
            <li>Coordinated international, cross-functional teams.</li>
            <li>Delivered measurable improvements in efficiency, performance, and revenue.</li>
          </ul>

          <h4>A.T.U. GmbH &amp; Co. KG – Germany</h4>
          <p>Branch Manager / Business Leader · 06/2015 – 05/2017</p>
          <ul>
            <li>Full operational and commercial responsibility for a large business unit.</li>
            <li>Leadership and development of teams with 36+ employees.</li>
            <li>Ownership of performance, quality, cost, and operational KPIs.</li>
            <li>Execution of organizational and process transformations.</li>
          </ul>

          <h4>Nobilas GmbH (Akzo Nobel) – Germany (Nationwide)</h4>
          <p>Service Manager – Claims Steering &amp; Partner Networks · 12/2006 – 04/2008</p>
          <ul>
            <li>Senior management role in the insurance and claims ecosystem, highly relevant to platform orchestration and partner coordination.</li>
            <li>Strategic and operational ownership of a nationwide workshop and partner network.</li>
            <li>Key partner for major insurance groups in claims and repair management.</li>
            <li>Coordination of end-to-end claims workflows across insurers, service partners, and internal teams.</li>
            <li>Leadership responsibility for more than 50 employees in operational and coordinating roles.</li>
            <li>Design and implementation of partner, quality, and control frameworks.</li>
            <li>Moderation of complex stakeholder environments at management and operational level.</li>
          </ul>

          <h3>Additional Experience (Selection)</h3>
          <ul>
            <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
            <li>Operations / Innovation Manager – GIMS UG</li>
            <li>Senior Consultant – IFL Consulting Group</li>
            <li>Management &amp; Business Development Roles – Akzo Nobel</li>
            <li>Marketing Manager – Porsche Racing Team Kadach</li>
            <li>Founder / Managing Director – own companies</li>
          </ul>

          <h3>Education</h3>
          <ul>
            <li>Master Craftsman (DQR Level 6 – equivalent to Bachelor level)</li>
            <li>Body &amp; Vehicle Construction</li>
            <li>Chamber of Crafts Hannover, Germany</li>
          </ul>

          <h3>Skills &amp; Languages</h3>
          <p><strong>Languages:</strong> German – Native (C1+), English – Fluent / Professional Working Proficiency</p>
          <p><strong>Tools &amp; Methods:</strong> Jira, Confluence, Miro, MS Office, agile delivery tools, process modeling, platform backlogs</p>
        </div>

        <div className="cv-print cv-print-combined">
          <div className="cv-print-header">
            <div>
              <h1>Anschreiben</h1>
              <h2>Bewerbung als Product Owner Partner Neuausrichtung</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>HDI AG – Standort Hannover</p>
            <p>Ralf Mitterbauer</p>
            <p>Uhlandstraße 11</p>
            <p>31162 Bad Salzdetfuth (Region Hannover)</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <p>Sehr geehrte Damen und Herren,</p>
          <p>
            die ausgeschriebene Position als Product Owner Partner Neuausrichtung bei der HDI AG spricht mich sehr an, da sie meine
            langjährige Erfahrung in der strategischen Weiterentwicklung zentraler Plattform- und Partnersysteme mit meiner fundierten
            Branchenkenntnis im Versicherungsumfeld ideal verbindet.
          </p>
          <p>
            In meiner aktuellen Rolle als Product Owner bei der Insurfox GmbH verantworte ich die Weiterentwicklung eines zentralen
            Plattform- und Partnersystems im Schadenumfeld. Zu meinen Aufgaben zählen die Gestaltung der Produktvision, die Verantwortung
            strategischer Roadmaps sowie die Erstellung, Priorisierung und transparente Kommunikation des Product Backlogs. Dabei agiere
            ich als zentrale Schnittstelle zwischen Fachbereichen, IT, agilen Teams und externen Dienstleistern und begleite die
            kontinuierliche Weiterentwicklung der Plattform- und Anwendungslandschaft in Richtung modularer, skalierbarer Lösungen.
          </p>
          <p>
            Ergänzend bringe ich umfangreiche Management- und Führungserfahrung im Versicherungsumfeld mit: Als Service Manager der
            Nobilas GmbH (Akzo Nobel) war ich für die Schadensteuerung sowie die strategische und operative Zusammenarbeit mit namhaften
            Versicherungskonzernen verantwortlich. In dieser Funktion steuerte ich ein bundesweites Werkstatt- und Partnernetzwerk und trug
            Führungsverantwortung für über 50 Mitarbeitende. Diese Erfahrung hat mein Verständnis für Partnerprozesse, Steuerungslogiken und
            die Interessen unterschiedlicher Stakeholder nachhaltig geprägt und bildet eine wertvolle Grundlage für die Neuausrichtung
            zentraler Partnersysteme.
          </p>
          <p>
            Meine berufliche Laufbahn ist geprägt von der Arbeit an komplexen Transformations- und Neuausrichtungsprojekten, in denen ich
            unterschiedliche Perspektiven zusammenführe, Teams in variierenden Führungsstilen moderiere und gemeinsam tragfähige Lösungen
            entwickle. Eine proaktive, analytische und lösungsorientierte Arbeitsweise sowie ein hoher Anspruch an Qualität, Transparenz und
            Zusammenarbeit zeichnen mich dabei aus.
          </p>
          <p>
            Die strategische Bedeutung des zentralen Partnersystems für die HDI Deutschland sowie die Möglichkeit, dessen zukunftsorientierte
            Weiterentwicklung aktiv mitzugestalten, motivieren mich sehr. Gern bringe ich meine Erfahrung, meine strukturierte Arbeitsweise
            und meine ausgeprägte Schnittstellen- und Führungskompetenz am Standort Hannover ein.
          </p>
          <p>Über eine Einladung zu einem persönlichen Gespräch freue ich mich sehr.</p>
          <p>Mit freundlichen Grüßen</p>
          <p>Ralf Mitterbauer</p>

          <div className="print-page-break" />

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
            <p>Remote (Germany)</p>
          </div>

          <h3>Professional Summary</h3>
          <p>
            Senior Technical Product Manager with extensive experience owning and evolving mission-critical platforms, partner systems,
            and end-to-end workflows in complex, regulated, and revenue-generating environments. Strong background in platform orchestration,
            workflow coordination, and system integration, with a proven ability to translate business, operational, and compliance requirements
            into robust, scalable product capabilities.
          </p>
          <p>
            Highly experienced in operating as a horizontal product lead, aligning multiple domains, engineering teams, and external partners
            while safeguarding long-term platform integrity. Structured, systems-oriented, and comfortable taking ownership in high-complexity
            environments with strong focus on reliability, performance, and operational efficiency.
          </p>

          <h3>Core Competencies</h3>
          <ul>
            <li>Technical Product Management (Platform &amp; Backend Products)</li>
            <li>Platform &amp; Workflow Orchestration</li>
            <li>End-to-End Process Design &amp; Coordination</li>
            <li>API-driven Systems &amp; Service Integration</li>
            <li>State-based Workflows, Rules &amp; Exception Handling</li>
            <li>Product Vision, Roadmaps &amp; Strategic Prioritization</li>
            <li>Backlog Ownership &amp; Value-based Prioritization</li>
            <li>Cross-functional Stakeholder Alignment</li>
            <li>KPI Ownership (Reliability, Conversion, Cost, Performance)</li>
            <li>Change, Transformation &amp; Product Leadership</li>
          </ul>

          <h3>Professional Experience</h3>
          <h4>Insurfox GmbH – Hamburg, Germany</h4>
          <p>Product Owner / Technical Product Manager – Claims Platform · Since 11/2025</p>
          <ul>
            <li>Product lead for a central, revenue-critical platform coordinating end-to-end insurance workflows across multiple internal systems and external partners.</li>
            <li>Own the vision, roadmap, and priorities for a central claims and partner platform.</li>
            <li>Design and evolve end-to-end workflows covering intake, validation, decision logic, fulfillment, and communication.</li>
            <li>Translate business, regulatory, and operational requirements into reusable platform capabilities.</li>
            <li>Own and maintain the product backlog, ensuring transparency and value-driven prioritization.</li>
            <li>Act as the central interface between Engineering, Business, Operations, and external service providers.</li>
            <li>Collaborate closely with senior engineers and architects on system boundaries, scalability, and long-term maintainability.</li>
            <li>Support the ongoing evolution of the platform toward higher reliability, scalability, and operational efficiency.</li>
          </ul>

          <h4>RLE Nova GmbH – Germany</h4>
          <p>Product Manager / Product Owner – Digital Platforms · 01/2022 – 10/2025</p>
          <ul>
            <li>Owned digital platform and partner products from concept to market launch.</li>
            <li>Led the restructuring and further development of existing applications in agile environments.</li>
            <li>Coordinated integration of external systems, partners, and service providers.</li>
            <li>Defined product requirements, roadmaps, and success metrics.</li>
            <li>Worked closely with Engineering, Business stakeholders, and customers to deliver scalable solutions.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH &amp; Co. KG – Germany / International</h4>
          <p>Senior Consultant / Project Manager (After Sales &amp; Operations) · 05/2017 – 12/2021</p>
          <ul>
            <li>Led complex, cross-market transformation and optimization initiatives.</li>
            <li>Designed and implemented data-driven service and operational strategies.</li>
            <li>Moderated senior stakeholders across business and operational units.</li>
            <li>Coordinated international, cross-functional teams.</li>
            <li>Delivered measurable improvements in efficiency, performance, and revenue.</li>
          </ul>

          <h4>A.T.U. GmbH &amp; Co. KG – Germany</h4>
          <p>Branch Manager / Business Leader · 06/2015 – 05/2017</p>
          <ul>
            <li>Full operational and commercial responsibility for a large business unit.</li>
            <li>Leadership and development of teams with 36+ employees.</li>
            <li>Ownership of performance, quality, cost, and operational KPIs.</li>
            <li>Execution of organizational and process transformations.</li>
          </ul>

          <h4>Nobilas GmbH (Akzo Nobel) – Germany (Nationwide)</h4>
          <p>Service Manager – Claims Steering &amp; Partner Networks · 12/2006 – 04/2008</p>
          <ul>
            <li>Senior management role in the insurance and claims ecosystem, highly relevant to platform orchestration and partner coordination.</li>
            <li>Strategic and operational ownership of a nationwide workshop and partner network.</li>
            <li>Key partner for major insurance groups in claims and repair management.</li>
            <li>Coordination of end-to-end claims workflows across insurers, service partners, and internal teams.</li>
            <li>Leadership responsibility for more than 50 employees in operational and coordinating roles.</li>
            <li>Design and implementation of partner, quality, and control frameworks.</li>
            <li>Moderation of complex stakeholder environments at management and operational level.</li>
          </ul>

          <h3>Additional Experience (Selection)</h3>
          <ul>
            <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
            <li>Operations / Innovation Manager – GIMS UG</li>
            <li>Senior Consultant – IFL Consulting Group</li>
            <li>Management &amp; Business Development Roles – Akzo Nobel</li>
            <li>Marketing Manager – Porsche Racing Team Kadach</li>
            <li>Founder / Managing Director – own companies</li>
          </ul>

          <h3>Education</h3>
          <ul>
            <li>Master Craftsman (DQR Level 6 – equivalent to Bachelor level)</li>
            <li>Body &amp; Vehicle Construction</li>
            <li>Chamber of Crafts Hannover, Germany</li>
          </ul>

          <h3>Skills &amp; Languages</h3>
          <p><strong>Languages:</strong> German – Native (C1+), English – Fluent / Professional Working Proficiency</p>
          <p><strong>Tools &amp; Methods:</strong> Jira, Confluence, Miro, MS Office, agile delivery tools, process modeling, platform backlogs</p>
        </div>

        <div className="cv-print cv-print-cover">
          <div className="cv-print-header">
            <div>
              <h1>Application</h1>
              <h2>Senior Technical Product Manager – Platform &amp; Workflow Orchestration</h2>
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
            <p>Remote (Germany)</p>
          </div>

          <h3>Application</h3>
          <p>Application for Senior Technical Product Manager – Platform &amp; Workflow Orchestration</p>
          <p>Dear Hiring Team,</p>
          <p>
            I am writing to express my interest in the Senior Technical Product Manager – Platform &amp; Workflow Orchestration role. The
            position strongly resonates with my background in owning and evolving mission-critical, horizontal platforms that coordinate
            complex workflows across multiple services, stakeholders, and regulatory constraints.
          </p>
          <p>
            In my current role as Product Owner / Technical Product Manager at Insurfox, I take end-to-end ownership of a central,
            revenue-generating platform within the insurance domain. This platform coordinates complex workflows across intake, validation,
            decision logic, partner interaction, and communication. My responsibilities include defining the product vision and roadmap,
            owning and prioritizing the backlog, and translating business, operational, and compliance requirements into robust, reusable
            platform capabilities. I work closely with senior engineers and architects to ensure scalability, reliability, and long-term
            maintainability while managing dependencies across multiple domains.
          </p>
          <p>
            Beyond my current role, my career has consistently focused on orchestration, coordination, and platform ownership in complex
            environments. Earlier, as Service Manager at Nobilas (Akzo Nobel), I was responsible for steering nationwide partner networks
            in the insurance claims ecosystem. I coordinated end-to-end workflows across insurers, service partners, and internal teams and
            held leadership responsibility for more than 50 employees. This experience deeply shaped my systems-oriented mindset and my
            understanding of how platform decisions directly impact operational efficiency, partner performance, and customer outcomes.
          </p>
          <p>
            What particularly attracts me to this role is the focus on an already live, business-critical orchestration layer where the
            challenge lies not in validation, but in improving performance, reliability, scalability, and economic efficiency under growing
            complexity. I am comfortable operating in environments where workflows are revenue-critical, highly interconnected, and subject
            to regulatory requirements, and where product decisions must balance technical integrity with business impact.
          </p>
          <p>
            I see the orchestration platform not as a technical abstraction, but as a product in its own right: one that enables
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
