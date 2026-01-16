export const STORAGE_KEY = 'claimfox_claim_assistant'
export const CLAIMS_LIST_KEY = 'claimfox_claims_list'
const CLAIMS_VERSION_KEY = 'claimfox_claims_list_version'
const CLAIMS_VERSION = '2'

import claimDamage1 from '@/assets/images/claim_damage_1.png'
import claimDamage2 from '@/assets/images/claim_damage_2.png'
import claimDamage3 from '@/assets/images/claim_damage_3.png'
import claimDamage4 from '@/assets/images/claim_damage_4.png'

export type ClaimStatusKey = 'intake' | 'review' | 'approval' | 'repair' | 'closure'
export type CostStatus = 'pending' | 'approved' | 'rejected'

export type ClaimCostItem = {
  id: string
  labelKey: string
  amount: number
  status: CostStatus
  note: string
}

export type ClaimCoverage = {
  policyNumber: string
  term: string
  limit: string
  exclusion: string
  covered: boolean
  note: string
}

export type ClaimKpiValues = {
  totalIncurred: string
  reserve: string
  approved: string
  openItems: string
  deductible: string
  coverage: string
  fraudRisk: string
  handlingTime: string
}

export type StoredClaimData = {
  claimNumber?: string
  firstName?: string
  lastName?: string
  licensePlate?: string
  incidentTime?: string
  address?: string
  description?: string
  damageTypeKey?: string
  statusKey?: ClaimStatusKey
  kpiValues?: ClaimKpiValues
  costItems?: ClaimCostItem[]
  coverage?: ClaimCoverage
  photoCount?: number
  mediaItems?: Array<{ type: 'image' | 'video'; src: string }>
}

const DAMAGE_MEDIA = [claimDamage1, claimDamage2, claimDamage3, claimDamage4]
const STATUS_KEYS: ClaimStatusKey[] = ['intake', 'review', 'approval', 'repair', 'closure']
const DAMAGE_TYPE_KEYS = [
  'rearCollision',
  'frontCollision',
  'sideCollision',
  'parkingDamage',
  'glassDamage',
  'wildlife',
  'mirrorContact',
  'hailDamage',
  'theft',
  'waterDamage',
  'fireDamage',
  'vandalism'
]

