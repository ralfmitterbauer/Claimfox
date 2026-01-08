import React from 'react'
import { useI18n } from '@/i18n/I18nContext'

export default function MyProfilePage() {
  const { t } = useI18n()
  return (
    <section className="page">
      <h1 className="page-title">{t('profile.title')}</h1>
      <div className="profile-card">
        <p>{t('profile.placeholder')}</p>
      </div>
    </section>
  )
}
