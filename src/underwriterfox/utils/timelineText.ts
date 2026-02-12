import type { TimelineEvent } from '@/underwriterfox/types'
type Translator = (path: string, vars?: Record<string, string | number | undefined>) => string

const TITLE_KEY_MAP: Record<string, string> = {
  'Case created': 'underwriterfox.timeline.systemTitles.caseCreated',
  'Document uploaded': 'underwriterfox.timeline.systemTitles.documentUploaded',
  'Rules evaluated': 'underwriterfox.timeline.systemTitles.rulesEvaluated',
  'Rating recalculated': 'underwriterfox.timeline.systemTitles.ratingRecalculated',
  'AI recommendation generated': 'underwriterfox.timeline.systemTitles.aiGenerated',
  'Case status updated': 'underwriterfox.timeline.systemTitles.statusUpdated',
  'Rules evaluation saved': 'underwriterfox.timeline.systemTitles.rulesSaved',
  'Rating snapshot saved': 'underwriterfox.timeline.systemTitles.ratingSaved',
  'Audit export generated': 'underwriterfox.timeline.systemTitles.auditExported'
}

export function translateTimelineTitle(event: TimelineEvent, t: Translator): string {
  const key = TITLE_KEY_MAP[event.title]
  return key ? t(key) : event.title
}
