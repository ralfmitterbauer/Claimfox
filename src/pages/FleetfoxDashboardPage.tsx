import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { getFleetCostSummary, listMaintenance, listSafetyAlerts, listVehicles } from '@/fleetfox/api/fleetfoxApi'
import { claimsProbabilityFromRisk } from '@/fleetfox/ai/fleetRiskEngine'
import type { FleetCostSummary, MaintenanceEvent, SafetyAlert, Vehicle } from '@/fleetfox/types'

export default function FleetfoxDashboardPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [alerts, setAlerts] = useState<SafetyAlert[]>([])
  const [maintenance, setMaintenance] = useState<MaintenanceEvent[]>([])
  const [costs, setCosts] = useState<FleetCostSummary>({ fuelCost: 0, maintenanceCost: 0, insuranceCost: 0, totalCost: 0, costPerKm: 0 })
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const numberFormatter = new Intl.NumberFormat(locale)
  const oneDecimalFormatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  const twoDecimalFormatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const currencyFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

  function localizeMaintenanceType(value: MaintenanceEvent['type']) {
    if (lang === 'de') {
      if (value === 'Inspection') return 'Inspektion'
      if (value === 'Brake') return 'Bremsen'
      if (value === 'Engine') return 'Motor'
      if (value === 'Tire') return 'Reifen'
      if (value === 'Battery') return 'Batterie'
    }
    return value
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      const [vehicleData, alertData, maintenanceData, costData] = await Promise.all([
        listVehicles(ctx),
        listSafetyAlerts(ctx),
        listMaintenance(ctx),
        getFleetCostSummary(ctx)
      ])
      if (!mounted) return
      setVehicles(vehicleData)
      setAlerts(alertData)
      setMaintenance(maintenanceData)
      setCosts(costData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const kpis = useMemo(() => {
    const safetyAvg = vehicles.reduce((acc, item) => acc + item.safetyScore, 0) / Math.max(vehicles.length, 1)
    const riskAvg = vehicles.reduce((acc, item) => acc + item.riskScore, 0) / Math.max(vehicles.length, 1)
    const maintenanceRisk = vehicles.filter((item) => item.maintenanceRisk === 'High').length
    const claimsProb = vehicles.reduce((acc, item) => acc + claimsProbabilityFromRisk(item.riskScore), 0) / Math.max(vehicles.length, 1)

    return [
      { label: t('fleetfox.dashboard.kpi.safety'), value: oneDecimalFormatter.format(safetyAvg) },
      { label: t('fleetfox.dashboard.kpi.risk'), value: oneDecimalFormatter.format(riskAvg) },
      { label: t('fleetfox.dashboard.kpi.maintenance'), value: numberFormatter.format(maintenanceRisk) },
      { label: t('fleetfox.dashboard.kpi.claimsProbability'), value: `${numberFormatter.format(Math.round(claimsProb * 100))}%` },
      { label: t('fleetfox.dashboard.kpi.alerts'), value: numberFormatter.format(alerts.length) },
      { label: t('fleetfox.dashboard.kpi.vehicles'), value: numberFormatter.format(vehicles.length) }
    ]
  }, [alerts.length, numberFormatter, oneDecimalFormatter, t, vehicles])

  const criticalVehicles = useMemo(() => [...vehicles].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5), [vehicles])

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

        <Card title={t('fleetfox.costs.title')} subtitle={t('fleetfox.costs.subtitle')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.8rem' }}>
            <div><strong>{t('fleetfox.costs.total')}</strong><div>{currencyFormatter.format(costs.totalCost)}</div></div>
            <div><strong>{t('fleetfox.costs.perVehicle')}</strong><div>{currencyFormatter.format(Math.round(costs.totalCost / Math.max(vehicles.length, 1)))}</div></div>
            <div><strong>{t('fleetfox.costs.perKm')}</strong><div>{twoDecimalFormatter.format(costs.costPerKm)} EUR</div></div>
            <div><strong>{t('fleetfox.costs.maintenance')}</strong><div>{currencyFormatter.format(costs.maintenanceCost)}</div></div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '1.5rem' }}>
          <Card title={t('fleetfox.dashboard.queueTitle')} subtitle={t('fleetfox.dashboard.queueSubtitle')}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {criticalVehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => navigate(`/fleetfox/vehicles/${vehicle.id}`)}
                  style={{ border: '1px solid #e2e8f0', background: '#fff', borderRadius: 10, padding: '0.65rem 0.8rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <span style={{ fontWeight: 600 }}>{vehicle.licensePlate}</span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{lang === 'de' ? 'Risiko' : 'Risk'} {numberFormatter.format(vehicle.riskScore)}</span>
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

        <Card title={t('fleetfox.maintenance.title')} subtitle={t('fleetfox.maintenance.subtitle')}>
          <div style={{ display: 'grid', gap: '0.45rem' }}>
            {maintenance.slice(0, 5).map((item) => (
              <div key={item.id} style={{ color: '#475569' }}>{localizeMaintenanceType(item.type)} · {currencyFormatter.format(item.cost)} · {item.aiPredicted ? 'AI' : lang === 'de' ? 'Manuell' : 'Manual'}</div>
            ))}
          </div>
        </Card>
      </div>
    </FleetfoxLayout>
  )
}
