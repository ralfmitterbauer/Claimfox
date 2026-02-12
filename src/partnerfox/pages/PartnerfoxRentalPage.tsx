import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases, listPartners } from '@/partnerfox/api/partnerfoxApi'
import type { Partner, PartnerCase } from '@/partnerfox/types'

export default function PartnerfoxRentalPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [cases, setCases] = useState<PartnerCase[]>([])
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [caseData, partnerData] = await Promise.all([listCases(ctx), listPartners(ctx)])
      if (!mounted) return
      setCases(caseData)
      setPartners(partnerData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const rentalCases = useMemo(() => cases.filter((item) => item.rentalPartnerId), [cases])

  return (
    <PartnerfoxLayout title={t('partnerfox.rental.title')} subtitle={t('partnerfox.rental.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.55rem' }}>
          {rentalCases.map((item) => {
            const rental = partners.find((partner) => partner.id === item.rentalPartnerId)
            const days = Math.max(1, Math.round(item.repairDurationDays * 0.7))
            const cost = days * 68
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(`/partnerfox/cases/${item.id}`)}
                style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem 0.8rem', textAlign: 'left', background: '#fff', cursor: 'pointer', display: 'grid', gap: '0.2rem' }}
              >
                <strong>{item.claimNumber} · {item.vehiclePlate}</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{t('partnerfox.rental.activeRentals')}: {rental?.name ?? '-'}</span>
                <span style={{ fontSize: '0.82rem', color: '#475569' }}>{t('partnerfox.rental.days')}: {days} · {t('partnerfox.rental.cost')}: EUR {cost}</span>
                {days > 7 ? <span style={{ fontSize: '0.82rem', color: '#b45309' }}>{t('partnerfox.rental.slaWarning')}</span> : null}
              </button>
            )
          })}
        </div>
      </Card>
    </PartnerfoxLayout>
  )
}
