import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const SITEMAP_URLS = [
  'https://insurfox.de/de/',
  'https://insurfox.com/en/',
  'https://insurfox.de/de/ueber-uns/',
  'https://insurfox.com/en/about-us/',
  'https://insurfox.de/de/beratungsgrundlage/',
  'https://insurfox.com/en/basis-of-advice/',
  'https://insurfox.de/de/kontakt/',
  'https://insurfox.com/en/contact/',
  'https://insurfox.de/de/datenschutz/',
  'https://insurfox.com/en/data-protection/',
  'https://insurfox.de/de/faq/',
  'https://insurfox.com/en/faq/',
  'https://insurfox.de/de/impressum/',
  'https://insurfox.com/en/imprint/',
  'https://insurfox.de/de/investoren/',
  'https://insurfox.com/en/investor-relations/',
  'https://insurfox.de/de/rechtliche-hinweise/',
  'https://insurfox.com/en/legal-notes/',
  'https://insurfox.de/de/produkte/',
  'https://insurfox.com/en/products/',
  'https://insurfox.de/de/produkte/frachtfuehrer-haftungs-versicherung/',
  'https://insurfox.com/en/products/carrier-liability-insurance/',
  'https://insurfox.de/de/produkte/gewerbe-versicherung/',
  'https://insurfox.com/en/products/commercial-insurance/',
  'https://insurfox.de/de/produkte/transport-logistik/',
  'https://insurfox.com/en/products/transport-logistics/',
  'https://insurfox.de/de/produkte/individuelle-versicherung/',
  'https://insurfox.com/en/produkte/individuelle-versicherung/',
  'https://insurfox.de/de/versicherung-auswaehlen/',
  'https://insurfox.com/en/select-policy/',
  'https://insurfox.de/de/nachhaltigkeit/',
  'https://insurfox.com/en/sustainability/',
  'https://insurfox.de/de/agb/',
  'https://insurfox.com/en/terms-and-conditions/',
  'https://insurfox.de/de/warum-insurfox/',
  'https://insurfox.com/en/warum-insurfox/',
  'https://insurfox.de/de/app/quote/carrier-liability-insurance/',
  'https://insurfox.com/en/app/quote/carrier-liability-insurance/',
  'https://insurfox.de/de/app/quote/business-insurance/',
  'https://insurfox.com/en/app/quote/business-insurance/',
  'https://insurfox.de/de/app/login/',
  'https://insurfox.com/en/app/login/',
  'https://insurfox.de/de/app/register/',
  'https://insurfox.com/en/app/register/',
  'https://insurfox.de/de/app/forgot-password/',
  'https://insurfox.com/en/app/forgot-password/'
]

const NAV_STRUCTURE = {
  main: ['Produkte', 'Warum Insurfox', 'Über uns', 'Kontakt', 'FAQ', 'Investoren', 'Nachhaltigkeit'],
  legal: ['Impressum', 'Datenschutz', 'AGB', 'Rechtliche Hinweise'],
  app: ['Login', 'Registrierung', 'Passwort vergessen', 'Quote Carrier Liability', 'Quote Business Insurance']
}

export default function LandingSitemapPage() {
  return (
    <section className="page setup-page landing-page">
      <div className="setup-shell">
        <Header title="Sitemap" subtitle="Insurfox Landing Page (dev.insurfox.de)" subtitleColor="#65748b" />

        <div className="landing-actions">
          <Button onClick={() => window.print()}>PDF herunterladen</Button>
        </div>

        <div className="setup-grid">
          <Card className="setup-card">
            <h3>Menüstruktur (aus HTML-Links)</h3>
            <h4>Hauptnavigation</h4>
            <ul>
              {NAV_STRUCTURE.main.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h4>Rechtliches</h4>
            <ul>
              {NAV_STRUCTURE.legal.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h4>App</h4>
            <ul>
              {NAV_STRUCTURE.app.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Sitemap URLs</h3>
            <p>Quelle: https://dev.insurfox.de/sitemap.xml</p>
            <ul className="landing-sitemap-list">
              {SITEMAP_URLS.map((url) => (
                <li key={url}>{url}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
