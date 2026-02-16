import { useEffect, useRef, useState } from 'react'

type AnimatedNumberProps = {
  value: number
  durationMs?: number
  formatter?: (value: number) => string
}

export default function AnimatedNumber({ value, durationMs = 700, formatter }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) return
    const start = performance.now()
    let frameId = 0

    function step(timestamp: number) {
      const elapsed = Math.min(1, (timestamp - start) / durationMs)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      const next = from + (to - from) * eased
      setDisplay(next)
      if (elapsed < 1) {
        frameId = window.requestAnimationFrame(step)
      } else {
        fromRef.current = to
      }
    }

    frameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frameId)
  }, [value, durationMs])

  if (formatter) return <>{formatter(display)}</>
  return <>{Math.round(display)}</>
}
