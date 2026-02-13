import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { getFleetCostSummary, listMaintenance, listRoutes, listVehicles } from '@/fleetfox/api/fleetfoxApi'
import { claimsProbabilityFromRisk } from '@/fleetfox/ai/fleetRiskEngine'
import type { FleetCostSummary, MaintenanceEvent, Route, Vehicle } from '@/fleetfox/types'

export default function FleetfoxReportingPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [maintenance, setMaintenance] = useState<MaintenanceEvent[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [costSummary, setCostSummary] = useState<FleetCostSummary>({ fuelCost: 0, maintenanceCost: 0, insuranceCost: 0, totalCost: 0, costPerKm: 0 })
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const numberFormatter = new Intl.NumberFormat(locale)
  const oneDecimalFormatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  const twoDecimalFormatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const currencyFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
  const currencyCompactFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', minimumFractionDigits: 1, maximumFractionDigits: 1 })

  function localizeFuelType(value: Vehicle['fuelType']) {
    if (lang === 'de') {
      if (value === 'Diesel') return 'Diesel'
      if (value === 'Hybrid') return 'Hybrid'
      if (value === 'Electric') return 'Elektro'
    }
    return value
  }

  function localizeStatus(value: Vehicle['status']) {
    if (lang === 'de') {
      if (value === 'active') return 'aktiv'
      if (value === 'idle') return 'Leerlauf'
      if (value === 'maintenance') return 'Wartung'
    }
    return value
  }

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
      const [vehicleData, maintenanceData, routeData, costData] = await Promise.all([
        listVehicles(ctx),
        listMaintenance(ctx),
        listRoutes(ctx),
        getFleetCostSummary(ctx)
      ])
      if (!mounted) return
      setVehicles(vehicleData)
      setMaintenance(maintenanceData)
      setRoutes(routeData)
      setCostSummary(costData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const kpis = useMemo(() => {
    const avgSafety = vehicles.reduce((acc, item) => acc + item.safetyScore, 0) / Math.max(vehicles.length, 1)
    const avgRisk = vehicles.reduce((acc, item) => acc + item.riskScore, 0) / Math.max(vehicles.length, 1)
    const maintRisk = vehicles.filter((item) => item.maintenanceRisk === 'High').length
    const claims = vehicles.reduce((acc, item) => acc + claimsProbabilityFromRisk(item.riskScore), 0) / Math.max(vehicles.length, 1)
    const co2Estimate = routes.reduce((acc, item) => acc + item.distanceKm * 0.89, 0)
    const fuelTrend = routes.reduce((acc, item) => acc + item.distanceKm * 0.31, 0) / Math.max(routes.length, 1)

    return [
      { label: t('fleetfox.reporting.kpi.safety'), value: oneDecimalFormatter.format(avgSafety) },
      { label: t('fleetfox.reporting.kpi.risk'), value: oneDecimalFormatter.format(avgRisk) },
      { label: t('fleetfox.reporting.kpi.maintenance'), value: numberFormatter.format(maintRisk) },
      { label: t('fleetfox.reporting.kpi.claims'), value: `${numberFormatter.format(Math.round(claims * 100))}%` },
      { label: t('fleetfox.reporting.kpi.co2'), value: `${numberFormatter.format(Math.round(co2Estimate))} kg` },
      { label: t('fleetfox.reporting.kpi.fuel'), value: currencyCompactFormatter.format(fuelTrend) }
    ]
  }, [currencyCompactFormatter, numberFormatter, oneDecimalFormatter, routes, t, vehicles])

  const riskByFuel = useMemo(() => {
    const fuels: Vehicle['fuelType'][] = ['Diesel', 'Hybrid', 'Electric']
    return fuels.map((fuel) => {
      const bucket = vehicles.filter((vehicle) => vehicle.fuelType === fuel)
      const avgRisk = bucket.reduce((acc, item) => acc + item.riskScore, 0) / Math.max(bucket.length, 1)
      return { name: localizeFuelType(fuel), value: Number(avgRisk.toFixed(1)) }
    })
  }, [lang, vehicles])

  const statusData = useMemo(() => {
    const statuses: Vehicle['status'][] = ['active', 'idle', 'maintenance']
    return statuses.map((status) => ({ name: localizeStatus(status), value: vehicles.filter((vehicle) => vehicle.status === status).length }))
  }, [lang, vehicles])

  const maintenanceTrend = useMemo(() => {
    const typeOrder: MaintenanceEvent['type'][] = ['Inspection', 'Brake', 'Engine', 'Tire', 'Battery']
    return typeOrder.map((type) => ({ type: localizeMaintenanceType(type), cost: maintenance.filter((item) => item.type === type).reduce((acc, row) => acc + row.cost, 0) }))
  }, [lang, maintenance])

  const topRisk = useMemo(() => [...vehicles].sort((a, b) => b.riskScore - a.riskScore).slice(0, 8), [vehicles])

  return (
    <FleetfoxLayout title={t('fleetfox.reporting.title')} subtitle={t('fleetfox.reporting.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} style={{ padding: '1rem', display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{kpi.label}</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>{kpi.value}</span>
            </Card>
          ))}
        </div>

        <Card title={t('fleetfox.costs.title')} subtitle={t('fleetfox.costs.subtitle')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.8rem' }}>
            <div>{t('fleetfox.costs.total')}: {currencyFormatter.format(costSummary.totalCost)}</div>
            <div>{t('fleetfox.costs.perVehicle')}: {currencyFormatter.format(Math.round(costSummary.totalCost / Math.max(vehicles.length, 1)))}</div>
            <div>{t('fleetfox.costs.perKm')}: {twoDecimalFormatter.format(costSummary.costPerKm)} EUR</div>
            <div>{t('fleetfox.costs.fuel')}: {currencyFormatter.format(costSummary.fuelCost)}</div>
            <div>{t('fleetfox.costs.maintenance')}: {currencyFormatter.format(costSummary.maintenanceCost)}</div>
            <div>{t('fleetfox.costs.insurance')}: {currencyFormatter.format(costSummary.insuranceCost)}</div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
          <Card title={t('fleetfox.reporting.riskChartTitle')}>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskByFuel}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#d4380d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title={t('fleetfox.reporting.statusChartTitle')}>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={86} fill="#d4380d" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card title={t('fleetfox.reporting.maintenanceTrend')}>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maintenanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#d4380d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('fleetfox.reporting.tableTitle')}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0', paddingBottom: 8 }}>{t('fleetfox.reporting.table.vehicle')}</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0', paddingBottom: 8 }}>{t('fleetfox.reporting.table.region')}</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0', paddingBottom: 8 }}>{t('fleetfox.reporting.table.risk')}</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0', paddingBottom: 8 }}>{t('fleetfox.reporting.table.safety')}</th>
              </tr>
            </thead>
            <tbody>
              {topRisk.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td style={{ padding: '0.55rem 0' }}>{vehicle.licensePlate}</td>
                  <td>{vehicle.region}</td>
                  <td>{vehicle.riskScore}</td>
                  <td>{vehicle.safetyScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </FleetfoxLayout>
  )
}
