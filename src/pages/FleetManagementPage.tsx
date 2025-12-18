import React, { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import BackgroundLogin from '@/assets/images/background_login.png'

const GLASS_TEXT = 'rgba(255,255,255,0.85)'
const GLASS_SUBTLE = 'rgba(255,255,255,0.65)'

const TRAFFIC_COLORS = {
  green: '#16A34A',
  orange: '#F97316',
  red: '#DC2626',
  blue: '#2563EB'
} as const

const BADGE_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '100px',
  height: '34px',
  borderRadius: '999px',
  fontSize: '0.85rem',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  color: '#ffffff',
  border: '1px solid transparent',
  transition: 'transform 0.15s ease, filter 0.15s ease'
}

type VehicleType = 'car' | 'truck' | 'trailer' | 'delivery'
type VehicleStatus = 'active' | 'maintenance' | 'down'
type InspectionStatus = 'ok' | 'dueSoon' | 'overdue'

type VehicleRecord = {
  id: string
  plate: string
  type: VehicleType
  status: VehicleStatus
  vin: string
  location: string
  firstRegistration: string
  weight: string
  usage: 'longhaul' | 'regional' | 'city' | 'cargo'
  inspectionDate: string
  inspectionStatus: InspectionStatus
  maintenanceDate: string
  downtimeDays: number
  documents: Array<'registration' | 'leasing' | 'maintenance'>
  policies: Array<{
    number: string
    line: 'liability' | 'casco' | 'cargo'
    sum: string
    deductible: string
    term: string
    status: 'active' | 'pending'
  }>
  driverIds: string[]
  repairAppointments: Array<{ date: string; note: string }>
}

type DriverRecord = {
  id: string
  name: string
  birthDate: string
  employeeId: string
  licenseClasses: string[]
  licenseValidUntil: string
  licenseStatus: 'valid' | 'expiring' | 'expired'
}

const KPI_DATA = [
  { key: 'active', value: '156' },
  { key: 'workshop', value: '12' },
  { key: 'inspectionDue', value: '8' },
  { key: 'openTasks', value: '27' }
] as const

