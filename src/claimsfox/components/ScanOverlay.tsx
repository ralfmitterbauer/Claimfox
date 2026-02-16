type ScanOverlayProps = {
  isScanning: boolean
  phaseIndex: number
}

export default function ScanOverlay({ isScanning, phaseIndex }: ScanOverlayProps) {
  if (!isScanning) return null
  const beamClass = phaseIndex < 3 ? 'fnol-scan-overlay__beam is-down' : 'fnol-scan-overlay__beam is-up'

  return (
    <div className="fnol-scan-overlay">
      <div className="fnol-scan-overlay__glass" />
      <div className="fnol-scan-overlay__vignette" />
      <div className="fnol-scan-overlay__noise" />
      <div className="fnol-scan-overlay__accent" />
      <div className={beamClass} />
      <div className="fnol-scan-overlay__focus" />
    </div>
  )
}
