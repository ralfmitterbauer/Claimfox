export const fleetfoxTenants = [
  { id: 'tenant-alpha', name: 'Northline Fleet Services' },
  { id: 'tenant-bravo', name: 'Hanse Transit Group' },
  { id: 'tenant-charlie', name: 'Atlas Mobility Networks' }
]

export const regions = ['Hamburg', 'Berlin', 'Munich', 'Rhine-Ruhr', 'Leipzig', 'Cologne']
export const highRiskCorridors = ['A7 Hamburg-Kiel', 'A3 Cologne-Frankfurt', 'A9 Leipzig-Munich']

export const vehicleTags = ['temperature', 'theft', 'major loss', 'litigation risk', 'night shift', 'urban delivery']

export const maintenanceIssues = [
  'Brake pads wear above threshold',
  'Tire pressure instability',
  'Battery degradation trend',
  'Cooling system anomaly',
  'Suspension vibration profile'
]

export const routeHints = [
  'Shift departure by 35 minutes to avoid congestion peak.',
  'Use alternate corridor to reduce high-risk weather exposure.',
  'Bundle stop sequence to reduce idle time by 12%.',
  'Switch to EV-priority segment for lower CO2 emissions.'
]

export const insuranceActions = [
  'Mandatory coaching for drivers with repeated harsh braking.',
  'Increase telematics sampling on high-risk corridor vehicles.',
  'Move maintenance cadence from 30 to 21 days for heavy units.',
  'Apply theft-prevention checklist for urban night routes.'
]

export const driverFirstNames = ['Max', 'Lea', 'Jonas', 'Sofia', 'Mila', 'Paul', 'Lena', 'Noah', 'Emma', 'Lukas']
export const driverLastNames = ['Krause', 'Winter', 'Becker', 'Yilmaz', 'Schmidt', 'Hofmann', 'Klein', 'Heller', 'Aydin', 'Berg']

export const calendarTemplates = [
  {
    title: 'Safety review: TRK-245 - Vision event',
    location: 'Hamburg Ops Center',
    description: 'Review near-miss sequence and corrective actions with fleet safety lead.'
  },
  {
    title: 'Maintenance slot: VAN-118 - Brake pads',
    location: 'Berlin Workshop',
    description: 'Preventive replacement and post-service telematics calibration.'
  },
  {
    title: 'Underwriting call: Fleet premium renewal',
    location: 'Video Conference',
    description: 'Discuss pricing assumptions and risk controls for next policy term.'
  },
  {
    title: 'Driver coaching: Max K. - distraction',
    location: 'Munich Training Hub',
    description: 'Focused coaching session following repeated distraction alerts.'
  },
  {
    title: 'Route optimization workshop - Hamburg region',
    location: 'Fleet Planning Room',
    description: 'Optimize routes with weather and traffic risk overlays.'
  }
]
