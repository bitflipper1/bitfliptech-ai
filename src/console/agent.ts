import { archive, categories, type ArchiveItem } from '../data/archive'
import { services, process, contact, story } from '../data/content'

export interface ConsoleLine {
  kind: 'sys' | 'user' | 'out' | 'err' | 'accent'
  text?: string
  tiles?: ArchiveItem[]
  links?: { label: string; to: string }[]
}

const CAT_KEYWORDS: Record<string, string[]> = {
  restaurants: ['restaurant', 'bar', 'pizza', 'pub', 'tavern', 'nightlife', 'grill', 'saloon', 'brew'],
  business: ['business', 'law', 'legal', 'professional', 'corporate', 'b2b', 'firm', 'medical', 'healthcare'],
  community: ['church', 'nonprofit', 'non-profit', 'community', 'park', 'charity'],
  leisure: ['marina', 'yacht', 'boat', 'leisure', 'vineyard', 'travel', 'outdoor'],
  product: ['saas', 'product', 'dashboard', 'app', 'platform', 'startup'],
  email: ['email', 'newsletter', 'campaign', 'emailer'],
  brands: ['brand', 'packaging', 'retail'],
}

function searchArchive(query: string): { items: ArchiveItem[]; cat?: string; year?: number; term?: string } {
  const q = query.toLowerCase()
  const yearMatch = q.match(/20[0-2]\d/)
  const year = yearMatch ? Number(yearMatch[0]) : undefined

  let cat: string | undefined
  for (const [key, words] of Object.entries(CAT_KEYWORDS)) {
    if (words.some((w) => q.includes(w))) {
      cat = key
      break
    }
  }

  // client-name term: any token >= 4 chars matching a site name —
  // excluding tokens already consumed as category keywords or the year
  const catWords = new Set(Object.values(CAT_KEYWORDS).flat())
  const tokens = q
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((t) => t.length >= 4 && !catWords.has(t) && t !== String(year))
  let term: string | undefined
  for (const t of tokens) {
    if (archive.some((a) => a.site.toLowerCase().includes(t))) {
      term = t
      break
    }
  }

  if (!cat && !year && !term) return { items: [] }

  const items = archive.filter(
    (a) =>
      (!cat || a.cat === cat) &&
      (!year || a.year === year) &&
      (!term || a.site.toLowerCase().includes(term))
  )
  return { items, cat, year, term }
}

function archiveLink(cat?: string, year?: number, term?: string) {
  const p = new URLSearchParams()
  if (cat) p.set('cat', cat)
  if (year) p.set('year', String(year))
  if (term) p.set('q', term)
  const qs = p.toString()
  return `/archive${qs ? `?${qs}` : ''}`
}

const HELP: ConsoleLine[] = [
  { kind: 'accent', text: 'PROTOCOLS' },
  { kind: 'out', text: '  archive <query>   — e.g. "restaurant sites from 2012", "fuel pizza"' },
  { kind: 'out', text: '  services          — what BitFlip does' },
  { kind: 'out', text: '  process           — how we work' },
  { kind: 'out', text: '  story             — web agency → AI design lab' },
  { kind: 'out', text: '  flips             — the 2026 reinterpretations' },
  { kind: 'out', text: '  strata            — the archive as design archaeology' },
  { kind: 'out', text: '  start project     — draft an inquiry' },
  { kind: 'out', text: '  go <page>         — lab / archive / services / about / contact' },
  { kind: 'out', text: '  clear · exit' },
  { kind: 'out', text: 'Or just ask a question — the AI core handles free-form.' },
]

export interface AgentResult {
  lines: ConsoleLine[]
  navigate?: string
  clear?: boolean
  close?: boolean
  /** Unhandled free-form input to escalate to the AI core */
  escalate?: string
}

