/* ==================================================================
   MANARA — Service data

   A single structured source for the Services overview and the six
   detail pages. Content is deliberately factual: no fabricated case
   studies, clients, certifications, SLAs or performance metrics. Each
   service is connected only to real, delivered portfolio projects.
   ================================================================== */

export type ServiceVisual =
  | 'web'
  | 'commerce'
  | 'software'
  | 'backend'
  | 'cloud'
  | 'uiux'

export interface ServiceCapability {
  title: string
  description: string
}

export interface ServiceStep {
  index: string
  title: string
  description: string
}

export interface ArchitectureStep {
  label: string
  note: string
}

export interface Service {
  id: string
  slug: string
  index: string
  /** Short label used in the hero eyebrow and navigation. */
  label: string
  title: string
  /** One-line summary used in lists and navigation. */
  shortDescription: string
  /** Large editorial headline for the detail hero. */
  headline: string
  /** Concise positioning statement for the detail hero. */
  positioning: string
  capabilities: ServiceCapability[]
  engineeringApproach: ServiceStep[]
  architecture: {
    title: string
    steps: ArchitectureStep[]
  }
  relatedProjectIds: string[]
  visual: ServiceVisual
}

export const SERVICES: Service[] = [
  {
    id: 'website-design-development',
    slug: 'website-design-development',
    index: '01',
    label: 'Websites',
    title: 'Website Design & Development',
    shortDescription:
      'Brand-led, responsive websites designed and built to load fast and read clearly.',
    headline: 'Websites that present the business clearly.',
    positioning:
      'We design and build responsive websites for studios, cultural spaces and businesses — focused on clear structure, considered presentation and reliable performance across devices.',
    capabilities: [
      {
        title: 'Design & art direction',
        description:
          'Layout, type and imagery shaped around the brand rather than an off-the-shelf template.',
      },
      {
        title: 'Responsive build',
        description:
          'Layouts designed deliberately for desktop, tablet and mobile rather than scaled down after the fact.',
      },
      {
        title: 'Content structure',
        description:
          'Pages and sections organised so visitors understand what the business does and what to do next.',
      },
      {
        title: 'Performance & SEO',
        description:
          'Semantic markup, sensible asset loading and per-page titles and descriptions as a baseline.',
      },
      {
        title: 'Accessibility',
        description:
          'Keyboard-friendly interactions, clear contrast and support for reduced-motion preferences.',
      },
    ],
    engineeringApproach: [
      {
        index: '01',
        title: 'Discovery & requirements',
        description: 'We clarify the audience, the content and the outcome the website needs to support.',
      },
      {
        index: '02',
        title: 'Structure & content',
        description: 'Pages, sections and content are outlined before any visual work begins.',
      },
      {
        index: '03',
        title: 'Design',
        description: 'A visual direction is agreed and applied consistently across every page.',
      },
      {
        index: '04',
        title: 'Build',
        description: 'Pages are composed from shared components rather than one-off blocks.',
      },
      {
        index: '05',
        title: 'Testing & validation',
        description: 'We check responsive behaviour, keyboard access and reduced-motion preferences.',
      },
      {
        index: '06',
        title: 'Deployment',
        description: 'Domain, build output and hosting are configured before launch, not after.',
      },
    ],
    architecture: {
      title: 'From interface to hosting',
      steps: [
        { label: 'Pages', note: 'Structure and content model' },
        { label: 'Components', note: 'Reusable, accessible building blocks' },
        { label: 'Build', note: 'Responsive markup and assets' },
        { label: 'Hosting', note: 'Domain, delivery and deployment' },
      ],
    },
    relatedProjectIds: ['trq-studio', 'lakum-artspace'],
    visual: 'web',
  },
  {
    id: 'ecommerce-development',
    slug: 'ecommerce-development',
    index: '02',
    label: 'E-Commerce',
    title: 'E-Commerce Development',
    shortDescription:
      'Storefronts and checkout flows that connect a considered shopping experience to dependable operations.',
    headline: 'Commerce where browsing and buying feel considered.',
    positioning:
      'We build e-commerce storefronts with structured catalogues, clear cart and checkout flows and payment integration — the approach used to deliver MU-Commerce.',
    capabilities: [
      {
        title: 'Custom storefronts',
        description:
          'Product browsing and presentation shaped around the catalogue rather than a rigid template.',
      },
      {
        title: 'Product catalogues',
        description: 'Structured products, variants, imagery and categories that scale as ranges grow.',
      },
      {
        title: 'Cart & checkout',
        description: 'Focused purchase flows with clear summaries and minimal friction.',
      },
      {
        title: 'Payments & accounts',
        description: 'Payment provider integration, customer accounts and order history.',
      },
      {
        title: 'Orders & inventory',
        description: 'Order management and stock workflows handled in an administrative interface.',
      },
    ],
    engineeringApproach: [
      {
        index: '01',
        title: 'Commerce discovery',
        description: 'We map catalogue structure, purchase paths and fulfilment requirements first.',
      },
      {
        index: '02',
        title: 'Domain modelling',
        description: 'Products, orders and customers are modelled as clear, related entities.',
      },
      {
        index: '03',
        title: 'Storefront development',
        description: 'Catalogue, product and search experiences are built against that model.',
      },
      {
        index: '04',
        title: 'Checkout & payments',
        description: 'Cart, checkout and payment steps are built and validated end to end.',
      },
      {
        index: '05',
        title: 'Testing & validation',
        description: 'Flows are checked across the order lifecycle, including edge cases.',
      },
      {
        index: '06',
        title: 'Deployment',
        description: 'Environments, secrets and database configuration are prepared for production.',
      },
    ],
    architecture: {
      title: 'The order lifecycle',
      steps: [
        { label: 'Storefront', note: 'Catalogue, search and product detail' },
        { label: 'Cart', note: 'Line items, totals and validation' },
        { label: 'Checkout', note: 'Customer and payment details' },
        { label: 'Orders', note: 'Confirmation and order records' },
        { label: 'Fulfilment', note: 'Inventory and administration' },
      ],
    },
    relatedProjectIds: ['mu-commerce'],
    visual: 'commerce',
  },
  {
    id: 'custom-web-applications',
    slug: 'custom-web-applications',
    index: '03',
    label: 'Web Applications',
    title: 'Custom Web Applications',
    shortDescription:
      'Purpose-built applications and dashboards that turn complex operations into clear, usable systems.',
    headline: 'Applications shaped around how the work is actually done.',
    positioning:
      'We design and build web applications and dashboards for products and operations that need more than a static website — the kind of systems delivered in TD Logistics and ESTATE.',
    capabilities: [
      {
        title: 'Application interfaces',
        description:
          'Stateful, interactive screens for products and internal tools rather than simple pages.',
      },
      {
        title: 'Dashboards & data views',
        description: 'Operational information presented so decisions can be made at a glance.',
      },
      {
        title: 'Search & filtering',
        description: 'Discovery interfaces for records, listings and catalogues that grow over time.',
      },
      {
        title: 'Accounts & roles',
        description: 'Authentication and permission-aware interfaces built around real responsibilities.',
      },
      {
        title: 'Workflows & records',
        description:
          'Creation, editing and progression of records captured as defined, repeatable processes.',
      },
    ],
    engineeringApproach: [
      {
        index: '01',
        title: 'Operational discovery',
        description: 'We document the current workflow, roles and constraints before proposing a system.',
      },
      {
        index: '02',
        title: 'Domain modelling',
        description: 'The core objects of the application and their relationships are modelled explicitly.',
      },
      {
        index: '03',
        title: 'Interface development',
        description: 'Screens and workflows are built against that model, in reviewable stages.',
      },
      {
        index: '04',
        title: 'Integration strategy',
        description: 'Existing data sources and services are connected through defined boundaries.',
      },
      {
        index: '05',
        title: 'Testing & validation',
        description: 'Workflows are validated against real scenarios, permissions and edge cases.',
      },
      {
        index: '06',
        title: 'Iteration',
        description: 'The application is refined as it is used in day-to-day operation.',
      },
    ],
    architecture: {
      title: 'From interface to data',
      steps: [
        { label: 'Interface', note: 'Screens, state and interaction' },
        { label: 'Application', note: 'Workflows and business logic' },
        { label: 'API', note: 'Data access and contracts' },
        { label: 'Data', note: 'Records and persistence' },
      ],
    },
    relatedProjectIds: ['td-logistics', 'estate'],
    visual: 'software',
  },
  {
    id: 'backend-api-development',
    slug: 'backend-api-development',
    index: '04',
    label: 'Backend & APIs',
    title: 'Backend & API Development',
    shortDescription:
      'Server-side systems, data models and APIs designed for integration, security and maintainability.',
    headline: 'Foundations that keep applications dependable.',
    positioning:
      'We design and build the server-side systems and APIs that applications depend on — data models, authentication and integration — as used behind MU-Commerce, TD Logistics and ESTATE.',
    capabilities: [
      {
        title: 'APIs',
        description: 'Endpoints with clear contracts that applications and services can rely on.',
      },
      {
        title: 'Authentication & access',
        description: 'Identity, sessions and role-based access rules handled server-side.',
      },
      {
        title: 'Data models',
        description: 'Schemas and relationships that reflect how the business actually works.',
      },
      {
        title: 'Integrations',
        description:
          'Payment and third-party providers connected behind stable internal interfaces.',
      },
      {
        title: 'Validation & error handling',
        description: 'Inputs are validated and failure states are handled deliberately, not left to chance.',
      },
    ],
    engineeringApproach: [
      {
        index: '01',
        title: 'Requirements & boundaries',
        description: 'We define the data, roles and operations the system needs to support.',
      },
      {
        index: '02',
        title: 'Architecture decisions',
        description: 'Services, data models and access rules are decided before implementation.',
      },
      {
        index: '03',
        title: 'Data modelling',
        description: 'Entities, relationships and migrations are defined against the requirements.',
      },
      {
        index: '04',
        title: 'Implementation',
        description: 'Endpoints, authentication and data access are built and reviewed.',
      },
      {
        index: '05',
        title: 'Integration',
        description: 'External providers are integrated behind stable internal interfaces.',
      },
      {
        index: '06',
        title: 'Testing & validation',
        description: 'Core flows are covered with integration tests and manual validation.',
      },
    ],
    architecture: {
      title: 'Request to data',
      steps: [
        { label: 'Client', note: 'Application or service request' },
        { label: 'API', note: 'Routing and validation' },
        { label: 'Auth', note: 'Identity and authorisation' },
        { label: 'Services', note: 'Business logic' },
        { label: 'Database', note: 'Persistence and migrations' },
      ],
    },
    relatedProjectIds: ['mu-commerce', 'estate', 'td-logistics'],
    visual: 'backend',
  },
  {
    id: 'cloud-deployment-maintenance',
    slug: 'cloud-deployment-maintenance',
    index: '05',
    label: 'Cloud & Maintenance',
    title: 'Cloud Deployment & Maintenance',
    shortDescription:
      'Hosting, deployment and ongoing maintenance that keep applications reliably in production.',
    headline: 'Getting software live — and keeping it healthy.',
    positioning:
      'We configure hosting, build and deployment so applications reach production predictably, then maintain them afterwards — as done for projects including MU-Commerce and TD Logistics.',
    capabilities: [
      {
        title: 'Deployment & hosting',
        description: 'Hosting and release workflows set up for the way the project is maintained.',
      },
      {
        title: 'Environment management',
        description: 'Separate configuration for development, staging and production.',
      },
      {
        title: 'CI/CD pipelines',
        description: 'Automated build and release steps to reduce manual deployment effort.',
      },
      {
        title: 'Database configuration',
        description: 'Managed database setup, migrations, backups and connection handling.',
      },
      {
        title: 'Maintenance & monitoring',
        description: 'Updates, dependency care and basic logging so issues are visible early.',
      },
    ],
    engineeringApproach: [
      {
        index: '01',
        title: 'Deployment discovery',
        description: 'We review the application and agree on the target environment.',
      },
      {
        index: '02',
        title: 'Architecture decisions',
        description: 'Hosting, build and secrets strategy are defined before configuration.',
      },
      {
        index: '03',
        title: 'Pipeline setup',
        description: 'Build and release steps are automated where they save effort.',
      },
      {
        index: '04',
        title: 'Configuration',
        description: 'Domains, environments and services are connected and verified.',
      },
      {
        index: '05',
        title: 'Testing & validation',
        description: 'The deployed application is checked against the intended behaviour.',
      },
      {
        index: '06',
        title: 'Handover & maintenance',
        description: 'The process is documented so the system can be operated and updated independently.',
      },
    ],
    architecture: {
      title: 'Code to production',
      steps: [
        { label: 'Code', note: 'Repository and branches' },
        { label: 'Build', note: 'Automated pipeline' },
        { label: 'Deploy', note: 'Hosting and environments' },
        { label: 'Operate', note: 'Logs, updates and health checks' },
      ],
    },
    relatedProjectIds: ['mu-commerce', 'td-logistics', 'estate'],
    visual: 'cloud',
  },
  {
    id: 'ui-ux-interactive-experiences',
    slug: 'ui-ux-interactive-experiences',
    index: '06',
    label: 'UI/UX & Interaction',
    title: 'UI/UX & Interactive Experiences',
    shortDescription:
      'Interface design and motion that make products clear, considered and engaging to use.',
    headline: 'Interfaces designed to feel considered.',
    positioning:
      'We design interfaces, interaction patterns and motion that guide people through a product — the design thinking applied across projects such as TRQ Studio and LAKUM Artspace.',
    capabilities: [
      {
        title: 'Interface design',
        description: 'Layouts and components designed around real content and real tasks.',
      },
      {
        title: 'Interaction design',
        description: 'States, feedback and flows that make an interface predictable to use.',
      },
      {
        title: 'Motion & micro-interactions',
        description: 'Considered animation that supports understanding rather than decorating it.',
      },
      {
        title: 'Design systems',
        description: 'Reusable styles and components that keep a product consistent as it grows.',
      },
      {
        title: 'Responsive & accessible design',
        description: 'Interfaces designed for every screen size and usable with a keyboard.',
      },
    ],
    engineeringApproach: [
      {
        index: '01',
        title: 'UX discovery',
        description: 'We understand the users, their tasks and the moments that cause friction.',
      },
      {
        index: '02',
        title: 'Information architecture',
        description: 'Content and navigation are structured so the product is easy to move through.',
      },
      {
        index: '03',
        title: 'Visual design',
        description: 'A type, colour and layout direction is established and applied consistently.',
      },
      {
        index: '04',
        title: 'Interaction & motion',
        description: 'Transitions and feedback are designed alongside the static screens.',
      },
      {
        index: '05',
        title: 'Prototyping',
        description: 'Key flows are prototyped so decisions can be tested before development.',
      },
      {
        index: '06',
        title: 'Handover',
        description: 'Designs are prepared as usable, documented components for implementation.',
      },
    ],
    architecture: {
      title: 'From research to interface',
      steps: [
        { label: 'Research', note: 'Users, tasks and constraints' },
        { label: 'Structure', note: 'Content and navigation' },
        { label: 'Interface', note: 'Layout, type and components' },
        { label: 'Interaction', note: 'States, feedback and motion' },
      ],
    },
    relatedProjectIds: ['trq-studio', 'lakum-artspace', 'estate'],
    visual: 'uiux',
  },
]

