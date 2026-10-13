/* ==================================================================
   ORBIT STUDIO — Case study data

   Content is derived only from what can be verified from the supplied
   project information, the repository or the live product: project
   identity, category, verified technology stacks, documented features
   and documented implementation scope. No client testimonials, growth
   figures, Lighthouse scores, awards, team sizes, deployment results
   or client feedback are invented, and no technical feature is
   described as a business outcome.

   Project name, category, artwork and links resolve from
   `data/projects.ts` so the data keeps a single source of truth.
   ================================================================== */

import { getProject } from './projects'

export interface ArchGroup {
  label: string
  items: string[]
}

export interface Architecture {
  /** Primary request/data flow, rendered top to bottom. */
  flow: ArchGroup[]
  /** Supporting modules such as auth, CMS or background stores. */
  modules?: string[]
  /** Third-party services the product integrates with. */
  integrations?: string[]
  /** Where the product is deployed. */
  deployment?: string[]
}

export interface CaseScopeItem {
  value: string
  label: string
}

export interface CaseGalleryItem {
  src: string
  alt: string
}

export interface CaseStudy {
  slug: string
  name: string
  category: string
  headline: string
  live?: string
  github?: string
  backend?: string
  image: string
  overview: string[]
  challenge: string[]
  solution: string[]
  features: string[]
  architecture: Architecture
  architectureNote?: string
  scope?: CaseScopeItem[]
  gallery: CaseGalleryItem[]
  related: string[]
  metaDescription: string
}

interface CaseStudyContent {
  slug: string
  name?: string
  category?: string
  headline: string
  headlineAlt?: string
  live?: string
  github?: string
  backend?: string
  overview: string[]
  challenge: string[]
  solution: string[]
  features: string[]
  architecture: Architecture
  architectureNote?: string
  scope?: CaseScopeItem[]
  gallery?: CaseGalleryItem[]
  related: string[]
  metaDescription: string
}

