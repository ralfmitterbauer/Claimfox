import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import InsurfoxLogo from '@/assets/logos/Dark_blink.svg'
import HomeHeroBackground from '@/assets/images/Home1.png'
import HomeHeroCardImage from '@/assets/images/iaas_home.png'
import ProductImage from '@/assets/images/Produkt1.png'
import InsuranceProcessLandscape from '@/assets/images/insurance_process_landscape.png'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'
import { useI18n } from '@/i18n/I18nContext'
import { useAuth } from '@/features/auth/AuthContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { lang, setLang } = useI18n()
  const { isAuthenticated, logout, user } = useAuth()
  const [isHeroPreviewOpen, setIsHeroPreviewOpen] = React.useState(false)

  const copy = {
    nav: {
      insurance: lang === 'en' ? 'Insurance' : 'Versicherungen',
      broker: lang === 'en' ? 'Broker' : 'Makler',
      logistics: lang === 'en' ? 'Logistics' : 'Logistik',
      fleet: lang === 'en' ? 'Fleet' : 'Flotte',
      partner: lang === 'en' ? 'Partners' : 'Partner',
      demo: lang === 'en' ? 'Demo' : 'Demo',
      login: lang === 'en' ? 'Login' : 'Anmelden',
      logout: lang === 'en' ? 'Logout' : 'Abmelden'
    },
    heroKicker: lang === 'en' ? 'Insurance Infrastructure' : 'Versicherungsinfrastruktur',
    heroTitle: lang === 'en' ? 'Insurfox AI IaaS Portal' : 'Insurfox AI IaaS Portal',
    heroBody: lang === 'en'
      ? 'Insurfox is a central platform to run insurance programs across partners, lines and markets. It standardizes execution and keeps decision authority with carriers.'
      : 'Insurfox ist eine zentrale Plattform zum Betrieb von Versicherungsprogrammen über Partner, Sparten und Märkte hinweg. Sie standardisiert die Ausführung und belässt die Entscheidungshoheit bei den Carriern.',
    heroContext: lang === 'en' ? 'Underwriting • Claims • Governance' : 'Underwriting • Schaden • Governance',
    valueTitle: lang === 'en'
      ? 'A scalable operating model for insurance programs'
      : 'Ein skalierbares Operating Model für Versicherungsprogramme',
    valueBody: lang === 'en'
      ? 'Clear separation of risk, distribution and technology. Lower operational complexity. Controlled scaling across programs and markets.'
      : 'Klare Trennung von Risiko, Distribution und Technologie. Geringere operative Komplexität. Kontrollierte Skalierung über Programme und Märkte.',
    valueCards: [
      {
        title: lang === 'en' ? 'Power any application' : 'Anwendungen anbinden',
        body: lang === 'en'
          ? 'API-first integration into existing stacks. Reusable services across carriers and brokers.'
          : 'API-first Integration in bestehende Systemlandschaften. Wiederverwendbare Services über Carrier und Makler.'
      },
      {
        title: lang === 'en' ? 'Launch insurance programs' : 'Versicherungsprogramme starten',
        body: lang === 'en'
          ? 'Standardized products and controlled approvals reduce time-to-market.'
          : 'Standardisierte Produkte und kontrollierte Freigaben verkürzen die Time-to-Market.'
      },
      {
        title: lang === 'en' ? 'Connect distribution channels' : 'Distribution anbinden',
        body: lang === 'en'
          ? 'Broker, partner and enterprise access with consistent processes and roles.'
          : 'Makler-, Partner- und Enterprise-Zugänge mit konsistenten Prozessen und Rollen.'
      },
      {
        title: lang === 'en' ? 'Integrate operational data' : 'Operative Daten integrieren',
        body: lang === 'en'
          ? 'Real-time signals improve evidence quality and decision support.'
          : 'Echtzeit-Signale verbessern Datenqualität und Entscheidungsgrundlagen.'
      }
    ],
    servicesTitle: lang === 'en'
      ? 'Execution through standardized services'
      : 'Ausführung über standardisierte Services',
    servicesBody: lang === 'en'
      ? 'AI supports structuring and prioritization. No autonomous decisions. Accountability remains with carriers.'
      : 'KI unterstützt Strukturierung und Priorisierung. Keine autonomen Entscheidungen. Verantwortung bleibt bei Carriern.',
    servicesCards: [
      {
        title: lang === 'en' ? 'Product Catalog' : 'Product Catalog',
        body: lang === 'en'
          ? 'Standardized products and variants with controlled release.'
          : 'Standardisierte Produkte und Varianten mit kontrollierter Freigabe.'
      },
      {
        title: lang === 'en' ? 'Insurance Services' : 'Insurance Services',
        body: lang === 'en'
          ? 'Underwriting, claims and governance as repeatable services.'
          : 'Underwriting, Schaden und Governance als wiederholbare Services.'
      },
      {
        title: lang === 'en' ? 'Partner Services' : 'Partner Services',
        body: lang === 'en'
          ? 'Partner orchestration, documents and communication.'
          : 'Partner-Orchestrierung, Dokumente und Kommunikation.'
      },
      {
        title: lang === 'en' ? 'Utility & Administration' : 'Utility & Administration',
        body: lang === 'en'
          ? 'Identity, access, audit and reporting foundations.'
          : 'Identity, Zugriff, Audit und Reporting als Basis.'
      }
    ],
    claimsTitle: lang === 'en'
      ? 'Operational control in claims handling'
      : 'Operative Kontrolle in der Schadenbearbeitung',
    claimsBody: lang === 'en'
      ? 'Structured, data-driven flows reduce manual exceptions and enforce consistent escalation logic.'
      : 'Strukturierte, datenbasierte Abläufe reduzieren manuelle Ausnahmen und setzen konsistente Eskalationslogik durch.',
    claimsBullets: [
      lang === 'en'
        ? 'Event-based triggers'
        : 'Ereignisbasierte Trigger',
      lang === 'en'
        ? 'Structured FNOL and evidence capture'
        : 'Strukturierte FNOL und Evidenz',
      lang === 'en'
        ? 'Escalation by defined thresholds'
        : 'Eskalation entlang definierter Schwellen'
    ],
    claimsFooter: lang === 'en'
      ? 'Control, traceability and scalability remain with the carrier.'
      : 'Kontrolle, Nachvollziehbarkeit und Skalierbarkeit verbleiben beim Carrier.',
    productKicker: lang === 'en' ? 'Platform' : 'Plattform',
    productTitle:
      lang === 'en'
        ? 'One portal, multiple insurance programs'
        : 'Ein Portal, mehrere Versicherungsprogramme',
    productBody:
      lang === 'en'
        ? 'Unified execution across lines, API-first integration, reporting and bordereaux. Supports carrier, broker and enterprise operating models.'
        : 'Einheitliche Ausführung über Sparten, API-first Integration, Reporting und Bordereaux. Unterstützt Carrier-, Makler- und Enterprise-Operating-Modelle.',
    trustTitle:
      lang === 'en'
        ? 'Governance and auditability by design'
        : 'Governance und Auditierbarkeit by design',
    trustBody:
      lang === 'en'
        ? 'Mandates, role-based access and audit trails are enforced by the operating model.'
        : 'Mandate, rollenbasierter Zugriff und Audit-Trails sind im Operating Model verankert.',
    trustItems: [
      {
        title: lang === 'en' ? 'Data sovereignty' : 'Datensouveränität',
        body:
          lang === 'en'
            ? 'Mandate-bound usage with clear access control.'
            : 'Mandatsbezogene Nutzung mit klarem Zugriff.'
      },
      {
        title: lang === 'en' ? 'Audit-ready operations' : 'Audit-ready Operations',
        body:
          lang === 'en'
            ? 'Versioned rules and traceable decisions with evidence trails.'
            : 'Versionierte Regeln und nachvollziehbare Entscheidungen mit Evidenz-Trails.'
      },
      {
        title: lang === 'en' ? 'Scalable collaboration' : 'Skalierbare Zusammenarbeit',
        body:
          lang === 'en'
            ? 'Multi-tenant operations for regulated markets with monitoring.'
            : 'Multi-Tenant-Betrieb für regulierte Märkte mit Monitoring.'
      }
    ]
  }

  return (
    <main className="home-marketing">
      <header className="home-marketing-header">
        <div className="home-marketing-header-inner">
          <button type="button" onClick={() => navigate('/home')} className="home-marketing-logo-button" aria-label="Insurfox Home">
            <img src={InsurfoxLogo} alt="Insurfox" className="home-marketing-logo" />
          </button>
          <nav className="home-marketing-nav">
            <button type="button" onClick={() => navigate('/insurance')}>{copy.nav.insurance}</button>
            {user?.mode !== 'insurance-only' && (
              <>
                <button type="button" onClick={() => navigate('/broker-portal')}>{copy.nav.broker}</button>
                <button type="button" onClick={() => navigate('/logistics')}>{copy.nav.logistics}</button>
                <button type="button" onClick={() => navigate('/fleet')}>{copy.nav.fleet}</button>
                <button type="button" onClick={() => navigate('/partner')}>{copy.nav.partner}</button>
                <button type="button" onClick={() => navigate('/demo')}>{copy.nav.demo}</button>
              </>
            )}
            <div className="home-marketing-lang-switch" role="group" aria-label="Language switch">
              <button type="button" className={lang === 'de' ? 'is-active' : ''} onClick={() => setLang('de')}>
                DE
              </button>
              <button type="button" className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>
                EN
              </button>
            </div>
            <Button
              onClick={() => {
                if (isAuthenticated) {
                  logout()
                  navigate('/login')
                  return
                }
                navigate('/login')
              }}
              className="home-marketing-login"
              style={{ padding: '0.5rem 1.1rem' }}
              disableHover
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.8-3.5 5-6 8-6s6.2 2.5 8 6" />
              </svg>
              <span className="home-marketing-login-text">{isAuthenticated ? copy.nav.logout : copy.nav.login}</span>
            </Button>
            <button type="button" className="home-marketing-menu" aria-label="Menü öffnen">
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>

      <section className="home-hero" style={{ backgroundImage: `url(${HomeHeroBackground})` }}>
        <div className="home-hero-inner">
          <div className="home-hero-content">
            <span className="home-hero-kicker">{copy.heroKicker}</span>
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroBody}</p>
            <p>{copy.heroContext}</p>
          </div>
          <div className="home-hero-card" aria-label="Insurfox Logo">
            <img src={InsurfoxLogoLight} alt="Insurfox" style={{ width: '82%', height: '82%', objectFit: 'contain' }} />
          </div>
        </div>
        <span className="home-hero-accent" aria-hidden />
      </section>

      <section className="home-product">
        <div className="home-product-card">
          <div>
            <span className="home-product-kicker">{copy.productKicker}</span>
            <h2>{copy.productTitle}</h2>
            <img src={InsuranceProcessLandscape} alt="Insurance process overview" style={{ width: '100%', margin: '0.5rem 0 1rem', borderRadius: 18, border: '1px solid rgba(148, 163, 184, 0.18)', boxShadow: '0 14px 32px rgba(15, 23, 42, 0.08)' }} />
            <p>{copy.productBody}</p>
            <div className="home-product-actions">
              <div />
            </div>
          </div>
          <div className="home-product-media">
            <img src={ProductImage} alt="Produktmodule" />
          </div>
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.valueTitle}</h2>
          <p>{copy.valueBody}</p>
        </div>
        <div className="home-value-grid">
          {copy.valueCards.map((card) => (
            <div key={card.title} className="home-value-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.servicesTitle}</h2>
          <p>{copy.servicesBody}</p>
        </div>
        <div className="home-value-grid">
          {copy.servicesCards.map((item) => (
            <div key={item.title} className="home-value-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.claimsTitle}</h2>
          <p>{copy.claimsBody}</p>
        </div>
        <div className="home-value-grid">
          {copy.claimsBullets.map((bullet) => (
            <div key={bullet} className="home-value-card">
              <h3>{bullet}</h3>
            </div>
          ))}
        </div>
        <div className="home-section-header">
          <p>{copy.claimsFooter}</p>
        </div>
      </section>

      <section className="home-trust">
        <div className="home-trust-card">
          <h2>{copy.trustTitle}</h2>
          <p>{copy.trustBody}</p>
          <div className="home-trust-grid">
            {copy.trustItems.map((item) => (
              <div key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isHeroPreviewOpen && (
        <div className="hero-image-modal" role="dialog" aria-modal="true">
          <button type="button" className="hero-image-modal__close" onClick={() => setIsHeroPreviewOpen(false)} aria-label="Schließen">
            ×
          </button>
          <div className="hero-image-modal__content">
            <img src={HomeHeroCardImage} alt="Insurfox AI IaaS" />
          </div>
        </div>
      )}
    </main>
  )
}
