import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { runLocal, offlineFallback, type ConsoleLine } from '../console/agent'
import { asset } from '../lib/asset'
import './Console.css'

// Cloudflare Worker (or any endpoint) that proxies the Claude API.
// See worker/console-worker.js. Set at build time; empty = local-only mode.
const CONSOLE_ENDPOINT = (import.meta.env.VITE_CONSOLE_ENDPOINT as string | undefined) ?? ''

const BOOT: ConsoleLine[] = [
  { kind: 'accent', text: 'BITFLIP CONSOLE v1.0' },
  { kind: 'sys', text: 'human-centered ai for complex systems' },
  {
    kind: 'sys',
    text: CONSOLE_ENDPOINT
      ? 'AI core: online.'
      : 'AI core: offline — local protocols active.',
  },
  { kind: 'out', text: `Type 'help' for protocols — or just ask.` },
]

interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

export default function Console() {
  const [open, setOpen] = useState(false)
  const [log, setLog] = useState<ConsoleLine[]>(BOOT)
  const [busy, setBusy] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const chat = useRef<ChatTurn[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // global shortcuts: ⌘K / Ctrl+K toggles, Esc closes, custom event opens
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('bitflip:console', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('bitflip:console', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [log, busy])

  const append = useCallback((lines: ConsoleLine[]) => {
    setLog((l) => [...l, ...lines])
  }, [])

  async function askAi(question: string) {
    chat.current.push({ role: 'user', content: question })
    if (!CONSOLE_ENDPOINT) {
      append(offlineFallback(question))
      return
    }
    setBusy(true)
    try {
      const res = await fetch(CONSOLE_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: chat.current.slice(-10) }),
      })
      if (!res.ok) throw new Error(`endpoint ${res.status}`)
      const data = (await res.json()) as { reply?: string }
      const reply = data.reply ?? 'Core returned nothing.'
      chat.current.push({ role: 'assistant', content: reply })
      append(reply.split('\n').map((text) => ({ kind: 'out' as const, text })))
    } catch {
      append([{ kind: 'err', text: 'AI core unreachable — falling back to local protocols.' }])
      append(offlineFallback(question))
    } finally {
      setBusy(false)
    }
  }

  function submit(value: string) {
    const raw = value.trim()
    if (!raw || busy) return
    setHistory((h) => [raw, ...h])
    setHistIdx(-1)
    append([{ kind: 'user', text: raw }])

    const result = runLocal(raw)
    if (result.clear) {
      setLog(BOOT)
      return
    }
    if (result.lines.length) append(result.lines)
    if (result.navigate) navigate(result.navigate)
    if (result.close) setOpen(false)
    if (result.escalate) void askAi(result.escalate)
  }

  if (!open) return null

  return (
    <div className="console-overlay" role="dialog" aria-modal="true" aria-label="BitFlip console" onClick={() => setOpen(false)}>
      <div className="console" onClick={(e) => e.stopPropagation()}>
        <div className="console-bar">
          <span className="mono">bitflip console</span>
          <span className={`mono console-core ${CONSOLE_ENDPOINT ? 'console-core-on' : ''}`}>
            {CONSOLE_ENDPOINT ? '● ai core online' : '○ local protocols'}
          </span>
          <button className="mono console-x" onClick={() => setOpen(false)}>
            esc ×
          </button>
        </div>
        <div className="console-log" ref={scrollRef} aria-live="polite">
          {log.map((line, i) => (
            <div key={i} className={`cline cline-${line.kind}`}>
              {line.kind === 'user' && <span className="cprompt">guest@bitflip:~$ </span>}
              {line.text}
              {line.tiles && (
                <span className="ctiles">
                  {line.tiles.map((t) => (
                    <button
                      key={t.src}
                      className="ctile"
                      title={t.site}
                      onClick={() => {
                        setOpen(false)
                        navigate(`/archive?q=${encodeURIComponent(t.site.split(' ')[0].toLowerCase())}`)
                      }}
                    >
                      <img src={asset(t.src)} alt={t.site} loading="lazy" />
                    </button>
                  ))}
                </span>
              )}
              {line.links && (
                <span className="clinks">
                  {line.links.map((l) =>
                    l.to.startsWith('mailto:') ? (
                      <a key={l.label} href={l.to}>
                        {l.label}
                      </a>
                    ) : (
                      <button
                        key={l.label}
                        onClick={() => {
                          setOpen(false)
                          navigate(l.to)
                        }}
                      >
                        {l.label}
                      </button>
                    )
                  )}
                </span>
              )}
            </div>
          ))}
          {busy && <div className="cline cline-sys console-busy">thinking…</div>}
        </div>
        <div className="console-input-row">
          <span className="cprompt">guest@bitflip:~$</span>
          <input
            ref={inputRef}
            className="console-input"
            type="text"
            spellCheck={false}
            autoComplete="off"
            aria-label="Console command"
            disabled={busy}
            onKeyDown={(e) => {
              const el = e.currentTarget
              if (e.key === 'Enter') {
                submit(el.value)
                el.value = ''
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                const next = Math.min(histIdx + 1, history.length - 1)
                if (history[next]) {
                  setHistIdx(next)
                  el.value = history[next]
                }
              } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                const next = histIdx - 1
                setHistIdx(next < 0 ? -1 : next)
                el.value = next < 0 ? '' : history[next]
              }
            }}
          />
          <span className="ccaret" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
