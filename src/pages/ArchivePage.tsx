import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { archive, categories, type ArchiveItem } from '../data/archive'
import { asset } from '../lib/asset'
import './ArchivePage.css'

const PAGE = 24

export default function ArchivePage() {
  const [cat, setCat] = useState<string>('all')
  const [count, setCount] = useState(PAGE)
  const [lightbox, setLightbox] = useState<ArchiveItem | null>(null)
  const sentinel = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => (cat === 'all' ? archive : archive.filter((i) => i.cat === cat)),
    [cat]
  )
  const shown = filtered.slice(0, count)

  const pick = useCallback((next: string) => {
    setCat(next)
    setCount(PAGE)
  }, [])

  // infinite scroll: reveal the next page when the sentinel nears the viewport.
  // IntersectionObserver plus a scroll/resize fallback for environments where
  // IO callbacks are throttled (background/embedded surfaces).
  useEffect(() => {
    const more = () => {
      const el = sentinel.current
      if (!el) return
      if (el.getBoundingClientRect().top < window.innerHeight + 600) {
        setCount((c) => Math.min(c + PAGE, filtered.length))
      }
    }
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && more(),
      { rootMargin: '600px' }
    )
    if (sentinel.current) io.observe(sentinel.current)
    window.addEventListener('scroll', more, { passive: true })
    window.addEventListener('resize', more)
    more()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', more)
      window.removeEventListener('resize', more)
    }
  }, [filtered.length])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <main className="page-top">
      <section className="section">
        <div className="section-head">
          <p className="mono">The full archive — {archive.length} shots, 2009 → now</p>
          <h2>Every pixel we shipped</h2>
        </div>

        <div className="arc-filters" role="group" aria-label="Filter archive by category">
          <button
            className={`arc-chip ${cat === 'all' ? 'arc-chip-on' : ''}`}
            onClick={() => pick('all')}
          >
            All ({archive.length})
          </button>
          {Object.entries(categories).map(([key, label]) => {
            const n = archive.filter((i) => i.cat === key).length
            if (!n) return null
            return (
              <button
                key={key}
                className={`arc-chip ${cat === key ? 'arc-chip-on' : ''}`}
                onClick={() => pick(key)}
              >
                {label} ({n})
              </button>
            )
          })}
        </div>

        <div className="arc-grid">
          {shown.map((item) => (
            <button
              key={item.src}
              className="arc-tile"
              onClick={() => setLightbox(item)}
              aria-label={`${item.site}, ${item.year}`}
            >
              <img src={asset(item.src)} alt={item.site} loading="lazy" decoding="async" />
              <span className="arc-meta">
                <span className="arc-site">{item.site}</span>
                <span className="mono arc-year">{item.year}</span>
              </span>
            </button>
          ))}
        </div>

        {shown.length < filtered.length && (
          <div ref={sentinel} className="arc-sentinel mono" aria-hidden="true">
            loading more…
          </div>
        )}
        {shown.length >= filtered.length && (
          <p className="arc-end mono">end of archive — {filtered.length} shots</p>
        )}
      </section>

      {lightbox && (
        <div
          className="arc-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.site}
          onClick={() => setLightbox(null)}
        >
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={asset(lightbox.src)} alt={lightbox.site} />
            <figcaption>
              <span>{lightbox.site}</span>
              <span className="mono">
                {categories[lightbox.cat]} · {lightbox.year}
              </span>
            </figcaption>
            <button className="arc-close mono" onClick={() => setLightbox(null)}>
              esc / close ×
            </button>
          </figure>
        </div>
      )}
    </main>
  )
}
