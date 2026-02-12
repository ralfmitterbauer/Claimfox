import type { TenantContext } from '@/brokerfox/types'
import { ensureSeeded, seedAllTenants } from '@/fleetfox/demo/seedDemoData'
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
  const list = readList<Vehicle>(ctx.tenantId, 'vehicles')
  return list.find((vehicle) => vehicle.id === vehicleId) ?? null
}

export async function listDrivers(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<Driver>(ctx.tenantId, 'drivers')
}

export async function getDriver(ctx: TenantContext, driverId: string) {
  ensureFleetfoxSeed(ctx)
  const list = readList<Driver>(ctx.tenantId, 'drivers')
  return list.find((driver) => driver.id === driverId) ?? null
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
  return readList<MaintenancePrediction>(ctx.tenantId, 'maintenance')
}

export async function listRoutes(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<RoutePlan>(ctx.tenantId, 'routes')
}

export async function listInsurance(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<InsuranceAssessment>(ctx.tenantId, 'insurance')
}

export async function listCalendarEvents(ctx: TenantContext) {
  ensureFleetfoxSeed(ctx)
  return readList<CalendarEvent>(ctx.tenantId, 'calendar')
}

export async function addCalendarEvent(ctx: TenantContext, event: Omit<CalendarEvent, 'id' | 'tenantId'>) {
  ensureFleetfoxSeed(ctx)
  const list = readList<CalendarEvent>(ctx.tenantId, 'calendar')
  const next: CalendarEvent = {
    id: makeId('calendar'),
    tenantId: ctx.tenantId,
    ...event
  }
  list.unshift(next)
  writeList(ctx.tenantId, 'calendar', list)
  return next
}

export async function listTimelineEvents(
  ctx: TenantContext,
  entityType?: TimelineEvent['entityType'],
  entityId?: string
) {
  ensureFleetfoxSeed(ctx)
  const list = readList<TimelineEvent>(ctx.tenantId, 'timeline')
  return list.filter((event) => {
    if (entityType && event.entityType !== entityType) return false
    if (entityId && event.entityId !== entityId) return false
    return true
  })
}

export async function addTimelineEvent(
  ctx: TenantContext,
  event: Omit<TimelineEvent, 'id' | 'tenantId' | 'createdAt'>
) {
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
  if (!vehicle.assignedDriverIds.includes(driverId)) {
    vehicle.assignedDriverIds = [...vehicle.assignedDriverIds, driverId]
  }
  if (!driver.assignedVehicleIds.includes(vehicleId)) {
    driver.assignedVehicleIds = [...driver.assignedVehicleIds, vehicleId]
  }
  writeList(ctx.tenantId, 'vehicles', vehicles)
  writeList(ctx.tenantId, 'drivers', drivers)
  await addTimelineEvent(ctx, {
    entityType: 'vehicle',
    entityId: vehicleId,
    type: 'status',
    title: 'Driver assignment updated',
    message: `${driver.name} assigned to ${vehicle.plate}.`,
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
    message: `${vehicle.plate} set to ${status}.`,
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

export async function markSafetyAlert(ctx: TenantContext, alertId: string, status: 'acknowledged' | 'escalated') {
  return addTimelineEvent(ctx, {
    entityType: 'system',
    entityId: alertId,
    type: 'status',
    title: 'Safety alert updated',
    message: `Alert ${alertId} marked as ${status}.`,
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

  if (kind === 'driver') {
    const driver = drivers.find((item) => item.id === entityId)
    const fileBase = driver?.name.replace(/\s+/g, '_') ?? 'driver'
    return {
      filename: `Driver_Profile_${fileBase}.txt`,
      mime: 'text/plain',
      content: [
        `Driver profile report for ${driver?.name ?? entityId}`,
        `License class: ${driver?.licenseClass ?? '-'}`,
        `Safety score: ${driver?.safetyScore ?? '-'}`,
        `Risk score: ${driver?.riskScore ?? '-'}`,
        '',
        'Summary:',
        'Driver performance indicates moderate risk in urban peak windows.',
        'Recommended action: complete distraction mitigation training within 14 days.'
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
  const safePlate = vehicle?.plate ?? entityId

  if (kind === 'telematics') {
    return {
      filename: `Telematics_Summary_${safePlate}.txt`,
      mime: 'text/plain',
      content: [
        `Telematics summary for ${safePlate}`,
        `Region: ${vehicle?.region ?? '-'}`,
        `Odometer: ${vehicle?.odometerKm ?? 0} km`,
        `Fuel estimate: ${vehicle?.fuelLPer100Km ?? 0} l/100km`,
        '',
        'Signal highlights:',
        '- 3 harsh braking events in last 7 days.',
        '- 2 lane departure alerts in high-risk corridor.',
        '- Idle time trend reduced by 8% after route optimization.'
      ].join('\n')
    }
  }

  return {
    filename: `Risk_Report_${safePlate}.txt`,
    mime: 'text/plain',
    content: [
      `Risk report for ${safePlate}`,
      `Safety score: ${vehicle?.safetyScore ?? '-'}`,
      `Risk score: ${vehicle?.riskScore ?? '-'}`,
      '',
      'Assessment:',
      'Risk exposure is driven by route complexity, maintenance trend and driver behavior.',
      'Recommended actions include preventive maintenance and targeted coaching.'
    ].join('\n')
  }
}
