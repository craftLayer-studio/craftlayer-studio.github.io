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
