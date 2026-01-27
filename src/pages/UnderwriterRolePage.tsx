import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'
import { useNavigate } from 'react-router-dom'

export default function UnderwriterRolePage() {
  const { lang } = useI18n()
  const navigate = useNavigate()

  const copy = lang === 'en'
    ? {
        title: 'Underwriter',
        subtitle: 'Portfolio steering, underwriting corridors and clear referral logic within the carrier framework.',
        rolesTitle: 'Roles & access levels',
        roles: [
          {
            title: 'Junior Underwriter',
            body: 'Lower authority with more referrals. Guided corridor checks and escalation triggers.',
            route: '/roles/underwriter/junior'
          },
          {
            title: 'Senior Underwriter',
            body: 'Expanded limits with mandatory override reason and governance sign-off.',
            route: '/roles/underwriter/senior'
          },
          {
            title: 'Carrier UW',
            body: 'Read-only portfolio view with final approval authority.',
            route: '/roles/underwriter/carrier'
          },
          {
            title: 'Compliance',
            body: 'Audit log access and governance oversight across decisions.',
            route: '/roles/underwriter/compliance'
          }
        ],
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
        rolesTitle: 'Rollen & Zugriffslevel',
        roles: [
          {
            title: 'Junior Underwriter',
            body: 'Weniger Authority mit mehr Referrals. Geführte Korridor-Checks und Eskalationslogik.',
            route: '/roles/underwriter/junior'
          },
          {
            title: 'Senior Underwriter',
            body: 'Erweiterte Limits mit Pflicht zur Override-Begründung und Governance-Sign-off.',
            route: '/roles/underwriter/senior'
          },
          {
            title: 'Carrier UW',
            body: 'Read-only Portfolio-View mit finaler Approval-Authority.',
            route: '/roles/underwriter/carrier'
          },
          {
            title: 'Compliance',
            body: 'Audit-Log-Zugriff und Governance-Überblick über Entscheidungen.',
            route: '/roles/underwriter/compliance'
          }
        ],
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
        <div style={{ display: 'grid', gap: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#0e0d1c' }}>{copy.rolesTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {copy.roles.map((role) => (
              <Card
                key={role.title}
                title={role.title}
                variant="glass"
                interactive
                onClick={() => navigate(role.route)}
                style={{ display: 'flex', flexDirection: 'column', minHeight: '170px' }}
              >
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.5 }}>{role.body}</p>
              </Card>
            ))}
          </div>
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
