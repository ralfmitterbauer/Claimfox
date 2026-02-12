import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listPartners } from '@/partnerfox/api/partnerfoxApi'
import type { Partner } from '@/partnerfox/types'

export default function PartnerfoxNetworkPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [partners, setPartners] = useState<Partner[]>([])
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | Partner['type']>('all')

  useEffect(() => {
    let mounted = true
    listPartners(ctx).then((data) => {
      if (!mounted) return
      setPartners(data)
    })
    return () => { mounted = false }
  }, [ctx])

  const filtered = useMemo(() => partners.filter((item) => {
    if (typeFilter !== 'all' && item.type !== typeFilter) return false
    const q = search.trim().toLowerCase()
    if (!q) return true
    return item.name.toLowerCase().includes(q) || item.networkRegion.toLowerCase().includes(q)
  }), [partners, search, typeFilter])

  return (
    <PartnerfoxLayout title={t('partnerfox.network.title')} subtitle={t('partnerfox.network.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('partnerfox.network.search')}
              style={{ minWidth: 260, padding: '0.5rem 0.65rem', borderRadius: 8, border: '1px solid #dbe3ed' }}
            />
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as 'all' | Partner['type'])} style={{ padding: '0.5rem 0.65rem', borderRadius: 8, border: '1px solid #dbe3ed' }}>
              <option value="all">{t('partnerfox.common.all')}</option>
              <option value="workshop">{t('partnerfox.network.type.workshop')}</option>
              <option value="rental">{t('partnerfox.network.type.rental')}</option>
              <option value="towing">{t('partnerfox.network.type.towing')}</option>
              <option value="glass">{t('partnerfox.network.type.glass')}</option>
              <option value="assistance">{t('partnerfox.network.type.assistance')}</option>
            </select>
          </div>

          {filtered.length === 0 ? <div style={{ color: '#64748b' }}>{t('partnerfox.network.empty')}</div> : null}

          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(`/partnerfox/network/${item.id}`)}
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
                <strong>{item.name}</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  {t(`partnerfox.network.type.${item.type}`)} · {item.networkRegion} · {item.rating.toFixed(1)} / 5
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </PartnerfoxLayout>
  )
}
