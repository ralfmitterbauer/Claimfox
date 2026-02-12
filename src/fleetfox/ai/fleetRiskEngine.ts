import type {
  Driver,
  FleetAssistantInsight,
  InsuranceAssessment,
  MaintenanceRisk,
  TelematicsSnapshot,
  Vehicle,
  VisionEvent
} from '@/fleetfox/types'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function calculateDriverRisk(driver: Driver, telematics: TelematicsSnapshot[]) {
  const harshEvents = telematics.filter((row) => row.harshBraking || row.harshAcceleration).length
  const serviceOverduePenalty = 0
  const riskScore = clamp(100 - harshEvents * 5 - driver.incidentsCount * 8 - serviceOverduePenalty, 8, 99)
  const category = riskScore >= 75 ? 'Low' : riskScore >= 50 ? 'Medium' : 'High'
  return { riskScore, category, harshEvents }
}

export function calculateMaintenanceRisk(vehicle: Vehicle): MaintenanceRisk {
  if (vehicle.mileageKm > vehicle.nextServiceDueKm) return 'High'
  if (vehicle.nextServiceDueKm - vehicle.mileageKm < 9000) return 'Medium'
  return 'Low'
}

export function predictServiceDate(vehicle: Vehicle) {
  const kmGap = Math.max(vehicle.nextServiceDueKm - vehicle.mileageKm, 0)
  const avgMonthlyKm = 6200
  const months = kmGap / avgMonthlyKm
  const date = new Date()
  date.setDate(date.getDate() + Math.round(months * 30))
  return date.toISOString()
}

export function claimsProbabilityFromRisk(riskScore: number) {
  return clamp(Number((riskScore / 100).toFixed(2)), 0.07, 0.94)
}

export function premiumMultiplierFromRisk(riskScore: number, fuelType: Vehicle['fuelType']) {
  const fuelFactor = fuelType === 'Diesel' ? 0.16 : fuelType === 'Hybrid' ? 0.1 : 0.06
  const riskFactor = riskScore / 155
  return Number((1 + fuelFactor + riskFactor).toFixed(2))
}

export function buildInsuranceAssessment(
  vehicle: Vehicle,
  driver: Driver | undefined,
  telematics: TelematicsSnapshot[],
  visionEvents: VisionEvent[]
): InsuranceAssessment {
  const driverRisk = calculateDriverRisk(driver ?? {
    id: 'unknown',
    tenantId: vehicle.tenantId,
    firstName: 'Unknown',
    lastName: 'Driver',
    birthDate: '1990-01-01',
    address: { street: '-', zip: '-', city: '-', country: '-' },
    phone: '-',
    email: '-',
    licenseNumber: '-',
    licenseValidUntil: '2030-01-01',
    licenseClass: 'B',
    hireDate: '2020-01-01',
    riskScore: 60,
    safetyScore: 70,
    ecoScore: 60,
    incidentsCount: 0
  }, telematics)

  const riskScore = clamp(Math.round((driverRisk.riskScore * 0.55 + vehicle.riskScore * 0.45) - visionEvents.length * 2), 8, 98)
  const claimsProbability = claimsProbabilityFromRisk(riskScore)
  const multiplier = premiumMultiplierFromRisk(riskScore, vehicle.fuelType)

  return {
    id: `assessment_${vehicle.id}`,
    tenantId: vehicle.tenantId,
    vehicleId: vehicle.id,
    fleetSegment: `${vehicle.manufacturer} ${vehicle.model}`,
    basePremiumEur: vehicle.totalWeightKg > 12000 ? 6200 : 4300,
    multiplier,
    claimsProbability,
    recommendedActions: [
      'Run driver coaching on harsh events and distraction patterns.',
      'Close open service tasks before next high-mileage route.',
      'Apply weather corridor controls for high-risk routes.'
    ],
    explanation: {
      title: 'AI risk explanation',
      bullets: [
        `${driverRisk.harshEvents} harsh events in recent telematics snapshots`,
        `${driver?.incidentsCount ?? 0} incidents in driver history`,
        `Service due gap ${(vehicle.nextServiceDueKm - vehicle.mileageKm).toLocaleString()} km`,
        `${visionEvents.length} VisionAI alerts linked to this vehicle`
      ],
      confidence: clamp(Math.round(76 + visionEvents.length * 2), 72, 95),
      evidenceRefs: [
        'Telematics event stream',
        'Driver incident history',
        'Maintenance due model',
        'Vision event detector'
      ]
    }
  }
}

