import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'
import BrokerBackground from '@/assets/images/background_broker.png'

const featureKeys = ['crm', 'tender', 'ai', 'insights', 'workflows', 'compliance'] as const
const sectorKeys = [
  'carriers',
  'fleet',
  'cargo',
  'logistics',
  'contents',
  'liability',
  'photovoltaic',
  'cyber',
  'do',
  'legal',
  'electronics',
  'machinery',
  'tradeCredit'
] as const
const whyKeys = ['relationship', 'automation', 'compliance'] as const

export default function BrokerPortalLandingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.65rem 1rem',
    borderRadius: '999px',
    background: '#ffffff',
    color: '#0e0d1c',
    border: '1px solid rgba(0,0,0,0.1)',
    fontSize: '0.95rem',
    lineHeight: 1,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        color: '#fff'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${BrokerBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(4, 1, 20, 0.8) 0%, rgba(4, 1, 20, 0.4) 60%, rgba(4, 1, 20, 0.8) 100%)',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 'calc(var(--header-height, 64px) + 16px)',
          right: '3vw',
          zIndex: 2
        }}
      >
        <Button
          onClick={() => navigate('/broker-crm')}
          style={{
            background: '#D3F261',
            color: '#081120',
            border: 'none',
            paddingInline: '1.75rem',
            fontWeight: 700
          }}
        >
          {t('brokerLanding.login')}
        </Button>
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          overflowY: 'auto'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'calc(var(--header-height, 64px) + 48px) clamp(1.5rem, 4vw, 4rem) 64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <img
              src={InsurfoxLogoLight}
              alt="Insurfox"
              style={{
                height: '90px',
                width: 'auto',
                maxWidth: '260px',
                objectFit: 'contain',
                marginBottom: '1.25rem'
              }}
            />
            <h1
              style={{
                margin: 0,
                color: '#ffffff',
                fontSize: '2.4rem',
                lineHeight: 1.3,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textShadow: '0 10px 30px rgba(0, 0, 0, 0.55)'
              }}
            >
              {t('brokerLanding.heroHeadline')}
            </h1>
            <p style={{ marginTop: '0.75rem', maxWidth: '720px', marginInline: 'auto', color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem' }}>
              {t('brokerLanding.heroSubline')}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              {[1, 2, 3].map((line) => (
                <p key={line} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                  {t(`brokerLanding.valueLine${line}`)}
                </p>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.7rem',
                justifyContent: 'flex-start'
              }}
            >
              {(['coverage', 'automation', 'retention'] as const).map((key) => (
                <span key={key} style={{ ...chipStyle }}>
                  {t(`brokerLanding.heroStats.${key}`)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <header style={{ marginBottom: '1rem' }}>
              <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, color: '#d0caff' }}>
                {t('brokerLanding.featureSectionSubtitle')}
              </p>
              <h2 style={{ margin: '0.35rem 0 0', fontSize: '1.9rem' }}>{t('brokerLanding.featureSectionTitle')}</h2>
            </header>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.7rem'
              }}
            >
              {featureKeys.map((key) => (
                <span key={key} style={{ ...chipStyle }}>
                  {t(`brokerLanding.features.${key}`)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: '1.7rem' }}>{t('brokerLanding.sectorsTitle')}</h3>
            <p style={{ marginTop: '0.35rem', color: 'rgba(255,255,255,0.85)' }}>{t('brokerLanding.sectorsSubtitle')}</p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                marginTop: '1rem'
              }}
            >
              {sectorKeys.map((key) => (
                <span key={key} style={{ ...chipStyle }}>
                  {t(`brokerLanding.sectorsList.${key}`)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: '1.75rem' }}>{t('brokerLanding.whyTitle')}</h3>
            <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.85)' }}>{t('brokerLanding.whySubtitle')}</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                marginTop: '1.25rem'
              }}
            >
              {whyKeys.map((key) => (
                <div
                  key={key}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '18px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    minHeight: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(255,255,255,0.95)'
                  }}
                >
                  {t(`brokerLanding.whyItems.${key}`)}
                </div>
              ))}
            </div>
          </div>

          <div />
        </div>
      </div>
    </div>
  )
}
