import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useAuth } from '@/features/auth/AuthContext'
import { useI18n } from '@/i18n/I18nContext'

const ROLE_KEYS = ['claims', 'partner', 'reporting'] as const

export default function RolesPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useI18n()

  function handleLogout() {
    logout()
    navigate('/home', { replace: true })
  }

  return (
    <section className="page" style={{ gap: '2rem' }}>
      <Header
        title={t('roles.title')}
        subtitle={t('roles.subtitle')}
        actions={
          <Button variant="secondary" onClick={handleLogout}>
            {t('roles.logout')}
          </Button>
        }
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {ROLE_KEYS.map((key) => (
          <Card key={key} title={t(`roles.cards.${key}.title`)}>
            <p style={{ marginTop: 0, color: '#494870', minHeight: '3rem' }}>
              {t(`roles.cards.${key}.description`)}
            </p>
            <Button style={{ width: '100%' }}>{t('roles.view')}</Button>
          </Card>
        ))}
        <Card
          title={t('roles.registrationCardTitle')}
          subtitle={t('roles.registrationCardSubtitle')}
          interactive
          onClick={() => navigate('/registration')}
        >
          <Button
            style={{ width: '100%' }}
            onClick={(event) => {
              event.stopPropagation()
              navigate('/registration')
            }}
          >
            {t('roles.startJourney')}
          </Button>
        </Card>
        <Card
          title={t('roles.brokerPortal')}
          interactive
          onClick={() => navigate('/broker-portal')}
        >
          <p style={{ marginTop: 0, color: '#494870', minHeight: '3rem' }}>
            {t('roles.brokerPortal')}
          </p>
          <Button
            style={{ width: '100%' }}
            onClick={(event) => {
              event.stopPropagation()
              navigate('/broker-portal')
            }}
          >
            {t('roles.view')}
          </Button>
        </Card>
      </div>
    </section>
  )
}
