/**
 * Services offered by the studio. Copy describes what we do and how, never
 * outcomes we cannot evidence. `related` lists project slugs from
 * src/data/projects.ts that demonstrate relevant engineering.
 * Keep slugs in sync with `serviceSlugs` in src/lib/seo.ts.
 */
export type Service = {
  slug: string;
  name: string;
  /** One line for cards and lists. */
  short: string;
  /** Opening paragraph on the service page. */
  intro: string;
  /** What a typical engagement includes. */
  deliverables: string[];
  /** How we approach this kind of work. */
  approach: string[];
  /** Situations where this service is a good fit. */
  goodFit: string[];
  /** Technologies we would typically reach for (all evidenced in projects.ts). */
  stack: string[];
  /** Project slugs that show related work. */
  related: string[];
};

export const services: Service[] = [
  {
    slug: 'web-development',
    name: 'Web development',
    short: 'Fast, accessible marketing sites and web apps built on Next.js and React.',
    intro:
      'Websites that load quickly, read well on any screen and are straightforward to maintain. We build on Next.js and React with TypeScript, and we treat accessibility, performance and search visibility as part of the build rather than an afterthought.',
    deliverables: [
      'Information architecture and page structure',
      'Responsive interface design and component build',
      'Static or server-rendered Next.js site, depending on what the content needs',
      'Technical SEO: metadata, sitemaps, structured data and clean URLs',
      'Accessibility checks against WCAG 2.2 AA',
      'Deployment to your hosting, with a handover walkthrough',
    ],
    approach: [
      'Start from the content and the audience, then decide the page set.',
      'Prefer static output where possible: cheaper hosting and fewer moving parts.',
      'Ship in small, reviewable increments on a staging URL you can click through.',
    ],
    goodFit: [
      'A business that needs a credible, fast website it can grow',
      'A product that needs a marketing site alongside the app',
      'An existing site that has become slow or hard to change',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'GitHub Actions'],
    related: ['sopkit', 'forge-fitness', 'juniper-kitchen', 'northstar-clinic'],
  },
  {
    slug: 'saas-development',
    name: 'SaaS development',
    short: 'From first version to a dependable product: accounts, data, billing-ready foundations.',
    intro:
      'Software-as-a-service products need more than screens: authentication, a sound data model, background work, and an architecture that does not need rewriting at the first sign of growth. We help founders get a first version in front of users and keep it stable as it changes.',
    deliverables: [
      'Scoping the smallest version worth launching',
      'Data model and API design',
      'Authentication, roles and account management',
      'Product interface with reusable components',
      'Edge or server deployment with logging',
      'Documentation for the next engineer who joins',
    ],
    approach: [
      'Agree what the first release must prove before writing code.',
      'Choose boring, well-supported infrastructure such as PostgreSQL.',
      'Keep the codebase typed end to end so changes stay safe.',
    ],
    goodFit: [
      'Founders turning a validated idea into a working product',
      'Teams that have outgrown a no-code prototype',
      'Internal tools that are becoming a product',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Cloudflare Workers'],
    related: ['campusloop', 'indexfast', 'bitotsav-2026'],
  },
  {
    slug: 'ai-applications',
    name: 'AI applications',
    short: 'Practical AI features and agent tooling, including Model Context Protocol servers.',
    intro:
      'Useful AI features are mostly careful engineering: clear inputs, predictable outputs and a fallback when the model is wrong. We build AI-assisted features and agent tooling, including MCP servers that let assistants act inside your existing systems.',
    deliverables: [
      'Identifying tasks where AI genuinely saves time',
      'Model Context Protocol (MCP) servers and tool definitions',
      'Prompt and output design with validation',
      'Human review steps where accuracy matters',
      'Cost and latency considerations documented up front',
    ],
    approach: [
      'Start with one well-defined workflow, not a general chatbot.',
      'Validate model output before it reaches users or other systems.',
      'Keep the non-AI path working so the product degrades gracefully.',
    ],
    goodFit: [
      'Teams that want assistants or agents to use their internal tools',
      'Products adding a focused AI feature',
      'Repetitive content or media workflows that can be automated',
    ],
    stack: ['TypeScript', 'Python', 'MCP', 'Cloudflare Workers', 'Hono'],
    related: ['indexfast', 'video-studio'],
  },
  {
    slug: 'e-commerce',
    name: 'E-commerce',
    short: 'Storefronts and ordering flows that are quick to browse and clear at checkout.',
    intro:
      'Selling online works best when browsing is fast and the path to purchase is obvious. We design and build storefronts, menus and ordering flows, and integrate them with the payment and fulfilment providers you choose.',
    deliverables: [
      'Catalogue or menu structure and filtering',
      'Product and listing pages built for search',
      'Cart and checkout flow integrated with your payment provider',
      'Order and enquiry notifications',
      'Performance and accessibility review of the purchase path',
    ],
    approach: [
      'Map the purchase path first and remove steps that do not earn their place.',
      'Use an established payment provider rather than handling card data directly.',
      'Measure page weight on real mobile connections.',
    ],
    goodFit: [
      'Restaurants and shops adding online ordering',
      'Brands moving off a slow or restrictive template',
      'Digital product sellers who need a simple storefront',
    ],
    stack: ['Next.js', 'React', 'TypeScript'],
    related: ['juniper-kitchen', 'campusloop'],
  },
  {
    slug: 'business-automation',
    name: 'Business automation',
    short: 'Scheduled jobs, data pipelines and integrations that remove repetitive manual work.',
    intro:
      'A lot of business time goes into copying data between tools, checking lists and sending the same updates. We build scheduled jobs, integrations and small internal tools that do that work reliably and tell you when something needs attention.',
    deliverables: [
      'Process mapping to find the steps worth automating',
      'Scheduled jobs and pipelines, for example on GitHub Actions',
      'Integrations between the tools you already use',
      'Validation, deduplication and error reporting',
      'Runbooks so the automation is understood, not mysterious',
    ],
    approach: [
      'Automate the boring, well-understood steps first.',
      'Make every job idempotent and observable, so reruns are safe.',
      'Keep a manual override for anything business-critical.',
    ],
    goodFit: [
      'Teams spending hours a week on spreadsheet or copy-paste work',
      'Data that needs to be collected, cleaned and published regularly',
      'Operations that rely on one person remembering to do something',
    ],
    stack: ['Python', 'GitHub Actions', 'PostgreSQL'],
    related: ['universal-filter-engine', 'bitotsav-2026'],
  },
  {
    slug: 'custom-software',
    name: 'Custom software',
    short: 'Purpose-built admin panels, dashboards, event systems and developer tools for problems that off-the-shelf products do not fit well.',
    intro:
      'Sometimes the right answer is software shaped exactly around how you work: an admin panel, a real-time dashboard, an event system or a developer tool. We scope these carefully, build them in small increments and hand over code you own.',
    deliverables: [
      'Discovery and written scope with clear boundaries',
      'Architecture proposal with trade-offs explained',
      'Iterative builds you can review as they progress',
      'Real-time features over WebSockets where needed',
      'Source code and documentation in a repository you own',
    ],
    approach: [
      'Write down what is out of scope as carefully as what is in it.',
      'Choose the simplest architecture that meets the real constraints.',
      'Hand over everything: code, credentials and documentation.',
    ],
    goodFit: [
      'Workflows no existing product handles well',
      'Events and operations with hard real-world constraints',
      'Developer and content teams that need specialised tooling',
    ],
    stack: ['TypeScript', 'PostgreSQL', 'Redis', 'WebSockets', 'FFmpeg'],
    related: ['bitotsav-2026', 'sketchflow', 'picser'],
  },
];

export const getService = (slug: string) => services.find(s => s.slug === slug);
