import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { archive, categories, type ArchiveItem } from '../data/archive'
import { asset } from '../lib/asset'
import Strata from '../components/Strata'
import './ArchivePage.css'

const PAGE = 24

export default function ArchivePage() {
  const [cat, setCat] = useState<string>('all')
  const [count, setCount] = useState(PAGE)
  const [lightbox, setLightbox] = useState<ArchiveItem | null>(null)
  const [showFlip, setShowFlip] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)
  const [params, setParams] = useSearchParams()
  const strataMode = params.get('view') === 'strata'

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
          <h2>{strataMode ? 'Design archaeology' : 'Every pixel we shipped'}</h2>
          {!strataMode && (
            <p className="arc-flip-note">
              Tiles marked <span className="mono arc-flip-mark">⟳ 2026</span> carry a Flip —
              hover to see what BitFlip would ship for that client today.
            </p>
          )}
          {strataMode && (
            <p className="arc-flip-note">
              Seventeen years of the web, read like sediment — every era annotated, every
              specimen shipped by BitFlip.
            </p>
          )}
          <div className="arc-modes" role="group" aria-label="Archive view mode">
            <button
              className={`arc-chip ${!strataMode ? 'arc-chip-on' : ''}`}
              onClick={() => setParams({})}
            >
              ⊞ Grid
            </button>
            <button
              className={`arc-chip ${strataMode ? 'arc-chip-on' : ''}`}
              onClick={() => setParams({ view: 'strata' })}
            >
              ≣ Strata
            </button>
          </div>
        </div>

        {strataMode && (
          <Strata
            onOpen={(item) => {
              setShowFlip(false)
              setLightbox(item)
            }}
          />
        )}

        {!strataMode && (
        <>


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
              className={`arc-tile ${item.flip ? 'arc-tile-flippable' : ''}`}
              onClick={() => {
                setShowFlip(false)
                setLightbox(item)
              }}
              aria-label={`${item.site}, ${item.year}${item.flip ? ' — has 2026 flip' : ''}`}
            >
              {item.flip ? (
                <span className="flip-inner">
                  <span className="flip-face">
                    <img src={asset(item.src)} alt={item.site} loading="lazy" decoding="async" />
                  </span>
                  <span className="flip-face flip-back">
                    <img src={asset(item.flip)} alt={`${item.site}, 2026 flip`} loading="lazy" decoding="async" />
                    <span className="mono flip-back-tag">{item.site} · 2026 flip</span>
                  </span>
                </span>
              ) : (
                <img src={asset(item.src)} alt={item.site} loading="lazy" decoding="async" />
              )}
              <span className="arc-meta">
                <span className="arc-site">{item.site}</span>
                <span className="mono arc-year">{item.year}</span>
              </span>
              {item.flip && <span className="mono arc-flip-badge">⟳ 2026</span>}
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
        </>
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
            <img
              src={asset(showFlip && lightbox.flip ? lightbox.flip : lightbox.src)}
              alt={showFlip ? `${lightbox.site}, 2026 flip` : lightbox.site}
            />
            <figcaption>
              <span>{lightbox.site}</span>
              <span className="mono">
                {showFlip && lightbox.flip
                  ? '2026 flip — AI-era concept by bitfliptech.ai'
                  : `${categories[lightbox.cat]} · ${lightbox.year}`}
              </span>
            </figcaption>
            {lightbox.flip && (
              <button className="btn btn-solid arc-flip-toggle" onClick={() => setShowFlip((f) => !f)}>
                {showFlip ? `⟲ back to ${lightbox.year}` : '⟳ see the 2026 flip'}
              </button>
            )}
            <button className="arc-close mono" onClick={() => setLightbox(null)}>
              esc / close ×
            </button>
          </figure>
        </div>
      )}
    </main>
  )
}
