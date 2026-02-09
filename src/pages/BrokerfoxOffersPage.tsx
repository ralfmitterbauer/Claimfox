import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import TimelineComposer from '@/brokerfox/components/TimelineComposer'
import TimelineThread from '@/brokerfox/components/TimelineThread'
import RiskAnalysisPanel from '@/brokerfox/components/RiskAnalysisPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  aiCompareOffers,
  aiGenerateClientSummary,
  listClients,
  listOffers,
  listTimelineEvents,
  listTenders
} from '@/brokerfox/api/brokerfoxApi'
import type { Offer } from '@/brokerfox/types'
import { buildRiskAnalysis } from '@/brokerfox/ai/riskEngine'

export default function BrokerfoxOffersPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [offers, setOffers] = useState<Offer[]>([])
  const [tenders, setTenders] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [selectedTenderId, setSelectedTenderId] = useState('')
  const [selectedOfferId, setSelectedOfferId] = useState('')
  const [comparison, setComparison] = useState<any | null>(null)
  const [summary, setSummary] = useState('')
  const [approved, setApproved] = useState(false)
  const [events, setEvents] = useState([])
  const [draftMessage, setDraftMessage] = useState('')
  const [draftApproved, setDraftApproved] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [offerData, tenderData, clientData] = await Promise.all([listOffers(ctx), listTenders(ctx), listClients(ctx)])
        if (!mounted) return
        setOffers(offerData)
        setTenders(tenderData)
        setClients(clientData)
        setSelectedTenderId(tenderData[0]?.id ?? '')
        setLoading(false)
      } catch {
        if (!mounted) return
        setError(t('brokerfox.state.error'))
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [ctx, t])

  const tenderOffers = useMemo(() => offers.filter((offer) => offer.tenderId === selectedTenderId), [offers, selectedTenderId])
  const selectedTender = useMemo(() => tenders.find((tender) => tender.id === selectedTenderId), [tenders, selectedTenderId])
  const clientName = useMemo(() => clients.find((client) => client.id === selectedTender?.clientId)?.name ?? t('brokerfox.offers.clientUnknown'), [clients, selectedTender, t])
  const selectedClient = useMemo(() => clients.find((client) => client.id === selectedTender?.clientId) ?? null, [clients, selectedTender])
  const analysis = useMemo(() => buildRiskAnalysis(selectedClient, selectedTender ?? null), [selectedClient, selectedTender])

  useEffect(() => {
    const nextOfferId = tenderOffers[0]?.id ?? ''
    setSelectedOfferId(nextOfferId)
  }, [tenderOffers])

  useEffect(() => {
    let mounted = true
    async function loadTimeline() {
      if (!selectedOfferId) {
        setEvents([])
        return
      }
      const timeline = await listTimelineEvents(ctx, 'offer', selectedOfferId)
      if (!mounted) return
      setEvents(timeline)
    }
    loadTimeline()
    return () => { mounted = false }
  }, [ctx, selectedOfferId])

  const compareRows = useMemo(() => {
    const rows: Array<{ coverage: string; values: string[]; differ: boolean }> = []
    const coverageSet = new Set<string>()
    tenderOffers.forEach((offer) => offer.lines.forEach((line) => coverageSet.add(line.coverage)))
    Array.from(coverageSet).forEach((coverage) => {
      const values = tenderOffers.map((offer) => {
        const line = offer.lines.find((l) => l.coverage === coverage)
        return line ? `${line.limit} · ${line.exclusion} · ${line.premium}` : t('brokerfox.offers.noQuote')
      })
      const differ = new Set(values).size > 1
      rows.push({ coverage, values, differ })
    })
    return rows
  }, [tenderOffers, t])

  async function handleCompare() {
    const result = await aiCompareOffers(tenderOffers)
    setComparison(result)
    setSummary('')
    setApproved(false)
    if (selectedTenderId) {
      await addTimelineEvent(ctx, {
        entityType: 'tender',
        entityId: selectedTenderId,
        type: 'statusUpdate',
        title: t('brokerfox.offers.compareLoggedTitle'),
        message: t('brokerfox.offers.compareLoggedMessage')
      })
    }
  }

  async function handleGenerateSummary() {
    if (!comparison || !selectedTender) {
      return
    }
    const result = await aiGenerateClientSummary({
      clientName,
      tenderTitle: selectedTender.title,
      comparison: comparison.result
    })
    setSummary(result.result)
    await addTimelineEvent(ctx, {
      entityType: 'tender',
      entityId: selectedTender.id,
      type: 'statusUpdate',
      title: t('brokerfox.offers.aiSummaryTitle'),
      message: t('brokerfox.offers.aiSummaryMessage')
    })
  }

  async function handleSend() {
    if (!approved || !selectedTenderId) {
      return
    }
    await addTimelineEvent(ctx, {
      entityType: 'tender',
      entityId: selectedTenderId,
      type: 'statusUpdate',
      title: t('brokerfox.offers.summarySentTitle'),
      message: t('brokerfox.offers.summarySentMessage')
    })
    setApproved(false)
  }

  async function handleSendDraft() {
    if (!selectedTenderId || !draftMessage.trim() || !draftApproved) return
    await addTimelineEvent(ctx, {
      entityType: 'tender',
      entityId: selectedTenderId,
      type: 'externalMessage',
      title: t('brokerfox.ai.draftSentTitle'),
      message: draftMessage
    })
    setDraftMessage('')
    setDraftApproved(false)
  }

  async function handleComposer(payload: { type: any; message: string; attachments: any[] }) {
    if (!selectedOfferId) return
    await addTimelineEvent(ctx, {
      entityType: 'offer',
      entityId: selectedOfferId,
      type: payload.type,
      title: payload.type === 'externalMessage' ? t('brokerfox.timeline.externalMessage') : payload.type === 'internalNote' ? t('brokerfox.timeline.internalNote') : t('brokerfox.timeline.statusUpdate'),
      message: payload.message,
      attachments: payload.attachments.map((file) => ({ ...file, tenantId: ctx.tenantId }))
    })
    const timeline = await listTimelineEvents(ctx, 'offer', selectedOfferId)
    setEvents(timeline)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout title={t('brokerfox.offers.title')} subtitle={t('brokerfox.offers.subtitle')}>
        <Card variant="glass" title={t('brokerfox.offers.listTitle')} subtitle={t('brokerfox.offers.listSubtitle')}>
          {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
          {error ? <p>{error}</p> : null}
          {offers.length === 0 ? <p>{t('brokerfox.empty.noOffers')}</p> : null}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select
              value={selectedTenderId}
              onChange={(event) => setSelectedTenderId(event.target.value)}
              style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            >
              {tenders.map((tender) => (
                <option key={tender.id} value={tender.id}>{tender.title}</option>
              ))}
            </select>
            <Button onClick={handleCompare}>{t('brokerfox.offers.compareAction')}</Button>
          </div>
          {tenderOffers.map((offer) => (
            <div key={offer.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <strong>{offer.carrier.name}</strong>
              <div style={{ color: '#64748b' }}>{t('brokerfox.offers.linesCount', { count: offer.lines.length })}</div>
            </div>
          ))}
        </Card>

        <Card variant="glass" title={t('brokerfox.offers.compareTitle')} subtitle={t('brokerfox.offers.compareSubtitle')}>
          {comparison ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${tenderOffers.length}, minmax(160px, 1fr))`, gap: '0.5rem' }}>
                <div />
                {tenderOffers.map((offer) => (
                  <strong key={offer.id} style={{ textAlign: 'center' }}>{offer.carrier.name}</strong>
                ))}
                {compareRows.filter((row) => row.differ).map((row) => (
                  <React.Fragment key={row.coverage}>
                    <div style={{ fontWeight: 600 }}>{row.coverage}</div>
                    {row.values.map((value, index) => (
                      <div key={index} style={{ background: '#fef3c7', padding: '0.35rem', borderRadius: 8, textAlign: 'center' }}>{value}</div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
              <Card variant="glass" title={t('brokerfox.offers.aiCompareTitle')}>
                <p style={{ marginTop: 0 }}>{t('brokerfox.offers.aiHint')}</p>
                <p style={{ margin: 0 }}>{comparison.result.summary}</p>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                  {comparison.result.highlights.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <Button onClick={handleGenerateSummary}>{t('brokerfox.actions.generateSummary')}</Button>
                {summary ? (
                  <textarea value={summary} readOnly rows={5} style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
                ) : null}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={approved} onChange={(event) => setApproved(event.target.checked)} />
                  {t('brokerfox.offers.approvalLabel')}
                </label>
                <Button onClick={handleSend} disabled={!approved}>{t('brokerfox.actions.approveAndSend')}</Button>
              </div>
            </div>
          ) : (
            <p>{t('brokerfox.offers.compareEmpty')}</p>
          )}
        </Card>

        {selectedOfferId ? (
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <TimelineComposer onSubmit={handleComposer} />
            <TimelineThread events={events} />
          </div>
        ) : (
          <Card variant="glass" title={t('brokerfox.timeline.title')}>
            <p>{t('brokerfox.offers.noOfferSelected')}</p>
          </Card>
        )}

        <RiskAnalysisPanel
          analysis={analysis}
          onCopyMessage={() => setDraftMessage(t('brokerfox.ai.draftTemplate', { client: clientName }))}
          onCreateTask={async () => {
            if (!selectedTenderId) return
            await addTimelineEvent(ctx, {
              entityType: 'tender',
              entityId: selectedTenderId,
              type: 'statusUpdate',
              title: t('brokerfox.ai.taskCreatedTitle'),
              message: t('brokerfox.ai.taskCreatedMessage')
            })
          }}
          onMarkReviewed={async () => {
            if (!selectedTenderId) return
            await addTimelineEvent(ctx, {
              entityType: 'tender',
              entityId: selectedTenderId,
              type: 'statusUpdate',
              title: t('brokerfox.ai.reviewedTitle'),
              message: t('brokerfox.ai.reviewedMessage')
            })
          }}
        />

        {draftMessage ? (
          <Card variant="glass" title={t('brokerfox.ai.draftTitle')} subtitle={t('brokerfox.ai.draftSubtitle')}>
            <textarea value={draftMessage} onChange={(event) => setDraftMessage(event.target.value)} rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
            <label style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input type="checkbox" checked={draftApproved} onChange={(event) => setDraftApproved(event.target.checked)} />
              {t('brokerfox.ai.approvalLabel')}
            </label>
            <Button onClick={handleSendDraft} disabled={!draftApproved}>{t('brokerfox.ai.sendDraft')}</Button>
          </Card>
        ) : null}
      </BrokerfoxLayout>
    </section>
  )
}
