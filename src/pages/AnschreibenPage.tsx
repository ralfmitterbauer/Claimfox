import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import CvAuthGate from '@/components/CvAuthGate'
import profileImage from '@/assets/images/rm.png'

export default function AnschreibenPage() {
  return (
    <CvAuthGate>
      <section className="page cv-page">
        <div className="cv-shell">
          <div className="cv-header">
            <Header title="Anschreiben" subtitle="Ralf Mitterbauer" subtitleColor="#65748b" />
            <Button className="cv-download" onClick={() => window.print()}>
              PDF herunterladen
            </Button>
          </div>

          <div className="cv-hero">
            <div className="cv-hero-left">
              <h2>IT Product Owner | Produktmanager Software &amp; Plattformen</h2>
              <p>Uhlandstraße 11 · 31162 Bad Salzdetfuth (Region Hannover)</p>
              <p>Telefon: +49 (0)151 22644067 · E-Mail: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Bewerbung</strong>
                <p>Product Owner Partner Neuausrichtung · HDI AG</p>
              </div>
            </Card>
          </div>

          <Card className="cv-card">
            <h3>Anschreiben</h3>
            <p>Bewerbung als Product Owner Partner Neuausrichtung</p>
            <p>HDI AG – Standort Hannover</p>
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
          </Card>
        </div>

        <div className="cv-print">
          <div className="cv-print-header">
            <div>
              <h1>Ralf Mitterbauer</h1>
              <h2>IT Product Owner | Produktmanager Software &amp; Plattformen</h2>
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

          <h3>Anschreiben</h3>
          <p>Bewerbung als Product Owner Partner Neuausrichtung</p>
          <p>HDI AG – Standort Hannover</p>
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
        </div>
      </section>
    </CvAuthGate>
  )
}
