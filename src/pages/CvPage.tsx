import React, { useEffect, useState } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import CvAuthGate from '@/components/CvAuthGate'
import profileImage from '@/assets/images/rm.png'

export default function CvPage() {
  const [printMode, setPrintMode] = useState<'cv' | 'combined'>('cv')

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.classList.toggle('print-combined', printMode === 'combined')
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

  return (
    <CvAuthGate>
      <section className="page cv-page">
        <div className="cv-shell">
          <div className="cv-header">
            <Header title="Lebenslauf" subtitle="Ralf Mitterbauer" subtitleColor="#65748b" />
            <div className="cv-actions">
              <Button className="cv-download" onClick={handlePrintCv}>
                PDF herunterladen
              </Button>
              <Button className="cv-download" variant="secondary" onClick={handlePrintCombined}>
                Anschreiben + CV
              </Button>
            </div>
          </div>

          <div className="cv-hero">
            <div className="cv-hero-left">
              <h2>Product Owner | Product Lead Plattformen &amp; Partner-Systeme</h2>
              <p>Uhlandstraße 11 · 31162 Bad Salzdetfuth (Region Hannover)</p>
              <p>Telefon: +49 (0)151 22644067 · E-Mail: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Profil</strong>
                <p>
                  Erfahrener Product Owner und Product Lead mit langjähriger Verantwortung für die strategische Weiterentwicklung zentraler
                  Plattform-, Partner- und Prozesssysteme in komplexen, regulierten Umfeldern.
                </p>
              </div>
            </Card>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Profil</h3>
              <p>
                Tiefes Verständnis für Versicherungsprozesse, Schadensteuerung und Partnernetzwerke, kombiniert mit moderner Produkt-, Plattform-
                und Architekturorientierung.
              </p>
              <p>
                Sehr ausgeprägte Schnittstellenkompetenz zwischen Fachbereichen, IT, agilen Teams und externen Dienstleistern sowie nachgewiesene
                Führungserfahrung in Linien- und Projektstrukturen.
              </p>
              <p>Analytisch, strukturiert, durchsetzungsstark und lösungsorientiert mit hoher Eigeninitiative und klarem Fokus auf nachhaltige Neuausrichtungen.</p>
            </Card>

            <Card className="cv-card">
              <h3>Fach- &amp; Methodenkompetenzen</h3>
              <ul>
                <li>Product Ownership &amp; Product Lead Rollen</li>
                <li>Strategische Produkt- und Plattform-Neuausrichtung</li>
                <li>Partner- und Ökosystem-Management</li>
                <li>Versicherungs- &amp; Schadenprozesse (End-to-End)</li>
                <li>Microservice-Architekturen &amp; API-Integration</li>
                <li>Agile Methoden (Scrum, Kanban)</li>
                <li>Produkt-Roadmaps &amp; Zielarchitekturen</li>
                <li>Backlog-Verantwortung &amp; Priorisierung</li>
                <li>Stakeholder-, Schnittstellen- &amp; Partnermanagement</li>
                <li>Führung, Moderation &amp; Change Management</li>
              </ul>
            </Card>
          </div>

          <div className="cv-section">
            <h3>Beruflicher Werdegang</h3>
            <div className="cv-timeline">
              <div>
                <strong>Insurfox GmbH, Hamburg</strong>
                <span>Product Owner Claims / Plattformen · seit 11/2025</span>
                <ul>
                  <li>Product-Lead-Rolle für die strategische Weiterentwicklung eines zentralen Plattform- und Partnersystems im Versicherungsumfeld.</li>
                  <li>Strategische Weiterentwicklung einer zentralen Schaden- und Partnerplattform.</li>
                  <li>Verantwortung für Produktvision, Roadmaps und Zielarchitektur.</li>
                  <li>Steuerung der Anbindung neuer Konsument:innen und Partner über Microservices.</li>
                  <li>Verantwortung für Erstellung, Pflege und transparente Kommunikation des Product Backlogs.</li>
                  <li>Zentrale Schnittstelle zwischen Fachbereichen, IT, agilen Entwicklungsteams und externen Dienstleistern.</li>
                  <li>Begleitung der technologischen Transformation hin zu modularen, skalierbaren Plattform-Services.</li>
                  <li>Aktive Rolle als Moderator, Entscheider und Impulsgeber im agilen Setup.</li>
                </ul>
              </div>
              <div>
                <strong>RLE Nova GmbH</strong>
                <span>Produktmanager / Product Owner · 01/2022 – 10/2025</span>
                <ul>
                  <li>Konzeption, Entwicklung und Markteinführung digitaler Plattform- und Partnersysteme.</li>
                  <li>Neuausrichtung bestehender Anwendungen in agilen Teams.</li>
                  <li>Integration externer Systeme, Dienstleister und Partner über serviceorientierte Architekturen.</li>
                  <li>Verantwortung für Produktanforderungen, Roadmaps und Stakeholder-Kommunikation.</li>
                  <li>Enge Zusammenarbeit mit Entwicklung, Business und externen Partnern.</li>
                </ul>
              </div>
              <div>
                <strong>RLE INTERNATIONAL GmbH &amp; Co. KG</strong>
                <span>Senior Berater / Projektmanager After Sales · 05/2017 – 12/2021</span>
                <ul>
                  <li>Strategische Beratung und Steuerung komplexer Transformations- und Optimierungsprojekte.</li>
                  <li>Entwicklung und Umsetzung datenbasierter Service- und Vertriebsstrategien.</li>
                  <li>Moderation von Stakeholdern auf Management- und operativer Ebene.</li>
                  <li>Führung und Koordination internationaler Projekt- und Beratungsteams.</li>
                  <li>Umsetzung von Change-Management-Maßnahmen mit messbaren Effizienz- und Umsatzsteigerungen.</li>
                </ul>
              </div>
              <div>
                <strong>A.T.U. GmbH &amp; Co. KG</strong>
                <span>Geschäftsleiter · 06/2015 – 05/2017</span>
                <ul>
                  <li>Gesamtverantwortung für einen der größten Filialbetriebe mit über 36 Mitarbeitenden.</li>
                  <li>Führung, Entwicklung und Motivation großer Teams.</li>
                  <li>Umsetzung tiefgreifender organisatorischer und prozessualer Neuausrichtungen.</li>
                  <li>Ergebnis-, Kosten- und Qualitätsverantwortung.</li>
                </ul>
              </div>
              <div>
                <strong>Nobilas GmbH (Akzo Nobel), Deutschlandweit</strong>
                <span>Service Manager Schadensteuerung &amp; Partnernetzwerke · 12/2006 – 04/2008</span>
                <ul>
                  <li>Zentrale Managementfunktion im Versicherungsumfeld mit Fokus auf Schadensteuerung, Partnernetzwerke und Führung großer Organisationseinheiten.</li>
                  <li>Verantwortung für die operative und strategische Steuerung eines bundesweiten Werkstattnetzwerks.</li>
                  <li>Partner namhafter Versicherungskonzerne im Bereich Schadenmanagement.</li>
                  <li>Steuerung komplexer End-to-End-Schadenprozesse zwischen Versicherern, Werkstätten und Dienstleistern.</li>
                  <li>Führungsverantwortung für über 50 Mitarbeitende in operativen und koordinierenden Funktionen.</li>
                  <li>Entwicklung und Umsetzung von Partner-, Qualitäts- und Steuerungskonzepten.</li>
                  <li>Moderation anspruchsvoller Stakeholder-Strukturen auf Management- und operativer Ebene.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Weitere berufliche Stationen (Auswahl)</h3>
              <ul>
                <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
                <li>Operations / Innovation Manager – GIMS UG</li>
                <li>Senior Berater – IFL Consulting Group</li>
                <li>Management- und Business-Development-Funktionen – AkzoNobel (Nobilas GmbH)</li>
                <li>Marketing Manager – Porsche Racing Team Kadach</li>
                <li>Inhaber / Geschäftsführer – eigene Unternehmen</li>
              </ul>
            </Card>
            <Card className="cv-card">
              <h3>Ausbildung</h3>
              <ul>
                <li>Karosserie- und Fahrzeugbauer-Meister (DQR 6 – Bachelor-Niveau)</li>
                <li>Handwerkskammer Hannover</li>
              </ul>
              <h3>Kenntnisse</h3>
              <p><strong>Sprachen:</strong> Deutsch (C1 / Muttersprache), Englisch (verhandlungssicher)</p>
              <p><strong>IT &amp; Tools:</strong> Jira, Confluence, Miro, MS Office, agile Projekttools, Prozessmodellierung</p>
            </Card>
          </div>
        </div>

        <div className="cv-print">
          <div className="cv-print-header">
            <div>
              <h1>Ralf Mitterbauer</h1>
              <h2>Product Owner | Product Lead Plattformen &amp; Partner-Systeme</h2>
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
            Erfahrener Product Owner und Product Lead mit langjähriger Verantwortung für die strategische Weiterentwicklung zentraler
            Plattform-, Partner- und Prozesssysteme in komplexen, regulierten Umfeldern. Tiefes Verständnis für Versicherungsprozesse,
            Schadensteuerung und Partnernetzwerke, kombiniert mit moderner Produkt-, Plattform- und Architekturorientierung.
          </p>
          <p>
            Sehr ausgeprägte Schnittstellenkompetenz zwischen Fachbereichen, IT, agilen Teams und externen Dienstleistern sowie nachgewiesene
            Führungserfahrung in Linien- und Projektstrukturen. Analytisch, strukturiert, durchsetzungsstark und lösungsorientiert mit hoher
            Eigeninitiative und klarem Fokus auf nachhaltige Neuausrichtungen.
          </p>

          <h3>Fach- &amp; Methodenkompetenzen</h3>
          <ul>
            <li>Product Ownership &amp; Product Lead Rollen</li>
            <li>Strategische Produkt- und Plattform-Neuausrichtung</li>
            <li>Partner- und Ökosystem-Management</li>
            <li>Versicherungs- &amp; Schadenprozesse (End-to-End)</li>
            <li>Microservice-Architekturen &amp; API-Integration</li>
            <li>Agile Methoden (Scrum, Kanban)</li>
            <li>Produkt-Roadmaps &amp; Zielarchitekturen</li>
            <li>Backlog-Verantwortung &amp; Priorisierung</li>
            <li>Stakeholder-, Schnittstellen- &amp; Partnermanagement</li>
            <li>Führung, Moderation &amp; Change Management</li>
          </ul>

          <h3>Beruflicher Werdegang</h3>
          <h4>Insurfox GmbH, Hamburg</h4>
          <p>Product Owner Claims / Plattformen · seit 11/2025</p>
          <ul>
            <li>Product-Lead-Rolle für die strategische Weiterentwicklung eines zentralen Plattform- und Partnersystems im Versicherungsumfeld.</li>
            <li>Strategische Weiterentwicklung einer zentralen Schaden- und Partnerplattform.</li>
            <li>Verantwortung für Produktvision, Roadmaps und Zielarchitektur.</li>
            <li>Steuerung der Anbindung neuer Konsument:innen und Partner über Microservices.</li>
            <li>Verantwortung für Erstellung, Pflege und transparente Kommunikation des Product Backlogs.</li>
            <li>Zentrale Schnittstelle zwischen Fachbereichen, IT, agilen Entwicklungsteams und externen Dienstleistern.</li>
            <li>Begleitung der technologischen Transformation hin zu modularen, skalierbaren Plattform-Services.</li>
            <li>Aktive Rolle als Moderator, Entscheider und Impulsgeber im agilen Setup.</li>
          </ul>

          <h4>RLE Nova GmbH</h4>
          <p>Produktmanager / Product Owner · 01/2022 – 10/2025</p>
          <ul>
            <li>Konzeption, Entwicklung und Markteinführung digitaler Plattform- und Partnersysteme.</li>
            <li>Neuausrichtung bestehender Anwendungen in agilen Teams.</li>
            <li>Integration externer Systeme, Dienstleister und Partner über serviceorientierte Architekturen.</li>
            <li>Verantwortung für Produktanforderungen, Roadmaps und Stakeholder-Kommunikation.</li>
            <li>Enge Zusammenarbeit mit Entwicklung, Business und externen Partnern.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH &amp; Co. KG</h4>
          <p>Senior Berater / Projektmanager After Sales · 05/2017 – 12/2021</p>
          <ul>
            <li>Strategische Beratung und Steuerung komplexer Transformations- und Optimierungsprojekte.</li>
            <li>Entwicklung und Umsetzung datenbasierter Service- und Vertriebsstrategien.</li>
            <li>Moderation von Stakeholdern auf Management- und operativer Ebene.</li>
            <li>Führung und Koordination internationaler Projekt- und Beratungsteams.</li>
            <li>Umsetzung von Change-Management-Maßnahmen mit messbaren Effizienz- und Umsatzsteigerungen.</li>
          </ul>

          <h4>A.T.U. GmbH &amp; Co. KG</h4>
          <p>Geschäftsleiter · 06/2015 – 05/2017</p>
          <ul>
            <li>Gesamtverantwortung für einen der größten Filialbetriebe mit über 36 Mitarbeitenden.</li>
            <li>Führung, Entwicklung und Motivation großer Teams.</li>
            <li>Umsetzung tiefgreifender organisatorischer und prozessualer Neuausrichtungen.</li>
            <li>Ergebnis-, Kosten- und Qualitätsverantwortung.</li>
          </ul>

          <h4>Nobilas GmbH (Akzo Nobel), Deutschlandweit</h4>
          <p>Service Manager Schadensteuerung &amp; Partnernetzwerke · 12/2006 – 04/2008</p>
          <ul>
            <li>Zentrale Managementfunktion im Versicherungsumfeld mit Fokus auf Schadensteuerung, Partnernetzwerke und Führung großer Organisationseinheiten.</li>
            <li>Verantwortung für die operative und strategische Steuerung eines bundesweiten Werkstattnetzwerks.</li>
            <li>Partner namhafter Versicherungskonzerne im Bereich Schadenmanagement.</li>
            <li>Steuerung komplexer End-to-End-Schadenprozesse zwischen Versicherern, Werkstätten und Dienstleistern.</li>
            <li>Führungsverantwortung für über 50 Mitarbeitende in operativen und koordinierenden Funktionen.</li>
            <li>Entwicklung und Umsetzung von Partner-, Qualitäts- und Steuerungskonzepten.</li>
            <li>Moderation anspruchsvoller Stakeholder-Strukturen auf Management- und operativer Ebene.</li>
          </ul>

          <h3>Weitere berufliche Stationen (Auswahl)</h3>
          <ul>
            <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
            <li>Operations / Innovation Manager – GIMS UG</li>
            <li>Senior Berater – IFL Consulting Group</li>
            <li>Management- und Business-Development-Funktionen – AkzoNobel (Nobilas GmbH)</li>
            <li>Marketing Manager – Porsche Racing Team Kadach</li>
            <li>Inhaber / Geschäftsführer – eigene Unternehmen</li>
          </ul>

          <h3>Ausbildung</h3>
          <ul>
            <li>Karosserie- und Fahrzeugbauer-Meister (DQR 6 – Bachelor-Niveau)</li>
            <li>Handwerkskammer Hannover</li>
          </ul>

          <h3>Kenntnisse</h3>
          <p><strong>Sprachen:</strong> Deutsch (C1 / Muttersprache), Englisch (verhandlungssicher)</p>
          <p><strong>IT &amp; Tools:</strong> Jira, Confluence, Miro, MS Office, agile Projekttools, Prozessmodellierung</p>
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
              <h2>Product Owner | Product Lead Plattformen &amp; Partner-Systeme</h2>
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
            Erfahrener Product Owner und Product Lead mit langjähriger Verantwortung für die strategische Weiterentwicklung zentraler
            Plattform-, Partner- und Prozesssysteme in komplexen, regulierten Umfeldern. Tiefes Verständnis für Versicherungsprozesse,
            Schadensteuerung und Partnernetzwerke, kombiniert mit moderner Produkt-, Plattform- und Architekturorientierung.
          </p>
          <p>
            Sehr ausgeprägte Schnittstellenkompetenz zwischen Fachbereichen, IT, agilen Teams und externen Dienstleistern sowie nachgewiesene
            Führungserfahrung in Linien- und Projektstrukturen. Analytisch, strukturiert, durchsetzungsstark und lösungsorientiert mit hoher
            Eigeninitiative und klarem Fokus auf nachhaltige Neuausrichtungen.
          </p>

          <h3>Fach- &amp; Methodenkompetenzen</h3>
          <ul>
            <li>Product Ownership &amp; Product Lead Rollen</li>
            <li>Strategische Produkt- und Plattform-Neuausrichtung</li>
            <li>Partner- und Ökosystem-Management</li>
            <li>Versicherungs- &amp; Schadenprozesse (End-to-End)</li>
            <li>Microservice-Architekturen &amp; API-Integration</li>
            <li>Agile Methoden (Scrum, Kanban)</li>
            <li>Produkt-Roadmaps &amp; Zielarchitekturen</li>
            <li>Backlog-Verantwortung &amp; Priorisierung</li>
            <li>Stakeholder-, Schnittstellen- &amp; Partnermanagement</li>
            <li>Führung, Moderation &amp; Change Management</li>
          </ul>

          <h3>Beruflicher Werdegang</h3>
          <h4>Insurfox GmbH, Hamburg</h4>
          <p>Product Owner Claims / Plattformen · seit 11/2025</p>
          <ul>
            <li>Product-Lead-Rolle für die strategische Weiterentwicklung eines zentralen Plattform- und Partnersystems im Versicherungsumfeld.</li>
            <li>Strategische Weiterentwicklung einer zentralen Schaden- und Partnerplattform.</li>
            <li>Verantwortung für Produktvision, Roadmaps und Zielarchitektur.</li>
            <li>Steuerung der Anbindung neuer Konsument:innen und Partner über Microservices.</li>
            <li>Verantwortung für Erstellung, Pflege und transparente Kommunikation des Product Backlogs.</li>
            <li>Zentrale Schnittstelle zwischen Fachbereichen, IT, agilen Entwicklungsteams und externen Dienstleistern.</li>
            <li>Begleitung der technologischen Transformation hin zu modularen, skalierbaren Plattform-Services.</li>
            <li>Aktive Rolle als Moderator, Entscheider und Impulsgeber im agilen Setup.</li>
          </ul>

          <h4>RLE Nova GmbH</h4>
          <p>Produktmanager / Product Owner · 01/2022 – 10/2025</p>
          <ul>
            <li>Konzeption, Entwicklung und Markteinführung digitaler Plattform- und Partnersysteme.</li>
            <li>Neuausrichtung bestehender Anwendungen in agilen Teams.</li>
            <li>Integration externer Systeme, Dienstleister und Partner über serviceorientierte Architekturen.</li>
            <li>Verantwortung für Produktanforderungen, Roadmaps und Stakeholder-Kommunikation.</li>
            <li>Enge Zusammenarbeit mit Entwicklung, Business und externen Partnern.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH &amp; Co. KG</h4>
          <p>Senior Berater / Projektmanager After Sales · 05/2017 – 12/2021</p>
          <ul>
            <li>Strategische Beratung und Steuerung komplexer Transformations- und Optimierungsprojekte.</li>
            <li>Entwicklung und Umsetzung datenbasierter Service- und Vertriebsstrategien.</li>
            <li>Moderation von Stakeholdern auf Management- und operativer Ebene.</li>
            <li>Führung und Koordination internationaler Projekt- und Beratungsteams.</li>
            <li>Umsetzung von Change-Management-Maßnahmen mit messbaren Effizienz- und Umsatzsteigerungen.</li>
          </ul>

          <h4>A.T.U. GmbH &amp; Co. KG</h4>
          <p>Geschäftsleiter · 06/2015 – 05/2017</p>
          <ul>
            <li>Gesamtverantwortung für einen der größten Filialbetriebe mit über 36 Mitarbeitenden.</li>
            <li>Führung, Entwicklung und Motivation großer Teams.</li>
            <li>Umsetzung tiefgreifender organisatorischer und prozessualer Neuausrichtungen.</li>
            <li>Ergebnis-, Kosten- und Qualitätsverantwortung.</li>
          </ul>

          <h4>Nobilas GmbH (Akzo Nobel), Deutschlandweit</h4>
          <p>Service Manager Schadensteuerung &amp; Partnernetzwerke · 12/2006 – 04/2008</p>
          <ul>
            <li>Zentrale Managementfunktion im Versicherungsumfeld mit Fokus auf Schadensteuerung, Partnernetzwerke und Führung großer Organisationseinheiten.</li>
            <li>Verantwortung für die operative und strategische Steuerung eines bundesweiten Werkstattnetzwerks.</li>
            <li>Partner namhafter Versicherungskonzerne im Bereich Schadenmanagement.</li>
            <li>Steuerung komplexer End-to-End-Schadenprozesse zwischen Versicherern, Werkstätten und Dienstleistern.</li>
            <li>Führungsverantwortung für über 50 Mitarbeitende in operativen und koordinierenden Funktionen.</li>
            <li>Entwicklung und Umsetzung von Partner-, Qualitäts- und Steuerungskonzepten.</li>
            <li>Moderation anspruchsvoller Stakeholder-Strukturen auf Management- und operativer Ebene.</li>
          </ul>

          <h3>Weitere berufliche Stationen (Auswahl)</h3>
          <ul>
            <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
            <li>Operations / Innovation Manager – GIMS UG</li>
            <li>Senior Berater – IFL Consulting Group</li>
            <li>Management- und Business-Development-Funktionen – AkzoNobel (Nobilas GmbH)</li>
            <li>Marketing Manager – Porsche Racing Team Kadach</li>
            <li>Inhaber / Geschäftsführer – eigene Unternehmen</li>
          </ul>

          <h3>Ausbildung</h3>
          <ul>
            <li>Karosserie- und Fahrzeugbauer-Meister (DQR 6 – Bachelor-Niveau)</li>
            <li>Handwerkskammer Hannover</li>
          </ul>

          <h3>Kenntnisse</h3>
          <p><strong>Sprachen:</strong> Deutsch (C1 / Muttersprache), Englisch (verhandlungssicher)</p>
          <p><strong>IT &amp; Tools:</strong> Jira, Confluence, Miro, MS Office, agile Projekttools, Prozessmodellierung</p>
        </div>
      </section>
    </CvAuthGate>
  )
}
