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

export const calendarTemplates = [
  {
    title: 'Tender deadline review',
    description: 'Finalize tender pack and confirm carrier submissions.',
    location: 'Video call',
    participants: ['Broker team', 'Lead carrier']
  },
  {
    title: 'Prolongation strategy session',
    description: 'Review loss history and renewal positioning.',
    location: 'Client HQ',
    participants: ['Client CFO', 'Broker account lead']
  },
  {
    title: 'Contract governance check',
    description: 'Validate endorsements and coverage alignment.',
    location: 'Broker office',
    participants: ['Broker compliance', 'Legal']
  },
  {
    title: 'Client steering meeting',
    description: 'Discuss risk improvements and next steps.',
    location: 'Teams',
    participants: ['Client risk manager', 'Broker advisor']
  },
  {
    title: 'Carrier negotiation slot',
    description: 'Discuss premium adjustments and exclusions.',
    location: 'Phone call',
    participants: ['Carrier underwriter', 'Broker placement']
  }
]

export const mailboxTemplates = [
  {
    subject: 'Updated loss run attachment',
    sender: 'Laura Stein <l.stein@client.example>',
    body: `Hello team,\n\nPlease find attached the updated loss run for the last 24 months. We have highlighted two larger events for your review.\n\nLet us know if you need anything else.\n\nRegards,\nLaura Stein`
  },
  {
    subject: 'Carrier offer update — revised premium',
    sender: 'M. Keller <underwriting@carrier.example>',
    body: `Hi Brokerfox team,\n\nWe reviewed the submitted exposure updates and can provide revised terms. Please see the attached offer and summary in the email below.\n\nBest,\nM. Keller`
  },
  {
    subject: 'Renewal reminder and documentation request',
    sender: 'renewals@carrier.example',
    body: `Dear all,\n\nYour renewal is approaching in the next 60 days. Please provide updated fleet lists and recent claims summaries to proceed.\n\nThanks,\nCarrier Renewals Desk`
  },
  {
    subject: 'Client update — new location added',
    sender: 'Jonas Weber <j.weber@client.example>',
    body: `Hello,\n\nWe have opened a new warehouse location in Bremen. Please advise if additional coverage documentation is required.\n\nRegards,\nJonas`
  },
  {
    subject: 'Loss history clarification needed',
    sender: 'risk@client.example',
    body: `Hi,\n\nWe noticed a discrepancy in the reported losses for Q4. Can you confirm whether the reserve has been released?\n\nBest,\nRisk Team`
  }
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
