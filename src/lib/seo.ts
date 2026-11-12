import type {Metadata} from 'next';
import {absoluteUrl, site} from './site';

/** Contract used by every page. The SEO workstream may extend, not break, it. */
export function buildMetadata({
  title,
  description,
  path,
  image = '/brand/og-cover.png',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: site.name,
      images: [{url: absoluteUrl(image), width: 1200, height: 630, alt: site.name}],
    },
    twitter: {card: 'summary_large_image', title, description, images: [absoluteUrl(image)]},
  };
}
