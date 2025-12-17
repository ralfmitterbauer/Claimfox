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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
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
          background: 'linear-gradient(180deg, rgba(4, 1, 20, 0.8) 0%, rgba(4, 1, 20, 0.4) 60%, rgba(4, 1, 20, 0.8) 100%)',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: '#fff',
          paddingTop: 'calc(var(--header-height, 64px) + 32px)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 'calc(var(--header-height, 64px) + 16px)',
            right: '3vw'
          }}
        >
          <Button
            variant="secondary"
            onClick={() => navigate('/broker-crm')}
            style={{
              borderColor: '#fff',
              color: '#040114',
              background: '#fff',
              fontWeight: 600,
              minWidth: '140px'
            }}
          >
            {t('brokerLanding.login')}
          </Button>
        </div>
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
            fontSize: '1.85rem',
            lineHeight: 1.4,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textShadow: '0 10px 30px rgba(0, 0, 0, 0.45)'
          }}
        >
          {t('brokerLanding.title')}
        </h1>
      </div>
    </div>
  )
}
