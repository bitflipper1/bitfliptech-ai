import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './SensorSim.css'

const TICK_MS = 300
const WINDOW = 70 // samples kept per channel

interface ChannelDef {
  key: string
  label: string
  unit: string
  base: number
  noise: number
  band: [number, number]
  decimals: number
}

const CHANNELS: ChannelDef[] = [
  { key: 'temp', label: 'TEMP · reactor jacket', unit: '°C', base: 72, noise: 0.5, band: [69, 75], decimals: 1 },
  { key: 'vib', label: 'VIB · pump P-101', unit: 'mm/s', base: 2.8, noise: 0.22, band: [2.0, 3.6], decimals: 2 },
  { key: 'press', label: 'PRESS · steam header', unit: 'kPa', base: 410, noise: 3.5, band: [396, 424], decimals: 0 },
  { key: 'flow', label: 'FLOW · coolant loop', unit: 'L/min', base: 118, noise: 2.0, band: [110, 126], decimals: 0 },
]

interface Anomaly {
  channel: string
  start: number
  duration: number
  kind: 'ramp' | 'spike' | 'dropout'
}

interface LogEntry {
  t: string
  text: string
  kind: 'info' | 'good' | 'bad'
}

interface Score {
  caught: number
  missed: number
  false: number
  latencies: number[]
}

