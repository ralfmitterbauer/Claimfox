import type { TenantContext } from '@/brokerfox/types'
import { ensureSeeded, seedAllTenants } from '@/fleetfox/demo/seedDemoData'
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

const KEY_PREFIX = 'fleetfox'

function key(tenantId: string, entity: string) {
  return `${KEY_PREFIX}:${tenantId}:${entity}`
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function readList<T>(tenantId: string, entity: string): T[] {
  if (!isBrowser()) return []
  const raw = window.localStorage.getItem(key(tenantId, entity))
  if (!raw) return []
  try {
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

function writeList<T>(tenantId: string, entity: string, value: T[]) {
  if (!isBrowser()) return
  window.localStorage.setItem(key(tenantId, entity), JSON.stringify(value))
}

function readValue<T>(tenantId: string, entity: string): T | null {
  if (!isBrowser()) return null
  const raw = window.localStorage.getItem(key(tenantId, entity))
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export function ensureFleetfoxSeed(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
}

export function seedFleetfoxTenants() {
  seedAllTenants()
}

export async function listVehicles(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<Vehicle>(ctx.tenantId, 'vehicles')
}

export async function getVehicle(ctx: TenantContext, vehicleId: string) {
  ensureFleetfoxSeed(ctx)
  return readList<Vehicle>(ctx.tenantId, 'vehicles').find((vehicle) => vehicle.id === vehicleId) ?? null
}

export async function listDrivers(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<Driver>(ctx.tenantId, 'drivers')
}

export async function getDriver(ctx: TenantContext, driverId: string) {
  ensureFleetfoxSeed(ctx)
  return readList<Driver>(ctx.tenantId, 'drivers').find((driver) => driver.id === driverId) ?? null
}

export async function listTelematicsSnapshots(ctx: TenantContext, vehicleId?: string) {
  ensureFleetfoxSeed(ctx)
  const rows = readList<TelematicsSnapshot>(ctx.tenantId, 'telematics')
  if (!vehicleId) return rows
  return rows.filter((row) => row.vehicleId === vehicleId)
}

export async function listSafetyAlerts(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<SafetyAlert>(ctx.tenantId, 'safetyAlerts')
}

export async function listVisionEvents(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<VisionEvent>(ctx.tenantId, 'visionEvents')
}

export async function listMaintenance(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<MaintenanceEvent>(ctx.tenantId, 'maintenance')
}

export async function listRoutes(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<Route>(ctx.tenantId, 'routes')
}

export async function listInsurance(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<InsuranceAssessment>(ctx.tenantId, 'insurance')
}

export async function getFleetCostSummary(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readValue<FleetCostSummary>(ctx.tenantId, 'costSummary') ?? {
    fuelCost: 0,
    maintenanceCost: 0,
    insuranceCost: 0,
    totalCost: 0,
    costPerKm: 0
  }
}

export async function listCalendarEvents(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<CalendarEvent>(ctx.tenantId, 'calendar')
}

export async function listTimelineEvents(ctx: TenantContext, entityType?: TimelineEvent['entityType'], entityId?: string) {
  ensureFleetfoxSeed(ctx)
  return readList<TimelineEvent>(ctx.tenantId, 'timeline').filter((event) => {
    if (entityType && event.entityType !== entityType) return false
    if (entityId && event.entityId !== entityId) return false
    return true
  })
}

export async function addTimelineEvent(ctx: TenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'createdAt'>) {
  ensureFleetfoxSeed(ctx)
  const list = readList<TimelineEvent>(ctx.tenantId, 'timeline')
  const next: TimelineEvent = {
    id: makeId('timeline'),
    tenantId: ctx.tenantId,
    createdAt: new Date().toISOString(),
    ...event
  }
  list.unshift(next)
  writeList(ctx.tenantId, 'timeline', list)
  return next
}

export async function assignVehicleDriver(ctx: TenantContext, vehicleId: string, driverId: string) {
  ensureFleetfoxSeed(ctx)
  const vehicles = readList<Vehicle>(ctx.tenantId, 'vehicles')
  const drivers = readList<Driver>(ctx.tenantId, 'drivers')
  const vehicle = vehicles.find((item) => item.id === vehicleId)
  const driver = drivers.find((item) => item.id === driverId)
  if (!vehicle || !driver) return

  const prevDriver = drivers.find((item) => item.id === vehicle.assignedDriverId)
  if (prevDriver?.activeVehicleId === vehicleId) {
    prevDriver.activeVehicleId = undefined
  }

  vehicle.assignedDriverId = driverId
  driver.activeVehicleId = vehicleId
  writeList(ctx.tenantId, 'vehicles', vehicles)
  writeList(ctx.tenantId, 'drivers', drivers)

  await addTimelineEvent(ctx, {
    entityType: 'vehicle',
    entityId: vehicleId,
    type: 'status',
    title: 'Driver assignment updated',
    message: `${driver.firstName} ${driver.lastName} assigned to ${vehicle.licensePlate}.`,
    meta: { actor: ctx.userId }
  })
}

export async function updateVehicleStatus(ctx: TenantContext, vehicleId: string, status: Vehicle['status']) {
  ensureFleetfoxSeed(ctx)
  const vehicles = readList<Vehicle>(ctx.tenantId, 'vehicles')
  const vehicle = vehicles.find((item) => item.id === vehicleId)
  if (!vehicle) return null
  vehicle.status = status
  writeList(ctx.tenantId, 'vehicles', vehicles)
  await addTimelineEvent(ctx, {
    entityType: 'vehicle',
    entityId: vehicleId,
    type: 'status',
    title: 'Vehicle status changed',
    message: `${vehicle.licensePlate} set to ${status}.`,
    meta: { actor: ctx.userId }
  })
  return vehicle
}

export async function addInsuranceNote(ctx: TenantContext, insuranceId: string, message: string) {
  return addTimelineEvent(ctx, {
    entityType: 'insurance',
    entityId: insuranceId,
    type: 'note',
    title: 'Insurance note',
    message,
    meta: { actor: ctx.userId }
  })
}

export async function generateDownloadText(
  ctx: TenantContext,
  kind: 'telematics' | 'risk' | 'driver' | 'insurance',
  entityId: string
) {
  ensureFleetfoxSeed(ctx)
  const vehicles = readList<Vehicle>(ctx.tenantId, 'vehicles')
  const drivers = readList<Driver>(ctx.tenantId, 'drivers')
  const insurance = readList<InsuranceAssessment>(ctx.tenantId, 'insurance')
  const telematics = readList<TelematicsSnapshot>(ctx.tenantId, 'telematics')

  if (kind === 'driver') {
    const driver = drivers.find((item) => item.id === entityId)
    const name = `${driver?.firstName ?? 'driver'}_${driver?.lastName ?? 'unknown'}`
    return {
      filename: `Driver_Profile_${name}.txt`,
      mime: 'text/plain',
      content: [
        `Driver profile report for ${driver?.firstName ?? ''} ${driver?.lastName ?? ''}`,
        `Address: ${driver?.address.street ?? '-'}, ${driver?.address.zip ?? ''} ${driver?.address.city ?? ''}`,
        `License: ${driver?.licenseClass ?? '-'} (${driver?.licenseValidUntil ?? '-'})`,
        `Safety score: ${driver?.safetyScore ?? '-'}`,
        `Risk score: ${driver?.riskScore ?? '-'}`,
        `Eco score: ${driver?.ecoScore ?? '-'}`,
        '',
        'Summary:',
        'Driver profile combines incidents, telematics behaviour and compliance checks.'
      ].join('\n')
    }
  }

  if (kind === 'insurance') {
    const item = insurance.find((entry) => entry.id === entityId)
    return {
      filename: `Insurance_Assessment_${entityId}.txt`,
      mime: 'text/plain',
      content: [
        `Insurance assessment for ${item?.fleetSegment ?? entityId}`,
        `Base premium: EUR ${item?.basePremiumEur ?? 0}`,
        `Multiplier: ${item?.multiplier ?? 1}`,
        `Claims probability: ${Math.round((item?.claimsProbability ?? 0) * 100)}%`,
        '',
        'Explanation bullets:',
        ...(item?.explanation.bullets ?? ['No explanation data available.'])
      ].join('\n')
    }
  }

  const vehicle = vehicles.find((item) => item.id === entityId)
  const safePlate = vehicle?.licensePlate ?? entityId

  if (kind === 'telematics') {
    const rows = telematics.filter((row) => row.vehicleId === entityId).slice(0, 6)
    return {
      filename: `Telematics_Summary_${safePlate.replace(/\s+/g, '_')}.txt`,
      mime: 'text/plain',
      content: [
        `Telematics summary for ${safePlate}`,
        `Mileage: ${vehicle?.mileageKm ?? 0} km`,
        `Fuel type: ${vehicle?.fuelType ?? '-'}`,
        '',
        'Recent events:',
        ...rows.map((row) => `${new Date(row.timestamp).toLocaleString('de-DE')} | speed ${row.speed} | idle ${row.idleMinutes}m | harsh braking ${row.harshBraking ? 'yes' : 'no'}`)
      ].join('\n')
    }
  }

  return {
    filename: `Risk_Report_${safePlate.replace(/\s+/g, '_')}.txt`,
    mime: 'text/plain',
    content: [
      `Risk report for ${safePlate}`,
      `Safety score: ${vehicle?.safetyScore ?? '-'}`,
      `Risk score: ${vehicle?.riskScore ?? '-'}`,
      `Maintenance risk: ${vehicle?.maintenanceRisk ?? '-'}`,
      '',
      'Assessment:',
      'Risk exposure is driven by incidents, harsh telematics events and service overdue status.'
    ].join('\n')
  }
}
