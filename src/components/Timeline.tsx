import { useEffect, useMemo, useRef, useState } from 'react'
import { timeline } from '../data/content'
import { archive, type ArchiveItem } from '../data/archive'
import { asset } from '../lib/asset'
import './Timeline.css'

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

// Chips whose names don't textually match their archive entry.
const aliases: Record<string, string> = {
  Sabellis: 'Salon Sabeli',
  'Davidson Sustainability': 'Davidson Food',
}

/** Match a timeline client chip to its best archive screenshot. */
function findShot(client: string): ArchiveItem | undefined {
  const target = norm(aliases[client] ?? client)
  if (target.length < 4) return undefined
  const matches = archive.filter((a) => {
    const s = norm(a.site)
    return s.includes(target) || target.includes(s)
  })
  if (!matches.length) return undefined
  return matches.sort(
    (a, b) =>
      Number(a.cat === 'email') - Number(b.cat === 'email') ||
      a.year - b.year ||
      a.site.length - b.site.length
  )[0]
}

function Chip({ client }: { client: string }) {
  const shot = useMemo(() => findShot(client), [client])
  const [open, setOpen] = useState(false)

  if (!shot) return <li>{client}</li>

  return (
    <li className="chip-has-shot">
      <button
        className="chip-btn"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        aria-label={`${client} — show screenshot`}
      >
        {client}
      </button>
      {open && (
        <span className="chip-pop" role="img" aria-label={`${shot.site}, ${shot.year}`}>
          <img src={asset(shot.src)} alt="" />
          <span className="mono">
            {shot.site} · {shot.year}
          </span>
        </span>
      )}
    </li>
  )
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<Set<number>>(new Set())

  useEffect(() => {
    const nodes = ref.current?.querySelectorAll('.era')
    if (!nodes) return
    const io = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev)
          for (const e of entries) {
            if (e.isIntersecting) next.add(Number((e.target as HTMLElement).dataset.i))
          }
          return next
        })
      },
      { threshold: 0.35 }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section id="timeline" className="section" ref={ref}>
      <div className="section-head">
        <p className="mono">The receipts — hover a client for the actual site</p>
        <h2>2009 → bitfliptech.ai</h2>
      </div>
      <div className="timeline-rail">
        {timeline.map((era, i) => (
          <article
            key={era.years}
            data-i={i}
            className={`era ${visible.has(i) ? 'era-in' : ''} ${
              i === timeline.length - 1 ? 'era-now' : ''
            }`}
          >
            <div className="era-marker" aria-hidden="true" />
            <p className="mono era-years">{era.years}</p>
            <h3>{era.title}</h3>
            <p className="era-blurb">{era.blurb}</p>
            {era.image && (
              <figure className="era-figure">
                <img src={asset(era.image.src)} alt={era.image.alt} loading="lazy" />
                <figcaption className="mono">{era.image.alt}</figcaption>
              </figure>
            )}
            <ul className="era-clients">
              {era.clients.map((c) => (
                <Chip key={c} client={c} />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
