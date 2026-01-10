import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import InternAuthGate from '@/components/InternAuthGate'
import { useI18n } from '@/i18n/I18nContext'

const SLIDES = Array.from({ length: 20 }, (_, index) => index + 1)

export default function InsurfoxNativeAiPage() {
  const { t } = useI18n()

  return (
    <InternAuthGate>
      <section className="page" style={{ gap: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="whitepaper-hero">
            <div className="whitepaper-hero-inner">
              <div className="whitepaper-hero-content">
                <span className="whitepaper-kicker">{t('nativeAi.kicker')}</span>
                <h1 className="whitepaper-title">{t('nativeAi.title')}</h1>
                <p className="whitepaper-subtitle">{t('nativeAi.subtitle')}</p>
              </div>
              <div className="whitepaper-hero-graphic">
                <div className="whitepaper-orb whitepaper-orb-primary" />
                <div className="whitepaper-orb whitepaper-orb-secondary" />
                <svg viewBox="0 0 420 360" fill="none" className="whitepaper-network">
                  <rect x="60" y="80" width="300" height="200" rx="26" stroke="#1f2a5f" strokeWidth="2" />
                  <path d="M120 140h180M120 180h130M120 220h150" stroke="#d4380d" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="120" cy="120" r="12" fill="#ffffff" stroke="#1f2a5f" strokeWidth="2" />
                  <circle cx="300" cy="250" r="16" fill="#ffffff" stroke="#d4380d" strokeWidth="2" />
                </svg>
                <div className="whitepaper-chip">{t('nativeAi.heroChip')}</div>
              </div>
            </div>
          </div>

          <Header title={t('nativeAi.deckTitle')} subtitle={t('nativeAi.deckSubtitle')} subtitleColor="#65748b" />

          <div className="whitepaper-section-grid">
            {SLIDES.map((slide) => (
              <Card key={slide} className="whitepaper-section">
                <div className="whitepaper-section-header">
                  <span className="whitepaper-section-number">{String(slide).padStart(2, '0')}</span>
                  <h3>{t(`nativeAi.slides.${slide}.title`)}</h3>
                </div>
                <div style={{ color: '#475569', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t(`nativeAi.slides.${slide}.body`) }} />
              </Card>
            ))}
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
