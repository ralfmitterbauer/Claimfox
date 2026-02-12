import type {
  Driver,
  FleetAssistantInsight,
  InsuranceAssessment,
  MaintenancePrediction,
  Vehicle,
  VisionEvent
} from '@/fleetfox/types'

const regionWeights: Record<string, number> = {
  Hamburg: 8,
  Berlin: 6,
  Munich: 5,
  'Rhine-Ruhr': 7,
  Leipzig: 4,
  Cologne: 5
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function computeVehicleRiskScore(
  vehicle: Vehicle,
  maintenance: MaintenancePrediction | undefined,
  visionEvents: VisionEvent[]
) {
  const safetyPenalty = (100 - vehicle.safetyScore) * 0.45
  const maintenancePenalty = (maintenance?.probability ?? 0.22) * 34
  const visionPenalty = visionEvents.reduce((acc, event) => {
    if (event.severity === 'critical') return acc + 9
    if (event.severity === 'high') return acc + 6
    if (event.severity === 'medium') return acc + 3
    return acc + 1
  }, 0)
  const mileagePenalty = clamp((vehicle.odometerKm - 80000) / 12000, 0, 10)
  const regionPenalty = regionWeights[vehicle.region] ?? 4

  return clamp(Math.round(safetyPenalty + maintenancePenalty + visionPenalty + mileagePenalty + regionPenalty), 12, 96)
}

export function claimsProbabilityFromRisk(riskScore: number) {
  return clamp(Number((riskScore / 100).toFixed(2)), 0.08, 0.93)
}

export function premiumMultiplierFromRisk(riskScore: number, vehicleType: Vehicle['type']) {
  const typeFactor = vehicleType === 'truck' ? 0.16 : vehicleType === 'van' ? 0.1 : 0.06
  const riskFactor = riskScore / 150
  return Number((1 + typeFactor + riskFactor).toFixed(2))
}

export function buildInsuranceAssessment(
  vehicle: Vehicle,
  maintenance: MaintenancePrediction | undefined,
  visionEvents: VisionEvent[],
  driver: Driver | undefined
): InsuranceAssessment {
  const riskScore = computeVehicleRiskScore(vehicle, maintenance, visionEvents)
  const claimsProbability = claimsProbabilityFromRisk(riskScore)
  const multiplier = premiumMultiplierFromRisk(riskScore, vehicle.type)
  const basePremiumEur = vehicle.type === 'truck' ? 6200 : vehicle.type === 'van' ? 4300 : 3800

  return {
    id: `assessment_${vehicle.id}`,
    tenantId: vehicle.tenantId,
    vehicleId: vehicle.id,
    fleetSegment: `${vehicle.type.toUpperCase()} ${vehicle.region}`,
    basePremiumEur,
    multiplier,
    claimsProbability,
    recommendedActions: [
      'Run distraction coaching for assigned drivers.',
      'Advance brake and tire checks by one cycle.',
      'Activate corridor-specific weather route checks.'
    ],
    explanation: {
      title: 'AI risk explanation',
      bullets: [
        `${driver?.harshBrakingEvents ?? 0} harsh braking events last 7 days`,
        `${visionEvents.length} VisionAI alerts in the current month`,
        `Maintenance probability ${Math.round((maintenance?.probability ?? 0) * 100)}% (${maintenance?.predictedIssue ?? 'general wear'})`,
        `High-risk corridor exposure for ${vehicle.region}`
      ],
      confidence: clamp(Math.round(74 + visionEvents.length * 3 + (maintenance?.probability ?? 0.2) * 20), 71, 95),
      evidenceRefs: [
        'Telematics stream / braking events',
        'VisionAI near-miss detector',
        'Predictive maintenance model v2.3',
        'Route risk map (traffic + weather)'
      ]
    }
  }
}

export function findCriticalVehicles(
  vehicles: Vehicle[],
  maintenanceByVehicleId: Map<string, MaintenancePrediction>,
  visionByVehicleId: Map<string, VisionEvent[]>
): FleetAssistantInsight {
  const ranked = vehicles
    .map((vehicle) => ({
      vehicle,
      score: computeVehicleRiskScore(vehicle, maintenanceByVehicleId.get(vehicle.id), visionByVehicleId.get(vehicle.id) ?? [])
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return {
    title: 'Critical fleet units',
    confidence: 89,
    bullets: ranked.map((entry) => `${entry.vehicle.plate} (${entry.vehicle.region}) - risk score ${entry.score}`),
    evidenceRefs: ['Risk engine v1.0', 'Vision events', 'Maintenance predictors']
  }
}

export function simulateTrainingPremiumReduction(vehicles: Vehicle[]) {
  const avgRisk = vehicles.reduce((acc, vehicle) => acc + vehicle.riskScore, 0) / Math.max(vehicles.length, 1)
  const baselinePremium = 100000 + avgRisk * 700
  const reducedPremium = baselinePremium * 0.93
  return {
    title: 'Premium reduction through training',
    confidence: 84,
    bullets: [
      `Baseline premium: EUR ${Math.round(baselinePremium).toLocaleString('en-US')}`,
      `Projected premium after training: EUR ${Math.round(reducedPremium).toLocaleString('en-US')}`,
      `Delta: EUR ${Math.round(baselinePremium - reducedPremium).toLocaleString('en-US')}`
    ],
    evidenceRefs: ['Driver coaching benchmark', 'Claims trend by driver cohort', 'Loss frequency projection']
  } satisfies FleetAssistantInsight
}

export function routeRiskSummary(averageRouteRisk: number, weatherRisk: number, trafficRisk: number): FleetAssistantInsight {
  return {
    title: 'Route risk summary',
    confidence: 82,
    bullets: [
      `Average route risk score: ${Math.round(averageRouteRisk)}`,
      `Weather contribution: ${Math.round(weatherRisk)} points`,
      `Traffic contribution: ${Math.round(trafficRisk)} points`,
      'Recommendation: shift high-risk departures to off-peak windows.'
    ],
    evidenceRefs: ['Weather feed (demo)', 'Traffic density model', 'Route plan optimizer']
  }
}
