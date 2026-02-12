import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listMaintenance, listSafetyAlerts, listVehicles } from '@/fleetfox/api/fleetfoxApi'
import { claimsProbabilityFromRisk } from '@/fleetfox/components/FleetRiskEngine'
import type { MaintenancePrediction, SafetyAlert, Vehicle } from '@/fleetfox/types'

export default function FleetfoxDashboardPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [alerts, setAlerts] = useState<SafetyAlert[]>([])
  const [maintenance, setMaintenance] = useState<MaintenancePrediction[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [vehicleData, alertData, maintenanceData] = await Promise.all([
        listVehicles(ctx),
        listSafetyAlerts(ctx),
        listMaintenance(ctx)
      ])
      if (!mounted) return
      setVehicles(vehicleData)
      setAlerts(alertData)
      setMaintenance(maintenanceData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const kpis = useMemo(() => {
    const safetyAvg = vehicles.reduce((acc, item) => acc + item.safetyScore, 0) / Math.max(vehicles.length, 1)
    const riskAvg = vehicles.reduce((acc, item) => acc + item.riskScore, 0) / Math.max(vehicles.length, 1)
    const maintenanceRisk = maintenance.filter((item) => item.probability > 0.55).length
    const claimsProb = vehicles.reduce((acc, item) => acc + claimsProbabilityFromRisk(item.riskScore), 0) / Math.max(vehicles.length, 1)

    return [
      { label: t('fleetfox.dashboard.kpi.safety'), value: safetyAvg.toFixed(1) },
      { label: t('fleetfox.dashboard.kpi.risk'), value: riskAvg.toFixed(1) },
      { label: t('fleetfox.dashboard.kpi.maintenance'), value: maintenanceRisk.toString() },
      { label: t('fleetfox.dashboard.kpi.claimsProbability'), value: `${Math.round(claimsProb * 100)}%` },
      { label: t('fleetfox.dashboard.kpi.alerts'), value: alerts.length.toString() },
      { label: t('fleetfox.dashboard.kpi.vehicles'), value: vehicles.length.toString() }
    ]
  }, [alerts.length, maintenance, t, vehicles])

  const criticalVehicles = useMemo(() => (
    [...vehicles].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5)
  ), [vehicles])

  return (
    <FleetfoxLayout
      title={t('fleetfox.dashboard.title')}
      subtitle={t('fleetfox.dashboard.subtitle')}
      topLeft={<div style={{ color: '#fff', fontSize: '0.86rem' }}>{t('fleetfox.dashboard.heroHint')}</div>}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} style={{ padding: '1rem', display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{kpi.label}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{kpi.value}</span>
            </Card>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '1.5rem' }}>
          <Card title={t('fleetfox.dashboard.queueTitle')} subtitle={t('fleetfox.dashboard.queueSubtitle')}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {criticalVehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => navigate(`/fleetfox/vehicles/${vehicle.id}`)}
                  style={{
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    borderRadius: 10,
                    padding: '0.65rem 0.8rem',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{vehicle.plate}</span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Risk {vehicle.riskScore}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title={t('fleetfox.dashboard.alertTitle')} subtitle={t('fleetfox.dashboard.alertSubtitle')}>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} style={{ display: 'grid', gap: '0.15rem' }}>
                  <span style={{ fontWeight: 600 }}>{alert.title}</span>
                  <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{alert.description}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </FleetfoxLayout>
  )
}
