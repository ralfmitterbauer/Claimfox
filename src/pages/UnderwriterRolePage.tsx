import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function UnderwriterRolePage() {
  const { lang } = useI18n()
  const navigate = useNavigate()

  const copy = lang === 'en'
    ? {
        title: 'Underwriter',
        subtitle: 'Portfolio steering, underwriting corridors and clear referral logic within the carrier framework.',
        cta: 'Login',
        sections: [
          {
            title: 'Portfolio Steering',
            items: ['Exposure aggregation limits', 'Capacity caps and roll-out gates', 'Monthly performance review']
          },
          {
            title: 'Underwriting Corridors',
            items: ['Risk-based pricing boundaries', 'Eligibility and corridor checks', 'Escalation thresholds']
          },
          {
            title: 'Referral Logic',
            items: ['Out-of-corridor cases', 'Aggregation alerts', 'Governance approvals']
          }
        ]
      }
    : {
        title: 'Underwriter',
        subtitle: 'Portfolio-Steuerung, Underwriting-Korridore und klare Referral-Logik im Carrier-Framework.',
        cta: 'Login',
        sections: [
          {
            title: 'Portfolio-Steuerung',
            items: ['Exposure-Aggregationsgrenzen', 'Kapazitäts-Caps und Rollout-Gates', 'Monatlicher Performance-Review']
          },
          {
            title: 'Underwriting-Korridore',
            items: ['Risikobasierte Pricing-Grenzen', 'Eligibility- und Korridor-Prüfungen', 'Eskalationsschwellen']
          },
          {
            title: 'Referral-Logik',
            items: ['Fälle außerhalb des Korridors', 'Aggregations-Alerts', 'Governance-Freigaben']
          }
        ]
      }

  return (
    <section style={{ minHeight: '100vh', width: '100%', color: '#0e0d1c' }}>
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header
            title={copy.title}
            subtitle={copy.subtitle}
            subtitleColor="rgba(255,255,255,0.82)"
          />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '32px 1.25rem 4rem',
          display: 'grid',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="secondary"
            onClick={() => navigate('/roles/underwriter/reporting')}
            style={{
              background: '#ffffff',
              color: '#0e0d1c',
              borderRadius: '999px',
              border: '1px solid #d9d9d9',
              height: '40px',
              padding: '0 1.25rem',
              fontWeight: 600
            }}
          >
            {copy.cta}
          </Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {copy.sections.map((section) => (
            <Card
              key={section.title}
              title={section.title}
              variant="glass"
              style={{ display: 'flex', flexDirection: 'column', minHeight: '180px' }}
            >
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
