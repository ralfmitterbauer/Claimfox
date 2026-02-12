import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { linkMailToClaim, listClaims, listMailbox } from '@/claimsfox/api/claimsfoxApi'
import type { Claim, MailMessage } from '@/claimsfox/types'

export default function ClaimsfoxMailboxPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [mailbox, setMailbox] = useState<MailMessage[]>([])
  const [claims, setClaims] = useState<Claim[]>([])
  const [selected, setSelected] = useState<MailMessage | null>(null)
  const [linkId, setLinkId] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const [mailData, claimData] = await Promise.all([
        listMailbox(ctx),
        listClaims(ctx)
      ])
      if (!mounted) return
      setMailbox(mailData)
      setClaims(claimData)
      setSelected(mailData[0] ?? null)
      setLinkId(claimData[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  async function handleLink() {
    if (!selected || !linkId) return
    await linkMailToClaim(ctx, selected.id, linkId)
    const refreshed = await listMailbox(ctx)
    setMailbox(refreshed)
    const updated = refreshed.find((mail) => mail.id === selected.id) ?? null
    setSelected(updated)
  }

  return (
    <ClaimsfoxLayout title={t('claimsfox.mailbox.title')} subtitle={t('claimsfox.mailbox.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: '1.5rem' }}>
        <Card title={t('claimsfox.mailbox.inbox')}
          subtitle={t('claimsfox.mailbox.inboxSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {mailbox.map((mail) => (
              <button
                key={mail.id}
                type="button"
                onClick={() => setSelected(mail)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '0.75rem 1rem',
                  background: selected?.id === mail.id ? '#f8fafc' : '#fff',
                  color: '#0f172a',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 600 }}>{mail.subject}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{mail.from}</div>
              </button>
            ))}
          </div>
        </Card>
        <Card title={t('claimsfox.mailbox.detail')} subtitle={selected?.subject ?? t('claimsfox.mailbox.noSelection')}>
          {selected ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'grid', gap: '0.2rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('claimsfox.mailbox.from')}: {selected.from}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('claimsfox.mailbox.date')}: {new Date(selected.receivedAt).toLocaleString()}</div>
              </div>
              <div style={{ whiteSpace: 'pre-line', color: '#0f172a' }}>{selected.body}</div>
              <div>
                <strong>{t('claimsfox.mailbox.attachments')}:</strong> {selected.attachments.map((att) => att.name).join(', ')}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <select value={linkId} onChange={(event) => setLinkId(event.target.value)} style={{ padding: '0.5rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  {claims.map((claim) => (
                    <option key={claim.id} value={claim.id}>{claim.claimNumber}</option>
                  ))}
                </select>
                <Button size="sm" onClick={handleLink}>{t('claimsfox.mailbox.link')}</Button>
              </div>
            </div>
          ) : (
            <div style={{ color: '#64748b' }}>{t('claimsfox.mailbox.noSelection')}</div>
          )}
        </Card>
      </div>
    </ClaimsfoxLayout>
  )
}