const BASE_CLAIMS: StoredClaimData[] = [
  {
    claimNumber: 'CLM-2026-519414',
    firstName: 'Mira',
    lastName: 'Schuster',
    licensePlate: 'HH-MS 2451',
    incidentTime: '15.01.2026 15:54',
    address: 'Hamburg, HafenCity',
    description: 'Auffahrunfall im Stadtverkehr, Stoßfänger beschädigt.'
  },
  {
    claimNumber: 'CLM-2026-402781',
    firstName: 'Tobias',
    lastName: 'Neumann',
    licensePlate: 'B-TN 9876',
    incidentTime: '14.01.2026 17:20',
    address: 'Berlin, Friedrichshain',
    description: 'Seitlicher Kontakt beim Spurwechsel, Kratzer Tür.'
  },
  {
    claimNumber: 'CLM-2026-788205',
    firstName: 'Lea',
    lastName: 'Bergmann',
    licensePlate: 'M-LB 3307',
    incidentTime: '13.01.2026 06:15',
    address: 'München, A9 Ausfahrt',
    description: 'Glasschaden, Steinschlag auf Autobahn.'
  },
  {
    claimNumber: 'CLM-2026-905672',
    firstName: 'Jonas',
    lastName: 'Keller',
    licensePlate: 'K-JK 4112',
    incidentTime: '12.01.2026 13:05',
    address: 'Köln, Ehrenfeld',
    description: 'Parkschaden, Stoßfänger hinten eingedrückt.'
  },
  {
    claimNumber: 'CLM-2026-134982',
    firstName: 'Sofia',
    lastName: 'Lang',
    licensePlate: 'F-SL 7788',
    incidentTime: '11.01.2026 09:30',
    address: 'Frankfurt, Ostend',
    description: 'Auffahrunfall, Rücklicht beschädigt.'
  },
  {
    claimNumber: 'CLM-2026-667430',
    firstName: 'Leon',
    lastName: 'Wagner',
    licensePlate: 'S-LW 5420',
    incidentTime: '10.01.2026 18:50',
    address: 'Stuttgart, Vaihingen',
    description: 'Spiegelkontakt an Engstelle, Gehäuse gebrochen.'
  },
  {
    claimNumber: 'CLM-2026-842197',
    firstName: 'Nora',
    lastName: 'Hoffmann',
    licensePlate: 'D-NH 2003',
    incidentTime: '09.01.2026 07:10',
    address: 'Düsseldorf, Medienhafen',
    description: 'Frontschaden durch Wildwechsel, Stoßfänger defekt.'
  },
  {
    claimNumber: 'CLM-2026-275604',
    firstName: 'Paul',
    lastName: 'Schneider',
    licensePlate: 'HB-PS 1189',
    incidentTime: '08.01.2026 15:40',
    address: 'Bremen, Neustadt',
    description: 'Seitenschaden, Bordsteinberührung.'
  },
  {
    claimNumber: 'CLM-2026-590738',
    firstName: 'Hannah',
    lastName: 'Richter',
    licensePlate: 'L-HR 6044',
    incidentTime: '07.01.2026 11:25',
    address: 'Leipzig, Zentrum',
    description: 'Heckschaden, Rückfahrunfall.'
  },
  {
    claimNumber: 'CLM-2026-316905',
    firstName: 'Felix',
    lastName: 'Krüger',
    licensePlate: 'H-FK 9901',
    incidentTime: '06.01.2026 20:05',
    address: 'Hannover, Südstadt',
    description: 'Glasschaden, Frontscheibe gerissen.'
  },
  {
    claimNumber: 'CLM-2026-740815',
    firstName: 'Clara',
    lastName: 'Becker',
    licensePlate: 'N-CB 3310',
    incidentTime: '05.01.2026 14:55',
    address: 'Nürnberg, Nordring',
    description: 'Seitlicher Kontakt, Kotflügel beschädigt.'
  },
  {
    claimNumber: 'CLM-2026-982450',
    firstName: 'Emil',
    lastName: 'Seidel',
    licensePlate: 'HH-ES 2477',
    incidentTime: '04.01.2026 10:35',
    address: 'Hamburg, Altona',
    description: 'Parkrempler, Lackschaden.'
  },
  {
    claimNumber: 'CLM-2026-158932',
    firstName: 'Lena',
    lastName: 'Hartmann',
    licensePlate: 'B-LH 7721',
    incidentTime: '03.01.2026 14:10',
    address: 'Berlin, Charlottenburg',
    description: 'Seitenschaden beim Ausparken.'
  },
  {
    claimNumber: 'CLM-2026-673521',
    firstName: 'Max',
    lastName: 'Peters',
    licensePlate: 'M-MP 5512',
    incidentTime: '02.01.2026 19:35',
    address: 'München, Schwabing',
    description: 'Frontschaden nach Auffahrunfall.'
  },
  {
    claimNumber: 'CLM-2026-491807',
    firstName: 'Julia',
    lastName: 'Brandt',
    licensePlate: 'HH-JB 8093',
    incidentTime: '01.01.2026 07:50',
    address: 'Hamburg, Wandsbek',
    description: 'Glasschaden, Steinschlag Windschutzscheibe.'
  },
  {
    claimNumber: 'CLM-2026-738206',
    firstName: 'Daniel',
    lastName: 'Kuhn',
    licensePlate: 'F-DK 3340',
    incidentTime: '31.12.2025 16:05',
    address: 'Frankfurt, Gallus',
    description: 'Heckschaden durch Rückfahrunfall.'
  },
  {
    claimNumber: 'CLM-2026-205947',
    firstName: 'Sara',
    lastName: 'Vogel',
    licensePlate: 'S-SV 6802',
    incidentTime: '30.12.2025 11:25',
    address: 'Stuttgart, Bad Cannstatt',
    description: 'Seitliche Kollision im Kreisverkehr.'
  },
  {
    claimNumber: 'CLM-2026-894312',
    firstName: 'Philipp',
    lastName: 'Kaiser',
    licensePlate: 'K-PK 2049',
    incidentTime: '29.12.2025 18:45',
    address: 'Köln, Deutz',
    description: 'Parkschaden am Heckstoßfänger.'
  },
  {
    claimNumber: 'CLM-2026-560189',
    firstName: 'Mara',
    lastName: 'Bauer',
    licensePlate: 'D-MB 9130',
    incidentTime: '28.12.2025 09:15',
    address: 'Düsseldorf, Pempelfort',
    description: 'Spiegelkontakt in enger Straße.'
  },
  {
    claimNumber: 'CLM-2026-317504',
    firstName: 'Tim',
    lastName: 'Scholz',
    licensePlate: 'N-TS 4411',
    incidentTime: '27.12.2025 13:40',
    address: 'Nürnberg, Südstadt',
    description: 'Seitenschaden, Lackkratzer.'
  },
  {
    claimNumber: 'CLM-2026-709833',
    firstName: 'Anna',
    lastName: 'Dietrich',
    licensePlate: 'H-AD 5567',
    incidentTime: '26.12.2025 08:20',
    address: 'Hannover, List',
    description: 'Frontschaden durch Wildwechsel.'
  },
  {
    claimNumber: 'CLM-2026-485902',
    firstName: 'Nils',
    lastName: 'Friedrich',
    licensePlate: 'HB-NF 2308',
    incidentTime: '25.12.2025 17:10',
    address: 'Bremen, Oberneuland',
    description: 'Parkrempler, Stoßfänger vorne.'
  },
  {
    claimNumber: 'CLM-2026-932750',
    firstName: 'Claudia',
    lastName: 'Winter',
    licensePlate: 'L-CW 7194',
    incidentTime: '24.12.2025 12:55',
    address: 'Leipzig, Plagwitz',
    description: 'Seitenschaden an der Tür.'
  },
  {
    claimNumber: 'CLM-2026-624089',
    firstName: 'Jan',
    lastName: 'Zimmer',
    licensePlate: 'B-JZ 6655',
    incidentTime: '23.12.2025 07:30',
    address: 'Berlin, Mitte',
    description: 'Heckschaden im Berufsverkehr.'
  },
  {
    claimNumber: 'CLM-2026-410376',
    firstName: 'Miriam',
    lastName: 'Koch',
    licensePlate: 'M-MK 4004',
    incidentTime: '22.12.2025 15:00',
    address: 'München, Moosach',
    description: 'Glasschaden, Riss in der Scheibe.'
  },
  {
    claimNumber: 'CLM-2026-857209',
    firstName: 'Sebastian',
    lastName: 'Lenz',
    licensePlate: 'HH-SL 1022',
    incidentTime: '21.12.2025 10:05',
    address: 'Hamburg, Eimsbuettel',
    description: 'Kratzer an der Seite, unbekannter Verursacher.'
  },
  {
    claimNumber: 'CLM-2026-304915',
    firstName: 'Laura',
    lastName: 'Krause',
    licensePlate: 'F-LK 7729',
    incidentTime: '20.12.2025 18:30',
    address: 'Frankfurt, Sachsenhausen',
    description: 'Anprall an Bordstein, Felgenschaden.'
  },
  {
    claimNumber: 'CLM-2026-698412',
    firstName: 'Jonas',
    lastName: 'Meier',
    licensePlate: 'S-JM 4488',
    incidentTime: '19.12.2025 14:15',
    address: 'Stuttgart, Degerloch',
    description: 'Seitliche Kollision beim Einfädeln.'
  },
  {
    claimNumber: 'CLM-2026-521780',
    firstName: 'Elena',
    lastName: 'Lorenz',
    licensePlate: 'K-EL 3377',
    incidentTime: '18.12.2025 09:50',
    address: 'Köln, Lindenthal',
    description: 'Parkschaden an der Stoßstange.'
  },
  {
    claimNumber: 'CLM-2026-745093',
    firstName: 'Paul',
    lastName: 'Maurer',
    licensePlate: 'D-PM 9801',
    incidentTime: '17.12.2025 07:05',
    address: 'Duesseldorf, Bilk',
    description: 'Heckschaden beim Rangieren.'
  },
  {
    claimNumber: 'CLM-2026-268047',
    firstName: 'Tina',
    lastName: 'Schubert',
    licensePlate: 'N-TS 5042',
    incidentTime: '16.12.2025 16:20',
    address: 'Nuernberg, Erlenstegen',
    description: 'Seitenschaden, Kontakt mit Leitplanke.'
  },
  {
    claimNumber: 'CLM-2026-907421',
    firstName: 'Niklas',
    lastName: 'Otto',
    licensePlate: 'H-NO 6120',
    incidentTime: '15.12.2025 11:40',
    address: 'Hannover, Nordstadt',
    description: 'Frontschaden, Auffahrunfall an Ampel.'
  },
  {
    claimNumber: 'CLM-2026-453680',
    firstName: 'Isabel',
    lastName: 'Seitz',
    licensePlate: 'HB-IS 2209',
    incidentTime: '14.12.2025 08:55',
    address: 'Bremen, Findorff',
    description: 'Glasschaden, Steinschlag.'
  },
  {
    claimNumber: 'CLM-2026-830591',
    firstName: 'Markus',
    lastName: 'Haase',
    licensePlate: 'L-MH 7733',
    incidentTime: '13.12.2025 19:10',
    address: 'Leipzig, Gohlis',
    description: 'Seitliche Kollision, Lackschaden.'
  },
  {
    claimNumber: 'CLM-2026-592704',
    firstName: 'Svenja',
    lastName: 'Arnold',
    licensePlate: 'B-SA 4450',
    incidentTime: '12.12.2025 13:25',
    address: 'Berlin, Prenzlauer Berg',
    description: 'Parkschaden, Kratzer hinten.'
  },
  {
    claimNumber: 'CLM-2026-174509',
    firstName: 'David',
    lastName: 'Franke',
    licensePlate: 'M-DF 8812',
    incidentTime: '11.12.2025 10:10',
    address: 'Muenchen, Sendling',
    description: 'Heckschaden durch Auffahrunfall.'
  },
  {
    claimNumber: 'CLM-2026-681230',
    firstName: 'Klara',
    lastName: 'Hein',
    licensePlate: 'HH-KH 3099',
    incidentTime: '10.12.2025 17:55',
    address: 'Hamburg, Barmbek',
    description: 'Seitenschaden beim Einparken.'
  }
]

