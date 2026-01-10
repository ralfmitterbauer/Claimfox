import React, { useMemo } from 'react'
import InternAuthGate from '@/components/InternAuthGate'
import Header from '@/components/ui/Header'
import GovernanceImage from '@/assets/images/hero_ai_iaas.png'
import { useI18n } from '@/i18n/I18nContext'
import { translations } from '@/i18n/translations'

export default function RegulatoryGovernancePage() {
  const { lang } = useI18n()
  const deck = useMemo(() => translations[lang]?.regulatoryDeck ?? translations.en.regulatoryDeck, [lang])

  return (
    <InternAuthGate>
      <section className="page regulatory-overview">
        <div className="regulatory-layout">
          <div className="regulatory-left-card">
            <Header title={deck.title} subtitle={deck.subtitle} subtitleColor="#65748b" />
            <div className="regulatory-section">
              <h2>{deck.summary.scopeTitle}</h2>
              <ul>
                {deck.summary.scopeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="regulatory-section">
              <h2>{deck.summary.governanceTitle}</h2>
              <ul>
                {deck.summary.governanceItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="regulatory-section">
              <h2>{deck.summary.securityTitle}</h2>
              <ul>
                {deck.summary.securityItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
      </section>
    </InternAuthGate>
  )
}
