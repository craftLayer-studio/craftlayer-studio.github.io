import type {MetadataRoute} from 'next';
import {absoluteUrl} from '@/lib/site';
import {sitePages} from '@/lib/seo';

// Required for `output: 'export'`: prerender at build time.
export const dynamic = 'force-static';

/** Build date, so lastModified reflects the deployed version. */
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages().map(page => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
