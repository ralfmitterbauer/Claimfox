export const STORAGE_KEY = 'claimfox_claim_assistant'
export const CLAIMS_LIST_KEY = 'claimfox_claims_list'

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
  noteEn?: string
}

export type ClaimCoverage = {
  policyNumber: string
  term: string
  limit: string
  limitEn?: string
  exclusion: string
  exclusionEn?: string
  covered: boolean
  note: string
  noteEn?: string
}

export type ClaimKpiValues = {
  totalIncurred: string
  reserve: string
  approved: string
  openItems: string
  deductible: string
  coverage: string
  coverageEn?: string
  fraudRisk: string
  fraudRiskEn?: string
  handlingTime: string
  handlingTimeEn?: string
}

export type StoredClaimData = {
  claimNumber?: string
  firstName?: string
  lastName?: string
  licensePlate?: string
  incidentTime?: string
  address?: string
  addressEn?: string
  description?: string
  descriptionEn?: string
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
  'vandalism',
  'stormDamage',
  'engineDamage',
  'tireDamage',
  'cargoDamage',
  'liabilityDamage',
  'animalDamage'
]

const DAMAGE_DESCRIPTIONS: Record<
  (typeof DAMAGE_TYPE_KEYS)[number],
  { de: string; en: string }
> = {
  rearCollision: {
    de: 'Heckaufprall im Stop-and-Go, Stoßfänger und Rücklicht beschädigt.',
    en: 'Rear-end impact in stop-and-go traffic, bumper and tail light damaged.'
  },
  frontCollision: {
    de: 'Frontkollision an Kreuzung, Kühlergrill und Stoßfänger betroffen.',
    en: 'Front collision at an intersection, grille and bumper affected.'
  },
  sideCollision: {
    de: 'Seitliche Kollision beim Spurwechsel, Tür und Kotflügel beschädigt.',
    en: 'Side impact during lane change, door and fender damaged.'
  },
  parkingDamage: {
    de: 'Parkschaden mit Kratzern und Dellen am Heck.',
    en: 'Parking damage with scratches and dents at the rear.'
  },
  glassDamage: {
    de: 'Steinschlag an der Frontscheibe, Rissbildung sichtbar.',
    en: 'Stone chip on the windshield, visible cracking.'
  },
  wildlife: {
    de: 'Wildunfall auf Landstraße, Frontschaden am Fahrzeug.',
    en: 'Wildlife collision on a rural road, front damage to the vehicle.'
  },
  mirrorContact: {
    de: 'Spiegelkontakt in Engstelle, Spiegelgehäuse gebrochen.',
    en: 'Mirror contact in a narrow section, mirror housing cracked.'
  },
  hailDamage: {
    de: 'Hagelschaden mit Dellen auf Motorhaube und Dach.',
    en: 'Hail damage with dents on hood and roof.'
  },
  theft: {
    de: 'Diebstahl von Anbauteilen, Fahrzeug gesichert abgestellt.',
    en: 'Theft of exterior parts, vehicle parked and secured.'
  },
  waterDamage: {
    de: 'Wasserschaden nach Starkregen, Elektronik betroffen.',
    en: 'Water damage after heavy rain, electronics affected.'
  },
  fireDamage: {
    de: 'Brandschaden im Motorraum, Kabelbaum beschädigt.',
    en: 'Fire damage in the engine bay, wiring harness damaged.'
  },
  vandalism: {
    de: 'Vandalismusschaden, Lack zerkratzt und Scheibe beschädigt.',
    en: 'Vandalism damage, paint scratched and window damaged.'
  },
  stormDamage: {
    de: 'Sturmschaden durch herabfallende Äste, Dach beschädigt.',
    en: 'Storm damage from falling branches, roof damaged.'
  },
  engineDamage: {
    de: 'Motorschaden nach Warnmeldung, Fahrzeug abgeschleppt.',
    en: 'Engine damage after warning alert, vehicle towed.'
  },
  tireDamage: {
    de: 'Reifenschaden durch Fremdkörper, Felge beschädigt.',
    en: 'Tire damage due to debris, rim damaged.'
  },
  cargoDamage: {
    de: 'Ladungsschaden bei Transport, Verpackung beschädigt.',
    en: 'Cargo damage during transport, packaging damaged.'
  },
  liabilityDamage: {
    de: 'Haftpflichtschaden durch Fremdschaden, Anspruch geprüft.',
    en: 'Liability claim due to third-party damage, claim under review.'
  },
  animalDamage: {
    de: 'Tierschaden am Fahrzeug, Kotflügel beschädigt.',
    en: 'Animal damage to the vehicle, fender damaged.'
  }
}

