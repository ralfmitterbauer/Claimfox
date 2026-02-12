import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listVehicles } from '@/fleetfox/api/fleetfoxApi'
import type { Vehicle } from '@/fleetfox/types'

export default function FleetfoxVehiclesPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | Vehicle['status']>('all')

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listVehicles(ctx)
      if (!mounted) return
      setVehicles(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const filtered = useMemo(() => (
    vehicles.filter((vehicle) => {
      const matchesStatus = status === 'all' || vehicle.status === status
      const query = search.trim().toLowerCase()
      const matchesSearch = !query || `${vehicle.plate} ${vehicle.vin} ${vehicle.region}`.toLowerCase().includes(query)
      return matchesStatus && matchesSearch
    })
  ), [search, status, vehicles])

  return (
    <FleetfoxLayout title={t('fleetfox.vehicles.title')} subtitle={t('fleetfox.vehicles.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('fleetfox.vehicles.search')}
              style={{ padding: '0.5rem 0.65rem', borderRadius: 10, border: '1px solid #e2e8f0', minWidth: 220 }}
            />
            <select value={status} onChange={(event) => setStatus(event.target.value as 'all' | Vehicle['status'])} style={{ padding: '0.5rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <option value="all">{t('fleetfox.common.all')}</option>
              <option value="active">{t('fleetfox.vehicles.status.active')}</option>
              <option value="idle">{t('fleetfox.vehicles.status.idle')}</option>
              <option value="maintenance">{t('fleetfox.vehicles.status.maintenance')}</option>
            </select>
          </div>

          {filtered.length === 0 ? <div style={{ color: '#64748b' }}>{t('fleetfox.vehicles.empty')}</div> : null}

          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {filtered.map((vehicle) => (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => navigate(`/fleetfox/vehicles/${vehicle.id}`)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  background: '#fff',
                  padding: '0.7rem 0.8rem',
                  display: 'grid',
                  gap: '0.2rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem' }}>
                  <strong>{vehicle.plate}</strong>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{t(`fleetfox.vehicles.status.${vehicle.status}`)}</span>
                </div>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>{vehicle.region} · {vehicle.type.toUpperCase()} · {vehicle.odometerKm.toLocaleString()} km</span>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </FleetfoxLayout>
  )
}