const INITIAL_VEHICLES: VehicleRecord[] = [
  {
    id: 'veh1',
    plate: 'DE-789-XY',
    type: 'truck',
    status: 'active',
    vin: 'WVWZZZ1KZ5W113456',
    location: 'Berlin Depot',
    firstRegistration: '2019-04-12',
    weight: '18 t',
    usage: 'longhaul',
    inspectionDate: '2025-05-20',
    inspectionStatus: 'ok',
    maintenanceDate: '2025-04-15',
    downtimeDays: 6,
    documents: ['registration', 'leasing', 'maintenance'],
    policies: [
      { number: 'POL-DE-001', line: 'liability', sum: '5 Mio €', deductible: '€500', term: '2024-01-01 – 2025-12-31', status: 'active' },
      { number: 'POL-DE-017', line: 'cargo', sum: '2 Mio €', deductible: '€750', term: '2024-04-01 – 2025-03-31', status: 'pending' }
    ],
    driverIds: ['drv1', 'drv3'],
    repairAppointments: [
      { date: '2025-02-14', note: 'Bremsen-Check' },
      { date: '2025-07-02', note: 'Reifenwechsel' }
    ]
  },
  {
    id: 'veh2',
    plate: 'HH-CARGO-12',
    type: 'trailer',
    status: 'maintenance',
    vin: 'WDB9510231K556789',
    location: 'Hamburg Hafen',
    firstRegistration: '2018-08-20',
    weight: '12 t',
    usage: 'cargo',
    inspectionDate: '2025-06-11',
    inspectionStatus: 'dueSoon',
    maintenanceDate: '2025-03-10',
    downtimeDays: 14,
    documents: ['registration', 'maintenance'],
    policies: [
      { number: 'POL-HH-110', line: 'cargo', sum: '1 Mio €', deductible: '€600', term: '2024-03-01 – 2025-02-28', status: 'active' }
    ],
    driverIds: ['drv2'],
    repairAppointments: [{ date: '2025-03-12', note: 'Auflieger-Kupplung' }]
  },
  {
    id: 'veh3',
    plate: 'M-FL-2045',
    type: 'car',
    status: 'active',
    vin: 'WMWZZZ3CZ4P112233',
    location: 'München City',
    firstRegistration: '2021-02-02',
    weight: '2 t',
    usage: 'city',
    inspectionDate: '2025-01-09',
    inspectionStatus: 'overdue',
    maintenanceDate: '2025-03-01',
    downtimeDays: 2,
    documents: ['registration', 'maintenance'],
    policies: [
      { number: 'POL-MUC-002', line: 'casco', sum: '€80.000', deductible: '€350', term: '2024-05-01 – 2025-04-30', status: 'active' }
    ],
    driverIds: ['drv4'],
    repairAppointments: [{ date: '2025-02-20', note: 'Sensorprüfung' }]
  },
  {
    id: 'veh4',
    plate: 'K-TR-330',
    type: 'truck',
    status: 'down',
    vin: 'YS2P4X20002156789',
    location: 'Köln Werkstatt',
    firstRegistration: '2016-11-14',
    weight: '26 t',
    usage: 'regional',
    inspectionDate: '2024-12-05',
    inspectionStatus: 'overdue',
    maintenanceDate: '2025-02-22',
    downtimeDays: 26,
    documents: ['registration', 'leasing', 'maintenance'],
    policies: [
      { number: 'POL-K-450', line: 'liability', sum: '7 Mio €', deductible: '€650', term: '2023-10-01 – 2025-09-30', status: 'active' }
    ],
    driverIds: ['drv5'],
    repairAppointments: [
      { date: '2025-01-30', note: 'Motorsteuerung' },
      { date: '2025-03-18', note: 'Differential' }
    ]
  },
  {
    id: 'veh5',
    plate: 'B-DEL-901',
    type: 'delivery',
    status: 'maintenance',
    vin: '1FTFW1E57KFA12345',
    location: 'Berlin Lieferzentrum',
    firstRegistration: '2020-05-05',
    weight: '3.5 t',
    usage: 'city',
    inspectionDate: '2025-03-21',
    inspectionStatus: 'dueSoon',
    maintenanceDate: '2025-02-15',
    downtimeDays: 9,
    documents: ['registration', 'maintenance'],
    policies: [
      { number: 'POL-B-009', line: 'casco', sum: '€60.000', deductible: '€300', term: '2024-09-01 – 2025-08-31', status: 'active' }
    ],
    driverIds: ['drv1', 'drv6'],
    repairAppointments: [{ date: '2025-02-18', note: 'Bremsscheiben' }]
  },
  {
    id: 'veh6',
    plate: 'F-TR-95',
    type: 'truck',
    status: 'active',
    vin: 'JHLRD784X4C003456',
    location: 'Frankfurt',
    firstRegistration: '2017-03-30',
    weight: '22 t',
    usage: 'longhaul',
    inspectionDate: '2025-10-10',
    inspectionStatus: 'ok',
    maintenanceDate: '2025-06-05',
    downtimeDays: 5,
    documents: ['registration', 'leasing', 'maintenance'],
    policies: [
      { number: 'POL-F-221', line: 'liability', sum: '8 Mio €', deductible: '€600', term: '2024-02-01 – 2025-01-31', status: 'pending' }
    ],
    driverIds: ['drv2', 'drv3'],
    repairAppointments: [{ date: '2025-04-08', note: 'Telematik Kalibrierung' }]
  }
]

const DRIVER_DIRECTORY: DriverRecord[] = [
  { id: 'drv1', name: 'Julia Neumann', birthDate: '1989-07-14', employeeId: 'CF-102', licenseClasses: ['B', 'C'], licenseValidUntil: '2027-09-01', licenseStatus: 'valid' },
  { id: 'drv2', name: 'Oskar Thiele', birthDate: '1984-11-02', employeeId: 'CF-074', licenseClasses: ['B', 'C', 'CE'], licenseValidUntil: '2025-06-15', licenseStatus: 'expiring' },
  { id: 'drv3', name: 'Hannah Vogt', birthDate: '1991-03-19', employeeId: 'CF-155', licenseClasses: ['B', 'C1E'], licenseValidUntil: '2026-01-05', licenseStatus: 'valid' },
  { id: 'drv4', name: 'Sven Richter', birthDate: '1994-12-08', employeeId: 'CF-214', licenseClasses: ['B'], licenseValidUntil: '2024-11-30', licenseStatus: 'expired' },
  { id: 'drv5', name: 'Lea Hartmann', birthDate: '1987-05-27', employeeId: 'CF-088', licenseClasses: ['B', 'C', 'CE'], licenseValidUntil: '2026-08-22', licenseStatus: 'valid' },
  { id: 'drv6', name: 'Nico Bauer', birthDate: '1993-09-03', employeeId: 'CF-170', licenseClasses: ['B', 'C1'], licenseValidUntil: '2025-12-12', licenseStatus: 'expiring' }
]

