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

const deadlineItems = [
  { id: 'd1', key: 'committee', due: '12 Feb' },
  { id: 'd2', key: 'broker', due: '15 Feb' },
  { id: 'd3', key: 'pricing', due: '18 Feb' },
  { id: 'd4', key: 'qa', due: '21 Feb' },
  { id: 'd5', key: 'decision', due: '25 Feb' }
]

export default function UnderwriterfoxCaseDetailPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { caseId } = useParams()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [uwCase, setUwCase] = useState<UnderwritingCase | null>(null)
  const [documents, setDocuments] = useState<CaseDocument[]>([])
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline' | 'decision'>('overview')
  const [selectedDeadline, setSelectedDeadline] = useState<typeof deadlineItems[number] | null>(null)

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
        subtitle={`${uwCase.insured} · ${uwCase.productLine}`}
        rightRail={(
          <Card variant="glass" title={t('underwriterfox.deadlines.title')} subtitle={t('underwriterfox.deadlines.subtitle')} style={{ height: 280 }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
            {deadlineItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedDeadline(item)}
                style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', border: 'none', background: 'transparent', textAlign: 'left', color: '#0f172a' }}
              >
                <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t(`underwriterfox.deadlines.caseItems.${item.key}.title`)}</span>
                <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.due}</span>
              </button>
            ))}
            </div>
          </Card>
        )}
      >
        <Card variant="glass" title={t('underwriterfox.caseDetail.overview')}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', color: '#475569', fontSize: '0.9rem' }}>
            <span><strong>{t('underwriterfox.labels.broker')}:</strong> {uwCase.broker}</span>
            <span><strong>{t('underwriterfox.labels.segment')}:</strong> {uwCase.segment}</span>
            <span><strong>{t('underwriterfox.labels.premium')}:</strong> €{uwCase.premium.total.toLocaleString()}</span>
            <span><strong>{t('underwriterfox.labels.status')}:</strong> {t(`underwriterfox.status.${uwCase.status}`)}</span>
            <span><strong>{t('underwriterfox.labels.inception')}:</strong> {new Date(uwCase.inceptionDate).toLocaleDateString()}</span>
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

      {selectedDeadline ? (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.35)', display: 'grid', placeItems: 'center', zIndex: 60 }}
          onClick={() => setSelectedDeadline(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', width: 'min(420px, 90vw)', boxShadow: '0 18px 50px rgba(15,23,42,0.2)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
              <strong>{t('underwriterfox.deadlines.modalTitle')}</strong>
              <button type="button" onClick={() => setSelectedDeadline(null)} style={{ border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', padding: '0.2rem 0.5rem' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div style={{ fontWeight: 600 }}>{t(`underwriterfox.deadlines.caseItems.${selectedDeadline.key}.title`)}</div>
              <div style={{ color: '#64748b' }}>{t(`underwriterfox.deadlines.caseItems.${selectedDeadline.key}.detail`)}</div>
              <div style={{ color: '#0f172a' }}>{selectedDeadline.due}</div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="sm" variant="secondary" onClick={() => setSelectedDeadline(null)}>{t('underwriterfox.deadlines.modalClose')}</Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
