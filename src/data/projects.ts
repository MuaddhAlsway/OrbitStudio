/* ==================================================================
   ORBIT STUDIO — Portfolio data (single source of truth)

   Shared by the homepage Selected Work section, the Services
   experience and the project case studies. Artwork paths are the
   existing repo assets under /public/Project and are preserved
   exactly; do not add descriptions, badges or counters beneath the
   project images.
   ================================================================== */

export interface Project {
  id: string
  index: string
  title: string
  category: string
  /** Internal case-study route. */
  href: string
  live?: string
  github?: string
  image: string
}

export const PROJECTS: Project[] = [
  {
    id: 'trq-studio',
    index: '01',
    title: 'TRQ Studio',
    category: 'Bilingual Portfolio & CMS Platform',
    href: '/work/trq-studio',
    live: 'https://trqstudio.com/',
    github: 'https://github.com/MuaddhAlsway/TRQ-Archicator-Studio.git',
    image: '/Project/TRQ%20Studio%20Interior%20Design%20Showcase.png',
  },
  {
    id: 'lakum-artspace',
    index: '02',
    title: 'LAKUM Artspace',
    category: 'Event Management & Cultural Platform',
    href: '/work/lakum-artspace',
    live: 'https://lakumartspace.com/',
    github: 'https://github.com/MuaddhAlsway/LAKUMPremiumVersion.git',
    image: '/Project/Lakoum%20Artspace%20Website%20Showcase.png',
  },
  {
    id: 'td-logistics',
    index: '03',
    title: 'TD Logistics',
    category: 'Logistics & Business Operations Platform',
    href: '/work/td-logistics',
    live: 'https://tdlogistics.co/',
    github: 'https://github.com/MuaddhAlsway/TD-cloudflare-deploy.git',
    image: '/Project/TD%20Logistics%20Website%20Showcase.png',
  },
  {
    id: 'mu-commerce',
    index: '04',
    title: 'MUCOMMERANCE',
    category: 'Full-Stack E-Commerce Platform',
    href: '/work/mu-commerce',
    live: 'https://mu-commerce-frontend.pages.dev/',
    github: 'https://github.com/MuaddhAlsway/Mucommerance.git',
    image: '/Project/MU%20Commerce%20Luxury%20E-Commerce%20Showcase.png',
  },
  {
    id: 'estate',
    index: '05',
    title: 'ESTATE',
    category: 'Full-Stack Real Estate Platform',
    href: '/work/estate',
    live: 'https://realstate-1-ypty.onrender.com/',
    image: '/Project/Estate%20Platform_%20Luxury%20Web%20Showcase.png',
  },
]

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id)
}

export function getProjects(ids: string[]): Project[] {
  return ids
    .map((id) => getProject(id))
    .filter((project): project is Project => Boolean(project))
}
