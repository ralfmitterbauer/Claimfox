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
  },
  {
    claimNumber: 'CLM-2025-0013',
    firstName: 'Lena',
    lastName: 'Hartmann',
    licensePlate: 'B-LH 7721',
    incidentTime: '2025-01-01 14:10',
    address: 'Berlin, Charlottenburg',
    description: 'Seitenschaden beim Ausparken.'
  },
  {
    claimNumber: 'CLM-2025-0014',
    firstName: 'Max',
    lastName: 'Peters',
    licensePlate: 'M-MP 5512',
    incidentTime: '2024-12-29 19:35',
    address: 'München, Schwabing',
    description: 'Frontschaden nach Auffahrunfall.'
  },
  {
    claimNumber: 'CLM-2025-0015',
    firstName: 'Julia',
    lastName: 'Brandt',
    licensePlate: 'HH-JB 8093',
    incidentTime: '2024-12-28 07:50',
    address: 'Hamburg, Wandsbek',
    description: 'Glasschaden, Steinschlag Windschutzscheibe.'
  },
  {
    claimNumber: 'CLM-2025-0016',
    firstName: 'Daniel',
    lastName: 'Kuhn',
    licensePlate: 'F-DK 3340',
    incidentTime: '2024-12-27 16:05',
    address: 'Frankfurt, Gallus',
    description: 'Heckschaden durch Rückfahrunfall.'
  },
  {
    claimNumber: 'CLM-2025-0017',
    firstName: 'Sara',
    lastName: 'Vogel',
    licensePlate: 'S-SV 6802',
    incidentTime: '2024-12-26 11:25',
    address: 'Stuttgart, Bad Cannstatt',
    description: 'Seitliche Kollision im Kreisverkehr.'
  },
  {
    claimNumber: 'CLM-2025-0018',
    firstName: 'Philipp',
    lastName: 'Kaiser',
    licensePlate: 'K-PK 2049',
    incidentTime: '2024-12-24 18:45',
    address: 'Köln, Deutz',
    description: 'Parkschaden am Heckstoßfänger.'
  },
  {
    claimNumber: 'CLM-2025-0019',
    firstName: 'Mara',
    lastName: 'Bauer',
    licensePlate: 'D-MB 9130',
    incidentTime: '2024-12-23 09:15',
    address: 'Düsseldorf, Pempelfort',
    description: 'Spiegelkontakt in enger Straße.'
  },
  {
    claimNumber: 'CLM-2025-0020',
    firstName: 'Tim',
    lastName: 'Scholz',
    licensePlate: 'N-TS 4411',
    incidentTime: '2024-12-22 13:40',
    address: 'Nürnberg, Südstadt',
    description: 'Seitenschaden, Lackkratzer.'
  },
  {
    claimNumber: 'CLM-2025-0021',
    firstName: 'Anna',
    lastName: 'Dietrich',
    licensePlate: 'H-AD 5567',
    incidentTime: '2024-12-21 08:20',
    address: 'Hannover, List',
    description: 'Frontschaden durch Wildwechsel.'
  },
  {
    claimNumber: 'CLM-2025-0022',
    firstName: 'Nils',
    lastName: 'Friedrich',
    licensePlate: 'HB-NF 2308',
    incidentTime: '2024-12-20 17:10',
    address: 'Bremen, Oberneuland',
    description: 'Parkrempler, Stoßfänger vorne.'
  },
  {
    claimNumber: 'CLM-2025-0023',
    firstName: 'Claudia',
    lastName: 'Winter',
    licensePlate: 'L-CW 7194',
    incidentTime: '2024-12-19 12:55',
    address: 'Leipzig, Plagwitz',
    description: 'Seitenschaden an der Tür.'
  },
  {
    claimNumber: 'CLM-2025-0024',
    firstName: 'Jan',
    lastName: 'Zimmer',
    licensePlate: 'B-JZ 6655',
    incidentTime: '2024-12-18 07:30',
    address: 'Berlin, Mitte',
    description: 'Heckschaden im Berufsverkehr.'
  },
  {
    claimNumber: 'CLM-2025-0025',
    firstName: 'Miriam',
    lastName: 'Koch',
    licensePlate: 'M-MK 4004',
    incidentTime: '2024-12-17 15:00',
    address: 'München, Moosach',
    description: 'Glasschaden, Riss in der Scheibe.'
  },
  {
    claimNumber: 'CLM-2025-0026',
    firstName: 'Sebastian',
    lastName: 'Lenz',
    licensePlate: 'HH-SL 1022',
    incidentTime: '2024-12-16 10:05',
    address: 'Hamburg, Eimsbuettel',
    description: 'Kratzer an der Seite, unbekannter Verursacher.'
  },
  {
    claimNumber: 'CLM-2025-0027',
    firstName: 'Laura',
    lastName: 'Krause',
    licensePlate: 'F-LK 7729',
    incidentTime: '2024-12-15 18:30',
    address: 'Frankfurt, Sachsenhausen',
    description: 'Anprall an Bordstein, Felgenschaden.'
  },
  {
    claimNumber: 'CLM-2025-0028',
    firstName: 'Jonas',
    lastName: 'Meier',
    licensePlate: 'S-JM 4488',
    incidentTime: '2024-12-14 14:15',
    address: 'Stuttgart, Degerloch',
    description: 'Seitliche Kollision beim Einfädeln.'
  },
  {
    claimNumber: 'CLM-2025-0029',
    firstName: 'Elena',
    lastName: 'Lorenz',
    licensePlate: 'K-EL 3377',
    incidentTime: '2024-12-13 09:50',
    address: 'Köln, Lindenthal',
    description: 'Parkschaden an der Stoßstange.'
  },
  {
    claimNumber: 'CLM-2025-0030',
    firstName: 'Paul',
    lastName: 'Maurer',
    licensePlate: 'D-PM 9801',
    incidentTime: '2024-12-12 07:05',
    address: 'Duesseldorf, Bilk',
    description: 'Heckschaden beim Rangieren.'
  },
  {
    claimNumber: 'CLM-2025-0031',
    firstName: 'Tina',
    lastName: 'Schubert',
    licensePlate: 'N-TS 5042',
    incidentTime: '2024-12-11 16:20',
    address: 'Nuernberg, Erlenstegen',
    description: 'Seitenschaden, Kontakt mit Leitplanke.'
  },
  {
    claimNumber: 'CLM-2025-0032',
    firstName: 'Niklas',
    lastName: 'Otto',
    licensePlate: 'H-NO 6120',
    incidentTime: '2024-12-10 11:40',
    address: 'Hannover, Nordstadt',
    description: 'Frontschaden, Auffahrunfall an Ampel.'
  },
  {
    claimNumber: 'CLM-2025-0033',
    firstName: 'Isabel',
    lastName: 'Seitz',
    licensePlate: 'HB-IS 2209',
    incidentTime: '2024-12-09 08:55',
    address: 'Bremen, Findorff',
    description: 'Glasschaden, Steinschlag.'
  },
  {
    claimNumber: 'CLM-2025-0034',
    firstName: 'Markus',
    lastName: 'Haase',
    licensePlate: 'L-MH 7733',
    incidentTime: '2024-12-08 19:10',
    address: 'Leipzig, Gohlis',
    description: 'Seitliche Kollision, Lackschaden.'
  },
  {
    claimNumber: 'CLM-2025-0035',
    firstName: 'Svenja',
    lastName: 'Arnold',
    licensePlate: 'B-SA 4450',
    incidentTime: '2024-12-07 13:25',
    address: 'Berlin, Prenzlauer Berg',
    description: 'Parkschaden, Kratzer hinten.'
  },
  {
    claimNumber: 'CLM-2025-0036',
    firstName: 'David',
    lastName: 'Franke',
    licensePlate: 'M-DF 8812',
    incidentTime: '2024-12-06 10:10',
    address: 'Muenchen, Sendling',
    description: 'Heckschaden durch Auffahrunfall.'
  },
  {
    claimNumber: 'CLM-2025-0037',
    firstName: 'Klara',
    lastName: 'Hein',
    licensePlate: 'HH-KH 3099',
    incidentTime: '2024-12-05 17:55',
    address: 'Hamburg, Barmbek',
    description: 'Seitenschaden beim Einparken.'
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
