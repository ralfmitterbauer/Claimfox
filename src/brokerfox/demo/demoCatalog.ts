export const demoTenants = [
  { id: 'demo-industrial-001', label: 'Industrial Program' },
  { id: 'demo-logistics-001', label: 'Logistics & Fleet' },
  { id: 'demo-sme-001', label: 'SME Portfolio' }
]

export const industries = [
  'Manufacturing',
  'Logistics',
  'Retail',
  'Construction',
  'Healthcare',
  'Technology',
  'Food & Beverage',
  'Automotive',
  'Energy',
  'Public Sector'
]

export const segments = ['Enterprise', 'Mid-Market', 'SME', 'Fleet', 'Industrial']

export const carriers = [
  'Allianz',
  'AXA',
  'HDI',
  'Helvetia',
  'Zurich',
  'Munich Re',
  'Generali',
  'ERGO',
  'Hannover Re',
  'Swiss Re'
]

export const lobs = [
  'Property',
  'General Liability',
  'Cargo',
  'Fleet',
  'Cyber',
  'D&O',
  'Professional Indemnity'
]

export const integrationTemplates = [
  { key: 'bipro', name: 'BiPRO connector', description: 'Standard carrier messaging and data exchange.' },
  { key: 'pool', name: 'Pool connector', description: 'Broker pool connection for quotes and renewals.' },
  { key: 'carrier-api', name: 'Carrier API/Webhooks', description: 'Direct API and webhook integrations.' },
  { key: 'mailbox', name: 'Document mailbox ingest', description: 'Inbound document capture and routing.' }
]

export const docTemplates = [
  { key: 'risk', name: 'Risk_Assessment_2024.pdf', url: '/demo-docs/Risk_Assessment_2024.pdf', type: 'application/pdf' },
  { key: 'loss', name: 'Loss_History_2022_2024.xlsx', url: '/demo-docs/Loss_History_2022_2024.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  { key: 'offer1', name: 'Offer_Allianz.pdf', url: '/demo-docs/Offer_Allianz.pdf', type: 'application/pdf' },
  { key: 'offer2', name: 'Offer_HDI.pdf', url: '/demo-docs/Offer_HDI.pdf', type: 'application/pdf' },
  { key: 'offer3', name: 'Offer_Helvetia.pdf', url: '/demo-docs/Offer_Helvetia.pdf', type: 'application/pdf' },
  { key: 'program', name: 'Program_Overview.pptx', url: '/demo-docs/Program_Overview.pptx', type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
  { key: 'sla', name: 'SLA_Partner_Network.pdf', url: '/demo-docs/SLA_Partner_Network.pdf', type: 'application/pdf' }
]

export const taskTemplates = [
  'Follow up with carrier underwriter',
  'Prepare renewal briefing',
  'Collect loss run updates',
  'Schedule client steering meeting',
  'Review coverage exclusions',
  'Upload updated fleet list',
  'Draft client summary',
  'Confirm pricing assumptions'
]

export const timelinePhrases = {
  external: [
    'Shared updated requirements with carriers.',
    'Received confirmation from client on limits.',
    'Requested revised pricing and terms.'
  ],
  internal: [
    'AI suggests negotiating deductible for cargo.',
    'Flag potential gap on cyber sublimit.',
    'Awaiting response from lead carrier.'
  ],
  status: [
    'Status updated to negotiation.',
    'Offer comparison completed.',
    'Client review meeting scheduled.'
  ]
}