export function getServiceBySlug(slug: string | undefined): Service | undefined {
  if (!slug) return undefined
  return SERVICES.find((service) => service.slug === slug)
}

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((service) => service.id === id)
}

/** Layers used by the "Connected Engineering" architecture diagram. */
export const ENGINEERING_LAYERS: ArchitectureStep[] = [
  { label: 'Experience', note: 'Interfaces, content and brand' },
  { label: 'Application', note: 'Business logic and workflows' },
  { label: 'API', note: 'Contracts between systems' },
  { label: 'Data', note: 'Storage, models and records' },
  { label: 'Infrastructure', note: 'Hosting, deployment and operations' },
]

export const APPROACH_PHASES: ServiceStep[] = [
  {
    index: '01',
    title: 'Discover',
    description:
      'We understand the business, the users and the constraints, then agree what success looks like.',
  },
  {
    index: '02',
    title: 'Architect',
    description: 'We define the structure, data and integrations before writing application code.',
  },
  {
    index: '03',
    title: 'Design',
    description: 'We shape the interface and interactions around real content and real workflows.',
  },
  {
    index: '04',
    title: 'Develop',
    description: 'We build in reviewable stages, with testing and accessibility throughout.',
  },
  {
    index: '05',
    title: 'Launch',
    description: 'We deploy, verify and hand over a system that can be maintained and extended.',
  },
]

export function getServiceBySlugOrIndex(value: string): Service | undefined {
  return SERVICES.find((s) => s.slug === value || s.id === value)
}