export function runLocal(input: string): AgentResult {
  const raw = input.trim()
  const cmd = raw.toLowerCase()

  if (!cmd) return { lines: [] }
  if (cmd === 'clear' || cmd === 'cls') return { lines: [], clear: true }
  if (cmd === 'exit' || cmd === 'quit' || cmd === ':q') return { lines: [], close: true }

  if (cmd === 'help' || cmd === '?' || cmd === 'commands' || cmd === 'man') return { lines: HELP }

  const goMatch = cmd.match(/^(?:go|open|cd)\s+\/?(\w+)/)
  if (goMatch) {
    const page = goMatch[1] === 'home' ? '' : goMatch[1]
    if (['', 'lab', 'archive', 'services', 'about', 'contact'].includes(page)) {
      return {
        lines: [{ kind: 'sys', text: `→ navigating to /${page}` }],
        navigate: `/${page}`,
        close: true,
      }
    }
    return { lines: [{ kind: 'err', text: `no such page: ${page}` }] }
  }

  if (/^services?$|what do you do|what does bitflip do/.test(cmd)) {
    return {
      lines: [
        { kind: 'accent', text: 'SERVICES' },
        ...services.map((s) => ({
          kind: 'out' as const,
          text: `  [${s.tag}] ${s.title} — ${s.blurb}`,
        })),
        { kind: 'out', text: '', links: [{ label: 'full breakdown → /services', to: '/services' }] },
      ],
    }
  }

  if (/^process$|how do you work|how we work/.test(cmd)) {
    return {
      lines: [
        { kind: 'accent', text: 'PROCESS' },
        ...process.map((p, i) => ({
          kind: 'out' as const,
          text: `  0${i + 1} ${p.step} — ${p.blurb}`,
        })),
      ],
    }
  }

  if (/^(story|about|matt|history)$/.test(cmd)) {
    return {
      lines: [
        { kind: 'accent', text: story.eyebrow.toUpperCase() },
        { kind: 'out', text: story.headline },
        { kind: 'out', text: story.intro },
        { kind: 'out', text: '', links: [{ label: 'the receipts → /about', to: '/about' }] },
      ],
    }
  }

  if (/^flips?$|2026|reinterpret/.test(cmd)) {
    const flips = archive.filter((a) => a.flip)
    return {
      lines: [
        { kind: 'accent', text: 'THE FLIP — archive classics, reinterpreted for 2026' },
        { kind: 'out', tiles: flips },
        {
          kind: 'out',
          text: `${flips.length} flips live. Hover the ⟳ 2026 tiles in the archive.`,
          links: [{ label: 'open archive →', to: '/archive' }],
        },
      ],
    }
  }

  if (/^strata$|archaeolog|geolog/.test(cmd)) {
    return {
      lines: [
        { kind: 'accent', text: 'STRATA — 17 years of the web, read like sediment' },
        { kind: 'out', text: 'Newest at the surface. Scroll down to dig.' },
        { kind: 'out', text: '', links: [{ label: 'start digging →', to: '/archive?view=strata' }] },
      ],
      navigate: '/archive?view=strata',
    }
  }

  if (/start (a )?project|inquiry|hire|quote|work with/.test(cmd)) {
    const subject = encodeURIComponent('Project inquiry — via the console')
    const body = encodeURIComponent(
      'Hi Matt,\n\nFound you through the console on bitfliptech.ai.\n\nWhat we need: \nTimeline: \nBudget range: \n\n— '
    )
    return {
      lines: [
        { kind: 'accent', text: 'INQUIRY DRAFTED' },
        { kind: 'out', text: 'To: ' + contact.email },
        { kind: 'out', text: 'Subject: Project inquiry — via the console' },
        { kind: 'out', text: 'Body: what you need, timeline, budget range. We reply fast.' },
        {
          kind: 'out',
          text: '',
          links: [
            { label: '✉ open drafted email', to: `mailto:${contact.email}?subject=${subject}&body=${body}` },
            { label: 'or use the form → /contact', to: '/contact' },
          ],
        },
      ],
    }
  }

  if (/^(contact|email|phone)$/.test(cmd)) {
    return {
      lines: [
        { kind: 'out', text: `email  ${contact.email}` },
        { kind: 'out', text: `phone  ${contact.phone}` },
        { kind: 'out', text: '', links: [{ label: 'contact page →', to: '/contact' }] },
      ],
    }
  }

  // question-shaped free-form input goes to the AI core, not archive matching
  const questionish =
    /^(what|why|how|can|could|should|would|who|when|does|do|is|are|tell|help me|i need|we need)\b/.test(cmd) ||
    cmd.endsWith('?')
  if (questionish && !cmd.startsWith('archive')) return { lines: [], escalate: raw }

  // archive query: explicit "archive ..." or anything matching year/category/client
  const archiveQuery = cmd.startsWith('archive') ? cmd.slice(7).trim() || 'all' : cmd
  const { items, cat, year, term } = searchArchive(archiveQuery)
  if (cmd.startsWith('archive') || items.length > 0) {
    if (items.length === 0) {
      return {
        lines: [
          { kind: 'err', text: 'no specimens matched.' },
          { kind: 'out', text: '', links: [{ label: 'browse the full archive →', to: '/archive' }] },
        ],
      }
    }
    const desc = [
      cat ? categories[cat] : null,
      year ? String(year) : null,
      term ? `“${term}”` : null,
    ]
      .filter(Boolean)
      .join(' · ')
    return {
      lines: [
        { kind: 'accent', text: `ARCHIVE QUERY — ${desc || 'all'} — ${items.length} found` },
        { kind: 'out', tiles: items.slice(0, 6) },
        {
          kind: 'out',
          text: items.length > 6 ? `showing 6 of ${items.length}.` : '',
          links: [{ label: 'open filtered archive →', to: archiveLink(cat, year, term) }],
        },
      ],
    }
  }

  // nothing local matched — escalate to the AI core
  return { lines: [], escalate: raw }
}

/** Offline fallback when no AI endpoint is configured. */
export function offlineFallback(input: string): ConsoleLine[] {
  return [
    { kind: 'err', text: 'AI core: offline — running local protocols only.' },
    {
      kind: 'out',
      text: `That one needs the human. Send it straight to Matt:`,
      links: [
        {
          label: '✉ email this question',
          to: `mailto:${contact.email}?subject=${encodeURIComponent('Question — via the console')}&body=${encodeURIComponent(input)}`,
        },
        { label: 'contact page →', to: '/contact' },
      ],
    },
    { kind: 'out', text: `Try 'help' for what the local core can do.` },
  ]
}
