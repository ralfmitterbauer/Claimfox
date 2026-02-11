export const underwriterfoxTenants = ['tenant_demo_a', 'tenant_demo_b', 'tenant_demo_c'] as const

export const productLines = ['Fleet Liability', 'Property All Risk', 'Cyber Shield', 'Cargo Protect', 'Marine Hull']

export const segments = ['Mid Market', 'Enterprise', 'Specialty', 'Public Sector']

export const brokers = ['Atlas Maklerwerk', 'Nordlicht Brokers', 'Contora Risk Partners', 'Alpine Insurance GmbH', 'Hansec Risk Advisors']

export const insureds = ['Nordstadt Logistics GmbH', 'Atlas Holding AG', 'Fleetwise Mobility SE', 'Meridian Foods GmbH', 'Harbor Energy Services']

export const ruleLibrary = [
  { id: 'R-101', name: 'Loss ratio threshold', severity: 'high' },
  { id: 'R-204', name: 'Geo aggregation check', severity: 'medium' },
  { id: 'R-315', name: 'Sanctions screening', severity: 'high' },
  { id: 'R-408', name: 'Coverage gap review', severity: 'low' },
  { id: 'R-512', name: 'Fleet telematics required', severity: 'medium' }
] as const

export const aiBullets = [
  'Claims trend improved versus prior year with mitigation steps in place.',
  'Exposure concentration moderate; recommend higher deductible for cyber.',
  'Broker submission quality high with full loss run history.',
  'Recommended pricing uplift applied for adverse loss ratio.'
]

export const extractedFieldKeys = ['revenue', 'employees', 'claimsHistory', 'locations', 'fleetSize', 'riskGrade']
