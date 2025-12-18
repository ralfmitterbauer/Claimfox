import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import BackgroundLogin from '@/assets/images/background_login.png'

type KpiItem =
  | { key: keyof typeof KPI_LABELS; value: string; icon: React.ReactNode; unit?: string; valueSize?: 'normal' | 'compact' }
  | { key: keyof typeof KPI_LABELS; icon: React.ReactNode; valueKey: string; valueSize?: 'normal' | 'compact' }

const KPI_LABELS = {
  totalClaims: 'fleetReporting.kpi.totalClaims',
  openClaims: 'fleetReporting.kpi.openClaims',
  lossRatio: 'fleetReporting.kpi.lossRatio',
  avgCost: 'fleetReporting.kpi.avgCost',
  coverageRate: 'fleetReporting.kpi.coverageRate',
  activeVehicles: 'fleetReporting.kpi.activeVehicles',
  downtime: 'fleetReporting.kpi.downtime',
  topCause: 'fleetReporting.kpi.topCause'
} as const

const kpis: KpiItem[] = [
  { key: 'totalClaims', value: '248', icon: <IconClipboard /> },
  { key: 'openClaims', value: '32', icon: <IconWarningTriangle /> },
  { key: 'lossRatio', value: '61.4%', icon: <IconBarChart /> },
  { key: 'avgCost', value: '€3,420', icon: <IconEuro /> },
  { key: 'coverageRate', value: '86%', icon: <IconShieldCheck /> },
  { key: 'activeVehicles', value: '312', icon: <IconTruck /> },
  { key: 'downtime', value: '3.1', icon: <IconClock /> },
  { key: 'topCause', icon: <IconStopOctagon />, valueKey: 'fleetReporting.kpiValues.topCause', valueSize: 'compact' }
] as const

const monthlyClaims = [
  { label: 'Jan', value: 18 },
  { label: 'Feb', value: 21 },
  { label: 'Mar', value: 26 },
  { label: 'Apr', value: 24 },
  { label: 'May', value: 19 },
  { label: 'Jun', value: 22 },
  { label: 'Jul', value: 28 },
  { label: 'Aug', value: 25 },
  { label: 'Sep', value: 23 },
  { label: 'Oct', value: 27 },
  { label: 'Nov', value: 30 },
  { label: 'Dec', value: 25 }
] as const

const severityBreakdown = [
  { key: 'high', value: 25, color: '#FF6B6B' },
  { key: 'medium', value: 48, color: '#FFC857' },
  { key: 'low', value: 27, color: '#3DD598' }
] as const

const aiItemKeys = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const

type DamageTypeFilter = 'all' | 'motor' | 'liability' | 'cargo'
type RangeFilter = '30d' | '12m'

const DAMAGE_TYPE_OPTIONS: Array<{ value: DamageTypeFilter; labelKey: string }> = [
  { value: 'all', labelKey: 'fleetReporting.filters.typeOptions.all' },
  { value: 'motor', labelKey: 'fleetReporting.filters.typeOptions.motor' },
  { value: 'liability', labelKey: 'fleetReporting.filters.typeOptions.liability' },
  { value: 'cargo', labelKey: 'fleetReporting.filters.typeOptions.cargo' }
]

const RANGE_FILTER_OPTIONS: Array<{ value: RangeFilter; labelKey: string }> = [
  { value: '30d', labelKey: 'fleetReporting.filters.rangeOptions.last30' },
  { value: '12m', labelKey: 'fleetReporting.filters.rangeOptions.last12' }
]

