import type { Client, Tender } from '@/brokerfox/types'

export type RiskAnalysis = {
  inputs: {
    industry: string
    revenue: string
    employees: number
    locations: number
    claims: string
    coverages: string[]
  }
  ratings: Array<{ key: string; level: 'low' | 'medium' | 'high' }>
  drivers: string[]
  missingInfo: string[]
  policySuggestion: {
    coverages: string[]
    limits: string[]
    deductibles: string[]
    endorsements: string[]
    reasons: string[]
  }
}

export function buildRiskAnalysis(client: Client | null, tender: Tender | null): RiskAnalysis {
  const industry = client?.industry ?? 'Industrial'
  const revenue = client?.revenue ?? '€ 60 Mio'
  const employees = client?.employees ?? 200
  const locations = client?.locationsCount ?? 3
  const coverages = tender?.coverageRequests?.map((req) => req.label) ?? ['General Liability', 'Property', 'Cyber']
  const claims = client?.lossHistory
    ? client.lossHistory.map((entry) => `${entry.year}: ${entry.count}`).join(', ')
    : 'No data'

  const highExposure = industry.toLowerCase().includes('logistics') || industry.toLowerCase().includes('manufacturing')
  const ratings = [
    { key: 'property', level: highExposure ? 'medium' : 'low' },
    { key: 'liability', level: employees > 300 ? 'high' : 'medium' },
    { key: 'cyber', level: 'medium' },
    { key: 'businessInterruption', level: locations > 3 ? 'high' : 'medium' },
    { key: 'compliance', level: 'medium' }
  ] as RiskAnalysis['ratings']

  const drivers = [
    `Industry: ${industry}`,
    `Revenue: ${revenue}`,
    `Employees: ${employees}`,
    `Locations: ${locations}`,
    `Claims: ${claims}`
  ]

  const missingInfo = ['Updated loss runs', 'Cyber controls questionnaire', 'Fleet telematics summary']

  const policySuggestion = {
    coverages: Array.from(new Set([...coverages, 'Business Interruption'])),
    limits: ['Liability 10–15 Mio', 'Property 8–12 Mio', 'Cyber 3–5 Mio'],
    deductibles: ['Property deductible € 50k–75k', 'Cyber deductible € 10k–25k'],
    endorsements: ['Supply chain interruption', 'Contingent business interruption', 'Cargo temperature endorsement'],
    reasons: [
      'Higher revenue increases liability exposure.',
      'Multiple locations elevate BI risk.',
      'Claims history suggests need for higher limits.'
    ]
  }

  return {
    inputs: { industry, revenue, employees, locations, claims, coverages },
    ratings,
    drivers,
    missingInfo,
    policySuggestion
  }
}
