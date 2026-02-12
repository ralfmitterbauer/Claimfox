import type {
  CalendarEvent,
  Driver,
  InsuranceAssessment,
  MaintenancePrediction,
  RoutePlan,
  SafetyAlert,
  TimelineEvent,
  Vehicle,
  VisionEvent
} from '@/fleetfox/types'
import {
  calendarTemplates,
  driverFirstNames,
  driverLastNames,
  fleetfoxTenants,
  highRiskCorridors,
  insuranceActions,
  maintenanceIssues,
  regions,
  routeHints,
  vehicleTags
} from '@/fleetfox/demo/demoCatalog'
import { buildInsuranceAssessment, computeVehicleRiskScore } from '@/fleetfox/components/FleetRiskEngine'

const KEY_PREFIX = 'fleetfox'

function key(tenantId: string, entity: string) {
  return `${KEY_PREFIX}:${tenantId}:${entity}`
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function writeList<T>(tenantId: string, entity: string, value: T[]) {
  if (!isBrowser()) return
  window.localStorage.setItem(key(tenantId, entity), JSON.stringify(value))
}

function hashSeed(input: string) {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function createRng(seedInput: string) {
  let seed = hashSeed(seedInput)
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}

function pick<T>(list: readonly T[], rand: () => number) {
  return list[Math.floor(rand() * list.length)]
}

function toIso(baseDate: Date, dayOffset: number) {
  return new Date(baseDate.getTime() + dayOffset * 86400000).toISOString()
}

function buildVehicles(tenantId: string, rand: () => number, baseDate: Date): Vehicle[] {
  return Array.from({ length: 50 }).map((_, idx) => {
    const type = (idx % 3 === 0 ? 'truck' : idx % 3 === 1 ? 'van' : 'ev') as Vehicle['type']
    const powertrain = type === 'ev' ? 'electric' : (idx % 4 === 0 ? 'hybrid' : 'diesel')
    const region = pick(regions, rand)
    const safetyScore = Math.round(52 + rand() * 44)
    const baseRisk = Math.round(25 + rand() * 58)
    return {
      id: `vehicle_${tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
      tenantId,
      plate: `${type === 'truck' ? 'TRK' : type === 'van' ? 'VAN' : 'EV'}-${(100 + idx).toString()}`,
      vin: `WDF${Math.floor(rand() * 9_999_999_999).toString().padStart(10, '0')}`,
      type,
      powertrain,
      region,
      status: idx % 9 === 0 ? 'maintenance' : idx % 6 === 0 ? 'idle' : 'active',
      odometerKm: Math.round(30000 + rand() * 310000),
      lastServiceDate: toIso(baseDate, -Math.round(rand() * 180)),
      nextServiceDueKm: Math.round(70000 + rand() * 280000),
      safetyScore,
      riskScore: baseRisk,
      co2KgPer100Km: type === 'ev' ? Number((1.4 + rand() * 1.3).toFixed(1)) : Number((8 + rand() * 8).toFixed(1)),
      fuelLPer100Km: type === 'ev' ? Number((0.6 + rand() * 0.6).toFixed(1)) : Number((6.8 + rand() * 8.4).toFixed(1)),
      evBatteryHealth: type === 'ev' ? Math.round(74 + rand() * 23) : undefined,
      assignedDriverIds: [],
      tags: [pick(vehicleTags, rand), pick(vehicleTags, rand)].filter((tag, pos, arr) => arr.indexOf(tag) === pos)
    }
  })
}

function buildDrivers(tenantId: string, rand: () => number): Driver[] {
  return Array.from({ length: 120 }).map((_, idx) => {
    const first = pick(driverFirstNames, rand)
    const last = pick(driverLastNames, rand)
    return {
      id: `driver_${tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
      tenantId,
      name: `${first} ${last}`,
      licenseClass: idx % 4 === 0 ? 'CE' : idx % 4 === 1 ? 'C1E' : 'B',
      baseLocation: pick(regions, rand),
      experienceYears: Math.round(1 + rand() * 19),
      safetyScore: Math.round(48 + rand() * 50),
      riskScore: Math.round(18 + rand() * 72),
      distractionEvents: Math.round(rand() * 9),
      harshBrakingEvents: Math.round(rand() * 14),
      speedingEvents: Math.round(rand() * 11),
      trainingStatus: idx % 5 === 0 ? 'overdue' : idx % 3 === 0 ? 'due' : 'upToDate',
      assignedVehicleIds: []
    }
  })
}

function assignDrivers(vehicles: Vehicle[], drivers: Driver[], rand: () => number) {
  vehicles.forEach((vehicle) => {
    const count = vehicle.type === 'truck' ? 3 : 2
    const picked: string[] = []
    while (picked.length < count) {
      const driver = drivers[Math.floor(rand() * drivers.length)]
      if (!driver || picked.includes(driver.id)) continue
      picked.push(driver.id)
      if (!driver.assignedVehicleIds.includes(vehicle.id)) {
        driver.assignedVehicleIds.push(vehicle.id)
      }
    }
    vehicle.assignedDriverIds = picked
  })
}

function buildVisionEvents(tenantId: string, vehicles: Vehicle[], drivers: Driver[], rand: () => number, baseDate: Date): VisionEvent[] {
  const types = ['Near miss', 'Lane departure', 'Tailgating', 'Hard cornering', 'Phone distraction']
  return Array.from({ length: 8 }).map((_, idx) => {
    const vehicle = vehicles[Math.floor(rand() * vehicles.length)]
    const driverId = vehicle.assignedDriverIds[0] ?? drivers[Math.floor(rand() * drivers.length)]?.id
    return {
      id: `vision_${tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
      tenantId,
      vehicleId: vehicle.id,
      driverId,
      occurredAt: toIso(baseDate, -(idx * 2 + 1)),
      severity: idx % 5 === 0 ? 'critical' : idx % 3 === 0 ? 'high' : idx % 2 === 0 ? 'medium' : 'low',
      type: types[idx % types.length],
      summary: `${types[idx % types.length]} detected on ${vehicle.plate} in ${vehicle.region}.`,
      clipLabel: `clip_${vehicle.plate}_${idx + 1}.mp4`,
      evidence: [
        `${Math.round(62 + rand() * 30)} km/h delta to safe threshold`,
        `Vision confidence ${Math.round(78 + rand() * 18)}%`,
        `Segment ${pick(highRiskCorridors, rand)}`
      ]
    }
  })
}

function buildMaintenance(tenantId: string, vehicles: Vehicle[], rand: () => number): MaintenancePrediction[] {
  return Array.from({ length: 15 }).map((_, idx) => {
    const vehicle = vehicles[(idx * 3) % vehicles.length]
    return {
      id: `maintenance_${tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
      tenantId,
      vehicleId: vehicle.id,
      predictedIssue: maintenanceIssues[idx % maintenanceIssues.length],
      probability: Number((0.22 + rand() * 0.54).toFixed(2)),
      costEstimateEur: Math.round(350 + rand() * 2800),
      dueInDays: Math.round(3 + rand() * 52),
      recommendedAction: idx % 2 === 0 ? 'Schedule workshop slot and inspect braking system.' : 'Run targeted diagnostics and update maintenance plan.'
    }
  })
}

function buildRoutes(tenantId: string, rand: () => number, baseDate: Date): RoutePlan[] {
  return Array.from({ length: 10 }).map((_, idx) => ({
    id: `route_${tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
    tenantId,
    day: toIso(baseDate, idx),
    routeName: `Route-${String.fromCharCode(65 + idx)} ${pick(regions, rand)} Corridor`,
    stops: Math.round(8 + rand() * 14),
    etaMinutes: Math.round(130 + rand() * 260),
    riskScore: Math.round(24 + rand() * 62),
    co2EstimateKg: Number((120 + rand() * 250).toFixed(1)),
    fuelEstimateL: Number((55 + rand() * 120).toFixed(1)),
    optimizationSuggestion: routeHints[idx % routeHints.length],
    evidence: [
      `Traffic index ${Math.round(35 + rand() * 40)}`,
      `Weather risk ${Math.round(18 + rand() * 35)}`,
      `Historical delay p90 ${Math.round(14 + rand() * 22)} min`
    ]
  }))
}

function buildSafetyAlerts(tenantId: string, visionEvents: VisionEvent[], baseDate: Date): SafetyAlert[] {
  return Array.from({ length: 12 }).map((_, idx) => {
    const event = visionEvents[idx % visionEvents.length]
    return {
      id: `alert_${tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
      tenantId,
      vehicleId: event.vehicleId,
      driverId: event.driverId,
      severity: idx % 4 === 0 ? 'high' : idx % 3 === 0 ? 'medium' : 'low',
      title: `${event.type} follow-up required`,
      description: `Review and coaching required after ${event.type.toLowerCase()} on ${new Date(event.occurredAt).toLocaleDateString('en-GB')}.`,
      createdAt: toIso(baseDate, -idx)
    }
  })
}

function buildInsurance(
  vehicles: Vehicle[],
  drivers: Driver[],
  maintenance: MaintenancePrediction[],
  visionEvents: VisionEvent[]
): InsuranceAssessment[] {
  return vehicles.slice(0, 6).map((vehicle, idx) => {
    const maintenanceItem = maintenance.find((item) => item.vehicleId === vehicle.id)
    const vehicleVision = visionEvents.filter((event) => event.vehicleId === vehicle.id)
    const driver = drivers.find((candidate) => candidate.id === vehicle.assignedDriverIds[0])
    const assessment = buildInsuranceAssessment(vehicle, maintenanceItem, vehicleVision, driver)
    return {
      ...assessment,
      id: `insurance_${vehicle.tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
      recommendedActions: [
        insuranceActions[idx % insuranceActions.length],
        insuranceActions[(idx + 1) % insuranceActions.length]
      ]
    }
  })
}

function buildCalendar(tenantId: string, baseDate: Date, vehicles: Vehicle[], drivers: Driver[], insurance: InsuranceAssessment[]): CalendarEvent[] {
  return calendarTemplates.map((template, idx) => {
    const linkedVehicle = vehicles[idx]
    const linkedDriver = drivers[idx]
    const entityType: CalendarEvent['entityType'] = idx === 2 ? 'insurance' : idx === 3 ? 'driver' : 'vehicle'
    const entityId = idx === 2 ? insurance[0]?.id : idx === 3 ? linkedDriver?.id : linkedVehicle?.id
    return {
      id: `calendar_${tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
      tenantId,
      title: template.title,
      date: toIso(baseDate, idx + 2),
      location: template.location,
      entityType,
      entityId,
      description: template.description,
      attendees: ['fleet.ops@insurfox.app', 'risk@insurfox.app']
    }
  })
}

function buildTimeline(
  tenantId: string,
  vehicles: Vehicle[],
  drivers: Driver[],
  routes: RoutePlan[],
  maintenance: MaintenancePrediction[],
  insurance: InsuranceAssessment[],
  baseDate: Date
): TimelineEvent[] {
  const events: TimelineEvent[] = []
  for (let idx = 0; idx < 20; idx += 1) {
    const vehicle = vehicles[idx % vehicles.length]
    const driver = drivers[idx % drivers.length]
    const route = routes[idx % routes.length]
    const maintenanceItem = maintenance[idx % maintenance.length]
    const insuranceItem = insurance[idx % insurance.length]
    const type: TimelineEvent['type'] = idx % 4 === 0 ? 'status' : idx % 4 === 1 ? 'note' : idx % 4 === 2 ? 'external' : 'system'
    const entityType: TimelineEvent['entityType'] = idx % 5 === 0 ? 'driver' : idx % 5 === 1 ? 'route' : idx % 5 === 2 ? 'maintenance' : idx % 5 === 3 ? 'insurance' : 'vehicle'
    const entityId = entityType === 'driver'
      ? driver.id
      : entityType === 'route'
        ? route.id
        : entityType === 'maintenance'
          ? maintenanceItem.id
          : entityType === 'insurance'
            ? insuranceItem.id
            : vehicle.id
    events.push({
      id: `timeline_${tenantId}_${(idx + 1).toString().padStart(3, '0')}`,
      tenantId,
      entityType,
      entityId,
      type,
      title: idx % 2 === 0 ? 'AI risk update' : 'Operational note',
      message: idx % 2 === 0
        ? `Risk model updated ${vehicle.plate} to score ${vehicle.riskScore}.`
        : `Route ${route.routeName} adjusted to lower weather exposure.`,
      createdAt: toIso(baseDate, -idx),
      meta: {
        actor: idx % 3 === 0 ? 'fleet-ai' : 'fleet-ops'
      }
    })
  }
  return events
}

export function seedTenantData(tenantId: string) {
  const rand = createRng(tenantId)
  const baseDate = new Date(2026, 1, 10)
  const vehicles = buildVehicles(tenantId, rand, baseDate)
  const drivers = buildDrivers(tenantId, rand)
  assignDrivers(vehicles, drivers, rand)
  const visionEvents = buildVisionEvents(tenantId, vehicles, drivers, rand, baseDate)
  const maintenance = buildMaintenance(tenantId, vehicles, rand)

  const maintenanceByVehicle = new Map(maintenance.map((item) => [item.vehicleId, item]))
  const visionByVehicle = vehicles.map((vehicle) => {
    const related = visionEvents.filter((event) => event.vehicleId === vehicle.id)
    return [vehicle.id, related] as const
  })

  vehicles.forEach((vehicle) => {
    vehicle.riskScore = computeVehicleRiskScore(vehicle, maintenanceByVehicle.get(vehicle.id), visionByVehicle.find(([id]) => id === vehicle.id)?.[1] ?? [])
  })

  const routes = buildRoutes(tenantId, rand, baseDate)
  const safetyAlerts = buildSafetyAlerts(tenantId, visionEvents, baseDate)
  const insurance = buildInsurance(vehicles, drivers, maintenance, visionEvents)
  const calendar = buildCalendar(tenantId, baseDate, vehicles, drivers, insurance)
  const timeline = buildTimeline(tenantId, vehicles, drivers, routes, maintenance, insurance, baseDate)

  writeList(tenantId, 'vehicles', vehicles)
  writeList(tenantId, 'drivers', drivers)
  writeList(tenantId, 'safetyAlerts', safetyAlerts)
  writeList(tenantId, 'visionEvents', visionEvents)
  writeList(tenantId, 'maintenance', maintenance)
  writeList(tenantId, 'routes', routes)
  writeList(tenantId, 'insurance', insurance)
  writeList(tenantId, 'calendar', calendar)
  writeList(tenantId, 'timeline', timeline)
}

export function seedAllTenants() {
  fleetfoxTenants.forEach((tenant) => seedTenantData(tenant.id))
}

export function ensureSeeded(tenantId: string) {
  if (!isBrowser()) return
  const markerKey = key(tenantId, 'seeded')
  if (window.localStorage.getItem(markerKey)) {
    return
  }
  seedTenantData(tenantId)
  window.localStorage.setItem(markerKey, 'true')
}
