export type ProcessVisual =
  | 'discovery'
  | 'requirements'
  | 'architecture'
  | 'development'
  | 'testing'
  | 'deployment'

export interface ProcessStage {
  index: string
  key: ProcessVisual
  title: string
  summary: string
  activities: string[]
  deliverables: string[]
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    index: '01',
    key: 'discovery',
    title: 'Discovery',
    summary: 'Understand the business, users, goals, and constraints.',
    activities: [
      'Conversations with the people who own the problem',
      'Reviewing users, audiences and current workflows',
      'Identifying constraints on budget, timeline and technology',
      'Agreeing what a successful outcome looks like',
    ],
    deliverables: [
      'Discovery notes and agreed objectives',
      'A defined problem statement and scope outline',
      'An initial list of risks and constraints',
    ],
  },
  {
    index: '02',
    key: 'requirements',
    title: 'Requirements & Planning',
    summary: 'Define scope, priorities, technical requirements, and deliverables.',
    activities: [
      'Turning objectives into concrete requirements',
      'Prioritising features and agreeing what is in scope',
      'Defining technical, content and integration requirements',
      'Planning deliverables and a realistic sequence of work',
    ],
    deliverables: [
      'A prioritised requirements and scope document',
      'A clear list of agreed deliverables',
      'A phased plan for delivery',
    ],
  },
  {
    index: '03',
    key: 'architecture',
    title: 'Architecture & Design',
    summary: 'Plan the system architecture, data model, user experience, and integrations.',
    activities: [
      'Deciding the overall system and application structure',
      'Modelling the data and its relationships',
      'Designing the user experience and interface structure',
      'Planning integrations with existing services and data',
    ],
    deliverables: [
      'An architecture overview and data model',
      'Interface and interaction direction',
      'An integration and technology plan',
    ],
  },
  {
    index: '04',
    key: 'development',
    title: 'Development',
    summary: 'Build the frontend, backend, database, and required features.',
    activities: [
      'Building the frontend interface and interactions',
      'Implementing the backend, APIs and business logic',
      'Setting up the database, models and migrations',
      'Delivering the product in reviewable stages',
    ],
    deliverables: [
      'Working software, delivered incrementally',
      'The frontend, backend and database in place',
      'Reviewable builds for feedback at each stage',
    ],
  },
  {
    index: '05',
    key: 'testing',
    title: 'Testing & Validation',
    summary:
      'Validate functionality, usability, responsiveness, security fundamentals, and performance.',
    activities: [
      'Checking functionality against the agreed requirements',
      'Testing responsive behaviour and usability',
      'Reviewing security fundamentals and input handling',
      'Checking performance and keyboard accessibility',
    ],
    deliverables: [
      'A validated build with issues resolved',
      'A summary of testing and what was covered',
      'Confirmation of the agreed behaviours',
    ],
  },
  {
    index: '06',
    key: 'deployment',
    title: 'Deployment & Handover',
    summary:
      'Deploy the application, verify production behavior, and deliver agreed documentation and access.',
    activities: [
      'Deploying to the target environment and configuring domains',
      'Setting up environments, configuration and secrets',
      'Verifying production behaviour after release',
      'Handing over documentation and agreed access',
    ],
    deliverables: [
      'A verified live deployment',
      'Deployment and configuration documentation',
      'Agreed access and credentials handed over',
    ],
  },
]
