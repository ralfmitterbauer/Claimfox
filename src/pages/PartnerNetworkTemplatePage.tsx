import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

type PartnerNetworkTemplatePageProps = {
  title: string
  subtitle: string
}

const CARD_STYLE: React.CSSProperties = {
  display: 'grid',
  gap: '0.65rem',
  color: '#0e0d1c',
  fontSize: '0.95rem'
}

export default function PartnerNetworkTemplatePage({ title, subtitle }: PartnerNetworkTemplatePageProps) {
  const { t } = useI18n()

  function renderCard(cardKey: string) {
    return (
      <Card
        key={cardKey}
        variant="glass"
        title={t(`partnerManagement.network.cards.${cardKey}.title`)}
        subtitle={t(`partnerManagement.network.cards.${cardKey}.subtitle`)}
      >
        <p style={CARD_STYLE}>{t('partnerManagement.network.placeholder')}</p>
      </Card>
    )
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
          <Header title={title} subtitle={subtitle} subtitleColor="rgba(255,255,255,0.82)" />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '32px 1.25rem 4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="secondary">{t('partnerManagement.network.action')}</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {['overview', 'quality'].map((key) => renderCard(key))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {['documents', 'billing', 'status'].map((key) => renderCard(key))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {['communication', 'openItems'].map((key) => renderCard(key))}
        </div>
      </div>
    </section>
  )
}
