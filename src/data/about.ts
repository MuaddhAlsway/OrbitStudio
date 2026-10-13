export interface Belief {
  index: string
  title: string
  description: string
}

export interface Narrative {
  eyebrow: string
  title: string
  titleAccent?: string
  paragraphs: string[]
}

export const STORY: Narrative = {
  eyebrow: 'Our story',
  title: 'Engineering-led',
  titleAccent: 'from the start.',
  paragraphs: [
    'ORBIT STUDIO is an engineering-led technology studio. We design and build websites, e-commerce platforms, web applications and the backend systems that sit behind them.',
    'Every project follows the same discipline: understand the business and its constraints, design a clear structure, then build in reviewable stages with testing throughout. The work is shaped around real requirements and real content rather than a template.',
    'We treat design and engineering as one process rather than two separate ones. The result is digital products that present the business clearly, behave reliably in production, and can be maintained and extended over time.',
  ],
}

export const MISSION = {
  eyebrow: 'Our mission',
  title: 'Turn ideas and operational challenges into working software.',
  paragraphs: [
    'Many organisations know what they need but have no practical path to build it. We close that gap by defining scope, choosing technology that fits, and delivering working software in stages.',
    'Our measure of success is a system that is genuinely usable, dependable in production, and understood by the people who own it.',
  ],
}

export const BELIEFS: Belief[] = [
  {
    index: '01',
    title: 'Engineering quality',
    description:
      'We hold the work to a consistent technical standard — deliberate structure, readable code and decisions that can be explained.',
  },
  {
    index: '02',
    title: 'Clarity',
    description:
      'Clear requirements, clear interfaces and clear communication. Ambiguity is resolved early rather than discovered late.',
  },
  {
    index: '03',
    title: 'Performance',
    description:
      'Fast, responsive experiences are treated as a baseline requirement rather than an afterthought.',
  },
  {
    index: '04',
    title: 'Maintainability',
    description:
      'We build systems that can be understood and extended later, so the platform keeps pace with the business.',
  },
  {
    index: '05',
    title: 'Continuous improvement',
    description:
      'We review, refine and iterate, improving the product as it is used and as requirements evolve.',
  },
]