export function findCriticalVehicles(
  vehicles: Vehicle[],
  driversByVehicleId: Map<string, Driver | undefined>,
  telematicsByVehicleId: Map<string, TelematicsSnapshot[]>
): FleetAssistantInsight {
  const ranked = vehicles
    .map((vehicle) => {
      const driver = driversByVehicleId.get(vehicle.id)
      const score = calculateDriverRisk(driver ?? {
        id: 'unknown', tenantId: vehicle.tenantId, firstName: 'Unknown', lastName: 'Driver', birthDate: '1990-01-01',
        address: { street: '-', zip: '-', city: '-', country: '-' }, phone: '-', email: '-', licenseNumber: '-',
        licenseValidUntil: '2030-01-01', licenseClass: 'B', hireDate: '2020-01-01', riskScore: 60, safetyScore: 70, ecoScore: 60, incidentsCount: 0
      }, telematicsByVehicleId.get(vehicle.id) ?? []).riskScore
      return { vehicle, score }
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)

  return {
    title: 'Critical fleet units',
    confidence: 88,
    bullets: ranked.map((entry) => `${entry.vehicle.licensePlate} (${entry.vehicle.model}) - risk score ${entry.score}`),
    evidenceRefs: ['Driver risk engine', 'Telematics harsh events', 'Service due status']
  }
}

export function simulateTrainingPremiumReduction(vehicles: Vehicle[]) {
  const avgRisk = vehicles.reduce((acc, vehicle) => acc + vehicle.riskScore, 0) / Math.max(vehicles.length, 1)
  const baseline = 120000 + avgRisk * 620
  const improved = baseline * 0.92
  return {
    title: 'Premium reduction through training',
    confidence: 83,
    bullets: [
      `Baseline premium: EUR ${Math.round(baseline).toLocaleString('en-US')}`,
      `Projected premium after training: EUR ${Math.round(improved).toLocaleString('en-US')}`,
      `Delta: EUR ${Math.round(baseline - improved).toLocaleString('en-US')}`
    ],
    evidenceRefs: ['Driver training benchmark', 'Loss frequency trend', 'Pricing simulation']
  }
}

export function routeRiskSummary(averageRouteRisk: number, weatherRisk: number, trafficRisk: number) {
  return {
    title: 'Route risk summary',
    confidence: 82,
    bullets: [
      `Average route risk score: ${Math.round(averageRouteRisk)}`,
      `Weather contribution: ${Math.round(weatherRisk)} points`,
      `Traffic contribution: ${Math.round(trafficRisk)} points`,
      'Recommendation: move critical departures to lower congestion windows.'
    ],
    evidenceRefs: ['Weather risk feed', 'Traffic risk map', 'Route optimizer']
  }
}

export function evaluateVehicleRiskPanel(
  vehicle: Vehicle,
  driver: Driver | undefined,
  telematics: TelematicsSnapshot[]
) {
  const harshEvents = telematics.filter((row) => row.harshAcceleration || row.harshBraking).length
  const serviceOverduePenalty = vehicle.mileageKm > vehicle.nextServiceDueKm ? 12 : 0
  const incidents = driver?.incidentsCount ?? 0
  const riskScore = clamp(100 - harshEvents * 5 - incidents * 8 - serviceOverduePenalty, 5, 98)
  const riskCategory = riskScore >= 75 ? 'Low' : riskScore >= 50 ? 'Medium' : 'High'
  const premiumImpact = riskScore >= 75 ? '-4%' : riskScore >= 50 ? '+3%' : '+11%'
  const recommendation = riskCategory === 'Low'
    ? 'Maintain current control set and continue eco coaching cadence.'
    : riskCategory === 'Medium'
      ? 'Add targeted coaching and tighten route compliance monitoring.'
      : 'Immediate intervention: service + coaching + underwriting review.'
  return { riskScore, riskCategory, recommendation, premiumImpact, harshEvents, serviceOverduePenalty }
}
