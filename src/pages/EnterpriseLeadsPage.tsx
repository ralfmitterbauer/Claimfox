import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'
import SlideStage from '@/components/SlideStage'
import { Slide1Markets, Slide2Premium, Slide3Program, Slide4Governance } from '@/components/slides/BusinessPlanSlides'
import '@/styles/slide-stage.css'
import '@/styles/enterprise-leads.css'

const SLIDE_WIDTH = 1122

function buildDocRaptorUrl(route: string, filename: string, lang: string) {
  return `/.netlify/functions/pdf?${new URLSearchParams({ route, filename, lang }).toString()}`
}

export default function EnterpriseLeadsPage() {
  const [searchParams] = useSearchParams()
  const { lang } = useI18n()
  const isPrint = searchParams.get('print') === '1'
  const [activeIndex, setActiveIndex] = useState(0)
  const slides = [
    { key: 'markets', node: <Slide1Markets lang={lang} /> },
    { key: 'premium', node: <Slide2Premium lang={lang} /> },
    { key: 'program', node: <Slide3Program /> },
    { key: 'governance', node: <Slide4Governance /> }
  ]
  const totalSlides = slides.length

  function exportPdf() {
    const route = `/print/business-plan?print=1&lang=${lang}`
    const filename = lang === 'de'
      ? 'insurfox-business-plan-part1-de.pdf'
      : 'insurfox-business-plan-part1-en.pdf'
    window.location.href = buildDocRaptorUrl(route, filename, lang)
  }

  function goToSlide(nextIndex: number) {
    const safeIndex = Math.max(0, Math.min(totalSlides - 1, nextIndex))
    setActiveIndex(safeIndex)
  }

  useEffect(() => {
    if (isPrint) {
      return
    }
    document.body.classList.add('enterprise-fullscreen', 'is-slide-route')
    return () => {
      document.body.classList.remove('enterprise-fullscreen', 'is-slide-route')
    }
  }, [isPrint])

  return (
    <section className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}>
      <SlideStage isPrint={isPrint} className="enterprise-slide-canvas">
        {!isPrint && (
          <div className="enterprise-download-float no-print">
            <button type="button" onClick={exportPdf}>
              {lang === 'de' ? 'PDF herunterladen' : 'Download PDF'}
            </button>
          </div>
        )}
        <div
          className="enterprise-slides"
          style={{ transform: `translateX(-${activeIndex * SLIDE_WIDTH}px)` }}
        >
          {slides.map((slide, index) => (
            <section
              key={slide.key}
              className="enterprise-page enterprise-section"
              aria-hidden={index !== activeIndex}
            >
              {slide.node}
            </section>
          ))}
        </div>
      </SlideStage>
      {!isPrint && (
        <div className="enterprise-nav no-print" aria-hidden="true">
          <button
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === totalSlides - 1}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>
      )}
    </section>
  )
}
