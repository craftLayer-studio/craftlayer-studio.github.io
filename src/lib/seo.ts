import type {Metadata} from 'next';
import {absoluteUrl, site} from './site';
import {caseStudies} from '@/data/projects';

/** Contract used by every page. The SEO workstream may extend, not break, it. */
export function buildMetadata({
  title,
  description,
  path,
  image = '/brand/og-cover.png',
  imageAlt,
  type = 'website',
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Alt text for the social image. Defaults to the site name. */
  imageAlt?: string;
  /** Open Graph type. Use 'article' for case studies. */
  type?: 'website' | 'article';
  /** Exclude from search results (e.g. utility pages). */
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const images = [{url: absoluteUrl(image), width: 1200, height: 630, alt: imageAlt ?? site.name}];
  return {
    title,
    description,
    alternates: {canonical: url},
    robots: noIndex ? {index: false, follow: true} : {index: true, follow: true},
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: 'en_US',
      images,
    },
    twitter: {card: 'summary_large_image', title, description, images: [absoluteUrl(image)]},
  };
}

/**
 * Service page slugs (routes /services/[slug]/). Kept here so the sitemap and
 * llms.txt do not depend on page-owned data files. Keep in sync with
 * src/data/services.ts; the sitemap test fails if a built page is missing.
 */
export const serviceSlugs = [
  'web-development',
  'saas-development',
  'ai-applications',
  'e-commerce',
  'business-automation',
  'custom-software',
] as const;

export type SitePage = {path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly'};

/** Every indexable page, with trailing slashes. Feeds sitemap.xml. */
export function sitePages(): SitePage[] {
  return [
    {path: '/', priority: 1, changeFrequency: 'weekly'},
    {path: '/services/', priority: 0.9, changeFrequency: 'monthly'},
    ...serviceSlugs.map(slug => ({path: `/services/${slug}/`, priority: 0.8, changeFrequency: 'monthly' as const})),
    {path: '/industries/', priority: 0.7, changeFrequency: 'monthly'},
    {path: '/work/', priority: 0.9, changeFrequency: 'monthly'},
    ...caseStudies.map(p => ({path: `/work/${p.slug}/`, priority: 0.8, changeFrequency: 'monthly' as const})),
    {path: '/process/', priority: 0.6, changeFrequency: 'yearly'},
    {path: '/about/', priority: 0.7, changeFrequency: 'yearly'},
    {path: '/products/', priority: 0.6, changeFrequency: 'monthly'},
    {path: '/contact/', priority: 0.8, changeFrequency: 'yearly'},
    {path: '/privacy/', priority: 0.2, changeFrequency: 'yearly'},
    {path: '/terms/', priority: 0.2, changeFrequency: 'yearly'},
  ];
}