const TYPE_FILTERS: Array<{ value: 'all' | VehicleType; labelKey: string }> = [
  { value: 'all', labelKey: 'fleetManagement.filters.typeOptions.all' },
  { value: 'car', labelKey: 'fleetManagement.filters.typeOptions.car' },
  { value: 'truck', labelKey: 'fleetManagement.filters.typeOptions.truck' },
  { value: 'trailer', labelKey: 'fleetManagement.filters.typeOptions.trailer' },
  { value: 'delivery', labelKey: 'fleetManagement.filters.typeOptions.delivery' }
]

const STATUS_FILTERS: Array<{ value: 'all' | VehicleStatus; labelKey: string }> = [
  { value: 'all', labelKey: 'fleetManagement.filters.statusOptions.all' },
  { value: 'active', labelKey: 'fleetManagement.filters.statusOptions.active' },
  { value: 'maintenance', labelKey: 'fleetManagement.filters.statusOptions.maintenance' },
  { value: 'down', labelKey: 'fleetManagement.filters.statusOptions.down' }
]

const STATUS_FILTER_VARIANTS: Record<'all' | VehicleStatus, keyof typeof TRAFFIC_COLORS> = {
  all: 'blue',
  active: 'green',
  maintenance: 'orange',
  down: 'red'
}

