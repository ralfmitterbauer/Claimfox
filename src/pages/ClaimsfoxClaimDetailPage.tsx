import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import ClaimsfoxModal from '@/claimsfox/components/ClaimsfoxModal'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, getClaim, listDocumentsByClaim, listPartners, listTasks, listTimelineEvents, requestPartner, updateClaimStatus } from '@/claimsfox/api/claimsfoxApi'
import type { Claim, Document, Partner, Task, TimelineEvent } from '@/claimsfox/types'

const deadlineItems = [
  { key: 'inspection', titleKey: 'claimsfox.deadlines.items.inspection', detailKey: 'claimsfox.deadlines.items.inspectionDetail' },
  { key: 'reserve', titleKey: 'claimsfox.deadlines.items.reserve', detailKey: 'claimsfox.deadlines.items.reserveDetail' },
  { key: 'settlement', titleKey: 'claimsfox.deadlines.items.settlement', detailKey: 'claimsfox.deadlines.items.settlementDetail' },
  { key: 'broker', titleKey: 'claimsfox.deadlines.items.broker', detailKey: 'claimsfox.deadlines.items.brokerDetail' },
  { key: 'fraud', titleKey: 'claimsfox.deadlines.items.fraud', detailKey: 'claimsfox.deadlines.items.fraudDetail' }
]

