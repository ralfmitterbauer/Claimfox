import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { enterpriseStrings } from '@/i18n/strings'
import PosterAntares from '@/assets/images/Poster-Antares.png'
import KarteDeEu from '@/assets/images/karte_de_eu.png'

type Lang = 'de' | 'en'

const defaultLang: Lang = 'de'

function getLang(params: URLSearchParams): Lang {
  const value = params.get('lang')
  return value === 'en' ? 'en' : 'de'
}

function buildDocRaptorUrl(route: string, filename: string) {
  return `/.netlify/functions/pdf?${new URLSearchParams({ route, filename }).toString()}`
}

export default function EnterpriseLeadsPage() {
  const [searchParams] = useSearchParams()
  const lang = getLang(searchParams)
  const isPrint = searchParams.get('print') === '1'
  const copy = enterpriseStrings[lang]

  function exportPdf() {
    const route = lang === 'de'
      ? '/enterprise-leads-intelligence/print/de'
      : '/enterprise-leads-intelligence/print/en'
    const filename = lang === 'de'
      ? 'insurfox-business-plan-part1-de.pdf'
      : 'insurfox-business-plan-part1-en.pdf'
    window.location.href = buildDocRaptorUrl(route, filename)
  }

  return (
    <section className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}>
      <header className="enterprise-header no-print">
        <div className="enterprise-header-title">Business Plan – Part 1</div>
        <div className="enterprise-header-actions">
          <button type="button" className="enterprise-download" onClick={exportPdf}>
            {copy.header.export}
          </button>
        </div>
      </header>

      <section className="slide slide-cover enterprise-section">
        <div className="enterprise-hero">
          <div className="enterprise-hero-copy">
            <h1>{copy.cover.title}</h1>
            <p className="hero-summary">{copy.cover.summary}</p>
          </div>
          <div className="enterprise-hero-media">
            <img src={PosterAntares} alt="Insurfox Poster" />
          </div>
        </div>
      </section>

      <section className="slide enterprise-section enterprise-market">
        <img src={KarteDeEu} alt={copy.marketImageAlt} className="enterprise-market-image" />
      </section>
    </section>
  )
}
