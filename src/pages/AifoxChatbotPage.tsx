import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listConversations } from '@/aifox/api/aifoxApi'
import type { AifoxConversation } from '@/aifox/types'

export default function AifoxChatbotPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [conversations, setConversations] = useState<AifoxConversation[]>([])
  const [selected, setSelected] = useState<AifoxConversation | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listConversations(ctx)
      if (!mounted) return
      setConversations(data)
      setSelected(data[0] ?? null)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  async function escalate() {
    if (!selected) return
    await addTimelineEvent(ctx, {
      entityType: 'chat',
      entityId: selected.id,
      type: 'statusUpdate',
      title: lang === 'de' ? 'An Mitarbeitende eskaliert' : 'Escalated to human',
      message: lang === 'de' ? `Konversation mit ${selected.customer} eskaliert.` : `Conversation with ${selected.customer} escalated.`,
      actor: ctx.userId
    })
  }

  return (
    <AifoxLayout title={t('aifox.chatbot.title')} subtitle={t('aifox.chatbot.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '1.5rem' }}>
        <Card title={t('aifox.chatbot.listTitle')} subtitle={t('aifox.chatbot.listSubtitle')}>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setSelected(conv)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '0.7rem 1rem',
                  textAlign: 'left',
                  background: selected?.id === conv.id ? '#f8fafc' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 600 }}>{conv.customer}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{conv.topic}</div>
              </button>
            ))}
          </div>
        </Card>
        <Card title={t('aifox.chatbot.chatTitle')} subtitle={t('aifox.chatbot.chatSubtitle')}>
          {selected ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ background: '#fff7ed', borderRadius: 10, padding: '0.6rem', fontSize: '0.85rem', color: '#b45309' }}>
                {t('aifox.chatbot.transparency')}
              </div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {selected.messages.map((msg, idx) => (
                  <div key={`${msg.role}-${idx}`} style={{ alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
                    <div style={{ background: msg.role === 'assistant' ? '#f1f5f9' : '#d4380d', color: msg.role === 'assistant' ? '#0f172a' : '#fff', padding: '0.6rem 0.8rem', borderRadius: 12 }}>
                      {msg.text}
                    </div>
                    {msg.confidence !== undefined ? (
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{t('aifox.chatbot.confidence')}: {(msg.confidence * 100).toFixed(0)}%</div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button size="sm" onClick={escalate}>{t('aifox.chatbot.escalate')}</Button>
              </div>
            </div>
          ) : (
            <div style={{ color: '#64748b' }}>{t('aifox.common.noSelection')}</div>
          )}
        </Card>
      </div>
    </AifoxLayout>
  )
}
