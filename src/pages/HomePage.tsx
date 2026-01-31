import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import InsurfoxLogo from '@/assets/logos/Dark_blink.svg'
import HomeHeroBackground from '@/assets/images/Home1.png'
import HomeHeroCardImage from '@/assets/images/iaas_home.png'
import ProductImage from '@/assets/images/Produkt1.png'
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
    heroTitle:
      lang === 'en'
        ? 'Insurfox AI IaaS'
        : 'Insurfox AI IaaS',
    heroBody:
      lang === 'en'
        ? 'The AI-based insurance platform for logistics, transport and mobility. Insurfox connects carriers, brokers and clients across the value chain through an AI-native platform for underwriting, claims and governance.'
        : 'Die KI-basierte Versicherungsplattform für Logistik, Transport und Mobilität. Insurfox verbindet Versicherer, Makler und Kunden entlang der Wertschöpfungskette über eine AI-native Plattform für Underwriting, Claims und Governance.',
    valueTitle:
      lang === 'en'
        ? 'One platform — clearly separated roles'
        : 'Eine Plattform – klar getrennte Rollen',
    valueBody:
      lang === 'en'
        ? 'Insurfox is neither a broker nor a carrier. The platform provides AI-native infrastructure where risk ownership, underwriting authority and technology remain strictly separated.'
        : 'Die Insurfox IaaS Plattform stellt eine AI-native Infrastruktur bereit, in der Risikohoheit, Zeichnungsautorität und Technologie strikt getrennt bleiben.',
    valueCards: [
      {
        title: lang === 'en' ? 'Carriers' : 'Versicherer (Carrier)',
        body:
          lang === 'en'
            ? 'Hold risk, capital and regulatory responsibility • Retain final underwriting and claims authority • Control capacity, limits and governance'
            : 'Tragen Risiko, Kapital und regulatorische Verantwortung • Behalten finale Underwriting- und Claims-Entscheidung • Steuern Kapazität, Limits und Governance'
      },
      {
        title: lang === 'en' ? 'Brokers' : 'Makler',
        body:
          lang === 'en'
            ? 'Remain the primary distribution partner • No data leakage, no competitive conflict • Transparent processes and fast access to products'
            : 'Bleiben primärer Vertriebspartner • Kein Datenabfluss, keine Konkurrenzsituation • Transparente Prozesse und schneller Zugang zu Produkten'
      },
      {
        title: lang === 'en' ? 'Logistics & fleets' : 'Logistik & Flotten',
        body:
          lang === 'en'
            ? 'Digital policy issuance and real-time claims transparency • Parametric triggers instead of subjective loss notices • Clear service and performance KPIs'
            : 'Digitale Policierung und Echtzeit-Schadentransparenz • Parametrische Trigger statt subjektiver Schadenmeldungen • Klare Service- und Performance-KPIs'
      }
    ],
    aiTitle: lang === 'en'
      ? 'AI-supported decision support — human-in-the-loop'
      : 'KI-gestützte Entscheidungsunterstützung – Human-in-the-Loop',
    aiBody: lang === 'en'
      ? 'Insurfox does not use AI for autonomous decisions, but to structure and prepare underwriting, claims and governance decisions.'
      : 'Insurfox nutzt KI nicht zur autonomen Entscheidung, sondern zur strukturierten Vorbereitung von Underwriting-, Claims- und Governance-Entscheidungen.',
    aiBullets: [
      lang === 'en'
        ? 'Risk and exposure assessment based on real-time data'
        : 'Risiko- und Exposure-Bewertung auf Basis von Echtzeit-Daten',
      lang === 'en'
        ? 'Fraud and anomaly signals with clear escalation rules'
        : 'Fraud- und Anomalie-Signale mit klaren Eskalationsregeln',
      lang === 'en'
        ? 'Portfolio insights for carriers without operational interference'
        : 'Portfolio-Insights für Carrier, ohne operative Eingriffe'
    ],
    aiNote: lang === 'en'
      ? 'All decisions follow predefined rules and remain fully auditable at all times.'
      : 'Alle Entscheidungen folgen vordefinierten Regeln und bleiben jederzeit prüf- und auditierbar.',
    claimsTitle: lang === 'en'
      ? 'Transparent claims processes in real time'
      : 'Transparente Schadenprozesse in Echtzeit',
    claimsBody: lang === 'en'
      ? 'Losses are not reported — they are activated based on data. Insurfox orchestrates the process from trigger event to escalation, transparently for all parties.'
      : 'Schäden werden nicht gemeldet, sondern datenbasiert ausgelöst. Insurfox orchestriert den Prozess von Trigger-Ereignis bis Eskalation – transparent für alle Beteiligten.',
    claimsBullets: [
      lang === 'en'
        ? 'Parametric triggers (e.g., delay, standstill, system outage)'
        : 'Parametrische Trigger (z. B. Verzögerung, Stillstand, Systemausfall)',
      lang === 'en'
        ? 'Structured FNOL and automated evidence capture'
        : 'Strukturierte FNOL und automatische Evidenz-Erfassung',
      lang === 'en'
        ? 'Clear escalation paths for thresholds or boundary breaches'
        : 'Klare Eskalationspfade bei Schwellen- oder Grenzwertüberschreitungen'
    ],
    claimsFooter: lang === 'en'
      ? 'Carriers remain in control — processes become faster, traceable and scalable.'
      : 'Versicherer behalten die Kontrolle – Prozesse werden schneller, nachvollziehbarer und skalierbar.',
    productKicker: lang === 'en' ? 'Product & platform' : 'Produkt & Plattform',
    productTitle:
      lang === 'en'
        ? 'Scale together — carrier-aligned'
        : 'Gemeinsam skalieren – carrier-konform',
    productBody:
      lang === 'en'
        ? 'Insurfox does not market products. The platform enables standardized execution of insurance programs across multiple lines. Examples: carrier liability, cargo, fleet. API-first integration, digital policy issuance, real-time reporting & bordereaux. Insurfox serves carriers, brokers and enterprise clients who want to digitize insurance processes in a controlled way — without loss of control.'
        : 'Insurfox betreibt keine Produktvermarktung. Die Plattform ermöglicht die standardisierte Umsetzung von Versicherungsprogrammen über mehrere Sparten hinweg. Beispiele: Frachtführerhaftung, Cargo, Flotte. API-first Integration, digitale Policierung, Echtzeit-Reporting & Bordereaux. Insurfox richtet sich an Versicherer, Makler und Enterprise-Kunden, die Versicherungsprozesse kontrolliert digitalisieren wollen – ohne Kontrollverlust.',
    trustTitle:
      lang === 'en'
        ? 'Governance, data control and audit-readiness built in'
        : 'Governance, Datenkontrolle und Audit-Readiness integriert',
    trustBody:
      lang === 'en'
        ? 'Insurfox is designed as carrier-aligned infrastructure. The platform strengthens governance — it does not replace it.'
        : 'Insurfox ist als carrier-konforme Infrastruktur konzipiert. Die Plattform stärkt Governance – sie ersetzt sie nicht.',
    trustItems: [
      {
        title: lang === 'en' ? 'Data sovereignty' : 'Data Sovereignty',
        body:
          lang === 'en'
            ? 'No external AI providers • No use of data outside the carrier mandate • Clear mandate per product and line'
            : 'Keine externen KI-Provider • Keine Nutzung der Daten außerhalb des Carrier-Mandats • Klare Mandatierung pro Produkt & Sparte'
      },
      {
        title: lang === 'en' ? 'Audit-ready' : 'Audit-Ready',
        body:
          lang === 'en'
            ? 'Complete audit trail • Versioned rules & models • Traceable decisions and evidence chains'
            : 'Vollständiger Audit-Trail • Versionierte Regeln & Modelle • Nachvollziehbare Entscheidungen und Evidenzketten'
      },
      {
        title: lang === 'en' ? 'Scalable collaboration' : 'Skalierbare Zusammenarbeit',
        body:
          lang === 'en'
            ? 'Multi-tenant architecture • Built for regulated insurance markets • FoS-enabled programs per line and carrier approval'
            : 'Multi-Tenant-Architektur • Geeignet für regulierte Versicherungsmärkte • FoS-fähige Programme pro Sparte & Carrier-Freigabe'
      }
    ],
    ctaQuote: lang === 'en' ? 'Request a quote' : 'Angebot anfragen',
    ctaWhitepaper: lang === 'en' ? 'Whitepaper' : 'Whitepaper'
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

      <section className="home-value">
        <div className="home-section-header">
          <h2>{copy.aiTitle}</h2>
          <p>{copy.aiBody}</p>
          <p>{copy.aiNote}</p>
        </div>
        <div className="home-value-grid">
          {copy.aiBullets.map((bullet) => (
            <div key={bullet} className="home-value-card">
              <h3>{bullet}</h3>
              <p>{''}</p>
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
              <p>{''}</p>
            </div>
          ))}
        </div>
        <div className="home-section-header">
          <p>{copy.claimsFooter}</p>
        </div>
      </section>

      <section className="home-product">
        <div className="home-product-card">
          <div>
            <span className="home-product-kicker">{copy.productKicker}</span>
            <h2>{copy.productTitle}</h2>
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
