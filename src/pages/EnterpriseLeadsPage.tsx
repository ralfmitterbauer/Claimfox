import React, { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { enterpriseStrings } from '@/i18n/strings'
import { useI18n } from '@/i18n/I18nContext'
import PosterAntares from '@/assets/images/Poster-Antares.png'
import KarteDeEu from '@/assets/images/karte_de_eu.png'
import KarteDeEuEn from '@/assets/images/karte_eu_de_englisch.png'
import LogistikIndustrieDe from '@/assets/images/logistik_industrie_de.png'
import LogistikIndustrieEn from '@/assets/images/logistik_industrie_en.png'

function buildDocRaptorUrl(route: string, filename: string) {
  return `/.netlify/functions/pdf?${new URLSearchParams({ route, filename }).toString()}`
}

export default function EnterpriseLeadsPage() {
  const [searchParams] = useSearchParams()
  const { lang } = useI18n()
  const isPrint = searchParams.get('print') === '1'
  const copy = enterpriseStrings[lang]
  const mapImage = lang === 'en' ? KarteDeEuEn : KarteDeEu
  const industryImage = lang === 'en' ? LogistikIndustrieEn : LogistikIndustrieDe
  const slidesRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 2
  const compositionRows = [
    { label: 'Motor (Kraftfahrt)', value: '€ 34.015 bn' },
    { label: 'Property (Sach)', value: '€ 11.306 bn' },
    { label: 'Liability (Haftpflicht)', value: '€ 8.932 bn' },
    { label: 'Transport', value: '€ 2.467 bn' },
    { label: 'Technical Lines', value: '€ 3.044 bn' },
    { label: 'Cyber', value: '€ 0.330 bn' }
  ]
  const stackRows = [
    { label: 'Fleet Motor', value: '€ 34.015 bn' },
    { label: 'Cargo', value: '€ 2.467 bn' },
    { label: 'Liability', value: '€ 8.932 bn' },
    { label: 'Property', value: '€ 11.306 bn' },
    { label: 'Technical', value: '€ 3.044 bn' },
    { label: 'Cyber', value: '€ 0.330 bn' }
  ]

  function exportPdf() {
    const route = lang === 'de'
      ? '/enterprise-leads-intelligence/print/de'
      : '/enterprise-leads-intelligence/print/en'
    const filename = lang === 'de'
      ? 'insurfox-business-plan-part1-de.pdf'
      : 'insurfox-business-plan-part1-en.pdf'
    window.location.href = buildDocRaptorUrl(route, filename)
  }

  function goToSlide(nextIndex: number) {
    const safeIndex = Math.max(0, Math.min(totalSlides - 1, nextIndex))
    setActiveIndex(safeIndex)
    if (!slidesRef.current) {
      return
    }
    const slideWidth = slidesRef.current.clientWidth
    slidesRef.current.scrollTo({
      left: slideWidth * safeIndex,
      behavior: 'smooth'
    })
  }

  return (
    <section className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}>
      <header className="enterprise-header no-print">
        <div className="enterprise-header-title">Insurfox / Antares</div>
        <div className="enterprise-header-actions">
          <button type="button" className="enterprise-download" onClick={exportPdf}>
            {copy.header.export}
          </button>
        </div>
      </header>

      <div className="enterprise-slides" ref={slidesRef}>
        <section className="slide slide-cover enterprise-section">
          <div className="enterprise-hero">
            <div className="enterprise-hero-copy">
              <h1>{copy.cover.title}</h1>
              <p className="hero-summary">{copy.cover.summary}</p>
              <div className="enterprise-map">
                <img src={mapImage} alt={copy.marketImageAlt} />
              </div>
            </div>
            <div className="enterprise-partners">
              <img src={industryImage} alt="Logistik Industrie" />
              <div className="enterprise-tables">
                <div className="enterprise-table-card">
                  <h3>Germany — Specific Insurance Market Composition (Selected Lines)</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Line of Business</th>
                        <th className="num">Market Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compositionRows.map((row) => (
                        <tr key={row.label}>
                          <td>{row.label}</td>
                          <td className="num">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="enterprise-table-card">
                  <h3>Logistics Stack — Insurance-Relevant Anchors (Germany, indicative volumes)</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Insurance Segment</th>
                        <th className="num">Market Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stackRows.map((row) => (
                        <tr key={row.label}>
                          <td>{row.label}</td>
                          <td className="num">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="enterprise-note">
                Volumes shown represent gross written premium equivalents by line of business in Germany. Figures are indicative and provided for structural market context.
              </p>
            </div>
          </div>
        </section>

        <section className="slide enterprise-section enterprise-market">
          <div className="enterprise-market-grid">
            <div className="enterprise-market-poster">
              <img src={PosterAntares} alt="Insurfox Poster" />
            </div>
            <div className="enterprise-market-map">
              <img src={mapImage} alt={copy.marketImageAlt} />
            </div>
          </div>
        </section>
      </div>

      <div className="enterprise-nav no-print" aria-hidden="true">
        <button
          type="button"
          className="enterprise-nav-arrow left"
          onClick={() => goToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          type="button"
          className="enterprise-nav-arrow right"
          onClick={() => goToSlide(activeIndex + 1)}
          disabled={activeIndex === totalSlides - 1}
          aria-label="Next"
        >
          →
        </button>
      </div>

    </section>
  )
}
