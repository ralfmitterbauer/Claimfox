import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import HomeHeroImage from '@/assets/images/Home1.png'
import ProductImage from '@/assets/images/Produkt1.png'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="home-marketing">
      <header className="home-marketing-header">
        <div className="home-marketing-header-inner">
          <img src={InsurfoxLogo} alt="Insurfox" className="home-marketing-logo" />
          <nav className="home-marketing-nav">
            <button type="button" onClick={() => navigate('/roles')}>Plattform</button>
            <button type="button" onClick={() => navigate('/get-quote')}>Angebot</button>
            <button type="button" onClick={() => navigate('/claim-manager')}>Schadenmanager</button>
            <Button onClick={() => navigate('/login')} style={{ padding: '0.6rem 1.4rem' }}>
              Anmelden
            </Button>
          </nav>
        </div>
      </header>

      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-hero-kicker">Insurfox AI IaaS</span>
          <h1>AI-native Insurance-IaaS für regulierte Märkte.</h1>
          <p>
            Eine integrierte Plattform für Versicherer, Logistik und Mobility – mit Governance-by-Design,
            End-to-End-Prozessen und klarer Kontrolle über Daten, Modelle und Entscheidungen.
          </p>
          <div className="home-hero-actions">
            <Button onClick={() => navigate('/roles')}>Live-Demo öffnen</Button>
            <Button variant="secondary" onClick={() => navigate('/governance/strategic-deep-dive')}>
              Deep Dive
            </Button>
          </div>
          <div className="home-hero-metrics">
            <div>
              <strong>Multi-Stakeholder</strong>
              <span>Versicherer, Partner, Kunden</span>
            </div>
            <div>
              <strong>Governance-by-Design</strong>
              <span>EU AI Act ready</span>
            </div>
            <div>
              <strong>Event-driven</strong>
              <span>Status, Claims, Dokumente</span>
            </div>
          </div>
        </div>
        <div className="home-hero-media">
          <img src={HomeHeroImage} alt="Insurfox Plattform" />
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>Digitale Versicherungsprozesse – einfach orchestriert.</h2>
          <p>Die Insurfox Plattform verbindet Underwriting, Claims, Partnersteuerung und Governance in einem System.</p>
        </div>
        <div className="home-value-grid">
          <div className="home-value-card">
            <h3>End-to-End Prozesse</h3>
            <p>Quote-to-Policy, Claims und Renewal mit einheitlichen Workflows, SLA-Tracking und Audit Trails.</p>
          </div>
          <div className="home-value-card">
            <h3>AI-Entscheidungsunterstützung</h3>
            <p>Risikoindikationen, Fraud-Signale und Kostenprognosen – immer mit Human-in-the-Loop.</p>
          </div>
          <div className="home-value-card">
            <h3>Partnernetzwerke</h3>
            <p>Werkstatt-, Gutachter- und Abschleppnetzwerke inklusive Live-Kommunikation je Schadenfall.</p>
          </div>
        </div>
      </section>

      <section className="home-product">
        <div className="home-product-card">
          <div>
            <span className="home-product-kicker">Produkt & Plattform</span>
            <h2>Versicherungsprodukte in einer AI-native IaaS.</h2>
            <p>
              Frachtführerhaftung, Flotte, Mobility und Spezialrisiken – modular, mandatierbar und vollständig
              integrierbar über APIs.
            </p>
            <div className="home-product-actions">
              <Button onClick={() => navigate('/get-quote')}>Angebot anfragen</Button>
              <Button variant="secondary" onClick={() => navigate('/insurfox-whitepaper')}>
                Whitepaper
              </Button>
            </div>
          </div>
          <div className="home-product-media">
            <img src={ProductImage} alt="Produktmodule" />
          </div>
        </div>
      </section>

      <section className="home-trust">
        <div className="home-trust-card">
          <h2>Compliance, Sicherheit und Skalierung.</h2>
          <p>
            Rollenbasierte Zugriffe, Tenant-Isolation, Audit Logging und sensitive Data Controls – direkt in der
            Architektur verankert.
          </p>
          <div className="home-trust-grid">
            <div>
              <strong>Data Sovereignty</strong>
              <span>Keine externen KI-Systeme, kein Datenabfluss.</span>
            </div>
            <div>
              <strong>Audit Readiness</strong>
              <span>Vollständige Nachvollziehbarkeit für Aufsicht & Compliance.</span>
            </div>
            <div>
              <strong>Scalable Ops</strong>
              <span>Mandantenfähig und bereit für internationale Märkte.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
