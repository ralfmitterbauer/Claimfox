import type {
  CalendarEvent,
  Driver,
  FleetCostSummary,
  InsuranceAssessment,
  MaintenanceEvent,
  Route,
  SafetyAlert,
  TelematicsSnapshot,
  TimelineEvent,
  Vehicle,
  VisionEvent
} from '@/fleetfox/types'
import {
  calendarTemplates,
  cities,
  colors,
  euAddresses,
  fleetfoxTenants,
  maintenanceTypes,
  manufacturers,
  models,
  usAddresses
} from '@/fleetfox/demo/demoCatalog'
import { buildInsuranceAssessment, calculateMaintenanceRisk } from '@/fleetfox/ai/fleetRiskEngine'

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

function writeValue<T>(tenantId: string, entity: string, value: T) {
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

function iso(date: Date, days: number) {
  return new Date(date.getTime() + days * 86400000).toISOString()
}

const driverSeeds = [
  { firstName: 'Maximilian', lastName: 'Schneider', birthDate: '1990-03-12', licenseClass: 'CE' as const, riskScore: 72, safetyScore: 85, ecoScore: 64, incidentsCount: 1 },
  { firstName: 'Sofia', lastName: 'Martinez', birthDate: '1988-09-21', licenseClass: 'C' as const, riskScore: 81, safetyScore: 92, ecoScore: 73, incidentsCount: 0 },
  { firstName: 'Jonas', lastName: 'Winter', birthDate: '1992-01-14', licenseClass: 'CE' as const, riskScore: 67, safetyScore: 79, ecoScore: 70, incidentsCount: 2 },
  { firstName: 'Lea', lastName: 'Berg', birthDate: '1995-08-30', licenseClass: 'B' as const, riskScore: 75, safetyScore: 88, ecoScore: 82, incidentsCount: 1 },
  { firstName: 'Noah', lastName: 'Klein', birthDate: '1991-05-03', licenseClass: 'C' as const, riskScore: 69, safetyScore: 84, ecoScore: 68, incidentsCount: 1 }
]

function buildDrivers(tenantId: string, rand: () => number): Driver[] {
  const drivers: Driver[] = []
  for (let idx = 0; idx < 25; idx += 1) {
    const template = driverSeeds[idx % driverSeeds.length]
    const address = idx === 0
      ? euAddresses[0]
      : idx === 1
        ? usAddresses[0]
        : pick([...euAddresses, ...usAddresses], rand)

    drivers.push({
      id: `driver_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      firstName: template.firstName,
      lastName: `${template.lastName}${idx > 4 ? `-${idx + 1}` : ''}`,
      birthDate: template.birthDate,
      address,
      phone: `+49 170 ${String(1000000 + idx * 371).slice(0, 7)}`,
      email: `${template.firstName.toLowerCase()}.${template.lastName.toLowerCase()}${idx}@fleetfox.demo`,
      licenseNumber: `DE-${String(100000 + idx * 91)}`,
      licenseValidUntil: iso(new Date(2026, 1, 1), 365 + idx * 22),
      licenseClass: template.licenseClass,
      hireDate: iso(new Date(2018, 0, 1), idx * 63),
      riskScore: Math.max(25, Math.min(95, template.riskScore + Math.round(rand() * 10 - 5))),
      safetyScore: Math.max(55, Math.min(98, template.safetyScore + Math.round(rand() * 8 - 4))),
      ecoScore: Math.max(45, Math.min(96, template.ecoScore + Math.round(rand() * 10 - 5))),
      incidentsCount: Math.max(0, template.incidentsCount + Math.round(rand() * 2 - 1))
    })
  }
  return drivers
}

function buildVehicles(tenantId: string, rand: () => number): Vehicle[] {
  const vehicles: Vehicle[] = []
  for (let idx = 0; idx < 40; idx += 1) {
    const isElectric = idx % 7 === 0
    const fuelType: Vehicle['fuelType'] = isElectric ? 'Electric' : idx % 4 === 0 ? 'Hybrid' : 'Diesel'
    const manufacturer = idx === 0 ? 'Mercedes-Benz' : idx === 1 ? 'MAN' : pick(manufacturers, rand)
    const model = idx === 0 ? 'Actros 1845' : idx === 1 ? 'eTGX' : pick(models, rand)
    const city = pick(cities, rand)
    const licensePlate = idx === 0
      ? 'HH-FX 2401'
      : idx === 1
        ? 'HH-EV 1122'
        : `${city.slice(0, 2).toUpperCase()}-FX ${2200 + idx}`

    const mileageKm = idx === 0 ? 142000 : Math.round(42000 + rand() * 240000)
    const nextServiceDueKm = Math.round(90000 + rand() * 260000)

    vehicles.push({
      id: `vehicle_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      vin: idx === 0
        ? 'WDB9634031L123456'
        : idx === 1
          ? 'WBY8P4C52K7D12345'
          : `WDF${String(1000000000 + Math.floor(rand() * 8999999999))}`,
      licensePlate,
      manufacturer,
      model,
      year: 2018 + (idx % 8),
      color: pick(colors, rand),
      fuelType,
      enginePowerHP: fuelType === 'Electric' ? Math.round(340 + rand() * 120) : Math.round(180 + rand() * 360),
      totalWeightKg: fuelType === 'Electric' ? Math.round(16000 + rand() * 2500) : Math.round(14000 + rand() * 8000),
      payloadKg: Math.round(4500 + rand() * 7000),
      axleCount: fuelType === 'Electric' ? 2 : 2 + (idx % 2),
      purchaseDate: iso(new Date(2019, 0, 1), idx * 35),
      mileageKm,
      lastServiceDate: iso(new Date(2025, 10, 1), -Math.round(rand() * 140)),
      nextServiceDueKm,
      maintenanceRisk: mileageKm > nextServiceDueKm ? 'High' : mileageKm > nextServiceDueKm - 9000 ? 'Medium' : 'Low',
      telematicsDeviceId: `TEL-${tenantId.toUpperCase()}-${String(idx + 1).padStart(4, '0')}`,
      region: city,
      status: idx % 9 === 0 ? 'maintenance' : idx % 6 === 0 ? 'idle' : 'active',
      riskScore: Math.round(35 + rand() * 52),
      safetyScore: Math.round(56 + rand() * 40),
      ecoScore: Math.round(50 + rand() * 42),
      tags: ['temperature', idx % 3 === 0 ? 'theft' : 'major loss']
    })
  }
  return vehicles
}

function assignDrivers(vehicles: Vehicle[], drivers: Driver[]) {
  vehicles.forEach((vehicle, idx) => {
    const driver = drivers[idx % drivers.length]
    vehicle.assignedDriverId = driver.id
  })
  drivers.forEach((driver) => {
    const match = vehicles.find((vehicle) => vehicle.assignedDriverId === driver.id)
    if (match) driver.activeVehicleId = match.id
  })
}

function buildTelematicsSnapshots(tenantId: string, vehicles: Vehicle[], rand: () => number, baseDate: Date) {
  const snapshots: TelematicsSnapshot[] = []
  vehicles.forEach((vehicle, vehicleIndex) => {
    for (let i = 0; i < 7; i += 1) {
      const speed = Math.round(40 + rand() * 68)
      const city = vehicle.region
      snapshots.push({
        id: `telematics_${tenantId}_${String(vehicleIndex + 1).padStart(3, '0')}_${i + 1}`,
        tenantId,
        vehicleId: vehicle.id,
        timestamp: iso(baseDate, -(i + vehicleIndex % 4)),
        speed,
        harshBraking: rand() > 0.73,
        harshAcceleration: rand() > 0.76,
        idleMinutes: Math.round(rand() * 24),
        fuelConsumption: Number((vehicle.fuelType === 'Electric' ? 0.9 + rand() * 0.8 : 18 + rand() * 19).toFixed(2)),
        batteryHealthPercent: vehicle.fuelType === 'Electric' ? Math.round(84 + rand() * 11) : undefined,
        location: {
          lat: Number((53.2 + rand() * 2.1).toFixed(5)),
          lng: Number((9.6 + rand() * 2.8).toFixed(5)),
          city
        }
      })
    }
  })
  return snapshots
}

function buildRoutes(tenantId: string, vehicles: Vehicle[], rand: () => number): Route[] {
  return Array.from({ length: 10 }).map((_, idx) => {
    const vehicle = vehicles[idx % vehicles.length]
    const planned = Math.round(180 + rand() * 240)
    const actual = planned + Math.round(rand() * 90 - 30)
    return {
      id: `route_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      vehicleId: vehicle.id,
      startAddress: `${vehicle.region} Logistics Hub`,
      endAddress: `${pick(cities, rand)} Distribution Center`,
      distanceKm: Math.round(180 + rand() * 520),
      plannedDurationMin: planned,
      actualDurationMin: actual,
      deviationPercent: Number((((actual - planned) / planned) * 100).toFixed(1)),
      delayReason: idx % 3 === 0 ? 'Traffic congestion' : idx % 3 === 1 ? 'Weather impact' : 'Loading delay',
      riskScore: Math.round(26 + rand() * 58)
    }
  })
}

function buildMaintenance(tenantId: string, vehicles: Vehicle[], rand: () => number): MaintenanceEvent[] {
  return Array.from({ length: 15 }).map((_, idx) => {
    const vehicle = vehicles[(idx * 2) % vehicles.length]
    return {
      id: `maintenance_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      vehicleId: vehicle.id,
      type: maintenanceTypes[idx % maintenanceTypes.length],
      cost: Math.round(450 + rand() * 4200),
      downtimeDays: Math.round(1 + rand() * 6),
      aiPredicted: idx % 2 === 0
    }
  })
}

function buildVisionEvents(tenantId: string, vehicles: Vehicle[], rand: () => number, baseDate: Date): VisionEvent[] {
  const types = ['Near miss', 'Lane departure', 'Tailgating', 'Hard cornering', 'Phone distraction']
  return Array.from({ length: 8 }).map((_, idx) => {
    const vehicle = vehicles[(idx * 4) % vehicles.length]
    return {
      id: `vision_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      vehicleId: vehicle.id,
      driverId: vehicle.assignedDriverId,
      occurredAt: iso(baseDate, -(idx * 3 + 1)),
      severity: idx % 4 === 0 ? 'critical' : idx % 3 === 0 ? 'high' : idx % 2 === 0 ? 'medium' : 'low',
      type: types[idx % types.length],
      summary: `${types[idx % types.length]} detected on ${vehicle.licensePlate} in ${vehicle.region}.`,
      clipLabel: `clip_${vehicle.licensePlate.replace(/\s+/g, '_')}_${idx + 1}.mp4`,
      evidence: ['Vision confidence 86%', 'Speed delta +18 km/h', 'High traffic density segment']
    }
  })
}

function buildSafetyAlerts(tenantId: string, visionEvents: VisionEvent[], baseDate: Date): SafetyAlert[] {
  return Array.from({ length: 12 }).map((_, idx) => {
    const event = visionEvents[idx % visionEvents.length]
    return {
      id: `alert_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      vehicleId: event.vehicleId,
      driverId: event.driverId,
      severity: idx % 3 === 0 ? 'high' : idx % 2 === 0 ? 'medium' : 'low',
      title: `${event.type} follow-up required`,
      description: `Review and coaching required after ${event.type.toLowerCase()} on ${new Date(event.occurredAt).toLocaleDateString('en-GB')}.`,
      createdAt: iso(baseDate, -idx)
    }
  })
}

function buildInsurance(
  vehicles: Vehicle[],
  drivers: Driver[],
  telematics: TelematicsSnapshot[],
  visionEvents: VisionEvent[]
): InsuranceAssessment[] {
  return vehicles.slice(0, 6).map((vehicle, idx) => {
    const driver = drivers.find((entry) => entry.id === vehicle.assignedDriverId)
    const vehicleTelematics = telematics.filter((entry) => entry.vehicleId === vehicle.id)
    const vehicleVision = visionEvents.filter((entry) => entry.vehicleId === vehicle.id)
    return {
      ...buildInsuranceAssessment(vehicle, driver, vehicleTelematics, vehicleVision),
      id: `insurance_${vehicle.tenantId}_${String(idx + 1).padStart(3, '0')}`
    }
  })
}

function buildCalendar(tenantId: string, baseDate: Date, vehicles: Vehicle[], drivers: Driver[], insurance: InsuranceAssessment[]): CalendarEvent[] {
  return calendarTemplates.map((item, idx) => ({
    id: `calendar_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
    tenantId,
    title: item.title,
    date: iso(baseDate, idx + 2),
    location: item.location,
    entityType: idx === 1 ? 'driver' : idx === 2 ? 'insurance' : 'vehicle',
    entityId: idx === 1 ? drivers[1]?.id : idx === 2 ? insurance[0]?.id : vehicles[idx]?.id,
    description: item.description,
    attendees: ['fleet.ops@insurfox.app', 'risk@insurfox.app']
  }))
}

function buildTimeline(tenantId: string, vehicles: Vehicle[], drivers: Driver[], routes: Route[], maintenance: MaintenanceEvent[], baseDate: Date): TimelineEvent[] {
  const out: TimelineEvent[] = []
  for (let idx = 0; idx < 20; idx += 1) {
    const vehicle = vehicles[idx % vehicles.length]
    const driver = drivers[idx % drivers.length]
    const route = routes[idx % routes.length]
    const maintenanceItem = maintenance[idx % maintenance.length]
    const entityType: TimelineEvent['entityType'] = idx % 4 === 0 ? 'vehicle' : idx % 4 === 1 ? 'driver' : idx % 4 === 2 ? 'route' : 'maintenance'
    const entityId = entityType === 'vehicle' ? vehicle.id : entityType === 'driver' ? driver.id : entityType === 'route' ? route.id : maintenanceItem.id
    out.push({
      id: `timeline_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      entityType,
      entityId,
      type: idx % 3 === 0 ? 'status' : idx % 3 === 1 ? 'note' : 'system',
      title: idx % 2 === 0 ? 'AI risk update' : 'Operational update',
      message: idx % 2 === 0
        ? `Risk adjusted for ${vehicle.licensePlate} with latest telematics and incident signals.`
        : `Route ${route.startAddress} -> ${route.endAddress} deviation recorded at ${route.deviationPercent}%.`,
      createdAt: iso(baseDate, -idx),
      meta: { actor: idx % 2 === 0 ? 'fleet-ai' : 'fleet-ops' }
    })
  }
  return out
}

function buildCostSummary(vehicles: Vehicle[], routes: Route[], maintenance: MaintenanceEvent[], insurance: InsuranceAssessment[]): FleetCostSummary {
  const fuelCost = Math.round(routes.reduce((acc, route) => acc + route.distanceKm * 0.74, 0))
  const maintenanceCost = maintenance.reduce((acc, item) => acc + item.cost, 0)
  const insuranceCost = Math.round(insurance.reduce((acc, item) => acc + item.basePremiumEur * item.multiplier, 0))
  const totalKm = Math.max(1, routes.reduce((acc, route) => acc + route.distanceKm, 0))
  const totalCost = fuelCost + maintenanceCost + insuranceCost
  return {
    fuelCost,
    maintenanceCost,
    insuranceCost,
    totalCost,
    costPerKm: Number((totalCost / totalKm).toFixed(2))
  }
}

export function seedTenantData(tenantId: string) {
  const rand = createRng(tenantId)
  const baseDate = new Date(2026, 1, 10)

  const drivers = buildDrivers(tenantId, rand)
  const vehicles = buildVehicles(tenantId, rand)
  assignDrivers(vehicles, drivers)

  vehicles.forEach((vehicle) => {
    vehicle.maintenanceRisk = calculateMaintenanceRisk(vehicle)
  })

  const telematics = buildTelematicsSnapshots(tenantId, vehicles, rand, baseDate)
  const routes = buildRoutes(tenantId, vehicles, rand)
  const maintenance = buildMaintenance(tenantId, vehicles, rand)
  const visionEvents = buildVisionEvents(tenantId, vehicles, rand, baseDate)
  const safetyAlerts = buildSafetyAlerts(tenantId, visionEvents, baseDate)
  const insurance = buildInsurance(vehicles, drivers, telematics, visionEvents)
  const calendar = buildCalendar(tenantId, baseDate, vehicles, drivers, insurance)
  const timeline = buildTimeline(tenantId, vehicles, drivers, routes, maintenance, baseDate)
  const costs = buildCostSummary(vehicles, routes, maintenance, insurance)

  writeList(tenantId, 'drivers', drivers)
  writeList(tenantId, 'vehicles', vehicles)
  writeList(tenantId, 'telematics', telematics)
  writeList(tenantId, 'routes', routes)
  writeList(tenantId, 'maintenance', maintenance)
  writeList(tenantId, 'visionEvents', visionEvents)
  writeList(tenantId, 'safetyAlerts', safetyAlerts)
  writeList(tenantId, 'insurance', insurance)
  writeList(tenantId, 'calendar', calendar)
  writeList(tenantId, 'timeline', timeline)
  writeValue(tenantId, 'costSummary', costs)
}

export function seedAllTenants() {
  fleetfoxTenants.forEach((tenant) => seedTenantData(tenant.id))
}

export function ensureSeeded(tenantId: string) {
  if (!isBrowser()) return
  const markerKey = key(tenantId, 'seeded')
  if (window.localStorage.getItem(markerKey)) return
  seedTenantData(tenantId)
  window.localStorage.setItem(markerKey, 'true')
}
