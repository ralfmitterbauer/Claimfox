import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import type { DocumentMeta, TimelineEventType } from '@/brokerfox/types'

export type ComposerPayload = {
  type: TimelineEventType
  message: string
  attachments: DocumentMeta[]
}

type TimelineComposerProps = {
  onSubmit: (payload: ComposerPayload) => void
}

export default function TimelineComposer({ onSubmit }: TimelineComposerProps) {
  const { t } = useI18n()
  const [type, setType] = useState<TimelineEventType>('externalMessage')
  const [message, setMessage] = useState('')
  const [attachments, setAttachments] = useState<DocumentMeta[]>([])

  function handleFiles(files: FileList | null) {
    if (!files) {
      return
    }
    const next = Array.from(files).map((file) => ({
      id: `file_${file.name}_${file.size}`,
      tenantId: 'local',
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'local'
    }))
    setAttachments((prev) => [...prev, ...next])
  }

  function handleSubmit() {
    if (!message.trim()) {
      return
    }
    onSubmit({ type, message, attachments })
    setMessage('')
    setAttachments([])
  }

  return (
    <Card variant="glass" title={t('brokerfox.timeline.composeTitle')} subtitle={t('brokerfox.timeline.composeSubtitle')}>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <select value={type} onChange={(event) => setType(event.target.value as TimelineEventType)} style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
          <option value="externalMessage">{t('brokerfox.timeline.externalMessage')}</option>
          <option value="internalNote">{t('brokerfox.timeline.internalNote')}</option>
          <option value="statusUpdate">{t('brokerfox.timeline.statusUpdate')}</option>
        </select>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t('brokerfox.timeline.messagePlaceholder')}
          rows={4}
          style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d6d9e0', resize: 'vertical' }}
        />
        <input type="file" multiple onChange={(event) => handleFiles(event.target.files)} />
        {attachments.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {attachments.map((file) => (
              <span key={file.id} style={{ fontSize: '0.8rem', color: '#475569', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 999 }}>
                {file.name}
              </span>
            ))}
          </div>
        ) : null}
        <Button size="sm" onClick={handleSubmit}>{t('brokerfox.actions.newMessage')}</Button>
      </div>
    </Card>
  )
}