function formatEuro(value: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

function getSeedFromClaimNumber(claimNumber?: string, fallback = 1) {
  if (!claimNumber) return fallback
  const digits = claimNumber.replace(/\D/g, '')
  const seed = digits
    .split('')
    .reduce((sum, digit) => sum + Number(digit || 0), 0)
  return seed || fallback
}

function buildMedia(orderSeed: number) {
  return Array.from({ length: 4 }, (_, index) => {
    const imageIndex = (orderSeed + index) % DAMAGE_MEDIA.length
    return { type: 'image' as const, src: DAMAGE_MEDIA[imageIndex] }
  })
}

function buildCostItems(seed: number): ClaimCostItem[] {
  const base = 1100 + seed * 85
  return [
    {
      id: `c-${seed}-1`,
      labelKey: 'bodywork',
      amount: base,
      status: seed % 3 === 0 ? 'approved' : 'pending',
      note: seed % 4 === 0 ? 'Freigabe angefordert.' : ''
    },
    {
      id: `c-${seed}-2`,
      labelKey: 'paint',
      amount: base * 0.35,
      status: seed % 4 === 0 ? 'rejected' : 'approved',
      note: seed % 4 === 0 ? 'Alternativangebot prüfen.' : ''
    },
    {
      id: `c-${seed}-3`,
      labelKey: 'rental',
      amount: 180 + seed * 12,
      status: seed % 5 === 0 ? 'pending' : 'approved',
      note: seed % 5 === 0 ? 'Nachweise fehlen.' : ''
    }
  ]
}

function buildCoverage(seed: number): ClaimCoverage {
  const covered = seed % 6 !== 0
  return {
    policyNumber: `POL-${2024 + (seed % 2)}-${8000 + seed}`,
    term: covered ? '01.01.2025 - 31.12.2025' : '01.07.2024 - 30.06.2025',
    limit: `Deckungssumme ${formatEuro(50000 + seed * 900)}`,
    exclusion: covered ? 'Keine Ausschlüsse relevant' : 'Abzug aufgrund Sonderregelung',
    covered,
    note: covered ? 'Deckung bestätigt, Freigabe möglich.' : 'Teilweise gedeckt, Review erforderlich.'
  }
}

function buildKpis(seed: number): ClaimKpiValues {
  const total = 2400 + seed * 190
  const reserve = Math.round(total * 0.28)
  const approved = Math.round(total * 0.45)
  const deductible = 150 + (seed % 5) * 100
  const fraudLevels = ['Niedrig', 'Mittel', 'Hoch']
  const coverage = seed % 6 === 0 ? 'Teilgedeckt' : 'Gedeckt'
  return {
    totalIncurred: formatEuro(total),
    reserve: formatEuro(reserve),
    approved: formatEuro(approved),
    openItems: `${2 + (seed % 5)}`,
    deductible: formatEuro(deductible),
    coverage,
    fraudRisk: fraudLevels[seed % fraudLevels.length],
    handlingTime: `${3 + (seed % 7)} Tage`
  }
}

function enrichClaimData(claim: StoredClaimData, indexSeed: number) {
  const seed = getSeedFromClaimNumber(claim.claimNumber, indexSeed)
  return {
    ...claim,
    damageTypeKey: claim.damageTypeKey ?? DAMAGE_TYPE_KEYS[seed % DAMAGE_TYPE_KEYS.length],
    statusKey: claim.statusKey ?? STATUS_KEYS[seed % STATUS_KEYS.length],
    kpiValues: claim.kpiValues ?? buildKpis(seed),
    costItems: claim.costItems ?? buildCostItems(seed),
    coverage: claim.coverage ?? buildCoverage(seed),
    mediaItems: claim.mediaItems?.length ? claim.mediaItems : buildMedia(seed),
    photoCount: 4
  }
}

export const DEMO_CLAIMS: StoredClaimData[] = BASE_CLAIMS.map((claim, index) =>
  enrichClaimData(claim, index + 1)
)

function resetStoredClaimsIfNeeded() {
  if (typeof window === 'undefined') return
  const version = window.localStorage.getItem(CLAIMS_VERSION_KEY)
  if (version === CLAIMS_VERSION) return
  window.localStorage.removeItem(CLAIMS_LIST_KEY)
  window.localStorage.setItem(CLAIMS_VERSION_KEY, CLAIMS_VERSION)
}

export function loadClaims() {
  if (typeof window === 'undefined') return []
  resetStoredClaimsIfNeeded()
  try {
    const raw = window.localStorage.getItem(CLAIMS_LIST_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredClaimData[]
    if (!Array.isArray(parsed)) return []
    const enriched = parsed.map((claim, index) => enrichClaimData(claim, index + 1))
    const merged = [...enriched, ...DEMO_CLAIMS]
    const seen = new Set<string>()
    return merged.filter((claim) => {
      const id = claim.claimNumber || ''
      if (!id || seen.has(id)) return false
      seen.add(id)
      return true
    })
  } catch {
    return []
  }
}

export function loadAssistantClaim() {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as StoredClaimData
    return enrichClaimData(parsed, 1)
  } catch {
    return undefined
  }
}
