import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'
import BrokerBackground from '@/assets/images/background_broker.png'

export default function BrokerPortalLandingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <section className="page" style={{ padding: 0 }}>
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden'
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
            background:
              'linear-gradient(180deg, rgba(4, 1, 20, 0.85) 0%, rgba(4, 1, 20, 0.45) 60%, rgba(4, 1, 20, 0.75) 100%)'
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            minHeight: '100vh',
            padding: '2.5rem clamp(1.5rem, 4vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            color: '#fff'
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="secondary"
              onClick={() => navigate('/broker-crm')}
              style={{
                borderColor: '#fff',
                color: '#040114',
                background: '#fff',
                fontWeight: 600
              }}
            >
              {t('brokerLanding.login')}
            </Button>
          </div>
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1rem'
            }}
          >
            <img
              src={InsurfoxLogoLight}
              alt="Insurfox"
              style={{
                height: '90px',
                maxWidth: '240px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
            <h1
              style={{
                margin: 0,
                color: '#ffffff',
                fontSize: '2rem',
                lineHeight: 1.3,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textShadow: '0 10px 30px rgba(0, 0, 0, 0.45)'
              }}
            >
              {t('brokerLanding.title')}
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
