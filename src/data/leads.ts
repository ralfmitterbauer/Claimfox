export type LeadCategory = 'Operator' | 'Platform' | 'Broker'

export type ExposureType = 'Direct' | 'Indirect' | 'Brokered'

export type LeadItem = {
  id: string
  name: string
  category: LeadCategory
  exposureType: ExposureType
  shareDE: number
  shareEU: number
  notes?: {
    de: string
    en: string
  }
}

export const leads: LeadItem[] = [
  {
    id: 'db-schenker',
    name: 'DB Schenker',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.09,
    shareEU: 0.06
  },
  {
    id: 'dsv',
    name: 'DSV',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.06,
    shareEU: 0.09
  },
  {
    id: 'dachser',
    name: 'DACHSER',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.045,
    shareEU: 0.03
  },
  {
    id: 'hellmann',
    name: 'Hellmann',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.025,
    shareEU: 0.02
  },
  {
    id: 'mosolf',
    name: 'MOSOLF',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.015,
    shareEU: 0.018
  },
  {
    id: 'schockemoehle',
    name: 'Schockemöhle',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.012,
    shareEU: 0.01
  },
  {
    id: 'zufall',
    name: 'Zufall Logistik',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.006,
    shareEU: 0.002
  },
  {
    id: 'walther',
    name: 'Walther Logistik',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.004,
    shareEU: 0.002
  },
  {
    id: 'wanning',
    name: 'Wanning Logistik',
    category: 'Operator',
    exposureType: 'Direct',
    shareDE: 0.003,
    shareEU: 0.001
  },
  {
    id: 'transporeon',
    name: 'Transporeon',
    category: 'Platform',
    exposureType: 'Indirect',
    shareDE: 0.08,
    shareEU: 0.1
  },
  {
    id: 'timocom',
    name: 'TIMOCOM',
    category: 'Platform',
    exposureType: 'Indirect',
    shareDE: 0.12,
    shareEU: 0.07
  },
  {
    id: 'nacora',
    name: 'NACORA',
    category: 'Broker',
    exposureType: 'Brokered',
    shareDE: 0.03,
    shareEU: 0.04
  },
  {
    id: 'ggw',
    name: 'GGW Group',
    category: 'Broker',
    exposureType: 'Brokered',
    shareDE: 0.03,
    shareEU: 0.04
  },
  {
    id: 'wecoya',
    name: 'Wecoya',
    category: 'Broker',
    exposureType: 'Brokered',
    shareDE: 0.02,
    shareEU: 0.05
  }
]
