import type { Lang } from '@/i18n/translations'

const SEGMENT_MAP: Record<string, { de: string; en: string }> = {
  Enterprise: { de: 'Enterprise', en: 'Enterprise' },
  'Mid-Market': { de: 'Mittelstand', en: 'Mid-Market' },
  SME: { de: 'KMU', en: 'SME' },
  Fleet: { de: 'Flotte', en: 'Fleet' },
  Industrial: { de: 'Industrie', en: 'Industrial' }
}

const INDUSTRY_MAP: Record<string, { de: string; en: string }> = {
  Manufacturing: { de: 'Fertigung', en: 'Manufacturing' },
  Logistics: { de: 'Logistik', en: 'Logistics' },
  Retail: { de: 'Einzelhandel', en: 'Retail' },
  Construction: { de: 'Bauwesen', en: 'Construction' },
  Healthcare: { de: 'Gesundheitswesen', en: 'Healthcare' },
  Technology: { de: 'Technologie', en: 'Technology' },
  'Food & Beverage': { de: 'Lebensmittel & Getraenke', en: 'Food & Beverage' },
  Automotive: { de: 'Automobil', en: 'Automotive' },
  Energy: { de: 'Energie', en: 'Energy' },
  'Public Sector': { de: 'Oeffentlicher Sektor', en: 'Public Sector' }
}

const CONTACT_ROLE_MAP: Record<string, { de: string; en: string }> = {
  'Risk Manager': { de: 'Risikomanager', en: 'Risk Manager' },
  CFO: { de: 'CFO', en: 'CFO' },
  'Operations Lead': { de: 'Leitung Betrieb', en: 'Operations Lead' },
  Procurement: { de: 'Einkauf', en: 'Procurement' }
}

const LOB_MAP: Record<string, { de: string; en: string }> = {
  'Fleet Liability': { de: 'Flottenhaftpflicht', en: 'Fleet Liability' },
  'Property All Risk': { de: 'Sachversicherung All Risk', en: 'Property All Risk' },
  'Cyber Shield': { de: 'Cyber Schutz', en: 'Cyber Shield' },
  'Cargo Protect': { de: 'Transportversicherung', en: 'Cargo Protect' },
  'General Liability': { de: 'Betriebshaftpflicht', en: 'General Liability' },
  Property: { de: 'Sachversicherung', en: 'Property' },
  Liability: { de: 'Haftpflicht', en: 'Liability' },
  Cyber: { de: 'Cyber', en: 'Cyber' },
  Fleet: { de: 'Flotte', en: 'Fleet' },
  Cargo: { de: 'Transport', en: 'Cargo' }
}

const COVERAGE_LABEL_MAP: Record<string, { de: string; en: string }> = {
  'General Liability': { de: 'Betriebshaftpflicht', en: 'General Liability' },
  Property: { de: 'Sachversicherung', en: 'Property' },
  Cargo: { de: 'Transport', en: 'Cargo' },
  Cyber: { de: 'Cyber', en: 'Cyber' }
}

function pickLocalized(
  value: string | undefined,
  lang: Lang,
  map: Record<string, { de: string; en: string }>
) {
  if (!value) return value
  const entry = map[value]
  return entry ? entry[lang] : value
}

export function localizeClientSegment(value: string | undefined, lang: Lang) {
  return pickLocalized(value, lang, SEGMENT_MAP)
}

export function localizeClientIndustry(value: string | undefined, lang: Lang) {
  return pickLocalized(value, lang, INDUSTRY_MAP)
}

export function localizeClientContactRole(value: string | undefined, lang: Lang) {
  return pickLocalized(value, lang, CONTACT_ROLE_MAP)
}

export function localizeLob(value: string | undefined, lang: Lang) {
  return pickLocalized(value, lang, LOB_MAP)
}

export function localizeCoverageLabel(value: string | undefined, lang: Lang) {
  return pickLocalized(value, lang, COVERAGE_LABEL_MAP)
}

export function localizeTenderTitle(value: string | undefined, lang: Lang) {
  if (!value) return value
  if (lang === 'de') {
    return value.replace(/\bProgram\b/g, 'Programm')
  }
  return value.replace(/\bProgramm\b/g, 'Program')
}
