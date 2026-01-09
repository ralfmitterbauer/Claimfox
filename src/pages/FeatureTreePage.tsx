import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import InternAuthGate from '@/components/InternAuthGate'

type SectionKey =
  | 'intake'
  | 'partners'
  | 'media'
  | 'finance'
  | 'repair'
  | 'comms'
  | 'analytics'
  | 'compliance'

const FEATURE_ITEMS: Record<SectionKey, string[]> = {
  intake: ['claimIntake', 'coverageCheck', 'slaRules', 'taskRouting'],
  partners: ['partnerDirectory', 'onboarding', 'capacity', 'performance'],
  media: ['photoUpload', 'damageAi', 'documentHub', 'versioning'],
  finance: ['estimates', 'invoices', 'approvals', 'reserves'],
  repair: ['statusTracking', 'parts', 'milestones', 'handover'],
  comms: ['liveChat', 'questions', 'notifications', 'auditTrail'],
  analytics: ['kpis', 'trendReports', 'benchmarks', 'fraudSignals'],
  compliance: ['roles', 'gdpr', 'accessLogs', 'retention']
}

const SECTION_ORDER: SectionKey[] = [
  'intake',
  'partners',
  'media',
  'finance',
  'repair',
  'comms',
  'analytics',
  'compliance'
]

export default function FeatureTreePage() {
  const { t } = useI18n()

  return (
    <InternAuthGate>
      <section className="page" style={{ gap: '1.75rem' }}>
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <Header
            title={t('featureTree.title')}
            subtitle={t('featureTree.subtitle')}
            titleColor="#0e0d1c"
            subtitleColor="#65748b"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {SECTION_ORDER.map((section) => (
              <Card
                key={section}
                variant="glass"
                title={t(`featureTree.sections.${section}.title`)}
                subtitle={t(`featureTree.sections.${section}.subtitle`)}
              >
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {FEATURE_ITEMS[section].map((itemKey) => (
                  <div
                    key={itemKey}
                    style={{
                      borderRadius: '14px',
                      padding: '0.65rem 0.8rem',
                      border: '1px solid #e2e8f0',
                      background: '#f8fafc',
                      color: '#0e0d1c',
                      fontWeight: 600
                    }}
                  >
                    {t(`featureTree.sections.${section}.items.${itemKey}`)}
                  </div>
                ))}
              </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
