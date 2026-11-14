/**
 * Portfolio source of truth. Feeds the Work pages, case studies, JSON-LD and
 * /portfolio.json. Rules:
 * - `type` must be honest. "client-engagement" requires evidence of a client.
 * - Every entry in `evidence` links to a public source for the claim.
 * - Never add metrics without an evidence link.
 */
export type ProjectType =
  | 'in-house-product'
  | 'concept-demo'
  | 'open-source'
  | 'community-project'
  | 'client-engagement';

export const projectTypeLabel: Record<ProjectType, string> = {
  'in-house-product': 'In-house product',
  'concept-demo': 'Concept demonstration',
  'open-source': 'Open-source project',
  'community-project': 'Community project',
  'client-engagement': 'Client engagement',
};

export type Evidence = {label: string; href: string};

export type Project = {
  slug: string;
  title: string;
  category: string;
  type: ProjectType;
  status: 'live' | 'maintained' | 'concept' | 'completed';
  summary: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  /** Path under /public, e.g. /work/campusloop.png */
  screenshot?: string;
  evidence: Evidence[];
  featured: boolean;
  /** Present only for projects with a full case study page. */
  caseStudy?: {
    context: string;
    problem: string;
    objective: string;
    work: string[];
    decisions: string[];
    architecture: string[];
    /** Only verifiable outcomes, each tied to evidence above. */
    results: string[];
  };
};

const DEMOS = 'https://craftlayer-studio.github.io/industry-demos';
const DEMOS_REPO = 'https://github.com/craftLayer-studio/industry-demos';
const GALLERY = 'https://craftlayer-studio.github.io/landing-gallery/';
const GALLERY_REPO = 'https://github.com/craftLayer-studio/landing-gallery';

