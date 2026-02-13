import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  applyExtraction,
  createTask,
  listClients,
  listContracts,
  listExtractions,
  listMailboxItems,
  listOffers,
  listRenewals,
  listTenders,
  updateMailboxItem,
  uploadDocument
} from '@/brokerfox/api/brokerfoxApi'
import { generateDocumentText } from '@/brokerfox/utils/documentGenerator'
import { localizeLob, localizePolicyName, localizeTenderTitle } from '@/brokerfox/utils/localizeDemoValues'
import type { Client, Contract, Extraction, MailboxItem, Offer, RenewalItem, Tender } from '@/brokerfox/types'

export default function BrokerfoxMailboxPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [items, setItems] = useState<MailboxItem[]>([])
  const [selected, setSelected] = useState<MailboxItem | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [tenders, setTenders] = useState<Tender[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [renewals, setRenewals] = useState<RenewalItem[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [extractions, setExtractions] = useState<Extraction[]>([])
  const [entityType, setEntityType] = useState<'client' | 'tender' | 'offer' | 'renewal' | 'contract'>('client')
  const [entityId, setEntityId] = useState('')
  const [approvedExtraction, setApprovedExtraction] = useState<Record<string, boolean>>({})
  const dateLocale = lang === 'de' ? 'de-DE' : 'en-US'

  const subjectMap: Record<string, { de: string; en: string }> = {
    'Offer update for SME Package Renewal 2026': {
      de: 'Angebotsupdate für SME Package Renewal 2026',
      en: 'Offer update for SME Package Renewal 2026'
    },
    'Updated risk information': {
      de: 'Aktualisierte Risiko-Informationen',
      en: 'Updated risk information'
    },
    'Renewal reminder for Atlas Holding': {
      de: 'Verlängerungserinnerung für Atlas Holding',
      en: 'Renewal reminder for Atlas Holding'
    },
    'Updated loss run attachment': {
      de: 'Aktualisierter Schadenverlauf im Anhang',
      en: 'Updated loss run attachment'
    },
    'Carrier offer update — revised premium': {
      de: 'Carrier-Angebotsupdate — angepasste Prämie',
      en: 'Carrier offer update — revised premium'
    },
    'Renewal reminder and documentation request': {
      de: 'Verlängerungserinnerung und Dokumentenanfrage',
      en: 'Renewal reminder and documentation request'
    },
    'Client update — new location added': {
      de: 'Kundenupdate — neuer Standort hinzugefügt',
      en: 'Client update — new location added'
    },
    'Loss history clarification needed': {
      de: 'Klärung zur Schadenhistorie erforderlich',
      en: 'Loss history clarification needed'
    },
    'Carrier portal update: new offer': {
      de: 'Carrier-Portal-Update: neues Angebot',
      en: 'Carrier portal update: new offer'
    }
  }

  const bodyMap: Record<string, { de: string; en: string }> = {
    'Please find the updated risk assessment and facility overview.': {
      de: 'Bitte finden Sie die aktualisierte Risikobewertung und Standortübersicht.',
      en: 'Please find the updated risk assessment and facility overview.'
    },
    'Please provide updated loss history and renewal preferences.': {
      de: 'Bitte senden Sie die aktualisierte Schadenhistorie und Verlängerungspräferenzen.',
      en: 'Please provide updated loss history and renewal preferences.'
    },
    'Hello team,\n\nPlease find attached the updated loss run for the last 24 months. We have highlighted two larger events for your review.\n\nLet us know if you need anything else.\n\nRegards,\nLaura Stein': {
      de: 'Hallo Team,\n\nim Anhang finden Sie den aktualisierten Schadenverlauf der letzten 24 Monate. Zwei größere Ereignisse haben wir zur Prüfung markiert.\n\nGeben Sie gerne Bescheid, falls weitere Informationen benötigt werden.\n\nViele Grüße,\nLaura Stein',
      en: 'Hello team,\n\nPlease find attached the updated loss run for the last 24 months. We have highlighted two larger events for your review.\n\nLet us know if you need anything else.\n\nRegards,\nLaura Stein'
    },
    'Hi Brokerfox team,\n\nWe reviewed the submitted exposure updates and can provide revised terms. Please see the attached offer and summary in the email below.\n\nBest,\nM. Keller': {
      de: 'Hallo Brokerfox-Team,\n\nwir haben die eingereichten Exposure-Updates geprüft und können angepasste Konditionen anbieten. Bitte beachten Sie das angehängte Angebot und die Zusammenfassung unten.\n\nBeste Grüße,\nM. Keller',
      en: 'Hi Brokerfox team,\n\nWe reviewed the submitted exposure updates and can provide revised terms. Please see the attached offer and summary in the email below.\n\nBest,\nM. Keller'
    },
    'Dear all,\n\nYour renewal is approaching in the next 60 days. Please provide updated fleet lists and recent claims summaries to proceed.\n\nThanks,\nCarrier Renewals Desk': {
      de: 'Hallo zusammen,\n\ndie Verlängerung steht in den nächsten 60 Tagen an. Bitte senden Sie aktualisierte Flottenlisten und aktuelle Schadenzusammenfassungen.\n\nDanke,\nCarrier Renewals Desk',
      en: 'Dear all,\n\nYour renewal is approaching in the next 60 days. Please provide updated fleet lists and recent claims summaries to proceed.\n\nThanks,\nCarrier Renewals Desk'
    },
    'Hello,\n\nWe have opened a new warehouse location in Bremen. Please advise if additional coverage documentation is required.\n\nRegards,\nJonas': {
      de: 'Hallo,\n\nwir haben einen neuen Lagerstandort in Bremen eröffnet. Bitte teilen Sie uns mit, ob zusätzliche Deckungsdokumente erforderlich sind.\n\nViele Grüße,\nJonas',
      en: 'Hello,\n\nWe have opened a new warehouse location in Bremen. Please advise if additional coverage documentation is required.\n\nRegards,\nJonas'
    },
    'Hi,\n\nWe noticed a discrepancy in the reported losses for Q4. Can you confirm whether the reserve has been released?\n\nBest,\nRisk Team': {
      de: 'Hallo,\n\nuns ist eine Abweichung in den gemeldeten Schäden für Q4 aufgefallen. Können Sie bestätigen, ob die Reserve bereits aufgelöst wurde?\n\nBeste Grüße,\nRisk Team',
      en: 'Hi,\n\nWe noticed a discrepancy in the reported losses for Q4. Can you confirm whether the reserve has been released?\n\nBest,\nRisk Team'
    },
    'New offer uploaded via carrier portal.': {
      de: 'Neues Angebot wurde über das Carrier-Portal hochgeladen.',
      en: 'New offer uploaded via carrier portal.'
    }
  }

  function localizeSubject(subject: string) {
    if (subjectMap[subject]) return subjectMap[subject][lang]
    const split = subject.split(' — ')
    if (split.length === 2 && subjectMap[split[0]]) {
      return `${subjectMap[split[0]][lang]} — ${split[1]}`
    }
    return subject
  }

  function localizeBody(body?: string) {
    if (!body) return body
    return bodyMap[body]?.[lang] ?? body
  }

  function localizeExtractionFieldLabel(key: string) {
    if (lang === 'de') {
      if (key === 'policyNumber') return 'Policennummer'
      if (key === 'expiry') return 'Ablaufdatum'
      if (key === 'lossRatio') return 'Schadenquote'
      if (key === 'brokerComment') return 'Broker-Kommentar'
      if (key === 'lineOfBusiness') return 'Sparte'
      if (key === 'attachmentType') return 'Anhangstyp'
      if (key === 'sender') return 'Absender'
    }
    if (key === 'policyNumber') return 'Policy number'
    if (key === 'expiry') return 'Expiry date'
    if (key === 'lossRatio') return 'Loss ratio'
    if (key === 'brokerComment') return 'Broker comment'
    if (key === 'lineOfBusiness') return 'Line of business'
    if (key === 'attachmentType') return 'Attachment type'
    if (key === 'sender') return 'Sender'
    return key
  }

  function localizeExtractionFieldValue(key: string, value: string) {
    if (key === 'lineOfBusiness') return localizeLob(value, lang) ?? value
    if (key === 'policyNumber') return localizePolicyName(value, lang) ?? value
    return value
  }

  function getEntityLabel(item: Client | Tender | Offer | RenewalItem | Contract) {
    if (item.name) return item.name
    if (item.title) return localizeTenderTitle(item.title, lang) ?? item.title
    if (item.policyName) return localizePolicyName(item.policyName, lang) ?? item.policyName
    if (item.policyNumber) return localizePolicyName(item.policyNumber, lang) ?? item.policyNumber
    return item.carrier?.name ?? item.id
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      const [mail, clientData, tenderData, offerData, renewalData, contractData, extractionData] = await Promise.all([
        listMailboxItems(ctx),
        listClients(ctx),
        listTenders(ctx),
        listOffers(ctx),
        listRenewals(ctx),
        listContracts(ctx),
        listExtractions(ctx)
      ])
      if (!mounted) return
      setItems(mail)
      setSelected(mail[0] ?? null)
      setClients(clientData)
      setTenders(tenderData)
      setOffers(offerData)
      setRenewals(renewalData)
      setContracts(contractData)
      setExtractions(extractionData)
      setEntityId(clientData[0]?.id ?? tenderData[0]?.id ?? offerData[0]?.id ?? renewalData[0]?.id ?? contractData[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const entityOptions = useMemo<Array<Client | Tender | Offer | RenewalItem | Contract>>(() => {
    return entityType === 'client'
      ? clients
      : entityType === 'tender'
        ? tenders
        : entityType === 'offer'
          ? offers
          : entityType === 'contract'
            ? contracts
            : renewals
  }, [clients, tenders, offers, renewals, contracts, entityType])

  async function handleAssign() {
    if (!selected || !entityId) return
    const updated = await updateMailboxItem(ctx, selected.id, { status: 'assigned', entityType, entityId })
    if (!updated) return
    setItems((prev) => prev.map((item) => (item.id === selected.id ? updated : item)))
    setSelected(updated)
    for (const attachment of selected.attachments) {
      await uploadDocument(ctx, {
        name: attachment.name,
        type: attachment.type,
        size: attachment.size,
        entityType,
        entityId,
        url: attachment.url,
        source: attachment.source ?? 'demo'
      })
    }
    const extractionData = await listExtractions(ctx)
    setExtractions(extractionData)
    await addTimelineEvent(ctx, {
      entityType,
      entityId,
      type: 'documentAssigned',
      title: t('brokerfox.mailbox.assignedTitle'),
      message: `${localizeSubject(selected.subject)} ${t('brokerfox.mailbox.assignedMessage')}`
    })
  }

  async function handleMarkDone() {
    if (!selected) return
    const updated = await updateMailboxItem(ctx, selected.id, { status: 'done' })
    if (!updated) return
    setItems((prev) => prev.map((item) => (item.id === selected.id ? updated : item)))
    setSelected(updated)
    await addTimelineEvent(ctx, {
      entityType: selected.entityType ?? 'document',
      entityId: selected.entityId ?? selected.id,
      type: 'statusUpdate',
      title: t('brokerfox.mailbox.doneTitle'),
      message: t('brokerfox.mailbox.doneMessage')
    })
  }

  async function handleCreateTask() {
    if (!selected) return
    const task = await createTask(ctx, {
      title: `${t('brokerfox.mailbox.taskPrefix')}: ${localizeSubject(selected.subject)}`,
      description: localizeBody(selected.body),
      status: 'todo',
      linkedEntityType: selected.entityType ?? entityType,
      linkedEntityId: selected.entityId ?? entityId
    })
    await addTimelineEvent(ctx, {
      entityType: task.linkedEntityType ?? 'task',
      entityId: task.linkedEntityId ?? task.id,
      type: 'statusUpdate',
      title: t('brokerfox.mailbox.taskCreatedTitle'),
      message: t('brokerfox.mailbox.taskCreatedMessage')
    })
  }

  async function handleDownloadAttachment(name: string) {
    if (!selected) return
    const attachment = selected.attachments.find((doc) => doc.name === name)
    if (!attachment) return
    if (attachment.url) {
      window.open(attachment.url, '_blank')
    } else {
      const client = clients.find((item) => item.id === selected.entityId) ?? null
      const tender = tenders.find((item) => item.id === selected.entityId) ?? null
      const offer = offers.find((item) => item.id === selected.entityId) ?? null
      const text = generateDocumentText({ doc: attachment, client, tender, offer })
      const blob = new Blob([text], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = attachment.name.replace(/\.[^.]+$/, '') + '_generated.txt'
      anchor.click()
      window.URL.revokeObjectURL(url)
    }
    await addTimelineEvent(ctx, {
      entityType: selected.entityType ?? 'document',
      entityId: selected.entityId ?? selected.id,
      type: 'statusUpdate',
      title: t('brokerfox.mailbox.downloadedTitle'),
      message: t('brokerfox.mailbox.downloadedMessage')
    })
  }

  async function handleApplyExtraction(docId: string) {
    if (!approvedExtraction[docId]) return
    await applyExtraction(ctx, docId)
    const extractionData = await listExtractions(ctx)
    setExtractions(extractionData)
    setApprovedExtraction((prev) => ({ ...prev, [docId]: false }))
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.mailbox.title')}
        subtitle={t('brokerfox.mailbox.subtitle')}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'minmax(260px, 1fr) minmax(320px, 1fr)' }}>
          <Card variant="glass" title={<span style={{ color: '#0f172a' }}>{t('brokerfox.mailbox.inboxTitle')}</span>}>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) auto',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.6rem 0',
                  border: 'none',
                  background: 'transparent',
                  color: '#0f172a'
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{item.sender}</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{item.attachments.length} {t('brokerfox.mailbox.attachments')}</span>
                  </div>
                  <div style={{ color: '#0f172a', fontWeight: 600 }}>{localizeSubject(item.subject)}</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {(localizeBody(item.body) ?? '').replace(/\s+/g, ' ').slice(0, 120)}
                  </div>
                </div>
                <div style={{ textAlign: 'right', display: 'grid', gap: '0.25rem', alignContent: 'start' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{new Date(item.receivedAt).toLocaleString(dateLocale)}</span>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem', borderRadius: 999, background: '#eef2f7', color: '#0f172a', border: '1px solid #d6d9e0' }}>
                    {t(`brokerfox.mailbox.status.${item.status}`)}
                  </span>
                </div>
              </button>
            ))}
          </Card>

          <Card variant="glass" title={<span style={{ color: '#0f172a' }}>{t('brokerfox.mailbox.detailTitle')}</span>}>
            {selected ? (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gap: '0.25rem' }}>
                  <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{localizeSubject(selected.subject)}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.mailbox.from')}: {selected.sender}</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.mailbox.to')}: {t('brokerfox.mailbox.toValue')}</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.mailbox.date')}: {new Date(selected.receivedAt).toLocaleString(dateLocale)}</div>
                </div>
                <div style={{ whiteSpace: 'pre-line', color: '#0f172a' }}>{localizeBody(selected.body) ?? t('brokerfox.mailbox.previewPlaceholder')}</div>
                <div>
                  <strong>{t('brokerfox.mailbox.attachments')}</strong>
                  {selected.attachments.map((doc) => (
                    <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0' }}>
                      <span>{doc.name}</span>
                      <Button size="sm" onClick={() => handleDownloadAttachment(doc.name)}>{t('brokerfox.documents.download')}</Button>
                    </div>
                  ))}
                </div>
                {selected.attachments.map((doc) => {
                  const extraction = extractions.find((entry) => entry.documentId === doc.id)
                  if (!extraction) return null
                  return (
                    <div key={`${doc.id}-extraction`} style={{ padding: '0.6rem', borderRadius: 12, background: '#f8fafc' }}>
                      <strong>{t('brokerfox.extraction.title')}</strong>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('brokerfox.extraction.suggestionNotice')}</div>
                      <div style={{ marginTop: '0.4rem', display: 'grid', gap: '0.25rem' }}>
                        <div>{t('brokerfox.extraction.suggestedClient')}: {clients.find((client) => client.id === extraction.suggestedClientId)?.name ?? '-'}</div>
                        <div>{t('brokerfox.extraction.suggestedContract')}: {localizePolicyName(contracts.find((contract) => contract.id === extraction.suggestedContractId)?.policyNumber, lang) ?? '-'}</div>
                        <div>{t('brokerfox.extraction.confidence')}: {Math.round(extraction.confidence * 100)}%</div>
                        {Object.entries(extraction.extractedFields).map(([key, value]) => (
                          <div key={key} style={{ fontSize: '0.85rem' }}>
                            {localizeExtractionFieldLabel(key)}: {localizeExtractionFieldValue(key, String(value))}
                          </div>
                        ))}
                      </div>
                      <label style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={Boolean(approvedExtraction[doc.id])}
                          onChange={(event) => setApprovedExtraction((prev) => ({ ...prev, [doc.id]: event.target.checked }))}
                        />
                        {t('brokerfox.extraction.approval')}
                      </label>
                      <Button size="sm" onClick={() => handleApplyExtraction(doc.id)} disabled={!approvedExtraction[doc.id]}>
                        {t('brokerfox.extraction.apply')}
                      </Button>
                    </div>
                  )
                })}
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('brokerfox.mailbox.assignTo')}</label>
                  <select value={entityType} onChange={(event) => setEntityType(event.target.value as typeof entityType)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
                    <option value="client">{t('brokerfox.documents.entityClient')}</option>
                    <option value="tender">{t('brokerfox.documents.entityTender')}</option>
                    <option value="offer">{t('brokerfox.documents.entityOffer')}</option>
                    <option value="renewal">{t('brokerfox.documents.entityRenewal')}</option>
                    <option value="contract">{t('brokerfox.documents.entityContract')}</option>
                  </select>
                  <select value={entityId} onChange={(event) => setEntityId(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
                    {entityOptions.map((item) => (
                      <option key={item.id} value={item.id}>{getEntityLabel(item)}</option>
                    ))}
                  </select>
                  <Button size="sm" onClick={handleAssign}>{t('brokerfox.mailbox.assignAction')}</Button>
                  <Button size="sm" onClick={handleCreateTask}>{t('brokerfox.mailbox.convertTask')}</Button>
                  <Button size="sm" onClick={handleMarkDone}>{t('brokerfox.mailbox.markDone')}</Button>
                </div>
              </div>
            ) : (
              <p>{t('brokerfox.mailbox.noSelection')}</p>
            )}
          </Card>
        </div>
      </BrokerfoxLayout>
    </section>
  )
}