const vehicleRecords = [
  {
    id: 'veh1',
    plate: 'DE-789-XY',
    type: 'truck',
    status: 'active',
    location: 'Berlin Depot',
    inspection: '2025-05-12',
    maintenance: '2025-04-02',
    downtime: 2
  },
  {
    id: 'veh2',
    plate: 'HH-CARGO-12',
    type: 'trailer',
    status: 'maintenance',
    location: 'Hamburg Hafen',
    inspection: '2025-06-30',
    maintenance: '2025-03-18',
    downtime: 6
  },
  {
    id: 'veh3',
    plate: 'M-FL-2045',
    type: 'car',
    status: 'active',
    location: 'München City',
    inspection: '2025-01-10',
    maintenance: '2025-02-28',
    downtime: 1
  },
  {
    id: 'veh4',
    plate: 'K-TR-330',
    type: 'truck',
    status: 'down',
    location: 'Köln Werkstatt',
    inspection: '2024-12-05',
    maintenance: '2025-03-05',
    downtime: 12
  },
  {
    id: 'veh5',
    plate: 'FRA-LOG-71',
    type: 'trailer',
    status: 'active',
    location: 'Frankfurt Cargo Hub',
    inspection: '2025-08-14',
    maintenance: '2025-05-22',
    downtime: 4
  },
  {
    id: 'veh6',
    plate: 'B-DEL-901',
    type: 'delivery',
    status: 'maintenance',
    location: 'Berlin Lieferzentrum',
    inspection: '2025-04-18',
    maintenance: '2025-03-05',
    downtime: 5
  },
  {
    id: 'veh7',
    plate: 'S-TR-550',
    type: 'truck',
    status: 'active',
    location: 'Stuttgart',
    inspection: '2025-09-01',
    maintenance: '2025-05-30',
    downtime: 2
  },
  {
    id: 'veh8',
    plate: 'HH-DEL-72',
    type: 'delivery',
    status: 'down',
    location: 'Hamburg Innenstadt',
    inspection: '2025-02-10',
    maintenance: '2025-01-25',
    downtime: 9
  },
  {
    id: 'veh9',
    plate: 'M-LOG-24',
    type: 'car',
    status: 'active',
    location: 'München',
    inspection: '2025-07-11',
    maintenance: '2025-05-10',
    downtime: 0
  },
  {
    id: 'veh10',
    plate: 'D-TR-84',
    type: 'trailer',
    status: 'active',
    location: 'Düsseldorf',
    inspection: '2025-06-01',
    maintenance: '2025-04-17',
    downtime: 1
  },
  {
    id: 'veh11',
    plate: 'HB-DEL-18',
    type: 'delivery',
    status: 'maintenance',
    location: 'Bremen',
    inspection: '2025-03-20',
    maintenance: '2025-02-14',
    downtime: 7
  },
  {
    id: 'veh12',
    plate: 'F-TR-95',
    type: 'truck',
    status: 'active',
    location: 'Frankfurt',
    inspection: '2025-11-02',
    maintenance: '2025-07-18',
    downtime: 3
  }
] as const

type ClaimRow = {
  id: string
  date: string
  vehicle: string
  vin: string
  route: string
  claimType: 'motor' | 'liability' | 'cargo'
  coverage: 'covered' | 'not_covered'
  status: 'open' | 'in_review' | 'closed'
  cost: number
  aiHint: 'flag' | 'watch' | 'normal'
  note: string
}

const isoDate = (date: Date) => date.toISOString().slice(0, 10)
const daysAgo = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return isoDate(d)
}

const toStartOfDay = (value: string) => new Date(`${value}T00:00:00`)

const INITIAL_CLAIMS: ClaimRow[] = [
  {
    id: 'c1',
    date: daysAgo(10),
    vehicle: 'DE-789-XY',
    vin: 'WVWZZZ1KZ5W113456',
    route: 'Berlin → Leipzig (A9)',
    claimType: 'motor',
    coverage: 'covered',
    status: 'open',
    cost: 8450,
    aiHint: 'flag',
    note: 'Telematics flagged harsh braking + sensor fault.'
  },
  {
    id: 'c2',
    date: daysAgo(18),
    vehicle: 'HH-CARGO-12',
    vin: 'WDB9510231K556789',
    route: 'Hamburg port logistics',
    claimType: 'cargo',
    coverage: 'not_covered',
    status: 'in_review',
    cost: 5870,
    aiHint: 'watch',
    note: 'Re-check cargo lashing – recurring damage pattern.'
  },
  {
    id: 'c3',
    date: daysAgo(32),
    vehicle: 'M-FL-2045',
    vin: 'WMWZZZ3CZ4P112233',
    route: 'Munich → Salzburg',
    claimType: 'liability',
    coverage: 'covered',
    status: 'open',
    cost: 2180,
    aiHint: 'normal',
    note: 'Insurer requested additional photo evidence.'
  },
  {
    id: 'c4',
    date: daysAgo(60),
    vehicle: 'K-TR-330',
    vin: 'YS2P4X20002156789',
    route: 'Cologne inner city',
    claimType: 'motor',
    coverage: 'covered',
    status: 'in_review',
    cost: 1260,
    aiHint: 'watch',
    note: 'Incident cluster at same intersection.'
  },
  {
    id: 'c5',
    date: daysAgo(90),
    vehicle: 'FRA-LOG-71',
    vin: '1FTFW1E57KFA12345',
    route: 'Frankfurt air cargo hub',
    claimType: 'cargo',
    coverage: 'not_covered',
    status: 'closed',
    cost: 9640,
    aiHint: 'flag',
    note: 'Temperature deviation + delayed notification.'
  },
  {
    id: 'c6',
    date: daysAgo(120),
    vehicle: 'B-DEL-901',
    vin: '1FTSW21R08EC46991',
    route: 'Berlin delivery district',
    claimType: 'motor',
    coverage: 'covered',
    status: 'in_review',
    cost: 3120,
    aiHint: 'watch',
    note: 'Last-mile collision with minor body damage.'
  },
  {
    id: 'c7',
    date: daysAgo(160),
    vehicle: 'HH-DEL-72',
    vin: 'WDDGF8ABXEA939585',
    route: 'Hamburg Innenstadt',
    claimType: 'motor',
    coverage: 'covered',
    status: 'open',
    cost: 4280,
    aiHint: 'normal',
    note: 'Awaiting adjuster confirmation.'
  },
  {
    id: 'c8',
    date: daysAgo(200),
    vehicle: 'FRA-LOG-71',
    vin: '1FTFW1E57KFA12345',
    route: 'Frankfurt air cargo hub',
    claimType: 'cargo',
    coverage: 'covered',
    status: 'closed',
    cost: 5120,
    aiHint: 'flag',
    note: 'Cold-chain deviation triggered automatic claim.'
  },
  {
    id: 'c9',
    date: daysAgo(240),
    vehicle: 'DE-789-XY',
    vin: 'WVWZZZ1KZ5W113456',
    route: 'Berlin ring road',
    claimType: 'motor',
    coverage: 'covered',
    status: 'in_review',
    cost: 2210,
    aiHint: 'watch',
    note: 'Lane assist sensor flagged repeated deviations.'
  },
  {
    id: 'c10',
    date: daysAgo(280),
    vehicle: 'M-FL-2045',
    vin: 'WMWZZZ3CZ4P112233',
    route: 'Munich urban delivery',
    claimType: 'liability',
    coverage: 'not_covered',
    status: 'open',
    cost: 1760,
    aiHint: 'flag',
    note: 'Third-party damage claim pending.'
  },
  {
    id: 'c11',
    date: daysAgo(320),
    vehicle: 'K-TR-330',
    vin: 'YS2P4X20002156789',
    route: 'Cologne inner city',
    claimType: 'motor',
    coverage: 'covered',
    status: 'closed',
    cost: 3980,
    aiHint: 'normal',
    note: 'Completed repair with OEM parts.'
  },
  {
    id: 'c12',
    date: daysAgo(350),
    vehicle: 'HH-CARGO-12',
    vin: 'WDB9510231K556789',
    route: 'Hamburg port logistics',
    claimType: 'cargo',
    coverage: 'covered',
    status: 'open',
    cost: 2875,
    aiHint: 'watch',
    note: 'Awaiting cargo inspection report.'
  }
]

