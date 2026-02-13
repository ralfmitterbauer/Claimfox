import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import CaseDocumentsPanel from '@/underwriterfox/components/CaseDocumentsPanel'
import CaseTimeline from '@/underwriterfox/components/CaseTimeline'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases, listDocumentsByCase, listTimeline, updateCaseStatus } from '@/underwriterfox/api/underwriterfoxApi'
import type { CaseDocument, TimelineEvent, UnderwritingCase } from '@/underwriterfox/types'
import { localizeUnderwriterProductLine, localizeUnderwriterSegment } from '@/underwriterfox/utils/localizeDemoValues'

const deadlineItems = [
  { id: 'd1', key: 'committee', dueAt: '2026-02-12' },
  { id: 'd2', key: 'broker', dueAt: '2026-02-15' },
  { id: 'd3', key: 'pricing', dueAt: '2026-02-18' },
  { id: 'd4', key: 'qa', dueAt: '2026-02-21' },
  { id: 'd5', key: 'decision', dueAt: '2026-02-25' }
]

export default function UnderwriterfoxCaseDetailPage() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const { caseId } = useParams()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [uwCase, setUwCase] = useState<UnderwritingCase | null>(null)
  const [documents, setDocuments] = useState<CaseDocument[]>([])
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline' | 'decision'>('overview')
  const dateLocale = lang === 'de' ? 'de-DE' : 'en-US'
  const currencyFormatter = new Intl.NumberFormat(dateLocale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
  const formatDue = (isoDate: string) => new Date(isoDate).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' })

  async function handleStatusChange(status: UnderwritingCase['status'], rationale: string) {
    if (!uwCase) return
    const next = await updateCaseStatus(ctx, uwCase.id, status, rationale)
    if (next) {
      setUwCase(next)
      const timeline = await listTimeline(ctx)
      setEvents(timeline.filter((event) => event.entityId === next.id).slice(0, 20))
    }
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      const list = await listCases(ctx)
      const current = list.find((item) => item.id === caseId) ?? null
      if (!mounted) return
      setUwCase(current)
      if (current) {
        const docs = await listDocumentsByCase(ctx, current.id)
        const timeline = await listTimeline(ctx)
        setDocuments(docs)
        setEvents(timeline.filter((event) => event.entityId === current.id).slice(0, 20))
      }
    }
    load()
    return () => { mounted = false }
  }, [ctx.tenantId, caseId])

  const decisionSummary = useMemo(() => {
    if (!uwCase?.decision) return t('underwriterfox.caseDetail.decision.none')
    return `${uwCase.decision.status.toUpperCase()} · ${uwCase.decision.rationale}`
  }, [uwCase, t])

  if (!uwCase) {
    return (
      <section className="page">
        <p>{t('underwriterfox.state.notFound')}</p>
        <Button size="sm" onClick={() => navigate('/underwriterfox/cases')}>{t('underwriterfox.cases.title')}</Button>
      </section>
    )
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout
        title={`${t('underwriterfox.caseDetail.title')} ${uwCase.caseNumber}`}
        subtitle={`${uwCase.insured} · ${localizeUnderwriterProductLine(uwCase.productLine, lang) ?? uwCase.productLine}`}
        rightRail={(
          <Card variant="glass" title={t('underwriterfox.deadlines.title')} subtitle={t('underwriterfox.deadlines.subtitle')} style={{ height: 280 }}>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
            {deadlineItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.82rem', minWidth: 0 }}>
                <span
                  style={{
                    color: '#0f172a',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0
                  }}
                  title={t(`underwriterfox.deadlines.caseItems.${item.key}.title`)}
                >
                  {t(`underwriterfox.deadlines.caseItems.${item.key}.title`)}
                </span>
                <span style={{ color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0, fontSize: '0.82rem' }}>{formatDue(item.dueAt)}</span>
              </div>
            ))}
            </div>
          </Card>
        )}
      >
        <Card variant="glass" title={t('underwriterfox.caseDetail.overview')}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', color: '#475569', fontSize: '0.9rem' }}>
            <span><strong>{t('underwriterfox.labels.broker')}:</strong> {uwCase.broker}</span>
            <span><strong>{t('underwriterfox.labels.segment')}:</strong> {localizeUnderwriterSegment(uwCase.segment, lang) ?? uwCase.segment}</span>
            <span><strong>{t('underwriterfox.labels.premium')}:</strong> {currencyFormatter.format(uwCase.premium.total)}</span>
            <span><strong>{t('underwriterfox.labels.status')}:</strong> {t(`underwriterfox.status.${uwCase.status}`)}</span>
            <span><strong>{t('underwriterfox.labels.inception')}:</strong> {new Date(uwCase.inceptionDate).toLocaleDateString(dateLocale)}</span>
          </div>
        </Card>

        <Card variant="glass">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['overview', 'documents', 'timeline', 'decision'] as const).map((tab) => (
              <Button key={tab} size="sm" variant={activeTab === tab ? 'secondary' : 'primary'} onClick={() => setActiveTab(tab)}>
                {t(`underwriterfox.caseDetail.tabs.${tab}`)}
              </Button>
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>
            {activeTab === 'overview' ? (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div><strong>{t('underwriterfox.labels.riskScore')}:</strong> {uwCase.risk.score} · {t('underwriterfox.ai.confidence')}: {Math.round(uwCase.risk.confidence * 100)}%</div>
                <div style={{ display: 'grid', gap: '0.25rem' }}>
                  {uwCase.risk.factors.map((factor) => (
                    <span key={factor} style={{ color: '#64748b' }}>{factor}</span>
                  ))}
                </div>
              </div>
            ) : null}
            {activeTab === 'documents' ? <CaseDocumentsPanel documents={documents} /> : null}
            {activeTab === 'timeline' ? <CaseTimeline events={events} /> : null}
            {activeTab === 'decision' ? (
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <strong>{t('underwriterfox.caseDetail.decision.label')}</strong>
                <div style={{ color: '#475569' }}>{decisionSummary}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Button size="sm" onClick={() => handleStatusChange('offer', t('underwriterfox.messages.offerPrepared'))}>{t('underwriterfox.actions.setOffer')}</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleStatusChange('bound', t('underwriterfox.messages.boundAfterReview'))}>{t('underwriterfox.actions.bind')}</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleStatusChange('declined', t('underwriterfox.messages.declinedInCommittee'))}>{t('underwriterfox.actions.decline')}</Button>
                </div>
              </div>
            ) : null}
          </div>
        </Card>
      </UnderwriterfoxLayout>
    </section>
  )
}
