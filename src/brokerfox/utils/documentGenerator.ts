import type { Client, DocumentMeta, Offer, Tender } from '@/brokerfox/types'

function hash(input: string) {
  let h = 0
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function generateDocumentText(args: {
  doc: DocumentMeta
  client?: Client | null
  tender?: Tender | null
  offer?: Offer | null
}) {
  const { doc, client, tender, offer } = args
  const seed = hash(doc.id)
  const preparedBy = 'Brokerfox Demo Unit'
  const date = new Date().toISOString().split('T')[0]
  const clientName = client?.name ?? 'Unknown Client'
  const address = client?.address ?? 'Musterstrasse 12, 20095 Hamburg'

  const lossHistory = client?.lossHistory ?? [
    { year: 2022, count: 2, paid: '€ 120k', reserved: '€ 40k' },
    { year: 2023, count: 1, paid: '€ 80k', reserved: '€ 30k' },
    { year: 2024, count: 3, paid: '€ 150k', reserved: '€ 45k' }
  ]

  const lossTable = lossHistory.map((entry) => `${entry.year} | ${entry.count} | ${entry.paid} | ${entry.reserved}`).join('\n')

  const offerLines = offer?.lines?.map((line) => `- ${line.coverage}: ${line.limit} | ${line.exclusion} | ${line.premium}`).join('\n')
    ?? '- General Liability: 10 Mio | US exposure | € 320k'

  const summaryBlocks = [
    `Client: ${clientName}`,
    `Address: ${address}`,
    `Prepared by: ${preparedBy}`,
    `Date: ${date}`,
    `Document ID: ${doc.id}`,
    '',
    'Risk Summary:',
    `- Industry: ${client?.industry ?? 'Industrial'}`,
    `- Revenue: ${client?.revenue ?? '€ 60 Mio'}`,
    `- Employees: ${client?.employees ?? 240}`,
    `- Locations: ${client?.locationsCount ?? 3}`,
    '',
    'Loss History (Year | Count | Paid | Reserved):',
    lossTable,
    '',
    'Program Overview:',
    `- Tender: ${tender?.title ?? 'Program Overview'}`,
    `- Requested coverages: ${tender?.coverageRequests?.map((req) => req.label).join(', ') ?? 'General Liability, Property, Cyber'}`,
    '',
    'Offer Summary:',
    `Carrier: ${offer?.carrier?.name ?? 'Carrier A'}`,
    `Premium total: ${offer?.premiumTotal ?? '€ 420k'}`,
    offerLines,
    '',
    'Key Exclusions:',
    `${offer?.exclusions?.join(', ') ?? 'US exposure, war risk, cyber extortion cap'}`,
    '',
    'Conditions:',
    `${offer?.conditions?.join(', ') ?? 'Quarterly loss updates, cyber controls review'}`,
    '',
    `Version: v${1 + (seed % 3)}.0`
  ]

  return summaryBlocks.join('\n')
}
