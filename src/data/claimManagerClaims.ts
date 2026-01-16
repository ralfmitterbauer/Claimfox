export const STORAGE_KEY = 'claimfox_claim_assistant'
export const CLAIMS_LIST_KEY = 'claimfox_claims_list'

export type StoredClaimData = {
  claimNumber?: string
  firstName?: string
  lastName?: string
  licensePlate?: string
  incidentTime?: string
  address?: string
  description?: string
  photoCount?: number
  mediaItems?: Array<{ type: 'image' | 'video'; src: string }>
}

export const DEMO_CLAIMS: StoredClaimData[] = [
  {
    claimNumber: 'CLM-2025-0001',
    firstName: 'Mira',
    lastName: 'Schuster',
    licensePlate: 'HH-MS 2451',
    incidentTime: '2025-01-12 08:45',
    address: 'Hamburg, HafenCity',
    description: 'Auffahrunfall im Stadtverkehr, Stoßfänger beschädigt.'
  },
  {
    claimNumber: 'CLM-2025-0002',
    firstName: 'Tobias',
    lastName: 'Neumann',
    licensePlate: 'B-TN 9876',
    incidentTime: '2025-01-11 17:20',
    address: 'Berlin, Friedrichshain',
    description: 'Seitlicher Kontakt beim Spurwechsel, Kratzer Tür.'
  },
  {
    claimNumber: 'CLM-2025-0003',
    firstName: 'Lea',
    lastName: 'Bergmann',
    licensePlate: 'M-LB 3307',
    incidentTime: '2025-01-10 06:15',
    address: 'München, A9 Ausfahrt',
    description: 'Glasschaden, Steinschlag auf Autobahn.'
  },
  {
    claimNumber: 'CLM-2025-0004',
    firstName: 'Jonas',
    lastName: 'Keller',
    licensePlate: 'K-JK 4112',
    incidentTime: '2025-01-09 13:05',
    address: 'Köln, Ehrenfeld',
    description: 'Parkschaden, Stoßfänger hinten eingedrückt.'
  },
  {
    claimNumber: 'CLM-2025-0005',
    firstName: 'Sofia',
    lastName: 'Lang',
    licensePlate: 'F-SL 7788',
    incidentTime: '2025-01-08 09:30',
    address: 'Frankfurt, Ostend',
    description: 'Auffahrunfall, Rücklicht beschädigt.'
  },
  {
    claimNumber: 'CLM-2025-0006',
    firstName: 'Leon',
    lastName: 'Wagner',
    licensePlate: 'S-LW 5420',
    incidentTime: '2025-01-07 18:50',
    address: 'Stuttgart, Vaihingen',
    description: 'Spiegelkontakt an Engstelle, Gehäuse gebrochen.'
  },
  {
    claimNumber: 'CLM-2025-0007',
    firstName: 'Nora',
    lastName: 'Hoffmann',
    licensePlate: 'D-NH 2003',
    incidentTime: '2025-01-07 07:10',
    address: 'Düsseldorf, Medienhafen',
    description: 'Frontschaden durch Wildwechsel, Stoßfänger defekt.'
  },
  {
    claimNumber: 'CLM-2025-0008',
    firstName: 'Paul',
    lastName: 'Schneider',
    licensePlate: 'HB-PS 1189',
    incidentTime: '2025-01-06 15:40',
    address: 'Bremen, Neustadt',
    description: 'Seitenschaden, Bordsteinberührung.'
  },
  {
    claimNumber: 'CLM-2025-0009',
    firstName: 'Hannah',
    lastName: 'Richter',
    licensePlate: 'L-HR 6044',
    incidentTime: '2025-01-05 11:25',
    address: 'Leipzig, Zentrum',
    description: 'Heckschaden, Rückfahrunfall.'
  },
  {
    claimNumber: 'CLM-2025-0010',
    firstName: 'Felix',
    lastName: 'Krüger',
    licensePlate: 'H-FK 9901',
    incidentTime: '2025-01-04 20:05',
    address: 'Hannover, Südstadt',
    description: 'Glasschaden, Frontscheibe gerissen.'
  },
  {
    claimNumber: 'CLM-2025-0011',
    firstName: 'Clara',
    lastName: 'Becker',
    licensePlate: 'N-CB 3310',
    incidentTime: '2025-01-03 14:55',
    address: 'Nürnberg, Nordring',
    description: 'Seitlicher Kontakt, Kotflügel beschädigt.'
  },
  {
    claimNumber: 'CLM-2025-0012',
    firstName: 'Emil',
    lastName: 'Seidel',
    licensePlate: 'HH-ES 2477',
    incidentTime: '2025-01-02 10:35',
    address: 'Hamburg, Altona',
    description: 'Parkrempler, Lackschaden.'
  }
]

export function loadClaims() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CLAIMS_LIST_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredClaimData[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function loadAssistantClaim() {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    return JSON.parse(raw) as StoredClaimData
  } catch {
    return undefined
  }
}
