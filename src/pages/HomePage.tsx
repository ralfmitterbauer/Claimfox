import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import HomeHeroBackground from '@/assets/images/Home1.png'
import HomeHeroCardImage from '@/assets/images/iaas_home.png'
import ProductImage from '@/assets/images/Produkt1.png'
import { useI18n } from '@/i18n/I18nContext'
import { useAuth } from '@/features/auth/AuthContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { lang, setLang } = useI18n()
  const { isAuthenticated, logout } = useAuth()
  const [isHeroPreviewOpen, setIsHeroPreviewOpen] = React.useState(false)

  const copy = {
    nav: {
      insurance: lang === 'en' ? 'Insurance' : 'Versicherungen',
      broker: lang === 'en' ? 'Broker' : 'Makler',
      logistics: lang === 'en' ? 'Logistics' : 'Logistik',
      fleet: lang === 'en' ? 'Fleet' : 'Flotte',
      partner: lang === 'en' ? 'Partners' : 'Partner',
      login: lang === 'en' ? 'Login' : 'Anmelden',
      logout: lang === 'en' ? 'Logout' : 'Abmelden'
    },
    heroTitle:
      lang === 'en'
        ? 'The AI-driven Insurance Platform for Logistics, Transport & Mobility.'
        : 'Die KI-basierte Versicherungsplattform für Logistik, Transport und Mobilität.',
    heroBody:
      lang === 'en'
        ? 'Insurfox connects insurers, brokers, and customers across the value chain with a single AI-native platform for underwriting, claims and governance.'
        : 'Insurfox verbindet Versicherer, Makler und Kunden entlang der Wertschöpfungskette über eine AI-native Plattform für Underwriting, Claims und Governance.',
    valueTitle:
      lang === 'en'
        ? 'Connected insurance operations with AI-native infrastructure.'
        : 'Vernetzte Versicherungsprozesse mit AI-nativer Infrastruktur.',
    valueBody:
      lang === 'en'
        ? 'A unified system that reduces complexity, improves claims performance, and enables scalable digital collaboration.'
        : 'Ein integriertes System, das Komplexität reduziert, Schadenprozesse optimiert und skalierbare Zusammenarbeit ermöglicht.',
    valueCards: [
      {
        title: lang === 'en' ? 'One platform, multi access' : 'Eine Plattform, alle Akteure',
        body:
          lang === 'en'
            ? 'Insurers, brokers, and logistics customers collaborate in one system with role-based access.'
            : 'Versicherer, Makler und Logistikunternehmen arbeiten in einem System mit rollenbasiertem Zugriff.'
      },
      {
        title: lang === 'en' ? 'AI-supported decision support' : 'KI-gestützte Entscheidungsunterstützung',
        body:
          lang === 'en'
            ? 'Risk assessment, fraud signals, and portfolio insights with human oversight.'
            : 'Risikobewertung, Fraud-Signale und Portfolio-Insights mit Human-in-the-Loop.'
      },
      {
        title: lang === 'en' ? 'Transparent claims operations' : 'Transparente Schadenprozesse',
        body:
          lang === 'en'
            ? 'Real-time visibility into claims, costs, and performance across all stakeholders.'
            : 'Echtzeit-Transparenz über Schäden, Kosten und Performance für alle Stakeholder.'
      }
    ],
    productKicker: lang === 'en' ? 'Product & Platform' : 'Produkt & Plattform',
    productTitle:
      lang === 'en'
        ? 'Insurance products delivered through a unified AI-native platform.'
        : 'Versicherungsprodukte in einer einheitlichen AI-native Plattform.',
    productBody:
      lang === 'en'
        ? 'Carrier liability, fleet and cargo insurance with API-first integration, digital distribution and claims management.'
        : 'Frachtführerhaftung, Flotte und Cargo mit API-first Integration, digitaler Distribution und Schadenmanagement.',
    trustTitle:
      lang === 'en'
        ? 'Governance, data control and audit readiness built in.'
        : 'Governance, Datenkontrolle und Audit-Readiness integriert.',
    trustBody:
      lang === 'en'
        ? 'Decision support remains with insurers while Insurfox ensures traceability, security and compliance.'
        : 'Die Entscheidungshoheit bleibt beim Versicherer, während Insurfox Nachvollziehbarkeit, Sicherheit und Compliance sicherstellt.',
    trustItems: [
      {
        title: lang === 'en' ? 'Data sovereignty' : 'Data Sovereignty',
        body:
          lang === 'en'
            ? 'No external AI providers, no uncontrolled data transfer.'
            : 'Keine externen KI-Anbieter, kein unkontrollierter Datenabfluss.'
      },
      {
        title: lang === 'en' ? 'Audit-ready' : 'Audit-Ready',
        body:
          lang === 'en'
            ? 'Documented processes, model lifecycle governance and traceable outputs.'
            : 'Dokumentierte Prozesse, Model Lifecycle Governance und nachvollziehbare Outputs.'
      },
      {
        title: lang === 'en' ? 'Scalable collaboration' : 'Skalierbare Zusammenarbeit',
        body:
          lang === 'en'
            ? 'Multi-tenant architecture for regulated insurance markets.'
            : 'Multi-Tenant-Architektur für regulierte Versicherungsmärkte.'
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
            <button type="button" onClick={() => navigate('/broker-portal')}>{copy.nav.broker}</button>
            <button type="button" onClick={() => navigate('/logistics')}>{copy.nav.logistics}</button>
            <button type="button" onClick={() => navigate('/fleet')}>{copy.nav.fleet}</button>
            <button type="button" onClick={() => navigate('/partner')}>{copy.nav.partner}</button>
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
            <span className="home-hero-kicker">Insurfox AI IaaS</span>
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroBody}</p>
          </div>
          <button type="button" className="home-hero-card" onClick={() => setIsHeroPreviewOpen(true)} aria-label="Bildvorschau öffnen">
            <img src={HomeHeroCardImage} alt="Insurfox AI IaaS" />
          </button>
        </div>
        <span className="home-hero-accent" aria-hidden />
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

      <section className="home-product">
        <div className="home-product-card">
          <div>
            <span className="home-product-kicker">{copy.productKicker}</span>
            <h2>{copy.productTitle}</h2>
            <p>{copy.productBody}</p>
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
