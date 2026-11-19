/**
 * Schema.org JSON-LD builders. Rules:
 * - Only genuine, publicly verifiable facts (see src/lib/site.ts and src/data/projects.ts).
 * - Never emit ratings, reviews, aggregateRating, prices or client claims.
 * - Concept demos are described as fictional concepts, never as client work.
 * Render the result with <JsonLd data={...} /> from src/components/seo/JsonLd.tsx.
 */
import {absoluteUrl, site} from './site';
import type {Project} from '@/data/projects';

export type JsonLdObject = {'@context'?: string; '@type': string | string[]} & Record<string, unknown>;

const CONTEXT = 'https://schema.org';
export const ORG_ID = absoluteUrl('/#organization');
export const WEBSITE_ID = absoluteUrl('/#website');
export const FOUNDER_ID = absoluteUrl('/about/#founder');
export const LOGO_URL = absoluteUrl('/brand/icon-512.png');
/** Publication date used for case study articles. */
export const CASE_STUDY_DATE = '2026-11-12';

export const knowsAbout = [
  'Web development',
  'SaaS development',
  'AI applications',
  'E-commerce development',
  'Business automation',
  'Custom software development',
  'Next.js',
  'React',
  'TypeScript',
  'Cloudflare Workers',
  'PostgreSQL',
  'Model Context Protocol',
  'Technical SEO',
];

export function founderLd(): JsonLdObject {
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: site.founder.name,
    jobTitle: site.founder.role,
    url: site.founder.portfolio,
    sameAs: [site.founder.github, site.founder.portfolio, site.founder.linkedin],
    worksFor: {'@id': ORG_ID},
  };
}

/** ProfessionalService is a subtype of Organization (via LocalBusiness). */
export function organizationLd(): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline,
    description: site.description,
    url: absoluteUrl('/'),
    logo: LOGO_URL,
    image: absoluteUrl('/brand/og-cover.png'),
    email: `mailto:${site.contactEmail}`,
    founder: founderLd(),
    areaServed: {'@type': 'Place', name: 'Worldwide'},
    knowsAbout,
    sameAs: [site.githubOrg],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.contactEmail,
      url: absoluteUrl('/contact/'),
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function websiteLd(): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.name,
    url: absoluteUrl('/'),
    description: site.description,
    inLanguage: site.locale,
    publisher: {'@id': ORG_ID},
  };
}

export type ServiceLdInput = {
  name: string;
  description: string;
  /** Site path of the service page, e.g. /services/web-development/ */
  path: string;
  serviceType?: string;
};

export function serviceLd(service: ServiceLdInput): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    '@id': absoluteUrl(`${service.path}#service`),
    name: service.name,
    serviceType: service.serviceType ?? service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: {'@id': ORG_ID, '@type': 'ProfessionalService', name: site.name, url: absoluteUrl('/')},
    areaServed: {'@type': 'Place', name: 'Worldwide'},
  };
}

function projectPath(project: Project): string {
  return `/work/${project.slug}/`;
}

/**
 * SoftwareApplication for live products / open-source tools.
 * Deliberately no offers, ratings or download counts.
 */
export function softwareApplicationLd(project: Project): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.summary,
    applicationCategory: project.category,
    operatingSystem: 'Web browser',
    url: project.demoUrl ?? absoluteUrl(projectPath(project)),
    ...(project.repoUrl ? {sameAs: [project.repoUrl]} : {}),
    keywords: project.technologies.join(', '),
    creator: {'@id': FOUNDER_ID, '@type': 'Person', name: site.founder.name},
  };
}

/** CreativeWork for concept demos and community work: honest, non-commercial framing. */
export function creativeWorkLd(project: Project): JsonLdObject {
  const isConcept = project.type === 'concept-demo';
  return {
    '@context': CONTEXT,
    '@type': 'CreativeWork',
    name: isConcept ? `${project.title} (concept demo)` : project.title,
    description: isConcept
      ? `Fictional concept demo by ${site.name}, not a real business or client project. ${project.summary}`
      : project.summary,
    genre: project.category,
    url: project.demoUrl ?? absoluteUrl(projectPath(project)),
    ...(project.repoUrl ? {codeRepository: project.repoUrl, sameAs: [project.repoUrl]} : {}),
    keywords: project.technologies.join(', '),
    creator: {'@id': ORG_ID, '@type': 'ProfessionalService', name: site.name},
  };
}

/** Picks the right type for a project. */
export function projectLd(project: Project): JsonLdObject {
  if (project.type === 'concept-demo' || project.type === 'community-project') return creativeWorkLd(project);
  return softwareApplicationLd(project);
}

export type BreadcrumbItem = {name: string; path: string};

export function breadcrumbLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Article for a case study page at /work/[slug]/. */
export function articleLd(project: Project, {datePublished = CASE_STUDY_DATE}: {datePublished?: string} = {}): JsonLdObject {
  const url = absoluteUrl(projectPath(project));
  return {
    '@context': CONTEXT,
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: `${project.title} case study`,
    description: project.summary,
    url,
    mainEntityOfPage: url,
    datePublished,
    dateModified: datePublished,
    inLanguage: site.locale,
    image: project.screenshot ? absoluteUrl(project.screenshot) : absoluteUrl('/brand/og-cover.png'),
    author: {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: site.founder.name,
      url: site.founder.portfolio,
      sameAs: [site.founder.github, site.founder.linkedin],
    },
    publisher: {'@id': ORG_ID, '@type': 'Organization', name: site.name, logo: {'@type': 'ImageObject', url: LOGO_URL}},
    about: projectLd(project),
    keywords: project.technologies.join(', '),
  };
}

export type ListEntry = {name: string; url: string; description?: string};

/**
 * ItemList for a page that lists things (work, industries). `url` may be an
 * absolute external URL or a site path.
 */
export function itemListLd({name, path, items}: {name: string; path: string; items: ListEntry[]}): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'ItemList',
    '@id': absoluteUrl(`${path}#list`),
    name,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : absoluteUrl(item.url),
      ...(item.description ? {description: item.description} : {}),
    })),
  };
}

/** ItemList whose entries are the projects themselves (CreativeWork / SoftwareApplication). */
export function projectListLd({name, path, items}: {name: string; path: string; items: Project[]}): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'ItemList',
    '@id': absoluteUrl(`${path}#list`),
    name,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((project, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {'@context': _ctx, ...item} = projectLd(project);
      return {'@type': 'ListItem', position: index + 1, item};
    }),
  };
}

export type FaqEntry = {question: string; answer: string};

/** FAQPage. Only use on a page that visibly shows these exact questions and answers. */
export function faqPageLd(faqs: FaqEntry[], path: string): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    '@id': absoluteUrl(`${path}#faq`),
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {'@type': 'Answer', text: f.answer},
    })),
  };
}

/** Service page for an industry, offered by the studio. */
export function industryServiceLd({name, description, path}: {name: string; description: string; path: string}): JsonLdObject {
  return serviceLd({name, description, path, serviceType: 'Website design and development'});
}
