export const hero = {
  eyebrow: 'bitfliptech.ai — human-centered ai for complex systems',
  headline: ['Flip the interface.', 'Change the system.'],
  sub: 'BitFlipTech designs intelligent interfaces, automation prototypes, design systems, and human-centered AI experiences for complex industrial, healthcare, defense, and enterprise workflows.',
  ctaPrimary: { label: 'Start a project', href: '#contact' },
  ctaSecondary: { label: 'See prototypes', href: '#lab' },
}

export const services = [
  {
    tag: '01',
    title: 'AI Product Strategy',
    blurb: 'Turn fuzzy AI ideas into usable workflows, prototypes, and product direction.',
  },
  {
    tag: '02',
    title: 'UX for Complex Systems',
    blurb:
      'Dashboards, command centers, industrial tools, safety interfaces, and data-heavy apps.',
  },
  {
    tag: '03',
    title: 'Design Systems + Accessibility',
    blurb:
      'Scalable components, WCAG-minded patterns, and systems that help teams move faster.',
  },
  {
    tag: '04',
    title: 'Agentic Automation Prototypes',
    blurb: 'AI assistants, workflow copilots, internal tools, and proof-of-concepts.',
  },
]

export const lab = [
  {
    title: 'AI Job Automation Tool',
    tag: 'agentic workflow',
    blurb: 'An agent pipeline that turns repetitive job tasks into supervised automations.',
  },
  {
    title: 'Industrial Safety Copilot',
    tag: 'safety-critical ux',
    blurb: 'An AI assistant concept for high-risk environments where confusion costs lives.',
  },
  {
    title: 'Command + Control Interface',
    tag: 'command center',
    blurb: 'Operational awareness concepts: maps, feeds, alerts, and decision support.',
  },
  {
    title: 'Real Estate Buyer Guide',
    tag: 'consumer ai',
    blurb: 'A conversational prototype that walks buyers through complex decisions.',
  },
  {
    title: 'Accessibility Pattern Library',
    tag: 'design system',
    blurb: 'WCAG-minded components, focus states, and reduced-motion patterns that ship.',
  },
  {
    title: 'Sensor Dashboard Concepts',
    tag: 'data visualization',
    blurb: 'Live telemetry, anomaly surfacing, and dense data made legible.',
  },
]

export const capabilities = [
  'UX Design',
  'AI Prototyping',
  'Automation',
  'Design Systems',
  'Data Visualization',
  'Accessibility',
]

export const story = {
  eyebrow: 'From web agency to AI design lab',
  headline: 'BitFlip started with websites. Now it builds intelligent digital systems.',
  intro:
    'Seventeen years of shipping real products for real businesses — agency founder, enterprise UX leader at Honeywell, now AI-first designer. The craft compounds: design for the user, respect the system, earn the trust.',
}

export interface TimelineEra {
  years: string
  title: string
  blurb: string
  clients: string[]
}

export const timeline: TimelineEra[] = [
  {
    years: '2009–2011',
    title: 'The First Flip',
    blurb:
      'Hand-coded sites for Charlotte businesses — restaurants, venues, and local legends. Every pixel earned.',
    clients: [
      'icatchbiz',
      'Fitzgeralds',
      'Whisky River',
      'Buckhead Saloon',
      'Charlotte Restaurant Week',
      'Comedy Zone',
    ],
  },
  {
    years: '2012–2014',
    title: 'The Hospitality Years',
    blurb:
      "Charlotte's dining and nightlife scene came online, and BitFlip built the front door — brands, menus, bookings, buzz.",
    clients: [
      'Dick Stevens',
      'Duckworth Grill & Taphouse',
      'Dillinger Taproom',
      'DeRhodes Construction',
      'goodmortgage.com',
      'Hickory Tavern',
    ],
  },
  {
    years: '2015–2017',
    title: 'Scaling the Craft',
    blurb:
      'Bigger brands, bigger systems. Multi-location groups and franchises that needed design to work as hard as they did.',
    clients: ['FUEL Pizza', 'Lenox Salons', 'Hospitality Furniture Group', 'T1Visions'],
  },
  {
    years: '2018–2020',
    title: 'BitFlip Goes Product',
    blurb:
      'From websites to products — UX research, SaaS dashboards, and data-heavy platforms under the Bitflip banner.',
    clients: [
      'ecomDash',
      'Neighboring Concepts',
      'Morris International',
      'RepRevive',
      'Randall Reilly / RigDig',
      'Carolina BioOncology',
    ],
  },
  {
    years: '2021–2024',
    title: 'Enterprise Systems',
    blurb:
      'UX leadership inside complex industry — industrial workflows, safety-critical screens, design systems at scale.',
    clients: ['Honeywell UX', 'Design systems', 'Design-to-code pipelines', 'CPCC teaching'],
  },
  {
    years: '2025 →',
    title: 'bitfliptech.ai',
    blurb:
      'The AI design lab. Human-centered AI for complex systems — prototyped fast, designed for trust, built to ship.',
    clients: ['You, next.'],
  },
]

export const process = [
  {
    step: 'Decode the system',
    blurb: 'Understand users, workflows, constraints, risks, and messy edge cases.',
  },
  {
    step: 'Prototype the future',
    blurb: 'Use AI, Figma, code, and rapid concepting to make the idea tangible.',
  },
  {
    step: 'Design for trust',
    blurb: 'Make the interface usable, explainable, accessible, and safe.',
  },
  {
    step: 'Ship the signal',
    blurb: 'Create the visual system, interaction model, content, and launch path.',
  },
]

export const contact = {
  headline: 'Need an AI-first UX partner?',
  sub: "Let's design something that makes complex work feel simple.",
  phone: '704-293-5049',
  email: 'mattmcg@bitfliptech.com',
  bookSubject: 'Working session — bitfliptech.ai',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mattmcglothlin' },
    { label: 'X', href: 'https://x.com/bitfliptech' },
    { label: 'Instagram', href: 'https://www.instagram.com/bitfliptech' },
  ],
}
