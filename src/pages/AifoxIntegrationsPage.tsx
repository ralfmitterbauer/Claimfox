import { useState } from 'react'
import Card from '@/components/ui/Card'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent } from '@/aifox/api/aifoxApi'

const integrations = [
  'Azure AI',
  'Salesforce Einstein',
  'Guidewire',
  'Palantir',
  'Munich Re aiSure™'
]

export default function AifoxIntegrationsPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})

  function localizeIntegrationName(name: string) {
    if (lang === 'de') {
      if (name === 'Azure AI') return 'Azure KI'
      if (name === 'Guidewire') return 'Guidewire'
      if (name === 'Salesforce Einstein') return 'Salesforce Einstein'
      if (name === 'Palantir') return 'Palantir'
      if (name === 'Munich Re aiSure™') return 'Munich Re aiSure™'
    }
    return name
  }

  async function toggle(name: string) {
    const next = { ...enabled, [name]: !enabled[name] }
    setEnabled(next)
    await addTimelineEvent(ctx, {
      entityType: 'system',
      entityId: name,
      type: 'system',
      title: lang === 'de' ? 'Integration umgeschaltet' : 'Integration toggled',
      message: lang === 'de'
        ? `${localizeIntegrationName(name)} ${next[name] ? 'aktiviert' : 'deaktiviert'}.`
        : `${name} ${next[name] ? 'enabled' : 'disabled'}.`,
      actor: ctx.userId
    })
  }

  return (
    <AifoxLayout title={t('aifox.integrations.title')} subtitle={t('aifox.integrations.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {integrations.map((name) => (
            <label key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem 1rem' }}>
              <span style={{ fontWeight: 600 }}>{localizeIntegrationName(name)}</span>
              <input type="checkbox" checked={Boolean(enabled[name])} onChange={() => toggle(name)} />
            </label>
          ))}
        </div>
      </Card>
    </AifoxLayout>
  )
}
