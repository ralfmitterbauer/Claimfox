type ScanStageKey = 'normalize' | 'detectVehicle' | 'localizeDamage' | 'score' | 'estimate' | 'fraud'

type ScanHudProps = {
  title: string
  activeStage: ScanStageKey | null
  completed: ScanStageKey[]
  logLine: string
  stages: Array<{ key: ScanStageKey; title: string }>
}

export default function ScanHud({ title, activeStage, completed, logLine, stages }: ScanHudProps) {
  return (
    <aside className="fnol-scan-hud">
      <div className="fnol-scan-hud__title">{title}</div>
      <div className="fnol-scan-hud__stages">
        {stages.map((stage) => {
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
