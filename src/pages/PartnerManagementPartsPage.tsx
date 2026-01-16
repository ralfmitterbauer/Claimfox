import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import PartnerNetworkTemplatePage from '@/pages/PartnerNetworkTemplatePage'

export default function PartnerManagementPartsPage() {
  const { t } = useI18n()
  return (
    <PartnerNetworkTemplatePage
      title={t('partnerManagement.overview.items.parts.title')}
      subtitle={t('partnerManagement.overview.items.parts.description')}
    />
  )
}
