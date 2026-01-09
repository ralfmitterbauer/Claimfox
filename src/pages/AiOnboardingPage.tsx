import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import InternAuthGate from '@/components/InternAuthGate'

const sections = [
  {
    titleKey: 'aiOnboarding.sections.intent.title',
    bodyKey: 'aiOnboarding.sections.intent.body'
  },
  {
    titleKey: 'aiOnboarding.sections.pipeline.title',
    bodyKey: 'aiOnboarding.sections.pipeline.body'
  },
  {
    titleKey: 'aiOnboarding.sections.guardrails.title',
    bodyKey: 'aiOnboarding.sections.guardrails.body'
  },
  {
    titleKey: 'aiOnboarding.sections.tools.title',
    bodyKey: 'aiOnboarding.sections.tools.body'
  },
  {
    titleKey: 'aiOnboarding.sections.rollout.title',
    bodyKey: 'aiOnboarding.sections.rollout.body'
  }
]

export default function AiOnboardingPage() {
  const { t } = useI18n()
  const [showArchitecture, setShowArchitecture] = React.useState(false)

  return (
    <InternAuthGate>
      <section className="page" style={{ gap: '2.5rem' }}>
        <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="whitepaper-hero">
            <div className="whitepaper-hero-inner" style={{ gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)' }}>
              <div className="whitepaper-hero-content">
                <span className="whitepaper-kicker">{t('aiOnboarding.kicker')}</span>
                <h1 className="whitepaper-title">{t('aiOnboarding.title')}</h1>
                <p className="whitepaper-subtitle">{t('aiOnboarding.subtitle')}</p>
                <div className="whitepaper-hero-actions">
                  <Button onClick={() => setShowArchitecture((prev) => !prev)}>{t('aiOnboarding.cta.primary')}</Button>
                  <Button variant="secondary">{t('aiOnboarding.cta.secondary')}</Button>
                </div>
              </div>
              <div className="whitepaper-hero-graphic">
                <div className="whitepaper-orb whitepaper-orb-primary" />
                <div className="whitepaper-orb whitepaper-orb-secondary" />
                <svg viewBox="0 0 420 380" fill="none" className="whitepaper-network">
                  <path d="M60 110h140c24 0 44 20 44 44v60c0 24-20 44-44 44H60c-24 0-44-20-44-44v-60c0-24 20-44 44-44Z" stroke="#1f2a5f" strokeWidth="2" />
                  <path d="M240 90h120c20 0 36 16 36 36v80c0 20-16 36-36 36H240" stroke="#d4380d" strokeWidth="2" />
                  <path d="M96 142h88M96 172h64M96 202h76" stroke="#d4380d" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="300" cy="176" r="26" fill="#ffffff" stroke="#1f2a5f" strokeWidth="2" />
                  <path d="M300 162v28M286 176h28" stroke="#1f2a5f" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="whitepaper-chip">{t('aiOnboarding.heroChip')}</div>
              </div>
            </div>
          </div>

          <Header title={t('aiOnboarding.summaryTitle')} subtitle={t('aiOnboarding.summarySubtitle')} subtitleColor="#65748b" />

          <div className="whitepaper-section-grid">
            {sections.map((section) => (
              <Card key={section.titleKey} className="whitepaper-section">
                <h3>{t(section.titleKey)}</h3>
                <p>{t(section.bodyKey)}</p>
              </Card>
            ))}
          </div>

          {showArchitecture && (
            <Card className="intern-architecture">
              <h2>{t('aiOnboarding.architectureTitle')}</h2>
              <pre>
{`┌─────────────────────┐
│  Onboarding UI      │
│  (Wizard + Validation)
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Intake Service      │
│ - Schema Checks     │
│ - Pseudonymisierung │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Feature Store       │
│ - Allowlist         │
│ - Versionierung     │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ AI Scoring Service  │
│ - Empfehlungen      │
│ - Risiko-Flags      │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Review & Approval   │
│ (Human-in-the-Loop) │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Core Systems        │
│ (Policy, CRM, BI)   │
└─────────────────────┘`}
              </pre>
            </Card>
          )}

          <Card className="whitepaper-footer">
            <div>
              <h2>{t('aiOnboarding.cta.title')}</h2>
              <p>{t('aiOnboarding.cta.subtitle')}</p>
            </div>
            <Button onClick={() => setShowArchitecture((prev) => !prev)}>{t('aiOnboarding.cta.primary')}</Button>
          </Card>
        </div>
      </section>
    </InternAuthGate>
  )
}
