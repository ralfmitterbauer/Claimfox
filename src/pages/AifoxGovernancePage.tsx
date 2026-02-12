import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'

export default function AifoxGovernancePage() {
  const { t, lang } = useI18n()
  const checklist = lang === 'de'
    ? [
        'Transparenzhinweis eingeblendet',
        'Menschliche Übersteuerung verfügbar',
        'Modelldokumentation aktuell',
        'Logging aktiviert'
      ]
    : [
        'Transparency notice shown',
        'Human override available',
        'Model documentation up to date',
        'Logging enabled'
      ]

  return (
    <AifoxLayout title={t('aifox.governance.title')} subtitle={t('aifox.governance.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Card title={t('aifox.governance.classificationTitle')} subtitle={t('aifox.governance.classificationSubtitle')}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ fontWeight: 600 }}>{t('aifox.governance.systemType')}: {t('aifox.governance.systemValue')}</div>
            <div style={{ color: '#64748b' }}>{t('aifox.governance.logging')}</div>
          </div>
        </Card>
        <Card title={t('aifox.governance.checklistTitle')} subtitle={t('aifox.governance.checklistSubtitle')}>
          <div style={{ display: 'grid', gap: '0.4rem' }}>
            {checklist.map((item) => (
              <label key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input type="checkbox" defaultChecked />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </Card>
        <Card title={t('aifox.governance.actionsTitle')} subtitle={t('aifox.governance.actionsSubtitle')}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button size="sm">{t('aifox.governance.generateReport')}</Button>
            <Button size="sm" variant="secondary">{t('aifox.governance.runCheck')}</Button>
          </div>
        </Card>
      </div>
    </AifoxLayout>
  )
}
