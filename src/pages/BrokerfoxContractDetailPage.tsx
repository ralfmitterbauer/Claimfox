import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import Button from '@/components/ui/Button'
import TimelineThread from '@/brokerfox/components/TimelineThread'
import TimelineComposer from '@/brokerfox/components/TimelineComposer'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  getContract,
  listClients,
  listCommissionsByContract,
  listDocuments,
  listTasks,
  listTimelineEvents,
  sendCommissionReminder
} from '@/brokerfox/api/brokerfoxApi'
import type { DocumentMeta, TaskItem } from '@/brokerfox/types'

export default function BrokerfoxContractDetailPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const { contractId } = useParams()
  const [contract, setContract] = useState<any>(null)
  const [client, setClient] = useState<any>(null)
  const [documents, setDocuments] = useState<DocumentMeta[]>([])
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [commissions, setCommissions] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!contractId) return
      const [contractData, clientsData, docs, timeline, taskData, commissionData] = await Promise.all([
        getContract(ctx, contractId),
        listClients(ctx),
        listDocuments(ctx),
        listTimelineEvents(ctx, 'contract', contractId),
        listTasks(ctx),
        listCommissionsByContract(ctx, contractId)
      ])
      if (!mounted) return
      setContract(contractData)
      setClient(clientsData.find((entry: any) => entry.id === contractData?.clientId) ?? null)
      setDocuments(docs.filter((doc) => doc.entityType === 'contract' && doc.entityId === contractId))
      setTasks(taskData.filter((task) => task.linkedEntityType === 'contract' && task.linkedEntityId === contractId))
      setCommissions(commissionData)
      setEvents(timeline)
    }
    load()
    return () => { mounted = false }
  }, [ctx, contractId])

  const outstanding = useMemo(() => commissions.filter((item) => item.outstandingEUR > 0), [commissions])

  async function handleComposer(payload: { type: any; message: string; attachments: DocumentMeta[] }) {
    if (!contractId) return
    await addTimelineEvent(ctx, {
      entityType: 'contract',
      entityId: contractId,
      type: payload.type,
      title: payload.type === 'externalMessage' ? t('brokerfox.timeline.externalMessage') : payload.type === 'internalNote' ? t('brokerfox.timeline.internalNote') : t('brokerfox.timeline.statusUpdate'),
      message: payload.message
    })
    const nextEvents = await listTimelineEvents(ctx, 'contract', contractId)
    setEvents(nextEvents)
  }

  async function handleCommissionReminder(commissionId: string) {
    if (!contractId) return
    await sendCommissionReminder(ctx, contractId, commissionId)
    const nextEvents = await listTimelineEvents(ctx, 'contract', contractId)
    setEvents(nextEvents)
  }

  if (!contract) {
    return (
      <section className="page">
        <p>{t('brokerfox.state.loading')}</p>
      </section>
    )
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.contracts.detailTitle')}
        subtitle={contract.policyNumber}
        topRight={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        <Button onClick={() => navigate('/brokerfox/contracts')}>{t('brokerfox.contracts.back')}</Button>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <Card variant="glass" title={t('brokerfox.contracts.summaryTitle')}>
            <p style={{ margin: 0 }}>{t('brokerfox.contracts.clientLabel')}: {client?.name ?? '-'}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.contracts.lobLabel')}: {contract.lob}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.contracts.carrierLabel')}: {contract.carrierName}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.contracts.premiumLabel')}: € {contract.premiumEUR.toLocaleString()}</p>
            <p style={{ margin: 0 }}>{t('brokerfox.contracts.statusLabel')}: {t(`brokerfox.contracts.status.${contract.status}`)}</p>
          </Card>
          <Card variant="glass" title={t('brokerfox.commissions.title')}>
            {commissions.slice(0, 6).map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0' }}>
                <span>{item.period}</span>
                <span>€ {item.outstandingEUR.toLocaleString()}</span>
              </div>
            ))}
            {outstanding.length === 0 ? <p style={{ color: '#94a3b8' }}>{t('brokerfox.commissions.noneOutstanding')}</p> : null}
          </Card>
          <Card variant="glass" title={t('brokerfox.contracts.tasksTitle')}>
            {tasks.length === 0 ? <p>{t('brokerfox.empty.noTasks')}</p> : null}
            {tasks.map((task) => (
              <div key={task.id} style={{ padding: '0.3rem 0' }}>
                <strong>{task.title}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{task.ownerName ?? t('brokerfox.tasks.ownerMissing')}</div>
              </div>
            ))}
          </Card>
        </div>

        <Card variant="glass" title={t('brokerfox.contracts.documentsTitle')}>
          {documents.length === 0 ? <p>{t('brokerfox.empty.noDocuments')}</p> : null}
          {documents.map((doc) => (
            <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0' }}>
              <span>{doc.name}</span>
              <span style={{ color: '#94a3b8' }}>{Math.round(doc.size / 1000)} KB</span>
            </div>
          ))}
        </Card>

        <Card variant="glass" title={t('brokerfox.commissions.outstandingTitle')}>
          {outstanding.length === 0 ? <p>{t('brokerfox.commissions.noneOutstanding')}</p> : null}
          {outstanding.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{item.period}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.commissions.outstanding')}: € {item.outstandingEUR.toLocaleString()}</div>
              </div>
              <Button onClick={() => handleCommissionReminder(item.id)}>{t('brokerfox.commissions.sendReminder')}</Button>
            </div>
          ))}
        </Card>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <TimelineComposer onSubmit={handleComposer} />
          <TimelineThread events={events} />
        </div>
      </BrokerfoxLayout>
    </section>
  )
}
