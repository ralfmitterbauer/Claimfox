import React, { useEffect, useMemo, useState } from 'react'
import InternAuthGate from '@/components/InternAuthGate'
import Header from '@/components/ui/Header'
import GovernanceImage from '@/assets/images/hero_ai_iaas.png'
import { useI18n } from '@/i18n/I18nContext'
import { translations } from '@/i18n/translations'

export default function RegulatoryGovernancePage() {
  const { lang } = useI18n()
  const [activeSlide, setActiveSlide] = useState(0)
  const deck = useMemo(() => translations[lang]?.regulatoryDeck ?? translations.en.regulatoryDeck, [lang])
  const slides = useMemo(() => {
    const slide = (index: number) => deck.slides[String(index)]
    return [
      {
        title: slide(1).title,
        bullets: [...slide(1).bullets, ...slide(2).bullets, ...slide(3).bullets],
        footer: slide(1).footer
      },
      {
        title: slide(5).title,
        bullets: [
          ...slide(4).bullets,
          ...slide(5).bullets,
          ...slide(6).bullets,
          ...slide(7).bullets,
          ...slide(8).bullets
        ]
      },
      {
        title: slide(11).title,
        bullets: [
          ...slide(9).bullets,
          ...slide(10).bullets,
          ...slide(11).bullets,
          ...slide(12).bullets,
          ...slide(13).bullets,
          ...slide(14).bullets,
          ...slide(15).bullets,
          ...slide(16).bullets,
          ...slide(17).bullets,
          ...slide(18).bullets
        ],
        footer: slide(11).footer
      }
    ]
  }, [deck])

  const totalSlides = slides.length

  function goToSlide(nextIndex: number) {
    setActiveSlide(Math.max(0, Math.min(nextIndex, totalSlides - 1)))
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        goToSlide(activeSlide + 1)
      }
      if (event.key === 'ArrowLeft') {
        goToSlide(activeSlide - 1)
      }
      if (event.key === 'Home') {
        goToSlide(0)
      }
      if (event.key === 'End') {
        goToSlide(totalSlides - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlide, totalSlides])

  return (
    <InternAuthGate>
      <section className="page regulatory-overview">
        <div className="regulatory-slider">
          <div className="regulatory-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={`${slide.title}-${index}`} className="regulatory-slide">
                <div className="regulatory-layout">
                  <div className="regulatory-left-card">
                    <div className="regulatory-left-header">
                      <Header title={deck.title} subtitle={deck.subtitle} subtitleColor="#65748b" />
                      <span className="regulatory-slide-index">
                        {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="regulatory-slide-content">
                      <h1>{slide.title}</h1>
                      <ul>
                        {slide.bullets.map((item, bulletIndex) => (
                          <li key={`${item}-${bulletIndex}`}>{item}</li>
                        ))}
                      </ul>
                      {slide.footer && <div className="regulatory-footer">{slide.footer}</div>}
                    </div>
                  </div>
                  <div className="regulatory-right">
                    <div className="regulatory-image-card">
                      <img src={GovernanceImage} alt={deck.title} />
                    </div>
                    <div className="regulatory-highlight-card">
                      <span className="regulatory-kicker">{deck.highlightTitle}</span>
                      <ul>
                        {deck.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="regulatory-nav">
            <button
              type="button"
              className="deck-arrow"
              onClick={() => goToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              aria-label="Previous slide"
            >
              ←
            </button>
            <div className="deck-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === activeSlide ? 'deck-dot active' : 'deck-dot'}
                  onClick={() => goToSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="deck-arrow"
              onClick={() => goToSlide(activeSlide + 1)}
              disabled={activeSlide === totalSlides - 1}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
