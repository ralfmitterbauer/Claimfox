import React, { useMemo, useState } from 'react'
import Header from '@/components/ui/Header'
import InternAuthGate from '@/components/InternAuthGate'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

const SLIDES = Array.from({ length: 20 }, (_, index) => index + 1)

export default function InsurfoxNativeAiPage() {
  const { t } = useI18n()
  const [activeSlide, setActiveSlide] = useState(0)

  const slideTitles = useMemo(() => SLIDES.map((slide) => t(`nativeAi.slides.${slide}.title`)), [t])
  const graphicTypes = ['network', 'shield', 'chart', 'layers', 'radar'] as const

  function goToSlide(index: number) {
    setActiveSlide(Math.max(0, Math.min(index, SLIDES.length - 1)))
  }

  return (
    <InternAuthGate>
      <section className="page native-ai-page">
        <div className="native-ai-shell">
          <div className="native-ai-header">
            <Header title={t('nativeAi.deckTitle')} subtitle={t('nativeAi.deckSubtitle')} subtitleColor="#65748b" />
          </div>

          <div className="native-ai-slider">
            <div className="native-ai-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {SLIDES.map((slide, index) => (
                <div key={slide} className="native-ai-slide">
                  <div className="native-ai-slide-card">
                    <div className="native-ai-slide-header">
                      <span className="native-ai-slide-kicker">{t('nativeAi.kicker')}</span>
                      <span className="native-ai-slide-index">{String(slide).padStart(2, '0')}</span>
                    </div>
                    <h1>{t(`nativeAi.slides.${slide}.title`)}</h1>
                    <div
                      className="native-ai-slide-body"
                      dangerouslySetInnerHTML={{ __html: t(`nativeAi.slides.${slide}.body`) }}
                    />
                  </div>
                  <div className="native-ai-slide-aside">
                    <div className={`native-ai-slide-graphic native-ai-graphic-${graphicTypes[index % graphicTypes.length]}`}>
                      <div className="whitepaper-orb whitepaper-orb-primary" />
                      <div className="whitepaper-orb whitepaper-orb-secondary" />
                      <div className="native-ai-graphic-content">
                        {graphicTypes[index % graphicTypes.length] === 'chart' && (
                          <>
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                          </>
                        )}
                        {graphicTypes[index % graphicTypes.length] === 'layers' && (
                          <>
                            <span />
                            <span />
                            <span />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="native-ai-slide-meta">
                      <span>{t('nativeAi.title')}</span>
                      <strong>{slideTitles[index]}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="native-ai-nav">
              <Button variant="secondary" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}>
                ←
              </Button>
              <div className="native-ai-dots">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === activeSlide ? 'native-ai-dot active' : 'native-ai-dot'}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
              <Button variant="secondary" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide === SLIDES.length - 1}>
                →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