const BASE_CLAIMS: StoredClaimData[] = [
  {
    claimNumber: 'DE-519414',
    firstName: 'Mira',
    lastName: 'Schuster',
    licensePlate: 'HH-MS 2451',
    incidentTime: '15.01.2026 15:54',
    address: 'Hamburg, HafenCity',
    description: 'Auffahrunfall im Stadtverkehr, Stoßfänger beschädigt.'
  },
  {
    claimNumber: 'AT-402781',
    firstName: 'Tobias',
    lastName: 'Neumann',
    licensePlate: 'B-TN 9876',
    incidentTime: '14.01.2026 17:20',
    address: 'Berlin, Friedrichshain',
    description: 'Seitlicher Kontakt beim Spurwechsel, Kratzer Tür.'
  },
  {
    claimNumber: 'CH-788205',
    firstName: 'Lea',
    lastName: 'Bergmann',
    licensePlate: 'M-LB 3307',
    incidentTime: '13.01.2026 06:15',
    address: 'München, A9 Ausfahrt',
    description: 'Glasschaden, Steinschlag auf Autobahn.'
  },
  {
    claimNumber: 'NL-905672',
    firstName: 'Jonas',
    lastName: 'Keller',
    licensePlate: 'K-JK 4112',
    incidentTime: '12.01.2026 13:05',
    address: 'Köln, Ehrenfeld',
    description: 'Parkschaden, Stoßfänger hinten eingedrückt.'
  },
  {
    claimNumber: 'FR-134982',
    firstName: 'Sofia',
    lastName: 'Lang',
    licensePlate: 'F-SL 7788',
    incidentTime: '11.01.2026 09:30',
    address: 'Frankfurt, Ostend',
    description: 'Auffahrunfall, Rücklicht beschädigt.'
  },
  {
    claimNumber: 'IT-667430',
    firstName: 'Leon',
    lastName: 'Wagner',
    licensePlate: 'S-LW 5420',
    incidentTime: '10.01.2026 18:50',
    address: 'Stuttgart, Vaihingen',
    description: 'Spiegelkontakt an Engstelle, Gehäuse gebrochen.'
  },
  {
    claimNumber: 'ES-842197',
    firstName: 'Nora',
    lastName: 'Hoffmann',
    licensePlate: 'D-NH 2003',
    incidentTime: '09.01.2026 07:10',
    address: 'Düsseldorf, Medienhafen',
    description: 'Frontschaden durch Wildwechsel, Stoßfänger defekt.'
  },
  {
    claimNumber: 'PL-275604',
    firstName: 'Paul',
    lastName: 'Schneider',
    licensePlate: 'HB-PS 1189',
    incidentTime: '08.01.2026 15:40',
    address: 'Bremen, Neustadt',
    description: 'Seitenschaden, Bordsteinberührung.'
  },
  {
    claimNumber: 'BE-590738',
    firstName: 'Hannah',
    lastName: 'Richter',
    licensePlate: 'L-HR 6044',
    incidentTime: '07.01.2026 11:25',
    address: 'Leipzig, Zentrum',
    description: 'Heckschaden, Rückfahrunfall.'
  },
  {
    claimNumber: 'DK-316905',
    firstName: 'Felix',
    lastName: 'Krüger',
    licensePlate: 'H-FK 9901',
    incidentTime: '06.01.2026 20:05',
    address: 'Hannover, Südstadt',
    description: 'Glasschaden, Frontscheibe gerissen.'
  },
  {
    claimNumber: 'SE-740815',
    firstName: 'Clara',
    lastName: 'Becker',
    licensePlate: 'N-CB 3310',
    incidentTime: '05.01.2026 14:55',
    address: 'Nürnberg, Nordring',
    description: 'Seitlicher Kontakt, Kotflügel beschädigt.'
  },
  {
    claimNumber: 'NO-982450',
    firstName: 'Emil',
    lastName: 'Seidel',
    licensePlate: 'HH-ES 2477',
    incidentTime: '04.01.2026 10:35',
    address: 'Hamburg, Altona',
    description: 'Parkrempler, Lackschaden.'
  },
  {
    claimNumber: 'FI-158932',
    firstName: 'Lena',
    lastName: 'Hartmann',
    licensePlate: 'B-LH 7721',
    incidentTime: '03.01.2026 14:10',
    address: 'Berlin, Charlottenburg',
    description: 'Seitenschaden beim Ausparken.'
  },
  {
    claimNumber: 'CZ-673521',
    firstName: 'Max',
    lastName: 'Peters',
    licensePlate: 'M-MP 5512',
    incidentTime: '02.01.2026 19:35',
    address: 'München, Schwabing',
    description: 'Frontschaden nach Auffahrunfall.'
  },
  {
    claimNumber: 'SK-491807',
    firstName: 'Julia',
    lastName: 'Brandt',
    licensePlate: 'HH-JB 8093',
    incidentTime: '01.01.2026 07:50',
    address: 'Hamburg, Wandsbek',
    description: 'Glasschaden, Steinschlag Windschutzscheibe.'
  },
  {
    claimNumber: 'HU-738206',
    firstName: 'Daniel',
    lastName: 'Kuhn',
    licensePlate: 'F-DK 3340',
    incidentTime: '31.12.2025 16:05',
    address: 'Frankfurt, Gallus',
    description: 'Heckschaden durch Rückfahrunfall.'
  },
  {
    claimNumber: 'RO-205947',
    firstName: 'Sara',
    lastName: 'Vogel',
    licensePlate: 'S-SV 6802',
    incidentTime: '30.12.2025 11:25',
    address: 'Stuttgart, Bad Cannstatt',
    description: 'Seitliche Kollision im Kreisverkehr.'
  },
  {
    claimNumber: 'BG-894312',
    firstName: 'Philipp',
    lastName: 'Kaiser',
    licensePlate: 'K-PK 2049',
    incidentTime: '29.12.2025 18:45',
    address: 'Köln, Deutz',
    description: 'Parkschaden am Heckstoßfänger.'
  },
  {
    claimNumber: 'HR-560189',
    firstName: 'Mara',
    lastName: 'Bauer',
    licensePlate: 'D-MB 9130',
    incidentTime: '28.12.2025 09:15',
    address: 'Düsseldorf, Pempelfort',
    description: 'Spiegelkontakt in enger Straße.'
  },
  {
    claimNumber: 'SI-317504',
    firstName: 'Tim',
    lastName: 'Scholz',
    licensePlate: 'N-TS 4411',
    incidentTime: '27.12.2025 13:40',
    address: 'Nürnberg, Südstadt',
    description: 'Seitenschaden, Lackkratzer.'
  },
  {
    claimNumber: 'PT-709833',
    firstName: 'Anna',
    lastName: 'Dietrich',
    licensePlate: 'H-AD 5567',
    incidentTime: '26.12.2025 08:20',
    address: 'Hannover, List',
    description: 'Frontschaden durch Wildwechsel.'
  },
  {
    claimNumber: 'IE-485902',
    firstName: 'Nils',
    lastName: 'Friedrich',
    licensePlate: 'HB-NF 2308',
    incidentTime: '25.12.2025 17:10',
    address: 'Bremen, Oberneuland',
    description: 'Parkrempler, Stoßfänger vorne.'
  },
  {
    claimNumber: 'UK-932750',
    firstName: 'Claudia',
    lastName: 'Winter',
    licensePlate: 'L-CW 7194',
    incidentTime: '24.12.2025 12:55',
    address: 'Leipzig, Plagwitz',
    description: 'Seitenschaden an der Tür.'
  },
  {
    claimNumber: 'LU-624089',
    firstName: 'Jan',
    lastName: 'Zimmer',
    licensePlate: 'B-JZ 6655',
    incidentTime: '23.12.2025 07:30',
    address: 'Berlin, Mitte',
    description: 'Heckschaden im Berufsverkehr.'
  },
  {
    claimNumber: 'EE-410376',
    firstName: 'Miriam',
    lastName: 'Koch',
    licensePlate: 'M-MK 4004',
    incidentTime: '22.12.2025 15:00',
    address: 'München, Moosach',
    description: 'Glasschaden, Riss in der Scheibe.'
  },
  {
    claimNumber: 'LV-857209',
    firstName: 'Sebastian',
    lastName: 'Lenz',
    licensePlate: 'HH-SL 1022',
    incidentTime: '21.12.2025 10:05',
    address: 'Hamburg, Eimsbuettel',
    description: 'Kratzer an der Seite, unbekannter Verursacher.'
  },
  {
    claimNumber: 'LT-304915',
    firstName: 'Laura',
    lastName: 'Krause',
    licensePlate: 'F-LK 7729',
    incidentTime: '20.12.2025 18:30',
    address: 'Frankfurt, Sachsenhausen',
    description: 'Anprall an Bordstein, Felgenschaden.'
  },
  {
    claimNumber: 'GR-698412',
    firstName: 'Jonas',
    lastName: 'Meier',
    licensePlate: 'S-JM 4488',
    incidentTime: '19.12.2025 14:15',
    address: 'Stuttgart, Degerloch',
    description: 'Seitliche Kollision beim Einfädeln.'
  },
  {
    claimNumber: 'TR-521780',
    firstName: 'Elena',
    lastName: 'Lorenz',
    licensePlate: 'K-EL 3377',
    incidentTime: '18.12.2025 09:50',
    address: 'Köln, Lindenthal',
    description: 'Parkschaden an der Stoßstange.'
  },
  {
    claimNumber: 'AE-745093',
    firstName: 'Paul',
    lastName: 'Maurer',
    licensePlate: 'D-PM 9801',
    incidentTime: '17.12.2025 07:05',
    address: 'Duesseldorf, Bilk',
    description: 'Heckschaden beim Rangieren.'
  },
  {
    claimNumber: 'QA-268047',
    firstName: 'Tina',
    lastName: 'Schubert',
    licensePlate: 'N-TS 5042',
    incidentTime: '16.12.2025 16:20',
    address: 'Nuernberg, Erlenstegen',
    description: 'Seitenschaden, Kontakt mit Leitplanke.'
  },
  {
    claimNumber: 'US-907421',
    firstName: 'Niklas',
    lastName: 'Otto',
    licensePlate: 'H-NO 6120',
    incidentTime: '15.12.2025 11:40',
    address: 'Hannover, Nordstadt',
    description: 'Frontschaden, Auffahrunfall an Ampel.'
  },
  {
    claimNumber: 'CA-453680',
    firstName: 'Isabel',
    lastName: 'Seitz',
    licensePlate: 'HB-IS 2209',
    incidentTime: '14.12.2025 08:55',
    address: 'Bremen, Findorff',
    description: 'Glasschaden, Steinschlag.'
  },
  {
    claimNumber: 'AU-830591',
    firstName: 'Markus',
    lastName: 'Haase',
    licensePlate: 'L-MH 7733',
    incidentTime: '13.12.2025 19:10',
    address: 'Leipzig, Gohlis',
    description: 'Seitliche Kollision, Lackschaden.'
  },
  {
    claimNumber: 'NZ-592704',
    firstName: 'Svenja',
    lastName: 'Arnold',
    licensePlate: 'B-SA 4450',
    incidentTime: '12.12.2025 13:25',
    address: 'Berlin, Prenzlauer Berg',
    description: 'Parkschaden, Kratzer hinten.'
  },
  {
    claimNumber: 'JP-174509',
    firstName: 'David',
    lastName: 'Franke',
    licensePlate: 'M-DF 8812',
    incidentTime: '11.12.2025 10:10',
    address: 'Muenchen, Sendling',
    description: 'Heckschaden durch Auffahrunfall.'
  },
  {
    claimNumber: 'SG-681230',
    firstName: 'Klara',
    lastName: 'Hein',
    licensePlate: 'HH-KH 3099',
    incidentTime: '10.12.2025 17:55',
    address: 'Hamburg, Barmbek',
    description: 'Seitenschaden beim Einparken.'
  },
  {
    claimNumber: 'SE-770487',
    firstName: 'Maja',
    lastName: 'Johansson',
    licensePlate: 'S-MJ 4821',
    incidentTime: '09.12.2025 08:45',
    address: 'Stockholm, Sodermalm',
    description: 'Frontschaden bei starkem Bremsmanöver.'
  },
  {
    claimNumber: 'NO-216739',
    firstName: 'Lars',
    lastName: 'Hagen',
    licensePlate: 'N-LH 2204',
    incidentTime: '08.12.2025 13:20',
    address: 'Oslo, Grunerlokka',
    description: 'Seitliche Kollision in enger Straße.'
  },
  {
    claimNumber: 'CH-126225',
    firstName: 'Nina',
    lastName: 'Keller',
    licensePlate: 'ZH-NK 9012',
    incidentTime: '07.12.2025 17:05',
    address: 'Zuerich, Kreis 4',
    description: 'Glasschaden, Steinschlag Autobahn.'
  },
  {
    claimNumber: 'AT-877572',
    firstName: 'Paul',
    lastName: 'Egger',
    licensePlate: 'W-PE 8844',
    incidentTime: '06.12.2025 09:50',
    address: 'Wien, Leopoldstadt',
    description: 'Heckschaden beim Einparken.'
  },
  {
    claimNumber: 'NL-388389',
    firstName: 'Emma',
    lastName: 'van Dijk',
    licensePlate: 'NL-ED 3301',
    incidentTime: '05.12.2025 12:15',
    address: 'Amsterdam, Centrum',
    description: 'Seitenschaden durch Radfahrer.'
  },
  {
    claimNumber: 'BE-356787',
    firstName: 'Lucas',
    lastName: 'Peeters',
    licensePlate: 'B-LP 7780',
    incidentTime: '04.12.2025 18:40',
    address: 'Brussels, Ixelles',
    description: 'Parkschaden an Stoßstange.'
  },
  {
    claimNumber: 'FR-334053',
    firstName: 'Claire',
    lastName: 'Moreau',
    licensePlate: 'F-CM 1109',
    incidentTime: '03.12.2025 07:25',
    address: 'Paris, La Defense',
    description: 'Frontschaden im Berufsverkehr.'
  },
  {
    claimNumber: 'ES-246316',
    firstName: 'Sergio',
    lastName: 'Lopez',
    licensePlate: 'E-SL 4502',
    incidentTime: '02.12.2025 16:10',
    address: 'Madrid, Salamanca',
    description: 'Seitliche Kollision im Kreisverkehr.'
  },
  {
    claimNumber: 'PT-872246',
    firstName: 'Ines',
    lastName: 'Santos',
    licensePlate: 'P-IS 9022',
    incidentTime: '01.12.2025 10:35',
    address: 'Lisbon, Belem',
    description: 'Heckschaden durch Auffahrunfall.'
  },
  {
    claimNumber: 'IT-207473',
    firstName: 'Marco',
    lastName: 'Rossi',
    licensePlate: 'I-MR 7711',
    incidentTime: '30.11.2025 14:50',
    address: 'Milan, Porta Nuova',
    description: 'Parkschaden, Lackkratzer.'
  },
  {
    claimNumber: 'DK-809570',
    firstName: 'Freja',
    lastName: 'Larsen',
    licensePlate: 'DK-FL 8088',
    incidentTime: '29.11.2025 08:05',
    address: 'Copenhagen, Vesterbro',
    description: 'Glasschaden, Scheibe gerissen.'
  },
  {
    claimNumber: 'FI-876646',
    firstName: 'Aino',
    lastName: 'Virtanen',
    licensePlate: 'FIN-AV 6230',
    incidentTime: '28.11.2025 11:25',
    address: 'Helsinki, Kamppi',
    description: 'Seitenschaden an der Tür.'
  },
  {
    claimNumber: 'PL-671858',
    firstName: 'Kasia',
    lastName: 'Nowak',
    licensePlate: 'PL-KN 5521',
    incidentTime: '27.11.2025 15:40',
    address: 'Warsaw, Mokotow',
    description: 'Frontschaden, Auffahrunfall.'
  },
  {
    claimNumber: 'CZ-191161',
    firstName: 'Petr',
    lastName: 'Novak',
    licensePlate: 'CZ-PN 3499',
    incidentTime: '26.11.2025 19:10',
    address: 'Prague, Karlin',
    description: 'Seitlicher Kontakt beim Abbiegen.'
  },
  {
    claimNumber: 'SK-719176',
    firstName: 'Marek',
    lastName: 'Kovac',
    licensePlate: 'SK-MK 9011',
    incidentTime: '25.11.2025 07:45',
    address: 'Bratislava, Ruzinov',
    description: 'Heckschaden beim Rangieren.'
  },
  {
    claimNumber: 'HU-542417',
    firstName: 'Eszter',
    lastName: 'Nagy',
    licensePlate: 'HU-EN 7842',
    incidentTime: '24.11.2025 12:30',
    address: 'Budapest, Buda',
    description: 'Parkschaden, Stoßfänger hinten.'
  },
  {
    claimNumber: 'RO-133326',
    firstName: 'Andrei',
    lastName: 'Popescu',
    licensePlate: 'RO-AP 6631',
    incidentTime: '23.11.2025 17:55',
    address: 'Bucharest, Sector 1',
    description: 'Seitenschaden, Kontakt mit Leitplanke.'
  },
  {
    claimNumber: 'BG-131244',
    firstName: 'Viktor',
    lastName: 'Ivanov',
    licensePlate: 'BG-VI 2207',
    incidentTime: '22.11.2025 09:15',
    address: 'Sofia, Lozenets',
    description: 'Glasschaden, Steinschlag.'
  },
  {
    claimNumber: 'HR-198246',
    firstName: 'Ana',
    lastName: 'Horvat',
    licensePlate: 'HR-AH 7799',
    incidentTime: '21.11.2025 13:05',
    address: 'Zagreb, Tresnjevka',
    description: 'Frontschaden, Auffahrunfall.'
  },
  {
    claimNumber: 'SI-329258',
    firstName: 'Luka',
    lastName: 'Kranjc',
    licensePlate: 'SI-LK 4520',
    incidentTime: '20.11.2025 16:35',
    address: 'Ljubljana, Center',
    description: 'Parkschaden, Kratzer seitlich.'
  },
  {
    claimNumber: 'EE-343962',
    firstName: 'Maarja',
    lastName: 'Tamm',
    licensePlate: 'EE-MT 3308',
    incidentTime: '19.11.2025 08:40',
    address: 'Tallinn, Kesklinn',
    description: 'Heckschaden im Stadtverkehr.'
  },
  {
    claimNumber: 'LV-629903',
    firstName: 'Janis',
    lastName: 'Ozols',
    licensePlate: 'LV-JO 1190',
    incidentTime: '18.11.2025 11:10',
    address: 'Riga, Centrs',
    description: 'Seitenschaden, Kotflügel beschädigt.'
  },
  {
    claimNumber: 'LT-731262',
    firstName: 'Egle',
    lastName: 'Kazlauskiene',
    licensePlate: 'LT-EK 4482',
    incidentTime: '17.11.2025 14:20',
    address: 'Vilnius, Senamiestis',
    description: 'Frontschaden an Ampel.'
  },
  {
    claimNumber: 'GR-127824',
    firstName: 'Nikos',
    lastName: 'Papadopoulos',
    licensePlate: 'GR-NP 7703',
    incidentTime: '16.11.2025 18:45',
    address: 'Athens, Kolonaki',
    description: 'Glasschaden, Scheibe gerissen.'
  },
  {
    claimNumber: 'TR-688508',
    firstName: 'Elif',
    lastName: 'Yilmaz',
    licensePlate: 'TR-EY 5051',
    incidentTime: '15.11.2025 09:50',
    address: 'Istanbul, Besiktas',
    description: 'Seitliche Kollision beim Spurwechsel.'
  },
  {
    claimNumber: 'AE-308496',
    firstName: 'Omar',
    lastName: 'Hassan',
    licensePlate: 'UAE-OH 8841',
    incidentTime: '14.11.2025 12:05',
    address: 'Dubai, Marina',
    description: 'Parkschaden an Stoßstange.'
  },
  {
    claimNumber: 'QA-850800',
    firstName: 'Mariam',
    lastName: 'Al Nuaimi',
    licensePlate: 'QA-MN 7740',
    incidentTime: '13.11.2025 15:30',
    address: 'Doha, West Bay',
    description: 'Heckschaden beim Rangieren.'
  },
  {
    claimNumber: 'US-781453',
    firstName: 'Olivia',
    lastName: 'Brown',
    licensePlate: 'US-OB 5204',
    incidentTime: '12.11.2025 07:55',
    address: 'New York, Midtown',
    description: 'Frontschaden im Stadtverkehr.'
  },
  {
    claimNumber: 'CA-835392',
    firstName: 'Ethan',
    lastName: 'Martin',
    licensePlate: 'CA-EM 3303',
    incidentTime: '11.11.2025 10:15',
    address: 'Toronto, Downtown',
    description: 'Seitenschaden, Lackkratzer.'
  },
  {
    claimNumber: 'AU-671412',
    firstName: 'Chloe',
    lastName: 'Wilson',
    licensePlate: 'AU-CW 8891',
    incidentTime: '10.11.2025 14:35',
    address: 'Sydney, CBD',
    description: 'Glasschaden, Steinschlag.'
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
      note: seed % 4 === 0 ? 'Freigabe angefordert.' : '',
      noteEn: seed % 4 === 0 ? 'Approval requested.' : ''
    },
    {
      id: `c-${seed}-2`,
      labelKey: 'paint',
      amount: base * 0.35,
      status: seed % 4 === 0 ? 'rejected' : 'approved',
      note: seed % 4 === 0 ? 'Alternativangebot prüfen.' : '',
      noteEn: seed % 4 === 0 ? 'Review alternative quote.' : ''
    },
    {
      id: `c-${seed}-3`,
      labelKey: 'rental',
      amount: 180 + seed * 12,
      status: seed % 5 === 0 ? 'pending' : 'approved',
      note: seed % 5 === 0 ? 'Nachweise fehlen.' : '',
      noteEn: seed % 5 === 0 ? 'Missing receipts.' : ''
    }
  ]
}

