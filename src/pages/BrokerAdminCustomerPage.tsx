import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'

export const brokerAdminCustomers = [
  {
    id: 'atlas-logistics',
    name: 'Atlas Logistics GmbH',
    region: 'DE-BY',
    status: 'Active',
    premium: 'EUR 1.2M',
    renewal: '2026-04-15',
    openClaims: 3,
    primaryContact: 'Marta Kruger',
    email: 'marta.kruger@atlas-logistics.eu',
    phone: '+49 89 555 210',
    brokerLead: 'Anna Klein',
    policies: [
      { line: 'Carrier Liability', policy: 'PL-204889', limit: 'EUR 5M', status: 'Active' },
      { line: 'Cargo', policy: 'CG-552110', limit: 'EUR 3M', status: 'Active' },
      { line: 'Fleet', policy: 'FL-338190', limit: 'EUR 2M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-10421', type: 'Liability', status: 'Open', reserve: 'EUR 42k' },
      { claim: 'CLM-10499', type: 'Cargo', status: 'Open', reserve: 'EUR 18k' },
      { claim: 'CLM-10277', type: 'Fleet', status: 'Closed', reserve: 'EUR 9k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 1.2M' },
      { item: 'Outstanding', value: 'EUR 80k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'nordstadt-fleet',
    name: 'Nordstadt Fleet Services',
    region: 'DE-NW',
    status: 'Active',
    premium: 'EUR 950k',
    renewal: '2026-05-30',
    openClaims: 2,
    primaryContact: 'Lena Vogt',
    email: 'lena.vogt@nordstadtfleet.eu',
    phone: '+49 211 440 119',
    brokerLead: 'Jonas Blum',
    policies: [
      { line: 'Fleet', policy: 'FL-339011', limit: 'EUR 2M', status: 'Active' },
      { line: 'Liability', policy: 'PL-204990', limit: 'EUR 4M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11201', type: 'Fleet', status: 'Open', reserve: 'EUR 21k' },
      { claim: 'CLM-10902', type: 'Liability', status: 'Closed', reserve: 'EUR 13k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 950k' },
      { item: 'Outstanding', value: 'EUR 40k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'rhein-cargo',
    name: 'Rhein Cargo AG',
    region: 'DE-HE',
    status: 'Active',
    premium: 'EUR 820k',
    renewal: '2026-03-10',
    openClaims: 1,
    primaryContact: 'Jan Keller',
    email: 'jan.keller@rheincargo.de',
    phone: '+49 69 220 431',
    brokerLead: 'Maja Roth',
    policies: [
      { line: 'Cargo', policy: 'CG-552211', limit: 'EUR 4M', status: 'Active' },
      { line: 'Liability', policy: 'PL-205110', limit: 'EUR 3M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-10734', type: 'Cargo', status: 'Open', reserve: 'EUR 26k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 820k' },
      { item: 'Outstanding', value: 'EUR 0' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'bavaria-logistics',
    name: 'Bavaria Logistics SE',
    region: 'DE-BY',
    status: 'Active',
    premium: 'EUR 760k',
    renewal: '2026-06-01',
    openClaims: 4,
    primaryContact: 'Sven Bauer',
    email: 'sven.bauer@bavaria-logistics.eu',
    phone: '+49 89 440 889',
    brokerLead: 'Anna Klein',
    policies: [
      { line: 'Carrier Liability', policy: 'PL-206410', limit: 'EUR 4M', status: 'Active' },
      { line: 'Fleet', policy: 'FL-340012', limit: 'EUR 1.5M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11001', type: 'Liability', status: 'Open', reserve: 'EUR 35k' },
      { claim: 'CLM-11022', type: 'Fleet', status: 'Open', reserve: 'EUR 12k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 760k' },
      { item: 'Outstanding', value: 'EUR 55k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Amber' }
    ]
  },
  {
    id: 'hanse-trans',
    name: 'Hanse Trans GmbH',
    region: 'DE-HH',
    status: 'Active',
    premium: 'EUR 690k',
    renewal: '2026-02-20',
    openClaims: 0,
    primaryContact: 'Petra Lenz',
    email: 'petra.lenz@hansetrans.de',
    phone: '+49 40 321 909',
    brokerLead: 'Jonas Blum',
    policies: [
      { line: 'Cargo', policy: 'CG-552301', limit: 'EUR 2M', status: 'Active' },
      { line: 'Fleet', policy: 'FL-341018', limit: 'EUR 1.8M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-10977', type: 'Cargo', status: 'Closed', reserve: 'EUR 8k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 690k' },
      { item: 'Outstanding', value: 'EUR 0' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'westcargo',
    name: 'WestCargo Logistics',
    region: 'DE-NW',
    status: 'Active',
    premium: 'EUR 640k',
    renewal: '2026-07-08',
    openClaims: 2,
    primaryContact: 'Nils Brandt',
    email: 'nils.brandt@westcargo.eu',
    phone: '+49 221 987 112',
    brokerLead: 'Anna Klein',
    policies: [
      { line: 'Liability', policy: 'PL-206880', limit: 'EUR 4M', status: 'Active' },
      { line: 'Cargo', policy: 'CG-552399', limit: 'EUR 3M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11345', type: 'Liability', status: 'Open', reserve: 'EUR 22k' },
      { claim: 'CLM-11388', type: 'Cargo', status: 'Open', reserve: 'EUR 15k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 640k' },
      { item: 'Outstanding', value: 'EUR 32k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'eurofleet',
    name: 'EuroFleet AG',
    region: 'DE-BW',
    status: 'Active',
    premium: 'EUR 590k',
    renewal: '2026-01-25',
    openClaims: 1,
    primaryContact: 'Laura Heim',
    email: 'laura.heim@eurofleet.eu',
    phone: '+49 711 110 908',
    brokerLead: 'Maja Roth',
    policies: [
      { line: 'Fleet', policy: 'FL-341990', limit: 'EUR 1.5M', status: 'Active' },
      { line: 'Cargo', policy: 'CG-552490', limit: 'EUR 2M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-10888', type: 'Fleet', status: 'Open', reserve: 'EUR 11k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 590k' },
      { item: 'Outstanding', value: 'EUR 22k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'rheinland-transport',
    name: 'Rheinland Transport KG',
    region: 'DE-RP',
    status: 'Active',
    premium: 'EUR 520k',
    renewal: '2026-09-14',
    openClaims: 1,
    primaryContact: 'Torben Maas',
    email: 'torben.maas@rheinland-transport.de',
    phone: '+49 231 778 112',
    brokerLead: 'Jonas Blum',
    policies: [
      { line: 'Liability', policy: 'PL-207030', limit: 'EUR 2.5M', status: 'Active' },
      { line: 'Fleet', policy: 'FL-342110', limit: 'EUR 1.2M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11490', type: 'Liability', status: 'Open', reserve: 'EUR 9k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 520k' },
      { item: 'Outstanding', value: 'EUR 18k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'alpine-freight',
    name: 'Alpine Freight GmbH',
    region: 'AT',
    status: 'Active',
    premium: 'EUR 480k',
    renewal: '2026-11-03',
    openClaims: 0,
    primaryContact: 'Klara Steiner',
    email: 'klara.steiner@alpinefreight.at',
    phone: '+43 1 440 118',
    brokerLead: 'Anna Klein',
    policies: [
      { line: 'Cargo', policy: 'CG-553010', limit: 'EUR 2M', status: 'Active' },
      { line: 'Liability', policy: 'PL-207440', limit: 'EUR 3M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-10801', type: 'Cargo', status: 'Closed', reserve: 'EUR 6k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 480k' },
      { item: 'Outstanding', value: 'EUR 0' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'helvetia-trans',
    name: 'Helvetia Trans AG',
    region: 'CH',
    status: 'Active',
    premium: 'EUR 440k',
    renewal: '2026-08-22',
    openClaims: 2,
    primaryContact: 'Fabian Kurz',
    email: 'fabian.kurz@helvetiatrans.ch',
    phone: '+41 44 221 908',
    brokerLead: 'Maja Roth',
    policies: [
      { line: 'Liability', policy: 'PL-207880', limit: 'EUR 2.8M', status: 'Active' },
      { line: 'Fleet', policy: 'FL-342610', limit: 'EUR 1.4M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11588', type: 'Liability', status: 'Open', reserve: 'EUR 16k' },
      { claim: 'CLM-11592', type: 'Fleet', status: 'Open', reserve: 'EUR 11k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 440k' },
      { item: 'Outstanding', value: 'EUR 12k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Amber' }
    ]
  },
  {
    id: 'danube-logistik',
    name: 'Danube Logistik GmbH',
    region: 'AT',
    status: 'Active',
    premium: 'EUR 410k',
    renewal: '2026-10-17',
    openClaims: 1,
    primaryContact: 'Ines Schmid',
    email: 'ines.schmid@danube-logistik.at',
    phone: '+43 1 556 210',
    brokerLead: 'Jonas Blum',
    policies: [
      { line: 'Fleet', policy: 'FL-343020', limit: 'EUR 1.2M', status: 'Active' },
      { line: 'Cargo', policy: 'CG-553211', limit: 'EUR 2M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11620', type: 'Fleet', status: 'Open', reserve: 'EUR 8k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 410k' },
      { item: 'Outstanding', value: 'EUR 6k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'ibex-freight',
    name: 'Ibex Freight GmbH',
    region: 'DE-SN',
    status: 'Active',
    premium: 'EUR 370k',
    renewal: '2026-12-06',
    openClaims: 0,
    primaryContact: 'Tim Seidel',
    email: 'tim.seidel@ibexfreight.de',
    phone: '+49 351 220 909',
    brokerLead: 'Anna Klein',
    policies: [
      { line: 'Cargo', policy: 'CG-553440', limit: 'EUR 1.8M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11114', type: 'Cargo', status: 'Closed', reserve: 'EUR 5k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 370k' },
      { item: 'Outstanding', value: 'EUR 0' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'northsea-logistics',
    name: 'NorthSea Logistics AG',
    region: 'DE-SH',
    status: 'Active',
    premium: 'EUR 340k',
    renewal: '2026-07-30',
    openClaims: 1,
    primaryContact: 'Mira Hansen',
    email: 'mira.hansen@northsea-logistics.de',
    phone: '+49 431 220 110',
    brokerLead: 'Maja Roth',
    policies: [
      { line: 'Liability', policy: 'PL-208120', limit: 'EUR 2M', status: 'Active' },
      { line: 'Cargo', policy: 'CG-553520', limit: 'EUR 1.5M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11701', type: 'Liability', status: 'Open', reserve: 'EUR 6k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 340k' },
      { item: 'Outstanding', value: 'EUR 4k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'central-rail',
    name: 'Central Rail Cargo',
    region: 'DE-BE',
    status: 'Active',
    premium: 'EUR 310k',
    renewal: '2026-04-02',
    openClaims: 2,
    primaryContact: 'Oliver Scholz',
    email: 'oliver.scholz@centralrail.de',
    phone: '+49 30 440 119',
    brokerLead: 'Jonas Blum',
    policies: [
      { line: 'Cargo', policy: 'CG-553710', limit: 'EUR 2.2M', status: 'Active' },
      { line: 'Liability', policy: 'PL-208410', limit: 'EUR 2.5M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11745', type: 'Cargo', status: 'Open', reserve: 'EUR 10k' },
      { claim: 'CLM-11746', type: 'Liability', status: 'Open', reserve: 'EUR 12k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 310k' },
      { item: 'Outstanding', value: 'EUR 7k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'urban-express',
    name: 'Urban Express KG',
    region: 'DE-HE',
    status: 'Active',
    premium: 'EUR 295k',
    renewal: '2026-03-18',
    openClaims: 0,
    primaryContact: 'Sina Walter',
    email: 'sina.walter@urbanexpress.de',
    phone: '+49 69 331 880',
    brokerLead: 'Anna Klein',
    policies: [
      { line: 'Fleet', policy: 'FL-343510', limit: 'EUR 1M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11065', type: 'Fleet', status: 'Closed', reserve: 'EUR 4k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 295k' },
      { item: 'Outstanding', value: 'EUR 0' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'eastern-mobility',
    name: 'Eastern Mobility GmbH',
    region: 'DE-BB',
    status: 'Active',
    premium: 'EUR 270k',
    renewal: '2026-06-19',
    openClaims: 1,
    primaryContact: 'Rico Lehmann',
    email: 'rico.lehmann@easternmobility.de',
    phone: '+49 30 778 552',
    brokerLead: 'Maja Roth',
    policies: [
      { line: 'Liability', policy: 'PL-208990', limit: 'EUR 1.8M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11802', type: 'Liability', status: 'Open', reserve: 'EUR 6k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 270k' },
      { item: 'Outstanding', value: 'EUR 3k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'southern-cargo',
    name: 'Southern Cargo GmbH',
    region: 'DE-BW',
    status: 'Active',
    premium: 'EUR 255k',
    renewal: '2026-09-05',
    openClaims: 2,
    primaryContact: 'Marcel Huber',
    email: 'marcel.huber@southerncargo.de',
    phone: '+49 711 221 003',
    brokerLead: 'Jonas Blum',
    policies: [
      { line: 'Cargo', policy: 'CG-553920', limit: 'EUR 1.6M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11888', type: 'Cargo', status: 'Open', reserve: 'EUR 7k' },
      { claim: 'CLM-11889', type: 'Cargo', status: 'Open', reserve: 'EUR 5k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 255k' },
      { item: 'Outstanding', value: 'EUR 5k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'cityline-logistics',
    name: 'Cityline Logistics GmbH',
    region: 'DE-HH',
    status: 'Active',
    premium: 'EUR 230k',
    renewal: '2026-08-14',
    openClaims: 1,
    primaryContact: 'Ralf Mitterbauer',
    email: 'ralf.mitterbauer@claimfox.app',
    phone: '+49 40 221 455',
    brokerLead: 'Anna Klein',
    policies: [
      { line: 'Fleet', policy: 'FL-343990', limit: 'EUR 900k', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11910', type: 'Fleet', status: 'Open', reserve: 'EUR 5k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 230k' },
      { item: 'Outstanding', value: 'EUR 4k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'delta-haulage',
    name: 'Delta Haulage GmbH',
    region: 'DE-NI',
    status: 'Active',
    premium: 'EUR 210k',
    renewal: '2026-05-22',
    openClaims: 0,
    primaryContact: 'Kai Neumann',
    email: 'kai.neumann@deltahaulage.de',
    phone: '+49 511 221 909',
    brokerLead: 'Jonas Blum',
    policies: [
      { line: 'Cargo', policy: 'CG-554010', limit: 'EUR 1.4M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11790', type: 'Cargo', status: 'Closed', reserve: 'EUR 3k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 210k' },
      { item: 'Outstanding', value: 'EUR 0' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'skyline-transport',
    name: 'Skyline Transport GmbH',
    region: 'DE-BW',
    status: 'Active',
    premium: 'EUR 190k',
    renewal: '2026-02-08',
    openClaims: 1,
    primaryContact: 'Maren Weiss',
    email: 'maren.weiss@skyline-transport.de',
    phone: '+49 711 411 002',
    brokerLead: 'Maja Roth',
    policies: [
      { line: 'Liability', policy: 'PL-209211', limit: 'EUR 1.5M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-12021', type: 'Liability', status: 'Open', reserve: 'EUR 4k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 190k' },
      { item: 'Outstanding', value: 'EUR 3k' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  },
  {
    id: 'metro-freight',
    name: 'Metro Freight SE',
    region: 'DE-NW',
    status: 'Active',
    premium: 'EUR 175k',
    renewal: '2026-01-30',
    openClaims: 0,
    primaryContact: 'Helena Koch',
    email: 'helena.koch@metrofreight.de',
    phone: '+49 221 118 445',
    brokerLead: 'Anna Klein',
    policies: [
      { line: 'Cargo', policy: 'CG-554200', limit: 'EUR 1.2M', status: 'Active' }
    ],
    claims: [
      { claim: 'CLM-11801', type: 'Cargo', status: 'Closed', reserve: 'EUR 2k' }
    ],
    billing: [
      { item: 'Premium invoiced', value: 'EUR 175k' },
      { item: 'Outstanding', value: 'EUR 0' },
      { item: 'Payment terms', value: '30 days' }
    ],
    compliance: [
      { item: 'KYC status', value: 'Verified' },
      { item: 'Delegated authority', value: 'Active' },
      { item: 'Audit readiness', value: 'Green' }
    ]
  }
]

function mapLabel(labelEn: string, labelDe: string, lang: string) {
  return lang === 'en' ? labelEn : labelDe
}

function translateValue(value: string, lang: string) {
  const map: Record<string, { en: string; de: string }> = {
    Active: { en: 'Active', de: 'Aktiv' },
    Open: { en: 'Open', de: 'Offen' },
    Closed: { en: 'Closed', de: 'Geschlossen' },
    Verified: { en: 'Verified', de: 'Verifiziert' },
    Green: { en: 'Green', de: 'Gruen' },
    Amber: { en: 'Amber', de: 'Gelb' }
  }

  const entry = map[value]
  if (!entry) return value
  return lang === 'en' ? entry.en : entry.de
}

function translateLabel(value: string, lang: string) {
  const map: Record<string, { en: string; de: string }> = {
    'Premium invoiced': { en: 'Premium invoiced', de: 'Praemie fakturiert' },
    Outstanding: { en: 'Outstanding', de: 'Offen' },
    'Payment terms': { en: 'Payment terms', de: 'Zahlungsziel' },
    'KYC status': { en: 'KYC status', de: 'KYC Status' },
    'Delegated authority': { en: 'Delegated authority', de: 'Delegierte Autoritaet' },
    'Audit readiness': { en: 'Audit readiness', de: 'Audit Readiness' }
  }

  const entry = map[value]
  if (!entry) return value
  return lang === 'en' ? entry.en : entry.de
}

function policyDetailText(line: string, lang: string) {
  const map: Record<string, { en: string; de: string }> = {
    'Carrier Liability': {
      en: 'Coverage: Liability core · Limits aligned to corridor · Endorsements: None',
      de: 'Deckung: Haftpflicht Kern · Limits im Korridor · Endorsements: Keine'
    },
    Liability: {
      en: 'Coverage: Liability standard · Claims handling: Standard SLA',
      de: 'Deckung: Haftpflicht Standard · Schadenprozess: Standard SLA'
    },
    Cargo: {
      en: 'Coverage: Cargo standard · Special conditions: Temperature clause',
      de: 'Deckung: Cargo Standard · Sonderklausel: Temperatur'
    },
    Fleet: {
      en: 'Coverage: Fleet standard · Vehicle schedule: Current',
      de: 'Deckung: Flotte Standard · Fahrzeugliste: Aktuell'
    }
  }

  const entry = map[line]
  if (!entry) return lang === 'en' ? 'Coverage: Standard terms' : 'Deckung: Standard'
  return lang === 'en' ? entry.en : entry.de
}

function claimDetailText(type: string, status: string, lang: string) {
  const openText = lang === 'en'
    ? 'Status: Evidence pending · Next action: Review reserve'
    : 'Status: Evidenz offen · Naechster Schritt: Reserve pruefen'
  const closedText = lang === 'en'
    ? 'Status: Closed · Outcome: Settlement completed'
    : 'Status: Geschlossen · Ergebnis: Settlement abgeschlossen'

  if (status === 'Closed') return closedText
  if (type === 'Cargo') {
    return lang === 'en'
      ? 'Status: Open · Next action: Document review'
      : 'Status: Offen · Naechster Schritt: Dokumentenpruefung'
  }
  if (type === 'Fleet') {
    return lang === 'en'
      ? 'Status: Open · Next action: Repair confirmation'
      : 'Status: Offen · Naechster Schritt: Reparatur bestaetigen'
  }
  return openText
}

export default function BrokerAdminCustomerPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const { customerId } = useParams<{ customerId: string }>()
  const [expandedPolicy, setExpandedPolicy] = React.useState<string | null>(null)
  const [expandedClaim, setExpandedClaim] = React.useState<string | null>(null)

  const customer = brokerAdminCustomers.find((item) => item.id === customerId)

  if (!customer) {
    return <Navigate to="/broker-admin" replace />
  }

  const copy = {
    title: mapLabel('Customer record', 'Kundendaten', lang),
    subtitle: mapLabel('Broker view of client exposure, policies and claims.', 'Makleransicht auf Exposures, Policen und Schadenlage.', lang),
    back: mapLabel('Back to customer list', 'Zurueck zur Kundenliste', lang),
    overviewTitle: mapLabel('Customer overview', 'Kundenuebersicht', lang),
    contactTitle: mapLabel('Primary contacts', 'Ansprechpartner', lang),
    policiesTitle: mapLabel('Policies', 'Policen', lang),
    claimsTitle: mapLabel('Claims status', 'Schadenstatus', lang),
    billingTitle: mapLabel('Billing', 'Abrechnung', lang),
    complianceTitle: mapLabel('Compliance', 'Compliance', lang),
    overviewItems: [
      { label: mapLabel('Region', 'Region', lang), value: customer.region },
      { label: mapLabel('Account status', 'Status', lang), value: customer.status },
      { label: mapLabel('Premium in force', 'Praemienbestand', lang), value: customer.premium },
      { label: mapLabel('Renewal date', 'Renewal', lang), value: customer.renewal },
      { label: mapLabel('Open claims', 'Offene Schaeden', lang), value: String(customer.openClaims) },
      { label: mapLabel('Broker lead', 'Makler Lead', lang), value: customer.brokerLead }
    ]
  }

  const kpis = [
    { label: mapLabel('Premium', 'Praemien', lang), value: customer.premium },
    { label: mapLabel('Open claims', 'Offene Schaeden', lang), value: String(customer.openClaims) },
    { label: mapLabel('Policies', 'Policen', lang), value: String(customer.policies.length) },
    { label: mapLabel('Renewal', 'Renewal', lang), value: customer.renewal }
  ]

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header title={copy.title} subtitle={copy.subtitle} subtitleColor="#65748b" />

        <div style={{ marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => navigate('/broker-admin')}
            className="btn btn-outline-secondary"
          >
            {copy.back}
          </button>
        </div>

        <style>
          {`
            .broker-admin-detail-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.9rem; margin-bottom: 1.6rem; }
            @media (max-width: 900px) {
              .broker-admin-detail-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }
            .broker-admin-detail-section { margin-bottom: 1.6rem; }
          `}
        </style>
        <div className="uw-grid uw-kpi broker-admin-detail-kpis">
          {kpis.map((item) => (
            <Card key={item.label} title={item.label} variant="glass" className="uw-card">
              <div className="uw-card-body">
                <strong style={{ fontSize: '1.4rem' }}>{translateValue(item.value, lang)}</strong>
              </div>
            </Card>
          ))}
        </div>

        <div className="uw-grid uw-split broker-admin-detail-section">
          <Card title={copy.overviewTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {copy.overviewItems.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span>{item.label}</span>
                  <strong>{translateValue(item.value, lang)}</strong>
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.contactTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                <span>{mapLabel('Primary contact', 'Hauptansprechpartner', lang)}</span>
                <strong>{customer.primaryContact}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                <span>Email</span>
                <strong>{customer.email}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                <span>{mapLabel('Phone', 'Telefon', lang)}</span>
                <strong>{customer.phone}</strong>
              </div>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-split broker-admin-detail-section">
          <Card title={copy.policiesTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {customer.policies.map((policy) => (
                <div key={policy.policy} style={{ display: 'grid', gap: '0.35rem' }}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setExpandedPolicy(expandedPolicy === policy.policy ? null : policy.policy)}
                    style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}
                  >
                    <strong>{policy.line}</strong>
                    <span className="uw-muted">{policy.policy}</span>
                    <span className="uw-muted">{policy.limit}</span>
                    <span className="uw-muted">{translateValue(policy.status, lang)}</span>
                  </button>
                  {expandedPolicy === policy.policy && (
                    <div className="uw-muted" style={{ paddingLeft: '0.5rem' }}>
                      {policyDetailText(policy.line, lang)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.claimsTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {customer.claims.map((claim) => (
                <div key={claim.claim} style={{ display: 'grid', gap: '0.35rem' }}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setExpandedClaim(expandedClaim === claim.claim ? null : claim.claim)}
                    style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}
                  >
                    <strong>{claim.claim}</strong>
                    <span className="uw-muted">{claim.type}</span>
                    <span className="uw-muted">{translateValue(claim.status, lang)}</span>
                    <span className="uw-muted">{claim.reserve}</span>
                  </button>
                  {expandedClaim === claim.claim && (
                    <div className="uw-muted" style={{ paddingLeft: '0.5rem' }}>
                      {claimDetailText(claim.type, claim.status, lang)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-split broker-admin-detail-section">
          <Card title={copy.billingTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {customer.billing.map((item) => (
                <div key={item.item} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span>{translateLabel(item.item, lang)}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.complianceTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {customer.compliance.map((item) => (
                <div key={item.item} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span>{translateLabel(item.item, lang)}</span>
                  <strong>{translateValue(item.value, lang)}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
