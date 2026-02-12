import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import PartnerTimelineThread from '@/partnerfox/components/PartnerTimelineThread'
import AIRepairCheckCard from '@/partnerfox/components/AIRepairCheckCard'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  assignRental,
  enableDirectBilling,
  getCase,
  listPartners,
  listTimelineEvents,
  markSubrogationCandidate
} from '@/partnerfox/api/partnerfoxApi'
import type { Partner, PartnerCase, TimelineEvent } from '@/partnerfox/types'

function getPartnerName(list: Partner[], partnerId?: string) {
  if (!partnerId) return '-'
  return list.find((item) => item.id === partnerId)?.name ?? '-'
}

function downloadCaseDoc(
  item: PartnerCase,
  labels: {
    caseLabel: string
    vehicleLabel: string
    damageSummaryLabel: string
    estimatedCostLabel: string
    repairDurationLabel: string
    aiApprovedLabel: string
    yesLabel: string
    noLabel: string
    footer: string
  }
) {
  const content = [
    `${labels.caseLabel}: ${item.claimNumber}`,
    `${labels.vehicleLabel}: ${item.vehiclePlate}`,
    `${labels.damageSummaryLabel}: ${item.damageSummary}`,
    `${labels.estimatedCostLabel}: EUR ${item.estimatedCost.toLocaleString()}`,
    `${labels.repairDurationLabel}: ${item.repairDurationDays} days`,
    `${labels.aiApprovedLabel}: ${item.aiApproved ? labels.yesLabel : labels.noLabel}`,
    '',
    labels.footer
  ].join('\n')
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `Partner_Case_${item.claimNumber}.txt`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export default function PartnerfoxCaseDetailPage() {
  const { caseId } = useParams()
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [item, setItem] = useState<PartnerCase | null>(null)
  const [partners, setPartners] = useState<Partner[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const downloadLabels = {
    caseLabel: t('partnerfox.caseDetail.doc.caseLabel'),
    vehicleLabel: t('partnerfox.caseDetail.doc.vehicleLabel'),
    damageSummaryLabel: t('partnerfox.caseDetail.doc.damageSummaryLabel'),
    estimatedCostLabel: t('partnerfox.caseDetail.doc.estimatedCostLabel'),
    repairDurationLabel: t('partnerfox.caseDetail.doc.repairDurationLabel'),
    aiApprovedLabel: t('partnerfox.caseDetail.doc.aiApprovedLabel'),
    yesLabel: t('partnerfox.caseDetail.doc.yes'),
    noLabel: t('partnerfox.caseDetail.doc.no'),
    footer: t('partnerfox.caseDetail.doc.footer')
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!caseId) return
      const [caseData, partnerData, timelineData] = await Promise.all([
        getCase(ctx, caseId),
        listPartners(ctx),
        listTimelineEvents(ctx, 'case', caseId)
      ])
      if (!mounted) return
      setItem(caseData)
      setPartners(partnerData)
      setTimeline(timelineData)
    }
    load()
    return () => { mounted = false }
  }, [caseId, ctx])

  const rentalPartners = useMemo(() => partners.filter((partner) => partner.type === 'rental'), [partners])

  async function refresh() {
    if (!caseId) return
    const [caseData, timelineData] = await Promise.all([
      getCase(ctx, caseId),
      listTimelineEvents(ctx, 'case', caseId)
    ])
    setItem(caseData)
    setTimeline(timelineData)
  }

  async function onEnableDirectBilling() {
    if (!caseId) return
    await enableDirectBilling(ctx, caseId)
    await refresh()
  }

  async function onAssignRental() {
    if (!caseId || rentalPartners.length === 0) return
    await assignRental(ctx, caseId, rentalPartners[0].id)
    await refresh()
  }

  async function onMarkSubrogation() {
    if (!caseId) return
    await markSubrogationCandidate(ctx, caseId)
    await refresh()
  }

  async function onSaveNote() {
    if (!caseId) return
    await addTimelineEvent(ctx, {
      entityType: 'case',
      entityId: caseId,
      type: 'note',
      title: t('partnerfox.caseDetail.timelineNoteTitle'),
      message: t('partnerfox.caseDetail.timelineNoteMessage'),
      meta: { actor: ctx.userId }
    })
    await refresh()
  }

  if (!item) {
    return <PartnerfoxLayout title={t('partnerfox.caseDetail.title')} subtitle={t('partnerfox.common.loading')}><Card>{t('partnerfox.common.loading')}</Card></PartnerfoxLayout>
  }

  return (
    <PartnerfoxLayout
      title={`${t('partnerfox.caseDetail.title')} ${item.claimNumber}`}
      subtitle={`${item.vehiclePlate} · ${t(`partnerfox.cases.status.${item.status}`)}`}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
            <div>{t('partnerfox.caseDetail.damageSummary')}: {item.damageSummary}</div>
            <div>{t('partnerfox.caseDetail.assignedWorkshop')}: {getPartnerName(partners, item.partnerId)}</div>
            <div>{t('partnerfox.caseDetail.rentalPartner')}: {getPartnerName(partners, item.rentalPartnerId)}</div>
            <div>{t('partnerfox.caseDetail.towingPartner')}: {getPartnerName(partners, item.towingPartnerId)}</div>
            <div>{t('partnerfox.caseDetail.estimatedCost')}: EUR {item.estimatedCost.toLocaleString()}</div>
            <div>{t('partnerfox.caseDetail.repairDuration')}: {item.repairDurationDays}</div>
            <div>{t('partnerfox.caseDetail.trackingLink')}: <a href={item.customerTrackingLink} target="_blank" rel="noreferrer">{item.customerTrackingLink}</a></div>
          </div>
          <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button size="sm" onClick={onEnableDirectBilling}>{t('partnerfox.actions.enableDirectBilling')}</Button>
            <Button size="sm" variant="secondary" onClick={onAssignRental}>{t('partnerfox.actions.assignRental')}</Button>
            <Button size="sm" variant="secondary" onClick={onMarkSubrogation}>{t('partnerfox.actions.markCandidate')}</Button>
            <Button size="sm" variant="secondary" onClick={onSaveNote}>{t('partnerfox.actions.saveNote')}</Button>
          </div>
        </Card>

        <AIRepairCheckCard item={item} onApprove={onEnableDirectBilling} />

        <Card title={t('partnerfox.caseDetail.documentsTitle')}>
          <Button size="sm" onClick={() => downloadCaseDoc(item, downloadLabels)}>{t('partnerfox.caseDetail.downloadDocument')}</Button>
        </Card>

        <Card title={t('partnerfox.caseDetail.timelineTitle')}>
          <PartnerTimelineThread events={timeline} emptyLabel={t('partnerfox.audit.empty')} />
        </Card>
      </div>
    </PartnerfoxLayout>
  )
}
