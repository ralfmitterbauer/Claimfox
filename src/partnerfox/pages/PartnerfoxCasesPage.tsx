import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases } from '@/partnerfox/api/partnerfoxApi'
import type { PartnerCase } from '@/partnerfox/types'

export default function PartnerfoxCasesPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [cases, setCases] = useState<PartnerCase[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    let mounted = true
    listCases(ctx).then((data) => {
      if (!mounted) return
      setCases(data)
    })
    return () => { mounted = false }
  }, [ctx])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return cases
    return cases.filter((item) => item.claimNumber.toLowerCase().includes(q) || item.vehiclePlate.toLowerCase().includes(q))
  }, [cases, search])

  return (
    <PartnerfoxLayout title={t('partnerfox.cases.title')} subtitle={t('partnerfox.cases.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('partnerfox.cases.search')}
            style={{ minWidth: 260, maxWidth: 420, padding: '0.5rem 0.65rem', borderRadius: 8, border: '1px solid #dbe3ed' }}
          />

          {filtered.length === 0 ? <div style={{ color: '#64748b' }}>{t('partnerfox.cases.empty')}</div> : null}

          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(`/partnerfox/cases/${item.id}`)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: '0.65rem 0.8rem',
                  background: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'grid',
                  gap: '0.2rem'
                }}
              >
                <strong>{item.claimNumber}</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.vehiclePlate} · {t(`partnerfox.cases.status.${item.status}`)}</span>
                <span style={{ fontSize: '0.82rem', color: '#475569' }}>EUR {item.estimatedCost.toLocaleString()} · {t('partnerfox.cases.directBilling')}: {item.aiApproved ? 'Yes' : 'No'}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </PartnerfoxLayout>
  )
}
