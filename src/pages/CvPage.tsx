import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import CvAuthGate from '@/components/CvAuthGate'
import profileImage from '@/assets/images/rm.png'

export default function CvPage() {
  return (
    <CvAuthGate>
      <section className="page cv-page">
        <div className="cv-shell">
          <div className="cv-header">
            <Header title="Lebenslauf" subtitle="Ralf Mitterbauer" subtitleColor="#65748b" />
            <Button className="cv-download" onClick={() => window.print()}>
              PDF herunterladen
            </Button>
          </div>

          <div className="cv-hero">
            <div className="cv-hero-left">
              <h2>IT Product Owner | Produktmanager Software & Plattformen</h2>
              <p>Uhlandstraße 11 · 31162 Bad Salzdetfuth (Region Hannover)</p>
              <p>Telefon: +49 (0)151 22644067 · E-Mail: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Profil</strong>
                <p>
                  Engagierter und erfahrener IT Product Owner und Produktmanager mit umfassender Expertise in der Entwicklung,
                  Strukturierung und Weiterentwicklung komplexer Software- und Plattformlösungen.
                </p>
              </div>
            </Card>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Profil</h3>
              <p>
                Langjährige Erfahrung im Aufbau skalierbarer Produktarchitekturen, der Modellierung End-to-End-Prozesse sowie der
                Übersetzung fachlicher Anforderungen in stabile, marktfähige IT-Lösungen.
              </p>
              <p>
                Besonders stark in prozessgetriebenen und regulierten Umfeldern, mit ausgeprägter Schnittstellenkompetenz zwischen
                Business, IT, Entwicklung und Management.
              </p>
              <p>
                Verbindet technisches Verständnis mit analytischer Stärke, pragmatischer Umsetzung und klarer Kommunikation. Hohe
                Affinität zu Mobilität, Technik, Digitalisierung und Qualitätssicherung.
              </p>
            </Card>

            <Card className="cv-card">
              <h3>Fach- & Methodenkompetenzen</h3>
              <ul>
                <li>IT Product Ownership & Produktmanagement</li>
                <li>Agile Softwareentwicklung (Scrum, Kanban)</li>
                <li>Plattformstrategie & modulare Systemarchitekturen</li>
                <li>Prozessmodellierung & Prozessintegration</li>
                <li>End-to-End-Verantwortung für Kernprozesse</li>
                <li>Anforderungsmanagement & Backlog-Priorisierung</li>
                <li>Steuerung von Entwicklerteams & externen Dienstleistern</li>
                <li>Stakeholder- & Schnittstellenmanagement</li>
                <li>Qualität, Budget & Time-to-Market</li>
                <li>Digitale Transformation & Change Management</li>
              </ul>
            </Card>
          </div>

          <div className="cv-section">
            <h3>Beruflicher Werdegang</h3>
            <div className="cv-timeline">
              <div>
                <strong>Insurfox GmbH, Hamburg</strong>
                <span>IT Product Owner Claims / Plattformen · seit 11/2025</span>
                <ul>
                  <li>Verantwortung für die agile Weiterentwicklung einer skalierbaren IaaS-basierten Softwareplattform im Bereich Schadenmanagement (Claims).</li>
                  <li>Definition der Produkt- und Plattformstrategie, Zielarchitektur und Roadmap.</li>
                  <li>Übersetzung fachlicher, regulatorischer und technischer Anforderungen in Epics, Features und User Stories.</li>
                  <li>Priorisierung und Pflege des Product Backlogs nach Business Value und strategischer Relevanz.</li>
                </ul>
              </div>
              <div>
                <strong>RLE Nova GmbH</strong>
                <span>Produktmanager / Vertrieb · 01/2022 – 10/2025</span>
                <ul>
                  <li>Konzeption, Entwicklung und Markteinführung digitaler Systeme und Plattformlösungen.</li>
                  <li>Digitale Transformation von Ticketing-, Akkreditierungs- und Check-in-Prozessen.</li>
                  <li>Steuerung interdisziplinärer Projektteams von der Idee bis zur Marktreife.</li>
                </ul>
              </div>
              <div>
                <strong>RLE INTERNATIONAL GmbH & Co. KG</strong>
                <span>Senior Berater After Sales · 05/2017 – 12/2021</span>
                <ul>
                  <li>Strategische Beratung im internationalen Aftersales-Umfeld.</li>
                  <li>Entwicklung datenbasierter Vertriebs- und Service-Strategien.</li>
                  <li>Umsetzung von Change-Management-Maßnahmen mit messbaren Effizienz- und Umsatzsteigerungen.</li>
                </ul>
              </div>
              <div>
                <strong>A.T.U. GmbH & Co. KG</strong>
                <span>Geschäftsleiter · 06/2015 – 05/2017</span>
                <ul>
                  <li>Gesamtverantwortung für einen der größten Filialbetriebe mit über 36 Mitarbeitenden.</li>
                  <li>Umsetzung umfassender Change- und Optimierungsmaßnahmen.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Weitere berufliche Stationen (Auswahl)</h3>
              <ul>
                <li>Service Manager – AH Lier GmbH & Co. KG</li>
                <li>Operations / Innovation Manager – GIMS UG</li>
                <li>Senior Berater – IFL Consulting Group</li>
                <li>Service- und Business-Development-Funktionen – AkzoNobel (Nobilas GmbH)</li>
                <li>Marketing Manager – Porsche Racing Team Kadach</li>
                <li>Inhaber / Geschäftsführer – eigene Unternehmen</li>
              </ul>
            </Card>
            <Card className="cv-card">
              <h3>Ausbildung</h3>
              <ul>
                <li>Karosserie- und Fahrzeugbauer-Meister – Handwerkskammer Hannover</li>
                <li>Karosserie- und Fahrzeugbauer – Fahrzeug- und Karosseriebauer-Innung Hannover-Bremen</li>
              </ul>
              <h3>Kenntnisse</h3>
              <p><strong>Sprachen:</strong> Deutsch (Muttersprache), Englisch (verhandlungssicher)</p>
              <p><strong>IT & Tools:</strong> Jira, Confluence, Miro, MS Office, agile Projekttools, Prozessmodellierung</p>
            </Card>
          </div>
        </div>

        <div className="cv-print">
          <div className="cv-print-header">
            <div>
              <h1>Ralf Mitterbauer</h1>
              <h2>IT Product Owner | Produktmanager Software & Plattformen</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Uhlandstraße 11</p>
            <p>31162 Bad Salzdetfuth (Region Hannover)</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <h3>Profil</h3>
          <p>
            Engagierter und erfahrener IT Product Owner und Produktmanager mit umfassender Expertise in der Entwicklung, Strukturierung und
            Weiterentwicklung komplexer Software- und Plattformlösungen.
          </p>
          <p>
            Langjährige Erfahrung im Aufbau skalierbarer Produktarchitekturen, der Modellierung End-to-End-Prozesse sowie der Übersetzung fachlicher
            Anforderungen in stabile, marktfähige IT-Lösungen.
          </p>
          <p>
            Besonders stark in prozessgetriebenen und regulierten Umfeldern, mit ausgeprägter Schnittstellenkompetenz zwischen Business, IT,
            Entwicklung und Management.
          </p>

          <h3>Fach- & Methodenkompetenzen</h3>
          <ul>
            <li>IT Product Ownership & Produktmanagement</li>
            <li>Agile Softwareentwicklung (Scrum, Kanban)</li>
            <li>Plattformstrategie & modulare Systemarchitekturen</li>
            <li>Prozessmodellierung & Prozessintegration</li>
            <li>End-to-End-Verantwortung für Kernprozesse</li>
            <li>Anforderungsmanagement & Backlog-Priorisierung</li>
            <li>Steuerung von Entwicklerteams & externen Dienstleistern</li>
            <li>Stakeholder- & Schnittstellenmanagement</li>
            <li>Qualität, Budget & Time-to-Market</li>
            <li>Digitale Transformation & Change Management</li>
          </ul>

          <h3>Beruflicher Werdegang</h3>
          <h4>Insurfox GmbH, Hamburg</h4>
          <p>IT Product Owner Claims / Plattformen · seit 11/2025</p>
          <ul>
            <li>Verantwortung für die agile Weiterentwicklung einer skalierbaren IaaS-basierten Softwareplattform im Bereich Schadenmanagement (Claims).</li>
            <li>Aufbau und Weiterentwicklung der Struktur und Architektur der Plattform als technisches Fundament.</li>
            <li>Definition der Produkt- und Plattformstrategie, Zielarchitektur und Roadmap.</li>
            <li>Modellierung, Analyse und Optimierung End-to-End-Geschäftsprozesse.</li>
            <li>Übersetzung fachlicher, regulatorischer und technischer Anforderungen in Epics, Features und User Stories.</li>
            <li>Priorisierung und Pflege des Product Backlogs nach Business Value und strategischer Relevanz.</li>
          </ul>

          <h4>RLE Nova GmbH</h4>
          <p>Produktmanager / Vertrieb · 01/2022 – 10/2025</p>
          <ul>
            <li>Verantwortung für Konzeption, Entwicklung und Markteinführung digitaler Systeme und Plattformlösungen.</li>
            <li>Entwicklung innovativer Softwarelösungen für Eventmanagement, Identitäts- und Zugangssysteme.</li>
            <li>Digitale Transformation von Ticketing-, Akkreditierungs- und Check-in-Prozessen.</li>
            <li>Umsetzung datenschutzkonformer Lösungen inkl. Identitäts- und Statusverifikation.</li>
            <li>Enge Zusammenarbeit mit Entwicklung, Kunden und Technologiepartnern.</li>
            <li>Steuerung interdisziplinärer Projektteams von der Idee bis zur Marktreife.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH & Co. KG</h4>
          <p>Senior Berater After Sales · 05/2017 – 12/2021</p>
          <ul>
            <li>Strategische Beratung im internationalen Aftersales-Umfeld.</li>
            <li>Durchführung umfangreicher Markt- und Wettbewerbsanalysen (Europa & weitere Märkte).</li>
            <li>Entwicklung datenbasierter Vertriebs- und Service-Strategien.</li>
            <li>Leitung regionaler Beraterteams.</li>
            <li>Umsetzung von Change-Management-Maßnahmen mit messbaren Effizienz- und Umsatzsteigerungen.</li>
          </ul>

          <h4>A.T.U. GmbH & Co. KG</h4>
          <p>Geschäftsleiter · 06/2015 – 05/2017</p>
          <ul>
            <li>Gesamtverantwortung für einen der größten Filialbetriebe mit über 36 Mitarbeitenden.</li>
            <li>Führung, Entwicklung und Motivation großer Teams.</li>
            <li>Umsetzung umfassender Change- und Optimierungsmaßnahmen.</li>
            <li>Prozessoptimierung, Umsatzsteigerung und Ergebnisverantwortung.</li>
          </ul>

          <h3>Weitere berufliche Stationen (Auswahl)</h3>
          <ul>
            <li>Service Manager – AH Lier GmbH & Co. KG</li>
            <li>Operations / Innovation Manager – GIMS UG</li>
            <li>Senior Berater – IFL Consulting Group</li>
            <li>Service- und Business-Development-Funktionen – AkzoNobel (Nobilas GmbH)</li>
            <li>Marketing Manager – Porsche Racing Team Kadach</li>
            <li>Inhaber / Geschäftsführer – eigene Unternehmen</li>
          </ul>

          <h3>Ausbildung</h3>
          <ul>
            <li>Karosserie- und Fahrzeugbauer-Meister – Handwerkskammer Hannover</li>
            <li>Karosserie- und Fahrzeugbauer – Fahrzeug- und Karosseriebauer-Innung Hannover-Bremen</li>
          </ul>

          <h3>Kenntnisse</h3>
          <p>Sprachen: Deutsch (Muttersprache), Englisch (verhandlungssicher)</p>
          <p>IT & Tools: Jira, Confluence, Miro, MS Office, agile Projekttools, Prozessmodellierung</p>
        </div>
      </section>
    </CvAuthGate>
  )
}
