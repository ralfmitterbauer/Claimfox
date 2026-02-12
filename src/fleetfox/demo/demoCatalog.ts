export const fleetfoxTenants = [
  { id: 'tenant-alpha', name: 'Northline Fleet Services' },
  { id: 'tenant-bravo', name: 'Hanse Transit Group' },
  { id: 'tenant-charlie', name: 'Atlas Mobility Networks' }
]

export const cities = ['Hamburg', 'Berlin', 'Munich', 'Cologne', 'Leipzig', 'Chicago', 'Rotterdam', 'Vienna']

export const euAddresses = [
  { street: 'Hafenstraße 22', zip: '20457', city: 'Hamburg', country: 'Germany' },
  { street: 'Seestraße 91', zip: '13353', city: 'Berlin', country: 'Germany' },
  { street: 'Landsberger Straße 88', zip: '80339', city: 'Munich', country: 'Germany' },
  { street: 'Aachener Straße 144', zip: '50674', city: 'Cologne', country: 'Germany' },
  { street: 'Wexstraße 11', zip: '1200', city: 'Vienna', country: 'Austria' },
  { street: 'Nieuwe Maaslaan 17', zip: '3011', city: 'Rotterdam', country: 'Netherlands' }
]

export const usAddresses = [
  { street: '1234 W Oak St', zip: '60607', city: 'Chicago', country: 'USA' },
  { street: '480 Lake Shore Dr', zip: '60611', city: 'Chicago', country: 'USA' }
]

export const manufacturers = ['Mercedes-Benz', 'MAN', 'Volvo', 'Scania', 'Ford']
export const models = ['Actros 1845', 'eTGX', 'FH 500', 'R 450', 'Transit Custom']
export const colors = ['White', 'Silver', 'Blue', 'Graphite', 'Red']

export const maintenanceTypes = ['Inspection', 'Brake', 'Engine', 'Tire', 'Battery'] as const

export const calendarTemplates = [
  {
    title: 'Vehicle inspection due',
    location: 'Hamburg Workshop',
    description: 'Annual inspection window for heavy fleet unit.'
  },
  {
    title: 'Driver license expiry warning',
    location: 'Fleet HR Desk',
    description: 'Validate upcoming license expiry and renewal documents.'
  },
  {
    title: 'Insurance renewal',
    location: 'Underwriting Call',
    description: 'Review premium assumptions and fleet risk controls.'
  },
  {
    title: 'Major service scheduled',
    location: 'Berlin Main Workshop',
    description: 'Major service slot for high-mileage vehicle.'
  },
  {
    title: 'Route compliance audit',
    location: 'Operations Governance',
    description: 'Audit deviations and compliance controls for key routes.'
  }
]
