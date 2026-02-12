export type FleetEntityType = 'vehicle' | 'driver' | 'route' | 'maintenance' | 'insurance' | 'vision' | 'calendar' | 'system'

export type MaintenanceRisk = 'Low' | 'Medium' | 'High'

export type Driver = {
  id: string
  tenantId: string
  firstName: string
  lastName: string
  birthDate: string
  address: {
    street: string
    zip: string
    city: string
    country: string
  }
  phone: string
  email: string
  licenseNumber: string
  licenseValidUntil: string
  licenseClass: 'B' | 'C' | 'CE'
  hireDate: string
  riskScore: number
  safetyScore: number
  ecoScore: number
  incidentsCount: number
  activeVehicleId?: string
}

export type Vehicle = {
  id: string
  tenantId: string
  vin: string
  licensePlate: string
  manufacturer: string
  model: string
  year: number
  color: string
  fuelType: 'Diesel' | 'Electric' | 'Hybrid'
  enginePowerHP: number
  totalWeightKg: number
  payloadKg: number
  axleCount: number
  purchaseDate: string
  mileageKm: number
  lastServiceDate: string
  nextServiceDueKm: number
  maintenanceRisk: MaintenanceRisk
  telematicsDeviceId: string
  assignedDriverId?: string
  region: string
  status: 'active' | 'idle' | 'maintenance'
  riskScore: number
  safetyScore: number
  ecoScore: number
  tags: string[]
}

export type TelematicsSnapshot = {
  id: string
  tenantId: string
  vehicleId: string
  timestamp: string
  speed: number
  harshBraking: boolean
  harshAcceleration: boolean
  idleMinutes: number
  fuelConsumption: number
  batteryHealthPercent?: number
  location: {
    lat: number
    lng: number
    city: string
  }
}

export type Route = {
  id: string
  tenantId: string
  vehicleId: string
  startAddress: string
  endAddress: string
  distanceKm: number
  plannedDurationMin: number
  actualDurationMin: number
  deviationPercent: number
  delayReason: string
  riskScore: number
}

export type MaintenanceEvent = {
  id: string
  tenantId: string
  vehicleId: string
  type: 'Inspection' | 'Brake' | 'Engine' | 'Tire' | 'Battery'
  cost: number
  downtimeDays: number
  aiPredicted: boolean
}

export type FleetCostSummary = {
  fuelCost: number
  maintenanceCost: number
  insuranceCost: number
  totalCost: number
  costPerKm: number
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

export type RoutePlan = Route
export type MaintenancePrediction = MaintenanceEvent