export const projects: Project[] = [
  {
    slug: 'campusloop',
    title: 'CampusLoop',
    category: 'Social platform',
    type: 'in-house-product',
    status: 'live',
    summary:
      'A student-only campus network gated by college email, accepting the email domains of 1,350+ Indian colleges. Feeds, marketplace, polls and time capsules.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Cloudflare Workers', 'WebSockets'],
    demoUrl: 'https://campusloop.space',
    repoUrl: 'https://github.com/playlikeboy/campusloop',
    screenshot: '/work/campusloop.png',
    evidence: [
      {label: 'Live product', href: 'https://campusloop.space'},
      {label: 'Source repository', href: 'https://github.com/playlikeboy/campusloop'},
    ],
    featured: true,
    caseStudy: {
      context: 'College students in India lack a trusted space limited to verified peers from their own campus.',
      problem:
        'Open social networks cannot guarantee that a member actually belongs to a college, which invites spam and impersonation.',
      objective: 'Build a network where membership is proven by a college email address, then give verified students useful shared tools.',
      work: [
        'Email-domain gating against a maintained list of 1,350+ Indian college domains.',
        'Feeds, a campus marketplace, polls and time capsules.',
        'Real-time updates over WebSockets.',
      ],
      decisions: [
        'Verification by email domain rather than manual review, so onboarding stays instant.',
        'PostgreSQL for relational campus, user and listing data.',
        'Cloudflare Workers at the edge for low-latency request handling.',
      ],
      architecture: ['Next.js frontend', 'PostgreSQL database', 'Cloudflare Workers', 'WebSocket channel for live updates'],
      results: ['Live at campusloop.space with public source code.'],
    },
  },
  {
    slug: 'sopkit',
    title: 'SopKit',
    category: 'Browser tools',
    type: 'in-house-product',
    status: 'live',
    summary:
      '600+ browser tools that process files client-side: no uploads and no server compute. Built and run by the founder.',
    technologies: ['JavaScript', 'Static hosting', 'Client-side processing', 'SEO'],
    demoUrl: 'https://sopkit.github.io',
    repoUrl: 'https://github.com/SopKit/sopkit.github.io',
    screenshot: '/work/sopkit.png',
    evidence: [
      {
        label: 'Analytics post: 4.3M+ requests and 213K+ visits in 30 days',
        href: 'https://www.linkedin.com/posts/sh20raj_indiedev-seo-growthhacking-activity-7392263918737498112-Adp_',
      },
      {label: 'Source repository', href: 'https://github.com/SopKit/sopkit.github.io'},
      {label: 'Evidence index', href: 'https://playlikeboy.github.io/proof'},
    ],
    featured: true,
    caseStudy: {
      context: 'People routinely upload private files to unknown servers just to convert or compress them.',
      problem: 'Server-side file tools cost money to run and ask users to trust a third party with their data.',
      objective: 'Offer a large catalogue of everyday file tools that run entirely in the browser.',
      work: [
        'Built 600+ single-purpose tools that process files locally in the browser.',
        'Static hosting with no server compute.',
        'Search-focused page structure so each tool can be found directly.',
      ],
      decisions: [
        'Client-side processing: user files never leave the device, and hosting cost stays flat as traffic grows.',
        'Static site on GitHub Pages instead of an application server.',
      ],
      architecture: ['Static pages per tool', 'Browser APIs for file processing', 'GitHub Pages hosting'],
      results: ['4.3M+ requests and 213K+ visits in a 30-day window, per the published analytics post.'],
    },
  },
  {
    slug: 'indexfast',
    title: 'IndexFast',
    category: 'Developer tools / MCP',
    type: 'in-house-product',
    status: 'live',
    summary:
      'An MCP server on Cloudflare Workers that submits URLs to Google, Bing and IndexNow from inside an IDE, plus indexing and sitemap diagnostics.',
    technologies: ['TypeScript', 'MCP', 'Cloudflare Workers', 'Hono'],
    demoUrl: 'https://indexfast.co',
    repoUrl: 'https://github.com/playlikeboy/indexfast',
    screenshot: '/work/indexfast.png',
    evidence: [
      {label: 'Live product', href: 'https://indexfast.co'},
      {label: 'Source repository', href: 'https://github.com/playlikeboy/indexfast'},
    ],
    featured: true,
    caseStudy: {
      context: 'Teams publishing frequently need search engines to discover new and updated pages quickly.',
      problem: 'Submitting URLs across Google, Bing and IndexNow means juggling separate consoles and APIs.',
      objective: 'Let developers and agents trigger indexing and check status from the tools they already use.',
      work: [
        'MCP server exposing indexing actions to IDEs and AI agents.',
        'Submission to Google, Bing and IndexNow.',
        'Sitemap monitoring and visibility diagnostics.',
      ],
      decisions: [
        'Model Context Protocol so any MCP-capable client can use it.',
        'Hono on Cloudflare Workers for a small, fast edge runtime.',
      ],
      architecture: ['Cloudflare Workers runtime', 'Hono HTTP router', 'MCP tool interface', 'Search engine indexing APIs'],
      results: ['Live at indexfast.co with public source code.'],
    },
  },
  {
    slug: 'bitotsav-2026',
    title: "Bitotsav '26 platform",
    category: 'Event platform',
    type: 'community-project',
    status: 'completed',
    summary:
      "Registration, teams, points, admin panel and signed-QR entry for BIT Mesra's festival (~5,000 participants), built and run live by the founder as tech lead.",
    technologies: ['PostgreSQL', 'Redis', 'Admin dashboard', 'Signed QR codes'],
    screenshot: '/work/bitotsav.png',
    evidence: [
      {label: 'Project write-up', href: 'https://playlikeboy.github.io/projects/bitotsav-2026'},
      {
        label: 'Public post',
        href: 'https://www.linkedin.com/posts/sh20raj_bitotsav-2026-what-a-journey-what-a-responsibility-activity-7442608760193216512-Y_nn',
      },
    ],
    featured: true,
    caseStudy: {
      context: "Bitotsav is BIT Mesra's annual festival. The founder served as tech lead for the 2026 edition.",
      problem: 'Thousands of participants needed registration, team management, scoring and fast gate entry, including in areas with no network.',
      objective: 'Run registration through entry on one reliable system during a live event.',
      work: [
        'Registration, team and points workflows.',
        'Admin panel for organisers.',
        'Signed-QR entry that keeps working in no-network zones.',
      ],
      decisions: [
        'Signed QR codes so entry can be verified offline.',
        'Redis in front of PostgreSQL to absorb peak load at the gates.',
      ],
      architecture: ['PostgreSQL system of record', 'Redis cache layer', 'Admin panel', 'Offline-verifiable signed QR'],
      results: ['Ran live for a festival of roughly 5,000 participants, per the published write-up.'],
    },
  },
  {
    slug: 'sketchflow',
    title: 'SketchFlow',
    category: 'Productivity / local-first',
    type: 'open-source',
    status: 'live',
    summary: 'A canvas with a notes editor beside it. Every save is a Git commit to a GitHub repository the user owns.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Cloudflare Workers'],
    demoUrl: 'https://sketchflow.space',
    repoUrl: 'https://github.com/playlikeboy/sketchflow',
    screenshot: '/work/sketchflow.png',
    evidence: [{label: 'Source repository (MIT)', href: 'https://github.com/playlikeboy/sketchflow'}],
    featured: false,
  },
  {
    slug: 'picser',
    title: 'Picser',
    category: 'Developer tools',
    type: 'open-source',
    status: 'live',
    summary: 'Free image hosting backed by GitHub storage and served through the jsDelivr CDN.',
    technologies: ['Next.js', 'TypeScript', 'GitHub API', 'jsDelivr'],
    demoUrl: 'https://picser.pages.dev/',
    repoUrl: 'https://github.com/playlikeboy/picser',
    screenshot: '/work/picser.png',
    evidence: [{label: 'Source repository', href: 'https://github.com/playlikeboy/picser'}],
    featured: false,
  },
  {
    slug: 'universal-filter-engine',
    title: 'Universal Filter Engine',
    category: 'Automation',
    type: 'open-source',
    status: 'maintained',
    summary:
      'Aggregates and compiles filter lists for browser ad blockers and DNS blockers with daily automated updates, deduplication, validation and CDN publishing.',
    technologies: ['JavaScript', 'GitHub Actions', 'jsDelivr'],
    demoUrl: 'https://playlikeboy.github.io/universal-filter-engine-js/',
    repoUrl: 'https://github.com/playlikeboy/universal-filter-engine-js',
    evidence: [{label: 'Source repository (MIT)', href: 'https://github.com/playlikeboy/universal-filter-engine-js'}],
    featured: false,
  },
  {
    slug: 'video-studio',
    title: 'Video Studio',
    category: 'AI tooling / MCP',
    type: 'open-source',
    status: 'maintained',
    summary: 'An AI-native video editing toolkit and Claude Code skill for repeatable, agent-driven video workflows.',
    technologies: ['Python', 'MCP', 'FFmpeg', 'AI agents'],
    demoUrl: 'https://playlikeboy.github.io/video-studio/',
    repoUrl: 'https://github.com/playlikeboy/video-studio',
    evidence: [{label: 'Source repository (MIT)', href: 'https://github.com/playlikeboy/video-studio'}],
    featured: false,
  },
  {
    slug: 'forge-fitness',
    title: 'Forge Fitness',
    category: 'Fitness website',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional gym brand: programmes, trainers, memberships, filterable class timetable and trial booking.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/gym/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/forge-fitness.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: true,
  },
  {
    slug: 'juniper-kitchen',
    title: 'Juniper Kitchen',
    category: 'Restaurant website',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional restaurant brand: filterable menu, mock order cart and validated reservations.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/restaurant/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/juniper-kitchen.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: true,
  },
  {
    slug: 'northstar-clinic',
    title: 'Northstar Clinic',
    category: 'Healthcare website',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional clinic brand: specialties, clinicians, FAQs and a multi-step appointment request.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/clinic/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/northstar-clinic.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: true,
  },
  {
    slug: 'pulsegrid',
    title: 'Pulsegrid',
    category: 'SaaS landing page',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional analytics SaaS: feature tour, sample-data dashboard, pricing calculator, plan comparison and waitlist form.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/saas/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/pulsegrid.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: false,
  },
  {
    slug: 'quillmark-academy',
    title: 'Quillmark Academy',
    category: 'Education website',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional online academy: filterable course catalogue, curriculum outlines, cohort calendar and enrolment enquiry.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/academy/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/quillmark-academy.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: false,
  },
  {
    slug: 'halden-rowe',
    title: 'Halden & Rowe',
    category: 'Professional services website',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional accounting and advisory firm: practice areas, working fee estimator and a multi-step consultation request.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/advisory/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/halden-rowe.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: false,
  },
  {
    slug: 'ashgrove-property',
    title: 'Ashgrove Property',
    category: 'Real estate website',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional estate agency: filterable property listings, listing detail dialog with floor plans, repayment estimator and viewing request.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/real-estate/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/ashgrove-property.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: false,
  },
  {
    slug: 'fernlight-salon',
    title: 'Fernlight Salon & Spa',
    category: 'Salon and spa website',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional salon and spa: tabbed service menu, specialist filter, gift card builder and multi-step appointment request.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/salon/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/fernlight-salon.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: false,
  },
  {
    slug: 'common-table',
    title: 'Common Table',
    category: 'Nonprofit website',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional community food network: programmes, donation form with an illustrative gift breakdown, volunteer shift sign-up and events.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/nonprofit/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/common-table.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: false,
  },
  {
    slug: 'brightwater-coffee',
    title: 'Brightwater Coffee',
    category: 'E-commerce storefront',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Fictional coffee roaster shop: filterable catalogue, product dialog, mock cart, subscription builder and brew ratio calculator.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Astryx'],
    demoUrl: `${DEMOS}/coffee/`,
    repoUrl: DEMOS_REPO,
    screenshot: '/work/brightwater-coffee.png',
    evidence: [{label: 'Source repository', href: DEMOS_REPO}],
    featured: false,
  },
  {
    slug: 'landing-gallery',
    title: 'Landing page gallery',
    category: 'Landing page examples',
    type: 'concept-demo',
    status: 'concept',
    summary: 'Six fictional landing pages composed from named section archetypes: pricing toggles, per-use estimators, searchable FAQs and validated forms.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    demoUrl: GALLERY,
    repoUrl: GALLERY_REPO,
    screenshot: '/work/landing-gallery.png',
    evidence: [{label: 'Source repository', href: GALLERY_REPO}],
    featured: false,
  },
];

/** Upstream open-source contributions, each with a public PR link. */
export const contributions: Evidence[] = [
  {label: 'preactjs/preact #5331 (merged): allow the list attribute on every valid input type', href: 'https://github.com/preactjs/preact/pull/5331'},
  {label: 'codex-team/editor.js #3040 (merged): hide "Convert to" when there is nothing to convert to', href: 'https://github.com/codex-team/editor.js/pull/3040'},
  {label: 'google-gemini/gemini-cli #20778 (merged): thread AbortSignal to chat compression requests', href: 'https://github.com/google-gemini/gemini-cli/commit/f11bd3d0797f1626929b9d095efcb5816c18900c'},
];

export const caseStudies = projects.filter(p => p.caseStudy);
export const getProject = (slug: string) => projects.find(p => p.slug === slug);
