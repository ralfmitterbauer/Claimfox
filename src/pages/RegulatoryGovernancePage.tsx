import React, { useEffect, useMemo, useState } from 'react'
import InternAuthGate from '@/components/InternAuthGate'
import Header from '@/components/ui/Header'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'
import { useI18n } from '@/i18n/I18nContext'
import { translations } from '@/i18n/translations'

type SlideContent = {
  title: string
  bullets: string[]
  footer?: string
}

export default function RegulatoryGovernancePage() {
  const { lang } = useI18n()
  const [activeSlide, setActiveSlide] = useState(0)

  const deck = useMemo(() => translations[lang]?.regulatoryDeck ?? translations.en.regulatoryDeck, [lang])
  const slides = useMemo<SlideContent[]>(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const slideKey = String(index + 1)
        const slide = deck.slides[slideKey]
        return {
          title: slide.title,
          bullets: slide.bullets,
          footer: slide.footer
        }
      }),
    [deck]
  )

  const totalSlides = slides.length

  function goToSlide(nextIndex: number) {
    setActiveSlide(Math.max(0, Math.min(nextIndex, totalSlides - 1)))
  }

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
      <section className="page deck-page governance-deck">
        <div className="deck-shell">
          <div
            className="deck-hero"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
            }}
          >
            <div className="deck-hero-inner">
              <Header
                title={deck.title}
                subtitle={deck.subtitle}
                subtitleColor="rgba(255,255,255,0.82)"
              />
            </div>
          </div>
          <div className="deck-slider governance-slider">
            <div className="deck-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div key={`${slide.title}-${index}`} className={`deck-slide${activeSlide === index ? ' is-active' : ''}`}>
                  <div className="deck-slide-inner">
                    <div className="deck-content">
                      <div className="deck-meta">
                        <span>INSURFOX AI IaaS</span>
                        <span>
                          {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                        </span>
                      </div>
                      <h1>{slide.title}</h1>
                      <ul>
                        {slide.bullets.map((bullet, bulletIndex) => (
                          <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
                        ))}
                      </ul>
                      {slide.footer && <div className="deck-footer">{slide.footer}</div>}
                    </div>
                    <div className="deck-aside">
                      <div className="deck-aside-card">
                        <div className="deck-divider" />
                      </div>
                      <div className="deck-aside-caption">
                        <span>{deck.caption}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="deck-nav">
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
        </div>
      </section>
    </InternAuthGate>
  )
}
