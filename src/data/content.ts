export const hero = {
  eyebrow: 'bitfliptech.ai — human-centered ai for complex systems',
  headline: ['Flip the interface.', 'Change the system.'],
  sub: 'BitFlipTech designs intelligent interfaces, automation prototypes, design systems, and human-centered AI experiences for complex industrial, healthcare, defense, and enterprise workflows.',
  ctaPrimary: { label: 'Start a project', href: '/contact' },
  ctaSecondary: { label: 'See prototypes', href: '/lab' },
}

export const services = [
  {
    tag: '01',
    title: 'AI Product Strategy',
    blurb: 'Turn fuzzy AI ideas into usable workflows, prototypes, and product direction.',
    details: [
      'AI opportunity mapping against real user workflows',
      'Concept sprints: from whiteboard to clickable in days',
      'Build / buy / fine-tune guidance grounded in UX',
      'Roadmaps that survive contact with engineering',
    ],
  },
  {
    tag: '02',
    title: 'UX for Complex Systems',
    blurb:
      'Dashboards, command centers, industrial tools, safety interfaces, and data-heavy apps.',
    details: [
      'Information architecture for dense, high-stakes data',
      'Alarm, alert, and escalation design that respects attention',
      'Operator research: shadowing real users in real conditions',
      'Interfaces tested against failure modes, not happy paths',
    ],
  },
  {
    tag: '03',
    title: 'Design Systems + Accessibility',
    blurb:
      'Scalable components, WCAG-minded patterns, and systems that help teams move faster.',
    details: [
      'Token-based systems that scale across products',
      'WCAG 2.1 AA audits and remediation patterns',
      'Reduced-motion, keyboard, and screen-reader coverage',
      'Documentation engineers actually use',
    ],
  },
  {
    tag: '04',
    title: 'Agentic Automation Prototypes',
    blurb: 'AI assistants, workflow copilots, internal tools, and proof-of-concepts.',
    details: [
      'Working agent prototypes, not slideware',
      'Human-in-the-loop patterns: review, approve, override',
      'Copilots embedded in existing tools and workflows',
      'Honest evaluation: where agents help, where they fail',
    ],
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
  teaching:
    'Along the way: teaching design at CPCC, leading design systems inside complex industry, and building the design-to-code pipelines that now power the lab.',
}

export interface TimelineEra {
  years: string
  title: string
  blurb: string
  clients: string[]
  image?: { src: string; alt: string }
}

export const timeline: TimelineEra[] = [
  {
    years: '2009',
    title: 'The First Flip',
    blurb:
      'Bitflip Technologies opens in Charlotte. Hand-coded sites, hand-delivered invoices, and the first logo drawn pixel by pixel.',
    clients: ['icatchbiz', 'Party Time Events', 'Heartland Contracting', 'sba.gov work'],
  },
  {
    years: '2010–2011',
    title: 'Charlotte Comes Calling',
    blurb:
      'Word of mouth turns into a client roster — restaurants, venues, law firms, and the businesses that make a city run.',
    clients: [
      'Fitzgeralds',
      'Charlotte Restaurant Week',
      'Comedy Zone',
      'T1Visions',
      'Mane Street',
      'Chestnut Creek',
      'North Harbor Club',
      'Prohibition',
      'Elevate Lifestyle',
      'Leverage Technologies',
      'Legacy CRE',
      'Park Lanes',
      'Morehead Brewing',
      'Columbus Tavern',
      'Crave',
      'Westport Marina',
      'Dilworth Neighborhood Grille',
    ],
    image: {
      src: '/work/fitzgeralds-2011.jpg',
      alt: 'Fitzgeralds homepage design comp, 2011',
    },
  },
  {
    years: '2012',
    title: 'The Nightlife Boom',
    blurb:
      "Charlotte's bar and dining scene explodes online. Bitflip builds the front door: brands, menus, bookings, buzz.",
    clients: [
      'Whisky River',
      'Buckhead Saloon',
      'Dillinger Taproom',
      'Hot Stone Grille',
      'Firehouse',
      'La Chique',
      'Uptown Cabaret',
      'Magic Ballroom',
      'Kingdom Church',
      "Stacey's Greenhouses",
      'KickCF / Cystic Fibrosis',
      'Kleen Pro',
    ],
  },
  {
    years: '2013',
    title: 'Agencies & Partnerships',
    blurb:
      'Other shops start calling. Bitflip becomes the build partner behind agencies, events, and a growing creative scene.',
    clients: [
      'CoLaboratory',
      'The Benoit Agency',
      'Hammerhead',
      'QC Beer Fest',
      'Queen City Brewers Festival',
      'Charlotte Hutson Wrenn',
      'Amy Krist Interiors',
      'Good Enough To Eat',
      'Hayden Harper',
      'Creations by Embe',
      'Dynamic Auto Works',
      'Matt Properties',
    ],
  },
  {
    years: '2014',
    title: 'Brands That Ship',
    blurb:
      'From websites to full brand systems — packaging, e-commerce, email lists, and products on real shelves.',
    clients: [
      'Dick Stevens',
      'Duckworth Grill & Taphouse',
      'DeRhodes Construction',
      'goodmortgage.com',
      'Hickory Tavern',
      'Carolina Breast Friends',
      'The Pearl Events',
      'Chef Kevin Winston',
      'Dr. Kim Blanding',
      'Welcome Neighbor',
      'The Carolina Million',
      "Hack'n Whack",
    ],
    image: {
      src: '/work/dickstevens-2014.jpg',
      alt: 'Dick Stevens site cover design, 2014',
    },
  },
  {
    years: '2015–2017',
    title: 'Scaling the Craft',
    blurb:
      'Bigger brands, bigger systems. Multi-location groups and franchises that needed design to work as hard as they did.',
    clients: [
      'FUEL Pizza',
      'Lenox Salons',
      'Hospitality Furniture Group',
      'Il Cibreo',
      'Sabellis',
      'Town Tavern',
      'Morningstar',
      'Nosal Jeter Law',
      'Hunoval Law Firm',
      'Dobbins Creek Vineyards',
      'Renaissance',
      'GrinKids',
    ],
    image: {
      src: '/work/fuelpizza-2012.jpg',
      alt: 'FUEL Pizza homepage design comp',
    },
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
      'TopBid',
      'Carolina BioOncology',
      'Historic West End Initiative',
      'Davidson Sustainability',
      'Endurance Group',
      'CivicD',
      'Adventure Motor Homes',
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