const GLASS_TEXT = 'rgba(255,255,255,0.85)'
const GLASS_SUBTLE = 'rgba(255,255,255,0.65)'

const TRAFFIC_COLORS = {
  green: '#16A34A',
  orange: '#F97316',
  red: '#DC2626',
  blue: '#2563EB'
} as const

const KPI_GRID_CSS = `
  .fleet-kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
  @media (max-width: 1200px) {
    .fleet-kpi-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 640px) {
    .fleet-kpi-grid {
      grid-template-columns: 1fr;
    }
  }
`

type Traffic = keyof typeof TRAFFIC_COLORS

function trafficColorForStatus(status: string): Traffic {
  const normalized = status.toLowerCase()
  if (normalized.includes('aktiv') || normalized.includes('active') || normalized.includes('ok')) return 'green'
  if (
    normalized.includes('werkstatt') ||
    normalized.includes('workshop') ||
    normalized.includes('repair') ||
    normalized.includes('fällig') ||
    normalized.includes('due')
  ) {
    return 'orange'
  }
  if (normalized.includes('ausfall') || normalized.includes('down') || normalized.includes('krit')) {
    return 'red'
  }
  return 'blue'
}

function trafficStyle(variant: Traffic, overrides?: React.CSSProperties): React.CSSProperties {
  const color = TRAFFIC_COLORS[variant]
  return {
    background: color,
    color: '#ffffff',
    border: `1px solid ${color}`,
    borderRadius: '999px',
    minWidth: '108px',
    height: '34px',
    padding: '0 12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '0.9rem',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textAlign: 'center',
    transition: 'transform 0.15s ease, filter 0.15s ease, opacity 0.15s ease',
    ...overrides
  }
}

const ICON_COLOR = '#D4380D'

type IconProps = { size?: number }

const svgProps = (size?: number) => ({
  width: size ?? 32,
  height: size ?? 32,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
})

