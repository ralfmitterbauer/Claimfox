import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import PartnerTimelineThread from '@/partnerfox/components/PartnerTimelineThread'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { getPartner, listCases, listTimelineEvents } from '@/partnerfox/api/partnerfoxApi'
import type { Partner, PartnerCase, TimelineEvent } from '@/partnerfox/types'

export default function PartnerfoxPartnerDetailPage() {
  const { partnerId } = useParams()
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [partner, setPartner] = useState<Partner | null>(null)
  const [cases, setCases] = useState<PartnerCase[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!partnerId) return
      const [partnerData, caseData, timelineData] = await Promise.all([
        getPartner(ctx, partnerId),
        listCases(ctx),
        listTimelineEvents(ctx, 'partner', partnerId)
      ])
      if (!mounted) return
      setPartner(partnerData)
      setCases(caseData)
      setTimeline(timelineData)
    }
    load()
    return () => { mounted = false }
  }, [ctx, partnerId])

  const relatedCases = useMemo(
    () => cases.filter((item) => item.partnerId === partnerId || item.rentalPartnerId === partnerId || item.towingPartnerId === partnerId),
    [cases, partnerId]
  )

  if (!partner) {
    return <PartnerfoxLayout title={t('partnerfox.partnerDetail.title')} subtitle={t('partnerfox.common.loading')}><Card>{t('partnerfox.common.loading')}</Card></PartnerfoxLayout>
  }

  return (
    <PartnerfoxLayout
      title={`${t('partnerfox.partnerDetail.title')} ${partner.name}`}
      subtitle={`${t(`partnerfox.network.type.${partner.type}`)} · ${partner.networkRegion}`}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.7rem' }}>
            <div>{t('partnerfox.partnerDetail.contact')}: {partner.contactEmail}</div>
            <div>{t('partnerfox.partnerDetail.rating')}: {partner.rating.toFixed(1)} / 5</div>
            <div>{t('partnerfox.partnerDetail.avgRepairDays')}: {partner.avgRepairDays}</div>
            <div>{t('partnerfox.partnerDetail.directBillingEnabled')}: {partner.directBillingEnabled ? 'Yes' : 'No'}</div>
            <div>{t('partnerfox.partnerDetail.performance')}: {partner.performanceScore}</div>
            <div>{t('partnerfox.partnerDetail.casesHandled')}: {partner.casesHandled}</div>
          </div>
        </Card>

        <Card title={t('partnerfox.partnerDetail.relatedCases')}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {relatedCases.slice(0, 8).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(`/partnerfox/cases/${item.id}`)}
                style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.55rem 0.7rem', background: '#fff', textAlign: 'left', cursor: 'pointer' }}
              >
                <strong>{item.claimNumber}</strong>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.vehiclePlate} · {item.status}</div>
              </button>
            ))}
          </div>
        </Card>

        <Card title={t('partnerfox.partnerDetail.timeline')}>
          <PartnerTimelineThread events={timeline} emptyLabel={t('partnerfox.audit.empty')} />
        </Card>
      </div>
    </PartnerfoxLayout>
  )
}
