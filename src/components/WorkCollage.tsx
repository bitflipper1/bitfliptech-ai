import { useRef, type PointerEvent } from 'react'
import { sites, type CollageSite } from '../data/collageSites'
import { asset } from '../lib/asset'
import './WorkCollage.css'

const COLUMNS = 6

// Round-robin so neighboring columns get different clients and rhythms.
const columns: CollageSite[][] = Array.from({ length: COLUMNS }, () => [])
sites.forEach((s, i) => columns[i % COLUMNS].push(s))

export default function WorkCollage() {
  const wall = useRef<HTMLDivElement>(null)

  function onMove(e: PointerEvent<HTMLElement>) {
    const el = wall.current
    if (!el) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--tilt-x', `${12 - y * 6}deg`)
    el.style.setProperty('--tilt-y', `${x * 8}deg`)
  }

  return (
    <section
      className="collage"
      onPointerMove={onMove}
      aria-label={`Archive of ${sites.length} sites shipped by Bitflip`}
    >
      <div className="collage-head">
        <p className="mono">The archive — every site we shipped</p>
        <h2>{sites.length} sites, one wall</h2>
      </div>
      <div className="collage-stage">
        <div className="collage-wall" ref={wall}>
          {columns.map((col, i) => (
            <div key={i} className={`collage-col collage-col-${i}`}>
              {/* content duplicated for a seamless loop */}
              {[...col, ...col].map((p, j) => (
                <figure
                  key={`${p.src}-${j}`}
                  className="collage-item"
                  aria-hidden={j >= col.length}
                >
                  <img src={asset(p.src)} alt={j < col.length ? p.label : ''} decoding="async" />
                  <figcaption className="mono">{p.label}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
        <div className="collage-fade" aria-hidden="true" />
      </div>
    </section>
  )
}
