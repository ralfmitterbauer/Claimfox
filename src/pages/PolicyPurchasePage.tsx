import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'

export default function PolicyPurchasePage() {
  const { t } = useI18n()

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('policyPurchase.title')} subtitle={t('policyPurchase.subtitle')} subtitleColor="#65748b" />
        <Card>
          <p style={{ margin: 0, color: '#475569' }}>{t('policyPurchase.placeholder')}</p>
        </Card>
      </div>
    </section>
  )
}
