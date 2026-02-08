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
    if (typeof document === 'undefined') return
    document.body.classList.add('cv-route')
    return () => document.body.classList.remove('cv-route')
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const style = document.createElement('style')
    style.setAttribute('data-cv-print', 'true')
    style.textContent = `
      @media print {
        @page { size: 210mm 297mm !important; margin: 16mm 18mm 18mm 18mm !important; }
        html, body { width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 0 !important; }
        body.cv-route, body.cv-route * { background: #ffffff !important; box-shadow: none !important; }
      }
    `
    document.head.appendChild(style)
    return () => {
      style.remove()
    }
  }, [])

  useEffect(() => {
    function handleAfterPrint() {
      setPrintMode('cv')
      const existing = document.querySelector('[data-cv-portrait]')
      if (existing) existing.remove()
      document.documentElement.style.removeProperty('width')
      document.documentElement.style.removeProperty('height')
      document.body.style.removeProperty('width')
      document.body.style.removeProperty('height')
    }
    window.addEventListener('afterprint', handleAfterPrint)
    return () => window.removeEventListener('afterprint', handleAfterPrint)
  }, [])

  function ensurePortraitPrint() {
    const existing = document.querySelector('[data-cv-portrait]')
    if (existing) existing.remove()
    const style = document.createElement('style')
    style.setAttribute('data-cv-portrait', 'true')
    style.textContent = `
      @media print {
        @page { size: 210mm 297mm !important; margin: 16mm 18mm 18mm 18mm !important; }
        html, body { width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 0 !important; }
      }
    `
    document.head.appendChild(style)
    document.documentElement.style.setProperty('width', '210mm', 'important')
    document.documentElement.style.setProperty('height', '297mm', 'important')
    document.body.style.setProperty('width', '210mm', 'important')
    document.body.style.setProperty('height', '297mm', 'important')
  }

  function handlePrintCv() {
    ensurePortraitPrint()
    setPrintMode('cv')
    window.setTimeout(() => {
      document.body.offsetHeight
      window.print()
    }, 250)
  }

  function handlePrintCombined() {
    ensurePortraitPrint()
    setPrintMode('combined')
    window.setTimeout(() => {
      document.body.offsetHeight
      window.print()
    }, 250)
  }

  function handlePrintCover() {
    ensurePortraitPrint()
    setPrintMode('cover')
    window.setTimeout(() => {
      document.body.offsetHeight
      window.print()
    }, 250)
  }

  return (
    <CvAuthGate>
      <style>
        {`@media print { @page { size: A4 portrait !important; } }`}
      </style>
      <section className="page cv-page cv-a4">
        <div className="cv-shell">
          <div className="cv-header">
            <Header title="CV – Ralf Mitterbauer" subtitle="Head of Product | Insurgo GmbH" subtitleColor="#65748b" />
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
              <h2>Head of Product | Insurgo GmbH</h2>
              <p>Bad Salzdetfuth (Region Hannover), Deutschland</p>
              <p>Telefon: +49 (0)151 22644067</p>
              <p>E-Mail: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Profil</strong>
                <p>
                  Erfahrener Versicherungsexperte mit langjähriger Führungserfahrung in der Versicherungs- und Dienstleistungsbranche.
                  Umfassendes Verständnis der versicherungsseitigen End-to-End-Wertschöpfung – von Underwriting, Vertrieb und
                  Brokeranbindung über Policierung und Bestandsführung bis hin zu Schadenprozessen, Partnermanagement, Prüfung, Freigabe,
                  Abrechnung, Qualitätssicherung sowie der Entwicklung und Nutzung digitaler Plattform- und Kernsysteme.
                </p>
                <p>
                  Langjährige Verantwortung für die strategische Ausrichtung, Priorisierung und Umsetzung komplexer Software- und
                  Plattformprodukte. Verbindet unternehmerisches Denken mit tiefem technischem Verständnis, strukturierter Arbeitsweise
                  und ausgeprägter Hands-on-Mentalität. Gewohnt, Verantwortung zu übernehmen, Entscheidungen nachvollziehbar zu treffen
                  und Teams sicher durch komplexe Veränderungsvorhaben zu führen.
                </p>
              </div>
            </Card>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Profil</h3>
              <p>
                Erfahrener Versicherungsexperte mit langjähriger Führungserfahrung in der Versicherungs- und Dienstleistungsbranche.
                Umfassendes Verständnis der versicherungsseitigen End-to-End-Wertschöpfung – von Underwriting, Vertrieb und Brokeranbindung
                über Policierung und Bestandsführung bis hin zu Schadenprozessen, Partnermanagement, Prüfung, Freigabe, Abrechnung,
                Qualitätssicherung sowie der Entwicklung und Nutzung digitaler Plattform- und Kernsysteme.
              </p>
              <p>
                Langjährige Verantwortung für die strategische Ausrichtung, Priorisierung und Umsetzung komplexer Software- und
                Plattformprodukte. Verbindet unternehmerisches Denken mit tiefem technischem Verständnis, strukturierter Arbeitsweise und
                ausgeprägter Hands-on-Mentalität. Gewohnt, Verantwortung zu übernehmen, Entscheidungen nachvollziehbar zu treffen und Teams
                sicher durch komplexe Veränderungsvorhaben zu führen.
              </p>
            </Card>

            <Card className="cv-card">
              <h3>Schwerpunkte &amp; Kompetenzen</h3>
              <ul>
                <li>Gesamtverantwortung für Produktstrategie, Vision und Roadmaps</li>
                <li>Digitale Versicherungsplattformen und versicherungsseitige Kernprozesse</li>
                <li>Führung und Weiterentwicklung interdisziplinärer Produkt- und Entwicklungsteams</li>
                <li>Übersetzung fachlicher Anforderungen in belastbare technische Produktkonzepte</li>
                <li>Priorisierung, Entscheidungsfindung und verlässliche Execution</li>
                <li>Strukturierte Produktsteuerung und nachvollziehbare Entscheidungslogiken</li>
                <li>Umsetzung komplexer Software- und Plattformprojekte</li>
                <li>Startup-Erfahrung und unternehmerische Denkweise</li>
              </ul>
            </Card>
          </div>

          <div className="cv-section">
            <h3>Beruflicher Werdegang</h3>
            <div className="cv-timeline">
              <div>
                <strong>Insurfox GmbH</strong>
                <span>Senior Product Owner | Platform Strategy &amp; Insurance Processes · seit 11/2025</span>
                <ul>
                  <li>Steuerung der Produktstrategie und Roadmap entlang klar definierter Unternehmensziele.</li>
                  <li>Ganzheitlicher Blick auf alle versicherungsrelevanten Prozesse, Systeme und beteiligten Einheiten.</li>
                  <li>Übersetzung komplexer fachlicher Anforderungen in klare, umsetzbare technische Produktanforderungen.</li>
                  <li>Enge Zusammenarbeit mit Entwicklung, Business, Kunden und externen Partnern.</li>
                  <li>Strukturierte Priorisierung von Anforderungen und Initiativen.</li>
                  <li>Fundierte Produktentscheidungen auf Basis operativer Nutzungserfahrungen, Marktverständnis und fachlicher Expertise.</li>
                  <li>Sicherstellung einer nachvollziehbaren, stabilen und zielgerichteten Produktentwicklung.</li>
                </ul>
              </div>
              <div>
                <strong>RLE Nova GmbH</strong>
                <span>Produktmanager / Product Owner · 01/2022 – 10/2025</span>
                <ul>
                  <li>Verantwortung für mehrere digitale Produkte und Plattformlösungen.</li>
                  <li>Konzeption von Produktlogiken, User Flows und funktionalen Anforderungen.</li>
                  <li>Umsetzung komplexer Softwareprojekte von der Idee bis zum Produktivbetrieb.</li>
                  <li>Zusammenarbeit mit Design, Entwicklung und Business auf Augenhöhe.</li>
                  <li>Strukturierte Dokumentation und transparente Entscheidungsgrundlagen.</li>
                </ul>
              </div>
              <div>
                <strong>RLE INTERNATIONAL GmbH &amp; Co. KG</strong>
                <span>Senior Berater / Projektleiter · 05/2017 – 12/2021</span>
                <ul>
                  <li>Steuerung komplexer Transformations- und Optimierungsprojekte.</li>
                  <li>Ganzheitlicher Blick auf Organisation, Prozesse, IT und Wirtschaftlichkeit.</li>
                  <li>Führung interdisziplinärer Projektteams.</li>
                  <li>Verantwortung für Ergebnis, Qualität und Umsetzung.</li>
                </ul>
              </div>
              <div>
                <strong>Nobilas GmbH (Akzo Nobel)</strong>
                <span>Service Manager – Schadensteuerung und Partnernetzwerke · 12/2006 – 04/2008</span>
                <ul>
                  <li>Verantwortung für Schadensteuerung und Partnernetzwerke im Versicherungsumfeld.</li>
                  <li>Zusammenarbeit mit namhaften Versicherungskonzernen.</li>
                  <li>Führung von über 50 Mitarbeitenden.</li>
                  <li>Steuerung komplexer End-to-End-Prozesse über mehrere Organisationseinheiten hinweg.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="cv-section">
            <h3>Weitere Führungsstationen (Auswahl)</h3>
            <ul>
              <li>Geschäftsleiter – A.T.U. GmbH &amp; Co. KG</li>
              <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
              <li>Operations / Innovation Manager – GIMS UG</li>
              <li>Inhaber / Geschäftsführer – eigene Unternehmen</li>
            </ul>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Ausbildung</h3>
              <ul>
                <li>Karosserie- und Fahrzeugbauer-Meister (DQR 6 – Bachelor-Niveau)</li>
                <li>Handwerkskammer Hannover</li>
              </ul>
            </Card>
            <Card className="cv-card">
              <h3>Sprachen &amp; Tools</h3>
              <p><strong>Sprachen:</strong> Deutsch (Muttersprache), Englisch (verhandlungssicher)</p>
              <p><strong>Tools &amp; Methoden:</strong> Jira, Confluence, Miro, Prototyping-Tools, MS Office, agile und hybride Produktmethoden</p>
            </Card>
          </div>
        </div>

        <div className="cv-print">
          <div className="cv-print-header">
            <div>
              <h1>CV – Ralf Mitterbauer</h1>
              <h2>Head of Product | Insurgo GmbH</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover), Deutschland</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <h3>Profil</h3>
          <p>
            Erfahrener Versicherungsexperte mit langjähriger Führungserfahrung in der Versicherungs- und Dienstleistungsbranche. Umfassendes
            Verständnis der versicherungsseitigen End-to-End-Wertschöpfung – von Underwriting, Vertrieb und Brokeranbindung über Policierung
            und Bestandsführung bis hin zu Schadenprozessen, Partnermanagement, Prüfung, Freigabe, Abrechnung, Qualitätssicherung sowie der
            Entwicklung und Nutzung digitaler Plattform- und Kernsysteme.
          </p>
          <p>
            Langjährige Verantwortung für die strategische Ausrichtung, Priorisierung und Umsetzung komplexer Software- und Plattformprodukte.
            Verbindet unternehmerisches Denken mit tiefem technischem Verständnis, strukturierter Arbeitsweise und ausgeprägter
            Hands-on-Mentalität. Gewohnt, Verantwortung zu übernehmen, Entscheidungen nachvollziehbar zu treffen und Teams sicher durch
            komplexe Veränderungsvorhaben zu führen.
          </p>

          <h3>Schwerpunkte &amp; Kompetenzen</h3>
          <ul>
            <li>Gesamtverantwortung für Produktstrategie, Vision und Roadmaps</li>
            <li>Digitale Versicherungsplattformen und versicherungsseitige Kernprozesse</li>
            <li>Führung und Weiterentwicklung interdisziplinärer Produkt- und Entwicklungsteams</li>
            <li>Übersetzung fachlicher Anforderungen in belastbare technische Produktkonzepte</li>
            <li>Priorisierung, Entscheidungsfindung und verlässliche Execution</li>
            <li>Strukturierte Produktsteuerung und nachvollziehbare Entscheidungslogiken</li>
            <li>Umsetzung komplexer Software- und Plattformprojekte</li>
            <li>Startup-Erfahrung und unternehmerische Denkweise</li>
          </ul>

          <h3>Beruflicher Werdegang</h3>
          <h4>Insurfox GmbH</h4>
          <p>Senior Product Owner | Platform Strategy &amp; Insurance Processes · seit 11/2025</p>
          <ul>
            <li>Steuerung der Produktstrategie und Roadmap entlang klar definierter Unternehmensziele.</li>
            <li>Ganzheitlicher Blick auf alle versicherungsrelevanten Prozesse, Systeme und beteiligten Einheiten.</li>
            <li>Übersetzung komplexer fachlicher Anforderungen in klare, umsetzbare technische Produktanforderungen.</li>
            <li>Enge Zusammenarbeit mit Entwicklung, Business, Kunden und externen Partnern.</li>
            <li>Strukturierte Priorisierung von Anforderungen und Initiativen.</li>
            <li>Fundierte Produktentscheidungen auf Basis operativer Nutzungserfahrungen, Marktverständnis und fachlicher Expertise.</li>
            <li>Sicherstellung einer nachvollziehbaren, stabilen und zielgerichteten Produktentwicklung.</li>
          </ul>

          <h4>RLE Nova GmbH</h4>
          <p>Produktmanager / Product Owner · 01/2022 – 10/2025</p>
          <ul>
            <li>Verantwortung für mehrere digitale Produkte und Plattformlösungen.</li>
            <li>Konzeption von Produktlogiken, User Flows und funktionalen Anforderungen.</li>
            <li>Umsetzung komplexer Softwareprojekte von der Idee bis zum Produktivbetrieb.</li>
            <li>Zusammenarbeit mit Design, Entwicklung und Business auf Augenhöhe.</li>
            <li>Strukturierte Dokumentation und transparente Entscheidungsgrundlagen.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH &amp; Co. KG</h4>
          <p>Senior Berater / Projektleiter · 05/2017 – 12/2021</p>
          <ul>
            <li>Steuerung komplexer Transformations- und Optimierungsprojekte.</li>
            <li>Ganzheitlicher Blick auf Organisation, Prozesse, IT und Wirtschaftlichkeit.</li>
            <li>Führung interdisziplinärer Projektteams.</li>
            <li>Verantwortung für Ergebnis, Qualität und Umsetzung.</li>
          </ul>

          <h4>Nobilas GmbH (Akzo Nobel)</h4>
          <p>Service Manager – Schadensteuerung und Partnernetzwerke · 12/2006 – 04/2008</p>
          <ul>
            <li>Verantwortung für Schadensteuerung und Partnernetzwerke im Versicherungsumfeld.</li>
            <li>Zusammenarbeit mit namhaften Versicherungskonzernen.</li>
            <li>Führung von über 50 Mitarbeitenden.</li>
            <li>Steuerung komplexer End-to-End-Prozesse über mehrere Organisationseinheiten hinweg.</li>
          </ul>

          <h3>Weitere Führungsstationen (Auswahl)</h3>
          <ul>
            <li>Geschäftsleiter – A.T.U. GmbH &amp; Co. KG</li>
            <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
            <li>Operations / Innovation Manager – GIMS UG</li>
            <li>Inhaber / Geschäftsführer – eigene Unternehmen</li>
          </ul>

          <h3>Ausbildung</h3>
          <ul>
            <li>Karosserie- und Fahrzeugbauer-Meister (DQR 6 – Bachelor-Niveau)</li>
            <li>Handwerkskammer Hannover</li>
          </ul>

          <h3>Sprachen &amp; Tools</h3>
          <p><strong>Deutsch</strong> (Muttersprache)</p>
          <p><strong>Englisch</strong> (verhandlungssicher)</p>
          <p>Jira, Confluence, Miro, Prototyping-Tools, MS Office, agile und hybride Produktmethoden</p>
        </div>

        <div className="cv-print cv-print-combined">
          <div className="cv-print-header">
            <div>
              <h1>Anschreiben – Ralf Mitterbauer</h1>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover), Deutschland</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <div className="cv-letter-space cv-letter-space-3" />
          <h3 className="cv-letter-heading">Statement of Interest – Head of Product</h3>
          <div className="cv-letter-space cv-letter-space-2" />
          <p>Sehr geehrte Damen und Herren,</p>
          <p>
            die Position Head of Product bei der Insurgo GmbH spricht mich sehr an, da sie die Verantwortung für Produktstrategie,
            operative Umsetzung und tiefes Versicherungsverständnis in einer Weise verbindet, die meiner bisherigen Laufbahn entspricht.
          </p>
          <p>
            In meiner aktuellen Rolle verantworte ich die strategische und operative Weiterentwicklung einer zentralen
            Versicherungsplattform. Ich steuere Produktstrategie und Roadmap, übersetze komplexe fachliche Anforderungen in belastbare
            technische Produktkonzepte und arbeite eng mit Entwicklung, Business, Kunden und Partnern zusammen. Dabei lege ich
            besonderen Wert auf Struktur, Nachvollziehbarkeit und eine verlässliche Umsetzung.
          </p>
          <p>
            Meine mehr als 25-jährige Führungs- und Managementerfahrung im Versicherungsumfeld ermöglicht mir einen ganzheitlichen Blick
            auf die gesamte versicherungsseitige Wertschöpfung – von Underwriting, Vertrieb und Brokeranbindung über Policierung und
            Bestandsführung bis hin zu Schadenprozessen, Abrechnung, Qualitätssicherung sowie digitalen Kern- und Plattformlösungen.
            Ergänzt wird dies durch ein tiefes technisches Verständnis und umfangreiche Erfahrung in der erfolgreichen Umsetzung
            komplexer Software- und Plattformprojekte, auch in startup-nahen Strukturen.
          </p>
          <p>
            Neben der fachlichen Motivation ist mir auch der persönliche Rahmen wichtig. Ich bin 55 Jahre alt, Vater von zwei Kindern und
            seit vielen Jahren beruflich wie privat klar verankert. Mein Lebensmittelpunkt ist Bad Salzdetfuth bei Hannover, wo ich auch
            Eigentum besitze.
          </p>
          <p>
            Für die Rolle bei Insurgo ist mir eine ausgewogene Balance zwischen Remote-Arbeit und erforderlichen Präsenzzeiten vor Ort
            wichtig. Gerade in der Anfangsphase halte ich eine erhöhte Präsenz in Berlin für notwendig, um Strukturen aufzubauen,
            Abstimmungen zu festigen und die Zusammenarbeit im Team wirksam zu gestalten. Dass meine Tochter als Leistungssportlerin im
            Wasserball im Sportinternat in Berlin lebt, erleichtert mir diese arbeitsbedingt notwendigen Präsenzzeiten und unterstützt
            eine verlässliche Wahrnehmung meiner Aufgaben.
          </p>
          <p>
            Gerne würde ich meine Erfahrung, meine Haltung und meine Arbeitsweise bei Insurgo einbringen und die Weiterentwicklung Ihrer
            Produkte verantwortungsvoll und nachhaltig mitgestalten. Über ein persönliches Gespräch freue ich mich sehr.
          </p>
          <p>Mit freundlichen Grüßen</p>
          <p>Ralf Mitterbauer</p>

          <div className="print-page-break" />

          <div className="cv-print-header">
            <div>
              <h1>CV – Ralf Mitterbauer</h1>
              <h2>Head of Product | Insurgo GmbH</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover), Deutschland</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <h3>Profil</h3>
          <p>
            Erfahrener Versicherungsexperte mit langjähriger Führungserfahrung in der Versicherungs- und Dienstleistungsbranche. Umfassendes
            Verständnis der versicherungsseitigen End-to-End-Wertschöpfung – von Underwriting, Vertrieb und Brokeranbindung über Policierung
            und Bestandsführung bis hin zu Schadenprozessen, Partnermanagement, Prüfung, Freigabe, Abrechnung, Qualitätssicherung sowie der
            Entwicklung und Nutzung digitaler Plattform- und Kernsysteme.
          </p>
          <p>
            Langjährige Verantwortung für die strategische Ausrichtung, Priorisierung und Umsetzung komplexer Software- und Plattformprodukte.
            Verbindet unternehmerisches Denken mit tiefem technischem Verständnis, strukturierter Arbeitsweise und ausgeprägter
            Hands-on-Mentalität. Gewohnt, Verantwortung zu übernehmen, Entscheidungen nachvollziehbar zu treffen und Teams sicher durch
            komplexe Veränderungsvorhaben zu führen.
          </p>

          <h3>Schwerpunkte &amp; Kompetenzen</h3>
          <ul>
            <li>Gesamtverantwortung für Produktstrategie, Vision und Roadmaps</li>
            <li>Digitale Versicherungsplattformen und versicherungsseitige Kernprozesse</li>
            <li>Führung und Weiterentwicklung interdisziplinärer Produkt- und Entwicklungsteams</li>
            <li>Übersetzung fachlicher Anforderungen in belastbare technische Produktkonzepte</li>
            <li>Priorisierung, Entscheidungsfindung und verlässliche Execution</li>
            <li>Strukturierte Produktsteuerung und nachvollziehbare Entscheidungslogiken</li>
            <li>Umsetzung komplexer Software- und Plattformprojekte</li>
            <li>Startup-Erfahrung und unternehmerische Denkweise</li>
          </ul>

          <h3>Beruflicher Werdegang</h3>
          <h4>Insurfox GmbH</h4>
          <p>Senior Product Owner | Platform Strategy &amp; Insurance Processes · seit 11/2025</p>
          <ul>
            <li>Steuerung der Produktstrategie und Roadmap entlang klar definierter Unternehmensziele.</li>
            <li>Ganzheitlicher Blick auf alle versicherungsrelevanten Prozesse, Systeme und beteiligten Einheiten.</li>
            <li>Übersetzung komplexer fachlicher Anforderungen in klare, umsetzbare technische Produktanforderungen.</li>
            <li>Enge Zusammenarbeit mit Entwicklung, Business, Kunden und externen Partnern.</li>
            <li>Strukturierte Priorisierung von Anforderungen und Initiativen.</li>
            <li>Fundierte Produktentscheidungen auf Basis operativer Nutzungserfahrungen, Marktverständnis und fachlicher Expertise.</li>
            <li>Sicherstellung einer nachvollziehbaren, stabilen und zielgerichteten Produktentwicklung.</li>
          </ul>

          <h4>RLE Nova GmbH</h4>
          <p>Produktmanager / Product Owner · 01/2022 – 10/2025</p>
          <ul>
            <li>Verantwortung für mehrere digitale Produkte und Plattformlösungen.</li>
            <li>Konzeption von Produktlogiken, User Flows und funktionalen Anforderungen.</li>
            <li>Umsetzung komplexer Softwareprojekte von der Idee bis zum Produktivbetrieb.</li>
            <li>Zusammenarbeit mit Design, Entwicklung und Business auf Augenhöhe.</li>
            <li>Strukturierte Dokumentation und transparente Entscheidungsgrundlagen.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH &amp; Co. KG</h4>
          <p>Senior Berater / Projektleiter · 05/2017 – 12/2021</p>
          <ul>
            <li>Steuerung komplexer Transformations- und Optimierungsprojekte.</li>
            <li>Ganzheitlicher Blick auf Organisation, Prozesse, IT und Wirtschaftlichkeit.</li>
            <li>Führung interdisziplinärer Projektteams.</li>
            <li>Verantwortung für Ergebnis, Qualität und Umsetzung.</li>
          </ul>

          <h4>Nobilas GmbH (Akzo Nobel)</h4>
          <p>Service Manager – Schadensteuerung und Partnernetzwerke · 12/2006 – 04/2008</p>
          <ul>
            <li>Verantwortung für Schadensteuerung und Partnernetzwerke im Versicherungsumfeld.</li>
            <li>Zusammenarbeit mit namhaften Versicherungskonzernen.</li>
            <li>Führung von über 50 Mitarbeitenden.</li>
            <li>Steuerung komplexer End-to-End-Prozesse über mehrere Organisationseinheiten hinweg.</li>
          </ul>

          <h3>Weitere Führungsstationen (Auswahl)</h3>
          <ul>
            <li>Geschäftsleiter – A.T.U. GmbH &amp; Co. KG</li>
            <li>Service Manager – AH Lier GmbH &amp; Co. KG</li>
            <li>Operations / Innovation Manager – GIMS UG</li>
            <li>Inhaber / Geschäftsführer – eigene Unternehmen</li>
          </ul>

          <h3>Ausbildung</h3>
          <ul>
            <li>Karosserie- und Fahrzeugbauer-Meister (DQR 6 – Bachelor-Niveau)</li>
            <li>Handwerkskammer Hannover</li>
          </ul>

          <h3>Sprachen &amp; Tools</h3>
          <p><strong>Deutsch</strong> (Muttersprache)</p>
          <p><strong>Englisch</strong> (verhandlungssicher)</p>
          <p>Jira, Confluence, Miro, Prototyping-Tools, MS Office, agile und hybride Produktmethoden</p>
        </div>

        <div className="cv-print cv-print-cover">
          <div className="cv-print-header">
            <div>
              <h1>Anschreiben – Ralf Mitterbauer</h1>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover), Deutschland</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <div className="cv-letter-space cv-letter-space-3" />
          <h3 className="cv-letter-heading">Statement of Interest – Head of Product</h3>
          <div className="cv-letter-space cv-letter-space-2" />
          <p>Sehr geehrte Damen und Herren,</p>
          <p>
            die Position Head of Product bei der Insurgo GmbH spricht mich sehr an, da sie die Verantwortung für Produktstrategie,
            operative Umsetzung und tiefes Versicherungsverständnis in einer Weise verbindet, die meiner bisherigen Laufbahn entspricht.
          </p>
          <p>
            In meiner aktuellen Rolle verantworte ich die strategische und operative Weiterentwicklung einer zentralen
            Versicherungsplattform. Ich steuere Produktstrategie und Roadmap, übersetze komplexe fachliche Anforderungen in belastbare
            technische Produktkonzepte und arbeite eng mit Entwicklung, Business, Kunden und Partnern zusammen. Dabei lege ich
            besonderen Wert auf Struktur, Nachvollziehbarkeit und eine verlässliche Umsetzung.
          </p>
          <p>
            Meine mehr als 25-jährige Führungs- und Managementerfahrung im Versicherungsumfeld ermöglicht mir einen ganzheitlichen Blick
            auf die gesamte versicherungsseitige Wertschöpfung – von Underwriting, Vertrieb und Brokeranbindung über Policierung und
            Bestandsführung bis hin zu Schadenprozessen, Abrechnung, Qualitätssicherung sowie digitalen Kern- und Plattformlösungen.
            Ergänzt wird dies durch ein tiefes technisches Verständnis und umfangreiche Erfahrung in der erfolgreichen Umsetzung
            komplexer Software- und Plattformprojekte, auch in startup-nahen Strukturen.
          </p>
          <p>
            Neben der fachlichen Motivation ist mir auch der persönliche Rahmen wichtig. Ich bin 55 Jahre alt, Vater von zwei Kindern und
            seit vielen Jahren beruflich wie privat klar verankert. Mein Lebensmittelpunkt ist Bad Salzdetfuth bei Hannover, wo ich auch
            Eigentum besitze.
          </p>
          <p>
            Für die Rolle bei Insurgo ist mir eine ausgewogene Balance zwischen Remote-Arbeit und erforderlichen Präsenzzeiten vor Ort
            wichtig. Gerade in der Anfangsphase halte ich eine erhöhte Präsenz in Berlin für notwendig, um Strukturen aufzubauen,
            Abstimmungen zu festigen und die Zusammenarbeit im Team wirksam zu gestalten. Dass meine Tochter als Leistungssportlerin im
            Wasserball im Sportinternat in Berlin lebt, erleichtert mir diese arbeitsbedingt notwendigen Präsenzzeiten und unterstützt
            eine verlässliche Wahrnehmung meiner Aufgaben.
          </p>
          <p>
            Gerne würde ich meine Erfahrung, meine Haltung und meine Arbeitsweise bei Insurgo einbringen und die Weiterentwicklung Ihrer
            Produkte verantwortungsvoll und nachhaltig mitgestalten. Über ein persönliches Gespräch freue ich mich sehr.
          </p>
          <p>Mit freundlichen Grüßen</p>
          <p>Ralf Mitterbauer</p>
        </div>
      </section>
    </CvAuthGate>
  )
}