const stamp = (start: number) => {
  const s = Math.floor((Date.now() - start) / 1000)
  return `T+${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
}

export default function SensorSim() {
  const [buffers, setBuffers] = useState<Record<string, number[]>>(() =>
    Object.fromEntries(CHANNELS.map((c) => [c.key, [c.base]]))
  )
  const [log, setLog] = useState<LogEntry[]>([
    { t: 'T+00:00', text: 'telemetry link up · 4 channels · watch the bands, flag what drifts', kind: 'info' },
  ])
  const [score, setScore] = useState<Score>({ caught: 0, missed: 0, false: 0, latencies: [] })
  const anomaly = useRef<Anomaly | null>(null)
  const nextAt = useRef(Date.now() + 5000 + Math.random() * 5000)
  const startRef = useRef(Date.now())
  const [, forceTick] = useState(0)

  const addLog = (text: string, kind: LogEntry['kind']) =>
    setLog((l) => [...l.slice(-40), { t: stamp(startRef.current), text, kind }])

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now()

      // schedule / expire anomalies
      if (!anomaly.current && now >= nextAt.current) {
        const ch = CHANNELS[Math.floor(Math.random() * CHANNELS.length)]
        const kinds: Anomaly['kind'][] = ch.key === 'flow' ? ['dropout', 'ramp'] : ['ramp', 'spike']
        anomaly.current = {
          channel: ch.key,
          start: now,
          duration: 8000 + Math.random() * 5000,
          kind: kinds[Math.floor(Math.random() * kinds.length)],
        }
      }
      if (anomaly.current && now - anomaly.current.start > anomaly.current.duration) {
        const ch = CHANNELS.find((c) => c.key === anomaly.current!.channel)!
        addLog(`${ch.label} — anomaly cleared UNFLAGGED. Missed.`, 'bad')
        setScore((s) => ({ ...s, missed: s.missed + 1 }))
        anomaly.current = null
        nextAt.current = now + 6000 + Math.random() * 9000
      }

      setBuffers((prev) => {
        const next: Record<string, number[]> = {}
        for (const ch of CHANNELS) {
          let v = ch.base + gauss() * ch.noise
          const a = anomaly.current
          if (a && a.channel === ch.key) {
            const p = Math.min((now - a.start) / 3000, 1) // ramps in over 3s
            const span = ch.band[1] - ch.band[0]
            if (a.kind === 'ramp') v += p * span * 0.8
            if (a.kind === 'dropout') v -= p * span * 0.9
            if (a.kind === 'spike') v += (Math.random() < 0.45 ? 1 : 0.15) * p * span * 0.9
          }
          const buf = [...(prev[ch.key] ?? []), v]
          next[ch.key] = buf.slice(-WINDOW)
        }
        return next
      })
      forceTick((n) => n + 1)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  function flag(ch: ChannelDef) {
    const a = anomaly.current
    if (a && a.channel === ch.key) {
      const latency = (Date.now() - a.start) / 1000
      addLog(`${ch.label} — FLAGGED. Caught in ${latency.toFixed(1)}s. Returning to baseline.`, 'good')
      setScore((s) => ({ ...s, caught: s.caught + 1, latencies: [...s.latencies, latency] }))
      anomaly.current = null
      nextAt.current = Date.now() + 6000 + Math.random() * 9000
    } else {
      addLog(`${ch.label} — flagged, but channel is nominal. False positive.`, 'bad')
      setScore((s) => ({ ...s, false: s.false + 1 }))
    }
  }

  function reset() {
    setScore({ caught: 0, missed: 0, false: 0, latencies: [] })
    setLog([{ t: 'T+00:00', text: 'session reset · telemetry link up', kind: 'info' }])
    startRef.current = Date.now()
    anomaly.current = null
    nextAt.current = Date.now() + 5000 + Math.random() * 5000
  }

  const meanLatency = score.latencies.length
    ? (score.latencies.reduce((a, b) => a + b, 0) / score.latencies.length).toFixed(1)
    : '—'

  return (
    <main className="page-top sim">
      <section className="section">
        <div className="sim-head">
          <div>
            <p className="mono">
              <Link to="/lab" className="sim-back">← lab</Link> · live simulation
            </p>
            <h2>Sensor Dashboard</h2>
            <p className="sim-sub">
              Simulated plant telemetry. One channel at a time will drift out of band —
              <b> click FLAG on the misbehaving channel</b> before the anomaly clears itself.
              Flag a healthy channel and it counts against you.
            </p>
          </div>
          <div className="sim-score mono" aria-live="polite">
            <span>caught <b className="good">{score.caught}</b></span>
            <span>missed <b className="bad">{score.missed}</b></span>
            <span>false <b className="bad">{score.false}</b></span>
            <span>mean detect <b>{meanLatency}s</b></span>
            <button className="mono sim-reset" onClick={reset}>reset</button>
          </div>
        </div>

        <div className="sensor-grid">
          {CHANNELS.map((ch) => {
            const buf = buffers[ch.key] ?? []
            const cur = buf[buf.length - 1] ?? ch.base
            const lo = Math.min(ch.band[0] - (ch.band[1] - ch.band[0]) * 0.6, ...buf)
            const hi = Math.max(ch.band[1] + (ch.band[1] - ch.band[0]) * 0.6, ...buf)
            const y = (v: number) => 64 - ((v - lo) / (hi - lo)) * 64
            const pts = buf.map((v, i) => `${(i / (WINDOW - 1)) * 240},${y(v).toFixed(1)}`).join(' ')
            const outOfBand = cur > ch.band[1] || cur < ch.band[0]
            return (
              <div key={ch.key} className={`sensor-card ${outOfBand ? 'sensor-alarm' : ''}`}>
                <div className="sensor-top">
                  <span className="mono sensor-label">{ch.label}</span>
                  <span className={`mono sensor-value ${outOfBand ? 'bad' : ''}`}>
                    {cur.toFixed(ch.decimals)} <small>{ch.unit}</small>
                  </span>
                </div>
                <svg viewBox="0 0 240 64" className="sensor-chart" aria-hidden="true">
                  <rect
                    x="0"
                    y={y(ch.band[1])}
                    width="240"
                    height={Math.max(y(ch.band[0]) - y(ch.band[1]), 0)}
                    className="sensor-band"
                  />
                  <polyline points={pts} className="sensor-line" />
                </svg>
                <button className="mono sensor-flag" onClick={() => flag(ch)}>
                  ⚑ flag anomaly
                </button>
              </div>
            )
          })}
        </div>

        <div className="sim-log" role="log" aria-label="Event log">
          {log.slice(-9).map((e, i) => (
            <p key={`${e.t}-${i}`} className={`mono sim-log-line sim-log-${e.kind}`}>
              <span>{e.t}</span> {e.text}
            </p>
          ))}
        </div>

        <p className="sim-fine">
          What this demonstrates: alarm thresholds with persistence (no flicker), trend-first
          legibility, operator-in-the-loop acknowledgment, and honest scoring of attention —
          the bones of every control-room screen we design.{' '}
          <Link to="/contact">Need one for real telemetry? →</Link>
        </p>
      </section>
    </main>
  )
}
