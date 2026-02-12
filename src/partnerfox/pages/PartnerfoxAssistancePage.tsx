import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases, listPartners } from '@/partnerfox/api/partnerfoxApi'
import type { Partner, PartnerCase } from '@/partnerfox/types'

export default function PartnerfoxAssistancePage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [cases, setCases] = useState<PartnerCase[]>([])
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [caseData, partnerData] = await Promise.all([listCases(ctx), listPartners(ctx)])
      if (!mounted) return
      setCases(caseData)
      setPartners(partnerData.filter((item) => item.type === 'assistance'))
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const rows = useMemo(() => cases.slice(0, 10).map((item, idx) => ({
    caseId: item.id,
    claimNumber: item.claimNumber,
    partner: partners[idx % Math.max(partners.length, 1)]?.name ?? '-',
    responseTime: 12 + (idx * 7) % 41,
    slaBreach: idx % 5 === 0
  })), [cases, partners])

  return (
    <PartnerfoxLayout title={t('partnerfox.assistance.title')} subtitle={t('partnerfox.assistance.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.55rem' }}>
          {rows.map((row) => (
            <div key={row.caseId} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem 0.8rem', display: 'grid', gap: '0.2rem' }}>
              <strong>{row.claimNumber}</strong>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{t('partnerfox.assistance.hotline')}: {row.partner}</span>
              <span style={{ fontSize: '0.82rem', color: '#475569' }}>{t('partnerfox.assistance.responseTime')}: {row.responseTime} min</span>
              {row.slaBreach ? <span style={{ fontSize: '0.82rem', color: '#b45309' }}>{t('partnerfox.assistance.slaBreach')}</span> : null}
            </div>
          ))}
        </div>
      </Card>
    </PartnerfoxLayout>
  )
}
