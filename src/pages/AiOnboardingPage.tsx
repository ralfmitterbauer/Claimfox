import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

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
            <svg viewBox="0 0 920 820" width="100%" height="auto" role="img" aria-label={t('aiOnboarding.architectureTitle')}>
              <defs>
                <linearGradient id="aiNode" x1="0" x2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </linearGradient>
              </defs>
              <rect x="40" y="30" width="840" height="70" rx="18" fill="url(#aiNode)" stroke="#d7dee9" strokeWidth="2" />
              <text x="70" y="62" fill="#1f2a5f" fontSize="20" fontWeight="700">Onboarding UI (Wizard)</text>
              <text x="70" y="86" fill="#64748b" fontSize="14">Registrierung · Persönlich · Unternehmen · Fortschritt</text>

              <rect x="40" y="130" width="840" height="70" rx="18" fill="url(#aiNode)" stroke="#d7dee9" strokeWidth="2" />
              <text x="70" y="162" fill="#1f2a5f" fontSize="18" fontWeight="700">Client Validation Layer</text>
              <text x="70" y="186" fill="#64748b" fontSize="14">Required Checks · Format Validation · Error States</text>

              <rect x="40" y="230" width="840" height="70" rx="18" fill="url(#aiNode)" stroke="#d7dee9" strokeWidth="2" />
              <text x="70" y="262" fill="#1f2a5f" fontSize="18" fontWeight="700">Intake API Gateway</text>
              <text x="70" y="286" fill="#64748b" fontSize="14">Schema Validation · Pseudonymisierung · Tokenisierung</text>

              <rect x="40" y="330" width="840" height="70" rx="18" fill="url(#aiNode)" stroke="#d7dee9" strokeWidth="2" />
              <text x="70" y="362" fill="#1f2a5f" fontSize="18" fontWeight="700">Data Quality Service</text>
              <text x="70" y="386" fill="#64748b" fontSize="14">Konsistenzchecks · Anomalie-Flags · Duplikate</text>

              <rect x="40" y="430" width="840" height="70" rx="18" fill="url(#aiNode)" stroke="#d7dee9" strokeWidth="2" />
              <text x="70" y="462" fill="#1f2a5f" fontSize="18" fontWeight="700">Feature Store</text>
              <text x="70" y="486" fill="#64748b" fontSize="14">Allowlist · Versionierung · Audit Hooks</text>

              <rect x="40" y="530" width="840" height="70" rx="18" fill="url(#aiNode)" stroke="#d7dee9" strokeWidth="2" />
              <text x="70" y="562" fill="#1f2a5f" fontSize="18" fontWeight="700">AI Scoring & Assist Service</text>
              <text x="70" y="586" fill="#64748b" fontSize="14">Risikoindikatoren · Vorschläge · Priorisierung</text>

              <rect x="40" y="610" width="840" height="70" rx="18" fill="#fff7f4" stroke="#d4380d" strokeWidth="2" />
              <text x="70" y="642" fill="#d4380d" fontSize="18" fontWeight="700">Human-in-the-Loop Review</text>
              <text x="70" y="666" fill="#9f2a0a" fontSize="14">Freigabe · Override · Kommentar</text>

              <rect x="40" y="710" width="840" height="70" rx="18" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
              <text x="70" y="742" fill="#ffffff" fontSize="18" fontWeight="700">Core Systems</text>
              <text x="70" y="766" fill="rgba(255,255,255,0.8)" fontSize="14">Policy · CRM · Billing · BI</text>

              <path d="M460 100v30M460 200v30M460 300v30M460 400v30M460 500v30M460 600v10M460 680v30" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            </svg>
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
  )
}
