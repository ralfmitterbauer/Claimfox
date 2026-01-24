import React, { useEffect, useRef, useState } from 'react'
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
  const headerRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 6
  const [scale, setScale] = useState(1)
  const [headerHeight, setHeaderHeight] = useState(0)
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
  }

  useEffect(() => {
    if (isPrint) {
      return
    }
    document.body.classList.add('enterprise-fullscreen')
    return () => {
      document.body.classList.remove('enterprise-fullscreen')
    }
  }, [isPrint])

  useEffect(() => {
    if (isPrint) {
      return
    }
    const PAGE_WIDTH = 1122
    const PAGE_HEIGHT = 793
    const updateScale = () => {
      const currentHeaderHeight = headerRef.current?.offsetHeight ?? 0
      const appHeaderHeight = document.querySelector<HTMLElement>('.home-marketing-header')?.offsetHeight ?? 0
      const totalHeaderHeight = appHeaderHeight
      const availableWidth = document.documentElement.clientWidth
      const availableHeight = document.documentElement.clientHeight - totalHeaderHeight
      const maxScale = 1.2
      const nextScale = Math.min(
        availableWidth / PAGE_WIDTH,
        availableHeight / PAGE_HEIGHT,
        maxScale
      )
      setHeaderHeight(totalHeaderHeight)
      setScale(nextScale)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [isPrint])

  return (
    <section
      className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}
      style={{ '--enterprise-header-height': `${headerHeight}px` } as React.CSSProperties}
    >
      <div className="enterprise-stage">
        <div
          className="enterprise-canvas"
          style={{ transform: isPrint ? 'none' : `scale(${scale})` }}
        >
          <div
            className="enterprise-slides"
            ref={slidesRef}
            style={{ transform: `translateX(-${activeIndex * 1122}px)` }}
          >
            <section className="enterprise-page slide-cover enterprise-section">
              <div className="enterprise-grid-only">
                <h1>German and European Markets</h1>
                <div className="enterprise-grid-3">
                  <div className="enterprise-table-stack">
                    <div className="enterprise-table-card">
                      <h3>Germany — Non-Life Market Composition (selected lines)</h3>
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
                  <div className="enterprise-map-card">
                    <div className="enterprise-map-heading">
                      <span className="heading-line heading-line-left" aria-hidden="true" />
                      <div className="heading-text">
                        <span className="heading-title">AI-IAAS B2B PLATFORM</span>
                        <span className="heading-subtitle">For Insurance Operations</span>
                        <span className="heading-note">Enterprise-grade. Core-system agnostic.</span>
                      </div>
                      <span className="heading-line heading-line-right" aria-hidden="true" />
                    </div>
                    <img src={mapImage} alt={copy.marketImageAlt} />
                  </div>
                  <div className="enterprise-table-stack">
                    <div className="enterprise-table-card">
                      <h3>EEA — Non-Life GWP (Solvency II, 2021)</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Line of Business</th>
                            <th className="num">Market Volume</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>Motor vehicle liability</td><td className="num">€ 68.511 bn</td></tr>
                          <tr><td>Other motor</td><td className="num">€ 57.203 bn</td></tr>
                          <tr><td>Property (Fire & other damage)</td><td className="num">€ 101.823 bn</td></tr>
                          <tr><td>General liability</td><td className="num">€ 42.442 bn</td></tr>
                          <tr><td>Medical expense</td><td className="num">€ 113.123 bn</td></tr>
                          <tr className="total-row"><td>Total non-life</td><td className="num">€ 457.220 bn</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="enterprise-table-card">
                      <h3>Europe — P&C Premiums by Main Business Line (2020)</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Line of Business</th>
                            <th className="num">Market Volume</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>Motor</td><td className="num">~€ 149 bn (36%)</td></tr>
                          <tr><td>Property</td><td className="num">~€ 113 bn (27%)</td></tr>
                          <tr><td>General liability</td><td className="num">~€ 50 bn (12%)</td></tr>
                          <tr><td>Other</td><td className="num">~€ 105 bn (25%)</td></tr>
                          <tr className="total-row"><td>Total P&C</td><td className="num">€ 419 bn (100%)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-cover-top">
                <div className="enterprise-hero-copy">
                  <h1>Insurfox Partner and verified Leads</h1>
                  <p className="hero-summary">{copy.cover.summary}</p>
                </div>
                <div className="enterprise-partners">
                  <img src={industryImage} alt="Logistik Industrie" />
                </div>
              </div>
            </section>
            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-page-top enterprise-page-full">
                <div className="enterprise-slide-title">
                  Business model
                </div>
              </div>
            </section>
            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-page-top enterprise-page-full">
                <div className="enterprise-slide-title">
                  Portfolio slide
                </div>
              </div>
            </section>
            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-page-top enterprise-page-full">
                <div className="enterprise-slide-title">
                  Erwartete Prämienentwicklung (GWP)
                </div>
              </div>
            </section>
            <section className="enterprise-page enterprise-section enterprise-market">
              <div className="enterprise-page-top enterprise-page-full">
                <div className="enterprise-slide-title">
                  Partnership and roles
                </div>
              </div>
            </section>
          </div>
        </div>
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
