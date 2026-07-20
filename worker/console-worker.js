/**
 * BitFlip Console — AI core.
 *
 * Cloudflare Worker that proxies the site console to the Claude API so the
 * key never ships to the browser.
 *
 * Deploy (one time, ~10 minutes):
 *   1. npm i -g wrangler && wrangler login
 *   2. cd worker && wrangler deploy console-worker.js --name bitflip-console
 *   3. wrangler secret put ANTHROPIC_API_KEY   (paste your key from console.anthropic.com)
 *   4. Set the worker URL as repo variable CONSOLE_ENDPOINT
 *      (GitHub → Settings → Variables → Actions), redeploy the site.
 *
 * Cost control: max_tokens is capped, history is clamped to 10 turns, and
 * requests are limited per IP per hour via a simple in-memory bucket
 * (resets on worker restart — good enough as a first line; add Turnstile
 * or KV-backed limits if traffic grows).
 */

const MODEL = 'claude-sonnet-5' // swap to 'claude-haiku-4-5-20251001' for lower cost
const MAX_TOKENS = 700
const PER_IP_PER_HOUR = 20

const SYSTEM = `You are the BitFlip Console — the on-site agent for bitfliptech.ai,
the studio of Matt McGlothlin: 17 years shipping web and product work
(2009 web agency in Charlotte → enterprise UX leadership at Honeywell →
AI-first design lab). Positioning: human-centered AI for complex systems.

Services: AI Product Strategy; UX for Complex Systems (dashboards, command
centers, industrial tools, safety interfaces); Design Systems + Accessibility
(WCAG-minded); Agentic Automation Prototypes.
Process: Decode the system → Prototype the future → Design for trust → Ship the signal.
History: 178-shot archive of shipped sites 2009–now (restaurants and nightlife,
professional services, community, marine, SaaS). The site's Archive page has a
Strata (design-archaeology) mode and "Flip" reinterpretations of old work.

Voice: terse, opinionated, technically grounded — a senior designer at a
terminal, not a marketing bot. Confident but honest about tradeoffs and risk,
especially for safety-critical work. Short paragraphs. No emoji, no hype words.

When asked what BitFlip would build for a specific problem, give a scoped,
concrete answer: the workflow you'd decode first, the riskiest interface
decision, what you'd prototype in week one. Draw on industrial/enterprise
thinking where relevant.

Always end by offering next steps: email mattmcg@bitfliptech.com, or the
/contact page. If the visitor seems ready, draft a short project inquiry
they can copy. Never invent case-study details beyond what is listed here;
if you don't know, say so and point to the human.`

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
}

const buckets = new Map()

function limited(ip) {
  const now = Date.now()
  const b = buckets.get(ip) ?? { n: 0, reset: now + 3600_000 }
  if (now > b.reset) {
    b.n = 0
    b.reset = now + 3600_000
  }
  b.n++
  buckets.set(ip, b)
  return b.n > PER_IP_PER_HOUR
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS })
    if (request.method !== 'POST')
      return new Response('POST only', { status: 405, headers: CORS })

    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
    if (limited(ip))
      return Response.json(
        { reply: 'Rate limit reached — the console cools down after 20 questions an hour. Email mattmcg@bitfliptech.com instead.' },
        { headers: CORS }
      )

    let messages
    try {
      const body = await request.json()
      messages = (body.messages ?? [])
        .slice(-10)
        .map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: String(m.content ?? '').slice(0, 2000),
        }))
        .filter((m) => m.content)
    } catch {
      return Response.json({ reply: 'Bad request.' }, { status: 400, headers: CORS })
    }
    if (!messages.length)
      return Response.json({ reply: 'Empty transmission.' }, { status: 400, headers: CORS })

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system: SYSTEM, messages }),
    })

    if (!res.ok)
      return Response.json(
        { reply: 'AI core fault. Try again, or email mattmcg@bitfliptech.com.' },
        { headers: CORS }
      )

    const data = await res.json()
    const reply = (data.content ?? [])
      .map((b) => b.text ?? '')
      .join('')
      .trim()
    return Response.json({ reply: reply || 'Core returned nothing.' }, { headers: CORS })
  },
}
