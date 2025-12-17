import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'
import BrokerBackground from '@/assets/images/background_broker.png'

export default function BrokerPortalLandingPage() {
  const { t } = useI18n()

  return (
    <section
      className="page"
      style={{
        minHeight: 'calc(100vh - 120px)',
        width: '100%',
        backgroundImage: `url(${BrokerBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '56px',
        paddingBottom: '56px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center'
        }}
      >
        <img
          src={InsurfoxLogoLight}
          alt="Insurfox"
          style={{
            height: '90px',
            maxWidth: '80vw',
            objectFit: 'contain'
          }}
        />
        <h1
          style={{
            margin: 0,
            color: '#ffffff',
            fontSize: '2.75rem',
            lineHeight: 1.2,
            textShadow: '0 6px 20px rgba(0, 0, 0, 0.35)'
          }}
        >
          {t('brokerLanding.title')}
        </h1>
      </div>
    </section>
  )
}