function buildCoverage(seed: number): ClaimCoverage {
  const covered = seed % 6 !== 0
  return {
    policyNumber: `POL-${2024 + (seed % 2)}-${8000 + seed}`,
    term: covered ? '01.01.2025 - 31.12.2025' : '01.07.2024 - 30.06.2025',
    limit: formatEuro(50000 + seed * 900),
    limitEn: formatEuro(50000 + seed * 900),
    exclusion: covered ? 'Keine Ausschlüsse relevant' : 'Abzug aufgrund Sonderregelung',
    exclusionEn: covered ? 'No exclusions applicable' : 'Deduction due to special clause',
    covered,
    note: covered ? 'Deckung bestätigt, Freigabe möglich.' : 'Teilweise gedeckt, Review erforderlich.',
    noteEn: covered ? 'Coverage confirmed, approval possible.' : 'Partially covered, review required.'
  }
}

function buildKpis(seed: number): ClaimKpiValues {
  const total = 2400 + seed * 190
  const reserve = Math.round(total * 0.28)
  const approved = Math.round(total * 0.45)
  const deductible = 150 + (seed % 5) * 100
  const fraudLevels = ['Niedrig', 'Mittel', 'Hoch'] as const
  const fraudLevelsEn = ['Low', 'Medium', 'High'] as const
  const coverage = seed % 6 === 0 ? 'Teilgedeckt' : 'Gedeckt'
  const coverageEn = seed % 6 === 0 ? 'Partially covered' : 'Covered'
  return {
    totalIncurred: formatEuro(total),
    reserve: formatEuro(reserve),
    approved: formatEuro(approved),
    openItems: `${2 + (seed % 5)}`,
    deductible: formatEuro(deductible),
    coverage,
    coverageEn,
    fraudRisk: fraudLevels[seed % fraudLevels.length],
    fraudRiskEn: fraudLevelsEn[seed % fraudLevelsEn.length],
    handlingTime: `${3 + (seed % 7)} Tage`,
    handlingTimeEn: `${3 + (seed % 7)} days`
  }
}

