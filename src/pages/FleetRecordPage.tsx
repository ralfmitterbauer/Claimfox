import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import { fleetRecords } from '@/pages/FleetDashboardPage'

type FleetDetail = {
  id: string
  vehicleType: string
  vin: string
  utilization: string
  nextInspection: string
  driver: string
  riskSignal: string
  maintenance: { label: string; status: string }[]
  incidents: { label: string; status: string }[]
  contacts: { label: string; value: string }[]
}

const detailMap: Record<string, FleetDetail> = {
  'fl-1001': {
    id: 'fl-1001',
    vehicleType: 'Truck',
    vin: 'WDB 923 11 0A 445201',
    utilization: '84%',
    nextInspection: '2026-03-28',
    driver: 'Lars Meyer',
    riskSignal: 'Low',
    maintenance: [
      { label: 'Service interval', status: 'Scheduled' },
      { label: 'Brake check', status: 'Completed' },
      { label: 'Tire check', status: 'Completed' }
    ],
    incidents: [
      { label: 'Minor damage', status: 'Closed' }
    ],
    contacts: [
      { label: 'Fleet manager', value: 'fleet@atlas-logistics.eu' },
      { label: 'Operations', value: 'ops@atlas-logistics.eu' }
    ]
  }
}

function getDetail(recordId: string): FleetDetail {
  return detailMap[recordId] || {
    id: recordId,
    vehicleType: 'Truck',
    vin: 'VIN-UNKNOWN',
    utilization: '76%',
    nextInspection: '2026-04-10',
    driver: 'Assigned',
    riskSignal: 'Medium',
    maintenance: [
      { label: 'Service interval', status: 'Scheduled' },
      { label: 'Brake check', status: 'Pending' },
      { label: 'Tire check', status: 'Pending' }
    ],
    incidents: [
      { label: 'Incident review', status: 'Open' }
    ],
    contacts: [
      { label: 'Fleet manager', value: 'fleet@claimfox.app' },
      { label: 'Operations', value: 'ops@claimfox.app' }
    ]
  }
}

export default function FleetRecordPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const { recordId } = useParams<{ recordId: string }>()

  const record = fleetRecords.find((item) => item.id === recordId)
  if (!record) return <Navigate to="/fleet-dashboard" replace />

  const detail = getDetail(record.id)

  const GLASS_TEXT = '#0e0d1c'
  const GLASS_SUBTLE = '#64748b'

  const copy = lang === 'en'
    ? {
        title: 'Fleet record',
        subtitle: 'Operational view for fleet status and maintenance.',
        back: 'Back to dashboard',
        overviewTitle: 'Fleet overview',
        vehicleTitle: 'Vehicle details',
        maintenanceTitle: 'Maintenance',
        incidentsTitle: 'Incidents',
        contactsTitle: 'Contacts',
        overviewItems: [
          { label: 'Vehicle', value: record.vehicleId },
          { label: 'Region', value: record.region },
          { label: 'Status', value: record.status },
          { label: 'Next service', value: record.nextService },
          { label: 'Mileage', value: record.mileage },
          { label: 'Operator', value: record.operator }
        ],
        vehicleItems: [
          { label: 'Type', value: detail.vehicleType },
          { label: 'VIN', value: detail.vin },
          { label: 'Utilization', value: detail.utilization },
          { label: 'Next inspection', value: detail.nextInspection },
          { label: 'Driver', value: detail.driver },
          { label: 'Risk signal', value: detail.riskSignal }
        ]
      }
    : {
        title: 'Flotten-Record',
        subtitle: 'Operative Sicht fuer Flottenstatus und Wartung.',
        back: 'Zurueck zum Dashboard',
        overviewTitle: 'Flottenuebersicht',
        vehicleTitle: 'Fahrzeugdetails',
        maintenanceTitle: 'Wartung',
        incidentsTitle: 'Incidents',
        contactsTitle: 'Kontakte',
        overviewItems: [
          { label: 'Fahrzeug', value: record.vehicleId },
          { label: 'Region', value: record.region },
          { label: 'Status', value: record.status },
          { label: 'Naechster Service', value: record.nextService },
          { label: 'Kilometer', value: record.mileage },
          { label: 'Operator', value: record.operator }
        ],
        vehicleItems: [
          { label: 'Typ', value: detail.vehicleType },
          { label: 'VIN', value: detail.vin },
          { label: 'Auslastung', value: detail.utilization },
          { label: 'Naechste Inspektion', value: detail.nextInspection },
          { label: 'Fahrer', value: detail.driver },
          { label: 'Risiko-Signal', value: detail.riskSignal }
        ]
      }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <Header title={copy.title} subtitle={copy.subtitle} subtitleColor={GLASS_SUBTLE} titleColor="#D4380D" />

        <div>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/fleet-dashboard')}>
            {copy.back}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <Card title={copy.overviewTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {copy.overviewItems.map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 220px) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'center' }}>
                  <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                  <strong style={{ color: GLASS_TEXT }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.vehicleTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {copy.vehicleItems.map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 220px) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'center' }}>
                  <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                  <strong style={{ color: GLASS_TEXT }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <Card title={copy.maintenanceTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {detail.maintenance.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                  <strong style={{ color: GLASS_TEXT }}>{item.status}</strong>
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.incidentsTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {detail.incidents.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                  <strong style={{ color: GLASS_TEXT }}>{item.status}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title={copy.contactsTitle} variant="glass">
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {detail.contacts.map((item) => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 220px) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'center' }}>
                <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                <strong style={{ color: GLASS_TEXT }}>{item.value}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
