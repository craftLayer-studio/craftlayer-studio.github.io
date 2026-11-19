/** The engineering process, in order. Describes how we work, not promised outcomes. */
export type ProcessStep = {
  slug: string;
  name: string;
  summary: string;
  /** What you receive or agree at the end of the step. */
  outputs: string[];
};

export const processSteps: ProcessStep[] = [
  {
    slug: 'discover',
    name: 'Discover',
    summary: 'We learn the business, the audience and the constraints, and agree what success looks like.',
    outputs: ['Goals and constraints, written down', 'Questions and risks list'],
  },
  {
    slug: 'plan',
    name: 'Plan',
    summary: 'We turn goals into a scoped plan: what is in, what is out, and the order we will build it.',
    outputs: ['Written scope', 'Milestones and estimate', 'Architecture outline'],
  },
  {
    slug: 'design',
    name: 'Design',
    summary: 'We design the key screens and flows, starting with content and structure before visual polish.',
    outputs: ['Page structure and flows', 'Interface designs for key screens'],
  },
  {
    slug: 'build',
    name: 'Build',
    summary: 'We build in small increments on a staging URL, so you can review real software as it grows.',
    outputs: ['Working increments on staging', 'Source in a repository you can access'],
  },
  {
    slug: 'validate',
    name: 'Validate',
    summary: 'We test behaviour, accessibility and performance, and fix what we find before launch.',
    outputs: ['Automated checks in CI', 'Accessibility and performance review'],
  },
  {
    slug: 'deploy',
    name: 'Deploy',
    summary: 'We ship to production with a rollback path, then walk you through running it.',
    outputs: ['Production deployment', 'Handover notes and walkthrough'],
  },
  {
    slug: 'improve',
    name: 'Improve',
    summary: 'After launch we look at how it is used and agree the next most valuable change.',
    outputs: ['Prioritised improvement list', 'Optional ongoing support'],
  },
];

/**
 * What a client receives, described only through practices the public
 * repositories already show. Each `evidence` link must be public.
 */
export type Deliverable = {title: string; body: string; evidence?: {label: string; href: string}};

const DEMOS_REPO = 'https://github.com/craftLayer-studio/industry-demos';
const WEBSITE_REPO = 'https://github.com/craftLayer-studio/craftlayer-studio.github.io';

export const deliverables: Deliverable[] = [
  {
    title: 'A build that fits the content',
    body: 'A static export where the content allows it, so hosting stays cheap and simple; server rendering only where a feature needs it. This site and every concept demo are static exports.',
    evidence: {label: 'Website source on GitHub', href: WEBSITE_REPO},
  },
  {
    title: 'Responsive down to 320px',
    body: 'Layouts are checked at a 320px-wide viewport for horizontal scrolling and clipped content, as the concept demos are.',
    evidence: {label: 'Concept demos source on GitHub', href: DEMOS_REPO},
  },
  {
    title: 'Accessibility checks',
    body: 'Keyboard testing, visible focus, labelled forms with error summaries, and automated axe-core checks against WCAG 2.2 AA before handover.',
  },
  {
    title: 'Tests for the logic that matters',
    body: 'Unit tests for pricing, filtering, scheduling and form validation, run in CI with linting and type checks on every change.',
    evidence: {label: 'Concept demo tests and CI workflow', href: DEMOS_REPO},
  },
  {
    title: 'Technical SEO',
    body: 'Unique titles and descriptions, canonical URLs, a sitemap, robots.txt and structured data that only states facts.',
    evidence: {label: 'Website source on GitHub', href: WEBSITE_REPO},
  },
  {
    title: 'Source in a Git repository',
    body: 'The source lives in a Git repository you can access throughout the project, with handover notes and a walkthrough at launch.',
  },
];

export type Faq = {question: string; answer: string};

/** Shown on /process/ and mirrored in FAQPage JSON-LD. Answers must match site facts. */
export const faqs: Faq[] = [
  {
    question: 'Who will I work with?',
    answer:
      'The founder, Shaswat Raj. He scopes the project, designs the interfaces and writes the code, so you talk to the person doing the work rather than an account manager.',
  },
  {
    question: 'Are the industry demos real businesses or past clients?',
    answer:
      'No. Forge Fitness, Juniper Kitchen, Northstar Clinic and the other industry demos are fictional brands built by CraftLayer Studio to show working patterns. Their forms validate in the browser and send nothing.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Every project is scoped individually. After a first conversation you receive a written scope with milestones and an estimate before any work starts.',
  },
  {
    question: 'Do I own the code?',
    answer: 'Yes. The code lives in a repository you can access during the project, and you receive everything at handover.',
  },
  {
    question: 'Can a static website take bookings or enquiries?',
    answer:
      'Yes. A static site can send forms to a hosted form service or link into the booking system you already use. The concept demos stop after validation on purpose, so nothing is sent.',
  },
  {
    question: 'Where is the studio based?',
    answer: 'The founder is based in India and works remotely, in English, with businesses in any country.',
  },
  {
    question: 'How do I start?',
    answer:
      'Send an enquiry through the contact page or by email. The founder replies personally, usually with questions first, and a written scope is agreed before any work starts.',
  },
];
