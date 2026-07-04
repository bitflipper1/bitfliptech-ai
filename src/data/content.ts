export const services = [
  {
    title: 'Omnichannel Design',
    blurb:
      'Fluid, highly responsive digital experiences across web, mobile, tablet, and social platforms.',
    tag: '01',
  },
  {
    title: 'Digital Storytelling & AI',
    blurb:
      'Advanced AI tools and creative digital design that build authentic audience engagement.',
    tag: '02',
  },
  {
    title: 'Digital Trust',
    blurb: 'Security and platform reliability protection, built in from day one.',
    tag: '03',
  },
  {
    title: 'Actionable Insights',
    blurb:
      'Data analytics that translate complex metrics into clear, actionable data insights.',
    tag: '04',
  },
  {
    title: 'Marketing Services',
    blurb: 'Review generation and customer feedback automation that compounds.',
    tag: '05',
  },
]

export const process = [
  {
    step: 'Strategic Discovery',
    blurb: 'We map your audience, goals, and edges before a pixel moves.',
  },
  {
    step: 'Cross-Platform Experience',
    blurb: 'One story, every surface — designed to feel native on each.',
  },
  {
    step: 'Bespoke Product Engineering',
    blurb: 'Hand-built, AI-accelerated. No templates, no bloat.',
  },
  {
    step: 'Measurable Evolution',
    blurb: 'Ship, measure, learn, evolve. The launch is the starting line.',
  },
]

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
      'It started with hand-coded sites for Charlotte businesses — restaurants, venues, and local legends. Every pixel earned.',
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
      "Charlotte's dining and nightlife scene came online, and we built the front door — brands, menus, bookings, buzz.",
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
    title: 'Bitflip Goes Product',
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
    title: 'Design Meets the Machine',
    blurb:
      'Design-to-code workflows, AI tooling, and prototyping pipelines. The studio became a lab.',
    clients: ['Design Matt-ers', 'BofA concepts', 'Cursor design-to-code', 'AI prototyping'],
  },
  {
    years: '2025 →',
    title: 'bitfliptech.ai',
    blurb:
      'Seventeen years of craft, reborn AI-native. Strategic digital design and AI storytelling for authentic connection.',
    clients: ['You, next.'],
  },
]

export const contact = {
  phone: '704-293-5049',
  email: 'mattmcg@bitfliptech.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/bitfliptech' },
    { label: 'X', href: 'https://x.com/bitfliptech' },
    { label: 'Instagram', href: 'https://www.instagram.com/bitfliptech' },
    { label: 'Facebook', href: 'https://www.facebook.com/bitfliptech' },
  ],
}
