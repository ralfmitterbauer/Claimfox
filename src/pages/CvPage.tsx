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
            <Header title="LEBENSLAUF" subtitle="Ralf Mitterbauer" subtitleColor="#65748b" />
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
              <h2>Director Product &amp; Operations | Product Leadership &amp; Execution</h2>
              <p>Bad Salzdetfuth (Region Hannover)</p>
              <p>Bereit für hybrides Arbeiten in Bremen</p>
              <p>Telefon: +49 (0)151 22644067</p>
              <p>E-Mail: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
              <p>Remote (Germany)</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Profil</strong>
                <p>
                  Erfahrener Product- und Operations-Leader mit klarer Verantwortung für Outcome, Fokus und verlässliche Execution in
                  technologiegetriebenen Organisationen. Langjährige Erfahrung darin, strategische Ziele (OKRs) in klare Prioritäten,
                  wirksame Initiativen und messbare Ergebnisse zu übersetzen – auch unter hoher Komplexität und Zeitdruck.
                </p>
                <p>
                  Stark in der Führung interdisziplinärer Teams, im Aufbau klarer Entscheidungs- und Priorisierungslogiken sowie in der
                  End-to-End-Verantwortung für Customer Journeys, Delivery und operative Wirksamkeit. Ruhig, entscheidungsstark und
                  konsequent in der Umsetzung – mit hohem Anspruch an Klarheit, Ownership und Wirkung.
                </p>
              </div>
            </Card>
          </div>

          <div className="cv-grid">
            <Card className="cv-card">
              <h3>Profil</h3>
              <p>
                Erfahrener Product- und Operations-Leader mit klarer Verantwortung für Outcome, Fokus und verlässliche Execution in
                technologiegetriebenen Organisationen.
              </p>
              <p>
                Langjährige Erfahrung darin, strategische Ziele (OKRs) in klare Prioritäten, wirksame Initiativen und messbare Ergebnisse zu
                übersetzen – auch unter hoher Komplexität und Zeitdruck.
              </p>
              <p>
                Stark in der Führung interdisziplinärer Teams, im Aufbau klarer Entscheidungs- und Priorisierungslogiken sowie in der
                End-to-End-Verantwortung für Customer Journeys, Delivery und operative Wirksamkeit.
              </p>
            </Card>

            <Card className="cv-card">
              <h3>Kernkompetenzen</h3>
              <ul>
                <li>Product &amp; Operations Leadership</li>
                <li>Verantwortung für Outcome, KPIs &amp; Delivery</li>
                <li>OKR-basierte Zielsteuerung &amp; Priorisierung</li>
                <li>Aufbau stabiler Produkt- &amp; Execution-Systeme</li>
                <li>Customer Journey Ownership (SaaS / Plattform / SMB)</li>
                <li>Fokusdisziplin, Scope-Shaping &amp; Entscheidungsfindung</li>
                <li>Führung interdisziplinärer Teams (Product, Tech, Ops)</li>
                <li>Enge Zusammenarbeit mit Geschäftsführung &amp; Stakeholdern</li>
                <li>Change, Skalierung &amp; Organisationsentwicklung</li>
              </ul>
            </Card>
          </div>

          <div className="cv-section">
            <h3>Beruflicher Werdegang</h3>
            <div className="cv-timeline">
              <div>
                <strong>Insurfox GmbH</strong>
                <span>Product Lead / Product Owner – Plattform &amp; Operations-nahe Prozesse · seit 11/2025</span>
                <ul>
                  <li>Gesamtverantwortung für den Produkterfolg einer zentralen, geschäftskritischen Plattform mit hoher operativer Relevanz.</li>
                  <li>Verantwortung für Produktvision, Roadmap und Prioritäten mit klarem Fokus auf messbare Outcomes.</li>
                  <li>Übersetzung strategischer Ziele in konkrete Initiativen, sauberes Scope-Shaping und stabile Execution.</li>
                  <li>Sicherstellung einer ruhigen, vorhersehbaren Delivery über Produkt, Entwicklung und angrenzende operative Bereiche hinweg.</li>
                  <li>Enge Zusammenarbeit mit Geschäftsführung, Fachbereichen und externen Partnern.</li>
                  <li>Etablierung klarer Regeln für Priorisierung, Entscheidungsfindung sowie Start/Stop von Initiativen.</li>
                  <li>Stärkung von Ownership, Verantwortung und Entscheidungsfähigkeit im Team.</li>
                </ul>
              </div>
              <div>
                <strong>RLE Nova GmbH</strong>
                <span>Produktmanager / Product Lead · 01/2022 – 10/2025</span>
                <ul>
                  <li>Verantwortung für digitale Produkte und Angebotslogiken von der Idee bis zum Marktbetrieb.</li>
                  <li>Aufbau klarer Produktstrukturen, Prioritäten und Entscheidungswege.</li>
                  <li>Führung und Koordination interdisziplinärer Teams (Tech, Business, externe Partner).</li>
                  <li>Fokus auf Wirkung, Kundennutzen und nachhaltige Delivery statt Feature-Output.</li>
                </ul>
              </div>
              <div>
                <strong>RLE INTERNATIONAL GmbH &amp; Co. KG</strong>
                <span>Senior Berater / Projektleiter · 05/2017 – 12/2021</span>
                <ul>
                  <li>Verantwortung für komplexe Transformations- und Optimierungsprogramme.</li>
                  <li>Steuerung mehrerer paralleler Initiativen mit klarer Ergebnisverantwortung.</li>
                  <li>Moderation anspruchsvoller Stakeholder-Situationen auf Management-Ebene.</li>
                  <li>Nachweisliche Verbesserung von Effizienz, Qualität und wirtschaftlichem Ergebnis.</li>
                </ul>
              </div>
              <div>
                <strong>A.T.U. GmbH &amp; Co. KG</strong>
                <span>Geschäftsleiter · 06/2015 – 05/2017</span>
                <ul>
                  <li>Gesamtverantwortung für einen großen Standort mit über 36 Mitarbeitenden.</li>
                  <li>Führung, Zielsteuerung und operative Exzellenz.</li>
                  <li>Klare Entscheidungen auch unter Unsicherheit und Zeitdruck.</li>
                  <li>Verantwortung für Ergebnis, Qualität, Prozesse und Teamleistung.</li>
                </ul>
              </div>
              <div>
                <strong>Nobilas GmbH (Akzo Nobel)</strong>
                <span>Service Manager – Schadensteuerung &amp; Partnernetzwerke · 12/2006 – 04/2008</span>
                <ul>
                  <li>Verantwortung für ein bundesweites Partner- und Werkstattnetzwerk.</li>
                  <li>Zentrale Schnittstelle zu namhaften Versicherungskonzernen.</li>
                  <li>Führung von über 50 Mitarbeitenden.</li>
                  <li>Steuerung komplexer End-to-End-Prozesse mit hoher operativer Wirkung.</li>
                </ul>
              </div>
            </div>
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
              <p><strong>Tools &amp; Methoden:</strong> OKRs, Jira, Confluence, Miro, MS Office, agile &amp; hybride Delivery-Modelle</p>
            </Card>
          </div>
        </div>

        <div className="cv-print">
          <div className="cv-print-header">
            <div>
              <h1>Ralf Mitterbauer</h1>
              <h2>Director Product &amp; Operations | Product Leadership &amp; Execution</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover)</p>
            <p>Bereit für hybrides Arbeiten in Bremen</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            <p>Remote (Germany)</p>
          </div>

          <h3>Profil</h3>
          <p>
            Erfahrener Product- und Operations-Leader mit klarer Verantwortung für Outcome, Fokus und verlässliche Execution in
            technologiegetriebenen Organisationen. Langjährige Erfahrung darin, strategische Ziele (OKRs) in klare Prioritäten, wirksame
            Initiativen und messbare Ergebnisse zu übersetzen – auch unter hoher Komplexität und Zeitdruck.
          </p>
          <p>
            Stark in der Führung interdisziplinärer Teams, im Aufbau klarer Entscheidungs- und Priorisierungslogiken sowie in der
            End-to-End-Verantwortung für Customer Journeys, Delivery und operative Wirksamkeit. Ruhig, entscheidungsstark und konsequent
            in der Umsetzung – mit hohem Anspruch an Klarheit, Ownership und Wirkung.
          </p>

          <h3>Kernkompetenzen</h3>
          <ul>
            <li>Product &amp; Operations Leadership</li>
            <li>Verantwortung für Outcome, KPIs &amp; Delivery</li>
            <li>OKR-basierte Zielsteuerung &amp; Priorisierung</li>
            <li>Aufbau stabiler Produkt- &amp; Execution-Systeme</li>
            <li>Customer Journey Ownership (SaaS / Plattform / SMB)</li>
            <li>Fokusdisziplin, Scope-Shaping &amp; Entscheidungsfindung</li>
            <li>Führung interdisziplinärer Teams (Product, Tech, Ops)</li>
            <li>Enge Zusammenarbeit mit Geschäftsführung &amp; Stakeholdern</li>
            <li>Change, Skalierung &amp; Organisationsentwicklung</li>
          </ul>

          <h3>Beruflicher Werdegang</h3>
          <h4>Insurfox GmbH</h4>
          <p>Product Lead / Product Owner – Plattform &amp; Operations-nahe Prozesse · seit 11/2025</p>
          <ul>
            <li>Gesamtverantwortung für den Produkterfolg einer zentralen, geschäftskritischen Plattform mit hoher operativer Relevanz.</li>
            <li>Verantwortung für Produktvision, Roadmap und Prioritäten mit klarem Fokus auf messbare Outcomes.</li>
            <li>Übersetzung strategischer Ziele in konkrete Initiativen, sauberes Scope-Shaping und stabile Execution.</li>
            <li>Sicherstellung einer ruhigen, vorhersehbaren Delivery über Produkt, Entwicklung und angrenzende operative Bereiche hinweg.</li>
            <li>Enge Zusammenarbeit mit Geschäftsführung, Fachbereichen und externen Partnern.</li>
            <li>Etablierung klarer Regeln für Priorisierung, Entscheidungsfindung sowie Start/Stop von Initiativen.</li>
            <li>Stärkung von Ownership, Verantwortung und Entscheidungsfähigkeit im Team.</li>
          </ul>

          <h4>RLE Nova GmbH</h4>
          <p>Produktmanager / Product Lead · 01/2022 – 10/2025</p>
          <ul>
            <li>Verantwortung für digitale Produkte und Angebotslogiken von der Idee bis zum Marktbetrieb.</li>
            <li>Aufbau klarer Produktstrukturen, Prioritäten und Entscheidungswege.</li>
            <li>Führung und Koordination interdisziplinärer Teams (Tech, Business, externe Partner).</li>
            <li>Fokus auf Wirkung, Kundennutzen und nachhaltige Delivery statt Feature-Output.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH &amp; Co. KG</h4>
          <p>Senior Berater / Projektleiter · 05/2017 – 12/2021</p>
          <ul>
            <li>Verantwortung für komplexe Transformations- und Optimierungsprogramme.</li>
            <li>Steuerung mehrerer paralleler Initiativen mit klarer Ergebnisverantwortung.</li>
            <li>Moderation anspruchsvoller Stakeholder-Situationen auf Management-Ebene.</li>
            <li>Nachweisliche Verbesserung von Effizienz, Qualität und wirtschaftlichem Ergebnis.</li>
          </ul>

          <h4>A.T.U. GmbH &amp; Co. KG</h4>
          <p>Geschäftsleiter · 06/2015 – 05/2017</p>
          <ul>
            <li>Gesamtverantwortung für einen großen Standort mit über 36 Mitarbeitenden.</li>
            <li>Führung, Zielsteuerung und operative Exzellenz.</li>
            <li>Klare Entscheidungen auch unter Unsicherheit und Zeitdruck.</li>
            <li>Verantwortung für Ergebnis, Qualität, Prozesse und Teamleistung.</li>
          </ul>

          <h4>Nobilas GmbH (Akzo Nobel)</h4>
          <p>Service Manager – Schadensteuerung &amp; Partnernetzwerke · 12/2006 – 04/2008</p>
          <ul>
            <li>Verantwortung für ein bundesweites Partner- und Werkstattnetzwerk.</li>
            <li>Zentrale Schnittstelle zu namhaften Versicherungskonzernen.</li>
            <li>Führung von über 50 Mitarbeitenden.</li>
            <li>Steuerung komplexer End-to-End-Prozesse mit hoher operativer Wirkung.</li>
          </ul>

          <h3>Ausbildung</h3>
          <ul>
            <li>Karosserie- und Fahrzeugbauer-Meister (DQR 6 – Bachelor-Niveau)</li>
            <li>Handwerkskammer Hannover</li>
          </ul>

          <h3>Sprachen &amp; Tools</h3>
          <p><strong>Sprachen:</strong> Deutsch (Muttersprache), Englisch (verhandlungssicher)</p>
          <p><strong>Tools &amp; Methoden:</strong> OKRs, Jira, Confluence, Miro, MS Office, agile &amp; hybride Delivery-Modelle</p>
        </div>

        <div className="cv-print cv-print-combined">
          <div className="cv-print-header">
            <div>
              <h1>Statement of Interest – Director Product &amp; Operations</h1>
              <h2>Ralf Mitterbauer</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover)</p>
            <p>Bereit für hybrides Arbeiten in Bremen</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            <p>Remote (Germany)</p>
          </div>

          <div className="cv-letter-space cv-letter-space-3" />
          <h3 className="cv-letter-heading">Statement of Interest – Director Product &amp; Operations</h3>
          <div className="cv-letter-space cv-letter-space-2" />
          <p>Sehr geehrte Damen und Herren,</p>
          <p>
            die Rolle Director Product &amp; Operations bei Robin Cook spricht mich sehr an, da sie genau dort ansetzt, wo nachhaltiger
            Produkterfolg entsteht: bei klarer Verantwortung für Outcome, Fokusdisziplin und verlässlicher Execution – über Produkt,
            Operations und Customer Journey hinweg.
          </p>
          <p>
            In meinen bisherigen Rollen habe ich wiederholt die Verantwortung übernommen, strategische Ziele in klare Prioritäten,
            wirksame Initiativen und messbare Ergebnisse zu übersetzen. Dabei lag mein Fokus nie auf einzelnen Features, sondern auf dem
            Gesamterfolg des Produkts im Alltag der Kund:innen. Als Product Lead bei Insurfox verantworte ich heute den Produkterfolg
            einer zentralen, operativ hochrelevanten Plattform und sorge für ruhige, vorhersehbare Delivery auch unter hoher Komplexität.
          </p>
          <p>
            Ein wiederkehrendes Muster meiner Laufbahn ist die Führung interdisziplinärer Teams, das Etablieren klarer Entscheidungslogiken
            sowie die konsequente Ausrichtung auf Wirkung statt Aktivität. Ob in Produktrollen, in der operativen Geschäftsleitung oder in
            der Steuerung großer Partnernetzwerke – ich bin es gewohnt, Verantwortung zu übernehmen, Entscheidungen zu treffen und sie auch
            unter Unsicherheit konsequent zu vertreten.
          </p>
          <p>
            Besonders reizt mich an Robin Cook die klare Mission und die Phase, in der sich das Unternehmen befindet: Das Produkt
            funktioniert, der Markt ist da – jetzt geht es darum, Strukturen, Fokus und Execution auf das nächste Level zu heben. Genau
            hier sehe ich meine Stärke und meinen Beitrag.
          </p>
          <p>
            Ich arbeite ruhig, klar und verbindlich – auch in stressigen Phasen – und scheue keine Konflikte, wenn sie notwendig sind, um
            Qualität, Fokus und gemeinsame Ziele zu sichern. Die enge Zusammenarbeit mit der Geschäftsführung sowie die Bereitschaft,
            Verantwortung vor Ort in Bremen zu übernehmen, sehe ich als selbstverständlichen Teil dieser Rolle.
          </p>
          <p>
            Gerne würde ich meine Erfahrung und Haltung bei Robin Cook einbringen und gemeinsam den messbaren Produkterfolg
            weiterentwickeln. Über ein persönliches Gespräch freue ich mich sehr.
          </p>
          <p>Mit freundlichen Grüßen</p>
          <p>Ralf Mitterbauer</p>

          <div className="print-page-break" />

          <div className="cv-print-header">
            <div>
              <h1>Ralf Mitterbauer</h1>
              <h2>Director Product &amp; Operations | Product Leadership &amp; Execution</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover)</p>
            <p>Bereit für hybrides Arbeiten in Bremen</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            <p>Remote (Germany)</p>
          </div>

          <h3>Profil</h3>
          <p>
            Erfahrener Product- und Operations-Leader mit klarer Verantwortung für Outcome, Fokus und verlässliche Execution in
            technologiegetriebenen Organisationen. Langjährige Erfahrung darin, strategische Ziele (OKRs) in klare Prioritäten, wirksame
            Initiativen und messbare Ergebnisse zu übersetzen – auch unter hoher Komplexität und Zeitdruck.
          </p>
          <p>
            Stark in der Führung interdisziplinärer Teams, im Aufbau klarer Entscheidungs- und Priorisierungslogiken sowie in der
            End-to-End-Verantwortung für Customer Journeys, Delivery und operative Wirksamkeit. Ruhig, entscheidungsstark und konsequent
            in der Umsetzung – mit hohem Anspruch an Klarheit, Ownership und Wirkung.
          </p>

          <h3>Kernkompetenzen</h3>
          <ul>
            <li>Product &amp; Operations Leadership</li>
            <li>Verantwortung für Outcome, KPIs &amp; Delivery</li>
            <li>OKR-basierte Zielsteuerung &amp; Priorisierung</li>
            <li>Aufbau stabiler Produkt- &amp; Execution-Systeme</li>
            <li>Customer Journey Ownership (SaaS / Plattform / SMB)</li>
            <li>Fokusdisziplin, Scope-Shaping &amp; Entscheidungsfindung</li>
            <li>Führung interdisziplinärer Teams (Product, Tech, Ops)</li>
            <li>Enge Zusammenarbeit mit Geschäftsführung &amp; Stakeholdern</li>
            <li>Change, Skalierung &amp; Organisationsentwicklung</li>
          </ul>

          <h3>Beruflicher Werdegang</h3>
          <h4>Insurfox GmbH</h4>
          <p>Product Lead / Product Owner – Plattform &amp; Operations-nahe Prozesse · seit 11/2025</p>
          <ul>
            <li>Gesamtverantwortung für den Produkterfolg einer zentralen, geschäftskritischen Plattform mit hoher operativer Relevanz.</li>
            <li>Verantwortung für Produktvision, Roadmap und Prioritäten mit klarem Fokus auf messbare Outcomes.</li>
            <li>Übersetzung strategischer Ziele in konkrete Initiativen, sauberes Scope-Shaping und stabile Execution.</li>
            <li>Sicherstellung einer ruhigen, vorhersehbaren Delivery über Produkt, Entwicklung und angrenzende operative Bereiche hinweg.</li>
            <li>Enge Zusammenarbeit mit Geschäftsführung, Fachbereichen und externen Partnern.</li>
            <li>Etablierung klarer Regeln für Priorisierung, Entscheidungsfindung sowie Start/Stop von Initiativen.</li>
            <li>Stärkung von Ownership, Verantwortung und Entscheidungsfähigkeit im Team.</li>
          </ul>

          <h4>RLE Nova GmbH</h4>
          <p>Produktmanager / Product Lead · 01/2022 – 10/2025</p>
          <ul>
            <li>Verantwortung für digitale Produkte und Angebotslogiken von der Idee bis zum Marktbetrieb.</li>
            <li>Aufbau klarer Produktstrukturen, Prioritäten und Entscheidungswege.</li>
            <li>Führung und Koordination interdisziplinärer Teams (Tech, Business, externe Partner).</li>
            <li>Fokus auf Wirkung, Kundennutzen und nachhaltige Delivery statt Feature-Output.</li>
          </ul>

          <h4>RLE INTERNATIONAL GmbH &amp; Co. KG</h4>
          <p>Senior Berater / Projektleiter · 05/2017 – 12/2021</p>
          <ul>
            <li>Verantwortung für komplexe Transformations- und Optimierungsprogramme.</li>
            <li>Steuerung mehrerer paralleler Initiativen mit klarer Ergebnisverantwortung.</li>
            <li>Moderation anspruchsvoller Stakeholder-Situationen auf Management-Ebene.</li>
            <li>Nachweisliche Verbesserung von Effizienz, Qualität und wirtschaftlichem Ergebnis.</li>
          </ul>

          <h4>A.T.U. GmbH &amp; Co. KG</h4>
          <p>Geschäftsleiter · 06/2015 – 05/2017</p>
          <ul>
            <li>Gesamtverantwortung für einen großen Standort mit über 36 Mitarbeitenden.</li>
            <li>Führung, Zielsteuerung und operative Exzellenz.</li>
            <li>Klare Entscheidungen auch unter Unsicherheit und Zeitdruck.</li>
            <li>Verantwortung für Ergebnis, Qualität, Prozesse und Teamleistung.</li>
          </ul>

          <h4>Nobilas GmbH (Akzo Nobel)</h4>
          <p>Service Manager – Schadensteuerung &amp; Partnernetzwerke · 12/2006 – 04/2008</p>
          <ul>
            <li>Verantwortung für ein bundesweites Partner- und Werkstattnetzwerk.</li>
            <li>Zentrale Schnittstelle zu namhaften Versicherungskonzernen.</li>
            <li>Führung von über 50 Mitarbeitenden.</li>
            <li>Steuerung komplexer End-to-End-Prozesse mit hoher operativer Wirkung.</li>
          </ul>

          <h3>Ausbildung</h3>
          <ul>
            <li>Karosserie- und Fahrzeugbauer-Meister (DQR 6 – Bachelor-Niveau)</li>
            <li>Handwerkskammer Hannover</li>
          </ul>

          <h3>Sprachen &amp; Tools</h3>
          <p><strong>Sprachen:</strong> Deutsch (Muttersprache), Englisch (verhandlungssicher)</p>
          <p><strong>Tools &amp; Methoden:</strong> OKRs, Jira, Confluence, Miro, MS Office, agile &amp; hybride Delivery-Modelle</p>
        </div>

        <div className="cv-print cv-print-cover">
          <div className="cv-print-header">
            <div>
              <h1>Statement of Interest – Director Product &amp; Operations</h1>
              <h2>Ralf Mitterbauer</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover)</p>
            <p>Bereit für hybrides Arbeiten in Bremen</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            <p>Remote (Germany)</p>
          </div>

          <div className="cv-letter-space cv-letter-space-3" />
          <h3 className="cv-letter-heading">Statement of Interest – Director Product &amp; Operations</h3>
          <div className="cv-letter-space cv-letter-space-2" />
          <p>Sehr geehrte Damen und Herren,</p>
          <p>
            die Rolle Director Product &amp; Operations bei Robin Cook spricht mich sehr an, da sie genau dort ansetzt, wo nachhaltiger
            Produkterfolg entsteht: bei klarer Verantwortung für Outcome, Fokusdisziplin und verlässlicher Execution – über Produkt,
            Operations und Customer Journey hinweg.
          </p>
          <p>
            In meinen bisherigen Rollen habe ich wiederholt die Verantwortung übernommen, strategische Ziele in klare Prioritäten,
            wirksame Initiativen und messbare Ergebnisse zu übersetzen. Dabei lag mein Fokus nie auf einzelnen Features, sondern auf dem
            Gesamterfolg des Produkts im Alltag der Kund:innen. Als Product Lead bei Insurfox verantworte ich heute den Produkterfolg
            einer zentralen, operativ hochrelevanten Plattform und sorge für ruhige, vorhersehbare Delivery auch unter hoher Komplexität.
          </p>
          <p>
            Ein wiederkehrendes Muster meiner Laufbahn ist die Führung interdisziplinärer Teams, das Etablieren klarer Entscheidungslogiken
            sowie die konsequente Ausrichtung auf Wirkung statt Aktivität. Ob in Produktrollen, in der operativen Geschäftsleitung oder in
            der Steuerung großer Partnernetzwerke – ich bin es gewohnt, Verantwortung zu übernehmen, Entscheidungen zu treffen und sie auch
            unter Unsicherheit konsequent zu vertreten.
          </p>
          <p>
            Besonders reizt mich an Robin Cook die klare Mission und die Phase, in der sich das Unternehmen befindet: Das Produkt
            funktioniert, der Markt ist da – jetzt geht es darum, Strukturen, Fokus und Execution auf das nächste Level zu heben. Genau
            hier sehe ich meine Stärke und meinen Beitrag.
          </p>
          <p>
            Ich arbeite ruhig, klar und verbindlich – auch in stressigen Phasen – und scheue keine Konflikte, wenn sie notwendig sind, um
            Qualität, Fokus und gemeinsame Ziele zu sichern. Die enge Zusammenarbeit mit der Geschäftsführung sowie die Bereitschaft,
            Verantwortung vor Ort in Bremen zu übernehmen, sehe ich als selbstverständlichen Teil dieser Rolle.
          </p>
          <p>
            Gerne würde ich meine Erfahrung und Haltung bei Robin Cook einbringen und gemeinsam den messbaren Produkterfolg
            weiterentwickeln. Über ein persönliches Gespräch freue ich mich sehr.
          </p>
          <p>Mit freundlichen Grüßen</p>
          <p>Ralf Mitterbauer</p>
        </div>
      </section>
    </CvAuthGate>
  )
}