function IconClipboard({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M9 4h6" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M9 4a2 2 0 0 0-2 2v1h10V6a2 2 0 0 0-2-2"
        stroke={ICON_COLOR}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1"
        stroke={ICON_COLOR}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconWarningTriangle({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <path
        d="M12 4 3 19h18L12 4Z"
        stroke={ICON_COLOR}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 9v5" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill={ICON_COLOR} />
    </svg>
  )
}

function IconBarChart({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M5 20V11" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20V4" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <path d="M19 20v-8" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <path d="M3 20h18" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconEuro({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <circle cx="12" cy="12" r="8" stroke={ICON_COLOR} strokeWidth="2" />
      <path d="M8 10h5" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 14h5" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <path d="M11 7s-3 2-3 5 3 5 3 5" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconShieldCheck({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <path
        d="M12 3 5 6v7c0 4.418 3.134 6.84 7 8 3.866-1.16 7-3.582 7-8V6l-7-3Z"
        stroke={ICON_COLOR}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconTruck({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <path
        d="M3 7h11v7H3z"
        stroke={ICON_COLOR}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 10h3l3 3v4h-3"
        stroke={ICON_COLOR}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="7" cy="18" r="2" stroke={ICON_COLOR} strokeWidth="2" />
      <circle cx="16" cy="18" r="2" stroke={ICON_COLOR} strokeWidth="2" />
    </svg>
  )
}

function IconClock({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <circle cx="12" cy="12" r="8" stroke={ICON_COLOR} strokeWidth="2" />
      <path d="M12 8v4l2.5 1.5" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconStopOctagon({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <path
        d="M8.5 2h7l4.5 4.5v7L15.5 18h-7L4 13.5v-7L8.5 2Z"
        stroke={ICON_COLOR}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 8v4" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 14.5v.2" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const TABLE_BADGE_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '90px',
  height: '32px',
  borderRadius: '999px',
  fontSize: '0.85rem',
  fontWeight: 700,
  color: '#ffffff',
  padding: '0 0.75rem'
}

function coverageBadgeStyles(coverage: ClaimRow['coverage']) {
  return {
    ...TABLE_BADGE_BASE,
    background: coverage === 'covered' ? '#16A34A' : '#DC2626'
  }
}

function statusBadgeStyles(status: ClaimRow['status']) {
  const map = {
    open: '#F97316',
    in_review: '#2563EB',
    closed: '#16A34A'
  } as const
  return { ...TABLE_BADGE_BASE, background: map[status] }
}

function aiBadgeStyles(tag: ClaimRow['aiHint']) {
  const map = {
    flag: '#DC2626',
    watch: '#F97316',
    normal: '#16A34A'
  } as const
  return { ...TABLE_BADGE_BASE, minWidth: '80px', background: map[tag] }
}

type VehicleTypeFilter = 'all' | 'car' | 'truck' | 'trailer' | 'delivery'
type VehicleStatusFilter = 'all' | 'active' | 'maintenance' | 'down'
type ClaimEditableField = 'date' | 'vehicle' | 'vin' | 'route' | 'cost' | 'note'
type EditableField = ClaimEditableField | 'claimType' | 'coverage' | 'status'

const VEHICLE_TYPE_VARIANTS: Record<VehicleTypeFilter, Traffic> = {
  all: 'blue',
  car: 'green',
  truck: 'orange',
  trailer: 'red',
  delivery: 'orange'
}

const VEHICLE_STATUS_VARIANTS: Record<VehicleStatusFilter, Traffic> = {
  all: 'blue',
  active: 'green',
  maintenance: 'orange',
  down: 'red'
}

const CLAIM_TYPE_OPTIONS: Array<{ value: ClaimRow['claimType']; labelKey: string }> = [
  { value: 'motor', labelKey: 'fleetReporting.table.types.motor' },
  { value: 'liability', labelKey: 'fleetReporting.table.types.liability' },
  { value: 'cargo', labelKey: 'fleetReporting.table.types.cargo' }
]

const CLAIM_COVERAGE_OPTIONS: Array<{ value: ClaimRow['coverage']; labelKey: string }> = [
  { value: 'covered', labelKey: 'fleetReporting.table.coverageBadges.covered' },
  { value: 'not_covered', labelKey: 'fleetReporting.table.coverageBadges.uncovered' }
]

const CLAIM_STATUS_OPTIONS: Array<{ value: ClaimRow['status']; labelKey: string }> = [
  { value: 'open', labelKey: 'fleetReporting.table.statusBadges.open' },
  { value: 'in_review', labelKey: 'fleetReporting.table.statusBadges.review' },
  { value: 'closed', labelKey: 'fleetReporting.table.statusBadges.closed' }
]

function KpiCard({
  icon,
  label,
  value,
  valueSize = 'normal'
}: {
  icon: React.ReactNode
  label: string
  value: string
  valueSize?: 'normal' | 'compact'
}) {
  return (
    <Card
      variant="glass"
      className="fleet-kpi-card"
      style={{
        padding: '1.4rem 1.6rem',
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)', fontSize: '0.9rem' }}>{label}</p>
          <div
            style={{
              marginTop: '0.3rem',
              fontSize: valueSize === 'compact' ? '1rem' : '2rem',
              fontWeight: 700,
              color: '#ffffff',
              maxWidth: '100%',
              ...(valueSize === 'compact'
                ? {
                    lineHeight: 1.15,
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    whiteSpace: 'normal',
                    overflow: 'hidden'
                  }
                : {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  })
            }}
            title={value}
          >
            {value}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function FleetReportingPage() {
  const { t, lang } = useI18n()
  const maxMonthly = Math.max(...monthlyClaims.map((entry) => entry.value))
  const [claims, setClaims] = useState<ClaimRow[]>(INITIAL_CLAIMS)
  const [editingCell, setEditingCell] = useState<{ rowId: string; field: EditableField } | null>(null)
  const [draftValue, setDraftValue] = useState('')
  const [vehicleType, setVehicleType] = useState<VehicleTypeFilter>('all')
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatusFilter>('all')
  const [vehicleSearch, setVehicleSearch] = useState('')
  const [damageType, setDamageType] = useState<'all' | 'motor' | 'liability' | 'cargo'>('all')
  const [rangeFilter, setRangeFilter] = useState<'30d' | '12m'>('12m')
  const [query, setQuery] = useState('')
  const tableScrollRef = useRef<HTMLDivElement | null>(null)
  const [showScrollControls, setShowScrollControls] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const searchPlaceholder = lang === 'de' ? 'Kennzeichen oder VIN suchen …' : 'Search plate or VIN …'

  const filteredVehicles = useMemo(() => {
    const search = vehicleSearch.trim().toLowerCase()
    return vehicleRecords.filter((vehicle) => {
      const matchType = vehicleType === 'all' || vehicle.type === vehicleType
      const matchStatus = vehicleStatus === 'all' || vehicle.status === vehicleStatus
      const matchSearch =
        !search ||
        vehicle.plate.toLowerCase().includes(search) ||
        vehicle.location.toLowerCase().includes(search)
      return matchType && matchStatus && matchSearch
    })
  }, [vehicleStatus, vehicleType, vehicleSearch])

  const filteredClaims = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rangeDays = rangeFilter === '30d' ? 30 : 365
    const minTimestamp = Date.now() - rangeDays * 24 * 60 * 60 * 1000

    return claims.filter((row) => {
      if (damageType !== 'all' && row.claimType !== damageType) {
        return false
      }
      const rowDate = toStartOfDay(row.date)
      const rowTime = rowDate.getTime()
      if (!Number.isNaN(rowTime) && rowTime < minTimestamp) {
        return false
      }
      if (q && !row.vehicle.toLowerCase().includes(q) && !row.vin.toLowerCase().includes(q)) {
        return false
      }
      return true
    })
  }, [claims, damageType, rangeFilter, query])

  const updateScrollState = useCallback(() => {
    const el = tableScrollRef.current
    if (!el) return
    const show = el.scrollWidth > el.clientWidth + 1
    setShowScrollControls(show)
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = tableScrollRef.current
    if (!el) return
    const handleScroll = () => updateScrollState()
    el.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  useEffect(() => {
    updateScrollState()
  }, [filteredClaims, updateScrollState])

  function handleHorizontalScroll(offset: number) {
    const el = tableScrollRef.current
    if (!el) return
    el.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const tableCellStyle: React.CSSProperties = {
    padding: '0.65rem 0.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    color: '#ffffff',
    fontSize: '0.95rem',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  }

  const tableHeaderCellStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    background: 'rgba(15,15,30,0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    textAlign: 'left',
    padding: '0.55rem 0.5rem',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.78)'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.35)',
    background: 'rgba(0,0,0,0.35)',
    color: '#ffffff',
    padding: '0.45rem 0.6rem',
    fontSize: '0.9rem',
    outline: 'none'
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '60px',
    resize: 'vertical'
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none',
    WebkitAppearance: 'none'
  }

  function formatCost(value: number) {
    const formatter = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', {
      style: 'currency',
      currency: 'EUR'
    })
    return formatter.format(value)
  }

  function handleStartEdit(rowId: string, field: EditableField, currentValue: string) {
    setEditingCell({ rowId, field })
    setDraftValue(currentValue)
  }

  function handleEditCancel() {
    setEditingCell(null)
    setDraftValue('')
  }

  function commitFieldChange(rowId: string, field: EditableField, rawValue: string) {
    setClaims((prev) =>
      prev.map((row) => {
        if (row.id !== rowId) return row
        if (field === 'cost') {
          const cleaned = rawValue.replace(/[^\d,.-]/g, '').replace(',', '.')
          const numeric = Number(cleaned)
          return { ...row, cost: Number.isNaN(numeric) ? row.cost : numeric }
        }
        if (field === 'date' || field === 'vehicle' || field === 'vin' || field === 'route' || field === 'note') {
          return { ...row, [field]: rawValue }
        }
        if (field === 'claimType') return { ...row, claimType: rawValue as ClaimRow['claimType'] }
        if (field === 'coverage') return { ...row, coverage: rawValue as ClaimRow['coverage'] }
        if (field === 'status') return { ...row, status: rawValue as ClaimRow['status'] }
        return row
      })
    )
    setEditingCell(null)
    setDraftValue('')
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!editingCell) return
    if (event.key === 'Escape') {
      event.preventDefault()
      handleEditCancel()
      return
    }
    if (event.key === 'Enter') {
      if (editingCell.field === 'note' && event.shiftKey) {
        return
      }
      event.preventDefault()
      commitFieldChange(editingCell.rowId, editingCell.field, draftValue)
    }
  }

  function renderEditableTextCell(row: ClaimRow, field: ClaimEditableField, width: string) {
    const isEditing = editingCell?.rowId === row.id && editingCell.field === field
    const displayValue =
      field === 'cost' ? formatCost(row.cost) : (row[field] as string)

    const fieldSpecificStyle: React.CSSProperties =
      field === 'cost'
        ? { textAlign: 'right', fontVariantNumeric: 'tabular-nums' }
        : field === 'note'
          ? { whiteSpace: 'pre-wrap' }
          : {}

    return (
      <td
        style={{ ...tableCellStyle, width, minWidth: width, ...fieldSpecificStyle }}
        onClick={() => !isEditing && handleStartEdit(row.id, field, field === 'cost' ? String(row.cost) : (row[field] as string))}
      >
        {isEditing ? (
          field === 'note' ? (
            <textarea
              autoFocus
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
              onBlur={() => commitFieldChange(row.id, field, draftValue)}
              onKeyDown={handleInputKeyDown}
              style={textareaStyle}
            />
          ) : (
            <input
              autoFocus
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
              onBlur={() => commitFieldChange(row.id, field, draftValue)}
              onKeyDown={handleInputKeyDown}
              style={inputStyle}
              type={field === 'cost' ? 'number' : 'text'}
            />
          )
        ) : (
          displayValue
        )}
      </td>
    )
  }

  function renderSelectCell(
    row: ClaimRow,
    field: 'claimType' | 'coverage' | 'status',
    width: string,
    options: Array<{ value: string; labelKey: string }>,
    displayNode: React.ReactNode
  ) {
    const isEditing = editingCell?.rowId === row.id && editingCell.field === field
    return (
      <td
        style={{ ...tableCellStyle, width, minWidth: width }}
        onClick={() => !isEditing && handleStartEdit(row.id, field, row[field])}
      >
        {isEditing ? (
          <select
            autoFocus
            value={draftValue || (row[field] as string)}
            onChange={(event) => commitFieldChange(row.id, field, event.target.value)}
            onBlur={handleEditCancel}
            style={selectStyle}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.labelKey)}
              </option>
            ))}
          </select>
        ) : (
          displayNode
        )}
      </td>
    )
  }

  const renderTypeCell = (row: ClaimRow) =>
    renderSelectCell(row, 'claimType', '150px', CLAIM_TYPE_OPTIONS, (
      <span>{t(`fleetReporting.table.types.${row.claimType}`)}</span>
    ))

  const renderCoverageCell = (row: ClaimRow) =>
    renderSelectCell(row, 'coverage', '150px', CLAIM_COVERAGE_OPTIONS, (
      <span style={coverageBadgeStyles(row.coverage)}>
        {t(`fleetReporting.table.coverageBadges.${row.coverage === 'not_covered' ? 'uncovered' : 'covered'}`)}
      </span>
    ))

  const renderStatusCell = (row: ClaimRow) =>
    renderSelectCell(row, 'status', '150px', CLAIM_STATUS_OPTIONS, (
      <span style={statusBadgeStyles(row.status)}>
        {t(`fleetReporting.table.statusBadges.${row.status === 'in_review' ? 'review' : row.status}`)}
      </span>
    ))

  const renderAiCell = (row: ClaimRow) => (
    <td style={{ ...tableCellStyle, width: '160px', minWidth: '160px' }}>
      <span style={aiBadgeStyles(row.aiHint)}>
        {t(`fleetReporting.table.aiBadges.${row.aiHint === 'flag' ? 'alert' : row.aiHint}`)}
      </span>
    </td>
  )

  return (
    <>
      <style>{KPI_GRID_CSS}</style>
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
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <Header
            title={t('fleetReporting.title')}
            subtitle={t('fleetReporting.subtitle')}
            titleColor="#ffffff"
            subtitleColor="rgba(255,255,255,0.82)"
          />

          <div className="fleet-kpi-grid">
            {kpis.map((item) => {
              const label = t(`fleetReporting.kpi.${item.key}`)
              const value = 'valueKey' in item ? t(item.valueKey) : item.value
              return <KpiCard key={item.key} icon={item.icon} label={label} value={value} valueSize={item.valueSize} />
            })}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}
          >
            <Card variant="glass" title={t('fleetReporting.charts.monthlyTitle')} subtitle={t('fleetReporting.charts.monthlySubtitle')}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.85rem', height: '220px' }}>
                {monthlyClaims.map((entry) => (
                  <div key={entry.label} style={{ flex: 1, textAlign: 'center' }}>
                    <div
                      style={{
                        height: `${(entry.value / maxMonthly) * 180 + 20}px`,
                        background: 'linear-gradient(180deg, #9d8bff 0%, #5b47d6 100%)',
                        borderRadius: '14px 14px 4px 4px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
                      }}
                    />
                    <small style={{ color: GLASS_SUBTLE, display: 'block', marginTop: '0.35rem' }}>{entry.label}</small>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass">
              <header style={{ marginBottom: '1rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff' }}>{t('fleetReporting.charts.coverageTitle')}</h2>
                <p style={{ margin: '0.35rem 0 0', color: GLASS_SUBTLE }}>{t('fleetReporting.charts.coverageSubtitle')}</p>
              </header>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#82f6d8' }}>86%</div>
                  <p style={{ margin: 0, color: GLASS_SUBTLE }}>{t('fleetReporting.coverageLabels.covered')}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fecaca' }}>14%</div>
                  <p style={{ margin: 0, color: GLASS_SUBTLE }}>{t('fleetReporting.coverageLabels.uncovered')}</p>
                </div>
              </div>
              <header style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>{t('fleetReporting.charts.severityTitle')}</h3>
                <p style={{ margin: '0.25rem 0 0', color: GLASS_SUBTLE }}>{t('fleetReporting.charts.severitySubtitle')}</p>
              </header>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {severityBreakdown.map((entry) => (
                  <div key={entry.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ minWidth: '90px', color: GLASS_TEXT }}>{t(`fleetReporting.severityLabels.${entry.key}`)}</span>
                    <div style={{ flex: 1, height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)' }}>
                      <div
                        style={{
                          width: `${entry.value}%`,
                          height: '100%',
                          borderRadius: '999px',
                          background: entry.color
                        }}
                      />
                    </div>
                    <strong style={{ color: '#ffffff', minWidth: '48px' }}>{entry.value}%</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card variant="glass" title={t('fleetReporting.ai.title')} subtitle={t('fleetReporting.ai.subtitle')}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              {aiItemKeys.map((key) => (
                <div
                  key={key}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '18px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 14px 32px rgba(0,0,0,0.28)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {t(`fleetReporting.ai.items.${key}`)}
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" title={t('fleetReporting.vehicles.title')}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem',
                color: GLASS_TEXT
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ color: GLASS_SUBTLE }}>{t('fleetReporting.vehicles.filters.typeLabel')}:</span>
                {['all', 'car', 'truck', 'trailer', 'delivery'].map((option) => {
                  const variant = VEHICLE_TYPE_VARIANTS[option as VehicleTypeFilter]
                  const isActive = vehicleType === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setVehicleType(option as VehicleTypeFilter)}
                      style={trafficStyle(variant, {
                        cursor: 'pointer',
                        minWidth: '110px',
                        opacity: isActive ? 1 : 0.78,
                        transform: isActive ? 'translateY(-1px)' : undefined
                      })}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.filter = 'brightness(1.05)'
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.filter = 'none'
                      }}
                    >
                      {t(`fleetReporting.vehicles.filters.typeOptions.${option}`)}
                    </button>
                  )
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ color: GLASS_SUBTLE }}>{t('fleetReporting.vehicles.filters.statusLabel')}:</span>
                {['all', 'active', 'maintenance', 'down'].map((option) => {
                  const variant = VEHICLE_STATUS_VARIANTS[option as VehicleStatusFilter]
                  const isActive = vehicleStatus === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setVehicleStatus(option as VehicleStatusFilter)}
                      style={trafficStyle(variant, {
                        cursor: 'pointer',
                        minWidth: '110px',
                        opacity: isActive ? 1 : 0.78,
                        transform: isActive ? 'translateY(-1px)' : undefined
                      })}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.filter = 'brightness(1.05)'
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.filter = 'none'
                      }}
                    >
                      {t(`fleetReporting.vehicles.filters.statusOptions.${option}`)}
                    </button>
                  )
                })}
              </div>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <input
                  type="text"
                  value={vehicleSearch}
                  onChange={(event) => setVehicleSearch(event.target.value)}
                  placeholder={t('fleetReporting.vehicles.filters.searchPlaceholder')}
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
                  style={{
                    padding: '1rem 1.2rem',
                    borderRadius: '18px',
                    border: '1px solid rgba(255,255,255,0.35)',
                    background: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '1.1rem' }}>{vehicle.plate}</strong>
                    <span
                      style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.35)',
                        fontSize: '0.75rem',
                        background: 'rgba(0,0,0,0.2)'
                      }}
                    >
                      {t(`fleetReporting.vehicles.filters.typeOptions.${vehicle.type}`)}
                    </span>
                  </div>
                  <span style={{ color: GLASS_SUBTLE }}>{vehicle.location}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ color: GLASS_SUBTLE }}>{t('fleetReporting.vehicles.cards.status')}:</span>
                    <span
                      style={trafficStyle(
                        trafficColorForStatus(t(`fleetReporting.vehicles.statusBadges.${vehicle.status}`)),
                        { minWidth: '120px', height: '30px', fontSize: '0.8rem', fontWeight: 700 }
                      )}
                    >
                      {t(`fleetReporting.vehicles.statusBadges.${vehicle.status}`)}
                    </span>
                  </div>
                  <span style={{ color: GLASS_SUBTLE }}>
                    {t('fleetReporting.vehicles.cards.inspection')}: {vehicle.inspection}
                  </span>
                  <span style={{ color: GLASS_SUBTLE }}>
                    {t('fleetReporting.vehicles.cards.maintenance')}: {vehicle.maintenance}
                  </span>
                  <span style={{ color: GLASS_SUBTLE }}>
                    {t('fleetReporting.vehicles.cards.downtime')}: {vehicle.downtime}d
                  </span>
                  <Button variant="secondary" style={{ marginTop: '0.35rem' }}>
                    {t('fleetReporting.vehicles.cards.open')}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" title={t('fleetReporting.table.title')}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem',
                color: GLASS_TEXT
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: GLASS_SUBTLE }}>{t('fleetReporting.filters.typeLabel')}:</span>
                {DAMAGE_TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setDamageType(option.value)}
                    style={{
                      borderRadius: '999px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      background: damageType === option.value ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      padding: '0.35rem 0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {t(option.labelKey)}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: GLASS_SUBTLE }}>{t('fleetReporting.filters.rangeLabel')}:</span>
                {RANGE_FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRangeFilter(option.value)}
                    style={{
                      borderRadius: '999px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      background: rangeFilter === option.value ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      padding: '0.35rem 0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {t(option.labelKey)}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={searchPlaceholder}
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
              ref={tableScrollRef}
              style={{
                overflowX: 'auto',
                maxWidth: '100%',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '22px',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(0,0,0,0.25)'
              }}
            >
              <table
                style={{
                  width: '100%',
                  minWidth: '1200px',
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                  color: '#ffffff',
                  tableLayout: 'fixed'
                }}
              >
                <thead>
                  <tr>
                    <th style={{ ...tableHeaderCellStyle, width: '120px' }}>
                      {t('fleetReporting.table.columns.date')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '150px' }}>
                      {t('fleetReporting.table.columns.vehicle')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '170px' }}>
                      {t('fleetReporting.table.columns.vin')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '220px' }}>
                      {t('fleetReporting.table.columns.location')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '140px' }}>
                      {t('fleetReporting.table.columns.type')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '150px' }}>
                      {t('fleetReporting.table.columns.coverage')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '150px' }}>
                      {t('fleetReporting.table.columns.status')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '140px', textAlign: 'right' }}>
                      {t('fleetReporting.table.columns.cost')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '160px' }}>
                      {t('fleetReporting.table.columns.ai')}
                    </th>
                    <th style={{ ...tableHeaderCellStyle, width: '220px' }}>
                      {t('fleetReporting.table.columns.note')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.length === 0 ? (
                    <tr>
                      <td style={{ ...tableCellStyle, padding: '1rem', textAlign: 'center' }} colSpan={10}>
                        {lang === 'de' ? 'Keine Einträge gefunden.' : 'No entries found.'}
                      </td>
                    </tr>
                  ) : (
                    filteredClaims.map((row) => (
                      <tr key={row.id}>
                        {renderEditableTextCell(row, 'date', '120px')}
                        {renderEditableTextCell(row, 'vehicle', '150px')}
                        {renderEditableTextCell(row, 'vin', '170px')}
                        {renderEditableTextCell(row, 'route', '220px')}
                        {renderTypeCell(row)}
                        {renderCoverageCell(row)}
                        {renderStatusCell(row)}
                        {renderEditableTextCell(row, 'cost', '140px')}
                        {renderAiCell(row)}
                        {renderEditableTextCell(row, 'note', '220px')}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {showScrollControls && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => handleHorizontalScroll(-320)}
                  disabled={!canScrollLeft}
                  style={{
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.35)',
                    background: 'rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    padding: '0.35rem 0.8rem',
                    cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                    opacity: canScrollLeft ? 1 : 0.5
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => handleHorizontalScroll(320)}
                  disabled={!canScrollRight}
                  style={{
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.35)',
                    background: 'rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    padding: '0.35rem 0.8rem',
                    cursor: canScrollRight ? 'pointer' : 'not-allowed',
                    opacity: canScrollRight ? 1 : 0.5
                  }}
                >
                  ›
                </button>
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>
    </>
  )
}
