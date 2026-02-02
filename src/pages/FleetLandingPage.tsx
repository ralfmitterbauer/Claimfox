import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HomeHeroBackground from '@/assets/images/Home1.png'
import FleetHeroImage from '@/assets/images/flotte_fuhrpark.png'

export default function FleetLandingPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const [isHeroPreviewOpen, setIsHeroPreviewOpen] = React.useState(false)

  const copy = {
    title: lang === 'en' ? 'Fleet Management for Insurers & Logistics.' : 'Flottenmanagement für Versicherer & Logistik.',
    subtitle:
      lang === 'en'
        ? 'Live fleet visibility, risk signals, and claims coordination in one audit-ready platform.'
        : 'Live-Flottenübersicht, Risikosignale und Schadenskoordination in einer audit-fähigen Plattform.',
    sections: [
      {
        title: lang === 'en' ? 'Fleet visibility' : 'Flotten-Transparenz',
        body:
          lang === 'en'
            ? 'Unified monitoring for vehicles, incidents, and operational KPIs.'
            : 'Einheitliches Monitoring für Fahrzeuge, Ereignisse und operative KPIs.'
      },
      {
        title: lang === 'en' ? 'Risk & claims' : 'Risiko & Schaden',
        body:
          lang === 'en'
            ? 'AI-supported triage, cost projections, and partner workflows.'
            : 'KI-gestützte Triage, Kostenprojektionen und Partner-Workflows.'
      },
      {
        title: lang === 'en' ? 'Governance-ready' : 'Governance-ready',
        body:
          lang === 'en'
            ? 'Traceable decisions, role-based access, and data controls.'
            : 'Nachvollziehbare Entscheidungen, rollenbasierter Zugriff und Datenkontrolle.'
      }
    ]
  }

  const roleCards = [
    {
      title: lang === 'en' ? 'Fleet Management' : 'Flottenmanagement',
      body: lang === 'en' ? 'Operational overview of vehicles, incidents and maintenance.' : 'Operativer Überblick über Fahrzeuge, Ereignisse und Wartung.',
      route: '/fleet-management'
    },
    {
      title: lang === 'en' ? 'Fleet Reporting' : 'Fleet Reporting',
      body: lang === 'en' ? 'Performance, loss ratios and compliance reporting.' : 'Performance-, Schaden- und Compliance-Reporting.',
      route: '/fleet-reporting'
    }
  ]

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '0 clamp(1rem, 4vw, 3rem) 4rem',
        color: '#0f172a'
      }}
    >
      <div style={{ width: '100%', maxWidth: 1220, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div
          style={{
            position: 'relative',
            backgroundImage: `url(${HomeHeroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '3.5rem clamp(1.5rem, 4vw, 3.25rem)',
            color: '#ffffff',
            boxShadow: '0 30px 70px rgba(11, 28, 108, 0.25)',
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 1220,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: 0, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
                Insurfox AI IaaS
              </p>
              <h1 style={{ margin: '0.75rem 0 0', fontSize: 'clamp(2.8rem, 5vw, 3.8rem)', fontWeight: 700, color: 'var(--insurfox-orange)', lineHeight: 1.1 }}>
                {copy.title}
              </h1>
              <p style={{ marginTop: '1rem', maxWidth: '720px', color: 'rgba(255,255,255,0.82)', fontSize: '1.2rem' }}>
                {copy.subtitle}
              </p>
              <div style={{ marginTop: '1.4rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button
                  onClick={() => navigate('/fleet-dashboard')}
                  style={{
                    background: '#D4380D',
                    color: '#ffffff',
                    border: '1px solid #D4380D',
                    paddingInline: '1.75rem',
                    fontWeight: 700
                  }}
                  disableHover
                >
                  {lang === 'en' ? 'Dashboard' : 'Dashboard'}
                </Button>
                <Button
                  onClick={() => navigate('/fleet-management')}
                  style={{
                    background: '#ffffff',
                    color: '#D4380D',
                    border: '1px solid #D4380D',
                    paddingInline: '1.75rem',
                    fontWeight: 700
                  }}
                  disableHover
                >
                  {lang === 'en' ? 'Fleet Management' : 'Flottenmanagement'}
                </Button>
              </div>
            </div>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 30px 70px rgba(11, 28, 108, 0.25)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                aspectRatio: '1 / 1',
                maxWidth: '420px',
                width: '100%',
                justifySelf: 'end',
                cursor: 'pointer'
              }}
              onClick={() => setIsHeroPreviewOpen(true)}
              role="button"
              aria-label="Bildvorschau öffnen"
            >
              <img src={FleetHeroImage} alt="Flotte" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          </div>
          <span style={{ position: 'absolute', left: 0, bottom: 0, width: 260, height: 4, background: '#d4380d' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {copy.sections.map((section) => (
            <div
              key={section.title}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(148, 163, 184, 0.16)',
                boxShadow: '0 16px 32px rgba(15, 23, 42, 0.08)'
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem', color: 'var(--insurfox-orange)' }}>{section.title}</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.55 }}>{section.body}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <h2 style={{ margin: '0 0 0.5rem', color: 'var(--insurfox-orange)' }}>
              {lang === 'en' ? 'Fleet roles' : 'Flottenrollen'}
            </h2>
            <p style={{ margin: 0, color: '#475569' }}>
              {lang === 'en'
                ? 'Open the operational fleet modules.'
                : 'Öffnen Sie die operativen Fleet-Module.'}
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {roleCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.route)}
                style={{
                  textAlign: 'left',
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid rgba(148, 163, 184, 0.16)',
                  boxShadow: '0 16px 32px rgba(15, 23, 42, 0.08)',
                  cursor: 'pointer'
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem', color: 'var(--insurfox-orange)' }}>{card.title}</h3>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.55 }}>{card.body}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isHeroPreviewOpen && (
        <div className="hero-image-modal" role="dialog" aria-modal="true">
          <button type="button" className="hero-image-modal__close" onClick={() => setIsHeroPreviewOpen(false)} aria-label="Schließen">
            ×
          </button>
          <div className="hero-image-modal__content">
            <img src={FleetHeroImage} alt="Flotte" />
          </div>
        </div>
      )}
    </section>
  )
}
