import type {MetadataRoute} from 'next';
import {absoluteUrl, site} from '@/lib/site';

// Required for `output: 'export'`: prerender at build time.
export const dynamic = 'force-static';

/**
 * This is the robots.txt at the domain root, so it also governs the project
 * site under /industry-demos/ (crawlers ignore robots.txt in subpaths).
 * List both sitemaps here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{userAgent: '*', allow: '/'}],
    sitemap: [absoluteUrl('/sitemap.xml'), new URL('sitemap.xml', site.demosUrl).toString()],
  };
}
