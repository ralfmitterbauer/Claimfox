import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

const useCases = [
  'whitepaper.useCases.risk',
  'whitepaper.useCases.claim',
  'whitepaper.useCases.fraud',
  'whitepaper.useCases.docs',
  'whitepaper.useCases.maintenance',
  'whitepaper.useCases.route'
]

const sections = [
  { key: 'context', number: '01' },
  { key: 'native', number: '02' },
  { key: 'ecosystem', number: '03' },
  { key: 'useCases', number: '04' },
  { key: 'data', number: '05' },
  { key: 'governance', number: '06' },
  { key: 'investors', number: '07' },
  { key: 'conclusion', number: '08' }
]

export default function AiWhitepaperPage() {
  const { t } = useI18n()

  return (
    <section className="page" style={{ gap: '2.5rem' }}>
        <div className="whitepaper-hero">
          <div className="whitepaper-hero-inner">
            <div className="whitepaper-hero-content">
              <span className="whitepaper-kicker">{t('whitepaper.kicker')}</span>
              <h1 className="whitepaper-title">{t('whitepaper.heroTitle')}</h1>
              <p className="whitepaper-subtitle">{t('whitepaper.heroSubtitle')}</p>
              <div className="whitepaper-hero-actions">
                <Button>{t('whitepaper.cta.primary')}</Button>
                <Button variant="secondary">{t('whitepaper.cta.secondary')}</Button>
              </div>
              <div className="whitepaper-metrics">
                {['whitepaper.metrics.ai', 'whitepaper.metrics.sovereign', 'whitepaper.metrics.scalable'].map((metricKey) => (
                  <div key={metricKey} className="whitepaper-metric">
                    <span>{t(metricKey)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="whitepaper-hero-graphic">
              <div className="whitepaper-orb whitepaper-orb-primary" />
              <div className="whitepaper-orb whitepaper-orb-secondary" />
              <svg viewBox="0 0 420 380" fill="none" className="whitepaper-network">
                <path d="M48 188c68-80 140-120 216-120 76 0 134 30 166 86" stroke="#dfe7f2" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 254c90-46 174-58 252-36 64 18 108 50 134 96" stroke="#dfe7f2" strokeWidth="2" strokeLinecap="round" />
                <circle cx="108" cy="160" r="22" fill="#ffffff" stroke="#1f2a5f" strokeWidth="2" />
                <circle cx="210" cy="108" r="28" fill="#ffffff" stroke="#1f2a5f" strokeWidth="2" />
                <circle cx="312" cy="170" r="22" fill="#ffffff" stroke="#1f2a5f" strokeWidth="2" />
                <circle cx="176" cy="258" r="20" fill="#ffffff" stroke="#d4380d" strokeWidth="2" />
                <circle cx="304" cy="276" r="18" fill="#ffffff" stroke="#d4380d" strokeWidth="2" />
                <path d="M108 160l102-52 102 62" stroke="#1f2a5f" strokeWidth="2" />
                <path d="M210 108l-34 150 128 18" stroke="#d4380d" strokeWidth="2" />
              </svg>
              <div className="whitepaper-chip">
                <span>{t('whitepaper.heroChip')}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Header title={t('whitepaper.summaryTitle')} subtitle={t('whitepaper.summarySubtitle')} subtitleColor="#65748b" />
          <Card>
            <p style={{ margin: 0, color: '#1f2a5f', fontSize: '1.05rem', lineHeight: 1.7 }}>{t('whitepaper.summaryBody')}</p>
          </Card>

          <div className="whitepaper-section-grid">
            {sections.map((section) => (
              <Card key={section.key} className="whitepaper-section">
                <div className="whitepaper-section-header">
                  <span className="whitepaper-section-number">{section.number}</span>
                  <h3>{t(`whitepaper.sections.${section.key}.title`)}</h3>
                </div>
                <p>{t(`whitepaper.sections.${section.key}.body`)}</p>
              </Card>
            ))}
          </div>

          <div className="whitepaper-usecases">
            <div>
              <h2>{t('whitepaper.useCases.title')}</h2>
              <p>{t('whitepaper.useCases.subtitle')}</p>
            </div>
            <div className="whitepaper-chip-grid">
              {useCases.map((key) => (
                <span key={key} className="whitepaper-chip-outline">
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          <div className="whitepaper-footer">
            <div>
              <h2>{t('whitepaper.cta.title')}</h2>
              <p>{t('whitepaper.cta.subtitle')}</p>
            </div>
            <Button>{t('whitepaper.cta.primary')}</Button>
          </div>
        </div>
    </section>
  )
}