function enrichClaimData(claim: StoredClaimData, indexSeed: number) {
  const seed = getSeedFromClaimNumber(claim.claimNumber, indexSeed)
  const damageTypeKey = claim.damageTypeKey ?? DAMAGE_TYPE_KEYS[seed % DAMAGE_TYPE_KEYS.length]
  const localizedDescription = DAMAGE_DESCRIPTIONS[damageTypeKey]
  const baseKpis = buildKpis(seed)
  const baseCoverage = buildCoverage(seed)
  const baseCosts = buildCostItems(seed)
  const mergedKpis = claim.kpiValues ? { ...baseKpis, ...claim.kpiValues } : baseKpis
  const mergedCoverage = claim.coverage ? { ...baseCoverage, ...claim.coverage } : baseCoverage
  const mergedCosts = claim.costItems?.length
    ? claim.costItems.map((item, index) => ({
        ...baseCosts[index],
        ...item,
        noteEn: item.noteEn ?? baseCosts[index]?.noteEn
      }))
    : baseCosts
  return {
    ...claim,
    damageTypeKey,
    statusKey: claim.statusKey ?? STATUS_KEYS[seed % STATUS_KEYS.length],
    addressEn: claim.addressEn ?? claim.address,
    descriptionEn: claim.descriptionEn ?? localizedDescription?.en ?? claim.description,
    kpiValues: mergedKpis,
    costItems: mergedCosts,
    coverage: mergedCoverage,
    mediaItems: claim.mediaItems?.length ? claim.mediaItems : buildMedia(seed),
    photoCount: 4
  }
}

export const DEMO_CLAIMS: StoredClaimData[] = BASE_CLAIMS.map((claim, index) =>
  enrichClaimData(claim, index + 1)
)

export function loadClaims() {
  if (typeof window === 'undefined') return []
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

export function loadStoredClaimsRaw() {
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
    const parsed = JSON.parse(raw) as StoredClaimData
    return enrichClaimData(parsed, 1)
  } catch {
    return undefined
  }
}
