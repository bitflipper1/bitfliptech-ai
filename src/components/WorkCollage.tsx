import { useRef, type PointerEvent } from 'react'
import './WorkCollage.css'

interface Piece {
  src: string
  label: string
}

// Curated brand history from the Bitflip archive, distributed across
// three drifting columns. Order within a column sets its visual rhythm.
const columns: Piece[][] = [
  [
    { src: '/collage/bitflip2009.jpg', label: 'Bitflip, 2009' },
    { src: '/collage/bitflipwebscreen.jpg', label: 'bitfliptech.com v1' },
    { src: '/collage/bitflip_businesscard-09.jpg', label: 'Business cards' },
    { src: '/collage/bitflipteamny3.jpg', label: 'The team, NYC' },
    { src: '/collage/bitflipwebhowdoit.jpg', label: 'Process page' },
    { src: '/collage/qcbftix.jpg', label: 'QC Beer Fest tickets' },
  ],
  [
    { src: '/collage/bitfliplogo01-01-11.jpg', label: 'Logo, 2011' },
    { src: '/collage/bitflip_dillgrille_home.jpg', label: 'Dilworth Grille' },
    { src: '/collage/bitflipcar.jpg', label: 'The Bitflip car' },
    { src: '/collage/bitflipweb2.jpg', label: 'Site redesign' },
    { src: '/collage/bitflipusbflashdrive_custom_.jpg', label: 'Swag: USB drives' },
    { src: '/collage/thedaybitflipwasking.jpg', label: 'The day Bitflip was king' },
  ],
  [
    { src: '/collage/bitflipsign021111.jpg', label: 'Office sign, 2011' },
    { src: '/collage/bitflipweblatestwork.jpg', label: 'Latest work grid' },
    { src: '/collage/bitflipteamxmas.jpg', label: 'Team holiday card' },
    { src: '/collage/toolgraphicbitflip.jpg', label: 'Tool graphics' },
    { src: '/collage/bitflip_businesscard-14.jpg', label: 'Card exploration' },
    { src: '/collage/bitflip_holidaycard_front_final.jpg', label: 'Holiday card' },
  ],
]

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
    <section className="collage" onPointerMove={onMove} aria-label="Archive of Bitflip work over 17 years">
      <div className="collage-head">
        <p className="mono">The archive</p>
        <h2>17 years, one wall</h2>
      </div>
      <div className="collage-stage">
        <div className="collage-wall" ref={wall}>
          {columns.map((col, i) => (
            <div key={i} className={`collage-col collage-col-${i}`}>
              {/* content duplicated for a seamless loop */}
              {[...col, ...col].map((p, j) => (
                <figure key={`${p.src}-${j}`} className="collage-item" aria-hidden={j >= col.length}>
                  <img src={p.src} alt={j < col.length ? p.label : ''} loading="lazy" />
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
