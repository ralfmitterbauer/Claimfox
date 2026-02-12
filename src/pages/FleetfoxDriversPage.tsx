import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listDrivers } from '@/fleetfox/api/fleetfoxApi'
import type { Driver } from '@/fleetfox/types'

export default function FleetfoxDriversPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listDrivers(ctx)
      if (!mounted) return
      setDrivers(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return drivers
    return drivers.filter((driver) => `${driver.name} ${driver.baseLocation}`.toLowerCase().includes(q))
  }, [drivers, query])

  return (
    <FleetfoxLayout title={t('fleetfox.drivers.title')} subtitle={t('fleetfox.drivers.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('fleetfox.drivers.search')}
            style={{ padding: '0.5rem 0.65rem', borderRadius: 10, border: '1px solid #e2e8f0', maxWidth: 320 }}
          />

          {filtered.length === 0 ? <div style={{ color: '#64748b' }}>{t('fleetfox.drivers.empty')}</div> : null}

          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {filtered.map((driver) => (
              <button
                key={driver.id}
                type="button"
                onClick={() => navigate(`/fleetfox/drivers/${driver.id}`)}
                style={{ border: '1px solid #e2e8f0', borderRadius: 12, background: '#fff', padding: '0.7rem 0.8rem', textAlign: 'left', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{driver.name}</strong>
                  <span style={{ fontSize: '0.84rem', color: '#64748b' }}>{driver.licenseClass}</span>
                </div>
                <div style={{ fontSize: '0.84rem', color: '#64748b' }}>{driver.baseLocation} · Safety {driver.safetyScore}</div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </FleetfoxLayout>
  )
}
