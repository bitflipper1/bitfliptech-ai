import { useState } from 'react'
import { capabilities } from '../data/content'
import './CapabilityMap.css'

const CX = 400
const CY = 260
const R = 190

export default function CapabilityMap() {
  const [active, setActive] = useState<number | null>(null)

  const nodes = capabilities.map((label, i) => {
    const angle = (i / capabilities.length) * Math.PI * 2 - Math.PI / 2
    return {
      label,
      x: CX + Math.cos(angle) * R * 1.35,
      y: CY + Math.sin(angle) * R * 0.72,
    }
  })

  return (
    <section id="capabilities" className="section grid-line">
      <div className="section-head">
        <p className="mono">Capabilities map</p>
        <h2>Where the disciplines overlap</h2>
      </div>
      <div className="cap-wrap">
        <svg viewBox="0 0 800 520" role="img" aria-label="Network map of BitFlip capabilities">
          {/* spokes */}
          {nodes.map((n, i) => (
            <line
              key={`spoke-${n.label}`}
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              className={`cap-line ${active === i ? 'cap-line-hot' : ''}`}
            />
          ))}
          {/* ring connections */}
          {nodes.map((n, i) => {
            const next = nodes[(i + 1) % nodes.length]
            return (
              <line
                key={`ring-${n.label}`}
                x1={n.x}
                y1={n.y}
                x2={next.x}
                y2={next.y}
                className={`cap-line cap-line-ring ${
                  active === i || active === (i + 1) % nodes.length ? 'cap-line-hot' : ''
                }`}
              />
            )
          })}
          {/* center node */}
          <g className="cap-center">
            <circle cx={CX} cy={CY} r="62" className="cap-center-ring" />
            <circle cx={CX} cy={CY} r="52" className="cap-center-core" />
            <text x={CX} y={CY - 4} textAnchor="middle" className="cap-center-label">
              human-
            </text>
            <text x={CX} y={CY + 12} textAnchor="middle" className="cap-center-label">
              centered ai
            </text>
          </g>
          {/* satellite nodes */}
          {nodes.map((n, i) => (
            <g
              key={n.label}
              className={`cap-node ${active === i ? 'cap-node-hot' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <circle cx={n.x} cy={n.y} r="7" className="cap-dot" />
              <circle cx={n.x} cy={n.y} r="14" className="cap-pulse" />
              <text
                x={n.x}
                y={n.y + (n.y > CY ? 34 : -24)}
                textAnchor="middle"
                className="cap-label"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}
