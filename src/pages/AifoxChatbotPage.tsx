import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [chatMessages, setChatMessages] = useState<AifoxConversation['messages']>([])
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    setChatMessages(selected?.messages ?? [])
    setDraft('')
    setIsTyping(false)
  }, [selected])

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [chatMessages, isTyping])

  const quickPrompts = useMemo(
    () => (
      lang === 'de'
        ? [
            'Wie ist mein Schadenstatus?',
            'Ist dieser Schaden gedeckt?',
            'Ich möchte meine Police ändern.'
          ]
        : [
            'What is my claim status?',
            'Is this claim covered?',
            'I want to change my policy.'
          ]
    ),
    [lang]
  )

  function buildAssistantReply(userText: string): { text: string; confidence: number } {
    const normalized = userText.toLowerCase()
    if (normalized.includes('status') || normalized.includes('stand')) {
      return {
        text:
          lang === 'de'
            ? 'Ihr Fall wurde aktualisiert und ist aktuell in der Prüfung. Nächster Meilenstein: Rückmeldung innerhalb von 24 Stunden.'
            : 'Your case has been updated and is currently in review. Next milestone: feedback within 24 hours.',
        confidence: 0.9
      }
    }
    if (
      normalized.includes('gedeckt') ||
      normalized.includes('deckung') ||
      normalized.includes('covered') ||
      normalized.includes('coverage')
    ) {
      return {
        text:
          lang === 'de'
            ? 'Basierend auf der vorliegenden Police ist der Schaden voraussichtlich gedeckt. Die finale Freigabe erfolgt nach Dokumentenprüfung.'
            : 'Based on the current policy, this loss is likely covered. Final confirmation is issued after document review.',
        confidence: 0.84
      }
    }
    if (
      normalized.includes('ändern') ||
      normalized.includes('change') ||
      normalized.includes('update') ||
      normalized.includes('police')
    ) {
      return {
        text:
          lang === 'de'
            ? 'Gerne. Ich habe eine Änderungsanfrage vorbereitet und an das Service-Team übergeben.'
            : 'Sure. I prepared a policy change request and handed it over to the service team.',
        confidence: 0.81
      }
    }
    return {
      text:
        lang === 'de'
          ? 'Ich habe Ihre Anfrage erfasst und leite die relevanten Informationen in den Prüfprozess weiter.'
          : 'I captured your request and will route the relevant details into the review process.',
      confidence: 0.76
    }
  }

  function sendMessage(text: string) {
    if (!selected) return
    const clean = text.trim()
    if (!clean || isTyping) return
    setDraft('')
    setChatMessages((prev) => [...prev, { role: 'user', text: clean }])
    setIsTyping(true)
    const reply = buildAssistantReply(clean)
    window.setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: 'assistant', text: reply.text, confidence: reply.confidence }])
      setIsTyping(false)
    }, 680)
  }

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
    const note = lang === 'de' ? 'Die Konversation wurde an einen Mitarbeitenden übergeben.' : 'The conversation has been handed over to a human agent.'
    setChatMessages((prev) => [...prev, { role: 'assistant', text: note, confidence: 0.95 }])
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
              <div
                ref={scrollRef}
                style={{
                  display: 'grid',
                  gap: '0.5rem',
                  maxHeight: 350,
                  overflowY: 'auto',
                  padding: '0.25rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  background: '#f8fafc'
                }}
              >
                {chatMessages.map((msg, idx) => (
                  <div key={`${msg.role}-${idx}`} style={{ alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
                    <div style={{ background: msg.role === 'assistant' ? '#f1f5f9' : '#d4380d', color: msg.role === 'assistant' ? '#0f172a' : '#fff', padding: '0.6rem 0.8rem', borderRadius: 12 }}>
                      {msg.text}
                    </div>
                    {msg.confidence !== undefined ? (
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{t('aifox.chatbot.confidence')}: {(msg.confidence * 100).toFixed(0)}%</div>
                    ) : null}
                  </div>
                ))}
                {isTyping ? (
                  <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                    <div style={{ background: '#f1f5f9', color: '#0f172a', padding: '0.6rem 0.8rem', borderRadius: 12, fontSize: '0.9rem' }}>
                      {lang === 'de' ? 'AI schreibt ...' : 'AI is typing ...'}
                    </div>
                  </div>
                ) : null}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {quickPrompts.map((prompt) => (
                  <Button key={prompt} size="sm" variant="secondary" onClick={() => sendMessage(prompt)} disabled={isTyping}>
                    {prompt}
                  </Button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto auto', gap: '0.5rem' }}>
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      sendMessage(draft)
                    }
                  }}
                  placeholder={lang === 'de' ? 'Nachricht eingeben ...' : 'Type a message ...'}
                  style={{ border: '1px solid #d6d9e0', borderRadius: 10, padding: '0.5rem 0.75rem', minWidth: 0 }}
                />
                <Button size="sm" onClick={() => sendMessage(draft)} disabled={!draft.trim() || isTyping}>
                  {lang === 'de' ? 'Senden' : 'Send'}
                </Button>
                <Button size="sm" variant="secondary" onClick={escalate}>
                  {t('aifox.chatbot.escalate')}
                </Button>
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
