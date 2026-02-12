export type FleetEntityType = 'vehicle' | 'driver' | 'route' | 'maintenance' | 'insurance' | 'vision' | 'calendar' | 'system'

export type VehicleType = 'truck' | 'van' | 'ev'
export type VehicleStatus = 'active' | 'idle' | 'maintenance'

export type Vehicle = {
  id: string
  tenantId: string
  plate: string
  vin: string
  type: VehicleType
  powertrain: 'diesel' | 'hybrid' | 'electric'
  region: string
  status: VehicleStatus
  odometerKm: number
  lastServiceDate: string
  nextServiceDueKm: number
  safetyScore: number
  riskScore: number
  co2KgPer100Km: number
  fuelLPer100Km: number
  evBatteryHealth?: number
  assignedDriverIds: string[]
  tags: string[]
}

export type Driver = {
  id: string
  tenantId: string
  name: string
  licenseClass: string
  baseLocation: string
  experienceYears: number
  safetyScore: number
  riskScore: number
  distractionEvents: number
  harshBrakingEvents: number
  speedingEvents: number
  trainingStatus: 'upToDate' | 'due' | 'overdue'
  assignedVehicleIds: string[]
}

export type SafetyAlert = {
  id: string
  tenantId: string
  vehicleId: string
  driverId?: string
  severity: 'low' | 'medium' | 'high'
  title: string
  description: string
  createdAt: string
}

export type VisionEvent = {
  id: string
  tenantId: string
  vehicleId: string
  driverId?: string
  occurredAt: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  type: string
  summary: string
  clipLabel: string
  evidence: string[]
}

export type RoutePlan = {
  id: string
  tenantId: string
  day: string
  routeName: string
  stops: number
  etaMinutes: number
  riskScore: number
  co2EstimateKg: number
  fuelEstimateL: number
  optimizationSuggestion: string
  evidence: string[]
}

export type MaintenancePrediction = {
  id: string
  tenantId: string
  vehicleId: string
  predictedIssue: string
  probability: number
  costEstimateEur: number
  dueInDays: number
  recommendedAction: string
}

export type InsuranceAssessment = {
  id: string
  tenantId: string
  vehicleId?: string
  fleetSegment: string
  basePremiumEur: number
  multiplier: number
  recommendedActions: string[]
  claimsProbability: number
  explanation: {
    title: string
    bullets: string[]
    confidence: number
    evidenceRefs: string[]
  }
}

export type CalendarEvent = {
  id: string
  tenantId: string
  title: string
  date: string
  location?: string
  entityType?: 'vehicle' | 'driver' | 'route' | 'maintenance' | 'insurance' | 'task'
  entityId?: string
  description?: string
  attendees?: string[]
}

export type TimelineEvent = {
  id: string
  tenantId: string
  entityType: FleetEntityType
  entityId: string
  type: 'system' | 'note' | 'external' | 'status'
  title: string
  message: string
  createdAt: string
  meta?: Record<string, string>
}

export type FleetAssistantInsight = {
  title: string
  confidence: number
  bullets: string[]
  evidenceRefs: string[]
}