export default function ClaimsfoxClaimDetailPage() {
  const { claimId } = useParams()
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [claim, setClaim] = useState<Claim | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [tab, setTab] = useState<'overview' | 'documents' | 'timeline' | 'decision'>('overview')
  const [selectedDeadline, setSelectedDeadline] = useState<typeof deadlineItems[number] | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [selectedPartner, setSelectedPartner] = useState('')
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const currencyFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!claimId) return
      const [claimData, docs, events, tasksData, partnersData] = await Promise.all([
        getClaim(ctx, claimId),
        listDocumentsByClaim(ctx, claimId),
        listTimelineEvents(ctx, 'claim', claimId),
        listTasks(ctx),
        listPartners(ctx)
      ])
      if (!mounted) return
      setClaim(claimData)
      setDocuments(docs)
      setTimeline(events)
      setTasks(tasksData)
      setPartners(partnersData)
      setSelectedPartner(partnersData[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx, claimId])

  const tabs = useMemo(() => (
    [
      { key: 'overview', label: t('claimsfox.claimDetail.tabs.overview') },
      { key: 'documents', label: t('claimsfox.claimDetail.tabs.documents') },
      { key: 'timeline', label: t('claimsfox.claimDetail.tabs.timeline') },
      { key: 'decision', label: t('claimsfox.claimDetail.tabs.decision') }
    ] as const
  ), [t])

  async function handleDecision(nextStatus: Claim['status']) {
    if (!claimId) return
    await updateClaimStatus(ctx, claimId, nextStatus)
    const refreshed = await getClaim(ctx, claimId)
    setClaim(refreshed)
    const events = await listTimelineEvents(ctx, 'claim', claimId)
    setTimeline(events)
  }

  async function addNote() {
    if (!claimId) return
    await addTimelineEvent(ctx, {
      entityType: 'claim',
      entityId: claimId,
      type: 'internalNote',
      title: t('claimsfox.claimDetail.events.noteTitle'),
      message: t('claimsfox.claimDetail.events.noteMessage'),
      actor: ctx.userId
    })
    const events = await listTimelineEvents(ctx, 'claim', claimId)
    setTimeline(events)
  }

  async function assignPartner() {
    if (!claimId || !selectedPartner) return
    const partnerName = partners.find((partner) => partner.id === selectedPartner)?.name ?? selectedPartner
    await requestPartner(ctx, claimId, selectedPartner, t('claimsfox.claimDetail.events.partnerRequestReason'))
    await addTimelineEvent(ctx, {
      entityType: 'claim',
      entityId: claimId,
      type: 'internalNote',
      title: t('claimsfox.claimDetail.events.partnerAssignedTitle'),
      message: t('claimsfox.claimDetail.events.partnerAssignedMessage', { partner: partnerName }),
      actor: ctx.userId
    })
  }

  if (!claim) {
    return (
      <ClaimsfoxLayout title={t('claimsfox.claimDetail.title')} subtitle={t('claimsfox.claimDetail.subtitle')}>
        <Card>{t('claimsfox.common.loading')}</Card>
      </ClaimsfoxLayout>
    )
  }

  return (
    <ClaimsfoxLayout
      title={`${t('claimsfox.claimDetail.title')} ${claim.claimNumber}`}
      subtitle={`${claim.insured} · ${claim.lineOfBusiness}`}
      topLeft={(
        <div style={{ display: 'grid', gap: '0.35rem', color: '#ffffff', fontSize: '0.85rem' }}>
          <span>{t('claimsfox.claimDetail.policy')}: {claim.policyRef}</span>
          <span>{t('claimsfox.claimDetail.status')}: {t(`claimsfox.status.${claim.status}`)}</span>
        </div>
      )}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '1.5rem', alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <Card>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {tabs.map((item) => (
                <Button
                  key={item.key}
                  size="sm"
                  variant={tab === item.key ? 'primary' : 'secondary'}
                  onClick={() => setTab(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            {tab === 'overview' && (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gap: '0.35rem' }}>
                  <strong>{t('claimsfox.claimDetail.overviewTitle')}</strong>
                  <span style={{ color: '#475569' }}>{claim.timelineSummary}</span>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <div><strong>{t('claimsfox.claimDetail.lossDate')}:</strong> {new Date(claim.lossDate).toLocaleDateString(locale)}</div>
                  <div><strong>{t('claimsfox.claimDetail.severity')}:</strong> {t(`claimsfox.severity.${claim.severity}`)}</div>
                  <div><strong>{t('claimsfox.claimDetail.reserve')}:</strong> {currencyFormatter.format(claim.reserve)}</div>
                  <div><strong>{t('claimsfox.claimDetail.paid')}:</strong> {currencyFormatter.format(claim.paid)}</div>
                  <div><strong>{t('claimsfox.claimDetail.slaDue')}:</strong> {new Date(claim.slaDueAt).toLocaleDateString(locale)}</div>
                  <div><strong>{t('claimsfox.claimDetail.assigned')}:</strong> {claim.assignedTo}</div>
                </div>
              </div>
            )}
            {tab === 'documents' && (
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {documents.map((doc) => (
                  <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{doc.fileName}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('claimsfox.documents.status')}: {t(`claimsfox.documents.statusLabels.${doc.approvalStatus}`)}</div>
                    </div>
                    <a href={doc.urlOrBlobKey} style={{ fontSize: '0.85rem', color: '#0f172a' }} target="_blank" rel="noreferrer">{t('claimsfox.documents.open')}</a>
                  </div>
                ))}
              </div>
            )}
            {tab === 'timeline' && (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {timeline.map((event) => (
                  <div key={event.id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
                    <div style={{ fontWeight: 600 }}>{event.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{new Date(event.createdAt).toLocaleString(locale)} · {event.actor}</div>
                    <div style={{ color: '#475569' }}>{event.message}</div>
                  </div>
                ))}
                <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <textarea placeholder={t('claimsfox.claimDetail.notePlaceholder')} style={{ minHeight: 90, padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
                  <Button size="sm" onClick={addNote}>{t('claimsfox.claimDetail.actions.addNote')}</Button>
                </div>
              </div>
            )}
            {tab === 'decision' && (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ color: '#475569' }}>{t('claimsfox.claimDetail.decisionHint')}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Button size="sm" onClick={() => handleDecision('settlement')}>{t('claimsfox.claimDetail.actions.settlement')}</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleDecision('investigation')}>{t('claimsfox.claimDetail.actions.investigation')}</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleDecision('denied')}>{t('claimsfox.claimDetail.actions.deny')}</Button>
                  <Button size="sm" variant="secondary" onClick={addNote}>{t('claimsfox.claimDetail.actions.addNote')}</Button>
                </div>
              </div>
            )}
          </Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <Card title={t('claimsfox.claimDetail.assignmentsTitle')} subtitle={t('claimsfox.claimDetail.assignmentsSubtitle')}>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('claimsfox.claimDetail.tasksLabel')}</div>
                {tasks.filter((task) => task.linkedEntityId === claim.id).slice(0, 3).map((task) => (
                  <div key={task.id} style={{ display: 'grid', gap: '0.2rem' }}>
                    <span style={{ fontWeight: 600 }}>{task.title}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{task.owner}</span>
                  </div>
                ))}
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.4rem' }}>{t('claimsfox.claimDetail.partnerLabel')}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <select value={selectedPartner} onChange={(event) => setSelectedPartner(event.target.value)} style={{ padding: '0.45rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    {partners.map((partner) => (
                      <option key={partner.id} value={partner.id}>{partner.name}</option>
                    ))}
                  </select>
                  <Button size="sm" onClick={assignPartner}>{t('claimsfox.claimDetail.assignPartner')}</Button>
                </div>
              </div>
            </Card>
            <Card title={t('claimsfox.claimDetail.aiTitle')} subtitle={t('claimsfox.claimDetail.aiSubtitle')}>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>{t('claimsfox.claimDetail.aiRecommendation')}</div>
                <div style={{ color: '#475569' }}>{t('claimsfox.claimDetail.aiSummary')}</div>
                <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569' }}>
                  <li>{t('claimsfox.claimDetail.aiBullet1')}</li>
                  <li>{t('claimsfox.claimDetail.aiBullet2')}</li>
                  <li>{t('claimsfox.claimDetail.aiBullet3')}</li>
                </ul>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{t('claimsfox.claimDetail.aiSources')}</div>
              </div>
            </Card>
          </div>
        </div>
        <Card title={t('claimsfox.deadlines.title')} subtitle={t('claimsfox.deadlines.subtitle')} style={{ height: '100%' }}>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
                {deadlineItems.map((item, idx) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedDeadline(item)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  border: 'none',
                  background: 'transparent',
                  color: '#0f172a',
                  padding: 0,
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{t(item.titleKey)}</span>
                <span style={{ color: '#64748b' }}>{new Date(Date.now() + (idx + 2) * 86400000).toLocaleDateString(lang, { month: 'short', day: '2-digit' })}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
      <ClaimsfoxModal open={Boolean(selectedDeadline)} onClose={() => setSelectedDeadline(null)}>
        {selectedDeadline && (
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <h3 style={{ margin: 0 }}>{t(selectedDeadline.titleKey)}</h3>
            <p style={{ color: '#475569' }}>{t(selectedDeadline.detailKey)}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="sm" onClick={() => {
                setSelectedDeadline(null)
                navigate(`/claimsfox/claims/${claim.id}`)
              }}>
                {t('claimsfox.deadlines.openClaim')}
              </Button>
            </div>
          </div>
        )}
      </ClaimsfoxModal>
    </ClaimsfoxLayout>
  )
}
