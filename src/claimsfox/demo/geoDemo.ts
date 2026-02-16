export type DemoAddress = {
  street: string
  postalCode: string
  city: string
  country: string
}

type BoundingCity = {
  city: string
  country: string
  street: string
  postalCode: string
  latMin: number
  latMax: number
  lngMin: number
  lngMax: number
}

const KNOWN_CITY_BOUNDS: BoundingCity[] = [
  {
    city: 'Berlin',
    country: 'Deutschland',
    street: 'Friedrichstraße 88',
    postalCode: '10117',
    latMin: 52.33,
    latMax: 52.68,
    lngMin: 13.09,
    lngMax: 13.77
  },
  {
    city: 'Hamburg',
    country: 'Deutschland',
    street: 'Kehrwieder 10',
    postalCode: '20457',
    latMin: 53.45,
    latMax: 53.68,
    lngMin: 9.78,
    lngMax: 10.3
  },
  {
    city: 'Muenchen',
    country: 'Deutschland',
    street: 'Leopoldstraße 42',
    postalCode: '80802',
    latMin: 48.04,
    latMax: 48.26,
    lngMin: 11.36,
    lngMax: 11.75
  },
  {
    city: 'Koeln',
    country: 'Deutschland',
    street: 'Hohenzollernring 12',
    postalCode: '50672',
    latMin: 50.82,
    latMax: 51.08,
    lngMin: 6.82,
    lngMax: 7.17
  },
  {
    city: 'Frankfurt am Main',
    country: 'Deutschland',
    street: 'Mainzer Landstraße 47',
    postalCode: '60329',
    latMin: 50.01,
    latMax: 50.22,
    lngMin: 8.47,
    lngMax: 8.8
  }
]

const DEFAULT_DEMO_ADDRESS: DemoAddress = {
  street: 'Musterstraße 12',
  postalCode: '10115',
  city: 'Berlin',
  country: 'Deutschland'
}

export function demoReverseGeocode(lat: number, lng: number): DemoAddress {
  const match = KNOWN_CITY_BOUNDS.find((entry) => (
    lat >= entry.latMin
    && lat <= entry.latMax
    && lng >= entry.lngMin
    && lng <= entry.lngMax
  ))

  if (!match) return DEFAULT_DEMO_ADDRESS

  return {
    street: match.street,
    postalCode: match.postalCode,
    city: match.city,
    country: match.country
  }
}

export function getFallbackDemoAddress(): DemoAddress {
  return DEFAULT_DEMO_ADDRESS
}
