type ScanStageKey = 'normalize' | 'detectVehicle' | 'localizeDamage' | 'score' | 'estimate' | 'fraud'

type ScanHudProps = {
  activeStage: ScanStageKey | null
  completed: ScanStageKey[]
  logLine: string
}

type StageRow = {
  key: ScanStageKey
  title: string
}

const STAGES: StageRow[] = [
  { key: 'normalize', title: 'Frame normalization' },
  { key: 'detectVehicle', title: 'Vehicle detection' },
  { key: 'localizeDamage', title: 'Damage localization' },
  { key: 'score', title: 'Severity scoring' },
  { key: 'estimate', title: 'Cost estimation' },
  { key: 'fraud', title: 'Fraud pattern screening' }
]

export default function ScanHud({ activeStage, completed, logLine }: ScanHudProps) {
  return (
    <aside className="fnol-scan-hud">
      <div className="fnol-scan-hud__title">AI Pipeline</div>
      <div className="fnol-scan-hud__stages">
        {STAGES.map((stage) => {
          const isDone = completed.includes(stage.key)
          const isActive = stage.key === activeStage
          return (
            <div key={stage.key} className="fnol-scan-hud__stage">
              <span className={`fnol-scan-hud__dot${isDone ? ' is-done' : ''}${isActive ? ' is-active' : ''}`} aria-hidden>
                {isDone ? '✓' : isActive ? '◌' : ''}
              </span>
              <span className="fnol-scan-hud__label">{stage.title}</span>
            </div>
          )
        })}
      </div>
      <div className="fnol-scan-hud__log">{logLine}</div>
    </aside>
  )
}