const CONTENT: CaseStudyContent[] = [
  {
    slug: 'trq-studio',
    headline: 'Engineering a Bilingual Digital Experience for Modern Architecture.',
    overview: [
      'TRQ Studio is a bilingual English and Arabic portfolio and content management platform built for a modern interior design and architecture studio.',
      'It pairs a public-facing portfolio with an administrative CMS, so the studio can manage projects, articles and enquiries without touching code.',
    ],
    challenge: [
      'A bilingual studio site has to serve two languages and two text directions from a single interface, keeping layouts coherent in both English (left-to-right) and Arabic (right-to-left).',
      'Behind the public site, the studio needs a secure administrative layer for managing projects, articles and uploaded media, backed by authenticated access and safe file handling.',
      'Content management also has to stay dependable under load, which calls for rate limiting, validated uploads and a clear separation between the public site and the admin dashboard.',
    ],
    solution: [
      'The front end is built with React, TypeScript, Vite and Tailwind CSS, with shared components that adapt to both left-to-right and right-to-left layouts.',
      'An Express.js REST API provides the application logic, with SQLite running on Turso as the data store and JWT authentication securing the admin dashboard.',
      'Content workflows cover project management, blog management, a rich text editor, email integration, rate limiting and secure file upload handling.',
    ],
    features: [
      'Bilingual English and Arabic interface',
      'RTL (right-to-left) support',
      'Secure JWT authentication',
      'Admin dashboard',
      'Rich text editor',
      'Project management',
      'Blog management',
      'Email integration',
      'Rate limiting',
      'Secure file upload handling',
      'Responsive layouts',
    ],
    architecture: {
      flow: [
        { label: 'Frontend', items: ['React 19.2', 'Vite 7.2', 'TypeScript', 'Tailwind CSS 3.4'] },
        { label: 'Backend / API', items: ['Express.js 4.21 REST API'] },
        { label: 'Database', items: ['SQLite / Turso'] },
      ],
      modules: [
        'JWT authentication',
        'Content management',
        'Role-based admin dashboard',
        'Email integration',
        'Rate limiting',
        'Secure file uploads',
      ],
    },
    architectureNote:
      'Authentication, content management and email delivery run as supporting modules alongside the core REST API.',
    related: ['lakum-artspace', 'estate'],
    metaDescription:
      'TRQ Studio is a bilingual English and Arabic portfolio and CMS platform for an interior design and architecture studio, built with React, TypeScript, Express and SQLite (Turso).',
  },
  {
    slug: 'td-logistics',
    category: 'Logistics & Business Operations Platform',
    headline: 'Connecting Logistics Operations Through a Unified Digital Platform.',
    overview: [
      'TD Logistics is an integrated logistics website that supports shipment tracking, business inquiries, content publishing, recruitment and administrative operations.',
      'It brings the provider\u2019s service lines, customer requests and internal content into a single Next.js application with an Arabic-first, right-to-left interface.',
    ],
    challenge: [
      'Logistics customers need to find a service, request a price and track a shipment without friction, while the operator needs a way to publish content and manage recruitment.',
      'The application has to support an Arabic right-to-left interface alongside English, and process several kinds of business forms safely.',
      'Business form processing, shipment tracking, authentication and content publishing all have to be organised without compromising security or reliability.',
    ],
    solution: [
      'The application is built with Next.js 14, TypeScript, Tailwind CSS and React Hook Form.',
      'Application APIs and server-side logic handle logistics workflows, including shipment tracking, quote requests, contact forms, job listings and job applications.',
      'Authentication uses JWT and bcryptjs, requests are protected with rate limiting and input validation, and SQLite stores the application data.',
    ],
    features: [
      'Shipment tracking',
      'User authentication',
      'Admin dashboard',
      'Blog and content management',
      'Job listings',
      'Job applications',
      'Quote requests',
      'Contact forms',
      'Arabic RTL interface',
      'Rate limiting',
      'Input validation and security protections',
    ],
    architecture: {
      flow: [
        { label: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Hook Form'] },
        { label: 'Application APIs / Server Logic', items: ['Next.js server routes'] },
        { label: 'Database', items: ['SQLite'] },
        { label: 'Integration', items: ['Shipment tracking'] },
      ],
      modules: [
        'User authentication (JWT, bcryptjs)',
        'Admin dashboard',
        'Blog and content management',
        'Job listings and applications',
        'Quote and contact workflows',
        'Rate limiting',
        'Input validation',
      ],
      integrations: ['Shipment tracking integration'],
    },
    architectureNote:
      'Logistics workflows, authentication, shipment tracking and business form processing are handled within the Next.js application layer.',
    related: ['mu-commerce', 'estate'],
    metaDescription:
      'TD Logistics is a bilingual Arabic and English logistics and business operations platform with shipment tracking, quote requests and recruitment, built with Next.js 14.',
  },
  {
    slug: 'lakum-artspace',
    name: 'LAKUM Artspace',
    category: 'Event Management & Cultural Platform',
    headline: 'Building a Digital Home for Art, Culture, and Experiences.',
    overview: [
      'LAKUM Artspace (Mesaha Lakum) is a cultural platform supporting exhibitions, workshops, seminars, events and venue rental inquiries, together with an administrative content management interface.',
      'It presents the space\u2019s programme of exhibitions and events while giving the team a management interface for content, imagery and bookings.',
    ],
    challenge: [
      'A cultural space needs to present exhibitions, workshops, seminars and events with rich media while keeping the programme easy to browse and filter.',
      'The team also needs an administrative interface for managing events, imagery and video, without compromising upload security.',
      'Venue rental inquiries and event filtering add further layers on top of the content and gallery workflows.',
    ],
    solution: [
      'The interface is built with PHP serving the application and its RESTful endpoints, with HTML5, CSS3 and JavaScript on the front end.',
      'MySQL stores the platform\u2019s events, media and content, and secure authentication protects the administrative area.',
      'An admin dashboard provides event management, an event calendar, image gallery management, drag-and-drop uploads and venue booking workflows.',
    ],
    features: [
      'Event management',
      'Admin dashboard',
      'Event calendar',
      'Image gallery management',
      'Video integration',
      'Venue booking workflows',
      'Secure authentication',
      'RESTful endpoints',
      'Drag-and-drop uploads',
      'Responsive design',
    ],
    architecture: {
      flow: [
        { label: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript'] },
        { label: 'Backend / API', items: ['PHP Application / API'] },
        { label: 'Database', items: ['MySQL'] },
      ],
      modules: [
        'Event management',
        'Admin dashboard',
        'Event calendar',
        'Image gallery management',
        'Venue booking workflows',
        'Secure authentication',
        'RESTful endpoints',
        'Drag-and-drop uploads',
      ],
      integrations: ['Video integration'],
    },
    architectureNote:
      'A PHP application and its RESTful endpoints sit between the front end and MySQL, with an authenticated admin dashboard managing events and media.',
    related: ['trq-studio', 'td-logistics'],
    metaDescription:
      'LAKUM Artspace (Mesaha Lakum) is a cultural platform for exhibitions, workshops and events with venue booking and an admin CMS, built with PHP, MySQL and JavaScript.',
  },
  {
    slug: 'mu-commerce',
    name: 'MUCOMMERANCE',
    category: 'Full-Stack E-Commerce Platform',
    headline: 'Engineering a Complete Commerce Ecosystem From Storefront to Fulfillment.',
    overview: [
      'MUCOMMERANCE is a custom-built luxury fashion e-commerce platform combining storefront functionality, payment processing, shipping integrations, customer accounts and administrative operations.',
      'It covers the full commerce path \u2014 from product discovery and checkout through to fulfilment \u2014 within a single Cloudflare-based architecture.',
    ],
    scope: [
      { value: '14', label: 'Storefront pages' },
      { value: '95+', label: 'API endpoints' },
      { value: '16', label: 'Database tables' },
      { value: '12', label: 'Admin dashboard tabs' },
    ],
    challenge: [
      'Building a complete commerce platform means coordinating many moving parts: a product catalogue, search and filtering, a persistent wishlist, cart and checkout, and an administrative back office.',
      'Payments and shipping depend on external providers, so the platform has to integrate several third-party services reliably while keeping customer and order data secure.',
      'The API surface is large and the database relationships between products, orders, customers and operations must stay consistent across both the storefront and the admin dashboard.',
    ],
    solution: [
      'The storefront is built with React, TypeScript, Vite, Tailwind CSS and shadcn/ui, with Framer Motion for interaction and Recharts for administrative analytics.',
      'A Cloudflare Workers API serves over 95 endpoints against a Cloudflare D1 database, with Cloudflare KV used alongside it for supporting data.',
      'Stripe processes checkout payments, while Shippo and Aramex provide shipping and carrier integrations.',
      'Customer accounts use session management, role-based access control and PBKDF2 password hashing via the Web Crypto API, with audit logging for administrative actions.',
    ],
    features: [
      'Product catalog and galleries',
      'Search and filters',
      'Persistent wishlist',
      'Shopping cart',
      'Stripe checkout',
      'Shippo shipping integration',
      'Aramex carrier integration',
      'Session management',
      'Role-based access control',
      'PBKDF2 password hashing',
      'Audit logging',
      'Administrative analytics',
    ],
    architecture: {
      flow: [
        {
          label: 'Storefront',
          items: [
            'React 18',
            'TypeScript',
            'Vite 6',
            'Tailwind CSS 4',
            'shadcn/ui',
            'Framer Motion',
            'Recharts',
          ],
        },
        { label: 'API', items: ['Cloudflare Workers', 'Web Crypto API'] },
        { label: 'Database', items: ['Cloudflare D1'] },
      ],
      modules: [
        'Cloudflare KV',
        'Session management',
        'Role-based access control',
        'PBKDF2 password hashing',
        'Audit logging',
        'Administrative analytics',
      ],
      integrations: ['Stripe', 'Shippo API', 'Aramex SOAP'],
      deployment: ['Cloudflare'],
    },
    architectureNote:
      'The platform runs entirely on Cloudflare: the Workers API serves both the storefront and the admin dashboard over D1, with KV alongside it and Stripe, Shippo and Aramex as external services.',
    related: ['estate', 'td-logistics'],
    metaDescription:
      'MUCOMMERANCE is a full-stack luxury fashion e-commerce platform built on React, TypeScript and Cloudflare Workers with D1, Stripe, Shippo and Aramex integrations.',
  },
  {
    slug: 'estate',
    name: 'ESTATE \u2014 Luxury Real Estate Platform',
    category: 'Full-Stack Real Estate Platform',
    headline: 'Architecting a Secure Real Estate Platform for Modern Property Operations.',
    backend: 'https://realstate-rfu5.onrender.com/',
    overview: [
      'ESTATE is a real estate platform built for Jeddah, Saudi Arabia, featuring property discovery, user accounts, agent workflows, administration, content management and email communication.',
      'It serves three distinct audiences \u2014 clients, agents and administrators \u2014 from a single application with role-aware experiences and data boundaries.',
    ],
    scope: [{ value: '233', label: 'Automated tests' }],
    challenge: [
      'Multi-role authentication: the platform serves USER, AGENT and ADMIN roles, each requiring different access and different data.',
      'Refresh-token rotation and refresh-token reuse detection, so sessions stay secure.',
      'Backend authorization boundaries and agent-specific data isolation, so agents only reach the leads and listings that belong to them.',
      'PostgreSQL schema design across properties, users, leads and content.',
      'Signed Cloudinary uploads and dependable email delivery workflows.',
      'Automated testing and a repeatable deployment pipeline.',
    ],
    solution: [
      'The front end is built with React, Vite, TypeScript, Tailwind CSS, React Router and GSAP.',
      'An Express 5 REST API handles application logic, secured with JWT, Argon2id password hashing and Zod validation.',
      'Drizzle ORM models the data over a Neon PostgreSQL database, while Cloudinary provides signed media uploads.',
      'Nodemailer and Resend deliver transactional and campaign email with delivery tracking.',
      'The project is covered by 233 automated tests (Vitest and Supertest) and ships through GitHub Actions CI/CD to Render.',
    ],
    features: [
      'Property marketplace',
      'Multi-filter property search',
      'Property details',
      'Favorites',
      'Viewing requests',
      'Property inquiries',
      'USER / AGENT / ADMIN roles',
      'JWT authentication',
      'Rotating refresh tokens',
      'Refresh-token reuse detection',
      'Agent lead management',
      'Admin dashboard',
      'Database-backed CMS',
      'Signed Cloudinary uploads',
      'Newsletter subscriptions',
      'Email campaigns',
      'Delivery tracking',
      'CI/CD',
    ],
    architecture: {
      flow: [
        {
          label: 'Frontend',
          items: ['React 19', 'Vite 8', 'TypeScript 5.7', 'Tailwind CSS 4', 'React Router 7', 'GSAP'],
        },
        { label: 'Backend / API', items: ['Node.js 22', 'Express 5', 'Zod', 'JWT', 'Argon2id'] },
        { label: 'ORM', items: ['Drizzle ORM'] },
        { label: 'Database', items: ['PostgreSQL on Neon'] },
      ],
      modules: [
        'Multi-role authentication (USER / AGENT / ADMIN)',
        'Refresh-token rotation and reuse detection',
        'Backend authorization boundaries',
        'Agent lead management',
        'Database-backed CMS',
        'Email campaigns and delivery tracking',
      ],
      integrations: ['Cloudinary', 'Nodemailer', 'Resend'],
      deployment: ['GitHub Actions', 'Render'],
    },
    architectureNote:
      'Backend authorization boundaries isolate agent data, signed Cloudinary uploads handle media, and 233 automated tests cover the API before it deploys through GitHub Actions to Render.',
    related: ['mu-commerce', 'td-logistics'],
    metaDescription:
      'ESTATE is a full-stack real estate platform for Jeddah built with React, Express 5, Drizzle ORM and Neon PostgreSQL, featuring multi-role authentication and 233 automated tests.',
  },
]

const CONTENT_BY_SLUG = new Map(CONTENT.map((entry) => [entry.slug, entry]))

export const CASE_STUDY_SLUGS = CONTENT.map((entry) => entry.slug)

function resolve(entry: CaseStudyContent): CaseStudy | undefined {
  const project = getProject(entry.slug)
  if (!project) return undefined

  return {
    slug: entry.slug,
    name: entry.name ?? project.title,
    category: entry.category ?? project.category,
    headline: entry.headline,
    live: project.live,
    github: project.github,
    backend: entry.backend,
    image: project.image,
    overview: entry.overview,
    challenge: entry.challenge,
    solution: entry.solution,
    features: entry.features,
    architecture: entry.architecture,
    architectureNote: entry.architectureNote,
    scope: entry.scope,
    gallery: entry.gallery ?? [{ src: project.image, alt: `${entry.name ?? project.title} showcase` }],
    related: entry.related,
    metaDescription: entry.metaDescription,
  }
}

export const CASE_STUDIES: CaseStudy[] = CONTENT.map(resolve).filter(
  (entry): entry is CaseStudy => Boolean(entry),
)

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined
  const entry = CONTENT_BY_SLUG.get(slug)
  return entry ? resolve(entry) : undefined
}