export default function FleetManagementPage() {
  const { t } = useI18n()
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(INITIAL_VEHICLES)
  const [selectedVehicleId, setSelectedVehicleId] = useState(INITIAL_VEHICLES[0]?.id ?? '')
  const [typeFilter, setTypeFilter] = useState<'all' | VehicleType>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | VehicleStatus>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDriverPicker, setShowDriverPicker] = useState(false)

  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? vehicles[0]

  const filteredVehicles = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()
    return vehicles.filter((vehicle) => {
      const matchType = typeFilter === 'all' || vehicle.type === typeFilter
      const matchStatus = statusFilter === 'all' || vehicle.status === statusFilter
      const matchSearch =
        !search ||
        vehicle.plate.toLowerCase().includes(search) ||
        vehicle.vin.toLowerCase().includes(search) ||
        vehicle.location.toLowerCase().includes(search)
      return matchType && matchStatus && matchSearch
    })
  }, [searchTerm, statusFilter, typeFilter, vehicles])

  const availableDrivers = useMemo(() => {
    if (!selectedVehicle) return []
    return DRIVER_DIRECTORY.filter((driver) => !selectedVehicle.driverIds.includes(driver.id))
  }, [selectedVehicle])

  function handleAssignDriver(driverId: string) {
    if (!selectedVehicle) return
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === selectedVehicle.id && !vehicle.driverIds.includes(driverId)
          ? { ...vehicle, driverIds: [...vehicle.driverIds, driverId] }
          : vehicle
      )
    )
    setShowDriverPicker(false)
  }

  function trafficBadgeStyles(
    variant: keyof typeof TRAFFIC_COLORS,
    overrides?: React.CSSProperties
  ): React.CSSProperties {
    const color = TRAFFIC_COLORS[variant]
    return {
      ...BADGE_BASE,
      background: color,
      borderColor: color,
      ...overrides
    }
  }

  function getLicenseBadgeStyles(status: 'valid' | 'expiring' | 'expired') {
    if (status === 'valid') {
      return trafficBadgeStyles('green', { minWidth: '80px', height: '30px' })
    }
    if (status === 'expiring') {
      return trafficBadgeStyles('orange', { minWidth: '80px', height: '30px' })
    }
    return trafficBadgeStyles('red', { minWidth: '80px', height: '30px' })
  }

  function getStatusBadgeStyles(status: VehicleStatus) {
    if (status === 'active') return trafficBadgeStyles('green')
    if (status === 'maintenance') return trafficBadgeStyles('orange')
    return trafficBadgeStyles('red')
  }

  function getInspectionBadgeStyles(status: InspectionStatus) {
    if (status === 'ok') return trafficBadgeStyles('green')
    if (status === 'dueSoon') return trafficBadgeStyles('orange')
    return trafficBadgeStyles('red')
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${BackgroundLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.22)',
          zIndex: 1
        }}
      />
      <section className="page" style={{ gap: '1.5rem', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1260px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <Header
            title={t('fleetManagement.title')}
            subtitle={t('fleetManagement.subtitle')}
            titleColor="#ffffff"
            subtitleColor="rgba(255,255,255,0.82)"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}
          >
            {KPI_DATA.map((item) => (
              <Card key={item.key} variant="glass">
                <p style={{ margin: 0, color: GLASS_SUBTLE }}>{t(`fleetManagement.kpi.${item.key}`)}</p>
                <div style={{ marginTop: '0.35rem', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff' }}>{item.value}</div>
              </Card>
            ))}
          </div>

          <Card variant="glass">
            <header style={{ marginBottom: '1rem', color: '#ffffff' }}>
              <h2 style={{ margin: 0 }}>{t('fleetManagement.list.title')}</h2>
            </header>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: GLASS_SUBTLE }}>{t('fleetManagement.filters.typeLabel')}:</span>
                {TYPE_FILTERS.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setTypeFilter(filter.value)}
                    style={{
                      borderRadius: '999px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      background: typeFilter === filter.value ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      padding: '0.35rem 0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    {t(filter.labelKey)}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: GLASS_SUBTLE }}>{t('fleetManagement.filters.statusLabel')}:</span>
                {STATUS_FILTERS.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setStatusFilter(filter.value)}
                    style={{
                      ...trafficBadgeStyles(STATUS_FILTER_VARIANTS[filter.value], {
                        minWidth: '110px',
                        height: '34px',
                        cursor: 'pointer',
                        transform: statusFilter === filter.value ? 'translateY(-1px)' : undefined
                      })
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.filter = 'brightness(1.05)'
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.filter = 'none'
                      event.currentTarget.style.transform = statusFilter === filter.value ? 'translateY(-1px)' : 'none'
                    }}
                  >
                    {t(filter.labelKey)}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t('fleetManagement.filters.searchPlaceholder')}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.35)',
                    background: 'rgba(0,0,0,0.25)',
                    color: '#ffffff'
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}
            >
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  style={{
                    padding: '1rem 1.2rem',
                    borderRadius: '18px',
                    border: '1px solid rgba(255,255,255,0.35)',
                    background:
                      vehicle.id === selectedVehicleId ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    boxShadow: '0 14px 34px rgba(0,0,0,0.28)',
                    cursor: 'pointer',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <strong>{vehicle.plate}</strong>
                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.35)',
                        fontSize: '0.75rem',
                        background: 'rgba(0,0,0,0.2)'
                      }}
                    >
                      {t(`fleetManagement.filters.typeOptions.${vehicle.type}`)}
                    </span>
                  </div>
                  <span style={{ color: GLASS_SUBTLE }}>{vehicle.location}</span>
                  <span style={getStatusBadgeStyles(vehicle.status)}>
                    {t(`fleetManagement.list.statusBadges.${vehicle.status}`)}
                  </span>
                  <span style={{ color: GLASS_SUBTLE }}>
                    {t('fleetManagement.detail.inspection')}: {vehicle.inspectionDate}
                  </span>
                  <span style={{ color: GLASS_SUBTLE }}>
                    {t('fleetManagement.detail.maintenance')}: {vehicle.maintenanceDate}
                  </span>
                  <span style={{ color: GLASS_SUBTLE }}>
                    {t('fleetManagement.detail.downtime')}: {vehicle.downtimeDays}d
                  </span>
                  <Button variant="secondary" style={{ marginTop: '0.3rem' }}>
                    {t('fleetManagement.list.open')}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {selectedVehicle && (
            <Card variant="glass">
              <header style={{ marginBottom: '1rem', color: '#ffffff' }}>
                <h2 style={{ margin: 0 }}>
                  {t('fleetManagement.detail.title')} – {selectedVehicle.plate}
                </h2>
              </header>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem'
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#ffffff' }}>{t('fleetManagement.detail.overview')}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: GLASS_TEXT }}>
                    <span>VIN: {selectedVehicle.vin}</span>
                    <span>
                      {t('fleetManagement.filters.typeLabel')}: {t(`fleetManagement.filters.typeOptions.${selectedVehicle.type}`)}
                    </span>
                    <span>
                      {t('fleetManagement.detail.usage')}:{' '}
                      {t(`fleetManagement.detail.usageLabels.${selectedVehicle.usage}`)}
                    </span>
                    <span>
                      {t('fleetManagement.detail.schedule')}: {selectedVehicle.location}
                    </span>
                    <span>
                      {t('fleetReporting.vehicles.cards.inspection')}: {selectedVehicle.inspectionDate}
                    </span>
                    <span style={getInspectionBadgeStyles(selectedVehicle.inspectionStatus)}>
                      {t('fleetManagement.detail.inspectionStatus.' + selectedVehicle.inspectionStatus)}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#ffffff' }}>{t('fleetManagement.detail.schedule')}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: GLASS_TEXT, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li>
                      {t('fleetManagement.detail.inspection')}: {selectedVehicle.inspectionDate}{' '}
                      <span style={getInspectionBadgeStyles(selectedVehicle.inspectionStatus)}>
                        {t(`fleetManagement.detail.inspectionStatus.${selectedVehicle.inspectionStatus}`)}
                      </span>
                    </li>
                    <li>
                      {t('fleetManagement.detail.maintenance')}: {selectedVehicle.maintenanceDate}
                    </li>
                    <li>
                      {t('fleetManagement.detail.downtime')}: {selectedVehicle.downtimeDays}d
                    </li>
                    {selectedVehicle.repairAppointments.map((appointment) => (
                      <li key={appointment.date}>
                        {appointment.date} – {appointment.note}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#ffffff' }}>{t('fleetManagement.detail.documents')}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedVehicle.documents.map((doc) => (
                      <div
                        key={doc}
                        style={{
                          padding: '0.45rem 0.7rem',
                          borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.35)',
                          color: '#ffffff',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>{t(`fleetManagement.detail.documentsList.${doc}`)}</span>
                        <Button
                          variant="secondary"
                          style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', borderRadius: '12px' }}
                        >
                          {t('fleetManagement.detail.upload')}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#ffffff' }}>{t('fleetManagement.detail.policies')}</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ffffff', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', color: 'rgba(255,255,255,0.75)' }}>
                        <th>{t('fleetManagement.detail.policiesColumns.number')}</th>
                        <th>{t('fleetManagement.detail.policiesColumns.line')}</th>
                        <th>{t('fleetManagement.detail.policiesColumns.sum')}</th>
                        <th>{t('fleetManagement.detail.policiesColumns.deductible')}</th>
                        <th>{t('fleetManagement.detail.policiesColumns.term')}</th>
                        <th>{t('fleetManagement.detail.policiesColumns.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedVehicle.policies.map((policy) => (
                        <tr key={policy.number}>
                          <td style={{ padding: '0.4rem 0.2rem' }}>{policy.number}</td>
                          <td>{t(`fleetManagement.detail.policyLines.${policy.line}`)}</td>
                          <td>{policy.sum}</td>
                          <td>{policy.deductible}</td>
                          <td>{policy.term}</td>
                          <td>
                            <span
                              style={trafficBadgeStyles(
                                policy.status === 'active' ? 'green' : 'orange',
                                { minWidth: '90px', height: '32px', fontSize: '0.8rem' }
                              )}
                            >
                              {t(`fleetManagement.detail.policyStatus.${policy.status}`)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#ffffff' }}>{t('fleetManagement.detail.drivers')}</h3>
                    <Button variant="secondary" onClick={() => setShowDriverPicker((prev) => !prev)}>
                      {t('fleetManagement.detail.addDriver')}
                    </Button>
                  </div>
                  {showDriverPicker && (
                    <div
                      style={{
                        marginTop: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.35)',
                        background: 'rgba(0,0,0,0.2)'
                      }}
                    >
                      <p style={{ margin: '0 0 0.5rem', color: GLASS_TEXT }}>{t('fleetManagement.driverPicker.title')}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {availableDrivers.map((driver) => (
                          <Button key={driver.id} onClick={() => handleAssignDriver(driver.id)}>
                            {driver.name}
                          </Button>
                        ))}
                        {!availableDrivers.length && <span style={{ color: GLASS_SUBTLE }}>—</span>}
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: '1rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '0.75rem'
                    }}
                  >
                    {selectedVehicle.driverIds.map((id) => {
                      const driver = DRIVER_DIRECTORY.find((entry) => entry.id === id)
                      if (!driver) return null
                      return (
                        <div
                          key={driver.id}
                          style={{
                            padding: '0.9rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.35)',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem'
                          }}
                        >
                          <strong>{driver.name}</strong>
                          <span style={{ color: GLASS_SUBTLE }}>
                            ID: {driver.employeeId} • {driver.birthDate}
                          </span>
                          <span style={{ color: GLASS_SUBTLE }}>
                            {t('fleetManagement.detail.licenses')}: {driver.licenseClasses.join(', ')}
                          </span>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: GLASS_SUBTLE }}>
                              {t('fleetManagement.detail.licenseValidity')}: {driver.licenseValidUntil}
                            </span>
                            <span
                              style={{
                                padding: '0.2rem 0.6rem',
                                borderRadius: '999px',
                                color: '#ffffff',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                ...getLicenseBadgeStyles(driver.licenseStatus)
                              }}
                            >
                              {t(`fleetManagement.detail.licenseStatus.${driver.licenseStatus}`)}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
